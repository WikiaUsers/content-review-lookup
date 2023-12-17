RLQ.push(['jquery', function () {
  $(document).ready(function() {
	var chibiDivs = $(".tdoll_chibi,.chibiAnimationContainer");
	
	console.log("Booting up Chibi Animation Gadget. Containers found: ", chibiDivs.length);
	
	// if this page doesn't contain a chibi animation we skip the init
	if (chibiDivs.length < 1) {
	  return;
	}
	
	chibiDivs.addClass("loading");
	mw.loader.using(['ext.gadget.md5hasher', 'ext.gadget.pixiLoader']).then(function() {
    	window.animations.PIXILoader.init().then(function() {
	        initGirl();
	    }, function(x,y,z) {
	        console.error("Loading Spine failed");
	        chibiDivs.removeClass("loading");
	    });
    }, function(x,y,z) {
        console.error("Loading needed libraries failed");
		chibiDivs.removeClass("loading");
    });
  });
}]);

// Replaces spaces with underscores to find proper files
function convertToWikiConformId(orig) {
	return orig.replaceAll(' ', '_');
}

function initGirl() {
	var chibiDivs = $(".tdoll_chibi,.chibiAnimationContainer");
	console.log("Init animation...");
	chibiDivs.each(function() {
        var chibiAnimationBaseview = new BaseView(800, 800);
        chibiAnimationBaseview.start();
        var currentDiv = $(this);
        currentDiv.data('baseview', chibiAnimationBaseview);

        var girlLoadedHandler = function () {
          currentDiv.removeClass("loading");
        };
        
        var requestedScale = currentDiv.data("chibiScale");
        
		var renderView = $(chibiAnimationBaseview.getRenderer().view);
		renderView.addClass("chibiAnimation");
        renderView.on('costume_changed', function(event, costumeSuffix) {
          var loadingDivs = $(event.target).closest('.tdoll_chibi,.chibiAnimationContainer');
          loadingDivs.addClass("loading");
          var tdollId = convertToWikiConformId(currentDiv.data("tdollId"));
          loadingDivs.attr('data-tdoll-costume', costumeSuffix);
          var dormVariant = loadingDivs.find('.chibiDormSwitcher input').is(':checked');
          loadGirl(chibiAnimationBaseview, tdollId, costumeSuffix, dormVariant, girlLoadedHandler, requestedScale);
        });

        var clickArea = $("<div></div>");
        clickArea.addClass("chibiAnimationClickArea");
        clickArea.click(function(e){
			e.stopPropagation();
			chibiAnimationBaseview.nextAnimation();
		});

        var switchDormButtonHandler = function(evt) {
          var currentCheckbox = $(evt.target);
          var futureEnabledState = currentCheckbox.is(':checked');
          
          var tdollChibiDiv = currentCheckbox.closest('.tdoll_chibi,.chibiAnimationContainer');
          tdollChibiDiv.addClass("loading");
          var tdollChibiDivCostume = tdollChibiDiv.attr('data-tdoll-costume') || "";
          
          var tdollId = convertToWikiConformId(currentDiv.data("tdollId"));
          loadGirl(chibiAnimationBaseview, tdollId, tdollChibiDivCostume, futureEnabledState, girlLoadedHandler, requestedScale);
        };

        currentDiv.empty();
        currentDiv.append(clickArea);
        currentDiv.append(renderView[0]);
        
        if (currentDiv.attr("data-tdoll-hidedormbutton") != 'true') {
          var dormSliderButton = gfUtils.createSliderButton("/images/1/12/Dorm.png", switchDormButtonHandler);
          currentDiv.append(dormSliderButton);
        }
        
        var screencapLink = $('<a></a>');
        screencapLink.addClass('chibiScreenshotButton');
        screencapLink.prop("href", "javascript:void(0);");
        screencapLink.prop("target", "_blank");
        screencapLink.prop("rel", "noopener");
        screencapLink.prop("download", "chibi_screenshot.png");
        screencapLink.on('click', function(e) {
          var canv = currentDiv.find('canvas')[0];
          var dataURL = canv.toDataURL('image/png');
          e.target.href = dataURL;
        });
        currentDiv.append(screencapLink);
		
		var tdollId = convertToWikiConformId(currentDiv.data("tdollId"));
                
		loadGirl(chibiAnimationBaseview, tdollId, "", false, girlLoadedHandler, requestedScale);
	});
}

function loadGirl(view, id, costumeSuffix, dormVersion, callback, requestedScale){
	var costumeName = id;
	costumeName = costumeName + costumeSuffix;
    console.log("Loading", costumeName);
	view.clean();
	
	var sl = new SkeletonLoader("/images/", costumeName);
	
    var successHandler = function(p){
		if (p === null) {
			return;
		}
		
		view.clean();
		view.addSpinePlayer(p, requestedScale);
	
	    callback();
	};
	
    var failureHandler = function(p){
        var textSample = new PIXI.Text('Error loading chibi files', {
          "fill": "#f00000",
          "font": "12px \"Courier New\", Courier, monospace"
        });
		textSample['anchor'].set(0.5, 0.5);
		textSample.x = view.getRenderer().width / 2;
		textSample.y = view.getRenderer().height / 2;
		
		view.clean();
        view.addSprite(textSample);
        
        console.log("Failed loading T-Doll Chibi", view, id, costumeSuffix, dormVersion, p);
        
        callback();
	};
	sl.load(costumeName, dormVersion, successHandler, failureHandler);
}

