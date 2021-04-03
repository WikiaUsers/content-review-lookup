// Adds a button to the "More" dropdown that allows copying the text of the current page and revision to a language wiki

$(document).ready(function() {
	$(mw.util.addPortletLink("p-cactions", "javascript:;", "Language sync", "ca-langsync", "Copy the text of this revision to a language wiki")).click(function() {
		mw.loader.using("mediawiki.ForeignApi").done(langsync);
	});
});

function langsync() {
	const localApi = new mw.Api();
	const revid = mw.config.get("wgRevisionId");
	var pagetext = '';
	
	const foreignWiki = prompt("Target language wiki? (as in the interwiki table, e.g. fr, zh)");
	if (foreignWiki === null) {
		return;
	}
	
	// get wikitext of current page
    new mw.Api().get({
        action: "query",
        meta: "siteinfo",
        siprop: "interwikimap",
        sifilteriw: "local"
    })
    .done(function(data) {
        const foreignUrl = findTargetWikiInInterwikiMap(data, foreignWiki);
        const foreignApi = new mw.ForeignApi(foreignUrl + "/api.php");

        // get wikitext of current page
        localApi.get({
            action: "parse",
            oldid: revid,
            prop: "wikitext"
        })
        .done(function(data) {
            pagetext = data.parse.wikitext["*"];
            
            // check foreign wiki
            foreignApi.get({
                action: "query",
                meta: "siteinfo",
                siprop: "general"
            })
            .done(function(data) {
                var foreignWikiUrl = data.query.general.base;
                foreignWikiUrl = foreignWikiUrl.substring(0, foreignWikiUrl.lastIndexOf("/"));
                foreignWikiUrl = foreignWikiUrl.replace("/wiki", "");
                
                localPageName = mw.config.get("wgPageName");
                foreignPageName = localPageName;
                
                if (foreignWikiUrl != foreignUrl) {
                    alert('Error while attempting to connect to "' + foreignUrl + '"!');
                } else {
                    if (confirm('Will replace the content of "' + foreignPageName + '" on "' + foreignUrl.replace("https://", "") + '" with the text of this revision (' + revid + '). OK?')) {
                        writeToForeignWiki(foreignApi, {
                            title: foreignPageName,
                            text: pagetext,
                            summary: "sync :: en revid:" + revid + "::"
                        });
                    }
                }
            })
            .fail(function(_, e) {
            	failedConnectingToForeignWiki(foreignUrl, e);
            });
        })
        .fail(function() {
			alert("Error while reading this page!");
		});
	});
}

function findTargetWikiInInterwikiMap(data, targetWiki) {
    if (!(data !== undefined && "query" in data && "interwikimap" in data.query)) {
        return '';
    }
    for (const iwlink of data.query.interwikimap) {
        if (iwlink.prefix === targetWiki) {
            return iwlink.url.replace("/wiki/", "/").replace("/$1", "");
        }
    }
    return '';
}

function failedConnectingToForeignWiki(foreignUrl, e) {
	if (e.xhr.status === 403) {
        alert('"' + foreignWiki + '" is not a valid wiki!');
    } else {
        var localDomain = mw.config.get("wgServer");
        if (foreignUrl.search("gamepedia.com") > -1
            && localDomain.search("fandom.com") > -1) {
            alert('Domains must match! Target wiki is on the Gamepedia domain; this one on Fandom.');
        } else if (localDomain.search("gamepedia.com") > -1
            && foreignUrl.search("fandom.com") > -1) {
            alert('Domains must match! Target wiki is on the Fandom domain; this one on Gamepedia.');
        } else {
            alert('Unknown error occurred! Error message: "' + e.exception + '"');
        }
    }
}

function writeToForeignWiki(foreignApi, info) {
	info.action = "edit";
	foreignApi.postWithEditToken(info)
	.then(function(data) {
		if (data.edit !== undefined) {
			if ("nochange" in data.edit) {
				alert("The target page is already up-to-date. Only performed a null-edit.");
			} else if (data.edit.result === "Success") {
				alert("Edit successful!");
			}
		} else {
			alert("Error during edit!");
		}
	})
	.fail(function(data) {
		alert("Error during edit! Reason: " + data);
	});
}