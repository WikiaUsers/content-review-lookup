/*
 *
 * @module        SectionURLOnScroll.js
 * @description   Updates the adress bar by appending the current section's ID
                  when scrolling into it. It helps in case the user unexpectedly
                  leaves the page by restoring their position to the last
                  section they were in. It's specially useful in (older)
                  browsers where scrollRestoration is not a thing.
 * @author        Polymeric
 * @license       CC-BY-SA 3.0
 *
 */

$(function () {
  if (window.sectionScrollURLLoaded) {
    return;
  }
  
  window.sectionScrollURLLoaded = true;

  // Get all query string params.
  // Source: https://gomakethings.com/how-to-get-all-of-the-query-string-parameters-from-a-url-with-vanilla-js/
  function getParams () {

    var params = {};
    
    new URL(window.location).searchParams.forEach(function (val, key) {
      if (params[key] !== undefined) {
        if (!Array.isArray(params[key])) {
          params[key] = [params[key]];
        }
        params[key].push(val);
      } else {
        params[key] = val;
      }
    });

    return params;
  }

  // Convert object output from the getParams function into a string that
  // matches the URL query format.
  var params = JSON.stringify(getParams()).replace(/"/, '?').replace(/[{}"]/g, '').replace(/:/g, '=').replace(/,/g, '&');
  
  $(document).scroll(function () {
    $('.mw-headline').each(function () {
      var top = window.pageYOffset;
      var distance = top - $(this).offset().top;
      var firstSectionDistance = top - $('.mw-headline').first().offset().top;
      var hash = $(this).attr('id');

      if (firstSectionDistance < -36) {
      	// Updates hash to be empty while also preventing automatic scrolling to
      	// the top of the page.
      	var scrollmem = $('html, body').scrollTop();
		window.location.hash = '';
		$('html, body').scrollTop(scrollmem);
      } else if (firstSectionDistance > -36 && distance < 36 && distance > -36 && currentHash !== hash) {
        var currentHash = hash;

        // Update adress bar with the current section's ID and query parameters.
        history.replaceState('', document.title, window.location.pathname + '#' + hash + params);
      }
    });
  });
});