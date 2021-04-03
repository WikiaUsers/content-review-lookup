// Comment here because of caching issues when trying to use Test Mode to check the code.

mw.hook("wikipage.content").add(function($content) {
var secretPages = ["Frail_Wooden_Sword","Guttermouth_Set","Kingrat"];

for (var i = 0; i < secretPages.length; i++) {
    if ($("body").hasClass("page-" + secretPages[i])) { // For the given pages, add a small button.
        var imgClicker = document.createElement("div");
        imgClicker.className = "ffa2020-img-clicker";
        
        $("#mw-content-text").children().last().after(imgClicker);
        var imgClass = "ffa2020-img-popup ffa2020-img-popup-" + i;
        var isOpen = false;
        
        // Adds a popup showing the secret image. Click the popup to close it.
        $(imgClicker).click(function() {
            if (isOpen) return;
            isOpen = true;
            var popup = document.createElement("div");
            popup.className = imgClass;
            $(popup).click(function() {
                $(popup).remove();
                isOpen = false;
            });
            
            $("body").append(popup);
        });
        
        break;
    }
}

// We only apply the effect on the article 'Ratboy Secrets'.
if (!$("body").hasClass("page-Ratboy_Secrets")) return;

var article = $("#content");
var trigger = document.createElement("div");
trigger.className = "ffa2020-trigger";
article.after(trigger);

var triggerSymbols = ["#","_","-","/","\\","!","0","1","~","^","*","CL1CK"];
var glitchEffect = setInterval(function() {
    trigger.innerText = triggerSymbols[Math.floor(Math.random() * triggerSymbols.length)];
}, 50);

// ——————————————————————————————————————————————————
// TextScramble - taken from https://codepen.io/soulwire/pen/mErPAK
// Changed to work with native JS stuff instead of Babel?
// ——————————————————————————————————————————————————
function TextScramble(el, callback) {
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
            var start = Math.floor(Math.random() * 20);
            var end = start + Math.floor(Math.random() * 80);
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
        for (var i = 0, n = this.queue.length; i < n; i += 2) {
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

var sleep = function(ms) {
    return new Promise(function(completed) { setTimeout(completed, ms); });
};

$(trigger).click(function() { // User clicks weird glitchy letter, which triggers a transition to our secret make-believe update.
    clearInterval(glitchEffect);
    glitchEffect = null;
    $(trigger).remove(); // Removes the single-use button.
    
    // We want to swap to our secret page, so we remove the current page.
    // Reversible by reloading the webpage.
    var leafs = article.find("#mw-content-text *:not(:has(*))");
    leafs.each(function(_, elem) {
        $(elem).addClass("glitch-text");
        // Puts all our Promises into an array to wait for all to finish.
        new TextScramble(elem).setText("").then(function() {
            $(elem).remove();
        });
    });
    article.find("#mw-content-text").fadeOut(1000);
    sleep(1000).then(function() {
    
    article.find("#mw-content-text").html('<div class="ffa2020-banner">' +
        '<div class="ffa2020-banner-bg"></div>' +
        'D4T4 4RCH1V3 ØW-2' +
    '</div>' +
'<div class="ffa2020-content">Tomorrow’s “Dream of the Beyond” update introduces the long-lost <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Empire of the Dragonkind</a> as an explorable new realm for you and your fellow adventurers.<br>One of the sweet perks it comes with is a portal for easy access to all major hub areas from the relative comfort of your own golden chambers of the <a href="https://twitter.com/SpectraboxRBLX/status/1165703667200208896">Dreamy Dragon</a>.<br><br>Each week, one of the three major <a href="https://www.youtube.com/watch?v=NYK5rkxXs20">Ratboy Orders</a> that make up the governing force preceding that of <a href="/wiki/Kenneth\'s_Paroxysm_Flower_Helmet">Kenneth’s Paroxysm Flower Helmet</a>, will send an emissary to the Empire of the Dragonkind with a chest for you. Complete the daily <a href="/wiki/Fantastic_Frontier_-_Roblox_Wiki?file=B06115FE-2489-4E98-B309-B7AFD066E598.jpeg">Boss Encounter</a> in the <a href="https://imgur.com/a/TkKMxfo">Fantastic Ratboy Achievement Section</a> to earn <i>Achievement Points</i> that can be used to open the chest once per week. The chest resets on Monday 7:30 AM EST.<br>' +
'<div class="ffa2020-horizontal">' +
'<div class="ffa2020-inline ffa2020-pull-left">' +
    '<img src="https://vignette.wikia.nocookie.net/central/images/5/58/Dimdimich-screenshot-1.png">' +
    '<img src="https://vignette.wikia.nocookie.net/central/images/3/3e/Dimdimich-screenshot-2.png">' +
'</div>' +
'<div class="ffa2020-inline-text">The new update also brings some more coherent story-element to the game, which has long been void.<br>In early brainstorming, the developer team considered the idea of creating content like <a href="https://www.youtube.com/watch?v=QSQwZlRMVAM">Bonus Missions</a>.<br><br>' +
'I’ll give you a short recap of the memo you can find in-game  once the update lands:<br><span class="ffa2020-cite">”A Pact squadron tracking the whereabouts of The Eternal Ratboy to the north of the <a href="https://discord.gg/ff">Endless Forest</a> were ambushed by <a href="/wiki/Bandit">bandits</a>, with <a href="/wiki/Croc_Man">Squad Leader Croctear</a> and numerous others taken hostage by <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Malifice the Monstrous</a>. In response, rescue teams were formed to track them down in this dangerous, uncharted territory.<br>In <a href="https://discord.gg/zAmdZW2">Spirit Vale</a>, the group faced heavy opposition from Malifice’s bandits, who were well equipped and had fortified themselves among the bestial <a href="/wiki/Ratboy_Secrets">Seeker of Souls</a>.”</span></div>' +
'</div><div class="ffa2020-horizontal">' +
'<div class="ffa2020-inline-text">The journey to the Empire of the Dragonkind and all its secrets and monsters is something to look forward to. To break the ice a little, the <a href="/wiki/Ratfolk">Rats of Donglemoore</a> have provided a small shopping list for you to complete - and obtain the mightiest weapon of all.<br><br>' +
'Good luck, adventurer!<br>' +
'<div class="ffa2020-sl">' +
    '<div class="ffa2020-sl-item ffa2020-sl-item-1"></div>' +
    '<div class="ffa2020-sl-item ffa2020-sl-item-2"></div>' +
    '<div class="ffa2020-sl-item ffa2020-sl-item-3"></div>' +
'</div>' +
'</div><div class="ffa2020-inline ffa2020-pull-right">' +
'<img src="https://vignette.wikia.nocookie.net/central/images/b/b8/Dimdimich-screenshot-3.png">' +
'<img src="https://vignette.wikia.nocookie.net/central/images/4/41/Dimdimich-screenshot-4.png">' +
'</div>' +

'</div>' +
'</div>').fadeIn();
});
});
});