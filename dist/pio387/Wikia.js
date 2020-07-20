/* Umieszczony tutaj kod JavaScript zostanie załadowany wyłącznie przez użytkowników korzystających ze skórki Wikia */
importArticles({
    type: 'script',
    articles: [
        'u:dev:ExtendedNavigation/code.js'
    ]
});

var newElement = [
 '<section class="module">',
 '   <h1>Co sądzisz o Śródziemie Wiki?</h1>',
 '   <p>By jeszcze bardziej ulepszyć nasz serwis, chcielibyśmy zachęcić Cię do wypełnienia krótkiej ankiety. Każdy głos jest dla nas ważny!</p>',
 '   <div style="margin-top: -16px; padding: 0; width: 100%; background-color: transparent;">',
 '      <table style="text-align: center; margin: 0px auto; padding: 2px; font-size: 120%; background-color: rgba(250,250,250,.2);">',
 '         <tr style="line-height: 15px; text-align: center;">',
 '            <td>',
 '         <br clear="all"/>',
 '               <a style="float: left; margin-right: 20px;" href="http://pl.lotr.wikia.com/wiki/%C5%9Ar%C3%B3dziemie_Wiki:Centrum_bada%C5%84_spo%C5%82eczno%C5%9Bci" class="wikia-button">Ankieta</a>',
 '            </td>',
 '         </tr>',
 '      </table>',
 '   </div>',
 '</section>'
 ].join('');
 
$('#WikiaRail').append(newElement);