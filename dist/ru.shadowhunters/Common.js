/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

// Auto-refresh

/* Auto updating recent changes opt-in
 * See w:c:dev:AjaxRC for info & attribution 
 */
 
// ** Recent Wiki Activity and Recent changes auto refresh ** //
$.extend(true, window, {dev: {i18n: {overrides: {AjaxRC: {
    'ajaxrc-refresh-text': 'Авто-обновление',
    'ajaxrc-refresh-hover': 'Автоматически обновляет страницу',
}}}}});

// - end - Auto-refresh

// Spoiler Alert
window.SpoilerAlertJS = {
    question: 'ОСТОРОЖНО! На этой странице могут быть НЕВЕРОЯТНЫЕ СПОЙЛЕРЫ или<br />информация которую вы может не хотите видеть. Вы уверены что хотите продолжить?.',
    yes: 'Да, пожалуйста',
    no: 'Нет, еще нет',
};
 
// - end -  Spoiler Alert

// User tags
window.UserTagsJS = {
	modules: {
			inactive: 45,
			mwGroups: ['bureaucrat', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global'],
			autoconfirmed: true,
			metafilter: {
				sysop: ['bureaucrat'],
				chatmoderator: ['sysop'],
				rollback: ['sysop'],
			},
			newuser: true,},
	tags: {
		bureaucrat: { u:'Консул', link:'Project:Администраторы', color:'white', title:'Bureaucrat' },
		sysop: { u:'Член Совета', link:'Project:Администраторы', color:'white', title:'Admin' },
		patroller: { u:'Инквизитор', link:'Project:Администраторы', color:'white', title:'Rollback' },
		rollback: { u:'Сумеречный Охотник', link:'Project:Администраторы', color:'white', title:'Rollback' },
			}
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

// -end - User tags

// Having TOC be collapsed by default on certain pages
mw.hook('wikipage.content').add(function () {
    var tocIgnorePages = [
        'Секреты_Блэкторн-холла'
    ];

    if ($('.toctogglelabel').length && tocIgnorePages.includes(mw.config.get('wgPageName'))) {
        $('.toctogglelabel').click();
    }
});
// - end -  TOC collapse