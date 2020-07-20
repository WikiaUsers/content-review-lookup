$('.WikiaArticle').after('<div class="footerWrapper"></div>')
if ( $('#WikiaArticleCategories').length ) $('.footerWrapper').insertAfter('#WikiaArticleCategories')
$('.footerWrapper').load('http://lingepedia.wikia.com/wiki/Project:Footer?action=render')