/**
 * Merci au wiki russe pour tout ça 
 * 
 */

!function($, mw) {
    'use strict';

	function init() {
	    if (window.ItemsInvoked) {
	        return;
	    }
	    window.ItemsInvoked = true;

	    var searchDiv = document.querySelector('.search');
	    searchDiv.innerHTML = '<input type="text" class="search-item" autocomplete="off" placeholder="Choisissez un filtre ou écrivez quelque chose">';
	
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
 
        // Boutons filtres
        $('.filter-type').click(function() {
            $('.filter-type').removeClass('active_filtre');
            $(this).addClass('active_filtre').siblings().removeClass('active_filtre');

            searchInput.value = $(this).find('.filter-one').text();
            searchInput.dispatchEvent(new Event('input', { bubbles: true }));
            
            if ($(this).is('#tb-transf')) {
            	$('.item').addClass('tb-transb');
            } else {
            	$('.item').removeClass('tb-transb');
            }
        });
        
        // Bouton de réinitialisation
        $('.rechercheObjet_clear').click(function() {
            searchInput.value = '';
            searchInput.dispatchEvent(new Event('input', { bubbles: true }));
            $('.item').removeClass('tb-transb');
        });    
 
        // Bouton de tri
        var rentableSort = $('.tableobjet_tri span');
        rentableSort.each(function(i, e) {
        	e.addEventListener('click', sortBy);
    	});

        function sortBy(e) {
        	console.log("Sort By: "+ e);
        	$('.curclick').removeClass('active_filtre');
            $(this).addClass('active_filtre').siblings().removeClass('active_filtre');
            var data = e.target.dataset.sort;
 
            itemsList.forEach(function(el) {
                [].slice.call(el.children).sort(function(a, b) {
                    var x, y;

			if (data === 'tid' || data === "quality") {
			  x = parseInt(b.getAttribute('data-' + data), 10);
			  y = parseInt(a.getAttribute('data-' + data), 10);
			} else {
			  var x = b.getAttribute('data-' + data).toLowerCase();
			  var y = a.getAttribute('data-' + data).toLowerCase();
			}
		
			if  (data === "quality") {
			  return (x > y ? 1 : -1);
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