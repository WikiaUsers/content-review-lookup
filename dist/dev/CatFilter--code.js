// Allows filtering pages in a category by namespace
(function ( mw, $) {
    'use strict';
    //Creates a combo box with the namespace
    function createNamespaceCmbList(dropOptions) {
        var Html = mw.html;
        var cmbOutput = "";
        var objNamespace = mw.config.get("wgNamespaceIds");
        var i;
        if (dropOptions) {
            for (i = 0; i < dropOptions.length; i += 1) {
                cmbOutput += Html.element("option", {
                    "value": dropOptions[i]
                }, dropOptions[i]);
            }
        }
        Object.keys(objNamespace).forEach(function (key) {
            if (objNamespace.hasOwnProperty(key) && key.length > 0) {
                cmbOutput += Html.element("option", {
                    "value": key
                }, key);
            }
        });
        return cmbOutput;
    }

    function processAction(type, actionConfig, successMsg, failMsg, runMethod) {
        var mwApi = (new mw.Api());
        var promise;
        if (actionConfig) {
            if (type === "post") {
                promise = mwApi.post(actionConfig);
            } else {
                promise = mwApi.get(actionConfig);
            }
            promise.then(function (data) {
                if (runMethod) {
                    runMethod(data, successMsg, failMsg);
                }
            }).fail(function (data) {
                console.log(data.statusText);
            });
        }
        return promise;
    }
    //Checks for valid namespace to remove links
    function getNamespacesFilter() {
        var objNamespace = mw.config.get("wgNamespaceIds");
        // var nsNameList = $("#namespaceDropdown").val() || "";
        var nsFilters = [];
        var nsName;
        // for (ns = 0; ns < nsNameList.length; ns += 1) {
        nsName = $("#namespaceDropdown").val() || "";
        if (nsName === "main") {
            nsFilters.push(0);
        }
        if (objNamespace[nsName]) {
            nsFilters.push(objNamespace[nsName]);
        }
        // }
        return nsFilters.join("|");
    }

    function main() {
        var Html = mw.html;
        var dropList = createNamespaceCmbList(["main"]);
        var namespace = mw.config.get("wgNamespaceNumber");
        if (namespace === 14) {
            var namespaceDropdown = "Namespace " + Html.element("select", {
                id: "namespaceDropdown",
                // style: "float:right",
                // multiple: "",
                size: ""
            }, new Html.Raw(dropList));
            var formOutput = namespaceDropdown;
            formOutput += " " + Html.element("button", {
                id: "catfilter-ns-button"
            }, "Show");
            formOutput += Html.element("textarea", {
                id: "catfilter-pages-textarea",
                style: "display:none; height: 5em; width: 100%;"
            }, "");
            $("#mw-content-text").prepend(formOutput);
            $("#catfilter-ns-button").on("click", function () {
                var page = mw.config.get("wgTitle");
                var config = {
                    action: "query",
                    list: "categorymembers",
                    cmtitle: "Category:" + page,
                    cmnamespace: getNamespacesFilter(),
                    bot: true,
                    cmlimit: 500
                };
                processAction("post", config, "", "", function (data) {
                    if (data && !data.error && !data.warnings) {
                        var output = "";
                        var catmembers = data.query.categorymembers;
                        $("#catfilter-pages-textarea").text("");
                        Object.keys(catmembers).forEach(function (id) {
                            if (catmembers[id]) {
                                output += catmembers[id].title + "\n";
                            }
                        });
                        $("#catfilter-pages-textarea").css("display", "block");
                        $("#catfilter-pages-textarea").text(output);
                        console.log(data);
                    } else {
                        console.log(data.error);
                    }
                });

            });
        }
    }
    main();
})( mw, $);