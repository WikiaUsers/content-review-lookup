//importArticle({ type: 'style', article: 'MediaWiki:Common.css' });

!function($, mw) {
    'use strict';

	function init() {
    if (window.ItemsInvoked) {
        return;
    }
    window.ItemsInvoked = true;

    var searchDiv = document.querySelector('.search');
        searchDiv.innerHTML = '<input type="text" class="search-item" autocomplete="off" placeholder="Выбери фильтр или впиши предмет&hellip;">';
 
        var itemsList = document.querySelectorAll('.items');
        var items = document.querySelectorAll('.item');
        var texts = [];
        for (var i = 0; i < items.length; ++i) {
            texts.push(items[i].getElementsByTagName('span')[0].innerText);
        }

        var searchInput = document.querySelector('.search-item');
        searchInput.addEventListener('input', search);
        function search(e) {
            var input = searchInput.value;
 
            for (var i = 0; i < items.length; i++) {
                var itemText = texts[i];
 
                if (itemText.toLowerCase().indexOf(input.toLowerCase()) > -1) {
                    items[i].style.display = 'inline-block';
                } else {
                    items[i].style.display = 'none';
                }
            }
        }
 
        // Кнопки фильтров
        $('.filter-but').click(function() {
            $('.filter-but').removeClass('active_ita');
            $(this).addClass('active_ita').siblings().removeClass('active_ita');

            searchInput.value = $(this).find('.filter-one').text();
            searchInput.dispatchEvent(new Event('input', { bubbles: true }));
            
            if ($(this).is('#tb-transf')) {
            	$('.item').addClass('tb-transb');
            } else {
            	$('.item').removeClass('tb-transb');
            }
        });
        // Кнопка сброса поиска
        $('.ita_def').click(function() {
            searchInput.value = '';
            searchInput.dispatchEvent(new Event('input', { bubbles: true }));
            $('.item').removeClass('tb-transb');
        });    
 
        // Кнопки сортировки
        var rentableSort = document.querySelector('.rentable_sort > p');
        rentableSort.addEventListener('click', sortBy);
 
        function sortBy(e) {
            var data = e.target.dataset.sort;
 
            itemsList.forEach(function(el) {
                [].slice.call(el.children).sort(function(a, b) {
                    var x, y;

                    if (data === 'tid') {
                        x = parseInt(b.getAttribute('data-' + data), 10);
                        y = parseInt(a.getAttribute('data-' + data), 10);
                    } else {
                        var x = b.getAttribute('data-' + data).toLowerCase();
                        var y = a.getAttribute('data-' + data).toLowerCase();
                    }
 
                    return (x < y ? 1 : -1);
                }).forEach(function(val, index) {
                    el.appendChild(val);
                });
            });
        }
	}
	

    init();
}( this.jQuery, this.mediaWiki );