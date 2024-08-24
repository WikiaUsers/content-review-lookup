// Revisa para que #c-cactions no se salga de la pantalla cuando está muy
// cerca del límite de la ventana (osea, cuando no hay columna lateral).
$(function() {
  var interval = null;
  $(function(){
    interval = setInterval(menuCheck, 100);
  });

  function menuCheck() {
    'use strict';
    var r = $('.page__right-rail');
    var el = $('#p-cactions');
    if (r.hasClass('is-rail-hidden') || (r.length === 0)) {
      el.addClass('right');
      setTimeout(menuCheck, 100);
    }
    else {
      el.removeClass('right');
      setTimeout(menuCheck, 100);
    }
  };
});

// Haciendo elementos que deberían ser interactivos pero no lo son, interactivos.
$(function() {
  'use strict';
  var hr = $('#pagehistory input[type="radio"]');
  // Debido a que los botones de radio en los historiales no son accesibles con
  // la tecla TAB, y agregarles tabindex="0" no funciona tampoco, vamos a hacer
  // un elemento padre que sí pueda ser enfocable y que, al oprimir enter,
  // active el evento de clic al hijo (el boón de radio).
  hr.wrap('<div class="c-radio-button" role="radio" tabindex="0"></div>');
  // Removemos tabindex de los botones de radio normales ya que causaría doble
  // enfoque con los radios ya activados.
  hr.attr({ tabindex: '-1' })
  $('input[type="radio"]').each(function() {
    if ($(this).css('visibility') == 'hidden') {
      $(this).parent().attr({ tabindex: '-1' })
    }
    else {
      $(this).parent().attr({ tabindex: '0' })
    }
  });
  $('#pagehistory').on("DOMSubtreeModified", function() {
    // Es la misma función de arriba, pero se ejecuta por cada cambio en el DOM.
    $('input[type="radio"]').each(function() {
      if ($(this).css('visibility') == 'hidden') {
        $(this).parent().attr({ tabindex: '-1' })
      }
      else {
        $(this).parent().attr({ tabindex: '0' })
      }
    });
  });
  // Hacemos todos estos objetos interactivos para los usuarios de teclado.
  $('.portable-infobox .wds-tabs__tab, .wds-tabs__arrow-left, .wds-tabs__arrow-right, .pi-collapse, .global-navigation__links .wds-dropdown, .global-navigation__bottom .notifications__toggle, .global-navigation__bottom .wds-dropdown, .wiki-tools.wds-button-group > .wds-dropdown').attr({
    role: 'button',
    tabindex: '0'
  });
  // Lo que se se deba seleccionar directamente van acá.
  $('.wds-tabs__tab, .wds-tabs__arrow-left, .wds-tabs__arrow-right').keypress(function(event) { 
    if (event.keyCode === 13) {
      $(this).click();
    }
  });
  // Lo que se deba seleccionar, pero cliquear al elemento hijo van acá.
  $('.pi-collapse, .c-radio-button').keypress(function(event) { 
    if (event.keyCode === 13) {
      $(this).children().click();
    }
  });
  // Elementos que reaccionen al :hover pero no al :focus van acá.
  
});

