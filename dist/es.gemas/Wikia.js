importArticles({
    type: 'script',
    articles: [
        'u:dev:NewImages.js',
        'u:dev:TopEditors/code.js'
    ]
});

// Editar introducción de los artículos
EditIntroButtonText = 'Editar introducción';

// Menúes desplegables con hover
window.AutoEditDropdownConfig = {
    expandedAreaContribute: true,
    expandedAreaEdit: true
};

/*No comentarios en entradas de blog viejas(30 días)*/
window.LockOldBlogs = {
    expiryDays: 30,
    expiryMessage: "Este blog ha esto inactivo 30 días, por lo cual ya no se puede comentar",
    nonexpiryCategory: "Blogs permanentes"
};
 
$('a[href*="youtu.be"]').on('click', function(){
    if ($(".blackout")[0]){
        return false;
    } else {
        var id = $(this).attr('href').split('.be/')[1].split('?')[0];
        $('body').prepend('<div class="blackout"><span id="youtube-modal-close" class="material-icons">close</span></div><div class="youtube-modal" style="width: 800px; height: 450px;  background: black"><iframe style="width:100%; height:100%" src="http://www.youtube.com/embed/' + id + '?autoplay=1&rel=0" allowfullscreen></iframe></div>');
        $('#youtube-modal-close').on('click', function() {
            $(".blackout, .youtube-modal").remove();
        });
        return false;
    }
});
$('a[href*="youtube.com/watch"]').on('click', function(){
    if ($(".blackout")[0]){
        return false;
    } else {
        var id = $(this).attr('href').split('?v=')[1].split('&')[0];
        $('body').prepend('<div class="blackout"><span id="youtube-modal-close" class="material-icons">close</span></div><div class="youtube-modal" style="width: 800px; height: 450px;  background: black"><iframe style="width:100%; height:100%" src="http://www.youtube.com/embed/' + id + '?autoplay=1&rel=0" allowfullscreen></iframe></div>');
        $('#youtube-modal-close').on('click', function() {
            $(".blackout, .youtube-modal").remove();
        });
        return false;
    }
});