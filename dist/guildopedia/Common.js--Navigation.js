if(wgAction == "view") alert('Navigation 0.012');

// ********************** Hide/Show for Tables and Divs ***********************

 // This is a # set parts script
 // Originaly from Wikipedia, Wookipedia, Wikibooks. For author attribution, 
 // please check each Individual MediaWiki:Common.js
 
 //Configuration
 var tableAutoCollapse = 2;  //Max table count before triggering auto collapse
 var   divAutoCollapse = 2;  //Max div count before triggering auto collapse

 var collapseCaption = 'hide ▲'; //
 var   expandCaption = 'show ▼'; //
 
 var tempHide = 'click to collapse'; //currently not been use
 var tempShow = 'click to expand';   //currently not been use
 
 // 1st part will Test if an element has a certain class
 var hasClass = (function () {
     var reCache = {};
     return function (element, className) {
         return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp('(?:\\s|^)' + className + '(?:\\s|$)'))).test(element.className);
     };
 })();
 
 // 2.- Wikitables. Allows tables to be collapsed, showing only the header.
 function collapseTable(tableIndex) {
    var Button = document.getElementById('collapseButton' + tableIndex);
    var Table = document.getElementById('collapsibleTable' + tableIndex);
    //Checa si table y button existe
    if (!Table || !Button) {
        return false;
    }
 
    var Rows = Table.rows;
    // if shown now
    if (Button.firstChild.data == collapseCaption) {
        for (var i = 1; i < Rows.length; i++) {
            Rows[i].style.display = 'none';
        }
        Button.firstChild.data = expandCaption;
    } else { // if hidden now
        for (var i = 1; i < Rows.length; i++) {
            Rows[i].style.display = Rows[0].style.display;
        }
        Button.firstChild.data = collapseCaption;
    }
 }
 function createTableToggleButton() {
    var tableIndex = 0;
    var NavBoxes = new Object();
    var Tables = document.getElementsByTagName( 'table');
 
    for (var i = 0; i < Tables.length; i++) {
        if (!hasClass(Tables[i], 'collapsible'))
            continue;
        
        // only add button and increment count if there is a header row to work with
        var HeaderRow = Tables[i].getElementsByTagName('tr')[0];
        if (!HeaderRow) continue;
        var Header = HeaderRow.getElementsByTagName('th')[0];
        if (!Header) continue;
        //apuntador extra
        NavBoxes[ tableIndex ] = Tables[i];
        //marca la tabla como 'hide' y su index
        Tables[i].setAttribute('id', 'collapsibleTable' + tableIndex);
        var Button     = document.createElement('span');
        var ButtonLink = document.createElement('a');
        var ButtonText = document.createTextNode(collapseCaption);
        
        Button.style.styleFloat = 'right';
        Button.style.cssFloat = 'right';
        Button.style.fontWeight = 'normal';
        Button.style.textAlign = 'right';
        Button.style.width = '6em';
        
        ButtonLink.style.color = Header.style.color;
        ButtonLink.setAttribute('id', 'collapseButton' + tableIndex);
        ButtonLink.setAttribute('href', 'javascript:collapseTable(' + tableIndex + ');');
        ButtonLink.appendChild(ButtonText);
        
        Button.appendChild(document.createTextNode( '['));
        Button.appendChild(ButtonLink);
        Button.appendChild(document.createTextNode( ']'));
        
        Header.insertBefore(Button, Header.childNodes[0]);
        tableIndex++;
    }
    for (var i = 0;  i < tableIndex; i++) {
        //checks if Table has class 'collapsed' or 'autocollapse' against the limit 'tableAutoCollapse'
        if (hasClass(NavBoxes[i], 'collapsed') || (tableIndex >= tableAutoCollapse && hasClass(NavBoxes[i], 'autocollapse'))) {
             collapseTable(i);
        }else if (hasClass(NavBoxes[i], 'innercollapse')) {
            var element = NavBoxes[i];
            while (element = element.parentNode) {
                if (hasClass(element, 'outercollapse')) {
                    collapseTable(i);
                    break;
                }
            }
        }
    }
 }
 
 addOnloadHook(createTableToggleButton);
 
 // 3.- Dynamic Navigation Bars (aka NavFram)
 function toggleNavigationBar(divIndex) {
    var NavToggle = document.getElementById('NavToggle' + divIndex);
    var NavFrame = document.getElementById('NavFrame' + divIndex);
    
    if (!NavFrame || !NavToggle) {
        return false;
    }
    
    if (NavToggle.firstChild.data == collapseCaption) { // if shown now
        for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
            if (hasClass(NavChild, 'NavContent')) {
                NavChild.style.display = 'none';
            }
        }
        NavToggle.firstChild.data = expandCaption;
    } else if (NavToggle.firstChild.data == expandCaption) { // if hidden now
        for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
            if (hasClass(NavChild, 'NavContent')) {
                NavChild.style.display = 'block';
            }
        }
        NavToggle.firstChild.data = collapseCaption;
    }
 }
 // adds show/hide-button to navigation bars
 function createDivToggleButton() {
    var divIndex = 0;
    // iterate over all < div >-elements 
    var divs = document.getElementsByTagName('div');
    for(var i=0; NavFrame = divs[i]; i++) {
        // if found a navigation bar
        if (!hasClass(NavFrame, 'NavFrame') /*&& !hasClass(NavFrame, 'collapsible')*/)
            continue;
        
        var isCollapsed; //= hasClass(NavFrame, 'collapsed');
        //checks if Div has class 'collapsed' or 'autocollapse' against the limit 'divAutoCollapse'
        if (hasClass(NavFrame, 'collapsed') || (divIndex >= divAutoCollapse && hasClass(NavFrame, 'autocollapse'))) {
             isCollapsed = true;
        }
        /*
         * Backwards compatibility: with the old way of starting collapsed. New
         * way is to add the class "collapsed" to the NavFrame.
         */
        for (var NavChild = NavFrame.firstChild; NavChild != null && !isCollapsed; NavChild = NavChild.nextSibling) {
            if (hasClass( NavChild, 'NavContent') && (NavChild.style.display == 'none'))
                isCollapsed = true;
        }
        if (isCollapsed) { 
            for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
                if (hasClass( NavChild, 'NavContent')) {
                    NavChild.style.display = 'none';
                }
            }
        }
        divIndex++;
        var divToggle = document.createElement('a');
        divToggle.className = 'NavToggle'; //Asignates class name
        divToggle.setAttribute('id', 'NavToggle' + divIndex);
        divToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + divIndex + ');');
        
        divToggle.appendChild(document.createTextNode(isCollapsed ? expandCaption : collapseCaption));
        
        // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
        for(var j=0; j < NavFrame.childNodes.length; j++) {
            if (hasClass(NavFrame.childNodes[j], 'NavHead')) {
                NavFrame.childNodes[j].appendChild(divToggle);
            }
        }
        NavFrame.setAttribute('id', 'NavFrame' + divIndex);
    }
 }
 
 addOnloadHook(createDivToggleButton);