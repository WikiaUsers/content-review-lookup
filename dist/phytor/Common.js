// Changes "Add New Page" URL and listeners.
mw.hook('wikipage.content').add(function(){
	 document.querySelectorAll('.wiki-tools__add-new-page').forEach(function(link){
	 	 link.setAttribute('href', '/wiki/Project:Create_Page');
	 	 link.classList.remove('wiki-tools__add-new-page');
	});
});