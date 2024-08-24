.ec-stars-wrapper {
	/* Espacio entre los inline-block (los hijos, los `a`) 
	   http://ksesocss.blogspot.com/2012/03/display-inline-block-y-sus-empeno-en.html */
	font-size: 20;
	/* Podr�amos quitarlo, 
		pero de esta manera (siempre que no le demos padding), 
		s�lo aplicar� la regla .ec-stars-wrapper:hover a cuando
		tambi�n se est� haciendo hover a alguna estrella */
	display: inline-block;
}
.ec-stars-wrapper a {
	text-decoration: none;
	display: inline-block;
	/* Volver a dar tama�o al texto */
	font-size: 32px;
	font-size: 2rem;
	
	color: #000000;
}

.ec-stars-wrapper:hover a {
	color: rgb(39, 130, 228);
}
/*
 * El selector de hijo, es necesario para aumentar la especifidad
 */
.ec-stars-wrapper > a:hover ~ a {
	color: #888;
}