/* fandom staff, this just changes my name to Teto */

mw.hook('wikipage.content').add(() => {
    document.querySelectorAll('a').forEach(link => {
        if (!link.href || !link.href.includes("User:TayJay1320")) return;

        link.childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE && node.textContent.includes("TayJay1320")) {
                node.textContent = node.textContent.replace("TayJay1320", "Teto");
            }
        });
    });
});



/* fandom staff, this just changes my user name depending on the page type */

mw.hook('wikipage.content').add(() => {
    // 1. Figure out what kind of page this is
    const namespace = mw.config.get('wgCanonicalNamespace');
    let newName = "Fake Wifies"; // Default name for normal articles

    if (namespace === "User_blog") {
        newName = "The Director";   // Name for Blog Posts
    } else if (namespace === "Message_Wall" || namespace === "Board" || namespace === "Thread") {
        newName = "i am not here"; // Name for Social Pages
    }

    // 2. Scan all links and replace Goodman183179 with the correct name
    document.querySelectorAll('a').forEach(link => {
        if (!link.href || !link.href.includes("User:Goodman183179")) return;

        link.childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE && node.textContent.includes("Goodman183179")) {
                node.textContent = node.textContent.replace("Goodman183179", newName);
            }
        });
    });
});

//locks old comments
window.lockOldComments = window.lockOldComments || {};
window.lockOldComments.limit = 240;


/* From https://fictional-googology.fandom.com/wiki/MediaWiki:Common.js, it is completely fine, it's for a template we need*/

/* mw.hook("wikipage.content").add(function () {
$("span.import-css").each(function () {
 		var css = mw.util.addCSS($(this).attr("data-css"));
 		$(css.ownerNode).addClass("import-css").attr("data-css-hash", $("span.import-css").attr("data-css-hash")).attr("data-from", $("span.import-css").attr("data-from"));
 	});
 }); */  /*keeping just in case*/