window.defineVisibleParts = function(skeleton, startId, endId) {
	var startReached = false;
	var endReached = endId === null;
	for (var i=skeleton.slots.length-1; i>=0; i--) {
		var shouldBeVisible = endReached && !startReached;
		
		skeleton.slots[i].a = shouldBeVisible ? 1 : 0;
		
		if (skeleton.slots[i].name == endId) {
			endReached = true;
		}
		if (skeleton.slots[i].name == startId) {
			startReached = true;
		}
	}
};

window.parseCommanderString = function(rawData) {
	var files = rawData.split(";");
	
	var cpp = window.gfUtils.createWikiPathPart;  
    var basePath = "../images/";

	var ret = {
		baseId: files[2],
		skel: basePath + cpp(files[0]) + files[0], 
		atlas: basePath + cpp(files[1]) + files[1], 
		png: basePath + cpp(files[2]) + files[2]
	};
	return ret;
};

window.loadCommander = function(commanderDiv, view, headRaw, bodyRaw, feetRaw){
	commanderDiv.addClass('loading');
	view.clean();
	
	var sl = new SkeletonLoader(".");
	
	var headGenus = parseCommanderString(headRaw);
	
	var failureHandler = function(p){
		commanderDiv.removeClass('loading');
		
        var textSample = new PIXI.Text('Error loading chibi files.', {
          "fill": "#f00000",
          "font": "12px \"Courier New\", Courier, monospace"
        });
		textSample.anchor.set(0.5, 0.5);
		textSample.x = view.getRenderer().width / 2;
		textSample.y = view.getRenderer().height / 2;
		
		view.clean();
        view.addSprite(textSample);
        
        console.log("Failed loading Commander Chibi", view, headRaw, bodyRaw, feetRaw, p);
	};
	
	sl.load(headGenus, false, function(headSkeleton){
		if (headSkeleton == null) {
			return;
		}
		
		var feetGenus = parseCommanderString(feetRaw);
		
		sl.load(feetGenus, false, function(feetSkeleton){
			if (feetSkeleton == null) {
				return;
			}
			
			var bodyGenus = parseCommanderString(bodyRaw);
			
			sl.load(bodyGenus, false, function(bodySkeleton){
				if (bodySkeleton == null) {
					return;
				}
				
				defineVisibleParts(headSkeleton, null, 'FaceLayer');
				view.addSpinePlayer(headSkeleton);
				
				defineVisibleParts(bodySkeleton, null, 'BodyLayer');
				view.addSpinePlayer(bodySkeleton);
				
				defineVisibleParts(feetSkeleton, null, 'FootLayer');
				view.addSpinePlayer(feetSkeleton);
				
				defineVisibleParts(feetSkeleton, 'FootLayer', null);
				view.addSpinePlayer(feetSkeleton);
				
				defineVisibleParts(bodySkeleton, 'BodyLayer', 'RHandLayer');
				view.addSpinePlayer(bodySkeleton);
				
				defineVisibleParts(headSkeleton, 'FaceLayer', null);
				view.addSpinePlayer(headSkeleton);
				
				defineVisibleParts(bodySkeleton, 'RHandLayer', null);
				view.addSpinePlayer(bodySkeleton);
				
				// Everything done here
				commanderDiv.removeClass("loading");
			}, failureHandler);
		}, failureHandler);
	}, failureHandler);
};

function SkeletonBinary() {
    this.data = null;
    this.scale = 1;
    this.json = {};
    this.nextNum = 0;
    this.chars = null;
}

