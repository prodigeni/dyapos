from django import forms
from django.utils.translation import ugettext_lazy as _
from main.models.presentation import Presentation

class NewPresentationForm(forms.ModelForm):
 	class Meta:
 		model = Presentation
     		fields = ["name", "description", "is_private"]

class RenameForm(forms.Form):
	name = forms.CharField(max_length=20)

class ModifyDescriptionForm(forms.Form):
	description = forms.CharField(required=False,
									widget=forms.Textarea,
									max_length=200)

class SharePresentationForm(forms.Form):
	email = forms.EmailField()
	permission = forms.ChoiceField(choices=(("1", _("option_allow_edit")), ("0", _("option_view_only"))))