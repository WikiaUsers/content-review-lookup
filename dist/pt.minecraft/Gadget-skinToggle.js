$(function() {
    var $changeSkinButton = $(document.createElement('div'));
    $changeSkinButton.attr('id','skinchange-button').html('<div class="skinchange-button-dark"></div><div class="skinchange-button-light"></div>');
    var logo = document.getElementById('p-logo');
    $changeSkinButton.insertAfter(logo);
    //if (mw.config.get('wgUserId')) $('<a id="skinchange-options"></a>').insertAfter($changeSkinButton);

    $changeSkinButton.click(function() {
        if (mw.config.get('wgUserId')) {
            if ($('.skin-hydra').length) changeTo = 'hydradark';
            if ($('.skin-hydradark').length) changeTo = 'hydra';
            var a = new mw.Api();
            return a.postWithToken('csrf', {
                action: 'options',
                change: 'skin=' + changeTo
            }).then(function() {
                location.reload();
            });
        } else {
            openModal();
        }
    });
    $('#skinchange-options').click(function() {
        openModal();
    });

    function openModal() {
        var $alertScreen = $('<div>', {'id': 'skinchange-alert'});
        $alertScreen.insertBefore(logo);
        if (mw.config.get('wgUserId')) {
            $alertScreen.html('<div class="skinchange-choice-outer"><div id="skinchange-dark" class="skinchange-choice"></div><div id="skinchange-light" class="skinchange-choice"></div></div><div id="skinchange-x">×</div><div class="skinchange-suppress-outer"><div class="skinchange-suppress-inner"><input type="checkbox" id="skinchange-suppress"> <label for="skinchange-suppress">Esconder botão na barra lateral</label></div></div>');
        } else {
            var curURL = window.location.href;
            var loginURL = "https://fandomauth.gamepedia.com/signin?redirect=" + curURL;
            $alertScreen.html('<div class="skinchange-choice-outer"><div id="skinchange-dark" class="skinchange-choice"></div><div id="skinchange-light" class="skinchange-choice"></div></div><div id="skinchange-x">×</div><div class="skinchange-nouser">Você precisa <a href="' + loginURL + '">entrar</a> para mudar permanentemente de skin, mas você pode pré-visualizar!</div>');
            function changeSkinTemp(target) {
                curURL = curURL.replace(/(?:\&|\?)useskin=[A-z]*/g,'');
                var sep = (curURL.indexOf("?") === -1) ? "?" : "&";
                window.location.href = curURL + sep + 'useskin=' + target;
            }
            $(document.getElementById('skinchange-dark')).click(function() {
                changeSkinTemp('hydradark');
            });
            $(document.getElementById('skinchange-light')).click(function() {
                changeSkinTemp('hydra');
            });
        }
        $(document.getElementById('skinchange-x')).click(function() {
            $alertScreen.remove();
        });
    }
});