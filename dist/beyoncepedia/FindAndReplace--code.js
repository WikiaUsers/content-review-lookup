// tweaked version of script from dev wiki
 
$(function() {
    'use strict';
    importArticle({
        type: "style",
        article: "u:dev:FindAndReplace/code.css"
    });
    var lng = {
        // English
        en: {
            far: 'Find and replace',
            farbuttontext: 'Find and Replace Text',
            farselbuttontext: 'Find and Replace selected Text',
            selectedtext: 'Selected text:',
            findthis: 'Find this:',
            replacewith: 'Replace with:',
            globalm: 'Global matching.',
            casesensitive: 'Case sensitive.',
            enblregex: 'Enable regular expressions', // New, needs translation
            undoedits: 'Undo edits',
            undoinfo: 'All edits, not only replaces',
            lbwarning: 'Warning: pressing Enter key\nwill publish your edits',
            farfound: 'found and replaced.',
            undomsg: 'This will undo all edits, not only text replacements.\r\nAre you sure you want to undo?',
            noselected: 'No selected text.'
        },
    };
    var st = $.storage.get("FindAndReplace"),
        cvGM = window.cvGlobalMatching || 'checked',
        cvCS = window.cvCaseSensitive || 'unchecked',
        cvRG = window.cvEnableRegex || 'unchecked',
        selectedText = "",
        contengut = document.getElementById("wpTextbox1"),
        debuta,
        fin;
    if (typeof st !== 'object' || st === null) st = {sh: false, gm: true, cs: false};
    lng = $.extend(lng.en, lng[mw.config.get('wgContentLanguage')], lng[mw.config.get('wgUserLanguage')]);
    $('.rail-auto-height').prepend('<div class="module far-module"><h3><span>' + lng.far + '</span><img src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" class="chevron ' + (st.sh ? 'collapse' : 'expand') + '"></h3><div class="module_content" id="findfielddiv" style="display: ' + (st.sh ? 'block' : 'none') + '; padding-top:5px;"><div>' + lng.findthis + '<div style="padding-top:3px;"><textarea id="find_this" style="margin: 0; width:100%;" rows="4" wrap="off"></textarea></div></div><div style="padding-top:8px;">' + lng.replacewith + '</div><div style="padding-top:3px;"><textarea id="replace_with" style="margin: 0; width:100%;" rows="4" wrap="off" placeholder=""></textarea></div><div style="padding:7px 0px 7px 0px;"><table><tr><td><label><input title="' + lng.globalm + '" type="checkbox" id="globl"' + cvGM + '>' + lng.globalm + '</label></td></tr><tr><td><label><input title="' + lng.casesensitive + '" type="checkbox" id="case_sen"' + cvCS + '>' + lng.casesensitive + '</label></td></tr><tr><td><label><input title="' + lng.enblregex + '" type="checkbox" id="regex_search"' + cvRG + '>' + lng.enblregex + '</label></td></tr></table><center><input type="button" value="' + lng.farbuttontext + '" id="find-and-replace"><br></center><br><a href="javascript:void(0)" id="far-undo">' + lng.undoedits + '</a><sup><acronym title="' + lng.undoinfo + '" style="border: none;" class="icone-aide"><img src="https://images.wikia.nocookie.net/__cb20141207003419/harrypotter/fr/images/thumb/6/6c/Icone-aide.png/12px-Icone-aide.png" alt="Icone-aide" class="lzyPlcHld  lzyTrns lzyLoaded" data-image-key="Icone-aide.png" data-image-name="Icone-aide.png" data-src="https://images.wikia.nocookie.net/__cb20141207003419/harrypotter/fr/images/thumb/6/6c/Icone-aide.png/12px-Icone-aide.png" width="12" height="12"></acronym></sup></div></div></div>');
    $(window).resize(function() {
        $('#findfielddiv').height($(window).height() - 250 - $('.module_content').height());
    });
    $(window).trigger('resize');
    $('#find-and-replace').click(function () {
        var searchfor = '',
            searchexp,
            $textarea = $('#wpTextbox1'),
            replacewith = $('#replace_with').val().replace(/\r/gi, ''),
            text = $textarea.val().replace(/\r/gi, ''),
            flagg = 'g',
            flagi = 'i',
            enableregex = 0;
 
        if ($('#globl').prop('checked') === false) {
            flagg = '';
        }
        if ($('#case_sen').prop('checked') === true) {
            flagi = '';
        }
        if ($('#regex_search').prop('checked') === true) {
            enableregex = 1;
        }
        var flags = flagg + flagi + 'm';
        if(enableregex === 1) {
            searchfor = $('#find_this').val();
        } else {
            searchfor = $('#find_this').val().replace(/\r/gi, '').replace(/([.*+?^=!:${}()|\[\]\/\\])/g,'\\$1');
        }
        searchexp = new RegExp(searchfor, flags);
        var rcount = 0;
        var matched = text.match(searchexp);
        if (matched !== null) {
            rcount = matched.length;
        }
        text = text.replace(searchexp, replacewith);
        $textarea.val(text);
        $('#far-found').text( rcount + ' ' + lng.farfound );
    });
    $('#find-and-replace-selected').click(function () {
        if(selectedText === "") {
            alert(lng.noselected);
        }
        var searchfor = '',
            searchexp,
            searchexp2,
            letexte,
            selectedText2,
            $textarea = $('#wpTextbox1'),
            replacewith = $('#replace_with').val().replace(/\r/gi, ''),
            text = $textarea.val().replace(/\r/gi, ''),
            flagg = 'g',
            flagi = 'i',
            enableregex = 0;
 
        if ($('#globl').prop('checked') === false) {
            flagg = '';
        }
        if ($('#case_sen').prop('checked') === true) {
            flagi = '';
        }
        var flags = flagg + flagi + 'm';
        if(enableregex === 1) {
            searchfor = $('#find_this').val();
        } else {
            searchfor = $('#find_this').val().replace(/\r/gi, '').replace(/([.*+?^=!:${}()|\[\]\/\\])/g,'\\$1');
        }
        searchexp = new RegExp(searchfor, flags);
        selectedText2 = selectedText.replace(/\r/gi, '').replace(/([.*+?^=!:${}()|\[\]\/\\])/g,'\\$1');
        searchexp2 = new RegExp(selectedText2, 'im');
        var rcount = 0;
        var matched = selectedText.match(searchexp);
        if (matched !== null) {
            rcount = matched.length;
        }
        letexte = selectedText.replace(searchexp, replacewith);
        text = text.substring(0, debuta) + letexte + text.substring(fin);
        $textarea.val(text);
        $('#far-found').text( rcount + ' ' + lng.farfound );
        selectedText = letexte;
        $('#texteselectionne').text(selectedText);
    });
    function getOldContent() {
        $("#wpTextbox1").val($("#wpTextbox1").text());
    }
    $('a#far-undo').click(function () {
        if (confirm(lng.undomsg)) getOldContent();
    });
    $(".far-module h3").click(function () {
        var $header = $(this);
        var $content = $header.next();
        var $visible = $content.is(":visible");
        $header.find('span').text(lng.far);
        $header.find(".chevron").addClass($visible ? "expand" : "collapse").removeClass($visible ? "collapse" : "expand");
        $content.stop().slideToggle(500);
    });
    $(window).bind("beforeunload", function(){
        $.storage.set("FindAndReplace", {sh: $("#findfielddiv").is(":visible")});
    });
});