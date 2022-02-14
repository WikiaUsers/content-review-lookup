setTimeout(function(){
		if(document.getElementsByClassName("rating-redirect") !== undefined){
			document.getElementsByClassName("rating-redirect")[0].innerHTML = "<div style='align:center; font-family:Trollhunters'>Want to vote; see <a class='shownlink' href='/wiki/Template:Rating/Retired'>here</a></div>";
		}	
	}, 5000
)