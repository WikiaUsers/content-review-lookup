// Placeholder page for Jacob's Ladder Suite, a chat extension API
// and soon the thing which powers the acwiki chat extensions
// Importing code snippets from other authors.
importScriptPage("MediaWiki:Draggable.js", "d97"); //allows creating draggable elements

// Modal handling
// Saving and loading from cookies
// Inline alert handling
// Sending messages
// Binding to afteradd
// Scanning new messages
// Sidebar box for easy additions

var JLAPI = {

    // Variable section

    siteURL: wgServer.slice(7, -10),
    chatroomID: "Chat_".concat(mainRoom.roomId),

    // Functions section

    cookie: {
        save: function(name, value, days) {
            var expires = "";
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = name + "=" + value + expires + "; path=/";
        },
        load: function(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        },
        clear: function(name) {
            JLAPI.cookie.save(name, "", -1);
        }
    },

    modal: {
        info: function(title, text, okAction, closeAction) {
            var $optionsWindowHTML = $.showCustomModal(title, '<form method="" name="" class="WikiaForm JLform"><fieldset>' +
                '<div id="customModalHeader">' + text + '</div>', {
                    id: "customModal",
                    width: 600,
                    buttons: [{
                        id: "cancel",
                        message: "Cancel",
                        handler: closeAction
                    }, {
                        id: "ok",
                        defaultButton: true,
                        message: "OK",
                        handler: okAction
                    }]
                });
            $(".close").click(closeAction);
            $(".blackout").click(closeAction);
            return $optionsWindowHTML;
        },
        buttonless: function(title, text, closeAction) {
            var $optionsWindowHTML = $.showCustomModal(title, '<form method="" name="" class="WikiaForm JLform"><fieldset>' +
                '<div id="customModalHeader">' + text + '</div>');
            $(".close").click(closeAction);
            $(".blackout").click(closeAction);
            return $optionsWindowHTML;
        },
        form: function(title, text, contents, okAction, closeAction) {
            var $optionsWindowHTML = $.showCustomModal(title, '<form method="" name="" class="WikiaForm JLform"><fieldset>' +
                '<div id="customModalHeader">' + text + '</div>' +
                '<table id="customModalContents">' + contents + '</table>', {
                    id: "customModal",
                    width: 600,
                    buttons: [{
                        id: "cancel",
                        message: "Cancel",
                        handler: closeAction
                    }, {
                        id: "ok",
                        defaultButton: true,
                        message: "OK",
                        handler: okAction
                    }]
                });
            $(".close").click(closeAction);
            $(".blackout").click(closeAction);
            return $optionsWindowHTML;
        },
        close: function() {
            $('.blackout').remove();
            $('.modalWrapper').remove();
            $optionsWindowHTML = '';
        },
    },

    createUserSelector: function(id, includeself) {
        newSelectID = 'user-selector-' + $("select").length;
        userSelectHTML = "<select name='user-selector' id='" + newSelectID + "' style='height: initial;'>";
        for (i = 0; i < Object.keys(mainRoom.model.users._byCid).length; i++) {
            userName = mainRoom.model.users._byCid[Object.keys(mainRoom.model.users._byCid)[i]].attributes.name;
            if (userName != wgUserName) {
                userSelectHTML += '<option name="' + userName + '" value="' + userName + '">' + userName + '</option>';
            } else if (includeself === true) {
                userSelectHTML += '<option name="' + userName + '" value="' + userName + '">' + userName + '</option>';
            }
        }
        userSelectHTML += '</select>';
        $(id).append(userSelectHTML);
        return newSelectID;
    },

    InlineAlert: function(message) {
        var newInlineAlert = new models.InlineAlert({
            text: message
        });
        mainRoom.model.chats.add(newInlineAlert);
    },

    message: {
        send: function(message) {
            mainRoom.sendCustomMessage = function(t) {
                if (t.length && t.length <= this.maxCharacterLimit) {
                    var e = new models.ChatEntry({
                        roomId: this.roomId,
                        name: wgUserName,
                        text: t
                    });
                    this.isMain() ? this.socket.send(e.xport()) : ((this.afterInitQueue.length < 1 || this.model.users.length < 2) && this.mainController.socket.send(this.model.privateRoom.xport()), this.isInitialized ? this.socket.send(e.xport()) : (this.afterInitQueue.push(e.xport()), e.set({
                        temp: !0,
                        avatarSrc: wgAvatarUrl
                    }), this.model.chats.add(e))), $("body").removeClass("warn limit-near limit-reached")
                }
            };
            mainRoom.sendCustomMessage(message);
        },

        append: function(text, jumpto) {
            // jumpto is if we want to focus on the message box afterwards
            $("[name='message']").val($("[name='message']").val().concat(text));
            if (jumpto === true) $("#Write > div.message > textarea").focus();
        },

        prepend: function(text, jumpto) {
            // jumpto is if we want to focus on the message box afterwards
            $("[name='message']").val(text.concat($("[name='message']").val()));
            if (jumpto === true) $("#Write > div.message > textarea").focus();
        },

        replace: function(regex, modifiers, replacewith, jumpto) {
            a = new RegExp(regex, modifiers);
            $("[name='message']").val($("[name='message']").val().replace(a, replacewith));
            if (jumpto === true) $("#Write > div.message > textarea").focus();
        },
    },

    mostRecentMessage: {
        message: function() {
            id = JLAPI.mostRecentMessage.cid();
            if ($("#entry-" + id).hasClass("inline-alert")) {
                b = $("#entry-" + id).html().trim();
                return b;
            } else {
                a = $("#entry-" + id + " > span.message");
                c = $(a).html();
                return c;
            }
        },
        username: function() {
            id = JLAPI.mostRecentMessage.cid();
            if (typeof $("#entry-" + id).attr("data-user") !== "undefined") {
                return $("#entry-" + id).attr("data-user");
            } else {
                return false;
            }
        },
        timestamp: function() {
            id = JLAPI.mostRecentMessage.cid();
            if (typeof $("#entry-" + id + " > span.time").html() !== "undefined") {
                return $("#entry-" + id + " > span.time").html();
            } else {
                return false;
            }
            return c;
        },
        avatar: function() {
            id = JLAPI.mostRecentMessage.cid();
            if (typeof $("#entry-" + id + " > img.avatar").attr("src") !== "undefined") {
                return $("#entry-" + id + " > img.avatar").attr("src");
            } else {
                return false;
            }
            return c;
        },
        cid: function() {
            return $($("#" + JLAPI.chatroomID + " > ul > li")[$("#" + JLAPI.chatroomID + " > ul > li").length - 1]).attr("id").slice(6);
        }
    },

    Chat: {
        onLoad: function(a) {
            // This function permits safe loading of scripts by checking
            // if there are messages in chat. If there aren't then we
            // wait 100 ms before trying again. Always use this function
            // before binding anything, otherwise you may get errors.
            // Note that this relies on there either being people in chat
            // or a chat welcome message being displayed. If the wiki disables
            // the chat welcome message then unexpected behavior may occur.
            // Recommended to run this if you're trying to add on to another
            // script; prevents weirdness with variables perhaps
            // This function will simply run any script in its argument.
            // Suggested usage: 
            // x = function() { do things; }
            // JLAPI.Chat.onLoad("x()")

            if ($("#" + JLAPI.chatroomID + " > ul > li").length !== 0) {
                console.log("Chat is loaded. Script importing begins");
                eval(a);
            } else {
                console.log("Chat isn't loaded yet.");
                var i = setInterval(function() {
                    if ($("#" + JLAPI.chatroomID + " > ul > li").length !== 0) {
                        clearInterval(i);
                        console.log("Chat is loaded. Script importing begins");
                        eval(a);
                    } else {
                        console.log("Chat isn't loaded yet.");
                    }
                }, 1000);
            }
        },

        isLoaded: function() {
            if ($("#" + JLAPI.chatroomID + " > ul > li").length !== 0) {
                return true;
            } else {
                return false;
            }
        },
    },

    openPage: function(url, text) {
        var win = window.open(url, '_blank');
        if (win) {
            //Browser has allowed it to be opened, we want to look at it
            win.focus();
        } else {
            //Browser has blocked it, display as an inline link
            if (text) {
                JLAPI.InlineAlert("<a href='" + url + "'>" + text + "</a>");
            } else {
                JLAPI.InlineAlert("<a href='" + url + "'>" + url + "</a>");
            }
        }
    },
};

if (!$("#sidebar-top").length) {
    $("#Rail").prepend('<div id="sidebar-top" class="sidebar-top"></div>'); // Adds a container to add things to the sidebar
}