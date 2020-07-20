/* ================================================== */
/* ====   Monster Filter                         ==== */
/* ================================================== */

/*

    The Monster Filter Tool uses the Wikia extension CategoryIntersection. The extension has a UI limitation - It can only display the pages if two or less categories are selected (see here: https://summonerswar.wikia.com/wiki/Special:CategoryIntersection). The tool itself, however, is capable of selecting pages with three or more categories through the use of an API query. 

    Example: https://summonerswar.wikia.com/api.php?action=query&list=categoryintersection&categories=Category:Fire+Element|Category:Attack+Type|Category:Monsters 

    The above API query selects the pages that are in three categories: Fire Element, Attack Type and Monsters. The result of the query is then displayed as an XML file (just like the link above)

    The Monster Filter Tool generates the query based on what categories the user selected. When the query is generated on the Monster Filter Tool page, the code here then retrieves the resulting pages based on the XML file and displays them on the page.

    Up to a maximum of eight categories can be selected right now, and more can be added by modifying the Monster Filter Tool and the MonsterFilter template.


*/

function monsterFilter()
{
        // Get the generated API query 
        var link = document.getElementById("searchResult").getElementsByTagName("div")[0].innerHTML;

        // The generated link has an additional space at the end, slice to remove
        //link = link.slice(0,-1);
        // The generated link has in HTML entities, convert to symbols.
        link = link.replace(/&amp;/g, '&');
 
        
        var xmlhttp;
        
        // Attempt to retrieve data from the XML file
        if (window.XMLHttpRequest)
        {
            // IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp=new XMLHttpRequest();
        }
        else
        {
            // IE6, IE5
            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }

        xmlhttp.onreadystatechange = function()
        {
          if(xmlhttp.readyState === 4)
          {
                var resultInXML = xmlhttp.responseXML;
                
                // Page titles are under tag cm, attribute title
                // Example:  <cm pageid="4067" ns="0" title="Amazon (Fire)" />
                // Get all elements with tag cm
                var results = resultInXML.getElementsByTagName("cm");

                // Display all results in unordered list
                var text="<ul>";
                var monsterName = "";
 
                // Loop through all results and add each monster and the link to its page to the list
                for (var i=0; i<results.length;i++)
                {
                    // Main namespace is ns="0", get only results from main namespace
                    if(results[i].getAttribute("ns") == 0)
                    {
                        monsterName = results[i].getAttribute("title");
                        text += "<li> <a href=\"//summonerswar.fandom.com/wiki/" + monsterName + "\">" + monsterName + "</a></li>";   
                    }
                }
 
                text += "</ul>";
       
                // If there are search results, replace generated API query with the actual result
                if(results.length !== 0)
                {
                    document.getElementById("searchResult").innerHTML = results.length + " results found: " + "<br/>" + text;
                }
                else // Otherwise return results not found
                {
                    document.getElementById("searchResult").innerHTML = "No results found";
                }
          }
        };
      
      xmlhttp.open("GET",link,false);
      xmlhttp.send();
}
 

// If page is Monster Filter, activate search and change names of sub-categories
if(location.pathname === "/wiki/User:M%CD%A2ystr%CD%A2ile/Monster_Filter" && location.hash !== "#debug")
{
    // When API query is generated (changed) in div id searchResult, start to replace query with results
    $("#searchResult").on("DOMSubtreeModified", monsterFilter);

    $(document).ready(function(){
        // Array of sub-categories, to be indented on filter tool
        var t = JSON.parse($("#filterSubCats").text());
        
        // Indent all sub-categories for readability
        for(i=0;i<t.length;i++)
        {
            $("option[value='"+t[i]+"']").html("&nbsp;&nbsp;&nbsp;&nbsp;" + t[i]);
        }
        
        // Make group titles span across both columns
        $("label[for='begin1searchResultdiv']").parent().siblings().remove();
        $("label[for='begin1searchResultdiv']").parent().attr("colspan","2");
        $("label[for='begin2searchResultdiv']").parent().siblings().remove();
        $("label[for='begin2searchResultdiv']").parent().attr("colspan","2");
    });
}