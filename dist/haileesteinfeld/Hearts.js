 Hearts({
        element: document.body,  // display hearts within this element
        zIndex: -999999,         // create hearts at this z-index
        maxHearts: 12,           // maximum on screen at once
        newHeartDelay: 600,      // delay between creating new hearts
        colors: ['red', 'pink'], // colors to be randomly selected from
        minOpacity: 0.2,         // minimum opacity
        maxOpacity: 1.0,         // maximum opacity
        minScale: 0.4,           // minimum scaling factor
        maxScale: 2.4,           // maximum scaling factor
        minDuration: 4,          // minimum seconds a heart can be on screen
        maxDuration: 18,         // maximum seconds a heart can be on screen
        endAfterNumHearts: 64,   // stop creating new hearts after this many have been created
        endAfterNumSeconds: 30   // stop creating new hearts after this many seconds
    });