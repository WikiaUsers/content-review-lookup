/* Modifications du forum */

jQuery(function ($) {
    "use strict";

    // Note en tête de forum
    $('.boards').prepend("<div style='background:#3055b2; text-align:center; color:white; text-shadow: #555 1px 1px 3px; padding:2px;'>Bienvenue sur le forum de Les Sims Wiki<br>C'est l'endroit idéal pour lancer des discussions, poser des questions et interagir avec la communauté du wiki.<br>S'il s'agit de votre première visite sur le forum de Les Sims Wiki, veuillez cliquer sur le bouton « Règles du forum / FAQ » ci-dessus afin de vous familiariser avec le fonctionnement de ce forum ainsi que ses règles.</div>");

    // Avertissement lors de la rédaction d'une réponse (source : http://naruto.wikia.com/wiki/MediaWiki:Common.js/ForumChanges.js)
    $(".new-reply .MiniEditorWrapper").last().before("<small>Avant de publier, veuillez vous assurer que votre réponse respecte les <a href='/wiki/MediaWiki:Forum-policies-and-faq'>règles du forum</a> et les <a href='http://fr.wikia.com/Conditions_d%27utilisation'>conditions d'utilisation de Wikia</a>. Les réponses non conformes seront modifiées ou retirées.</small>");
 
    // Avertissement lors de la création d'un nouveau fil (source : http://naruto.wikia.com/wiki/MediaWiki:Common.js/ForumChanges.js)
    $(".ForumNewMessage .heading").after("<small>Avant de créer une nouvelle discussion, veuillez avant tout vérifier si une discussion sur le sujet n'existe pas déjà. Si ce n'est pas le cas, créez une nouvelle discussion, tout en vous assurant de respecter les <a href='/wiki/MediaWiki:Forum-policies-and-faq'>règles du forum</a> et les <a href='http://fr.wikia.com/Conditions_d%27utilisation'>conditions d'utilisation de Wikia</a>. Les discussions non conformes seront modifiées ou retirées.</small>");
 
});