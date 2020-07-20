function timeStamp_CustomRatings_js() {
  return "2013.11.21 18:31 (UTC-8)";
}

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