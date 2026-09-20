/**
 * This Common.js file has been intentionally cleaned up.
 *
 * The previous script was removed because all of its features had become
 * obsolete and non-functional for several years due to changes in Fandom’s
 * platform, APIs, and upload workflows. None of the legacy code was still
 * executed or relevant, and several dependencies no longer existed.
 *
 * This minimal version is used only to confirm that Common.js is correctly
 * loaded during regression testing. Once validation is complete, the file
 * will remain empty unless new, actively maintained functionality is needed.
 */

/* Test Beacon – Vérification que Common.js est actif */
(function () {
    console.log("[Common.js] Test Beacon actif ✔");

    var beacon = document.createElement("meta");
    beacon.name = "commonjs-test-beacon";
    beacon.content = "active";
    document.head.appendChild(beacon);
})();