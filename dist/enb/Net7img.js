/**
 * This script is a work-around for Wikia blocking external images.
 * It allows images from (and only from) www.net-7.org, the official
 * site of the (emulated) game.
 *
 * Any span tag with a class of "net7image" and a "data-src" attribute
 * is replaced with a corresponding image.
 *
 * See http://enb.wikia.com/wiki/Template:Net7img for a template
 * that makes this easier to use.
 *
 * TO DISABLE, edit http://enb.wikia.com/wiki/Special:MyPage/common.js
 * and add:
 *   window.net7img_version=9999;
 *
 * Version history:
 * v3  Added gif to support image types, version tagging
 * v2  Fixes to work in IE
 * v1  Initial deployment
 */
(function(){
  var VERSION=3;
  if(typeof(window.net7img_version)==='undefined'||window.net7img_version===null
     ||(window.net7img_version!==false&&window.net7img_version<VERSION) ) {
    window.net7img_version=VERSION;
  }

  $(document).ready(function() {
    if(window.net7img_version===VERSION) {
      $.proxy(run,this)();
    }
  });

  function run() {
    $("span.net7image").replaceWith(function() {
      var img=document.createElement("img");
      if(typeof($(this).attr("data-class"))!=='undefined') {
        $(img).addClass($(this).attr("data-class"));
      }
      if(typeof($(this).attr("data-style"))!=='undefined') {
        $(img).attr('style',$(this).attr("data-style"));
      }
      if(typeof($(this).attr("data-alt"))!=='undefined') {
        $(img).attr('alt',$(this).attr("data-alt"));
      }
      if(typeof($(this).attr("data-width"))!=='undefined') {
        $(img).attr('width',$(this).attr("data-width"));
      }
      if(typeof($(this).attr("data-height"))!=='undefined') {
        $(img).attr('height',$(this).attr("data-height"));
      }
      if(typeof($(this).attr("data-src"))!=='undefined') {
        var src="http://www.net-7.org/"+$(this).attr("data-src");
        if(src.indexOf("?")==-1&&
           (src.search(".png$")>=0||src.search(".jpg")>=0||src.search(".gif")>=0) ) {
          $(img).attr('src',src);
          $(img).attr('data-net7imgVer',VERSION);
        } else {
          img=this; //no replace
        }
      }
      return img;
    });
  }
})();