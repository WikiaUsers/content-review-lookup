/**
 * JavaScript-based gallery preview using api.php
 * Version 0.2
 * (c) 2007 by Magnus Manske
 * Released under GPL
 * Maintainers: [[User:Magnus Manske]], [[User:Krinkle]]
**/

/*global mediaWiki:false, jQuery:false*/
/*jshint curly:false, laxbreak:true*/
(function( $, mw ) {
'use strict';


// Install onload handler, which will display the link to start the script
if ( mw.config.get('wgNamespaceNumber') !== 6 || mw.config.get('wgAction') !== 'view'  || mw.util.getParamValue('diff')) {
	return;
}

var	gp_div, gp_head, gp_status,
	gp_xmlobjects,
	gp_cat_object,
	gp_cat_object2,
	gp_image_xml,
	gp_counter,
	gp_left,
	gp_found,
	gp_found2,
	gp_size = 75,
	gp_maxw;

// Avoid license categories etc.
var gp_avoid_cats = [
	'CC-',
	'PD-',
	'PD ',
	'GPL',
	'Self',
	'GFDL',
	'Copyrighted free use',
	'Media with locations',
	'Deletion',
	'Incomplete deletion',
	'Flickr review needed',
	'Flickr images needing human review',
	'User-created GFDL images',
	'Images without source',
	'Images that should use vector graphics',
	'Uploaded with UploadWizard',
	'Author died more than',
	'License migration',
	'Images with annotations'
];


// Handler to toggle the listing of hits for a single language/project
window.toggle_id = function ( id ) {
	var e = document.getElementById( id );
	if ( e.style.display === 'none' ) e.style.display = 'block';
	else e.style.display = 'none';
};

function gp_check_done() {
	var i;
	for ( i = 0; i < gp_xmlobjects.length; i++ ) {
		if ( gp_xmlobjects[i].running ) return;
	}
	for ( i = 0; i < gp_image_xml.length; i++ ) {
		if ( gp_image_xml[i].running ) return;
	}
	gp_head.innerHTML = '<a href="#" style="float:right;" onClick="toggle_id(\'gallerypreview\');">Show/hide preview</a>Done.';
}


function get_thumbnail_url( url, width ) {
	url = url.replace( '/commons/', '/commons/thumb/' );
	var iname = url.split( '/' ).pop();
	url += '/' + width + 'px-' + iname;
	gp_check_done();
	return url;
}


function gp_image_callback() {
	for ( var i = 0; i < gp_image_xml.length; i++ ) {
		if (gp_image_xml[i].readyState === 4 && gp_image_xml[i].running === true ) {
			gp_image_xml[i].running = false;
			var xml = gp_image_xml[i].responseXML;
			var image = xml.getElementsByTagName( 'ii' )[0];
         // Deleted/ hidden revision, ...
         if (!image) continue;
			var width = image.getAttribute( 'width' );
			var height = image.getAttribute( 'height' );

			var nw = gp_size;
			var nh = nw / width * height;
			var off = ' style="position:relative; overflow:hidden;';
			if ( nh < gp_size ) {
				nh = gp_size;
				nw = nh / height * width;
				var xoff = -( nw - gp_size )/2;
				off += 'left:' + Math.floor( xoff ) + 'px;';
			}
			if ( nh > gp_size ) {
				var yoff = -( nh - gp_size )/2;
				off += 'top:' + Math.floor( yoff ) + 'px;';
			}
			off += '" ';


			var url = get_thumbnail_url( image.getAttribute( 'url' ), Math.floor(nw) );

			var target = document.getElementById(gp_image_xml[i].myid);
			target.innerHTML = "<div style='overflow:hidden;width:75px;height:75px'><a href=\"" + mw.util.wikiGetlink(gp_image_xml[i].image) + "\"><img border='0' " + off + "src=\"" + url + "\"/></a></div>";
			gp_check_done();
		}
	}
	gp_check_done();
}

function gp_add_thumbnail( image ) {
	var myid = 'gpid_' + gp_counter;
	gp_counter += 1;
	var ret = "<td id='" + myid + "' style='overflow:hidden;width:75px;height:75px;font-size:75%;text-align:left;color:white";
	if ( image === '' ) {
		ret += ";background-color:#BBBBBB'>";
		ret += 'No other files here';
	} else {
		ret += "'>";
	}
	ret += '</td>';

	if ( image === '' ) return ret;

	var url = mw.util.wikiScript( 'api' ) + '?' + $.param({
		format: 'xml',
		action: 'query',
		prop: 'imageinfo',
		iiprop: 'url|size',
		titles: image
	});
	var i = gp_image_xml.length;
	gp_image_xml.push( new XMLHttpRequest() );
	gp_image_xml[i].image = image;
	gp_image_xml[i].myid = myid;
	gp_image_xml[i].running = true;
	gp_image_xml[i].onreadystatechange = gp_image_callback;
	gp_image_xml[i].open( 'GET', url, true );
	gp_image_xml[i].send( null );

	gp_check_done();
	return ret;
}

function categorypreview_callback() {
	var i, k;
	for ( i = 0; i < gp_xmlobjects.length; i++ ) {
		if ( gp_xmlobjects[i].readyState === 4 && gp_xmlobjects[i].running === true ) {

			gp_xmlobjects[i].running = false;

			var	xml = gp_xmlobjects[i].responseXML,
				cat = gp_xmlobjects[i].category,
				ts = gp_xmlobjects[i].timestamp,
				out = 
					'<div id="' + mw.html.escape(cat) + '" style="background-color:#FFFF7E; width:' + gp_maxw + 'px">'
					+ '<a href="' + mw.util.wikiGetlink(mw.config.get('wgFormattedNamespaces')[14] + ':' + cat) + '"><b>' + mw.html.escape(cat) + '</b></a><br/>',
				pages = xml.getElementsByTagName( 'cm' ),
				before = '00000000000000',
				after = '99999999999999',
				before_image = '',
				after_image = '';

			for ( k = 0; k < pages.length; k++ ) {
				var	page = pages[k],
					its = page.getAttribute( 'timestamp' ),
					image = page.getAttribute( 'title' );

				if ( its === '' ) {
					// No timestamp here
					continue;
				}
				if ( its < ts && its > before ) {
					before = its; before_image = image;
				}
				if ( its > ts && its < after ) {
					after = its; after_image = image;
				}
			}

			out += '<table border="0" style="width: 100%;"><tr>';
			out += gp_add_thumbnail( before_image );
			out += gp_add_thumbnail( after_image );
			out += "<td style='color:#BBBBBB;background-color:white;text-align:center'><b>";
			if ( pages.length === 500 ) {
				out += ">500";
			} else {
				out += pages.length;
			}
			out += '</b><br/>files in category</td>';
			out += '</tr></table>';

			out += '</div>';
			gp_div.innerHTML += out;
			gp_check_done();
		}
	}
	gp_check_done();
}

function gallerypreview_callback() {
	var i, k;
	for ( i = 0; i < gp_xmlobjects.length; i++ ) {
		if ( gp_xmlobjects[i].readyState === 4 && gp_xmlobjects[i].running === true ) {

			gp_xmlobjects[i].running = false;

			var	pn = mw.config.get('wgPageName').split( '_' ).join( ' ' ),
				xml = gp_xmlobjects[i].responseXML,
				gal = gp_xmlobjects[i].gallery,
				out =
					"<div id='" + mw.html.escape(gal) + "' style='background-color:#BCED91;width:" + gp_maxw + "px'>"
					+ '<a href="' + mw.util.wikiGetlink(gal) + '"><b>' + mw.html.escape(gal) + '</b></a><br/>',
				pages = xml.getElementsByTagName( 'im' ),
				before_image = '',
				after_image = '';

			for ( k = 0; k < pages.length; k++ ) {
				var	page = pages[k],
					image = page.getAttribute( 'title' );

				if ( image > before_image && image < pn) {
					before_image = image;
				}
				if ( ( after_image === '' || image < after_image ) && image > pn) {
					after_image = image;
				}
			}

			out += '<table border="0" style="width: 100%;"><tr>';
			out += gp_add_thumbnail( before_image );
			out += gp_add_thumbnail( after_image );
			out += '<td style="color:#BBBBBB; background-color:white; text-align:center;"><b>';
			if ( pages.length === 500 ) {
				out += '>500';
			} else {
				out += pages.length;
			}
			out += '</b><br/>files in gallery</td>';
			out += '</tr></table>';

			out += '</div>';
			gp_div.innerHTML += out;
			gp_check_done();
		}
	}
	gp_check_done();
}

// Prepares a new query and adds it to the list
function add_categorypreview_task( category, timestamp ) {
	// Remove the first part before the colon
	category = category.split( ':' );
	category.shift();
	category = category.join( ':' );

	if ( timestamp === '' ) {
		// No timestamp, no point in looking further
		return;
	}

	for ( var i = 0; i < gp_avoid_cats.length; i++ ) {
		var s = gp_avoid_cats[i];
		if ( category.substr( 0, s.length ) === s ) return;
	}

	var url = mw.util.wikiScript( 'api' ) + '?' + $.param({
		format: 'xml',
		action: 'query',
		list: 'categorymembers',
		cmlimit: 500,
		cmnamespace: 6,
		cmprop: 'ids|title|timestamp',
		cmtitle: 'Category:' + category
	});
	i = gp_xmlobjects.length;
	gp_left = gp_left + 1;
	gp_found = true;
	gp_xmlobjects.push( new XMLHttpRequest() );
	gp_xmlobjects[i].gallery = '';
	gp_xmlobjects[i].category = category;
	gp_xmlobjects[i].timestamp = timestamp;
	gp_xmlobjects[i].onreadystatechange = categorypreview_callback;
	gp_xmlobjects[i].running = true;
	gp_xmlobjects[i].open( 'GET', url, true );
	gp_xmlobjects[i].send( null );
}

// Prepares a new query and adds it to the list
function add_gallerypreview_task( gallery ) {

	for ( var i = 0; i < gp_avoid_cats.length; i++ ) {
		var s = gp_avoid_cats[i];
		if ( gallery.substr( 0, s.length ) === s ) return;
	}


	var url = mw.util.wikiScript( 'api' ) + '?' + $.param({
		format: 'xml',
		action: 'query',
		prop: 'images',
		titles: gallery
	});

	i = gp_xmlobjects.length;
	gp_left = gp_left + 1;
	gp_found2 = true;
	gp_xmlobjects.push( new XMLHttpRequest() );
	gp_xmlobjects[i].gallery = gallery;
	gp_xmlobjects[i].category = '';
	gp_xmlobjects[i].onreadystatechange = gallerypreview_callback;
	gp_xmlobjects[i].running = true;
	gp_xmlobjects[i].open( 'GET', url, true );
	gp_xmlobjects[i].send( null );
}

function handle_category_list() {
	if ( gp_cat_object.readyState === 4 ) {

		var xml = gp_cat_object.responseXML;
		var cps = xml.getElementsByTagName('cl');
		for ( var i = 0; i < cps.length; i++ ) {
			var il = cps[i];
			var ns = il.getAttribute('ns');
			if ( ns !== null && ns !== '14' ) continue; // Not a category. Strange.
			var ts = il.getAttribute('timestamp');
			var cat = il.getAttribute('title');
			add_categorypreview_task( cat, ts );
		}
		if ( gp_found === false ) gp_status.innerHTML += "<div style='color:CD0000'>No non-trivial categories found. <a href='//commons.wikimedia.org/wiki/Categories#Categorizing_your_uploads'>Please add some</a>.</div>";
	}
}

function handle_gallery_list() {
	if ( gp_cat_object2.readyState === 4 ) {
		var xml = gp_cat_object2.responseXML;
		var ils = xml.getElementsByTagName('iu');
		for ( var i = 0; i < ils.length; i++ ) {
			var il = ils[i];
			var ns = il.getAttribute('ns');
			if ( ns !== null && ns !== '0' ) continue; // Not gallery namespace
			var gallery = il.getAttribute('title');
			add_gallerypreview_task( gallery );
		}
		if ( gp_found2 === false ) gp_status.innerHTML += '<div style="color:#CD0000;">No galleries found.</div>';
	}
}

function gp_get_category_list( page ) {
	gp_cat_object = new XMLHttpRequest();
	var url = mw.util.wikiScript( 'api' ) + '?' + $.param({
		format: 'xml',
		action: 'query',
		prop: 'categories',
		clprop: 'timestamp',
		titles: page
	});
	gp_cat_object.onreadystatechange = handle_category_list;
	gp_cat_object.open( 'GET', url, true );
	gp_cat_object.send( null );
}

function gp_get_gallery_list( page ) {
	gp_cat_object2 = new XMLHttpRequest();
	var url = mw.util.wikiScript( 'api' ) + '?' + $.param({
		format: 'xml',
		action: 'query',
		list: 'imageusage',
		iutitle: page,
		iunamespace: 0 // Gallery namespace (NS_MAIN=0)
	});
	gp_cat_object2.onreadystatechange = handle_gallery_list;
	gp_cat_object2.open( 'GET', url, true );
	gp_cat_object2.send( null );
}

// Initializes the run of the script and prepares/starts the queries
function run_gallerypreview() {
	gp_head = document.getElementById('gp_head');
	gp_status = document.getElementById('gp_status');
	gp_counter = 0;
	gp_left = 0;
	gp_found = false;
	gp_found2 = false;
	gp_div.style.width = '250px';
	gp_div.style.border = '1px solid #AAAAAA';
	gp_image_xml = [];
//	gp_head.innerHTML = '';
	gp_xmlobjects = [];
	gp_get_gallery_list( mw.config.get('wgPageName') );
	gp_get_category_list( mw.config.get('wgPageName') );
}

// Onload handler
// Adds div section with id gallerypreview
function init_gallery_preview() {
	gp_maxw = ( gp_size + 10 ) * 3;
	var file_div = document.getElementById('file');
	if( !file_div ) return;
	var file_div_parent = file_div.parentNode;

	var dummy = document.createElement( 'div' );
	file_div_parent.insertBefore( dummy, file_div );
	dummy.innerHTML = '<div id="gallerypreview_container" style="border:1px solid #AAAAAA; float:right; max-width:' + gp_maxw + 'px; width:' + gp_maxw + 'px">' +
	'<div id="gp_head" style="background-color:#AAAAFF; padding:2px; border:1px solid #AAAAAA; display:block;"><span style="color:#FFFF99;">Loading…</span></div>' +
	'<div id="gallerypreview" style="display:block; width:' + gp_maxw + 'px"></div>' +
	'<div id="gp_status" style="border:1px solid #AAAAAA; padding:2px;"></div>' +
	'</div>';

	gp_div = document.getElementById( 'gallerypreview' );
	while ( gp_div.firstChild ) gp_div.removeChild( gp_div.firstChild );
	gp_maxw -= 2;
	setTimeout( function() { 
		run_gallerypreview();
	}, 10 );
}

$(document).ready( init_gallery_preview );

})(jQuery, mediaWiki);