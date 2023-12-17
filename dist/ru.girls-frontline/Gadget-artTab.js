function switchVariant(artTabDivElement, variant) {
  var artTabDiv = $(artTabDivElement);
  artTabDiv.find('.artTabLinks').removeClass('active');
  artTabDiv.attr('data-tdoll-variant', variant);

  refreshView(artTabDiv);
  
  // Set "active" at the end
  artTabDiv.find(".artTabLinks[data-tdoll-variant='" + variant + "']").addClass('active');
}

function refreshView(artTabDiv) {
  var tdoll = $(artTabDiv).data('tdollId');
  var costume = $(artTabDiv).attr('data-tdoll-costume');
  var variant = $(artTabDiv).attr('data-tdoll-variant'); // why not data though?
  
  $(artTabDiv).find('.artTabContent .fullart').hide();
  
  var live2dActive = $(artTabDiv).find('.live2dstage').is(':visible');
  
  $(artTabDiv).addClass("loading");
  
  if (live2dActive) {
    createLive2dView(artTabDiv, function(view) {
      view.show();
      var stage = view.data('live2dStage');
      stage.removeChildren();
      
      var anythingFailedHandler = function(x,y,z) {
          view.closest(".artTab").removeClass("loading");
          console.log("Failed loading Live2D", x, y, z);
      };
      
      var loadLive2DgirlSuccessHandler = function(live2dData) {
          view.closest(".artTab").removeClass("loading");
          stage.addChild(live2dData);
      };

      var loadLive2DsuccessHandler = function() {
          gfUtils.live2dUtils.loadLive2dGirl($(artTabDiv), tdoll, costume, variant, loadLive2DgirlSuccessHandler, anythingFailedHandler);
      };
      
      mw.loader.using('ext.gadget.live2dAnimation').then(loadLive2DsuccessHandler, anythingFailedHandler);
    });
  } else {
    $(artTabDiv).find(".fullart[data-variant='" + variant + "']").show();
    $(artTabDiv).removeClass("loading");
  }
}

function create_url(base, file) {
  return base + window.gfUtils.createWikiPathPart(file) + file;
}

function curl(file) {
  return create_url("../images/", file);
}

function createLive2dSprite(model) {
  // Live 2D Sprite
  var l2d_tdoll_sprite = new PIXI.Live2DSprite(model, {
    debugLog: false,
    randomMotion: false,
    eyeBlink: true
  });
  l2d_tdoll_sprite.startRandomMotion('idle');
  l2d_tdoll_sprite.on('mousemove', function(evt) {
    const point = evt.data.global;
    l2d_tdoll_sprite.setViewPoint(point.x, point.y);
  });
  l2d_tdoll_sprite.on('click', function(evt) {
    const point = evt.data.global;
    if (l2d_tdoll_sprite.hitTest('body', point.x, point.y)) {
      l2d_tdoll_sprite.startRandomMotionOnce('tap_figure');
      // Info: Maybe add individual hit tests?
    } else {
      l2d_tdoll_sprite.startRandomMotionOnce('tap_figure');
    }
  });
  
  return l2d_tdoll_sprite;
}

function doesLive2dAnimationExist(artTabDiv, costume) {
  var costumeId = costume;
  if (costumeId[0] === '_') {
    costumeId = costumeId.substr(1);
  }
  if (costume == "") {
    costumeId = "costume0";
  }
  
  return $(artTabDiv).attr("data-live2d-exist-" + costumeId) == "true";
}

function hideLive2dView(artTabDiv) {
  var live2dView = $(artTabDiv).find('.live2dstage');
  live2dView.hide();
  var stage = live2dView.data('live2dStage');
  if (stage) {
    stage.removeChildren();
  }

  refreshView(artTabDiv);
}

function createLive2dView(artTabDiv, callback) {
  var live2dView = $(artTabDiv).find('.live2dstage');
  
  if (live2dView.length < 1) {
    mw.loader.using('ext.gadget.live2d').then( function () {
	// Init renderer
	const l2d_tdoll_renderer = PIXI.autoDetectRenderer(550, 550, {transparent: true});
	const l2d_tdoll_stage = new PIXI.Container();

	// Start the animation
	function animate() {
		requestAnimationFrame(animate);
		l2d_tdoll_renderer.render(l2d_tdoll_stage);
	}
	animate();

        var view = $(l2d_tdoll_renderer.view);
        view.data('live2dStage', l2d_tdoll_stage);
        view.addClass('live2dstage');
        view.data('renderer', l2d_tdoll_renderer);

        callback(view);
    });
  } else {
    callback(live2dView.first());
  }
}

