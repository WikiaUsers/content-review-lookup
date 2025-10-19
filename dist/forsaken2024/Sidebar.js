var forsakenWikiSettings = {};
var settingsList = [
    {
        name: 'Epilepsy_Mode',
        desc: 'Enable Epilepsy Mode',
        isGadget: true,
        requiresLogin: false,
        initiate: function(){},
        functions: {
            change: switchEpilepsyMode
        }
    },
    {
        name: 'colorToggle',
        desc: 'Enable extra colors for Character Names',
        isGadget: true,
        requiresLogin: false,
        initiate: initiateTemplateColor,
        functions: {
            change: switchTemplateColor
        }
    }
];

// Utility functions
function getGadgetID(name) { return 'gadget-' + name; }
function getStorageID(name) { return name + 'Gadget'; }
function getCheckboxID(name) { return name + 'Switch'; }

function returnBool(value, truthy, falsy) {
    if (value === null || typeof value === "undefined") return false;
    if (value === truthy) return true;
    if (value === falsy) return false;
    return value;
}

function changeGadget(name, value, succeed, failure) {
    console.log('gadget fired: ' + name);
    new mw.Api().saveOption(getGadgetID(name), (value ? 1 : 0).toString())
    .done(function () {
        mw.user.options.set(getGadgetID(name), value);
        forsakenWikiSettings.settings[name] = value;
        if (typeof succeed === "function") succeed();
    })
    .fail(function () {
        if (typeof failure === "function") failure();
    });
}

// --- Epilepsy Mode ---
function switchEpilepsyMode(event) {
    var settingID = 'Epilepsy_Mode';
    var enabled = event.target.checked;
    console.log("Epilepsy Mode toggled:", enabled);

    if (forsakenWikiSettings.isLoggedIn) {
        changeGadget(settingID, enabled, function(){ location.reload(); });
    } else {
        localStorage.setItem(getStorageID(settingID), enabled ? 'True' : 'False');
        location.reload();
    }
}

// --- Color Toggle ---
function initiateTemplateColor() {
    activateTemplateColor();
}

function activateTemplateColor() {
    console.log("Color template activated");
    $(".color-template").removeClass("revertAllClass");
}

function deactivateTemplateColor() {
    console.log("Color template deactivated");
    $(".color-template").addClass("revertAllClass");
}

function switchTemplateColor(event) {
    var settingID = 'colorToggle';
    var enabled = event.target.checked;
    console.log("Color Toggle changed:", enabled);

    if (forsakenWikiSettings.isLoggedIn) {
        changeGadget(settingID, enabled, function() {
            location.reload(); // reload page after saving setting
        });
    } else {
        localStorage.setItem(getStorageID(settingID), enabled ? 'True' : 'False');
        location.reload(); // reload page for localStorage users
    }
}

// --- Build Settings Box ---
mw.loader.using(['mediawiki.api', 'mediawiki.util', 'mediawiki.user']).then(function() {
    forsakenWikiSettings.isLoggedIn = !mw.user.isAnon();
    forsakenWikiSettings.settings = {};

    // Load saved settings
    for (var i = 0; i < settingsList.length; i++) {
        var curSetting = settingsList[i];
        if (curSetting.isGadget && forsakenWikiSettings.isLoggedIn) {
            var gadgetEnabled = mw.user.options.get(getGadgetID(curSetting.name));
            forsakenWikiSettings.settings[curSetting.name] = returnBool(gadgetEnabled, "1", "0");
        } else {
            var storedSetting = localStorage.getItem(getStorageID(curSetting.name));
            forsakenWikiSettings.settings[curSetting.name] = returnBool(storedSetting, 'True', 'False');
        }
    }

    // Create sidebar container
    var settingsWrapper = document.createElement("div");
    settingsWrapper.classList.add("rail-module", "RightRailSettingsWrapper");
    settingsWrapper.id = "forsaken-wiki-right-rail-settings";
    document.querySelector(".right-rail-wrapper").prepend(settingsWrapper);

    // Header
    var header = "<h2>Settings</h2><br>\n";
    $("#" + settingsWrapper.id).append(header);

    // Build toggles
    for (var i = 0; i < settingsList.length; i++) {
        var curSetting = settingsList[i];
        var checkbox = document.createElement("input");
        checkbox.id = getCheckboxID(curSetting.name);
        checkbox.setAttribute("type", "checkbox");

        for (var attr in curSetting.functions) {
            checkbox.addEventListener(attr, curSetting.functions[attr]);
        }

        checkbox.checked = forsakenWikiSettings.settings[curSetting.name];

        if (forsakenWikiSettings.settings[curSetting.name] && "initiate" in curSetting && typeof curSetting.initiate === "function") {
            curSetting.initiate();
        }

        $("#" + settingsWrapper.id).append(checkbox, `<label for="${checkbox.id}">${curSetting.desc}</label><br>`);
    }

    // Styling
    var style = document.createElement("style");
    style.innerHTML = `
        #forsaken-wiki-right-rail-settings {
            background: black;
            border: 2px solid white;
            padding: 10px;
            border-radius: 5px;
            color: white;
        }
        #forsaken-wiki-right-rail-settings h2 {
            color: white;
        }
        #forsaken-wiki-right-rail-settings label {
            color: white;
            margin-left: 5px;
        }
    `;
    document.head.appendChild(style);
});