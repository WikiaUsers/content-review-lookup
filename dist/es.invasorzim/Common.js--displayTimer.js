var refreshDate; function addDate() { var UTCDate = ((new Date()).toUTCString()).replace("GMT", "(UTC)"); $('#showdate').empty().append('<span style="font-weight: bold; text-transform: none;"><a style="color:white;" title="Purgar la caché del servidor y actualizar el contenido de esta página." href="' + wgArticlePath.replace('$1', wgPageName.replace(/ /g, '_')) + '?action=purge">' + UTCDate.substring(5) + '</a></span>'); window.clearTimeout(refreshDate); refreshDate = window.setTimeout(addDate, 1000); } $(document).ready(function() { if (skin == 'oasis') $('<li id="displayTimer"><span id="showdate"></span></li>').appendTo('#GlobalNavigation'); else $('#p-personal ul').prepend('<li><span id="showdate"></span></li>'); addDate(); refreshDate = window.setTimeout(addDate, 1000); $('#displayTimer').css({'font-size': "12px"}); });