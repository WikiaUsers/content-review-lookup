/* Any JavaScript here will be loaded for all users on every page load. */

window.welcomeMessage = {
  enabled: true,
  messageTitle: 'Welcome to the Magical Sisters LuluttoLilly Wiki!',
  messageText: 'Hello $1 — I\'m $4.\n\nThanks for your edit on <a href="magical-sisters-luluttolilly.fandom.com/wiki/$2">$2</a>.\n\nIf you need help getting started, check out our help pages or contact me or another admin here. We ask that all users read through our Guidelines before editing. For general help, there\'s Community Central where you\'re welcome to explore the help forum and blog.\n\nEnjoy your time at the Magical Sisters LuluttoLilly Wiki and happy editing!',
  debug: false,
  testAllEdits: false,
  preferTalk: false,
};

importArticles({
  type: 'script',
  articles: [
    'dev:MediaWiki:WelcomeMessage.js'
  ]
});