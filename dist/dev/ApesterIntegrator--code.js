// Apester Polls (based on VideoIntegrator script by [[User:Deadcoder]])
// Updated by HumansCanWinElves - December 28, 2020

(function(window, $, mw) {
    // Double-run prevention
    if (window.apesterIntegrator) { return; }
    window.apesterIntegrator = { loaded: true };
    
    var spans = document.getElementsByTagName("span");
    for (var index = 0; index < spans.length; index++) {
        if (spans[index].classList.contains("Apester") 
        &&  spans[index].getAttribute("data-widget-id") ) {
            spans[index].innerHTML = '<div class="apester-media" data-media-id="' 
          + mw.html.escape(encodeURIComponent(spans[index]
              .getAttribute("data-widget-id"))) 
          + '" height="' 
          + (spans[index].getAttribute("data-widget-height") ? 
              mw.html.escape(spans[index].getAttribute("data-widget-height")) : '405') 
          + '"></div>';
        }
    }

    const apesterScript = document.createElement('script');
    apesterScript.setAttribute('src',
        'https://static.apester.com/js/sdk/latest/apester-sdk.js');
    apesterScript.async = true;
    document.head.appendChild(apesterScript);
   
}) (this, jQuery, mediaWiki);