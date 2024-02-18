window.addEventListener('load', function() {
    var activeFilters = {};

    function toggleVisibility(colorClass) {
        var elements = document.querySelectorAll('.upf-units-container .' + colorClass);
        var shouldBeHidden = !(colorClass in activeFilters) || !activeFilters[colorClass];
        Array.prototype.forEach.call(elements, function(element) {
            var container = element.closest('.upf-hexagon-container');
            container.style.display = shouldBeHidden ? 'none' : '';
        });
        activeFilters[colorClass] = shouldBeHidden;

        var selectors = document.querySelectorAll('.upf-rarity-selector .' + colorClass + ' .upf-hexagon-inner');
        Array.prototype.forEach.call(selectors, function(inner) {
            if (inner.classList.contains('active') !== shouldBeHidden) {
                inner.classList.toggle('active');
            }
        });

        applyTextFilter();
    }

    function applyTextFilter() {
        var searchText = document.querySelector('input[name="query"]').value.toLowerCase();
        var hexagonContainers = document.querySelectorAll('.upf-units-container .upf-hexagon-container');

        Array.prototype.forEach.call(hexagonContainers, function(container) {
            var textElement = container.querySelector('.hexagon-text');
            var textValue = textElement ? textElement.textContent.toLowerCase() : '';
            var containerColorClass = '';
            var classList = container.querySelector('.upf-hexagon-outer').classList;

            for (var i = 0; i < classList.length; i++) {
                if (classList[i].startsWith('hexagon-')) {
                    containerColorClass = classList[i];
                    break;
                }
            }

            var searchIndex = 0;
            for (var i = 0; i < searchText.length; i++) {
                var char = searchText[i];
                searchIndex = textValue.indexOf(char, searchIndex) + 1;
                if (!searchIndex) break;
            }

            var passesTextFilter = searchIndex > 0 || searchText === '';
            var isColorFiltered = activeFilters[containerColorClass];

            container.style.display = passesTextFilter && !isColorFiltered ? '' : 'none';
        });
    }

    var searchContainer = document.getElementById('upf-search-bar-container');
    if (searchContainer) {
        var form = document.createElement('form');
        form.action = 'javascript:void(0)';
        var searchWrapper = document.createElement('div');
        searchWrapper.className = 'search-wrapper';
        var input = document.createElement('input');
        input.type = 'text';
        input.name = 'query';
        input.placeholder = 'Search...';

        searchWrapper.appendChild(input);
        form.appendChild(searchWrapper);
        searchContainer.appendChild(form);

        // Add real-time search filtering
        input.addEventListener('input', applyTextFilter);
    }

    var hexagonContainers = document.querySelectorAll('.upf-rarity-selector .upf-hexagon-container');
    Array.prototype.forEach.call(hexagonContainers, function(container) {
        container.addEventListener('click', function() {
            var hexagonOuter = container.querySelector('.upf-hexagon-outer');
            var colorClass = '';
            var classList = hexagonOuter.classList;

            for (var i = 0; i < classList.length; i++) {
                if (classList[i].startsWith('hexagon-')) {
                    colorClass = classList[i];
                    break;
                }
            }

            if (colorClass) {
                toggleVisibility(colorClass);
            }
        });
    });
});

window.addEventListener('load', function() {
	var elements = document.querySelectorAll(".cf-new-selector");
	Array.prototype.forEach.call(elements, function(copyLinkParent) {
	  var cfCopyText = copyLinkParent.querySelector(".cf-copy-text");
	  var copyButton = copyLinkParent.querySelector(".cf-clipboard-svg");
	  var originalText = cfCopyText.textContent;
	
	  copyButton.addEventListener("click", function() {
	    navigator.clipboard.writeText(originalText);
	
	    cfCopyText.textContent = "Copied!";
	    setTimeout(function() {
	      cfCopyText.textContent = originalText;
	    }, 2000);
	  });
	});
});