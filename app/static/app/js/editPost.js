const contentContainer = document.getElementById("contentContainer");
let numBlocks = 1;

// Функция создания кнопки удаления блока
function create_remote_but() {
    const btn = document.createElement("button");
    btn.textContent = "×"; // крестик
    btn.className = "remove-btn";
    btn.type = "button";
    btn.title = "Удалить блок";
    btn.addEventListener("click", (e) => {
    const block = e.target.closest(".content-block");
    if(block){
        block.remove();
    }
    });
    return btn;
}

// Добавление текстового блока (редактируемый div)
function add_text_block() {
    
    // наполнение
    const titleSection = document.createElement('input');
    titleSection.classList = 'title-block';
    titleSection.type = 'text';
    titleSection.name = `tit_${numBlocks}`;

    const text = document.createElement('textarea');
    text.name = `text_${numBlocks}`;
    text.classList = 'text-block';

    contentContainer.appendChild(titleSection);
    contentContainer.appendChild(text);

    numBlocks++;
    // Прокрутка вниз к новому блоку
    block.scrollIntoView({behavior: "smooth", block: "center"});
}

// Добавление медиа
function add_media_block() {
    
    // наполнение
    const titleSection = document.createElement('input');
    titleSection.classList = 'title-block';
    titleSection.type = 'text';
    titleSection.name = `tit_${numBlocks}`;

    // медиа блок - квази-кастомный-блок и  скрытый fileinput
    // <input type="file" name="media_1" class="hidden-file"></input>
    const quasi = document.createElement('label');
    quasi.id = `quasiInputFile_${numBlocks}`;
    quasi.classList = 'file-upload';
    quasi.innerHTML = '<span class="button-text">Выбрать файл</span>\n';
    quasi.innerHTML += '<span class="file-name" id="fileName">Файл не выбран</span>'
    
    const hiddenInput = document.createElement('input');
    hiddenInput.type = 'file';
    hiddenInput.name = `media_${numBlocks}`;
    hiddenInput.classList = 'hidden-file';


    contentContainer.appendChild(titleSection);
    contentContainer.appendChild(quasi);
    contentContainer.appendChild(hiddenInput);

    numBlocks++;
    // Прокрутка вниз к новому блоку
    block.scrollIntoView({behavior: "smooth", block: "center"});
}

// Добавление блока с изображением
function add_image_block() {
    const imageUrl = prompt("Введите URL изображения:");
    if(imageUrl && imageUrl.trim() !== ""){
    // Вставляем картинку с фигкэпшеном (чтобы можно было добавить подпись вручную, сделаем contenteditable)
    const block = document.createElement("figure");
    block.className = "content-block image";
    block.setAttribute("aria-label", "Блок с изображением");

    const img = document.createElement("img");
    img.src = imageUrl.trim();
    img.alt = "Добавленное изображение";
    img.onerror = () => {
        alert("Не удалось загрузить изображение. Проверьте URL.");
        block.remove();
    };

    const figcaption = document.createElement("figcaption");
    figcaption.setAttribute("contenteditable", "true");
    figcaption.setAttribute("aria-label", "Подпись к изображению");
    figcaption.textContent = "Введите подпись к изображению";

    block.appendChild(img);
    block.appendChild(figcaption);
    block.appendChild(create_remote_but());
    contentContainer.appendChild(block);
    figcaption.focus();
    block.scrollIntoView({behavior: "smooth", block: "center"});
    }
}

// Добавление блока с видео (youtube)
function add_video_block() {
    const videoUrl = prompt("Введите YouTube URL или ID видео:");
    if(videoUrl && videoUrl.trim() !== ""){
    // Универсально извлечем ID ролика из ссылки или используем как есть
    const id = extractYouTubeID(videoUrl.trim());

    if(!id){
        alert("Некорректный URL или ID видео YouTube.");
        return;
    }

    const block = document.createElement("section");
    block.className = "content-block video";
    block.setAttribute("aria-label", "Видео блок");

    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${id}`;
    iframe.title = "Видео YouTube";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;

    block.appendChild(iframe);
    block.appendChild(create_remote_but());
    contentContainer.appendChild(block);
    block.scrollIntoView({behavior: "smooth", block: "center"});
    }
}

// Функция извлечения ID видео из ссылки YouTube
// Работает с форматами:
// https://www.youtube.com/watch?v=ID
// https://youtu.be/ID
// ID
function extractYouTubeID(url) {
    // если это просто ID (11 символов)
    if(/^[\w-]{11}$/.test(url)){
    return url;
    }
    // Подробный разбор
    let regExp = /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    let match = url.match(regExp);
    return (match && match[1].length === 11) ? match[1] : null;
}

function send_form() {
    document.getElementById('contentContainer').submit()
}


$(document).on('change', '.hidden-file', function() {
    const id_fileload = this.name.split('_')[1];
    
    // найти файл с этим же id и изменить надписи
    const quasi = document.getElementById(`quasiInputFile_${id_fileload}`);
    quasi.querySelector('.button-text').innerHTML = 'Готово';
    quasi.querySelector('.file-name').innerHTML = this.files[0].name;;
})
$(document).on('click', '.file-upload', function() {
    const id_fileload = this.id.split('_')[1];
    
    // найти файл с тем же id и симитировать нажатие
    document.getElementsByName(`media_${id_fileload}`)[0].click();
});

// Обработчики кнопок
document.getElementById("addTextBtn").addEventListener("click", add_text_block);
document.getElementById("addMediaBtn").addEventListener("click", add_media_block);
// document.getElementById("addImageBtn").addEventListener("click", add_image_block);
// document.getElementById("addVideoBtn").addEventListener("click", add_video_block);
document.getElementById("sendForm").addEventListener("click", send_form);
