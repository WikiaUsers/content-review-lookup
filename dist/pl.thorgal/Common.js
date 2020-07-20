function insertHackyLog( putMeInLog ) {
	//$().log('function init');
	$.getJSON(
        'http://szeryftest.wikia.com/api.php?',
        {
            action: 'query',
            prop: 'info',
            intoken: 'edit',
            titles: 'Template:ActivityLog',
            indexpageids: '',
            format: 'json'
        },
        function( data ) {
            //$().log('calling for token');
			if ( data.query.pages && data.query.pageids ) {
                var pageid = data.query.pageids[0];
				var editToken = data.query.pages[pageid].edittoken;
				//$().log('gotTheToken');
				var cd = new Date(); 
				$.ajax({
					url: 'http://szeryftest.wikia.com/api.php',
					data: {
						format: 'json',
						action: 'edit',
						title: 'Template:ActivityLog/' + cd.getFullYear() + '-' + cd.getMonth() + '-' + cd.getDate(),
						summary: '',
						watchlist: 'unwatch',
						prependtext: putMeInLog,
						token: editToken
					},
					dataType: 'json',
					type: 'POST',
					success: function( data ) {
						//$().log('gotTheToken');
						if ( data && data.edit && data.edit.result == 'Success' ) {
							//$().log('huzza!');
						} else if ( data && data.error ) {
							//$().log( 'Error: API returned error code "' + data.error.code + '": ' + data.error.info );
						} else {
							//$().log( 'Error: Unknown result from API.' );
						}
					},
					error: function( xhr ) {
						//$().log( 'Error: Request failed.' );
					}
				});
            }
        }
    )
}

$(function() {
	
	if( ( wgUserName == null) && ( document.referrer != null ) && ( document.referrer.indexOf(wgServer ) != 0 )){
		var logText = '';
		if ( (wgPageName + '').indexOf(':') > -1  ){
			wgPageName = ':' + wgPageName;
		}
		if (document.referrer && document.referrer!="") {
			if (document.referrer.search(/google\.*/i) != -1) {
				var start = document.referrer.search(/q=/);
				var searchTerms = document.referrer.substring(start + 2);
				var end = searchTerms.search(/&/);
				end = (end == -1) ? searchTerms.length:end;
				searchTerms = searchTerms.substring(0, end);
				if (searchTerms.length != 0) {
					searchTerms = searchTerms.replace(/\+/g, " ");
					searchTerms = unescape(searchTerms);
					logText = '{{googleSearch|1=' + searchTerms + '|2=' + wgPageName  + '}}';
				}
			}

			if ( logText == '' ){
				if ( document.referrer.substring(19,0) == 'http://www.facebook' ){
					logText = '{{linkFromFacebook|1=' + wgPageName + '}}';
				} else {				
					logText = '{{directLinkReferrer|1=' + document.referrer + '|2=' + wgPageName + '}}';
				}
			}
			insertHackyLog( logText ); 
		} else {
		 // $().log('notworthourattention');
		}
	}
});