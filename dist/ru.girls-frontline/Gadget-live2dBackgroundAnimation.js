function getFilePath(name) {
  return "/images/" + window.gfUtils.createWikiPathPart(name) + name;
}

function modelChanged(containerDiv, finishedCallback) {
  try {
    var successCallback = function(l2d_tdoll_sprite) {
      var viewCanvas = containerDiv.find('.live2dstage').first();
      var l2d_tdoll_stage = viewCanvas.data('live2dStage');
      l2d_tdoll_stage.removeChildren();
      l2d_tdoll_stage.addChild(l2d_tdoll_sprite);
      
      l2d_tdoll_sprite.on('mousemove', function(evt) {
    const point = evt.data.global;
    l2d_tdoll_sprite.setViewPoint(0, 0);
	
	var view = $(l2d_tdoll_sprite.canvas);
	var offset = view.offset();
	
	var x = view.width() - point.x;
	if (x <= 0) x = 0;
	if (x >= view.width()) x = view.width();
	x = (x / view.width() * 60.0 - 30.0) * -1;
	
	var y = view.height() - point.y;
	if (y <= 0) y = 0;
	if (y >= view.height()) y = view.height();
	y = (y / view.height() * 60.0 - 30.0) * 1;
	
	
	l2d_tdoll_sprite.model.live2DModel.setParamFloat("PARAM_BGANGLE_X", x);
	l2d_tdoll_sprite.model.live2DModel.setParamFloat("PARAM_BGANGLE_Y", y);
	l2d_tdoll_sprite.model.live2DModel.saveParam();
  });
      
      finishedCallback();
    };
  
    var failureCallback = function(err) {
      console.log("Error loading model", err);
      finishedCallback();
    };
    
    // Calculate Background ID
    var bgId = containerDiv.data("bg-id");
    
    // Load model here
    gfUtils.live2dUtils.loadLive2dGirl(containerDiv, "Background", bgId, null, successCallback, failureCallback);
  } catch (err) {
    console.log("Error changing model", err);
    finishedCallback();
  }
}

function live2dButtonHandler(evt) {
  var live2dButton = $(evt.target);
  var backgroundDiv= live2dButton.closest('.backgroundLive2d');
  
  if (live2dButton.is('.enabled')) {
    backgroundDiv.removeClass('live2dEnabled');
    live2dButton.removeClass('enabled');
    gfUtils.live2dUtils.createLive2dView(backgroundDiv, function(view) {
      var l2d_tdoll_stage = view.data('live2dStage');
      l2d_tdoll_stage.removeChildren();
      backgroundDiv.removeClass("loading");
    });
  } else {
    backgroundDiv.addClass('live2dEnabled');
    live2dButton.addClass('enabled');
    gfUtils.live2dUtils.createLive2dView(backgroundDiv, function(view) {
      if (backgroundDiv.find('.live2dstage').length < 1) {
        backgroundDiv.append(view);
      }
      
      modelChanged(backgroundDiv, function() {
        backgroundDiv.removeClass("loading");
      });
    });
  }
}

function initBackgroundEngine(containerDiv) {
    console.log("initing", containerDiv);
    
    // Create Live2D Button
    var switchBgLive2dButtonHandler = function(evt) {
    	containerDiv.addClass("loading");
        mw.loader.using('ext.gadget.live2dLoader').then(function() {
	    	window.animations.Live2dLoader.init().then(function() {
		        live2dButtonHandler(evt);
		    }, function(x,y,z) {
		        console.error("Loading Live2D framework failed",x,y,z);
		        containerDiv.removeClass("loading");
		    });
	    }, function(x,y,z) {
	        console.error("Loading live2dLoader failed",x,y,z);
	    });
    };
    var live2dButton = gfUtils.createSliderButton("/images/a/a3/live2d-logo.png", switchBgLive2dButtonHandler);
    
    var live2dSwitcher = $('<div></div>');
    live2dSwitcher.addClass('live2dBgSwitcher');

    var live2dSwitcherContainer = $('<div></div>');
    live2dSwitcherContainer.addClass('live2dSwitcherContainer');
    live2dSwitcherContainer.append(live2dButton);

    live2dSwitcher.append(live2dSwitcherContainer);
    containerDiv.append(live2dSwitcher);
}

RLQ.push(['jquery', function () {
  $(document).ready(function() {
    var containerDiv = $('.backgroundLive2d');
    console.log("Booting up L2D BG Gadget. Container count: ", containerDiv.length);
    $(containerDiv).each(function() {
      initBackgroundEngine($(this));
    });
  });
}]);

console.log("Loaded L2D BG Gadget.");