from django.db import models
from django.contrib.auth.models import User

class Comment(models.Model):
    # Attributes:
    user = models.ForeignKey(User)
    presentation = models.ForeignKey("Presentation")
    comment = models.TextField(max_length=500)
    published_date = models.DateTimeField(auto_now=True)
    
    class Meta:
        app_label = "main"    

    # Methods: