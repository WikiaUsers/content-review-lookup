window.pseudoForum = {
    pfBackground: "#fbd79a",
    pfBorder:     "#af4200",
};
(function() {
    "use strict";
    
    // Functions and methods
    // String
    Object.assign(String.prototype, {
        // Return HTML as plain text
        toText: function() {
            return this
            	.replaceAll("<", "&lt;")
            	.replaceAll("&", "&amp;");
        },
    });
    // Array
    Object.assign(Array.prototype, {
        // Return array with each item in arguments removed
        remove: function() {
            var axe;
            for (var i = 0, l = arguments.length; i < l; i++) {
                while ((axe = this.indexOf(arguments[i])) !== -1) {
                    this.splice(axe, 1);
                }
            }
            return this;
        },
        // Return item at negative index
        neg: function(i) {
            return this[this.length - i];
        },
    });
    // Date
    Object.assign(Date.prototype, {
        // Return name of month
        getMonthName: function() {
            return [
            	"January",
            	"February",
            	"March",
            	"April",
            	"May",
            	"June",
            	"July",
            	"August",
            	"September",
            	"October",
            	"November",
            	"December",
            ][this.getMonth()];
        },
        // Return formatted date
        format: function() {
            return "" +
                this.getHours().toString().padStart(2, 0) + ":" +
                this.getMinutes().toString().padStart(2, 0) + ", " +
                this.getDate() + " " +
                this.getMonthName() + " " +
                this.getFullYear();
        },
    });
    // $
    Object.assign($.fn, {
        // Expand textarea to fit content
        resize: function(min) {
            min = min || 0;
            return this.each(function() {
                this.style.overflow = "hidden";
                this.style.height = "auto";
                this.style.height = Math.max(min, this.scrollHeight) + "px";
            });
        },
    });
    
    // Import CSS
    importArticles({
        type: "style",
        articles: [
            "u:climbthestairs:PseudoForum.css",
        ],
    });
    
    // Vars
    const api = new mw.Api();
    const canDelete = wgUserGroups.includes("sysop") || wgUserGroups.includes("content-moderator");
    const isMod = canDelete || wgUserGroups.includes("threadmoderator");
    const config = window.pseudoForum || {};
    const msgs = [], u = {}, watchlist = [];

    // Visual editor modal
    var visualModal;
    const visualModalContent = "<h1>Learn how to use Source mode instead!</h1><p style=\"font-weight: bold\">Source mode uses a markup language called Wikitext, which is very straightforward and easy to learn!</p><p style=\"font-style: italic;\">There's lots of stupid people, but even the stupidest can use Source mode—that means you <span style=\"text-decoration: underline;\">definitely</span> can!</p><p>Use the buttons in the edit toolbar to help. Also, here's a quick guide to Wikitext:</p><h2>FORMATTING</h2><p>Simple inline text formatting...</p><div class=\"etb-modal-section\"><div class=\"etb-modal-subsection\"><div class=\"etb-modal-display\"><b>Bold text</b></div><div class=\"etb-modal-code\"><code>'''Bold text'''</code> or <code>&lt;b>Bold text&lt;/b></code></div></div><div class=\"etb-modal-subsection\"><div class=\"etb-modal-display\"><i>Italic text</i></div><div class=\"etb-modal-code\"><code>''Italic text''</code> or <code>&lt;i>Italic text&lt;/i></code></div></div><div class=\"etb-modal-subsection\"><div class=\"etb-modal-display\"><u>Underlined text</u></div><div class=\"etb-modal-code\"><code>&lt;u>Underlined text&lt;/u></code></div></div><div class=\"etb-modal-subsection\"><div class=\"etb-modal-display\"><s>Strikethrough</s></div><div class=\"etb-modal-code\"><code>&lt;s>Strikethrough&lt;/s></code></div></div><div class=\"etb-modal-subsection\"><div class=\"etb-modal-display\">&lt;s>'''No formatting'''&lt;/s></div><div class=\"etb-modal-code\"><code>&lt;nowiki>&lt;s>'''No formatting'''&lt;/s>&lt;/nowiki></code></div><div class=\"etb-modal-explain\">Any code inside these tags will be displayed as is.</div></div><div class=\"etb-modal-subsection\"><div class=\"etb-modal-display\"><a href=\"/wiki/Forum:Forum\">Internal link</a></div><div class=\"etb-modal-code\"><code>[[Forum:Forum|Internal link]]</code></div><div class=\"etb-modal-explain\">The page linked to must be a page on the wiki.</div></div><div class=\"etb-modal-subsection\"><div class=\"etb-modal-display\"><a href=\"/w:c:community:Help:Contents\">Interwiki link</a></div><div class=\"etb-modal-code\"><code>[[w:c:community:Help:Contents|Interwiki link]]</code></div><div class=\"etb-modal-explain\">For Fandom wikis, use <code>w:c:</code> plus the wiki URL. For other wikis, see the <a href=\"/w:MediaWiki:Interwiki_map\" target=\"_blank\">interwiki map</a>.</div></div><div class=\"etb-modal-subsection\"><div class=\"etb-modal-display\"><a href=\"https://youtu.be/dQw4w9WgXcQ\" class=\"external\">External link</a></div><div class=\"etb-modal-code\"><code>[https://youtu.be/dQw4w9WgXcQ External link]</code></div><div class=\"etb-modal-explain\">The link must start with <code>http://</code> or <code>https://</code>.</div></div></div><p>These can be mixed and combined in any way. For example, <code>&lt;s>'''''[[Link title]]'''''&lt;/s></code> creates a bold, italic link that's crossed out.</p><p><span style=\"font-weight: bold;\">Make sure you close every tag that you open!</span> For example, each <code>'''</code> must be accompanied by another <code>'''</code> after the bold text; each <code>&lt;s></code> must be accompanied by a <code>&lt;/s></code> after the crossed out text. <span style=\"text-decoration: underline;\">Not doing so will cause errors!</span></p><h2>LAYOUT</h2><div class=\"etb-modal-section\"><div class=\"etb-modal-subsection\"><div class=\"etb-modal-display\"><br>(Line break)</div><div class=\"etb-modal-code\"><code>&lt;br></code></div></div><div class=\"etb-modal-subsection\"><div class=\"etb-modal-display\"><p>(New paragraph)</p></div><div class=\"etb-modal-code\"><pre><br><br></pre></div><div class=\"etb-modal-explain\">Hit Enter or Return twice.</div></div><div class=\"etb-modal-subsection\"><div class=\"etb-modal-display\"><h2>Section heading</h2></div><div class=\"etb-modal-code\"><code>== Section heading ==</code> or <code>&lt;h2>Section heading&lt;/h2></code></div><div class=\"etb-modal-explain\">Section headings should start at the beginning of a new line.</div></div><div class=\"etb-modal-subsection\"><div class=\"etb-modal-display\"><hr>(Horizontal rule—basically just a line)</div><div class=\"etb-modal-code\"><code>----</code> or <code>&lt;hr></code></div><div class=\"etb-modal-explain\">Horizontal rules should start at the beginning of a new line.</div></div><div class=\"etb-modal-subsection\"><div class=\"etb-modal-display\"><ol><li>Ordered list</li><li>Ordered lists are ordered<ol><li>Wow! Who could've known?</li></ol></li></ol></div><div class=\"etb-modal-code\"><pre># Ordered list<br># Ordered lists are ordered<br>## Wow! Who could've known?</pre></div><div class=\"etb-modal-explain\">Ordered lists should start at the beginning of a new line.</div></div><div class=\"etb-modal-subsection\"><div class=\"etb-modal-display\"><ul><li>Unordered list</li><li>Unordered lists are not ordered<ul><li>Wow! Who could've known?</li></ul></li></ul></div><div class=\"etb-modal-code\"><pre>* Unordered list<br>* Unordered lists are not ordered<br>** Wow! Who could've known?</pre></div><div class=\"etb-modal-explain\">Unordered lists should start at the beginning of a new line.</div></div><div class=\"etb-modal-subsection\"><div class=\"etb-modal-display\">Text<dl><dd>Indented text</dd></dl></div><div class=\"etb-modal-code\"><pre>Text<br>: Indented text</pre></div><div class=\"etb-modal-explain\">Indents should start at the beginning of a new line.</div></div><div class=\"etb-modal-subsection\"><div class=\"etb-modal-display\"><img src=\"https://vignette.wikia.nocookie.net/climbthestairs/images/3/34/Image.png\" width=\"50\" style=\"float: right;\"></div><div class=\"etb-modal-code\"><code>[[File:Image.png|50px|right]]</code></div><div class=\"etb-modal-explain\">For more information about formatting images with Wikitext, visit <a href=\"/mw:Help:Images\" target=\"_blank\">MediaWiki.org</a>.</div></div></div><p>For more information regarding Wikitext, check out <a href=\"/wikipedia:Help:Wikitext\" target=\"_blank\">Wikipedia's help page</a>.</p><h2>CSS</h2><p>The above Wikitext (and HTML) tags are quite limited in their ability to format text, but fortunately, Wikitext allows inline CSS to be used.</p><p>There are two basic tags you need to know:</p><ul><li>The div tag (<code>&lt;div>&lt;/div></code>): This is for wrapping blocks (paragraphs) of text. Using this tag inline will create a new paragraph! All the examples will use the div tag.</li><li>The span tag (<code>&lt;span>&lt;/span></code>): This is for wrapping inline text. Using this for more than one paragraph will not work!</li></ul><p>Once you've chosen the correct tag to use, add a style attribute to the opening tag: <code>&lt;div style=\"\"></code>.</p><p>Now you're ready to add CSS! You can add as many properties as you want to any tag. Separated the property from the value with colons (:), and separate different properties from each other with semicolons (;). (Examples below!)</p><p>Here are some CSS properties you can use:</p><div class=\"etb-modal-section\"><div class=\"etb-modal-subsection\"><div class=\"etb-modal-display\" style=\"font-family: Times New Roman;\">font-family</div><div class=\"etb-modal-code\"><pre>&lt;div style=\"font-family: Times New Roman;\">font-family&lt;div></pre></div><div class=\"etb-modal-explain\">This changes the font, if that wasn't obvious enough. Click <a href=\"https://w3schools.com/cssref/pr_font_font-family.asp\" target=\"_blank\">here</a> to learn more about this property.</div><div class=\"etb-modal-explain\">If you're an admin, <a href=\"/wiki/Help:How_to_import_Google_Fonts\" target=\"_blank\">learn how you can install fonts on your wiki</a>!</div></div><div class=\"etb-modal-subsection\"><div class=\"etb-modal-display\" style=\"font-size: 20px;\">font-size</div><div class=\"etb-modal-code\"><pre>&lt;div style=\"font-size: 20px;\">font-size&lt;div></pre></div><div class=\"etb-modal-explain\">Font size can be specified in pixels (px).</div><div class=\"etb-modal-explain\">Click <a href=\"https://w3schools.com/cssref/pr_font_font-size.asp\" target=\"_blank\">here</a> to learn more about this property.</div></div><div class=\"etb-modal-subsection\"><div class=\"etb-modal-display\" style=\"color: red;\">color</div><div class=\"etb-modal-code\"><pre>&lt;div style=\"color: red;\">color&lt;div></pre></div><div class=\"etb-modal-explain\">Click <a href=\"https://w3schools.com/cssref/pr_text_color.asp\" target=\"_blank\">here</a> to learn more about this property.</div><div class=\"etb-modal-explain\">Click <a href=\"https://w3schools.com/Colors/default.asp\" target=\"_blank\">here</a> to see more colors you can use.</div></div><div class=\"etb-modal-subsection\"><div class=\"etb-modal-display\" style=\"background: red;\">background</div><div class=\"etb-modal-code\"><pre>&lt;div style=\"background: red;\">background&lt;div></pre></div><div class=\"etb-modal-explain\">Click <a href=\"https://w3schools.com/cssref/pr_background-color.asp\" target=\"_blank\">here</a> to learn more about this property.</div><div class=\"etb-modal-explain\">Click <a href=\"https://w3schools.com/Colors/default.asp\" target=\"_blank\">here</a> to see more colors you can use.</div></div><div class=\"etb-modal-subsection\"><div class=\"etb-modal-display\" style=\"border: 1px solid red;\">border</div><div class=\"etb-modal-code\"><pre>&lt;div style=\"border: 1px solid red;\">border&lt;div></pre></div><div class=\"etb-modal-explain\">The first value is the width of the border, the second is the style, and the third is the color.</div><div class=\"etb-modal-explain\">Click <a href=\"https://w3schools.com/css/css_border_shorthand.asp\" target=\"_blank\">here</a> to learn more about this property.</div></div><div class=\"etb-modal-subsection\"><div class=\"etb-modal-display\" style=\"border: 1px solid red; border-radius: 5px;\">border-radius</div><div class=\"etb-modal-code\"><pre>&lt;div style=\"border: 1px solid red; border-radius: 5px;\">border-radius&lt;div></pre></div><div class=\"etb-modal-explain\">This rounds the corners of backgrounds and borders.</div><div class=\"etb-modal-explain\">Click <a href=\"https://w3schools.com/cssref/css3_pr_border-radius.asp\" target=\"_blank\">here</a> to learn more about this property.</div></div><div class=\"etb-modal-subsection\"><div class=\"etb-modal-display\" style=\"text-shadow: 1px -2px 5px red;\">text-shadow</div><div class=\"etb-modal-code\"><pre>&lt;div style=\"text-shadow: 1px -2px 5px red;\">text-shadow&lt;div></pre></div><div class=\"etb-modal-explain\">The first value is the horizontal position of the shadow, the second is the vertical position, the third is the blur, and the fourth is the shadow color. The first two values are required, while the last two are both optional.</div><div class=\"etb-modal-explain\">Click <a href=\"https://w3schools.com/cssref/css3_pr_text-shadow.asp\" target=\"_blank\">here</a> to learn more about this property.</div></div><div class=\"etb-modal-subsection\"><div class=\"etb-modal-display\" style=\"box-shadow: 1px -2px 5px red;\">box-shadow</div><div class=\"etb-modal-code\"><pre>&lt;div style=\"box-shadow: 1px -2px 5px red;\">box-shadow&lt;div></pre></div><div class=\"etb-modal-explain\">The first value is the horizontal position of the shadow, the second is the vertical position, the third is the blur, and the fourth is the shadow color. The first two values are required, while the last two are both optional.</div><div class=\"etb-modal-explain\">Click <a href=\"https://w3schools.com/cssref/css3_pr_box-shadow.asp\" target=\"_blank\">here</a> to learn more about this property.</div></div></div><p>These are just the most basic CSS properties. If you're interested, visit <a href=\"https://w3schools.com/cssref/default.asp\" target=\"_blank\">W3Schools</a> to learn about more properties! <a href=\"https://w3schools.com/cssref/css3_pr_transform.asp\" target=\"_blank\">Transform</a> is fun to use; check it out! So are <a href=\"https://w3schools.com/css/css3_gradients.asp\" target=\"_blank\">gradients</a>!</p>";
    mw.hook("dev.modal").add(function(modal) {
        visualModal = new modal.Modal({
            "class": "etb-modal",
            id: "visualModal",
            size: "content-size",
            title: "VISUAL MODE IS NOT SUPPORTED 😭😭😭😭😭😭😭😭",
            content: visualModalContent,
        });
        visualModal.create();
    });
    
    // Templates
    const templateMessage = function(msgNum) {
        const msg = msgs[msgNum];
        const info = msg.info;
        const username = msg.user;
        const kudos = function() {
            const kNum = info.kudos     ? info.kudos.length     : 0;
            const aNum = info.antiKudos ? info.antiKudos.length : 0;
            return "" +
                "<div class=\"pf-kudos\">" +
                    "<div class=\"k-not-bar\">" +
                        "<div class=\"k-btn-count plus\">" +
                            "<div class=\"k-btn plus\" title=\"Give Kudos to this message\">" + // https://commons.wikimedia.org/wiki/File:Ic_thumb_up_48px.svg
                                "<svg viewBox=\"0 0 48 48\">" +
                                    "<path d=\"M2 42h8v-24h-8v24zm44-22c0-2.21-1.79-4-4-4h-12.63l1.91-9.14c.04-.2.07-.41.07-.63 0-.83-.34-1.58-.88-2.12l-2.13-2.11-13.17 13.17c-.72.73-1.17 1.73-1.17 2.83v20c0 2.21 1.79 4 4 4h18c1.66 0 3.08-1.01 3.68-2.44l6.03-14.1c.18-.46.29-.95.29-1.46v-3.83l-.02-.02.02-.15z\"/>" +
                                "</svg>" +
                            "</div>" +
                            "<div class=\"k-count plus\" title=\"See who gave Kudos to this message\">" + kNum + "</div>" +
                        "</div>" +
                        "<div class=\"k-btn-count minus\">" +
                            "<div class=\"k-btn minus\" title=\"Give AntiKudos to this message\">" + // https://commons.wikimedia.org/wiki/File:Ic_thumb_down_48px.svg
                                "<svg viewBox=\"0 0 48 48\">" +
                                    "<path d=\"M30 6h-18c-1.66 0-3.08 1.01-3.68 2.44l-6.03 14.1c-.18.46-.29.95-.29 1.46v3.83l.02.02-.02.15c0 2.21 1.79 4 4 4h12.63l-1.91 9.14c-.04.2-.07.41-.07.63 0 .83.34 1.58.88 2.12l2.13 2.11 13.17-13.17c.72-.73 1.17-1.73 1.17-2.83v-20c0-2.21-1.79-4-4-4zm8 0v24h8v-24h-8z\"/>" +
                                "</svg>" +
                            "</div>" +
                            "<div class=\"k-count minus\" title=\"See who gave AntiKudos to this message\">" + aNum + "</div>" +
                        "</div>" +
                    "</div>" +
                    "<div class=\"k-bar\">" +
                        "<div class=\"k-bar-inner\" style=\"width: 50%;\"></div>" +
                    "</div>" +
                "</div>";
        };
        const user = function() {
            const groups = u[username].groups.map(function(x) {
                x = x.replace(/-?moderator/, " mod");
                return "<div class=\"u-tag " + x.replace(/ /g, "-") + "\">" + x + "</div>";
            });
            return "" +
                "<div class=\"pf-user\">" +
                    "<div class=\"u-inner\">" +
                        "<a href=\"/wiki/User:" + username + "\">" + username + "</a>" +
                        "<div class=\"u-info\" style=\"display: none;\">" +
                            "<div class=\"u-header\">" +
                                "<div class=\"u-avatar\"><img src=\"" + u[username].avatar + "\"></div>" +
                                "<div class=\"u-links\">" +
                                    "<div class=\"u-username\"><a href=\"/wiki/User:" + username + "\">" + username + "</a></div>" +
                                    "<div class=\"u-userlinks noformat\">" +
                                        "<a href=\"/wiki/User talk:" + username + "\">talk</a> • " +
                                        "<a href=\"/wiki/Special:Contributions/" + username + "\">contribs</a> • " +
                                        "<a href=\"/wiki/Special:Block/" + username + "\">block</a>" +
                                    "</div>" +
                                    "<div class=\"u-id\">ID: " + u[username].id + "</div>" +
                                "</div>" +
                            "</div>" +
                            "<div class=\"u-groups\">" + groups.join("") + "</div>" +
                            "<div class=\"u-stats\">" +
                                "<div class=\"u-stat total\" title=\"Total edits\">" +
                                    "<a href=\"/wiki/Special:Contributions/" + username + "?\">" +
                                        "<div class=\"icon\"></div>" +
                                        "<span class=\"u-stat-total\">" + u[username].total + "</span>" +
                                    "</a>" +
                                "</div>" +
                                "<div class=\"u-stat forum\" title=\"Forum messages\">" +
                                    "<a href=\"/wiki/Special:Contributions/" + username + "?namespace=111\">" +
                                        "<div class=\"icon\"></div>" +
                                        "<span class=\"u-stat-forum\">" + u[username].forum + "</span>" +
                                    "</a>" +
                                "</div>" +
                                "<div class=\"u-stat first\" title=\"Date joined\">" +
                                    "<a href=\"/wiki/Special:Contributions/" + username + "?dir=prev&limit=1\">" +
                                        "<div class=\"icon\"></div>" +
                                        "<span class=\"u-stat-first\">" + u[username].first + "</span>" +
                                    "</a>" +
                                "</div>" +
                            "</div>" +
                            "<div class=\"u-forumbio\">" +
                                "<textarea maxlength=\"160\" rows=\"1\" " + (wgUserName === username ? "placeholder=\"Write a short bio here!\"" : (isMod ? "" : "readonly")) + ">" +
                                    u[username].forumbio +
                                "</textarea>" +
                                "<div class=\"u-btn-wrapper\" style=\"display: none;\">" +
                                    "<div class=\"pf-round-btn u-save disabled\">SAVE</div>" +
                                    "<div class=\"pf-round-btn u-cancel\">CANCEL</div>" +
                                "</div>" +
                            "</div>" +
                        "</div>" +
                    "</div>" +
                "</div>";
        };
        const messageToolbar = function() {
            var timestamp =
                "<a href=\"#" + msgNum + "\" class=\"mtb-permalink\">" +
                    "<time class=\"mtb-timeago\" datetime=\"" + msg.time + "\"/>" +
                    "<time class=\"mtb-time\">" + new Date(msg.time).format() + "</time>" +
                "</a>";
            if (msg.edit)
                timestamp =
                    "<a href=\"?diff="      + msg.diff + "\" class=\"mtb-diff\">Edited by</a> " +
                    "<a href=\"/wiki/User:" + msg.edit + "\" class=\"mtb-user\">" + msg.edit + "</a> " +
                    timestamp;
            return "" +
                "<div class=\"pf-msg-toolbar\">" +
                    "<div class=\"mtb-timestamp\">" + timestamp + "</div>" +
                    "<div class=\"mtb-btn-wrapper\">" +
                        "<div class=\"pf-round-btn mtb-btn-quote\"><div class=\"icon\"></div>QUOTE</div>" +
                        "<div class=\"pf-round-btn mtb-btn-more\">" +
                            "<div class=\"icon\"></div>" +
                            "<div class=\"mtb-dropdown\">" +
                                (wgUserName === username || isMod ? "<a class=\"mtb-edit\"><span class=\"icon\"></span>Edit</a>" : "") +
                                "<a class=\"mtb-view-source\"><span class=\"icon\"></span>View source</a>" +
                                (wgUserName === username || isMod ? "" : "<a class=\"mtb-report\"><span class=\"icon\"></span>Report</a>") +
                                (wgUserName === username || isMod || wgUserName === msgs[1].user ? "<a class=\"mtb-remove\"><span class=\"icon\"></span>Remove</a>" : "") +
                                (canDelete ? "<a class=\"mtb-delete\"><span class=\"icon\"></span>Delete</a>" : "") +
                            "</div>" +
                        "</div>" +
                    "</div>" +
                "</div>";
        };
        const removed = function() {
            return "" +
                "<div class=\"r-removed\">This reply has been removed (<a>view reply</a>)</div>" +
                "<div class=\"r-view\">" +
                    "<div class=\"r-info\">" +
                        "<div class=\"r-by\">" +
                            "<a href=\"/wiki/User:" + info.removedBy + "\">" + info.removedBy + "</a> " +
                            "removed this reply because:" +
                        "</div>" +
                        "<div class=\"r-reason\">" +
                            info.removeReason.toText() +
                        "</div>" +
                        "<div class=\"r-timestamp\">" +
                            "<time class=\"r-time\">" + new Date(info.removeTime).format() + "</time>" +
                        "</div>" +
                    "</div>" +
                    "<div class=\"r-buttons\">" +
                        "<div>(<a class=\"r-hide\">hide reply</a>)</div>" +
                        (isMod || wgUserName === username ? "<div>(<a class=\"r-restore\">restore reply</a>)</div>" : "") +
                    "</div>" +
                "</div>";
        };
        const follow =
            "<div class=\"pf-btn pf-follow" + (watchlist.includes(wgPageName.replace(/_/g, " ")) ? " pf-btn-main" : "") + "\">" +
                "<div class=\"icon\"></div>" +
                "<div class=\"pf-follow-text\">FOLLOW</div>" +
            "</div>";
        const title = "<div class=\"pf-title\">" + wgTitle + "</div>";
        return "" +
            "<div class=\"pf-msg pf-" + msgNum + (info.removedBy ? " removed" : "") + "\" id=\"" + msgNum + "\">" +
                (info.removedBy ? removed() : "") +
                "<div class=\"pf-avatar\"><img src=\"" + u[username].avatar + "\"></div>" +
                "<div class=\"pf-msg-body\">" +
                    (msgNum === 1 ? follow : "") +
                    kudos() +
                    user() +
                    (msgNum === 1 ? title : "") +
                    "<div class=\"pf-text\">" + msg.text + "</div>" +
                    messageToolbar() +
                "</div>" +
            "</div>";
    };
    const templateDeleted = function(msgNum) {
        const info = msgs[msgNum].info;
        return "" +
            "<div class=\"pf-msg pf-" + msgNum + " deleted\" id=\"" + msgNum + "\">" +
                "This reply has been deleted by " +
                "<a href=\"/wiki/User:" + info.deletedBy + "\">" + info.deletedBy + "</a>" +
                "." +
            "</div>";
    };
    const templateEdit = function(replying) {
        const textarea =
            "<textarea" +
                " class=\"pf-edit\"" +
                (replying ? " placeholder=\"Post a reply\"" : " autofocus") +
            "/>";
        const toolbar =
            "<div class=\"pf-edit-toolbar\">" +
                "<div class=\"etb-fmt\">" +
                    "<a class=\"disabled\"><span class=\"icon source\" title=\"Source mode\"></span></a>" +
                    "<a><span class=\"icon visual\" title=\"Switch to Visual mode\"></span></a>" +
                    "<div class=\"etb-separator\"></div>" +
                    "<a><span class=\"icon b\" title=\"Bold\"></span></a>" +
                    "<a><span class=\"icon i\" title=\"Italic\"></span></a>" +
                    "<a><span class=\"icon bernie2020\" title=\"Weird demonic object\"></span></a>" +
                    "<a><span class=\"icon u\" title=\"Underline\"></span></a>" +
                    "<a><span class=\"icon link\" title=\"Add link\"></span></a>" +
                    "<a href=\"/wiki/Special:Upload\" title=\"Special:Upload\" tabindex=\"-1\" target=\"_blank\"><span class=\"icon file\" title=\"Upload photo\"></span></a>" +
                "</div>" +
                "<div class=\"etb-msg\">" +
                    "<div" +
                        " class=\"pf-btn pf-btn-main etb-" + (replying ? "reply" : "save") + " disabled\"" +
                        " tabindex=\"0\"" +
                    ">" +
                        "<div class=\"icon\"></div>" +
                        (replying ? "reply" : "save") +
                    "</div>" +
                    "<div class=\"pf-btn etb-preview disabled\" tabindex=\"0\">" +
                        "<div class=\"icon\"></div>" +
                        "preview" +
                    "</div>" +
                    (!replying ? "<div class=\"pf-btn etb-compare disabled\" tabindex=\"0\">" +
                        "<div class=\"icon\"></div>" +
                        "compare" +
                    "</div>" : "") +
                "</div>" +
            "</div>";
        return [textarea, toolbar];
    };
    
    // Edit events
    const editEvents = function(el) {
        const $textarea = $(el[0]);
        const $toolbar  = $(el[1]);
        $textarea.on("input", function() {
            $(this).resize(210);
        }).on("keydown", function(e) {
            if (e.key !== "Tab")
            	return;
            const $x = $(this).next().children(".etb-msg").children();
            if ($x.hasClass("disabled")) {
                e.preventDefault();
            } else if (e.shiftKey) {
                e.preventDefault();
                $x.last().focus();
            }
        });
        // Formatting toolbar
        const format = function(open, close, name) {
            const textarea = $textarea[0];
            textarea.focus();
            const ss = textarea.selectionStart;
            const se = textarea.selectionEnd;
            const beforeSelected = textarea.value.slice(0, ss);
            const isSelected     = textarea.value.slice(ss, se);
            const afterSelected  = textarea.value.slice(se);
            if (ss === se) { // If nothing is selected
                textarea.value = beforeSelected + open + name + close + afterSelected;
                // Select name
                textarea.setSelectionRange(ss + open.length, ss + open.length + name.length);
            } else {
                textarea.value = beforeSelected + open + isSelected + close + afterSelected;
                // Move cursor after the thing
                textarea.setSelectionRange(se + open.length + close.length, se + open.length + close.length);
            }
        };
        $(".etb-fmt > a > .icon", $toolbar).click(function() {
            switch (true) {
                case $(this).hasClass("visual"):
                    visualModal.show();
                    break;
                case $(this).hasClass("b"):
                    format("'''", "'''", "Bold text");
                    break;
                case $(this).hasClass("i"):
                    format("''", "''", "Italic text");
                    break;
                case $(this).hasClass("bernie2020"):
                    window.open("https://youtu.be/dQw4w9WgXcQ");
                    break;
                case $(this).hasClass("u"):
                    format("<u>", "</u>", "Underlined text");
                    break;
                case $(this).hasClass("link"):
                    format("[[", "]]", "Link title");
                    break;
            }
        });
        // Message toolbar
        $(".etb-msg", $toolbar).children().last().on("keydown", function(e) {
            if (!(e.key === "Tab" && !e.shiftKey)) return;
            e.preventDefault();
            $(this).closest(".pf-edit-toolbar").prev(".pf-edit").focus();
        });
        // Return
        return $textarea.after($toolbar);
    };
    
    // Setup page before getting data
    const setup = function() {
        // Load CSS vars using [[w:c:dev:Colors]]
        mw.hook("dev.colors").add(function() {
            const css = (
                ":root {" +
                    // dev.colors.wikia
                    "--page:     $page;      --page-rgb:     $pageRgb;" +
                    "--menu:     $menu;      --menu-rgb:     $menuRgb;" +
                    "--header:   $header;    --header-rgb:   $headerRgb;" +
                    "--link:     $link;      --link-rgb:     $linkRgb;" +
                    "--contrast: $contrast;  --contrast-rgb: $contrastRgb;" +
                    "--text:     $text;      --text-rgb:     $textRgb;" +
                    "--border:   $border;    --border-rgb:   $borderRgb;" +
                    "--gradient: $gradient;  --gradient-rgb: $gradientRgb;" +
                    // Custom
                    "--pf-bg:     $pfBackground; --pf-bg-rgb:     $pfBackgroundRgb;" +
                    "--pf-border: $pfBorder;     --pf-border-rgb: $pfBorderRgb;" +
                "}"
            ).replace(/\s+/g, "");
            const customVars = {
                pfBackground:
                    config.pfBackground ||
                    dev.colors.parse(dev.colors.wikia.menu).mix(dev.colors.wikia.page,
                        $("body").hasClass("oasis-dark-theme") ?
                            dev.colors.parse(dev.colors.wikia.menu).mix(dev.colors.wikia.page, 30).lightness() < 0.3 ?
                                40 :
                                30 :
                            15
                    ).toString(),
                pfBorder: config.pfBorder || dev.colors.wikia.border,
            };
            // Create alt vars as RGB components
            const rgb = function(obj) {
                Object.keys(obj).forEach(function(x) {
                    customVars[x + "Rgb"] = dev.colors.parse(obj[x]).rgb().slice(4, -1);
                });
            };
            rgb(customVars);
            rgb(dev.colors.wikia);
            // Compile
            dev.colors.css(css, customVars);
        });
        
        // Create new reply textarea
        $(".pf-new .pf-msg-body").append(
            editEvents(templateEdit(true))
        );
        
        // Events
        // Leave site warning
        window.addEventListener("beforeunload", function() {
            $(".pf-edit").each(function() {
                if (this.value) {
                    window.event.returnValue = "";
                }
            });
        });
        
        // New reply
        // Avatar
        $(".pf-new > .pf-avatar").html("<img src=\"" + $(".wds-global-navigation-wrapper .wds-avatar > img").attr("src") + "\">");
        // Expand textarea
        $(".pf-edit").focus(function() {
            $(this).closest(".pf-new").addClass("active");
        });
        // Collapse textarea
        $(document).click(function(e) {
            if (
                !$(e.target).closest(".pf-new").length && // Click is outside
                !$(".pf-new .pf-edit").val() && // Textarea is empty
                !$(".pf-new .pf-edit").is(":focus") // Textarea isn't focused
            ) $(".pf-new").removeClass("active");
        });
        // Disable edit toolbar messaging buttons if textarea is empty
        $(".pf-new .pf-edit").on("input", function() {
            if (this.value) {
                $(this).next().find(".etb-msg .pf-btn").removeClass("disabled");
            } else {
                $(this).next().find(".etb-msg .pf-btn").addClass("disabled");
            }
        });
        
        // Add refresh button
        $("body").append("<div class=\"pf-refresh\"><div class=\"icon\"></div></div>");
        
        // Cont
        getData();
    };
    
    // Get data about each message with API calls
    const getData = function() {
        const getMsgs = function(i) {
            console.log("getMsgs(" + i + ")");
            const post = [];
            const info = [];
            for (var j = i; j < i + 50; j++) {
                post.push("Forum talk:" + wgTitle + "/" + j);
                info.push("Forum talk:" + wgTitle + "/" + j + "/info");
            }
            api.get({
                action: "query",
                titles: post.join("|"),
                prop: "revisions",
                rvprop: "content|ids|timestamp|user|comment",
            }).done(function(data) {
                Object.values(data.query.pages).forEach(function(x) {
                    if (!x.revisions) return;
                    const msgNum = x.title.split("/").neg(1);
                    x = x.revisions[0];
                    msgs[msgNum] = {
                        edit: x.comment.includes("|Replied]] to thread \"") ? "" : x.user,
                        diff: x.revid,
                        time: x.timestamp,
                        wikitext: x["*"].slice(0, x["*"].lastIndexOf("<var data-name=\"")),
                        user: $(x["*"].slice(x["*"].lastIndexOf("<var data-name=\""))).attr("data-name"),
                        info: {},
                    };
                    u[msgs[msgNum].user] = {};
                });
                api.get({
                    action: "query",
                    titles: info.join("|"),
                    prop: "revisions",
                    rvprop: "content",
                }).done(function(data) {
                    Object.values(data.query.pages).forEach(function(x) {
                        if (!x.revisions) return;
                        const msgNum = x.title.split("/").neg(2);
                        msgs[msgNum] = Object.assign(msgs[msgNum], {
                            info: JSON.parse(x.revisions[0]["*"]),
                        });
                    });
                    if ((i += 50) === msgs.length) {
                        getMsgs(i); // Loop fn again
                    } else {
                        forum(); // Cont
                    }
                });
            });
        };
        // Get data about users
        const forum = function() {
            console.log("forum()");
            const editcounts = [];
            Object.keys(u).forEach(function(x) {
                editcounts.push(
                    "\"" + x + "\":" +
                    "\"" +
                    "{{Special:Editcount/" + x + "/Forum}}|" +
                    "{{Special:Editcount/" + x + "/Forum talk}}" +
                    "\""
                );
            });
            api.get({
                action: "parse",
                text: "{" + editcounts.join(",") + "}",
                prop: "text",
                disablepp: true,
            }).done(function(data) {
                data = JSON.parse(data.parse.text["*"].slice(3, -5));
                Object.keys(data).forEach(function(x) {
                    const val = data[x].split("|");
                    u[x].forum = parseInt(val[0]) + parseInt(val[1]);
                });
                id(0); // Cont
            });
        };
        const id = function(xId) {
            console.log("id(" + xId + ")");
            const usernames = Object.keys(u).slice(xId, xId + 50);
            api.get({
                action: "query",
                list: "users",
                ususers: usernames.join("|"),
                usprop: "groups",
                titles: "User:" + usernames.join("/ForumBio|User:") + "/ForumBio",
                prop: "revisions",
                rvprop: "content",
            }).done(function(data) {
                data.query.users.forEach(function(x) {
                    u[x.name].id = x.userid;
                    u[x.name].groups = x.groups.remove("*", "user", "autoconfirmed");
                });
                Object.values(data.query.pages).forEach(function(x) {
                    u[x.title.slice(5, -9)].forumbio = (x.revisions ? x.revisions[0]["*"] : "").replace(/\n/g, " ").slice(0, 160);
                });
                if ((xId += 50) < Object.keys(u).length) {
                    id(xId); // Loop fn again
                } else {
                    avatar(0); // Cont
                }
            });
        };
        const avatar = function(xAvatar) {
            console.log("avatar(" + xAvatar + ")");
            const userids = Object.values(u).slice(xAvatar, xAvatar + 50).map(function(x) {
                return x.id;
            });
            $.getJSON("/api/v1/User/Details?ids=" + userids.join(","), function(data) {
                data.items.forEach(function(x) {
                    u[x.name].avatar = x.avatar;
                    u[x.name].total = x.numberofedits;
                });
                if ((xAvatar += 50) < Object.keys(u).length) {
                    avatar(xAvatar); // Loop fn again
                } else {
                    joinDate(0); // Cont
                }
            });
        };
        const joinDate = function(xJoinDate) {
            console.log("joinDate(" + xJoinDate + ")");
            const username = Object.keys(u)[xJoinDate];
            api.get({
                action: "query",
                list: "usercontribs",
                ucuser: username,
                ucdir: "newer",
                ucprop: "timestamp",
                uclimit: 1,
            }).done(function(data) {
                data = data.query.usercontribs[0];
                var date;
                if (data) {
                    date = new Date(data.timestamp);
                    date = date.getMonthName().slice(0, 3) + " " + date.getFullYear();
                }
                u[username].first = date || "Error";
                if (++xJoinDate < Object.keys(u).length) {
                    joinDate(xJoinDate); // Loop fn again
                } else {
                    getWatchlist(); // Cont
                }
            });
        };
        const getWatchlist = function(cont) {
            api.get({
                action: "query",
                list: "watchlistraw",
                wrlimit: "max",
                wrnamespace: 110,
                wrcontinue: cont,
            }).done(function(data) {
                data.watchlistraw.forEach(function(x) {
                    watchlist.push(x.title);
                });
                if (data["query-continue"]) {
                    searchWatchlist(data["query-continue"].watchlistraw.wrcontinue); // Loop fn again
                } else {
                    console.log("msgs: ", msgs, "\nu: ", u);
                    loadMsgs(1); // Cont
                }
            });
        };
        getMsgs(1);
    };
    const loadMsgs = function(msgNum) {
        const msg = msgs[msgNum];
        const info = msg.info;
        if (info.deletedBy) {
            $(".pf-loading").before(templateDeleted(msgNum));
            if (++msgNum < msgs.length) {
                loadMsgs(msguNum); // Load fn again
            } else {
                events(); // Cont
            }
            return;
        }
        api.get({
            action: "parse",
            text: msg.wikitext,
            prop: "text",
            disablepp: true,
        }).done(function(data) {
            msg.text = data.parse.text["*"];
            if (msgNum === 1) {
                $(".pf-thread").prepend(templateMessage(msgNum));
            } else {
                $(".pf-loading").before(templateMessage(msgNum));
            }
            if (++msgNum < msgs.length) {
                loadMsgs(msgNum); // Load fn again
            } else {
                events(); // Cont
            }
        });
    };
    const events = function() {
        // Go to hash, if there is one
        if (window.location.hash) {
            window.location.href = window.location.hash;
        }
            
        // Timeago
        $(".mtb-timeago").timeago();
        
        // Follow
        const $barFollow = $(".wikia-bar .tools > .overflow > a[data-name=\"follow\"]");
        $(".pf-follow").click(function() {
            const $this = $(this);
            if ($barFollow.length) {
                $barFollow.click();
            } else {
                const params = {
                    action: "watch",
                    title: wgPageName,
                    token: mw.user.tokens.get("watchToken"),
                };
                if ($this.hasClass("pf-btn-main")) {
                    params.unwatch = true;
                }
                api.post(params).done(function() {
                    $this.toggleClass("pf-btn-main");
                    const notifText = "The page \"" + wgPageName.replace(/_/g, " ") + "\" has been " + (params.unwatch ? "removed from" : "added to") + " <a href=\"/wiki/Special:Watchlist\">your watchlist</a>.";
                    new BannerNotification(notifText, "confirm", null, 3500).show();
                });
            }
        });
        $barFollow.click(function() {
            $(".pf-follow").toggleClass("pf-btn-main");
        });
        
        // User
        var editingForumbio = false;
        $(".u-inner").each(function() {
            const msgNum = $(this).closest(".pf-msg").attr("id");
            const msg = msgs[msgNum];
            const username = msg.user;
            const $info     = $(".u-info", this);
            const $forumbio = $("textarea", this);
            const $buttons  = $(".u-btn-wrapper", this);
            // Show/hide user info on/off hover
            $(this).children("a").click(function(e) {
                if (e.shiftKey || e.ctrlKey || e.metaKey) return;
                e.preventDefault();
                $info.show();
                $forumbio.resize();
            });
            var timeout;
            $(this).hover(function() {
                if (editingForumbio) return;
                timeout = setTimeout(function() {
                    $info.fadeIn();
                    $forumbio.resize();
                }, 600);
            }, function() {
                if (editingForumbio) return;
                clearTimeout(timeout);
                $info.fadeOut();
            });
            // Editing forumbio
            $forumbio.focus(function() {
                if (
                    editingForumbio ||
                    $forumbio.is("[readonly]")
                ) return;
                editingForumbio = true;
                $buttons.show();
                // Editing forumbio
                $forumbio.on("input", function() {
                    // Auto resize
                    $(this).resize();
                    // Prevent line breaks
                    this.value = this.value.replace(/\n/g, " ");
                    // Disable/enable save button
                    if (this.value === $forumbio.text()) {
                        $(".u-save", $buttons).addClass("disabled");
                    } else {
                        $(".u-save", $buttons).removeClass("disabled");
                    }
                });
                // Close function
                const close = function() {
                    // Remove event listeners
                    $forumbio.off("input");
                    $buttons.children().off("click");
                    // Close els
                    $(".u-save", $buttons).addClass("disabled");
                    $buttons.hide();
                    $info.fadeOut();
                    editingForumbio = false;
                };
                // Save button is clicked
                $(".u-save", $buttons).on("click", function() {
                    if ($(this).hasClass("disabled")) return;
                    $(this)
                        .text("SAVING...")
                        .css("animation", "flip 0.5s infinite linear");
                    api.post({
                        action: "edit",
                        title: "User:" + username + "/ForumBio",
                        text: $forumbio.val(),
                        summary: "Edited user ForumBio",
                        notminor: true,
                        watch: true,
                        token: mw.user.tokens.get("editToken"),
                    }).done(function() {
                        // Update others
                        $(".u-forumbio > textarea").each(function() {
                            const msgNum = $(this).closest(".pf-msg").attr("id");
                            if (msgs[msgNum].user !== username) return;
                            $(this)
                                .text($forumbio.val())
                                .val($forumbio.val());
                        });
                        // Revert to normal
                        $(".u-save", $buttons)
                            .text("SAVE")
                            .css("animation", "none");
                        close();
                    });
                });
                // Cancel button is clicked
                $(".u-cancel", $buttons).on("click", function() {
                    $forumbio.val($forumbio.text()); // Restore old text
                    close();
                });
            });
        });
        
        // KUDOS
        $(".pf-kudos").each(function() {
            const $this = $(this);
            const msgNum = $(this).closest(".pf-msg").attr("id");
            const msg = msgs[msgNum];
            const info = msg.info;
            info.kudos     = info.kudos     || [];
            info.antiKudos = info.antiKudos || [];
            var kNum = info.kudos.length;
            var aNum = info.antiKudos.length;
            const percent = function(kNum, aNum, $this) {
                const p = (kNum + aNum) ? kNum / (kNum + aNum) * 100 : 50;
                $this.find(".k-bar-inner").css("width", p + "%");
                $this.attr("title", Math.round(p) + "% gave Kudos");
            };
            if (info.kudos.includes(wgUserName)) {
                $(".k-btn.plus", this).addClass("down");
            } else if (info.antiKudos.includes(wgUserName)) {
                $(".k-btn.minus", this).addClass("down");
            }
            percent(kNum, aNum, $this);
            $(".k-btn", this).click(function() {
                if ($(this).hasClass("plus")) {
                    if ($(this).hasClass("down")) {
                        info.kudos = info.kudos.remove(wgUserName);
                        kNum--;
                    } else {
                        info.kudos.push(wgUserName);
                        kNum++;
                        if ($(".k-btn.minus", $this).hasClass("down")) {
                            info.antiKudos = info.antiKudos.remove(wgUserName);
                            aNum--;
                            $(".k-btn.minus", $this).removeClass("down");
                        }
                    }
                } else {
                    if ($(this).hasClass("down")) {
                        info.antiKudos = info.antiKudos.remove(wgUserName);
                        aNum--;
                    } else {
                        info.antiKudos.push(wgUserName);
                        aNum++;
                        if ($(".k-btn.plus", $this).hasClass("down")) {
                            info.kudos = info.kudos.remove(wgUserName);
                            kNum--;
                            $(".k-btn.plus", $this).removeClass("down");
                        }
                    }
                }
                api.post({
                    action: "edit",
                    title: "Forum talk:" + wgTitle + "/" + msgNum + "/info",
                    text: JSON.stringify(i),
                    summary: "Voted on [[" + wgPageName + "#" + msgNum + "|reply #" + msgNum + "]] on thread \"" + wgTitle + "\"",
                    minor: true,
                    watchlist: "nochange",
                    token: mw.user.tokens.get("editToken"),
                }).done(function(data) {
                    if (data.error) {
                        new BannerNotification("Your vote was not saved. Please reload the page and try again.", "error").show();
                        console.log(data.error);
                    }
                });
                $(this).toggleClass("down");
                $(".k-count.plus",  $this).text(kNum);
                $(".k-count.minus", $this).text(aNum);
                percent(kNum, aNum, $this);
            });
        });
        
        // Message toolbar
        $(".mtb-btn-more").click(function() {
            $(this).toggleClass("active");
        }).mouseleave(function() {
            $(this).removeClass("active");
        });
        
        // Removed replies
        $(".r-removed a").click(function() {
            $(this).closest(".pf-msg.removed").removeClass("removed").addClass("view");
        });
        $(".r-hide").click(function() {
            $(this).closest(".pf-msg.view").removeClass("view").addClass("removed");
        });
        
        // Stop loading
        $(".pf-loading").remove();
    };
    
    // Don't run function if
    if (
        window.pseudoForumLoaded || // This has already been run before
        wgNamespaceNumber !== 110 || // Namepace isn't Forum
        !wgUserName // User is an anon
    ) return;
    window.pseudoForumLoaded = true;
    
    // Init
    setup();
})();