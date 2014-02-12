from django import forms
from django.utils.translation import ugettext_lazy as _
from main.models.presentation import Presentation

class NewPresentationForm(forms.ModelForm):
 	class Meta:
 		model = Presentation
     		fields = ["name", "description", "is_private"]

class RenameForm(forms.ModelForm):
    class Meta:
        model = Presentation
        fields = ["name"]

class ModifyDescriptionForm(forms.ModelForm):
    class Meta:
        model = Presentation
        fields = ["description"]