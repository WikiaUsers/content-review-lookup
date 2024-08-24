/* http://keith-wood.name/svg.html
   SVG for jQuery v1.4.5.
   Written by Keith Wood (kbwood{at}iinet.com.au) August 2007.
   Dual licensed under the GPL (http://dev.jquery.com/browser/trunk/jquery/GPL-LICENSE.txt) and 
   MIT (http://dev.jquery.com/browser/trunk/jquery/MIT-LICENSE.txt) licenses. 
   Please attribute the author if you use it. */
(function($){function SVGManager(){this._settings=[];this._extensions=[];this.regional=[];this.regional['']={errorLoadingText:'Error loading',notSupportedText:'This browser does not support SVG'};this.local=this.regional[''];this._uuid=new Date().getTime();this._renesis=detectActiveX('RenesisX.RenesisCtrl')}function detectActiveX(a){try{return!!(window.ActiveXObject&&new ActiveXObject(a))}catch(e){return false}}var q='svgwrapper';$.extend(SVGManager.prototype,{markerClassName:'hasSVG',svgNS:'http://www.w3.org/2000/svg',xlinkNS:'http://www.w3.org/1999/xlink',_wrapperClass:SVGWrapper,_attrNames:{class_:'class',in_:'in',alignmentBaseline:'alignment-baseline',baselineShift:'baseline-shift',clipPath:'clip-path',clipRule:'clip-rule',colorInterpolation:'color-interpolation',colorInterpolationFilters:'color-interpolation-filters',colorRendering:'color-rendering',dominantBaseline:'dominant-baseline',enableBackground:'enable-background',fillOpacity:'fill-opacity',fillRule:'fill-rule',floodColor:'flood-color',floodOpacity:'flood-opacity',fontFamily:'font-family',fontSize:'font-size',fontSizeAdjust:'font-size-adjust',fontStretch:'font-stretch',fontStyle:'font-style',fontVariant:'font-variant',fontWeight:'font-weight',glyphOrientationHorizontal:'glyph-orientation-horizontal',glyphOrientationVertical:'glyph-orientation-vertical',horizAdvX:'horiz-adv-x',horizOriginX:'horiz-origin-x',imageRendering:'image-rendering',letterSpacing:'letter-spacing',lightingColor:'lighting-color',markerEnd:'marker-end',markerMid:'marker-mid',markerStart:'marker-start',stopColor:'stop-color',stopOpacity:'stop-opacity',strikethroughPosition:'strikethrough-position',strikethroughThickness:'strikethrough-thickness',strokeDashArray:'stroke-dasharray',strokeDashOffset:'stroke-dashoffset',strokeLineCap:'stroke-linecap',strokeLineJoin:'stroke-linejoin',strokeMiterLimit:'stroke-miterlimit',strokeOpacity:'stroke-opacity',strokeWidth:'stroke-width',textAnchor:'text-anchor',textDecoration:'text-decoration',textRendering:'text-rendering',underlinePosition:'underline-position',underlineThickness:'underline-thickness',vertAdvY:'vert-adv-y',vertOriginY:'vert-origin-y',wordSpacing:'word-spacing',writingMode:'writing-mode'},_attachSVG:function(a,b){var c=(a.namespaceURI==this.svgNS?a:null);var a=(c?null:a);if($(a||c).hasClass(this.markerClassName)){return}if(typeof b=='string'){b={loadURL:b}}else if(typeof b=='function'){b={onLoad:b}}$(a||c).addClass(this.markerClassName);try{if(!c){c=document.createElementNS(this.svgNS,'svg');c.setAttribute('version','1.1');if(a.clientWidth>0){c.setAttribute('width',a.clientWidth)}if(a.clientHeight>0){c.setAttribute('height',a.clientHeight)}a.appendChild(c)}this._afterLoad(a,c,b||{})}catch(e){if($.browser.msie){if(!a.id){a.id='svg'+(this._uuid++)}this._settings[a.id]=b;a.innerHTML='<embed type="image/svg+xml" width="100%" '+'height="100%" src="'+(b.initPath||'')+'blank.svg" '+'pluginspage="http://www.adobe.com/svg/viewer/install/main.html"/>'}else{a.innerHTML='<p class="svg_error">'+this.local.notSupportedText+'</p>'}}},_registerSVG:function(){for(var i=0;i<document.embeds.length;i++){var a=document.embeds[i].parentNode;if(!$(a).hasClass($.svg.markerClassName)||$.data(a,q)){continue}var b=null;try{b=document.embeds[i].getSVGDocument()}catch(e){setTimeout($.svg._registerSVG,250);return}b=(b?b.documentElement:null);if(b){$.svg._afterLoad(a,b)}}},_afterLoad:function(a,b,c){var c=c||this._settings[a.id];this._settings[a?a.id:'']=null;var d=new this._wrapperClass(b,a);$.data(a||b,q,d);try{if(c.loadURL){d.load(c.loadURL,c)}if(c.settings){d.configure(c.settings)}if(c.onLoad&&!c.loadURL){c.onLoad.apply(a||b,[d])}}catch(e){alert(e)}},_getSVG:function(a){a=(typeof a=='string'?$(a)[0]:(a.jquery?a[0]:a));return $.data(a,q)},_destroySVG:function(a){var b=$(a);if(!b.hasClass(this.markerClassName)){return}b.removeClass(this.markerClassName);if(a.namespaceURI!=this.svgNS){b.empty()}$.removeData(a,q)},addExtension:function(a,b){this._extensions.push([a,b])},isSVGElem:function(a){return(a.nodeType==1&&a.namespaceURI==$.svg.svgNS)}});function SVGWrapper(a,b){this._svg=a;this._container=b;for(var i=0;i<$.svg._extensions.length;i++){var c=$.svg._extensions[i];this[c[0]]=new c[1](this)}}$.extend(SVGWrapper.prototype,{_width:function(){return(this._container?this._container.clientWidth:this._svg.width)},_height:function(){return(this._container?this._container.clientHeight:this._svg.height)},root:function(){return this._svg},configure:function(a,b,c){if(!a.nodeName){c=b;b=a;a=this._svg}if(c){for(var i=a.attributes.length-1;i>=0;i--){var d=a.attributes.item(i);if(!(d.nodeName=='onload'||d.nodeName=='version'||d.nodeName.substring(0,5)=='xmlns')){a.attributes.removeNamedItem(d.nodeName)}}}for(var e in b){a.setAttribute($.svg._attrNames[e]||e,b[e])}return this},getElementById:function(a){return this._svg.ownerDocument.getElementById(a)},change:function(a,b){if(a){for(var c in b){if(b[c]==null){a.removeAttribute($.svg._attrNames[c]||c)}else{a.setAttribute($.svg._attrNames[c]||c,b[c])}}}return this},_args:function(b,c,d){c.splice(0,0,'parent');c.splice(c.length,0,'settings');var e={};var f=0;if(b[0]!=null&&b[0].jquery){b[0]=b[0][0]}if(b[0]!=null&&!(typeof b[0]=='object'&&b[0].nodeName)){e['parent']=null;f=1}for(var i=0;i<b.length;i++){e[c[i+f]]=b[i]}if(d){$.each(d,function(i,a){if(typeof e[a]=='object'){e.settings=e[a];e[a]=null}})}return e},title:function(a,b,c){var d=this._args(arguments,['text']);var e=this._makeNode(d.parent,'title',d.settings||{});e.appendChild(this._svg.ownerDocument.createTextNode(d.text));return e},describe:function(a,b,c){var d=this._args(arguments,['text']);var e=this._makeNode(d.parent,'desc',d.settings||{});e.appendChild(this._svg.ownerDocument.createTextNode(d.text));return e},defs:function(a,b,c){var d=this._args(arguments,['id'],['id']);return this._makeNode(d.parent,'defs',$.extend((d.id?{id:d.id}:{}),d.settings||{}))},symbol:function(a,b,c,d,e,f,g){var h=this._args(arguments,['id','x1','y1','width','height']);return this._makeNode(h.parent,'symbol',$.extend({id:h.id,viewBox:h.x1+' '+h.y1+' '+h.width+' '+h.height},h.settings||{}))},marker:function(a,b,c,d,e,f,g,h){var i=this._args(arguments,['id','refX','refY','mWidth','mHeight','orient'],['orient']);return this._makeNode(i.parent,'marker',$.extend({id:i.id,refX:i.refX,refY:i.refY,markerWidth:i.mWidth,markerHeight:i.mHeight,orient:i.orient||'auto'},i.settings||{}))},style:function(a,b,c){var d=this._args(arguments,['styles']);var e=this._makeNode(d.parent,'style',$.extend({type:'text/css'},d.settings||{}));e.appendChild(this._svg.ownerDocument.createTextNode(d.styles));if($.browser.opera){$('head').append('<style type="text/css">'+d.styles+'</style>')}return e},script:function(a,b,c,d){var e=this._args(arguments,['script','type'],['type']);var f=this._makeNode(e.parent,'script',$.extend({type:e.type||'text/javascript'},e.settings||{}));f.appendChild(this._svg.ownerDocument.createTextNode(e.script));if(!$.browser.mozilla){$.globalEval(e.script)}return f},linearGradient:function(a,b,c,d,e,f,g,h){var i=this._args(arguments,['id','stops','x1','y1','x2','y2'],['x1']);var j=$.extend({id:i.id},(i.x1!=null?{x1:i.x1,y1:i.y1,x2:i.x2,y2:i.y2}:{}));return this._gradient(i.parent,'linearGradient',$.extend(j,i.settings||{}),i.stops)},radialGradient:function(a,b,c,d,e,r,f,g,h){var i=this._args(arguments,['id','stops','cx','cy','r','fx','fy'],['cx']);var j=$.extend({id:i.id},(i.cx!=null?{cx:i.cx,cy:i.cy,r:i.r,fx:i.fx,fy:i.fy}:{}));return this._gradient(i.parent,'radialGradient',$.extend(j,i.settings||{}),i.stops)},_gradient:function(a,b,c,d){var e=this._makeNode(a,b,c);for(var i=0;i<d.length;i++){var f=d[i];this._makeNode(e,'stop',$.extend({offset:f[0],stopColor:f[1]},(f[2]!=null?{stopOpacity:f[2]}:{})))}return e},pattern:function(a,b,x,y,c,d,e,f,g,h,i){var j=this._args(arguments,['id','x','y','width','height','vx','vy','vwidth','vheight'],['vx']);var k=$.extend({id:j.id,x:j.x,y:j.y,width:j.width,height:j.height},(j.vx!=null?{viewBox:j.vx+' '+j.vy+' '+j.vwidth+' '+j.vheight}:{}));return this._makeNode(j.parent,'pattern',$.extend(k,j.settings||{}))},clipPath:function(a,b,c,d){var e=this._args(arguments,['id','units']);e.units=e.units||'userSpaceOnUse';return this._makeNode(e.parent,'clipPath',$.extend({id:e.id,clipPathUnits:e.units},e.settings||{}))},mask:function(a,b,x,y,c,d,e){var f=this._args(arguments,['id','x','y','width','height']);return this._makeNode(f.parent,'mask',$.extend({id:f.id,x:f.x,y:f.y,width:f.width,height:f.height},f.settings||{}))},createPath:function(){return new SVGPath()},createText:function(){return new SVGText()},svg:function(a,x,y,b,c,d,e,f,g,h){var i=this._args(arguments,['x','y','width','height','vx','vy','vwidth','vheight'],['vx']);var j=$.extend({x:i.x,y:i.y,width:i.width,height:i.height},(i.vx!=null?{viewBox:i.vx+' '+i.vy+' '+i.vwidth+' '+i.vheight}:{}));return this._makeNode(i.parent,'svg',$.extend(j,i.settings||{}))},group:function(a,b,c){var d=this._args(arguments,['id'],['id']);return this._makeNode(d.parent,'g',$.extend({id:d.id},d.settings||{}))},use:function(a,x,y,b,c,d,e){var f=this._args(arguments,['x','y','width','height','ref']);if(typeof f.x=='string'){f.ref=f.x;f.settings=f.y;f.x=f.y=f.width=f.height=null}var g=this._makeNode(f.parent,'use',$.extend({x:f.x,y:f.y,width:f.width,height:f.height},f.settings||{}));g.setAttributeNS($.svg.xlinkNS,'href',f.ref);return g},link:function(a,b,c){var d=this._args(arguments,['ref']);var e=this._makeNode(d.parent,'a',d.settings);e.setAttributeNS($.svg.xlinkNS,'href',d.ref);return e},image:function(a,x,y,b,c,d,e){var f=this._args(arguments,['x','y','width','height','ref']);var g=this._makeNode(f.parent,'image',$.extend({x:f.x,y:f.y,width:f.width,height:f.height},f.settings||{}));g.setAttributeNS($.svg.xlinkNS,'href',f.ref);return g},path:function(a,b,c){var d=this._args(arguments,['path']);return this._makeNode(d.parent,'path',$.extend({d:(d.path.path?d.path.path():d.path)},d.settings||{}))},rect:function(a,x,y,b,c,d,e,f){var g=this._args(arguments,['x','y','width','height','rx','ry'],['rx']);return this._makeNode(g.parent,'rect',$.extend({x:g.x,y:g.y,width:g.width,height:g.height},(g.rx?{rx:g.rx,ry:g.ry}:{}),g.settings||{}))},circle:function(a,b,c,r,d){var e=this._args(arguments,['cx','cy','r']);return this._makeNode(e.parent,'circle',$.extend({cx:e.cx,cy:e.cy,r:e.r},e.settings||{}))},ellipse:function(a,b,c,d,e,f){var g=this._args(arguments,['cx','cy','rx','ry']);return this._makeNode(g.parent,'ellipse',$.extend({cx:g.cx,cy:g.cy,rx:g.rx,ry:g.ry},g.settings||{}))},line:function(a,b,c,d,e,f){var g=this._args(arguments,['x1','y1','x2','y2']);return this._makeNode(g.parent,'line',$.extend({x1:g.x1,y1:g.y1,x2:g.x2,y2:g.y2},g.settings||{}))},polyline:function(a,b,c){var d=this._args(arguments,['points']);return this._poly(d.parent,'polyline',d.points,d.settings)},polygon:function(a,b,c){var d=this._args(arguments,['points']);return this._poly(d.parent,'polygon',d.points,d.settings)},_poly:function(a,b,c,d){var e='';for(var i=0;i<c.length;i++){e+=c[i].join()+' '}return this._makeNode(a,b,$.extend({points:$.trim(e)},d||{}))},text:function(a,x,y,b,c){var d=this._args(arguments,['x','y','value']);if(typeof d.x=='string'&&arguments.length<4){d.value=d.x;d.settings=d.y;d.x=d.y=null}return this._text(d.parent,'text',d.value,$.extend({x:(d.x&&isArray(d.x)?d.x.join(' '):d.x),y:(d.y&&isArray(d.y)?d.y.join(' '):d.y)},d.settings||{}))},textpath:function(a,b,c,d){var e=this._args(arguments,['path','value']);var f=this._text(e.parent,'textPath',e.value,e.settings||{});f.setAttributeNS($.svg.xlinkNS,'href',e.path);return f},_text:function(a,b,c,d){var e=this._makeNode(a,b,d);if(typeof c=='string'){e.appendChild(e.ownerDocument.createTextNode(c))}else{for(var i=0;i<c._parts.length;i++){var f=c._parts[i];if(f[0]=='tspan'){var g=this._makeNode(e,f[0],f[2]);g.appendChild(e.ownerDocument.createTextNode(f[1]));e.appendChild(g)}else if(f[0]=='tref'){var g=this._makeNode(e,f[0],f[2]);g.setAttributeNS($.svg.xlinkNS,'href',f[1]);e.appendChild(g)}else if(f[0]=='textpath'){var h=$.extend({},f[2]);h.href=null;var g=this._makeNode(e,f[0],h);g.setAttributeNS($.svg.xlinkNS,'href',f[2].href);g.appendChild(e.ownerDocument.createTextNode(f[1]));e.appendChild(g)}else{e.appendChild(e.ownerDocument.createTextNode(f[1]))}}}return e},other:function(a,b,c){var d=this._args(arguments,['name']);return this._makeNode(d.parent,d.name,d.settings||{})},_makeNode:function(a,b,c){a=a||this._svg;var d=this._svg.ownerDocument.createElementNS($.svg.svgNS,b);for(var b in c){var e=c[b];if(e!=null&&e!=null&&(typeof e!='string'||e!='')){d.setAttribute($.svg._attrNames[b]||b,e)}}a.appendChild(d);return d},add:function(b,c){var d=this._args((arguments.length==1?[null,b]:arguments),['node']);var f=this;d.parent=d.parent||this._svg;d.node=(d.node.jquery?d.node:$(d.node));try{if($.svg._renesis){throw'Force traversal';}d.parent.appendChild(d.node.cloneNode(true))}catch(e){d.node.each(function(){var a=f._cloneAsSVG(this);if(a){d.parent.appendChild(a)}})}return this},clone:function(b,c){var d=this;var e=this._args((arguments.length==1?[null,b]:arguments),['node']);e.parent=e.parent||this._svg;e.node=(e.node.jquery?e.node:$(e.node));var f=[];e.node.each(function(){var a=d._cloneAsSVG(this);if(a){a.id='';e.parent.appendChild(a);f.push(a)}});return f},_cloneAsSVG:function(a){var b=null;if(a.nodeType==1){b=this._svg.ownerDocument.createElementNS($.svg.svgNS,this._checkName(a.nodeName));for(var i=0;i<a.attributes.length;i++){var c=a.attributes.item(i);if(c.nodeName!='xmlns'&&c.nodeValue){if(c.prefix=='xlink'){b.setAttributeNS($.svg.xlinkNS,c.localName||c.baseName,c.nodeValue)}else{b.setAttribute(this._checkName(c.nodeName),c.nodeValue)}}}for(var i=0;i<a.childNodes.length;i++){var d=this._cloneAsSVG(a.childNodes[i]);if(d){b.appendChild(d)}}}else if(a.nodeType==3){if($.trim(a.nodeValue)){b=this._svg.ownerDocument.createTextNode(a.nodeValue)}}else if(a.nodeType==4){if($.trim(a.nodeValue)){try{b=this._svg.ownerDocument.createCDATASection(a.nodeValue)}catch(e){b=this._svg.ownerDocument.createTextNode(a.nodeValue.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'))}}}return b},_checkName:function(a){a=(a.substring(0,1)>='A'&&a.substring(0,1)<='Z'?a.toLowerCase():a);return(a.substring(0,4)=='svg:'?a.substring(4):a)},load:function(j,k){k=(typeof k=='boolean'?{addTo:k}:(typeof k=='function'?{onLoad:k}:(typeof k=='string'?{parent:k}:(typeof k=='object'&&k.nodeName?{parent:k}:(typeof k=='object'&&k.jquery?{parent:k}:k||{})))));if(!k.parent&&!k.addTo){this.clear(false)}var l=[this._svg.getAttribute('width'),this._svg.getAttribute('height')];var m=this;var n=function(a){a=$.svg.local.errorLoadingText+': '+a;if(k.onLoad){k.onLoad.apply(m._container||m._svg,[m,a])}else{m.text(null,10,20,a)}};var o=function(a){var b=new ActiveXObject('Microsoft.XMLDOM');b.validateOnParse=false;b.resolveExternals=false;b.async=false;b.loadXML(a);if(b.parseError.errorCode!=0){n(b.parseError.reason);return null}return b};var p=function(a){if(!a){return}if(a.documentElement.nodeName!='svg'){var b=a.getElementsByTagName('parsererror');var c=(b.length?b[0].getElementsByTagName('div'):[]);n(!b.length?'???':(c.length?c[0]:b[0]).firstChild.nodeValue);return}var d=(k.parent?$(k.parent)[0]:m._svg);var f={};for(var i=0;i<a.documentElement.attributes.length;i++){var g=a.documentElement.attributes.item(i);if(!(g.nodeName=='version'||g.nodeName.substring(0,5)=='xmlns')){f[g.nodeName]=g.nodeValue}}m.configure(d,f,!k.parent);var h=a.documentElement.childNodes;for(var i=0;i<h.length;i++){try{if($.svg._renesis){throw'Force traversal';}d.appendChild(m._svg.ownerDocument.importNode(h[i],true));if(h[i].nodeName=='script'){$.globalEval(h[i].textContent)}}catch(e){m.add(d,h[i])}}if(!k.changeSize){m.configure(d,{width:l[0],height:l[1]})}if(k.onLoad){k.onLoad.apply(m._container||m._svg,[m])}};if(j.match('<svg')){p($.browser.msie?o(j):new DOMParser().parseFromString(j,'text/xml'))}else{$.ajax({url:j,dataType:($.browser.msie?'text':'xml'),success:function(a){p($.browser.msie?o(a):a)},error:function(a,b,c){n(b+(c?' '+c.message:''))}})}return this},remove:function(a){a=(a.jquery?a[0]:a);a.parentNode.removeChild(a);return this},clear:function(a){if(a){this.configure({},true)}while(this._svg.firstChild){this._svg.removeChild(this._svg.firstChild)}return this},toSVG:function(a){a=a||this._svg;return(typeof XMLSerializer=='undefined'?this._toSVG(a):new XMLSerializer().serializeToString(a))},_toSVG:function(a){var b='';if(!a){return b}if(a.nodeType==3){b=a.nodeValue}else if(a.nodeType==4){b='<![CDATA['+a.nodeValue+']]>'}else{b='<'+a.nodeName;if(a.attributes){for(var i=0;i<a.attributes.length;i++){var c=a.attributes.item(i);if(!($.trim(c.nodeValue)==''||c.nodeValue.match(/^\[object/)||c.nodeValue.match(/^function/))){b+=' '+(c.namespaceURI==$.svg.xlinkNS?'xlink:':'')+c.nodeName+'="'+c.nodeValue+'"'}}}if(a.firstChild){b+='>';var d=a.firstChild;while(d){b+=this._toSVG(d);d=d.nextSibling}b+='</'+a.nodeName+'>'}else{b+='/>'}}return b}});function SVGPath(){this._path=''}$.extend(SVGPath.prototype,{reset:function(){this._path='';return this},move:function(x,y,a){a=(isArray(x)?y:a);return this._coords((a?'m':'M'),x,y)},line:function(x,y,a){a=(isArray(x)?y:a);return this._coords((a?'l':'L'),x,y)},horiz:function(x,a){this._path+=(a?'h':'H')+(isArray(x)?x.join(' '):x);return this},vert:function(y,a){this._path+=(a?'v':'V')+(isArray(y)?y.join(' '):y);return this},curveC:function(a,b,c,d,x,y,e){e=(isArray(a)?b:e);return this._coords((e?'c':'C'),a,b,c,d,x,y)},smoothC:function(a,b,x,y,c){c=(isArray(a)?b:c);return this._coords((c?'s':'S'),a,b,x,y)},curveQ:function(a,b,x,y,c){c=(isArray(a)?b:c);return this._coords((c?'q':'Q'),a,b,x,y)},smoothQ:function(x,y,a){a=(isArray(x)?y:a);return this._coords((a?'t':'T'),x,y)},_coords:function(a,b,c,d,e,f,g){if(isArray(b)){for(var i=0;i<b.length;i++){var h=b[i];this._path+=(i==0?a:' ')+h[0]+','+h[1]+(h.length<4?'':' '+h[2]+','+h[3]+(h.length<6?'':' '+h[4]+','+h[5]))}}else{this._path+=a+b+','+c+(d==null?'':' '+d+','+e+(f==null?'':' '+f+','+g))}return this},arc:function(a,b,c,d,e,x,y,f){f=(isArray(a)?b:f);this._path+=(f?'a':'A');if(isArray(a)){for(var i=0;i<a.length;i++){var g=a[i];this._path+=(i==0?'':' ')+g[0]+','+g[1]+' '+g[2]+' '+(g[3]?'1':'0')+','+(g[4]?'1':'0')+' '+g[5]+','+g[6]}}else{this._path+=a+','+b+' '+c+' '+(d?'1':'0')+','+(e?'1':'0')+' '+x+','+y}return this},close:function(){this._path+='z';return this},path:function(){return this._path}});SVGPath.prototype.moveTo=SVGPath.prototype.move;SVGPath.prototype.lineTo=SVGPath.prototype.line;SVGPath.prototype.horizTo=SVGPath.prototype.horiz;SVGPath.prototype.vertTo=SVGPath.prototype.vert;SVGPath.prototype.curveCTo=SVGPath.prototype.curveC;SVGPath.prototype.smoothCTo=SVGPath.prototype.smoothC;SVGPath.prototype.curveQTo=SVGPath.prototype.curveQ;SVGPath.prototype.smoothQTo=SVGPath.prototype.smoothQ;SVGPath.prototype.arcTo=SVGPath.prototype.arc;function SVGText(){this._parts=[]}$.extend(SVGText.prototype,{reset:function(){this._parts=[];return this},string:function(a){this._parts[this._parts.length]=['text',a];return this},span:function(a,b){this._parts[this._parts.length]=['tspan',a,b];return this},ref:function(a,b){this._parts[this._parts.length]=['tref',a,b];return this},path:function(a,b,c){this._parts[this._parts.length]=['textpath',b,$.extend({href:a},c||{})];return this}});$.fn.svg=function(a){var b=Array.prototype.slice.call(arguments,1);if(typeof a=='string'&&a=='get'){return $.svg['_'+a+'SVG'].apply($.svg,[this[0]].concat(b))}return this.each(function(){if(typeof a=='string'){$.svg['_'+a+'SVG'].apply($.svg,[this].concat(b))}else{$.svg._attachSVG(this,a||{})}})};function isArray(a){return(a&&a.constructor==Array)}$.svg=new SVGManager()})(jQuery);
 
/*
 * autobarcode.js version 22
 * Copyright 2012-2013 fiesh, Martin Klicken @ Vroniplag Wiki.
 * Licensed under GNU General Public License v3 or later.
 */

var DEBUGLEVEL = 0; 

var API = 'https://vroniplag.wikia.org/de/api.php';
var PARAMETER = '/AutoBarcodeParameter';
var WIDTH = 624;
var LEFTRIGHTMARGIN = 8;
var HEIGHT = 84;
var HEADER = 14;
var CHIPLENGTH = 2;
var FONT = 'Helvetica';
var FONTSIZE = 12;
var SKIP = 16;
var TEXTAFTEREDGE_FIX = 4; // If WebKit or Opera (and most likely IE) recognized the dominant-baseline correctly, this would not be necessary.
var TEXTBEFOREEDGE_FIX = 12;
var MIDDLE_FIX = 1;
var BETWEENTEXTSPACE = '35px';
var BOXX = 60;
var BOXY = 20;
var BOXOFFSETX = 60;
var BOXOFFSETY = 40;
var TEXTOFFSETY = 4;
var BOXCOLOR = '#ffffff';

var TEXTA = 'Funde von Fremdtextübernahmen nach Seiten. Anzahl Seiten mit Funden in ';
var TEXTB = 'nicht einberechnete Seiten'
var TEXTC = 'Seite enthält Fremdtextübernahmen'
var TEXTD = 'mehr als 50 % der Seite betroffen'
var TEXTE = 'mehr als 75 % der Seite betroffen'
 
var time = new Date();
function zeroPrefix(s) {
	return s < 10 ? '0' + s : s;
}
var TIMESTRING = zeroPrefix(time.getDate()) + '.' + zeroPrefix(time.getMonth() + 1) + '.' + time.getFullYear() + ' ' + zeroPrefix(time.getHours()) + ':' + zeroPrefix(time.getMinutes());
 
var TIMEOUT = 20;
 
var BLUE = '#badcf6';
var WHITE = '#ffffff';
var BLACK = '#000000';
var DARKRED = '#960000';
var BRIGHTRED = '#ff0000';
 
var colors = [BLUE, WHITE, BLACK, DARKRED, BRIGHTRED];
 
// Array that contains for each prefix an object with values "current" and "max".
// current is the prefix of the pages being loaded by secondAjaxQuery(),
// max is as high as secondAjaxQuery() goes.  E.g. if a paper has 334 pages,
// max would have to be 3 to query all pages up to prefix/3..
var pageCounter = new Array();
 
// Array that, for each prefix, codes the information for the pages to render:
// 0 means "blue page"
// 1 means "white page"
// 2 means "black page"
// 3 means "dark red page"
// 4 means "bright red page"
var pages = new Array();
 
var absMinPage = new Array();
var absMaxPage = new Array();
 
var reference = new Array();
 
$(function() {
	$('.autobarcode').each(firstAjaxQuery);
});
 
function firstAjaxQuery()
{
	var prefix = $(this).attr('id').substr('autobarcode'.length);
	var maxPage;
 
 
	pageCounter[prefix] = new Object();
	pages[prefix] = new Array; // Fill with zeros those that exist
 
	var title = prefix + PARAMETER;
 
	$.getJSON(API + "?action=query&titles=" + title + "&format=json&cllimit=max&rvprop=content&prop=revisions&callback=?",
			function(data) {
				var i;
				for(var z in data.query.pages) {
					var c = data.query.pages[z].revisions['0']['*'];
					c = c.replace(/\[\[Kategorie:[A-Za-z]*\]\]/g, '');
					c = $.parseJSON(c);
					if(c.AutoBarcodeParameter === undefined)
						return;
					c = c.AutoBarcodeParameter;
					// Check prefix matches
					if(c.prefix !== prefix)
						return;
					reference[prefix] = c.reference;
					for(i = c.from; i <= c.to; i++) {
						pages[prefix][i] = 0;
					}
					absMinPage[prefix] = c.from;
					absMaxPage[prefix] = c.to;
					if(c.range['0'] !== undefined) {
						if(DEBUGLEVEL >= 1)
							console.log(prefix + ': Multiple white areas detected');
						for(var r in c.range) {
							if(c.range[r].from === undefined || c.range[r].to === undefined)
								continue;
							if(DEBUGLEVEL >= 1)
								console.log(prefix + ': Range: ' + c.range[r].from + ' to ' + c.range[r].to);
							for(i = c.range[r].from; i <= c.range[r].to; i++) {
								pages[prefix][i] = 1;
							}
						}
					} else {
						if(DEBUGLEVEL >= 1)
							console.log(prefix + ': Single white area detected');
						for(i = c.range.from; i <= c.range.to; i++) {
							pages[prefix][i] = 1;
						}
					}
					maxPage = i;
 
					pageCounter[prefix].current = 0;
					pageCounter[prefix].max = maxPage / 100;
					secondAjaxQuery(prefix);
					if(DEBUGLEVEL >= 1) {
						console.log('reference[' + prefix + '] = ' + reference[prefix]);
						console.log('absMinPage[' + prefix + '] = ' + absMinPage[prefix]);
						console.log('absMaxPage[' + prefix + '] = ' + absMaxPage[prefix]);
						console.log(prefix + ' maxPage = ' + maxPage);
						console.log('pageCounter[' + prefix + '].current = ' + pageCounter[prefix].current);
						console.log('pageCounter[' + prefix + '].max = ' + pageCounter[prefix].max);
					}
				}
			});
}
 
function secondAjaxQuery(prefix)
{
	var title = prefix + "/" + pageCounter[prefix].current;
	if(DEBUGLEVEL >= 3)
		console.log('Loading all pages starting with "' + title + '"');
	$.getJSON(API + "?action=query&generator=allpages&gaplimit=500&gapprefix=" + title + "&prop=categories&cllimit=max&format=json&callback=?",
			function(data) {
				appendToPages(data, prefix);
				if(++pageCounter[prefix].current <= pageCounter[prefix].max)
					secondAjaxQuery(prefix);
				else
					$('#autobarcode' + prefix).svg({onLoad: generateBarcode});
	});
}
 
function appendToPages(data, prefix)
{
	if(data === undefined || data.query === undefined || data.query.pages === undefined)
		return;
	for (var z in data.query.pages) {
		var title = data.query.pages[z].title;
		var categories = data.query.pages[z].categories;
 
		var catCount = 0;
		var val = 2;
 
		for(v in categories) {
			if(categories[v]['title'] === 'Kategorie:Plagiatsseite' || categories[v]['title'] == 'Kategorie:' + prefix)
				catCount++;
			if(categories[v]['title'] === 'Kategorie:Gt50')
				val = val < 3 ? 3 : val;
			if(categories[v]['title'] === 'Kategorie:Gt75')
				val = 4;
		}
 
		// Convert "Xx/023" to 23
		var pageNum = parseInt(title.substr(prefix.length+1), 10);
 
		// Only set if both Kategorie:Plagiatsseite and Kategorie:prefix were set.
		if(catCount === 2)
			pages[prefix][pageNum] = val;

		if(DEBUGLEVEL >= 3 && catCount === 2)
			console.log('pages[' + prefix + '][' + pageNum + '] = ' + pages[prefix][pageNum]);
	}
}
 
function generateBarcode(svg)
{
	var prefix = $(this).attr('id').substr('autobarcode'.length);
 
	var stroke = WIDTH / (absMaxPage[prefix] - absMinPage[prefix] + 1);
 
	addMouseHandler($(this), prefix, stroke, svg);
 
	var currentColor = colors[pages[prefix][absMinPage[prefix]]];
	var lastIndex = absMinPage[prefix];
 
	var i;
	for(i = absMinPage[prefix]; i <= absMaxPage[prefix]; i++)
		if(colors[pages[prefix][i]] !== currentColor || i === absMaxPage[prefix]) { // New block starts, so draw old one
			var x = (lastIndex - absMinPage[prefix]) * stroke;
			var barWidth = (i - lastIndex + (i === absMaxPage[prefix] ? 1 : 0)) * stroke;
			svg.rect(x + LEFTRIGHTMARGIN, HEADER, barWidth, HEIGHT, {fill: currentColor});
			currentColor = colors[pages[prefix][i]];
			lastIndex = i;
		}
 
	// draw two surrounding lines
	svg.line(0, HEADER, WIDTH + 2*LEFTRIGHTMARGIN, HEADER, {strokeWidth: 1, stroke: BLACK});
	svg.line(0, HEADER+HEIGHT, WIDTH + 2*LEFTRIGHTMARGIN, HEADER+HEIGHT, {strokeWidth: 1, stroke: BLACK});
 
	var modulus = (absMaxPage[prefix] - absMinPage[prefix] <= 400 ? 10 : 20);
 
	for(i = absMinPage[prefix]; i <= absMaxPage[prefix]; i++) {
		if(i%modulus === 0 && i%(2*modulus) !== 0) {
			var x = (i - absMinPage[prefix]) * stroke + stroke/2 + LEFTRIGHTMARGIN;
			svg.line(x, HEADER+HEIGHT, x, HEADER+HEIGHT+CHIPLENGTH, {strokeWidth: 1, stroke: BLACK});
		}
		if(i%(2*modulus) === 0) {
			var x = (i - absMinPage[prefix]) * stroke + stroke/2 + LEFTRIGHTMARGIN;
			svg.line(x, HEADER+HEIGHT, x, HEADER+HEIGHT+2*CHIPLENGTH, {strokeWidth: 1, stroke: BLACK});
			var g = svg.group({transform: "translate(" + x + ", " + (HEADER+HEIGHT+2*CHIPLENGTH+TEXTBEFOREEDGE_FIX) + ")"});
			svg.text(g, i.toString(), {fontFamily: FONT, fontSize: FONTSIZE, textAnchor: "middle" });
		}
	}
 
	generateCaption(svg, prefix);
}
 
function generateCaption(svg, prefix)
{
	var totalRelevantPages = 0;
	var numPlagPages = 0;
	for(var i = absMinPage[prefix]; i <= absMaxPage[prefix]; i++) {
		if(pages[prefix][i] >= 1)
			totalRelevantPages++;
		if(pages[prefix][i] >= 2)
			numPlagPages++;
	}
	var plagPercent = Math.round(numPlagPages / totalRelevantPages * 100 * 10)/10;
	var g = svg.group({transform: "translate(" + (WIDTH/2 + LEFTRIGHTMARGIN) + ", " + (HEADER - TEXTAFTEREDGE_FIX) + ")"});
	headString = TEXTA + reference[prefix] + ": " + numPlagPages + ", d.h. " + plagPercent + " %";
	svg.text(g, headString, {fontFamily: FONT, fontSize: FONTSIZE, textAnchor: "middle"});
	var g = svg.group({transform: "translate(" + (WIDTH/2 + LEFTRIGHTMARGIN) + ", " + (HEADER + HEIGHT + 2*CHIPLENGTH + 1.2*SKIP + TEXTBEFOREEDGE_FIX) + ")"});
	var texts = svg.createText();
	var t = texts.string('Seitenzahlen').span('Stand: ' + TIMESTRING, {dx: BETWEENTEXTSPACE }).span('Quelle: vroniplag.wikia.org/de/wiki/' + prefix, {dx: BETWEENTEXTSPACE});
	svg.text(g, 0, 0, t, {fontFamily: FONT, fontSize: FONTSIZE, textAnchor: "middle"});
 
	var fontProp = {fontFamily: FONT, fontSize: FONTSIZE, textAnchor: "left"};
	svg.rect(LEFTRIGHTMARGIN + SKIP, HEADER+HEIGHT+2*CHIPLENGTH + 3*SKIP, 1.5*SKIP, 1.5*SKIP, {fill: BLUE});
	svg.text(LEFTRIGHTMARGIN + 4*SKIP, HEADER+HEIGHT+2*CHIPLENGTH + 4*SKIP + MIDDLE_FIX, TEXTB, fontProp);
	svg.rect(LEFTRIGHTMARGIN + SKIP + WIDTH/2, HEADER+HEIGHT+2*CHIPLENGTH + 3*SKIP, 1.5*SKIP, 1.5*SKIP, {fill: BLACK});
	svg.text(LEFTRIGHTMARGIN + 4*SKIP + WIDTH/2, HEADER+HEIGHT+2*CHIPLENGTH + 4*SKIP + MIDDLE_FIX, TEXTC, fontProp);
	svg.rect(LEFTRIGHTMARGIN + SKIP, HEADER+HEIGHT+2*CHIPLENGTH + 6*SKIP, 1.5*SKIP, 1.5*SKIP, {fill: DARKRED});
	svg.text(LEFTRIGHTMARGIN + 4*SKIP, HEADER+HEIGHT+2*CHIPLENGTH + 7*SKIP + MIDDLE_FIX, TEXTD, fontProp);
	svg.rect(LEFTRIGHTMARGIN + SKIP + WIDTH/2, HEADER+HEIGHT+2*CHIPLENGTH + 6*SKIP, 1.5*SKIP, 1.5*SKIP, {fill: BRIGHTRED});
	svg.text(LEFTRIGHTMARGIN + 4*SKIP + WIDTH/2, HEADER+HEIGHT+2*CHIPLENGTH + 7*SKIP + MIDDLE_FIX, TEXTE, fontProp);
	svg.text(svg.link("https://vroniplag.wikia.org/de/wiki/VroniPlag_Wiki:Grundlagen/Barcode"), 630, 240, "Wie liest man diese Grafik?", {fontFamily: FONT, fontSize: "8pt", textAnchor: "end", fill: "#0A3073"});
}
 
function doubleZeroPrefix(x) {
	return (x < 10 ? '00' + x : (x < 100 ? '0' + x : x));
}
 
function getPageNumberFromMouse(div, x, y, prefix, stroke)
{
	if(y >= 0 && y < HEIGHT && x >= 0 && x < WIDTH) { // Click on barcode area
		i = Math.round((x / stroke) - .5) + absMinPage[prefix];
		if(colors[pages[prefix][i]] === BLACK || colors[pages[prefix][i]] === DARKRED || colors[pages[prefix][i]] === BRIGHTRED) {
			page = '/' + doubleZeroPrefix(i);
		} else {
			page = '';
		}
	} else
		page = '';
	return page;
}
 
function addMouseHandler(div, prefix, stroke, svg)
{
	div.bind('mouseenter', function() {
		div.css('cursor','pointer');
	});
	div.bind('mouseleave', function() {
		div.css('cursor','auto');
		var g = svg.getElementById('caption');
		if(g != null)
			svg.remove(g);
	});
 
	div.bind('click', function (event) {
		var x = event.pageX - div.offset().left - LEFTRIGHTMARGIN;
		var y = event.pageY - div.offset().top - HEADER;
		var page = getPageNumberFromMouse(div, x, y, prefix, stroke);
 
		if(DEBUGLEVEL >= 2)
			console.log('https://vroniplag.wikia.org/de/wiki/' + prefix + page + ' (' + (event.pageX - div.offset().left - LEFTRIGHTMARGIN) + ', ' + (event.pageY - div.offset().top - HEADER) + ', ' + stroke + ')');
		location.href = 'https://vroniplag.wikia.org/de/wiki/' + prefix + page;
	});
 
	div.bind('mousemove', function(event) {
		var x = event.pageX - div.offset().left - LEFTRIGHTMARGIN;
		var y = event.pageY - div.offset().top - HEADER;
 
		setTimeout(function() {
			var page = getPageNumberFromMouse(div, x, y, prefix, stroke);
			var g = svg.getElementById('caption');
			if(g != null)
				svg.remove(g);
			if(page !== '') {
				var xTrans = (x + BOXOFFSETX);
				var dx = xTrans + BOXX/2 - 2*LEFTRIGHTMARGIN - WIDTH + 1;
				if(dx > 0)
					xTrans -= dx;
				var g = svg.group(null, 'caption', {transform: "translate(" + xTrans + "," + (y + BOXOFFSETY) + ")"});
				svg.rect(g, -BOXX/2, -BOXY/2, BOXX, BOXY, {fill: BOXCOLOR, stroke: BLACK, strokeWidth: 1});
				svg.text(g, 0, TEXTOFFSETY, prefix + page, {fontFamily: FONT, fontSize: FONTSIZE, textAnchor: "middle"});
			}
		}, TIMEOUT);
	});
}