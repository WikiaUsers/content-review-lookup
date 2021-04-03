(function ($) {
    //deferred image loader
    //maintainer user:fngplg
	var urlVars = new URLSearchParams(location.search);
    var nbDebug = urlVars.get('debug') || urlVars.get('debug1');
    var nbCollapseSiblings = true; //group logic
    var nmainClassName = 'ndeferred';
    var ncontentClassName = 'ndcontent';
    //var nbaseUri='http://ru.borderlands.wikia.com';
    //there is no proxy on ie11
    var niTypes = {
        //types. 1-video; 2-gif; 3-youtube
        avi: 1, //generic video
        bmp: 2,
        flv: 1,
        gif: 2, //generic image
        jpg: 2,
        jpeg: 2,
        mp4: 1,
        ogg: 4,
        png: 2,
        svg: 2,
        youtube:3
    };
    
    var log = function log() {
        log.a = [].slice.call(arguments);
        log.a.unshift('ndl');
        if (nbDebug) console.log.apply(this, log.a);
    };//log
    
    function nProxy(target) {
        //proxy 4 ie
        var ntarget = target;
        return function (name) {
            if (ntarget && ntarget.hasOwnProperty(name)) {
                return ntarget[name];
            } else {
                return 0;
            }
        };
    } //nProxy

    function _chkSrc(src) {
        //chk src, returns true if src forbidden is
        var hostname;
        try {
            hostname = (new mw.Uri(src)).host;
        }
        catch (exc) {
            //bad uri, ignore it
            hostname = 'wikia.com';
        }
        return (hostname.toLowerCase() === 'images.wikia.com' ? false : hostname.match(/.*?\.wikia\.com/i));
    }//_chksrc
    
    function chkSrc(src) {
        //chk src, returns true if (one of) src forbidden is
        var isTrue = false;
        if (typeof(src) === 'string') return _chkSrc(src);
        //something weird happened, disable it
        if (!$.isArray(src)) return true;
        $.each(src, function() {
            isTrue = isTrue || _chkSrc(this);
        });//each src
        return isTrue;
    }//chksrc

    function ngetType(ns) {
        //returns source type
        //1st chck-user defined type
        var t = new nProxy(niTypes);
        var nt1 = new nProxy(ns);
        var nts = nt1('ndlType');
        if (nts !== 0) {
            return t(nts);
        }
        //2nd chk-path
        log('gettype.2nd.nt1:', nt1('ndlPath'));
        nts = nt1('ndlPath').split('.');
        var nt = 0;
        nt = t(nts[nts.length - 1].toLowerCase());
        if (nt !== 0)
            return nt;
        //3rd chck-src name
        log('gettype.3rd.nt1:', nt1('ndlOrigin'));
        nts = nt1('ndlOrigin').split('.');
        nt = t(nts[nts.length - 1].toLowerCase());
        if (nt !== 0)
            return nt;
        return 0; //nothing found
    } //ngetType

    function naddImage(npath, ntarget, np) {
        //add img tag
        var nimage = new Image();
        nimage.src = npath;
        if (np.width > 0)
            nimage.width = np.width;
        if (np.height > 0)
            nimage.height = np.height;
        $(nimage).appendTo($(ntarget));
    } //naddImage

    function naddVideo(npath, ntarget, np) {
        //add video tag
        var nvideo = document.createElement('video');
        nvideo.controls = true;
        nvideo.preload = "none";
        nvideo.loop = true;
        if (np.width > 0)
            nvideo.width = np.width;
        if (np.height > 0)
            nvideo.height = np.height;
        if (np.poster.length > 20)
            nvideo.poster = np.poster;
        var nsrc = document.createElement('source');
        nsrc.src = npath;
        if (np.srctype && np.srctype.length > 2) nsrc.type=np.srctype;
        nvideo.appendChild(nsrc);
        //$(nsrc).appendTo($(nvideo));
        $(nvideo).appendTo($(ntarget));
        $(nvideo).ready(function () {
            nvideo.play();
            $(ntarget).data('nactive', true);
        });
    } //naddVideo
    
    function naddYoutube(npath, ntarget, np) {
        //add youtube video
        //get video id
        var ns = np.origin.split('v=');
        var nsp = '';
        if (ns.length > 1) {
            nsp = ns[1];
        } else {
            ns = npath.split('youtu.be/');
            if (ns.length > 1) {
                nsp = ns[1];
            } else {
                nsp = np.origin;
            }
        }
        var nyoutube = '//www.youtube.com/embed/' + nsp + (nsp.search(/\?/) > -1 ? '&' : '?') + 'feature=player_embedded&autoplay=1';
        var $nvideo = $('<iframe />', {
            width: (np.width > 0) ? np.width : 200,
            height: (np.height > 0) ? np.height: 200,
            frameborder: 0,
            allowfullscreen: true,
            allow: 'autoplay; encrypted-media',
            src: nyoutube
            }).appendTo($(ntarget));
    } //naddYoutube
    
    function nhideSiblings($target) {
        //collapse siblings by ndlGroup
        if (!nbCollapseSiblings) return;
        var nt = $target.data() || {};
        log('hs', nt.ndlGroup);
        if (!nt.ndlGroup) return;
        var $nv = $('.' + ncontentClassName + '[data-ndl-group="' + nt.ndlGroup + '"]:visible').not($target);//.find(':visible');
        $nv.slideToggle('fast');
        log('hs nv.len:', $nv.length);
        if (!$nv.length) return;
        try {
            $nv.find('video').get(0).pause();
        }
        catch (e) {
            log('nhideSiblings. e:', e);
        }
    } //nhideSiblings

    function nhandler(e) {
        //e.preventDefault();
        //e.stopPropagation();
        log('handler.e:', e);
        var $ntarget = $(e.target);
        var $ncontent = $ntarget.find('.' + ncontentClassName);
        var $ndata = $(e.target).data();
        if (!($ndata && $($ndata).length)) {
            return false;
        } else {
            log('handler.e.data:',  $ndata);
        }
        if ($ndata.nloaded) {
            if ($ncontent.is(':hidden')) {
                nhideSiblings($ncontent);
                //if ((($ntarget).data('itype') == 1) || (($ntarget).data('itype') == 4)) {
                try {
                    $ncontent.find('video').get(0).play();
                }
                catch (e) {
                    log('handler.play. e:', e);
                }
            } else {
                //if ((($ntarget).data('itype') == 1) || (($ntarget).data('itype') == 4)) {
                try {
                    $ncontent.find('video').get(0).pause();
                }
                catch (e) {
                    log('handler.pause. e:', e);
                }
            }
            $ncontent.slideToggle('fast');
            return false;
        }
        nhideSiblings($ncontent);
        $ntarget.data('nloaded', true);
        $ncontent.show();
        //data-: ndlPath, ndlOrigin, ndlWidth, ndlHeight, ndlPoster, ndlType
        var nprox = new nProxy($ndata);
        var nipath = $ndata.ndlPath;
        nipath = nipath ? nipath.trim() : '';
        if (chkSrc(nipath)) {
            //src is forbidden is. is!
            $ncontent.hide();
            log('verboten!', nipath);
            return;
        }
        var np = {
            width: nprox('ndlWidth'),
            height: nprox('ndlHeight'),
            poster: nprox('ndlPoster'),
            srctype: nprox('ndlStype'),
            path: nprox('ndlPath'),
            origin: nprox('ndlOrigin')
        };
        var nst = ngetType($ndata);
        $ntarget.data('itype', nst);
        switch (nst) {
            case 1:
                //video
                naddVideo(nipath, $ncontent, np);
                break;
            case 2:
                //image
                naddImage(nipath, $ncontent, np);
                break;
            case 3:
                //youtube
                naddYoutube(nipath, $ncontent, np);
                break;
            case 4:
                //ogg
                np.srctype='video/ogg';
                naddVideo(nipath, $ncontent, np);
                break;
            default:
                //gif by default
                naddImage(nipath, $ncontent, np);
                break;
        }
        return true;
    } //nhandler

    $('body').on('click', '.' + nmainClassName + ':not(.' + ncontentClassName + ')', nhandler);
}(jQuery)); //deferred image loader