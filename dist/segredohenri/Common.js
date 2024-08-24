// Importa��es
importArticles({
    type: 'script',
    articles: [
        'u:dev:UserTags/code.js', // Etiquetas de Usu�rios
        'u:dev:WallGreetingButton/code.js', // Sauda��es de Murais
        'u:dev:ReferencePopups/code.js', // Refer�ncias
        'u:dev:LockForums/code.js', // F�runs
        'u:dev:Countdown/code.js', // Contador
        'u:dev:LastEdited/code.js', // Edi��es
        'u:dev:AjaxRC/code.js', // Atualiza��o Autom�tica
        'u:dev:ChatHacks.js', // ChatHack
        //'u:c:User:Joeytje50/ChatPMs.js', // Chat M�ltiplo
        'u:xiaolinpedia:MediaWiki:Chat.js/options.js', // Op��es M�ltiplas
        'u:dev:MessageBlocker/code.js', // Bloqueio de Mensagens
        'u:dev:MediaWiki:DiscordIntegrator/code.js' /
        'u:dev:ShowHide/code.js' // Mostrar e Ocultar
    ]
});

//Add border color to PIs
var PI = document.querySelectorAll('.portable-infobox');
for (var i = 0; i < PI.length; ++i) {
    var pi = PI[i];
    pi.getAttribute('class').split(' ').forEach(function(cls) {
        if (cls.indexOf('pi-theme-_') === 0) {
            pi.style.border = '2px solid #' + cls.replace('pi-theme-_', '');
        }
    });
}

