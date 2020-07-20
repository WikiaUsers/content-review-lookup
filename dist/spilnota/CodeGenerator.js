/**
 * Generator for most popular CSS and JavaScript code snippets
 * @author Kopcap94
 * @translator Mix Gerder
 */
$(function () {
    if (!$('#CodeGenerator2').length) {
        return;
    }

    /**
     * tinyColorPicker - v1.0.0 2015-04-18
     * https://github.com/PitPik/tinyColorPicker
     * 
     */
    !function(a,b){"use strict";function c(a,c,d,f,g){if("string"==typeof c){var c=t.txt2color(c);d=c.type,n[d]=c[d],g=g!==b?g:c.alpha}else if(c)for(var h in c)a[d][h]=k(c[h]/l[d][h][1],0,1);return g!==b&&(a.alpha=+g),e(d,f?a:b)}function d(a,b,c){var d=m.options.grey,e={};return e.RGB={r:a.r,g:a.g,b:a.b},e.rgb={r:b.r,g:b.g,b:b.b},e.alpha=c,e.equivalentGrey=Math.round(d.r*a.r+d.g*a.g+d.b*a.b),e.rgbaMixBlack=i(b,{r:0,g:0,b:0},c,1),e.rgbaMixWhite=i(b,{r:1,g:1,b:1},c,1),e.rgbaMixBlack.luminance=h(e.rgbaMixBlack,!0),e.rgbaMixWhite.luminance=h(e.rgbaMixWhite,!0),m.options.customBG&&(e.rgbaMixCustom=i(b,m.options.customBG,c,1),e.rgbaMixCustom.luminance=h(e.rgbaMixCustom,!0),m.options.customBG.luminance=h(m.options.customBG,!0)),e}function e(a,b){var c,e,k,o=b||n,p=t,q=m.options,r=l,s=o.RND,u="",v="",w={hsl:"hsv",rgb:a},x=s.rgb;if("alpha"!==a){for(var y in r)if(!r[y][y]){a!==y&&(v=w[y]||"rgb",o[y]=p[v+"2"+y](o[v])),s[y]||(s[y]={}),c=o[y];for(u in c)s[y][u]=Math.round(c[u]*r[y][u][1])}x=s.rgb,o.HEX=p.RGB2HEX(x),o.equivalentGrey=q.grey.r*o.rgb.r+q.grey.g*o.rgb.g+q.grey.b*o.rgb.b,o.webSave=e=f(x,51),o.webSmart=k=f(x,17),o.saveColor=x.r===e.r&&x.g===e.g&&x.b===e.b?"web save":x.r===k.r&&x.g===k.g&&x.b===k.b?"web smart":"",o.hueRGB=t.hue2RGB(o.hsv.h),b&&(o.background=d(x,o.rgb,o.alpha))}var z,A,B,C=o.rgb,D=o.alpha,E="luminance",F=o.background;return z=i(C,{r:0,g:0,b:0},D,1),z[E]=h(z,!0),o.rgbaMixBlack=z,A=i(C,{r:1,g:1,b:1},D,1),A[E]=h(A,!0),o.rgbaMixWhite=A,q.customBG&&(B=i(C,F.rgbaMixCustom,D,1),B[E]=h(B,!0),B.WCAG2Ratio=j(B[E],F.rgbaMixCustom[E]),o.rgbaMixBGMixCustom=B,B.luminanceDelta=Math.abs(B[E]-F.rgbaMixCustom[E]),B.hueDelta=g(F.rgbaMixCustom,B,!0)),o.RGBLuminance=h(x),o.HUELuminance=h(o.hueRGB),q.convertCallback&&q.convertCallback(o,a),o}function f(a,b){var c={},d=0,e=b/2;for(var f in a)d=a[f]%b,c[f]=a[f]+(d>e?b-d:-d);return c}function g(a,b,c){return(Math.max(a.r-b.r,b.r-a.r)+Math.max(a.g-b.g,b.g-a.g)+Math.max(a.b-b.b,b.b-a.b))*(c?255:1)/765}function h(a,b){for(var c=b?1:255,d=[a.r/c,a.g/c,a.b/c],e=m.options.luminance,f=d.length;f--;)d[f]=d[f]<=.03928?d[f]/12.92:Math.pow((d[f]+.055)/1.055,2.4);return e.r*d[0]+e.g*d[1]+e.b*d[2]}function i(a,c,d,e){var f={},g=d!==b?d:1,h=e!==b?e:1,i=g+h*(1-g);for(var j in a)f[j]=(a[j]*g+c[j]*h*(1-g))/i;return f.a=i,f}function j(a,b){var c=1;return c=a>=b?(a+.05)/(b+.05):(b+.05)/(a+.05),Math.round(100*c)/100}function k(a,b,c){return a>c?c:b>a?b:a}var l={rgb:{r:[0,255],g:[0,255],b:[0,255]},hsv:{h:[0,360],s:[0,100],v:[0,100]},hsl:{h:[0,360],s:[0,100],l:[0,100]},alpha:{alpha:[0,1]},HEX:{HEX:[0,16777215]}},m={},n={},o={r:.298954,g:.586434,b:.114612},p={r:.2126,g:.7152,b:.0722},q=a.Colors=function(a){this.colors={RND:{}},this.options={color:"rgba(204, 82, 37, 0.8)",grey:o,luminance:p,valueRanges:l},r(this,a||{})},r=function(a,d){var e,f=a.options;s(a);for(var g in d)d[g]!==b&&(f[g]=d[g]);e=f.customBG,f.customBG="string"==typeof e?t.txt2color(e).rgb:e,n=c(a.colors,f.color,b,!0)},s=function(a){m!==a&&(m=a,n=a.colors)};q.prototype.setColor=function(a,d,f){return s(this),a?c(this.colors,a,d,b,f):(f!==b&&(this.colors.alpha=f),e(d))},q.prototype.setCustomBackground=function(a){return s(this),this.options.customBG="string"==typeof a?t.txt2color(a).rgb:a,c(this.colors,b,"rgb")},q.prototype.saveAsBackground=function(){return s(this),c(this.colors,b,"rgb",!0)};var t={txt2color:function(a){var b={},c=a.replace(/(?:#|\)|%)/g,"").split("("),d=(c[1]||"").split(/,\s*/),e=c[1]?c[0].substr(0,3):"rgb",f="";if(b.type=e,b[e]={},c[1])for(var g=3;g--;)f=e[g]||e.charAt(g),b[e][f]=+d[g]/l[e][f][1];else b.rgb=t.HEX2rgb(c[0]);return b.alpha=d[3]?+d[3]:1,b},RGB2HEX:function(a){return((a.r<16?"0":"")+a.r.toString(16)+(a.g<16?"0":"")+a.g.toString(16)+(a.b<16?"0":"")+a.b.toString(16)).toUpperCase()},HEX2rgb:function(a){return a=a.split(""),{r:parseInt(a[0]+a[a[3]?1:0],16)/255,g:parseInt(a[a[3]?2:1]+(a[3]||a[1]),16)/255,b:parseInt((a[4]||a[2])+(a[5]||a[2]),16)/255}},hue2RGB:function(a){var b=6*a,c=~~b%6,d=6===b?0:b-c;return{r:Math.round(255*[1,1-d,0,0,d,1][c]),g:Math.round(255*[d,1,1,1-d,0,0][c]),b:Math.round(255*[0,0,d,1,1,1-d][c])}},rgb2hsv:function(a){var b,c,d,e=a.r,f=a.g,g=a.b,h=0;return g>f&&(f=g+(g=f,0),h=-1),c=g,f>e&&(e=f+(f=e,0),h=-2/6-h,c=Math.min(f,g)),b=e-c,d=e?b/e:0,{h:1e-15>d?n&&n.hsl&&n.hsl.h||0:b?Math.abs(h+(f-g)/(6*b)):0,s:e?b/e:n&&n.hsv&&n.hsv.s||0,v:e}},hsv2rgb:function(a){var b=6*a.h,c=a.s,d=a.v,e=~~b,f=b-e,g=d*(1-c),h=d*(1-f*c),i=d*(1-(1-f)*c),j=e%6;return{r:[d,h,g,g,i,d][j],g:[i,d,d,h,g,g][j],b:[g,g,i,d,d,h][j]}},hsv2hsl:function(a){var b=(2-a.s)*a.v,c=a.s*a.v;return c=a.s?1>b?b?c/b:0:c/(2-b):0,{h:a.h,s:a.v||c?c:n&&n.hsl&&n.hsl.s||0,l:b/2}},rgb2hsl:function(a,b){var c=t.rgb2hsv(a);return t.hsv2hsl(b?c:n.hsv=c)},hsl2rgb:function(a){var b=6*a.h,c=a.s,d=a.l,e=.5>d?d*(1+c):d+c-c*d,f=d+d-e,g=e?(e-f)/e:0,h=~~b,i=b-h,j=e*g*i,k=f+j,l=e-j,m=h%6;return{r:[e,l,f,f,k,e][m],g:[k,e,e,l,f,f][m],b:[f,f,k,e,e,l][m]}}}}(window);
    !function(a,b,c){"use strict";function d(b){return b.value||b.getAttribute("value")||a(b).css("background-color")||"#fff"}function e(a){return a.originalEvent.touches?a.originalEvent.touches[0]:a}function f(b){return a(b.find(s.doRender)[0]||b[0])}function g(b){var c=a(this),e=c.offset(),g=a(window),i=s.gap;b?(t=f(c),q.$trigger=c,(u||h()).css({left:(u[0]._left=e.left)-((u[0]._left=u[0]._left+u[0]._width-(g.scrollLeft()+g.width()))+i>0?u[0]._left+i:0),top:(u[0]._top=e.top+c.outerHeight())-((u[0]._top=u[0]._top+u[0]._height-(g.scrollTop()+g.height()))+i>0?u[0]._top+i:0)}).show(s.animationSpeed,function(){b!==!0&&(y._width=y.width(),v._width=v.width(),v._height=v.height(),r.setColor(d(t[0])),n(!0))})):a(u).hide(s.animationSpeed,function(){t.blur(),q.$trigger=null,n(!1)})}function h(){return a("head").append('<style type="text/css">'+(s.css||I)+(s.cssAddon||"")+"</style>"),q.$UI=u=a(H).css({margin:s.margin}).appendTo("body").show(0,function(){var b=a(this);F=s.GPU&&b.css("perspective")!==c,v=a(".cp-xy-slider",this),w=a(".cp-xy-cursor",this),x=a(".cp-z-cursor",this),y=a(".cp-alpha",this).toggle(!!s.opacity),z=a(".cp-alpha-cursor",this),s.buildCallback.call(q,b),b.prepend("<div>").children().eq(0).css("width",b.children().eq(0).width()),this._width=this.offsetWidth,this._height=this.offsetHeight}).hide().on(D,".cp-xy-slider,.cp-z-slider,.cp-alpha",i)}function i(b){var c=this.className.replace(/cp-(.*?)(?:\s*|$)/,"$1").replace("-","_");b.preventDefault&&b.preventDefault(),b.returnValue=!1,t._offset=a(this).offset(),(c="xy_slider"===c?k:"z_slider"===c?l:m)(b),A.on(E,j).on(C,c)}function j(){A.off(C).off(E)}function k(a){var b=e(a),c=b.pageX-t._offset.left,d=b.pageY-t._offset.top;r.setColor({s:c/v._width*100,v:100-d/v._height*100},"hsv"),n()}function l(a){{var b=e(a).pageY-t._offset.top;r.colors.hsv}r.setColor({h:360-b/v._height*360},"hsv"),n()}function m(a){var b=e(a).pageX-t._offset.left,c=b/y._width;r.setColor({},"rgb",c>1?1:0>c?0:c),n()}function n(a){var b=r.colors,d=b.hueRGB,e=b.RND.rgb,f=b.RND.hsl,g="#222",h="#ddd",i=t.data("colorMode"),j=1!==b.alpha,k=Math.round(100*b.alpha)/100,l=e.r+", "+e.g+", "+e.b,m="HEX"!==i||j?"rgb"===i||"HEX"===i&&j?j?"rgba("+l+", "+k+")":"rgb("+l+")":"hsl"+(j?"a(":"(")+f.h+", "+f.s+"%, "+f.l+"%"+(j?", "+k:"")+")":"#"+b.HEX,n=b.HUELuminance>.22?g:h,p=b.rgbaMixBlack.luminance>.22?g:h,q=(1-b.hsv.h)*v._height,s=b.hsv.s*v._width,u=(1-b.hsv.v)*v._height,A=k*y._width,B=F?"translate3d":"",C=t.val(),D=t[0].hasAttribute("value")&&""===C&&a!==c;v._css={backgroundColor:"rgb("+d.r+","+d.g+","+d.b+")"},w._css={transform:B+"("+s+"px, "+u+"px, 0)",left:F?"":s,top:F?"":u,borderColor:b.RGBLuminance>.22?g:h},x._css={transform:B+"(0, "+q+"px, 0)",top:F?"":q,borderColor:"transparent "+n},y._css={backgroundColor:"rgb("+l+")"},z._css={transform:B+"("+A+"px, 0, 0)",left:F?"":A,borderColor:p+" transparent"},t._css={backgroundColor:D?"":m,color:D?"":b.rgbaMixBGMixCustom.luminance>.22?g:h},t.text=D?"":C!==m?m:"",a!==c?o(a):G(o)}function o(a){v.css(v._css),w.css(w._css),x.css(x._css),y.css(y._css),z.css(z._css),s.doRender&&t.css(t._css),t.text&&t.val(t.text),s.renderCallback.call(q,t,"boolean"==typeof a?a:c)}var p,q,r,s,t,u,v,w,x,y,z,A=a(document),B="",C="touchmove.a mousemove.a pointermove.a",D="touchstart.a mousedown.a pointerdown.a",E="touchend.a mouseup.a pointerup.a",F=!1,G=window.requestAnimationFrame||window.webkitRequestAnimationFrame||function(a){a()},H='<div class="cp-color-picker"><div class="cp-z-slider"><div class="cp-z-cursor"></div></div><div class="cp-xy-slider"><div class="cp-white"></div><div class="cp-xy-cursor"></div></div><div class="cp-alpha"><div class="cp-alpha-cursor"></div></div></div>',I=".cp-color-picker{position:absolute;overflow:hidden;padding:6px 6px 0;background-color:#444;color:#bbb;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:400;cursor:default;border-radius:5px}.cp-color-picker>div{position:relative;overflow:hidden}.cp-xy-slider{float:left;height:128px;width:128px;margin-bottom:6px;background:linear-gradient(to right,#FFF,rgba(255,255,255,0))}.cp-white{height:100%;width:100%;background:linear-gradient(rgba(0,0,0,0),#000)}.cp-xy-cursor{position:absolute;top:0;width:10px;height:10px;margin:-5px;border:1px solid #fff;border-radius:100%;box-sizing:border-box}.cp-z-slider{float:right;margin-left:6px;height:128px;width:20px;background:linear-gradient(red 0,#f0f 17%,#00f 33%,#0ff 50%,#0f0 67%,#ff0 83%,red 100%)}.cp-z-cursor{position:absolute;margin-top:-4px;width:100%;border:4px solid #fff;border-color:transparent #fff;box-sizing:border-box}.cp-alpha{clear:both;width:100%;height:16px;margin:6px 0;background:linear-gradient(to right,#444,rgba(0,0,0,0))}.cp-alpha-cursor{position:absolute;margin-left:-4px;height:100%;border:4px solid #fff;border-color:#fff transparent;box-sizing:border-box}",J=function(a){r=this.color=new b(a),s=r.options};J.prototype={render:n,toggle:g},a.fn.colorPicker=function(b){var c=function(){};return b=a.extend({animationSpeed:150,GPU:!0,doRender:!0,customBG:"#FFF",opacity:!0,renderCallback:c,buildCallback:c,body:document.body,scrollResize:!0,gap:4},b),!q&&b.scrollResize&&a(window).on("resize scroll",function(){q.$trigger&&q.toggle.call(q.$trigger[0],!0)}),p=p?p.add(this):this,p.colorPicker=q||(q=new J(b)),B+=(B?", ":"")+this.selector,a(b.body).off(".a").on(D,function(b){var c=a(b.target);-1!==a.inArray(c.closest(B)[0],p)||c.closest(u).length||g()}).on("focus.a click.a",B,g).on("change.a",B,function(){r.setColor(this.value||"#FFF"),p.colorPicker.render(!0)}),this.each(function(){var c=d(this),e=c.split("("),g=f(a(this));g.data("colorMode",e[1]?e[0].substr(0,3):"HEX").attr("readonly",s.preventFocus),b.doRender&&g.css({"background-color":c,color:function(){return r.setColor(c).rgbaMixBGMixCustom.luminance>.22?"#222":"#ddd"}})})}}(jQuery,Colors);
    //# sourceMappingURL=jqColorPicker.js.map


    $('#CodeGenerator2').replaceWith(
        '<div id="GeneratorBody">' +
            '<fieldset>' +
                '<legend>' +
                    '<div id="SwitchToCSS" class="codegenerator-field-switch">CSS</div>' +
                    '<div id="SwitchToVar" class="codegenerator-field-switch" style="opacity:0.7; width: 120px;">Змінні</div>' +
                '</legend>' +
                '<div id="CSSParams" />' +
                '<div id="VarParams" style="display:none;" />' +
                '<div style="text-align:center;">' +
                    '<textarea id="CodeGenOutput" type="text" placeholder="Результат" />' +
                '</div>' +
            '</fieldset>' +
        '</div>'
    );

    $('#CSSParams').append(
        '<h2 style="margin-top:5px;">Опції</h2>' +
        '<div id="CSSoptionblock" class="codegenerator-group" style="-webkit-column-count:2; -moz-column-count:2; column-count:2; text-align:inherit; padding-bottom:2px;">' +
            '<input type="checkbox" class="codegenerator-option" data-section="ColorNames"> Кольорові ніки<br>' +
            '<input type="checkbox" class="codegenerator-option" data-section="ForumTemp"> Таблички на форумі<br>' +
            '<input type="checkbox" class="codegenerator-option" data-section="CommentFont"> Фон коментаря<br>' +
            '<input type="checkbox" class="codegenerator-option" data-section="ChatSign"> Підпис в чаті<br>' +
            '<input type="checkbox" class="codegenerator-option" data-section="Moder"> Значок модератора<br>' +
            '<input type="checkbox" class="codegenerator-option" data-section="Cursor"> Курсор' +
        '</div>' +
        '<div class="codegenerator-nick codegenerator-nickbody" style="display:none;">' +
            // Поле введення нікнеймів
            '<div class="codegenerator-nickinput" style="display:none; border-bottom:solid 1px #323232;  border-top:solid 1px #323232; padding:5px 0;">' +
                'Введіть нік: <input id="CSSNick" placeholder="Можна вказувати декілька через знак |" />' +
            '</div>' +
            // Введення параметрів для коду кольорових нікнеймів
            '<div id="ColorNamesBody" class="codegenerator-bodyinnick" style="display:none; border-bottom:solid 1px #323232; padding-bottom:5px;">' +
                '<h2 style="margin-top:5px;">Кольорові ніки</h2>' +
                'Задайте колір: <input id="CSSColor" class="codegenerator-input codegenerator-color-input" placeholder="Колір у форматі rgb, rgba, hex" disabled="disabled"/>' +
            '</div>' +
            // Плашки
            '<div id="ForumTempBody" class="codegenerator-bodyinnick" style="display:none; border-bottom:solid 1px #323232; padding-bottom:5px;">' +
                '<h2 style="margin-top:5px;">Таблички на форумі</h2>' +
                '<div>Назва таблички: <input id="ForumTempName" class="codegenerator-input" placeholder="Назва таблички" disabled="disabled"/></div>' +
                '<div style="margin-top:3px;">Колір назви: <input id="ForumTempColor" class="codegenerator-input codegenerator-color-input" placeholder="Колір назви" disabled="disabled"/></div>' +
                '<div style="margin-top:3px;">Фон таблички: <input id="ForumTempBack" class="codegenerator-input codegenerator-color-input" placeholder="Фоновий колір для таблички" disabled="disabled"/></div>' +
            '</div>' +
            // Фон коментарів
            '<div id="CommentFontBody" class="codegenerator-bodyinnick" style="display:none; border-bottom:solid 1px #323232; padding-bottom:5px;">' +
                '<h2 style="margin-top:5px;">Фон коментарів користувача</h2>' +
                '<div style="margin-top:3px;">Колір тексту: <input id="CommentFontColor" class="codegenerator-input codegenerator-color-input" placeholder="Колір назви" disabled="disabled"/></div>' +
                '<div style="margin-top:3px;">Фон коментаря: <input id="CommentFontBack" class="codegenerator-input codegenerator-color-input" placeholder="Фоновий колір для таблички" disabled="disabled"/></div>' +
            '</div>' +
            // Підпис в чаті
            '<div id="ChatSignBody" class="codegenerator-bodyinnick" style="display:none; border-bottom:solid 1px #323232; padding-bottom:5px;">' +
                '<h2 style="margin-top:5px;">Підпис в чаті</h2>' +
                '<div style="margin-top:3px;">Текст підпису: <input id="ChatSignText" class="codegenerator-input" placeholder="Введіть тут текст" disabled="disabled"/></div>' +
            '</div>' +
        '</div>' +
        // Значок модератора в чаті
        '<div id="ModerBody" class="codegenerator-group" style="display:none;">' +
            '<div style="border-bottom:solid 1px #323232; padding-bottom:5px;">' +
                '<h2 style="margin-top:5px;">Значок модератора</h2>' +
                '<div>Значок: <input id="ModerIcon" class="codegenerator-input" placeholder="Пряме посилання на зображення" disabled="disabled"/></div>' +
            '</div>' +
        '</div>' +
        // Курсор
        '<div id="CursorBody" class="codegenerator-group" style="display:none;">' +
            '<div style="border-bottom:solid 1px #323232; padding-bottom:5px;">' +
                '<h2 style="margin-top:5px;">Курсор</h2>' +
                '<div>Стандартний: <input id="CursorNormal" class="codegenerator-input" placeholder="Пряме посилання на зображення" disabled="disabled"/></div>' +
                '<div style="margin-top:3px;">Для посилань: <input id="CursorLink" class="codegenerator-input" placeholder="Пряме посилання на зображення" disabled="disabled"/></div>' +
            '</div>' +
        '</div>' +
        '<h2 style="margin-top:15px">Результат</h2>' +
        '<button id="CSSSubmit" type="button" class="wikia-button" style="display:block;">Показати результат</button>'
    );

    $('.codegenerator-color-input').colorPicker();

    $('#VarParams').append(
        '<h2 style="margin-top:15px;">Клас вікі (найменування вікі в БД)</h2>' +
        '<div id="WikiBodyClass" class="codegenerator-group" style="opacity:1; text-align:left;">' +
            '<input class="codegenerator-wikiname" style="width:60%; margin-right: 5px;" placeholder="Посилання на вікі"/>' +
            '<button class="codegenerator-var-get">Отримати клас</button> :' +
            '<input class="codegenerator-input codegenerator-wikiname-result" style="width: calc(39% - 130px);" placeholder="Результат" />' +
        '</div>'
    );

    $('#SwitchToVar').click(function () {
        $('#CSSParams, #CodeGenOutput').hide();
        $('#VarParams').show();
        $('#SwitchToVar').fadeTo(500, 1);
        $('#SwitchToCSS').fadeTo(500, 0.7);
    });
    
    $('#SwitchToCSS').click(function () {
        $('#VarParams').hide();
        $('#CSSParams, #CodeGenOutput').show();
        $('#SwitchToVar').fadeTo(500, 0.7);
        $('#SwitchToCSS').fadeTo(500, 1);
    });

    $('.codegenerator-option').on("change", function () {
        var opt_value = $(this).attr('data-section'),
            $opt_body = $('#' + opt_value + 'Body');
        
        if ($(this).attr('checked') == 'checked') {
            $opt_body.slideDown('fast', function () {
                $(this).css('display', 'block').find('.codegenerator-input').removeAttr('disabled');
                if ($(this).hasClass('codegenerator-bodyinnick')) {
                    if (!$('.codegenerator-nicktoggle').length) {
                        $('.codegenerator-nickinput, .codegenerator-nickbody').slideDown('fast');
                    }
                    $(this).toggleClass('codegenerator-nicktoggle');
                }
            });
        } else {
            $opt_body.slideUp('fast', function () {
                $(this).css('display', 'none').find('.codegenerator-input').attr('disabled', 'disabled');
                if ($(this).hasClass('codegenerator-bodyinnick')) {
                    $(this).toggleClass('codegenerator-nicktoggle');
                    if (!$('.codegenerator-nicktoggle').length) {
                        $('.codegenerator-nickinput, .codegenerator-nickbody').slideUp();
                    }
                }
            });
        }
    });

    // CSS
    $('#CSSSubmit').click(function () {
        var invalidInput = false;
        $('.codegenerator-input-error').fadeOut(300);
        $('#CSSParams .codegenerator-input').css('border', 'none');
        // Перевірка на наявність заповнених полів
        $('#CSSParams .codegenerator-input').each(function () {
            if ($(this).attr('disabled') !== 'disabled' && !$(this).val()) {
                $(this).css('border', '1px solid red');
                $('<div class="codegenerator-input-error" style="color:red">Це поле повинно бути заповнено</div>').insertAfter(this);
                invalidInput = true;
            } else {
                $(this).css('border', '2px inset');
            }
        });
        if (invalidInput) {
            return;
        }
        
        $('#CodeGenOutput').val('');
        var Result = '',
            colorRes = ($('#ColorNamesBody').css('display') !== 'none'),
            tempRes = ($('#ForumTempBody').css('display') !== 'none'),
            commRes = ($('#CommentFontBody').css('display') !== 'none'),
            chatsignRes = ($('#ChatSignBody').css('display') !== 'none'),
            moderRes = ($('#ModerBody').css('display') !== 'none'),
            cursRes = ($('#CursorBody').css('display') !== 'none');
        if (colorRes) {
            var ColorSelector = '',
                ColorBody = '    color: ' + $('#CSSColor').val() + ';\n' +
                '}\n\n';
        }
        if (tempRes) {
            var TempSelector = '',
                TempBody = '    color: ' + $('#ForumTempColor').val() + ';\n' +
                '    background-color: ' + $('#ForumTempBack').val() + ';\n' +
                '    content:\'' + $('#ForumTempName').val() + '\';\n' +
                '    border-radius: 1em;\n' +
                '    padding: 0 5px;\n' +
                '    margin-left: 3px;\n' +
                '}\n\n';
        }
        if (cursRes) {
            Result += '/* Курсор на вікі */\n' +
                'body {\n' +
                '    cursor: url("' + $('#CursorNormal').val() + '"), auto;\n' +
                '}\n' +
                'a:link, a:visited,\n' +
                'a:hover {\n' +
                '    cursor: url("' + $('#CursorLink').val() + '"), auto;\n' +
                '}\n\n';
        }
        if (commRes) {
            var commBQ = 
                '    background: ' + $('#CommentFontBack').val() + ' !important;\n' +
                '    color: ' + $('#CommentFontColor').val() + ' !important;\n' +
                '}\n',
                commBQafter =
                '    border-color: transparent ' + $('#CommentFontBack').val() + ' ' + $('#CommentFontBack').val() + ' transparent !important;\n' +
                '}\n',
                commBQdiv = 
                '    background: transparent ' + $('#CommentFontBack').val() + ' !important;\n' +
                '    color: ' + $('#CommentFontColor').val() + ' !important;\n' +
                '}\n\n',
                commBQusers = '',
                commBQafterusers = '',
                commBQdivusers = '';
        }
        if (chatsignRes) {
            var chatsignbody_1 = 
                '    content: "' + $('#ChatSignText').val() + '";\n' +
                '    font-size: 10px;\n' + 
                '}\n',
                chatsignbody_2 =
                '    display: none;\n' + 
                '}\n\n',
                chatsignusers_1 = '',
                chatsignusers_2 = '';
        }
        if (moderRes) {
            Result += '/* Значок модераторів в чаті */\n' +
                '.User.chat-mod:not(.staff) .username:after {\n' +
                '    background-image: url("' + $('#ModerIcon').val() + '");\n' +
                '    background-position: 0px 0px;\n' +
                '}\n\n';
        }
        if ($('#CSSNick').val()) {
            var NickArr = $('#CSSNick').val().split('|');
            $.each(NickArr, function (i, nick) {
                var CodeGenCSSEnding = (i + 1 != NickArr.length) ? ',\n' : ' {\n',
                    fordata = nick;
                nick = encodeURIComponent(nick.replace(/\s/g, '_'));
                // Парсімо відсутні елементи
                if (nick.indexOf("'") > -1) {
                    nick = nick.replace(/'/g, '%27');
                }
                if (nick.indexOf("~") > -1) {
                    nick = nick.replace(/~/g, '%7E');
                }
                if (colorRes) {
                    ColorSelector += 'a[href$="/' + nick + '"],\na[href$=":' + nick + '"]' + CodeGenCSSEnding;
                }
                if (tempRes) {
                    TempSelector += '.Wall .edited-by > a.subtle[href$="' + nick + '"]:after,\n' +
                        '.comments li[data-user="' + fordata + '"] .edited-by:after' + CodeGenCSSEnding;
                }
                if (commRes) {
                    commBQusers += '.comments li[data-user="' + fordata + '"] blockquote' + CodeGenCSSEnding;
                    commBQafterusers += '.comments li[data-user="' + fordata + '"] blockquote:after' + CodeGenCSSEnding;
                    commBQdivusers += '.comments li[data-user="' + fordata + '"] blockquote div' + CodeGenCSSEnding;
                }
                if (chatsignRes) {
                    chatsignuser = '#user-' + fordata.replace(/([!"#$%&'()*+,\-./:;<=>?@[\\\]^`{|}~])/g, '\\$1').replace(/\s/g, '_');
                    chatsignusers_1 += chatsignuser + ' .details:after' + CodeGenCSSEnding;
                    chatsignusers_2 += chatsignuser + ' .status' + CodeGenCSSEnding;
                }
            });
            if (colorRes) {
                Result += '/* Кольорові ніки */\n' + ColorSelector + ColorBody;
            }
            if (tempRes) {
                Result += '/* Оформлення табличок */\n' + TempSelector + TempBody;
            }
            if (commRes) {
                Result += '/* Фон коментарів */\n' + commBQusers + commBQ + commBQafterusers + commBQafter + commBQdivusers + commBQdiv;
            }
            if (chatsignRes) {
                Result += '/* Підписи в чаті */\n' + chatsignusers_1 + chatsignbody_1 + chatsignusers_2 + chatsignbody_2;
            }
        }
        $('#CodeGenOutput').val(Result);
    });

    // Variables
    $('.codegenerator-var-get').click(function () {
        $('.codegenerator-input-error').remove();
        $('.codegenerator-wikiname, .codegenerator-wikiname-result').css('border', '');

        var wikiname = $('.codegenerator-wikiname').val().replace(/^(.+).wikia.com\/.*/, '$1.wikia.com');
        if (wikiname === '') {
            $('<div class="codegenerator-input-error" style="color:red; text-align:center;">Це поле повинно бути заповнено</div>').appendTo('#WikiBodyClass');
            $('.codegenerator-wikiname').css('border', '1px solid red');
            return;
        }

        if (wikiname.indexOf('http://') === -1) {
            wikiname = 'http://' + wikiname;
        }
        if (wikiname.indexOf('.wikia.com') === -1) {
            wikiname += '.wikia.com';
        }

        $('.codegenerator-wikiname-result')
            .val('Почекайте...')
            .css('border', '1px solid orange');

        $.ajax({
            url: wikiname + '/api.php',
            type: 'GET',
            data: {
                action: 'query',
                meta: 'siteinfo',
                format: 'json'
            },
            crossDomain: true,
            dataType: 'jsonp',
            success: function (d) {
                $('.codegenerator-wikiname-result')
                    .val('wiki-' + d.query.general.wikiid)
                    .css('border', '1px solid green');
            },
            error: function() {
                $('.codegenerator-wikiname-result')
                    .val('Помилка!')
                    .css('border', '1px solid red');
            }
        });
    });
});