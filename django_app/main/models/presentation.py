from django.db import models
from main.models.userpresentation import UserPresentation


class Presentation(models.Model):
	# Attributes:
	theme = models.ForeignKey("Theme", default = 1)
	name = models.CharField(max_length = 100)
	description = models.CharField(max_length = 500, null = True)
	created_date = models.DateTimeField(auto_now = True)
	status = models.BooleanField(default = True)
	last_saved_date = models.DateTimeField(null = True)
	key = models.CharField(max_length = 30)
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
		
		# I don't know how to do it, because it increases every time I refresh the page with F5
		pass
	
	def is_owner(self, user):
		"""Check if the user is owner of the presentation
		Args:
			user (User): the user to check
		Returns:
			bool: True if owner or False otherwise
		"""
				
		userpresentation = self.userpresentation_set.filter(user_id = user.id).first()
		if userpresentation.is_owner:
			return True
		else:
			return False
	
	def can_edit(self, user):
		"""Check if the user can edit the presentation
		Args:
			user (User): the user to check
		Returns:
			bool: True if can edit or False otherwise
		"""
		
		userpresentation = self.userpresentation_set.filter(user_id = user.id).first()
		if userpresentation.can_edit:
			return True
		else:
			return False