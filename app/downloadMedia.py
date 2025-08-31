import asyncio
from os import makedirs

async def save_media(request, path_to_file, pk):
    # Создать директорию, если она нужна
    try:
        makedirs(f'media/images/{path_to_file}')
    except:
        pass
    
    # сохранить файлы
    for filename in request.FILES:
        idBlock = filename.split('_')[1]
        file_format = request.FILES[filename].name[-4:]
        name_f = f'media_{pk}_{idBlock}{file_format}'

        # Сохраняю файл 
        with open(f'media/images/{path_to_file}/{name_f}', 'wb+') as file_img:
            for chunk in request.FILES[filename].chunks():
                file_img.write(chunk)
    
    
    
    
    