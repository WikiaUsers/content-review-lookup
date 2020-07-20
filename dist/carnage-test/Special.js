(function(mw, $){
    "use strict";
    if (wgPageName == "Special:SandboxPage"){
        var specialPageHTML =
            '<section class="SpecialTestPage TestPage" id="SpecialTestPage">' +
                '<h1>Test Page</h1>' +
                '<form class="WikiaForm SpecialPageForm" id="SpecialPageForm" name="" onsubmit="showCode(); return false;">' +
                    '<fieldset>' +
                        '<table>' +
                            '<thead>' +
                                '<tr>' +
                                    '<th colspan="2" class="PageFormHead">Test</th>' +
                                '</tr>' +
                            '</thead>' +
                            '<tbody>' +
                                '<tr>' +
                                    '<td>' +
                                        '<ul class="FormInputList">' +
                                            '<li>' +
                                                '<label for="background-color">Background: </label>' +
                                                '<input id="background-color" type="text" placeholder="Background" />' +
                                            '</li>' +
                                            '<li>' +
                                                '<label for="border">Border: </label>' +
                                                '<input id="border" type="text" placeholder="Border" />' +
                                            '</li>' +
                                            '<li>' +
                                                '<label for="enable-shadow">Shadow: </label>' +
                                                '<select id="enable-shadow" name="enable">' +
                                                    '<option value="disabled">Disabled</option>' +
                                                    '<option value="enabled">Enabled</option>' +
                                                '</select>' +
                                                '<label for="shadow">Box Shadow: </label>' +
                                                '<input id="shadow" type="text" placeholder="Box Shadow" />' +
                                            '</li>' +
                                            '<li>' +
                                                '<label for="font-family">Font Family</label>' +
                                                '<select id="font-family">';
        var fontList = ['Arial', 'Arial Black', 'Berlin Sans', 'Berlin Sans FB Demi', 'Broadway', 'Calibri', 'Calibri Light', 'Courier New', 'Doppio One', 'Eras', 'Franklin Gothic', 'Gill Sans', 'Gill Sans MT', 'Gill Sans Ultra Bold', 'Haettenschweiler', 'Helvetica', 'Impact', 'ITC Eras', 'ITC Eras Std', 'Lucida Console', 'Lucida Handwriting', 'Lucida Sans', 'Lucida Typewriter Serif', 'Mistral', 'Old English Text MT', 'Orbitron', 'Palatino Linotype', 'Ravie', 'Script', 'Script MT Bold', 'Segoe UI', 'Trebuchet MS', 'Ubuntu', 'Verdana', 'Webdings', 'Wingdings', 'Wingdings 2', 'Wingdings 3'];

        for (var f = 0; f < fontList.length; f++){
                  specialPageHTML +=                '<option value="' + fontList[f] + '">' + fontList[f] + '</option>';
        }
                  specialPageHTML +=            '</select>' +
                                            '</li>' +
                                        '</ul>' +
                                    '</td>' +
                                '</tr>' +
                            '</tbody>' +
                        '</table>' +
                    '</fieldset>' +
                '</form>' +
                '<pre class="SpecialPageCode" id="SpecialPageCode">' +
                '</pre>' +
            '</section>';

        $('.WikiaArticle #mw-content-text').html(specialPageHTML);
    }
})(mediawiki, jQuery);