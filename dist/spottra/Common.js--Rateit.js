function timeStamp_RateIt_js() {
  return "2013.11.21 18:38 (UTC-8)";
}

/*! RateIt | v1.0.15 / 11/13/2013 | https://rateit.codeplex.com/license
    http://rateit.codeplex.com | Twitter: @gjunge
*/

(function(n){function t(n){var u=n.originalEvent.changedTouches,t=u[0],i="",r;switch(n.type){case"touchmove":i="mousemove";break;case"touchend":i="mouseup";break;default:return}r=document.createEvent("MouseEvent");r.initMouseEvent(i,!0,!0,window,1,t.screenX,t.screenY,t.clientX,t.clientY,!1,!1,!1,!1,0,null);t.target.dispatchEvent(r);n.preventDefault()}n.rateit={aria:{resetLabel:"reset rating",ratingLabel:"rating"}};n.fn.rateit=function(i,r){var e=1,u={},o="init",s=function(n){return n.charAt(0).toUpperCase()+n.substr(1)},f;if(this.length==0)return this;if(f=n.type(i),f=="object"||i===undefined||i==null)u=n.extend({},n.fn.rateit.defaults,i);else{if(f=="string"&&i!=="reset"&&r===undefined)return this.data("rateit"+s(i));f=="string"&&(o="setvalue")}return this.each(function(){var c=n(this),f=function(n,t){if(t!=null){var i="aria-value"+(n=="value"?"now":n),r=c.find(".rateit-range");r.attr(i)!=undefined&&r.attr(i,t)}return arguments[0]="rateit"+s(n),c.data.apply(c,arguments)},p,w,v,h,d,g,l,y,b,a;if(i=="reset"){p=f("init");for(w in p)c.data(w,p[w]);f("backingfld")&&(h=n(f("backingfld")),h.val(f("value")),h[0].min&&(h[0].min=f("min")),h[0].max&&(h[0].max=f("max")),h[0].step&&(h[0].step=f("step")));c.trigger("reset")}if(c.hasClass("rateit")||c.addClass("rateit"),v=c.css("direction")!="rtl",o=="setvalue"){if(!f("init"))throw"Can't set value before init";i!="readonly"||r!=!0||f("readonly")||(c.find(".rateit-range").unbind(),f("wired",!1));i=="value"&&(r=r==null?f("min"):Math.max(f("min"),Math.min(f("max"),r)));f("backingfld")&&(h=n(f("backingfld")),i=="value"&&h.val(r),i=="min"&&h[0].min&&(h[0].min=r),i=="max"&&h[0].max&&(h[0].max=r),i=="step"&&h[0].step&&(h[0].step=r));f(i,r)}f("init")||(f("min",f("min")||u.min),f("max",f("max")||u.max),f("step",f("step")||u.step),f("readonly",f("readonly")!==undefined?f("readonly"):u.readonly),f("resetable",f("resetable")!==undefined?f("resetable"):u.resetable),f("backingfld",f("backingfld")||u.backingfld),f("starwidth",f("starwidth")||u.starwidth),f("starheight",f("starheight")||u.starheight),f("value",Math.max(f("min"),Math.min(f("max"),f("value")||u.value||u.min))),f("ispreset",f("ispreset")!==undefined?f("ispreset"):u.ispreset),f("backingfld")&&(h=n(f("backingfld")),f("value",h.hide().val()),(h.attr("disabled")||h.attr("readonly"))&&f("readonly",!0),h[0].nodeName=="INPUT"&&(h[0].type=="range"||h[0].type=="text")&&(f("min",parseInt(h.attr("min"))||f("min")),f("max",parseInt(h.attr("max"))||f("max")),f("step",parseInt(h.attr("step"))||f("step"))),h[0].nodeName=="SELECT"&&h[0].options.length>1&&(f("min",Number(h[0].options[0].value)),f("max",Number(h[0].options[h[0].length-1].value)),f("step",Number(h[0].options[1].value)-Number(h[0].options[0].value)))),d=c[0].nodeName=="DIV"?"div":"span",e++,g='<button id="rateit-reset-{{index}}" data-role="none" class="rateit-reset" aria-label="'+n.rateit.aria.resetLabel+'" aria-controls="rateit-range-{{index}}"><\/button><{{element}} id="rateit-range-{{index}}" class="rateit-range" tabindex="0" role="slider" aria-label="'+n.rateit.aria.ratingLabel+'" aria-owns="rateit-reset-{{index}}" aria-valuemin="'+f("min")+'" aria-valuemax="'+f("max")+'" aria-valuenow="'+f("value")+'"><{{element}} class="rateit-selected" style="height:'+f("starheight")+'px"><\/{{element}}><{{element}} class="rateit-hover" style="height:'+f("starheight")+'px"><\/{{element}}><\/{{element}}>',c.append(g.replace(/{{index}}/gi,e).replace(/{{element}}/gi,d)),v||(c.find(".rateit-reset").css("float","right"),c.find(".rateit-selected").addClass("rateit-selected-rtl"),c.find(".rateit-hover").addClass("rateit-hover-rtl")),f("init",JSON.parse(JSON.stringify(c.data()))));c.find(".rateit-selected, .rateit-hover").height(f("starheight"));l=c.find(".rateit-range");l.width(f("starwidth")*(f("max")-f("min"))).height(f("starheight"));y="rateit-preset"+(v?"":"-rtl");f("ispreset")?c.find(".rateit-selected").addClass(y):c.find(".rateit-selected").removeClass(y);f("value")!=null&&(b=(f("value")-f("min"))*f("starwidth"),c.find(".rateit-selected").width(b));a=c.find(".rateit-reset");a.data("wired")!==!0&&a.bind("click",function(n){n.preventDefault();a.blur();c.rateit("value",null);c.trigger("reset")}).data("wired",!0);var nt=function(t,i){var u=i.changedTouches?i.changedTouches[0].pageX:i.pageX,r=u-n(t).offset().left;return v||(r=l.width()-r),r>l.width()&&(r=l.width()),r<0&&(r=0),b=Math.ceil(r/f("starwidth")*(1/f("step")))},tt=function(n){var t=n*f("starwidth")*f("step"),r=l.find(".rateit-hover"),i;r.data("width")!=t&&(l.find(".rateit-selected").hide(),r.width(t).show().data("width",t),i=[n*f("step")+f("min")],c.trigger("hover",i).trigger("over",i))},k=function(t){f("value",t);f("backingfld")&&n(f("backingfld")).val(t);f("ispreset")&&(l.find(".rateit-selected").removeClass(y),f("ispreset",!1));l.find(".rateit-hover").hide();l.find(".rateit-selected").width(t*f("starwidth")-f("min")*f("starwidth")).show();c.trigger("hover",[null]).trigger("over",[null]).trigger("rated",[t])};f("readonly")?a.hide():(f("resetable")||a.hide(),f("wired")||(l.bind("touchmove touchend",t),l.mousemove(function(n){var t=nt(this,n);tt(t)}),l.mouseleave(function(){l.find(".rateit-hover").hide().width(0).data("width","");c.trigger("hover",[null]).trigger("over",[null]);l.find(".rateit-selected").show()}),l.mouseup(function(n){var t=nt(this,n),i=t*f("step")+f("min");k(i)}),l.keyup(function(n){(n.which==38||n.which==(v?39:37))&&k(Math.min(f("value")+f("step"),f("max")));(n.which==40||n.which==(v?37:39))&&k(Math.max(f("value")-f("step"),f("min")))}),f("wired",!0)),f("resetable")&&a.show());l.attr("aria-readonly",f("readonly"))})};n.fn.rateit.defaults={min:0,max:5,step:.5,starwidth:16,starheight:16,readonly:!1,resetable:!0,ispreset:!1};n(function(){n("div.rateit, span.rateit").rateit()})})(jQuery);
//# sourceMappingURL=jquery.rateit.min.js.map

