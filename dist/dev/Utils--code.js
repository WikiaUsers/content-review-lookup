function showError(msg) {
    console.error(msg);
}
 
url = mw.Uri();
var urlparams = url.query;
 
function isset(variable) {
    return typeof variable != 'undefined';
}
 
function empty(param) {
    return param === '';
}
 
function replaceUmlauts(str) {
    return str
    .replace(/[\u00c4]/gm,'Ae')
    .replace(/[\u00e4]/gm,'ae')
    .replace(/[\u00d6]/gm,'Oe')
    .replace(/[\u00f6]/gm,'oe')
    .replace(/[\u00dc]/gm,'Ue')
    .replace(/[\u00fc]/gm,'ue')
    .replace(/[\u00df]/gm,'ss'); 
}
 
function replaceURIChars(str) {
    return str
    .replace(/\r|\n|\r\n/gm,'%0A')
    .replace(/#/gm,'%23')
    .replace(/&/gm,'%26')
    .replace(/?/gm,'%3F')
}
 
function isEven(num) {
    return num % 2 == 0;
}
 
function isOdd(num) {
    return num % 2 == 1;
}
$.fn.extend({
    getOuterHTML : function() {
        return $(this).wrapAll('<div>').parent().html();
    }
});
 
function isUserpage() {
    return ($.inArray(wgNamespaceNumber,[2,3,1200,500]) !== -1 || (wgCanonicalSpecialPageName && $.inArray(wgCanonicalSpecialPageName,['Contributions','Following']) != -1));
}
 
function getUserByPage() {
    if($.inArray(wgNamespaceNumber,[2,1200,500]) != -1) {
        return /:(.*)/.exec(wgPageName)[1].replace('_',' ');
    }
    else if(wgCanonicalSpecialPageName == 'Contributions') {
        return /\/(.*)/.exec(wgPageName)[1].replace('_',' ');
    }
    else if(wgCanonicalSpecialPageName == 'Following') {
        return wgUserName;
    }
}
 
//Thanks to: https://css-tricks.com/snippets/jquery/get-query-params-object/
$.extend({
    getQueryParameters : function(str) {
        return (str || document.location.search).replace(/(^\?)/,'').split("&").map(function(n){return n = n.split("="),this[n[0]] = n[1],this}.bind({}))[0];
    }
});
 
/* Thanks to musefan: https://stackoverflow.com/a/17973165 */
function pad(x){
    if(x < 10) return "0" + x;
    return x;
}
 
function locationHashChanged() {
    console.log('hash changed',location.hash);
    var re1 = /#tab-([0-9]{1,3})-([0-9]{1,3})/;
    var tabber = '$1';
    var tab = '$2';
    var re2 = /#dia-([0-9]{1,3})-([0-9]{1,3})/;
    var diashow = '$1';
    var dia = '$2';
    if (re1.test(location.hash)) {
      tabchange(location.hash.replace(re1,tabber),location.hash.replace(re1,tab));
    }
    else if(re2.test(location.hash)) {
        diashowImgChange(location.hash.replace(re2,diashow),location.hash.replace(re2,dia));
    }
    else {
        console.log('no match found');
    }
}
 
function setHash(text,history) {
    location.hash = '#' + text;
    if(history) {
        history.pushState(null, null, text);
    }
}
 
window.onhashchange = locationHashChanged;
 
function pageExists(title,success,error) {
    $.getJSON('/api.php?action=query&titles=' + title + '&format=json',function(data) {
        console.log(data.query.pages[Object.keys(data.query.pages)[0]].hasOwnProperty('pageid') && !data.query.pages[Object.keys(data.query.pages)[0]].hasOwnProperty('missing'));
        if(data.query.pages[Object.keys(data.query.pages)[0]].hasOwnProperty('pageid') && !data.query.pages[Object.keys(data.query.pages)[0]].hasOwnProperty('missing')) {
            success();
        }
        else {
            error();
        }
    });
}