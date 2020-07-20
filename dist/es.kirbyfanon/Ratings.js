importedScripts = {}; // object keeping track of included scripts, so a script ain't included twice
 function importScript( page ) {
     if( importedScripts[page] ) {
         return;
     }
     importedScripts[page] = true;
     var url = wgScriptPath
             + '/index.php?title='
             + encodeURIComponent( page.replace( / /g, '_' ) )
             + '&action=raw&ctype=text/javascript';
     var scriptElem = document.createElement( 'script' );
     scriptElem.setAttribute( 'src' , url );
     scriptElem.setAttribute( 'type' , 'text/javascript' );
     document.getElementsByTagName( 'head' )[0].appendChild( scriptElem );
 }
/** Wikia rating *******************************
  * By [[User:Spang|Spang]]
  * Voting system
  * Add "ratings.disabled = true" without the quotes to your JS to disable
  * **Compressed to save space/bandwidth etc. Use http://javascript.about.com/library/blformat.htm to see formatted source
  */
 
function asyncRequest(httpMethod, url, callbackFunctions, requestBody) {
	var request = sajax_init_object();
	if (request == null) {
		// Oops! We do not have XMLHttp...
		return;
	}
	request.open (httpMethod, url, true);
	request.onreadystatechange = function () {
		if (request.readyState != 4) {
			return;
		}
 
 		if (request.status == 200) {
			callbackFunctions['success'](request);
		} else {
			callbackFunctions['failure'](request);
		}
	};
 
	request.setRequestHeader('Pragma', 'cache=yes');
	request.setRequestHeader('Cache-Control', 'no-transform');
	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
	request.send(requestBody);
}
 
