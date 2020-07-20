/* Tout JavaScript ici sera chargé pour chaque page visitée par n’importe quel utilisateur. */

if (wgPageName === "SVQ") {
    $(document).ready(function() {
        var numitemsuhp = $(".svq-uhp li").length,
            numitemsmr = $(".svq-mr li").length,
            svqInfosUhp = [],
            svqInfosMr = [];
        $( '#svqHasard' ).click(function() {
            $(".svq-uhp li").each(function() {
                svqInfosUhp.push($( this ).html());
            });
            var svqRandom = Math.floor(Math.random()*svqInfosUhp.length);
            $(".svq-mr li").each(function() {
                svqInfosMr.push($( this ).html());
            });
            var svqRandomMr = Math.floor(Math.random()*svqInfosMr.length);
            $( '.svqHasardBox' ).html('<br>Univers HP : <b>' + svqInfosUhp[svqRandom] + '</b><br><br>Monde réel : <b>' + svqInfosMr[svqRandomMr] + '</b>');
        });
        $(".nbinfo-uhp").text(numitemsuhp);
        $(".nbinfo-mr").text(numitemsmr);
    });
}

$( document ).ready(function() {
    $('.rcoptions a:nth-child(19)').before('<span class="rc-rmv-btn-spn"><a class="rc-rmv-btn" style="text-decoration: none; color: #6b979c">Afficher</a> les modifs d\'Hulothe • </span>');
    $( "a.rc-rmv-btn" ).hover(function() {
        $( this ).css({ "text-decoration": "underline", "cursor": "pointer" });
    });
    $('.rc-rmv-btn').click(function() {
        $('.rc-rmvd').show();
        $( this ).addClass('rc-rmv-btn2');
        $( this ).removeClass('rc-rmv-btn');
        $( this ).text("Masquer");
        $('.rc-rmv-btn2').click(function() {
            $('.rc-rmvd').hide();
            $('.rc-rmv-btn-spn').text("");
        });
    });
    $( "div.rc-conntent table.mw-enhanced-rc" ).each(function() {
        var mdfHltRc = $( this ).find( "tbody tr td a.mw-userlink" );
        var mdfHltRct = mdfHltRc.text();
        if(mdfHltRct.match('Hulothe')) {
            $( this ).hide();
            $( this ).addClass('rc-rmvd');
        }
    });
});