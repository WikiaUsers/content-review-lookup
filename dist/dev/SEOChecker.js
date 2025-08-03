/*
 * @title       SEOChecker.js
 * @version     1.0
 * @description SEO analysis tool for Fandom wikis (thanks to Magiczocker for making it better)
 * @author      Charata
 * @author      Magiczocker (UI redesign; code cleanup)
 * @license     CC-BY-SA-3.0
 */

( () => {
	'use strict';

	if ( window.SEOCheckerLoaded ) {
		return;
	}
	window.SEOCheckerLoaded = true;

	// Only run on article pages
	if ( mw.config.get( 'wgNamespaceNumber' ) !== 0 ) {
		return;
	}

	mw.loader.load( 'https://dev.fandom.com/load.php?mode=articles&articles=MediaWiki:SEOChecker.css&only=styles', 'text/css' );

	// Configuration
	const config = {
		maxTitleLength: 60,
		idealTitleLength: 50,
		maxDescriptionLength: 160,
		idealDescriptionLength: 120,
		maxKeywords: 10,
		minContentLength: 300,
		headingTags: [ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6' ]
	};
	const mwconfig = mw.config.get( [
		'wgTitle',
		'skin'
	] );
	let checked = false;

	const main = document.querySelector( 'body' ).appendChild( document.createElement( 'div' ) );
	main.className = 'seochecker';
	main.innerHTML =
		`<div class="seochecker-title">SEO Checker
			<div class="seochecker-close">×</div>
		</div>
		<div class="seochecker-content"></div>`;
	const header = main.querySelector( '.seochecker-title' );
	const content = main.querySelector( '.seochecker-content' );
	const close = main.querySelector( '.seochecker-close' );
	const mwContent = document.getElementById( 'content' );
	let open = false;
	close.addEventListener( 'click', () => {
		if ( open ) {
			open = false;
			main.style.removeProperty( 'display' );
		}
	} );

	function dragElement() { // https://www.w3schools.com/howto/howto_js_draggable.asp
		let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
		header.onmousedown = dragMouseDown;

		function dragMouseDown( e ) {
			e.preventDefault();
			// get the mouse cursor position at startup:
			pos3 = e.clientX;
			pos4 = e.clientY;
			document.onmouseup = closeDragElement;
			// call a function whenever the cursor moves:
			document.onmousemove = elementDrag;
		}

		function elementDrag( e ) {
			e.preventDefault();
			// calculate the new cursor position:
			pos1 = pos3 - e.clientX;
			pos2 = pos4 - e.clientY;
			pos3 = e.clientX;
			pos4 = e.clientY;
			// set the element's new position:
			main.style.top = ( main.offsetTop - pos2 ) + 'px';
			main.style.left = ( main.offsetLeft - pos1 ) + 'px';
		}

		function closeDragElement() {
			// stop moving when mouse button is released:
			document.onmouseup = null;
			document.onmousemove = null;
		}
	}

	// Make the DIV element draggable:
	dragElement();

	// Check page title SEO factors
	function checkTitle( title ) {
		const section = createSection( 'Page Title' );
		const titleLength = title.length;

		if ( titleLength > config.maxTitleLength ) {
			addIssue( section, `Title is too long (${ titleLength } characters). Recommended max: ${ config.maxTitleLength } characters.`, 'error' );
		} else if ( titleLength > config.idealTitleLength ) {
			addIssue( section, `Title is slightly long (${ titleLength } characters). Ideal length: ${ config.idealTitleLength } characters.`, 'warning' );
		} else {
			addIssue( section, `Title length is good (${ titleLength } characters).`, 'success' );
		}

		if ( !title ) {
			addIssue( section, 'Page title is empty!', 'error' );
		}

		if ( title === title.toLowerCase() || title === title.toUpperCase() ) {
			addIssue( section, 'Title should use proper capitalization.', 'warning' );
		}
	}

	// Check heading structure
	function checkHeadings() {
		const section = createSection( 'Headings' );
		const headings = [];
		let h1Count = 0;

		function checkTag( tag ) {
			const tags = mwContent.querySelectorAll( tag );
			tags.forEach( ( a ) => {
				const text = a.textContent.trim();
				const level = parseInt( tag.slice( 1 ) );

				if ( text ) {
					headings.push( {
						text: text,
						level: level,
						element: tag
					} );

					if ( tag === 'h1' ) {
						h1Count++;
					}
				}
			} );
		}

		config.headingTags.forEach( checkTag );

		if ( headings.length === 0 ) {
			addIssue( section, 'No headings found on the page.', 'error' );
			return;
		}

		if ( h1Count === 0 ) {
			addIssue( section, 'No H1 heading found. Every page should have one main H1 heading.', 'error' );
		} else if ( h1Count > 1 ) {
			addIssue( section, `Multiple H1 headings found (${ h1Count }). Typically only one H1 should be used per page.`, 'warning' );
		}

		// Check heading hierarchy
		let lastLevel = 1;
		let hierarchyIssues = 0;

		headings.forEach( ( heading ) => {
			if ( heading.level > lastLevel + 1 ) {
				hierarchyIssues++;
				addIssue( section, `Heading hierarchy jump from H${ lastLevel } to H${ heading.level }: "${ heading.text }"`, 'warning' );
			}
			lastLevel = heading.level;
		} );

		if ( hierarchyIssues === 0 ) {
			addIssue( section, 'Heading hierarchy is properly structured.', 'success' );
		}

		// Check heading length
		headings.forEach( ( heading ) => {
			if ( heading.text.length > 70 ) {
				addIssue( section, `Heading "${ heading.text.slice( 0, 30 ) }..." is too long (${ heading.text.length } characters). Keep under 70 characters.`, 'warning' );
			}
		} );
	}

	// Check content length and quality
	function checkContentLength( wordCount, charCount ) {
		const section = createSection( 'Content' );

		if ( wordCount < config.minContentLength / 3 ) {
			addIssue( section, `Content is very short (${ wordCount } words). Recommended minimum: ${ config.minContentLength } characters.`, 'error' );
		} else if ( charCount < config.minContentLength ) {
			addIssue( section, `Content is somewhat short (${ charCount } characters). Recommended minimum: ${ config.minContentLength } characters.`, 'warning' );
		} else {
			addIssue( section, `Content length is good (${ wordCount }} words, ${ charCount } characters).`, 'success' );
		}

		// Check paragraph distribution
		const paragraphs = Array.from( mwContent.querySelectorAll( 'p' ) ).filter( ( ele ) => ele.textContent.trim().length > 0 );

		if ( paragraphs.length < 3 ) {
			addIssue( section, `Only ${ paragraphs.length } paragraphs found. Consider breaking content into more paragraphs.`, 'warning' );
		}

		// Check long paragraphs
		paragraphs.forEach( ( paragraph ) => {
			const text = paragraph.textContent;
			if ( text.length > 300 ) {
				addIssue( section, `Long paragraph found (${ text.length } characters). Consider breaking it up.`, 'warning' );
			}
		} );
	}

	// Check images for alt text and other factors
	function checkImages() {
		const section = createSection( 'Images' );
		const images = mwContent.querySelectorAll( 'img:not(.seo-checker-ignore)' );
		let imagesWithIssues = 0;

		if ( images.length === 0 ) {
			addIssue( section, 'No images found on the page. Consider adding relevant images.', 'warning' );
			return;
		}

		images.forEach( ( image ) => {
			const alt = image.getAttribute( 'alt' ) || '';
			const src = image.getAttribute( 'src' ) || '';
			const issues = [];

			if ( !alt.trim() ) {
				issues.push( 'missing alt text' );
			}

			if ( src.toLowerCase().includes( 'placeholder' ) ) {
				issues.push( 'placeholder image' );
			}

			if ( src.toLowerCase().includes( 'image.png' ) || src.toLowerCase().includes( 'image.jpg' ) ) {
				issues.push( 'generic image filename' );
			}

			if ( issues.length > 0 ) {
				imagesWithIssues++;
				const imgName = src.split( '/' ).pop().slice( 0, 20 );
				addIssue( section, 'Image "' + imgName + '...": ' + issues.join( ', ' ), 'warning' );
			}
		} );

		if ( imagesWithIssues === 0 ) {
			addIssue( section, 'All images have proper alt text and good filenames.', 'success' );
		} else {
			addIssue( section, imagesWithIssues + ' of ' + images.length + ' images have issues.', 'warning' );
		}
	}

	// Check internal and external links
	function checkLinks() {
		const section = createSection( 'Links' );
		const links = mwContent.querySelectorAll( 'a[href]' );
		let externalLinks = 0;
		let brokenLinks = 0;
		let anchorOnlyLinks = 0;

		if ( links.length === 0 ) {
			addIssue( section, 'No links found on the page. Consider adding relevant internal and external links.', 'warning' );
			return;
		}

		links.forEach( ( link ) => {
			const href = link.getAttribute( 'href' ) || '';
			const text = link.textContent.trim();

			if ( href.startsWith( 'http' ) && !href.includes( window.location.hostname ) ) {
				externalLinks++;
				if ( !text ) {
					addIssue( section, 'External link with empty link text: ' + href.slice( 0, 30 ) + '...', 'warning' );
				} else if ( text === href || text.toLowerCase() === 'click here' ) {
					addIssue( section, 'Poor link text ("' + text + '") for external link.', 'warning' );
				}
			}

			if ( href.startsWith( '#' ) ) {
				anchorOnlyLinks++;
			}

			// Check for broken links (simple check - actual checking would be server-side)
			if ( [ '', '#', 'javascript:void(0)' ].includes( href ) ) {
				brokenLinks++;
			}
		} );

		if ( externalLinks === 0 ) {
			addIssue( section, 'No external links found. Consider adding relevant external references.', 'info' );
		} else {
			addIssue( section, externalLinks + ' external links found.', 'success' );
		}

		if ( brokenLinks > 0 ) {
			addIssue( section, brokenLinks + ' potentially broken links found.', 'error' );
		}

		if ( anchorOnlyLinks > 3 ) {
			addIssue( section, `Many anchor-only links (${ anchorOnlyLinks }). These don't provide SEO value.`, 'warning' );
		}
	}

	// Check meta description if available
	function checkMetaDescription() {
		const section = createSection( 'Meta Description' );
		const meta = document.querySelector( 'meta[name="description"]' );

		if ( meta.length === 0 ) {
			addIssue( section, 'No meta description found. Add one in the page settings.', 'error' );
			return;
		}

		const desc = meta.getAttribute( 'content' ) || '';
		const descLength = desc.length;

		if ( !desc.trim() ) {
			addIssue( section, 'Meta description is empty.', 'error' );
			return;
		}

		if ( descLength > config.maxDescriptionLength ) {
			addIssue( section, `Meta description is too long (${ descLength } characters). Recommended max: ${ config.maxDescriptionLength } characters.`, 'error' );
		} else if ( descLength > config.idealDescriptionLength ) {
			addIssue( section, `Meta description is slightly long (${ descLength } characters). Ideal length: ${ config.idealDescriptionLength } characters.`, 'warning' );
		} else {
			addIssue( section, `Meta description length is good (${ descLength } characters).`, 'success' );
		}

		if ( desc === desc.toLowerCase() || desc === desc.toUpperCase() ) {
			addIssue( section, 'Meta description should use proper capitalization.', 'warning' );
		}
	}

	// Helper function to create a section in the SEO panel
	function createSection( title ) {
		const section = content.appendChild( document.createElement( 'div' ) ),
			h = section.appendChild( document.createElement( 'h4' ) );
		h.textContent = title;
		h.className = 'seochecker-section';
		section.className = 'seo-section';

		return section;
	}

	// Helper function to add an issue to a section
	function addIssue( section, text, type ) {
		const issue = document.createElement( 'div' );
		issue.className = 'seochecker-issue';
		issue.textContent = text;

		switch ( type ) {
			case 'error':
				issue.dataset.type = 'error';
				break;
			case 'warning':
				issue.dataset.type = 'warning';
				break;
			case 'success':
				issue.dataset.type = 'success';
				break;
		}

		section.append( issue );
	}

	// Open window and run checks
	function runSEOChecks() {
		if ( open ) {
			return;
		}
		main.style.display = 'block';
		open = true;
		if ( !checked ) {
			checked = true;
			content.innerHTML = '';
			const pageContent = mwContent.textContent;
			const wordCount = pageContent.trim().split( /\s+/ ).length;
			const charCount = pageContent.length;

			// Check page title
			checkTitle( mwconfig.wgTitle );

			// Check headings
			checkHeadings();

			// Check content length
			checkContentLength( wordCount, charCount );

			// Check images
			checkImages();

			// Check links
			checkLinks();

			// Check meta description (if available)
			checkMetaDescription();
		}
	}

	if ( config.skin === 'fandomdesktop' ) {
		// Add button to wikia bar
		const tools = document.querySelector( '#WikiaBar .toolbar .tools' ),
			li = document.createElement( 'li' ),
			button = li.appendChild( document.createElement( 'a' ) );

		if ( !tools ) {
			return;
		}

		button.style.cursor = 'pointer';
		button.textContent = 'SEO Checker';
		button.addEventListener( 'click', runSEOChecks );

		tools.appendChild( li );
	} else {
		mw.loader.using( 'mediawiki.util' ).then( ( require ) => {
			const util = require( 'mediawiki.util' ),
				node = util.addPortletLink( 'p-tb', '#', 'SEO Checker', 'Check SEO status' );
			node.addEventListener( 'click', ( e ) => {
				e.preventDefault();
				runSEOChecks();
			} );
		} );
	}
} )();