// ES: Efecto ripple de los botones, por Roko C. Buljan en Stack Overflow.
// EN: Button ripple effect, by Roko C. Buljan on Stack Overflow:
// https://stackoverflow.com/a/37500979
$(function($) {
  // Añade el atributo data-riple a los elementos.
  $('.page .wds-button, .page .oo-ui-buttonElement-button, .page .wds-tabs__tab, .page button, .page__main .wds-dropdown__content .wds-list.wds-is-linked > li, input[type="submit"], .community-page-help-module .community-page-help-module-links a, :is(.bodySearch, .commentbox, .createbox, .mw-movebox, .searchbox) .mw-ui-button, .ripple-image, button[type="submit"], .oo-ui-menuOptionWidget:not(.oo-ui-optionWidget), .oo-ui-dropdownWidget-handle, .navcard').attr({ 'data-ripple': '' });
  var isUserPage = $('body').hasClass('ns-2') || $('body').hasClass('n2-1200') || $('body').hasClass('n2-500') || $('body').hasClass('mw-special-Contributions') || $('body').hasClass('mw-special-UserProfileActivity');
  (function(doc) {
    if (isUserPage) {
      var profileCheck = new MutationObserver(function(mutations) {
        mutations.forEach(function() {
          var profileButtons = $('.user-identity-header__button, .user-bio-open-modal-button, .user-profile-navigation__link');
          if (profileButtons) {
            profileButtons.attr({ 'data-ripple': '' });
            //console.log('Profile buttons now have [data-ripple].');
            $.fn.hasAttr = function(name) {  
              return this.attr(name) !== undefined;
            };
            if(profileButtons.hasAttr('data-ripple')) {
              profileCheck.disconnect();
            }
          }
        });
      });
      profileCheck.observe(doc, { childList: true, subtree: true });
    }
    var railCheck = new MutationObserver(function(mutations) {
      mutations.forEach(function() {
        var railButtons = $('.rail-module__list > li');
        if (railButtons) {
          railButtons.attr({ 'data-ripple': '' });
          //console.log('Rail buttons now have [data-ripple].');
          $.fn.hasAttr = function(name) {  
            return this.attr(name) !== undefined;
          };
          if(railButtons.hasAttr('data-ripple')) {
            railCheck.disconnect();
          }
        }
      });
    });
    railCheck.observe(doc, { childList: true, subtree: true });
  })(document, false);

  // Añade el atributo data-riple a los elementos del perfil que cargan perezasamente.
  $(function($) {
  $(document).on('mousedown', '[data-ripple]', function(e) {
    var $self = $(this);
    if($self.is('.wds-is-disabled')) {
      return;
    }
    if($self.closest('[data-ripple]')) {
      e.stopPropagation();
    }
    var initPos = $self.css('position'),
        offs = $self.offset(),
        x = e.pageX - offs.left,
        y = e.pageY - offs.top,
        dia = Math.min(this.offsetHeight, this.offsetWidth, 100), // Start diameter.
        $ripple = $('<div/>', { class : 'ripple', appendTo : $self });
    if(!initPos || initPos==='static') {
      $self.css({ position:'relative' });
    }
    $('<div/>', {
      class : 'rippleWave',
      css : {
        background: $self.data('ripple'),
        width: dia,
        height: dia,
        left: x - (dia/2),
        top: y - (dia/2),
      },
      appendTo : $ripple,
      one : {
        animationend : function(){
          $ripple.remove();
        }
      }
    });
  });
});
});


