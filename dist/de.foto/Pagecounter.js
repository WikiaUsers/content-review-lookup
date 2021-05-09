 // ============================================================
 // BEGIN pageview counter
 // 	Please talk to User:LeonWeber before changing anything or 
 // 	if there are any issues with that.
 
 // this should be adjusted to a good value.
 // BE CAREFULL, you will break hemlock if it's too low!
 // And then DaB. will kill Leon :-(
 var disable_counter = 0;
 var counter_factor = 500; 
 
 function pgcounter_setup()
 {
 	if(disable_counter == 0)
 	{
 		var url = window.location.href;
 		if(Math.floor(Math.random()*counter_factor)==42)  // the probability thing
  		{
  			if(wgIsArticle==true || wgArticleId==0) // do not count history pages etc.
 			{
 				var pgcountNs = wgCanonicalNamespace;
 				if(wgCanonicalNamespace=="")
 				{
 					pgcountNs = "0";
 				}
  				var cnt_url = "http://pgcount.wikimedia.de/index.png?ns=" + pgcountNs + "&title=" + encodeURI(wgTitle) + "&factor=" + counter_factor + "&wiki=dewiki";
 				var img = new Image(); 
 				img.src = cnt_url;
 			}
 		}
 	}
 }
 // Do not use aOnloadFunctions[aOnloadFunctions.length] = pgcounter_setup;, some browsers don't like that.
 pgcounter_setup();
 
 // END pageview counter 
 // ============================================================