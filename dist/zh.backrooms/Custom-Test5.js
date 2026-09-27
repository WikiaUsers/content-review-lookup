mw.loader.load(['mediawiki.util']);
mw.hook('wikipage.content').add(function () {
    $('.glass').prepend(`<input class="control" type="radio" name="tabs" id="tab-1" checked>
<input class="control" type="radio" name="tabs" id="tab-2">`);
    $('.container').prepend(`<input class="control" type="checkbox" id="theme-toggle">`);
    $('.tabs').html(`<label for="tab-1">Overview</label>
<label for="tab-2">Details</label>`);
    $('.widget').append(`<label class="theme-button" for="theme-toggle" aria-label="Toggle theme">
<span class="theme-thumb"></span>
<span class="theme-label">LIGHT</span>
</label>`);
});