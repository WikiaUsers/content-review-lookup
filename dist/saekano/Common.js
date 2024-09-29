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
(function() {
    "use strict";

    function _slicedToArray(array, limit) {
        return _arrayWithHoles(array) || _iterableToArrayLimit(array, limit) || _unsupportedIterableToArray(array, limit) || _nonIterableRest();
    }

    function _nonIterableRest(){
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    function _iterableToArrayLimit(iterable, limit){
        var iterator = iterable == null ? null : (typeof Symbol !== "undefined" && iterable[Symbol.iterator]) || iterable["@@iterator"];
        if (iterator != null) {
            var step, result, elements = [], done = true, error = false;
            try {
                for (iterator = iterator.call(iterable); !(done = (step = iterator.next()).done) && (elements.push(step.value), !limit || elements.length !== limit); done = true);
            } catch (err) {
                error = true;
                result = err;
            } finally {
                try {
                    if (!done && iterator.return != null) iterator.return();
                } finally {
                    if (error) throw result;
                }
            }
            return elements;
        }
    }

    function _arrayWithHoles(array){
        if (Array.isArray(array)) return array;
    }

    function _createForOfIteratorHelper(obj, allowArrayLike) {
        var iterator, result, done = true, error = false;
        var prefixes = ["webkit", "moz", "MS", "o", ""];
        var helperStr = typeof Symbol !== "undefined" && obj[Symbol.iterator] || obj["@@iterator"];
        if (!helperStr){
            if (Array.isArray(obj) || (iterator = _unsupportedIterableToArray(obj)) || allowArrayLike && obj && typeof obj.length === "number") {
                if (iterator) obj = iterator;
                var index = 0;
                return {
                    s: function() {},
                    n: function() {
                        return index >= obj.length ? {done: true} : {done: false, value: obj[index++]};
                    },
                    e: function(err){
                        throw err;
                    },
                    f: function() {}
                };
            }
            throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        return {
            s: function() {
                iterator = helperStr.call(obj);
            },
            n: function() {
                var step = iterator.next();
                done = step.done;
                return step;
            },
            e: function(err){
                error = true;
                result = err;
            },
            f: function(){
                try {
                    if (!done && iterator.return != null) iterator.return();
                } finally {
                    if (error) throw result;
                }
            }
        };
    }

    function _unsupportedIterableToArray(obj, minLen){
        if (obj){
            if (typeof obj === "string") return _arrayLikeToArray(obj, minLen);
            var tag = Object.prototype.toString.call(obj).slice(8, -1);
            var adjustedTag = tag === "Object" && obj.constructor ? obj.constructor.name : tag;
            if (adjustedTag === "Map" || adjustedTag === "Set") return Array.from(obj);
            if (adjustedTag === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(adjustedTag)) return _arrayLikeToArray(obj, minLen);
        }
    }

    function _arrayLikeToArray(arr, len){
        (len == null || len > arr.length) && (len = arr.length);
        var copied = [];
        for(var i = 0; i < len; i++) copied[i] = arr[i];
        return copied;
    }

    function Sakura(selector, options) {
        if (selector === undefined) throw new Error("No selector present. Define an element.");
        this.el = document.querySelector(selector);

        this.settings = {
            className: "sakura",
            fallSpeed: 1,
            maxSize: 14,
            minSize: 10,
            delay: 300,
            colors: [{
                gradientColorStart: "rgba(255, 183, 197, 0.9)",
                gradientColorEnd: "rgba(255, 197, 208, 0.9)",
                gradientColorDegree: 120
            }],
            lifeTime: 0
        };

        if (options) {
            for (var key in options) {
                if (options.hasOwnProperty(key)) {
                    this.settings[key] = options[key];
                }
            }
        }

        this.petalsWeak = new Map();

        var self = this;
        setInterval(function() {
            if(self.settings.lifeTime){
                var expiredKeys = [];
                var now = Date.now();
                var iteratorHelper = _createForOfIteratorHelper(self.petalsWeak);
                try {
                    var step;
                    while(!(step = iteratorHelper.n()).done) {
                        var _ref = _slicedToArray(step.value, 2),
                            timestamp = _ref[0],
                            element = _ref[1];
                        if(timestamp + self.settings.lifeTime < now){
                            expiredKeys.push(timestamp);
                            element.remove();
                        }
                    }
                } catch(error) {
                    iteratorHelper.e(error);
                } finally {
                    iteratorHelper.f();
                }
                for(var i = 0; i < expiredKeys.length; i++){
                    self.petalsWeak.delete(expiredKeys[i]);
                }
            }
        }, 1000); // Changed 1e3 to 1000 for clarity

        this.el.style.overflowX = "hidden";

        var prefixes = ["webkit", "moz", "MS", "o", ""];

        function addEventListenerWithPrefixes(element, eventName, handler) {
            prefixes.forEach(function(prefix) {
                var prefixedEvent = prefix ? prefix + eventName : eventName.toLowerCase();
                element.addEventListener(prefixedEvent, handler, false);
            });
        }

        function isElementInViewport(element) {
            var rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }

        this.createPetal = function() {
            if(self.el.dataset.sakuraAnimId){
                setTimeout(function() {
                    window.requestAnimationFrame(self.createPetal);
                }, self.settings.delay);
            }

            var swayClasses = ["sway-0","sway-1","sway-2","sway-3","sway-4","sway-5","sway-6","sway-7","sway-8"];
            var blowClasses = ["blow-soft-left","blow-medium-left","blow-soft-right","blow-medium-right"];

            var swayClass = self.getRandomItem(swayClasses);
            var blowClass = self.getRandomItem(blowClasses);
            var fallSpeed = (0.007 * document.documentElement.clientHeight + Math.round(5 * Math.random())) * self.settings.fallSpeed;

            var animation = [
                "fall " + fallSpeed + "s linear 0s 1",
                blowClass + " " + (fallSpeed > 30 ? fallSpeed : 30 - 20 + self.getRandomInt(0, 20)) + "s linear 0s infinite",
                swayClass + " " + self.getRandomInt(2, 4) + "s linear 0s infinite"
            ].join(", ");

            var petal = document.createElement("div");
            petal.classList.add(self.settings.className);
            var size = self.getRandomInt(self.settings.minSize, self.settings.maxSize);
            var width = size - Math.floor(self.getRandomInt(0, self.settings.minSize) / 3);
            var color = self.getRandomItem(self.settings.colors);

            petal.style.background = "linear-gradient(" + color.gradientColorDegree + "deg, " + color.gradientColorStart + ", " + color.gradientColorEnd + ")";
            petal.style.webkitAnimation = animation;
            petal.style.animation = animation;
            petal.style.borderRadius = self.getRandomInt(self.settings.maxSize, self.settings.maxSize + Math.floor(10 * Math.random())) + "px " + self.getRandomInt(1, Math.floor(width / 4)) + "px";
            petal.style.height = size + "px";
            petal.style.left = (Math.random() * document.documentElement.clientWidth - 100) + "px";
            petal.style.marginTop = (-(Math.floor(20 * Math.random()) + 15)) + "px";
            petal.style.width = width + "px";

            addEventListenerWithPrefixes(petal, "AnimationEnd", function() {
                if(!isElementInViewport(petal)) petal.remove();
            });

            addEventListenerWithPrefixes(petal, "AnimationIteration", function() {
                if(!isElementInViewport(petal)) petal.remove();
            });

            self.petalsWeak.set(Date.now(), petal);
            self.el.appendChild(petal);
        };

        this.el.setAttribute("data-sakura-anim-id", window.requestAnimationFrame(this.createPetal));
    }

    Sakura.prototype.getRandomItem = function(array) {
        return array[Math.floor(Math.random() * array.length)];
    };

    Sakura.prototype.getRandomInt = function(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    Sakura.prototype.start = function(){
        if(this.el.dataset.sakuraAnimId) throw new Error("Sakura is already running.");
        this.el.setAttribute("data-sakura-anim-id", window.requestAnimationFrame(this.createPetal));
    };

    Sakura.prototype.stop = function(shouldRemoveAll){
        if (shouldRemoveAll === undefined) shouldRemoveAll = false; // Default parameter for compatibility
        var animId = this.el.dataset.sakuraAnimId;
        if(animId){
            window.cancelAnimationFrame(animId);
            this.el.setAttribute("data-sakura-anim-id", "");
        }
        if(!shouldRemoveAll){
            var self = this;
            setTimeout(function() {
                var petals = document.getElementsByClassName(self.settings.className);
                while(petals.length > 0){
                    petals[0].parentNode.removeChild(petals[0]);
                }
            }, self.settings.delay + 50);
        }
    };

    // Example of initializing Sakura
    // Replace '#YourElementSelector' with the actual selector where you want the sakura effect
    // new Sakura('#YourElementSelector', { /* options */ });

    // Expose Sakura to the global scope if needed
    window.Sakura = Sakura;

})();