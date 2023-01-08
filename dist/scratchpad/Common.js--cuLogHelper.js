// 07:20, December 22, 2016 (UTC)
// <source lang="JavaScript">

// FOR PERSONAL USE ONLY!!

// From http://enwp.org/User:Amalthea/culoghelper.js as at 2016-12-22
// Small script to help navigate the CU log.
// Turns timestamps of a filtered CU log like on
//   [//en.wikipedia.org/wiki/Special:CheckUserLog?cuSearchType=target&cuSearch=Example]
//    into links that try to locate the entry in the full log.
// This simplifies looking at the context of a previous check.

jQuery(function($){
    if ( mw.config.get( 'wgPageName' ) == 'Special:CheckUserLog' )
	{
		mw.loader.using( ['mediawiki.util', 'moment'], function() {
			var paraCuloghighlight = mw.util.getParamValue('culogHighlight');
			var paraCusearch = mw.util.getParamValue('cuSearch');
			
			if (!paraCuloghighlight && !paraCusearch) return;
			
			//collect all date text nodes
			var dateNodes = $("#bodyContent > #mw-content-text > ul > li").map(function(i,n){return $(n).contents().first();})		
			
			//highlight all nodes with a matching date
			if (paraCuloghighlight)
			{
				dateNodes.each(function(i,n){
					if(n[0].textContent !== paraCuloghighlight) return;
					
					//highlight
					n.wrap("<span style='background-color:#FCC;'/>");
					
					//and scroll into view
					var windowtop = $(window).scrollTop();
					var windowbottom = windowtop + $(window).height();
					var ntop = n.parent().offset().top;
					var nbottom = ntop + n.parent().outerHeight(true);
					if (ntop < windowtop) $(window).scrollTop(ntop);
					else if (nbottom > windowbottom) $(window).scrollTop(nbottom + windowtop- windowbottom);
				});
			}
			
			//link all date nodes to the full log view
			if (paraCusearch)
			{
				var locale = mw.config.get("wgUserLanguage");

				// Date parsing in Javascript is aweful.
				// Localized, configurable date output on Mediawiki doesn't make this any easier.
				// It's conceivable to write a parser that could match /most/ variants out there ...
				// but I'll just strict parse the English date formats instead
				var parsingStrings = {
					"en": {
						"mdy": "HH:mm, MMMM D, YYYY",
						"dmy": "HH:mm, D MMMM YYYY",
						"ymd": "HH:mm, YYYY MMMM D",
						"ISO 8601": "YYYY-MM-DDTHH:mm:ss",
					},
				}
				var localeParsingStrings = parsingStrings[locale];
				if (localeParsingStrings)
					var parsingString = localeParsingStrings[mw.config.get("wgDefaultDateFormat")];
				if (parsingString)
					var parseDate = function(input){return moment(input, parsingString + ", ", true);}
				else
					var parseDate = moment;

				//Note: We append ", " above since the messages building the log lines, e.g. MediaWiki:Checkuser-log-entry-userips,
				//      look like this: $3, $1 got IP addresses for $2
				//      That is, they do in English! Might need adapting for other languages, or imprecise parsing, or some markup in the messages!



				//function lifted from popups.js
				function getTimeOffsetMinutes(tz)
				{
					if( tz && typeof tz === 'string' )
					{
						if( tz.indexOf('|') > -1 ) // New format
							return parseInt(tz.split('|')[1],10);
						else if ( tz.indexOf(':') > -1 ) // Old format
							return( parseInt(tz,10)*60 + parseInt(tz.split(':')[1],10) );
					}
					return 0;
				}
	
				var timeOffsetMinutes = getTimeOffsetMinutes(mw.user.options.get("timecorrection"));

				//calculate one hour into the future; this will be the upper limit of the log displayed
				timeOffsetMinutes -= 60;

				dateNodes.wrap(function(){
					
					var dateText = $(this)[0].textContent;
					var timestamp = parseDate(dateText);
					if (!timestamp.isValid()) return;
					timestamp.subtract(timeOffsetMinutes, 'minutes');
					var dateOffsetString = timestamp.format("YYYYMMDDHHmm");
					return "<a href='"+mw.config.get("wgScript")+"?title=Special:CheckUserLog&offset="+mw.util.rawurlencode(dateOffsetString)+"&culogHighlight="+mw.util.rawurlencode(dateText)+"' />";
				});
			}
		});
	}
});

// </source>