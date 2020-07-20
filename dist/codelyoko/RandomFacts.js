
$(document).ready(function(){
var options = [ 
    '<a href="http://codelyoko.wikia.com/wiki/Season_4">Season 4</a> was the first season with a different head writer than <a href="http://codelyoko.wikia.com/wiki/Sophie_Decroisette">Sophie Decroisette</a>? It had <a href="http://codelyoko.wikia.com/wiki/Bruno_Regeste">Bruno Regeste</a>.',
    '<a href="/wiki/Quantum_Cryptography" title="Quantum Cryptography" class="mw-redirect">Quantum Cryptography</a> is real?',
    'The first actress to play <a href="/wiki/Sissi" title="Sissi" class="mw-redirect">Sissi</a>, <a href="/wiki/Carole_Baillien" title="Carole Baillien">Carole Baillien</a>, played Big Boo in the French Dub of "Orange is the New Black"?',
    'There was going to be a <a href="/wiki/Code_Lyoko_MMORPG" title="Code Lyoko MMORPG">Code Lyoko MMORPG</a>, but it was cancelled?',
    '<a href="/wiki/Yumi" title="Yumi" class="mw-redirect">Yumi</a> has a stuffed Totoro from the Studio Ghibli movie "My Neighbor Totoro"? ' ,
    '<a href="/wiki/Diego_Mestanza" title="Diego Mestanza">Diego Mestanza</a> can sing?',
    'Code Lyoko\'s First Matte Painter, <a href="/wiki/Fr%C3%A9d%C3%A9ric_Perrin" title="Frédéric Perrin">Frédéric Perrin</a>, also worked on Skyland?',
    '<a href="/wiki/Franz_Hopper" title="Franz Hopper" class="mw-redirect">Franz Hopper</a> has the same last name of a famous Computer Engineer, Grace Hopper?',
    '<a href="/wiki/Boulogne-Billancourt" title="Boulogne-Billancourt">Boulogne-Billancourt</a> is a real neighborhood, and is the home of the TV company, TF1?',
    '<a href="/wiki/The_Factory" title="The Factory">The Factory</a> shown in Code Lyoko was a real factory that made Renault cars, but it was demolished?',
    '<a href="/wiki/Season_4" title="Season 4">Season 4</a> Never aired in Japan?',
    'The company that became <a href="http://codelyoko.wikia.com/wiki/France_Télévisions">France Télévisions</a> started the NTSC, PAL, and SECAM issue?',
    'The <a href="http://codelyoko.wikia.com/wiki/Siberian_Research_Facility"> Siberian Research Facility</a> is a real facility?',
    '<a href="http://codelyoko.wikia.com/wiki/Kadic_Academy">Kadic</a> is based on a real school in Paris, France? The school\'s name is Lycée Lakanal.',
    'One of <a href="http://codelyoko.wikia.com/wiki/Code_Lyoko_Evolution">Code Lyoko Evolution\'s</a> writers, <a href="http://codelyoko.wikia.com/wiki/Hadrien_Soulez_Larivi%C3%A8re"> Hadrien Soulez Larivière</a>, worked on an adult film?',
    '"<a href="http://codelyoko.wikia.com/wiki/Scyphozoa">Scyphozoa</a>" is the scientific name for the class of "True Jellyfish"? If you already knew that, you\'re a marine biology major.',
    'Many members of the <a href="http://codelyoko.wikia.com/wiki/Category%3AEnglish_voice_actors">English Dub Cast</a> also worked on the film "A Monster In Paris"?',
    '<a href="http://codelyoko.wikia.com/wiki/Melanie_Tran">Melanie Tran</a> is French Vietnamese, even though her character, <a href="http://codelyoko.wikia.com/wiki/Yumi_Ishiyama">Yumi Ishiyama</a> is Japanese?',
    '<a href="http://codelyoko.wikia.com/wiki/Code_Lyoko">Code Lyoko</a> won the <a href="https://en.wikipedia.org/wiki/Export_award">France Export Award</a> for Animation of 2006?',
    'Even though there was only one form of <a href="http://codelyoko.wikia.com/wiki/Megatank">Megatank</a> in the show, <a href="http://codelyoko.wikia.com/wiki/Code_Lyoko%3A_Quest_for_Infinity">Code Lyoko: Quest for Infinity</a> and <a href="http://codelyoko.wikia.com/wiki/Code_Lyoko%3A_Fall_of_X.A.N.A.">Fall of X.A.N.A.</a> introduced 2 additional varieties.', 
    '<a href="http://codelyoko.wikia.com/wiki/Odd_Della_Robbia">Odd Della Robia\'s</a> first English voice actor in <a href="http://codelyoko.wikia.com/wiki/Code_Lyoko">Code Lyoko</a> is also a <a href="http://codelyoko.wikia.com/wiki/Christophe_Caballero">drag queen</a>?'
];

var result = '<ul>';
for (var index = 0; index < 10; index++) {
var slot = Math.round(Math.random()*10000);
slot%=options.length;
result = result + "<li>" + options[slot] + "</li>"; options.splice(slot, 1); } result += '</ul>'; 
$("#RandomFacts").append(result);
});