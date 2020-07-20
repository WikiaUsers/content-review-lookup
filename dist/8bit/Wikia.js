	/*var bg = document.createElement("canvas");

	if (bg.getContext){
		var ctx = bg.getContext('2d'),
			width = bg.width,
			height = bg.height,
			blocks = [],
			dimension = 20,
			style = document.body.style;

		var Block = function(xx, yy){
			var x = xx, y = yy,
					c = Math.floor(Math.random()*360),
					l = Math.floor(Math.random()*50),
					last = ',50%,'+l+'%)';

			return function(){
					(c < 360) ? c += 4 : c = 0;

					ctx.fillStyle = 'hsl('+c+ last;
					ctx.fillRect(x,y,dimension,dimension);
				}
		};

		for(var i = 0; i < width; i += dimension){
			for(var j = 0; j < height; j += dimension){
				blocks[blocks.length] = Block(i, j);
			}
		}

		var blocksLength = blocks.length;

		function draw() {
			for(var i = blocksLength-1;i>=0 ;i--){
				blocks[i]();
			}
			style.backgroundImage = "url(" + bg.toDataURL("image/jpg")+ ")";
		};

		draw();
		setInterval(draw,1500);
	}
*/