mw.hook('wikipage.content').add(function ($content) {
    $content.find('table.crate-table').each(function () {
        var $table = $(this);

        if ($table.data('filter-init')) return;
        $table.data('filter-init', true);

        // Container
        var $wrapper = $('<div>').addClass('crate-filter-bar');

        // Suchfeld
        var $input = $('<input>')
            .attr({
                type: 'text',
                placeholder: 'Suchen...'
            })
            .addClass('crate-filter-input');

        // Seltenheiten sammeln
		var rarities = [];
		
		$table.find('tbody tr').each(function () {
		    var $cells = $(this).find('td');
		    var rarityIdx = $cells.length >= 6 ? 2 : 1;
		
		    var cell = $cells.eq(rarityIdx);
		    if (!cell.length) return;
		
		    // Sicherer Zugriff
		    var html = cell.html() || '';
		
		    var parts = html.split(/<br\s*\/?>|\n/);
		
		    parts.forEach(function (r) {
		        r = $('<div>').html(r).text().trim();
		
		        if (r && !rarities.includes(r)) {
		            rarities.push(r);
		        }
		    });
		});

        var $select = $('<select>').addClass('crate-filter-select');
        $select.append($('<option>').val('').text('Alle Seltenheiten'));
        rarities.sort().forEach(function (r) {
            $select.append($('<option>').val(r).text(r));
        });

        // Kategorien sammeln
		var categories = [];
		
		$table.find('tbody tr').each(function () {
		    var $cells = $(this).find('td');
		    var idx = $cells.length >= 6 ? 3 : 2;
		
		    var raw = $cells.eq(idx).text().trim();
		
		    raw.split(',').forEach(function (c) {
		        c = c.trim();
		        if (c && !categories.includes(c)) {
		            categories.push(c);
		        }
		    });
		});

        var $selectCat = $('<select>').addClass('crate-filter-select');
        $selectCat.append($('<option>').val('').text('Alle Kategorien'));
        categories.sort().forEach(function (c) {
            $selectCat.append($('<option>').val(c).text(c));
        });

        var selectedRarity = "";
		var selectedCategory = "";
		
		var $rarityDropdown = createDropdown(
		    ['Alle Seltenheiten'].concat(rarities),
		    'Alle Seltenheiten',
		    function(val){
		        selectedRarity = val === 'Alle Seltenheiten' ? '' : val;
		        applyFilter();
		    }
		);
		
		var $categoryDropdown = createDropdown(
		    ['Alle Kategorien'].concat(categories),
		    'Alle Kategorien',
		    function(val){
		        selectedCategory = val === 'Alle Kategorien' ? '' : val;
		        applyFilter();
		    }
		);
		
		$wrapper.append($input, $rarityDropdown, $categoryDropdown);

        $table.wrap('<div class="crate-table-wrapper"></div>');
        $table.parent().before($wrapper);

        function applyFilter() {
            var search = $input.val().toLowerCase();
            var selRarity = selectedRarity.toLowerCase();
	var selCat = selectedCategory.toLowerCase();

	$table.find('tbody tr').each(function () {
	    var $cells = $(this).find('td');
	
	    var idx = $cells.length >= 6 ? 3 : 2;
	    var rarityIdx = $cells.length >= 6 ? 2 : 1;
	
	    var text = $(this).text().toLowerCase();
	    var rarity = $cells.eq(rarityIdx).text().toLowerCase();

	    var rawCat = $cells.eq(idx).text().toLowerCase();
	    var catList = rawCat.split(',').map(function(c){
	        return c.trim();
	    });
	
	    var matchSearch = !search || text.includes(search);
	    var matchRarity = !selRarity || rarity.includes(selRarity);
	
	    var matchCat = !selCat || catList.some(function(c){
	        return c === selCat;
	    });
	
	    $(this).toggle(matchSearch && matchRarity && matchCat);
            });
        }

        $input.on('input', applyFilter);
        $select.on('change', applyFilter);
        $selectCat.on('change', applyFilter);
        
        
    });
});

function createDropdown(options, placeholder, onChange){
    var $dropdown = $('<div>').addClass('cb-dropdown');
    var $toggle = $('<div>').addClass('cb-dropdown-toggle').text(placeholder);
    var $menu = $('<div>').addClass('cb-dropdown-menu');

    options.forEach(function(opt){
        var $item = $('<div>')
            .addClass('cb-dropdown-item')
            .text(opt)
            .on('click', function(e){
                e.stopPropagation();

                $toggle.text(opt);
                $dropdown.removeClass('open');
                onChange(opt);
            });

        $menu.append($item);
    });

    $toggle.on('click', function(e){
        e.stopPropagation();

        $('.cb-dropdown').not($dropdown).removeClass('open');
        $dropdown.toggleClass('open');
    });

    $(document).off('click.cbDropdown').on('click.cbDropdown', function(){
        $('.cb-dropdown').removeClass('open');
    });

    $dropdown.append($toggle, $menu);
    return $dropdown;
}

document.addEventListener("click", function(e) {
    const btn = e.target.closest(".cb-syntax-copy");
    if (!btn) return;

    const box = btn.closest(".cb-syntax-box");
    const code = box.querySelector(".cb-syntax-code");

    const text = code.innerText.trim();
    if (!text) return;

    navigator.clipboard.writeText(text);

    // Feedback
    btn.textContent = "✔";
    box.style.borderLeftColor = "#54FB54";

    setTimeout(() => {
        btn.textContent = "⧉";
        box.style.borderLeftColor = "#1f86c1";
    }, 800);
});