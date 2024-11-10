var items = [];
    // To track the position of the last spawned image for each type
    var lastPositions = {};

    // Get container dimensions for centering
    var containerWidth = $('#container').width();
    var containerHeight = $('#container').height();
    var imageSize = 50; // Assuming the image size is 50px (as per your draggable images)

    // Loop through each draggable element and create an item
    $('.draggable').each(function() {
        var name = $(this).data('name');
        var centerX = $(this).data('center-x');
        var centerY = $(this).data('center-y');

        items.push({
            name: name,
            draggable: $(this),
            centerX: centerX,
            centerY: centerY
        });
    });

    // To track click counts for polygons
    var clickCounts = {
        Poly1: 0, //Stick //UpgradedStickFarket.png //GameIcon-Stick Upgraded.png
        Poly2: 0, //Rock //RockFarket.png //GameIcon-Rock.png
        Poly3: 0, //Rope //RopeFarket.png //GameIcon-Rope.png
        Poly4: 0, //Cloth //ClothFarket.png //GameIcon-Cloth.png
        Poly5: 0, //Electrical Tape //ElectricalTapeFarket.png //GameIcon-taperoll.png
        Poly6: 0, //Bone //BoneFarket.png //GameIcon-Bone.png
        Poly7: 0, //Feather //Feather diff.png //GameIcon-Feather.png
        Poly8: 0, //Skull //SkullFarket.png //GameIcon-Skull.png
        Poly9: 0, //Sap //SapFarket.png //GameIcon-Sap.png
        Poly10: 0, //Deer Skin //SkinDeerFarket.png //GameIcon-DeerSkin.png
        Poly11: 0, //Rabbit Fur //RabbitFurFarket.png //GameIcon-RabbitSkin.png
        Poly12: 0, //Boar Skin //BoarSkinFarket.png //GameIcon-BoarSkin.png
        Poly13: 0, //Raccoon Skin //RaccoonSkinFarket.png //GameIcon-RaccoonSkin.png
        Poly14: 0, //Booze //Booze.png //GameIcon-Alcohol.png
        Poly15: 0, //Arrow //Arrow.png //GameIcon-Bow Arrow.png
        Poly16: 0, //Weak Spear //WeakSpearFarket.png //GameIcon-Spear 2.png
        Poly17: 0, //Upgraded Spear //UpgradedSpearFarket.png //GameIcon-Spear Upgraded.png
    };

    // Define valid combinations for showing the Gear image with names and crafted image IDs
    var gearCombinations = [
        { name: "Weak Spear", combinations: { Poly1: 2 }, craftedImageId: "crafted-image-1" },
        { name: "Arrows", combinations: { Poly1: 1, Poly7: 5 }, craftedImageId: "crafted-image-2" },
        { name: "Bone Arrows", combinations: { Poly1: 1, Poly6: 5, Poly7: 5 }, craftedImageId: "crafted-image-3" },
        { name: "Crafted Club", combinations: { Poly1: 1, Poly8: 1 }, craftedImageId: "crafted-image-4" },
        { name: "Crafted Axe", combinations: { Poly1: 1, Poly2: 1, Poly3: 1 }, craftedImageId: "crafted-image-5" },
        { name: "Crafted Bow", combinations: { Poly1: 1, Poly3: 1, Poly4: 1 }, craftedImageId: "crafted-image-6" },
        { name: "Slingshot", combinations: { Poly1: 1, Poly4: 1, Poly5: 1 }, craftedImageId: "crafted-image-7" },
        { name: "Repair Tool", combinations: { Poly1: 2, Poly2: 1, Poly4: 2, Poly9: 10 }, craftedImageId: "crafted-image-8" },
        { name: "Waterskin", combinations: { Poly3: 1, Poly10: 2 }, craftedImageId: "crafted-image-9" },
        { name: "Snow Shoes", combinations: { Poly1: 5, Poly3: 2 }, craftedImageId: "crafted-image-10" },
        { name: "Quiver", combinations: { Poly3: 1, Poly11: 3 }, craftedImageId: "crafted-image-11" },
        { name: "Small Rock Bag", combinations: { Poly3: 1, Poly11: 1 }, craftedImageId: "crafted-image-12" },
        { name: "Rabbit Fur Boots", combinations: { Poly3: 2, Poly11: 3 }, craftedImageId: "crafted-image-13" },
        { name: "Stick Bag", combinations: { Poly3: 2, Poly4: 3, Poly11: 1 }, craftedImageId: "crafted-image-14" },
        { name: "Rock Bag", combinations: { Poly3: 3 , Poly4: 1, Poly12: 1 }, craftedImageId: "crafted-image-15" },
        { name: "Spear Bag", combinations: { Poly3: 3, Poly4: 2, Poly10:2, Poly12: 2 }, craftedImageId: "crafted-image-16" },
        { name: "Warmsuit", combinations: { Poly3: 2, Poly4: 2, Poly10: 6, Poly11: 1, Poly12: 4, Poly13: 1 }, craftedImageId: "crafted-image-17" },
        { name: "Incendiary Arrows", combinations: { Poly4: 1, Poly14: 1, Poly15: 1 }, craftedImageId: "crafted-image-18" },
        { name: "Upgraded Spear", combinations: { Poly4: 2, Poly6: 3, Poly16: 1 }, craftedImageId: "crafted-image-19" },
        { name: "Incendiary Upgraded Spear", combinations: { Poly4: 1, Poly14: 1, Poly17: 1}, craftedImageId: "crafted-image-20" },
        { name: "Rope", combinations: { Poly4: 7 }, craftedImageId: "crafted-image-21" },
        { name: "Molotov", combinations: { Poly4: 1, Poly14: 1 }, craftedImageId: "crafted-image-22" },
        { name: "Bone Armor", combinations: { Poly4: 3, Poly6: 6 }, craftedImageId: "crafted-image-23" },
    ];

    // Define custom texts and images for different spawned images (based on their data-name)

