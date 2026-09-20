/* Any JavaScript here will be loaded for all users on every page load. */

// Configure and import WelcomeMessage

window.welcomeMessage = {
  enabled: true,
  adminUsername: 'Sketch, Ninja of the Pen',
  adminNickname: 'Sketch',
  messageTitle: 'Welcome to Ninjago Fanfiction Wiki!',
  messageText: 'Hey $1! I\'m $3, an administrator here.\n\nThanks for your contribution on <a href="ninjago-fanon.fandom.com/wiki/$2">$2</a>. If you haven\'t already, make sure you have read and understand the <a href="ninjago-fanon.fandom.com/wiki/Ninjago_Fanon_Wiki:Policy">wiki policy</a>. If you have any questions, don\'t hesitate to reach out.\n\nThanks,\n$3',
};

importArticles({
  type: 'script',
  articles: [
    'dev:MediaWiki:WelcomeMessage.js'
  ]
});