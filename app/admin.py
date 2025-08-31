# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from .models import Post, ContentPost
import logging

# Register your models here.

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    change_form_template = 'admin/changePost.html'
    
    search_fields = ('title', )


    exclude = ('countView', )
    readonly_fields = ('autor', )

    def save_model(self, request, obj, form, change):
        obj.autor = request.user
        return super().save_model(request, obj, form, change)


admin.register(ContentPost)
