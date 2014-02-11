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

class SharePresentationForm(forms.Form):
	email = forms.EmailField()
	permission = forms.ChoiceField(choices=(("1", _("option_allow_edit")), ("0", _("option_view_only"))))