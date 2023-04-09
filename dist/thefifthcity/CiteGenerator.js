//Simple citation generator with 4 input fields (URL, title, source, quote) and copy-to-clipboard function
//Output format: <ref>{{Citation|url|title|source|}} ''"quoted text"''</ref>
$(function () {
	var citebox = document.getElementById('citegen');
	if (citebox === null) {return;} //Abort if not found
	//Create elements, set properties
	var output = document.createElement('p');
	var input_url = document.createElement('input');
	var input_title = document.createElement('input');
	var input_source = document.createElement('input');
	var input_quote = document.createElement('input');
	var auto_check = document.createElement('input');
	var check_label = document.createElement('label');
	var manual_button = document.createElement('button');
	output.id = 'citegen_output';
	output.innerHTML = '&ltref>\{\{Citation||||\}\}&lt/ref&gt'; //Entities to disrupt parsing
	input_url.type = 'text';
	input_url.placeholder = 'URL';
	input_url.id = 'citegen_input_url';
	input_url.name = 'citegen_input_url';
	input_title.type = 'text';
	input_title.placeholder = 'Title';
	input_title.id = 'citegen_input_title';
	input_title.name = 'citegen_input_title';
	input_source.type = 'text';
	input_source.placeholder = 'Source';
	input_source.id = 'citegen_input_source';
	input_source.name = 'citegen_input_source';
	input_quote.type = 'text';
	input_quote.placeholder = 'Quote';
	input_quote.id = 'citegen_input_quote';
	input_quote.name = 'citegen_input_quote';
	auto_check.type = 'checkbox';
	auto_check.id = 'citegen_auto';
	auto_check.name = 'citegen_auto';
	check_label.id = 'citegen_auto_label';
	check_label.for = 'citegen_auto';
	check_label.innerHTML = ' Auto copy?';
	manual_button.type = 'button';
	manual_button.id = 'citegen_cpybtn';
	manual_button.innerHTML = 'Copy to clipboard';
	//Insert elements
	citebox.querySelector('#citecont_url').prepend(input_url);
	citebox.querySelector('#citecont_title').prepend(input_title);
	citebox.querySelector('#citecont_source').prepend(input_source);
	citebox.querySelector('#citecont_quote').prepend(input_quote);
	citebox.querySelector('#citecont_opt').prepend(auto_check);
	citebox.querySelector('#citecont_opt').prepend(check_label);
	citebox.querySelector('#citecont_opt').prepend(manual_button);
	citebox.querySelector('#citecont_output').prepend(output);
	//Add events
	input_url.addEventListener('keyup', function(){convert(input_url, input_title, input_source, input_quote, output, auto_check, false);});
	input_title.addEventListener('keyup', function(){convert(input_url, input_title, input_source, input_quote, output, auto_check, false);});
	input_source.addEventListener('keyup', function(){convert(input_url, input_title, input_source, input_quote, output, auto_check, false);});
	input_quote.addEventListener('keyup', function(){convert(input_url, input_title, input_source, input_quote, output, auto_check, false);});
	manual_button.addEventListener('click', function(){convert(input_url, input_title, input_source, input_quote, output, auto_check, true);});
	//Focus main field
	input_url.focus();
}());

//Update output whenever text changes
function convert(input_url, input_title, input_source, input_quote, output, autocopy, manual) {
	var url = input_url.value;
	var newlink = '\{\{Citation|' + url + '|';
	var title = '';
	var sub = url.search('/wiki/') + 6;
	//Try to recognise URLs from other wikis
	if (input_title.value !== '') {
		title = input_title.value;
	} else if (url.search('/wiki/') > -1) {
		title = url.substring(sub);
		title = title.replace(/_/g, ' ');
		title = title.replace(/%21/g, '!');
		title = title.replace(/%22/g, '\'');
		title = title.replace(/%27/g, '\'');
		title = title.replace(/%28/g, '(');
		title = title.replace(/%29/g, ')');
		title = title.replace(/%2C/g, ',');
		title = title.replace(/%3F/g, '?');
	}
	newlink = newlink + title + '|';
	//Try to recognise common sources
	if (input_source.value !== '') {
		newlink = newlink + input_source.value + '|';
	} else {
		if (url.search('fallenlondon.wiki') > -1) {
			newlink = newlink + 'Fallen London' + '|';
			input_source.placeholder = 'Source (FLWiki detected!)';
		} else if (url.search('sunlesssea.fandom') > -1) {
			newlink = newlink + 'Sunless Sea' + '|';
			input_source.placeholder = 'Source (SSea wiki detected!)';
		} else if (url.search('sunlessskies.fandom') > -1) {
			newlink = newlink + 'Sunless Skies' + '|';
			input_source.placeholder = 'Source (SSkies wiki detected!)';
		} else if (url.search('wikipedia.org') > -1) {
			newlink = newlink + 'Wikipedia' + '|';
			input_source.placeholder = 'Source (Wikipedia detected!)';
		} else {
			newlink = newlink + '|';
			input_title.placeholder = 'Title';
			input_source.placeholder = 'Source';
		}
		if (title !== '') {
			input_title.placeholder = 'Title (Found: ' + title + ')';
		}
	}
	//Optional quote
	newlink = newlink + '\}\}';
	if (input_quote.value !== '') {
		newlink = newlink + ' \'\'"' + input_quote.value + '"\'\'';
	}
	//Output and optional clipboard copy (optional on-update or when button clicked)
	output.innerHTML = '&ltref>' + newlink + '&lt/ref&gt';
	if (autocopy.checked === true || manual === true) {
		navigator.clipboard.writeText('<ref>' + newlink + '</ref>');
	}
}