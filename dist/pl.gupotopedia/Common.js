/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */
/** Voting *******************************
 * By [[User:Spang|Spang]], ten z Uncy
 * Voting system
 * Add "ratings.disabled = true" without the quotes to your JS to disable
 */
ratings = {};
ratings.setup = function() {
	if(wgIsArticle == false || ratings.disabled == true)return;
	var a = document.getElementById('p-search');
	if(!a)return false;
	ratings.p = document.createElement('div');
	ratings.p.innerHTML = '<h5>ocenianie</h5><div id="ratingBody" class="pBody"><div><ul id="ratingStars" onmouseout="ratings.paint(0);"><li id="vote-1" class="voteStar" onmouseover="ratings.paint(1)" onclick="ratings.vote(1);">&nbsp;1</li><li id="vote-2" class="voteStar" onmouseover="ratings.paint(2)" onclick="ratings.vote(2);"> 2</li><li id="vote-3" class="voteStar" onmouseover="ratings.paint(3)" onclick="ratings.vote(3);"> 3</li><li id="vote-4" class="voteStar" onmouseover="ratings.paint(4)" onclick="ratings.vote(4);"> 4</li><li id="vote-5" class="voteStar" onmouseover="ratings.paint(5)" onclick="ratings.vote(5);"> 5&nbsp;</li></ul></div><span id="ratingMsg">oceń ten pomysł!</span></div>';
	ratings.p.className = 'portlet';
	ratings.p.id = 'p-rating';
	document.getElementById('column-one').insertBefore(ratings.p, a);
	ratings.text = new Array('oceń ten pomysł!', 'fatalny', 'nic specjalnego', 'nie jest tak źle', 'całkiem, całkiem', 'genialne!');
	ratings.get = YAHOO.util.Connect.asyncRequest('GET', '/api.php?format=json&action=query&list=wkvoteart&wkctime=5&wkpage=' + wgArticleId, ratings.getCallback, null)};

ratings.getCallback = {
	success : function(o) {
		var j = YAHOO.tools.JSONParse(o.responseText);
		try {
			with(j.query.wkvoteart[wgArticleId]) {
				if(typeof votesavg != undefined && votesavg) {
					ratings.avgVote = (5 >= votesavg >= 1 ? Math.round(votesavg * 10) / 10 : 5);
					ratings.text[0] = ('średnia: ' + ratings.avgVote)
				}
/* Not currently working :<
					if(typeof(uservote) != 'undefined' && uservote) {
					ratings.myVote = uservote;
					ratings.hasVoted = true
				} else { 
					ratings.hasVoted = false
				}
*/
				ratings.hasVoted = false;
				ratings.paint(0)
			}
		}
		catch(e) {
		}
	},
	failure : function(o) {
		ratings.out('connection failure :(')
	}
};  

ratings.vote = function(a) {
	if(wgUserName == null) {
		window.location = '/wiki/Special:Userlogin?returnto=' + wgPageName;
		return}
	var b = (ratings.hasVoted == true ? 'update':'insert');
	if (ratings.hasVoted) {
		ratings.get = YAHOO.util.Connect.asyncRequest('GET', '/api.php?format=json&action=delete&list=wkvoteart&wkpage=' + wgArticleId, ratings.vote(a), null);
	}
	ratings.get = YAHOO.util.Connect.asyncRequest('GET', '/api.php?format=json&action=' + b + '&list=wkvoteart&wkuservote=1&wkctime=5&wkpage=' + wgArticleId + '&wkvote=' + a, ratings.voteCallback, null);
	ratings.myVote = a;
	ratings.paint(a, 'zapisywanie oceny...');
	ratings.votingInProgress = true};
ratings.voteCallback = {
	success : function(o) {
		var j = YAHOO.tools.JSONParse(o.responseText);
		if(j.item.wkvoteart[3] != undefined && ratings.retried != true) {
			ratings.retried = true;
			ratings.out('kuźwa, nie udało się. Od nowa...');
			ratings.get = YAHOO.util.Connect.asyncRequest('GET', '/api.php?format=json&action=delete&list=wkvoteart&wkpage=' + wgArticleId, ratings.retry, null);
			return};
		try {
			with(j.item.wkvoteart[0] == undefined ? j.item.wkvoteart : j.item.wkvoteart[0]) {
				ratings.hasVoted = true;
				ratings.myVote = vote;
				ratings.avgVote = Math.round(avgvote * 10) / 10;
				if(ratings.avgVote > 5)ratings.avgVote = 5}
		}
		catch(e) {
			ratings.out('Error: ' + e);
			ratings.votingInProgress = false;
			return}
		ratings.votingInProgress = false;
		ratings.out('dzięki za głos!');
		ratings.text[0] = ('średnia: ' + ratings.avgVote);
		ratings.timeout = setTimeout('ratings.paint(0)', 1000)}
	, failure : function(o) {
		ratings.votingInProgress = false;
		ratings.out('connection failure :(')}
};