var customTexts = {
    "Stick": [
        { img: "/images/Empty152.png", number: "", img6: "/images/GameIcon-Stick Upgraded.png", number6: "2", text: "WEAK SPEAR" },
        { img: "/images/Empty152.png", number: "", img5: "/images/GameIcon-Feather.png", number5: "5", img6: "/images/GameIcon-Stick Upgraded.png", text: "ARROWS x5" },
        { img: "/images/Empty152.png", number: "", img4: "/images/GameIcon-Bone.png", number4: "5", img5: "/images/GameIcon-Feather.png", number5: "5", img6: "/images/GameIcon-Stick Upgraded.png", text: "BONE ARROWS" },
        { img: "/images/Empty152.png", number: "", img5: "/images/GameIcon-Stick Upgraded.png", img6: "/images/GameIcon-Skull.png", text: "CRAFTED CLUB" },
        { img: "/images/Empty152.png", number: "", img5: "/images/GameIcon-Rope.png", number5: "2", img6: "/images/GameIcon-Stick Upgraded.png", number6: "5", text: "SNOW SHOES" },
        { img: "/images/Empty152.png", number: "", img4: "/images/GameIcon-Rope.png", img5: "/images/GameIcon-Rock.png", img6: "/images/GameIcon-Stick Upgraded.png", text: "CRAFTED AXE" },
        { img: "/images/Empty152.png", number: "", img4: "/images/GameIcon-Rope.png", img5: "/images/GameIcon-Cloth.png", img6: "/images/GameIcon-Stick Upgraded.png", text: "CRAFTED BOW" },
        { img: "/images/Empty152.png", number: "", img4: "/images/GameIcon-taperoll.png", img5: "/images/GameIcon-Cloth.png", img6: "/images/GameIcon-Stick Upgraded.png", text: "SLINGSHOT" },
        { img: "/images/Empty152.png", number: "", img3: "/images/GameIcon-Sap.png", number3: "10", img4: "/images/GameIcon-Cloth.png", number4: "2", img5: "/images/GameIcon-Rock.png", img6: "/images/GameIcon-Stick Upgraded.png", number6: "2", text: "REPAIR TOOL" },
    ],
    "Rock": [
        { img: "/images/Empty152.png", number: "", img4: "/images/GameIcon-Rope.png", img5: "/images/GameIcon-Rock.png", img6: "/images/GameIcon-Stick Upgraded.png", text: "CRAFTED AXE" },
        { img: "/images/Empty152.png", number: "", img3: "/images/GameIcon-Sap.png", number3: "10", img4: "/images/GameIcon-Cloth.png", number4: "2", img5: "/images/GameIcon-Rock.png", img6: "/images/GameIcon-Stick Upgraded.png", number6: "2", text: "REPAIR TOOL" },
    ],
    "Rope": [
        { img: "/images/Empty152.png", number: "", img5: "/images/GameIcon-Rope.png", img6: "/images/GameIcon-DeerSkin.png", number6: "2", text: "WATERSKIN" },
        { img: "/images/Empty152.png", number: "", img5: "/images/GameIcon-Rope.png", number5: "2", img6: "/images/GameIcon-Stick Upgraded.png", number6: "5", text: "SNOW SHOES" },
        { img: "/images/Empty152.png", number: "", img5: "/images/GameIcon-RabbitSkin.png", number5: "3", img6: "/images/GameIcon-Rope.png", text: "QUIVER" },
        { img: "/images/Empty152.png", number: "", img5: "/images/GameIcon-RabbitSkin.png", img6: "/images/GameIcon-Rope.png", text: "SMALL ROCK BAG" },
        { img: "/images/Empty152.png", number: "", img5: "/images/GameIcon-Rope.png", number5: "2", img6: "/images/GameIcon-RabbitSkin.png", number6: "3", text: "RABBIT FUR BOOTS" },
        { img: "/images/Empty152.png", number: "", img4: "/images/GameIcon-Rope.png", img5: "/images/GameIcon-Rock.png", img6: "/images/GameIcon-Stick Upgraded.png", text: "CRAFTED AXE" },
        { img: "/images/Empty152.png", number: "", img4: "/images/GameIcon-Rope.png", img5: "/images/GameIcon-Cloth.png", img6: "/images/GameIcon-Stick Upgraded.png", text: "CRAFTED BOW" },
        { img: "/images/Empty152.png", number: "", img4: "/images/GameIcon-RabbitSkin.png", img5: "/images/GameIcon-Cloth.png", number5: "3", img6: "/images/GameIcon-Rope.png", number6: "2", text: "STICK BAG" },
        { img: "/images/Empty152.png", number: "", img4: "/images/GameIcon-BoarSkin.png", img5: "/images/GameIcon-Cloth.png", img6: "/images/GameIcon-Rope.png", number6: "3", text: "ROCK BAG" },
        { img: "/images/Empty152.png", number: "", img3: "/images/GameIcon-BoarSkin.png", number3: "2", img4: "/images/GameIcon-RabbitSkin.png", number4: "2", img5: "/images/GameIcon-Cloth.png", number5: "2", img6: "/images/GameIcon-Rope.png", number6: "3", text: "SPEAR BAG" },
        { img: "/images/GameIcon-RaccoonSkin.png", number: "", img2: "/images/GameIcon-BoarSkin.png", number2: "4", img3: "/images/GameIcon-DeerSkin.png", number3: "6", img4: "/images/GameIcon-RabbitSkin.png", img5: "/images/GameIcon-Cloth.png", number5: "2", img6: "/images/GameIcon-Rope.png", number6: "2", text: "WARMSUIT" },
    ],
    "Cloth": [
        { img: "/images/Empty152.png", number: "", img4: "/images/GameIcon-Cloth.png", img5: "/images/GameIcon-Alcohol.png", img6: "/images/Arrow.png", text: "INCENDIARY ARROWS" },
        { img: "/images/Empty152.png", number: "", img4: "/images/GameIcon-Cloth.png", img5: "/images/GameIcon-Alcohol.png", img6: "/images/GameIcon-Stick Upgraded.png", text: "INCENDIARY UPGRADED SPEAR" },
        { img: "/images/Empty152.png", number: "", img6: "/images/GameIcon-Cloth.png", number6: "7", text: "ROPE" },
        { img: "/images/Empty152.png", number: "", img5: "/images/GameIcon-Cloth.png", img6: "/images/GameIcon-Alcohol.png", text: "MOLOTOV" },
        { img: "/images/Empty152.png", number: "", img5: "/images/GameIcon-Cloth.png", number5: "3", img6: "/images/GameIcon-Bone.png", number6: "6", text: "BONE ARMOR" },
        { img: "/images/Empty152.png", number: "", img4: "/images/GameIcon-Rope.png", img5: "/images/GameIcon-Cloth.png", img6: "/images/GameIcon-Stick Upgraded.png", text: "CRAFTED BOW" },
        { img: "/images/Empty152.png", number: "", img4: "/images/GameIcon-taperoll.png", img5: "/images/GameIcon-Cloth.png", img6: "/images/GameIcon-Stick Upgraded.png", text: "SLINGSHOT" },
        { img: "/images/Empty152.png", number: "", img4: "/images/GameIcon-Cloth.png", number4: "2", img5: "/images/GameIcon-Bone.png", number5: "3", img6: "/images/GameIcon-Spear 2.png", text: "UPGRADED SPEAR" },
        { img: "/images/Empty152.png", number: "", img4: "/images/GameIcon-RabbitSkin.png", img5: "/images/GameIcon-Cloth.png", number5: "3", img6: "/images/GameIcon-Rope.png", number6: "2", text: "STICK BAG" },
        { img: "/images/Empty152.png", number: "", img4: "/images/GameIcon-BoarSkin.png", img5: "/images/GameIcon-Cloth.png", img6: "/images/GameIcon-Rope.png", number6: "3", text: "ROCK BAG" },
        { img: "/images/Empty152.png", number: "", img3: "/images/GameIcon-Sap.png", number3: "10", img4: "/images/GameIcon-Cloth.png", number4: "2", img5: "/images/GameIcon-Rock.png", img6: "/images/GameIcon-Stick Upgraded.png", number6: "2", text: "REPAIR TOOL" },
    ],
    // Add more mappings as needed
};

