(function() {
    // Wait for page to load
    mw.loader.using('mediawiki.util', function() {
        // Your Breakout game code here
        var canvas = document.createElement('canvas');
        canvas.width = 480;
        canvas.height = 320;
        canvas.id = 'breakout-canvas';
        
        // Add to page when template is used
        var templateDiv = document.getElementById('breakout-game-container');
        if (templateDiv) {
            templateDiv.appendChild(canvas);
            
            // Game logic variables
            var ctx = canvas.getContext('2d');
            var ballRadius = 5;
            var x = canvas.width/2;
            var y = canvas.height-30;
            var dx = 2;
            var dy = -2;
            var paddleHeight = 10;
            var paddleWidth = 75;
            var paddleX = (canvas.width-paddleWidth)/2;
            
            // Drawing function
            function drawBall() {
                ctx.beginPath();
                ctx.arc(x, y, ballRadius, 0, Math.PI*2);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
            
            // Animation loop
            function draw() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawBall();
                
                // Update position
                x += dx;
                y += dy;
                
                requestAnimationFrame(draw);
            }
            draw();
        }
    });
})();