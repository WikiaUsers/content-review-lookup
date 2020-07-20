mw.loader.using('mediawiki.util', function() {
 var userSet = {
        'ОВ' : ['Stephen Sirius'],
        'РС' : ['Југославъ','Stephen Sirius'],
        'ЦЛ' : ['Поль Крол','Stephen Sirius','Југославъ'],
        'ВК' : ['Поль Крол','Stephen Sirius','Југославъ','Докорик','Erik Nicholaz'],
        'ВО' : ['Поль Крол','Stephen Sirius','Југославъ','Erik Nicholaz','Докорик'],
        'ВЧ' : ['Поль Крол','Stephen Sirius','Југославъ','Erik Nicholaz','Докорик'],
        'МО' : ['Поль Крол','Stephen Sirius','Југославъ','Erik Nicholaz','Докорик'],
        'ЛАВ' : ['Собаки'],
        'РП' : ['PlutonianBot','I make userpages','FANDOM','FANDOMbot','Meolane'],
        'К' : ['StarmanW','RainA','Sociophobia'],
        'ПВВ' : ['Kuzura','Idel sea Qatarhael'],
        'Н' : ['Kuzura','FANDOM','FANDOMbot','Rappy 4187','CzechOut']
};
var userSetTip = {
        'ОВ':'Отец вики',
        'РС':'Раздающий статусы',
        'ЦЛ':'Царский лось',
        'ВК':'Владыка контента',
        'ВО':'Владыка обсуждений',
        'ВЧ':'Владыка чата',
        'МО':'Мастер откатов',
        'ЛАВ':'Лучший автор вики',
        'РП':'Робот Пина',
        'К':'Консул',
        'ПВВ':'Повелитель всея Викии',
        'Н':'Начальство'
    }
$(document).ready(function() {
 mw.util.addCSS('tt.userflags {color:#0645ad}');
 mw.util.$content.find('a').each( function(i, lnk) {
 if( /[?#]/.test(lnk.href) && lnk.href.indexOf('redlink=1') === -1 ) {
 return;
 }
 var mm, f, user, flags, tips;
 mm = /^Участни(к|ца):(.*)/.exec(lnk.title);
 if( !mm ) {
 return;
 }
 user = decodeURIComponent(mm[2]);
 if (lnk.className.indexOf('new') !== -1) {
 user = user.replace(/ \([^\)]+\)$/,'');''
 }
 flags = []; tips = [];
 for( f in userSet ) {
 if($.inArray( user, userSet[f] ) !== -1 ){
 flags.push(f);
 tips.push(userSetTip[f]);
 }
 }
 if( !flags.length ) {
 return;
 }
tips = ' ('+tips.join(', ')+')';
$(lnk)
 .after('\u00A0', '<tt class=userflags title="'+tips+'">('+flags.join(',') + ')</tt>')
 .attr('title', $(lnk).attr('title') + tips);
});
 });
});