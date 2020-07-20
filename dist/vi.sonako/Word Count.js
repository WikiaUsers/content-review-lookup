//<nowiki>
// Original: https://en.wikipedia.org/wiki/User:Caorongjin/wordcount
// Modified for Wikia by Dai ca superman.
// This code is based on https://en.wikipedia.org/wiki/User:Dr_pda/prosesize.js
// but adds CJK support (http://stackoverflow.com/questions/2315488) and support
// for references and other lists.
//
function getWordCount(html) {
	var str = html.innerHTML.replace(/(<([^>]+)>)/ig,"").trim();

	var wordCount = 0;

	var arr = str.match(/[\u3040-\u309F]|[\u30A0-\u30FF]|[\u4E00-\u9FFF\uF900-\uFAFF\u3400-\u4DBF]|\S+/g);

	if (arr) {
		wordCount = arr.length;
	}

	return wordCount;
}

function getContentDiv() {
	var contentDiv;
	contentDiv = document.getElementById('mw-content-text');
	return contentDiv;
}

function isValidListNode(node) {
	if (node.parentElement.id == "word-count-stats") {
		return false;
	}

	if (node.className.indexOf("toclevel-") > -1 || 
		node.parentElement.parentElement.id == "toc") {

		return false;
	}

	if (node.parentElement.parentElement.parentElement.className == "catlinks") {
		return false;
	}

	var WikiaArticle = getContentDiv();
	var curNode = node.parentElement.parentElement;

	while (curNode && (curNode != WikiaArticle)) {
		if (curNode.className.indexOf("infobox") > -1) {
			return false;
		}
		else if (curNode.className.indexOf("metadata") > -1) {
			return false;
		}
		else if (curNode.className.indexOf("navbox") > -1) {
			return false;
		}
		else {
			curNode = curNode.parentElement;
		}
	}

	return true;
}

function isValidReferenceNode(node) {
	var WikiaArticle = getContentDiv();
	var curNode = node.parentElement;

	while (curNode && (curNode != WikiaArticle)) {
		if (curNode.classList.contains("references") ||
			curNode.classList.contains("reflist") ||
			curNode.classList.contains("refbegin")) {

			return true;
		}

		curNode = curNode.parentElement;
	}

	return false;
}

function toggleWordCount() {

	var WikiaArticle = getContentDiv();

	var output = document.getElementById("word-count-stats");

	if (output) {
		var oldStyle = output.className;

		var i = 0;

		// Cleanup background color
		var pList = WikiaArticle.getElementsByTagName("p");

		if (pList) {
			for (i=0; i < pList.length; i++){
					pList[i].style.cssText = oldStyle;
			}
		}

		var listTypes = ["li", "dd"];
	
		for (var j = 0; j < listTypes.length; j++) {
			var liList = WikiaArticle.getElementsByTagName(listTypes[j]);

			if (liList) {
				for (i=0; i < liList.length; i++) {
					liList[i].style.cssText = oldStyle;
				}
			}
		}

		var hList = WikiaArticle.getElementsByClassName("mw-headline");

		if (hList) {
			for (i=0; i < hList.length; i++) {
				hList[i].style.cssText = oldStyle;
			}
		}

		// Remove nodes
		output.parentNode.removeChild(output);

		var header = document.getElementById("word-count-header");

		header.parentNode.removeChild(header);
	}
	else {
		getStatistics(WikiaArticle);
	}
}

//
// Main counting function
//
function getStatistics(WikiaArticle) {

	// Statistics
	var output = document.createElement("ul");
	output.id = "word-count-stats";

	var main_body_value = document.createElement("li");
	main_body_value.id = "main-body-stat";
	output.appendChild(main_body_value);
	output.className = WikiaArticle.getElementsByTagName("p").item(0).style.cssText;

	var ref_value = document.createElement("li");
	ref_value.id = "ref-stat";
	output.appendChild(ref_value);

	var total_value = document.createElement("li");
	total_value.id = "total-stat";
	output.appendChild(total_value);

	WikiaArticle.insertBefore(output, WikiaArticle.firstChild);

	// Header
	var header = document.createElement("span");
	header.id = "word-count-header";
	header.innerHTML = "<br/><b>Tổng số chữ:</b>";
	WikiaArticle.insertBefore(header,output);

	// Create counters
	var main_body_count = 0;
	var ref_count = 0;

	var i = 0;

	// Count within paragraphs
	var pList = WikiaArticle.getElementsByTagName("p");

	if (pList) {
		for (i=0; i < pList.length; i++) {
			var para = pList[i];

				var paraCount = getWordCount(para);

				if (paraCount > 0) {
					main_body_count += paraCount;
					para.style.cssText = "background-color:yellow; color:black";
				}
		}
	}

	// Count within lists
	var listTypes = ["li", "dd"];

	for (var j = 0; j < listTypes.length; j++) {
		var liList = WikiaArticle.getElementsByTagName(listTypes[j]);

		if (liList) {
			for (i=0; i < liList.length; i++) {
				var li = liList[i];

				if (isValidReferenceNode(li)) {
					ref_count += getWordCount(li);
					li.style.cssText = "background-color:cyan; color:black";
				}
				else if (isValidListNode(li)) {
					main_body_count += getWordCount(li);
					li.style.cssText = "background-color:yellow; color:black";
				}
			}
		}
	}

	// Count within headings
	var hList = WikiaArticle.getElementsByClassName("mw-headline");

	if (hList) {
		for (i=0; i < hList.length; i++) {
			var h = hList[i];

			if (h.id == "Contents") {
				continue;
			}

			main_body_count += getWordCount(h);
			h.style.cssText = "background-color:yellow; color:black";
		}
	}

	main_body_value.innerHTML = "Nội dung: " + main_body_count + " chữ";
	ref_value.innerHTML = "Chú thích: " + ref_count + " chữ";
	total_value.innerHTML = "Tổng cộng: " + (main_body_count + ref_count) + " chữ";
}

jQuery(function () {
	if($.inArray(mw.config.get('skin'), ['wikia' , 'oasis' ]) === -1){
		return;
	}

	mw.loader.using( ['mediawiki.util'], function () {
		if($.inArray(mw.config.get('wgAction'), ['edit', 'view' , 'submit' , 'historysubmit' , 'purge']) !== -1) {
			$( '.page-header__contribution-buttons .wds-dropdown ul' ).append($( '<li>' ).append($( '<a class="WordCount" style="font-weight:bold; cursor:pointer;">' ).text( 'Đếm Chữ' ))
			.click( toggleWordCount ));
		}
	});
});

//</nowiki>