// Define which polygons are initially locked
var lockedPolygons = [14, 15, 16]; // Indices of locked polygons

// Define the mapping of crafted images to locked polygons
var craftedImageLocks = {
    'crafted-image-1': [15], // Lock Poly16 until crafted-image-1 is created //weak spear
    'crafted-image-2': [14], // Lock Poly15 until crafted-image-2 is created //arrow
    'crafted-image-19': [16],     // Lock Poly17 until crafted-image-19 is created //crafted spear
    // Add more mappings as needed
};

// Handle right-clicks inside the polygons to spawn multiple images
$('.polygon').off('contextmenu').on('contextmenu', function(event) {
    event.preventDefault(); // Prevent the default context menu from appearing

    // Find the index of the polygon that was clicked
    var polygonIndex = $('.polygon').index(this);

    // Check if the polygon is locked
    if (lockedPolygons.includes(polygonIndex)) {
        //alert("This polygon is locked until crafted-image-1 is created.");
        return; // Exit if the polygon is locked
    }

    // Proceed with spawning images if the polygon is not locked
    var item = items[polygonIndex]; // Get the corresponding item

    // Increment the click count for this polygon
    var polyName = 'Poly' + (polygonIndex + 1);
    clickCounts[polyName]++;

    // Update text in the droppable area
    updateDroppableText(); // Update text in the droppable area

    // Calculate new position for the cloned image
    var newPosition;
    if (!lastPositions[item.name]) {
        newPosition = getRandomPosition(containerWidth, containerHeight, 50); // Randomize within ±100 pixels
    } else {
        newPosition = getClusteredPosition(lastPositions[item.name], 20); // Cluster within ±20 pixels
    }

    // Clone and show the new image
    var clonedImage = item.draggable.clone().appendTo('#container');

    // Add tooltip and custom text for the image
    var customTextEntries = customTexts[item.name] || [{ text: "Default Text" }];
    var tooltip = $('<div class="custom-tooltip"></div>').appendTo(clonedImage);

    // Generate tooltip content
    var tooltipContent = '';

// Wrap the entire tooltip in a parent div to apply overall positioning
tooltipContent += '<div style="position:relative; margin-left:-400px; margin-top:-300px;">';

customTextEntries.forEach(function(entry, index) {
    // Calculate the top position based on the index, adding 50px for spacing
    const topPosition = index * 50; // Adjust the multiplier for spacing as needed

    tooltipContent += 
    '<div style="position:relative; margin-bottom:0px; padding-left:10px;">' + // Container for each entry
        // Adjust the position of the first mask image to reduce the gap
        '<img src="/images/Mask01 Zeb.png" style="width:400px; height:50px; position:absolute; top:' + (topPosition - 10) + 'px; left:0; z-index:5;">' + // Background image
        '<div style="position:absolute; top:' + (topPosition + 0) + 'px; left:20px; z-index:10;">' + // Positioning the first icon
            '<img src="' + entry.img + '" style="width:30px; height:30px;">' + // Small icon
        '</div>' +
        // Conditionally render icons and their corresponding numbers
        (entry.img2 ? 
            '<div style="position:absolute; top:' + (topPosition + 0) + 'px; left:50px; z-index:10;">' + // Positioning the second icon
                '<img src="' + entry.img2 + '" style="width:30px; height:30px;">' + // Small icon2
            '</div>' : '') +
        (entry.number2 ? 
            '<span style="margin-right:50px; position:absolute; top:' + (topPosition + 10) + 'px; left:60px; z-index:10; color:white; font-size:20px;">' + 
                entry.number2 +  // Number next to the small icon2
            '</span>' : '') +

        (entry.img3 ? 
            '<div style="position:absolute; top:' + (topPosition + 0) + 'px; left:80px; z-index:10;">' + // Positioning the third icon
                '<img src="' + entry.img3 + '" style="width:30px; height:30px;">' + // Small icon3
            '</div>' : '') +
        (entry.number3 ? 
            '<span style="margin-right:50px; position:absolute; top:' + (topPosition + 10) + 'px; left:90px; z-index:10; color:white; font-size:20px;">' + 
                entry.number3 +  // Number next to the small icon3
            '</span>' : '') +

        (entry.img4 ? 
            '<div style="position:absolute; top:' + (topPosition + 0) + 'px; left:110px; z-index:10;">' + // Positioning the fourth icon
                '<img src="' + entry.img4 + '" style="width:30px; height:30px;">' + // Small icon4
            '</div>' : '') +
        (entry.number4 ? 
            '<span style="margin-right:50px; position:absolute; top:' + (topPosition + 10) + 'px; left:120px; z-index:10; color:white; font-size:20px;">' + 
                entry.number4 +  // Number next to the small icon4
            '</span>' : '') +

        (entry.img5 ? 
            '<div style="position:absolute; top:' + (topPosition + 0) + 'px; left:140px; z-index:10;">' + // Positioning the fifth icon
                '<img src="' + entry.img5 + '" style="width:30px; height:30px;">' + // Small icon5
            '</div>' : '') +
        (entry.number5 ? 
            '<span style="margin-right:50px; position:absolute; top:' + (topPosition + 10) + 'px; left:150px; z-index:10; color:white; font-size:20px;">' + 
                entry.number5 +  // Number next to the small icon5
            '</span>' : '') +

        (entry.img6 ? 
            '<div style="position:absolute; top:' + (topPosition + 0) + 'px; left:170px; z-index:10;">' + // Positioning the sixth icon
                '<img src="' + entry.img6 + '" style="width:30px; height:30px;">' + // Small icon6
            '</div>' : '') +
        (entry.number6 ? 
            '<span style="margin-right:50px; position:absolute; top:' + (topPosition + 10) + 'px; left:180px; z-index:10; color:white; font-size:20px;">' + 
                entry.number6 +  // Number next to the small icon6
            '</span>' : '') +

        '<span style="margin-right:50px; position:absolute; top:' + (topPosition + 10) + 'px; left:30px; z-index:10; color:white; font-size:20px;">' + 
            entry.number +  // Number next to the small icon
        '</span>' +
        
        '<span class="custom-tooltip-text" style="width:250px; position:absolute; top:' + (topPosition + 5) + 'px; left:220px; z-index:10; color:white; font-weight:bold;">' + 
            entry.text +  // Descriptive text
        '</span>' +
    '</div>';
});

// Close the parent div
tooltipContent += '</div>';

    // Insert the content into the tooltip
    tooltip.html(tooltipContent);

    // Position the cloned image
    clonedImage.css({
        position: 'absolute',
        top: newPosition.y + 'px',
        left: newPosition.x + 'px',
        zIndex: 10
    }).show().addClass('spawned-image').data('polyName', polyName); // Add a class to track spawned images and store polyName

    // Update the last position for this type of image
    lastPositions[item.name] = newPosition;

    // Handle hover to show the tooltip
    clonedImage.hover(function() {
        tooltip.show(); // Show tooltip when hovering over the image
    }, function() {
        tooltip.hide(); // Hide tooltip when not hovering
    });
});

