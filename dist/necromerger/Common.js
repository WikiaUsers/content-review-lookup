(function()
{
    if (document.readyState == "loading")
        document.addEventListener("readystatechange", siteJs);
    else
        siteJs();

    function siteJs()
    {
        var galleries = document.querySelectorAll(".SkinSwap");
galleries.forEach(function(g)
{
    var left = g.querySelector(".SkinSwap-left");
    var items = g.querySelector(".SkinSwap-items");
    var right = g.querySelector(".SkinSwap-right");
    var current = g.querySelector(".selected");

    // Set a current
    if (!current)
    {
        current = items.firstElementChild;
        current.classList.add("selected");
    }

    function cycle(dir)
    {
        current.classList.remove("selected");

        if (dir)
            current = current.nextElementSibling || items.firstElementChild || current;
        else
            current = current.previousElementSibling|| items.lastElementChild  || current;

        current.classList.add("selected");
    }

    left.addEventListener("click", function(){ cycle(false); });
    right.addEventListener("click", function(){ cycle(true); });
});
    }

})();







var pageImages = document.querySelectorAll(".mw-parser-output img[data-image-key$='.gif' i]");
pageImages.forEach(function(img)
{
    // This function preserves lazyloading
    var isLazyLoad = img.matches(".lazyload, .lazyloading, .lazyloaded");
    var isLazyLoaded = img.matches(".lazyloading, .lazyloaded");

    // Get src URL from the data-src attribute when the image is a lazyloaded image
    // otherwise get the image src itself
    var src = isLazyLoad ? img.dataset.src : img.src;

    // Insert "format=original" URL param
    var srcUrl = new URL(src);
    srcUrl.searchParams.set("format", "original");

    // Modify the data-src attribute so that when the image is lazy loaded, it will use the new URL
    if (isLazyLoad)
        img.dataset.src = srcUrl.toString();

    // If the image is already loaded (lazy or otherwise), set the src directly
    if (!isLazyLoad || isLazyLoaded)
        img.src = srcUrl.toString();
});