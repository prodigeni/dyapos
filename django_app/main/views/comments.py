# encoding: utf-8

from django.http import HttpResponseRedirect
from django.contrib.auth.decorators import login_required
from main.models.comment import Comment
from main.models.presentation import Presentation
from main.forms.comment import *
from django.core.exceptions import ObjectDoesNotExist


@login_required(login_url="/")
def comment(request, id):
	"""Post a comment on a presentation
	Args:
		id (int): Presesentation ID
	"""

	if request.method == "POST":
		try:
			presentation = Presentation.objects.get(pk = id)			
			form = CommentForm(request.POST)
			if form.is_valid():
				comment = Comment(user_id = request.user.id,
								presentation_id = presentation.id,
								comment = form.cleaned_data["comment"]).save()
		except ObjectDoesNotExist:
			pass

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