// Handle right-clicks on spawned images to remove them
$('#container').on('contextmenu', '.spawned-image', function(event) {
    event.preventDefault(); // Prevent the context menu from showing

    var polyName = $(this).data('polyName');

    // Decrease the count for the associated polygon
    clickCounts[polyName]--;
    updateDroppableText(); // Update text in the droppable area

    // Remove the image and the tooltip when right-clicked
    $(this).remove();
});

    // Handle left-clicks on the polygons to navigate in a new tab
    $('.polygon').on('click', function(event) {
        event.preventDefault();
        var link = $(this).data('link');
        if (link) {
            window.open(link, '_blank');
        }
    });

  // Handle right-click on the Gear image to remove all spawned images and show the crafted image
$('#gear-image').on('contextmenu', function(event) {
    event.preventDefault();

    // Remove all images related to the polygons
    $('.spawned-image').remove();

    // Get the current combination's name and crafted image ID
    var gearName = $(this).data('tooltip');
    var craftedImageId = getCraftedImageIdByGearName(gearName);

    // Reset all polygon counts to 0
    for (var poly in clickCounts) {
        clickCounts[poly] = 0; // Set all counts to zero
    }

    // Update the droppable text to show all polygon counts as 0
    updateDroppableText();

// Get the polygon name for the crafted image
var polyName = craftedImageToPolygonMap[craftedImageId] || "";

// Check if polyName is not an empty string before initializing the count
if (polyName) {
    // Initialize the count for this polygon to 1 (for the crafted image)
    clickCounts[polyName] = 1;
}


    // Update the droppable text to reflect the crafted image count
    updateDroppableText();

    // Hide the Gear image
    $('#gear-image').hide();

    // Hide all other crafted images and show the correct one
    $('[id^="crafted-image"]').hide(); // Hide all crafted images
    $('#' + craftedImageId).show();    // Show the crafted image for the current combination
});

