// This JavaScript is used for the example on the [[Allimages]] page.

/* <source lang="javascript"> */

$(function () {
	var $tbody = $('#allimages-sorting-table tbody');

	//********** URL FOR API CALL, YOU CAN CHANGE THIS **********
	var url = '/api.php?action=query&list=allimages&ailimit=1000&aiprop=size&format=json';

	// Callback function to execute with AJAX
	// Note: This function is highly dependent on the HTML structure of
	// the allimages-sorting-table. If you change the table, this function
	// will likely need to updated as well.
	function callback(data) {
		try {
			var newrows,
				image,
				title,
				allimages = data.query.allimages,
				len = allimages.length,
				i;

			for (i = 0; i < len; i++) {
				image = allimages[i];

				title = encodeURIComponent(image.title.replace(/ /g, '_'));

				newrows += '<tr><td><a href="/wiki/' + title + '">' + image.name + '</a>'
						+ '</td><td>' + image.size
						+ '</td><td>' + image.width
						+ '</td><td>' + image.height
						+ '</td></tr>';
			}

			$tbody.append(newrows);
		} catch (e) {
			$tbody.append('<tr><td colspan=4>An error occured while querying allimages API. See your JavaScript console for more details.</td></tr>');
			console.log('An error occured while querying allimages API:', e);
		}
	}

	// query the API
	if ($tbody.length > 0) {
		$.getJSON(url, callback);
	}
});

/* </source> */