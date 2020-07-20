/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
/**
 * VK like button widget
 */
//Loding script for a button
importScriptURI("http://vk.com/js/api/openapi.js?115");
window.onload = function() {
    //Initializing VK
    VK.init({
        apiId: 4507419,
        onlyWidgets: true
    });
    //Adding the button
    $('<div id="vk_like"></div><script type="text/javascript">VK.Widgets.Like("vk_like", {type: "mini"});</script>').insertAfter('#WikiaPageHeader > .talk');
}