!function(t,n){"function"==typeof define&&define.amd?define(["jquery"],function(e){return n(t,e)}):"object"==typeof exports?n(t,require("jquery")):n(t,t.jQuery||t.Zepto)}(this,function(t,n){"use strict";var e,a,i,o="remodal",s=t.REMODAL_GLOBALS&&t.REMODAL_GLOBALS.NAMESPACE||o,r=n.map(["animationstart","webkitAnimationStart","MSAnimationStart","oAnimationStart"],function(t){return t+"."+s}).join(" "),d=n.map(["animationend","webkitAnimationEnd","MSAnimationEnd","oAnimationEnd"],function(t){return t+"."+s}).join(" "),c=n.extend({hashTracking:!1,closeOnConfirm:!0,closeOnCancel:!0,closeOnEscape:!0,closeOnOutsideClick:!0,modifier:"",appendTo:null},t.REMODAL_GLOBALS&&t.REMODAL_GLOBALS.DEFAULTS),l={CLOSING:"closing",CLOSED:"closed",OPENING:"opening",OPENED:"opened"},p={CONFIRMATION:"confirmation",CANCELLATION:"cancellation"},m=void 0!==(e=document.createElement("div").style).animationName||void 0!==e.WebkitAnimationName||void 0!==e.MozAnimationName||void 0!==e.msAnimationName||void 0!==e.OAnimationName,u=/iPad|iPhone|iPod/.test(navigator.platform);function f(t){if(m&&"none"===t.css("animation-name")&&"none"===t.css("-webkit-animation-name")&&"none"===t.css("-moz-animation-name")&&"none"===t.css("-o-animation-name")&&"none"===t.css("-ms-animation-name"))return 0;var n,e,a,i,o=t.css("animation-duration")||t.css("-webkit-animation-duration")||t.css("-moz-animation-duration")||t.css("-o-animation-duration")||t.css("-ms-animation-duration")||"0s",s=t.css("animation-delay")||t.css("-webkit-animation-delay")||t.css("-moz-animation-delay")||t.css("-o-animation-delay")||t.css("-ms-animation-delay")||"0s",r=t.css("animation-iteration-count")||t.css("-webkit-animation-iteration-count")||t.css("-moz-animation-iteration-count")||t.css("-o-animation-iteration-count")||t.css("-ms-animation-iteration-count")||"1";for(o=o.split(", "),s=s.split(", "),r=r.split(", "),i=0,e=o.length,n=Number.NEGATIVE_INFINITY;i<e;i++)(a=parseFloat(o[i])*parseInt(r[i],10)+parseFloat(s[i]))>n&&(n=a);return n}function g(){if(n(document).height()<=n(window).height())return 0;var t,e,a=document.createElement("div"),i=document.createElement("div");return a.style.visibility="hidden",a.style.width="100px",document.body.appendChild(a),t=a.offsetWidth,a.style.overflow="scroll",i.style.width="100%",a.appendChild(i),e=i.offsetWidth,a.parentNode.removeChild(a),t-e}function h(){if(!u){var t,e,a=n("html"),i=$("is-locked");a.hasClass(i)&&(e=n(document.body),t=parseInt(e.css("padding-right"),10)-g(),e.css("padding-right",t+"px"),a.removeClass(i))}}function v(t,n,e,a){var i=$("is",n),o=[$("is",l.CLOSING),$("is",l.OPENING),$("is",l.CLOSED),$("is",l.OPENED)].join(" ");t.$bg.removeClass(o).addClass(i),t.$overlay.removeClass(o).addClass(i),t.$wrapper.removeClass(o).addClass(i),t.$modal.removeClass(o).addClass(i),t.state=n,!e&&t.$modal.trigger({type:n,reason:a},[{reason:a}])}function C(t,e,a){var i=0,o=function(t){t.target===this&&i++},s=function(t){t.target===this&&0==--i&&(n.each(["$bg","$overlay","$wrapper","$modal"],function(t,n){a[n].off(r+" "+d)}),e())};n.each(["$bg","$overlay","$wrapper","$modal"],function(t,n){a[n].on(r,o).on(d,s)}),t(),0===f(a.$bg)&&0===f(a.$overlay)&&0===f(a.$wrapper)&&0===f(a.$modal)&&(n.each(["$bg","$overlay","$wrapper","$modal"],function(t,n){a[n].off(r+" "+d)}),e())}function O(t){t.state!==l.CLOSED&&(n.each(["$bg","$overlay","$wrapper","$modal"],function(n,e){t[e].off(r+" "+d)}),t.$bg.removeClass(t.settings.modifier),t.$overlay.removeClass(t.settings.modifier).hide(),t.$wrapper.hide(),h(),v(t,l.CLOSED,!0))}function $(){for(var t=s,n=0;n<arguments.length;++n)t+="-"+arguments[n];return t}function E(){var t,e,i=location.hash.replace("#","");if(i){try{e=n("[data-"+o+'-id="'+i+'"]')}catch(t){}e&&e.length&&(t=n[o].lookup[e.data(o)])&&t.settings.hashTracking&&t.open()}else a&&a.state===l.OPENED&&a.settings.hashTracking&&a.close()}function y(t,e){var a=n(document.body),i=this;i.settings=n.extend({},c,e),i.index=n[o].lookup.push(i)-1,i.state=l.CLOSED,i.$overlay=n("."+$("overlay")),null!==i.settings.appendTo&&i.settings.appendTo.length&&(a=n(i.settings.appendTo)),i.$overlay.length||(i.$overlay=n("<div>").addClass($("overlay")+" "+$("is",l.CLOSED)).hide(),a.append(i.$overlay)),i.$bg=n("."+$("bg")).addClass($("is",l.CLOSED)),i.$modal=t.addClass(s+" "+$("is-initialized")+" "+i.settings.modifier+" "+$("is",l.CLOSED)).attr("tabindex","-1"),i.$wrapper=n("<div>").addClass($("wrapper")+" "+i.settings.modifier+" "+$("is",l.CLOSED)).hide().append(i.$modal),a.append(i.$wrapper),i.$wrapper.on("click."+s,"[data-"+o+'-action="close"]',function(t){t.preventDefault(),i.close()}),i.$wrapper.on("click."+s,"[data-"+o+'-action="cancel"]',function(t){t.preventDefault(),i.$modal.trigger(p.CANCELLATION),i.settings.closeOnCancel&&i.close(p.CANCELLATION)}),i.$wrapper.on("click."+s,"[data-"+o+'-action="confirm"]',function(t){t.preventDefault(),i.$modal.trigger(p.CONFIRMATION),i.settings.closeOnConfirm&&i.close(p.CONFIRMATION)}),i.$wrapper.on("click."+s,function(t){n(t.target).hasClass($("wrapper"))&&i.settings.closeOnOutsideClick&&i.close()})}y.prototype.open=function(){var t,e=this;e.state!==l.OPENING&&e.state!==l.CLOSING&&((t=e.$modal.attr("data-"+o+"-id"))&&e.settings.hashTracking&&(i=n(window).scrollTop(),location.hash=t),a&&a!==e&&O(a),a=e,function(){if(!u){var t,e,a=n("html"),i=$("is-locked");a.hasClass(i)||(e=n(document.body),t=parseInt(e.css("padding-right"),10)+g(),e.css("padding-right",t+"px"),a.addClass(i))}}(),e.$bg.addClass(e.settings.modifier),e.$overlay.addClass(e.settings.modifier).show(),e.$wrapper.show().scrollTop(0),e.$modal.focus(),C(function(){v(e,l.OPENING)},function(){v(e,l.OPENED)},e))},y.prototype.close=function(t){var e=this;e.state!==l.OPENING&&e.state!==l.CLOSING&&e.state!==l.CLOSED&&(e.settings.hashTracking&&e.$modal.attr("data-"+o+"-id")===location.hash.substr(1)&&(location.hash="",n(window).scrollTop(i)),C(function(){v(e,l.CLOSING,!1,t)},function(){e.$bg.removeClass(e.settings.modifier),e.$overlay.removeClass(e.settings.modifier).hide(),e.$wrapper.hide(),h(),v(e,l.CLOSED,!1,t)},e))},y.prototype.getState=function(){return this.state},y.prototype.destroy=function(){var t=n[o].lookup;O(this),this.$wrapper.remove(),delete t[this.index],0===n.grep(t,function(t){return!!t}).length&&(this.$overlay.remove(),this.$bg.removeClass($("is",l.CLOSING)+" "+$("is",l.OPENING)+" "+$("is",l.CLOSED)+" "+$("is",l.OPENED)))},n[o]={lookup:[]},n.fn[o]=function(t){var e,a;return this.each(function(i,s){null==(a=n(s)).data(o)?(e=new y(a,t),a.data(o,e.index),e.settings.hashTracking&&a.attr("data-"+o+"-id")===location.hash.substr(1)&&e.open()):e=n[o].lookup[a.data(o)]}),e},n(document).ready(function(){n(document).on("click","[data-"+o+"-target]",function(t){t.preventDefault();var e=t.currentTarget.getAttribute("data-"+o+"-target"),a=n("[data-"+o+'-id="'+e+'"]');n[o].lookup[a.data(o)].open()}),n(document).find("."+s).each(function(t,e){var a=n(e),i=a.data(o+"-options");i?("string"==typeof i||i instanceof String)&&(i=function(t){var n,e,a,i,o={};for(i=0,e=(n=(t=t.replace(/\s*:\s*/g,":").replace(/\s*,\s*/g,",")).split(",")).length;i<e;i++)n[i]=n[i].split(":"),("string"==typeof(a=n[i][1])||a instanceof String)&&(a="true"===a||"false"!==a&&a),("string"==typeof a||a instanceof String)&&(a=isNaN(a)?a:+a),o[n[i][0]]=a;return o}(i)):i={},a[o](i)}),n(document).on("keydown."+s,function(t){a&&a.settings.closeOnEscape&&a.state===l.OPENED&&27===t.keyCode&&a.close()}),n(window).on("hashchange."+s,E)})});
 
