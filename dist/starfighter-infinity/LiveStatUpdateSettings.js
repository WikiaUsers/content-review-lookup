statUpdateSettings = {};
statUpdateSettings.shipBaseSpeedMult = 1.25;

// *** List of unreleased races. Adding a race to this list will hide
// *** their items from auto-populated uncategorized item lists
var racesToSkipInUncategorizedList = [
    "Enlightened",
    "Chronoduke",
    "Church of Megmos",
    "Robosphere",
    "Face of Space"
];

// *** List of items which aren't available to players and therefore
// *** should be hidden from auto-populated uncategorized item lists
var itemsToSkipInUncategorizedList = [
    "Solarion Orbital Sphere",
    "Tractor Beam",
    "Disheartener Beacon",
    "Wabbajack",
    "Micro Gate TBZ",
    "Cake Slice",
    "Candle Torpedo",
    "Firestorm",
    "Firework Pellet",
    "Shard Torpedo",
    "Igni Rock Rocket I",
    "Big Smoke Screen",
    "Double Barrelled Heavy Bolt I",
    "Double Barrelled Heavy Bolt II",
    "Double Barrelled Heavy Bolt III",
    "Double Barrelled Heavy Bolt IV",
    "Double Barrelled Heavy Bolt V",
    "Minibomb Turret",
];

// *** List of words which should not be stemmed before performing wiki link replacements
// *** Example:  devastating gets stemmed to devast and links to the Devastator ship page
var exactMatchWordListForWikiLinkReplacements = [
    "Devastator"
];

// *** List of words which should not result in wiki link replacements at all.
// *** Typically generic words which would result in unexpected linkage.
var doNotPerformWikiLinkReplacementsWordList = [
    "Weapon"
];

// *** List of words which, when attempting to stem, should instead be replaced by synonym or specific
// *** spelling of the word. This helps with certain edge cases that the stemmer doesn't catch.
var synonymListForWikiLinkReplacements = {
    fly: [ "flies" ]
}