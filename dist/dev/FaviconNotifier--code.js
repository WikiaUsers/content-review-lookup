/* FaviconNotifier
 *
 * Now, I know what you're thinking. "Another one of those NewMessageCount clones?"
 * Well, yes. This is another one of those NewMessageCount clones. Woohoo!
 *
 * Displays a small circle in the bottom-left of the tab favicon informing of unread messages.
 * @author Dorumin
 */

(function reloadUntilMainRoom() {
    if (!window.mainRoom) {
        setTimeout(reloadUntilMainRoom, 500);
        return;
    }
    if (window.FaviconNotifierINIT || mw.config.get('wgCanonicalSpecialPageName') != 'Chat') return;
    window.FaviconNotifierINIT = true;
    
    if (navigator.userAgent.indexOf("MSIE") >= 0 || !document.hasFocus || !window.HTMLCanvasElement) {
        console && console.log && console.log('The only version of IE supported is 11. Use a real browser.');
        return;
    }

    function circle(cx, x, y, r, color) { // T3ogd2UgbWlzcyB1 Cx
        cx.beginPath();
        cx.arc(x, y, r, 0, 2 * Math.PI);
        color && (cx.fillStyle = color);
        cx.fill();
    }

    function write(cx, text, x, y, font, color) {
        color && (cx.fillStyle = color);
        cx.font = font;
        cx.fillText(text, x, y);
    }

    function cloneCanvas(oldCanvas) {
        var newCanvas = document.createElement('canvas');
        var context = newCanvas.getContext('2d');

        //set dimensions
        newCanvas.width = oldCanvas.width;
        newCanvas.height = oldCanvas.height;

        //apply the old canvas to the new one
        context.drawImage(oldCanvas, 0, 0);

        //return the new canvas
        return newCanvas;
    }

    window.FaviconNotifier = $.extend({
        circleColor: '#dd0000',
        textColor: 'white',
        init: false,
        state: false, // false: The normal favicon is shown. true: white dot representing unread main messages. <number>: number in red circle above favicon
        link: $('link[rel="shortcut icon"]'),
        icon: $('link[rel="shortcut icon"]').attr('href')
    }, window.FaviconNotifier);

    FaviconNotifier.canvas = (function() {
        if (FaviconNotifier.icon == '/favicon.ico') {
            FaviconNotifier.icon = 'https://images.wikia.nocookie.net/common/skins/common/images/favicon.ico';
        }
        var canvas = document.createElement('canvas'),
            context = canvas.getContext('2d'),
            img = new Image();

        img.setAttribute('crossOrigin', 'anonymous');
        img.src = FaviconNotifier.icon.replace(/\w+\.wikia\.nocookie\.net/, 'images.wikia.com');
        img.onload = function() {
            canvas.width = 32;
            canvas.height = 32;
            context.drawImage(img, 0, 0, 32, 32);
            mw.hook('FaviconNotifier.loaded').fire(canvas);
        };
        img.onerror = function(e) {
            console.log('Something went wrong: ', e);
        };
        return canvas;
    })();

    FaviconNotifier.unreadIcon = (function() {
        return mw.hook('FaviconNotifier.loaded').add(function(baseCanvas) {
            var canvas = cloneCanvas(baseCanvas),
            cx = canvas.getContext('2d');
            circle(cx, 22, 22, 9, FaviconNotifier.circleColor);
            circle(cx, 22, 22, 3, FaviconNotifier.textColor);
            FaviconNotifier.unreadIcon = canvas;
        });
    })();

    FaviconNotifier.updateIcon = function(state) { // state parameter is used for aid in debugging; not used in actual code.
        state = state === undefined ? FaviconNotifier.state : state;
        if (state === false) {
            FaviconNotifier.link.attr('href', FaviconNotifier.icon);
        } else if (state === true) {
            if (FaviconNotifier.ignoreMainMessages) return;
            FaviconNotifier.link.attr('href', FaviconNotifier.unreadIcon.toDataURL('image/png'));
        } else {
            var istwodigits = false;
            if (state > 99) state = 99;
            if (state > 9) istwodigits = true;
            var canvas = cloneCanvas(FaviconNotifier.canvas),
            cx = canvas.getContext('2d');
            circle(cx, 21, 21, 9, FaviconNotifier.circleColor);
            if (istwodigits) circle(cx, 15, 21, 9, FaviconNotifier.circleColor);
            write(cx, String(state), (istwodigits ? 8 : 16), 28, 'bold 18px helvetica', FaviconNotifier.textColor);
            FaviconNotifier.link.attr('href', canvas.toDataURL('image/png'));
        }
    };

    mw.hook('FaviconNotifier.loaded').add(function(canvas) {
        var afteradd = function(chat) {
            if (
                document.hasFocus() ||
                chat.attributes.name == mw.config.get('wgUserName') ||
                (chat.attributes.isInlineAlert && !FaviconNotifier.includeInlineAlerts) ||
                (chat.attributes.roomId != mainRoom.roomId && mainRoom.model.blockedUsers.findByName(chat.attributes.name))
            ) return;
            if (FaviconNotifier.state === false) {
                FaviconNotifier.state = FaviconNotifier.countMainMessages || (chat.attributes.roomId !== mainRoom.roomId && chat.attributes.roomId) ? 1 : true;
            } else if (FaviconNotifier.state === true && chat.attributes.roomId && chat.attributes.roomId !== mainRoom.roomId) {
                FaviconNotifier.state = 1;
            } else if (typeof FaviconNotifier.state == 'number' && (FaviconNotifier.countMainMessages || chat.attributes.roomId && chat.attributes.roomId !== mainRoom.roomId)) {
                FaviconNotifier.state++;
            } else {
                return; // already showing the white dot, no need to update again.
            }
            FaviconNotifier.updateIcon();
        };
        mainRoom.model.chats.bind('afteradd', afteradd);

        mainRoom.model.privateUsers.bind('add', function(u) {
            var privateRoom = mainRoom.chats.privates[u.attributes.roomId];

            privateRoom.model.chats.bind('afteradd', afteradd);
        });
    });

    window.addEventListener('focus', function() {
        FaviconNotifier.state = false;
        FaviconNotifier.updateIcon();
    });
})();