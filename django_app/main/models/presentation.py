from django.db import models
from main.models.theme import Theme
from bson.json_util import default


class Presentation(models.Model):
	# Attributes:
	theme = models.ForeignKey(Theme, default = 1)
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
		from main.models.userpresentation import UserPresentation
		userpresentation = UserPresentation(user_id = user.id,
										presentation_id = self.id,
										is_owner = is_owner,
										can_edit = can_edit)
		userpresentation.save()
	
	def like(self):
		self.num_likes += 1
		self.save()