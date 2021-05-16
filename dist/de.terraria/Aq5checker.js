$(document).ready(() => {
    aq5checker();
});

var apiQueryParams = {
    getLocalInterwikis: {
        action: "query",
        meta: "siteinfo",
        siprop: "interwikimap",
        sifilteriw: "local"
    },
    getCateName: {
        action: "expandtemplates",
        text: "{{l10n|article_quality|cate|$aq$=5}}",
        prop: "wikitext"
    },
    getCateMembers: {
        action: "query",
        prop: "langlinks|revisions",
        lllang: "en",
        generator: "categorymembers",
        gcmlimit: "max",
        lllimit: "max",
        gcmsort: "timestamp",
        gcmdir: "older",
        //gcmtitle: "Category:Seiten mit Artikelqualität 5" // this is determined via API ({{l10n}} expansion, see the parameters above)
    }
};

const wgArticlePath = mw.config.get("wgArticlePath");
const foreignUrl = "https://terraria.fandom.com";

const getLocalUrl = page => wgArticlePath.replace("$1", page);

var logElement;
var outputElement;

function hideNoJSText() {
    for (var elem of document.getElementsByClassName("client-nojs")) {
        elem.style.display = "none";
    }
}

function aq5checker() {
    hideNoJSText();

    const localApi = new mw.Api();
    logElement = document.getElementById("aq5checker-log");
    outputElement = document.getElementById("aq5checker-output");

    outputLog("Fetching the category name...");

    // first, expand {{l10n}} to determine the local name of the category that contains the pages with aq5
    localApi.get(apiQueryParams.getCateName)

    // then get the category members 
    .then(cateNameResult => {
        const fullCatename = "Category:" + cateNameResult.expandtemplates.wikitext;

        addToLastLog(" Done: <a href='" + getLocalUrl(fullCatename) + "'>" + fullCatename + "</a>.");
        outputLog("Fetching the pages in the category...");

        apiQueryParams.getCateMembers.gcmtitle = fullCatename;
        return getCateMembers(localApi);
    })

    // error while getting cate members
    .fail(errordata => {
        var details;
        if (errordata.error !== undefined && errordata.error.info !== undefined) {
            details = errordata.error.info;
        }
        outputError("Error while fetching the pages in the category!", details);
    })

    // getting cate members was successful, so get local and foreign revisions information about each one
    .then(cateMembersResult => {
        if (cateMembersResult.query === undefined || cateMembersResult.query.pages === undefined) {
            addToLastLog(" Done. There are no pages in the category.");
            return new Promise((resolve, reject) => reject());
        } else {
            const pagesCount = Object.keys(cateMembersResult.query.pages).length;
            var stringAboutLimit = "";
            if (cateMembersResult.continue !== undefined && cateMembersResult.limits !== undefined && cateMembersResult.limits.categorymembers !== undefined) {
                stringAboutLimit = " (There are more pages, but " + cateMembersResult.limits.categorymembers + " is the internal limit.)";
            }
            addToLastLog(" Done. Found " + pagesCount + " pages." + stringAboutLimit);
            outputLog("Fetching revision information about them...");
            return Promise.all(getAllRevdatas(cateMembersResult.query.pages));
        }
    })

    // display the fetched information
    .then(revdatas => {
        const pageinfoForOutput = extractRelevantInfoAndFormatIt(revdatas);
        const outdatedPagesCount = Object.keys(pageinfoForOutput).length;

        if (outdatedPagesCount === 0) {
            addToLastLog(" Done. There no outdated pages.");
            return;
        }

        addToLastLog(" Done. There are " + outdatedPagesCount + " outdated pages:");
        outputResult(makeOutputHTML(pageinfoForOutput));
    });
}


function getCateMembers(api) {
    // this could be expanded to include the "continue" functionality, supporting categories with more members than the 500/5000 limit
    return api.get(apiQueryParams.getCateMembers);
}


function getAllRevdatas(pagesdata) {
    var promises = [];
    for (const pageid in pagesdata) {
        const pagedata = pagesdata[pageid];
        if (pagedata.langlinks !== undefined) {
            // only add this page if there is an interwiki link to the foreign wiki
            promises.push(getRevdataForPage(pagedata.title, pagedata.langlinks[0]["*"], pagedata.revisions[0]));
        }
    }
    return promises;
}


