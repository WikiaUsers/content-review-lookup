/* Добро пожаловать! Слава ШВ! */
/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
/* Лучше не трогать ничего, если не знаете */
/* Также желательно оповещать более сведующих людей, если редактируете */

if (mw.config.get('wgUserName') != 'null') {
    $('.insertusername').text(mw.config.get('wgUserName'));
}