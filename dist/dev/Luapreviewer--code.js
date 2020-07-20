// <nowiki>
// Lua previewer v1
// By Dessamator
// Previews (as a webpage html) module output printed using mw.log() or print() 
// Todo: 
// add page preview

$(window).load(function() {
    function init(i18n) {
        if (
            wgCanonicalNamespace !=="Module" &&
            wgAction !=="edit"
        ) {
            return;
        }
        $("#mw-scribunto-output").attr("style","white-space:pre-wrap");
        if($(".mw-scribunto-input").length>0){
            $(".mw-scribunto-console-fieldset").find("input").parent().append('<input type="button" id="previewbutton" value="'+ i18n.msg('Preview').escape() +'">');         
            $('<div id="previewconsole"></div>').insertBefore(".mw-scribunto-input");
        }
        $("input#previewbutton").on("click",function(){
            if ($(".mw-scribunto-print").last().length>0){
                mw.loader.using('mediawiki.api', function () {
                    new mw.Api().post({
                        action: 'parse',
                        text: $(".mw-scribunto-print").last().text()
                    }).done(function (data) {
                        if (data.error) {
                            $('#previewconsole').html(data.error);
                            return;
                        }
                        $('#previewconsole').html('<h2>'+ i18n.msg('preview2').escape() +'</h2><br/>'+data.parse.text["*"]+'<br/>');
                    });
                });
            } else {
                $('#previewconsole').html("");
            }
        });
    }
    mw.hook('dev.i18n').add(function(i18no) {
        i18no.loadMessages('Luapreviewer').then(init);
    });
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
});