ratings.retry = {
	success : function(o) {
		ratings.get = YAHOO.util.Connect.asyncRequest('GET', '/api.php?format=json&action=insert&list=wkvoteart&wkuservote=1&wkctime=5&wkpage=' + wgArticleId + '&wkvote=' + ratings.myVote, ratings.voteCallback, null)}
	, failure : function(o) {
		ratings.out('error')}
};

ratings.out = function(m) {
	document.getElementById('ratingMsg').innerHTML = m};
ratings.paint = function(n, m) {
	if(ratings.votingInProgress == true)return;
	YAHOO.util.Dom.setStyle(['vote-1', 'vote-2', 'vote-3', 'vote-4', 'vote-5'], 'backgroundPosition', '0 0');
	for(var l = 1; l <= n; l++) {
		YAHOO.util.Dom.setStyle('vote-' + l, 'backgroundPosition', '0 -34px')}
	if(n === 0 && (ratings.myVote != false || ratings.avgVote != undefined)) {
		var a = ratings.hasVoted == true ? '0 -34px':'0 -17px';
		var b = ratings.hasVoted != false ? ratings.myVote : ratings.avgVote;
		for(var l = 1; l <= b; l++) {
			YAHOO.util.Dom.setStyle('vote-' + l, 'backgroundPosition', a)}
		if(l - ratings.avgVote < 1 && l <= 5 && ratings.hasVoted != true) {
			var p = ratings.avgVote - (l - 1);
			var q = 0;
			switch(true) {
			case 0 < p && p <= .2 : q = '-51px';
				break;
				case.2 < p && p <= .4 : q = '-68px';
				break;
				case.4 < p && p <= .6 : q = '-85px';
				break;
				case.6 < p && p <= .8 : q = '-102px';
				break;
				case.8 < p && p < 1 : q = '-119px';
				break;
				default : };
			document.getElementById('vote-' + l).style.backgroundPosition = '0px ' + q}
	};
	if(wgUserName == null && n != 0)ratings.out('zaloguj się, by ocenić');
	else if(m == undefined)ratings.out(ratings.text[n]);
	else ratings.out(m)};

YAHOO.util.Event.onContentReady('column-one', ratings.setup);

function share_it() {

    var adres = wgServer +'/wiki/' + wgPageName;
    var napisX = Math.round(screen.width/1280 * 160); // Odpowiedni rozmiar
    var napisY = Math.round(screen.width/1280 * 33);
    var ikonki = Math.round(screen.width/1280 * 20);
    if (ikonki > 20) {
        ikonki = 20; //Nie lubimy rozpikselowania
    }
    if (napisX > 160) {
        napisX = 160; //Nie lubimy rozpikselowania
    }
    if (napisY > 33) {
        napisY = 33; //Nie lubimy rozpikselowania
    }

    var echo '<div name="share_it" style="z-index: 300000; position: fixed; right: 2px; top: 130px; float: right;">';
       echo += '<img width=' + napisX +' height=' + napisY + ' src="https://images.wikia.nocookie.net/__cb20100811133310/nonsensopedia/images/e/eb/PodzielSie.png" />';// napis "podziel się"
       echo += '<a target="_blank" href="http://www.facebook.pl/share.php?u=' + adres + '&amp;t=' + 'Z Nonsensopedii, polskiej encyklopedii humoru' + '"><img title="Udostępnij to na Facebooku!" class="fb_share" width=' + ikonki +' height=' + ikonki +' src="https://images.wikia.nocookie.net/__cb20100804204142/nonsensopedia/images/6/64/Icon_facebook.png" /></a>'; // fejsbook
       echo += '<a target="_blank" title="Udostępnij to na GG (opis, od wersji 8 w górę)!" class="gg_share" href="gg:/set_status?description=' + adres + '"><img src="https://images.wikia.nocookie.net/__cb20100805075707/nonsensopedia/images/a/a8/Logo_gg_share.png" width=' + ikonki +' height=' + ikonki +' /></a>'; //GG - zmiana opisu
       echo += '<a title="Wykop to!" target="_blank" class="wykop_to" href="http://www.wykop.pl/dodaj?url=' + adres + '&title=' + wgPageName + '&desc=Z Nonsensopedii, polskiej encyklopedii humoru"><img src="https://images.wikia.nocookie.net/__cb20100805120046/nonsensopedia/images/4/46/Logo_wykop_share.png" width=' + ikonki +' height=' + ikonki +' /></a>';    
       echo += '<a target="_blank" title="Udostępnij to na śledziku!" class="nk_share" href="http://nasza-klasa.pl/sledzik?shout=' + adres + '"><img src="https://images.wikia.nocookie.net/__cb20100811134621/nonsensopedia/images/b/b4/Nk.png" width=' + ikonki +' height=' + ikonki +' /></a></div>'; //sledzik na nk - zmiana opisu
    document.getElementById('siteNotice').innerHTML = editnote + document.getElementById('siteNotice').innerHTML;
    if (cookieValue == siteNoticeID) {
            document.getElementById('siteNotice').innerHTML = document.getElementById('siteNotice').innerHTML + '<br />';
     }
}
addOnloadHook(share_it);
end;