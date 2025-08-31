from django.shortcuts import redirect
from django.urls import reverse
from django.views.generic import TemplateView, ListView
from django.http import JsonResponse, HttpResponseRedirect
from django.db.models import F
from .models import *
from datetime import datetime
from .downloadMedia import save_media
import asyncio



# Доменное имя
class Index_view(TemplateView):
    template_name = 'app/index.html'

class Posts_view(ListView):
    paginate_by = 2
    model = Post

    template_name = 'app/posts.html'


class EditPost_view(TemplateView):
    template_name = 'app/editPost.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = Post.objects.get(pk=self.kwargs['pk'])
        return context

class ContentPost_view(TemplateView):
    template_name = 'app/contentPost.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        pk = self.kwargs['pk']

        context['title'] = Post.objects.get(pk=pk)

        # увеличить просмотры
        Post.objects.filter(pk=pk).update(countView=F('countView')+1)

        # подгрузить все блоки с этим id
        context['blocks'] = ContentPost.objects.filter(post_id=pk)
        return context

def save_edition(request, pk):
    DT = datetime.now()
    path_to_file = f'{DT.year}/{DT.month}/{DT.day}'

    typeContent_loc = {'med' : 'media',
                   'tex' : 'text'} 
    
    def createObjModel(title, value, id=None):
        if id == None:
            id = block_i.split('_')[1]

        typeCont = typeContent_loc[value[:3]]

        # создать value
        if value in request.POST:
            value = request.POST[value]
        else: #media
            file_format = request.FILES[value].name[-4:]
            
            value = f'{path_to_file}/media_{pk}_{id}{file_format}'


        # создать obj
        block = ContentPost(
            title=request.POST[title],
            value=value,
            typeContent=typeCont,
            pos=id,
            post_id=pk
        )
        return block

    if request.method == 'POST':

        # загрузить файлы асинхронно
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        if len(request.FILES):
            loop.run_until_complete(save_media(request, path_to_file, pk))
        
        # записи в БД
        blocksModel = []
        blocks_elems = list(request.POST)[1:] # исключить scrf
        for block_i in blocks_elems:
            if block_i[:3] == 'tit': #заголовок
                title = block_i

                # если подгружено медиа. Медиа нет в POST
                id = title.split('_')[1]
                if f'media_{id}' in request.FILES: # сохранить
                    blocksModel.append(createObjModel(title, f'media_{id}', id))

            
            else:
                blocksModel.append(createObjModel(title, block_i))
    
        # сохранить все объекты разом
        ContentPost.objects.bulk_create(blocksModel)

    response = {
        'serv_ans' : 'ok'
    }

    return HttpResponseRedirect(reverse('urln_showPost', args=[pk]))