//<nowiki>
var ratings = new Object();
ratings.getCallback = {
	success : function(o) {
		var j = jQuery.parseJSON(o.responseText);
		try {
			with (j.query.wkvoteart[wgArticleId]) {
				if (typeof votesavg != undefined && votesavg) {
					ratings.avgVote = (5 >= votesavg >= 1 ? Math
							.round(votesavg * 10) / 10 : 5);
					ratings.text[0] = ('<span itemprop="aggregateRating" itemscope itemtype="http://schema.org/AggregateRating">Puntaje: <span itemprop="ratingCount">' + ratings.avgVote + '</span> de <span itemprop="bestRating">5</span></span>')
				}
				if (typeof (uservote) != 'undefined' && uservote) {
					ratings.myVote = uservote;
					ratings.hasVoted = true
				} else {
					ratings.hasVoted = false
				}
				ratings.paint(0)
			}
		} catch (e) {
		}
	},
	failure : function(o) {
		ratings.out('Connection failure :(')
	}
};
ratings.vote = function(a) {
	if (wgUserName == null) {
		window.location = '/wiki/Special:Userlogin?returnto=' + wgPageName;
		return
	}
	var b = (ratings.hasVoted == true ? 'update' : 'insert');
	ratings.get = asyncRequest('GET',
			'/api.php?format=json&action=' + b
					+ '&list=wkvoteart&wkuservote=1&wkctime=5&wkpage='
					+ wgArticleId + '&wkvote=' + a, ratings.voteCallback, null);
	ratings.myVote = a;
	ratings.paint(a, 'Votando...');
	ratings.votingInProgress = true
};
ratings.voteCallback = {
	success : function(o) {
		var j = jQuery.parseJSON(o.responseText);
		if (j.item.wkvoteart[3] != undefined && ratings.retried != true) {
			ratings.retried = true;
			ratings.out('Votando...');
			ratings.get = asyncRequest('GET',
					'/api.php?format=json&action=delete&list=wkvoteart&wkpage='
							+ wgArticleId, ratings.retry, null);
			return
		}
		;
		try {
			with (j.item.wkvoteart[0] == undefined ? j.item.wkvoteart
					: j.item.wkvoteart[0]) {
				ratings.hasVoted = true;
				ratings.myVote = vote;
				ratings.avgVote = Math.round(avgvote * 10) / 10;
				if (ratings.avgVote > 5)
					ratings.avgVote = 5
			}
		} catch (e) {
			ratings.out('Error: ' + e);
			ratings.votingInProgress = false;
			return
		}
		ratings.votingInProgress = false;
		ratings.out('¡Tu voto fue tomado en cuenta!');
		ratings.text[0] = ('Puntaje: ' + ratings.avgVote + ' de 5');
		ratings.timeout = setTimeout('ratings.paint(0)', 1000)
	},
	failure : function(o) {
		ratings.votingInProgress = false;
		ratings.out('Error de conexión :(')
	}
};
ratings.retry = {
	success : function(o) {
		ratings.get = asyncRequest(
						'GET',
						'/api.php?format=json&action=insert&list=wkvoteart&wkuservote=1&wkctime=5&wkpage='
								+ wgArticleId + '&wkvote=' + ratings.myVote,
						ratings.voteCallback, null)
	},
	failure : function(o) {
		ratings.out('error')
	}
};
ratings.out = function(m) {
	document.getElementById('ratingMsg').innerHTML = m
};
ratings.paint = function(n, m) {
	if (ratings.votingInProgress == true) {
		return;
	}
	document.getElementById('vote-1').style.backgroundPosition = '0 0';
	document.getElementById('vote-2').style.backgroundPosition = '0 0';
	document.getElementById('vote-3').style.backgroundPosition = '0 0';
	document.getElementById('vote-4').style.backgroundPosition = '0 0';
	document.getElementById('vote-5').style.backgroundPosition = '0 0';
	for ( var l = 1; l <= n; l++) {
		document.getElementById('vote-' + l).style.backgroundPosition = '0 -34px';
	}
	if (n === 0 && (ratings.myVote != false || ratings.avgVote != undefined)) {
		var a = ratings.hasVoted == true ? '0 -34px' : '0 -17px';
		var b = ratings.hasVoted != false ? ratings.myVote : ratings.avgVote;
		for ( var l = 1; l <= b; l++) {
			document.getElementById('vote-' + l).style.backgroundPosition = a;
		}
		if (l - ratings.avgVote < 1 && l <= 5 && ratings.hasVoted != true) {
			var p = ratings.avgVote - (l - 1);
			var q = 0;
			switch (true) {
			case 0 < p && p <= .2:
				q = '-51px';
				break;
			case .2 < p && p <= .4:
				q = '-68px';
				break;
			case .4 < p && p <= .6:
				q = '-85px';
				break;
			case .6 < p && p <= .8:
				q = '-102px';
				break;
			case .8 < p && p < 1:
				q = '-119px';
				break;
			default:
			}
			;
			document.getElementById('vote-' + l).style.backgroundPosition = '0px ' + q;
		}
	}
	;
	if (wgUserName == null && n != 0)
		ratings.out('Conéctate para calificar');
	else if (m == undefined)
		ratings.out(ratings.text[n]);
	else
		ratings.out(m)
};
ratings.setup = function() {
	if (wgIsArticle == false || ratings.disabled == true)
		return;
	if ((wgNamespaceNumber != 0 && wgNamespaceNumber != 2)
			|| (wgAction != 'view' && wgAction != 'purge'))
		return;
	var a = document.getElementById('WikiaSearch');
	if (!a)
		return false;
	$('#votacion').append('<div id="ratingBody"><div><ul id="ratingStars" onmouseout="ratings.paint(0);"><li id="vote-1" class="voteStar" onmouseover="ratings.paint(1)" onclick="ratings.vote(1);">&nbsp;1</li><li id="vote-2" class="voteStar" onmouseover="ratings.paint(2)" onclick="ratings.vote(2);"> 2</li><li id="vote-3" class="voteStar" onmouseover="ratings.paint(3)" onclick="ratings.vote(3);"> 3</li><li id="vote-4" class="voteStar" onmouseover="ratings.paint(4)" onclick="ratings.vote(4);"> 4</li><li id="vote-5" class="voteStar" onmouseover="ratings.paint(5)" onclick="ratings.vote(5);"> 5&nbsp;</li></ul></div><span id="ratingMsg">¡Vota ahora!</span></div>');

	ratings.text = new Array('¡Vota ahora!', 'Muy aburrido', 'Puede mejorar...', 'Divertido',
			'Genial', '¡Excelente!');
	ratings.get = asyncRequest(
					'GET',
					'/api.php?format=json&action=query&list=wkvoteart&wkuservote=1&wkctime=5&wkpage='
							+ wgArticleId, ratings.getCallback, null)
};
 
ratings.setup();

$(document).ready(function () {
    if(wgUserName == $('#mw-js-message').text()) {
        $('.voteStar').attr('onclick','noPodesVotarTusArticulos();');
    }
});

function noPodesVotarTusArticulos() {
        $('#ratingMsg').text('¡No puedes votar tus propios artículos!');
        $('.voteStar').removeAttr('onmouseover');
}