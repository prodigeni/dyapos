# encoding: utf-8

from django.http.response import HttpResponse
from main.models.theme import Theme
from main.models.presentation import Presentation
from django.shortcuts import render_to_response
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.template.context import RequestContext
from django.core.serializers import serialize


@csrf_exempt
def load_list(request):
    """Load a list of themes. It also loads your custom themes"""
    
    if request.user.is_authenticated():
        # NOTE: it will be modified later for filtering custom themes according to the user
        themes = Theme.objects.filter(is_custom=0)
    else:
        themes = Theme.objects.filter(is_custom=0)
    
    return HttpResponse(serialize("json", themes))

def preview(request, id):
    """Render a preview of the theme according to the passed ID
    Args:
        id (int): Theme Id
    """
    
    return render_to_response("theme-preview.html", {"theme_id": id }, context_instance=RequestContext(request))

@login_required(login_url="/")  
@csrf_exempt  
def set(request):
    """Set a presentation theme from the list"""
    
    presentation = Presentation.objects.get(id = request.POST["presentation_id"])
    presentation.theme_id = request.POST["theme_id"]
    presentation.save()
    return HttpResponse("")
