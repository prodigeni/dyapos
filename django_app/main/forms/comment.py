from django import forms
from main.models.comment import Comment

class CommentForm(forms.ModelForm):	
	class Meta:
		model = Comment
		fields = ["comment"]
