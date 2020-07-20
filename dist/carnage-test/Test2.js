function highlight(){
    var tags = ['a', 'abbr', 'area', 'article', 'aside'];
    for (var t = 0; t < tags.length; t++){
        var pattern = new RegExp("<" + tags[t], "gi"),
            string = $('pre.HTMLHighlight, code.HTMLHighlight').text();
        srting.replace(pattern, '<span class="elem-highlight">$1</span>');
    }
}