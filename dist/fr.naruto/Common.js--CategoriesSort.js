/* Any JavaScript here will be loaded for all users on every page load. */

//This script organizes all categories by alphabetical order
(function(window, $, mw){
    
    //Load library StringLatinize.js 
	//window.importArticle({ type: 'script', article: 'u:fr.naruto:MediaWiki:Common.js/StringLatinize.js' });
	$.getScript( mw.util.wikiScript('load') + '?only=scripts&modules=u:fr.naruto:MediaWiki:Common.js/StringLatinize.js', function(){
 
		if (document.readyState === 'loading') {
			window.addEventListener('DOMContentLoaded', sortCategDOMElements ); 
		} else {
			sortCategDOMElements();
		}
	        
	});
	
	function sortCategDOMElements(){
        
		var skinCatLists = {
				oasis : { 
					headCat: '.page-header__categories-links',
					headCatOth: '.page-header__categories-dropdown-content ul:first li',
					categories: '.categories'
				},
				fandomdesktop : { 
					headCat: '.page-header__categories',
					headCatOth: '.page-header__categories-dropdown-content ul:first li',
					categories: '.categories'
				}
			},
			headerCategories = $(skinCatLists[mw.config.get('skin')].headCat)[0],
			headerCategoriesOthers = $(skinCatLists[mw.config.get('skin')].headCatOth),
			categories = $(skinCatLists[mw.config.get('skin')].categories)[0],          
			headerCategList = [],
			categList = [];
        
		function Category(name, element) {
			this.name = name;
			this.element = element;
        }
        
        //Fill an array with the category's name and the DOM element
		Array.from($(headerCategories).children('a')).forEach(function(headerCategory){
			headerCategList.push( new Category( headerCategory.innerText, headerCategory.cloneNode(true) ) );
		});
        
		Array.from($(headerCategoriesOthers).children('a')).forEach(function(headerCategory){
			headerCategList.push( new Category( headerCategory.innerText, headerCategory.cloneNode(true) ) );
		});
        
		Array.from($(categories).children('li.category.normal')).forEach(function(category){
			categList.push( new Category( category.innerText, category ) );
		});
        
		//Sort the arrays
		headerCategList.sort(sortCategories);
		categList.sort(sortCategories);
        
		//To respect "data-tracking" order, the link content is replaced instead of moving elements
		if(headerCategList.length > 0){
            
			var visibleCategCount = $(headerCategories).children('a').length,
				child;
          
			for(var i = 0, headerCategListCount = headerCategList.length; i < headerCategListCount; i++){
            
			if ( ( child = i < visibleCategCount ? $(headerCategories).children('a')[i] : $(headerCategoriesOthers).children('a')[i - visibleCategCount] ) ) {
            
				child.href = headerCategList[i].element.href;
				child.innerText = headerCategList[i].element.innerText;
			}
            
			}
          
		}
        
        //Move all categories
		if(categList.length > 0 ){
          
			categList.forEach(function (category){
            
				$(".categories").append(category.element);
            
			});
          
			if( $(".categories > li.last") )
				$(".categories").append($(".categories > li.last")[0]);
          
		}
        
	}
    
	function sortCategories(category1, category2){
  
		var latinizedCategory1 = category1.name.replace("'", "e ").latinize().toUpperCase(),
			latinizedCategory2 = category2.name.replace("'", "e ").latinize().toUpperCase();
        
		if(latinizedCategory1 < latinizedCategory2)
			return -1;
        
		else if(latinizedCategory1 > latinizedCategory2)
			return 1;
        
		else
			return 0;
      
	}

})(window, jQuery, mediaWiki);