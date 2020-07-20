/**
 * Name:        Flags ( *Modded to use big flags from u:flags*)
 * Link to ori: http://dev.wikia.com/wiki/MediaWiki:Flags
 * Description: A snippet for easy adding images of certain languages into wiki
 *              pages without uploading those files
 * Author:      KockaAdmiralac <1405223@gmail.com>
 * Modded:      Qoushik
 */
$(function()
{
    $(".flag-icon").each(function(supercalifragilisticexpialidocious, el)
    {
        el = $(el);
        el.html(mw.html.element('img', {
            src: "http://flags.wikia.com/wiki/Special:FilePath/File:" + el.data().lang + el.data().type,
            width: el.data().width,
            title: el.text()
        }, ""));
    }.bind(this));
});