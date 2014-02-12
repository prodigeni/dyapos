from django import forms
from django.utils.translation import ugettext_lazy as _
from main.models.userpresentation import UserPresentation

class SharePresentationForm(forms.Form):
    email = forms.EmailField()
    permission = forms.ChoiceField(choices=(("1", _("option_allow_edit")), ("0", _("option_view_only"))))