function getRevdataForPage(localPagename, foreignPagename, lastRevLocal) {

    const getRevsUrl = foreignUrl + "/api.php?action=query&" + [
        "format=json",
        "prop=revisions",
        "rvprop=ids|timestamp|comment|user|tags",
        "rvstart=now",
        "rvlimit=max",
        "rvend=" + lastRevLocal.timestamp,
        "titles=" + foreignPagename
    ].join("&");

    return new Promise((resolve, reject) => {

        // get all revisions since the specified timestamp
        $.getJSON(getRevsUrl, foreignData => {

            const foreignPagedata = foreignData.query.pages[Object.keys(foreignData.query.pages)[0]];
            if (foreignPagedata.revisions === undefined) {
                // there are no revisions since the specified date
                resolve({});
                return;
            }

            getPreviousRevision(foreignPagedata.revisions[foreignPagedata.revisions.length - 1].revid, foreignPagename).then(previousRevId => {
                revdata = {
                    "pagenameLocal": localPagename,
                    "pagenameForeign": foreignPagename,
                    "lasteditLocal": {
                        "revid": lastRevLocal.revid,
                        "timestamp": lastRevLocal.timestamp,
                        "user": lastRevLocal.user,
                        "summary": lastRevLocal.comment
                    },
                    "revBeforeLastRevForeign": previousRevId,
                    "lasteditsForeign": []
                };

                foreignPagedata.revisions.forEach(foreignPageRev => {
                    revdata.lasteditsForeign.push({
                        "revid": foreignPageRev.revid,
                        "timestamp": foreignPageRev.timestamp,
                        "user": foreignPageRev.user,
                        "summary": foreignPageRev.comment
                    });
                });
                resolve(revdata);
            });
        });
    });
}


function getPreviousRevision(revisionid, pagename) {

    const getRevUrl = foreignUrl + "/api.php?action=query&" + [
        "format=json",
        "prop=revisions",
        "rvprop=ids|timestamp|comment|user|tags",
        "rvstartid=" + revisionid,
        "rvlimit=2",
        "titles=" + pagename
    ].join("&");

    return new Promise((resolve, reject) => {

        // get the revision before the specified one
        $.getJSON(getRevUrl, data => {
            const pagedata = data.query.pages[Object.keys(data.query.pages)[0]];
            if (pagedata.revisions.length === 1) {
                // there are no revisions before the specified one; it is the first revision of the page
                resolve(0);
            } else {
                resolve(pagedata.revisions[1].revid);
            }
        });
    });
}


function extractRelevantInfoAndFormatIt(revdatas) {

    var pageinfoForOutput = [];

    revdatas.forEach(revdata => {
        if (revdata.pagenameLocal === undefined) {
            return;
        }

        const localPagename = revdata.pagenameLocal;
        const lasteditLocal = revdata.lasteditLocal;
        const pagenameForeign = revdata.pagenameForeign;
        const lasteditsForeign = revdata.lasteditsForeign;
        var fulldifflink;
        if (lasteditsForeign.length > 1) {
            fulldifflink = "Special:Diff/" + revdata.revBeforeLastRevForeign + "/" + lasteditsForeign[0].revid;
        }

        var pageinfo = {
            "local": {
                "pagename": localPagename,
                "pagelink": getLocalUrl(localPagename),
                "revid": lasteditLocal.revid,
                "difflink": getLocalUrl("Special:Diff/" + lasteditLocal.revid),
                "timestamp": new Date(lasteditLocal.timestamp).toUTCString(),
                "timestamp_ms": new Date(lasteditLocal.timestamp).getTime(), // timestamp in milliseconds since epoch, for sorting
                "username": lasteditLocal.user,
                "userlink": getLocalUrl("User:" + lasteditLocal.user)
            },
            "foreign": {
                "pagename": pagenameForeign,
                "pagelink": foreignUrl + "/" + pagenameForeign,
                "fulldifflink": fulldifflink,
                "lastedits": []
            }
        };
        lasteditsForeign.forEach(editForeign => {
            pageinfo.foreign.lastedits.push({
                "revid": editForeign.revid,
                "difflink": foreignUrl + "/Special:Diff/" + editForeign.revid,
                "timestamp": new Date(editForeign.timestamp).toUTCString(),
                "username": editForeign.user,
                "userlink": foreignUrl + "/User:" + editForeign.user,
                "summary": editForeign.summary
            });
        });
        pageinfoForOutput.push(pageinfo);
    });
    pageinfoForOutput.sort((a, b) => a.local.timestamp_ms - b.local.timestamp_ms); // sort by last edit on local wiki
    return pageinfoForOutput;
}


