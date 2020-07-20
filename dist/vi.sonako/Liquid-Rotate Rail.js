if(!jQuery.effects){
/*! jQuery UI - v1.8.22 - 2012-07-24
	 * https://github.com/jquery/jquery-ui
	 * Includes: jquery.effects.core.js
	 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL
	 */
jQuery.effects||function(x,w){function v(a){var d;return a&&a.constructor==Array&&a.length==3?a:(d=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(a))?[parseInt(d[1],10),parseInt(d[2],10),parseInt(d[3],10)]:(d=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(a))?[parseFloat(d[1])*2.55,parseFloat(d[2])*2.55,parseFloat(d[3])*2.55]:(d=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(a))?[parseInt(d[1],16),parseInt(d[2],16),parseInt(d[3],16)]:(d=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(a))?[parseInt(d[1]+d[1],16),parseInt(d[2]+d[2],16),parseInt(d[3]+d[3],16)]:(d=/rgba\(0, 0, 0, 0\)/.exec(a))?t.transparent:t[x.trim(a).toLowerCase()]}function u(a,f){var c;do{c=(x.curCSS||x.css)(a,f);if(c!=""&&c!="transparent"||x.nodeName(a,"body")){break}f="backgroundColor"}while(a=a.parentNode);return v(c)}function q(){var g=document.defaultView?document.defaultView.getComputedStyle(this,null):this.currentStyle,f={},j,i;if(g&&g.length&&g[0]&&g[g[0]]){var h=g.length;while(h--){j=g[h],typeof g[j]=="string"&&(i=j.replace(/\-(\w)/g,function(d,c){return c.toUpperCase()}),f[i]=g[j])}}else{for(j in g){typeof g[j]=="string"&&(f[j]=g[j])}}return f}function p(a){var f,e;for(f in a){e=a[f],(e==null||x.isFunction(e)||f in r||/scrollbar/.test(f)||!/color/i.test(f)&&isNaN(parseFloat(e)))&&delete a[f]}return a}function o(f,e){var h={_:0},g;for(g in e){f[g]!=e[g]&&(h[g]=e[g])}return h}function n(a,h,g,f){typeof a=="object"&&(f=h,g=null,h=a,a=h.effect),x.isFunction(h)&&(f=h,g=null,h={});if(typeof h=="number"||x.fx.speeds[h]){f=g,g=h,h={}}return x.isFunction(g)&&(f=g,g=null),h=h||{},g=g||h.duration,g=x.fx.off?0:typeof g=="number"?g:g in x.fx.speeds?x.fx.speeds[g]:x.fx.speeds._default,f=f||h.complete,[a,h,g,f]}function m(a){return !a||typeof a=="number"||x.fx.speeds[a]?!0:typeof a=="string"&&!x.effects[a]?!0:!1}x.effects={},x.each(["backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","borderColor","color","outlineColor"],function(a,c){x.fx.step[c]=function(b){b.colorInit||(b.start=u(b.elem,c),b.end=v(b.end),b.colorInit=!0),b.elem.style[c]="rgb("+Math.max(Math.min(parseInt(b.pos*(b.end[0]-b.start[0])+b.start[0],10),255),0)+","+Math.max(Math.min(parseInt(b.pos*(b.end[1]-b.start[1])+b.start[1],10),255),0)+","+Math.max(Math.min(parseInt(b.pos*(b.end[2]-b.start[2])+b.start[2],10),255),0)+")"}});var t={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0],transparent:[255,255,255]},s=["add","remove","toggle"],r={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};x.effects.animateClass=function(a,h,g,f){return x.isFunction(g)&&(f=g,g=null),this.queue(function(){var e=x(this),d=e.attr("style")||" ",c=p(q.call(this)),b,i=e.attr("class")||"";x.each(s,function(j,k){a[k]&&e[k+"Class"](a[k])}),b=p(q.call(this)),e.attr("class",i),e.animate(o(c,b),{queue:!1,duration:h,easing:g,complete:function(){x.each(s,function(j,k){a[k]&&e[k+"Class"](a[k])}),typeof e.attr("style")=="object"?(e.attr("style").cssText="",e.attr("style").cssText=d):e.attr("style",d),f&&f.apply(this,arguments),x.dequeue(this)}})})},x.fn.extend({_addClass:x.fn.addClass,addClass:function(a,h,g,f){return h?x.effects.animateClass.apply(this,[{add:a},h,g,f]):this._addClass(a)},_removeClass:x.fn.removeClass,removeClass:function(a,h,g,f){return h?x.effects.animateClass.apply(this,[{remove:a},h,g,f]):this._removeClass(a)},_toggleClass:x.fn.toggleClass,toggleClass:function(j,i,h,b,a){return typeof i=="boolean"||i===w?h?x.effects.animateClass.apply(this,[i?{add:j}:{remove:j},h,b,a]):this._toggleClass(j,i):x.effects.animateClass.apply(this,[{toggle:j},i,h,b])},switchClass:function(a,j,i,h,g){return x.effects.animateClass.apply(this,[{add:j,remove:a},i,h,g])}}),x.extend(x.effects,{version:"1.8.22",save:function(e,d){for(var f=0;f<d.length;f++){d[f]!==null&&e.data("ec.storage."+d[f],e[0].style[d[f]])}},restore:function(e,d){for(var f=0;f<d.length;f++){d[f]!==null&&e.css(d[f],e.data("ec.storage."+d[f]))}},setMode:function(d,c){return c=="toggle"&&(c=d.is(":hidden")?"show":"hide"),c},getBaseline:function(f,e){var h,g;switch(f[0]){case"top":h=0;break;case"middle":h=0.5;break;case"bottom":h=1;break;default:h=f[0]/e.height}switch(f[1]){case"left":g=0;break;case"center":g=0.5;break;case"right":g=1;break;default:g=f[1]/e.width}return{x:g,y:h}},createWrapper:function(a){if(a.parent().is(".ui-effects-wrapper")){return a.parent()}var j={width:a.outerWidth(!0),height:a.outerHeight(!0),"float":a.css("float")},i=x("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0}),h=document.activeElement;try{h.id}catch(g){h=document.body}return a.wrap(i),(a[0]===h||x.contains(a[0],h))&&x(h).focus(),i=a.parent(),a.css("position")=="static"?(i.css({position:"relative"}),a.css({position:"relative"})):(x.extend(j,{position:a.css("position"),zIndex:a.css("z-index")}),x.each(["top","left","bottom","right"],function(b,c){j[c]=a.css(c),isNaN(parseInt(j[c],10))&&(j[c]="auto")}),a.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})),i.css(j).show()},removeWrapper:function(a){var f,e=document.activeElement;return a.parent().is(".ui-effects-wrapper")?(f=a.parent().replaceWith(a),(a[0]===e||x.contains(a[0],e))&&x(e).focus(),f):a},setTransition:function(a,h,g,f){return f=f||{},x.each(h,function(b,e){var d=a.cssUnit(e);d[0]>0&&(f[e]=d[0]*g+d[1])}),f}}),x.fn.extend({effect:function(a,B,A,z){var y=n.apply(this,arguments),l={options:y[1],duration:y[2],callback:y[3]},k=l.options.mode,j=x.effects[a];return x.fx.off||!j?k?this[k](l.duration,l.callback):this.each(function(){l.callback&&l.callback.call(this)}):j.call(this,l)},_show:x.fn.show,show:function(d){if(m(d)){return this._show.apply(this,arguments)}var c=n.apply(this,arguments);return c[1].mode="show",this.effect.apply(this,c)},_hide:x.fn.hide,hide:function(d){if(m(d)){return this._hide.apply(this,arguments)}var c=n.apply(this,arguments);return c[1].mode="hide",this.effect.apply(this,c)},__toggle:x.fn.toggle,toggle:function(a){if(m(a)||typeof a=="boolean"||x.isFunction(a)){return this.__toggle.apply(this,arguments)}var d=n.apply(this,arguments);return d[1].mode="toggle",this.effect.apply(this,d)},cssUnit:function(a){var f=this.css(a),e=[];return x.each(["em","px","%","pt"],function(d,c){f.indexOf(c)>0&&(e=[parseFloat(f),c])}),e}}),x.easing.jswing=x.easing.swing,x.extend(x.easing,{def:"easeOutQuad",swing:function(a,j,i,h,g){return x.easing[x.easing.def](a,j,i,h,g)},easeInQuad:function(g,f,j,i,h){return i*(f/=h)*f+j},easeOutQuad:function(g,f,j,i,h){return -i*(f/=h)*(f-2)+j},easeInOutQuad:function(g,f,j,i,h){return(f/=h/2)<1?i/2*f*f+j:-i/2*(--f*(f-2)-1)+j},easeInCubic:function(g,f,j,i,h){return i*(f/=h)*f*f+j},easeOutCubic:function(g,f,j,i,h){return i*((f=f/h-1)*f*f+1)+j},easeInOutCubic:function(g,f,j,i,h){return(f/=h/2)<1?i/2*f*f*f+j:i/2*((f-=2)*f*f+2)+j},easeInQuart:function(g,f,j,i,h){return i*(f/=h)*f*f*f+j},easeOutQuart:function(g,f,j,i,h){return -i*((f=f/h-1)*f*f*f-1)+j},easeInOutQuart:function(g,f,j,i,h){return(f/=h/2)<1?i/2*f*f*f*f+j:-i/2*((f-=2)*f*f*f-2)+j},easeInQuint:function(g,f,j,i,h){return i*(f/=h)*f*f*f*f+j},easeOutQuint:function(g,f,j,i,h){return i*((f=f/h-1)*f*f*f*f+1)+j},easeInOutQuint:function(g,f,j,i,h){return(f/=h/2)<1?i/2*f*f*f*f*f+j:i/2*((f-=2)*f*f*f*f+2)+j},easeInSine:function(g,f,j,i,h){return -i*Math.cos(f/h*(Math.PI/2))+i+j},easeOutSine:function(g,f,j,i,h){return i*Math.sin(f/h*(Math.PI/2))+j},easeInOutSine:function(g,f,j,i,h){return -i/2*(Math.cos(Math.PI*f/h)-1)+j},easeInExpo:function(g,f,j,i,h){return f==0?j:i*Math.pow(2,10*(f/h-1))+j},easeOutExpo:function(g,f,j,i,h){return f==h?j+i:i*(-Math.pow(2,-10*f/h)+1)+j},easeInOutExpo:function(g,f,j,i,h){return f==0?j:f==h?j+i:(f/=h/2)<1?i/2*Math.pow(2,10*(f-1))+j:i/2*(-Math.pow(2,-10*--f)+2)+j},easeInCirc:function(g,f,j,i,h){return -i*(Math.sqrt(1-(f/=h)*f)-1)+j},easeOutCirc:function(g,f,j,i,h){return i*Math.sqrt(1-(f=f/h-1)*f)+j},easeInOutCirc:function(g,f,j,i,h){return(f/=h/2)<1?-i/2*(Math.sqrt(1-f*f)-1)+j:i/2*(Math.sqrt(1-(f-=2)*f)+1)+j},easeInElastic:function(j,i,B,A,z){var y=1.70158,l=0,k=A;if(i==0){return B}if((i/=z)==1){return B+A}l||(l=z*0.3);if(k<Math.abs(A)){k=A;var y=l/4}else{var y=l/(2*Math.PI)*Math.asin(A/k)}return -(k*Math.pow(2,10*(i-=1))*Math.sin((i*z-y)*2*Math.PI/l))+B},easeOutElastic:function(j,i,B,A,z){var y=1.70158,l=0,k=A;if(i==0){return B}if((i/=z)==1){return B+A}l||(l=z*0.3);if(k<Math.abs(A)){k=A;var y=l/4}else{var y=l/(2*Math.PI)*Math.asin(A/k)}return k*Math.pow(2,-10*i)*Math.sin((i*z-y)*2*Math.PI/l)+A+B},easeInOutElastic:function(j,i,B,A,z){var y=1.70158,l=0,k=A;if(i==0){return B}if((i/=z/2)==2){return B+A}l||(l=z*0.3*1.5);if(k<Math.abs(A)){k=A;var y=l/4}else{var y=l/(2*Math.PI)*Math.asin(A/k)}return i<1?-0.5*k*Math.pow(2,10*(i-=1))*Math.sin((i*z-y)*2*Math.PI/l)+B:k*Math.pow(2,-10*(i-=1))*Math.sin((i*z-y)*2*Math.PI/l)*0.5+A+B},easeInBack:function(b,l,k,j,i,h){return h==w&&(h=1.70158),j*(l/=i)*l*((h+1)*l-h)+k},easeOutBack:function(b,l,k,j,i,h){return h==w&&(h=1.70158),j*((l=l/i-1)*l*((h+1)*l+h)+1)+k},easeInOutBack:function(b,l,k,j,i,h){return h==w&&(h=1.70158),(l/=i/2)<1?j/2*l*l*(((h*=1.525)+1)*l-h)+k:j/2*((l-=2)*l*(((h*=1.525)+1)*l+h)+2)+k},easeInBounce:function(a,j,i,h,g){return h-x.easing.easeOutBounce(a,g-j,0,h,g)+i},easeOutBounce:function(g,f,j,i,h){return(f/=h)<1/2.75?i*7.5625*f*f+j:f<2/2.75?i*(7.5625*(f-=1.5/2.75)*f+0.75)+j:f<2.5/2.75?i*(7.5625*(f-=2.25/2.75)*f+0.9375)+j:i*(7.5625*(f-=2.625/2.75)*f+0.984375)+j},easeInOutBounce:function(a,j,i,h,g){return j<g/2?x.easing.easeInBounce(a,j*2,0,h,g)*0.5+i:x.easing.easeOutBounce(a,j*2-g,0,h,g)*0.5+h*0.5+i}})}(jQuery)}if(!jQuery.effects.drop){
/*! jQuery UI - v1.8.22 - 2012-07-24
	 * https://github.com/jquery/jquery-ui
	 * Includes: jquery.effects.drop.js
	 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL
	 */
(function(d,c){d.effects.drop=function(a){return this.queue(function(){var q=d(this),p=["position","top","bottom","left","right","opacity"],o=d.effects.setMode(q,a.options.mode||"hide"),n=a.options.direction||"left";d.effects.save(q,p),q.show(),d.effects.createWrapper(q);var m=n=="up"||n=="down"?"top":"left",l=n=="up"||n=="left"?"pos":"neg",k=a.options.distance||(m=="top"?q.outerHeight(!0)/2:q.outerWidth(!0)/2);o=="show"&&q.css("opacity",0).css(m,l=="pos"?-k:k);var b={opacity:o=="show"?1:0};b[m]=(o=="show"?l=="pos"?"+=":"-=":l=="pos"?"-=":"+=")+k,q.animate(b,{queue:!1,duration:a.duration,easing:a.options.easing,complete:function(){o=="hide"&&q.hide(),d.effects.restore(q,p),d.effects.removeWrapper(q),a.callback&&a.callback.apply(this,arguments),q.dequeue()}})})}})(jQuery)}
/*!
 * @fileOverview 12 October 2012 - Railgun demo #2
 * @author Copyright (c) Jeff Bradford (User:Mathmagician)
 * @version 2.2.2
 */
(function(d,h,e,a,b){var i={},c=d('<div id="Railgun-toolbar"></div>');d(function(){var k="#WikiaRail{position:relative!important}#Railgun-toolbar-wrapper{bottom:27px;margin:0;padding:0;position:fixed}#Railgun-toolbar{left:342px;margin:0;padding:0;position:relative;width:25px}#Railgun-toolbar .Railgun-toolbar-button{cursor:pointer;display:inline-block;float:none;height:25px;margin:0;padding:0;width:25px}";var j='<style id="Railgun-stylesheet">'+k+"</style>";d(document.head).append(j)});function f(q,p,o,k,m,l){var j='<img id="'+q+'" class="Railgun-toolbar-button" src="'+p+'" title="'+o+'" width="25" height="25" />',n=d(j);if(l){n.attr("style",l)}if(m!==b&&m!==null){n.on("click",m,k)}else{n.on("click",k)}c.append(n);return n}(function(k){function l(p){var m,r,o,q,n;p.stopPropagation();m=k("#WikiaRail .module");if(m.length<2){return}j(false);r=m.first();o=m.last();q=200;if(p.data===-1){n=r.attr("style");r.hide("drop",{direction:"up"},q,function(){if(n){r.attr("style",n)}else{r.removeAttr("style")}o.after(r);j(true)})}else{n=o.attr("style");r.before(o);o.show("drop",{direction:"up"},q,function(){if(n){o.attr("style",n)}else{o.removeAttr("style")}j(true)})}}function j(m){if(m){k("#Railgun-toolbar-rotate-up").on("click",-1,l);k("#Railgun-toolbar-rotate-down").on("click",l)}else{k("#Railgun-toolbar-rotate-up, #Railgun-toolbar-rotate-down").off("click")}}f("Railgun-toolbar-rotate-up","https://images.wikia.nocookie.net/mathmagician/images/0/06/RotateUp.png","Rotate Up: shifts all modules on the siderail up by one, the top module goes around to the bottom",l,-1);f("Railgun-toolbar-rotate-down","https://images.wikia.nocookie.net/mathmagician/images/f/fa/RotateDown.png","Rotate Down: pushes all siderail modules down by one, the bottom module goes around to the top",l)}(d));(function(k){function j(r){var s=e.scrollY,n=k("#WikiaRail"),m=k("#WikiaMainContent").position().top,q=m+53,p=n.height(),o=k("#WikiaFooter").position().top;if(s<=q){n.css("top",0)}else{if(s>=o-p){n.css("top",((o-p-m)+"px"))}else{n.css("top",((s-q)+"px"))}}}function l(n){n.stopPropagation();var o,m;if(n.data===-1){k(e).on("scroll",j);k("#Railgun-toolbar-liquid-on").css("display","none");k("#Railgun-toolbar-liquid-off").removeAttr("style");o=e.scrollY;if(o>0){m=o-1}else{m=1}e.scrollTo(0,m);e.scrollTo(0,o)}else{k(e).off("scroll",j);k("#Railgun-toolbar-liquid-on").removeAttr("style");k("#Railgun-toolbar-liquid-off").css("display","none")}}f("Railgun-toolbar-liquid-on","https://images.wikia.nocookie.net/mathmagician/images/b/b3/LiquidOn.png","Liquid Rail On: makes the siderail scroll with the window",l,-1,"display: none");f("Railgun-toolbar-liquid-off","https://images.wikia.nocookie.net/mathmagician/images/7/76/LiquidOff.png","Liquid Rail Off: reverts the siderail to its default static state",l);k(e).off("scroll",j)}(d));function g(){d("#WikiaRail").append(d('<div id="Railgun-toolbar-wrapper"></div>').append(c))}i.Module=function(){};d(g);e.Railgun=i}(jQuery,mediaWiki,window,window.Railgun));