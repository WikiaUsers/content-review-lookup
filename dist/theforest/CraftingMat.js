$(document).ready(function() {
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
        Poly7: 0, //Feather //Feather diff.pn //GameIcon-Feather.png
        Poly8: 0, //Skull //SkullFarket.png //GameIcon-Skull.png
        Poly9: 0, //Sap //SapFarket.png //GameIcon-Sap.png
        Poly10: 0, //Deer Skin //SkinDeerFarket.png //GameIcon-DeerSkin.png
        Poly11: 0, //Rabbit Fur //RabbitFurFarket.png //GameIcon-RabbitSkin.png
        Poly12: 0, //Boar Skin //BoarSkinFarket.png //GameIcon-BoarSkin.png
        Poly13: 0, //Raccoon Skin //RaccoonSkinFarket.png //GameIcon-RaccoonSkin.png
    };

    // Define valid combinations for showing the Gear image with names and crafted image IDs
    var gearCombinations = [
        { name: "Weak Spear", combinations: { Poly1: 2 }, craftedImageId: "crafted-image-1" },
        { name: "Arrows", combinations: { Poly1: 1, Poly7: 5 }, craftedImageId: "crafted-image-2" },
        { name: "Bone Arrows", combinations: { Poly6: 5, Poly7: 5, Poly1: 1 }, craftedImageId: "crafted-image-3" },
        { name: "Crafted Club", combinations: { Poly1: 1, Poly8: 1 }, craftedImageId: "crafted-image-4" },
        { name: "Crafted Axe", combinations: { Poly3: 1, Poly2: 1, Poly1: 1 }, craftedImageId: "crafted-image-5" },
        { name: "Crafted Bow", combinations: { Poly3: 1, Poly4: 1, Poly1: 1 }, craftedImageId: "crafted-image-6" },
        { name: "Slingshot", combinations: { Poly5: 1, Poly4: 1, Poly1: 1 }, craftedImageId: "crafted-image-7" },
        { name: "Repair Tool", combinations: { Poly9: 10, Poly4: 2, Poly2: 1, Poly1: 2 }, craftedImageId: "crafted-image-8" },
        { name: "Waterskin", combinations: { Poly3: 1, Poly10: 2 }, craftedImageId: "crafted-image-9" },
        { name: "Snow Shoes", combinations: { Poly3: 1, Poly10: 2 }, craftedImageId: "crafted-image-10" },
        { name: "Quiver", combinations: { Poly11: 3, Poly3: 1 }, craftedImageId: "crafted-image-11" },
        { name: "Small Rock Bag", combinations: { Poly11: 1, Poly3: 1 }, craftedImageId: "crafted-image-12" },
        { name: "Rabbit Fur Boots", combinations: { Poly3: 2, Poly11: 3 }, craftedImageId: "crafted-image-13" },
        { name: "Stick Bag", combinations: { Poly11: 1, Poly4: 3, Poly3: 2 }, craftedImageId: "crafted-image-14" },
        { name: "Rock Bag", combinations: { Poly12: 1, Poly4: 1, Poly3: 3 }, craftedImageId: "crafted-image-15" },
        { name: "Spear Bag", combinations: { Poly12: 2, Poly10:2 , Poly4: 2, Poly3: 3 }, craftedImageId: "crafted-image-16" },
        { name: "Warmsuit", combinations: { Poly13: 1, Poly12:4 , Poly10: 6, Poly11: 1, Poly4: 2, Poly3: 2 }, craftedImageId: "crafted-image-17" },
    ];

    // Define custom texts and images for different spawned images (based on their data-name)

var customTexts = {
    "Stick": [
        { img: "/images/Empty152.png", number: "", img6: "/images/GameIcon-Stick Upgraded.png", number6: "2", text: "WEAK SPEAR" },
        { img: "/images/Empty152.png", number: "", img5: "/images/GameIcon-Feather.png", number5: "5", img6: "/images/GameIcon-Stick Upgraded.png", text: "ARROWS 5x" },
        { img: "/images/Empty152.png", number: "", img4: "/images/GameIcon-Bone.png", number4: "5", img5: "/images/GameIcon-Feather.png", number5: "5", img6: "/images/GameIcon-Stick Upgraded.png", text: "BONE ARROWS" },
        { img: "/images/Empty152.png", number: "", img5: "/images/GameIcon-Stick Upgraded.png", img6: "/images/GameIcon-Skull.png", text: "CRAFTED CLUB" },
        { img: "/images/Empty152.png", number: "", img5: "/images/GameIcon-Rope.png", number5: "2", img6: "/images/GameIcon-Stick Upgraded.png", number6: "5", text: "SNOW SHOES" },
        { img: "/images/Empty152.png", number: "", img4: "/images/GameIcon-Rope.png", img5: "/images/GameIcon-Rock.png", img6: "/images/GameIcon-Stick Upgraded.png", text: "CRAFTED AXE" },
        { img: "/images/Empty152.png", number: "", img4: "/images/GameIcon-Rope.png", img5: "/images/GameIcon-Cloth.png", img6: "/images/GameIcon-Stick Upgraded.png", text: "CRAFTED BOW" },
        { img: "/images/Empty152.png", number: "", img4: "/images/GameIcon-taperoll.png", img5: "/images/GameIcon-Cloth.png", img6: "/images/GameIcon-Stick Upgraded.png", text: "SLINGSHOT" },
    ],
    "Rock": [
        { img: "/images/Empty152.png", number: "", img4: "/images/GameIcon-Rope.png", img5: "/images/GameIcon-Rock.png", img6: "/images/GameIcon-Stick Upgraded.png", text: "CRAFTED AXE" },
        { img: "/images/Empty152.png", number: "", img3: "/images/GameIcon-Sap.png", number3: "10", img4: "/images/GameIcon-Cloth.png", number4: "2", img5: "/images/GameIcon-Rock.png", img6: "/images/GameIcon-Stick Upgraded.png", number6: "2", text: "REPAIR TOOL" },
    ],
    "Rope": [
        { img: "/images/Empty152.png", number: "", img4: "/images/GameIcon-Rope.png", img5: "/images/GameIcon-Rock.png", number5: "2", img6: "/images/GameIcon-DeerSkin.png", text: "WATERSKIN" },
        { img: "/images/Empty152.png", number: "", img5: "/images/GameIcon-Rope.png", number5: "2", img6: "/images/GameIcon-Stick Upgraded.png", number6: "10", text: "SNOW SHOES" },
        { img: "/images/Empty152.png", number: "", img5: "/images/GameIcon-RabbitSkin.png", number5: "3", img6: "/images/GameIcon-Rope.png", text: "QUIVER" },
        { img: "/images/Empty152.png", number: "", img5: "/images/GameIcon-RabbitSkin.png", img6: "/images/GameIcon-Rope.png", text: "SMALL ROCK BAG" },
        { img: "/images/Empty152.png", number: "", img5: "/images/GameIcon-Rope.png", number5: "2", img6: "/images/GameIcon-RabbitSkin.png", number6: "3", text: "RABBIT FUR BOOTS" },
        { img: "/images/Empty152.png", number: "", img4: "/images/GameIcon-Rope.png", img5: "/images/GameIcon-Rock.png", img6: "/images/GameIcon-Stick Upgraded.png", text: "CRAFTED AXE" },
        { img: "/images/Empty152.png", number: "", img4: "/images/GameIcon-Rope.png", img5: "/images/GameIcon-Cloth.png", img6: "/images/GameIcon-Stick Upgraded.png", text: "CRAFTED BOW" },
        { img: "/images/Empty152.png", number: "", img4: "/images/GameIcon-RabbitSkin.png", img5: "/images/GameIcon-Cloth.png", img6: "/images/GameIcon-Rope.png", number6: "2", text: "STICK BAG" },
        { img: "/images/Empty152.png", number: "", img4: "/images/GameIcon-BoarSkin.png", img5: "/images/GameIcon-Cloth.png", img6: "/images/GameIcon-Rope.png", number6: "2", text: "ROCK BAG" },
        { img: "/images/Empty152.png", number: "", img3: "/images/GameIcon-BoarSkin.png", number3: "2", img4: "/images/GameIcon-RabbitSkin.png", number4: "2", img5: "/images/GameIcon-Cloth.png", number5: "2", img6: "/images/GameIcon-Rope.png", number6: "3", text: "SPEAR BAG" },
        { img: "/images/GameIcon-RaccoonSkin.png", number: "", img2: "/images/GameIcon-BoarSkin.png", number2: "4", img3: "/images/GameIcon-DeerSkin.png", number3: "6", img4: "/images/GameIcon-RabbitSkin.png", img5: "/images/GameIcon-Cloth.png", number5: "2", img6: "/images/GameIcon-Rope.png", number6: "2", text: "WARMSUIT" },
    ]
    // Add more mappings as needed
};

// Handle right-clicks inside the polygons to spawn multiple images
$('.polygon').on('contextmenu', function(event) {
    event.preventDefault(); // Prevent the default context menu from appearing

    // Find the index of the polygon that was clicked
    var polygonIndex = $('.polygon').index(this);
    var item = items[polygonIndex]; // Get the corresponding item

    // Increment the click count for this polygon
    var polyName = 'Poly' + (polygonIndex + 1);
    clickCounts[polyName]++;
    updateDroppableText(); // Update text in the droppable area

    // Calculate new position for the cloned image
    var newPosition;
    if (!lastPositions[item.name]) {
        // For the first instance, randomize position within a larger area
        newPosition = getRandomPosition(containerWidth, containerHeight, 50); // Randomize within ±100 pixels
    } else {
        // For subsequent instances, cluster around the last position
        newPosition = getClusteredPosition(lastPositions[item.name], 20); // Cluster within ±20 pixels
    }

    // Clone and show the new image
    var clonedImage = item.draggable.clone().appendTo('#container');

    // Get the custom texts and images for this image based on its 'data-name'
    var customTextEntries = customTexts[item.name] || [{ text: "Default Text" }]; // Use a default if no match found

    // Add a custom tooltip with background, images, numbers, and texts
    var tooltip = $('<div class="custom-tooltip"></div>').appendTo(clonedImage);

    // Loop through the array of custom entries and generate the tooltip content
    var tooltipContent = '';  // Will hold the mixed text + image content

var tooltipContent = ''; // Initialize tooltip content

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

        // Clear the polygon counts display text
        $('#droppable p').text("");  // Clear the display text

        // Reset the clickCounts object to start from zero
        clickCounts = {};
  
        // Hide the Gear image
        $('#gear-image').hide();

        // Hide all other crafted images and show the correct one
        $('[id^="crafted-image"]').hide(); // Hide all crafted images
        $('#' + craftedImageId).show();    // Show the crafted image for the current combination
    });

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

        updateDroppableText(); // Update the droppable text after removing the image
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
});