// Attach a right-click event handler to all crafted images
$('[id^="crafted-image"]').on('contextmenu', function(event) {
    event.preventDefault();  // Prevent the default right-click menu

    // Get the ID of the crafted image that was right-clicked
    var craftedImageId = $(this).attr('id');
    
    // Log the crafted image right-click action for debugging
    console.log("Right-click detected on crafted image:", craftedImageId);

    // Get the polygon name for this crafted image
    var polyName = craftedImageToPolygonMap[craftedImageId];

    // Reduce the count for this polygon if the count is above 0
    if (polyName && clickCounts[polyName] > 0) {
        clickCounts[polyName]--;
        console.log("Decreased count for", polyName, "to", clickCounts[polyName]);
        updateDroppableText(); // Update the droppable text with the new count
    }

    // Call the unlock function to check and unlock any locked polygons if the crafted image is "crafted-image-1"
    unlockPolygonsAfterCraft(craftedImageId);

    // Get the target location, rotation, and mirror values for this crafted image
    var targetLocation = getTargetLocationByCraftedImageId(craftedImageId);

    // Move the crafted image to the target location with animation
    $(this).animate({
        top: targetLocation.top,
        left: targetLocation.left
    }, 500, function() {
        // Apply rotation and mirroring after the animation completes
        $(this).css({
            'transform': 'rotate(' + targetLocation.rotation + 'deg) scaleX(' + (targetLocation.mirror ? -1 : 1) + ')'
        });
    });
});
// Function to unlock polygons based on the crafted image created
function unlockPolygonsAfterCraft(craftedImageId) {
    console.log("Crafted image created:", craftedImageId); // Log which crafted image is created

    // Check if the crafted image has an associated locked polygon list
    if (craftedImageLocks[craftedImageId]) {
        console.log("Unlocking polygons for crafted image:", craftedImageId);
        // Unlock polygons by removing their indices from the lockedPolygons array
        craftedImageLocks[craftedImageId].forEach(function(polygonIndex) {
            const index = lockedPolygons.indexOf(polygonIndex);
            if (index !== -1) {
                lockedPolygons.splice(index, 1); // Remove the polygon from the locked array
            }
        });
    }
}

