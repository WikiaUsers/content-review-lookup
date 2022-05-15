if (mw.config.get('wgCanonicalNamespace') == 'Map')
{
  (function($)
  {
    $.event.special.DOMNodeChanged = {
      m: {
        observer: function(){}
      },
  	  setup: function()
      {
        var sel = this,
        MutationRecord = [],
        observer = new MutationObserver(function(list)
        {
          var evt = new CustomEvent('MutationObserver', {detail: list});
          MutationRecord[0] = evt;
          sel.dispatchEvent(evt);
        });
        $.event.special.DOMNodeChanged.m.observer = observer;
        observer.observe(sel, {attributes: false, childList: true, subtree: true});
  	    $(this).on('MutationObserver', MutationRecord, $.event.special.DOMNodeChanged.handler);
  	  },
  	  teardown: function()
      {
        var observer = $.event.special.DOMNodeChanged.m.observer;
        observer.disconnect();
  	    $(this).off('MutationObserver');
  	  },
      handler: function(e)
      {
        var evt = $.Event(e.data[0], {
          cancelBubble: false,
          type: "DOMNodeChanged",
          view: window
        });
        $(this).trigger(evt);
      }
    };
  })(jQuery);
  $(function()
  {
  	//v = variables, m = method
  	const v = {
  	  static: {
  	  	popupTitle: '.leaflet-popup .leaflet-popup-content-wrapper [class^="MarkerPopup-module_popupTitle"]',
  	  	popupLink: '.leaflet-popup .leaflet-popup-content-wrapper a',
  	  	infoboxImage: '.leaflet-popup .leaflet-popup-content-wrapper figure.pi-item.pi-image[data-result="success"]',
  	  	DatExpSrc: new RegExp(/^(\S*\/)\d*(\?\S*)$/),
  	  	time: 200
  	  },
  	  dynamic: {
  	    title: '',
  	    lastTitle: '',
  	    href: '',
  	    lastHref: '',
  	    ibxImgMainLink: '',
  	    ibxImgMatchLinkFull: '',
  	    ibxImgMatchLinkStart: '',
  	    ibxImgMatchLinkEnd: '',
  	    ibxImgDataImageName: '',
  	    ibxImgDataImageKey: '',
  	    ibxImgMatchLinkArr: [],
  	    timerId: null
  	  },
  	  $: {
  	  	popupLink: $(),
  	  	infoboxImage: $(),
  	  	fullImageLink: $(),
  	  	imgLinkChild: $(),
  	  	imgLinkChildImg: $()
  	  }
  	};
  	const m = {
  	  createInfoboxImage: function()
  	  {
  	  	v.$.imgLinkChild = v.$.fullImageLink.children('a');
  	  	v.$.imgLinkChildImg = v.$.imgLinkChild.find('img');
  	  	v.dynamic.ibxImgMainLink = v.$.imgLinkChild.attr('href');
  	  	v.dynamic.ibxImgMatchLinkFull = v.$.imgLinkChildImg.attr('src');
  	  	v.dynamic.ibxImgDataImageName = v.$.imgLinkChildImg.attr('data-image-name');
  	  	v.dynamic.ibxImgDataImageKey = v.$.imgLinkChildImg.attr('data-image-key');
  	  	v.dynamic.ibxImgMatchLinkArr = v.dynamic.ibxImgMatchLinkFull.match(v.static.DatExpSrc);
  	  	v.dynamic.ibxImgMatchLinkStart = v.dynamic.ibxImgMatchLinkArr[1];
  	  	v.dynamic.ibxImgMatchLinkEnd = v.dynamic.ibxImgMatchLinkArr[2];
  	    return [
  	      v.dynamic.ibxImgMainLink,
  	      v.dynamic.ibxImgMatchLinkFull,
  	      v.dynamic.ibxImgMatchLinkStart,
  	      v.dynamic.ibxImgMatchLinkEnd,
  	      v.dynamic.ibxImgDataImageName,
  	      v.dynamic.ibxImgDataImageKey
  	    ];
  	  },
  	  mainLogic: function()
  	  {
  	  	v.$.infoboxImage = $(v.static.infoboxImage);
  	  	if (v.$.infoboxImage.length == 0)
  	  	{
          v.$.popupLink = $(v.static.popupLink);
          v.$.popupLink.parent().load(v.dynamic.lastHref+" .fullMedia a", function(html)
          {
          	v.$.fullImageLink = $(html).find('.fullImageLink');
            console.log(m.createInfoboxImage());
          });
  	  	}
  	  }
  	};
    $('.leaflet-popup-pane').on('DOMNodeChanged', function(e)
    {
      if (e.detail[0].removedNodes.length == 0)
      {
      	//console.log(e.detail);
      	v.dynamic.title = $(v.static.popupTitle).text();
        v.dynamic.href = $(v.static.popupLink).attr('href');
        if (v.dynamic.lastHref != v.dynamic.href)
        {
          if (v.dynamic.lastTitle != v.dynamic.title)
          {
          	v.dynamic.lastTitle = v.dynamic.title;
            v.dynamic.lastHref = v.dynamic.href;
            m.mainLogic();
          }
        } else
          {
            v.dynamic.timerId = setTimeout(function tick()
            {
              v.dynamic.title = $(v.static.popupTitle).text();
              v.dynamic.href = $(v.static.popupLink).attr('href');
              if (v.dynamic.lastTitle != v.dynamic.title)
              {
                if (v.dynamic.lastHref != v.dynamic.href)
                {
                  clearTimeout(v.dynamic.timerId);
                  v.dynamic.lastTitle = v.dynamic.title;
                  v.dynamic.lastHref = v.dynamic.href;
                  m.mainLogic();
                } else
                  {
                    v.dynamic.timerId = setTimeout(tick, v.static.time);
                  }
              } else
                {
                  m.mainLogic();
                }
            }, v.static.time);
          }
      }
    });
  });
}