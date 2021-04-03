/*
    Easter egg planned for April Fools.
    Turns on text glitching for our fandom april fools-themed article (Kenneth's Paroxysm Flower Helmet), as well as the secret April Fools minigame.
*/
mw.hook("wikipage.content").add(function($content) {
    // Restrict to certain article. TO-DO: Edit to page-Kenneth_s_Paroxysm_Flower_Helmet.
    if ($("body").hasClass("page-Kenneth_s_Paroxysm_Flower_Helmet") || $("body").hasClass("page-User_As8D")) {
        setTimeout(function() {
            var minigameActive = false;
            
            // ——————————————————————————————————————————————————
            // TextScramble - taken from https://codepen.io/soulwire/pen/mErPAK
            // Changed to work with native JS stuff instead of Babel?
            // ——————————————————————————————————————————————————
            function TextScramble(el) {
                this.el = el;
                this.chars = '!<>-_\\/[]{}—=+*^?#________';
                this.queue = [];
                
                this.setText = function(newText) {
                    var oldText = this.el.innerText;
                    var length = Math.max((oldText || '').length, (newText || '').length);
                    var self = this;
                    var promise = new Promise(function(resolve) { self.resolve = resolve; });
                    this.queue = [];
                    for (var i = 0; i < length; i++) {
                        var from = oldText[i] || '';
                        var to = newText[i] || '';
                        var start = Math.floor(Math.random() * 40);
                        var end = start + Math.floor(Math.random() * 40);
                        this.queue.push({ from: from, to: to, start: start, end: end });
                    }
                    cancelAnimationFrame(this.frameRequest);
                    this.frame = 0;
                    this.update();
                    return promise;
                };
                
                this.update = function() {
                    var output = '';
                    var complete = 0;
                    for (var i = 0, n = this.queue.length; i < n; i++) {
                        var from = this.queue[i].from,
                            to = this.queue[i].to,
                            start = this.queue[i].start,
                            end = this.queue[i].end,
                            char = this.queue[i].char;
                        if (this.frame >= end) {
                            complete++;
                            output += to;
                        } else if (this.frame >= start) {
                            if (!char || Math.random() < 0.28) {
                                char = this.randomChar();
                                this.queue[i].char = char;
                            }
                            output += '<span class="dud">' + char + '</span>';
                        } else {
                            output += from;
                        }
                    }
                    this.el.innerHTML = output;
                    if (complete === this.queue.length) {
                        this.resolve();
                    } else {
                        var self = this;
                        this.frameRequest = requestAnimationFrame(function() {
                            self.update();
                        });
                        this.frame++;
                    }
                };
                
                this.randomChar = function() {
                    return this.chars[Math.floor(Math.random() * this.chars.length)];
                };
            }
            
            // Enable text glitching effects.
            $(".demo-text, .glitch-text").each(function() {
                var lines = [];
                for (var i = 0; i < 10; i++) {
                    if ($(this).attr("data-line" + i) !== undefined)
                        lines.push($(this).attr("data-line" + i));
                }
                
                var fx = new TextScramble(this);
                var counter = 0;
                
                var next = function() {
                    fx.setText(lines[counter]).then(function() {
                        if (minigameActive)
                            return;
                        setTimeout(next, 3600 + Math.random() * 4800);
                    });
                    counter = (counter + 1) % lines.length;
                };
                next();
            });
            
            // Enable toggling on the secret minigame.
            $(".ffools-trigger").click(function() {
                minigameActive = true;
				var spoilerContent = $('.ffa2019-hidden-content').html();
                $("#mw-content-text").empty().html(spoilerContent);


				// ** REMOVED section due to past communication with Code Approver on different scripts ** //
				// Commented out code will not run, and this is left for legacy to the rest of the Fantastic Frontier wiki team who are interested in reading the code.
				
                /*var ifr = document.createElement("iframe"); // container for our easter egg minigame.
                
                // The iframe contains a minigame in which players collects items from the Fantastic Frontier game.
                // Uses 3rd party code:
                // - Three.js (3D engine in JavaScript)
                // - jQuery v3.3.1 (support for confetti effect)
                // - https://codepen.io/Pillowfication/pen/PNEJbY (confetti effect)
                
                // The code for the minigame can be found here: https://uppah.net/ffw_afgame/main.js
                
                ifr.src = "https://uppah.net/ffw_afgame/";
                ifr.width = 700;
                ifr.height = 450;
                $(".mw-content-text").append(ifr);*/
            });
        }, 5000);
    }
});