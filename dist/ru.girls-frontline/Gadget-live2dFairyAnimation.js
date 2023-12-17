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
      finishedCallback();
    };
  
    var failureCallback = function(err) {
      console.log("Error loading model", err);
      finishedCallback();
    };
    
    var fairyName = mw.config.get("wgPageName");

    // Find out the Modifikation Level
    var checkedModel = containerDiv.find(".tabs-gallery input:checked");
    var linkButton = containerDiv.find(".tabs-gallery *[for='" + checkedModel.attr('id') + "']");
    var modLevel = linkButton.text().length; // Number of stars :)
    var modId = Math.floor(modLevel / 2.0) + 1;
    
    // Load model here
    gfUtils.live2dUtils.loadLive2dGirl(containerDiv.find(".tabs-container"), fairyName, "model"+modId, null, successCallback, failureCallback);
  } catch (err) {
    console.log("Error changing model", err);
    finishedCallback();
  }
}

function live2dButtonHandler(evt, containerDiv) {
  var live2dButton = $(evt.target);
  var fairyStatTable = live2dButton.closest('.fairystattable');
  var live2dContainer = fairyStatTable.find('.tabs-container');
  
  if (live2dButton.is('.enabled')) {
    live2dContainer.removeClass('live2dEnabled');
    live2dButton.removeClass('enabled');
    gfUtils.live2dUtils.createLive2dView(live2dContainer, function(view) {
      var l2d_tdoll_stage = view.data('live2dStage');
      l2d_tdoll_stage.removeChildren();
      containerDiv.find(".tabs-container").removeClass("loading");
    });
  } else {
    live2dContainer.addClass('live2dEnabled');
    live2dButton.addClass('enabled');
    gfUtils.live2dUtils.createLive2dView(live2dContainer, function(view) {
      if (live2dContainer.find('.live2dstage').length < 1) {
        live2dContainer.append(view);
      }
      
      modelChanged(fairyStatTable, function() {
        containerDiv.find(".tabs-container").removeClass("loading");
      });
    });
  }
  
}

function initFairyEngine(containerDiv) {
    var radioButtons = containerDiv.find(".tabs-gallery *[type='radio']");
    radioButtons.change(function(evt) {
        // Make sure only the checked one is called
        if (radioButtons.parent().find(".live2dFairySwitcher input[type='checkbox']").is(':not(:checked)')) {
          return;
        }
        
        containerDiv.find(".tabs-container").addClass("loading");
        modelChanged(containerDiv, function() {
          containerDiv.find(".tabs-container").removeClass("loading");
        });
    });
    
    // Create Live2D Button
    var switchFairyLive2dButtonHandler = function(evt) {
    	containerDiv.find(".tabs-container").addClass("loading");
	    mw.loader.using('ext.gadget.live2dLoader').then(function() {
	    	window.animations.Live2dLoader.init().then(function() {
		        live2dButtonHandler(evt, containerDiv);
		    }, function(x,y,z) {
		        console.error("Loading Live2D framework failed",x,y,z);
		        containerDiv.removeClass("loading");
		    });
	    }, function(x,y,z) {
	        console.error("Loading live2dLoader failed",x,y,z);
	    });
    };
    var live2dButton = gfUtils.createSliderButton("/images/a/a3/live2d-logo.png", switchFairyLive2dButtonHandler);
    
    var live2dSwitcher = $('<div></div>');
    live2dSwitcher.addClass('live2dFairySwitcher');

    var live2dSwitcherContainer = $('<div></div>');
    live2dSwitcherContainer.addClass('live2dSwitcherContainer');
    live2dSwitcherContainer.append(live2dButton);

    live2dSwitcher.append(live2dSwitcherContainer);
    live2dSwitcher.insertBefore(containerDiv.find('.tabs-container'));
}

RLQ.push(['jquery', function () {
  $(document).ready(function() {
    var containerDiv = $('.fairystattable');

    console.log("Booting Live2D Fairy Animation Gadget. Found containers: ", containerDiv.length);

    if (containerDiv.length < 1) {
      // Nothing to do here
      return;
    }
    
    var live2dSettings = containerDiv.find('.live2dsettings');
    if (live2dSettings.length < 1 || live2dSettings.find('ul').length < 1) {
      console.log("No Live2D for this fairy :(");
    } else {
      initFairyEngine(containerDiv);
    }
  });
}]);

console.log("Loaded Live2D Fairy Animation Gadget.");