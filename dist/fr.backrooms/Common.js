// [[Category:Internal]]

// For [[Module:CSS]]; [[T:CSS]] dependency
mw.hook("wikipage.content").add(function () {
	$("span.import-css").each(function () {
		var css = mw.util.addCSS($(this).attr("data-css"));
		$(css.ownerNode).addClass("import-css").attr("data-css-hash", $("span.import-css").attr("data-css-hash")).attr("data-from", $("span.import-css").attr("data-from"));
	});
});

// UserTags config
window.UserTagsJS = {
	modules: {},
	tags: {
		inactive: { order: -2 },
		bot: { link:'Help:Bots', order: -1 },
		bureaucrat: { order: 0 },
		sysop: { order: 1 },
		'content-moderator': { order: 2 },
		threadmoderator: { order: 3 }
	}
};

UserTagsJS.modules.inactive = { days: 90, zeroIsInactive: true };
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.newuser = false;
UserTagsJS.modules.metafilter = false;

// Credits to https://sky-children-of-the-light.fandom.com/wiki/MediaWiki:Common.js
$('.fandom-community-header__community-name-wrapper').append(
	$('<a/>').addClass('compass-wiki-badge').attr('href', '//community.fandom.com/wiki/Fandom_Compass').append(
		$('<img/>').css('height', '60px').css('position', 'relative').css('top', '10px')
		.attr('src', 'https://static.wikia.nocookie.net/sky-children-of-the-light/images/a/a2/FandomCompass-Banner-Light.png/revision/latest/scale-to-width-down/100?cb=20230720221916').attr('title', 'This wiki is part of Fandom Compass')
));

// Crée un élément de chatbot sur la page avec des IDs pour le CSS
const chatbotContainer = document.createElement('div');
chatbotContainer.id = 'chatbot-container';
document.body.appendChild(chatbotContainer);

// Crée un conteneur pour afficher les messages avec un ID
const chatBox = document.createElement('div');
chatBox.id = 'chat-box';
chatbotContainer.appendChild(chatBox);

// Crée un champ de saisie avec un ID pour le style CSS
const input = document.createElement('input');
input.type = 'text';
input.id = 'chat-input';
input.placeholder = 'Tapez votre message...';
chatbotContainer.appendChild(input);

// Fonction pour afficher la réponse du bot
function botReply(message) {
    const botMessage = document.createElement('div');
    botMessage.className = 'bot-message';
    botMessage.textContent = message;
    chatBox.appendChild(botMessage);
    chatBox.scrollTop = chatBox.scrollHeight; // défile jusqu'au bas
}

// Fonction pour afficher le message de l'utilisateur
function userMessage(message) {
    const userMsg = document.createElement('div');
    userMsg.className = 'user-message';
    userMsg.textContent = message;
    chatBox.appendChild(userMsg);
    chatBox.scrollTop = chatBox.scrollHeight; // défile jusqu'au bas
}

// Analyse et réponse aux messages
function handleUserMessage(message) {
    let response = '';

    // Exemple de réponses basées sur des mots-clés
    if (message.includes('bonjour')) {
        response = 'Bonjour ! Comment puis-je vous aider ?';
    } else if (message.includes('aide')) {
        response = 'Je suis là pour répondre à vos questions. Que voulez-vous savoir ?';
    } else if (message.includes('Fandom')) {
        response = 'Fandom est une plateforme pour les communautés de fans. Vous pouvez y trouver des informations sur divers sujets !';
    } else {
        response = "Je ne suis pas sûr de comprendre. Pouvez-vous reformuler ?";
    }

    botReply(response);
}

// Événement pour envoyer le message utilisateur
input.addEventListener('keypress', function(event) {
    if (event.key === 'Enter' && input.value.trim() !== '') {
        const userInput = input.value.trim();
        userMessage(userInput);
        handleUserMessage(userInput);
        input.value = ''; // Efface le champ de saisie
    }
});