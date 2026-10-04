mw.hook('wikipage.content').add(function () {
    if (!$('span.import-css').length || $('.css-toggler').length) return;
    $('.page-header__meta').append($('<a/>', { class: 'css-toggler', text: '禁用/启用所有CSS' }));
});