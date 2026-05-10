/* Para importar scripts de Javascript desde dev.fandom ir a https://howtotrainyourdragon.fandom.com/es/wiki/MediaWiki:ImportJS */

// WelcomeMessage - Configuración opcional
window.welcomeMessage = {
  enabled: true,
  adminUsername: 'Foreverwing',     // $4
  adminNickname: 'Foreverwing',    // $3
  messageTitle: '¡Bienvenido/a a Cómo Entrenar a tu Dragón Wiki!',
  messageText: 'Hola $1, yo soy $3, uno de los [[Cómo entrenar a tu Dragón Wiki:Administración#Administradores de este wiki|administradores de esta wiki]], y en nombre de nuestra comunidad, te quiero dar la bienvenida y agradecer por tu edición en <a href="wikiurl.fandom.com/wiki/$2">$2</a>.\n\nSi necesitas ayuda para comenzar, te invitamos a revisar nuestro [[Cómo entrenar a tu Dragón Wiki:Portal de la comunidad|Portal de la comunidad]] y ante cualquier pregunta, problema o propuesta que tengas, no dudes en escribir a [[Muro:Foreverwing|mi Muro de Mensajes]], o al de [[Usuario:Tormenta934|Tormenta934]], quien es también Administrador de esta wiki. Recordamos que los administradores no somos empleados de [https://about.fandom.com/what-is-fandom Fandom, Inc.], ni guardamos ningún otro tipo de relación con la empresa, además que cada uno tiene una vida independiente de la wiki, con sus correspondientes responsabilidades, obligaciones e inconvenientes. Por lo que en caso de que te contactes con cualquiera de nosotros, aunque hacemos lo humanamente posible por responder cuanto antes, le rogamos que sepa disculpar las posibles demoras de nuestra parte.\n\nTe invitamos a explorar nuestra [https://howtotrainyourdragon.fandom.com/es/f sección de Discusiones], para compartir y conversar ideas, opiniones, fanart, noticias y actualizaciones relacionadas con Cómo Entrenar a tu Dragón con la comunidad de la wiki en su conjunto. También te podría interesar consultar las [[Blog:Entradas recientes|Entradas de Blog]], un tipo de publicaciones de la comunidad de mayor complejidad que las Discusiones, entre las que se incluyen los [[:Categoría:Anuncios de la Administración|Anuncios de la Administración]].\n\nPor último, sugerimos revisar las [[Cómo entrenar a tu Dragón Wiki:Reglas|Reglas de la wiki]], y comentamos que esta wiki esta afiliada a la [https://confederacion-hispana.fandom.com/es/wiki/Confederaci%C3%B3n_de_Fandom_Hispano_Wiki Confederación de Fandoms Hispanos]. Si necesitas ayuda general, ingresa a [https://comunidad.fandom.com/wiki/Comunidad_Central Comunidad Central].',
  debug: false,
  testAllEdits: false,
  preferTalk: false,
};

// WelcomeMessage.js importado desde https://dev.fandom.com/
importArticles({
  type: 'script',
  articles: [
    'u:dev:MediaWiki:WelcomeMessage.js'
  ]
});