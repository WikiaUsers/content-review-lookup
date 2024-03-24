var mainSlider = document.getElementById("gallery-main-slider");
if (mainSlider){
	var refactored = mainSlider.innerHTML.replace("<pre>","").replace("</pre>","");
	var images = refactored.split(',');
	mainSlider.innerHTML = "";
	for (i = 0; i < images.length; i++) {
	    	if (images[i].includes("youtube")) {
	      	var imageDiv = document.createElement('div');
	        imageDiv.setAttribute("class", "gallery-mySlides gallery-fade");
	        imageDiv.innerHTML = "<div class='gallery-numbertext'>"+ (i+1) +"/"+ images.length +"</div><iframe width='670' height='376' src="+ images[i] +" frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>";
	        mainSlider.appendChild(imageDiv);
	      } else {
	        var imageDiv = document.createElement('div');
	        imageDiv.setAttribute("class", "gallery-mySlides gallery-fade");
	        imageDiv.innerHTML = "<div class='gallery-numbertext'>"+ (i+1) +"/"+ images.length +"</div><img src="+ images[i] +" style='width:670px;height:376px;object-fit:contain;'>";
	        mainSlider.appendChild(imageDiv);
	      }
	}
	var prevButton = document.createElement('a');
	prevButton.setAttribute("class", "gallery-prev");
	prevButton.setAttribute("id", "prevbtn");
	prevButton.innerHTML = "&#10094;";
	mainSlider.appendChild(prevButton);
	var nextButton = document.createElement('a');
	nextButton.setAttribute("class", "gallery-next");
	nextButton.setAttribute("id", "nextbtn");
	nextButton.innerHTML = "&#10095;";
	mainSlider.appendChild(nextButton);
	    
    nextButton.addEventListener("click", function() {
    	plusSlides(1);
    });
    prevButton.addEventListener("click", function() {
    	plusSlides(-1);
    });
	var slideIndex = 1;
	showSlides(slideIndex);
	  
	function plusSlides(n) {
	    showSlides(slideIndex += n);
	}
	function showSlides(n) {
	    var i;
	    var slides = document.getElementsByClassName("gallery-mySlides");
	    if (n > slides.length) {slideIndex = 1;}    
	    if (n < 1) {slideIndex = slides.length;}
	    for (i = 0; i < slides.length; i++) {
	        slides[i].style.display = "none";  
	    }
	    slides[slideIndex-1].style.display = "block";  
	}
}


/****************************************/
/* sliders */
/****************************************/
mw.loader.using( ['jquery.cookie']);
 
/****************************************/
/* sliders  */
/****************************************/
mw.loader.using( ['jquery.ui'], function() {
  $( "[class^=portal_vtab]" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
  $( "[class^=portal_vtab] li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
 
  var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
  $("[class*=portal_sliderlink]").click(function() { // bind click event to link
    $tabs.tabs('select', this.className.match(/portal_sliderlink-(\d+)/)[1]);
    console.log("Sliding to " + this.className.match(/portal_sliderlink-(\d+)/)[1]);
    return false;
  });
  $('#portal_next').click(function() {
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length'))-1) ? 0 : $tabs.tabs('option', 'selected') + 1 ); // switch to next tab
    return false;
  });
  $('#portal_prev').click(function() { // bind click event to link
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == 0) ? ($tabs.tabs('length')-1) : $tabs.tabs('option', 'selected') - 1 ); // switch to previous tab
    return false;
  });
});

