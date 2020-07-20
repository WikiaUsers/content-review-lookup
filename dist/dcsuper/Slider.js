/*
 *  Liquid Slider 2.3.8
 *  Copyright 2012 Kevin Batdorf
 *  http://liquidslider.com
 *  MIT license
 */"function"!=typeof Object.create&&(Object.create=function(a){"use strict";function b(){}return b.prototype=a,new b}),function(a,b,c,d){"use strict";a.fn.liquidSlider=function(b){return this.each(function(){var c=Object.create(LiquidSlider);c.init(b,this),a.data(this,"liquidSlider",c)})},a.fn.liquidSlider.options={autoHeight:!0,minHeight:0,heightEaseDuration:1500,heightEaseFunction:"easeInOutExpo",slideEaseDuration:1500,slideEaseFunction:"easeInOutExpo",slideEaseFunctionFallback:"swing",animateIn:"bounceInRight",animateOut:"bounceOutRight",continuous:!0,fadeInDuration:500,fadeOutDuration:500,autoSlide:!1,autoSlideDirection:"right",autoSlideInterval:6e3,forceAutoSlide:!1,pauseOnHover:!1,dynamicArrows:!0,dynamicArrowsGraphical:!0,dynamicArrowLeftText:"&#171; left",dynamicArrowRightText:"right &#187;",hideSideArrows:!1,hideSideArrowsDuration:750,hoverArrows:!0,hoverArrowDuration:250,dynamicTabs:!0,dynamicTabsHtml:!0,includeTitle:!0,panelTitleSelector:".title",dynamicTabsAlign:"left",dynamicTabsPosition:"top",navElementTag:"div",firstPanelToLoad:1,hashLinking:!1,hashTitleSelector:".title",keyboardNavigation:!1,leftKey:39,rightKey:37,panelKeys:{1:49,2:50,3:51,4:52},responsive:!0,mobileNavigation:!0,mobileNavDefaultText:"Menu",mobileUIThreshold:0,hideArrowsWhenMobile:!0,hideArrowsThreshold:0,useCSSMaxWidth:3e3,preload:function(){var a=this;jQuery(b).bind("load",function(){a.finalize()})},onload:function(){},pretransition:function(){this.transition()},callback:function(){},preloader:!1,swipe:!0,swipeArgs:d}}(jQuery,window,document);var LiquidSlider={};LiquidSlider.init=function(a,b){var c=this;c.elem=b,c.$elem=jQuery(b),jQuery(".no-js").removeClass("no-js"),c.sliderId="#"+c.$elem.attr("id"),c.$sliderId=jQuery(c.sliderId),c.options=jQuery.extend({},jQuery.fn.liquidSlider.options,a),c.pSign=c.options.responsive?"%":"px",c.determineAnimationType(),c.options.responsive||(c.options.mobileNavigation=!1,c.options.hideArrowsWhenMobile=!1),"animate.css"===c.options.slideEaseFunction&&(c.useCSS?(c.options.continuous=!1,c.animateCSS=!0):c.options.slideEaseFunction=c.options.slideEaseFunctionFallback),c.build(),c.events(),!c.options.responsive&&c.options.dynamicArrows&&c.$sliderWrap.width(c.$sliderId.outerWidth(!0)+c.leftArrow.outerWidth(!0)+c.rightArrow.outerWidth(!0)),c.loaded=!0,c.options.preload.call(c)},LiquidSlider.build=function(){var a,b=this;"ls-wrapper"!==b.$sliderId.parent().attr("class")&&b.$sliderId.wrap('<div id="'+b.$elem.attr("id")+'-wrapper" class="ls-wrapper"></div>'),b.$sliderWrap=jQuery(b.sliderId+"-wrapper"),b.options.preloader&&b.addPreloader(),jQuery(b.sliderId).children().addClass(b.$elem.attr("id")+"-panel ls-panel"),b.panelClass=b.sliderId+" ."+b.$elem.attr("id")+"-panel:not(.clone)",b.$panelClass=jQuery(b.panelClass),b.$panelClass.wrapAll('<div class="panel-container"></div>'),b.$panelClass.wrapInner('<div class="panel-wrapper"></div>'),b.panelContainer=b.$panelClass.parent(),b.$panelContainer=b.panelContainer,b.options.hashLinking&&b.buildHashTags(),"fade"===b.options.slideEaseFunction&&(b.$panelClass.addClass("fade"),b.options.continuous=!1,b.fade=!0),b.options.dynamicTabs?b.addNavigation():b.options.mobileNavigation=!1,b.options.dynamicArrows?b.addArrows():(b.options.hoverArrows=!1,b.options.hideSideArrows=!1,b.options.hideArrowsWhenMobile=!1),a=b.$leftArrow&&"absolute"===b.$leftArrow.css("position")?0:1,b.totalSliderWidth=b.$sliderId.outerWidth(!0)+jQuery(b.$leftArrow).outerWidth(!0)*a+jQuery(b.$rightArrow).outerWidth(!0)*a,jQuery(b.$sliderWrap).css("width",b.totalSliderWidth),b.options.dynamicTabs&&b.alignNavigation(),b.options.hideSideArrows&&(b.options.continuous=!1),b.options.continuous&&(b.$panelContainer.prepend(b.$panelContainer.children().last().clone().addClass("clone")),b.$panelContainer.append(b.$panelContainer.children().eq(1).clone().addClass("clone")));var c=b.options.continuous?2:0;b.panelCount=jQuery(b.panelClass).length,b.panelCountTotal=b.fade?1:b.panelCount+c,b.panelWidth=jQuery(b.panelClass).outerWidth(),b.totalWidth=b.panelCountTotal*b.panelWidth,jQuery(b.sliderId+" .panel-container").css("width",b.totalWidth),b.slideDistance=b.options.responsive?100:jQuery(b.sliderId).outerWidth(),b.useCSS&&b.options.responsive&&(b.totalWidth=100*b.panelCountTotal,b.slideDistance=100/b.panelCountTotal),b.options.responsive&&b.makeResponsive(),b.prepareTransition(b.getFirstPanel(),!0),b.updateClass()},LiquidSlider.determineAnimationType=function(){var a=this,b="animation",c="",d="Webkit Moz O ms Khtml".split(" "),e="",f=0;if(a.useCSS=!1,a.elem.style.animationName&&(a.useCSS=!0),a.useCSS===!1)for(f=0;f<d.length;f++)if(void 0!==a.elem.style[d[f]+"AnimationName"]){e=d[f],b=e+"Animation",c="-"+e.toLowerCase()+"-",a.useCSS=!0;break}document.documentElement.clientWidth>a.options.useCSSMaxWidth&&(a.useCSS=!1)},LiquidSlider.configureCSSTransitions=function(a,b){var c,d,e,f,g=this;g.easing={easeOutCubic:"cubic-bezier(.215,.61,.355,1)",easeInOutCubic:"cubic-bezier(.645,.045,.355,1)",easeInCirc:"cubic-bezier(.6,.04,.98,.335)",easeOutCirc:"cubic-bezier(.075,.82,.165,1)",easeInOutCirc:"cubic-bezier(.785,.135,.15,.86)",easeInExpo:"cubic-bezier(.95,.05,.795,.035)",easeOutExpo:"cubic-bezier(.19,1,.22,1)",easeInOutExpo:"cubic-bezier(1,0,0,1)",easeInQuad:"cubic-bezier(.55,.085,.68,.53)",easeOutQuad:"cubic-bezier(.25,.46,.45,.94)",easeInOutQuad:"cubic-bezier(.455,.03,.515,.955)",easeInQuart:"cubic-bezier(.895,.03,.685,.22)",easeOutQuart:"cubic-bezier(.165,.84,.44,1)",easeInOutQuart:"cubic-bezier(.77,0,.175,1)",easeInQuint:"cubic-bezier(.755,.05,.855,.06)",easeOutQuint:"cubic-bezier(.23,1,.32,1)",easeInOutQuint:"cubic-bezier(.86,0,.07,1)",easeInSine:"cubic-bezier(.47,0,.745,.715)",easeOutSine:"cubic-bezier(.39,.575,.565,1)",easeInOutSine:"cubic-bezier(.445,.05,.55,.95)",easeInBack:"cubic-bezier(.6,-.28,.735,.045)",easeOutBack:"cubic-bezier(.175,.885,.32,1.275)",easeInOutBack:"cubic-bezier(.68,-.55,.265,1.55)"},e=g.easing[g.options.slideEaseFunction]||g.options.slideEaseFunction,f=g.easing[g.options.heightEaseFunction]||g.options.heightEaseFunction,g.useCSS&&(c="all "+(a||g.options.slideEaseDuration)+"ms "+e,d="all "+(b||g.options.heightEaseDuration)+"ms "+f,jQuery(g.panelContainer).css({"-webkit-transition":c,"-moz-transition":c,"-ms-transition":c,"-o-transition":c,transition:c}),g.options.autoHeight&&g.$sliderId.css({"-webkit-transition":d,"-moz-transition":d,"-ms-transition":d,"-o-transition":d,transition:d}))},LiquidSlider.transitionFade=function(){var a=this;jQuery(a.panelClass).eq(a.nextPanel).fadeTo(a.options.fadeInDuration,1).css("z-index",1),jQuery(a.panelClass).eq(a.prevPanel).fadeTo(a.options.fadeOutDuration,0).css("z-index",0),a.callback(a.options.callback,!0)},LiquidSlider.hover=function(){var a=this;a.$sliderWrap.hover(function(){a.options.hoverArrows&&a.hideShowArrows(a.options.fadeInDuration,!0,!0,!1),a.options.pauseOnHover&&clearTimeout(a.autoSlideTimeout)},function(){a.options.hoverArrows&&a.hideShowArrows(a.options.fadeOutnDuration,!0,!1,!0),a.options.pauseOnHover&&a.options.autoSlide&&a.startAutoSlide(!0)})},LiquidSlider.events=function(){var a=this;a.options.dynamicArrows&&a.registerArrows(),a.options.dynamicTabs&&a.registerNav(),a.options.swipe&&a.registerTouch(),a.options.keyboardNavigation&&a.registerKeyboard(),a.$sliderWrap.find("*").on("click",function(){a.options.forceAutoSlide?a.startAutoSlide(!0):a.options.autoSlide&&a.stopAutoSlide()}),a.hover()},LiquidSlider.setNextPanel=function(a){var b=this;a!==b.nextPanel&&(b.prevPanel=b.nextPanel,b.loaded&&("number"==typeof a?b.nextPanel=a:(b.nextPanel+=~~("right"===a)||-1,b.options.continuous||(b.nextPanel=b.nextPanel<0?b.panelCount-1:b.nextPanel%b.panelCount)),b.fade||b.animateCSS?b.prepareTransition(b.nextPanel):b.verifyPanel()))},LiquidSlider.getFirstPanel=function(){var a,b=this;return b.options.hashLinking&&(a=jQuery.inArray(b.convertRegex(window.location.hash),b.hashLinks),-1===a&&(a=0)),a?a:b.options.firstPanelToLoad-1},LiquidSlider.getFromPanel=function(a,b){var c=this;return c.convertRegex(c.$panelClass.find(a).eq(b).text())},LiquidSlider.convertRegex=function(a){return jQuery.trim(a).replace(/[^\w -]+/g,"").replace(/ +/g,"-").toLowerCase()},LiquidSlider.updateClass=function(a){var b=this;b.options.dynamicTabs&&jQuery(b.$sliderWrap).find("> .ls-nav .tab"+b.sanitizeNumber(b.nextPanel)).addClass("current").siblings().removeClass("current"),b.$panelClass.eq(b.sanitizeNumber(b.nextPanel)-1).addClass("currentPanel").siblings().removeClass("currentPanel"),b.$clones=jQuery(b.sliderId+" .clone"),!b.options.continuous||-1!==b.nextPanel&&b.nextPanel!==b.panelCount?b.$clones.removeClass("currentPanel"):b.$clones.addClass("currentPanel"),a&&($(".ls-current").removeClass("ls-current"),a.addClass("ls-current"))},LiquidSlider.sanitizeNumber=function(a){var b=this;switch(!0){case a>=b.panelCount:return 1;case-1>=a:return b.panelCount;default:return a+1}},LiquidSlider.finalize=function(){var a=this,b=a.options.autoHeight?a.getHeight():a.getHeighestPanel(a.nextPanel);a.options.autoHeight&&a.adjustHeight(!0,b),a.options.autoSlide&&a.autoSlide(),a.options.preloader&&a.removePreloader(),a.onload()},LiquidSlider.callback=function(a,b){var c=this;a&&c.loaded&&(c.useCSS&&"undefined"!=typeof b?jQuery(".panel-container").one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",function(){a.call(c)}):setTimeout(function(){a.call(c)},c.options.slideEaseDuration+50))},LiquidSlider.onload=function(){var a=this;a.options.onload.call(a)},LiquidSlider.prepareTransition=function(a,b,c,d){var e=this;e.nextPanel=a||0,c||e.pretransition(e.options.pretransition),e.noAnimation=b,e.noPosttransition=d,e.loaded?e.options.pretransition.call(e):e.transition()},LiquidSlider.pretransition=function(){var a=this;a.options.hashLinking&&a.updateHashTags(),a.options.mobileNavigation&&a.dropdownSelect.val("tab"+(a.nextPanel+1)),a.options.hideSideArrows&&a.hideShowArrows(),a.updateClass()},LiquidSlider.getTransitionMargin=function(){var a=this;return-(a.nextPanel*a.slideDistance)-a.slideDistance*~~a.options.continuous},LiquidSlider.transition=function(){var a=this,b=a.getTransitionMargin();if(a.animateCSS&&a.loaded)return a.transitionOutAnimateCSS(),!1;if(b+a.pSign!==a.panelContainer.css("margin-left")||-100!==b)switch(a.options.autoHeight&&!a.animateCSS&&a.adjustHeight(!0,a.getHeight()),!0){case a.fade:a.transitionFade();break;case a.animateCSS:a.transitionInAnimateCSS(b);break;case a.useCSS:a.transitionCSS(b,a.noAnimation);break;default:a.transitionjQuery(b,a.noAnimation)}a.noPosttransition||a.callback(a.options.callback)},LiquidSlider.transitionOutAnimateCSS=function(){var a=this;jQuery(a.panelClass).removeClass(a.options.animateIn+" animated"),jQuery(a.panelClass).eq(a.prevPanel).addClass("animated "+a.options.animateOut),a.callback(a.transitionInAnimateCSS,void 0)},LiquidSlider.transitionInAnimateCSS=function(){var a=this;a.options.autoHeight&&a.adjustHeight(!1,a.getHeight()),a.transitionCSS(a.getTransitionMargin(),!a.loaded),jQuery(a.panelClass).removeClass(a.options.animateOut+" animated"),jQuery(a.panelClass).eq(a.nextPanel).addClass("animated "+a.options.animateIn),a.callback(a.options.callback,void 0)},LiquidSlider.transitionCSS=function(a,b){var c=this;b&&c.configureCSSTransitions("0","0"),c.panelContainer.css({"-webkit-transform":"translate3d("+a+c.pSign+", 0, 0)","-moz-transform":"translate3d("+a+c.pSign+", 0, 0)","-ms-transform":"translate3d("+a+c.pSign+", 0, 0)","-o-transform":"translate3d("+a+c.pSign+", 0, 0)",transform:"translate3d("+a+c.pSign+", 0, 0)"}),b?c.callback(function(){c.configureCSSTransitions()}):c.configureCSSTransitions()},LiquidSlider.transitionjQuery=function(a,b){var c=this;b?c.panelContainer.css("margin-left",a+c.pSign):c.panelContainer.animate({"margin-left":a+c.pSign},{easing:jQuery.easing.hasOwnProperty(c.options.slideEaseFunction)?c.options.slideEaseFunction:c.options.slideEaseFunctionFallback,duration:c.options.slideEaseDuration,queue:!1})},LiquidSlider.getHeight=function(a){var b=this;return a=a||b.$panelClass.eq(b.sanitizeNumber(b.nextPanel)-1).outerHeight(!0),a=a<b.options.minHeight?b.options.minHeight:a},LiquidSlider.getHeighestPanel=function(){var a,b=this,c=0;return b.$panelClass.each(function(){a=jQuery(this).outerHeight(!0),c=a>c?a:c}),b.options.autoHeight?c:void 0},LiquidSlider.verifyPanel=function(){var a=this,b=!1;if(a.options.continuous)switch(!0){case a.nextPanel>a.panelCount:a.nextPanel=a.panelCount,a.setNextPanel(a.panelCount);break;case a.nextPanel<-1:a.nextPanel=-1,a.setNextPanel(-1);break;case b||a.nextPanel===a.panelCount||-1===a.nextPanel:a.prepareTransition(a.nextPanel),a.updateClass(),clearTimeout(c);var c=setTimeout(function(){a.nextPanel===a.panelCount?a.prepareTransition(0,!0,!0,!0):-1===a.nextPanel&&a.prepareTransition(a.panelCount-1,!0,!0,!0)},a.options.slideEaseDuration+50);break;default:b=!0,a.prepareTransition(a.nextPanel)}else a.nextPanel===a.panelCount?a.nextPanel=0:-1===a.nextPanel&&(a.nextPanel=a.panelCount-1),a.prepareTransition(a.nextPanel)},LiquidSlider.addNavigation=function(a){var b=this,c="<"+b.options.navElementTag+' class="ls-nav"><ul id="'+b.$elem.attr("id")+'-nav-ul"></ul></'+b.options.navElementTag+">";if("bottom"===b.options.dynamicTabsPosition?b.$sliderId.after(c):b.$sliderId.before(c),b.options.mobileNavigation){var d=b.options.mobileNavDefaultText?'<option disabled="disabled" selected="selected">'+b.options.mobileNavDefaultText+"</option>":null,e='<div class="ls-select-box"><select id="'+b.$elem.attr("id")+'-nav-select" name="navigation">'+d+"</select></div>";b.navigation=jQuery(b.sliderId+"-nav-ul").before(e),b.dropdown=jQuery(b.sliderId+"-wrapper .ls-select-box"),b.dropdownSelect=jQuery(b.sliderId+"-nav-select"),jQuery.each(b.$elem.find(b.options.panelTitleSelector),function(a){jQuery(b.$sliderWrap).find(".ls-select-box select").append('<option value="tab'+(a+1)+'">'+jQuery(this).text()+"</option>")})}jQuery.each(b.$elem.find(b.options.panelTitleSelector),function(c){jQuery(b.$sliderWrap).find(".ls-nav ul").append('<li class="tab'+(c+1)+'"><a class="'+(a||"")+'" href="#'+(c+1)+'">'+b.getNavInsides(this)+"</a></li>"),b.options.includeTitle||jQuery(this).remove()})},LiquidSlider.getNavInsides=function(a){return this.options.dynamicTabsHtml?jQuery(a).html():jQuery(a).text()},LiquidSlider.alignNavigation=function(){var a=this,b=a.options.dynamicArrowsGraphical?"-arrow":"";"center"!==a.options.dynamicTabsAlign&&(a.options.responsive||jQuery(a.$sliderWrap).find(".ls-nav ul").css("margin-"+a.options.dynamicTabsAlign,jQuery(a.$sliderWrap).find(".ls-nav-"+a.options.dynamicTabsAlign+b).outerWidth(!0)+parseInt(a.$sliderId.css("margin-"+a.options.dynamicTabsAlign),10)),jQuery(a.$sliderWrap).find(".ls-nav ul").css("float",a.options.dynamicTabsAlign)),a.totalNavWidth=jQuery(a.$sliderWrap).find(".ls-nav ul").outerWidth(!0),"center"===a.options.dynamicTabsAlign&&(a.totalNavWidth=0,jQuery(a.$sliderWrap).find(".ls-nav li a").each(function(){a.totalNavWidth+=jQuery(this).outerWidth(!0)}),jQuery(a.$sliderWrap).find(".ls-nav ul").css("width",a.totalNavWidth+1))},LiquidSlider.registerNav=function(){var a=this;a.$sliderWrap.find("[class^=ls-nav] li").on("click",function(b){return b.preventDefault(),a.setNextPanel(parseInt(jQuery(this).attr("class").split("tab")[1],10)-1),!1})},LiquidSlider.addArrows=function(a){var b=this,c=b.options.dynamicArrowsGraphical?"-arrow ":" ";b.$sliderWrap.addClass("arrows"),b.options.dynamicArrowsGraphical&&(b.options.dynamicArrowLeftText="",b.options.dynamicArrowRightText=""),b.$sliderId.before('<div class="ls-nav-left'+c+(a||"")+'"><a href="#">'+b.options.dynamicArrowLeftText+"</a></div>"),b.$sliderId.after('<div class="ls-nav-right'+c+(a||"")+'"><a href="#">'+b.options.dynamicArrowRightText+"</a></div>"),b.leftArrow=jQuery(b.sliderId+"-wrapper [class^=ls-nav-left]").css("visibility","hidden").addClass("ls-hidden"),b.rightArrow=jQuery(b.sliderId+"-wrapper [class^=ls-nav-right]").css("visibility","hidden").addClass("ls-hidden"),b.options.hoverArrows||b.hideShowArrows(void 0,!0,!0,!1)},LiquidSlider.hideShowArrows=function(a,b,c,d){var e=this,f="undefined"!=typeof a?a:e.options.fadeOutDuration,g="undefined"!=typeof a?a:e.options.fadeInDuration,h=b?"visible":"hidden";c||!d&&1!==e.sanitizeNumber(e.nextPanel)?(c||e.leftArrow.hasClass("ls-hidden"))&&e.leftArrow.stop().css("visibility","visible").fadeTo(g,1).removeClass("ls-hidden"):e.leftArrow.stop().fadeTo(f,0,function(){jQuery(this).css("visibility",h).addClass("ls-hidden")}),c||!d&&e.sanitizeNumber(e.nextPanel)!==e.panelCount?(c||e.rightArrow.hasClass("ls-hidden"))&&e.rightArrow.stop().css("visibility","visible").fadeTo(g,1).removeClass("ls-hidden"):e.rightArrow.stop().fadeTo(f,0,function(){jQuery(this).css("visibility",h).addClass("ls-hidden")})},LiquidSlider.registerArrows=function(){var a=this;jQuery(a.$sliderWrap.find("[class^=ls-nav-]")).on("click",function(b){b.preventDefault(),a.setNextPanel(jQuery(this).attr("class").split(" ")[0].split("-")[2])})},LiquidSlider.adjustHeight=function(a,b,c,d){var e=this;return a||e.useCSS?(a&&e.configureCSSTransitions("0","0"),e.$sliderId.height(b),void(a&&e.configureCSSTransitions())):void e.$sliderId.animate({height:b+"px"},{easing:jQuery.easing.hasOwnProperty(c||e.options.heightEaseFunction)?c||e.options.heightEaseFunction:e.options.slideEaseFunctionFallback,duration:d||e.options.heightEaseDuration,queue:!1})},LiquidSlider.autoSlide=function(){var a=this;a.options.autoSlideInterval<a.options.slideEaseDuration&&(a.options.autoSlideInterval=a.options.slideEaseDuration>a.options.heightEaseDuration?a.options.slideEaseDuration:a.options.heightEaseDuration),a.autoSlideTimeout=document.hasFocus()?setTimeout(function(){a.setNextPanel(a.options.autoSlideDirection),a.autoSlide()},a.options.autoSlideInterval):void 0,jQuery(window).on("focus",function(){a.startAutoSlide(!0)}),jQuery(window).on("blur",function(){a.stopAutoSlide()})},LiquidSlider.stopAutoSlide=function(){var a=this;a.options.autoSlide=!1,clearTimeout(a.autoSlideTimeout)},LiquidSlider.startAutoSlide=function(a){var b=this;b.options.autoSlide=!0,a||b.setNextPanel(b.options.autoSlideDirection),b.autoSlide(clearTimeout(b.autoSlideTimeout))},LiquidSlider.buildHashTags=function(){var a=this;a.hashLinks=[],jQuery(a.panelClass+" "+a.options.hashTitleSelector).each(function(){a.hashLinks.push(a.convertRegex($(this).text()))})},LiquidSlider.updateHashTags=function(){var a=this;window.location.hash=a.hashLinks[a.sanitizeNumber(a.nextPanel)-1]},LiquidSlider.registerKeyboard=function(){var a=this;jQuery(document).keydown(function(b){var c=b.keyCode||b.which;"textarea"!==b.target.type&&"textbox"!==b.target.type&&(a.options.forceAutoSlide||jQuery(this).trigger("click"),c===a.options.leftKey&&a.setNextPanel("right"),c===a.options.rightKey&&a.setNextPanel("left"),jQuery.each(a.options.panelKeys,function(b,d){c===d&&a.setNextPanel(b-1)}))})},LiquidSlider.addPreloader=function(){var a=this;jQuery(a.sliderId+"-wrapper").append('<div class="ls-preloader"></div>')},LiquidSlider.removePreloader=function(){var a=this;jQuery(a.sliderId+"-wrapper .ls-preloader").fadeTo("slow",0,function(){jQuery(this).remove()})},LiquidSlider.makeResponsive=function(){var a=this;jQuery(a.sliderId+"-wrapper").addClass("ls-responsive").css({"max-width":jQuery(a.sliderId+" .ls-panel:first-child").width(),width:"100%"}),jQuery(a.sliderId+" .panel-container").css("width",100*a.panelCountTotal+a.pSign),jQuery(a.sliderId+" .ls-panel").css("width",100/a.panelCountTotal+a.pSign),jQuery(a.sliderId+" .ls-panel").css("width",jQuery(a.sliderId).outerWidth(!0)),a.options.hideArrowsWhenMobile&&(a.leftWrapperPadding=jQuery(a.sliderId+"-wrapper").css("padding-left"),a.rightWrapperPadding=a.$sliderWrap.css("padding-right")),a.responsiveEvents(),jQuery(window).bind("resize orientationchange",function(){a.responsiveEvents(),clearTimeout(a.resizingTimeout),a.resizingTimeout=setTimeout(function(){var b=a.options.autoHeight?a.getHeight():a.getHeighestPanel(a.nextPanel);a.adjustHeight(!1,b),jQuery(a.sliderId+" .ls-panel").css("width",jQuery(a.sliderId).outerWidth(!0))},500)})},LiquidSlider.responsiveEvents=function(){var a=this,b=a.options.hideArrowsThreshold||a.options.mobileUIThreshold||a.totalNavWidth+10;a.$sliderId.outerWidth()<b?(a.options.mobileNavigation&&(a.navigation.css("display","none"),a.dropdown.css("display","block"),a.dropdownSelect.css("display","block"),jQuery(a.sliderId+"-nav-select").val(a.options.mobileNavDefaultText)),a.options.dynamicArrows&&(a.options.hideArrowsWhenMobile?(a.leftArrow.remove().length=0,a.rightArrow.remove().length=0):a.options.dynamicArrowsGraphical||(a.leftArrow.css("margin-"+a.options.dynamicTabsPosition,"0"),a.rightArrow.css("margin-"+a.options.dynamicTabsPosition,"0")))):(a.options.mobileNavigation&&(a.navigation.css("display","block"),a.dropdown.css("display","none"),a.dropdownSelect.css("display","none")),a.options.dynamicArrows&&(!a.options.hideArrowsWhenMobile||a.leftArrow.length&&a.rightArrow.length?!a.options.dynamicArrowsGraphical&&a.options.mobileNavigation&&(a.leftArrow.css("margin-"+a.options.dynamicTabsPosition,a.navigation.css("height")),a.rightArrow.css("margin-"+a.options.dynamicTabsPosition,a.navigation.css("height"))):(a.addArrows(),a.registerArrows()))),jQuery(a.sliderId+"-wrapper").css("width","100%"),a.loaded&&jQuery(a.sliderId+" .ls-panel").width(100/a.panelCountTotal+a.pSign),a.options.mobileNavigation&&a.dropdownSelect.change(function(){a.setNextPanel(parseInt(jQuery(this).val().split("tab")[1],10)-1)})},LiquidSlider.registerTouch=function(){var a=this,b=a.options.swipeArgs||{fallbackToMouseEvents:!1,allowPageScroll:"vertical",swipe:function(b,c){return"up"===c||"down"===c?!1:(a.swipeDir="left"===c?"right":"left",void a.setNextPanel(a.swipeDir))}};jQuery(a.sliderId+" .ls-panel").swipe(b)};