SkeletonBinary.prototype = {
    BlendMode : ["normal", "additive", "multiply", "screen"],
    AttachmentType : ["region", "boundingbox", "mesh", "skinnedmesh"],

    readByte : function(){
        return this.nextNum < this.data.length ? this.data[this.nextNum++] : null;
    },
    readSByte : function(){
        var bitwidth = 8;
        var val = this.readByte();
        var isnegative = val & (1 << (bitwidth - 1));
        var boundary = (1 << bitwidth);
        var minval = -boundary;
        var mask = boundary - 1;
        return isnegative ? minval + (val & mask) : val;
    },
    readBoolean : function(){
        return this.readByte() != 0;
    },
    readShort : function(){
        return (this.readByte() << 8) | this.readByte();
    },
    readInt : function(optimizePositive){
        if(typeof optimizePositive === 'undefined'){
            return (this.readByte() << 24) | (this.readByte() << 16) | (this.readByte() << 8) | this.readByte();
        }
        var b = this.readByte();
        var result = b & 0x7f;
        if ((b & 0x80) != 0){
            b = this.readByte();
            result |= (b & 0x7F) << 7;
            if ((b & 0x80) != 0){
                b = this.readByte();
                result |= (b & 0x7F) << 14;
                if ((b & 0x80) != 0){
                    b = this.readByte();
                    result |= (b & 0x7F) << 21;
                    if ((b & 0x80) != 0){
                        b = this.readByte();
                        result |= (b & 0x7F) << 28;
                    }
                }
            }
        }
        return optimizePositive ? result : ((result >> 1) ^ -(result & 1));
    },
    bytes2Float32 : function(bytes){
        var sign = (bytes & 0x80000000) ? -1 : 1;
        var exponent = ((bytes >> 23) & 0xFF) - 127;
        var significand = (bytes & ~(-1 << 23));

        if (exponent == 128)
            return sign * ((significand) ? Number.NaN : Number.POSITIVE_INFINITY);

        if (exponent == -127) {
            if (significand == 0) return sign * 0.0;
            exponent = -126;
            significand /= (1 << 22);
        } else significand = (significand | (1 << 23)) / (1 << 23);

        return sign * significand * Math.pow(2, exponent);
    },
    readFloat : function(){
        return this.bytes2Float32((this.readByte()<<24) + (this.readByte()<<16) + (this.readByte()<<8) + (this.readByte()<<0));
    },
    readFloatArray : function(){
        var n = this.readInt(true);
        var array = new Array(n);
        if(this.scale == 1){
            for(var i = 0; i < n; i++){
                array[i] = this.readFloat();
            }
        }else{
            for(var i = 0; i < n; i++){
                array[i] = this.readFloat() * this.scale;
            }
        }
        return array;
    },
    readShortArray : function(){
        var n = this.readInt(true);
        var array = new Array(n);
        for(var i = 0; i < n; i++){
            array[i] = this.readShort();
        }
        return array;
    },
    readIntArray : function(){
        var n = this.readInt(true);
        var array = new Array(n);
        for(var i = 0; i < n; i++)
            array[i] = this.readInt(true);
        return array;
    },
    readHex : function(){
        var hex = this.readByte().toString(16);
        return hex.length == 2 ? hex : '0' + hex;
    },
    readColor : function(){
        return this.readHex() + this.readHex() + this.readHex() + this.readHex();
    },
    readUtf8_slow : function(charCount, charIndex, b){
        while(true){
            switch (b >> 4){
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                this.chars += String.fromCharCode(b);
                break;
            case 12:
            case 13:
                this.chars += String.fromCharCode((b & 0x1F) << 6 | this.readByte() & 0x3F);
                break;
            case 14:
                this.chars += String.fromCharCode((b & 0x0F) << 12 | (this.readByte() & 0x3F) << 6 | this.readByte() & 0x3F);
                break;
            }
            if (++charIndex >= charCount) break;
            b = this.readByte() & 0xFF;
        }
    },
    readString : function(){
        var charCount = this.readInt(this, true);
        switch(charCount){
        case 0:
            return null;
        case 1:
            return "";
        }
        charCount--;
        this.chars = "";
        var b = 0;
        var charIndex = 0;
        while (charIndex < charCount){
            b = this.readByte();
            if (b > 127)
                break;
            this.chars += String.fromCharCode(b);
            charIndex++;
        }
        if (charIndex < charCount)
            this.readUtf8_slow(charCount, charIndex, b);
        return this.chars;
    },
    initJson : function(){
        this.json.skeleton = {};
        var skeleton = this.json.skeleton;
        skeleton.hash = this.readString();
        if(skeleton.hash.length == 0)
            skeleton.hash = null;
        skeleton.spine = this.readString();
        if(skeleton.spine.length == 0)
            skeleton.spine = null;
        skeleton.width = this.readFloat();
        skeleton.height = this.readFloat();
        var nonessential = this.readBoolean();
        if(nonessential){
            skeleton.images = this.readString();
            if(skeleton.images.length == 0)
                skeleton.images = null;
        }

        //Bones.
        this.json.bones = new Array(this.readInt(true));
        var bones = this.json.bones;
        for(var i = 0; i < bones.length; i++){
            var boneData = {};
            boneData.name = this.readString();
            boneData.parent = null;
            var parentIndex = this.readInt(true) - 1;
            if(parentIndex != -1)
                boneData.parent = bones[parentIndex].name;
            boneData.x = this.readFloat() * this.scale;
            boneData.y = this.readFloat() * this.scale;
            boneData.scaleX = this.readFloat();
            boneData.scaleY = this.readFloat();
            boneData.rotation = this.readFloat();
            boneData.length = this.readFloat() * this.scale;
            boneData.flipX = this.readBoolean();
            boneData.flipY = this.readBoolean();
            boneData.inheritScale = this.readBoolean();
            boneData.inheritRotation = this.readBoolean();

            if(nonessential){
                boneData.color = this.readColor();
            }
            bones[i] = boneData;
        }

        // IK constraints.
        this.json.ik = new Array(this.readInt(true));
        var ik = this.json.ik;
        for(var i = 0; i < ik.length; i++){
            var ikConstraints = {};
            ikConstraints.name = this.readString();
            ikConstraints.bones = new Array(this.readInt(true));
            for(var j = 0; j < ikConstraints.bones.length; j++){
                ikConstraints.bones[j] = this.json.bones[this.readInt(true)].name;
            }
            ikConstraints.target = this.json.bones[this.readInt(true)].name;
            ikConstraints.mix = this.readFloat();
            ikConstraints.bendPositive = this.readBoolean();
            // Maybe use ReadSByte();
            ik[i] = ikConstraints;
        }

        // Slots.
        this.json.slots = new Array(this.readInt(true));
        var slots = this.json.slots;
        for(var i = 0; i < slots.length; i++){
            var slotData = {};
            slotData.name = this.readString();
            var boneData = this.json.bones[this.readInt(true)];
            slotData.bone = boneData.name;
            slotData.color = this.readColor();
            slotData.attachment = this.readString();
            slotData.blend = this.BlendMode[this.readInt(true)];
            slots[i] = slotData;
        }

        // Default skin.
        this.json.skins = {};
        this.json.skinsName = new Array();
        var skins = this.json.skins;
        var defaultSkin = this.readSkin("default", nonessential);
        if(defaultSkin != null){
            skins["default"] = defaultSkin;
            this.json.skinsName.push("default");
        }

        // Skin.
        for(var i = 0, n = this.readInt(true); i < n; i++){
            var skinName = this.readString();
            var skin = this.readSkin(skinName, nonessential);
            skins[skinName] = skin;
            this.json.skinsName.push("skinName");
        }

        // Events.
        this.json.events = [];
        this.json.eventsName = [];
        var events = this.json.events;
        for(var i = 0, n = this.readInt(true); i < n; i++){
            var eventName = this.readString();
            var event = {};
            event.int = this.readInt(false);
            event.float = this.readFloat();
            event.string = this.readString();
            events[eventName] = event;
            this.json.eventsName[i] = eventName;
        }

        // Animations.
        this.json.animations = {};
        var animations = this.json.animations;
        for(var i = 0, n = this.readInt(true); i < n; i++){
            var animationName = this.readString();
            var animation = this.readAnimation(animationName);
            animations[animationName] = animation;
        }

    },
    readSkin : function(skinName, nonessential){
        var slotCount = this.readInt(true);
        if(slotCount == 0)
            return null;
        var skin = {};
        for(var i = 0; i < slotCount; i++){
            var slotIndex = this.readInt(true);
            var slot = {};
            for(var j = 0, n = this.readInt(true); j < n; j++){
                var name = this.readString();
                var attachment = this.readAttachment(name, nonessential);
                slot[name] = attachment;
            }
            skin[this.json.slots[slotIndex].name] = slot;
        }
        return skin;
    },
    readAttachment : function(attachmentName, nonessential){
        var name = this.readString();
        if(name == null)
            name = attachmentName;
        switch(this.AttachmentType[this.readByte()]){
        case "region":
            var path = this.readString();
            if(path == null)
                path = name;
            var region = {};
            region.type = "region";
            region.name = name;
            region.path = path;
            region.x = this.readFloat() * this.scale;
            region.y = this.readFloat() * this.scale;
            region.scaleX = this.readFloat();
            region.scaleY = this.readFloat();
            region.rotation = this.readFloat();
            region.width = this.readFloat() * this.scale;
            region.height = this.readFloat() * this.scale;
            region.color = this.readColor();
            // Maybe need UpdateOffset()
            return region;
        case "boundingbox":
            var box = {};
            box.type = "boundingbox";
            box.name = name;
            box.vertices = this.readFloatArray();
            // Maybe need vertexCount or color
            return box;
        case "mesh":
            var path = this.readString();
            if(path == null)
                path = name;
            var mesh = {};
            mesh.type = "mesh";
            mesh.name = name;
            mesh.path = path;
            mesh.uvs = this.readFloatArray();
            // Maybe need updateUVs()
            mesh.triangles = this.readShortArray();
            mesh.vertices = this.readFloatArray();
            mesh.color = this.readColor();
            mesh.hull = this.readInt(true);
            // Maybe need * 2
            if(nonessential){
                mesh.edges = this.readIntArray();
                mesh.width = this.readFloat();
                mesh.height = this.readFloat();
                // Maybe need * scale
            }
            return mesh;
        case "skinnedmesh":
            var path = this.readString();
            if(path == null)
                path = name;
            var skinnedmesh = {};
            skinnedmesh.type = "skinnedmesh";
            skinnedmesh.name = name;
            skinnedmesh.path = path;
            skinnedmesh.uvs = this.readFloatArray();
            skinnedmesh.triangles = this.readShortArray();

            skinnedmesh.vertices = new Array();
            var vertexCount = this.readInt(true);
            for(var i = 0; i < vertexCount;){
                var boneCount = Math.floor(this.readFloat());
                skinnedmesh.vertices[i++] = boneCount;
                for(var nn = i + boneCount * 4; i < nn; i += 4){
                    skinnedmesh.vertices[i] = Math.floor(this.readFloat());
                    skinnedmesh.vertices[i + 1] = this.readFloat();
                    skinnedmesh.vertices[i + 2] = this.readFloat();
                    skinnedmesh.vertices[i + 3] = this.readFloat();
                }
            }
            skinnedmesh.color = this.readColor();
            skinnedmesh.hull = this.readInt(true);
            // Maybe need * 2
            if(nonessential){
                skinnedmesh.edges = this.readIntArray();
                skinnedmesh.width = this.readFloat();
                skinnedmesh.height = this.readFloat();
                // Maybe need * scale
            }
            return skinnedmesh;
        }
        return null;
    },
    readCurve : function(frameIndex, timeline){
        switch(this.readByte()){
        case 1: //CURVE_STEPPED
            timeline[frameIndex].curve = "stepped";
            break;
        case 2: //CURVE_BEZIER
            var cx1 = this.readFloat();
            var cy1 = this.readFloat();
            var cx2 = this.readFloat();
            var cy2 = this.readFloat();
            timeline[frameIndex].curve = [cx1, cy1, cx2, cy2];
        }
    },
    readAnimation : function(name){
        var animation = {};
        var scale = this.scale;
        var duration = 0;

        // Slot timelines.
        var slots = {};
        for(var i = 0, n = this.readInt(true); i < n; i++){
            var slotIndex = this.readInt(true);
            var slotMap = {};
            var timeCount = this.readInt(true);
            for(var ii = 0; ii < timeCount; ii++){
                var timelineType = this.readByte();
                var frameCount = this.readInt(true);
                switch(timelineType){
                case 4: //TIMELINE_COLOR
                    var timeline = new Array(frameCount);
                    for(var frameIndex = 0; frameIndex < frameCount; frameIndex++){
                        var time = this.readFloat();
                        var color = this.readColor();
                        timeline[frameIndex] = {};
                        timeline[frameIndex].time = time;
                        timeline[frameIndex].color = color;
                        if(frameIndex < frameCount - 1){
                            var str = this.readCurve(frameIndex, timeline);
                        }
                    }
                    slotMap.color = timeline;
                    duration = Math.max(duration, timeline[frameCount - 1].time);
                    break;
                case 3: //TIMELINE_ATTACHMENT
                    var timeline = new Array(frameCount);
                    for(var frameIndex = 0; frameIndex < frameCount; frameIndex++){
                        var time = this.readFloat();
                        var attachmentName = this.readString();
                        timeline[frameIndex] = {};
                        timeline[frameIndex].time = time;
                        timeline[frameIndex].name = attachmentName;
                    }
                    slotMap.attachment = timeline;
                    duration = Math.max(duration, timeline[frameCount - 1].time);
                    break;
                }
            }
            slots[this.json.slots[slotIndex].name] = slotMap;
        }
        animation.slots = slots;

        //// Bone timelines.
        var bones = {};
        for(var i = 0, n = this.readInt(true); i < n; i++){
            var boneIndex = this.readInt(true);
            var boneMap = {};
            for(var ii = 0, nn = this.readInt(true); ii < nn; ii++){
                var timelineType = this.readByte();
                var frameCount = this.readInt(true);
                switch(timelineType){
                case 1: //TIMELINE_ROTATE
                    var timeline = new Array(frameCount);
                    for(var frameIndex = 0; frameIndex < frameCount; frameIndex++){
                        var tltime = this.readFloat();
                        var tlangle = this.readFloat();
                        timeline[frameIndex] = {};
                        timeline[frameIndex].time = tltime;
                        timeline[frameIndex].angle = tlangle;
                        if(frameIndex < frameCount - 1){
                            this.readCurve(frameIndex, timeline);
                        }
                    }
                    boneMap.rotate = timeline;
                    duration = Math.max(duration, timeline[frameCount - 1].time);
                    break;
                case 2: //TIMELINE_TRANSLATE
                case 0: //TIMELINE_SCALE
                    var timeline = new Array(frameCount);
                    var timelineScale = 1;
                    if(timelineType == 2){
                        timelineScale = scale;
                    }
                    for(var frameIndex = 0; frameIndex < frameCount; frameIndex++){
                        var tltime = this.readFloat();
                        var tlx = this.readFloat();
                        var tly = this.readFloat();
                        timeline[frameIndex] = {};
                        timeline[frameIndex].time = tltime;
                        timeline[frameIndex].x = tlx;
                        timeline[frameIndex].y = tly;
                        if(frameIndex < frameCount - 1){
                            this.readCurve(frameIndex, timeline);
                        }
                    }
                    if(timelineType == 0){
                        boneMap.scale = timeline;
                    }else{
                        boneMap.translate = timeline;
                    }
                    duration = Math.max(duration, timeline[frameCount - 1].time);
                    break;
                case 5: //TIMELINE_FLIPX
                case 6: //TIMELINE_FLIPY
                    var timeline = new Array(frameCount);
                    for(var frameIndex = 0; frameIndex < frameCount; frameIndex++){
                        var tltime = this.readFloat();
                        var tlflip = this.readBoolean();
                        timeline[frameIndex] = {};
                        timeline[frameIndex].time = tltime;
                        if(timelineType == 5)
                            timeline[frameIndex].x = tlflip;
                        else
                            timeline[frameIndex].y = tlflip;
                    }
                    if(timelineType == 5)
                        boneMap.flipX = timeline;
                    else
                        boneMap.flipY = timeline;
                    duration = Math.max(duration, timeline[frameCount - 1].time);
                    break;
                }
            }
            bones[this.json.bones[boneIndex].name] = boneMap;
        }
        animation.bones = bones;

        // IK timelines.
        var ik = {};
        for(var i = 0, n = this.readInt(true); i < n; i++){
            var ikIndex = this.readInt(true);
            var frameCount = this.readInt(true);
            var timeline = new Array(frameCount);
            for(var frameIndex = 0; frameIndex < frameCount; frameIndex++){
                var time = this.readFloat();
                var mix = this.readFloat();
                var bendData = this.readSByte();
                timeline[frameIndex] = {};
                timeline[frameIndex].time = time;
                timeline[frameIndex].mix = mix;
                timeline[frameIndex].bendPositive = bendData >= 0;
                timeline[frameIndex].bendDirection = bendData;
                if(frameIndex < frameCount - 1)
                    this.readCurve(frameIndex, timeline);
            }
            ik[this.json.ik[ikIndex].name] = timeline;
        }
        animation.ik = ik;

        // FFD timelines.
        var ffd = {};
        for(var i = 0, n = this.readInt(true); i < n; i++){
            var skinIndex = this.readInt(true);
            var slotMap = {};
            for(var ii = 0, nn = this.readInt(true); ii < nn; ii++){
                var slotIndex = this.readInt(true);
                var meshMap = {};
                for(var iii = 0, nnn = this.readInt(true); iii < nnn; iii++){
                    var meshName = this.readString();
                    var frameCount = this.readInt(true);
                    var attachment;
                    var attachments = this.json.skins[this.json.skinsName[skinIndex]][this.json.slots[slotIndex].name];
                    for(var attachmentName in attachments){
                        if(attachments[attachmentName].name == meshName)
                            attachment = attachments[attachmentName];
                    }
                    
                    if(!attachment)
                        console.log("FFD attachment not found: " + meshName);
                    
                    var timeline = new Array(frameCount);
                    for(var frameIndex = 0; frameIndex < frameCount; frameIndex++){
                        var time = this.readFloat();
                        var vertexCount;
                        if(attachment.type == "mesh"){
                            vertexCount = attachment.vertices.length;
                        }else{
                            vertexCount = attachment.uvs.length * 3 * 3;
                            // This maybe wrong
                        }
                        
                        var vertices = new Array(vertexCount);
                        for (var verticeIdx = 0; verticeIdx < vertexCount; verticeIdx++){
                          vertices[verticeIdx] = 0.0;
                        }
                        
                        // ToDo: I have no idea why we need this
                        var bugFixMultiplicator = 0.1;
                        
                        var end = this.readInt(true);
                        if (end == 0) {
                          if (attachment.type == "mesh") {
                            for (var verticeIdx = 0; verticeIdx < vertexCount; verticeIdx++){
                              vertices[verticeIdx] += attachment.vertices[verticeIdx] * bugFixMultiplicator;
                            }
                          }
                        } else {
                            var start = this.readInt(true);
                            end += start;
                            
                            for(var v = start; v < end; v++){
                                vertices[v] = this.readFloat() * scale;
                            }
                            
                            if(attachment.type == "mesh"){
                                var meshVertices = attachment.vertices;
                                for(var v = 0, vn = vertices.length; v < vn; v++){
                                    vertices[v] += meshVertices[v] * bugFixMultiplicator;
                                }
                            }
                        }
                        timeline[frameIndex] = {};
                        timeline[frameIndex].time = time;
                        timeline[frameIndex].vertices = vertices;
                        
                        if(frameIndex < frameCount - 1)
                            this.readCurve(frameIndex, timeline);
                    }
                    meshMap[meshName] = timeline;
                    duration = Math.max(duration, timeline[frameCount - 1].time);
                }
                slotMap[this.json.slots[slotIndex].name] = meshMap;
            }
            ffd[this.json.skinsName[skinIndex]] = slotMap;
        }
        animation.ffd = ffd;

        // Draw order timeline.
        var drawOrderCount = this.readInt(true);
        if(drawOrderCount > 0){
            var drawOrders = new Array(drawOrderCount);
            // var timeline = new Array(drawOrderCount);
            var slotCount = this.json.slots.length;
            for(var i = 0; i < drawOrderCount; i++){
                var drawOrderMap = {};
                var offsetCount = this.readInt(true);
                // var drawOrder = new Array(slotCount);
                // for(var ii = slotCount - 1; ii >= 0; ii--){
                //     drawOrder[ii] = -1;
                // }
                // var unchanged = new Array(slotCount - offsetCount);
                // var originalIndex = 0, unchangedIndex = 0;
                var offsets = new Array(offsetCount);
                for(var ii = 0; ii < offsetCount; ii++){
                    var offsetMap = {};
                    var slotIndex = this.readInt(true);
                    offsetMap.slot = this.json.slots[slotIndex].name;
                    // while (originalIndex != slotIndex)
                    //     unchanged[unchangedIndex++] = originalIndex++;
                    var dooffset = this.readInt(true);
                    offsetMap.offset = dooffset;
                    // drawOrder[originalIndex + dooffset] = originalIndex++;
                    offsets[ii] = offsetMap;
                }
                drawOrderMap.offsets = offsets;

                // while(originalIndex < slotCount)
                //     unchanged[unchangedIndex++] = originalIndex++;
                // for (var ii = slotCount - 1; ii >= 0; ii--){
                //     if (drawOrder[ii] == -1)
                //         drawOrder[ii] = unchanged[--unchangedIndex];
                var tltime = this.readFloat();
                drawOrderMap.time = tltime;
                drawOrders[i] = drawOrderMap;
            }
            duration = Math.max(duration, drawOrders[drawOrderCount - 1].time);
            animation.drawOrder = drawOrders;
        }

        // Event timeline.
        var eventCount = this.readInt(true);
        if(eventCount > 0){
            var events = new Array(eventCount);
            for(var i = 0; i < eventCount; i++){
                var time = this.readFloat();
                var name = this.json.eventsName[this.readInt(true)];
                var eventData = this.json.events[name];
                var e = {};
                e.name = name;
                e.int = this.readInt(true);
                e.float = this.readFloat();
                e.string = this.readBoolean() ? this.readString() : eventData.string;
                e.time = time;
                events[i] = e;
            }
            duration = Math.max(duration, events[eventCount - 1].time);
            animation.events = events;
        }
        return animation;
    }
}


