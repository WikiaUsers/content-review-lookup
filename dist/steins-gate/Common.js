/* Any JavaScript here will be loaded for all users on every page load. */

/* Category as gallery */

document.querySelectorAll('#content:has(.gallery-category) .category-page__member img').forEach(
    function(img) {
        img.src = img.src.split('/smart/')[0];
    }
);