// Additional functionality by Spottra, November 2013

var customRatings;

function initializeCustomRatings() {
   if (document.getElementsByClassName("rateit").length &&
      mw.config.get('wgUserName'))
      retrieveCustomRatings(mw.config.get('wgUserName'),
         mw.config.get('wgPageName'));
}

addOnloadHook(initializeCustomRatings);

function getCustomRating(strDescription, strType) {
   if (arguments.length < 2 || !strDescription)
      return 0;

   if (!Array.isArray(customRatings)) {
      retrieveCustomRatings(mw.config.get('wgUserName'),
         mw.config.get('wgPageName'), true); 

      if (!Array.isArray(customRatings))
         return 0;
   }

   var ratingExists =(typeof customRatings[strDescription] === "object") &&
       (customRatings[strDescription] !== null);

   if (strType == 'rating_exists')
      return ratingExists && customRatings[strDescription]['user_rating'] > 0;

   if (ratingExists) {
      switch (strType) {
         case 'user_rating':  return customRatings[strDescription]['user_rating'];
         case 'sum_rating':   return customRatings[strDescription]['sum_rating'];
         case 'count_rating': return customRatings[strDescription]['count_rating'];
         case 'avg_rating':  {
            if (!customRatings[strDescription]['count_rating'])
               return '---';
            else
               return customRatings[strDescription]['sum_rating'] /
                  customRatings[strDescription]['count_rating'];
         }
      }
   }

   return 0;
}