function SkeletonLoader(path){
	var path = path;
	var resources = window.chibiAnimationCache = window.chibiAnimationCache || {};
	var loader = new PIXI.loaders.Loader(path);
	var RES_PATH = ['skel', 'json', 'atlas', 'png'];
	
	return {
		log : function(l){
			console.log(l + " : SkeletonLoader");
		},
		getfullpath : function(genus, type, dormMode, useDormSpritemap, useEnemySpritemap){
			var full_path = '';
			var linkGen = window.gfUtils.createWikiPathPart;
			var dormAddition = "";
			if (dormMode) {
			  dormAddition = "dorm_";
			}
			var dormSpritesAddition = useDormSpritemap ? dormAddition : "";
			var modGenus = useEnemySpritemap ? genus.substring(0, genus.length-12) : genus;
			
			if (type == "png")
				full_path = linkGen(modGenus + "_chibi_" + dormSpritesAddition + "spritemap.png") + modGenus + "_chibi_" + dormSpritesAddition + "spritemap.png"; 
			else if (type == "atlas")
				full_path = linkGen(modGenus + "_chibi_" + dormSpritesAddition + "atlas.txt") + modGenus + "_chibi_" + dormSpritesAddition + "atlas.txt";
			else if (type == "skel")
				full_path = linkGen(genus + "_chibi_" + dormAddition + "skel.skel") + genus + "_chibi_" + dormAddition + "skel.skel";
			else if (type == "json")
				full_path = linkGen(genus + "_chibi_" + dormAddition + "skel.txt") + genus + "_chibi_" + dormAddition + "skel.txt";
			console.log("Fetching "+full_path);
			return  full_path;
		},
		load : function(genus, dormMode, successCallback, failureCallback){
			var res_name;
			if (typeof genus === "object") {
				var regexp = /^(?:.+\/)?(.*)_chibi_.*$/ig;
				var match = regexp.exec(genus.png);
				res_name = match[1];
			} else {
				res_name = genus;
			}
			
			var res_cache_name = res_name;
			if (dormMode) res_cache_name += "-dorm";
			
            var precheckHandler = function(skeletonLoaderReference, useDormSpritemap, useEnemySpritemap) {
                try {
					if(!genus){
						this.log("????");
						return ;
					}
					
					var res_paths = {};
					
					if (typeof genus === "object") {
						res_paths.json = genus.json;
						res_paths.skel = genus.skel;
						res_paths.atlas = genus.atlas;
						res_paths.png = genus.png;
					} else {
						for(var i = 0; i < RES_PATH.length; i++){
							res_paths[RES_PATH[i]] = skeletonLoaderReference.getfullpath(genus, RES_PATH[i], dormMode, useDormSpritemap, useEnemySpritemap);
						}
					}
					
					if (resources.hasOwnProperty(res_cache_name)) {
						successCallback(resources[res_cache_name]);
						return;
					}
		
					if (genus == "Destroyer") loader.add(res_cache_name + '-json', res_paths.json, { 'xhrTypr' : 'text' }); // Why is she the only one?!
					if (!resources.hasOwnProperty(res_cache_name+'-skel') && genus !== "Destroyer") loader.add(res_cache_name + '-skel', res_paths.skel, { 'xhrType' : 'arraybuffer' });
					if (!resources.hasOwnProperty(res_cache_name+'-atlas')) loader.add(res_cache_name + '-atlas', res_paths.atlas, { 'xhrTypr' : 'text' });
					if (!resources.hasOwnProperty(res_cache_name+'-png')) loader.add(res_cache_name + '-png', res_paths.png, { 'xhrTypr' : 'png' });
					loader.load(function(loader, paramResources) {
					  try {
						var rawSkeletonData;
						var rawAtlasData = resources[res_cache_name + '-atlas'] ? resources[res_cache_name + '-atlas'].data : paramResources[res_cache_name + '-atlas'].data;
						var rawPngData = resources[res_cache_name + '-png'] ? resources[res_cache_name + '-png'].data : paramResources[res_cache_name + '-png'].data;
						
						if (!resources.hasOwnProperty(res_cache_name)) {
							if(paramResources[res_cache_name + '-json']){
								rawSkeletonData = JSON.parse(paramResources[res_cache_name + '-json'].data);
							} else {
								var skelDataBinaryToUse = resources[res_cache_name + '-skel'] ? resources[res_cache_name + '-skel'].data : paramResources[res_cache_name + '-skel'].data;
								resources[res_cache_name + '-skel'] = skelDataBinaryToUse;
								var rawdata = skelDataBinaryToUse;
								if (rawdata != null && typeof(rawdata) === 'string' && rawdata.charAt(0) === '{') {
									// Dirty quickfix if data is json format :)
									rawSkeletonData = JSON.parse(rawdata);
								} else {
									var skel_bin = new SkeletonBinary();
									skel_bin.data = new Uint8Array(rawdata);
									skel_bin.initJson();
									rawSkeletonData = skel_bin.json;
								}
							}
		
							var spineAtlas = new PIXI.spine.SpineRuntime.Atlas(rawAtlasData, function(line, callback, pngData) {
								if (!(pngData)) {
								  pngData = rawPngData;
								}
								callback(new PIXI.BaseTexture(pngData));
							});
							var spineAtlasParser = new PIXI.spine.SpineRuntime.AtlasAttachmentParser(spineAtlas);
							var spineJsonParser = new PIXI.spine.SpineRuntime.SkeletonJsonParser(spineAtlasParser);
							var skeletonData = spineJsonParser.readSkeletonData(rawSkeletonData, name);
							
							resources[res_cache_name + '-atlas'] = rawAtlasData;
							resources[res_cache_name + '-png'] = rawPngData;
							resources[res_cache_name] = skeletonData;
						}
		
						successCallback(resources[res_cache_name]);

                  } catch(err) {
                    failureCallback(err);
                  }
				});
              } catch(err) {
                failureCallback(err);
              }
            };
                    
			//Handle fallback files
            var skeletonLoaderReference = this;
            if (typeof genus === "object") {
            	precheckHandler(skeletonLoaderReference, false, false);
            } else {
				if(new RegExp("Assimilated(?!\_\\(Alt\\))").test(window.location.href)) {
					//Is a base assimilated unit: fall back to enemy atlas and spritemap
					new mw.Api().get( {
						action: "query",
						titles: [ "File:" + res_name + "_chibi_atlas.txt" ],
					} ).then( function( ret ) {
						console.log(ret);
						$.each( ret.query.pages, function() {
							if ( this.missing != null ) {
								precheckHandler(skeletonLoaderReference, false, true);
							} else {
								precheckHandler(skeletonLoaderReference, false, false);
							}
						} );
					}, function( error ) {
						precheckHandler(skeletonLoaderReference, false, false);
					} );
				} else {
					//Is a normal doll: fall back to non-dorm atlas and spritemap
					new mw.Api().get( {
						action: "query",
						titles: [ "File:" + res_name + "_chibi_dorm_atlas.txt" ],
					} ).then( function( ret ) {
						console.log(ret);
						$.each( ret.query.pages, function() {
							if ( this.missing !== "" ) {
								precheckHandler(skeletonLoaderReference, true, false);
							} else {
								precheckHandler(skeletonLoaderReference, false, false);
							}
						} );
					}, function( error ) {
						precheckHandler(skeletonLoaderReference, false, false);
					} );
				}
            }
		}
	};
};


