navigator.info = (function(){
    var N = navigator.appName, ua = navigator.userAgent, tem;
    var M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
    if (M && (tem = ua.match(/version\/([\.\d]+)/i))!== null) M[2] = tem[1];
    M = M? [M[1], M[2]] : [N, navigator.appVersion, '-?'];
    return M; 
})();

var partyLink = [];

function enablePartyMode(){
    var discoBallLights = 
        [{
            color: 'blue',
            top: '5%',
            delay: 'initial'
        }, {
            color: 'orange',
            top: '5%',
            delay: '2s'
        }, {
            color: 'red',
            top: '5%',
            delay: '4s'
        }, {
            color: 'green',
            top: '25%',
            delay: '1s'
        }, {
            color: 'yellow',
            top: '25%',
            delay: '3s'
        }, {
            color: 'blue',
            top: '25%',
            delay: '5s'
        }, {
            color: 'orange',
            top: '45%',
            delay: '3.5s'
        }, {
            color: 'red',
            top: '45%',
            delay: '5.5s'
        }, {
            color: 'green',
            top: '45%',
            delay: '7.5s'
        }, {
            color: 'yellow',
            top: '65%',
            delay: '0.5s'
        }, {
            color: 'blue',
            top: '65%',
            delay: '2.5s'
        }, {
            color: 'orange',
            top: '65%',
            delay: '4.5s'
        }, {
            color: 'red',
            top: '85%',
            delay: '1.5s'
        }, {
            color: 'green',
            top: '85%',
            delay: '3.5s'
        }, {
            color: 'yellow',
            top: '85%',
            delay: '5.5s'
        }],
        discoHTML = 
            '<section class="PartyMode DiscoBall Disco" id="DiscoBall">' +
                '<div class="DiscoBallLights" id="DiscoBallLights">';
    for (var lights = 0; lights < discoBallLights.length; lights++){
        var color = discoBallLights[lights].color,
            top = discoBallLights[lights].top,
            delay = discoBallLights[lights].delay || '';

        discoHTML += '<div class="light ' + color + '" style="top: ' + top + '; -webkit-animation-delay: ' + delay + '; -moz-animation-delay: ' + delay + '; -ms-animation-delay: ' + delay + '; -o-animation-delay: ' + delay + '; animation-delay: ' + delay + '; background: white; box-shadow: 0 0 20px 20px white;"></div>';
    }

    discoHTML += '</div>' +
                 '<audio class="PartyModeMusic PartyModeAudio" id="PartyModeAudio" autoplay loop>' +
                     '<source src="' + partyLink[0].ogg + '" type="audio/ogg" />' +
                     '<source src="' + partyLink[0].mp3 + '" type="audio/mpeg" />' +
                 '</audio>' +
             '</section>';
    $('.ChatWindow').append(discoHTML);

    var partyMenuHTML =
        '<ul class="PartyMenuWrapper ChatUISubnav">' +
            '<li class="PartyMenu PartyFormWrapper" id="PartyMenu">' +
                '<a class="PartyFormToggle ChatUIFormToggle fa fa-chevron-up" id="PartyFormToggle" style="text-align: center;" href="javascript:void(0);"></a>' +
                '<form class="WikiaForm ChatUIForm PartyForm music skin group" id="PartyForm" method="" name="" onsubmit="return false;">' +
                    '<fieldset>' +
                         '<h2>Settings</h2>' +
                         '<div class="PartyFormGroup">' +
                             '<label for="theme" class="ChatUILabel">Theme</label>' +
                             '<select id="theme" name="group" data-select-title="Theme Selector">';
    var selectArray = ["Paradox", "Naruto", "Fairy Tail", "Epic", "Test"];
    for (var options = 0; options < selectArray.length; options++){
        var title = selectArray[options];
        partyMenuHTML += '<option value="' + title + '">' + title + '</option>';
    }
    partyMenuHTML += '</select>' +
                     '<input id="theme-enable" type="radio" value="enable" />' +
                     '<label for="theme-enable" class="fa fa-check"></label>' + // Substituting the radio buttons
                     '<input id="theme-disable" type="radio" value="disable" />' +
                     '<label for="theme-disable" class="fa fa-times"></label>' +
                     '<br />' +
                     '<label for="partyModeMusic" class="ChatUILabel">Music</label>' +
                     '<select id="partyModeMusic" name="music" data-select-title="Music Selector">';
    for (var pl = 0; pl < partyLink.length; pl++){
        var title = partyLink[pl].title;
        partyMenuHTML += '<option value="' + title + '">' + title + '</option>';
    }

    partyMenuHTML += '</select>' +
                 '</div>' +
             '</fieldset>' +
         '</form>' +
     '</li>' +
 '</ul>';
}

window.chatUI = 
    [{
        title: 'Options',
        id: 'ChatOptionsButton',
        handler: function(){
            openOptions();
        }
     },
     {
        title: 'Party Mode',
        id: 'PartyModeButton',
        handler: function(){
            if (!$('#PartyMenu').length){
                enablePartyMode();
            }
            else {
                disablePartyMode();
            }
        }
     },
     {
        title: 'Test Button',
        id: 'TestButton',
        handler: function(){
            test();
        }
     }];

if (window.chatUI){
    var uiCSSLoaded = false;
    var ui = window.chatUI;
    var uiNav = 
        '<nav class="ChatUI ChatUINav" id="ChatUI">' +
            '<a class="fa toggleChatUINav fa-chevron-left" href="javascript:toggleChatUI();"></a>' +
            '<ul class="ChatUIList">';
    for (var u = 0; u < ui.length; u++){
        var title = ui[u].title,
            id = ui[u].id,
            handler = ui[u].handler;
        uiNav += '<li data-chatui-option="' + title + '" class="ChatUIItem"><a href="javascript:void(0);" id="' + id + '">' + title +'</a></li>';
        $('#' + id).on('click', handler);
    }
    uiNav += '</ul>' +
         '</nav>';
    $('.ChatWindow #WikiaPage').append(uiNav);
    if (uiCSSLoaded === false){
        uiCSSLoaded = true;
        var loaded = (uiCSSLoaded === true) ? 0 : 1;
        if (loaded == 1){
            importArticles({
                type: 'style',
                articles: [
                    'u:carnage-test:MediaWiki:ChatUI.css',
                    'u:carnage-test:MediaWiki:ChatUIIcons.css'
                ]
            });
        }
    }
}

$('.toggleChatUINav').on('click', function(e){
    var trigger = $(e.target),
        elem = $('.ChatUIList');
    if (trigger.hasClass('fa-chevron-left') == true && elem.is(':hidden') == false){
        trigger.removeClass('fa-chevron-left');
        trigger.addClass('fa-chevron-right');
        elem.animate({"left":"-1000px"}, "slow").fadeOut();
    }
    else {
        trigger.removeClass('fa-chevron-right');
        trigger.addClass('fa-chevron-left');
        elem.animate({"left":"0"}, "slow").fadeIn();
    }
});