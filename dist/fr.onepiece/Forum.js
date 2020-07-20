//Hutskuchi
var pinIcon = 'https://vignette.wikia.nocookie.net/mogapedia/images/5/5f/Pin.png/revision/latest?cb=20171102222925&path-prefix=fr';
var unpinIcon = 'https://vignette.wikia.nocookie.net/mogapedia/images/d/d3/Unpin.png/revision/latest?cb=20171102230647&path-prefix=fr';
 
function TestGroups () {
    // Check if the user is a modo. Return True if yes.
    ['bureaucrat', 'sysop', 'threadmoderator', 'content-moderator'].some(function (group) {
        return mw.config.get('wgUserGroups').indexOf(group) > -1;
    });
}
 
$(function () {
 
    if (TestGroups()) {
        $('.thread').hover();
        $('.thread-left h4').replaceWith(function(){
            return $('<p/>').append($(this).contents());
        });
        $('.thread-left p:first-of-type').append(' <div class="pin"><img style="" src="'+pinIcon+'" width="15px" height="15px"/></div>');
        $('.pin').click(function () {
            var $parents = $(this.closest('.thread'));
            var id = $parents.attr('data-id');
            pinThread(id);
        });
    }
 
 
    $.ajax({
        url: '/api.php',
        data: {
            'format': 'json',
            'action': 'query',
            'titles': 'MediaWiki:Custom-PinThreadList',
            'prop': 'revisions',
            'rvprop': 'content'
        },
        dataType: 'json',
        type: 'GET',
        cache: false,
    })
    .done(function (data) {
        var threadsId = getThreads(data);
        if (threadsId) {
            addPinThreadList();
            for (i=0; i<threadsId.length;i++) {
                $('ul.PinThreadList').prepend($('li.thread[data-id='+threadsId[i]+']'));
            }
            if (TestGroups()) {
                $('.PinThreadList .pin img').attr('src', unpinIcon);
                $('.PinThreadList .pin').unbind("click");
                $('.PinThreadList .pin').click(function () {
                    var $parents = $(this.closest('.thread'));
                    var id = $parents.attr('data-id');
                    unpinThread(id);
                });
            }
        }
    });
});
 
function getThreads (object) {
    var pageId;
    for (var key in object.query.pages) {
        pageId = key.toString();
    }
    if (pageId != -1) {
        var text = object.query.pages[pageId].revisions[0]['*'];
        if (!text) {
            return null;
        }
        return text.split("\n");
    }
    else {
        return null;
    }
}
 
function pinThread (id) {
    if ($('ul.PinThreadList').length === 0) {
        addPinThreadList();
    }
    $('ul.PinThreadList br').before($('li.thread[data-id='+id+']'));
    if (TestGroups()) { 
        $('li.thread[data-id='+id+'] .pin img').attr('src', unpinIcon);
        $('li.thread[data-id='+id+'] .pin').unbind("click");
        $('li.thread[data-id='+id+'] .pin').click(function () {
            var $parents = $(this.closest('.thread'));
            var id = $parents.attr('data-id');
            unpinThread(id);
        });
    }
    editDatabase(id);
}
 
function unpinThread (id) {
    $('ul.ThreadList').prepend($('li.thread[data-id='+id+']'));
    $('ul.PinThreadList li.thread[data-id='+id+']').remove();
    if (TestGroups()) {
        $('li.thread[data-id='+id+'] .pin img').attr('src', pinIcon);
        $('li.thread[data-id='+id+'] .pin').unbind("click");
        $('li.thread[data-id='+id+'] .pin').click(function () {
            var $parents = $(this.closest('.thread'));
            var id = $parents.attr('data-id');
            pinThread(id);
        });
    }
    $.ajax({
        url: '/api.php',
        data: {
            'format': 'json',
            'action': 'query',
            'titles': 'MediaWiki:Custom-PinThreadList',
            'prop': 'revisions',
            'rvprop': 'content'
        },
        dataType: 'json',
        type: 'GET',
        cache: false,
    })
    .done(function (data) {
        var content = getThreads(data);
        editDatabase(id, true, content.join('\n'));
    });
 
}
 
function addPinThreadList () {
    $('div.ContentHeader').before('<ul class="ThreadList PinThreadList"><br clear="all" /></ul>');
    $('.PinThreadList').before('<div class="ContentHeader">Messages épinglés</div>');
}
 
function editDatabase (id, unpin, content) {
    var text;
    if (unpin) {
        text = content.replace(id, '');
        $.ajax({
        url: '/api.php',
        data: {
            'format': 'json',
            'action': 'edit',
            'title': 'MediaWiki:Custom-PinThreadList',
            'text': text,
            'token': mw.user.tokens.get('editToken')
        },
        dataType: 'json',
        type: 'POST',
        });
    } 
    else {
        text = '\n'+id;
        $.ajax({
        url: '/api.php',
        data: {
            'format': 'json',
            'action': 'edit',
            'title': 'MediaWiki:Custom-PinThreadList',
            'appendtext': text,
            'token': mw.user.tokens.get('editToken')
        },
        dataType: 'json',
        type: 'POST',
        });
    }
}

//****************************************/
//           Message d'accueil du Forum  */
//****************************************/
if ( wgPageName === "Spécial:Forum") {
    
var cible_forum = '.boards';
var message_accueil_forum = "<div class=warn3><div id=wh><center>Bienvenue sur le forum de One Piece Encyclopédie.<br>Avant de poster, nous vous invitons à lire les <a href='http://fr.onepiece.wikia.com/wiki/One_Piece_Encyclop%C3%A9die:R%C3%A8gles/R%C3%A8glement_Forum'><strong>Règles.</strong></a> <br/> On serait vraiment <strong><i>super-content</i></strong> si vous vous créez un compte utilisateur,<br/>cela vous permettra d'être connu de la communauté, et d'être reconnu. <a href='https://www.fandom.com/register?uselang=fr&redirect=https://onepiece.fandom.com/fr/wiki/One_Piece_Encyclop%C3%A9die:R%C3%A8gles/R%C3%A8glement_Forum'><strong>Inscrivez-vous !</center></strong></a></p></div>";
$(cible_forum).prepend(message_accueil_forum);

// Sections du forum

var cible_message_forum = '.BreadCrumbs';
var message_sections_forum = '<small id="msg-section-forum">Avant de vous lancer dans la création d\'un topic veuillez s\'il vous plaît vérifier qu\'il n\'existe pas au préalable. Veuillez également à bien respecter les <a href="http://fr.wikia.com/Conditions_d%27utilisation">Conditions d\'utilisation de FANDOM</a> et les <a href="/wiki/One_Piece_Encyclop%C3%A9die:R%C3%A8gles/R%C3%A8glement_Forum">Règles du forum</a> dans chacune de vos interventions.</small><br />';
$(cible_message_forum).after(message_sections_forum);

}