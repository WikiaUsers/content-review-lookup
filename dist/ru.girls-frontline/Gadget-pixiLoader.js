window.animations = window.animations || {};

if (!window.animations.PIXILoader) {
	window.animations.PIXILoader = {};
	window.animations.PIXILoader.initialized = false;
	window.animations.PIXILoader.init = function() {
		return new Promise(
		    function (resolve, reject) {
		    	if (window.animations.PIXILoader.initialized) {
		    		resolve(null);
		    		return;
		    	}
		    	
		    	$.ajax({
				    cache: true,
				    url: "/index.php?title=MediaWiki:Gadget-pixiJsWithSpine.js&action=raw",
				    dataType: "script"
				}).done(function() {
					console.log("Request PIXI JS Framework successfull");
					window.animations.PIXILoader.initialized = true;
				    resolve(null);
				}).fail(function() {
			        console.error("Loading PIXI framework failed");
			        var reason = new Error('PIXI framework failed loading');
			        reject(reason);
			    });
		    }
		);
	};
}

console.log("Loaded PIXI JS Gadget");