function setCustomRating(strDescription, fltValue, boolNoUpdate) {
   if (!strDescription)
      return 0;

   var ratingExists = getCustomRating(strDescription, 'rating_exists');
   var userRating   = getCustomRating(strDescription, 'user_rating');
   var sumRating    = getCustomRating(strDescription, 'sum_rating');
   var countRating  = getCustomRating(strDescription, 'count_rating');

   // If the old rating is the same as the new rating, we shouldn't have
   // to do anything at all.
   if (fltValue == userRating)
      return 0;

   if (!ratingExists) {
      // We hadn't rated this before, so our userRating should be zero.
      // Our rating hasn't counted toward the overall count yet, so increment
      // the count by 1 and add our new rating to the total.
      sumRating   += fltValue;
      countRating ++;
   }
   else if (!fltValue) {
      // We've just cleared our rating and we should remove it.
      // We can assume we had a rating before because if we didn't, we would
      // have exited with "if (fltValue == userRating) return 0;" above, as
      // userRating should also have been zero. So since we're clearing our
      // rating, deduct our old one from the total and decrement the count by 1.
      sumRating   -= userRating;
      countRating --;
   }
   else {
      // We've changed our existing rating to something else. We don't need
      // to do anything to the count, just deduct our old rating and add our
      // new one to the count.
      sumRating -= userRating;
      sumRating += fltValue;
   }

   if (countRating > 0)
      customRatings[strDescription] = 
         {
           'user_rating'  : fltValue,
           'sum_rating'   : sumRating,
           'count_rating' : countRating,
         };
   else
      delete customRatings[strDescription];

   if (!boolNoUpdate)
      updateCustomRatings();

   saveCustomRatings(mw.config.get('wgUserName'), mw.config.get('wgPageName'),
      strDescription, fltValue);
}

function retrieveCustomRatings(strUserName, strPageName, boolNoUpdate) {
   if (arguments.length < 3) {
      if (arguments.length < 2)
         return 0;

      boolNoUpdate = false;
   }

   var strURL = 'http://spottra.x10.mx/getratings.php';
   strURL += '?user=' + encodeURI(strUserName);
   strURL += '&page=' + encodeURI(strPageName);
   strURL += '&callback=?';

   $.ajax({
      type: 'GET',
      url: strURL,
      async: false,
      jsonpCallback: 'cb_' + Math.random().toString(36).replace(/[^a-z]+/g, ''),
      contentType: "application/json",
      dataType: 'jsonp',
      success: function(json) {
         var JSONRatings = json.rating;
         var i = 0;
         customRatings = [];

         while (JSONRatings[i]) {
            customRatings[JSONRatings[i]['description']] = 
               {
                 'user_rating'  : parseFloat(JSONRatings[i]['user_rating']),
                 'sum_rating'   : parseFloat(JSONRatings[i]['sum_rating']),
                 'count_rating' : parseFloat(JSONRatings[i]['count_rating']),
               };
            i ++;
         }

         if (!boolNoUpdate)
            updateCustomRatings(true);
      },
      error: function(e) {
         console.log('Error: ' + e.message);
      }
   });
}

function saveCustomRatings(strUserName, strPageName, strDescription, fltRating) {
   if (arguments.length < 3)
      return 0;

   var strURL = 'http://spottra.x10.mx/saverating.php';
   strURL += '?user=' + encodeURI(strUserName);
   strURL += '&page=' + encodeURI(strPageName);
   strURL += '&description=' + encodeURI(strDescription);
   strURL += '&rating=' + encodeURI(fltRating);
   strURL += '&callback=?';

   $.ajax({
      type: 'GET',
      url: strURL,
      async: true,
      jsonpCallback: 'cb_' + Math.random().toString(36).replace(/[^a-z]+/g, ''),
      contentType: "application/json",
      dataType: 'jsonp',
      error: function(e) {
         console.log('Error: ' + e.message);
      }
   });
}

function updateCustomRatings(boolDoBind) {
   var ratings = document.getElementsByClassName('rateit');
     
   for (i = 0; i < ratings.length; i ++) {
      var userRating  = getCustomRating(ratings[i].id, 'user_rating');
      var avgRating   = getCustomRating(ratings[i].id, 'avg_rating');
      var countRating = getCustomRating(ratings[i].id, 'count_rating');

      if (boolDoBind) {
         if (userRating > 0)
            $('#' + ratings[i].id).rateit('value', userRating.toFixed(1));

         $("#" + ratings[i].id).bind('rated', function(event, value) {
            if (!Array.isArray(customRatings))
               return 0;

            setCustomRating(this.id, value);
         });

         $("#" + ratings[i].id).bind('reset', function() {
            if (!Array.isArray(customRatings))
               return 0;

            setCustomRating(this.id, 0);
         });
      }

      var div  = document.getElementById('div-'  + ratings[i].id);
      var span = document.getElementById('span-' + ratings[i].id);
      var sort = document.getElementById('sort-' + ratings[i].id);

      if (div)
         div.innerHTML = (countRating ? avgRating.toFixed(3) : '---');

      if (span)
         span.innerHTML = (userRating > 0 ? 'Rated' : 'Rate this!');

      if (sort)
         sort.innerHTML = avgRating.toFixed(3);
   }
}