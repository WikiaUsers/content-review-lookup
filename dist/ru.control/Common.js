if ($('.interactive-maps-container').length != 0)
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
  //Interactive Maps 2.0 beta v0.0.101
  $(function()
  {
  	//v = variables
  	const v = {
  	  static: {
  	  	srchPopup: {
  	  	  popupTitle: '.leaflet-popup .leaflet-popup-content-wrapper [class^="MarkerPopup-module_popupTitle"]',
  	  	  popupLink: '.leaflet-popup .leaflet-popup-content-wrapper a',
  	  	  infoboxImage: '.leaflet-popup .leaflet-popup-content-wrapper figure.pi-item.pi-image[data-result="success"]',
  	  	  time: 200
  	  	},
  	  	mainLogic: {
  	  	  popupLink: undefined //property is defined after initialization
  	  	},
  	  	ibxImg: {
  	  	  datExpSrc: new RegExp(/^(\S*\/)\d*(\?\S*)$/)
  	  	}
  	  },
  	  dynamic: {
  	  	srchPopup: {
  	      title: '',
  	      lastTitle: '',
  	      href: '',
  	      lastHref: '',
  	      timerId: null
  	  	},
  	  	mainLogic: {
  	  	  srchPopupProxy: {} //property is defined after initialization
  	  	},
  	  	ibxImg: {
  	  	  mainLink: '',
  	  	  matchLinkFull: '',
  	  	  dataImageName: '',
  	  	  dataImageKey: '',
  	  	  matchLinkArr: []
  	  	}
  	  },
  	  $: {
  	  	srchPopup: {
  	  	  infoboxImage: $()
  	  	},
  	  	mainLogic: {
  	  	  popupLink: $(),
  	  	  fullImageLink: $()
  	  	},
  	  	ibxImg: {
  	  	  divImgChild: $(),
  	  	  divImgChildImg: $()
  	  	}
  	  }
  	};
  	/**[Properties defined after initialization]**/
  	/********************[Start]******************/
  	v.static.mainLogic.popupLink = v.static.srchPopup.popupLink;
  	v.dynamic.mainLogic.srchPopupProxy = new Proxy(v.dynamic.srchPopup, {});
  	/********************[End]********************/
  	//m = method
  	const m = {
  	  createInfoboxImage: function(divImg)
  	  {
  	  	v.$.ibxImg.divImgChild = divImg.children('a');
  	  	v.$.ibxImg.divImgChildImg = v.$.ibxImg.divImgChild.find('img');
  	  	v.dynamic.ibxImg.mainLink = v.$.ibxImg.divImgChild.attr('href');
  	  	v.dynamic.ibxImg.matchLinkFull = v.$.ibxImg.divImgChildImg.attr('src');
  	  	v.dynamic.ibxImg.dataImageName = v.$.ibxImg.divImgChildImg.attr('data-image-name');
  	  	v.dynamic.ibxImg.dataImageKey = v.$.ibxImg.divImgChildImg.attr('data-image-key');
  	  	v.dynamic.ibxImg.matchLinkArr = v.dynamic.ibxImg.matchLinkFull.match(v.static.ibxImg.datExpSrc);
  	    return ('<figure class="pi-item pi-image" data-source="Изображение" data-result="success"><a href="'+v.dynamic.ibxImg.mainLink+'" class="image image-thumbnail" title="" style="outline: none;"><img src="'+v.dynamic.ibxImg.matchLinkArr[1]+'320'+v.dynamic.ibxImg.matchLinkArr[2]+'" srcset="'+v.dynamic.ibxImg.matchLinkArr[1]+'320'+v.dynamic.ibxImg.matchLinkArr[2]+' 1x, '+v.dynamic.ibxImg.matchLinkArr[1]+'640'+v.dynamic.ibxImg.matchLinkArr[2]+' 2x" class="pi-image-thumbnail" alt="" width="265" height="145" data-image-key="'+v.dynamic.ibxImg.dataImageKey+'" data-image-name="'+v.dynamic.ibxImg.dataImageName+'"></a></figure>');
  	  },
  	  mainLogic: function()
  	  {
        v.$.mainLogic.popupLink = $(v.static.mainLogic.popupLink);
        v.$.mainLogic.popupLink.parent().load(v.dynamic.mainLogic.srchPopupProxy.lastHref+" .fullMedia a", function(html)
        {
          v.$.mainLogic.fullImageLink = $(html).find('.fullImageLink');
          v.$.mainLogic.popupLink = $(v.static.mainLogic.popupLink);
          v.$.mainLogic.popupLink.parent().html(m.createInfoboxImage(v.$.mainLogic.fullImageLink));
        });
  	  }
  	};
    $('.leaflet-popup-pane').on('DOMNodeChanged', function(e)
    {
      if (e.detail[0].removedNodes.length == 0)
      {
      	v.dynamic.srchPopup.title = $(v.static.srchPopup.popupTitle).text();
        v.dynamic.srchPopup.href = $(v.static.srchPopup.popupLink).attr('href');
        if (v.dynamic.srchPopup.lastHref != v.dynamic.srchPopup.href)
        {
          if (v.dynamic.srchPopup.lastTitle != v.dynamic.srchPopup.title)
          {
          	v.dynamic.srchPopup.lastTitle = v.dynamic.srchPopup.title;
            v.dynamic.srchPopup.lastHref = v.dynamic.srchPopup.href;
  	  	    if ($(v.static.srchPopup.popupLink+':not(.image-thumbnail)').length != 0)
            {
              v.$.srchPopup.infoboxImage = $(v.static.srchPopup.infoboxImage);
              if (v.$.srchPopup.infoboxImage.length != 0)
              {
                v.dynamic.srchPopup.timerId = setTimeout(function tick()
                {
                  v.$.srchPopup.infoboxImage = $(v.static.srchPopup.infoboxImage);
                  if (v.$.srchPopup.infoboxImage.length == 0)
                  {
                    clearTimeout(v.dynamic.srchPopup.timerId);
                    v.dynamic.srchPopup.lastHref = $(v.static.srchPopup.popupLink).attr('href');
                    m.mainLogic();
                  } else
                    {
                      v.dynamic.srchPopup.timerId = setTimeout(tick, v.static.srchPopup.time);
                    }
                }, v.static.srchPopup.time);
              } else
  	  	        {
  	  	          m.mainLogic();
  	  	        }
            }
          }
        } else
          {
          	if ($(v.static.srchPopup.popupLink+':not(.image-thumbnail)').length != 0)
          	{
              v.dynamic.srchPopup.timerId = setTimeout(function tick()
              {
                v.dynamic.srchPopup.title = $(v.static.srchPopup.popupTitle).text();
                v.dynamic.srchPopup.href = $(v.static.srchPopup.popupLink).attr('href');
                if (v.dynamic.srchPopup.lastTitle != v.dynamic.srchPopup.title)
                {
                  if (v.dynamic.srchPopup.lastHref != v.dynamic.srchPopup.href)
                  {
                    clearTimeout(v.dynamic.srchPopup.timerId);
                    v.dynamic.srchPopup.lastTitle = v.dynamic.srchPopup.title;
                    v.dynamic.srchPopup.lastHref = v.dynamic.srchPopup.href;
                    m.mainLogic();
                  } else
                    {
                      v.dynamic.srchPopup.timerId = setTimeout(tick, v.static.srchPopup.time);
                    }
                } else
                  {
                    m.mainLogic();
                  }
              }, v.static.srchPopup.time);
          	}
          }
      }
    });
  });
}