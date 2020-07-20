/* Custom "NewFilesModule" by 452 - displays [[Special:NewFiles]] in the right rail
   There are three ways to use this, by setting the NewFilesModuleCompact variable
   0 - Normal, width is 212
   1 - Compact, width is 106
   2 - Random, if you're not sure which version you like best.
 
   In both modes, hovering over each displays the uploader info.
 
   NewFilesModuleCount can be used to specify the number of displayed images.
*/
var NewFilesModuleCompact = 1; //must be 0, 1, or 2.
var NewFilesModuleCount = 6; //any integer
 
if ($('#WikiaRail').length) { //only on pages where the rail is present
  $('#WikiaRail').bind('DOMNodeInserted', function(event) { //fires after lazy-loading takes place.
    if (!$("#NewFilesModule").length) { // Only add it ''once''
      if (typeof $temp == "undefined") { // Only load it ''once''
        $temp = $('<div>'); // this line, and the next, originate from http://dev.wikia.com/wiki/AjaxRC/code.js <3
        $temp.load("/Special:NewFiles/" +NewFilesModuleCount + " #gallery-", function () {
          $('#WikiaRail section:last-of-type').after("<section id='NewFilesModule' class='module'><h1><a href='/Special:NewFiles'>New Files</a><a class='wikia-button' href='/Special:Upload'>Upload</a></h1>");
          if (typeof NewFilesModuleCompact == "undefined") NewFilesModuleCompact = 0;
          if (NewFilesModuleCompact == 2) NewFilesModuleCompact = Math.floor(Math.random()*2);
          if (NewFilesModuleCompact) {
            $('#gallery-', $temp).html($('#gallery-', $temp).html().replace(/\/scale-to-width\/\d*\?/g, "/scale-to-width/106?"));
            $("#NewFilesModule").addClass("compact");
          }
          $("#NewFilesModule").append($('#gallery-', $temp));
          $("#NewFilesModule .wikia-photogallery-add").remove();
          $("#NewFilesModule .wikia-gallery-item").each(function() { $(".lightbox-caption", this).prepend($("<a>").attr("href",$(".gallery-image-wrapper>a", this).attr("href")).html($(".gallery-image-wrapper>a", this).attr("title")).append($("<br>")));});
          delete $temp; //delete it, in case the rail is wiped after this point.
        });
      }
    }
  });  //end of DOMNodeInserted block
   $('head').append('<style type="text/css">\n#gallery- { position:relative;overflow-y:auto; clear: both; text-align:center; height:452px; }\n#gallery-:hover {padding-bottom: 13em; }\n#NewFilesModule .gallery-image-wrapper { top: 0 !important; height: auto !important; border:none;  background: none; }\n#NewFilesModule.compact .gallery-image-wrapper { width: auto !important; }\n#NewFilesModule .thumb { height:auto !important; }\n#NewFilesModule .wikia-gallery-item { margin: 1px !important; padding: 0 !important; height: auto !important; border: none !important; }\n#NewFilesModule.compact .wikia-gallery-item { width: auto !important; }\n#NewFilesModule .wikia-gallery-item .lightbox-caption { display: none; }\n#NewFilesModule .wikia-gallery-item:hover .lightbox-caption { display:block; padding: 5px; margin-top: 0; position: absolute; border: 1px solid; background-color: #fff; z-index: 2; right: 0; width: 240px !important; }\n#NewFilesModule h1 {margin: 0 2em 0 0;}\n#NewFilesModule h1 a:first-child {color:inherit;}\n#NewFilesModule img { display: block; height: auto !important; width: auto !important; margin-left: auto !important; margin-top: auto !important;}\n.wikia-gallery-item .gallery-image-wrapper a { width: auto !important; height: auto !important; }\n.wikia-gallery-item .gallery-image-wrapper a.image-no-lightbox { line-height: normal; display: block; padding: 1em; }\n</style>');
 
} // End of custom "NewFilesModule"