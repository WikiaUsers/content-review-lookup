

/* <pre> */
/* <nowiki>*/

$('.DBQuery').each(function() 
{
var lines=$(this).text().split(($(this).text().indexOf('\r')!=-1) ? '\r' : '\n');
var database='';
var formId='';
var resultId='';
var properties=[];
var entries=[];
var queries={};

// Give an error in the results area
function showError(str) 
    {
    $('#'+resultId).empty().append($('<span />').addClass('jcError').text(str));
    }
// Parse config.  'database' references the page to be used as a database, 'form' and 'result' are where the query form and result appear.
for (var i = 0; i < lines.length; i++) 
    {
    var temp=lines[i].split('=', 2);
    if (temp.length!=2) 
        {
        continue;
        }
    switch ($.trim(temp[0])) 
        {
        case 'database':
            database=($.trim(temp[1]));
            break;
        case 'form':
        formId=($.trim(temp[1]));
            break;
        case 'result':
            resultId=($.trim(temp[1]));
            break;
        }
    }

//Dealing with formatting: convertLinks takes a string and converts all internal wiki links into HTML links, returning the modified string.

function convertLinks(string)
    {
    var aliaslinkre=/\[\[(.*?)\|(.*?)\]\]/;
    var linkre=/\[\[(.*?)\]\]/;
    var linktext=string.match(aliaslinkre);
    while (linktext!=null)
        {
        var replacement='<a href="/wiki/'+linktext[1]+'">'+linktext[2]+'</a>';
        var string=string.replace(aliaslinkre,replacement);
        linktext=string.match(aliaslinkre);
        }
    linktext=string.match(linkre);
    while (linktext!=null) 
        {
        var replacement='<a href="/wiki/'+linktext[1]+'">'+linktext[1]+'</a>';
        var string=string.replace(linkre,replacement);
        linktext=string.match(linkre);
        }
    return string;
    }

//stripHTML takes a string, and returns the same string minus any HTML tags.

function stripHTML(string)
    {
    var linkre=/<(.*?)>/g;
    var string=string.replace(linkre,"");
    return string;
    }
 
//Now for the actual search-and-test mechanic.

//First check if a single value matches the query: This function takes the text in the database and an array of entries, plus minima and maxima for ranges, from the query, and the mode (0 if it is to accept any value entered in the query, and 1 if it is to reject any value entered in the query), and returns true or false based on whether the value is accepted or rejected.

function checkEligValue(DBValue,queryMins,queryMaxes,queryValues,mode)
    {
    var DBMin;
    var DBMax;
    var temp=DBValue.split('-');
        if (temp.length==2&&!isNaN(temp[0])&&!isNaN(temp[1]))
            {
            DBMin=parseFloat(temp[0]);
            DBMax=parseFloat(temp[1]);
            }
        else
            {
            DBValue=DBValue.toLowerCase();
            DBMin=DBValue;
            DBMax=DBValue;
            }
    //two cases, based on mode:
    switch (mode)
        {
        //Either these are the allowed values
        case 0:
            for (var i = 0; i < queryValues.length; i++)
                { 
                //Four possibilities for acceptance: first is DB value equals query value.
                if (DBValue==queryValues[i])
                    {
                    return true;
                    }
                //Or DB value is in the query's range.
                if (DBValue>=queryMins[i]&& DBValue<=queryMaxes[i])
                    {
                    return true;
                    }
                //Or DB range contains query value.
                if (DBMin<=queryValues[i]&& DBMax>=queryValues[i])
                    {
                    return true;
                    }
                //Or DB range and query range overlap.
                if (DBMax>=queryMins[i]&& DBMin<=queryMaxes[i])
                    {
                    return true;
                    }
                }
            return false;
        //or the disallowed values.
        case 1:
            for (var i = 0; i < queryValues.length; i++)
                {
                //Three possibilities for rejection: first is DB value equals query value.
    
                if (DBValue==queryValues[i])
                    {
                    return false;
                    }
                //Or DB value is in the query's range.
                if (DBValue>=queryMins[i]&& DBValue<=queryMaxes[i])
                    {
                    return false;
                    }
                //Or DB range is contained in query range.
                if (DBMax<=queryMaxes[i]&& DBMin>=queryMins[i])
                    {
                    return false;
                    }
                }
            return true;
        }
    }
 
//Next check if a single property matches the query: This function takes the text in a line of the database and in the query for a particular property, and the mode (0 if it is to accept any value entered in the query, and 1 if it is to reject any value entered in the query), and returns true or false based on whether the database includes an acceptable value.

function checkEligVar(DBEntry,queryEntry,mode)
    {
    var DBValues=DBEntry.split(',');
    for (var i = 0; i < DBValues.length; i++)
        {
        DBValues[i]=$.trim(DBValues[i]);
        }
    var queryValues=queryEntry.split(',');
    var queryMins=[];
    var queryMaxes=[];
    for (var i = 0; i < queryValues.length; i++)
        {
        queryValues[i]=$.trim(queryValues[i]);
        var temp=queryValues[i].split('-');
        if (temp.length==2&&!isNaN(temp[0])&&!isNaN(temp[1]))
            {
            queryMins[i]=parseFloat(temp[0]);
            queryMaxes[i]=parseFloat(temp[1]);
            }
        else
            {
            queryValues[i]=queryValues[i].toLowerCase();
            queryMins[i]=queryValues[i];
            queryMaxes[i]=queryValues[i];
            }
        }
    for (var i = 0; i < DBValues.length; i++)
        {
        if (checkEligValue(DBValues[i],queryMins,queryMaxes,queryValues,mode)==true)
            {
            return true;
            }
        }
    return false;
    }

//Next check if a single line matches the query: This function takes the text in a line of the database and arrays for the query's input (for each property, whether the property is enabled, what text was entered, and the mode (0 if it is to accept any value entered in the query, and 1 if it is to reject any value entered in the query)), and returns true or false based on whether the database line matches the query (i.e. contains at least one acceptable value for each enabled property).

function checkEligLine(DBLine,enables,queryEntries,modes)
    {
    var entryRE=/<td>[\s\S]*?<\/td>/g;
    var DBEntries=DBLine.match(entryRE);
    for (var i = 0; i < properties.length; i++)
        {
        if (enables[i]==true&&checkEligVar(stripHTML(DBEntries[i]),queryEntries[i],modes[i])==false)
            {
            return false;
            }
        }
    return true;
    }

//Finally, to construct the list of entries fulfilling a particular query: This function takes the query input, organized as three arrays over the database properties, and returns an array of all the lines (presented as strings) that match the query.

function query(enables,queryEntries,modes)
    {
    var eligentries=[];
    for (var i = 0; i < entries.length; i++)
        {
        if (i==0)
            {
            continue;
            }
        if (checkEligLine(entries[i],enables,queryEntries,modes)==true)
            {
            eligentries.push(entries[i]);
            }
        }
    return eligentries;
    }
 
//So that's how you get a list fitting one query, but we want to be able to combine them.

//First, to add: This function simply takes two sets as arrays and returns the union.

function addDBtables(current,target)
    {
    var temp=current.concat(target);
    var out=current;
    for (var i = 0; i < target.length; i++)
        {
        if (out.indexOf(target[i])==-1)
            {
            out.push(target[i]);
            }
        }
    return out;
    }

//Next, to subtract: This function returns the relative complement of the second argument with respect to the first.

function subtractDBtables(current,target)
    {
    var out=[];
    for (var i = 0; i < current.length; i++)
        {
        if (target.indexOf(current[i])==-1)
            {
            out.push(current[i]);
            }
        }
    return out;
    }

//And lastly, to intersect: This function returns the intersection of its arguments.

function intersectDBtables(current,target)
    {
    var out=[];
    for (var i = 0; i < current.length; i++)
        {
        if (target.indexOf(current[i])!=-1)
            {
            out.push(current[i]);
            }
        }
    return out;
    }

//All the DOM elements associated with a query are organized by the properties of the queries element, so next is a constructor for those properties.  All the properties, except for name and resultList, are DOM objects: The div containing the result table, the table itself, the show/hide table button, the dropdown box and text field for modification options, and the text field for the name of the new table.  Name is used as the caption of the table, as well as to reference the table from other fields, and resultList is an array of the database rows included in the table.  As a constructor, it is designed to be called with the "new" keyword, and then returns the constructed object.

function queryRecords(name,div,table,showHide,resultList,modifyMethod,modifyBy,newName)
{
this.name=name;
this.div=div;
this.table=table;
this.showHide=showHide;
this.resultList=resultList;
this.modifyMethod=modifyMethod;
this.modifyBy=modifyBy;
this.newName=newName;
}

//Next, to show and hide the table.  showTable shows (creates) the table and makes it sortable, and hideTable hides the table (removes everything but the caption and header line from the DOM, though the contents are still stored so it can be shown again.)  There is no return value.

function showTable()
    {
    this.value="Hide Table";
    this.onclick=hideTable;
    var queryObject=this.queryObject;
    var table=queryObject.table;
    table.innerHTML=entries[0]+queryObject.resultList.join("");
    table.createCaption().innerHTML=queryObject.name;
    table.setAttribute('class', "wikitable sortable");
    mw.loader.using('jquery.tablesorter', function() 
        {
        $(table).tablesorter(); 
        });
    }
function hideTable()
    {
    this.value="Show Table";
    this.onclick=showTable;
    var table=this.queryObject.table;
    table.innerHTML=entries[0];
    table.createCaption().innerHTML=this.queryObject.name;
    }

//Now to use two tables to produce a new one.

//First, by replacing the old table: This function replaces the table whose button was used to call the function with another table; the new table has a name equal to the "Name for new table" field on the calling table, and its contents are constructed from the calling table and the table specified in the "Modify this table by" field of the calling table; the means of construction are determined by the drop-down menu in the calling table.  If the new name is already taken (by a table other than the calling table) or the table is to be modified by a nonexistent table, it alerts an error message and returns false (not replacing the table); otherwise it replaces the table and returns true.

function replaceTable()
    {
    var queryObject=this.queryObject;
    var newName=queryObject.newName.value;
    if (newName in queries&&newName!=queryObject.name)
        {
        alert("That name is already in use.");
        return false;
        }
    var secondTableName=queryObject.modifyBy.value;
    var modifyMethodNo=queryObject.modifyMethod.selectedIndex;
    switch(modifyMethodNo)
        {
        case 0:
            var newTableEntries=queryObject.resultList;
            break;
        case 1:
            if (secondTableName in queries)
                {
                var newTableEntries=addDBtables(queryObject.resultList,queries[secondTableName].resultList);
                break;
                }
            else
                {
                alert("Cannot modify by that table; it does not exist");
                return false;
                }
        case 2:
            if (secondTableName in queries)
                {
                var newTableEntries=subtractDBtables(queryObject.resultList,queries[secondTableName].resultList);
                break;
                }
            else
                {
                alert("Cannot modify by that table; it does not exist");
                return false;
                }
        case 3:
            if (secondTableName in queries)
                {
                var newTableEntries=intersectDBtables(queryObject.resultList,queries[secondTableName].resultList);
                break;
                }
            else
                {
                alert("Cannot modify by that table; it does not exist");
                return false;
                }
        }
    queries[newName]=queryObject;
    delete queries[queryObject.name];
    queryObject.name=newName;
    queryObject.resultList=newTableEntries;
    var button=queryObject.showHide;
    if (button.value=="Hide Table")
        {
        showTable.call(button);
        }
    else
        {
        hideTable.call(button);
        }
    }    

// This function works the same as the previous one, except that it creates a new table instead of replacing the calling one; as a result, it will also fail if the new table's name is specified to be the same as the calling table.

function newModTable()
    {
    var queryObject=this.queryObject;
    var newName=queryObject.newName.value;
    if (newName in queries)
        {
        alert("That name is already in use.");
        return false;
        }
    var secondTableName=queryObject.modifyBy.value;
    var modifyMethodNo=queryObject.modifyMethod.selectedIndex;
    switch(modifyMethodNo)
        {
        case 0:
            var newTableEntries=queryObject.resultList;
            break;
        case 1:
            if (secondTableName in queries)
                {
                var newTableEntries=addDBtables(queryObject.resultList,queries[secondTableName].resultList);
                break;
                }
            else
                {
                alert("Cannot modify by that table; it does not exist");
                return false;
                }
        case 2:
            if (secondTableName in queries)
                {
                var newTableEntries=subtractDBtables(queryObject.resultList,queries[secondTableName].resultList);
                break;
                }
            else
                {
                alert("Cannot modify by that table; it does not exist");
                return false;
                }
        case 3:
            if (secondTableName in queries)
                {
                var newTableEntries=intersectDBtables(queryObject.resultList,queries[secondTableName].resultList);
                break;
                }
            else
                {
                alert("Cannot modify by that table; it does not exist");
                return false;
                }
        }
    createResultTableStructure(newName,newTableEntries);
    return true;
    } 

//Next, to delete an existing table: This function permanently deletes the calling table.

function deleteTable()
    {
    var queryObject=this.queryObject;
    document.getElementById(resultId).removeChild(queryObject.div);
    delete queries[queryObject.name];
    }
 
//Next, a function to create a new table and the div that contains it: This takes as arguments a string "name" and an array of table rows "resultList", and creates the result table with the appropriate name and rows, plus all the associated buttons for modification, showing/hiding, and deletion.  It is, by default, hidden upon creation.  There is no return value.

function createResultTableStructure(name,resultList)
    {
    var newTableDiv=document.createElement("div");
    newTableDiv.appendChild(document.createElement("br"));
    var newTable=document.createElement("table");
    newTable.innerHTML=entries[0];
    newTable.createCaption().innerHTML=name;
    newTableDiv.appendChild(newTable);
    var button1=document.createElement("input");
    button1.type="button";
    button1.value="Show Table";
    button1.onclick=showTable;
    newTableDiv.appendChild(button1);
    var delButton=document.createElement("input");
    delButton.type="button";
    delButton.value="Delete this table";
    delButton.onclick=deleteTable;
    newTableDiv.appendChild(delButton);
    newTableDiv.appendChild(document.createElement("br"));
    newTableDiv.appendChild(document.createTextNode("Modification options:"));
    var modifyMethod=document.createElement("select");
    var temp=document.createElement("option");
    temp.text='Copy (do not modify)';
    modifyMethod.add(temp,null);
    var temp=document.createElement("option");
    temp.text='Add';
    modifyMethod.add(temp,null);
    var temp=document.createElement("option");
    temp.text='Subtract';
    modifyMethod.add(temp,null);
    var temp=document.createElement("option");
    temp.text='Intersect';
    modifyMethod.add(temp,null);
    newTableDiv.appendChild(modifyMethod);
    newTableDiv.appendChild(document.createTextNode("Modify this table by"));
    var modifyBy=document.createElement("input");
    modifyBy.type="text";
    newTableDiv.appendChild(modifyBy);
    newTableDiv.appendChild(document.createElement("br"));
    newTableDiv.appendChild(document.createTextNode("Name for new table:"));
    var newName=document.createElement("input");
    newName.type="text";
    newTableDiv.appendChild(newName);
    var button2=document.createElement("input");
    button2.type="button";
    button2.value="Replace this table";
    button2.onclick=replaceTable;
    newTableDiv.appendChild(button2);
    var button3=document.createElement("input");
    button3.type="button";
    button3.value="Create as new table";
    button3.onclick=newModTable;
    newTableDiv.appendChild(button3);
    newTableDiv.appendChild(document.createElement("br"));
    record=new queryRecords(name,newTableDiv,newTable,button1,resultList,modifyMethod,modifyBy,newName);
    button1.queryObject=record;
    delButton.queryObject=record;
    button2.queryObject=record;
    button3.queryObject=record;
    queries[name]=record;
    document.getElementById(resultId).appendChild(newTableDiv);
    }

//And now for the function to make the actual query form.  This function creates the query form and assigns its functionality (using the function "query" to generate the rows matching the query and then creating the appropriate table structure.)  It has no return value, but the function called by entering a query (defined inside this function) returns true or false depending on whether the result table was successfully created (it fails only if called with a name already in use.)

function createQueryTableStructure()
    {
    var queryTable=document.createElement("table");
    var enablesInputs=[];
    var queryEntriesInputs=[];
    var modesInputs=[];
    for (var i = 0; i < properties.length; i++)
        {
        var newRow=queryTable.insertRow(i);
        var header=document.createElement("th");
        header.appendChild(document.createTextNode(properties[i])); 
        newRow.appendChild(header);
        var enablesLoc=newRow.insertCell(1);
        var enablesInput=document.createElement("input");
        enablesInput.type="checkbox";
        enablesInput.checked=false;
        enablesInputs.push(enablesInput);
        enablesLoc.appendChild(document.createTextNode("Restrict by this property"));
        enablesLoc.appendChild(enablesInput);
        var entriesLoc=newRow.insertCell(2);
        var modesInput=document.createElement("select");
        var temp=document.createElement("option");
        temp.text='Allowed values:';
        modesInput.add(temp,null);
        var temp=document.createElement("option");
        temp.text='Disallowed values:';
        modesInput.add(temp,null);
        modesInputs.push(modesInput);
        entriesLoc.appendChild(modesInput);
        var entriesInput=document.createElement("input");
        entriesInput.type="text";
        queryEntriesInputs.push(entriesInput);
        entriesLoc.appendChild(entriesInput);
        }
    var queryLoc=document.getElementById(formId);
    queryLoc.removeChild(queryLoc.firstChild);
    queryLoc.appendChild(queryTable);
    queryLoc.appendChild(document.createTextNode('Name for query-results table:'));
    var resultTableName=document.createElement('input');
    resultTableName.type="text";
    queryLoc.appendChild(resultTableName);
    var queryButton=document.createElement('input');
    queryButton.type="button";
    queryButton.value="Create table of results";
    queryButton.onclick=function()
        {
        if (resultTableName.value in queries)
            {
            alert("That name is already in use.");
            return false;
            }
        var enables=[];
        var queryEntries=[];
        var modes=[];
        for (var i = 0; i < enablesInputs.length; i++)
            {
            enables.push(enablesInputs[i].checked);
            queryEntries.push(queryEntriesInputs[i].value);
            modes.push(modesInputs[i].selectedIndex);
            }
        var resultList=query(enables,queryEntries,modes);
        createResultTableStructure(resultTableName.value,resultList);
        return true;
        }
    queryLoc.appendChild(queryButton);
    }

//This function loads the database (given to it by the ajax call), organizes and sanitizes it, changes internal wikilinks to HTML, assigns appropriate properties, and then creates the query.  There is no return value.

function loadDB(data)
    {
    //Load database into "entries" variable
    var pages=data.query.pages;
    var page=null;
    for (i in pages)
        {
        pageId=pages[i].pageid;
        }
    var page=data.query.pages[pageId];
    pagecontent=page.revisions[0]['*'];
    var linere=/<tr>[\s\S]*?<\/tr>/g;
    entries=pagecontent.match(linere);
    //Change links to HTML.
    for (var i = 0; i < entries.length; i++)
        {
        entries[i]=convertLinks(entries[i]);
        }
    //The headings in the first line, sans markup, become the properties of the database entries
    var temp=entries[0];
    var headingre=/<th>[\s\S]*?<\/th>/g;
    properties=temp.match(headingre);
    for (var i = 0; i < properties.length; i++)
        {
        properties[i]=stripHTML(properties[i]);
        }
    createQueryTableStructure();
    }

$.ajax(
    {
    data: 
        {
        'action': 'query',
        'prop': 'revisions',
        'titles': database,
        'rvprop': 'content',
        'redirects': '',
        'format': 'json'
        },
    dataType: 'json',
    success: loadDB,
    error: showError,
    url: mw.config.get('wgScriptPath')+'/api.php',
    timeout: 10000 // millisec
    });

});
/* </nowiki>*/
 
/* </pre> */