/*
* @module                 Vibrant.js
* @description            Extracts colors from pictures to use on elements.
* @author                 Jari Zwarts
* @license                MIT
* @source                 https://github.com/jariz/vibrant.js/blob/master/dist/Vibrant.js
* @minified               https://github.com/jariz/vibrant.js/blob/master/dist/Vibrant.min.js
*
* Copyright (c) 2015 Jari Zwarts
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/
!function t(r,o,i){function n(a,h){if(!o[a]){if(!r[a]){var u="function"==typeof require&&require;if(!h&&u)return u(a,!0);if(e)return e(a,!0);var s=new Error("Cannot find module '"+a+"'");throw s.code="MODULE_NOT_FOUND",s}var c=o[a]={exports:{}};r[a][0].call(c.exports,function(t){var o=r[a][1][t];return n(o?o:t)},c,c.exports,t,r,o,i)}return o[a].exports}for(var e="function"==typeof require&&require,a=0;a<i.length;a++)n(i[a]);return n}({1:[function(t,r,o){if(!i)var i={map:function(t,r){var o={};return r?t.map(function(t,i){return o.index=i,r.call(o,t)}):t.slice()},naturalOrder:function(t,r){return r>t?-1:t>r?1:0},sum:function(t,r){var o={};return t.reduce(r?function(t,i,n){return o.index=n,t+r.call(o,i)}:function(t,r){return t+r},0)},max:function(t,r){return Math.max.apply(null,r?i.map(t,r):t)}};var n=function(){function t(t,r,o){return(t<<2*s)+(r<<s)+o}function r(t){function r(){o.sort(t),i=!0}var o=[],i=!1;return{push:function(t){o.push(t),i=!1},peek:function(t){return i||r(),void 0===t&&(t=o.length-1),o[t]},pop:function(){return i||r(),o.pop()},size:function(){return o.length},map:function(t){return o.map(t)},debug:function(){return i||r(),o}}}function o(t,r,o,i,n,e,a){var h=this;h.r1=t,h.r2=r,h.g1=o,h.g2=i,h.b1=n,h.b2=e,h.histo=a}function n(){this.vboxes=new r(function(t,r){return i.naturalOrder(t.vbox.count()*t.vbox.volume(),r.vbox.count()*r.vbox.volume())})}function e(r){var o,i,n,e,a=1<<3*s,h=new Array(a);return r.forEach(function(r){i=r[0]>>c,n=r[1]>>c,e=r[2]>>c,o=t(i,n,e),h[o]=(h[o]||0)+1}),h}function a(t,r){var i,n,e,a=1e6,h=0,u=1e6,s=0,p=1e6,f=0;return t.forEach(function(t){i=t[0]>>c,n=t[1]>>c,e=t[2]>>c,a>i?a=i:i>h&&(h=i),u>n?u=n:n>s&&(s=n),p>e?p=e:e>f&&(f=e)}),new o(a,h,u,s,p,f,r)}function h(r,o){function n(t){var r,i,n,e,a,h=t+"1",u=t+"2",c=0;for(s=o[h];s<=o[u];s++)if(v[s]>A/2){for(n=o.copy(),e=o.copy(),r=s-o[h],i=o[u]-s,a=i>=r?Math.min(o[u]-1,~~(s+i/2)):Math.max(o[h],~~(s-1-r/2));!v[a];)a++;for(c=T[a];!c&&v[a-1];)c=T[--a];return n[u]=a,e[h]=n[u]+1,[n,e]}}if(o.count()){var e=o.r2-o.r1+1,a=o.g2-o.g1+1,h=o.b2-o.b1+1,u=i.max([e,a,h]);if(1==o.count())return[o.copy()];var s,c,p,f,l,A=0,v=[],T=[];if(u==e)for(s=o.r1;s<=o.r2;s++){for(f=0,c=o.g1;c<=o.g2;c++)for(p=o.b1;p<=o.b2;p++)l=t(s,c,p),f+=r[l]||0;A+=f,v[s]=A}else if(u==a)for(s=o.g1;s<=o.g2;s++){for(f=0,c=o.r1;c<=o.r2;c++)for(p=o.b1;p<=o.b2;p++)l=t(c,s,p),f+=r[l]||0;A+=f,v[s]=A}else for(s=o.b1;s<=o.b2;s++){for(f=0,c=o.r1;c<=o.r2;c++)for(p=o.g1;p<=o.g2;p++)l=t(c,p,s),f+=r[l]||0;A+=f,v[s]=A}return v.forEach(function(t,r){T[r]=A-t}),n(u==e?"r":u==a?"g":"b")}}function u(t,o){function u(t,r){for(var o,i=1,n=0;p>n;)if(o=t.pop(),o.count()){var e=h(s,o),a=e[0],u=e[1];if(!a)return;if(t.push(a),u&&(t.push(u),i++),i>=r)return;if(n++>p)return}else t.push(o),n++}if(!t.length||2>o||o>256)return!1;var s=e(t),c=0;s.forEach(function(){c++});var l=a(t,s),A=new r(function(t,r){return i.naturalOrder(t.count(),r.count())});A.push(l),u(A,f*o);for(var v=new r(function(t,r){return i.naturalOrder(t.count()*t.volume(),r.count()*r.volume())});A.size();)v.push(A.pop());u(v,o-v.size());for(var T=new n;v.size();)T.push(v.pop());return T}var s=5,c=8-s,p=1e3,f=.75;return o.prototype={volume:function(t){var r=this;return(!r._volume||t)&&(r._volume=(r.r2-r.r1+1)*(r.g2-r.g1+1)*(r.b2-r.b1+1)),r._volume},count:function(r){var o=this,i=o.histo;if(!o._count_set||r){var n,e,a,h,u=0;for(n=o.r1;n<=o.r2;n++)for(e=o.g1;e<=o.g2;e++)for(a=o.b1;a<=o.b2;a++)h=t(n,e,a),u+=i[h]||0;o._count=u,o._count_set=!0}return o._count},copy:function(){var t=this;return new o(t.r1,t.r2,t.g1,t.g2,t.b1,t.b2,t.histo)},avg:function(r){var o=this,i=o.histo;if(!o._avg||r){var n,e,a,h,u,c=0,p=1<<8-s,f=0,l=0,A=0;for(e=o.r1;e<=o.r2;e++)for(a=o.g1;a<=o.g2;a++)for(h=o.b1;h<=o.b2;h++)u=t(e,a,h),n=i[u]||0,c+=n,f+=n*(e+.5)*p,l+=n*(a+.5)*p,A+=n*(h+.5)*p;c?o._avg=[~~(f/c),~~(l/c),~~(A/c)]:o._avg=[~~(p*(o.r1+o.r2+1)/2),~~(p*(o.g1+o.g2+1)/2),~~(p*(o.b1+o.b2+1)/2)]}return o._avg},contains:function(t){var r=this,o=t[0]>>c;return gval=t[1]>>c,bval=t[2]>>c,o>=r.r1&&o<=r.r2&&gval>=r.g1&&gval<=r.g2&&bval>=r.b1&&bval<=r.b2}},n.prototype={push:function(t){this.vboxes.push({vbox:t,color:t.avg()})},palette:function(){return this.vboxes.map(function(t){return t.color})},size:function(){return this.vboxes.size()},map:function(t){for(var r=this.vboxes,o=0;o<r.size();o++)if(r.peek(o).vbox.contains(t))return r.peek(o).color;return this.nearest(t)},nearest:function(t){for(var r,o,i,n=this.vboxes,e=0;e<n.size();e++)o=Math.sqrt(Math.pow(t[0]-n.peek(e).color[0],2)+Math.pow(t[1]-n.peek(e).color[1],2)+Math.pow(t[2]-n.peek(e).color[2],2)),(r>o||void 0===r)&&(r=o,i=n.peek(e).color);return i},forcebw:function(){var t=this.vboxes;t.sort(function(t,r){return i.naturalOrder(i.sum(t.color),i.sum(r.color))});var r=t[0].color;r[0]<5&&r[1]<5&&r[2]<5&&(t[0].color=[0,0,0]);var o=t.length-1,n=t[o].color;n[0]>251&&n[1]>251&&n[2]>251&&(t[o].color=[255,255,255])}},{quantize:u}}();r.exports=n.quantize},{}],2:[function(t,r,o){(function(){var r,o,i,n=function(t,r){return function(){return t.apply(r,arguments)}},e=[].slice;window.Swatch=o=function(){function t(t,r){this.rgb=t,this.population=r}return t.prototype.hsl=void 0,t.prototype.rgb=void 0,t.prototype.population=1,t.yiq=0,t.prototype.getHsl=function(){return this.hsl?this.hsl:this.hsl=i.rgbToHsl(this.rgb[0],this.rgb[1],this.rgb[2])},t.prototype.getPopulation=function(){return this.population},t.prototype.getRgb=function(){return this.rgb},t.prototype.getHex=function(){return"#"+((1<<24)+(this.rgb[0]<<16)+(this.rgb[1]<<8)+this.rgb[2]).toString(16).slice(1,7)},t.prototype.getTitleTextColor=function(){return this._ensureTextColors(),this.yiq<200?"#fff":"#000"},t.prototype.getBodyTextColor=function(){return this._ensureTextColors(),this.yiq<150?"#fff":"#000"},t.prototype._ensureTextColors=function(){return this.yiq?void 0:this.yiq=(299*this.rgb[0]+587*this.rgb[1]+114*this.rgb[2])/1e3},t}(),window.Vibrant=i=function(){function i(t,i,e){this.swatches=n(this.swatches,this);var a,h,u,s,c,p,f,l,A,v,T,g;"undefined"==typeof i&&(i=64),"undefined"==typeof e&&(e=5),f=new r(t);try{for(l=f.getImageData(),T=l.data,v=f.getPixelCount(),h=[],p=0;v>p;)A=4*p,g=T[A+0],c=T[A+1],u=T[A+2],a=T[A+3],a>=125&&(g>250&&c>250&&u>250||h.push([g,c,u])),p+=e;s=this.quantize(h,i),this._swatches=s.vboxes.map(function(t){return function(t){return new o(t.color,t.vbox.count())}}(this)),this.maxPopulation=this.findMaxPopulation,this.generateVarationColors(),this.generateEmptySwatches()}finally{f.removeCanvas()}}return i.prototype.quantize=t("quantize"),i.prototype._swatches=[],i.prototype.TARGET_DARK_LUMA=.26,i.prototype.MAX_DARK_LUMA=.45,i.prototype.MIN_LIGHT_LUMA=.55,i.prototype.TARGET_LIGHT_LUMA=.74,i.prototype.MIN_NORMAL_LUMA=.3,i.prototype.TARGET_NORMAL_LUMA=.5,i.prototype.MAX_NORMAL_LUMA=.7,i.prototype.TARGET_MUTED_SATURATION=.3,i.prototype.MAX_MUTED_SATURATION=.4,i.prototype.TARGET_VIBRANT_SATURATION=1,i.prototype.MIN_VIBRANT_SATURATION=.35,i.prototype.WEIGHT_SATURATION=3,i.prototype.WEIGHT_LUMA=6,i.prototype.WEIGHT_POPULATION=1,i.prototype.VibrantSwatch=void 0,i.prototype.MutedSwatch=void 0,i.prototype.DarkVibrantSwatch=void 0,i.prototype.DarkMutedSwatch=void 0,i.prototype.LightVibrantSwatch=void 0,i.prototype.LightMutedSwatch=void 0,i.prototype.HighestPopulation=0,i.prototype.generateVarationColors=function(){return this.VibrantSwatch=this.findColorVariation(this.TARGET_NORMAL_LUMA,this.MIN_NORMAL_LUMA,this.MAX_NORMAL_LUMA,this.TARGET_VIBRANT_SATURATION,this.MIN_VIBRANT_SATURATION,1),this.LightVibrantSwatch=this.findColorVariation(this.TARGET_LIGHT_LUMA,this.MIN_LIGHT_LUMA,1,this.TARGET_VIBRANT_SATURATION,this.MIN_VIBRANT_SATURATION,1),this.DarkVibrantSwatch=this.findColorVariation(this.TARGET_DARK_LUMA,0,this.MAX_DARK_LUMA,this.TARGET_VIBRANT_SATURATION,this.MIN_VIBRANT_SATURATION,1),this.MutedSwatch=this.findColorVariation(this.TARGET_NORMAL_LUMA,this.MIN_NORMAL_LUMA,this.MAX_NORMAL_LUMA,this.TARGET_MUTED_SATURATION,0,this.MAX_MUTED_SATURATION),this.LightMutedSwatch=this.findColorVariation(this.TARGET_LIGHT_LUMA,this.MIN_LIGHT_LUMA,1,this.TARGET_MUTED_SATURATION,0,this.MAX_MUTED_SATURATION),this.DarkMutedSwatch=this.findColorVariation(this.TARGET_DARK_LUMA,0,this.MAX_DARK_LUMA,this.TARGET_MUTED_SATURATION,0,this.MAX_MUTED_SATURATION)},i.prototype.generateEmptySwatches=function(){var t;return void 0===this.VibrantSwatch&&void 0!==this.DarkVibrantSwatch&&(t=this.DarkVibrantSwatch.getHsl(),t[2]=this.TARGET_NORMAL_LUMA,this.VibrantSwatch=new o(i.hslToRgb(t[0],t[1],t[2]),0)),void 0===this.DarkVibrantSwatch&&void 0!==this.VibrantSwatch?(t=this.VibrantSwatch.getHsl(),t[2]=this.TARGET_DARK_LUMA,this.DarkVibrantSwatch=new o(i.hslToRgb(t[0],t[1],t[2]),0)):void 0},i.prototype.findMaxPopulation=function(){var t,r,o,i,n;for(o=0,i=this._swatches,t=0,r=i.length;r>t;t++)n=i[t],o=Math.max(o,n.getPopulation());return o},i.prototype.findColorVariation=function(t,r,o,i,n,e){var a,h,u,s,c,p,f,l,A;for(s=void 0,c=0,p=this._swatches,a=0,h=p.length;h>a;a++)l=p[a],f=l.getHsl()[1],u=l.getHsl()[2],f>=n&&e>=f&&u>=r&&o>=u&&!this.isAlreadySelected(l)&&(A=this.createComparisonValue(f,i,u,t,l.getPopulation(),this.HighestPopulation),(void 0===s||A>c)&&(s=l,c=A));return s},i.prototype.createComparisonValue=function(t,r,o,i,n,e){return this.weightedMean(this.invertDiff(t,r),this.WEIGHT_SATURATION,this.invertDiff(o,i),this.WEIGHT_LUMA,n/e,this.WEIGHT_POPULATION)},i.prototype.invertDiff=function(t,r){return 1-Math.abs(t-r)},i.prototype.weightedMean=function(){var t,r,o,i,n,a;for(n=1<=arguments.length?e.call(arguments,0):[],r=0,o=0,t=0;t<n.length;)i=n[t],a=n[t+1],r+=i*a,o+=a,t+=2;return r/o},i.prototype.swatches=function(){return{Vibrant:this.VibrantSwatch,Muted:this.MutedSwatch,DarkVibrant:this.DarkVibrantSwatch,DarkMuted:this.DarkMutedSwatch,LightVibrant:this.LightVibrantSwatch,LightMuted:this.LightMuted}},i.prototype.isAlreadySelected=function(t){return this.VibrantSwatch===t||this.DarkVibrantSwatch===t||this.LightVibrantSwatch===t||this.MutedSwatch===t||this.DarkMutedSwatch===t||this.LightMutedSwatch===t},i.rgbToHsl=function(t,r,o){var i,n,e,a,h,u;if(t/=255,r/=255,o/=255,a=Math.max(t,r,o),h=Math.min(t,r,o),n=void 0,u=void 0,e=(a+h)/2,a===h)n=u=0;else{switch(i=a-h,u=e>.5?i/(2-a-h):i/(a+h),a){case t:n=(r-o)/i+(o>r?6:0);break;case r:n=(o-t)/i+2;break;case o:n=(t-r)/i+4}n/=6}return[n,u,e]},i.hslToRgb=function(t,r,o){var i,n,e,a,h,u;return u=void 0,n=void 0,i=void 0,e=function(t,r,o){return 0>o&&(o+=1),o>1&&(o-=1),1/6>o?t+6*(r-t)*o:.5>o?r:2/3>o?t+(r-t)*(2/3-o)*6:t},0===r?u=n=i=o:(h=.5>o?o*(1+r):o+r-o*r,a=2*o-h,u=e(a,h,t+1/3),n=e(a,h,t),i=e(a,h,t-1/3)),[255*u,255*n,255*i]},i}(),window.CanvasImage=r=function(){function t(t){this.canvas=document.createElement("canvas"),this.context=this.canvas.getContext("2d"),document.body.appendChild(this.canvas),this.width=this.canvas.width=t.width,this.height=this.canvas.height=t.height,this.context.drawImage(t,0,0,this.width,this.height)}return t.prototype.clear=function(){return this.context.clearRect(0,0,this.width,this.height)},t.prototype.update=function(t){return this.context.putImageData(t,0,0)},t.prototype.getPixelCount=function(){return this.width*this.height},t.prototype.getImageData=function(){return this.context.getImageData(0,0,this.width,this.height)},t.prototype.removeCanvas=function(){return this.canvas.parentNode.removeChild(this.canvas)},t}()}).call(this)},{quantize:1}]},{},[2]);

mw.loader.using(['mediawiki.util', 'mediawiki.api'], function() {
  var isUserPage = $('body').hasClass('ns-2') || $('body').hasClass('n2-1200') || $('body').hasClass('n2-500') || $('body').hasClass('mw-special-Contributions') || $('body').hasClass('mw-special-UserProfileActivity');
  if (isUserPage) {
    const profileCheck = setInterval(function() {
      if($('.user-identity-box__wrapper').length) {
        clearInterval(profileCheck);
        // Hace que las bios de otros usuarios (menos el tuyo) ocupen todo el ancho.
        if ($('.wds-button.user-identity-header__button:not(.wds-is-secondary)')[0]) {
          $('.user-identity-bio').css({ 'gridColumnEnd': 'span 3' });
        }
        // Necesario para obtener y dar los colores.
        $('.user-identity-avatar__image').attr({ 'id': 'vibrant-colors', 'crossOrigin': 'anonymous' });
        var img = document.getElementById('vibrant-colors');
        img.addEventListener('load', function() {
          var vibrant = new Vibrant(img);
          var swatches = vibrant.swatches();
          for (var swatch in swatches)
          if (swatches.hasOwnProperty(swatch) && swatches[swatch])
          //console.log(swatch, swatches[swatch].getHex())
          var profileHeader = document.getElementById('userProfileApp');
          if (swatches['LightVibrant'] && swatches['DarkVibrant']) {
            profileHeader.style.setProperty('--profile-dynamic-color-light', swatches['LightVibrant'].getHex());
            profileHeader.style.setProperty('--profile-dynamic-color-dark', swatches['DarkVibrant'].getHex());
          }
          else if (swatches['DarkVibrant']) {
            profileHeader.style.setProperty('--profile-dynamic-color-dark', swatches['DarkVibrant'].getHex());
          }
          else if (swatches['LightVibrant']) {
            profileHeader.style.setProperty('--profile-dynamic-color-light', swatches['LightVibrant'].getHex());
          }
        });
      }
    }, 25);
  }
});

// CustomSlider: https://dev.fandom.com/wiki/CustomSlider
(function () {
  var SlideNow = window.SlideNow || 1;
  var SlideCount = window.SlideCount || 0;
  var SlideInterval = window.SlideInterval || 0;
  var TranslateWidth = window.TranslateWidth || 0;
  var TimerPause = window.TimerPause || !1;
  mw.hook('wikipage.content').add(function() {
    var Slides = 0;
    var HeightSize = 'auto';
    var Data = ($('#SliderData').attr('class') || '').split('|');
    if (Data.length == 3) {
      Slides = Data[0];
      SlideInterval = Data[1];
      HeightSize = Data[2];
    }
    if (SlideInterval < 1000 || SlideInterval === undefined) {
      SlideInterval = 6000;
    }
    $('.Sld').each(function (index) {
      if (index + 1 > Slides) {
        $(this).remove();
      }
    });
    $('.NavBtn').each(function (index) {
      if (index + 1 > Slides) {
        $(this).remove();
      }
    });
    $('#SliderView').css('height', HeightSize);
    SlideCount = $('#SliderWrapper').children().length;
    $('#SliderWrapper').css('width', 100 * SlideCount + '%');
    $('.Sld').css('width', 100 / SlideCount + '%');
    setTimeout(function tick() {
      if (TimerPause === false) {
        NextSlide();
      }
      setTimeout(tick, SlideInterval);
    }, SlideInterval);
    $('#SliderView').mouseenter(function () {
      TimerPause = true;
    });
    $('#SliderView').mouseleave(function () {
      TimerPause = false;
    });
    $('.NavBtn').click(function () {
      SelectSlide($(this));
      var navBtnId = $(this).index();
      if (navBtnId + 1 != SlideNow) {
        TranslateWidth = - $('#SliderView').width() * (navBtnId);
        SlideNow = navBtnId + 1;
      }
    });
    var SSlider = 0;
      $(window).trigger('scroll');// trigger image lazy loader
    if (HeightSize != 'auto') {
      SSlider = $('#SliderView').outerHeight(true);
      $('.Sld').each(function (index, value) {
        var HSlide = $(this).find('img').outerHeight(false);
        var RMath = (SSlider - HSlide) / 2;
        $(this).find('img').css('transform', 'translateY(' + RMath + 'px)');
      });
    }
    var BtnCount = $('.NavBtn').length;
    var SBtn = 0;
    if ($('#NavBtns').hasClass('nmLeft')) {
      SSlider = $('#NavBtns').outerHeight(true);
      SBtn = $('#NavBtns li').outerHeight(true);
    } else if ($('#NavBtns').hasClass('nmBottom')) {
      SSlider = $('#NavBtns').outerWidth(true);
      SBtn = $('#NavBtns li').outerWidth(true);
    }
  });
  function NextSlide() {
    if (SlideNow == SlideCount || SlideNow <= 0 || SlideNow > SlideCount) {
      $('#SliderWrapper').css('transform', 'translate(0, 0)');
      SlideNow = 1;
    } else {
      TranslateWidth = - $('#SliderView').width() * (SlideNow);
      $('#SliderWrapper').css({
        'transform': 'translate(' + TranslateWidth + 'px, 0)',
        '-webkit-transform': 'translate(' + TranslateWidth + 'px, 0)',
        '-ms-transform': 'translate(' + TranslateWidth + 'px, 0)',
      });
      SlideNow++;
    }
    SelectSlide($('#NavBtns').children().eq(SlideNow - 1));
  }
  function SelectSlide(ActiveBtn) {
      $(window).trigger('scroll');// trigger image lazy loader
    $('.NavBtn').removeClass('nbActiveBottom');
    if ($('#NavBtns').hasClass('nmBottom')) {
      ActiveBtn.addClass('nbActiveBottom');
    }
  }
}());