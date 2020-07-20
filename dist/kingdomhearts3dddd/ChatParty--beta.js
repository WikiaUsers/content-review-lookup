/**
 * @title           ChatParty
 * @author          ShermanTheMythran
 * @author          Ultimate Dark Carnage
 * @version         1.2.0
 **/

window.ChatParty = (function(window, $, mw, mainRoom){
    var client = $.client.profile(window.navigator),
        config = $.extend({}, window.ChatPartyConfig);
    
    function isSupported(){
        return (
            (client.name === 'chrome') ||
            (client.name === 'edge') ||
            (client.name === 'msie' && client.versionNumber > 9) ||
            (client.name === 'firefox' && client.versionNumber > 4) ||
            (client.name === 'opera' && client.versionNumber > 9) ||
            (client.name === 'safari' && (client.platform == 'mac' || 'ipad'))
        );
    }
    
    if (!isSupported()) return;
    console.log('Chat Party Mode has been initialized!');
    
    function val(){
        var args = [].slice.call(arguments),
            len = args.length, i = 0, v;
        while (typeof v === 'undefined' && i < len){
            v = args[i]; i++;
        }
        if (typeof v === 'undefined') return null;
        return v;
    }
    
    function merge(){
        var args = [].slice.call(arguments),
            index = 0, result = [];
        if (args.length === 0) return [];
        while (index < args.length){
            result = result.concat(args[index]);
            index++;
        }
        result = result.filter(function(item, i, a){
            return a.indexOf(item) === i;
        });
        return result;
    }
    
    function ChatParty(){
        // Disco lights
        this.light = {};
        this.light.colors = merge(config.colors,
            ['blue', 'orange', 'red', 'green', 'yellow', 'cyan', 'magenta']);
        this.light.cols = val(config.cols, 4);
        this.light.count = val(config.count, 16);
        this.light.offset = val(config.offset, 40);
        this.light.delay = val(config.delay, 2500);
        this.light.startPosX = val(config.startX, 120);
        this.light.endPosX = val(config.endX, 670);
        this.light.startPosY = val(config.startY, 180);
        this.light.endPosY = val(config.endY, 520);
        this.light.balls = [];
        this.light.options = ['white', 'colored', 'monochrome', 'monochrome2'];
        // Audio
        this.audio = {};
        this.audio.tracks = [];
        // Skins
        this.skin = {};
        this.skin.items = [];
        // UI
        this.ui = {};
        // Configurations
        this.enabled = val(config.enabled, false);
    }
    
    ChatParty.prototype.generateBalls = function(){
        var r = 0, c = 0, row = [],
            last = this.light.cols - 1, cols = this.light.cols,
            count = this.light.count;
        for (var i = 0; i < count; i++){
            if (i % cols === 0){ row = []; r++; c = 0; }
            var obj = {}, dX = this.light.endX - this.light.startX,
                dY = this.light.endY - this.light.startY,
                lX = this.light.startX + Math.round(dX * (c / cols)),
                rM = count % i, rD = Math.ceil(count / cols),
                rF = Math.floor(count / cols), rN = rM > 0 ? rD : rF,
                lY = this.light.startY + Math.round(dY * (r / rN));
            obj.color = this.getRandomColor();
            if (r % 2 === 1)
                obj.left = lX - this.light.offset;
            else
                obj.left = lX;
            obj.top = lY;
            row[row.length] = obj;
            if (c === (cols - 1)) 
                this.light.balls[this.light.balls.length] = row;
        }
    };
    
    ChatParty.prototype.getRandomColor = function(){
        var colors = this.light.colors, length = colors.length,
            randIndex = Math.floor(Math.random() * length);
        return colors[randIndex];
    };
    
    ChatParty.prototype.loadItems = function(local){
        if (typeof local !== 'boolean') local = false;
        $.ajax({
            method: 'GET',
            
            dataType: local ? 'json' : 'jsonp'
        }).always($.proxy(this.parseItems, this));
    };
    
    return ChatParty;
}(window, jQuery, mediaWiki, mainRoom));