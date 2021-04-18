var apiEndpoint = "https://symphogear-xdu-english.fandom.com/api.php";
var params;

switch (mw.config.get('wgPageName'))
{
	case 'Test':
		
        
        //params = "action=parse&format=json&text=" + "[[File:No_2660.png]] + &contentmodel=wikitext;
        params = "action=query&format=json&list=categorymembers&cmtitle=Category:Character&cmlimit=500";
       
    	fetch(apiEndpoint + "?" + params).then(function(response){return response.json();}).then(function(response)
    	{
       		var resultsArray = new Array(response.query.categorymembers.length)
       		
       		for (var i = 0; i < resultsArray.length; i++)
       		{
       			resultsArray[i] = response.query.categorymembers[i].title;
       		}
       		
            document.getElementById("test").innerHTML = resultsArray;
            
            mw.loader.using( 'mw.Api' ).then( function () {
		       var api = new mw.Api();
				api.get( {
				    action: 'expandtemplates',
				    text: '{{#invoke:Test|main|CharacterList=' + resultsArray + '|effect=Poison}}'
				} ).done ( function ( data ) {
				    document.getElementById("test").innerHTML += data.expandtemplates['*'];
				} );
		    });
       });
       
       break;
}