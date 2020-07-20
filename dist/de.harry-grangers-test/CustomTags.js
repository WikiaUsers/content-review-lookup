function createCustomTag(tag) {
    //name, callback, parent, attributes
    XElement = document.registerElement(tag.name);
    element = $(new XElement ()).appendTo($(tag.parent ? tag.parent : '.WikiaArticle#WikiaArticle'));
    console.log('element',element);
    return element;
}