!function(t,s,i){"use strict";var e="pep",o={initiate:function(){},start:function(){},drag:function(){},stop:function(){},easing:null,rest:function(){},moveTo:!1,callIfNotStarted:["stop","rest"],startThreshold:[0,0],grid:[1,1],debug:!1,activeClass:"pep-active",startClass:"pep-start",easeClass:"pep-ease",multiplier:1,velocityMultiplier:2.5,shouldPreventDefault:!0,allowDragEventPropagation:!0,stopEvents:"",hardwareAccelerate:!0,useCSSTranslation:!0,disableSelect:!0,cssEaseString:"cubic-bezier(0.190, 1.000, 0.220, 1.000)",cssEaseDuration:1e3,shouldEase:!0,droppable:!1,droppableActiveClass:"pep-dpa",overlapFunction:!1,constrainTo:!1,removeMargins:!0,place:!0,deferPlacement:!1,axis:null,forceNonCSS3Movement:!1,elementsWithInteraction:"input",revert:!1,revertAfter:"stop",revertIf:function(){return!0},ignoreRightClick:!0,startPos:{left:null,top:null},useBoundingClientRect:!1};function n(s,i){return this.name=e,this.el=s,this.$el=t(s),this.options=t.extend({},o,i),this.$document=t(this.$el[0].ownerDocument),this.$body=this.$document.find("body"),this.moveTrigger="MSPointerMove pointermove touchmove mousemove",this.startTrigger="MSPointerDown pointerdown touchstart mousedown",this.stopTrigger="MSPointerUp pointerup touchend mouseup",this.startTriggerArray=this.startTrigger.split(" "),this.moveTriggerArray=this.moveTrigger.split(" "),this.stopTriggerArray=this.stopTrigger.split(" "),this.stopEvents=[this.stopTrigger,this.options.stopEvents].join(" "),"window"===this.options.constrainTo?this.$container=this.$document:this.options.constrainTo&&"parent"!==this.options.constrainTo?this.$container=t(this.options.constrainTo):this.$container=this.$el.parent(),this.isPointerEventCompatible()&&this.applyMSDefaults(),this.CSSEaseHash=this.getCSSEaseHash(),this.scale=1,this.started=!1,this.disabled=!1,this.autoAxis=!1,this.activeDropRegions=[],this.resetVelocityQueue(),this.init(),this}n.prototype.init=function(){this.options.debug&&this.buildDebugDiv(),this.options.disableSelect&&this.disableSelect(),this.options.place&&!this.options.deferPlacement&&(this.positionParent(),this.placeObject()),this.ev={},this.pos={},this.subscribe()},n.prototype.subscribe=function(){var t=this;this.onStartEvent=function(s){t.handleStart(s)},this.$el.on(this.startTrigger,this.onStartEvent),this.onStartEventOnElementsWithInteraction=function(t){t.ignorePropagation=!0},this.$el.on(this.startTrigger,this.options.elementsWithInteraction,this.onStartEventOnElementsWithInteraction),this.onStopEvents=function(s){t.handleStop(s)},this.$document.on(this.stopEvents,this.onStopEvents),this.onMoveEvents=function(s){t.moveEvent=s},this.$document.on(this.moveTrigger,this.onMoveEvents)},n.prototype.unsubscribe=function(){this.$el.off(this.startTrigger,this.onStartEvent),this.$el.off(this.startTrigger,this.options.elementsWithInteraction,this.onStartEventOnElementsWithInteraction),this.$document.off(this.stopEvents,this.onStopEvents),this.$document.off(this.moveTrigger,this.onMoveEvents)},n.prototype.handleStart=function(t){if(!t.ignorePropagation){var s=this;if(this.isValidMoveEvent(t)&&!this.disabled&&(!this.options.ignoreRightClick||3!==t.which)){if(this.isPointerEventCompatible()&&t.preventManipulation&&t.preventManipulation(),t=this.normalizeEvent(t),this.options.place&&this.options.deferPlacement&&(this.positionParent(),this.placeObject()),this.log({type:"event",event:t.type}),this.options.hardwareAccelerate&&!this.hardwareAccelerated&&(this.hardwareAccelerate(),this.hardwareAccelerated=!0),!1===this.options.initiate.call(this,t,this))return;clearTimeout(this.restTimeout),this.$el.addClass(this.options.activeClass),this.removeCSSEasing(),this.startX=this.ev.x=t.pep.x,this.startY=this.ev.y=t.pep.y,this.initialPosition=this.initialPosition||this.$el.position(),this.startEvent=this.moveEvent=t,this.active=!0,this.options.shouldPreventDefault&&t.preventDefault(),this.options.allowDragEventPropagation||t.stopPropagation(),function t(){s.active&&(s.handleMove(),s.requestAnimationFrame(t))}(),function t(){s.options.easing&&(s.easing&&s.options.easing.call(s,null,s),s.requestAnimationFrame(t))}()}}},n.prototype.handleMove=function(){if(void 0!==this.moveEvent){var i,e,o=this.normalizeEvent(this.moveEvent),n=s.parseInt(o.pep.x/this.options.grid[0])*this.options.grid[0],a=s.parseInt(o.pep.y/this.options.grid[1])*this.options.grid[1];if(this.addToLIFO({time:o.timeStamp,x:n,y:a}),t.inArray(o.type,this.startTriggerArray)>-1?(i=0,e=0):(i=n-this.ev.x,e=a-this.ev.y),this.dx=i,this.dy=e,this.ev.x=n,this.ev.y=a,0!==i||0!==e){var r=Math.abs(this.startX-n),p=Math.abs(this.startY-a);!this.started&&(r>this.options.startThreshold[0]||p>this.options.startThreshold[1])&&(this.started=!0,this.$el.addClass(this.options.startClass),this.options.start.call(this,this.startEvent,this)),this.doMoveTo(i,e),this.options.droppable&&this.calculateActiveDropRegions(),!1!==this.options.drag.call(this,o,this)?(this.log({type:"event",event:o.type}),this.log({type:"event-coords",x:this.ev.x,y:this.ev.y}),this.log({type:"velocity"})):this.resetVelocityQueue()}else this.log({type:"event",event:"** stopped **"})}},n.prototype.doMoveTo=function(t,s){var i,e,o=this.handleConstraint(t,s);"auto"!==this.options.axis||this.autoAxis||(Math.abs(t)>Math.abs(s)?this.autoAxis="x":Math.abs(t)<Math.abs(s)?this.autoAxis="y":(s=0,t=0)),"function"==typeof this.options.moveTo?(i=t>=0?"+="+Math.abs(t/this.scale)*this.options.multiplier:"-="+Math.abs(t/this.scale)*this.options.multiplier,e=s>=0?"+="+Math.abs(s/this.scale)*this.options.multiplier:"-="+Math.abs(s/this.scale)*this.options.multiplier,this.options.constrainTo&&(i=!1!==o.x?o.x:i,e=!1!==o.y?o.y:e),"x"!==this.options.axis&&"x"!==this.autoAxis||(e=o.y),"y"!==this.options.axis&&"y"!==this.autoAxis||(i=o.x),this.options.moveTo.call(this,i,e)):this.shouldUseCSSTranslation()?(t=t/this.scale*this.options.multiplier,s=s/this.scale*this.options.multiplier,this.options.constrainTo&&(t=!1===o.x?t:0,s=!1===o.y?s:0),"x"!==this.options.axis&&"x"!==this.autoAxis||(s=0),"y"!==this.options.axis&&"y"!==this.autoAxis||(t=0),this.moveToUsingTransforms(t,s)):(i=t>=0?"+="+Math.abs(t/this.scale)*this.options.multiplier:"-="+Math.abs(t/this.scale)*this.options.multiplier,e=s>=0?"+="+Math.abs(s/this.scale)*this.options.multiplier:"-="+Math.abs(s/this.scale)*this.options.multiplier,this.options.constrainTo&&(i=!1!==o.x?o.x:i,e=!1!==o.y?o.y:e),"x"!==this.options.axis&&"x"!==this.autoAxis||(e=o.y),"y"!==this.options.axis&&"y"!==this.autoAxis||(i=o.x),this.moveTo(i,e))},n.prototype.handleStop=function(s){this.active&&(this.log({type:"event",event:s.type}),this.active=!1,this.easing=!0,this.$el.removeClass(this.options.startClass).addClass(this.options.easeClass),this.options.droppable&&this.calculateActiveDropRegions(),(this.started||!this.started&&t.inArray("stop",this.options.callIfNotStarted)>-1)&&this.options.stop.call(this,s,this),this.options.shouldEase?this.ease(s,this.started):this.removeActiveClass(),this.options.revert&&("stop"===this.options.revertAfter||!this.options.shouldEase)&&this.options.revertIf&&this.options.revertIf.call(this)&&this.revert(),this.started=!1,this.autoAxis&&(this.autoAxis=!1),this.resetVelocityQueue())},n.prototype.ease=function(s,i){this.$el.position();var e=this.velocity(),o=(this.dt,e.x/this.scale*this.options.multiplier),n=e.y/this.scale*this.options.multiplier,a=this.handleConstraint(o,n,!0);this.cssAnimationsSupported()&&this.$el.css(this.getCSSEaseHash());var r=e.x>0?"+="+o:"-="+Math.abs(o),p=e.y>0?"+="+n:"-="+Math.abs(n);this.options.constrainTo&&(r=!1!==a.x?a.x:r,p=!1!==a.y?a.y:p),"x"!==this.options.axis&&"x"!==this.autoAxis||(p="+=0"),"y"!==this.options.axis&&"y"!==this.autoAxis||(r="+=0");var h=!this.cssAnimationsSupported()||this.options.forceNonCSS3Movement;"function"==typeof this.options.moveTo?this.options.moveTo.call(this,r,p):this.moveTo(r,p,h);var l=this;this.restTimeout=setTimeout(function(){l.options.droppable&&l.calculateActiveDropRegions(),l.easing=!1,(i||!i&&t.inArray("rest",l.options.callIfNotStarted)>-1)&&l.options.rest.call(l,s,l),l.options.revert&&"ease"===l.options.revertAfter&&l.options.shouldEase&&l.options.revertIf&&l.options.revertIf.call(l)&&l.revert(),l.removeActiveClass()},this.options.cssEaseDuration)},n.prototype.normalizeEvent=function(t){return t.pep={},this.isTouch(t)?(t.pep.x=t.originalEvent.touches[0].pageX,t.pep.y=t.originalEvent.touches[0].pageY,t.pep.type=t.type):!this.isPointerEventCompatible()&&this.isTouch(t)||(t.pageX?(t.pep.x=t.pageX,t.pep.y=t.pageY):(t.pep.x=t.originalEvent.pageX,t.pep.y=t.originalEvent.pageY),t.pep.type=t.type),t},n.prototype.resetVelocityQueue=function(){this.velocityQueue=new Array(5)},n.prototype.moveTo=function(t,s,i){this.log({type:"delta",x:t,y:s}),i?this.$el.animate({top:s,left:t},0,"easeOutQuad",{queue:!1}):this.$el.stop(!0,!1).css({top:s,left:t})},n.prototype.moveToUsingTransforms=function(t,s){var i=this.matrixToArray(this.matrixString());this.cssX||(this.cssX=this.xTranslation(i)),this.cssY||(this.cssY=this.yTranslation(i)),this.cssX=this.cssX+t,this.cssY=this.cssY+s,this.log({type:"delta",x:t,y:s}),i[4]=this.cssX,i[5]=this.cssY,this.translation=this.arrayToMatrix(i),this.transform(this.translation)},n.prototype.transform=function(t){this.$el.css({"-webkit-transform":t,"-moz-transform":t,"-ms-transform":t,"-o-transform":t,transform:t})},n.prototype.xTranslation=function(t){return t=t||this.matrixToArray(this.matrixString()),parseInt(t[4],10)},n.prototype.yTranslation=function(t){return t=t||this.matrixToArray(this.matrixString()),parseInt(t[5],10)},n.prototype.matrixString=function(){var t=function(t){return!(!t||"none"===t||t.indexOf("matrix")<0)},s="matrix(1, 0, 0, 1, 0, 0)";return t(this.$el.css("-webkit-transform"))&&(s=this.$el.css("-webkit-transform")),t(this.$el.css("-moz-transform"))&&(s=this.$el.css("-moz-transform")),t(this.$el.css("-ms-transform"))&&(s=this.$el.css("-ms-transform")),t(this.$el.css("-o-transform"))&&(s=this.$el.css("-o-transform")),t(this.$el.css("transform"))&&(s=this.$el.css("transform")),s},n.prototype.matrixToArray=function(t){return t.split("(")[1].split(")")[0].split(",")},n.prototype.arrayToMatrix=function(t){return"matrix("+t.join(",")+")"},n.prototype.addToLIFO=function(t){var s=this.velocityQueue;(s=s.slice(1,s.length)).push(t),this.velocityQueue=s},n.prototype.velocity=function(){for(var t=0,s=0,i=0;i<this.velocityQueue.length-1;i++)this.velocityQueue[i]&&(t+=this.velocityQueue[i+1].x-this.velocityQueue[i].x,s+=this.velocityQueue[i+1].y-this.velocityQueue[i].y,this.dt=this.velocityQueue[i+1].time-this.velocityQueue[i].time);return{x:t*this.options.velocityMultiplier,y:s*this.options.velocityMultiplier}},n.prototype.revert=function(){this.shouldUseCSSTranslation()&&this.moveToUsingTransforms(-this.xTranslation(),-this.yTranslation()),this.options.place&&this.moveTo(this.initialPosition.left,this.initialPosition.top)},n.prototype.requestAnimationFrame=function(t){return s.requestAnimationFrame&&s.requestAnimationFrame(t)||s.webkitRequestAnimationFrame&&s.webkitRequestAnimationFrame(t)||s.mozRequestAnimationFrame&&s.mozRequestAnimationFrame(t)||s.oRequestAnimationFrame&&s.mozRequestAnimationFrame(t)||s.msRequestAnimationFrame&&s.msRequestAnimationFrame(t)||s.setTimeout(t,1e3/60)},n.prototype.positionParent=function(){this.options.constrainTo&&!this.parentPositioned&&(this.parentPositioned=!0,"parent"===this.options.constrainTo?this.$container.css({position:"relative"}):"window"===this.options.constrainTo&&"#document"!==this.$container.get(0).nodeName&&"static"!==this.$container.css("position")&&this.$container.css({position:"static"}))},n.prototype.placeObject=function(){this.objectPlaced||(this.objectPlaced=!0,this.offset="parent"===this.options.constrainTo||this.hasNonBodyRelative()?this.$el.position():this.$el.offset(),parseInt(this.$el.css("left"),10)&&(this.offset.left=this.$el.css("left")),"number"==typeof this.options.startPos.left&&(this.offset.left=this.options.startPos.left),parseInt(this.$el.css("top"),10)&&(this.offset.top=this.$el.css("top")),"number"==typeof this.options.startPos.top&&(this.offset.top=this.options.startPos.top),this.options.removeMargins&&this.$el.css({margin:0}),this.$el.css({position:"absolute",top:this.offset.top,left:this.offset.left}))},n.prototype.hasNonBodyRelative=function(){return this.$el.parents().filter(function(){var s=t(this);return s.is("body")||"relative"===s.css("position")}).length>1},n.prototype.setScale=function(t){this.scale=t},n.prototype.setMultiplier=function(t){this.options.multiplier=t},n.prototype.removeCSSEasing=function(){this.cssAnimationsSupported()&&this.$el.css(this.getCSSEaseHash(!0))},n.prototype.disableSelect=function(){this.$el.css({"-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none"})},n.prototype.removeActiveClass=function(){this.$el.removeClass([this.options.activeClass,this.options.easeClass].join(" "))},n.prototype.handleConstraint=function(s,e,o){var n=this.$el.position();this.pos.x=n.left,this.pos.y=n.top;var a,r,p,h,l={x:!1,y:!1};return this.log({type:"pos-coords",x:this.pos.x,y:this.pos.y}),t.isArray(this.options.constrainTo)?(this.options.constrainTo[3]!==i&&this.options.constrainTo[1]!==i&&(r=!1===this.options.constrainTo[1]?1/0:this.options.constrainTo[1],p=!1===this.options.constrainTo[3]?-1/0:this.options.constrainTo[3]),!1!==this.options.constrainTo[0]&&!1!==this.options.constrainTo[2]&&(a=!1===this.options.constrainTo[2]?1/0:this.options.constrainTo[2],h=!1===this.options.constrainTo[0]?-1/0:this.options.constrainTo[0]),this.pos.x+s<p&&(l.x=p),this.pos.y+e<h&&(l.y=h)):"string"==typeof this.options.constrainTo&&(p=0,h=0,r=this.$container.width()-(this.options.useBoundingClientRect?this.$el[0].getBoundingClientRect().width:this.$el.outerWidth()),a=this.$container.height()-(this.options.useBoundingClientRect?this.$el[0].getBoundingClientRect().height:this.$el.outerHeight()),this.pos.x+s<0&&(l.x=0),this.pos.y+e<0&&(l.y=0)),this.pos.x+s>r&&(l.x=r),this.pos.y+e>a&&(l.y=a),this.shouldUseCSSTranslation()&&o&&(l.x===p&&this.xTranslation()&&(l.x=p-this.xTranslation()),l.x===r&&this.xTranslation()&&(l.x=r-this.xTranslation()),l.y===h&&this.yTranslation()&&(l.y=h-this.yTranslation()),l.y===a&&this.yTranslation()&&(l.y=a-this.yTranslation())),l},n.prototype.getCSSEaseHash=function(t){var s;if(void 0===t&&(t=!1),t)s="";else{if(this.CSSEaseHash)return this.CSSEaseHash;s=["all",this.options.cssEaseDuration+"ms",this.options.cssEaseString].join(" ")}return{"-webkit-transition":s,"-moz-transition":s,"-ms-transition":s,"-o-transition":s,transition:s}},n.prototype.calculateActiveDropRegions=function(){var s=this;this.activeDropRegions.length=0,t.each(t(this.options.droppable),function(i,e){var o=t(e);s.isOverlapping(o,s.$el)?(o.addClass(s.options.droppableActiveClass),s.activeDropRegions.push(o)):o.removeClass(s.options.droppableActiveClass)})},n.prototype.isOverlapping=function(t,s){if(this.options.overlapFunction)return this.options.overlapFunction(t,s);var i=t[0].getBoundingClientRect(),e=s[0].getBoundingClientRect();return!(i.right<e.left||i.left>e.right||i.bottom<e.top||i.top>e.bottom)},n.prototype.isTouch=function(t){return t.type.search("touch")>-1},n.prototype.isPointerEventCompatible=function(){return"MSPointerEvent"in s},n.prototype.applyMSDefaults=function(t){this.$el.css({"-ms-touch-action":"none","touch-action":"none","-ms-scroll-chaining":"none","-ms-scroll-limit":"0 0 0 0"})},n.prototype.isValidMoveEvent=function(t){return!this.isTouch(t)||this.isTouch(t)&&t.originalEvent&&t.originalEvent.touches&&1===t.originalEvent.touches.length},n.prototype.shouldUseCSSTranslation=function(){if(this.options.forceNonCSS3Movement)return!1;if(void 0!==this.useCSSTranslation)return this.useCSSTranslation;var t=!1;return t=!(!this.options.useCSSTranslation||"undefined"!=typeof Modernizr&&!Modernizr.csstransforms),this.useCSSTranslation=t,t},n.prototype.cssAnimationsSupported=function(){if(void 0!==this.cssAnimationsSupport)return this.cssAnimationsSupport;if("undefined"!=typeof Modernizr&&Modernizr.cssanimations)return this.cssAnimationsSupport=!0,!0;var t=!1,s=document.createElement("div"),e="Webkit Moz O ms Khtml".split(" "),o="";if(s.style.animationName&&(t=!0),!1===t)for(var n=0;n<e.length;n++)if(s.style[e[n]+"AnimationName"]!==i){(o=e[n])+"Animation","-"+o.toLowerCase()+"-",t=!0;break}return this.cssAnimationsSupport=t,t},n.prototype.hardwareAccelerate=function(){this.$el.css({"-webkit-perspective":1e3,perspective:1e3,"-webkit-backface-visibility":"hidden","backface-visibility":"hidden"})},n.prototype.getMovementValues=function(){return{ev:this.ev,pos:this.pos,velocity:this.velocity()}},n.prototype.buildDebugDiv=function(){var s;0===t("#pep-debug").length&&(s=t("<div></div>")).attr("id","pep-debug").append("<div style='font-weight:bold; background: red; color: white;'>DEBUG MODE</div>").append("<div id='pep-debug-event'>no event</div>").append("<div id='pep-debug-ev-coords'>event coords: <span class='pep-x'>-</span>, <span class='pep-y'>-</span></div>").append("<div id='pep-debug-pos-coords'>position coords: <span class='pep-x'>-</span>, <span class='pep-y'>-</span></div>").append("<div id='pep-debug-velocity'>velocity: <span class='pep-x'>-</span>, <span class='pep-y'>-</span></div>").append("<div id='pep-debug-delta'>&Delta; movement: <span class='pep-x'>-</span>, <span class='pep-y'>-</span></div>").css({position:"fixed",bottom:5,right:5,zIndex:99999,textAlign:"right",fontFamily:"Arial, sans",fontSize:10,border:"1px solid #DDD",padding:"3px",background:"white",color:"#333"});var i=this;setTimeout(function(){i.debugElements={$event:t("#pep-debug-event"),$velocityX:t("#pep-debug-velocity .pep-x"),$velocityY:t("#pep-debug-velocity .pep-y"),$dX:t("#pep-debug-delta .pep-x"),$dY:t("#pep-debug-delta .pep-y"),$evCoordsX:t("#pep-debug-ev-coords .pep-x"),$evCoordsY:t("#pep-debug-ev-coords .pep-y"),$posCoordsX:t("#pep-debug-pos-coords .pep-x"),$posCoordsY:t("#pep-debug-pos-coords .pep-y")}},0),t("body").append(s)},n.prototype.log=function(t){if(this.options.debug)switch(t.type){case"event":this.debugElements.$event.text(t.event);break;case"pos-coords":this.debugElements.$posCoordsX.text(t.x),this.debugElements.$posCoordsY.text(t.y);break;case"event-coords":this.debugElements.$evCoordsX.text(t.x),this.debugElements.$evCoordsY.text(t.y);break;case"delta":this.debugElements.$dX.text(t.x),this.debugElements.$dY.text(t.y);break;case"velocity":var s=this.velocity();this.debugElements.$velocityX.text(Math.round(s.x)),this.debugElements.$velocityY.text(Math.round(s.y))}},n.prototype.toggle=function(t){this.disabled=void 0===t?!this.disabled:!t},t.extend(t.easing,{easeOutQuad:function(t,s,i,e,o){return-e*(s/=o)*(s-2)+i},easeOutCirc:function(t,s,i,e,o){return e*Math.sqrt(1-(s=s/o-1)*s)+i},easeOutExpo:function(t,s,i,e,o){return s===o?i+e:e*(1-Math.pow(2,-10*s/o))+i}}),t.fn[e]=function(s){return this.each(function(){if(!t.data(this,"plugin_"+e)){var i=new n(this,s);t.data(this,"plugin_"+e,i),t.pep.peps.push(i)}})},t.pep={},t.pep.peps=[],t.pep.toggleAll=function(s){t.each(this.peps,function(t,i){i.toggle(s)})},t.pep.unbind=function(s){t.each(s,function(s,i){var o=(i=t(i)).data("plugin_"+e);void 0!==o&&(o.toggle(!1),o.unsubscribe(),i.removeData("plugin_"+e))})}}(jQuery,window);
 
