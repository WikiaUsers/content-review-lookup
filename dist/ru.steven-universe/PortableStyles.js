/*
* Portable Styles for HTML elements
*
*
* By Manka-Manka
*/
function portableStyles() {
    $(document).ready(function(){
        $(".portable_hover").each(function(){
            var $this = $(this),
                oldStyle = $this.attr("style"),
                hover = $this.data("hover-style");
        $(this).hover(
            function(){
                $this.attr("style", hover);
            },  
            function(){
                $this.attr("style", oldStyle);
            }
        );
    });
    $(".portable_click").click(function() {
        var $this = $(this),
            click = $this.data("click-style");
        $this.attr("style", click);
    });
});
}
addOnloadHook(portableStyles);