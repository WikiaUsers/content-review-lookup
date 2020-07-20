// <nowiki>

addOnloadHook(function()
{
    if(wgAction == 'edit' || wgAction == 'submit')
    {
        if(wgPageName.match(/^[^:]*talk:/i) || wgPageName.match(/^Forum:/))
    	{
    	    $('#wpSave').click(function(e)
    	    {
    	    	if(typeof enforceSign === 'undefined')
    	    	{
    	    	    enforceSign = true;
    	    	}
 	 	var text = $('#cke_wpTextbox1 iframe').contents().find('#bodyContent').text() || $('#wpTextbox1').val();
    	    	if(enforceSign && !$('#wpMinoredit').is(':checked') && !text.replace(/(<nowiki>.*?<\/nowiki>)/g, '').match('~~~') && !window.location.search.match(/(?:\?|&)undo=/))
    	        {
    	            if(!confirm('Tal parece que olvidaste firmar tu coemntario.\n¿Estás seguro de que deseas continuar?'))
    	            {
    	                e.preventDefault();
    	            }
    	    	}
    	    });
    	}
    }
});

// </nowiki>