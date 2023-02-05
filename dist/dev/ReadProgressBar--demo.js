(function demoProgressBar() {
	// Import and enable progress bar in the article.
	window.enableReadProgressBarOnArticles = true;

    importArticle({ article: 'u:dev:MediaWiki:ReadProgressBar.js' });

	// Create demo css and checkbox and get elements in which add both of them.
	const head = document.head,
		  demoContainer = document.getElementById('read-progress-bar-demo'),
		  demoProgressBarCSS = '\
			<style id="demo-readprogressbar-styles">\
.article-progress-bar.demo-styles {\n\
	--progress-bar-border-radius: 4px;\n\
	--progress-bar-color: hotpink;\n\
	--progress-bar-height: 6px;\n\
}\
			</style>\
			',
		  demoProgressBarHTML = '\
			<form id="rpb-demo-form">\
				<input type="checkbox" id="rpb-demo-toggle" name="rpb-demo-toggle" value="false">\
				<label for="rpb-demo-toggle">Toggle custom styles</label>\
			</form>\
		  ';

	// Add demo HTML and CSS and make scrollbar styles toggleable.
	head.insertAdjacentHTML('beforeend', demoProgressBarCSS);
	demoContainer.insertAdjacentHTML('beforeend', demoProgressBarHTML);

	document.getElementById('rpb-demo-toggle').addEventListener('change', toggleProgressBarStyles);

	function toggleProgressBarStyles() {
        const progressBar = document.querySelector('.article-progress-bar');
		progressBar.classList.toggle('demo-styles');
	}
}());