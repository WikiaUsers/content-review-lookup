/* Any JavaScript here will be loaded for all users on every page load. */

// =====================================================================
// Collapsible Tables
//
// Description: Allows tables to be collapsed, showing only the header.
// Reference:   [[Wikipedia:Wikipedia:NavFrame]]
//              [[Wikipedia:Help:Collapsing]]
// Maintainers: [[Wikipedia:User:R. Koot]]
//
// =====================================================================
 
    function collapseTable(tableIndex) {
        var Button = document.getElementById("collapseButton" + tableIndex);
        var Table = document.getElementById("collapsibleTable" + tableIndex);
        if (!Table || !Button) return false;
 
        var Rows = Table.getElementsByTagName("tr"); 
  
        if (Button.firstChild.data == collapseCaption) {
            for (var i = 1; i < Rows.length; i++) {
                Rows[i].style.display = "none";
            }
            Button.firstChild.data = expandCaption;
        } else {
          for (var i = 1; i < Rows.length; i++) {
              Rows[i].style.display = Rows[0].style.display;
          }
          Button.firstChild.data = collapseCaption;
        }
    }
 
    function createCollapseButtons() {
        var tableIndex = 0;
        var navBoxes = new Object();
        var Tables = document.getElementsByTagName("table");
 
        for (var i = 0; i < Tables.length; i++) {
            if (hasClass(Tables[i], "collapsible")) {
 
                /* Only add button and increment count if there is a header row to work with */
                var HeaderRow = Tables[i].getElementsByTagName("tr")[0];
                if (!HeaderRow) continue;

                var Header = HeaderRow.getElementsByTagName("th")[0];
                if (!Header) continue;

                navBoxes[tableIndex] = Tables[i];
                Tables[i].setAttribute("id", "collapsibleTable" + tableIndex);
 
                var Button     = document.createElement("span");
                var ButtonLink = document.createElement("a");
                var ButtonText = document.createTextNode(collapseCaption);
 
                Button.style.styleFloat = "right";
                Button.style.cssFloat = "right";
                Button.style.fontSize = "90%";
                Button.style.fontWeight = "normal";
                Button.style.textAlign = "right";
                Button.style.width = "6em";
 
                ButtonLink.style.color = Header.style.color;
                ButtonLink.setAttribute("id", "collapseButton" + tableIndex);
                ButtonLink.setAttribute("href", "javascript:collapseTable(" + tableIndex + ");");
                ButtonLink.appendChild(ButtonText);
 
                Button.appendChild(document.createTextNode("["));
                Button.appendChild(ButtonLink);
                Button.appendChild(document.createTextNode("]"));
 
                Header.insertBefore(Button, Header.childNodes[0]);
                tableIndex++;
            }
        }
 
        var j = 0;
        for (var i = 0;  i < tableIndex; i++) {  
            if (hasClass(navBoxes[i], "navbox") && hasClass(navBoxes[i], "collapsible") && hasClass(navBoxes[i], "autocollapse")) j++;

            var h = 0;
            if (hasClass(navBoxes[i], "navbox") && hasClass(navBoxes[i], "collapsible")) h = navBoxes[i].clientHeight;
            if(h == null || h == undefined) h = 0;

            // Does not collapse if:
            //   Contains "uncollapsed"
 
            // Collapses if:
            //   1. Contains "collapsed"
            //   2. If j>autoCollapse, and contains "navbox collapsible autocollapse"
            //   3. If table height > maxHeight, and contains "navbox collapsible"
            //   4. If there are "innercollapse" tables in "outercollapse" tables
 
            if (!hasClass(navBoxes[i], "uncollapsed")) {
                if (hasClass(navBoxes[i], "collapsed") || (j > autoCollapse) || (h > maxHeight)) {
                    collapseTable(i);
                }
                else if (hasClass(navBoxes[i], "innercollapse")) {
                    var element = navBoxes[i];
                    while (element = element.parentNode) {
                        if (hasClass(element, "outercollapse")) {
                            collapseTable(i);
                            break;
                        }
                    }
                }
            }
        }
    }

    addOnloadHook(createCollapseButtons);

// =====================================================================
// End of Collapsible Tables
// =====================================================================