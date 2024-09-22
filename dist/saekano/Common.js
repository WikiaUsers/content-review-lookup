/* Any JavaScript here will be loaded for all users on every page load. */

(function (window, $, mw) {
	"use strict";
 
	// Bulk loading scripts.
	// scriptList are scripts to load everywhere
	// pageScriptList are scripts which only certain pages need.
	var scriptList = [],
		pageScriptList = [];
		
// Configure AjaxRC
importScriptPage('AjaxRC/code.js', 'dev');
	(window.ajaxPages = (window.ajaxPages || [])).push(
		"Special:RecentChanges",
		"Special:Watchlist",
		"Special:Log",
		"Special:Contributions",
		"Special:NewFiles",
		"Special:NewPages",
		"Special:ListFiles",
		"Special:WikiActivity",
		"Special:Images"
	);
	window.AjaxRCRefreshText = 'Auto-Refresh';
	window.AjaxRCRefreshHoverText = 'Automatically refresh every 60 secs';
	window.ajaxCallAgain = ($.isArray(window.ajaxCallAgain) && window.ajaxCallAgain) || [];
	scriptList.push('u:dev:AjaxRC/code.js');

// Custom edit buttons
	if (mw.toolbar) {
		mw.toolbar.addButton(
			'https://vignette.wikia.nocookie.net/youkoso-jitsuryoku-shijou-shugi-no-kyoushitsu-e/images/c/c8/Button_redirect.png',
			'Redirect',
			'#REDIRECT [[',
			']]',
			'Insert text',
			'mw-editbutton-redirect'
		);
 
		mw.toolbar.addButton(
			'https://vignette.wikia.nocookie.net/youkoso-jitsuryoku-shijou-shugi-no-kyoushitsu-e/images/e/e1/O_Accent_Button.png',
			'Add the ō character',
			'ō',
			'',
			'',
			'mw-editbutton-macron-o'
		);
 
		mw.toolbar.addButton(
			'https://vignette.wikia.nocookie.net/youkoso-jitsuryoku-shijou-shugi-no-kyoushitsu-e/images/d/db/U_Accent_Button.png',
			'Add the ū character',
			'ū',
			'',
			'',
			'mw-editbutton-macron-u'
		);
	}

// Custom Special:[Multiple]Upload UI
	if (({Upload: 1, MultipleUpload: 1})[mw.config.get('wgCanonicalSpecialPageName')] === 1) {
		pageScriptList.push(
			'MediaWiki:Common.js/FairUseUpload.js'
		);
	}
 
	// Remove red-links (deleted pages) from Recent Changes
	// [They stay red, they just don't link to ?action=edit]
	if (({
		Recentchanges: 1,
		Log: 1
	})[mw.config.get('wgCanonicalSpecialPageName')] === 1) {
		var deNewRC = function () {
			$('a.new').each(function () {
				this.href = this.href.replace(/\?[^?]*$/, '');
			});
		};
		$(deNewRC);
		window.ajaxCallAgain.push(deNewRC);
	}
 
	// Add custom class for styling long list of refs
	if ($('.references li').length > 9)
        $('.references').addClass('compactreferences');
 
    // SMW default popup is broken in wikia
    // Use custom modal
    $('.ultisup-image-popup a').click(function(ev) {
        ev.preventDefault();
        $.showCustomModal(this.title, '<img id="ultisup-load" src="https://images.wikia.nocookie.net/__cb1498150157/common/skins/common/images/ajax.gif"/>', {
            width: 1000
        });
        $("#ultisup-load").parent().load(this.href + " #gallery-0");
});
 
	// Oasis-only scripts
	if (mw.config.get('skin') === 'oasis') {
        // Template adder on file pages
        if (mw.config.get('wgCanonicalNamespace') === 'File')
        $(function() {
            if ($.inArray("autoconfirmed", mw.config.get("wgUserGroups")) === -1)
                return;
 
            var Options = {
                    '{{No license}}': 'Unlicensed image',
                    '{{No rationale}}': 'No Fairuse info',
                    '{{Unused}}': 'Unused image',
                    '{{Poor filename}}': 'Poor name'
                },
                tempOptStr = '';
 
            for (var i in Options) {
                tempOptStr += '<option value="' + i + '" style="text-align:center;">' + Options[i] + '</option>';
            }
 
            var html = '<select id="FileTemplateAdder">' + tempOptStr + '</select>&nbsp;<a class="wikia-button" style="margin:0 1em; cursor:pointer;" id="templateSubmit">Add template</a>';
            $('.comments').after(html);
            $('#templateSubmit').click(function() {
                $(this).html('<img src="https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif" style="vertical-align: baseline;" border="0" />');
                new mw.Api().post({
                        format: 'json',
                        action: 'edit',
                        title: mw.config.get('wgPageName'),
                        token: mw.user.tokens.get('editToken'),
                        summary: 'Adding template: ' + $('#FileTemplateAdder').val(),
                        minor: true,
                        prependtext: $('#FileTemplateAdder').val() + "\n"
                    })
                    .done(function() {
                        $('#templateSubmit').text('Add this Template too!');
                        new BannerNotification('Template: ' + $('#FileTemplateAdder').val() + ' Added Successfully', 'confirm').show();
                    })
                    .fail(function() {
                        new BannerNotification('Template addition failed!', 'error').show();
                    });
            });
        });
	}

// Import all scripts in bulk (and minified)
	window.importArticles({
		type: 'script',
		articles: scriptList
	}, {
		type: 'script',
		articles: pageScriptList
	});
/* Adds icons to page header bottom border */
$(document).ready(function() {
	if (skin == "oasis" || skin == "wikia") {
		$('.WikiaPageHeader').append($('#icons'));
		$('#icons').css({'position' : 'absolute', 'right' : '0', 'bottom' : '-1.2em'});
	}
});

/* Hide the breadcrum on pages using Parent Tab */
if($(".parenttab").length) {
    $("#contentSub, .header-column.header-title > h2").hide();
}

}(window, jQuery, mediaWiki));