// Example function to get target location, rotation, and mirroring based on crafted image ID
function getTargetLocationByCraftedImageId(craftedImageId) {
    var locations = {
        'crafted-image-1': { top: 400, left: 200, rotation: 45, mirror: false },
        'crafted-image-2': { top: 150, left: 250, rotation: 90, mirror: true },
        'crafted-image-3': { top: 200, left: 300, rotation: 180, mirror: false },
        // Add more crafted image IDs and transformations as needed
    };
    return locations[craftedImageId] || { top: 0, left: 0, rotation: 0, mirror: false };  // Default values if not found
}


// Mapping of crafted images to polygon names
var craftedImageToPolygonMap = {
    'crafted-image-1': 'Poly16', //weak spear
    'crafted-image-2': 'Poly15', //arrow
    'crafted-image-19': 'Poly17', //upgraded spear
    'crafted-image-21': 'Poly3', //rope
    // Add additional mappings as needed
};

// Function to update droppable text with the current counts
function updateDroppableText() {
    var displayText = "";
    for (var polyName in clickCounts) {
        if (clickCounts[polyName] > 0) {
            displayText += polyName + ": " + clickCounts[polyName] + " ";
        }
    }
    $('#droppable p').text(displayText.trim()); // Update display text
}

// Handle right-clicks on the spawned images to remove them and decrease count
$('#container').on('contextmenu', '.spawned-image', function(event) {
    event.preventDefault();

    // Get the polyName from the image's data
    var polyName = $(this).data('polyName');
    
    // Decrease the click count for the corresponding polygon
    if (clickCounts[polyName] > 0) {
        clickCounts[polyName]--;
    }

    // Remove the image
    $(this).remove();

    // Update the droppable text after removing the image
    updateDroppableText();
});


    // Function to update the droppable area's text
    function updateDroppableText() {
        var droppableText = '';
        var gearName = checkGearCombination(clickCounts); // Get the gear combination name
        for (var poly in clickCounts) {
            if (clickCounts[poly] > 0) {
                droppableText += poly + ' ' + clickCounts[poly] + ', ';
            }
        }
        // Trim the last comma and space
        droppableText = droppableText.slice(0, -2);
        $('#droppable-text').text(droppableText);

        // Check if the current state matches any valid combination to show the Gear image
        if (gearName) {
            $('#gear-image')
                .show()
                .data('tooltip', gearName) // Store the gear name as data for the tooltip
                .attr('title', gearName); // Set title for default tooltip behavior
        } else {
            $('#gear-image').hide(); // Hide the gear image
        }
    }

    // Function to check if the current clickCounts exactly match a valid gear combination
