/* Any JavaScript here will be loaded for all users on every page load. */

//Note: Common.js uses Wikia.css instead of Common.css

/**
 * ======================================
 * =         Special Thanks To:         =
 * ======================================
 * =           @3D/2D Viewer            =
 * = @source Team Fortress 2 Wiki       =
 * = @author Moussekateer               =
 * ======================================
 *

// 3D/2D viewer
$('#switch-to-3d').click(function() {
	$('.container-2d').hide();
	$('.viewer-3d, .viewer-3d-multi, .buttons-container-3d').show();
});

$('#switch-to-2d').click(function() {
	$('.viewer-3d, .viewer-3d-multi, .buttons-container-3d').hide();
	$('.container-2d').show();
});

// 3D model viewer
var viewer3d = {
	dragging: null,
	draggingFrameX: 0,
	draggingFrameY: 0,
	viewers: [],
	frameThresholdX: 10,
	frameThresholdY: 128,
	realMod: function(x, y) {
		return ((x % y) + y) % y;
	},
	init: function() {
		$('.viewer-3d').each(viewer3d.bind);
		$(document).mouseup(viewer3d.release);
		$(document).mousemove(viewer3d.move);
	},
	bind: function() {
		var v = $(this);
		var num = viewer3d.viewers.length;
		var allModels = [];
		var modelID = 0;
		var viewerSize = 0;
		while(true) {
			var modelMap = v.find('.viewer-3d-map-' + modelID);
			var urlNode = v.find('.viewer-3d-url-' + modelID);
			if(!modelMap.length || !urlNode.length) break;
			var url = $('<div/>').html(urlNode.text()).text();
			var framesS = $('<div/>').html(modelMap.text()).text().replace(/^\s+|\s+$/g).split(/,/g);
			var frameMap = [];
			var heightMap = [];
			var leftCropMap = [];
			var totalW = parseInt(framesS[0]);
			var maxFrameW = parseInt(framesS[1]);
			var totalH = parseInt(framesS[2]);
			var verticalSteps = parseInt(framesS[3]);
			var midVertical = Math.floor(verticalSteps / 2);
			for(var f = 4; f < framesS.length; f += 3) {
				frameMap.push(parseInt(framesS[f]));
				heightMap.push(parseInt(framesS[f + 1]));
				leftCropMap.push(parseInt(framesS[f + 2]));
			}
			allModels.push({
				imageURL: url,
				map: frameMap,
				cropMap: leftCropMap,
				totalWidth: totalW,
				totalHeight: totalH,
				maxFrameWidth: maxFrameW,
				xStep: verticalSteps
			});
			viewerSize = Math.max(viewerSize, totalH, maxFrameW);
			modelID++;
		}
		if(!modelID) return;
		var overlayNode = $('<div class="viewer-3d-overlay"></div>');
		var frameN = v.find('.viewer-3d-frame');
		v.find('img').detach();
		var klasses = v.attr('class').split(/ /g);
		var startFrame = 0;
		for(var k in klasses) {
			if(klasses[k].substr(0, 11) == 'startframe-') {
				startFrame = Math.max(0, parseInt(klasses[k].substr(11)));
			}
		}
		var viewer = {
			node: v,
			frameX: startFrame,
			frameY: midVertical,
			models: allModels,
			currentModel: -1,
			frameNode: frameN,
			width: viewerSize,
			height: viewerSize,
			mouseX: 0,
			mouseY: 0,
			overlay: overlayNode
		};
		viewer3d.viewers.push(viewer);
		v.hover(viewer3d.hover, viewer3d.unhover).mousedown(viewer3d.drag).append(overlayNode).attr('data-id', num).css({
			width: viewer.width + 'px',
			height: viewer.height + 'px'
		});
		frameN.mousedown(viewer3d.drag).attr('data-id', num).css('height', viewer.height + 'px');
		viewer3d.changeVersion(viewer, 0);
	},
	getCurrentModel: function(v) {
		return v.models[v.currentModel];
	},
	changeVersion: function(v, version) {
		version = Math.max(0, Math.min(v.models.length - 1, version));
		if(v.currentModel == version) return;
		v.currentModel = version;
		v.frameNode.css('background', 'url(' + viewer3d.getCurrentModel(v).imageURL + ') top left no-repeat');
		viewer3d.display(v, v.frameX, v.frameY);
	},
	hover: function(e) {
		var v = viewer3d.getViewer(this);
		if(viewer3d.dragging != v) {
			v.overlay.animate({'opacity': '1'}, 'fast');
		}
	},
	unhover: function(e) {
		var v = viewer3d.getViewer(this);
		if(viewer3d.dragging != v) {
			v.overlay.animate({'opacity': '0.5'}, 'fast');
		}
	},
	drag: function(e) {
		var v = viewer3d.getViewer(this);
		v.mouseX = e.pageX;
		v.mouseY = e.pageY;
		viewer3d.dragging = v;
		draggingFrameX = v.frameX;
		draggingFrameY = v.frameY;
		return false;
	},
	release: function() {
		var v = viewer3d.dragging;
		viewer3d.dragging = null;
		if(v !== null) {
			v.frameX = viewer3d.draggingFrameX;
			v.frameY = viewer3d.draggingFrameY;
			v.overlay.animate({'opacity': '0.5'}, 'fast');
		}
		viewer3d.draggingFrameX = 0;
		viewer3d.draggingFrameY = 0;
	},
	getViewer: function(node) {
		return viewer3d.viewers[parseInt($(node).attr('data-id'))];
	},
	display: function(v, frameX, frameY) {
		var model = viewer3d.getCurrentModel(v);
		var frameID = viewer3d.realMod(frameX * model.xStep + frameY, model.map.length);
		var frameOffset = model.map[frameID];
		var frameWidth = 0;
		if(frameID == model.map.length - 1) {
			frameWidth = model.totalWidth - frameOffset;
		} else {
			frameWidth = model.map[frameID + 1] - frameOffset;
		}
		v.frameNode.css({
			backgroundPosition: (-frameOffset - frameID) + 'px 0px',
			left: Math.round((v.width - model.maxFrameWidth) / 2.0 + model.cropMap[frameID]) + 'px',
			top: Math.round((v.height - model.totalHeight) / 2) + 'px',
			width: frameWidth + 'px',
			height: model.totalHeight + 'px'
		});
	},
	move: function(e) {
		if(viewer3d.dragging === null) {
			return;
		}
		var v = viewer3d.dragging;
		var model = viewer3d.getCurrentModel(v);
		var mouseDeltaX = e.pageX - v.mouseX;
		var mouseDeltaY = e.pageY - v.mouseY;
		var frameDeltaX = Math.round(mouseDeltaX / viewer3d.frameThresholdX);
		var frameDeltaY = -Math.round(mouseDeltaY / viewer3d.frameThresholdY);
		viewer3d.draggingFrameX = v.frameX + frameDeltaX;
		viewer3d.draggingFrameY = Math.max(0, Math.min(model.xStep - 1, v.frameY + frameDeltaY));
		viewer3d.display(v, viewer3d.draggingFrameX, viewer3d.draggingFrameY);
	}
};
$(viewer3d.init);
var selector3d = {
	bind: function() {
		var viewer = viewer3d.getViewer($(this).find('.viewer-3d'));
		var keepGoing = true;
		var modelVariant = 0;
		var selector;
		while(keepGoing) {
			selector = $(this).find('.selector-' + modelVariant);
			if(selector.length) {
				selector.attr('data-variant', modelVariant).click(function() {
					viewer3d.changeVersion(viewer, parseInt($(this).attr('data-variant')));
					return false;
				});
			}
			modelVariant++;
			keepGoing = selector.length;
		}
	},
	init: function() {
		$('.viewer-3d-multi, .viewer-3d-container').each(selector3d.bind);
	}
};
$(selector3d.init);

// Code to get 3D viewer drag working on touch devices
// Source: http://www.jquery4u.com/mobile/jquery-add-dragtouch-support-ipad/
$.fn.addTouch = function(){
    this.each(function(i,el){
      $(el).bind('touchstart touchmove touchend touchcancel',function(){
        //we pass the original event object because the jQuery event
        //object is normalized to w3c specs and does not provide the TouchList
        handleTouch(event);
      });
    });

    var handleTouch = function(event)
    {
      var touches = event.changedTouches,
              first = touches[0],
              type = '';

      switch(event.type)
      {
        case 'touchstart':
          type = 'mousedown';
          break;

        case 'touchmove':
          type = 'mousemove';
          event.preventDefault();
          break;

        case 'touchend':
          type = 'mouseup';
          break;

        default:
          return;
      }

      var simulatedEvent = document.createEvent('MouseEvent');
      simulatedEvent.initMouseEvent(type, true, true, window, 1, first.screenX, first.screenY, first.clientX, first.clientY, false, false, false, false, 0/*left*/, null);
      /* first.target.dispatchEvent(simulatedEvent);
    };
  };

$('.viewer-3d').addTouch();

// End 3D viewer touch device code