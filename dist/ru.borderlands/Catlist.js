//<pre>
//maintenance script. if you see this script in the js review queue, then decline it.
$('body').hide();
//$.getScript('http://ru.borderlands.wikia.com/wiki/MediaWiki:catlist.js?action=raw')
//собирает ссылки со страниц из массива pages, используя selector для определения ссылок
//результат кладёт в модуль module, оптимизированный для mw.loaddata

(function($){
    if (!['sysop', 'bureaucrat'].some(function(v){return window.wgUserGroups.includes(v)})) return;
    var cl = {};//main obj
    cl.module = 'module:nbigdatacat';
    cl.pages = [
        {name: 'special:categories', selector: '.mw-spcontent > ul > li a'},
        {name: 'special:unusedcategories', selector: '.mw-spcontent > ol > li a'}
        ];
    cl.sync = []; //sync element
    cl.state = 0; //0=stoppped, 1=working, 2=finalization
    cl.links = [];//links
    
    cl.getObj = function (data, key) {
        //traverse through object tree
        var ret = [], r;
        for (var k in data) {
            if (data[k] instanceof Object) {
                if (k === key) {
                    ret.push(data[k]);
                }
                r = cl.getObj(data[k], key);
                if (r) ret = ret.concat(r);
            } //if obj
        } //for k in data
        return ret;
    }; //getObj
 
    cl.getVal = function (data, key) {
        //travers through object tree
        var ret = [], r;
        for (var k in data) {
            if (data[k] instanceof Object) {
                r = cl.getVal(data[k], key);
                if (r) {
                    ret = ret.concat(r);
                }
            } else {
                if (k === key) {
                    ret.push(data[k]);
                }
            } //if obj
        } //for k in data
        return ret;
    }; //getVal
    
    cl.start = function (id) {
        if (cl.sync && cl.sync.indexOf(id) > -1) return false;
        cl.sync.push(id);
        cl.state = 1;
        console.log('cl.start sync.len', cl.sync.length);
        return true;
    };//start
    
    cl.stop = function (id) {
        cl.sync.splice(0, 1);
        if ((cl.state === 2) && (cl.sync.length === 0)) {
            console.log('cl.stop sync.len', cl.sync.length);
            $(document).trigger('cl:complete');
        }
    }; //stop
    
    cl.hlpGet = function (item) {
        //get helper
        var url = (new mw.Uri('/wiki/' + item.name)).extend({limit:5000});
        $.get(url).done(function(data){
            $(data).find(item.selector).map(function(i, v){
                cl.links.push($(v).text());
            });
            cl.stop();
        });//get
    };//hlpget
    
    cl.gather = function () {
        //gather links
        cl.links = [];
        for (var i=0, len=cl.pages.length; i<len; i++) {
            if (cl.start(cl.pages[i].name)) {
                cl.hlpGet(cl.pages[i]);
            }
        }//for i pages
        cl.state = 2;
        console.log('cl.state', cl.state);
    };//gather
    
    cl.hlpContent = function () {
        //create module content helper
        var s = 'p = {';
        var r1 = new RegExp("'",'g'), r2 = new RegExp('"','g');
        for (var i=0, len=cl.links.length, s1; i<len; i++) {
            s1 = cl.links[i];
            s1 = s1.replace(r1, "\\'").replace(r2, '\\"');
            s1 = '[\'' + s1 + '\']=\'' + s1 + '\'' + (i === len - 1 ? '' : ',');
            s = s + s1;
        }//for i links
        s = s + '}\nreturn p';
        return s;
    };//hlpcontent
    
    cl.oncomplete = function () {
        console.log('cl.complete links', cl.links.length);
        cl.modulecontent = '';
        var qurl = (new mw.Uri('/api.php')).extend({action: 'query', titles: cl.module,
                prop: 'info', intoken: 'edit', format: 'json'});
        //get edit token
        $.getJSON(qurl).done(function(data){
            console.log('cl. get token', qurl, data);
            var etoken = cl.getVal(cl.getObj(data, 'pages'), 'edittoken')[0];
            console.log('cl. etoken', etoken);
            cl.modulecontent = cl.hlpContent();
            var eurl = (new mw.Uri('/api.php'));
            var edata = {action: 'edit', title: cl.module,
                text: cl.modulecontent, summary: 'catlist update',
                minor: '', bot: '', format: 'json', token: etoken};
            //save data to module
            $.post(eurl.toString(), edata)
            .done(function(e, stat){
                if (e.error) {
                    console.log('cl. save error', e.error.code + ': ' + e.error.info);
                } else {
                    console.log('cl. save', stat, e.edit, e);
                }
            })//done
            .fail(function(e, e1, e2){console.log('cl. save mega fail', e, e1, e2)});
        });//get qurl
    };//oncomplete
    
    window.catlist = cl;
    $(document).off('cl:complete'); //remove artefacts
    $(document).on('cl:complete', cl.oncomplete);
    cl.gather();
}(jQuery));