function checkGearCombination(currentCounts) {
    for (var i = 0; i < gearCombinations.length; i++) {
        var combination = gearCombinations[i].combinations;
        var isExactMatch = true;

        // First, check if all the polygons in the combination are exactly matched
        for (var key in combination) {
            if (currentCounts[key] !== combination[key]) {
                isExactMatch = false; // If any count does not match exactly, it's not a match
                break;
            }
        }

        // Second, check if there are no extra polygons with counts beyond what's specified in the combination
        if (isExactMatch) {
            for (var countKey in currentCounts) {
                // If there's any polygon count in currentCounts that is not part of the combination and is greater than 0, it's not an exact match
                if (!combination[countKey] && currentCounts[countKey] > 0) {
                    isExactMatch = false;
                    break;
                }
            }
        }

        // If it's an exact match, return the name of the combination
        if (isExactMatch) {
            return gearCombinations[i].name;
        }
    }

    return null; // No exact match found
}

    // Function to get the crafted image ID based on the gear name
    function getCraftedImageIdByGearName(gearName) {
        for (var i = 0; i < gearCombinations.length; i++) {
            if (gearCombinations[i].name === gearName) {
                return gearCombinations[i].craftedImageId;
            }
        }
        return null;
    }

    // Function to get a random position around the center
    function getRandomPosition(containerWidth, containerHeight, maxOffset) {
        var x = (containerWidth - imageSize) / 2 + getRandomOffset(maxOffset);
        var y = (containerHeight - imageSize) / 2 + getRandomOffset(maxOffset);

        // Ensure the image remains within the container's bounds
        x = Math.max(0, Math.min(x, containerWidth - imageSize)); // Clamp horizontally
        y = Math.max(0, Math.min(y, containerHeight - imageSize)); // Clamp vertically

        return { x: x, y: y };
    }

    // Function to get a clustered position around the last position
    function getClusteredPosition(lastPosition, maxOffset) {
        var x = lastPosition.x + getRandomOffset(maxOffset);
        var y = lastPosition.y + getRandomOffset(maxOffset);

        // Ensure the image remains within the container's bounds
        x = Math.max(0, Math.min(x, containerWidth - imageSize)); // Clamp horizontally
        y = Math.max(0, Math.min(y, containerHeight - imageSize)); // Clamp vertically

        return { x: x, y: y };
    }

    // Function to get a random offset within a specified range
    function getRandomOffset(maxOffset) {
        return Math.floor(Math.random() * (maxOffset * 2 + 1)) - maxOffset; // Random number between -maxOffset and +maxOffset
    }

    // Handle mouse enter and leave events for the gear image to show tooltip
    $('#gear-image').on('mouseenter', function() {
        var tooltip = $(this).data('tooltip');
        $(this).attr('title', tooltip); // Set title for the browser's default tooltip
    }).on('mouseleave', function() {
        $(this).removeAttr('title'); // Remove title on mouse leave
    });