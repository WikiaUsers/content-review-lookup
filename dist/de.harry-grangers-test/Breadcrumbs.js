function getParentCategory(category,callback) {
    $.get('http://de.harry-grangers-test.wikia.com/api.php?action=query&titles=Kategorie:' + category + '&prop=categories&format=json').done(callback);
}

function getBreadcrumbs(cat) {
        breadcrumbs = arguments.length == 2 && arguments[1] ? arguments[1] : [];
        getParentCategory(cat,function(data) {
            parentCategory = /Kategorie:(.*)/.exec(data.query.pages[Object.keys(data.query.pages)[0]].categories[0].title)[1];
            console.log('parent category',parentCategory);
            breadcrumbs.push(parentCategory);
            if($.inArray(parentCategory,['Wiki','!Hauptkategorie']) == -1) {
                return getBreadcrumbs(parentCategory,breadcrumbs);
	    }
            else {
		return setBreadcrumbs(breadcrumbs);
	    }
        });
}

function setBreadcrumbs(breadcrumbs) {
	/*str = '';
	for(b in breadcrumbs) {
		str += breadcrumbs[b].name;
		if(b != breadcrumbs.length - 1) {
			str += ' \u00BB ';
		}
	}
	return str;*/
	nav = $('<nav />').addClass('breadcrumbs').append($('<ul />'));
	for(b in breadcrumbs) {
		$('<li />').text(breadcrumbs[b]).prependTo(nav.find('ul'));
	}
        $('.WikiaPageHeader .header-container .header-title').append(nav);
        console.log('breadcrumbs nav',nav);
	return nav;	
}

console.warn('namespaceId:',wgNamespaceNumber);
if(wgNamespaceNumber == 14) {
    console.info('category namespace --> output breadcrumbs');
    console.log(getBreadcrumbs(/Kategorie:(.*)/.exec(wgPageName)[1]));
    //console.log('breadcrumbs',setBreadcrumbs(breadcrumbs));
    //$('body').append(setBreadcrumbs(breadcrumbs));
}