// Please suggest improvements on the talk page.
 
$(function() {
    'use strict';
    importArticle({
        type: 'style',
        article: 'u:dev:MediaWiki:FindAndReplace.css'
    });
    var st = JSON.parse(localStorage.getItem("FindAndReplace")),
        cvGM = window.cvGlobalMatching || 'checked',
        cvCS = window.cvCaseSensitive || 'unchecked',
        cvRG = window.cvEnableRegex || 'unchecked',
        selectedText = "",
        contengut = document.getElementById("wpTextbox1"),
        debuta,
        fin;
    if (typeof st !== 'object' || st === null) st = {sh: false, gm: true, cs: false};
    if (window.FindAndReplaceLoaded) {
        return;
    }
    window.FindAndReplaceLoaded = true;
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
    mw.hook('dev.i18n').add(function(i18no) {
    i18no.loadMessages('FindAndReplace').then(function(i18n) {
    $('.rail-auto-height').prepend('<div class="module far-module"><h3><span>' + i18n.msg('far').escape() + ' (' + (st.sh ? i18n.msg('collapse').escape() : i18n.msg('expand').escape()) + ')</span><img src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" class="chevron ' + (st.sh ? 'collapse' : 'expand') + '"></h3><div class="module_content" id="findfielddiv" style="display: ' + (st.sh ? 'block' : 'none') + '; padding-top:5px;"><div>' + i18n.msg('findthis').escape() + '<div style="padding-top:3px;"><textarea id="find_this" style="margin: 0; width:100%;" rows="4" wrap="off"></textarea></div></div><div style="padding-top:8px;">' + i18n.msg('replacewith').escape() + '</div><div style="padding-top:3px;"><textarea id="replace_with" style="margin: 0; width:100%;" rows="4" wrap="off" placeholder=""></textarea></div><div style="padding:7px 0px 7px 0px;"><table><tr><td><label><input title="' + i18n.msg('globalm').escape() + '" type="checkbox" id="globl"' + cvGM + '>' + i18n.msg('globalm').escape() + '</label></td></tr><tr><td><label><input title="' + i18n.msg('casesensitive').escape() + '" type="checkbox" id="case_sen"' + cvCS + '>' + i18n.msg('casesensitive').escape() + '</label></td></tr><tr><td><label><input title="' + i18n.msg('enblregex').escape() + '" type="checkbox" id="regex_search"' + cvRG + '>' + i18n.msg('enblregex').escape() + '</label></td></tr><tr><td><span id="far-found"></span></td></tr></table><center><input type="button" value="' + i18n.msg('farbuttontext').escape() + '" id="find-and-replace"><br><br><input type="button" value="' + i18n.msg('farselbuttontext').escape() + '" id="find-and-replace-selected"></center><br /><p style="font-size: 120%">' + i18n.msg('selectedtext').escape() + '</p><br><textarea id="texteselectionne" readonly="" style="width: 100%; height: 80px;"></textarea><br><a href="javascript:void(0)" id="far-undo">' + i18n.msg('undoedits').escape() + '</a><sup><acronym title="' + i18n.msg('undoinfo').escape() + '" style="border: none;" class="icone-aide"><img src="https://images.wikia.nocookie.net/harrypotter/fr/images/thumb/6/6c/Icone-aide.png/12px-Icone-aide.png" alt="Icone-aide" class="lzyPlcHld  lzyTrns lzyLoaded" data-image-key="Icone-aide.png" data-image-name="Icone-aide.png" data-src="https://images.wikia.nocookie.net/harrypotter/fr/images/thumb/6/6c/Icone-aide.png/12px-Icone-aide.png" width="12" height="12"></acronym></sup></div></div></div>');
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
        $('#far-found').text( rcount + ' ' + i18n.msg('farfound').escape() );
    });
    function getSelectedText() {
        var texte = "";
        if (window.getSelection) {
            texte = window.getSelection().toString();
        } else if (document.selection && document.selection.type != "Control") {
            texte = document.selection.createRange().text;
        }
        if(texte === "") {
            texte = selectedText;
        }
        return texte;
    }
    $('#wpTextbox1').bind('mouseup keyup mouseleave', function(){
        selectedText = getSelectedText();
        debuta = contengut.selectionStart;
        fin = contengut.selectionEnd;
        $('#texteselectionne').text(selectedText);
    });
    $('#find-and-replace-selected').click(function () {
        if(selectedText === "") {
            alert(i18n.msg('noselected').escape());
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
        $('#far-found').text( rcount + ' ' + i18n.msg('farfound').escape() );
        selectedText = letexte;
        $('#texteselectionne').text(selectedText);
    });
    function getOldContent() {
        $("#wpTextbox1").val($("#wpTextbox1").text());
    }
    $('a#far-undo').click(function () {
        if (confirm(i18n.msg('undomsg').escape())) getOldContent();
    });
    $(".far-module h3").click(function () {
        var $header = $(this);
        var $content = $header.next();
        var $visible = $content.is(":visible");
        $header.find('span').text(i18n.msg('far').escape() + " (" + ($visible ? i18n.msg('expand').escape() : i18n.msg('collapse').escape()) + ")");
        $header.find(".chevron").addClass($visible ? "expand" : "collapse").removeClass($visible ? "collapse" : "expand");
        $content.stop().slideToggle(500);
    });
    $(window).bind("beforeunload", function(){
        localStorage.setItem("FindAndReplace", JSON.stringify({sh: $("#findfielddiv").is(":visible") }));
    });});
});});