/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */

document.querySelectorAll('.research-collapsible-button').forEach(btn => {
	btn.addEventListener('click', () => {
		const isActive = btn.classList.toggle('active');
		btn.textContent = isActive ? 'Закрыть' : 'Посмотреть';
	});
});

document.querySelectorAll('.navbox-button').forEach(btn => {
	btn.addEventListener('click', () => {
		const isActive = btn.classList.toggle('active');
		
		const wrapper = btn.closest('.navbox-wrapper');
		const container = wrapper.querySelector('.navbox-container');

		if (isActive) {
			container.classList.add('active');
		} else {
			container.classList.remove('active');
		}
	});
});


$(document).ready(function() {
    // Create and append the search input field
    var searchInput = $('<input class="bfw-search" type="text" autocomplete="off" id="searchInput" placeholder="Ввести название..." style="width: 100%;">');
    $('#search').append(searchInput);
    
    // Create and append the dropdown for category selection
    var dropdown = $('<select class="bfw-filter" id="category"><option value="all">Все</option><option value="fruit-type-физический">Физические</option><option value="fruit-type-звериный">Звериные</option><option value="fruit-type-элементальный">Элементальные</option></select>');
    $('#filter').append(dropdown);

    // Function to filter items
    function filterItems() {
        var searchTerm = $('#searchInput').val().toLowerCase();
        var selectedCategory = $('#category').val();

        // Filter only direct children of #itemList
        $('#itemList > div').each(function() {
            var itemId = $(this).attr('id') ? $(this).attr('id').toLowerCase() : '';
            var itemText = $(this).text().toLowerCase();
            var itemCategory = $(this).data('category');

            // Check if search term matches ID or text at the beginning
            var matchesSearch = (searchTerm === '' || itemId.startsWith(searchTerm) || itemText.startsWith(searchTerm));
            
            // Check if the item matches the selected category from dropdown
            var matchesCategory = (selectedCategory === 'all' || itemCategory === selectedCategory);


            // Show or hide item based on search and category match
            if (matchesSearch && matchesCategory) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }

    // Event listeners for input and dropdown changes
    $('#searchInput').on('input', filterItems);
    $('#category').on('change', filterItems);
});