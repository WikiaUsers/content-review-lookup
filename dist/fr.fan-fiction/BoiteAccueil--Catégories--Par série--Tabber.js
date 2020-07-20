function Link(target) {
	var choix=document.getElementsByClassName('boite');
	for (i=0;i<choix.length;i++)
		{
		choix[i].style.display="none";
		}
	document.getElementById(target).style.display = 'block';
	};

function Make_Links() {
	document.getElementById('liens').innerHTML = 'coucou';
	};
Make_Links()