function makeOutputHTML(pageinfoForOutput) {

    var outputHTML = `<table class="terraria lined"><tbody><!--
        --><tr><!--
            --><th data-sort-type="number">Page on DE and its latest edit</th><!--
            --><th  data-sort-type="number">Page on EN and its latest edits</th><!--
        --></tr>`;

    pageinfoForOutput.forEach(pageinfo => {

        var foreignEditsCountText = pageinfo.foreign.lastedits.length + (pageinfo.foreign.fulldifflink ? " revisions" : " revision");
        var foreignEditsCountHtml = foreignEditsCountText;
        if (pageinfo.foreign.fulldifflink) {
            // if there is more than 1 foreign revision, add a link
            foreignEditsCountHtml = `<a
                href="${foreignUrl}/${pageinfo.foreign.fulldifflink}"
                class="extiw"
                title="en:${pageinfo.foreign.fulldifflink}"
            >${foreignEditsCountText}</a>`;
        }

        outputHTML += `<tr><!--
            --><td data-sort-value="${pageinfo.local.revid}" style="vertical-align:top"><!--
                --><a href="${pageinfo.local.pagelink}" title="${pageinfo.local.pagename}">${pageinfo.local.pagename}</a><!--
                --><div style="margin-top: 0.3em;" class="note-text"><!--
                    -->on: <a href="${pageinfo.local.difflink}" title="Special:Diff/${pageinfo.local.revid}">${pageinfo.local.timestamp}</a><!--
                --></div><!--
                --><div class="note-text"><!--
                    -->by: <a href="${pageinfo.local.userlink}" title=User:"${pageinfo.local.username}">${pageinfo.local.username}</a><!--
                --></div><!--
            --></td><!--

            --><td><!--
                --><a href="${pageinfo.foreign.pagelink}" class="extiw" title="en:${pageinfo.foreign.pagename}">${pageinfo.foreign.pagename}</a><!--
                --><span class="note-text"><!--
                    --> (${foreignEditsCountHtml})<!--
                --></span><!--
                --><br/><!--
                --><ol>`;

        pageinfo.foreign.lastedits.forEach(foreignEdit => {
            outputHTML += `<!--
                --><li><!--
                    --><a href="${foreignEdit.difflink}" class="extiw" title="en:Special:Diff/${foreignEdit.revid}">${foreignEdit.timestamp}</a><!--
                    --><dl><!--
                        --><dd><!--
                            --><span class="note-text"><!--
                                -->by: <a href="${foreignEdit.userlink}" title="User:${foreignEdit.username}">${foreignEdit.username}</a><!--
                            --></span><!--
                        --></dd><!--
                        --><dd><!--
                            --><span class="note-text"><!--
                                -->edit summary: <small style="white-space: normal;">${foreignEdit.summary}</small><!--
                            --></span><!--
                        --></dd><!--
                    --></dl><!--
                --></li>`;
        });
        outputHTML += "</ol></td></tr>";
    });
    outputHTML += "</tbody></table>";

    return outputHTML;
}


function outputLog(logtext) {
    var newLogLi = document.createElement("li");
    newLogLi.innerHTML = logtext;
    logElement.appendChild(newLogLi);
}


function addToLastLog(logtext) {
    var logLis = logElement.children;
    if (logLis.length === 0) {
        outputLog(logtext);
    } else {
        var lastLogLi = logElement.children[logLis.length - 1];
        lastLogLi.innerHTML += logtext;
    }
}


function outputError(errortext, additionaltext) {
    outputElement.innerHTML += "<strong class='error'>" + errortext + "</strong>";
    if (additionaltext != undefined) {
        outputElement.innerHTML += "<br/>Error details: " + additionaltext;
    }
}


function outputResult(text) {
    outputElement.innerHTML += text;
}