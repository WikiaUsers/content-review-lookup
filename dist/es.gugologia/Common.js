/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

var oldDefine = define;
define = function(id, dependencies, definition, defMock) {
    console.log(id);
    oldDefine(id, dependencies, definition, defMock);
}
 
 
function include(s) {
  document.write("<script type=\"text/javascript\" src=\"http://es.wikia.com/index.php?title=" + encodeURI(s) + "&action=raw&ctype=text/javascript&dontcountme=s\"></script>");
}
 
 
if (mwCustomEditButtons) {
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/central/images/7/74/Button_comment.png",
        "speedTip": "Insert a comment visible only by editors",
        "tagOpen": "<!-- ",
        "tagClose": " -->",
        "sampleText": "Insert comment here"
    };
 
mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/central/images/a/a0/Button_references_alt.png",
        "speedTip": "Insert a list of references",
        "tagOpen": "=== Sources ===\n<references />",
        "tagClose": "",
        "sampleText": ""
    };
 
mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/central/images/1/16/Button_reflink_alternate.png",
        "speedTip": "Insert a reference",
        "tagOpen": "<ref>",
        "tagClose": "</ref>",
        "sampleText": "Insert reference"
    };
}
 
var findMath = function(cssSelector, setupFunc) {
    var mathFindingInterval;
    if (mathFindingInterval == undefined) {
        mathFindingInterval = setInterval(function() {
            var $math = $(cssSelector)[0];
            if (typeof $math != "undefined" && $math.children.length) {
                try {
                    MathJax.Hub.Queue(["Typeset", MathJax.Hub, $math]);
                    clearInterval(mathFindingInterval);
                } catch (err) {
                }
            }
        }, 500);
        if (typeof setupFunc !== "undefined") {
            setupFunc(mathFindingInterval);
        }
    }
}
 
var waitForProcessing = function() {
    var interval;
    interval = setInterval(function() {
        if (ArticleComments.processing == false) {
            MathJax.Hub.Queue(["Typeset", MathJax.Hub, "WikiaArticleComments"]);
            clearInterval(interval);
        }
    }, 500);
}
 
addOnloadHook(function () {
    importScriptURI("http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML");
    if (wgAction == "edit" && wgCanonicalNamespace != "Thread" && wgCanonicalNamespace != "Board") {
        require(['wikia.preview'], function(context, m) {
            context.oldRenderPreview = context.renderPreview;
            context.renderPreview = function(options) {
                context.oldRenderPreview(options);
                findMath('.ArticlePreview > .ArticlePreviewInner > .WikiaArticle', function(interval) {
                    $(window).bind("EditPagePreviewClosed", function(interval) {
                        clearInterval(interval);
                        $(window).unbind("EditPagePreviewClosed");
                    });
                });
            }
        });
    }
    if (typeof ArticleComments !== "undefined") {
        ArticleComments.oldInit = ArticleComments.init;
        ArticleComments.init = function() {
            ArticleComments.oldInit();
            MathJax.Hub.Queue(["Typeset", MathJax.Hub, "WikiaArticleComments"]);
        }
        ArticleComments.oldSaveEdit = ArticleComments.saveEdit;
        ArticleComments.saveEdit = function(e) {
            ArticleComments.oldSaveEdit(e);
            waitForProcessing();
        }
        ArticleComments.oldPostComment = ArticleComments.postComment;
        ArticleComments.postComment = function(e) {
            ArticleComments.oldPostComment(e);
            waitForProcessing();
        }
    }
    if (typeof MiniEditor !== "undefined" && typeof MiniEditor.Wall !== "undefined") {
        Wall.MessageForm.prototype.oldShowPreviewModal = Wall.MessageForm.prototype.showPreviewModal;
        Wall.MessageForm.prototype.showPreviewModal = function(format, metatitle, body, width, publishCallback) {
            Wall.MessageForm.prototype.oldShowPreviewModal(format, metatitle, body, width, publishCallback);
            findMath('#WallPreviewModal .WallPreview > .WikiaArticle');
        };
        MiniEditor.Wall.EditMessageForm.prototype.oldAfterClose = MiniEditor.Wall.EditMessageForm.prototype.afterClose;
        MiniEditor.Wall.EditMessageForm.prototype.afterClose = function(bubble) {
            MiniEditor.Wall.EditMessageForm.prototype.oldAfterClose(bubble);
            findMath('.Wall.Thread');
        };
    }
});