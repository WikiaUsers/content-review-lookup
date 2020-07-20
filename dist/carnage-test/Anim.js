(function(window, document, $, mw){
    // The number of milliseconds per second
    const SECOND = 1000;
    // The base framerate (30 frames per second)
    const FRAMERATE_30 = 30;
    // The base framerate (60 frames per second)
    const FRAMERATE_60 = 60;
    // The number of milliseconds per frame (30 fps)
    const FRAME_30 = SECOND / FRAMERATE_30;
    // The number of milliseconds per frame (60 fps)
    const FRAME_60 = SECOND / FRAMERATE_60;
    // The name of the script
    const NAME = "Anim";
    
    // The core constructor
    function Anim(A, B){
        var O = Object.assign({}, null);
        if (A instanceof Node){
            var nodeType = A.nodeType;
            if (nodeType !== 1) return "This node is not an element. Please try again.";
            if (typeof B === "object") O = Object.assign({}, O, B);
            O.target = A;
        } else {
            O = Object.assign({}, O, A);
        }
        Anim.__setConfig(O);
        this.__keyframes = {};
        this.__callbacks = {};
        this.target = O.target;
        this.duration = O.duration;
        this.iterations = O.iterations;
        this.styles = O.styles;
        return this;
    }
    
    Anim.prototype.addKeyframe = function(keyframe, options){
        var O = Object.assign({}, null);
        if (typeof keyframe === "string"){
            if (typeof options === "object") O = Object.assign({}, O, options);
            O.name = keyframe;
        } else if (!Array.isArray(keyframe)){
            O = Object.assign({}, O, keyframe);
        } else {
            var A = Anim.__flatten(O);
            return Array.from(A).reduce(function(context, J){
                return context.addKeyframe(J);
            }, this);
        }
        Anim.__setKeyframeConfig(O);
        if (typeof O.name !== "string") return this;
        var name = O.name;
        if (name in this.__keyframes) this.__keyframes[name].push(new Keyframe(O));
        else this.__keyframes[name] = [new Keyframe(O)];
        return this;
    };
    
    Anim.prototype.init = function(){};
})(window, document, jQuery, mediaWiki);