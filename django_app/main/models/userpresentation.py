from django.db import models
from django.contrib.auth.models import User


class UserPresentation(models.Model):
    # Attributes:
    user = models.ForeignKey(User)
    presentation = models.ForeignKey("Presentation")
    is_owner = models.BooleanField()
    can_edit = models.BooleanField()
    
    class Meta:
        app_label = "main"
    
    # Methods