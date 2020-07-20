/**
 * __NOWYSIWYG__
 * [[Category:Script|{{SUBPAGENAME}}]]
 **/
$(function(){

var _title = $('#WikiaPageHeader h1, h1#firstHeading, #wkMainCntHdr h1').eq(0);
var _new = $('#displaytitle').eq(0);

if (_new.size() && _new.text() && (_title.text() != _new.text()))
{
_title.html(_new.html());
}

});