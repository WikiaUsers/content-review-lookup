(function ($) {
	//generic collapsible block
	//maintainer: user:fngplg
	var nbDebug = false;
	var nbAutocollapse = true; //autocollapse feat
	var nclassName = 'ngcb';
	var nclassContent = 'ngcbcontent';

	function nProxy(target) {
		//proxy 4 ie
		var ntarget = target;
		return function (name, subtarget) {
			if (nbDebug)
				console.log('gcb.nproxy name:' + name + ' st:' + subtarget);
			if (subtarget) {
				if (subtarget.hasOwnProperty(name))
					return subtarget[name];
			} else {
				if (ntarget && ntarget.hasOwnProperty(name))
					return ntarget[name];
			}
			return 0;
		};
	} //nProxy

	function ntry2Stop(target) {
		//stop video on target
		var $nt = $(target).find('video');
		if ($($nt).length === 0)
			return;
		try {
			$($nt).get(0).pause();
		} catch (e) {
			if (nbDebug)
				console.log('gcb.try2Stop e:' + e.name + ':' + e.message);
		}
	} //ntry2Stop

	function nhideSiblings(target, np) {
		//collapse siblings by ngcbGroup
		//var np=new nProxy(nparams);
		if (np.group === 0)
			return;
		var nv = $('.' + nclassContent + '[data-ngcb-group="' + np.group + '"]:visible').not($(target));
		$(nv).slideToggle('fast');
		if (nbDebug)
			console.log('gcb.hs. nv.len:' + $(nv).length);
		if ($(nv).length === 0)
			return;
		ntry2Stop(nv);
	} //nhideSiblings

	function nhandler(e) {
		//gcb main click handler
		var $nhdm = $(e.delegateTarget).data();
		var $nhContent = $(e.delegateTarget).children('.' + nclassContent);
		var $nhdc = ($nhContent).data();
		var npm = new nProxy($nhdm);
		var npc = new nProxy($nhdc);
		var np = {}; //params
		np.esupp = npm('ngcbEsupp');
		np.autoplay = npm('ngcbAutoplay');
		np.group = npc('ngcbGroup');
		if (nbDebug) {
			console.log('gcb.hanlder es:' + np.esupp + ' ap:' + np.autoplay + ' g:' + np.group);
		}
		if ($($nhContent).is(':hidden')) {
			if (np.autoplay === 1) {
				try {
					$($nhContent).find('video').get(0).play();
				} catch (nhe) {
					if (nbDebug)
						console.log('gcb.handler e:' + e.name + ':' + e.message);
				}
			}
		} else {
			ntry2Stop($nhContent);
		}
		nhideSiblings($nhContent, np);
		$($nhContent).slideToggle('fast');
		//event suppression
		return (np.esupp === 0 ? true : false);
	} //nhandler

	function nautocollapse() {
		//autocollapse
		var $nblocks = $('.' + nclassName);
		if (nbDebug)
			console.log('gcb.autocollapse bl.len:' + $($nblocks).length);
		var nproxy = new nProxy();
		$($nblocks).each(function (i, item) {
			var na = nproxy('ngcbAutocollapse', $(item).data());
			if (na === 0) {
				//collapse everything
				$('.' + nclassContent).hide();
				return false; //need no more enumeration
			}
			//get content
			var $nc = $(item).children('.' + nclassContent + ':visible');
			if (nbDebug)
				console.log('gcb.autocollapse item' + i + '.v:' + $($nc).is(':visible'));
			if ($nc) {
				//collapse group
				var ng = nproxy('ngcbGroup', $($nc).data());
				if (nbDebug)
					console.log('gcb.autocollapse ng' + i + ':' + ng);
				if (ng !== 0) {
					nhideSiblings($nc, {group : ng});
				}
			}
		});
	} //nautocollapse

	function naddHandler() {
		if (window.ngcbHandler && !nbDebug)
			return;
		window.ngcbHandler = true;
		if (nbAutocollapse)
			nautocollapse();
		$('.' + nclassName).on('click.' + nclassName, nhandler);
	} //naddHandler

	$(naddHandler); //doc.load
}(jQuery)); //gcb