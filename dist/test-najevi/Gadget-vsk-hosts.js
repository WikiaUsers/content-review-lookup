 /*
<pre>
 */
/*
  VirtualSkipper Live List
 */
function show_alert(sMsg)
{
 if (sMsg.length) alert("Gadget-vsk-hosts : "+sMsg);
};

function echoXML(data) {
    $("div .vskosloadingarea")
    .append("<br/>Data received:<br/><pre>"+data+"<pre>");
};

function writeVskHosts(data){
    // Write the table(s)
    for (var i=0;i<data.getElementsByTagName("server").length;i++) { 
	//if(data.getElementsByTagName("server")[i].login.match(wgUsername)) { // optional filter based on current (Wikia) username
	    var oddeven = (oddeven ? 0 : 1); // CSS can style odd & even rows differently using the class names 'row1' & 'row0' respectively
	    $('.vskostablearea').find('tbody').append("<tr class='row"+oddeven+
                        "'><td>"+data.getElementsByTagName("server")[i].login+
                        "</td><td>"+data.getElementsByTagName("server")[i].name+
                        "</td><td>"+data.getElementsByTagName("server")[i].servername+
                        "</td><td>"+data.getElementsByTagName("server")[i].path+
                        "</td><td>"+data.getElementsByTagName("server")[i].isprivate+
                        "</td><td>"+data.getElementsByTagName("server")[i].isfull+
                        "</td><td>"+data.getElementsByTagName("server")[i].playercount+
                        "</td></tr>");
	//};
    };
    // Show table, hide loading info
    $('.vskosloadingarea').hide("slow");
    $('.vskostablearea').show("slow");
};

function echoXHR(XHR, txt, errThrwn) {
    $("div .vskosloadingarea")
    .append(
        "<div class='ajaxerror'>Error received:<br/>"+txt+
        "<br/>XHR ready: "+XHR.readytState+
        "<br/>XHR status: "+XHR.status+
        "<br/>XHR response text: "+XHR.responseText+
        "<br/>XHR response XML: "+XHR.responseXML+
        //"<br/>Errorthrown: "+errThrwn+
        //"<br/>Options: "+this+
        "</div>"
    );
};

function errorHandler(XMLHttpRequest, textStatus, errorThrown) {
    // typically only one of textStatus or errorThrown will have info
    //this; // the options for this ajax request
    //$("div .vskhosts").append("<div class='ajaxerror'>Error: "+textStatus+"<br/>AJAX request: "+XMLHttpRequest+
    //    "<br/>Errorthrown: "+errorThrown+"<br/>Options: "+this+"</div>");
    alert("Error: "+textStatus+" "+this);
};

importScriptURI('http://test-najevi.wikia.com/wiki/MediaWiki:Gadget-vsk-hosts/ajax-setup'); // any additional debug/error handling 

function vskHosts() {
    // listen for various Ajax events -- debug
    $(".vskosloadingarea").bind("ajaxSend", function(){
        $(this).show();
        }).bind("ajaxComplete", function(){
            $(this).hide();
            });

    // Show the loading info
    $("div .vskhosts")
    .append("<div class='vskosloadingarea'>Loading data ... </div><div class='vskostablearea' "+
        "style='display: none'"+
        "><table class='vskos color2'><thead>"+
        "<tr><th>Host</th><th>Nickname</th><th>Servername</th><th>Location</th><th>Private</th>"+
        "<th>Full</th><th>Players</th></tr></thead><tbody></tbody></table></div>");

    // set defaults for ajax requests -- find out if there a way to obfuscate the cleartext password here
/*    $.ajaxSetup({
        user: "vsk5-public01",
        password: "maqBzAdvFq"
        //global: false, //default is true
    });
*/
  if ($("div .vskhosts").length) {
    show_alert("Get live data via XMLHttpRequest");
    // Get live data via XMLHttpRequest
    oXHR=$.ajax({
        //dataType: "xml", // Nadeo will *not* support JSON
        type: "GET",
        url: "http://scripts.ac32.virtualskipper.com/getPlayersOnline.php",
        //url: "http://scripts.ac32.virtualskipper.com/getServersOnline.php",
        error: echoXHR(), //show_alert("error"), //errorHandler(XMLHttpRequest, textStatus, errorThrown),
        success: echoXML(), //show_alert("success"), //writeVskHosts(data),
        cache: false,
        user: "vsk5-public01",
        password: "maqBzAdvFq"
    });
    $("div .vskhosts")
    .append(
        "<div class='ajaxerror'>Error received:<br/>"+oXHR.textStatus+
        "<br/>XHR: "+oXHR.XMLHttpRequest+
        "<br/>Errorthrown: "+oXHR.errorThrown+
        "<br/>Options: "+oXHR.this+"</div>"
    );
  };  
};
$( vskHosts );

 /*
</pre>
 */
 /*
<pre>
 */
// === XML parsing methods ===

/* - - - vskonlineservers - - - 
data.getElementsByTagName("nbservers")[0];  // number of hosts currently hosting races
data.getElementsByTagName("server").length; // number of hosts currently hosting races
data.getElementsByTagName("server")[i].login;
data.getElementsByTagName("server")[i].name;
data.getElementsByTagName("server")[i].servername;
data.getElementsByTagName("server")[i].path;
data.getElementsByTagName("server")[i].isprivate;
data.getElementsByTagName("server")[i].isfull;
data.getElementsByTagName("server")[i].playercount;
*/

/* - - - ranking - - - 
data.getElementsByTagName("nbplayers")[0]; // this is the total number of players (login accounts) ever ranked
data.getElementsByTagName("player").length; // records for only the top 100 ranked players are returned
data.getElementsByTagName("player")[i].ranking;
data.getElementsByTagName("player")[i].login;
data.getElementsByTagName("player")[i].nickname;
data.getElementsByTagName("player")[i].path;
data.getElementsByTagName("player")[i].rating;
*/

/* - - - onlineplayers - - - 
data.getElementsByTagName("nbplayers")[0];  // number of players currently online
data.getElementsByTagName("player").length; // number of players currently online
data.getElementsByTagName("player")[i].login;
data.getElementsByTagName("player")[i].nickname;
*/

 /*
</pre>
 */