function BaseView(w, h){
	var width = w || 400;
	var height = h || 400;
	var last_time = 0;
	var now_time = 0;
	var isUpdate = true;
	var animationframe = null;
	var animations = new Array();
	var player = new Array();
	var stage = new PIXI.Container;
	var renderer = PIXI.autoDetectRenderer(width, height, { transparent : true, preserveDrawingBuffer: true });
	var self = this;
	var animate = function(t) {
			animationframe = window.requestAnimationFrame(function(time) { animate(time); });
			last_time = now_time;
			now_time = t;
			var time_diff = now_time - last_time;
			if(isUpdate){
				for(var i = 0; i < player.length; i++){
					if(player[i].update && player[i].isupdate){
						player[i].update(time_diff / 1000);
					}
				}
			}
			
			renderer.render(stage);
		};
	
	return {
		clean : function(){
			stage.removeChildren();
			player = new Array();
		},
		getRenderer : function(){
			return renderer;
		},
		addSprite : function(element){
			stage.addChild(element);
		},
		addSpinePlayer : function(skeletonData, requestedScale){
			var spineplayer = new PIXI.spine.Spine(skeletonData);
			var animations = spineplayer.spineData.animations;
			spineplayer.position.set(width / 2, height * 0.60);
			
			var scaleToUse = 1;
			if (requestedScale) {
				var tmpParse = parseFloat(requestedScale);
				if (!isNaN(tmpParse)) {
					scaleToUse = tmpParse;
				}
			}
			spineplayer.scale.set(scaleToUse);
			
			spineplayer.animation_num = animations.length-1;
			spineplayer.state.setAnimationByName(0, animations[spineplayer.animation_num].name, true);
			spineplayer.skeleton.setToSetupPose();
			spineplayer.autoUpdate = false;
			spineplayer.update(0);
			spineplayer.isupdate = true;
			var num;
			num = player.push(spineplayer);
			stage.addChild(spineplayer);
			renderer.render(stage);
			return num;
		},
		nextAnimation : function(){
			var jumpAnimation = false;
			
			for (var playerIdx = 0; playerIdx < player.length; playerIdx++) {
				var currentPlayer = player[playerIdx];
				if(currentPlayer && currentPlayer.spineData && currentPlayer.spineData.animations){
					var animations = currentPlayer.spineData.animations;
					currentPlayer.animation_num = (currentPlayer.animation_num + 1) % animations.length;
					
					var animationName = animations[currentPlayer.animation_num].name;
					var hasVictoryLoop = this.hasVictoryLoop(animations);
					var isVictoryAnimation = animationName == "victory";
					
					// Generally it should be repeatet
					var repeat = true;
					repeat &= animationName != "die"; // except on "die" animations
					repeat &= !isVictoryAnimation || isVictoryAnimation && !hasVictoryLoop; // victory should repeat except if it has victoryloop
					
					currentPlayer.state.setAnimationByName(0, animationName, repeat);
					
					// if there is a victoryloop animation and victory is now showing, chain them up
					if (isVictoryAnimation && hasVictoryLoop) {
						currentPlayer.state.addAnimationByName(0, "victoryloop", true, 0);
					}
					
					currentPlayer.update(0);
					
					// We skip on animations without movement and on victoryloop (which is already chained to another animation)
					if (animations[currentPlayer.animation_num].duration == 0.0 || (hasVictoryLoop && animationName == "victoryloop")) {
						jumpAnimation = true;
					}
				}
			}
			
			if (jumpAnimation) {
				this.nextAnimation();
			}
		},
		hasVictoryLoop: function(anims) {
			for (var idx = 0; idx < anims.length; idx++) {
				if (anims[idx].name == "victoryloop") {
					return true;
				}
			}
			return false;
		},
		changeupdate : function(num){
			player[num].isupdate = !player[num].isupdate;
			return player[num].isupdate;
		},
		upplayer : function(num){
			if(num <= 0){
				return null;
			}
			var now = stage.getChildIndex(player[num]);
			var next = stage.getChildIndex(player[num - 1]);
			var p = player[num];
			player[num] = player[num - 1];
			player[num  - 1] = p;
			stage.addChildAt(player[num], now);
			stage.addChildAt(player[num - 1], next);
			return num - 1;
		},
		downplayer : function(num){
			if(num >= player.length - 1){
				return null;
			}
			var now = stage.getChildIndex(player[num]);
			var next = stage.getChildIndex(player[num + 1]);
			var p = player[num];
			player[num] = player[num + 1];
			player[num  + 1] = p;
			stage.addChildAt(player[num], now);
			stage.addChildAt(player[num + 1], next);
			return num + 1;
		},
		addImagePlayer : function(texture){
			var imageplayer = new PIXI.Sprite(texture);
			imageplayer.anchor.set(0.5);
			imageplayer.position.set(width / 2, height / 2);
			player.push(imageplayer);
			stage.addChild(imageplayer);
			renderer.render(stage);
		},
		start : function(){
			animationframe = window.requestAnimationFrame(function(time) { animate(time); });
		}
	};
};

console.log("Loaded Chibi animation Gadget.");