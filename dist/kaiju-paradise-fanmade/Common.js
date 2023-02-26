// Currently in testing, WIP.

/* Any JavaScript here will be loaded for all users on every page load. */
switch (mw.config.get('Bestiary')) {
    case 'Bestiary':
        // JS here will be applied to "Bestiary"
        var protogenCount = 0;
$('.protogen').hover( function() {
    if ( protogenCount++ == 5 ) {
        this.style.backgroundImage = "url('https://static.wikia.nocookie.net/kaiju-paradise/images/b/be/Rusprotogenbsod.png/revision/latest?cb=20211224145257')";
    }
}, function() {
    this.style.backgroundImage = null;
} );
protogenCount();
        break; }