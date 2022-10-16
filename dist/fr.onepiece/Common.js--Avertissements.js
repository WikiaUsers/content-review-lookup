importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:DiscussionTemplates.js',
    ]
});

window.DiscussionTemplates = {
    templates: {
    	'Spoil': {
            name: 'Template:Avertissement/Spoil',
            title: 'Avertissement - Spoils'
        },
        'Modifications pour les badges': {
            name: 'Template:Avertissement/Badges',
            title: 'Rappel - Modifications pour les badges'
        },
        'Vandalisme': {
            name: 'Template:Avertissement/Vandalisme',
            title: 'Avertissement - Vandalisme'
        },
        'Format image' : {
            name: 'Template:Avertissement/ImageFormat',
            title: 'Avertissement - Images de mauvais format'
        },
		'Images HS': {
            name: 'Template:Avertissement/ImageHS',
            title: 'Avertissement - Images Hors-Sujet'
        },
        'Nom Images': {
            name: 'Template:Avertissement/ImageTitre',
            title: 'Avertissement - Images mal nommées'
        },
        'Commentaires': {
            name: 'Template:Avertissement/Commentaires',
            title: 'Avertissement - Mauvais usage des commentaires'
        },
        'Catégories': {
            name: 'Template:Avertissement/Catégories',
            title: 'Rappel - Ajout de catégories'
        },
        'Blocage': {
            name: 'Template:Avertissement/Blocage',
            title: 'Sancton - Blocage du wiki'
        },
        'Messages Provoquants': {
            name: 'Template:Avertissement/Provocations',
            title: 'Avertissement - Messages provoquants'
        },
        'Messages HS': {
            name: 'Template:Avertissement/MessagesHS',
            title: 'Avertissement - Messages Hors-Sujet'
        },
    },
};


/***********************************************************************
 * Script basé sur celui de @Hulothe HP-fr wikia                  ******
 * Auteur: @Think D. Solucer
 * Revue : @KockaAdmiralac                                         ******
 **********************************************************************/
