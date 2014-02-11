import datetime, os, pymongo, hashlib, shutil
from django.db import models
from main.models.userpresentation import UserPresentation
from django.conf import settings
from django.utils.translation import ugettext as _
from bson.objectid import ObjectId


class Presentation(models.Model):
	# Attributes:
	theme = models.ForeignKey("Theme", default = 1)
	name = models.CharField(max_length = 100)
	description = models.TextField(max_length = 500, blank = True)
	created_date = models.DateTimeField(auto_now = True)
	status = models.BooleanField(default = True)
	last_saved_date = models.DateTimeField(null = True)
	key = models.CharField(max_length = 30, default = hashlib.sha1(str(datetime.datetime.now())).hexdigest()[:10])
	is_private = models.BooleanField()
	shared_key = models.CharField(max_length = 100, null = True)
	edit_key_date = models.DateField(null = True)
	num_views = models.IntegerField(default = 0)
	num_likes = models.IntegerField(default = 0)
	
	class Meta:
		app_label = "main"
	
	# Methods:
	
	def associate_to_user(self, user, is_owner, can_edit):
		"""Associates a presentation to a user
		Args:
			user (User): the user to associate
			is_owner (bool): True if the user is owner of the presentation, otherwise False
			can_edit (bool): True if the user can edit the presentation, otherwise False
		"""
				
		userpresentation = UserPresentation(user_id = user.id,
										presentation_id = self.id,
										is_owner = is_owner,
										can_edit = can_edit)
		userpresentation.save()
	
	def like(self):
		"""Increases the number of likes by one on the presentation"""
		
		self.num_likes += 1
		self.save()
	
	def increase_num_views(self):
		"""Increases the number of views by one on the presentation"""
		
		# NOTE: I don't know how to do it, because it increases every time I refresh the page with F5
		pass
	
	def is_allowed(self, user):
		"""Check if the logged user can access to the presentation"""
		
		if self.userpresentation_set.filter(user_id = user.id).exists():
			return True
		else:
			return False
	
	def is_owner(self, user):
		"""Checks if the user is owner of the presentation
		Args:
			user (User): the user to check
		Returns:
			bool: True if owner or False otherwise
		"""

		if self.is_allowed(user):
			userpresentation = self.userpresentation_set.filter(user_id = user.id).first()
			if userpresentation.is_owner:
				return True
			else:
				return False			
		else:
			return False
	
	def can_edit(self, user):
		"""Checks if the user can edit the presentation
		Args:
			user (User): the user to check
		Returns:
			bool: True if can edit or False otherwise
		"""

		if self.is_allowed(user):
			userpresentation = self.userpresentation_set.filter(user_id = user.id).first()
			if userpresentation.can_edit:
				return True
			else:
				return False
		else:
			return False
	
	def get_associated_users(self):
		"""Return the users that are associated with this presentation
		Returns:
			list: list of associated users
		"""
		users = []
		for userpresentation in self.userpresentation_set.get_queryset():
			users.append(userpresentation.user)
		
		return users
	
	def get_slides(self):
		pass
	
	def delete_completely(self):
		"""Deletes the presentation completely including slides, thumbnail, and relation with other users"""
		
 		thumbnail = settings.MEDIA_THUMBNAILS_ROOT + "/img_" + self.key + ".png"
 		
 		# delete the presentation thumbnail
 		try:
 			os.remove(thumbnail)
 		except:
 			pass

		# Load slides from MongoDB
		conn = pymongo.Connection(settings.MONGODB_URI)
		db = conn[settings.MONGODB_DATABASE]
		db.slides.remove({"presentation_id": self.id})

 		self.delete()

	def get_share_form(self):
		from main.forms.presentation import SharePresentationForm
	
	def clone(self):
		"""Clones the presentation and saves it to the database
		Returns:
			instance (Presentation): cloned presentation object
		"""
		
		original_id = self.id

		thumbnail_src = settings.MEDIA_THUMBNAILS_ROOT + "/img_" + self.key + ".png"
	
		'''delete its PK, so next time the save() method is executed,
		it'll save a new row to the database with a new ID'''
		self.id = None
	
		# generate a presentation key, based on a random SHA1 string
		self.key = hashlib.sha1(str(datetime.datetime.now())).hexdigest()[:10]
	
		# generate a new name to the presentation
		self.name = _("text_copy_of") + " " + self.name
	
		# set the number of views and likes to 0
		self.num_views = self.num_likes = 0
	
		# save the new copied presentation to the database
		self.save()
		
		# copy the thumbnail
		thumbnail_dst = settings.MEDIA_THUMBNAILS_ROOT + "/img_" + self.key + ".png"
		shutil.copy(thumbnail_src, thumbnail_dst)
	
		# Copy slides from MongoDB database
		conn = pymongo.Connection(settings.MONGODB_URI)
		db = conn[settings.MONGODB_DATABASE]
		slides = db.slides.find({"presentation_id": int(original_id)})
		for i in slides:
			#Replace the slide _id and its presentation_id
			i["_id"] = ObjectId()
			i["presentation_id"] = self.id
	
			#Replace the components' _id
			for j in i["components"]:
				j["_id"] = str(ObjectId())
	
			#Finally save the new slide
			db.slides.insert(i)
		
		return self