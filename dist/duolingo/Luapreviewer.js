// Lua previewer v1
// By Dessamator
// Previews (as a webpage html) module output printed using mw.log() or print()
//Todo:
//add page preview
$(window)
    .load(function () {
        "use strict";
        var namespace = mw.config.get('wgCanonicalNamespace');
        var action = mw.config.get('wgAction');
        mw.log("test");
        if (namespace === "Module" && action === "edit" && $("input#previewbutton")
            .length < 1) {
            //Fix for chrome line wrap for module console output
            $("#mw-scribunto-output")
                .attr("style", "white-space:pre-wrap");
            if ($(".mw-scribunto-input")
                .length > 0) {
                $(".mw-scribunto-console-fieldset")
                    .find("input")
                    .parent()
                    .append('<input type="button" id="previewbutton" value="Preview">');
                $('<div id="previewconsole"></div>')
                    .insertBefore(".mw-scribunto-input");
            }
            $("input#previewbutton")
                .on("click", function () {
                    var output = $("#mw-scribunto-output div:last-child.mw-scribunto-normalOutput")
                        .text() || $("#mw-scribunto-output div:last-child.mw-scribunto-print")
                        .text();
                    if (output.length > 0) {
                        mw.loader.using('mediawiki.api', function () {
                            (new mw.Api())
                                .post({
                                    action: 'parse',
                                    text: output
                                })
                                .done(function (data) {
                                    if (data.error) {
                                        $('#previewconsole')
                                            .html(data.error);
                                        return;
                                    }
                                    $('#previewconsole')
                                        .html('<h2>Preview:</h2><br/>' + data.parse.text["*"] + '<br/>');
                                });
                        });
                    } else {
                        $('#previewconsole')
                            .html("");
                    }
                });
        }
    });