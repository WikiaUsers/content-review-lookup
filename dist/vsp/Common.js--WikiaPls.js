
/* Wikia Proper Lingual Switcher.
Wikia doesn't have proper language switching, Wikia pls 

This works only on modern browsers that support the 'Mutations' draft spec.
Could be due to change in the future, but since 2012 this has been a thing,
and works well in certain conditions, so it shall be.
Author: Disowned, Inc .
*/
console.log(document.styleSheets);
var languagelist = {};
var langinlist = [];
languagelist['japanese-vsplanguage'] = '日本語 Nihongo';
languagelist['english-vsplanguage'] = 'English';
languagelist['spanish-vsplanguage'] = 'Español';
languagelist['dutch-vsplanguage'] = 'Nederlands';
languagelist['german-vsplanguage'] = 'Deutsch';
languagelist['french-vsplanguage'] = 'Le Français';
languagelist['portuguese-vsplanguage'] = 'Português';
languagelist['italian-vsplanguage'] = 'Italiano';

function htmlEncode(value) {
  return $('<div/>').text(value).html();
}
function htmlDecode(value){
  return $('<div/>').html(value).text();
}
function escapeStr(str)
{
  return str.replace(/([ #;?&,.+*~\':"%!^$[\]()=>|\/@])/g,'\\$1');  
}
function removebackslash(str)
{
  return str.replace(/([\\])/g,''); 
}

var urllang = $(document).getUrlParam("wplslang");
var cleanurllang = null;
if(urllang !== null)
{
    $.map(languagelist, function(value, index){
        var normal_language = index.split('-');
        if(urllang == normal_language[0])
        {
            cleanurllang = '.' + index + '-switch';
            $.map(languagelist, function(value2, index2) {
                $('.' + index2).css('display', 'none');
                $('.' + index).css('display', 'block');
            });
            return false;
        }
        
    });
}
    
$(document).ready(function() {
    
    var $langdiv = $("<div>", {class: htmlEncode("langelements")});
    $("#WikiaPageHeader").append($langdiv);
    
    $.map( languagelist, function( value, index ) {
        if($('.' + index)[0])
        {
            var $langspan = $("<span>", {text: value, class: index + '-switch'});
            $('.langelements').append($langspan);
        }
    });
    
    if(cleanurllang !== null)
    {
        console.log(cleanurllang);
        wpls_switch_language(cleanurllang);
    }
    
    $('.langelements span').on('click', function () {
        wpls_switch_language(this);
    });
    
    
    
});


function wpls_switch_language(e)
{
  var switch_class = $(e).classes()[0];
  var switch_class_mod = switch_class.split("-switch")[0];
  $.map( languagelist, function( value3, index3 ) {
    $("." + index3 + ':visible').fadeOut(125, function() {
        $('.' + switch_class_mod).fadeIn(125);
    });
  });
  
  $('.langelements span').css({
    'text-shadow' : '0 0 0 rgba(0,0,0,0)',
    'color' : 'black'
  });
  
  $('.' + switch_class).css({
    'text-shadow': '0px 0px 1px rgba(255, 25, 239, 1)',
    'color' : 'white'
  });
}


function editorfullyloaded()
{
    var $langdiv = $("<div>", {class: htmlEncode("langelements-editor")});
    $("#EditPageDialog").prepend($langdiv);
    
    $.map( languagelist, function( value, index ) {
        if($('.' + index)[0])
        {
            var $langspan = $("<span>", {text: value, class: index + '-switch'});
            $('.langelements-editor').append($langspan);
        }
    });
    
    $('.langelements-editor span').on('click', function () {
      
      var switch_class = $(this).classes()[0];
      var switch_class_mod = switch_class.split("-switch")[0];
      $.map( languagelist, function( value3, index3 ) {
        $("." + index3 + ':visible').fadeOut(125, function() {
            $('.' + switch_class_mod).fadeIn(125);
        });
      });
      
      $('.langelements-editor span').css({
        'text-shadow' : '0 0 0 rgba(0,0,0,0)',
        'color' : 'black'
      });
      
      $('.' + switch_class).css({
        'text-shadow': '0px 0px 1px rgba(255, 25, 239, 1)',
        'color' : 'white'
      });
    });
    
    console.log('editor fully loaded');
    
}

function addlangchangetoeditor()
{
    var timeout1 = setTimeout( function(){
        $('.mediawiki').off('DOMSubtreeModified propertychange')},
        10000
    );
    
    $('.mediawiki').on('DOMSubtreeModified propertychange', function(e) {
        
        
        if ($(e.target).is("#EditPageDialog")) {
            $('.mediawiki').off('DOMSubtreeModified propertychange');
            
            var timeout2 = setTimeout( function(){
                $('.mediawiki #EditPageDialog .modalContent div').off('DOMSubtreeModified propertychange')},
                10000
            );
            
            $('.mediawiki #EditPageDialog .modalContent div').on('DOMSubtreeModified propertychange', function(e1) {
                
                if ($(e1.target).hasClass("ArticlePreviewInner")) {
                    $('.mediawiki #EditPageDialog .modalContent div').off('DOMSubtreeModified propertychange');
                    
                    var timeout3 = setTimeout( function() {
                        $('.mediawiki #EditPageDialog .modalContent div .ArticlePreviewInner').off('DOMNodeInserted')},
                        15000
                    );
                    
                    $('.mediawiki #EditPageDialog .modalContent div .ArticlePreviewInner').on('DOMNodeInserted', function(e2) {
                        clearTimeout(timeout1);
                        clearTimeout(timeout2);
                        clearTimeout(timeout3);
                        $('.mediawiki #EditPageDialog .modalContent div .ArticlePreviewInner').off('DOMNodeInserted');
                        editorfullyloaded();
                    
                    });
                }
            });
        }
    });
}


$(document).ready(function() {
    if($('#editform').length)
    {
        $('#wpPreview').on('click', function() {
            addlangchangetoeditor();
        });

        $('.preview_desktop').on('click', function() {
            addlangchangetoeditor();
        });
    }
});