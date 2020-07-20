function ltconvertproperty(property)
{
    switch(property)
    {
        case 'bg':
            return 'background-color';
        case 'fg':
            return 'color';
        case 'bdc':
            return 'border-color';
        case 'bdr':
            return 'border-radius';
        case 'height':
            return 'height';
        case 'posy':
            return 'top';
        case 'pos':
            return 'position';
        case 'act':
            return 'padding-right';
        case 'width':
            return 'width';
        case 'hide':
            return 'left';
        default:
            return property;
    }
}
function ltconvertvalue(value,property)
{
   switch(property)
    {
        case 'bdr':
            if(value===false){val='0px';}else{val='0 15px 15px 0';}
            return val;
        default:
            return value;
    } 
}
function ltconvertname(element)
{
    element=String(element.name);
    if(element=='container')
    {
        return '';
    }
    else
    {
        switch(element)
        {
            case 'iconcontainer':
                element='lt-icon-container';
                break;
            case 'iconimg':
                element='.lt-icon-container ul.lt-icons li.lt-icon a img';
                break;
        }
        return '.'+element;
    }
}

function ltloadstyle(e,p)
{
    v=String(ltconvertvalue(e[p],p));
    p=String(ltconvertproperty(p));
    e=String(ltconvertname(e));
    htmlelement='#lt-container '+e;
    
    $(htmlelement).each(function() {$(this).css(p,v)});
}

/**/

var i18n =
{
    'en':
    {
        'cc':'Community Central',
        'profile':'My User Page',
        'rc':'Recent Changes',
        'article':'Create New Article',
        'file':'Upload File',
        'settings':'Preferences',
        'chat':'Chat'
    },
    'de':
    {
        'cc':'Community Deutschland',
        'profile':'Meine Benutzerseite',
        'rc':'Letzte Änderunegn',
        'article':'Neuen Artikel erstellen',
        'file':'Datei hochladen',
        'settings':'Einstellungen',
        'chat':'Chat'
    },
    'fr':
    {
        'cc':'Centre des Communautés',
        'profile':'Ma page utilisateur',
        'rc':'Modifications récentes',
        'article':'Créer un nouvel article',
        'fil':'Importer un fichier',
        'settings':'Préférences',
        'chat':'Tchat'
    }
};

var ulang = mw.config.get('wgUserLanguage');

var container=
{
    'name':'container',
    
    'act':String(((Math.ceil((($(window).width()-$('#WikiaPage').width())/2)/2.5)/10)*10)*1.5)+'px',
    'height':String($(window).height()-55-40-60)+'px',
    'posy':String(($(window).height()/2)-(($(window).height()-55-40-60)/2))+'px',
    'width':String((Math.ceil(((($(window).width()-$('#WikiaPage').width())/2)/2.5)/10))*10)+'px',
    'hide':'-'+String(((Math.ceil(((($(window).width()-$('#WikiaPage').width())/2)/2.5)/10))*10)-15)+'px'
};

var iconcontainer=
{
    'name':'iconcontainer',
    
    'bg':$('#WikiaPageBackground').css('background-color'),
    'fg':'rgb('+String(255+parseInt(String($('#WikiaPageBackground').css('background-color').split('(')).split(',')[1],10))+','+String(255+parseInt(String($('#WikiaPageBackground').css('background-color').split('(')).split(',')[2],10))+','+String(255+parseInt(String($('#WikiaPageBackground').css('background-color').split('(')).split(',')[3],10))+')',
    
    'bdc':$('.WikiHeader .navbackground').css('background-color'),
    'bdr':true
};

var iconimg=
{
    'name':'iconimg',
    'bg':$('.WikiHeader .navbackground').css('background-color')
};