function modelChanged(event, costumeSuffix) {
  var artTabDiv = $(event.target).closest('.artTab');
  var tdollId = artTabDiv.data('tdollId');
  var artModelId = tdollId + costumeSuffix;
  var variantswitcher = artTabDiv.find('.variantswitcher');
  
  var costumeId = costumeSuffix;
  if (costumeId[0] === '_') {
    costumeId = costumeId.substr(1);
  }
  artTabDiv.attr('data-tdoll-costume', costumeId);
  
  hideLive2dView(artTabDiv);
  artTabDiv.find('.artTabLive2dSwitch').remove();
  
  var basePath = mw.config.get("wgServer") + "/images/";
  var cpp = window.gfUtils.createWikiPathPart;
  var fullartPath = basePath + "thumb/" + cpp(artModelId +".png") + artModelId +".png/600px-" + artModelId +".png";
  var fullartDamagedPath = basePath + "thumb/" + cpp(artModelId +"_D.png") + artModelId +"_D.png/600px-" + artModelId +"_D.png";
    
  var normArt = artTabDiv.find(".fullart:not(.damaged) a");
  normArt.attr("href", "/wiki/File:" + artModelId + ".png");
  normArt.find('img').attr("src", fullartPath );
  normArt.find('img').attr("srcset", fullartPath );
  normArt.find('img').attr("alt", fullartPath );

  var damagedArt = artTabDiv.find(".fullart.damaged a");
  damagedArt.attr("href", "/wiki/File:" + artModelId + "_D.png");
  damagedArt.find('img').attr("src", fullartDamagedPath );
  damagedArt.find('img').attr("srcset", fullartDamagedPath );
  damagedArt.find('img').attr("alt", fullartDamagedPath );

  var isLive2dPossible = doesLive2dAnimationExist(artTabDiv, costumeSuffix);
  if (isLive2dPossible) {
    var live2dButtonHandler = function() {
      if (live2dButton.is('.enabled')) {
        hideLive2dView($(artTabDiv));
        live2dButton.removeClass('enabled');
      } else {
        $(artTabDiv).addClass("loading");
        createLive2dView(artTabDiv, function(view) {
          view.show();
          $(artTabDiv).find('.artTabContent').first().append(view);
          refreshView(artTabDiv);
        });
        live2dButton.addClass('enabled');
      }
    };
    var live2dButton = gfUtils.createSliderButton("http://en.gfwiki.com/images/a/a3/live2d-logo.png", live2dButtonHandler);
    live2dButton.addClass('artTabLive2dSwitch');
    artTabDiv.append(live2dButton);
  }
  
  refreshView(artTabDiv);
}

RLQ.push(['jquery', function () {
  $(document).ready(function() {
    var artTabDiv = $('.artTab');
    artTabDiv.on('costume_changed', modelChanged);

    var buttonEventHandler = function(event) {
      var currentElement = $(event.target);
      var currentArtTab = currentElement.closest('.artTab');
      var variant = currentElement.data('tdollVariant');
      switchVariant(currentArtTab, variant);
    };
  
    var normalButton = $('<button></button>');
    normalButton.addClass('artTabLinks');
    normalButton.click(buttonEventHandler);
    normalButton.attr('data-tdoll-variant', "");
    normalButton.text("Normal");

    var damagedButton = $('<button></button>');
    damagedButton.addClass('artTabLinks');
    damagedButton.click(buttonEventHandler);
    damagedButton.attr('data-tdoll-variant', "D");
    damagedButton.text("Damaged");
  
    var variantswitcher = $('<div></div>');
    variantswitcher.addClass('variantswitcher');
    variantswitcher.append(normalButton);
    variantswitcher.append(damagedButton);
    
    artTabDiv.prepend(variantswitcher);

    normalButton.click();
  });
}]);