/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

importScriptPage('ShowHide/code.js', 'dev');

var ShowHideConfig = { 
    autoCollapse: 3, 
    userLang: false, 
    en: {
	show: "anzeigen",
	hide: "ausblenden",
	showAll: "alle anzeigen",
	hideAll: "alle ausblenden"
    }
};

/* JQuery */
$(document).ready( function(){

$('.toggleElement').slideToggle();

$('.togglebutton').on('click', function () {
  var idt = $(this).attr('id');
  var sym = "#";
  var classn = ".toggleElement";
  var searchStr = classn.concat(sym.concat(idt));
  var tb = $(this).closest('.togglebase');
  tb.find(searchStr).slideToggle();
});

/* Remove link from image*/
var removeImageLinker = $('.noImageLinker');

removeImageLinker.each(function(){
  $(this).append($(this).find('img'));
  $(this).find('a').remove();
});

/* Audio */
/* Link entfernen */

var audio8tn = $('.audioButton');

audio8tn.each(function(){
  $(this).append($(this).find('img'));
  $(this).find('a').remove();
});

/*
if ( $('.audioButton').length > 0){
  var basis = $('.audioButton');
  var imgElement = basis.find('img');
  basis.append(imgElement);
  basis.find('a').remove();
}
*/

$('.audioButton').on('click', function(event){
  var button = $(this);
  
  if (button .css("opacity") == 1.0){
    button.prop( "disabled", true );
    button.fadeTo( "fast" , 0.5);
    var base = button.closest('.audioBase');
    base.find('.ogg_player').find('button').click();
    base.find('.ogg_player').find('audio').trigger('play');
    base.find('.ogg_player').find('audio').bind('ended', function(){
      button.prop( "disabled", false );
      button.css("opacity", 1.0);
    });
  }
  //event.stopPropagation();
});

/* Audio with Volume */
/* Link entfernen */
var audio8voltn = $('.audioButtonVolume');

audio8voltn.each(function(){
  $(this).append($(this).find('img'));
  $(this).find('a').remove();
});

$('.audioButtonVolume').on('click', function(event){
  var button = $(this);
  var label = button.parent().find('.volumeValue');
  if (button .css("opacity") == 1.0){
    button.prop( "disabled", true );
    button .fadeTo( "fast" , 0.5);
    var base = button.closest('.audioBase');
    base.find('.ogg_player').find('button').click();
    base.find('.ogg_player').find('audio').prop("volume",(label.data("value")/100));
    base.find('.ogg_player').find('audio').trigger('play');
    base.find('.ogg_player').find('audio').bind('ended', function(){
      button.prop( "disabled", false );
      button.css("opacity", 1.0);
    
    });
  }
  //event.stopPropagation();
});

/* Change volume display */
$('.volumeButton').on('click', function(event){
    var button = $(this);
    var capt = button.data("change");
    
    var label = button.parent().find('.volumeValue');
    var value = label.data("value");
    var step = 10;
    
    value = value + step*capt;
    
    if (value < 0 ){
        value = 0;
    }
    else if ( value > 100 ) {
        value = 100;
    }
    
    label.data("value", value);
    label.text("Vol: " + value + "%");
});

/* Bilder slider */
/* Link entfernen */

var image8tn = $('.imagerButton');

image8tn.each(function(){
  $(this).append($(this).find('img'));
  $(this).find('a').remove();
});

$('.imagerButton').on('click', function(){
  var base = $(this).parents('.imagerBase');
  var cid = base.data('current');
  cid = cid +1;
  var maxElement = base.data('elements');
  maxElement = maxElement +1;
  if ( cid == maxElement) cid = 0;
  base.data('current', cid);
  var imger = base.find('.imageShower');
  imger.hide();
  var selected = base.find('[data-id="'+cid+'"]');
  selected.show();
  var text = selected.data('text');
  base.find('.imageText').text(text);
});



/* GIF-Editing */
/* Play once to edit */

var gifPlay = $('.videoBase');

gifPlay.each(function(){
    /* Play and rewind to show video */
    $(this).find('.ogg_player').find('button').click();
    $(this).find('video')[0].pause(); 
    $(this).find('video')[0].currentTime = 0;
});

var gifLoop = $('.videoBaseloop');

gifLoop.each(function(){
    /* Set als looping and play */
  $(this).find('video').attr("loop", "1");
  $(this).find('video')[0].play();
});



/*  End on ready*/
});