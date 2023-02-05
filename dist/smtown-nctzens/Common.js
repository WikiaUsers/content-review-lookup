/* Any JavaScript here will be loaded for all users on every page load. */
window.railWAM = {
  logPage:"Project:WAM Log"
};

/* Timeanddate */
if (!window.andrewds1021) {
    window.andrewds1021 = {
        timeanddate_clock: {
            defaults: {}
        }
    };
} else if (!window.andrewds1021.timeanddate_clock) {
    window.andrewds1021.timeanddate_clock = {
        defaults: {}
    };
} else if (!window.andrewds1021.timeanddate_clock.defaults) {
    window.andrewds1021.timeanddate_clock.defaults = {};
}