$(function() {
  $(".fullwidthbanner").each(function() {
    if ($("img", this).attr("src")) srcAttr = "src";
    else if ($("img", this).attr("data-src")) srcAttr = "data-src"; //lazy-loader
    $("img", this).attr(srcAttr, $("img", this).attr(srcAttr).replace(/\/scale-to-width\/\d*\?/g, "/scale-to-width/"+$(this).width()+"?")); 
    $("img", this).attr("width", "" );
    $("img", this).attr("height", "" );
  });
});

/* Javascript for sakura falling effect (Credit to jhammann for this amazing work!) */

/*!
 * Sakura.js 1.1.1
 * Vanilla JS version of jQuery-Sakura: Make it rain sakura petals.
 * https://github.com/jhammann/sakura
 *
 * Copyright 2019-2022 Jeroen Hammann
 *
 * Released under the MIT License
 *
 * Released on: March 4, 2022
 */
"use strict";function _slicedToArray(t,e){return _arrayWithHoles(t)||_iterableToArrayLimit(t,e)||_unsupportedIterableToArray(t,e)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _iterableToArrayLimit(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,a,o=[],i=!0,l=!1;try{for(r=r.call(t);!(i=(n=r.next()).done)&&(o.push(n.value),!e||o.length!==e);i=!0);}catch(t){l=!0,a=t}finally{try{i||null==r.return||r.return()}finally{if(l)throw a}}return o}}function _arrayWithHoles(t){if(Array.isArray(t))return t}function _createForOfIteratorHelper(t,e){var r,n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=_unsupportedIterableToArray(t))||e&&t&&"number"==typeof t.length)return n&&(t=n),r=0,{s:e=function(){},n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:e};throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,o=!0,i=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return o=t.done,t},e:function(t){i=!0,a=t},f:function(){try{o||null==n.return||n.return()}finally{if(i)throw a}}}}function _unsupportedIterableToArray(t,e){if(t){if("string"==typeof t)return _arrayLikeToArray(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Map"===(r="Object"===r&&t.constructor?t.constructor.name:r)||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?_arrayLikeToArray(t,e):void 0}}function _arrayLikeToArray(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}var Sakura=function(t,e){var u=this;if(void 0===t)throw new Error("No selector present. Define an element.");this.el=document.querySelector(t);var r,n;function o(t){return t[Math.floor(Math.random()*t.length)]}function i(t,e){return Math.floor(Math.random()*(e-t+1))+t}this.settings=(r={className:"sakura",fallSpeed:1,maxSize:14,minSize:10,delay:300,colors:[{gradientColorStart:"rgba(255, 183, 197, 0.9)",gradientColorEnd:"rgba(255, 197, 208, 0.9)",gradientColorDegree:120}],lifeTime:0},n=e,Object.keys(r).forEach(function(t){n&&Object.prototype.hasOwnProperty.call(n,t)&&(r[t]=n[t])}),r),this.petalsWeak=new Map,setInterval(function(){if(u.settings.lifeTime){var t,e=[],r=Date.now(),n=_createForOfIteratorHelper(u.petalsWeak);try{for(n.s();!(t=n.n()).done;){var a=_slicedToArray(t.value,2),o=a[0],i=a[1];o+u.settings.lifeTime<r&&(e.push(o),i.remove())}}catch(t){n.e(t)}finally{n.f()}for(var l=0,s=e;l<s.length;l++){var c=s[l];u.petalsWeak.delete(c)}}},1e3),this.el.style.overflowX="hidden";var l=["webkit","moz","MS","o",""];function s(t,e,r){for(var n=0;n<l.length;n+=1){var a=e;l[n]||(a=e.toLowerCase()),t.addEventListener(l[n]+a,r,!1)}}function c(t){t=t.getBoundingClientRect();return 0<=t.top&&0<=t.left&&t.bottom<=(window.innerHeight||document.documentElement.clientHeight)&&t.right<=(window.innerWidth||document.documentElement.clientWidth)}this.createPetal=function(){u.el.dataset.sakuraAnimId&&setTimeout(function(){window.requestAnimationFrame(u.createPetal)},u.settings.delay);var t=["sway-0","sway-1","sway-2","sway-3","sway-4","sway-5","sway-6","sway-7","sway-8"],e=o(["blow-soft-left","blow-medium-left","blow-soft-right","blow-medium-right"]),t=o(t),r=(.007*document.documentElement.clientHeight+Math.round(5*Math.random()))*u.settings.fallSpeed,e=["fall ".concat(r,"s linear 0s 1"),"".concat(e," ").concat((30<r?r:30)-20+i(0,20),"s linear 0s infinite"),"".concat(t," ").concat(i(2,4),"s linear 0s infinite")].join(", "),n=document.createElement("div"),r=(n.classList.add(u.settings.className),i(u.settings.minSize,u.settings.maxSize)),t=r-Math.floor(i(0,u.settings.minSize)/3),a=o(u.settings.colors);n.style.background="linear-gradient(".concat(a.gradientColorDegree,"deg, ").concat(a.gradientColorStart,", ").concat(a.gradientColorEnd,")"),n.style.webkitAnimation=e,n.style.animation=e,n.style.borderRadius="".concat(i(u.settings.maxSize,u.settings.maxSize+Math.floor(10*Math.random())),"px ").concat(i(1,Math.floor(t/4)),"px"),n.style.height="".concat(r,"px"),n.style.left="".concat(Math.random()*document.documentElement.clientWidth-100,"px"),n.style.marginTop="".concat(-(Math.floor(20*Math.random())+15),"px"),n.style.width="".concat(t,"px"),s(n,"AnimationEnd",function(){c(n)||n.remove()}),s(n,"AnimationIteration",function(){c(n)||n.remove()}),u.petalsWeak.set(Date.now(),n),u.el.appendChild(n)},this.el.setAttribute("data-sakura-anim-id",window.requestAnimationFrame(this.createPetal))};Sakura.prototype.start=function(){if(this.el.dataset.sakuraAnimId)throw new Error("Sakura is already running.");this.el.setAttribute("data-sakura-anim-id",window.requestAnimationFrame(this.createPetal))},Sakura.prototype.stop=function(){var e=this,t=0<arguments.length&&void 0!==arguments[0]&&arguments[0],r=this.el.dataset.sakuraAnimId;r&&(window.cancelAnimationFrame(r),this.el.setAttribute("data-sakura-anim-id","")),t||setTimeout(function(){for(var t=document.getElementsByClassName(e.settings.className);0<t.length;)t[0].parentNode.removeChild(t[0])},this.settings.delay+50)};