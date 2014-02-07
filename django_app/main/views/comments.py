# encoding: utf-8

from django.http import HttpResponseRedirect
from django.contrib.auth.decorators import login_required
from main.models.comment import Comment
from main.models.userpresentation import UserPresentation
from main.forms.comment import *


@login_required(login_url="/")
def comment(request):    
	"""Post a comment on a presentation"""

	if request.method == "POST":
		form = CommentForm(request.POST)
		if form.is_valid():
			c = Comment(user_id = request.user.id,
						presentation_id = form.cleaned_data["presentation_id"],
						comment = form.cleaned_data["comment"])
			c.save()

	return HttpResponseRedirect(request.META["HTTP_REFERER"])

@login_required(login_url="/")
def delete(request, id):
	"""Delete a comment
	Args:
		id (int): Id of the presentation to delete
	"""

 	comment = Comment.objects.get(pk=id)
 	presentation = comment.presentation

	# only the owner of the presentation can delete the comment
	if presentation.is_owner(request.user):
		comment.delete()
 	
 	return HttpResponseRedirect(request.META["HTTP_REFERER"])	