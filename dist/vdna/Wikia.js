(function ($, mw) {
	$(function () {
		// Only on article namespace (including main page)
		if (mw.config.get('wgNamespaceNumber') !== 0) {
			return;
		}
		// Code from VDNA - start
		setTimeout(
			function(){
				var e = function (e) {
					var t = "; " + document.cookie;
					var n = t.split("; "+e+"=");
					if (n.length == 2)
						return n.pop().split(";").shift();
				};
				var t = document.createElement("script");
				var n = document.getElementsByTagName("script")[0];
				t.src = document.location.protocol + "//embedded.visualdna.com/wikia-marvel/scripts/youni.js?" + Math.floor((new Date).getTime()/36e5);
				t.async = true;
				t.type = "text/javascript";
				n.parentNode.insertBefore(t,n);
				if (e("MarvelWikiaCampaign") !== "1") {
					var r = new Date;
					r.setTime(r.getTime()+30*24*60*60*1e3);
					var i = "expires="+r.toUTCString();
					document.cookie = "MarvelWikiaCampaign=1; " + i;
					t.onload = function () {
						VDNATalk.talk("wikia-marvel_auto")
					}
				}
			},
			1
		);
		// Code from VDNA - end

		// Add the banner image and open VDNA popup on click
		var $marvelVDNAImage = $('<div>').addClass('center').append(
					$('<a>').attr('href', '#').click(function() {
						VDNATalk.launch('marvel-wiki');
					}).append(
						$('<img>')
							.attr('src', 'https://vignette.wikia.nocookie.net/vdna/images/0/04/VDNA_Desktop_PAD_670x210.png/revision/latest?cb=20141210095310')
							.attr('alt', 'Marvel VDNA')
					)
				);

		$('#mw-content-text').prepend($marvelVDNAImage);
	});
}(jQuery, mediaWiki));