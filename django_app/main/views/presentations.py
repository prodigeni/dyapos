# encoding: utf-8

import datetime, hashlib, urllib, re, shutil, pymongo
from main.forms.presentation import *
from main.forms.comment import *
from main.models.presentation import Presentation
from main.models.userpresentation import UserPresentation
from django.shortcuts import render_to_response
from django.http import HttpResponse, HttpResponseRedirect
from django.core.exceptions import ObjectDoesNotExist
from django.template import RequestContext
from django.contrib.auth.decorators import login_required
from django.http.response import HttpResponseNotFound
from django.contrib.auth.models import User
from json import dumps
from django.core.urlresolvers import reverse
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.forms.formsets import formset_factory
from django.http import Http404
from django.core.serializers import serialize
from main.forms.userpresentation import SharePresentationForm


def presentation(request, key):
	"""Shows the presentation page with info, mini preview, comments and other options
	Args:
		key (str): String key that corresponds to a presentation
	"""

	# search the presentation based on its key
	presentation = Presentation.objects.filter(key = key).first()
	
	# if presentation exists
	if presentation is not None:
		if presentation.is_private:
			if not presentation.is_allowed(request.user):
				raise Http404

		# generate share form
		share_formset = presentation.get_share_formset()

		# show the presentation page
		return render_to_response("presentation.html", {
			"presentation": presentation,
			"rename_form": RenameForm(instance = presentation),
			"modify_description_form": ModifyDescriptionForm(instance = presentation),
 			"share_formset": share_formset,
			"comment_form": CommentForm(),
			"comments": presentation.comment_set.get_queryset(),
			"view_url": request.get_host() + reverse("main.views.presentations.view", args=[key]),
 			"is_owner": True if (request.user.is_authenticated() and presentation.is_owner(request.user)) else False,
 			"can_edit": True if (request.user.is_authenticated() and presentation.can_edit(request.user)) else False,			
			}, context_instance=RequestContext(request))
	else:
		# show Error 404 page
		raise Http404


@login_required(login_url="/")
def create(request):
	"""Creates a new presentation and associates to the current user"""

	if request.method == "POST":
 		form = NewPresentationForm(request.POST)
		if form.is_valid():
			form.save()
			form.instance.associate_to_user(request.user, True, True)
 
 			# redirect to the edit page of the created presentation
 			return HttpResponseRedirect("/edit/" + str(form.instance.key))

	return render_to_response("home.html", {"form": NewPresentationForm()}, context_instance=RequestContext(request))


@login_required(login_url="/")
def delete(request, id):
	"""Deletes a presentation
	Args:
		id (int): Presentation Id to delete
	"""

	presentation = Presentation.objects.get(pk = id)	
	if presentation.is_owner(request.user):
		presentation.delete_completely()
	else:
		presentation.userpresentation_set.filter(user_id = request.user.id).first().delete()

	# redirect to home page
	return HttpResponseRedirect("/home")


@login_required(login_url="/")
def copy(request, id):
	"""Copies a backup of the presentation
	Args:
		id (int): Presentation Id to be copied
	"""

	try:
		presentation = Presentation.objects.get(pk = id)
		new_presentation = presentation.clone()
		new_presentation.associate_to_user(request.user, True, True)
	except ObjectDoesNotExist:
		pass

	# redirect to home page
	return HttpResponseRedirect("/home")

@login_required(login_url="/")
def rename(request, id):
	"""Renames the presentation
	Args:
	 id (int): Presentation Id to be renamed
	"""

	if request.method == "POST":
		presentation = Presentation.objects.get(pk = id)
		form = RenameForm(request.POST, instance = presentation)
		if form.is_valid():
			form.save()

	return HttpResponseRedirect(request.META["HTTP_REFERER"])

@login_required(login_url="/")
def modify_description(request, id):
	"""Modifies the presentation description
	Args:
	 id (int): Presentation Id whose the description will be modified
	"""

	if request.method == "POST":
		presentation = Presentation.objects.get(pk = id)
		form = ModifyDescriptionForm(request.POST, instance = presentation)
		if form.is_valid():
			form.save()

	return HttpResponseRedirect(request.META["HTTP_REFERER"])


def edit(request, key = None):
	"""Open the presentation editor screen
	Args:
		key (str): Presentation public key, default = None
	"""

	template_data = {}

	if not key:
		template_data["is_anonymous"] = True
	else:
		try:
			presentation = Presentation.objects.get(key=key)

			# check if user is allowed to edit this presentation
			if presentation.can_edit(request.user):
				# get user data
				user_data = {
					"username": request.user.username,
					"first_name": request.user.first_name,
				"last_name": request.user.last_name,
				}

				# generate share form
		 		uspr = UserPresentation()
		 		share_formset = uspr.load_share_form(presentation.id, request.user.id)

		 		template_data["presentation"] = presentation
		 		template_data["is_anonymous"] = False
		 		template_data["user_data"] = user_data
		 		template_data["share_formset"] = share_formset
		 		template_data["NODEJS_URL"] = settings.NODEJS_URL
			else:
				raise ObjectDoesNotExist
		except ObjectDoesNotExist:
			return HttpResponseRedirect("/")

	return render_to_response("edit.html", template_data, context_instance=RequestContext(request))

def download(request):
	return HttpResponse("<h2>Not available yet. Coming soon :)</h2>")

@login_required(login_url="/")
@csrf_exempt
def update_thumbnail(request):
	"""Update the presentation image thumbnail"""

	# get the presentation data based on the ID
	presentation = Presentation.objects.get(pk = request.POST["presentation_id"])

	# generate an image file
	datauri = request.POST["image"]
	imgstr = re.search(r'base64,(.*)', datauri).group(1)
	path = settings.MEDIA_THUMBNAILS_ROOT + "/img_" + presentation.key + ".png"
	output = open(path, "wb")
	output.write(imgstr.decode('base64'))
	output.close()

	return HttpResponse("")

