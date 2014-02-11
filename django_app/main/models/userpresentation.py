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
    
    def load_share_form(self, presentation_id, user_id):
        from main.forms.presentation import SharePresentationForm
        from django.forms.formsets import formset_factory
        share_formset_model = formset_factory(SharePresentationForm)
        collaborators = UserPresentation.objects.filter(presentation_id=presentation_id).exclude(user_id=user_id)
        initial_data = []
        for c in collaborators:
            initial_data.append({"email":c.user.email,
                                "permission":c.can_edit})
         
        return share_formset_model(initial=initial_data)