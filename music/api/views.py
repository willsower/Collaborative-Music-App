from django.shortcuts import render, HttpResponse
# from django.http import HTTPResponse

# Create your views here.
def main(request):
    return HttpResponse("<h1>Hello</h1>")
