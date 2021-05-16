if(mw.config.get('wgNamespaceNumber') > 0 && 
		(   mw.config.get('wgAction') === 'edit' 
		 || mw.config.get('wgAction') === 'submit')){
	var ssubst = (typeof ssubst == 'undefined'||ssubst)? 'subst:' : '';
	var max_history_entries = 
		(typeof max_history_entries != 'number' 
		 || max_history_entries > 36 
		 || max_history_entries < 1) ? 36 : max_history_entries;
	var display_used = (display_used!=0 && display_used!=1) ? 1 : display_used;
	var max_nofe = 500; // number of fetched edits


	function is_elem_of_arr(elem, arr){
		for(var i=0;i<arr.length;++i){
			if(arr[i] == elem)
				return 1;
		}
		return 0;
	}

	function get_all_sig_dates_from_textarea(){
		var sigs = new Array();
		if(document.editform){
			var txtarea = document.editform.wpTextbox1.value;
			// localizable strings start
			if(mw.config.get('wgContentLanguage') == 'de')
				sigs = txtarea.match(/\d?\d[:.]\d\d, \d?\d\. (?:jan|feb|mär|apr|mai|jun|jul|aug|sep|okt|nov|dez)\.? 2\d{3}(?: \(UTC\))?|2\d{3}-\d\d-\d\d[T ]?\d\d:\d\d(?:Z|[-+]\d\d:\d\d)?/gi);
			else
				sigs = txtarea.match(/\d?\d[:.]\d\d, \d?\d (?:january|february|march|april|may|june|july|august|september|october|november|december) 2\d{3}(?: \(UTC\))?|2\d{3}-\d\d-\d\d[T ]?\d\d:\d\d(?:Z|[-+]\d\d:\d\d)?/gi);
			// localizable strings end
		}
		return(sigs == null)? new Array() : sigs;
	}

	function sig2ms(sigs){
		var sigs_ms = new Array();
		var months = new Object();
		var re_normal;
		// localizable strings start
		if(mw.config.get('wgContentLanguage') == 'de'){
			months["jan"] = 1;
			months["feb"] = 2;
			months["mär"] = 3;
			months["apr"] = 4;
			months["mai"] = 5;
			months["jun"] = 6;
			months["jul"] = 7;
			months["aug"] = 8;
			months["sep"] = 9;
			months["okt"] = 10;
			months["nov"] = 11;
			months["dez"] = 12;
			re_normal = /(\d?\d)[:.](\d\d), (\d?\d)\. (jan|feb|mär|apr|mai|jun|jul|aug|sep|okt|nov|dez)\.? (2\d{3})((?: \(UTC\))?)/i;
		}else{
			months["january"] = 1;
			months["february"] = 2;
			months["march"] = 3;
			months["april"] = 4;
			months["may"] = 5;
			months["june"] = 6;
			months["july"] = 7;
			months["august"] = 8;
			months["september"] = 9;
			months["october"] = 10;
			months["november"] = 11;
			months["december"] = 12;
			re_normal = /(\d?\d)[:.](\d\d), (\d?\d) (january|february|march|april|may|june|july|august|september|october|november|december) (2\d{3})((?: \(UTC\))?)/i;
		}
		// localizable strings end
		var re_iso = /(2\d{3})-(\d\d)-(\d\d)[T ]?(\d\d):(\d\d)((?:Z|[-+]\d\d:\d\d)?)/;
		var year, month, day, h, min, date_obj, offset;
		for(var i=0;i<sigs.length;++i){
			if(re_normal.exec(sigs[i])){
				h = RegExp.$1;
				min = RegExp.$2;
				day = RegExp.$3;
				month = RegExp.$4;
				month = months[month.toLowerCase()];
				year = RegExp.$5;
				offset = RegExp.$6;
				offset = (offset == ' (UTC)') ? 0 : '?';
			}else if(re_iso.exec(sigs[i])){
				year = RegExp.$1;
				month = RegExp.$2;
				day = RegExp.$3;
				h = RegExp.$4;
				min = RegExp.$5;
				offset = RegExp.$6;
				offset = (offset == 'Z') ? 0 : 
					((offset == '') ? '?': 
					((offset.substr(0,1) == '-') ? -1 : 1
					) * ((1 * offset.substr(1,2)) + (offset.substr(4,2) / 60)));
			}
			date_obj = new Date(year, month-1, day, h, min, 0);
			if(offset == '?'){
				sigs_ms.push(date_obj.getTime() - 1*60*60*1000);
				sigs_ms.push(date_obj.getTime() - 2*60*60*1000);
			}else
				sigs_ms.push(date_obj.getTime() - offset*60*60*1000);
		}
		return sigs_ms;
	}

	function timestamp2ms(t){
		var year = t.substring(0, 4);
		var month = t.substring(4, 6);
		var day = (t.substring(6, 8) - 0);
		var hours = parseInt(t.substring(8, 10), 10);
		var min = parseInt(t.substring(10, 12), 10);
		ms = new Date(year, month-1, day, hours, min, 0).getTime();
		return ms;
	}

	function addSigWikiCode(){
		// localizable strings start
		var lsMonth_names = ["January ", "February ", "March ", "April ", "May ", 
				"June ", "July ", "August ", "September ", "October ", "November ", 
				"December "],
		lsConflict = "Edit conflict.",
		lsDialog1 = "Please select an edit below or type '>' for older edits:\n\n",
		lsDialog2 = "Unsigned edit number:",
		lsInvalid1 = "Please enter a valid number or cancel this operation.",
		lsNoRev = "No revisions found. Does the page exist?",
		lsNoXMLHTTP = "Couldn't get XMLHTTP!",
		lsMinor = "m ";
		if(mw.config.get('wgContentLanguage') == 'de'){
			lsMonth_names = ["Jan. ", "Feb. ", "Mär. ", "Apr. ", "Mai ", "Jun. ", "Jul. ",
				"Aug. ", "Sep. ", "Okt. ", "Nov. ", "Dez. "];
		}
		if(mw.config.get('wgUserLanguage') == 'de'){
			lsConflict = "Bearbeitungskonflikt.",
			lsDialog1 = "Bitte wähle einen Edit oder tippe '>' für ältere Edits:\n\n",
			lsDialog2 = "Nicht signierte Bearbeitungsnummer:",
			lsInvalid1 = "Bitte eine gültige Zahl eintragen oder diese Operation abbrechen.",
			lsNoRev = "Keine Veränderung gefunden. Besteht die Seite?",
			lsMinor = "K ";
		}
		// localizable strings end

		// try to use native XMLHTTP
		var xmlhttp = window.XMLHttpRequest ? new XMLHttpRequest() : false;
		if(!xmlhttp && window.ActiveXObject){ // ActiveX XMLHTTP
			xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
			if(!xmlhttp) 
				xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}

		if(!xmlhttp) 
			return alert(lsNoXMLHTTP); // No XMLHTTP
		// get timestamp, user, summary of last x edits
		xmlhttp.open("GET", mw.config.get('wgScriptPath') + 
				"/api.php?format=xml&action=query&prop=revisions&rvlimit=" + max_nofe + 
				"&rvcomments&titles=" + encodeURIComponent(mw.config.get('wgPageName')));
		var history_offset = 0;
		xmlhttp.onreadystatechange = function(){
			if(xmlhttp.readyState!=4) 
				return;
			if(!xmlhttp) 
				return alert("Error: " + lsNoXMLHTTP + "\n" + xmlhttp.status + ": " + 
						xmlhttp.statusText); // no XMLHTTP
			var xmldoc = xmlhttp.responseXML;
			// IE workaround suggested by [[User:Olliminatore]]
			// !FIXME: IE6 can't read XML???
			if(!xmldoc.documentElement && window.ActiveXObject){
				document.body.style.backgroundColor = "#CCCCFF"; // debugging aid
				xmldoc = new ActiveXObject("Microsoft.XMLDOM");
				xmldoc.async = false;
				xmldoc.loadXML(xmlhttp.responseText);
			}
			// get the revisions
			var revisions = xmldoc.documentElement.getElementsByTagName("rev");
			if(revisions.length < 1) 
				return alert(lsNoRev); // no revisions
			// get rid of non-numeric characters in timestamp
			var t = revisions[0].getAttribute("timestamp").replace(/[^0-9]/g, "");
			// detect an edit conflict
			if(t != document.editform.wpEdittime.value) 
				return alert(lsConflict);
			var dialog_text;
			var edit_data = [];
			var minor;
			var is_used;
			var nos2n; // mapping of number of signatures -> number of all entries
			var sigdates = sig2ms(get_all_sig_dates_from_textarea());
			var update_dialog_text = 1;
			while(true){
				if(update_dialog_text){
					update_dialog_text = 0;
					dialog_text = lsDialog1;
					nos2n = [];
					// extract edit data and build dialog text
					for(var n=history_offset; n<revisions.length; ++n){
						minor = (revisions[n].getAttribute("minor") != null)? lsMinor : "";
						edit_data[n] = {
							timestamp: revisions[n].getAttribute("timestamp").replace(/[^0-9]/g, ""),
							user: revisions[n].getAttribute("user"),
							comment: revisions[n].getAttribute("comment")
						};
						is_used = 
							(is_elem_of_arr(timestamp2ms(edit_data[n].timestamp), sigdates)) ? 
							'(used) ' : '';
						if(is_used == '' || display_used == 1){
							nos2n.push(n);
							dialog_text += ("[" + 
									(nos2n.length-1).toString(max_history_entries).toUpperCase() + 
									"] " + 
									edit_data[n].timestamp.replace(
										/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/g, 
										"$1-$2-$3 $4:$5:$6"
									) + 
									" " + is_used + edit_data[n].user + ": " + minor + 
									((edit_data[n].comment == null) ? "–" : 
									 edit_data[n].comment)
								).substring(0, 80) + "\n";
						}
						if(nos2n.length == max_history_entries) 
							break;
					}
				}
				var unsigned_edit_choice = null;
				if(edit_data.length == 1) 
					unsigned_edit_choice = 0; // no choice
				else // if(is_gecko) // for Mozilla, def in wikibits.js
					unsigned_edit_choice = prompt(dialog_text + "\n" + lsDialog2, "0");
				//else{ // for IE or other
				//	alert(dialog_text);
				//	var unsigned_edit_choice = prompt(lsDialog2, "0");
				//}
				if(unsigned_edit_choice == null){
					return; // Cancel button
				}else if(unsigned_edit_choice == '>'){
					history_offset = Math.min(revisions.length-1, nos2n[nos2n.length-1]);
					update_dialog_text = 1;
					continue;
				}else if(unsigned_edit_choice == '<'){
					// actually that's not correct, but it should be sufficient
					history_offset = Math.max(0, history_offset-max_history_entries);
					update_dialog_text = 1;
					continue;
				}else if(isNaN(unsigned_edit_choice = 
							parseInt(unsigned_edit_choice, max_history_entries))){
					return alert(lsInvalid1); // non-numeric input
				}	else{
					var unsigned_edit = edit_data[nos2n[unsigned_edit_choice]];
				}
				t = unsigned_edit.timestamp; // So the full name doesn't have to be used

				var year = t.substring(0, 4);
				var month = t.substring(4, 6);
				var day = (t.substring(6, 8) - 0);
				var hours = parseInt(t.substring(8, 10), 10);
				// localizable strings start
				if(mw.config.get('wgContentLanguage') == 'de'){
					nd = new Date(year, month-1, day, hours);
					year = nd.getFullYear();
					month = 1+nd.getMonth();
					day = nd.getDate();
					hours = nd.getHours();
					day = ''+day+'.';
				}
				if(hours < 10) 
					hours = '0' + hours;
				// format and insert the tag
				$( '#wpTextbox1' ).textSelection('encapsulateSelection',
						{pre:"{"+"{"+ssubst+"Unsigniert|" + unsigned_edit.user + "|" + hours + ":" + 
						t.substring(10, 12) + ", " + day + " " + lsMonth_names[month - 1] + 
						year + " (UTC)}}"});

				return;
			}
		};
		xmlhttp.send(null);
	};

	jQuery( 
		function() {
			mw.loader.using( [ "mediawiki.util", "jquery.textSelection" ],
				function() {
					var unsigned_title   = 'Unsigned';
					var unsigned_tooltip = 'add a missing signature';
					if(mw.config.get('wgUserLanguage') == 'de'){
						unsigned_title = 'Unsigniert';
						unsigned_tooltip = 'Trage eine fehlende Signatur nach.';
					}
					if(!mw.config.get('wgIsArticle')){
						var portletLink = mw.util.addPortletLink(
							'p-cactions', 
							"#", 
							/* localizable strings start */ 
							unsigned_title, 
							"ca-unsigned", 
							unsigned_tooltip, "" 
							/* localizable strings end */
						);
						$( portletLink ).click( function ( e ) {
							e.preventDefault();
							addSigWikiCode();
						} );
					}
				}
			);
		} 
	);
}