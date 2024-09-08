/* Coût des héros */
if ($.inArray("Héros", wgCategories) > -1) {
    $(function () {
        var herostimeline = "0|0.5|1|1.5|2|2.5|3|3.5|4|4.5|5|5.5|6|6.5|7|7|7|7|7|7|7|7|7|7|7|7|7|7|7|7|7|7|7|7|7|7|7|7|7|7|7|7|7|7|7|7|7|7|7|7";
        var kingcostline = "10000|12500|15000|17500|20000|22500|25000|27500|30000|32500|35000|39000|43000|47000|51000|55000|60000|65000|70000|75000|80000|85000|90000|95000|100000|105000|110000|115000|120000|125000|129000|133000|137000|141000|145000|149000|153000|157000|161000|165000|170000|173000|176000|179000|182000|185000|188000|191000|194000|197000";
        var queencostline = "40000|22500|25000|27500|30000|32500|35000|39000|43000|47000|51000|55000|59000|63000|67000|71000|75000|80000|85000|90000|95000|100000|105000|110000|115000|119000|123000|127000|131000|135000|139000|143000|147000|151000|155000|159000|163000|167000|171000|175000|180000|182000|184000|186000|188000|190000|192000|194000|196000|198000";
        var grandwardencostline = "6000000|2500000|3000000|3500000|4000000|4500000|5000000|5500000|6000000|6500000|7000000|7500000|8000000|8400000|8800000|9100000|9400000|9600000|9800000|10000000";
		if (wgPageName == "Grand_gardien") {
		$('.heroscost').html('Coût pour améliorer le héros du niveau <input type="number" style="width:10%" min="1" max="20" value="1"> au niveau <input style="width:10%" type="number" min="1" max="20" value="20"><div class="button">Calculer le coût</div>&nbsp;<span>0</span>');
		}else { $('.heroscost').html('Coût pour améliorer le héros du niveau <input type="number" style="width:10%" min="1" max="50" value="1"> au niveau <input style="width:10%" type="number" min="2" max="50" value="50"><div class="button">Calculer le coût</div>&nbsp;<span>0</span>');
		}
		$('.heroscost div.button').click(function () {
            $('.heroscost input[type="number"]').each(function () {
                if (!$.isNumeric($(this).val())) {
                    alert('Entrer une valeur valide !');
                    return;
                }
            });
            if (Math.floor($('.heroscost input[type="number"]:eq(0)').val()) > Math.floor($('.heroscost input[type="number"]:eq(1)').val())) {
                alert('Et non ! Une valeur est fausse ;)');
                return;
            }
            var total = 0;
            var totaltime = 0;
            var herostime = herostimeline.split('|');
            if (wgPageName == "Roi_des_barbares") {
                var kingcost = kingcostline.split('|');
                for (i = $('.heroscost input[type="number"]:eq(0)').val() - 0; i < $('.heroscost input[type="number"]:eq(1)').val(); i++) {
                    total += Math.floor(kingcost[i]);
                    totaltime += Math.floor(herostime[i] * 10) / 10;
                }
            } else if (wgPageName == "Reine_des_archers") {
                var queencost = queencostline.split('|');
                for (i = $('.heroscost input[type="number"]:eq(0)').val() - 0; i < $('.heroscost input[type="number"]:eq(1)').val(); i++) {
                    total += Math.floor(queencost[i]);
                    totaltime += Math.floor(herostime[i] * 10) / 10;
                }
            } else if (wgPageName == "Grand_gardien") {
                var grandwardencost = grandwardencostline.split('|');
                for (i = $('.heroscost input[type="number"]:eq(0)').val() - 0; i < $('.heroscost input[type="number"]:eq(1)').val(); i++) {
                    total += Math.floor(grandwardencost[i]);
                    totaltime += Math.floor(herostime[i] * 10) / 10;
                }
            }
            var spantime;
            if (totaltime == Math.floor(totaltime)) {
                spantime = totaltime + 'j';
            } else {
                spantime = Math.floor(totaltime) + 'j 12h';
            }
			if (wgPageName == "Grand_gardien") {
				$('.heroscost span').html(numberWithCommas(total) + " élixir et " + spantime);
			} else {
				$('.heroscost span').html(numberWithCommas(total) + " élixir noir et " + spantime);
			}
        });
    });
}