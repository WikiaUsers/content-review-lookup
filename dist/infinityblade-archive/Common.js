/* the contents of Hydra.js are loaded after the contents of Common.js
 - because of this, all javascript is handled on this page;
 - this allows us to determine which actions should be executed first
 - - - -
 - everything here was written by User:Dzylon
 - if you have questions or concerns,
 - please leave a message at User_talk:Dzylon
 - - - -
  #1 set up sidebar
  #2 set up Twitter feed in sidebar
  #3 fix collapsible navigation in hydra skin
  #4 set up gamedisambig tabs on certain pages
  #5 preload Special:Upload description
  #6 load IRC on IRC page
 - - - - */


//if (mw.config.get('skin') == 'hydra') {
    var nav      = document.getElementById('p-portals'),
        portals  = nav.getElementsByClassName('portal'),
        fake     = document.createElement('div'),
        expanded = 'portal expanded collapsed';

    fake.className = 'portal';
    fake.style.display = 'none';
    nav.insertBefore(fake, portals[0]);

    portals[1].className = expanded;
    portals[2].className = expanded;

    portals[1].getElementsByClassName('body')[0].style.display = 'block';
    portals[2].getElementsByClassName('body')[0].style.display = 'block';

    if (mw.config.get('wgUserName') !== null) {
        portals[3].className = expanded;
        portals[3].getElementsByClassName('body')[0].style.display = 'block';
    }
//}

// Set up gamedisambig tabs
if (document.getElementsByClassName('ib1').length > 1) {
    function update(game, display) {
        for (i = 0; i < items[game].length; i++) {
            items[game][i].style.display = display;
        }
        
        display = display == ''? 'activeTab': '';
        tabs[game].id = display;
    }
    
    var items = {
        ib1: document.getElementsByClassName('ib1'),
        ib2: document.getElementsByClassName('ib2')
    },  tabs = {
        ib1: document.createElement('div'),
        ib2: document.createElement('div')
    },  firstHeading = document.getElementById('firstHeading'),
        frag = window.location.hash.replace('#', ''),
        game = frag == 'ib1'? 'ib1': 'ib2',
        notGame = game == 'ib2'? 'ib1': 'ib2';

    tabs['ib1'].onclick = function() { if (this.id != 'activeTab') { update('ib2', 'none'); update('ib1', ''); } };
    tabs['ib1'].innerHTML = 'IB1';
    tabs['ib1'].className = 'firstTab';
    
    tabs['ib2'].onclick = function() { if (this.id != 'activeTab') { update('ib1', 'none'); update('ib2', ''); } };
    tabs['ib2'].innerHTML = 'IB2';
    
    update(notGame, 'none');
    tabs[game].id = 'activeTab';
        
    firstHeading.appendChild(tabs['ib1']);
    firstHeading.appendChild(tabs['ib2']);
} else 

// Fallback (old version)
if (gameDisambig !== null) {
    gameDisambig.parentNode.removeChild(gameDisambig);
    document.getElementById('firstHeading').appendChild(document.getElementById('otherGame'));
} else 

// Special:Upload description preload
if (pagename === 'Special:Upload') {
    document.getElementById('wpUploadDescription').innerHTML = "&#123;&#123;Imagebox\n"+
    "|description = \n"+
    "|source      = \n"+
    "|source2     = \n"+
    "&#125;&#125;";
} else 

// IRC login ( Infinity Blade Wiki:IRC )
if (pagename === 'Infinity_Blade_Wiki:IRC') {
    var nick = mw.config.get('wgUserName');
    if (nick === null) {
        nick = 'anonymous-' + Math.floor(Math.random() * 10000);
    } else {
        nick = nick.replace(/ /g, "_");
    }
    document.getElementById('IRClogin').innerHTML = '<iframe src="https://webchat.freenode.net/?nick=' + nick + '&channels=infinitybladewiki&prompt=true" style="width:660px; height:400px; border:2px solid #000;"></iframe>';
}