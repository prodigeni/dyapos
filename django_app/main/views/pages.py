# encoding: utf-8

from main.forms.presentation import *
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect


def index(request):
	"""Show the main page"""
	
	if request.user.is_authenticated():
		if request.path == "/":
			# show the user's home page
			return HttpResponseRedirect("/home")

	return render_to_response('index.html', context_instance=RequestContext(request))


@login_required(login_url="/")
def home(request):
	"""Show logged user's home page"""

	form = NewPresentationForm()
	return render_to_response("home.html", {"form":form}, context_instance=RequestContext(request))
