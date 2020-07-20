(function ($) {
	//deferred image loader
	//maintainer user:fngplg
	var nbDebug = false;
	var nbCollapseSiblings=true; //group logic
	var nmainClassName = 'ndeferred';
	var ncontentClassName = 'ndcontent';
	var nNamespace=0;
	//var nbaseUri='http://ru.borderlands.wikia.com';
	//there is no proxy on ie11
	var niTypes = {
		//types. 1-video; 2-gif; 3-youtube
		avi : 1, //generic video
		bmp : 2,
		flv : 1,
		gif : 2, //generic image
		jpg : 2,
		jpeg : 2,
		mp4 : 1,
		ogg : 4,
		png : 2,
		svg : 2,
		youtube: 3
	};

	function nProxy(target) {
		//proxy 4 ie
		var ntarget = target;
		return function (name) {
			if (ntarget && ntarget.hasOwnProperty(name)) {
				return ntarget[name];
			} else {
				return '0';
			}
		};
	} //nProxy

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
		if (nbDebug) console.log('ndl.gettype.2nd.nt1:' + nt1('ndlPath'));
		nts = nt1('ndlPath').split('.');
		var nt = 0;
		nt = t(nts[nts.length - 1].toLowerCase());
		if (nt !== 0)
			return nt;
		//3rd chck-src name
		if (nbDebug) console.log('ndl.gettype.3rd.nt1:' + nt1('ndlOrigin'));
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
        var ns=np.origin.split('v=');
        var nsp='';
        if (ns.length>1) {
            nsp=ns[1];
        } else {
            ns=npath.split('youtu.be/');
            if (ns.length>1) {
                nsp=ns[1];
            } else {
                nsp=np.origin;
            }
        }
        var nyoutube='//www.youtube.com/embed/'+nsp+'?feature=player_embedded&autoplay=1';
        var $nvideo=$('<iframe />', {
            width: (np.width>0)?np.width:200,
            height: (np.height>0)?np.height:200,
            frameborder: 0,
            allowfullscreen: true,
            src: nyoutube
            }).appendTo($(ntarget));
	} //naddYoutube
	
	function nhideSiblings(target) {
        //collapse siblings by ndlGroup
        if (!nbCollapseSiblings) return;
        var nt=new nProxy($(target).data());
        if (nbDebug) console.log('hs '+nt('ndlGroup'));
        if (nt('ndlGroup')===0) return;
        var nv=$('.'+ncontentClassName+'[data-ndl-group="'+nt('ndlGroup')+'"]:visible').not($(target));//.find(':visible');
        $(nv).slideToggle('fast');
        if (nbDebug) console.log('ndl.hs. nv.len:'+$(nv).length);
        if ($(nv).length===0) return;
        try {
            $(nv).find('video').get(0).pause();
        }
        catch (e) {
            if (nbDebug) console.log('ndl.nhideSiblings. e:'+e.name+':'+e.message);
        }
	} //nhideSiblings

	function nhandler(e) {
		//if (nbdefLHandler) return;
		//e.preventDefault();
		//e.stopPropagation();
		if (nbDebug) {
            console.log('ndl.handler.e:' + e);
            console.log('ndl.handler.e.target:' + e.target.innerHTML);
            console.log('ndl.handler.e.dtagret:' + e.delegateTarget.innerHTML);
		}
		if (e.target !== e.delegateTarget) return;
		var $ntarget = $(e.delegateTarget).find('.' + ncontentClassName);
		//var $ndata = null;
		//if ($(e.delegateTarget).hasClass(ncontentClassName)) {
            //if (nbDebug) console.log('ndl.handler. target.hasclass(content)=true');
            //$ndata = $(e.delegateTarget).parent('.' + nmainClassName).data();
		//} else {
        var $ndata = $(e.delegateTarget).data();
		//}
		if ($ndata === undefined) {
            return false;
		} else {
            if (nbDebug) console.log('ndl.handler.e.data.len:' + $($ndata).length);
		}
		if ($($ntarget).data('nloaded')) {
			if ($($ntarget).is(':hidden')) {
                nhideSiblings($ntarget);
				//if ((($ntarget).data('itype') == 1) || (($ntarget).data('itype') == 4)) {
				try {
					$($ntarget).find('video').get(0).play();
				}
				catch (e) {
                    if (nbDebug) console.log('ndl.handler.play. e:' + e.name + ':' + e.message);
				}
			} else {
				//if ((($ntarget).data('itype') == 1) || (($ntarget).data('itype') == 4)) {
				try {
					$($ntarget).find('video').get(0).pause();
				}
				catch (e) {
                    if (nbDebug) console.log('ndl.handler.pause. e:' + e.name + ':' + e.message);
				}
			}
			$($ntarget).slideToggle('fast');
			return false;
		}
		nhideSiblings($ntarget);
		$($ntarget).data('nloaded', true);
		$($ntarget).show();
		var nt = $($ntarget).text();
		//data-: ndlPath, ndlOrigin, ndlWidth, ndlHeight, ndlPoster, ndlType
		var nprox = new nProxy($ndata);
		var nipath = nprox('ndlPath');
		nipath = (nipath === 0 ? '' : nipath.trim());
		var np = {
			width : nprox('ndlWidth'),
			height : nprox('ndlHeight'),
			poster : nprox('ndlPoster'),
			srctype : nprox('ndlStype'),
			path : nprox('ndlPath'),
			origin : nprox('ndlOrigin')
		};
		var nst = ngetType($ndata);
		$($ntarget).data('itype', nst);
		//$($ntarget).text(''); //remove settings. deprecated is
		switch (nst) {
		case 1:
			//video
			naddVideo(nipath, $ntarget, np);
			break;
		case 2:
			//image
			naddImage(nipath, $ntarget, np);
			break;
		case 3:
            //youtube
            naddYoutube(nipath, $ntarget, np);
            break;
        case 4:
            //ogg
            np.srctype='video/ogg';
            naddVideo(nipath, $ntarget, np);
            break;
		default:
			//gif by default
			naddImage(nipath, $ntarget, np);
			break;
		}
		return true;
	} //nhandler

	function naddHandler() {
		if (nbDebug) {
			//remove prev handler
			console.log('ndl. ah');
			$('.' + nmainClassName + ':not(.' + ncontentClassName + ')').off('click', nhandler);
		}
		if (window.ndlHandler && (nNamespace !== 2) && !nbDebug) return;
		window.ndlHandler=true;
		$('.' + nmainClassName + ':not(.' + ncontentClassName + ')').off('click', nhandler);
		$('.' + nmainClassName + ':not(.' + ncontentClassName + ')').on('click', nhandler);
	} //naddHandler
    
    function nmain() {
        switch (mw.config.get('wgNamespaceNumber')) {
            case 0:
                nNamespace = 2;
                naddHandler(); //article handler
                //comments handler. w8 4 comm
                var ntimer=setInterval(function() {
                    var naComs = $('.article-comments').length || 0;
                    if (naComs > 0) {
                        clearInterval(ntimer);
                        naddHandler();
                    }
                }, 3000);
                break;
            case 1201:
                nNamespace = 1;
                naddHandler();
                break;
            default:
                console.log('ndl.namespace:' + nNamespace);
                naddHandler();
                break;
        }
    } //nmain
	
	$(nmain);
}(jQuery)); //deferred image loader