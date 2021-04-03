/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

//Стиль кнопки назад (Back to top)
window.BackToTopModern = true;

/*************************************************/
/* Prevents tooltips from going off side of page */
/*************************************************/

$( '#mw-content-text' ).on( {
	mouseenter: function() {
		var $tooltipContainer = $( this );
		var $tooltip = $tooltipContainer.find( '.tooltipin' );
		// Make sure it's on the page so it's not being squished
		// before getting width
		$tooltip.css( 'right', 0 );
		var tooltipWidth = $tooltip.outerWidth();
		$tooltip.css( 'right', '' );
		
		if ( $tooltip.offset().left + tooltipWidth > $( window ).width() ) {
			$tooltip.css(
				'margin-left',
				-( tooltipWidth - $tooltipContainer.width() - 1 )
			);
		}
	},
	mouseleave: function() {
		$( this ).find( '.tooltipin' ).css( 'margin-left', '' );
	}
}, '.tooltipskill' );

/************************************************************/
/* Removes 'title' attr from 'a' tag with '.tooltip' parent */
/************************************************************/

$( '#mw-content-text' ).on( 'mouseenter', '.tooltipskill', function() {
	$( this ).find( 'a[title]' ).removeAttr( 'title' );
} );


/*************************************************/
/* Adds show-hide style */
/*************************************************/
var coll = document.getElementsByClassName("show_hide");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content_show_hide = this.nextElementSibling;
    if (content_show_hide.style.display === "block") {
      content_show_hide.style.display = "none";
    } else {
      content_show_hide.style.display = "block";
    }
  });
}

// AJAX-обновление некоторых страниц(выбор страниц)
/*var ajaxPages = [
    "Служебная:Watchlist",
    "Служебная:Contributions",
    "Служебная:WikiActivity",
    "Служебная:RecentChanges"
];
var AjaxRCRefreshText = 'автообновление страницы'; //Отображаемое название
 
var PurgeButtonText = 'Обновить'; //Отображаемое название*/
 
/*Показ IP анонимов в комментариях*/
/*window.RevealAnonIP = {
    permissions: ['rollback', 'sysop', 'bureaucrat']
};*/