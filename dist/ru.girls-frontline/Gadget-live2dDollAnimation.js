function getFilePath(name) {
  return "/images/" + window.gfUtils.createWikiPathPart(name) + name;
}

function modelChanged(containerDiv, finishedCallback) {
  try {
    var viewCanvas = containerDiv.find('.live2dstage').first();
    var l2d_tdoll_stage = viewCanvas.data('live2dStage');
    l2d_tdoll_stage.removeChildren();
    
    var successCallback = function(l2d_tdoll_sprite) {
      l2d_tdoll_stage.addChild(l2d_tdoll_sprite);
      
      finishedCallback();
    };
  
    var failureCallback = function(err) {
      console.log("Error loading model", err);
      finishedCallback();
    };
    
    // Calculate Background ID
    var dollId = containerDiv.data("t-doll");
    var costumeId = containerDiv.data("costume");
    var variantId = containerDiv.data("variant");
    
    // Load model here
    gfUtils.live2dUtils.loadLive2dGirl(containerDiv, dollId, costumeId, variantId, successCallback, failureCallback);
  } catch (err) {
    console.log("Error changing model", err);
    finishedCallback();
  }
}

function frameworkLoadedHandler(containerDiv) {
  gfUtils.live2dUtils.createLive2dView(containerDiv, function(view) {
    if (containerDiv.find('.live2dstage').length < 1) {
      containerDiv.append(view);
    }
    
    containerDiv.on('modelchanged', function() {
      containerDiv.addClass("loading");
      modelChanged(containerDiv, function() {
        containerDiv.removeClass("loading");
      });
    });

    containerDiv.trigger('modelchanged');
  }, 800, 800);
}

function initDollLive2dEngine(containerDiv) {
    containerDiv.addClass("loading");
    
    mw.loader.using('ext.gadget.live2dLoader').then(function() {
    	window.animations.Live2dLoader.init().then(function() {
	        frameworkLoadedHandler(containerDiv);
			$('[data-live2d-needed]').trigger('live2dloaded');
	    }, function(x,y,z) {
	        console.error("Loading Live2D framework failed",x,y,z);
	        containerDiv.removeClass("loading");
	    });
    }, function(x,y,z) {
        console.error("Loading live2dLoader failed",x,y,z);
    });
}

RLQ.push(['jquery', function () {
  $(document).ready(function() {
    var containerDiv = $('.dollLive2d');
    
    console.log("Booting up Live2D Doll animation Gadget. Found containers: ", containerDiv.length);    
    
    if (containerDiv.length < 1) {
      return;
    }
    
    $(containerDiv).each(function() {
      initDollLive2dEngine($(this));
    });
  });
}]);

console.log("Loaded Live2D Doll animation Gadget.");