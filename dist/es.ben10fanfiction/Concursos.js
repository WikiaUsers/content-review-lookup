/***** Concurso: Crea tu propio alien *****/

if( wgTitle == 'Nanomech25' || wgTitle == 'Gera29' || wgTitle == 'Ben10nyson' || wgTitle == 'BenTai137' ) {
   $('section#UserProfileMasthead ul.details li:last-child').after('<li><span>Premios</span>:<br />&bull; <a href="/wiki/Foro:Concurso: Crea tu propio alien">1º junto a otros tres usuarios al mejor alien.</a></li>');
}
 
/***** Concurso: El mejor episodio *****/
if( wgTitle == 'Soyelmejor' ) {
   $('section#UserProfileMasthead ul.details li:last-child').after('<li><span>Premios</span>:<br />&bull; <a href="/wiki/Foro:Concurso: El mejor episodio">1º puesto al mejor episodio.</a></li>');
}
if( wgTitle == 'GabyGwenTige' ) {
   $('section#UserProfileMasthead ul.details li:last-child').after('<li><span>Premios</span>:<br />&bull; <a href="/wiki/Foro:Concurso: El mejor episodio">2º puesto al mejor episodio.</a></li>');
}
if( wgTitle == 'Ben_Phantom' ) {
   $('section#UserProfileMasthead ul.details li:last-child').after('<li><span>Premios</span>:<br />&bull; <a href="/wiki/Foro:Concurso: El mejor episodio">3º puesto al mejor episodio.</a></li>');
}
/***** Ambos concursos *****/