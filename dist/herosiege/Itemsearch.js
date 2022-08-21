/* DROPDOWN ITEM TYPE */
$('#dropdown_list').append(
'<b>Item Slot:</b><br /><select id="dropdown_item_type" size="1">'+ 
  '<option value="helmets" selected="selected">Helmets</option>' +
  '<option value="amulets">Amulets</option>' +
  '<option value="charms">Charms</option>' +
  '<option value="armours">Armours</option>' +
  '<option value="shields">Shields</option>' +
  '<option value="belts">Belts</option>' +
  '<option value="gloves">Gloves</option>' +
  '<option value="boots">Boots</option>' +
  '<option value="rings">Rings</option>' +
  '<option value="potions">Potions</option>' +
'</select>'
);

$(document).ready(function ()
{
	$('#search_list_helmets_img').show();
	
	$("#dropdown_list").change(function() {
		$('#search_list_helmets_img').hide();
		$('#search_list_amulets_img').hide();
		$('#search_list_charms_img').hide();
		$('#search_list_armours_img').hide();
		$('#search_list_shields_img').hide();
		$('#search_list_belts_img').hide();
		$('#search_list_gloves_img').hide();
		$('#search_list_boots_img').hide();
		$('#search_list_rings_img').hide();
		$('#search_list_potions_img').hide();
		
        if ($('option:selected').text() === 'Helmets') {
        	$('#search_list_helmets_img').show();
		}
		else if ($('option:selected').text() === 'Amulets'){
			$('#search_list_amulets_img').show();
		}
		else if ($('option:selected').text() === 'Charms'){
			$('#search_list_charms_img').show();
		}
		else if ($('option:selected').text() === 'Armours'){
			$('#search_list_armours_img').show();
		}
		else if ($('option:selected').text() === 'Shields'){
			$('#search_list_shields_img').show();
		}
		else if ($('option:selected').text() === 'Belts'){
			$('#search_list_belts_img').show();
		}
		else if ($('option:selected').text() === 'Gloves'){
			$('#search_list_gloves_img').show();
		}
		else if ($('option:selected').text() === 'Boots'){
			$('#search_list_boots_img').show();
		}
		else if ($('option:selected').text() === 'Rings'){
			$('#search_list_rings_img').show();
		}
		else if ($('option:selected').text() === 'Potions'){
			$('#search_list_potions_img').show();
		}
    });
});

/* Checkboxes */
    $('#item_checkbox_physical').html(
        '<input type="checkbox" id="search_checkbox" /> Physical'
    );

    $('#item_checkbox_fire').html(
        '<input type="checkbox" id="search_checkbox" /> Fire'
    );
    $('#item_checkbox_cold').html(
        '<input type="checkbox" id="search_checkbox" /> Cold'
    );
    $('#item_checkbox_wind').html(
        '<input type="checkbox" id="search_checkbox" /> Wind'
    );
    $('#item_checkbox_poison').html(
        '<input type="checkbox" id="search_checkbox" /> Poison'
    );
    $('#item_checkbox_lightning').html(
        '<input type="checkbox" id="search_checkbox" /> Lightning'
    );
    $('#item_checkbox_magic').html(
        '<input type="checkbox" id="search_checkbox" /> Magic'
    );
    $('#item_checkbox_elemental').html(
        '<input type="checkbox" id="search_checkbox" /> Elemental'
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