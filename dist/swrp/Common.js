/* Any JavaScript here will be loaded for all users on every page load. */
switch (mw.config.get('wgPageName')) {
  case 'Template:Destination/Draft':
  case 'SWRP_Destination_Guide':
    $(function () {
      let is_secondlife = false;
      let str_useragent = navigator.userAgent;
      /* Check application reports as Second Life */
      if (str_useragent.includes('SecondLife') === true) {
        is_secondlife = true;
      } else {
        /* Check URL for debug parameter */
        let sp = new URLSearchParams(window.location.search);
        if (sp.has('swrp-slviewer') === true) {
          if (sp.get('swrp-slviewer') === '1') {
            is_secondlife = true;
          }
        }
      }
      if (is_secondlife === true) {
        /* Add class to body tag for CSS */
        $('body.mediawiki').addClass('swrp-ua-slviewer');
        /* Change Second Life map links in Template:Destination to use Second Life protocol instead */
        $('.swrp-dg-teleport a.external').each(function(index) {
          let str_url = $(this).attr('href');
          let teleport_link = str_url.replace(/^https?:\/\/maps.secondlife.com\/secondlife\//i, 'secondlife://');
          $(this).attr('href', teleport_link).html('Teleport');
        });
      }
    });
    break;
}