/**
 * ChatMessageWallCount.js
 * @file Provides button displaying number of unread message wall threads with a
 *       link to the user's message wall on click.
 * @author Eizen <dev.fandom.com/wiki/User_talk:Eizen>
 * @external "jQuery"
 * @external "mw"
 * @external "wikia.nirvana"
 * @external "wikia.window"
 * <nowiki>
 */

/*jslint browser, this:true */
/*global require,mw,jQuery,wk,nv */

require(["jquery", "mw", "wikia.nirvana", "wikia.window"],
    function (jQuery, mw, nirvana, wk) {
  "use strict";

  wk.dev = wk.dev || {};

  if (
    wk.wgCanonicalSpecialPageName !== "Chat" ||
    (wk.dev || {}).isChatMessageWallCountLoaded
  ) {
    return;
  }
  (wk.dev = wk.dev || {}).isChatMessageWallCountLoaded = true;

  /**
   * @description This constant is used solely to display a few error messages
   * in the console used to determine when new data is being queried and fetched
   * and so forth.
   *
   * @const
   */
  const DEBUG = false;

  /**
   * @class CMWC
   * @classdesc The main ChatMessageWallCount object, containing all functions
   * and object related to the display and acquisition of message wall-related
   * data. At present, the script will display a counter indicating the number
   * of unread threads present on the user's message wall, passively querying
   * the applicable controller for updated data as long as the user remains in
   * chat. The user may manually update the counter by pressing the main button
   * or may navigate to his/her message wall by pressing the counter itself.
   * <br />
   * <br />
   * In future, hovering over the button will display a dropdown modal similar
   * in design to that presently employed by Speedit's ConsistentNotifications
   * script, showing the user the contents of queried <code>data.html</code>.
   */
  var CMWC = {};

  /**
   * @description This object is used simply to store some frequently used
   * properties like element identifier <code>string</code>s and query refresh
   * intervals and the like. These values are stored here to allow for changes
   * in a single place rather than the simultaneous adjustment of values
   * scattered at random throughout the class object body.
   */
  CMWC.utility = {
    name: "ChatMessageWallCount",    // Application name/data-id
    buttonId: "cmwc-button",         // Id for main UI wds button
    counterId: "cmwc-count",         // Id for Counter wds button
    unreadClass: "cmwc-newMessages", // Class name for notification color
    notificationColor: "#FF481F",    // Background/border hue used for new data
    refreshRate: 60000,              // Rate at which new data is queried
    loaded: 0,                       // Number of loaded external dependencies
    isDataRequestInProgress: false,  // Flag denoting state of data requests
  };

  /**
   * @description This method is used to build the intial Chat-js button-driven
   * interface displayed in the upper right of the Chat header topbar. In
   * addition to injecting some CSS used to style the button, the function
   * defines the behavior of user clicks on the interface components. Though the
   * script will passively scan for new threads as long as the user remains in
   * chat, pressing anywhere on the interface will manually update the count.
   * Pressing the counter button will open the user's message wall in a new tab.
   * <br />
   * <br />
   * Thanks for the design inspiration go to User:Speedit. In future, I intend
   * to also make use of the suggestion to provide a dropdown on hover that
   * displays the contents of <code>data.html</code> to the user.
   *
   * @returns {wikia.window.dev.chat.Button}
   */
  CMWC.constructUI = function () {

    // Inject CSS shrinking size of counter wds button + newMessage coloration
    mw.util.addCSS(
      "#" + this.utility.counterId + " {" +
        "padding: 0px 5px !important;" +
        "margin-left: 5px !important;" +
      "}" +
      "." + this.utility.unreadClass + " {" +
        "background-color: " + this.config.notificationColor + " !important;" +
        "border-color: " + this.config.notificationColor + " !important;" +
      "}"
    );

    // Manual update on click of interface, message wall tab on counter click
    return new wk.dev.chat.Button({
      name: this.utility.name,
      attr: {
        click: jQuery.proxy(this.getCount, this, true),
        "id": this.utility.buttonId,
        text: this.i18n.msg("title").plain(),
        append: jQuery("<a>", {
          target: "_blank",
          href: mw.util.getUrl("Message Wall:" + wk.wgUserName),
          "class": "wds-button",
          id: this.utility.counterId,
          text: this.i18n.msg("loading").plain()
        })
      }
    });
  };

  /**
   * @description This function is used to query for updated information
   * pertaining to the user's unread message wall activity. It may be called
   * passively on a set refresh interval or manually via the user's press of the
   * UI interface. If pressed manually, the counter button will display the
   * "Loading..." text to indicate to the user that their click worked to
   * accomplish something. Otherwise, so as to not be too distracting to the
   * user, passive invocations of this method will not flash the loading text.
   *
   * @param {boolean} isManuallyUpdating Flag denoting user's manual refresh
   * @returns {void}
   */
  CMWC.getCount = function (isManuallyUpdating) {

    // Declarations
    var that, $counter;

    // Preserve context
    that = this;

    // Thread counter element
    $counter = jQuery("#" + this.utility.counterId);

    // On click, let user know data is updating by flashing "Loading..."
    if (isManuallyUpdating) {
      $counter.html(this.i18n.msg("loading").plain());

      // Halt automatic refresh until manual request handled
      this.stopAutoRefreshTimer();
      this.utility.isDataRequestInProgress = true;
    }

    if (DEBUG) {
      console.log(this.i18n.msg("title").plain() + " " +
        this.i18n.msg("loading").plain().toLowerCase());
    }

    nirvana.getJson(
      "WallNotificationsExternal",
      "getUpdateCounts"
    ).done(function (data) {
      if (!data.error) {

        // Color background/border if new messages as handy visual cue
        $counter[(data.count > 0)
          ? "addClass"
          : "removeClass"
        ](that.utility.unreadClass);

        // Apply to counter element
        $counter.html(data.count);

        if (DEBUG) {
          console.log(that.i18n.msg("message").plain().replace("$1",
            data.count));
        }
      }

      // Restart auto-refresh timer and indicate the processing is complete
      if (isManuallyUpdating) {
        that.startAutoRefreshTimer();
        that.utility.isDataRequestInProgress = false;
      }
    });
  };

  /**
   * @description This function is responsible for handling the cases wherein
   * the <code>setInterval</code> timer is run. If the user is not engaged in
   * the main chat window, the timer is not run and the counter is not updated.
   * Otherwise, assuming the <code>isDataRequestInProgress</code> flag
   * indicating that a manual call for data is being handled is false, the timer
   * is started.
   *
   * @returns {void}
   */
  CMWC.enableAutoRefresh = function () {

    // Preserve context
    var that = this;

    jQuery(window).focus(function () {

      // If focused, data should be requested unless manual query is processing
      if (!that.utility.isDataRequestInProgress) {

        // Start a new timer and flag as in progress
        that.startAutoRefreshTimer();
        that.utility.isDataRequestInProgress = true;
      }
    }).blur(function () {

      // Turn auto-refresh timer off if user is not watching the chat
      that.stopAutoRefreshTimer();
      that.utility.isDataRequestInProgress = false;
    });
  };

  /**
   * @description This function is used to start the auto-refresh timer that
   * handles the intermittent requesting of message wall data over a set
   * interval. Assuming the <code>refreshInterval</code> is not of a value of
   * <code>null</code>, the interval calls <code>CMWC.getCount</code> over the
   * interval of <code>CMWC.config.refreshRate</code>
   *
   * @returns {void}
   */
  CMWC.startAutoRefreshTimer = function () {
    if (!this.refreshInterval) {
      this.refreshInterval = setInterval(
        jQuery.proxy(this.getCount, this, false), this.config.refreshRate);
    }
  };

  /**
   * @description Like the function above it, this function is used to oversee
   * the handling of intermittent requests for new message wall data related to
   * unread threads over a set interval. If the <code>refreshInterval</code> is
   * extant, it is cleared and the object property itself reset to a value of
   * <code>null</code>.
   *
   * @returns {void}
   */
  CMWC.stopAutoRefreshTimer = function () {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
      this.refreshInterval = null;
    }
  };

  /**
   * @description The main function of the script is responsible for setting the
   * I18n content as a class object property for use by all contained functions
   * as well as handling the initial construction of the interface and the
   * constant querying for updated message wall thread information. The function
   * also handles the configuration of user-specific variables related to the
   * new notification color to which the background and border of the counter
   * wds button are set on receipt of new threads and the refresh rate at which
   * the script scans for new data.
   *
   * @param {JSON} lang I18n-js content to be used as object property
   * @returns {void}
   */
  CMWC.main = function (lang) {

    // Preserve context
    var that = this;

    // Set I18n-js data as class object property
    this.i18n = lang;
    this.i18n.useContentLang();

    // Permit user-specific config for notification hue and refresh rate
    this.config = jQuery.extend({
      notificationColor: that.utility.notificationColor,
      refreshRate: that.utility.refreshRate,
    }, wk.configChatMessageWallCount);

    if (DEBUG) {
      console.log(this.config);
    }

    // Build interface and grab initial data
    this.$button = this.constructUI();
    this.getCount(false);

    // Define interval object property and start the automatic querying process
    this.enableAutoRefresh();
  };

  /**
   * @description This function, the credit for which must go to
   * User:KockaAdmiralac as seen in ChatAwayButton, is a handy way of waiting
   * for all external dependencies to load prior to their use without having to
   * default to the use of <code>jQuery.Deferred</code> et al.
   *
   * @returns {void}
   */
  CMWC.init = function () {
    if (++this.utility.loaded === 3) {
      wk.dev.i18n.loadMessages(this.utility.name).then(
        jQuery.proxy(this.main, this));
    }
  };

  // Hooks for required external dependencies
  mw.hook("dev.i18n").add(jQuery.proxy(CMWC.init, CMWC));
  mw.hook("dev.chat.render").add(jQuery.proxy(CMWC.init, CMWC));
  mw.loader.using("mediawiki.util").then(jQuery.proxy(CMWC.init, CMWC));

  wk.importArticles({
    type: "script",
    articles: [
      "u:dev:MediaWiki:Chat-js.js",
      "u:dev:MediaWiki:I18n-js/code.js",
    ],
  });
});