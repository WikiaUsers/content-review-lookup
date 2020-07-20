$(document).ready(function() {
    if ($("body").hasClass("ns-120") || wgPageName === "MeerUndMehr:Portale" || wgPageName === "MeerUndMehr:Portale/Genre" || $("body").hasClass("ns-10") || $("body").hasClass("mainpage")) {

        if ($("body").hasClass("ns-10") || $("body").hasClass("mainpage")) {
		    $("body").append("<style>#portal-Drachenz-hmen-leichtgemacht .mehrImPortal { font-size: 90%; } 	.portalBanner, .portal-list span a, .portal-list li a { display: none; } 	.portalBanner1 { display: inline; } 	</style>");
	    } else {
		    $("body").append("<style>#portal-Drachenz-hmen-leichtgemacht .mehrImPortal { font-size: 90%; }</style>");
	    }
	
	    $("body").append("<style>.gInfoBox + .gInfoBox { margin: 25px 0 0; } .geschichten-status { font-size: 7pt; line-height: 21px; text-align: center; transform: rotate(90deg); /* margin-top: -81px; margin-left: -56px; width: 113px; */     margin-top: 63px !important;    margin-left: -77px;     width: 150px; } .geschichte-logo { display: none !important; } .logo.alpha { width: 5px !important; } </style>");
		
	    var imgurl = 'https://vignette.wikia.nocookie.net/meerundmehr/images/e/e4/Portal-blau.png/revision/latest/scale-to-width/202';
 
	    $(".portal-list li").sort(function(a, b){return ($(b).text()) < ($(a).text());}).appendTo('.portal-list');
 
	    $('.portal-list a').unwrap();

    }

    setTimeout(function() {
        $('.carousel-wrapper#themen').fadeIn();
    }, 5000);
});

$(function() {
    if (mw.config.get('wgPageName') !== mw.config.get('wgMainPageTitle') && mw.config.get('wgNamespaceNumber') !== 120) { 
        return;
    }
    
    $('#portal-sort a').each(function() {
        var data_href = $(this).attr('href').replace(/.*\/wiki\//g, '');
        
        $.get(mw.config.get('wgServer') + '/wiki/' + data_href + '?action=render', function(d) {
            /* var d contains all HTML content of the retrieved page */
            var template_body = $(d).find('#x-geschichtenbalken-komplett > div').prop('outerHTML');
            
            $('#portal-sort a[href$="' + data_href +'"]').parent('li').replaceWith(template_body);
        });
    });
});