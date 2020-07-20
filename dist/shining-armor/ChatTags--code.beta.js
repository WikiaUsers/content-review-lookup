/**
 * ChatTags - A BBCode parser for Wikia Special:Chat
 *
 * Version v3.0.0
 *
 * Copyright (c) 2013 - 2016 Maria Williams (Shining-Armor)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var Lumox = {
    tokens: {
        'lbrace': '[',
        'rbrace': ']',
        'tequal': '=',
        'tquote': '"',
        'tslash': '/'
    },
    
    tags: [
        'b', 'bg', 'big',
        'c', 'code', 'font',
        'i', 'img', 's',
        'small', 'style', 'sub',
        'sup', 'u', 'url',
        'yt'
    ],
    
    tagMethod: {},
    
    escape: function(text) {
        return text.replace(/['"<>&]/g, function(character) {
            switch (character) {
                case '\'':
                    return '&#039;';
                case '"':
                    return '&quot;';
                case '<':
                    return '&lt;';
                case '>':
                    return '&gt;';
                case '&':
                    return '&amp;';
            }
        });
    },
    
    isTag: function(token) {
        if (this.tags.indexOf(token) > -1) {
            return true;
        } else {
            return false;
        }
    },
    
    isToken: function(token) {
        for (var key in this.tokens) { 
            if (this.tokens[key] === token) { 
                return true; 
            }
        }
        
        return false;
    },
    
    getTokenType: function(token) {
        for (var key in this.tokens) {
            if (this.tokens[key] === token) { 
                return +key;
            }
        }
    },
    
    tokenize: function(text) {
        var tokens = [];
        var tempst = '';
        
        for (var i = 0; i < text.length; i++) {
            if (this.isToken(text[i]) === true) {
                if (tempst.length > 0) {
                    tokens[tokens.length] = tempst;                            // Add tempst to token array
                    tempst = '';                                               // Reset temporary token string
                }
                
                tokens[tokens.length] = text[i];                               // Add token to the token array
            } else {
                tempst += text[i];                                             // Add current non-token character to array
            }
        }
        
        return tokens;
    },
    
    lexenize: function(tokens) {
        var tree = [];
        
        for (var i = 0; i < tokens.length; i++) {
            if (this.isToken(tokens[i]) === true) {                            // Is token
                tree[tree.length] = {                                          // Create a lex object for the token
                    type: this.getTokenType(tokens[i]),                        // Assign token type
                    token: tokens[i]                                           // Assign token
                };
            } else if (this.isTag(tokens[i]) === true) {                       // Is tag
                tree[tree.length] = {
                    type: 'tag',
                    token: tokens[i]
                };
            } else {                                                           // Is plain-text
                tree[tree.length] = {
                    type: 'text',
                    token: tokens[i]
                };
            }
        }
        
        return tree;
    },
    
    orgenize: function(tokens) {
        var tree = [];
        var temp = '';
        
        for (var i = 0; i < tokens.length; i++) {
            if (tokens[i].type === 'lbrace') {
                if (tokens[i + 1].type === 'tag') {                            // if [tag
                    if (tokens[i + 2].type === 'tequal') {                     // Tag with variable
                        if (tokens[i + 3].type === 'tquote') {
                            if (tokens[i + 4].type === 'text') {
                                if (tokens[i + 5].type === 'tquote') {
                                    if (tokens[i + 6].type === 'rbrace') {     // [tag="param"]
                                        tree[tree.length] = {                  // Add parameter tag
                                            type: tokens[i + 1].token,
                                            parameter: tokens[i + 4].token
                                        };
                                    } else {                                   // [tag="param"
                                        temp += '';
                                    }
                                } else {                                       // [tag="param
                                    
                                }
                            } else {                                           // [tag="
                                
                            }
                        } else {                                               // [tag=
                            
                        }
                    } else if (tokens[i + 3].type === 'rbrace') {              // [tag]
                        
                    } else {                                                   // [tag
                        
                    }
                } else {                                                       // [
                    temp += tokens[i].token;
                }
            } else if (tokens[i].type === 'text') {                            // Add non-parsed text to temp
                temp += tokens[i].token;
            } else {                                                           // If the next token is not a tag add to temp
                temp += tokens[i].token;
            }
        }
        
        return tree;
    },
    
    parse: function(text) {
        var tokens = this.tokenize(text);
            tokens = this.lexenize(tokens);
            tokens = this.orgenize(tokens);
    }
};

ChatTags = {
    processText: function(text, allowHtml) {
        if (!allowHtml) {
            // Prevent simple HTML/JS vulnerabilities (need to do this before other rewrites).
            text = text.replace(/</g, "&lt;");
            text = text.replace(/>/g, "&gt;");
        }
        
        // Insert BBCode parser call before links are processed
        // This is not a Wikia modification
        text = ChatTags.parse(text);
        
        // TODO: Use the wgServer and wgArticlePath from the chat room. Maybe the room should be passed into this function? (it seems like it could be called a bunch of times in rapid succession).

        // Prepare a regexp we use to match local wiki links
        var localWikiLinkReg = '^' + mw.config.get('wgServer') + mw.config.get('wgArticlePath');
            localWikiLinkReg = localWikiLinkReg.replace(/\$1/, "(\\S+[^.\\s\\?\\,])");
            localWikiLinkReg = new RegExp(localWikiLinkReg, "i");


        if (!allowHtml) {
            
            // Linkify http://links
            var exp = /\b(ftp|http|https):\/\/(\w+:{0,1}\w*@)?[a-zA-Z0-9\-\.]+(:[0-9]+)?\S+[^.\s\?\,]/ig;
            
            text = text.replace(exp, function(link) {
                var linkName = link;
                
                // Linkify local wiki links (eg: http://thiswiki.wikia.com/wiki/Page_Name ) as shortened links (like bracket links)
                var match = localWikiLinkReg.exec(link);
                
                if (match !== null) {
                    linkName = match[1].replace(/_/g, " ");
                }
                
                // (BugId:97945) Invalid URIs can throw "URIError: URI malformed"
                try {
                    linkName = decodeURIComponent(linkName);
                } catch (e) {}
                
                linkName = linkName.replace(/</g, "&lt;"); // prevent embedding HTML in urls (to get it to come out as plain HTML in the text of the link)
                linkName = linkName.replace(/>/g, "&gt;");
                
                return '<a href="' + link + '">' + linkName + '</a>';
            });
        }

        // helper function (to avoid code duplicates)
        var linkify = function(article, linkText) {
            article = article.replace(/ /g, "_");
            linkText = linkText.replace(/_/g, " ");
            linkText = unescape(linkText);
            linkText = linkText.replace(/</g, "&lt;"); // prevent embedding HTML in urls (to get it to come out as plain HTML in the text of the link)
            linkText = linkText.replace(/>/g, "&gt;");

            var path = wgServer + wgArticlePath;
                article = encodeURIComponent(article);
                article = article.replace(/%2f/ig, "/"); // make slashes more human-readable (they don't really need to be escaped)
                article = article.replace(/%3a/ig, ":"); // make colons more human-readable (they don't really need to be escaped)
            
            var url = path.replace("$1", article);
        
            return '<a href="' + url + '">' + linkText + '</a>';
        };

        // Linkify [[Pipes|Pipe-notation]] in bracketed links.
        var exp = /\[\[([^\[\|\]\r\n\t]*)\|([^\[\]\|\r\n\t]*)\]\]/ig;
        
        text = text.replace(exp, function(wholeMatch, article, linkText) {
            if (!linkText) { // Parse "pipe-trick" links, eg. [[User:Example|Example]] expands to <a href="/wiki/User:Example">Example</a>
                var colonLocation = article.indexOf(":");
                
                if (colonLocation == -1) {
                    linkText = article;
                } else {
                    linkText = article.substring(colonLocation + 1);
                }
            }
            
            return linkify(article, linkText);
        });

        // Linkify [[links]]
        var exp = /(\[\[[^\[\]\r\n\t]*\]\])/ig;
        
        text = text.replace(exp, function(match) {
            var article = match.substr(2, match.length - 4);
            var linkText = article.replace(/_/g, " ");
            
            return linkify(article, linkText);
        });

        // Process emoticons (should be done after the linking because the link code is searching for URLs and the emoticons contain URLs).
        // Replace appropriate shortcuts in the text with the emoticons.
        text = WikiaEmoticons.doReplacements(text, this.emoticonMapping);

        return text;
    },
    
    escapeBracketLinks: function(text) {
        var matches = text.match(/(\[\[(.*)\]\])/g);
        
        for (var match in matches) {
            text = text.replace(match, "&lbrack;&lbrack;$2&rbrack;&rbrack;");
        }
        
        return text;
    },
    
    replaceBracketLinks: function(text) {
        return text.replace(/\&lbrack\;\&lbrack\;/g, '[[').replace(/\&rbrack\;\&rbrack\;/g, ']]');
    },
    
    parse: function(text) {
        text = this.escapeBracketLinks(text);
        text = Lumox.parse(text);
        text = this.replaceBracketLinks(text);
        
        return text;
    },
    
    init: function() {
        if (typeof ChatView === 'object') {
            ChatView.prototype.processText = this.processText;
        } else {
            console.error('[ERROR] Unable to plugin to the chat');
            return;
        }
    }
};

$(document).ready(function() {
    ChatTags.init();
});