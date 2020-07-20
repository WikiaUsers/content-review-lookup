// JSPad by fngplg, adapted for use by Americhino
//
//
// ALSO UNFINISHED DO NOT USE
$(function () {
        //another jspad
        //https://stackoverflow.com/a/19961519
        HTMLTextAreaElement.prototype.insertAtCaret = function (text) {
          text = text || '';
          if (document.selection) {
            // IE
            this.focus();
            var sel = document.selection.createRange();
            sel.text = text;
          } else if (this.selectionStart || this.selectionStart === 0) {
            // Others
            var startPos = this.selectionStart;
            var endPos = this.selectionEnd;
            this.value = this.value.substring(0, startPos) +
              text +
              this.value.substring(endPos, this.value.length);
            this.selectionStart = startPos + text.length;
            this.selectionEnd = startPos + text.length;
          } else {
            this.value += text;
          }
        };//insertatcaret
 
        function btnClick (e) {
            if (e && e.preventDefault) 
                e.preventDefault();
            gui.find('textarea').val(previousText);
            $('body').prepend(gui);
            gui.show().find('textarea').focus();
        }//btnclick
        function btnBClick (e) {
            $('<script>', {type: 'text/javascript', text: gui.find('textarea').val()}).prependTo($('head'));
            $(myname).remove();
        }//btnbclick
        var myname = '#ngui';
        var previousText = '';
        var hs = '.wds-global-navigation .wds-global-navigation__start-a-wiki';
        var btn = $('<a>', {class: 'wds-button wds-is-secondary wds-global-navigation__link-button', href: '#', id: 'nbtnshowgui', style: 'margin-left: 10px; margin-right: 10px; padding: 4px 15px;'});
        var gui = $('<div>', {id: myname.slice(1), style: 'position:absolute;right:0;bottom:100px;width:50%;height:90%;z-index:10000;visibility:visible;'});
        var guib = $('<div>', {class: 'wds-button', text: 'Start', id: 'nbtnstart', style: 'cursor: pointer;'});
        var guit = $('<textarea>', {id: 'ntxtscript', style: 'display:block;margin: 0 5%;width:60%;height:auto;min-height:100px;max-height:80%; font-family: monospace;'});
        gui.prepend(guib).append(guit);
        if ($(hs).length) {
            //oasis
            $(hs).append(btn);
        } else {
            //monobook
            $('#p-personal .pBody ul').append(btn);
        }//append js button
        $('body').on('keydown', function (e) {
            if (e.ctrlKey && e.keyCode === 8) { //ctrl+bckspc
                btnClick();
                return false;
            }
        });//body keydown
        $('body').on('click', '#nbtnshowgui', btnClick);
        $('body').on('click', myname + ' #nbtnstart', btnBClick);
        $('body').on('keydown', myname + ' #ntxtscript', function (e) {
            if (e.keyCode >= 37 && e.keyCode <= 40) return true; //arrows
            var $this = $(myname + ' #ntxtscript');
            switch (e.keyCode) {
                case 9:
                    $this.focus();
                    $this.get(0).insertAtCaret('    ');
                    return false;
                case 13:
                    if (e.shiftKey || e.ctrlKey) {
                        previousText = $this.val();
                        btnBClick();
                        return false;
                    }
                    break;
                case 27:
                    previousText = $this.val();
                    $(myname).remove();
                    return false;
            }
            if ($this.val() && $this.val().length > 100) $this.height($this.get(0).scrollHeight);
        });//txt keydown
    });//js pad
mw.hook('dev.wds').add(function(wds) {
    $('#nbtnshowgui').html((function(i) {
        i.setAttribute('fill', '#ccc !important');
        i.setAttribute('height', '18');
        i.setAttribute('width', '18');
        i.setAttribute('viewBox', '0 0 18 18');
        return i;
    }(wds.icon('embed'))));
});
/* Imports */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:WDSIcons/code.js',
    ]
});