@login_required(login_url="/")
@csrf_exempt
def upload_image(request):
	""" Uploads an image from a presentation slide to the server
	Returns:
		str: saved filename
	"""
	
	for key, file in request.FILES.items():
		filename = hashlib.sha1(str(datetime.datetime.now())).hexdigest()[:10] + file.name
		path = settings.MEDIA_IMAGES_ROOT + "/" + filename
		dest = open(path, 'w')
		if file.multiple_chunks:
			for c in file.chunks():
				dest.write(c)
		else:
			dest.write(file.read())
		dest.close()
		
	# return the saved filename
	return HttpResponse(filename)

@login_required(login_url="/")
@csrf_exempt
def upload_image_from_url(request):
	""" Uploads an URL image from a presentation slide to the server
	Returns:
		str: saved filename
	"""
	
	url = request.POST["image_url"]
	img = urllib.urlretrieve(url)
	type = img[1].type
	filename = hashlib.sha1(str(datetime.datetime.now())).hexdigest()[:10] + "." + type.split("/")[1]
	if type == "image/jpeg" or type == "image/png" or type == "image/gif":
		shutil.move(img[0], settings.MEDIA_IMAGES_ROOT + "/" + filename)
	 	return HttpResponse(filename)
	else:
		return HttpResponse("false")

def view(request, key):
	"""Shows the presentation"""

	# get the presentation based on its key
	presentation = Presentation.objects.get(key = key)

	if presentation.is_private:
		if not presentation.is_allowed(request.user):
			raise Http404

	# show the presentation preview
	return render_to_response("view.html", {
		"presentation": presentation,
		"slides": presentation.get_slides(),
		}, context_instance=RequestContext(request))

@login_required(login_url="/")
def like(request, id):
	"""Sets a like on the presentation
	Args:
		id (int): Presentation Id
	"""
	try:
		Presentation.objects.get(pk = id).like()
	except ObjectDoesNotExist:
		pass
	
	return HttpResponseRedirect(request.META["HTTP_REFERER"])

@csrf_exempt
def load_featured(request):
	"""Gets the top 6 featured presentation whose the 'num_likes' and 'num_views' are the highest"""

	presentations = Presentation.objects.filter(is_private = False).order_by("num_likes", "num_views")[:6]
	return HttpResponse(serialize("json", presentations))

@csrf_exempt
def search_global(request):
	"""Searches for presentations that matches the text entered on the search bar"""

	presentations = Presentation.objects.filter(is_private = False, name__contains = request.POST["search_text"])[:6]
	return HttpResponse(serialize("json", presentations))

@login_required(login_url="/")
@csrf_exempt
def filter_all(request):
	"""Get all the presentations associated with the user.
	It includes 'own' and 'shared' presentations"""

	presentations = [userpresentation.presentation for userpresentation in request.user.userpresentation_set.get_queryset()]
	return HttpResponse(serialize("json", presentations))


@login_required(login_url="/")
@csrf_exempt
def filter_own(request):
	"""Get all the presentations owned by the user"""

	presentations = [userpresentation.presentation for userpresentation in request.user.userpresentation_set.filter(is_owner = True)]
	return HttpResponse(serialize("json", presentations))


@login_required(login_url="/")
@csrf_exempt
def filter_shared(request):
	"""Get all the presentations that are shared to the user (not owner)"""

	presentations = [userpresentation.presentation for userpresentation in request.user.userpresentation_set.filter(is_owner = False)]
	return HttpResponse(serialize("json", presentations))

@login_required(login_url="/")
@csrf_exempt
def search(request):
	"""Search for presentations"""
		
 	text = request.POST["search_text"]
 	filter = request.POST["selected_filter"]
 	if filter == "all":
	 	presentations = [userpresentation.presentation for userpresentation in request.user.userpresentation_set.filter(presentation__name__contains = text)]
	elif filter == "own":
		presentations = [userpresentation.presentation for userpresentation in request.user.userpresentation_set.filter(presentation__name__contains = text, is_owner = True)]
	elif filter == "shared":
		presentations = [userpresentation.presentation for userpresentation in request.user.userpresentation_set.filter(presentation__name__contains = text, is_owner = False)]
	
	return HttpResponse(serialize("json", presentations))

@login_required(login_url="/")
def share(request, id):
	"""Share the presentation to other users"""

	if request.method == "POST":
		
		presentation = Presentation.objects.get(pk = id)
		
		formset = formset_factory(SharePresentationForm)
		formset = formset(request.POST)
		print formset.cleaned_data

# 		presentation_id = request.POST["presentation_id"]
# 
# 		formset = formset_factory(SharePresentationForm)
# 		formset = formset(request.POST)
# 
# 		if formset.is_valid():
# 			# get the data from the form
# 			for form in formset:
# 				email = form.cleaned_data["email"]
# 				permission = int(form.cleaned_data["permission"])
# 
# 				# get user info based on the email
# 				user = User.objects.filter(email=email).first()
# 				if user is not None:
# 					# create a UserPresentation object that associates a user to a presentation
# 					uspr = UserPresentation(user_id=user.id,
# 											presentation_id=presentation_id,
# 											is_owner=0,
# 											can_edit=permission
# 											)
# 
# 					# save the association to the database
# 					uspr.save()

		# redirect to the same page
		return HttpResponseRedirect(request.META["HTTP_REFERER"])