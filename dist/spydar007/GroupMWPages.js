$.getJSON("/api.php?action=query&format=json&meta=allmessages&ammessages=Group-sysop-member&cb=" + new Date().getTime(), function(data) {
        var sysopname = data.query.allmessages[0]["*"].replace(/\{{2}.+\|(.+?)\}{2}/g, "$1"),
                canon = mw.config.get("wgCanonicalSpecialPageName"),
                CUSTOMNAME = "sysopman",
                customplural = false;
        function exQuerStr(param) {
                var a = location.search.match(new RegExp("[\\?&]" + param + "\\=([^&#]*)")),
                        m;
                try {
                        m = a[1];
                } catch(err) {}
                return m ? m : "";
        }
        if (
                mw.config.get("wgPageName") == "Special:Log/rights" ||
                (
                        canon == "Log" &&
                        exQuerStr("type") == "rights"
                )
        ) {
                $("#mw-content-text > ul > li").each(function() {
                        var txt = this.childNodes[6];
                        txt.textContent = txt.textContent.split(sysopname).join(CUSTOMNAME);
                });
        } else if (
                mw.config.get("wgPageName") == "Special:ListGroupRights"
        ) {
                $("#mw-content-text > ul > li").each(function() {
                        var txt = this.childNodes[6];
                        txt.textContent = txt.textContent.split(sysopname).join(CUSTOMNAME);
                });
        } else if (canon == "Listusers") {
                // [[Special:ListUsers]]
                // first set label
                var label = document.querySelector('label[for="checkBoxForsysop"] > span:nth-child(2)');
                label.childNodes[1].textContent = (customplural ? customplural : CUSTOMNAME.replace(/^[a-z]/, function(m) {return m.toUpperCase();}) + "s") + " ";
                // now affect the table
                function updateTable() {
                        $("#lu-table > tbody td:nth-child(2)").each(function() {
                                $(this).text($(this).text().split("sysop").join(CUSTOMNAME));
                        });
                        setTimeout(updateTable, 700);
                }
                updateTable();
        }
});

$.getJSON("/api.php?action=query&format=json&meta=allmessages&ammessages=Group-sysop&cb=" + new Date().getTime(), function(data) {
        var sysopname = data.query.allmessages[0]["*"].replace(/\{{2}.+\|(.+?)\}{2}/g, "$1"),
                canon = mw.config.get("wgCanonicalSpecialPageName"),
                CUSTOMNAME = "sysop-man2",
                customplural = false;
        function exQuerStr(param) {
                var a = location.search.match(new RegExp("[\\?&]" + param + "\\=([^&#]*)")),
                        m;
                try {
                        m = a[1];
                } catch(err) {}
                return m ? m : "";
        }
        if (
                mw.config.get("wgPageName") == "Special:Log/rights" ||
                (
                        canon == "Log" &&
                        exQuerStr("type") == "rights"
                )
        ) {
                $("#mw-content-text > ul > li").each(function() {
                        var txt = this.childNodes[6];
                        txt.textContent = txt.textContent.split(sysopname).join(CUSTOMNAME);
                });
        } else if (canon == "Listusers") {
                // [[Special:ListUsers]]
                // first set label
                var label = document.querySelector('label[for="checkBoxForsysop"] > span:nth-child(2)');
                label.childNodes[1].textContent = (customplural ? customplural : CUSTOMNAME.replace(/^[a-z]/, function(m) {return m.toUpperCase();}) + "s") + " ";
                // now affect the table
                function updateTable() {
                        $("#lu-table > tbody td:nth-child(2)").each(function() {
                                $(this).text($(this).text().split("sysop").join(CUSTOMNAME));
                        });
                        setTimeout(updateTable, 700);
                }
                updateTable();
        }
});

$.getJSON("/api.php?action=query&format=json&meta=allmessages&ammessages=Grouppage-sysop&cb=" + new Date().getTime(), function(data) {
        var sysopname = data.query.allmessages[0]["*"].replace(/\{{2}.+\|(.+?)\}{2}/g, "$1"),
                canon = mw.config.get("wgCanonicalSpecialPageName"),
                CUSTOMNAME = "Project:sysops",
                customplural = false;
        function exQuerStr(param) {
                var a = location.search.match(new RegExp("[\\?&]" + param + "\\=([^&#]*)")),
                        m;
                try {
                        m = a[1];
                } catch(err) {}
                return m ? m : "";
        }
        if (
                mw.config.get("wgPageName") == "Special:Log/rights" ||
                (
                        canon == "Log" &&
                        exQuerStr("type") == "rights"
                )
        ) {
                $("#mw-content-text > ul > li").each(function() {
                        var txt = this.childNodes[6];
                        txt.textContent = txt.textContent.split(sysopname).join(CUSTOMNAME);
                });
        } else if (canon == "Listusers") {
                // [[Special:ListUsers]]
                // first set label
                var label = document.querySelector('label[for="checkBoxForsysop"] > span:nth-child(2)');
                label.childNodes[1].textContent = (customplural ? customplural : CUSTOMNAME.replace(/^[a-z]/, function(m) {return m.toUpperCase();}) + "s") + " ";
                // now affect the table
                function updateTable() {
                        $("#lu-table > tbody td:nth-child(2)").each(function() {
                                $(this).text($(this).text().split("sysop").join(CUSTOMNAME));
                        });
                        setTimeout(updateTable, 700);
                }
                updateTable();
        }
});