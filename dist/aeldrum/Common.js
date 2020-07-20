$(function() {

  /********************
   * HELPER FUNCTIONS *
   ********************/

  /**
   * This function should be attached to a mouseenter event on a link inside
   * an article's body (don't attach to redlinks). If that link is not an edit
   * link, this will get a preview of that page and display it in a JQuery UI
   * tooltip.
   * 
   * @param {Event} e The event that triggered this function.
   * @returns {undefined}
   */
  function hoverLinkIn(e) {
    var link = getLink(e);
    if (!link || link.includes('action=edit') || link.includes('Special:')) {
        return;
    }
 
    // We've retrieved this before.
    var key = getKeyFromLink(link);
    if (sessionStorage[key] !== undefined
      && sessionStorage[key] !== 'undefined'
      && sessionStorage[key] !== 'start'
      && sessionStorage[key] !== 'stop') {
      return setMouseoverText(e, sessionStorage[key]);
    }
 
    // Remove an existing title so that it doesn't show up while we wait
    e.currentTarget.removeAttribute('title');
 
    // hoverLinkOut will mark this as stopped if user mouses out
    sessionStorage[key] = 'start';
 
    // Wait half a second before making request. This is to make sure that
    // the user didn't just happen to move over this link while moving
    // the mouse across the page and help cut down on the number of requests.
    sleep(500)
      .then(function() {
        if (sessionStorage[key] !== 'start') { return; }
 
        return new Promise(function(resolve, reject) {
          $.ajax({
            url      : link,
            dataType : 'html',
            success  : function (data) {
              // We don't simply want the first child, as that can be a Stub
              // message or a For message. In most cases, we can simply target
              // the selflink and pull out its container.
              var firstParagraph;
              // Section provided?
              if (link.includes('#')) {
                var sectionId = link.slice(link.indexOf('#'));
                sectionId = sectionId.replace(/\./g, '\\.');
                firstParagraph = $(data).find(sectionId);
                if (firstParagraph) {
                  // Handle citation links
                  if (sectionId.includes('cite_note')){
                    firstParagraph = firstParagraph.parent().first('span')[0];
                  }
                  // Non-citation
                  else {
                    firstParagraph = firstParagraph.parent().next('p:not(.caption)')[0];
                  }
                }
              }
              // No section, go for text at top
              if (firstParagraph === undefined) {
                firstParagraph = $($(data).find('.selflink')[0]).closest('p')[0];
                if (!firstParagraph) { resolve('Failed to get preview.'); }
              }
 
              // Get paragraph without html tags.
              var firstLine = ((firstParagraph.textContent === undefined)
                ? firstParagraph.innerText
                : firstParagraph.textContent);
              // Failed to extract
              if (!firstLine) { return resolve('Failed to get preview.'); }
 
              // Limit to either first sentence or first 280 characters
              // 280 chosen arbitrarily, as twitter's character limit
              var firstSentence = getEndOfLineIndex(firstLine);
              if (firstSentence > -1) {
                firstLine = firstLine.slice(0, firstSentence + 1);
              }
              if (firstLine.length > 280) {
                firstLine = firstLine.slice(0, 280) + '...';
              }
 
              resolve(firstLine);
             },
             error : function () { resolve('Failed to get preview.'); }
           });
        });
      })
      .then(function(previewText) {
        sessionStorage[key] = previewText;
        setMouseoverText(e, previewText);
      });
  }

  /**
   * This function should be attached to a mouseleave event on a link inside
   * an article's body (don't attach to redlinks). If that link is not an edit
   * link and it has started but not concluded fetching a preview, this will
   * create a message to terminate the request.
   * 
   * @param {Event} e The event that triggered this function.
   * @returns {undefined}
   */
  function hoverLinkOut(e) {
    var link = getLink(e);
    if (!link || link.includes('action=edit')) { return; }
 
    var key = getKeyFromLink(link);
    if (sessionStorage[key] !== 'start') { return; }
 
    sessionStorage[key] = 'stop';
  }

  /**
   * This function is used to create a tooltip for the target of the
   * provided event. Nothing will happen if the tooltip is already set
   * to the provided text.
   * 
   * @param {Event} e An event containing a currentTarget.
   * @param {String} previewText The text to set the tooltip to.
   * @returns {undefined}
   */
  function setMouseoverText(e, previewText) {
    if (!e || !previewText || previewText === '') { return; }
 
    // Skip if it has already been set
    if (e.currentTarget.getAttribute('title') === previewText) { return; }
 
    e.currentTarget.setAttribute('title', previewText);
    $(e.currentTarget).tooltip({content: previewText, items: 'input'});
    $(e.currentTarget).mouseover();
  }

  /**
   * This function extracts the link from the provided event's target.
   * 
   * @param {Event} e The event to extract from. Should target an <a> tag.
   * @returns {String} The link of the <a> tag this event points to, the
   * empty string, or "undefined".
   */
  function getLink(e) {
    if (!e) { return ''; }
 
    var currentTarget = e.currentTarget;
    if (!currentTarget) { return ''; }
 
    return currentTarget.getAttribute('href').toString();
  }

  function getKeyFromLink(link) {
    if (!link || link === '') { return ''; }
    
    // Citations are not unique
    if (link.indexOf('#cite_note') === 0) {
      return wgPageName + link;
    }
      
    return link;
  }

  /**
   * Figure out where a given text ends its first sentence. It is necessary
   * for this to be a function because RegExp objects don't support
   * negative lookbehinds.
   * 
   * @param {String} str The text to extract the first sentence from.
   * @returns {number} The index of the end of the first sentence, or -1.
   */
  function getEndOfLineIndex(str) {
    if (!str) { return -1; }
    
    // Start at fourth character since sentence should never end at i=2
    for (var i = 3; i < str.length - 1; ++i) {
      if (str.slice(i, i + 1) !== '.') { continue; }

      // Don't stop at titles
      var lastTwo = str.slice(i - 2, i).toLowerCase();
      var lastThree = str.slice(i - 3, i).toLowerCase();
      if (lastTwo === "dr" || lastTwo === "jr" || lastTwo === "mr"
        || lastTwo === "ms" || lastThree === "cpt" || lastThree === "mrs"
        || lastThree === "pvt" || lastThree === "sgt")
      {
        continue;
      }
      
      // Make sure this isn't an initialism
      if (lastTwo.slice(0, 1) === '.') { continue; }
      var nextChar = str.slice(i + 1, i + 2);
      if (nextChar === ' ') {
        return i;
      }
    }
    
    return str.length - 1;
  }

  /**
   * JS does not have a sleep function, so this waits the given amount
   * of time before continuing with a Promise.
   * 
   * @param {number} ms The number of milliseconds to wait.
   * @returns {Promise} A Promise that will resolve after `ms` milliseconds.
   */
  function sleep(ms) {
    return new Promise(function(resolve){ setTimeout(resolve, ms); });
  }


  /****************
   * MAIN SECTION *
   ****************/
 
  // This selects links in the article body that aren't redlinks
  $('#mw-content-text a').not('.new').hover(hoverLinkIn, hoverLinkOut);
});

/*** Date tooltip becomes JQuery tooltip ***/
$(function() { 
  $(".date-tooltip").each(function() {
    $(this).tooltip();
  });
});