mw.hook('wikipage.content').add(function($content) {
    if (!$content) {
        return;
    }
    $content.find('[data-widget-id]:not(.loaded)').each(function() {
        var $this = $(this),
            id = encodeURIComponent($this.attr('data-widget-id')),
            css = {
                width: 'inherit',
                height: 'inherit'
            };
        switch($this.attr('class')) {
            case 'Crackle':
                $this.html(
                    $('<iframe>', {
                        // Phalanx block #430446
                        src: 'https://www.crack' + 'le.com/embed/' + id,
                        css: css,
                        frameborder: 0,
                        scrolling: 'no',
                        allowfullscreen: true
                    })
                );
                break;
            case 'Facebook':
                $this.html(
                    $('<iframe>', {
                        src: 'https://www.facebook.com/video/embed?video_id=' + id,
                        frameboder: 0,
                        width: $this.attr('data-width') || 1280,
                        height: $this.attr('data-height') || 720
                    })
                 );
                break;
            case 'myvi':
                $this.html(
                    $('<iframe>', {
                        src: 'https://myvi.ru/player/embed/html/' + id,
                        css: css,
                        frameborder: 0,
                        allowfullscreen: true
                    })
                   );
                break;
            case 'fembed':
                $this.html(
                    $('<iframe>', {
                        src: 'https://femax20.com/v/' + id,
                        css: css,
                        frameborder: 0,
                        allowfullscreen: true
                    })
                );
                    break;
            case 'ok.ru':
                $this.html(
                    $('<iframe>', {
                        src: 'https://ok.ru/videoembed/' + id,
                         frameborder: 0,
                        css: css
                    }) 
                );
                break;
            case 'Vine':
                $this.html(
                    $('<iframe>', {
                        src: 'https://vine.co/v/' + id + '/embed/simple',
                        css: css
                    })
                );
                break;
            case 'afreeca':
                $this.html(
                    $('<iframe>', {
                        src: 'https://play.afreecatv.com/' + id + '/embed',
                        css: css,
                        frameborder: 0,
                        allowfullscreen: true
                    })
                );
                break;
            case 'internetArchive':
                $this.html(
                    $('<iframe>', {
                        src: 'https://archive.org/embed/' + id,
                        css: css,
                        frameboder: 0,
                        allowfullscreen: true
                    })
                );
                break;
            case 'web.tv':
                $this.html(
                    $('<iframe>', {
                        src: 'https://fandomcntr.web.tv/embed/' + id,
                         frameborder: 0,
                        css: css,
                        autoplay: 0,
                        allowfullscreen: true

                    })
                );
                break;
            case 'YahooTV':
                $this.html(
                    $('<iframe>', {
                        src: 'https://www.yahoo.com/tv/v/' + id + '?format=embed',
                        css: css,
                        allowfullscreen: true,
                        allowtransparency: true
                    })
                );
              break;
            case 'YoutubePlaylist':
                $this.html(
                    $('<iframe>', {
                        src: 'https://www.youtube.com/embed/' + id + '?list=' + encodeURIComponent($this.attr('data-list-id')),
                        css: css,
                        frameboder: 0,
                        allowfullscreen: true
                    })
                );
                break;
            case 'WikimediaCommons':
                $this.html(
                    $('<iframe>', {
                        src: 'https://commons.wikimedia.org/wiki/File%3A' + id + '?embedplayer=yes',
                        css: css,
                        frameborder: 0
                    })
                           );
                break;
            case 'Sibnet':
                $this.html(
                    $('<iframe>', {
                        src: 'https://video.sibnet.ru/shell.php?videoid=' + id + '&share=0',
                        css: css,
                        frameborder: 0,
                        allowfullscreen: true
                    })
                );
                break;
            case 'funnyordie':
                $this.html(
                    $('<iframe>', {
                        src: 'https://www.funnyordie.com/embed/' + id,
                        css: css,
                        frameborder: 0,
                        allowfullscreen: true
                    })
                );
                 break;
            case 'viloud':
                $this.html(
                    $('<iframe>', {
                        src:'//app.viloud.tv/player/embed/video/' + id,
                        css: css,
                        frameborder: 0,
                        scrolling: 'no',
                        height: '100%',
                        width: '100%'
                    })
                );
                break;
            case 'TwitchStream':
                $this.html(
                    $('<iframe>', {
                        src: 'https://player.twitch.tv/?channel=' + id + '&parent=' + window.location.hostname,
                        css: css,
                        frameborder: 0,
                        scrolling: 'no',
                        height: 378,
                        width: 620
                    })
                );
                break;
            case 'ellenTube':
                $this.html(
                    $('<iframe>', {
                        src: 'https://widgets.ellentube.com/videos/' + id + '/',
                        css: css,
                        frameborder: 0,
                        allowfullscreen: true
                    })
                );
                break;
            case 'fandom':
                // TODO: FANDOM has switched to JWPlayer instead of Ooyala and there's a <jwplayer> parser tag
                $this.html(
                    $('<iframe>', {
                        src: 'https://player.ooyala.com/iframe.html' + id + '&docUrl=' + encodeURIComponent(window.location.href),
                        css: css,
                        allowfullscreen: true
                    })
                );
                break;
            case 'logo':
                $this.html(
                    $('<iframe>', {
                        src: 'https://media.mtvnservices.com/embed/mgid:arc:video:logotv.com:' + id,
                        frameborder: 0,
                        allowfullscreen: true,
                        css: {
                            width: '520px',
                            height: '288px'
                        }
                    })
                );
                break;
            case 'niconico':
                $this.html(
                    $('<iframe>', {
                        src: 'https://embed.nicovideo.jp/watch/' + id,
                        frameborder: 0,
                        allowfullscreen: true,
                        scrolling: 'no',
                        css: $.extend(css, {
                            border:'solid 1px #ccc'
                        })
                    })
                );
                break;
            case 'periscope':
                $this.html(
                    $('<iframe>', {
                        src: 'https://www.periscope.tv/' + id,
                        css: css
                    })
                );
                break;
        }
        $this.addClass('loaded');
    });
});