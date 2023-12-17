window.animations = window.animations || {};

if (!window.animations.Live2dLoader) {
	window.animations.Live2dLoader = {};
	window.animations.Live2dLoader.initialized = false;
	window.animations.Live2dLoader.init = function() {
		return new Promise(
		    function (resolve, reject) {
		    	if (window.animations.Live2dLoader.initialized) {
		    		resolve(null);
		    		return;
		    	}
		    	
		    	// Make sure PIXI.JS is available first
		    	window.animations.PIXILoader.init().then(function() {
		    		// Now we can initialize Live2D
		    		$.ajax({
					    cache: true,
					    url: "/index.php?title=MediaWiki:Gadget-live2d.js&action=raw",
					    dataType: "script"
					}).done(function() {
						console.log("Request L2D Framework successfull.");
						window.animations.Live2dLoader.initialized = true;
					    resolve(null);
					}).fail(function() {
				        console.error("Loading L2D framework failed");
				        var reason = new Error('L2D framework failed loading');
				        reject(reason);
				    });
		    	});
		    }
		);
	};
}

console.log("Loaded L2D Framework Loader.");