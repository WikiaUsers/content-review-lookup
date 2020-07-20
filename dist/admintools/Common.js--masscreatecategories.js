// 22:43, February 18, 2017 (UTC)
// <source lang="JavaScript">
// by User:Cblair91
// updated by TK-999

if(autoCreateCat) {
	/*
 	 * Redirect not existent categories to edit page 
 	 */
	if(wgCanonicalNamespace == 'Category' && wgAction != 'edit' && wgArticleId === 0)
		window.location = '?action=edit';

	/*
 	 * If we are editing the page, auto create
 	 */
	if(wgCanonicalNamespace == 'Category' && wgAction == 'edit' && wgArticleId === 0) {
		$(document).ready(function() {
			// Set the text of the page content
			$('#wpTextbox1').val('{{SUBST:PAGENAME}}');
			// Set the summary
			$('#wpSummary,#wpSummaryEnhanced').val('Creating category page');
			// Then submit
			$('#editform').submit();
		});
	}
}
/*
 * Call API function
 */
function callAPI(data, method, callback) {
	data['format'] = 'json';
	$.ajax({
		data: data,
		dataType: 'json',
		url: wgScriptPath + '/api.php',
		type: method,
		cache: false,
		success: function(response) {
			if(response.error)
				alert('API error: ' + response.error.info);
			else 
				callback(response);
		},
		error: function(xhr, error) {
			alert('AJAX error: ' + error);
		}
	});
}
/*
 * Automatic create all pages
 */
if(wgPageName == 'Special:WantedCategories')
	addOnloadHook(addMassCreate);

function addMassCreate() {
	$('.WikiaPageHeader').prepend('<a class="wikia-button" onclick="massCreate()">Mass Create</a>');
}

/*
 * Check if the page is protected
 */
function createCatCheck(pagename) {
	callAPI({
		'action': 'query',
		'prop': 'info',
		'intoken': 'edit',
		'inprop': 'protection',
		'titles': pagename
	}, 'GET', function(response) {
		if(typeof response.query.pages[-1] == 'undefined') {
			$("a[title='"+pagename+"']").css("text-decoration", "line-through");
			$("a[title='"+pagename+"']").css("color", "blue");
			console.log("Page already exists: " + pagename);
		} else {
			var page = response.query.pages[-1];
			if(page.protection.length == 0) {
				createCatPage(pagename);
				$("a[title='"+pagename+"']").css("text-decoration", "line-through");
				$("a[title='"+pagename+"']").css("color", "blue");
			} else {
				$("a[title='"+pagename+"']").css("font-weight", "bold");
				$("a[title='"+pagename+"']").css("color", "purple");
			}
		}
	});
}

/*
 * Create the pages here
 */
function createCatPage(pagename) {
	callAPI({
		'action': 'query',
		'prop': 'info|revisions',
		'intoken': 'edit',
		'titles': pagename
	}, 'GET', function(response) {
		var page = response.query.pages[-1];
		callAPI({
			'minor': 'yes',
			'bot': 'yes',
			'summary': 'Mass creating category pages as per [[Special:WantedCategories]]',
			'action': 'edit',
			'title': pagename,
			'basetimestamp': page.starttimestamp,
			'startimestamp': page.starttimestamp,
			'token': page.edittoken,
			'text': '{{SUBST:PAGENAME}}'
		}, 'POST', function(response) {
			console.log('Created page: ' + pagename);
		});
	});
}

/*
 * Mass call createCatPage()
 */
function massCreate() {
	$('a.newcategory').each(function() {
		createCatCheck($(this).attr('title'))
	});
}

// </source>