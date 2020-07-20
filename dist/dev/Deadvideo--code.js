//<pre>
//dead video link detector
//personal use only
//uses 3rd-party proxy (noembed.com) to connect to youtube
//maintainer: user:fngplg
(function($) {
    var dv = {},
        mwc = mw.config.get(['wgArticlePath']);
    dv.cpage = -1; //current page
    dv.isStop = true;

    dv.deadhlp = function (data) {
        //dead helper
        dv.txtDead.val(dv.txtDead.val() + data.file + '|' + data.eurl + '\n');
    };//deadhlp
    
    dv.process = function () {
        if (dv.isStop) {
            return;
        }
        dv.txtSPage.get(0).value = dv.cpage;
        var url = mwc.wgArticlePath.replace('$1', 'Special:Video?format=json&page=' + dv.cpage);
        $.getJSON(url).done(function(data){
            if (data && data.videos && data.videos.length>0) {
                //add videos to list
                var eurl;
                for (var i=0, len=data.videos.length, v=data.videos; i<len; i++) {
                    dv.txtFile.val(dv.txtFile.val() + v[i].fileKey + '|' + v[i].embedUrl + '\n');
                    eurl = v[i].embedUrl;//.split('/embed/')[1];
                    if (dv.isProvider(eurl)) {
                        dv.isalive(eurl, v[i].fileKey, v[i].embedUrl).then(null, dv.deadhlp);
                    }//if isProvider
                }
            } else { //all video pages processed yet
                dv.stop();
                return this;
            }//if data.videos
            //process next
            dv.cpage++;
            setTimeout(dv.process.bind(this), 500);
        });//getjson
    };//process
    
    dv.isalive = function (vid, file, eurl) {
        var prom = new Promise(function (resolve, reject) {
            var url = vid;//'https://www.youtube.com/watch?v=' + vid;
            $.getJSON('https://noembed.com/embed?callback=?', {'format': 'json', 'url': url}).done(function(data){
                if (data && data.title) {
                    //alive
                    resolve({file: file, eurl: eurl, data: data});
                } else {
                    reject({file: file, eurl: eurl, data: data});
                }//if data
            }).fail(function(e){reject({file: file, eurl: eurl, e: e})});//getjson
        });//promise
        return prom;
    };//isalive
    
    dv.start = function (ev) {
        dv.cpage = parseInt(dv.txtSPage.get(0).value || 1, 10) || 1;
        dv.txtSPage.get(0).value = dv.cpage;
        dv.btnStart.get(0).disabled = true;
        dv.btnStop.get(0).disabled = false;
        dv.btnStuffClick({hidestuff: true});
        dv.isStop = false;
        dv.process();
    };//start
    
    dv.stop = function () {
        dv.isStop = true;
        dv.btnStart.get(0).disabled = false;
        dv.btnStop.get(0).disabled = true;
        dv.btnStuffClick({showstuff: true});
    };//stop
    
    dv.btnStuffClick = function (e) {
        //btnStuff click handler
        //stuff shouldn't work until processing done
        var state = dv.isStop ? false : true;
        var showstuff = e ? e.showstuff ? 1 : e.hidestuff ? 2 : 0 : 0;
        for (var k in dv.stuff) {
            if (dv.stuff[k] instanceof jQuery) {
                dv.stuff[k].get(0).disabled = state;
            }
        }//each dv.stuff
        switch (showstuff) {
            case 1:
                dv.guiStuff.show();
                break;
            case 2:
                dv.guiStuff.hide();
                break;
            default:
                dv.guiStuff.toggle();
                break;
        }//switch showstuff
    };//btnStuffClick
    
    dv.btnWikiClick = function () {
        //btnWiki click handler
        if (dv.deadwiki && dv.deadwiki.length > 0) return;//already wikified
        dv.deadwiki = dv.getArrayWiki(dv.txtDead.val());
        var s = '';
        for (i=0, len=dv.deadwiki.length; i<len; i++) {
            s = s + dv.deadwiki[i].filelink + '\n';
        }//for i deadwiki
        dv.txtDead.val(s);
        dv.deadplain = [];
    };//btnWikiClick
    
    dv.btnPlainClick = function () {
        //btnPlain click handler
        if (dv.deadplain && dv.deadplain.length > 0) return;//already plain
        if (dv.deadwiki && dv.deadwiki.length > 0) {
            dv.deadplain = dv.getArrayPlain(dv.deadwiki);
        } else {//plain by default
            return;
        }//if deadwiki
        var s = dv.deadplain.join('\n');
        dv.txtDead.val(s);
        dv.deadwiki = [];
    };//btnPlainClick
    
    dv.getArrayPlain = function (src) {
        //returns array by src data. format: string: file|link
        if (src instanceof String || typeof src === 'string') return src.split('\n');
        var asrc = [];//src array
        var aret = [];//ret array
        if (src instanceof Array || (src.constructor && src.constructor === Array)) asrc = src;
        for (var i=0, len=asrc.length, s; i<len; i++) {
            s = asrc[i].file + '|' + asrc[i].link;
            aret.push(s);
        }//for i deadwiki
        return aret;
    };//getArrayPlain
    
    dv.getArrayWiki = function (src) {
        //returns array by src data. format: {file: file, link: link, filelink: [[file]] [link]}
        //src format: string: file|link
        var asrc = [];//src array
        var aret = [];//ret array
        if (src instanceof String || typeof src === 'string') {
            asrc = dv.getArrayPlain(src);
        } else {
            asrc = src;
        }//if src
        for (var i=0, len=asrc.length, a, file, link, filelink, s; i<len; i++) {
            if (!asrc[i]) continue;
            a = asrc[i].split('|');
            file = a[0];
            link = a[1];
            s = link.split('/');
            s = s[s.length - 1];
            s = /([^\?]*)?|$/.exec(s)[1];
            filelink = '[[:file:' + file + ']] ' + '[' + link + ' ' + s + ']';
            aret.push({file: file, link: link, filelink: filelink});
        }//for i asrc
        return aret;
    };//getArrayWiki
    
    dv.checkProvider = function (provider) {
        if (!provider.patterns || !this.url) return false;
        return provider.patterns.some(function(pattern){
                return pattern.test(this.url);
            }, {'url': this.url});
    };//checkProvider
    
    dv.isProvider = function (url) {
        //is provider supported
        return dv.providers.some(dv.checkProvider, {'url': url});
    };//isProvider
    
    dv.getProviders = function () {
        $.getJSON('https://noembed.com/providers').done(function(data){
            dv.providers = data;
            //convert txt patterns to regex
            dv.providers = dv.providers.map(function(val, index, arr){
                val.patterns = val.patterns.map(function(val){
                    return new RegExp(val);
                });//map patterns
                return val;
            });//map providers
        });//getjson
    };//getProviders
    
    dv.init = function init () {
        if (window.deadvideo) return;
        window.deadvideo = dv;
        dv.getProviders();
        dv.createGui();
        dv.btnShow=$('<button/>', {text:'dead video'}).on('click', function(){
            dv.Gui.toggle();
        });//btnShow.click
        //$btn.css('float', 'right');
        $('.page-header__contribution .page-header__contribution-buttons').prepend(dv.btnShow);
    };//init
    
    dv.createGui = function () {
        dv.Gui=$('<div/>', {class: 'deadvideo-gui', id: 'deadvideo-gui'});
        dv.Gui.hide();
        $('#mw-content-text').prepend(dv.Gui);
        dv.guiHead=$('<div/>', {id: 'dv-head'}).appendTo(dv.Gui);
        dv.lblSPage=$('<label/>', {text: 'page'}).appendTo(dv.guiHead);
        dv.txtSPage=$('<input type="text"/>', {id: 'dv-start-page'}).appendTo(dv.guiHead);
        dv.txtSPage.css('width', '3em');
        dv.guiBtn=$('<div/>', {id: 'dv-btn'}).appendTo(dv.guiHead);
        dv.guiBtn.css('display', 'inline-flex').css('float', 'right');
        dv.btnStart=$('<button/>', {text: 'start', id: 'dv-btn-start'}).appendTo(dv.guiBtn);
        $(dv.Gui).on('click', '#dv-btn-start', dv.start);
        dv.btnStop=$('<button/>', {text: 'stop', id: 'dv-btn-stop', disabled: true}).appendTo(dv.guiBtn);
        $(dv.Gui).on('click', '#dv-btn-stop', dv.stop);
        dv.btnStuff = $('<button/>', {text: 'stuff', id: 'dv-btn-stuff'}).appendTo(dv.guiBtn);
        $(dv.Gui).on('click', '#dv-btn-stuff', dv.btnStuffClick);
        dv.guiStuff = $('<div/>', {id: 'dv-stuff'}).appendTo(dv.Gui);
        dv.guiStuff.css('display', 'none');
        dv.stuff = {};
        dv.stuff.btnWiki = $('<button/>', {text: 'wikitext', id: 'dv-btn-wiki'}).appendTo(dv.guiStuff);
        $(dv.Gui).on('click', '#dv-btn-wiki', dv.btnWikiClick);
        dv.stuff.btnPlain = $('<button/>', {text: 'plain', id: 'dv-btn-plain'}).appendTo(dv.guiStuff);
        $(dv.Gui).on('click', '#dv-btn-plain', dv.btnPlainClick);
        dv.guiData=$('<div/>', {id: 'dv-data'}).appendTo(dv.Gui);
        dv.txtFile=$('<textarea/>', {id: 'dv-data-file'}).appendTo(dv.guiData);
        dv.txtFile.css('width', '100%').css('height', '100px');
        dv.txtDead=$('<textarea/>', {id: 'dv-data-dead'}).appendTo(dv.guiData);
        dv.txtDead.css('width', '100%').css('height', '100px');
    };//createGui
    
    $(dv.init);
})(jQuery);