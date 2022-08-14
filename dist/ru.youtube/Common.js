importArticles({
    type: "script",
    articles: [ 
        'MediaWiki:Custom-forms.js',
  ]
});

// Открывает страницу создания статьи в режиме исходного кода через InputBox
$(function(){
  $('form.createbox').append('<input type="hidden" name="useeditor" value="source" />');
});



//смотреть видео YouTube (что соответствует тематики вики) прямо на сайте, под статьей про видео
if (document.getElementsByClassName('youtubewiki2_video_link').length > 0) {
	document.getElementById('mw-content-text').innerHTML += '<iframe id="yt_video" style="width: 100%;" src="https://www.youtube.com/embed/' + document.getElementsByClassName('youtubewiki2_video_link')[0].textContent + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
	var ppp = setInterval(function() {document.getElementById('yt_video').style.height = (document.getElementById('yt_video').offsetWidth / 16 * 9) + 'px';}, 10);
}