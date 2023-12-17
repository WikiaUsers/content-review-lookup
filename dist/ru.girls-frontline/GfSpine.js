/*function Animation(){
	this.animations = new Array();
	this.animationframe = null;
}
Animation.prototype = {
	start : function(){
		this.animationframe = window.requestAnimationFrame((time) => {
			this.animate(time);
		});
	},
	animate : function(t){
		this.animationframe = window.requestAnimationFrame((time) => {
			this.animate(time);
		});
		for(var i = 0; i < this.animations.length; i++){
			this.animations[i](t);
		}
	}
}


function Atlas(){};

Atlas.prototype = {
    data : null,
    getData : function(url, fun){
        var s = this;
        this.callback = fun;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.responseType = "text";
        xhr.onload = function(e, n=s){
            if(this.status==200 || this.status==0){
                var data = this.responseText;
                if(data){
                    n.data = data;
                    n.callback("atlas");
                }
            }
        }
        xhr.send();
    }
}


function BaseLoader(path, data){
	this.path = path;
	this.data = data;
	this.loader = new PIXI.loaders.Loader(this.path);
}


function SkeletonBinary(){
    this.data = null;
    this.scale = 1;
    this.json = {};
    this.nextNum = 0;
    this.chars = null;
};

SkeletonBinary.prototype = {
    BlendMode : ["normal", "additive", "multiply", "screen"],
    AttachmentType : ["region", "boundingbox", "mesh", "skinnedmesh"],

    readByte : function(){
        return this.nextNum < this.data.length ? this.data[this.nextNum++] : null;
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
    readString(){
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
        var ikIndex = this.readInt(true);
        if(ikIndex > 0){
            this.json.ik = new Array(this.readInt(true));
            var ik = this.json.ik;
            for(var i = 0; i < ikIndex; i++){
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
    readSkin(skinName, nonessential){
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
    readAttachment(attachmentName, nonessential){
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
    readCurve(frameIndex, timeline){
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
    readAnimation(name){
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
                var bendPositive = this.readBoolean();
                // Maybe use ReadSByte()
                timeline[frameIndex].time = time;
                timeline[frameIndex].mix = mix;
                timeline[frameIndex].bendPositive = bendPositive;
                if(frameIndex < frameCount - 1)
                    this.readCurve(frameIndex, timeline);
            }
            ik[this.json.ik[ikIndex]] = timeline;
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


function SkeletonLoader(path, data){
	this.path = path;
	this.basedata = data;
	this.resources = {};
	this.loader = new PIXI.loaders.Loader(this.path);
}

SkeletonLoader.prototype = {
	log : function(l){
		console.log(l + " : SkeletonLoader");
	},
	getfullpath : function(genus, name, type){
		var full_path = '';
		//if(this.basedata[genus][name][type]){
		//	full_path = genus + '-' + this.basedata[genus][name][type] + '.' + type;
		//}else{
		//	full_path = genus + '-' + name + '.' + type;
		//}
		if (type == "png")
			full_path = genus + "_chibi_" + "spritemap.png"; 
		else if (type == "atlas")
			full_path = genus + "_chibi_" + "atlas";
		else if (type == "skel")
			full_path = genus + "_chibi_" + "skel.skel";

		return  full_path;
	},

	RES_PATH : ['skel', 'json', 'atlas', 'png'],
	load : function(genus, name, callback){
		if(!genus || !name){
			log("????");
			return ;
		}
		var res_name = genus + '-' + name;

		if(!this.basedata[genus] || !this.basedata[genus][name]){
			log('????' + res_name);
			return ;
		}

		if(this.resources[genus] && this.resources[genus][name]){
			callback(this.resources[genus][name]);
			return ;
		}

		var info = this.basedata[genus][name];
		var res_paths = {};
		for(var i = 0; i < this.RES_PATH.length; i++){
			res_paths[this.RES_PATH[i]] = this.getfullpath(genus, name, this.RES_PATH[i]);
		}

		if(info['json']){
			this.loader.add(res_name + '-json', res_paths.json, { 'xhrType' : 'text' });
		}else{
			this.loader.add(res_name + '-skel', res_paths.skel, { 'xhrType' : 'arraybuffer' });
		}
		this.loader.add(res_name + '-atlas', res_paths.atlas + '.txt', { 'xhrTypr' : 'text' });
		this.loader.add(res_name + '-png', res_paths.png, { 'xhrTypr' : 'png' });
		this.loader.load((loader, resources) => {
			var rawSkeletonData, rawAtlasData, rawPngData;

			if(resources[res_name + '-json']){
				rawSkeletonData = JSON.parse(resources[res_name + '-json'].data);
			}else{
				var skel_bin = new SkeletonBinary();
				skel_bin.data = new Uint8Array(resources[res_name + '-skel'].data);
				skel_bin.initJson();
				rawSkeletonData = skel_bin.json;
			}
			rawAtlasData = resources[res_name + '-atlas'].data;
			rawPngData = resources[res_name + '-png'].data;

			var spineAtlas = new PIXI.spine.SpineRuntime.Atlas(rawAtlasData, function(line, callback, pngData = rawPngData) {
                callback(new PIXI.BaseTexture(pngData));
            });
            var spineAtlasParser = new PIXI.spine.SpineRuntime.AtlasAttachmentParser(spineAtlas);
            var spineJsonParser = new PIXI.spine.SpineRuntime.SkeletonJsonParser(spineAtlasParser);
            var skeletonData = spineJsonParser.readSkeletonData(rawSkeletonData, name);

            this.resources[genus] = this.resources[genus] || {};
            this.resources[genus][name] = skeletonData;

            callback(this.resources[genus][name]);
		});
	}
}


function BaseView(w, h){
	this.width = w || 400;
	this.height = h || 400;
	this.last_time = 0;
	this.now_time = 0;
	this.isUpdate = true;
	this.animationframe = null;
	this.animations = new Array();
	this.player = new Array();
	this.stage = new PIXI.Container;
	this.renderer = PIXI.autoDetectRenderer(this.width, this.height, { transparent : true });
}

BaseView.prototype = {
	clean : function(){
		this.stage.removeChildren();
		this.player = new Array();
	},
	addSpinePlayer : function(skeletonData){
		var spineplayer = new PIXI.spine.Spine(skeletonData);
		var animations = spineplayer.spineData.animations;
		spineplayer.position.set(this.width / 2, this.height * 0.60);
		spineplayer.scale.set(1);
		spineplayer.animation_num = animations.length-1;
        spineplayer.state.setAnimationByName(0, animations[spineplayer.animation_num].name, true);
        spineplayer.skeleton.setToSetupPose();
        spineplayer.autoUpdate = false;
        spineplayer.update(0);
        spineplayer.isupdate = true;
        var num;
        num = this.player.push(spineplayer);
        this.stage.addChild(spineplayer);
        this.renderer.render(this.stage);
        return num;
	},
	nextAnimation : function(num){
		if(this.player[num] && this.player[num].spineData && this.player[num].spineData.animations){
			var animations = this.player[num].spineData.animations;
			this.player[num].animation_num = (this.player[num].animation_num + 1) % animations.length;
			
			var animationName = animations[this.player[num].animation_num].name;
			var hasVictoryLoop = this.hasVictoryLoop(animations);
			var isVictoryAnimation = animationName == "victory";
			
			// Generally it should be repeatet
			var repeat = true;
			repeat &= animationName != "die"; // except on "die" animations
			repeat &= !isVictoryAnimation || isVictoryAnimation && !hasVictoryLoop; // victory should repeat except if it has victoryloop
			
			this.player[num].state.setAnimationByName(0, animationName, repeat);
			
			// if there is a victoryloop animation and victory is now showing, chain them up
			if (isVictoryAnimation && hasVictoryLoop) {
				this.player[num].state.addAnimationByName(0, "victoryloop", true, 0);
			}
			
			this.player[num].update(0);
			
			// We skip on animations without movement and on victoryloop (which is already chained to another animation)
			if (animations[this.player[num].animation_num].duration == 0.0 || (hasVictoryLoop && animationName == "victoryloop")) {
				this.nextAnimation(num);
			}
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
		this.player[num].isupdate = !this.player[num].isupdate;
		return this.player[num].isupdate;
	},
	upplayer : function(num){
		if(num <= 0){
			return null;
		}
		var now = this.stage.getChildIndex(this.player[num]);
		var next = this.stage.getChildIndex(this.player[num - 1]);
		var p = this.player[num];
		this.player[num] = this.player[num - 1];
		this.player[num  - 1] = p;
		this.stage.addChildAt(this.player[num], now);
		this.stage.addChildAt(this.player[num - 1], next);
		return num - 1;
	},
	downplayer : function(num){
		if(num >= this.player.length - 1){
			return null;
		}
		var now = this.stage.getChildIndex(this.player[num]);
		var next = this.stage.getChildIndex(this.player[num + 1]);
		var p = this.player[num];
		this.player[num] = this.player[num + 1];
		this.player[num  + 1] = p;
		this.stage.addChildAt(this.player[num], now);
		this.stage.addChildAt(this.player[num + 1], next);
		return num + 1;
	},
	addImagePlayer : function(texture){
		var imageplayer = new PIXI.Sprite(texture);
		imageplayer.anchor.set(0.5);
		imageplayer.position.set(this.width / 2, this.height / 2);
		this.player.push(imageplayer);
		this.stage.addChild(imageplayer);
        this.renderer.render(this.stage);
	},
	start : function(){
		this.animationframe = window.requestAnimationFrame((time) => {
			this.animate(time);
		});
	},
	animate : function(t){
		this.animationframe = window.requestAnimationFrame((time) => {
			this.animate(time);
		});
		this.last_time = this.now_time;
		this.now_time = t;
		var time_diff = this.now_time - this.last_time;
		if(this.isUpdate){
			for(var i = 0; i < this.player.length; i++){
				if(this.player[i].update && this.player[i].isupdate){
					this.player[i].update(time_diff / 1000);
				}
			}
		}
		for(var i = 0; i < this.animations.length; i++){
			this.animations[i](t);
		}
		this.renderer.render(this.stage);
	}
}*/