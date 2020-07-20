//<syntaxhighlight lang="javascript">
$('#PowerShareMenu').ready(function(){
$('#PowerShareMenu').append('<svg id="printIcon" style="vertical-align:top; background-color:#000000; height: 85; width: 85;"> <rect width="70" height="47" x="4" y="1" style="fill:#000000;stroke-width:3;stroke:#00FF00;" rx="5" ry="5"></rect> <rect width="50" height="16" x="15" y="32" style="fill:#000000;stroke-width:2;stroke:#00FF00;" rx="5" ry="5"></rect> <rect width="44" height="40" y="40" x="18" style="fill:#000000;stroke-width:1;stroke:#00FFFF;"></rect> <line x1="21" y1="76" x2="57" y2="76" style="stroke:#FF00FF;stroke-width:2.5;"></line> <line x1="21" y1="70" x2="57" y2="70" style="stroke:#FF00FF;stroke-width:2.5;"></line> <line x1="21" y1="64" x2="57" y2="64" style="stroke:#FF00FF;stroke-width:2.5;"></line> <line x1="21" y1="58" x2="57" y2="58" style="stroke:#FF00FF;stroke-width:2.5;"></line> <line x1="21" y1="52" x2="57" y2="52" style="stroke:#FF00FF;stroke-width:2.5;"></line> <line x1="21" y1="46" x2="57" y2="46" style="stroke:#FF00FF;stroke-width:2.5;"></line> </svg>');
$("#printIcon").click(function(){
    $('#RelatedForumDiscussion').hide();
    document.getElementById("VectoredShareMenu").style.display = "none";
    $("#WikiaBarWrapper").hide();
    $("#footer").hide();
    $("#f-list").hide();
    document.getElementById("PowerShareMenu").style.display = "none";
    javascript:window.print();
    document.getElementById("VectoredShareMenu").style.display = "inline";
    $('#RelatedForumDiscussion').show();
    document.getElementById("VectoredShareMenu").style.display = "inline";
    $("#WikiaBarWrapper").show();
    $("#footer").show();
    $("#f-list").show();
});
});
//</syntaxhighlight>