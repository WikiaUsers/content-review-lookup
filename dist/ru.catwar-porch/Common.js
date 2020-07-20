//Добавление кнопочки "Мне нравится"
importScriptURI("http://vk.com/js/api/openapi.js?115");
window.onload = function() {
    //Initializing VK
    VK.init({apiId: 5663346, onlyWidgets: true});
    //Adding the button
    $('<div id="vk_like"></div><script type="text/javascript">VK.Widgets.Like("vk_like", {type: "mini"});</script>').insertAfter('#WikiaPageHeader > .talk');
}
//Добавление кнопочки "Мне нравится"