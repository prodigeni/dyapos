# encoding: utf-8

import datetime, hashlib
from main.forms.user import *
from django.shortcuts import render_to_response
from django.http import HttpResponseRedirect, HttpResponse
from django.template import RequestContext
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.forms.forms import NON_FIELD_ERRORS


def signup(request):
	"""Register a new user"""
  	return HttpResponse("<h2>Not available yet. Coming soon :)</h2>")
	
	if request.method == "POST":
		form = SignupForm(request.POST)
		if form.is_valid():
			'''Generate a random username (format: username + underscore + random md5 string).
			username is not so important, because users log in with their email address'''
			username = form.cleaned_data["email"].split("@")[0] + "_" + hashlib.md5(str(datetime.datetime.now())).hexdigest()[:5]
			
			user = User(username = username,
						first_name = form.cleaned_data["first_name"],
						last_name = form.cleaned_data["last_name"],
						email = form.cleaned_data["email"],
						is_superuser = 0,
						is_active = 1,
						is_staff = 0)
			
			# set the password using a cryptographic algorithm
			user.set_password(form.cleaned_data["password"])
			user.save()
			
			# redirect to main page
			return HttpResponseRedirect("/")
		else:
			return render_to_response("signup.html", { "form": form }, context_instance=RequestContext(request))

	# show signup form
	return render_to_response("signup.html", { "form": SignupForm() }, context_instance=RequestContext(request))

def user_login(request):
	"""User login"""

	# if data are received from the form
	if request.method == "POST":
		form = LoginForm(request.POST)
		if form.is_valid():
			user = authenticate(username = form.cleaned_data["email"],
								password = form.cleaned_data["password"])

			login(request, user)

			# redirect to user's home page
			return HttpResponseRedirect("/home")

	return render_to_response("login.html", {'form': LoginForm()}, context_instance=RequestContext(request))

@login_required(login_url="/")
def user_logout(request):
	"""Close user session"""

	logout(request)
	return HttpResponseRedirect("/")

def recover_password(request):
	"""Sends a recovery password email to the user. it's send's a
	reset a reset password link to the user"""

	if request.method == "POST":
		form = RecoverPasswordForm(request.POST)
		if form.is_valid():
			send_mail("Password recovery",
					  "If you forgot your password, you can reset on the following link: ",
					  "",
					  [form.cleaned_data["email"]],
					  fail_silently = False)

			# return to main page
			return HttpResponseRedirect("/")
		else:
			return render_to_response("recover_password.html", {'form': form}, context_instance=RequestContext(request)) 
		
	return render_to_response("recover_password.html", {'form': RecoverPasswordForm()}, context_instance=RequestContext(request))

@login_required(login_url="/")
def profile(request):
	"""Shows and updates user's profile data"""

	if request.method == "POST":
		form = ProfileForm(request.POST)
		if form.is_valid():
			print form.cleaned_data
			# check if the email address is already used for another user
			if not User.objects.filter(email = form.cleaned_data["email"]).exclude(id = request.user.id):
  				request.user.first_name = form.cleaned_data["first_name"]
  				request.user.last_name = form.cleaned_data["last_name"]
  				request.user.email = form.cleaned_data["email"]
  				request.user.save()
 
				# redirect to home page
				return HttpResponseRedirect("/profile")
			else:
				return render_to_response("profile.html", {"form": form}, context_instance=RequestContext(request))

	# show the profile page
	return render_to_response("profile.html", {"form": ProfileForm(instance = request.user)}, context_instance=RequestContext(request))


@login_required(login_url="/")
def change_password(request):
	"""Change the user's password"""

	if request.method == "POST":
		form = ChangePasswordForm(request.POST)
		if form.is_valid():
			# Check if old password is correct
			if authenticate(username = request.user.email,
							password = form.cleaned_data["old_password"]):

				# hash the new password using a cryptographic algorithm
				request.user.set_password(form.cleaned_data["new_password"])

				# update user with the new password to the database
				request.user.save()

				return HttpResponseRedirect("/profile")
			else:
				form.non_field_errors = "Your old password is incorrect"
				return render_to_response("change_password.html", {'form':form}, context_instance=RequestContext(request))
		else:
			return render_to_response("change_password.html", {'form':form}, context_instance=RequestContext(request))
	else:
		form = ChangePasswordForm()

	# show change password form
	return render_to_response("change_password.html", {'form':form}, context_instance=RequestContext(request))

@login_required(login_url="/")
def delete(request):
	"""Delete the user account including all its data and presentation"""
	
	userpresentations = request.user.userpresentation_set.filter()

	# delete every related presentation
	for userpresentation in userpresentations:
		if userpresentation.is_owner:
			# Delete the presentation completely
			userpresentation.presentation.delete_completely()
		else:
			# Delete only the relation between the user and the presentation
			userpresentation.delete()

	# delete user from database
	request.user.delete()

	# redirect to index
	return HttpResponseRedirect("/")