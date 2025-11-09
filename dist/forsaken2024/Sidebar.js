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
            location.reload();
        });
    } else {
        localStorage.setItem(getStorageID(settingID), enabled ? 'True' : 'False');
        location.reload();
    }
}

// --- Build Settings Box ---
mw.loader.using(['mediawiki.api', 'mediawiki.util', 'mediawiki.user']).then(function() {

    if (
        mw.config.get('wgAction') === 'edit' || 
        mw.config.get('wgAction') === 'submit' || 
        mw.config.get('wgCanonicalSpecialPageName') === 'VisualEditor' ||
        document.body.classList.contains('ve-active') ||
        document.body.classList.contains('source-editing')
    ) return;

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

    // Create floating container
    var settingsWrapper = document.createElement("div");
    settingsWrapper.classList.add("RightRailSettingsWrapper");
    settingsWrapper.id = "forsaken-wiki-right-rail-settings";
    document.body.appendChild(settingsWrapper);

    // Header + Buttons
    var header = `
        <h2>Settings</h2>
        <div class="settings-buttons">
            <button id="settings-discussions">💬 Discussions</button>
            <button id="settings-analytics">📜 Recent Changes</button>
            <button id="settings-theme-toggle">🌗 Theme</button>
        </div>
        <br>
    `;
    $("#" + settingsWrapper.id).append(header);

    $("#settings-discussions").on("click", function() {
        if (window.location.pathname === "/f/") {
            window.location.href = "/wiki/Main_Page";
        } else {
            window.location.href = "/f/";
        }
    });

    $("#settings-analytics").on("click", function() {
        window.location.href = "/wiki/Special:RecentChanges";
    });

    $("#settings-theme-toggle").on("click", function() {
        var themeSwitch = document.querySelector(".wiki-tools__theme-switch, .wds-button.wds-is-secondary.wiki-tools__theme-switch");
        if (themeSwitch) themeSwitch.click();
    });

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

    // --- Add collapse arrow (kept near top, under dropdowns) ---
    var collapseArrow = document.createElement("div");
    collapseArrow.id = "settings-collapse-arrow";
    collapseArrow.innerHTML = "⬆"; 
    collapseArrow.style.cursor = "pointer";
    collapseArrow.style.textAlign = "center";
    collapseArrow.style.position = "fixed";
    collapseArrow.style.right = "20px";
    collapseArrow.style.top = "60px"; // keep top position
    collapseArrow.style.zIndex = "10"; // below notification dropdowns
    collapseArrow.style.background = "black";
    collapseArrow.style.color = "white";
    collapseArrow.style.border = "2px solid white";
    collapseArrow.style.borderRadius = "4px";
    collapseArrow.style.width = "30px";
    collapseArrow.style.height = "20px";
    collapseArrow.style.lineHeight = "20px";
    document.body.appendChild(collapseArrow);

    // Load collapsed state, default open if first visit
    var stored = localStorage.getItem("forsakenSettingsCollapsed");
    var collapsed = stored === null ? false : stored === "true";

    function applyCollapseState() {
        var wrapper = document.getElementById("forsaken-wiki-right-rail-settings");
        wrapper.style.display = collapsed ? "none" : "block";
        collapseArrow.innerHTML = collapsed ? "⬇" : "⬆";
    }

    collapseArrow.addEventListener("click", function() {
        collapsed = !collapsed;
        localStorage.setItem("forsakenSettingsCollapsed", collapsed);
        applyCollapseState();
    });

    applyCollapseState();

    mw.hook('ve.activationStart').add(function() {
        $("#forsaken-wiki-right-rail-settings").hide();
    });
    mw.hook('ve.deactivationComplete').add(function() {
        $("#forsaken-wiki-right-rail-settings").show();
    });

    // Styling
    var style = document.createElement("style");
    style.innerHTML = `
    #forsaken-wiki-right-rail-settings {
        position: absolute;
        top: 80px;
        right: 20px;
        width: 200px;
        max-height: 220px;
        overflow-y: auto;  
        background: black;
        border: 2px solid white;
        padding: 5px;
        border-radius: 4px;
        color: white;
        z-index: 10;
        font-size: 11px;
    }
    #forsaken-wiki-right-rail-settings h2 {
        color: white;
        margin-top: 0;
        text-align: center;
        font-size: 14px;
    }
    .settings-buttons {
        display: flex;
        justify-content: space-between;
        gap: 2px;
    }
    .settings-buttons button {
        flex: 1;
        background: #111;
        color: #fff;
        border: 1px solid #555;
        border-radius: 3px;
        cursor: pointer;
        transition: 0.2s;
        font-size: 10px;
        padding: 2px;
    }
    .settings-buttons button:hover {
        background: #333;
        border-color: #fff;
    }
    #forsaken-wiki-right-rail-settings label {
        color: white;
        margin-left: 4px;
        font-size: 11px;
    }
    #settings-collapse-arrow {
        font-size: 14px;
        text-align: center;
        cursor: pointer;
    }
    `;
    document.head.appendChild(style);
});