var tools=
{
    'cc':
    {
        'name':i18n[ulang].cc,
        'image':'https://cdn.discordapp.com/icons/131913939549159424/16c5aaa869e6554d056d147451085b2e.jpg',
        'link':'http://'+mw.config.get('wgUserLanguage')+'.c.wikia.com'
    },
    'profile':
    {
        'name':i18n[ulang].profile,
        'image':'https://vignette.wikia.nocookie.net/messaging/images/1/19/Avatar.jpg/revision/latest/scale-to-width-down/150?format=jpg',
        'link':'/wiki/Special:MyPage'
    },
    'rc':
    {
        'name':i18n[ulang].rc,
        'image':'https://cdn0.iconfinder.com/data/icons/significon/512/Significon-Exchange-512.png',
        'link':'/wiki/Special:RecentChanges'
    },
    'chat':
    {
        'name':i18n[ulang].chat,
        'image':'https://vignette.wikia.nocookie.net/trollocool/images/6/66/SpeechBubble.jpg/revision/latest?cb=20161008142500&path-prefix=de',
        'link':'/wiki/Special:Chat'
    },
    'file':
    {
        'name':i18n[ulang].file,
        'image':'http://downloadicons.net/sites/default/files/upload-icon-72713.png',
        'link':'/wiki/Special:Upload'
    },
    'article':
    {
        'name':i18n[ulang].article,
        'image':'http://simpleicon.com/wp-content/uploads/pencil.png',
        'link':'/wiki/Special:CreateNewPage'
    },
    'settings':
    {
        'name':i18n[ulang].settings,
        'image':'http://iconshow.me/media/images/ui/ios7-icons/png/512/gear.png',
        'link':'/wiki/Special:Preferences'
    },
};


/**/

function loadallstyles()
{
    $('head').append($('<link rel="stylesheet" href="http://de.trollocool.wikia.com/load.php?mode=articles&articles=MediaWiki:LeftTools.css&only=styles"/>'));

    ltloadstyle(container,'height');
    ltloadstyle(container,'act');
    ltloadstyle(container,'posy');
    ltloadstyle(container,'width');
    ltloadstyle(container,'hide');

    ltloadstyle(iconcontainer,'bg');
    ltloadstyle(iconcontainer,'fg');
    ltloadstyle(iconcontainer,'bdc');
    ltloadstyle(iconcontainer,'bdr');
    
    return console.log('LeftTools.js - all styles loaded!');
}

function getselectedtools()
{
    $.ajax({
    crossDomain: true,
    type: 'POST',
    url: '//community.wikia.com/api.php',
    data: {
        action: 'parse',
        disablepp: '',
        text: '{{User:'+mw.config.get('wgUserName')+'/LeftTools}}',
        format: 'json'
    },
    dataType: 'jsonp',
    success: function(data) {
        var stools=data.parse.text['*'].split('<p>')[1].split('</p>')[0].split(',');
        var slist=gettoolslist(stools);
        loadalltools(slist);
    }
}); 
}

function gettoolslist(l)
{
    var toolslist=[];
    var available=['cc','chat','rc','profile','article','file','settings'];
    for(i=0;i<l.length;i++)
    {
        for(n=0;n<available.length;n++)
        {
            if(l[i]==available[n]){toolslist.push(l[i]);}
        }
    }
    return toolslist;
}

function loadalltools(list)
{
    for(i=0;i<list.length;i++)
    {
        var name=list[i];
        $('#lt-container .lt-icons').append('<li class="lt-icon"><a title="'+tools[name].name+'" href="'+tools[name].link+'" class="image image-thumbnail"><img src="'+tools[name].image+'" alt="Goat.png" class="" data-image-key="Goat.png" data-image-name="Goat.png"></a></li>');
    }
}

/**/

ltcontainer=$('<div id="lt-container"/>');

$('#WikiaPage').append(ltcontainer);
$('#lt-container').append($('<div class="lt-icon-container"/>'));
$('#lt-container .lt-icon-container').append($('<ul class="lt-icons"/>'));

loadallstyles();
getselectedtools();
/**/

function updateSize()
{
    container.act=String(((Math.ceil((($(window).width()-$('#WikiaPage').width())/2)/2.5)/10)*10)*1.5)+'px';
    container.height=String($(window).height()-55-40-60)+'px';
    container.posy=String(($(window).height()/2)-(($(window).height()-55-40-60)/2))+'px';
    container.width=String((Math.ceil(((($(window).width()-$('#WikiaPage').width())/2)/2.5)/10))*10)+'px';
    container.hide='-'+String(((Math.ceil(((($(window).width()-$('#WikiaPage').width())/2)/2.5)/10))*10)-15)+'px';
    
    ltloadstyle(container,'height');
    ltloadstyle(container,'act');
    ltloadstyle(container,'posy');
    ltloadstyle(container,'width');
    ltloadstyle(container,'hide');
    
    ltloadstyle(iconimg,'bg');
}

$(window).on('resize',updateSize);