/* FucodeLogger.js is an advanced script for logging the chat and private messages.
 * Contains several features, such as copying the logs or downloading them with a
 * special chosen filename. In other words, whatever you could wish for.
 * Authors: Lady Furude, KockaAdmiralac
 * 
 * Thanks to KockaAdmiralac for help with finding appropriate methods, giving the
 * object that solved the difficulty of logging the messages, for testing the code with
 * me in his personal wiki, allowing to keep it there and suggesting Download feature.
 * Thanks to Speedit for help with making a button and creating an object~
 * 
 * If you've got a suggestion or found a bug, contact Lady Furude!
 */

$(function() {
    "use strict";
    if (mw.config.get("wgCanonicalSpecialPageName") !== "Chat" || window.FucodeLoggerLoaded) {
        return;
    }
    window.FucodeLoggerLoaded = true;
    var loggedLines = [];
    function getTime(c) {
        var year = c.getFullYear();
        var month = String(c.getMonth() + 1).padStart(2, 0);
        var day = c.getDate().toString().padStart(2, 0);
        var hour = c.getHours().toString().padStart(2, 0);
        var minute = c.getMinutes().toString().padStart(2, 0);
        var second = c.getSeconds().toString().padStart(2, 0);
        return "[" + year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second + "] ";
    }
    function logByObject(obj, el, arr) {
        obj[el].attributes.text.split("\n").forEach(function(line) {
            arr.push(getTime(new Date(obj[el].attributes.timeStamp)) + "<" + obj[el].attributes.name + "> " + line);
        });
    }
    var FucodeLogger = {
        logged: [],
        logActiveRoom: function() {
            if (mainRoom.activeRoom == "main" || mainRoom.activeRoom === null) {
                for (var e = 0; e < loggedLines.length; e++) {
                    this.logged.push(loggedLines[e]);
                }
            } else {
                var msgObj = window.mainRoom.chats.privates[mainRoom.activeRoom].model.chats._byCid;
                for (var i in msgObj) {
                    logByObject(msgObj, i, this.logged);
                }
            }
        },
        createText: function() {
            var preContent = "";
            for (var c = 0; c < this.logged.length; c++) {
                preContent += this.logged[c];
                if (c + 1 !== this.logged.length) preContent += "\n";
            }
            return $("<pre>", {
                id: "FucodeLoggerContent",
                text: preContent,
            });
        },
        copyLogs: function() {
            document.querySelector("#FucodeLoggerCopy").addEventListener("click", function() {
                // Double-click: the copy feature works at the second click, for some reason.
                $("#FucodeLoggerCopy").click();
                var range = document.createRange();
                range.selectNode(document.querySelector("#FucodeLoggerContent"));
                window.getSelection().addRange(range);
                try {
                    document.execCommand("copy");
                    if (!$("#FucodeLoggerCopied").exists()) {
                        $(".modalContent").append($("<p>", {
                            id: "FucodeLoggerCopied",
                            text: this.i18n.msg("copysuccess").plain()
                        }));
                    }
                } catch(err) {
                    // If it's not copied, look into console
                    console.log(this.i18n.msg("copyfailure").plain());
                }
                window.getSelection().removeAllRanges();
            }.bind(this));
        },
        clickToDownloadLogs: function() {
            $("#FucodeLoggerExecuteDl").click(function() {
                if (!$("#FucodeLoggerLinkDl").exists()) {
                    $("#FucodeLoggerExecuteDl").text("");
                    $("#FucodeLoggerExecuteDl").append($("<a>", {
                        id: "FucodeLoggerLinkDl",
                        download: (function() {
                            var filename = $("#FucodeLoggerSetFilename").val() + ".txt";
                            return filename;
                        })(),
                        href: URL.createObjectURL(new Blob([$("#FucodeLoggerContent").text()], {type: 'octet/stream'})),
                        text: this.i18n.msg("downloadexecute").plain()
                    }).css({
                        color: "#FFF",
                        "text-decoration": "none"
                    }));
                    $("#FucodeLoggerSetFilename").attr("disabled", "disabled");
                }
            }.bind(this));
        },
        downloadLogs: function() {
            $("#FucodeLoggerDl").click(function() {
                if ($("#FucodeLoggerCopied").exists()) {
                    $("#FucodeLoggerCopied").remove();
                }
                if (!$("#FucodeLoggerSetDownload").exists()) {
                    $(".modalContent").append($("<div>", {
                        id: "FucodeLoggerSetDownload"
                    }));
                    $("#FucodeLoggerSetDownload").append([$("<p>", {
                        id: "FucodeLoggerFilenameNotif",
                        text: this.i18n.msg("typefilename").plain()
                    }), $("<input>", {
                        id: "FucodeLoggerSetFilename",
                        type: "text"
                    }), $("<button>", {
                        id: "FucodeLoggerExecuteDl",
                        name: "setFilename",
                        text: this.i18n.msg("setfilename").plain()
                    })]);
                    // Allowing an user to press Enter instead of clicking the button
                    // Note: Doesn't let download by pressing Enter.
                    $("#FucodeLoggerSetFilename").keyup(function(event) {
                        if (event.keyCode === 13) $("#FucodeLoggerExecuteDl").click();
                    });
                    this.clickToDownloadLogs();
                }
            }.bind(this));
        },
        createModal: function() {
            $.showCustomModal(this.i18n.msg("modaltitle").plain(), $("<div>").append([this.createText(),
                $("<button>", {
                    id: "FucodeLoggerCopy",
                    text: this.i18n.msg("copybutton").plain()
                }),
                $("<button>", {
                    id: "FucodeLoggerDl",
                    text: this.i18n.msg("downloadbutton").plain()
                })
            ]).html(), {
                id: "FucodeLoggerResult",
            }).css({
                width: "750px",
                overflow: "auto",
                height: "550px",
                "margin-left": "-388px"
            });
            this.copyLogs();
            this.downloadLogs();
        },
        performLog: function() {
            this.logged = [];
            this.logActiveRoom();
            this.createModal();
        }
    };

    function logOldMessages(i18n) {
        var i18n = i18n;
        var sentMsgObj = window.mainRoom.model.chats._byCid;
        for (var i in sentMsgObj) {
            if (sentMsgObj[i].attributes.isInlineAlert !== true) {
                logByObject(sentMsgObj, i, loggedLines);
            }
        }
        ["chat:add", "join", "part", "logout", "kick", "ban"].forEach(function(e) {
            mainRoom.socket.bind(e, function(a) {
                var loggedTime = getTime(new Date());
                var data = JSON.parse(a.data);
                var joinLogged = loggedTime + i18n.msg("userjoin", data.attrs.name).plain();
                var partLogged = loggedTime + i18n.msg("userpart", data.attrs.name).plain();
                var logoutLogged = loggedTime + i18n.msg("userlogout", data.attrs.name).plain();
                var kickLogged = loggedTime + i18n.msg("userkick", data.attrs.kickedUserName, data.attrs.moderatorName).plain();
                var banLogged = loggedTime + i18n.msg("userban", data.attrs.kickedUserName, data.attrs.moderatorName).plain();
                if (e == "chat:add") {
                    data.attrs.text.split("\n").forEach(function(line) {
                        loggedLines.push(loggedTime + "<" + data.attrs.name + "> " + line);
                    });
                }
                var loggedEvent = (function() {
                    switch(e) {
                        case "join": return joinLogged;
                        case "part": return partLogged;
                        case "logout": return logoutLogged;
                        case "kick": return kickLogged;
                        case "ban": return banLogged;
                    }
                })();
                if (e !== "chat:add") loggedLines.push(loggedEvent);
            });
        });
    }

    // Add a button and record messages ONLY when i18n exists
    var preloaded = 0;
    function preload() {
        if (++preloaded === 2) {
            logOldMessages(FucodeLogger.i18n);
            FucodeLogger.button = new dev.chat.Button({
                name: "ChatLog",
                attr: {
                    text: FucodeLogger.i18n.msg("modalbutton").plain(),
                    click: function() {
                        FucodeLogger.performLog();
                    }
                }
            });
        }
    }
    mw.hook("dev.i18n").add(function(i18nd) {
        i18nd.loadMessages("FucodeLogger").then(function(i18n) {
            FucodeLogger.i18n = i18n;
            preload();
        });
    });
    mw.hook("dev.chat.render").add(preload);

    importArticles({
        type: "script",
        articles: [
            "u:dev:Chat-js.js",
            "u:dev:MediaWiki:I18n-js/code.js"
        ]
    });
});