(function() {
    var config = mw.config.get([
        'wgNamespaceNumber',
        'wgUserGroups'
    ]);
    if(
        config.wgNamespaceNumber !== 1200 ||
        !/sysop|bureaucrat|rollback|content-moderator|chatmoderator|threadmoderator/.test(config.wgUserGroups.join(' '))
 
    ) {
        return;
    }
    var DATA = [
        'Avertos pour les articles/Images',
        {
            title: 'Avertissement - Spoils',
            body: '<p>Bonjour %USERNAME%,</p>' +
                  '<p>Merci pour tes récentes contributions sur One Piece Encyclopédie&nbsp;!</p>' +
                  '<p>Je dois cependant t\'informer que les modifications sur des sujets susceptibles de spoil sont interdites avant la sortie officielle du chapitre sur la plateforme MangaPlus. Celle-ci est généralement fixée au dimanche, à 17h00. Tu pourras de nouveau contribuer aux pages dès que le chapitre sera sorti.</p>' +
                  '<p>À bientôt&nbsp;:)</p>',
            reason: 'Pour spoils'
        },
        {
            title: 'Modifications pour les badges',
            body: '<p>Bonjour %USERNAME%,</p>' +
                  '<p>Merci pour tes récentes contributions sur One Piece Encyclopédie&nbsp;!</p>' +
                  '<p>Je dois cependant t\'informer que les modifications ayant pour but de gagner des badges sont interdites sur le wiki, et c\'est apparemment dans cette intention que tu as modifié des pages ou commenté des billets. Ne t\'en fais pas, tu gagneras des badges en modifiant, mais il ne faut pas que ça devienne un prétexte et une source de mauvaises contributions.</p>' +
                  '<p>Ce n\'est rien de grave, ne t\'inquiète pas, mais je te demande de tenir compte de ces recommandations à l\'avenir. Si tu as des questions, n\'hésite pas à m\'en faire part&nbsp;!</p>' +
                  '<p>À bientôt&nbsp;:)</p>',
            reason: 'Pour modifications pour les badges'
        },
        {
            title: 'Vandalisme',
            body: '<p>Bonjour %USERNAME%,</p>' +
                  '<p>Nous avons constaté que vous avez récemment effectué du vandalisme sur certaines pages du wiki.</p>' +
                  '<p>Vous êtes prié de cesser ce comportement contre-productif et contre les principes d\'une encyclopédie en ligne, notamment celle-ci qui concerne l\'univers de One Piece.</p>' +
                  '<p>Cordialement.</p>',
            reason: 'Pour vandalisme'
        },
        {
            title: 'Image de mauvais format',
            body: '<p>Bonjour %USERNAME%,</p>' +
                  '<p>Ce message constitue un avertissement. En effet, nous avons constaté que vous avez récemment importé des images de format jpg/jpeg/Web/BMP ou d\'un autre format prohibé par la [[One_Piece_Encyclopédie:Règles/Règlement_Wiki|réglementation]] du wiki.</p>' +
                  '<p>Nous tenons à vous rappeler que seul l’import d’image de format de type png est permis, et ces images doivent être [[Blog_utilisateur:CrocoboyMr0/Comment_et_pourquoi_bien_nommer_une_image_?|bien nommées]].</p>' +
                  '<p>Vous êtes prié de ne plus récidiver et de vous fier au tutoriel ci-dessus.</p>' +
                  '<p>Cordialement.</p>',
            reason: 'Pour image mauvais format'
        },
        {
            title: 'Images Hors-Sujet',
            body: '<p>Bonjour %USERNAME%,</p>' +
                  '<p>Nous avons constaté que vous avez récemment importé une ou plusieurs images hors sujet sur le wiki, c\'est-à-dire une image non destinée aux pages de l\'encyclopédie.</p>' +
                  '<p>Vous êtes prié de ne plus recommencer et de suivre les conseils de ce [[Fil:135016|tutoriel]], qui explique comment héberger les images destinées au forum.</p>' +
                  '<p>Cordialement.</p>',
            reason: 'Pour images HS'
        },
        {
            title: 'Images mal nommées',
            body: '<p>Bonjour %USERNAME%,</p>' +
                  '<p>Nous avons constaté que vous avez récemment importé des images mal nommées sur le wiki.</p>' +
                  '<p>Vous êtes prié de ne plus recommencer et de suivre les conseils de ce [[Blog_utilisateur:CrocoboyMr0/Comment_et_pourquoi_bien_nommer_une_image_%3F|tutoriel]].</p>' +
                  '<p>Cordialement.</p>',
            reason: 'Pour images mal nommées'
        },
                       {
            title: 'Mauvais Usage des Commentaires',
            body: '<p>Bonjour %USERNAME%,</p>' +
                  '<p>Nous avons récemment constaté que vous avez eu un mauvais comportement dans les commentaires, ou avez posté un commentaire inutile.</p>' +
                  '<p>Vous êtes prié de ne plus recommencer.</p>' +
                  '<p>Cordialement.</p>',
            reason: 'Pour mauvais usage des commentaires'
        },
        {
            title: 'Catégories',
            body: '<p>Bonjour %USERNAME%,</p>' +
                  '<p>Merci pour tes récentes contributions sur One Piece Encyclopédie&nbsp;!</p>' +
                  '<p>Nous avons récemment constaté que vous avez ajouté(e) une/des catégorie(s) à des pages. Ce droit est pourtant réservé exclusivement aux membres de l\'[[One Piece Encyclopédie:Liste des Administrateurs|Administration]].</p>' +
                  '<p>Vous êtes donc prié(e) de ne plus recommencer, et de lire le [[One Piece Encyclopédie:Règles|Règlement]] si ce n\'est pas déjà fait.</p>' +
                  '<p>À bientôt&nbsp;:)</p>',
            reason: 'Pour les Catégories'
        },
        'Les blocages',
        {
            title: 'Blocage Wiki',
            body: '<p>Bonjour %USERNAME%,</p>' +
                  '<p>Suite à votre comportement inadmissible, vous avez été banni du wiki.</p>' +
                  '<p>Cordialement.</p>',
            reason: 'Pour blocage sur le wikia'
        },
        {
            title: 'Blocage Chat',
            body: '<p>Bonjour %USERNAME%,</p>' +
                  '<p>Suite à votre comportement inadmissible sur le tchat, vous avez été banni du tchat.</p>' +
                  '<p>Cordialement.</p>',
            reason: 'Pour blocage sur le tchat'
        },
         'Avertos pour fofo/discu',
        {
            title: 'Provocations',
            body: '<p>Salut %USERNAME%,</p>' +
                  '<p>Je suis l\'un des [[One Piece Encyclopédie:Liste des Administrateurs|Modérateurs de Discussions]]. Ce message constitue un avertissement.</p>' +
                  '<p>En effet, nous avons constaté un comportement provocateur dans tes messages, ce qui est inacceptable. En fonction du degré de provocation, nous nous réservons le droit d\'avertir directement un administrateur.</p>' +
                  '<p>Si jamais tu recommences, une sanction sera prise et elle peut être très lourde.</p>' +
                  '<p>Cordialement,</p>',
            reason: 'Pour provocation'
        },
        {
            title: 'Hors-sujet',
            body: '<p>Salut %USERNAME%,</p>' +
                  '<p>Je suis l\'un des [[One Piece Encyclopédie:Liste des Administrateurs|Modérateurs de Discussions]]. Ce message constitue un avertissement en raison de tes multiples (au moins 2) messages hors-sujet constatés récemment ou d\'une récidive à ce sujet. </p>' +
                  '<p>La modération t\'invite (une nouvelle fois) à respecter le sujet du topic et à t\'y tenir. Par ailleurs, si tu veux dévier du sujet d\'un topic, la modération ne t\'empêche pas de créer un topic spécialement dédié à ce sujet..</p>' +
                  '<p>Voici un [[Fil:327506|topic]] qui pourra t\'aider en ce qui concerne le Sous-Forum Affrontements.</p>' +
                  '<p>Cordialement.</p>',
            reason: 'Pour hors sujet'
        },
        {
            title: 'Topic non conforme',
            body: '<p>Salut %USERNAME%,</p>' +
                  '<p>Je suis l\'un des [[One Piece Encyclopédie:Liste des Administrateurs|Modérateurs de Discussions]]. Ce message constitue un avertissement en raison de la création d\'un topic non conforme, c\'est-à-dire avec un titre court, une orthographe et une syntaxe correctes. Nous ne demandons pas d\'être irréprochable dans les deux derniers points mais que ce soit compréhensible.</p>' +
                  '<p>Concernant ce topic, nous l\'avons soit supprimé, soit modifié si c\'était faisable et si tu n\'étais pas un récidiviste en la matière.</p>' +
                  '<p>Cordialement,</p>',
            reason: 'Pour topics'
        },
        {
            title: 'Post incompréhensible',
            body: '<p>Salut %USERNAME%,</p>' +
                  '<p>Je suis l\'un des [[One Piece Encyclopédie:Liste des Administrateurs|Modérateurs de Discussions]]. Ce message constitue un avertissement en raison de messages incompréhensibles postés sur le forum. Nous ne demandons pas une orthographe ou une syntaxe irréprochables mais correctes pour que ce soit compréhensible. Dans ton cas, cela ne l\'est pas.</p>' +
                  '<p>Un post compréhensible est un post où il est facile de comprendre l\'avis du contributeur sur le sujet traité, c\'est-à-dire qu\'on ne doit pas le relire 36 fois pour décrypter ce que tu as dit et qu\'on ne doit pas le relire 36 fois, pour savoir quel est ton raisonnement.</p>' +
                  '<p>Cordialement,</p>',
            reason: 'Pour post incompréhensible'
        },
        {
            title: 'Non respect des avis',
            body: '<p>Salut %USERNAME%,</p>' +
                  '<p>Je suis l\'un des [[One Piece Encyclopédie:Liste des Administrateurs|Modérateurs de Discussions]]. Ce message constitue un avertissement. En effet, nous avons constaté que tu ne respectais pas toujours l\'avis des autres dans tes messages, ce qui est inacceptable et contraire au règlement.</p>' +
                  '<p>Voici un [[Fil:327506|topic]] qui pourra t\'aider en ce qui concerne le Sous Forum Affrontements.</p>' +
                  '<p>Cordialement.</p>',
            reason: 'Pour non respect des avis'
        },
        {
            title: 'Contenu inapproprié',
            body: '<p>Salut %USERNAME%,</p>' +
                  '<p>Je suis l\'un des [[One Piece Encyclopédie:Liste des Administrateurs|Modérateurs de Discussions]]. Ce message constitue un avertissement. En effet, tu as importé un contenu inadéquat sur le forum, ce qui est inacceptable. En fonction du contenu, nous nous réservons le droit d\'avertir directement un administrateur.</p>' +
                  '<p>Si jamais tu recommences, une sanction sera prise et elle peut être très lourde voir définitive.</p>' +
                  '<p>Cordialement.</p>',
            reason: 'Pour contenu inapproprié'
        },
        {
            title: 'Messages inutiles',
            body: '<p>Salut %USERNAME%,</p>' +
                  '<p>Je suis l\'un des [[One Piece Encyclopédie:Liste des Administrateurs|Modérateurs de Discussions]]. Ce message constitue un avertissement en raison de tes multiples (au moins 2) messages inutiles constatés récemment ou d\'une récidive à ce sujet.</p>' +
                  '<p>La modération t\'invite (une nouvelle fois) à utiliser l\'option sélectionner afin de ne pas surcharger les topics, pour spécifier que tu es parfaitement d\'accord avec un commentaire.</p>' +
                  '<p>Par ailleurs, ce [[Fil:323255|topic]] détaille en long et en large, les différents types de messages inutiles.</p>' +
                  '<p>Cordialement.</p>',
            reason: 'Pour messages inutiles'
        },
        {
            title: 'Insultes',
            body: '<p>Salut %USERNAME%,</p>' +
                  '<p>Je suis l\'un des [[One Piece Encyclopédie:Liste des Administrateurs|Modérateurs de Discussions]]. Ce message constitue un avertissement qui sera éventuellement suivi d\'un bannissement direct, en fonction de la gravité de l\'insulte proférée et du jugement d\'un administrateur.</p>' +
                  '<p>La modération t\'invite (une nouvelle fois) à revoir ton comportement sur le forum car de tels comportements ne sont pas acceptés ici et peuvent rapidement conduire à un bannissement de longue durée.</p>' +
                  '<p>Cordialement.</p>',
            reason: 'Pour insultes'
        },
        {
            title: 'Spoilers foireux',
            body: '<p>Salut %USERNAME%,</p>' +
                  '<p>Je suis l\'un des [[One Piece Encyclopédie:Liste des Administrateurs|Modérateurs de Discussions]]. Ce message constitue un avertissement en raison de ta volonté de poster des faux spoilers. Par ailleurs, si tu veux poster des hypothèses, un sous forum y est consacré.</p>' +
                  '<p>Cordialement,</p>',
            reason: 'Pour spoilers foireux'
        },
        {
            title: 'Doubles Post',
            body: '<p>Salut %USERNAME%,</p>' +
                  '<p>Je suis l\'un des [[One Piece Encyclopédie:Liste des Administrateurs|Modérateurs de Discussions]]. Ce message constitue un avertissement en raison de tes multiples (au moins 2) doubles-posts constatés récemment ou d\'une récidive à ce sujet.</p>' +
                  '<p>La modération t\'invite (une nouvelle fois) à modifier ton message précédent afin de ne pas surcharger les topics.</p>' +
                  '<p>Cordialement,</p>',
            reason: 'Pour double post'
        },
               {
            title: 'Topic mal placé',
            body: '<p>Salut %USERNAME%,</p>' +
                  '<p>Je suis l\'un des [[One Piece Encyclopédie:Liste des Administrateurs|Modérateurs de Discussions]]. Ce message constitue un avertissement en raison de la création d\'un topic mal placé, c\'est-à-dire placé dans la mauvaise rubrique ou le mauvais sous-forum.</p>' +
                  '<p>Merci d\'en tenir compte à l\'avenir.</p>' +
                  '<p>Concernant ce topic, nous l\'avons soit supprimé, soit modifié si c\'était faisable et si tu n\'étais pas un récidiviste en la matière.</p>' +
                  '<p>Cordialement,</p>',
            reason: 'Pour topic mal placé'
        },
        {
            title: 'Irrespect',
            body: '<p>Bonjour %USERNAME%,</p>' +
                  '<p>Je suis l\'un des [[One Piece Encyclopédie:Liste des Administrateurs|Modérateurs de Discussions]]. Ce message constitue un avertissement. En effet, nous avons constaté que tu ne respectais pas les autres contributeurs dans tes messages, ce qui est inacceptable et contraire au règlement.</p>' +
                  '<p>En cas de récidive, la modération se réserve le droit de demander une sanction aux administrateurs. </p>' +
                  '<p>Cordialement,</p>',
            reason: 'Pour non respect d\'un utilisateur'
        },
        {
            title: 'Topic Hors-Sujet',
            body: '<p>Bonjour %USERNAME%,</p>' +
                  '<p>Je suis l\'un des [[One Piece Encyclopédie:Liste des Administrateurs|Modérateurs de Discussions]]. Ce message constitue un avertissement en raison de ton topic hors-sujet constaté récemment.</p>' +
                  '<p>Ce topic a bien entendu été supprimé. </p>' +
                  '<p>Cordialement,</p>',
            reason: 'Pour topic hors-sujet'
        },
        {
            title: 'Sites Scan',
            body: '<p>Bonjour %USERNAME%,</p>' +
                  '<p>Je suis l\'un des [[One Piece Encyclopédie:Liste des Administrateurs|Modérateurs de Discussions]]. Ce message constitue un avertissement. Nous avons constaté que tu as mis des liens redirigeant vers des sites de scan ou de streaming, ce qui est interdit. Si tu veux importer une image, tu peux suivre ce [[Fil:135016|tutoriel]], qui explique comment héberger les images destinées au forum.</p>' +
                  '<p>Cordialement,</p>',
            reason: 'Pour liens de scan ou streaming'
        },
        {
            title: 'Spoilers',
            body: '<p>Bonjour %USERNAME%,</p>' +
                  '<p>Je suis l\'un des [[One Piece Encyclopédie:Liste des Administrateurs|Modérateurs de Discussions]]. Ce message constitue un avertissement. En effet, nous avons constaté que tu avais posté des spoilers sur des fils de discussions, hors les spoilers sont uniquement réservés au topic spécial dédié au chapitre en cours. Si ces spoilers sont vrais et de source fiable, nous t\'invitons à les poster sur le topic du chapitre.</p>' +
                  '<p>Cordialement,</p>',
            reason: 'Pour spoilers'
        }
    ], api, username = $('.UserProfileMasthead .masthead-info h1').text();
 
    function init() {
        api = new mw.Api();
        $('.WallGreeting').prepend(
            $('<select>', {
                id: 'user-warning-select'
            }).append('<option>', { text: 'Avertir... (avec modération)' })
            .append(DATA.map(function(el, i) {
                if (typeof el === 'string') {
                    return $('<option>', {
                        disabled: '',
                        text: el
                    });
                } else {
                    return $('<option>', {
                        text: el.reason,
                        'data-i': i
                    });
                }
            })),
            $('<button>', {
                id: 'user-warning-button',
                text: 'Charger le message'
            }).click(post)
        );
    }
 
    function post() {
        var data = DATA[Number($($('#user-warning-select').prop('selectedOptions')[0]).attr('data-i'))];
        if (data) {
            $('#WallMessageTitle').val(data.title);
            $('#WallMessageBody').val(data.body.replace('%USERNAME%', username) + '\n\n~~' + '~');
            $('#WallMessageBody').focus();
            $('#WallMessageSubmit, #WallMessagePreview').removeAttr('disabled');
        }
    }
 
    mw.loader.using('mediawiki.api').then(init);
})();