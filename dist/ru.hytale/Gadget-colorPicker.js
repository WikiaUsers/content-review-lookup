/*
 * XenForo color_picker.min.js
 * Copyright 2010-2018 XenForo Ltd.
 * Released under the XenForo License Agreement: https://xenforo.com/license-agreement
 */
var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.findInternal=function(e,k,h){e instanceof String&&(e=String(e));for(var l=e.length,a=0;a<l;a++){var b=e[a];if(k.call(h,b,a,e))return{i:a,v:b}}return{i:-1,v:void 0}};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(e,k,h){e!=Array.prototype&&e!=Object.prototype&&(e[k]=h.value)};
$jscomp.getGlobal=function(e){return"undefined"!=typeof window&&window===e?e:"undefined"!=typeof global&&null!=global?global:e};$jscomp.global=$jscomp.getGlobal(this);$jscomp.polyfill=function(e,k,h,l){if(k){h=$jscomp.global;e=e.split(".");for(l=0;l<e.length-1;l++){var a=e[l];a in h||(h[a]={});h=h[a]}e=e[e.length-1];l=h[e];k=k(l);k!=l&&null!=k&&$jscomp.defineProperty(h,e,{configurable:!0,writable:!0,value:k})}};
$jscomp.polyfill("Array.prototype.find",function(e){return e?e:function(e,h){return $jscomp.findInternal(this,e,h).v}},"es6","es3");
!function(e,k,h,l){XF.Color=XF.create({rgb:null,hsv:null,hsl:null,a:1,name:null,__construct:function(a,b,c){var d=null,g=function(a,b,c){a=parseInt(a,10);a=Math.max(b,Math.min(c,a));return isNaN(a)?b:a},f=function(a,b,c){a=parseFloat(a);return Math.max(b,Math.min(c,a))};"rgb"==a?"undefined"!=typeof b.r?(this.rgb={r:g(b.r,0,255),g:g(b.g,0,255),b:g(b.b,0,255)},d=b.a):"undefined"!=typeof b[0]&&(this.rgb={r:g(b[0],0,255),g:g(b[1],0,255),b:g(b[2],0,255)},d=b[3]):"hsv"==a?"undefined"!=typeof b.h?(this.hsv=
{h:g(b.h,0,359),s:f(b.s,0,1),v:f(b.v,0,1)},d=b.a):"undefined"!=typeof b[0]&&(this.hsv={h:g(b[0],0,359),s:f(b[1],0,1),v:f(b[2],0,1)},d=b[3]):"hsl"==a&&("undefined"!=typeof b.h?(this.hsl={h:g(b.h,0,359),s:f(b.s,0,1),l:f(b.l,0,1)},d=b.a):"undefined"!=typeof b[0]&&(this.hsl={h:g(b[0],0,359),s:f(b[1],0,1),v:f(b[2],0,1)},d=b[3]));if(!this.rgb&&!this.hsv&&!this.hsl)throw Error("No RGB, HSV or HSL color");"undefined"!==typeof d&&null!==d&&(this.a=f(d,0,1));this.name=c},setName:function(a){if(this.rgb){var b=
this.rgb;var c="rgb"}else this.hsv?(b=this.hsv,c="hsv"):this.hsl&&(b=this.hsl,c="hsl");b.a=this.a;return new XF.Color(c,b,a)},setHsvHue:function(a){var b=this.toHsv();b.h=a;return new XF.Color("hsv",b)},setHsvSaturation:function(a){var b=this.toHsv();b.s=a;return new XF.Color("hsv",b)},setHsvValue:function(a){var b=this.toHsv();b.v=a;return new XF.Color("hsv",b)},setHslHue:function(a){var b=this.toHsl();b.h=a;return new XF.Color("hsl",b)},setHslSaturation:function(a){var b=this.toHsl();b.s=a;return new XF.Color("hsl",
b)},setHslLightness:function(a){var b=this.toHsl();b.l=a;return new XF.Color("hsl",b)},setR:function(a){var b=this.toRgb();b.r=a;return new XF.Color("rgb",b)},setG:function(a){var b=this.toRgb();b.g=a;return new XF.Color("rgb",b)},setB:function(a){var b=this.toRgb();b.b=a;return new XF.Color("rgb",b)},setAlpha:function(a){if(this.rgb){var b=this.rgb;var c="rgb"}else this.hsv?(b=this.hsv,c="hsv"):this.hsl&&(b=this.hsl,c="hsl");b.a=a;return new XF.Color(c,b)},toHsv:function(){var a=this.hsv;a||(this.rgb?
(a=this.rgb,a=this._rgbToHsv(a.r,a.g,a.b)):this.hsl&&(a=this.hsl,a=this._hslToHsv(a.h,a.s,a.l)));a.a=this.a;return a},_rgbToHsv:function(a,b,c){var d;a/=255;b/=255;c/=255;var g=Math.max(a,b,c);var f=g-Math.min(a,b,c);if(0==f)a=d=0;else{switch(g){case a:d=(b-c)/f%6;break;case b:d=(c-a)/f+2;break;case c:d=(a-b)/f+4}d=Math.round(60*d);0>d&&(d+=360);a=f/g}return{h:d,s:a,v:g}},_hslToHsv:function(a,b,c){b=.5>c?b*c:b*(1-c);return{h:a,s:2*b/(c+b),v:c+b}},toRgb:function(){var a=this.rgb;a||(this.hsv?(a=this.hsv,
a=this._hsvToRgb(a.h,a.s,a.v)):this.hsl&&(a=this.hsl,a=this._hslToRgb(a.h,a.s,a.l)));a.a=this.a;return a},_hsvToRgb:function(a,b,c){b*=c;a/=60;var d=b*(1-Math.abs(a%2-1));if(1>a){var g=b;var f=d;var e=0}else 2>a?(g=d,f=b,e=0):3>a?(g=0,f=b,e=d):4>a?(g=0,f=d,e=b):5>a?(g=d,f=0,e=b):6>a&&(g=b,f=0,e=d);c-=b;return{r:Math.round(255*(g+c)),g:Math.round(255*(f+c)),b:Math.round(255*(e+c))}},_hslToRgb:function(a,b,c){a/=360;if(0==b)b=c=a=255*c;else{var d=.5>c?c*(1+b):c+b-b*c;var g=2*c-d;var e=function(a){0>
a&&a++;1<a&&a--;return 1>6*a?g+6*(d-g)*a:1>2*a?d:2>3*a?g+(d-g)*(2/3-a)*6:g};b=255*e(a+1/3);c=255*e(a);a=255*e(a-1/3)}return{r:Math.round(b),g:Math.round(c),b:Math.round(a)}},toHsl:function(){var a=this.hsl;a||(this.hsv?(a=this.hsv,a=this._hsvToHsl(a.h,a.s,a.v)):this.rgb&&(a=this.rgb,a=this._rgbToHsl(a.r,a.g,a.b)));a.a=this.a;return a},_hsvToHsl:function(a,b,c){var d=(2-b)*c;return{h:a,s:b*c/(1>d?d:2-d),l:d/2}},_rgbToHsl:function(a,b,c){a/=255;b/=255;c/=255;var d=Math.max(a,b,c),e=Math.min(a,b,c),
f=(d+e)/2;if(d==e)e=a=0;else{var h=d-e;e=.5<f?h/(2-d-e):h/(d+e);switch(d){case a:a=(b-c)/h;break;case b:a=2+(c-a)/h;break;case c:a=4+(a-b)/h;break;default:a=0}a*=60;0>a&&(a+=360)}return{h:a,s:e,l:f}},toCss:function(){var a=this.toRgb();return 1==a.a?"rgb("+a.r+", "+a.g+", "+a.b+")":"rgba("+a.r+", "+a.g+", "+a.b+", "+Math.round(100*a.a)/100+")"},toPrintable:function(){return this.name?this.name:this.toCss()}});XF.Color.fromString=function(a,b){a=e.trim(a);if(0==a.length)return null;var c;var d=null;
if(c=a.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i)){a=parseInt(c[1],16);d=parseInt(c[2],16);var g=parseInt(c[3],16);return new XF.Color("rgb",[a,d,g,1],b)}if(c=a.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i))return a=parseInt(c[1]+c[1],16),d=parseInt(c[2]+c[2],16),g=parseInt(c[3]+c[3],16),new XF.Color("rgb",[a,d,g,1],b);if(c=a.match(/^rgb\(\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\s*\)$/i))return a=c[1],d=c[2],g=c[3],new XF.Color("rgb",[a,d,g,1],b);if(c=a.match(/^rgba\(\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*(([0-9]*\.)?[0-9]+)\s*\)$/i))return a=
c[1],d=c[2],g=c[3],c=c[4],new XF.Color("rgb",[a,d,g,c],b);if(c=a.match(/^(xf-diminish|xf-intensify|lighten|darken|fade)\(\s*([a-z0-9_]*\([^)]*\)\s*|[^,]+),([^)]+)\)$/i)){var f=XF.Color.fromString(e.trim(c[2]),b||a);if(!f)return null;if(g=e.trim(c[3]).match(/^([0-9.]+)%/))d=parseFloat(g[1]);"xf-intensify"==c[1]?c[1]="light"==XF.Color.styleType?"darken":"lighten":"xf-diminish"==c[1]&&(c[1]="light"==XF.Color.styleType?"lighten":"darken");switch(c[1].toLowerCase()){case "darken":if(d)return c=f.toHsl(),
c.l=Math.max(0,c.l-d/100),new XF.Color("hsl",c,b||a);break;case "lighten":if(d)return c=f.toHsl(),c.l=Math.min(1,c.l+d/100),new XF.Color("hsl",c,b||a);break;case "fade":if(d)return f=f.setAlpha(d/100),f.setName(b||a)}return f}if(c=a.match(/^(mix)\(\s*([a-z0-9_]*\([^)]*\)\s*|[^,]+),\s*([a-z0-9_]*\([^)]*\)\s*|[^,]+)(,([^)]+))?\)$/i)){var h=XF.Color.fromString(e.trim(c[2]),b||a);f=XF.Color.fromString(e.trim(c[3]),b||a);if(!h||!f)return null;c[5]&&(g=e.trim(c[5]).match(/^([0-9.]+)%/))&&(d=parseFloat(g[1]));
d||(d=50);d/=100;c=h.toRgb();g=f.toRgb();d=2*d-1;f=c.a-g.a;d=((-1==d*f?d:(d+f)/(1+d*f))+1)/2;f=1-d;return new XF.Color("rgb",[Math.round(c.r*d+g.r*f),Math.round(c.g*d+g.g*f),Math.round(c.b*d+g.b*f),Math.round(c.a*d+g.a*f)],b||a)}if(XF.Color.namedColors[a.toLowerCase()])return XF.Color.fromString(XF.Color.namedColors[a.toLowerCase()],b||a);d=XF.Color.mapColors;c=!1;null===XF.Color.mapVisited&&(c=!0,XF.Color.mapVisited={});for(f in d)if(d.hasOwnProperty(f)&&d[f].colors[a]){if(XF.Color.mapVisited[a])return c&&
(XF.Color.mapVisited=null),"";XF.Color.mapVisited[a]=!0;b=XF.Color.fromString(d[f].colors[a].value,b||a);c&&(XF.Color.mapVisited=null);return b}c&&(XF.Color.mapVisited=null);return null};XF.Color.styleType="light";XF.Color.namedColors={};k=e(".js-namedColors");k.length&&(XF.Color.namedColors=e.parseJSON(k.first().html())||{});XF.Color.mapColors={};XF.Color.mapVisited=null;XF.ColorPicker=XF.Element.newHandler({options:{input:"| .input",box:"| .js-colorPickerTrigger",allowPalette:!0,mapName:null},$input:null,
$box:null,inputColor:null,menuInited:!1,menu:null,menuColor:null,menuEls:{},allowReparse:!0,init:function(){var a=this.$target;this.$input=XF.findRelativeIf(this.options.input,a);this.$input.on("keyup paste",XF.proxy(this,"onInputUpdate"));this.$box=XF.findRelativeIf(this.options.box,a);this.$box.append('<span class="colorPickerBox-sample" />');this.$box.click(XF.proxy(this,"click"));this.updateFromInput();var b=this;e(h).on("color-picker:reparse",function(){b.allowReparse&&(b.updateFromInput(),b.destroyMenu())})},
getInputColor:function(a){var b=this.inputColor;!b&&a&&(b=new XF.Color("hsv",[0,1,1]));return b},updateFromInput:function(a){var b=this.$input.val();this.inputColor=XF.Color.fromString(b);this.updateBox();this.inputColor&&a&&(this.updateMapColor(b),this.$input.trigger("change"))},updateMapColor:function(a){var b,c,d=XF.Color.mapColors,g=this.options.mapName;if(g)for(b in d)if(d.hasOwnProperty(b))for(c in d[b].colors)if(d[b].colors.hasOwnProperty(c)&&c==g){d[b].colors[c].value=a;this.allowReparse=
!1;e(h).trigger("color-picker:reparse");this.destroyMenu();this.allowReparse=!0;break}},updateBox:function(){var a=this.getInputColor(),b=this.$box,c=b.find(".colorPickerBox-sample");a?(b.removeClass("is-unknown").addClass("is-active"),c.css("background-color",a.toCss())):(""==this.$input.val()?b.removeClass("is-active is-unknown"):b.removeClass("is-active").addClass("is-unknown"),c.css("background-color",""))},onInputUpdate:function(){this.updateFromInput(!0)},setupMenu:function(){if(!this.menuInited){this.menuInited=
!0;var a=this.getMenuEl();this.$box.after(a);XF.activate(a);this.menuEls.$propertyContainer=a.find(".colorPicker-propertyContainer");this.menuEls.$colorGrad=a.find(".colorPicker-colorGrad-color");this.menuEls.$colorGradIndicator=a.find(".colorPicker-colorGrad-indicator");this.menuEls.$hueBar=a.find(".colorPicker-hue-bar");this.menuEls.$hueIndicator=a.find(".colorPicker-hue-indicator");this.menuEls.$alphaBar=a.find(".colorPicker-alpha-bar");this.menuEls.$alphaIndicator=a.find(".colorPicker-alpha-indicator");
this.menuEls.$previewOriginal=a.find(".colorPicker-preview-original");this.menuEls.$previewCurrent=a.find(".colorPicker-preview-current");this.menuEls.$input=a.find(".colorPicker-input");this.menuEls.$save=a.find(".colorPicker-save");this.menuEls.$propertyContainer.on("click","[data-property]",XF.proxy(this,"propertyClick"));this.menuEls.$colorGrad.on("mousedown",XF.proxy(this,"colorGradMouseDown"));this.menuEls.$hueBar.on("mousedown",XF.proxy(this,"hueBarMouseDown"));this.menuEls.$alphaBar.on("mousedown",
XF.proxy(this,"alphaBarMouseDown"));this.menuEls.$save.on("click",XF.proxy(this,"save"));this.menu=new XF.MenuClick(this.$box,{})}},destroyMenu:function(){this.menuInited&&(this.closeMenu(),this.menuInited=!1,this.menuColor=this.menu=null,this.menuEls={})},openMenu:function(){this.$input.prop("disabled")||(this.setupMenu(),this.menu.open())},closeMenu:function(){this.menu&&this.menu.close()},getMenuEl:function(){var a=[],b=[];if(this.options.allowPalette){var c=XF.Color.mapColors,d=this.options.mapName,
g,f;for(g in c)if(c.hasOwnProperty(g)){var h=c[g];var k="";for(f in h.colors)if(h.colors.hasOwnProperty(f)&&(!d||d!==f)){var l=h.colors[f];var m=XF.Color.fromString(l.value);k+='<div class="colorPicker-property'+(m?"":" is-unknown")+'" data-property="'+XF.htmlspecialchars(f)+'"><span class="colorPicker-property-preview" style="background-color: '+XF.htmlspecialchars(m?m.toCss():"transparent")+'"></span>'+XF.htmlspecialchars(l.title)+"</div>"}a.push(h.title);b.push('<div class="colorPicker-propertyContainer">'+
k+"</div>")}}a.push(XF.phrase("picker"));b.push('<div class="colorPicker-sliders" dir="ltr"><div class="colorPicker-hue"><div class="colorPicker-hue-bar"><span class="colorPicker-hue-indicator"></span></div></div><div class="colorPicker-colorGrad"><div class="colorPicker-colorGrad-color"><div class="colorPicker-colorGrad-sat"><div class="colorPicker-colorGrad-val"><span class="colorPicker-colorGrad-indicator"></span></div></div></div></div><div class="colorPicker-alpha"><div class="colorPicker-alpha-bar"><span class="colorPicker-alpha-indicator"></span></div></div></div>');
c="";if(1<a.length){c+='<h4 class="menu-tabHeader tabs hScroller" data-xf-init="tabs h-scroller" role="tablist"><span class="hScroller-scroll">';for(d=0;d<a.length;d++)c+='<a class="tabs-tab'+(0==d?" is-active":"")+'" role="tab" tabindex="0">'+XF.htmlspecialchars(a[d])+"</a>";c+='</span></h4><ul class="tabPanes">';for(d=0;d<a.length;d++)c+='<li class="'+(0==d?"is-active":"")+'" role="tabpanel">'+b[d]+"</li>";c+="</ul>"}else 1==a.length&&(c=b[0]);a='<div class="colorPicker-inputs"><div class="colorPicker-preview"><span class="colorPicker-preview-original"></span><span class="colorPicker-preview-current"></span></div><div class="colorPicker-inputContainer"><input type="text" class="input colorPicker-input" dir="ltr" /></div><div class="colorPicker-saveContainer"><button class="button button--primary colorPicker-save"><span class="button-text">'+
XF.phrase("update")+"</span></button></div></div>";return e(e.parseHTML('<div class="menu menu--colorPicker" data-menu="menu" aria-hidden="true"><div class="menu-content colorPicker">'+c+a+"</div></div>"))},propertyClick:function(a){a.preventDefault();if(a=e(a.currentTarget).data("property")){var b=XF.Color.fromString(a);b||(b=XF.Color.fromString("transparent",a));this.updateMenuColor(b)}},colorGradMouseDown:function(a){this.colorGradMouseAction(a);var b=this;e(h).on({"mouseup.colorpicker":function(){e(h).off(".colorpicker")},
"mousemove.colorpicker":function(a){b.colorGradMouseAction(a)}})},colorGradMouseAction:function(a){a.preventDefault();var b=this.menuEls.$colorGrad,c=b.offset(),d=a.pageY-c.top;a=Math.max(0,Math.min(1,(a.pageX-c.left)/b.width()));b=Math.max(0,Math.min(1,1-d/b.height()));b=this.getMenuColor(!0).setHsvSaturation(a).setHsvValue(b);this.updateMenuColor(b)},hueBarMouseDown:function(a){this.hueBarMouseAction(a);var b=this;e(h).on({"mouseup.colorpicker":function(){e(h).off(".colorpicker")},"mousemove.colorpicker":function(a){b.hueBarMouseAction(a)}})},
hueBarMouseAction:function(a){a.preventDefault();var b=this.menuEls.$hueBar;a=359*(a.pageY-b.offset().top)/b.height();a=Math.round(Math.max(0,Math.min(359,a)));a=this.getMenuColor(!0).setHsvHue(a);this.updateMenuColor(a)},alphaBarMouseDown:function(a){this.alphaBarMouseAction(a);var b=this;e(h).on({"mouseup.colorpicker":function(){e(h).off(".colorpicker")},"mousemove.colorpicker":function(a){b.alphaBarMouseAction(a)}})},alphaBarMouseAction:function(a){a.preventDefault();var b=this.menuEls.$alphaBar;
a=(a.pageX-b.offset().left)/b.width();a=1-Math.max(0,Math.min(1,a));a=this.getMenuColor(!0).setAlpha(a);this.updateMenuColor(a)},save:function(){var a=this.menuEls.$input.val();this.closeMenu();this.$input.val(a);this.updateFromInput(!0)},getMenuColor:function(a){var b=this.menuColor;!b&&a&&(b=new XF.Color("hsv",[0,1,1]));return b},updateMenuColor:function(a,b){this.menuColor=a;this.updatePickerData(b)},updatePickerData:function(a){var b=this.getMenuColor(!0),c=this.getMenuColor();this.updatePickerSelections(b);
this.updateSelectedPropertyColor(c);c?(this.menuEls.$input.val(c.toPrintable()),this.menuEls.$previewCurrent.css("background-color",c.toCss())):(a&&this.menuEls.$input.val(""),this.menuEls.$previewCurrent.css("background-color",""))},updateSelectedPropertyColor:function(a){var b=this.menuEls.$propertyContainer.find("[data-property]");a=this.getPropertyColorMatch(a);b.removeClass("is-active");a&&a.addClass("is-active")},getPropertyColorMatch:function(a){var b=this.menuEls.$propertyContainer.find("[data-property]"),
c=null;a&&a.name&&b.each(function(){var b=e(this);if(b.data("property")==a.name)return c=b,!1});return c},updatePickerSelections:function(a){var b=a.toHsv(),c=new XF.Color("hsv",[b.h,1,1]),d=b.h/359*100+"%",e=100-100*b.a+"%";this.menuEls.$colorGradIndicator.css({top:100-100*b.v+"%",left:100*b.s+"%"});this.menuEls.$colorGrad.css("background-color",c.toCss());this.menuEls.$hueIndicator.css("top",d);b=a.setAlpha(1);a=a.setAlpha(0);this.menuEls.$alphaBar.css("background-image","linear-gradient(to right, "+
b.toCss()+", "+a.toCss()+")");this.menuEls.$alphaIndicator.css("left",e)},onMenuOpen:function(){var a=this.getInputColor(),b=this.menuEls.$previewOriginal;this.updateMenuColor(a,!0);a?b.css("background-color",a.toCss()):b.css("background-color","")},click:function(a){if(this.$input.prop("disabled"))this.menu&&this.closeMenu();else{this.setupMenu();if(!this.menu.isOpen())this.onMenuOpen();this.menu.click(a)}}});XF.Element.register("color-picker","XF.ColorPicker");e(h).on("xf:page-load-start",function(){if(e(".js-colorPickerData").length){try{var a=
e.parseJSON(e(".js-colorPickerData").first().html())||{}}catch(b){console.error(b),a={}}a.colors&&(XF.Color.mapColors=e.extend({},XF.Color.mapColors,a.colors));a.config&&(XF.Color.styleType=a.config.styleType||"light")}})}(jQuery,window,document);