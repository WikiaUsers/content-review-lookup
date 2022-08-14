$('#rezless').append(
'<select id="dropdown_item_type" size="1">'+ 
  '<option value="helmet" selected="selected">Helmet</option>' +
  '<option value="amulet">Amulet</option>' +
  '<option value="charm">Charm</option>' +
'</select>'
);

$('#rezless :selected').change(function(){
	if ($(this).is(':selected')) {
		$('search_list_helmets_img').style.display = 'inherit';
	}
});


/* Checkboxes */
    $('#item_checkbox_helmet').html(
        '<input type="checkbox" id="search_checkbox" /> Helmets'
    );
    $('#item_checkbox_helmet').change(function() {
        if ($(this).is(':checked')) {
            $('search_list_helmets_img').style.display = 'inherit';
        }          
        else { 
            $('search_list_helmets_img').style.display = 'none';
      }
    });
    $('#item_checkbox_amulet').html(
        '<input type="checkbox" id="search_checkbox" /> Amulets'
    );
    $('#item_checkbox_charm').html(
        '<input type="checkbox" id="search_checkbox" /> Charms'
    );
    $('#item_checkbox_armour').html(
        '<input type="checkbox" id="search_checkbox" /> Armours'
    );
    $('#item_checkbox_shield').html(
        '<input type="checkbox" id="search_checkbox" /> Shields'
    );
    $('#item_checkbox_belt').html(
        '<input type="checkbox" id="search_checkbox" /> Belts'
    );
    $('#item_checkbox_gloves').html(
        '<input type="checkbox" id="search_checkbox" /> Gloves'
    );
    $('#item_checkbox_boots').html(
        '<input type="checkbox" id="search_checkbox" /> Boots'
    );
    $('#item_checkbox_ring').html(
        '<input type="checkbox" id="search_checkbox" /> Rings'
    );
    $('#item_checkbox_potion').html(
        '<input type="checkbox" id="search_checkbox" /> Potions'
    );
/* End Checkboxes */
    $('#item_search').html(
        '<input type="text" id="search_input">'
    );
    $('#item_search_btn').click(function() {
        var query = $('#search_input').val().toLowerCase();
        $('#search_input').val('');
        if (query === '') {
            return;
        }
        var results = [];
        $.each(search_result_baseinfo, function (i, v) {
            if (v.name.toLowerCase().includes(query)) {
                results.push(v);
            } 
        });
    });
    $('#search_input').keypress(function(e) {
        if (e.which == 13) { //Enter key
            $('#item_search_btn').click();
        }
    });