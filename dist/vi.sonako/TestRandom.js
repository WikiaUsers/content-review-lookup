$( function () {
     var images = [
      '[https://images.wikia.nocookie.net/__cb20140723173727/sonako/images/5/50/Wiki-background]',
      '[https://images.wikia.nocookie.net/__cb20130719083632/sayonara-piano-sonata/images/5/50/Wiki-background]',
      '[https://images.wikia.nocookie.net/__cb20140804181310/trinity-seven/images/5/50/Wiki-background]'
    ];
    $( 'body.mediawiki' ).css( 'background-image', 'url(' + images[ Math.floor( Math.random() * images.length ) ] + ')' );
} );