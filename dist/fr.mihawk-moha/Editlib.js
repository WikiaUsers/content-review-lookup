/*
	Description : lib permettant d'éditer facilement une page
	Dernière modification : 20 février 2015
	Source : [[Utilisateur:Gratus/PaStec real.js]]
	Adapté par 0x010C
*/

function editlib_addTop(page, text, comment) {
	editlib_editPage(page, "<", text, comment);
}
function editlib_addBottom(page, text, comment) {
	editlib_editPage(page, ">", text, comment);
}
function editlib_replace(page, text, comment) {
	editlib_editPage(page, "*", text, comment);
}

/* Les fonctions qui suivent ne doivent pas être utilisés directement */
var editcount = 0;

function editlib_editPage(page, pattern, replace, comment) {
	var chaine  = "#REDIRECT";
	var chaine2 = "{{Nobots}}";
	var chaine3 = "{{nobots}}";
	new mw.Api().get({
		action:'query',
		format:'json',
		titles:page,
		prop:'revisions',
		rvprop:'content'
	}).then(function(data) {
		for (var pageid in data.query.pages) break;
		contenu = data.query.pages[pageid].revisions[0]['*'];
		contient = contenu.indexOf(chaine) !== -1;
		contient_bis = contenu.indexOf(chaine2) !== -1;
		contient_bis_2 = contenu.indexOf(chaine3) !== -1;
		if (contient) {
			alert("La page suivante est une redirection : " + page);
		} else if (contient_bis) {
				alert("La page suivante n'accepte pas les modifications par les robots : " + page);
		} else if (contient_bis_2) {
				alert("La page suivante n'accepte pas les modifications par les robots : " + page);
		} else {
				editlib_editPagego(page, pattern, replace, comment);
		}
	});
}
 
function editlib_editPagego(page, pattern, replace, comment) {
	var request = mw.config.get( 'wgServer' ) + mw.config.get( 'wgScriptPath' ) + '/api.php?format=xml&action=query' +
		'&prop=revisions|info&intoken=edit&rvprop=timestamp|content&titles=' + encodeURIComponent(page);
	editlib_ajax.http({retry:3, url: request, onSuccess: editlib_doEditPage, onFailure: editlib_failure_alert,
		page: page, comment: comment, pattern: pattern, replace: replace});
}
 
function editlib_doEditPage(xmlreq, data) {
	//data.page     //page to edit
	//data.comment  //modification comment
	//data.pattern  //search pattern
	//   for pattern
	//      "*" replaces the page content with data.replace
	//      "<" adds data.replace to the beginning of the page
	//      ">" adds data.replace to the end of the page
	//data.replace  //replacing string
	try {
		var page = xmlreq.responseXML.getElementsByTagName('page')[0];
		var token = page.getAttribute('edittoken');
		var lrev = page.getElementsByTagName('rev');
		var oldtext = "", basetimestamp = "";
		if (lrev.length > 0) {
			oldtext = lrev[0].textContent;
			if(oldtext === undefined || oldtext == "undefined")
			{
				mw.notify("La récupération de la liste des modifications douteuses a échoué, rechargez cette page et réessayez ;)");
				return;
			}
			basetimestamp = '&basetimestamp=' + encodeURIComponent(lrev[0].getAttribute('timestamp'));
		}
 
		var newtext;
		if      (data.pattern == "*")  newtext = data.replace;
		else if (data.pattern == ">")  newtext = oldtext + data.replace;
		else if (data.pattern == "<")  newtext = data.replace + oldtext;
		else {
			newtext = oldtext.replace(data.pattern, data.replace);
			if (oldtext == newtext) {
				alert('replace failed in : ' + data.page);
				return; // replace failed
			}
		}
 
		//document.getElementById('talkpageheader').innerHTML+="<br>"+token+"<br>";
 
		var requestEditData = 'title=' + encodeURIComponent(data.page) +
		                      '&text=' + encodeURIComponent(newtext) +
		                      '&token=' + encodeURIComponent(token) +
		                      '&summary=' + encodeURIComponent(data.comment) +
		                      '&starttimestamp=' + encodeURIComponent(page.getAttribute('starttimestamp')) +
		                      '&minor=1' +
		                      '&watchlist=nochange' + basetimestamp;
		var headers = [];
		headers['Content-Type'] = 'application/x-www-form-urlencoded';
		editlib_ajax.http({retry: 3, url: mw.config.get( 'wgServer' ) + mw.config.get( 'wgScriptPath' ) + '/api.php?format=xml&action=edit&nocreate=1',
			method: "POST", headers: headers, data: requestEditData,
			onFailure: editlib_failure_alert, onSuccess: editlib_confirm_executed});
	} catch (error) {
		alert(error + " : " + data.page );
	}
}
 
function editlib_failure_alert(xmlreq, data) {
	alert('failure on url: ' + data.page);
}
 
function editlib_confirm_executed(xmlreq, data) {
	//check that the API did not returned errors :
	var error = xmlreq.responseXML.getElementsByTagName('error')[0];
	if( error ){
		if( data.retry ){
			data.retry--;
			editlib_ajax.http(data);
			document.title = "§"+document.title;
		} else {
			alert("Erreur API : " + error.getAttribute('info'));
		}
	}
	else
		editcount++;
}

 
var editlib_ajax = {
	http: function(bundle) {
		// mandatory: bundle.url
		// optional:  bundle.async
		// optional:  bundle.method
		// optional:  bundle.headers
		// optional:  bundle.data
		// optional:  bundle.onSuccess (xmlhttprequest, bundle)
		// optional:  bundle.onFailure (xmlhttprequest, bundle)
		// optional:  bundle.otherStuff OK too, passed to onSuccess and onFailure
		// optional:  bundle.retry //Argos42
		var xmlhttp;
		try {
			xmlhttp = new XMLHttpRequest();
		} catch(e) {
			try {
				xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
			} catch (e) {
				try {
					xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
				} catch (e) {
					xmlhttp = false;
				}
			}
		}
 
		if (xmlhttp) {
			xmlhttp.onreadystatechange = function() {
				if (xmlhttp.readyState == 4) {
					editlib_ajax.httpComplete(xmlhttp,bundle);
				}
			};
			xmlhttp.open(bundle.method ? bundle.method : "GET",bundle.url,bundle.async === false ? false : true);
			if (bundle.headers) {
				for (var field in bundle.headers) {
					try {
						xmlhttp.setRequestHeader(field,bundle.headers[field]);
					} catch(err) {
					}
				}
			}
			xmlhttp.send(bundle.data ? bundle.data : null);
		}
		return xmlhttp;
	},
    httpComplete: function(xmlhttp, bundle) {
		if (xmlhttp.status == 200 || xmlhttp.status == 302) {
			if (bundle.onSuccess)
				bundle.onSuccess(xmlhttp, bundle);
		} else if (bundle.onFailure) {
			if (bundle.retry) {
				bundle.retry--;
				editlib_ajax.http(bundle);
				document.title = "§"+document.title;
			} else {
				bundle.onFailure(xmlhttp, bundle);
			}
		}
	}
};