$(document).ready(function(){
 
	var userLang = navigator.language || navigator.userLanguage;
 
	$('body').addClass('is-preparing');
 
	setTimeout(function(){
		$('body').addClass('is-ready');
	}, 4500);
 
	setTimeout(function(){
		$('body').removeClass('is-preparing');
	}, 10000);
 
	$('.sphere.is-draggable').pep({
		useCSSTranslation: false,
		cssEaseDuration: 2000,
		droppable: '.washer',
		droppableActiveClass: 'is-active',
		start: dragStart,
		stop: dragEnd,
		revert: true
	});
 
	var sphereIndex = 999;
 
	function dragStart(e, obj) {
 
		var sphere = $(obj.el);
		var color = sphere.data('color');
 
		sphereIndex = sphereIndex + 1;
		sphere.css('z-index', sphereIndex);
 
		$('.coloring-book').attr('data-color', color);		
	}
 
	function dragEnd(e, obj) {
		var sphere = $(obj.el);
		var color = sphere.data('color');
 
		if ($('.washer').is('.is-active')) {
 
			sphere.addClass('plop');
			$('.washer').addClass('fill-up');
 
			setTimeout(function(){
				$('[data-remodal-id="' + color + '"]').remodal().open();
				$('.washer').removeClass('fill-up');
			}, 1500);
 
			setTimeout(function(){
				sphere.removeClass('plop');
			}, 2000);
		}
	}
 
	var resizeTimer;
 
	$(window).on('resize', function(e) {
 
		$('.sphere.is-draggable').css({'left': '', 'transition': ''});
 
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function() {
 
			$('.sphere.is-draggable').each(function(){
				var pos = $(this).offset().left;
				$(this).css({left: pos});
			});
 
			var $pep = $('.sphere.is-draggable');
			$.pep.unbind( $pep );
			$pep.pep({
				useCSSTranslation: false,
				cssEaseDuration: 2000,
				droppable: '.washer',
				droppableActiveClass: 'is-active',
				start: dragStart,
				stop: dragEnd,
				revert: true
			});
 
		}, 250);
 
	});
 
});