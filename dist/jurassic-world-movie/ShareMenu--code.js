$(function(){
   if(document.getElementById("VectoredShareMenu") != null){
      return;
   }
   var workingSkin = mw.config.get("skin");
   if( workingSkin === "wikia" || workingSkin === "oasis") {
   $("nav").first().append('<button id="VectoredShareMenu" class="wikia-button" style="height:2.85em; width:3.5em; padding-top: 0.1em; padding-left:0.25em;"><svg height="30" width="25"><circle cx="5" cy="15" r="5" style="fill:#000000;stroke:#000000;stroke-width:0;" /><circle cx="20" cy="5" r="5" style="fill:#000000;stroke:#000000;stroke-width:0;" /><circle cx="20" cy="25" r="5" style="fill:#000000;stroke:#000000;stroke-width:0;" /><polyline points="20,5,5,15,20,25" style="stroke:#000000;stroke-width:5; fill:none;" /></svg></button> <div style="background-color:#000000; color: #00FF00; width:16em; height:25em; overflow:scroll; display:none; position:fixed; top:2em; right:0.1em; z-index:4096; padding:0.5em;" id="PowerShareMenu"></div>'); }
   $("#p-wikicities-nav").after('<button id="VectoredShareMenu" class="wikia-button" style="height:2.85em; width:3.5em; padding-top: 0.1em; padding-left:0.25em;"><svg height="30" width="25"><circle cx="5" cy="15" r="5" style="fill:#000000;stroke:#000000;stroke-width:0;" /><circle cx="20" cy="5" r="5" style="fill:#000000;stroke:#000000;stroke-width:0;" /><circle cx="20" cy="25" r="5" style="fill:#000000;stroke:#000000;stroke-width:0;" /><polyline points="20,5,5,15,20,25" style="stroke:#000000;stroke-width:5; fill:none;" /></svg></button> <div style="background-color:#000000; color: #00FF00; width:16em; height:25em; overflow:scroll; display:none; position:fixed; top:2em; right:0.1em; z-index:4096; padding:0.5em;" id="PowerShareMenu"></div>');
   $("#top-syslinks").append('<button id="VectoredShareMenu" class="wikia-button" style="height:3.25em; width:3.5em; padding-left:0.25em;"><svg height="30" width="25"><circle cx="5" cy="15" r="5" style="fill:#000000;stroke:#000000;stroke-width:0;" /><circle cx="20" cy="5" r="5" style="fill:#000000;stroke:#000000;stroke-width:0;" /><circle cx="20" cy="25" r="5" style="fill:#000000;stroke:#000000;stroke-width:0;" /><polyline points="20,5,5,15,20,25" style="stroke:#000000;stroke-width:5;fill:none;" /></svg></button> <div style="background-color:#000000; color: #00FF00; width:28em; height:45em; overflow:scroll; display:none; position:fixed; top:6.25em; right:0.1em; z-index:4096; padding:0.5em;" id="PowerShareMenu"></div>');
 
});
 
$('#VectoredShareMenu').ready(function(){
document.getElementById("VectoredShareMenu").addEventListener("click", function(){
   var visible = document.getElementById("PowerShareMenu").style.display;
   if(visible=="none"){
document.getElementById("PowerShareMenu").style.display = "inline";
   }
   else{   document.getElementById("PowerShareMenu").style.display = "none";
   }
});
});
//