/* Created for the Animal Crossing Wiki <http://animalcrossing.wikia.com>
Everything's licensed under the MIT License (see below).

The MIT License (MIT)

Copyright (c) 2015 Wikia User 'Incongruence'

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */
DrawingApp = {
    drawing: false, // whether or not we should draw a line

    html: '<div id="drawing-app"> <canvas id="drawing" width="400" height="245"></canvas> <a href="#" onclick="DrawingApp.cSave();">Save</a> <a href="#" style="background: red;" onclick="DrawingApp.cClear();">Clear</a> <a href="#" style="background: blue;" onclick="DrawingApp.cHelp();">?</a> <a href="#" style="background: grey;" onclick="DrawingApp.cCustomColor();">Color</a> <a href="#" style="background: green;" onclick="DrawingApp.cSize();">Size</a> <div id="colors"> <a class="color" style="background: white;" onclick="DrawingApp.cColor(\'#FFFFFF\');"></a> <a class="color" style="background: black;" onclick="DrawingApp.cColor(\'#000000\');"></a> <a class="color" style="background: #00cc00;" onclick="DrawingApp.cColor(\'#00CC00\');"></a> <a class="color" style="background: #0000cc;" onclick="DrawingApp.cColor(\'#0000CC\');"></a> <a class="color" style="background: #cc0000;" onclick="DrawingApp.cColor(\'#CC0000\');"></a> <a class="color" style="background: #FF00FF;" onclick="DrawingApp.cColor(\'#FF00FF\');"></a> </div></div>',
    css: 'body{font-family: "Arial", "Helvetica", sans-serif;}#drawing-app{border: 1px solid black; width: 400px; height: 275px; background: #ccc;}#drawing{border-bottom: 1px solid black; background: white; cursor: crosshair;}#drawing-app a{color: white; margin-left: 3px; background: #444; padding: 2px; text-decoration: none; border: 1px solid black; vertical-align: -3px;}.color{width: 12px; height: 12px; display: inline-block; border: 1px solid black;}#colors{float: right; margin-right: 10px; margin-top: 3px;}',

    VERSION: "1.3.0",

    cHelp: function() {
        alert("ACWiki Paint - v" + DrawingApp.VERSION + "\nTo set a custom color, use the 'Color' button.\nCreated by Incongruence, report bugs to her.");
    },

    cCustomColor: function() {
        DrawingApp.context.strokeStyle = prompt("Color (rgba, name or hex with #):");
    },

    cColor: function(color) {
        DrawingApp.context.strokeStyle = color;
    },

    cClear: function() {
        if (confirm("Are you sure?")) {
            DrawingApp.context.clearRect(0, 0, 400, 245);
            DrawingApp.context.fillStyle = "#FFFFFF";
            DrawingApp.context.fillRect(0, 0, 400, 245);
        }
    },

    cData: function() {
        return DrawingApp.canvas.toDataURL();
    },

    cSave: function() {
        window.open(DrawingApp.canvas.toDataURL());
    },

    cSize: function() {
        DrawingApp.context.lineWidth = prompt("Line width (min 1, max 30):");
        if (DrawingApp.context.lineWidth > 30) DrawingApp.context.lineWidth = 30;
        if (DrawingApp.context.lineWidth < 1) DrawingApp.context.lineWidth = 1;
    },

    doPaint: function(evt) {
        var x = evt.pageX - $('#drawing').offset().left;
        var y = evt.pageY - $('#drawing').offset().top;
        DrawingApp.context.lineTo(x, y);
        DrawingApp.context.stroke();
    },

    loadApp: function() {
        createInlineAlert("Loading the drawing app");

        DrawingApp.app = $.showCustomModal("Drawing", "<div id='game-box'></div>", {
            id: "drawingWindow",
            width: 400,
            buttons: [{
                id: "close",
                message: "Close",
                defaultButton: true,
                handler: function() {
                    $("drawingWindow").closeModal();
                    ChatGame.reset();
                }
            }]
        });

        $(".blackout").remove(); // make the chat usable with modal open
        $(DrawingApp.app).draggable({
            cancel: "#game-box",
        }); // make the modal movable
        $("#game-box").html(""); // blank the game box just in case

        $("head").append("<style>" + DrawingApp.css + "</style>");
        $("#game-box").append(DrawingApp.html); // load our assets into the window

        DrawingApp.canvas = document.getElementById("drawing"),
        DrawingApp.context = DrawingApp.canvas.getContext("2d"),

        DrawingApp.context.lineWidth = 5;
        DrawingApp.context.lineJoin = "round";
        DrawingApp.context.lineCap = "round";

        // Stope the output being transparent.
        DrawingApp.context.fillStyle = "#FFFFFF";
        DrawingApp.context.fillRect(0, 0, 400, 245);

        DrawingApp.canvas.addEventListener('mousedown', function(evt) {
            var x = evt.pageX - $('#drawing').offset().left;
            var y = evt.pageY - $('#drawing').offset().top;
            DrawingApp.context.beginPath();
            DrawingApp.context.moveTo(x, y);
            DrawingApp.canvas.addEventListener('mousemove', DrawingApp.doPaint);
        });

        DrawingApp.canvas.addEventListener('mouseup', function(evt) {
            DrawingApp.canvas.removeEventListener('mousemove', DrawingApp.doPaint);
        });
    }
};

DrawingApp.loadApp();