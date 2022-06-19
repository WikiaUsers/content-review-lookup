if ($('.interactive-maps-container').length != 0)
{
  (function($)
  {
    var m = {
      isjQueryEvent: function(elem, event, fun)
      {
        var events = $._data(elem, "events");
        return !!events && !!(events = events[event]) && (!fun || events.some(function(data)
        {
           return data.handler == fun;
        }));
      }
    };
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
      add: function(arg)
      {
        if (arg.selector != undefined)
        {
          var $th = $(this),
          evt = 'DOMNodeChanged',
          target = arg.selector,
          fn = arg.handler,
          timerId = setTimeout(function tick()
          {
            var thFlt = $th.filter(function(i,e){return m.isjQueryEvent(e, evt, fn);});
            if (thFlt.length != 0)
            {
              clearTimeout(timerId);
              $th.off(evt, fn);
            } else
              {
                timerId = setTimeout(tick, 200);
              }
          }, 200);
          $th.on(evt, function(x)
          {
            if (x.detail[0].addedNodes.length != 0 && $(target).parents().length != 0)
            {
              var tgt = $th.find(target);
              if (tgt.length != 0)
              {
                var fltTgt = tgt.filter(function(i,e){return !m.isjQueryEvent(e, evt, fn);});
                if (fltTgt.length != 0) fltTgt.on(evt, fn);
              }
            }
          });
        }
      },
      teardown: function()
      {
        var observer = $.event.special.DOMNodeChanged.m.observer;
        observer.disconnect();
        $(this).off('MutationObserver', $.event.special.DOMNodeChanged.handler);
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
  //Interactive Maps 2.0 beta v0.0.158
  //PatchNotes: https://control.fandom.com/ru/wiki/Шаблон:Interactive-Maps-2.0/PatchNotes
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
    $('.interactive-maps-container').on('DOMNodeChanged', '.leaflet-popup-pane', function(e)
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
if (mw.config.get('wgPageName') == 'Шаблон:Interactive-Maps-2.0/PatchNotes')
{
  //PatchNotes
  $(function()
  {
  	//v = variables
    const v = {
      static: {
        ul: '.patch-notes-parent',
        li: '.patch-notes-parent > .patch-notes-item',
        curTime: '' //property is defined after initialization
      },
      dynamic: {
        patchTime: ''
      },
      $: {
        li: $(),
        span: $()
      }
    };
    /**[Properties defined after initialization]**/
    /********************[Start]******************/
    v.static.curTime = $(v.static.ul).attr('data-current-time');
    v.$.li = $(v.static.li).has('span[data-patch-time]');
    /********************[End]********************/
    //m = method
    const m = {
      year: function(date)
      {
      	var d = new Date(date);
        return d.getFullYear();
      },
      tmst: function(date)
      {
      	var d = new Date(date);
        return d.getTime();
      },
      gmcase: function(number, words)
      {
        return words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? Math.abs(number) % 10 : 5]];
      },
      timeDifference: function(firstDate, secondDate)
      {
        var yearStart = m.year(firstDate),
        yearEnd = m.year(secondDate);
        if (yearStart == yearEnd)
        {
          var tmstStart = m.tmst(firstDate),
          tmstEnd = m.tmst(secondDate),
          hourDiff = (tmstEnd - tmstStart),
          minutes = Math.abs(hourDiff/60/1000),
          hours = Math.floor(hourDiff/3600/1000),
          days = Math.round(hours/24);
          if (hours >= 24)
          {
            return days+' '+m.gmcase(days, ['день', 'дня', 'дней']);
          } else if (hours > 0)
            {
              return hours+' '+m.gmcase(hours, ['час', 'часа', 'часов']);
            } else
              {
                return minutes+' '+m.gmcase(minutes, ['минута', 'минуты', 'минут']);
              }
        } else
          {
            var years = (yearEnd - yearStart);
            return years+' '+m.gmcase(years, ['год', 'года', 'лет']);
          }
      }
    };
    v.$.li.each(function(i, elm)
    {
      v.$.span = $(elm).find('.patch-time-passed');
      v.dynamic.patchTime = Number(v.$.span.attr('data-patch-time'));
      v.$.span.text(m.timeDifference(v.dynamic.patchTime, v.static.curTime));
    });
  });
}