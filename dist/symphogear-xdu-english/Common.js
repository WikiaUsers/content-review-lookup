var apiEndpoint = "https://symphogear-xdu-english.fandom.com/api.php";
var params;

if (mw.config.get('wgNamespace') == "Category")
{
	var element = document.getElementById("card-category-listing");
	
	if (element != null)
	{
		var listing = "{{#tag:gallery\n|no_{{No. 2660|Get|card_no}}.png{{!}}{{CharLink|No. 2660|hidecharname=y}}{{No. 2660|Get|base_rarity}}★){{!}}link=No. 2660\n|hideaddbutton=true|widths=200px|captioncolor=white|position=left|spacing=small|bordersize=none|captionalign=center}}";
		params = "action=parse&format=json&text=" + listing;
        fetch(apiEndpoint + "?" + params + "&contentmodel=wikitext")
            .then(function(response){return response.json();})
            .then(function(response) {
            document.getElementById("card-category-listing").innerHTML = response.parse.text["*"];
        });
	}
}

switch (mw.config.get('wgPageName'))
{
    case 'Characters':
       
       params = "action=parse&format=json&text=" + "[[File:No_2660.png]]";
       fetch(apiEndpoint + "?" + params + "&contentmodel=wikitext")
            .then(function(response){return response.json();})
            .then(function(response) {
            document.getElementById("test").innerHTML = response.parse.text["*"];
       });
       break;
}