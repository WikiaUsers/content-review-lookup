/* Any JavaScript here will be loaded for all users on every page load. */
// Configuration for MapsExtended - This applies to specific maps
window.mapsExtendedConfigs = 
{
    "World Map": {
        categoryGroups:
	[
        {
            label: "Town",
            children: [ "7","8","9","10","11","12","13" ],
            collapsed: true
        },
        {
            label: "Dungeons",
            children: [ "14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35" ],
            collapsed: true
        },
        {
            label: "Shop",
            children:
            [
                {
                    label: "Emma",
                    children: [ "37","44","59","63","89","83","121" ],
                    collapsed: true
                },
                {
                    label: "Armory",
                    children: [ "39","80","41","58","88","69" ],
                    collapsed: true
                }, 
                
                {
                    label: "Trader",
                    children: [ "38","46","52","48","57","66","82","74","96","122"],
                    collapsed: true
                },
                {
                    label: "Other",
                    children: [ "40"],
                    collapsed: true
                }, 
            ],
            collapsed: true
        },
        {
            label: "Bank",
            children: [ "42","55","90","43","65","64" ],
            collapsed: true
        },
        {
            label: "TradeSkills",
            children:
            [
                {
                    label: "Alchemy",
                    children: [ "45","67" ],
                    collapsed: true
                },
                {
                    label: "Cooking",
                    children: [ "47","68","115" ],
                    collapsed: true
                }, 
                {
                    label: "Woodworking",
                    children: [ "92" ],
                    collapsed: true
                }, 
                {
                    label: "Forging",
                    children: [ "118","119","124" ],
                    collapsed: true
                }, 
                {
                    label: "Weaving",
                    children: [ "93" ],
                    collapsed: true
                },
            ],
            collapsed: true
        },
        {
            label: "Event Mobs",
            children: [ "78","113","123","125","126","127","128","129","130" ],
            collapsed: true
        },
        {
            label: "Guild Halls",
            children: [ "49","50","51","75","76","77","79","84","85","86","87","94","95","97","98","99","100","101","102","104","105","107","108","109","110","111","112","114","116","117","120" ],
            collapsed: true
        },
        {
            label: "Inn",
            children: [ "36","53","56","60","61","91" ],
            collapsed: true
        },
        {
            label: "Special",
            children:
            [
                {
                    label: "Combat",
                    children: [ "72" ],
                    collapsed: true
                },
                {
                    label: "Event",
                    children: [ "54" ],
                    collapsed: true
                }, 
                {
                    label: "Challenge",
                    children: [ "81","103" ],
                    collapsed: true
                }, 
                {
                    label: "Gambling",
                    children: [ "71", "73" ],
                    collapsed: true
                }, 
                {
                    label: "Other",
                    children: [ "62","106" ],
                    collapsed: true
                },
            ],
            collapsed: true
        }
	]
    }
};