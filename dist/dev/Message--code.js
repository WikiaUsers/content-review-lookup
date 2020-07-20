/**
 * <nowiki>
 * Message.js
 * @file Allows for mass-messaging of multiple users from a modal
 * @author AnimatedCartoons <dev.wikia.com/wiki/User_talk:AnimatedCartoons>
 * @author Eizen <dev.wikia.com/wiki/User_talk:Eizen>
 * @license CC-BY-SA 3.0
 * @external "mediawiki.util"
 * @external "mediawiki.api"
 * @external "jQuery"
 * @external "mw"
 * @external "wikia.window"
 * @external "wikia.nirvana"
 */

/*jslint browser, this:true */
/*global mw, jQuery, window, require, wk, nirvana */

require(["jquery", "mw", "wikia.window", "wikia.nirvana"],
    function (jQuery, mw, wk, nirvana) {
  "use strict";

  wk.dev = wk.dev || {};

  if ((wk.dev || {}).isMessageLoaded || wk.message) {
    return;
  }
  (wk.dev = wk.dev || {}).isMessageLoaded = true;

  /**
   * @description This constant is used solely to display a few error messages
   * in the console used to determine when new data is being queried and fetched
   * and so forth. A reviewed version of the script should not have this flag
   * set to <code>true</code>.
   *
   * @const
   */
  const DEBUG = false;

  /**
   * @class Message
   * @classdesc The main Message object, containing all the object properties
   * and functions required to implement the base functionality as defined in
   * the previous incarnation of the script and the updates made in the
   * subsequent rewrite to permit the inclusion of user config and external
   * dependencies.
   */
  var Message = {};

  /**
   * @description Though not a proper pseudo-enum due to the lack of the
   * requisite <code>const</code> keyword, this object is essentially immutable
   * and is used to store unchanging values and data that are used throughout
   * the script as needed. These are consolidated in a single place to permit
   * easy configuration and change if needed.
   * <br />
   * <br />
   * Included here are arrays and objects related to the dependencies to add as
   * hooks, default configuration related to edit interval and placement of the
   * initializing button in the interface, and element selector names to make
   * name standardization easier.
   */
  Message.utility = Object.freeze({
    name: "Message",
    dependencies: [
      "i18n",
      "enablewallext",
      "placement",
      "modal",
    ],
    defaultConfig: {
      interval: 1500,
      placement: {
        element: "toolbar",
        type: "append",
      }
    },
    acceptedTypes: [
      "append",
      "prepend",
    ],
    validUsergroups: [
      "sysop",
      "content-moderator",
      "threadmoderator",
      "bot",
      "bot-global",
      "staff",
      "vstf",
      "helper",
      "global-discussions-moderator",
      "content-volunteer"
    ],
    selectors: {
      ids: {
        mainContainer: "message-main-container",
        mainForm: "message-main-form",
        mainFieldset: "message-main-fieldset",
        mainUsers: "message-main-users-textarea",
        mainTitle: "message-main-title-input",
        mainBody: "message-main-title-textarea",
        mainLog: "message-main-log",
        previewContainer: "message-preview-container",
        previewContentTitle: "message-preview-content-title",
        previewContentBody: "message-preview-content-body",
      },
      classes: {
        form: "WikiaForm",
        overflow: "overflow",
        preview: "ArticlePreview",
        article: "WikiaArticle",
      },
    },
  });

  // Utility functions

  /**
   * @description This function was taken from the author's MassEdit script and
   * is simply a means of adding a wellformed log entry to the modal status log
   * indicating to the user the state of the operations being performed. An
   * overloaded version is included to permit replacement of default text for
   * the addition of more customized messages.
   *
   * @param {string} paramKey I18n-js <code>string</code> identifier
   * @returns {void}
   */
  Message.addLogEntry = function (paramKey) {
    jQuery("#" + this.utility.selectors.ids.mainLog).prepend(
      this.i18n.msg(paramKey).escape() + "<br/>");
  };

  /**
   * @description This function, like that above it, was taken from the author's
   * flagship MassEdit script and is similarly used to a add a customized
   * message to the modal status log that replaces the default message's
   * placeholder text with a more specific <code>string</code>. It may be
   * thought of in terms of Java as an overloaded method of the above.
   *
   * @param {string} paramKey I18n-js <code>string</code> identifier
   * @param {string} paramEntry Substitution for "$1"
   * @returns {void}
   */
  Message.addLogEntry = function (paramKey, paramEntry) {
    jQuery("#" + this.utility.selectors.ids.mainLog).prepend(
      this.i18n.msg(paramKey, paramEntry).escape() + "<br />");
  };

  /**
   * @description This utility method simply converts the included parameter
   * <code>string</code> to lowercase and replaces all extant spaces with
   * standard dashes. It is used as the name implies to create a cheap, easy
   * element selector id for use in the dynamic assembly of modals and elements.
   *
   * @param {string} paramString <code>string</code> to be lowercase'd/hyphened
   * @returns {string}
   */
  Message.IDify = function (paramString) {
    return paramString.toLowerCase().replace(/ /g, "-");
  };

  /**
   * @description This utility function is used to test that the included
   * parameter <code>string</code> does not possess any included characters that
   * are deemed impermissible by <code>window.wgLegalTitleChars</code>. A
   * <code>boolean</code> is returned to indicate the status of the test.
   *
   * @param {string} paramString String to be checked for legitimacy
   * @returns {boolean}
   */
  Message.isLegalInput = function (paramString) {
    return this.legalChars.test(paramString);
  };

  /**
   * @description This utility function makes use of Wikia's LinkSuggest to
   * provide prompts in the main <code>textarea</code> when users add links to
   * their messages. Function is called by <code>Message.displayMainModal</code>
   * whenever the modal is displayed.
   *
   * @return {void}
   */
  Message.addLinkSuggest = function () {
    jQuery("#" + this.utility.selectors.ids.mainBody).linksuggest();
  };

  /**
   * @description This small helper function was included simply to make it
   * slightly easier to clear all input fields and <code>textarea</code>s of
   * input if necessary in the course of input evaluation prior to the start of
   * the mass messaging operations.
   *
   * @returns {void}
   */
  Message.resetForm = function () {
    jQuery("#" + this.utility.selectors.ids.mainForm)[0].reset();
  };

  /**
   * @description This utility function is used simply to fire the
   * <code>wikipage.content</code> (<code>wikipage_content</code>) hook
   * immediately following the display of the preview modal to the user. It
   * permits the proper display of tabbers and ancillary collapsible elements in
   * the preview modal.
   *
   * @returns {void}
   */
  Message.supportCollapsibles = function () {
    mw.hook("wikipage.content").fire(
      // mw.util.$content[0].id vs mw.util.$content.selector
      jQuery("#" + this.previewModal.id + " #" + mw.util.$content[0].id));
  };

  /**
   * @description This builder function is used to return the assembled
   * initializer link button. This element will then be added to the page to a
   * permissible Placement.js location that is stipulated by the user in the
   * user config object. This function simply returns a link element within a
   * standard list element with all selectors and click handlers included in the
   * assembly. On click, the button will invoke the main modal assembly function
   * and show the interface to the user.
   *
   * @param {string} paramText <code>string</code> text for the button/title
   * @returns {object}
   */
  Message.constructItem = function (paramText) {
    return jQuery("<li>", {
      "class": this.utility.selectors.classes.overflow,
      "id": this.IDify(this.utility.name + "-li"),
    }).append (
      jQuery("<a>", {
        "id": this.IDify(this.utility.name + "-a"),
        "href": "#",
        "title": paramText,
        "click": jQuery.proxy(this.displayMainModal, this),
        "text": paramText,
      })
    );
  };

  /**
   * @description This function, while not strictly necessary, is useful in
   * removing some small bits of redundant code. It is invoked whenever a new
   * new modal window is defined and subsequently displayed. Under the present
   * build of the script, it should only be called twice, once of the main modal
   * and once for the preview modal.
   *
   * @param {string} paramContent Modal body (HTML)
   * @param {string} paramTitle Title of the modal
   * @param {!Array<>} paramButtons Array of buttons objects
   * @param {object} paramEvents Events attached to the buttons
   * @returns {wikia.window.dev.modal.Modal}
   */
  Message.buildModal = function (paramContent, paramTitle, paramButtons,
      paramEvents) {
    return new wk.dev.modal.Modal({
      content: paramContent,
      id: this.IDify("form-" + paramTitle),
      size: "medium",
      title: paramTitle,
      buttons: paramButtons,
      events: paramEvents,
    });
  };

  // Validator functions

  /**
   * @description The first of two user input validators, this function is used
   * to ensure that the user's included config details related to Placement.js
   * are wellformed and legitimate. Message.js offers support for all of
   * Placement.js's default element locations, though as a nod to the previous
   * incarnation of the script, the default placement element is the toolbar and
   * the default type is "append." In the event of an error being caught due to
   * a malformed element location or a missing type, the default config options
   * housed in <code>Message.utility.defaultConfig</code> are used instead to
   * ensure that user input mistakes are handled somewhat gracefully.
   *
   * @param {object} paramConfig Placement.js-specific config
   * @returns {object} config Adjusted Placement.js config
   */
  Message.validatePlacement = function (paramConfig) {

    // New config object
    var config = {};

    // Validate element placement
    if (paramConfig.element) {
      try {
        config.element = this.placement.element(paramConfig.element);
      } catch (e) {
        if (DEBUG) {
          console.log(e);
        }

        config.element = this.placement.element(
          this.utility.defaultConfig.placement.element);
      }
    }

    // Validate type
    if (paramConfig.type) {
      try {
        config.type = this.placement.type(
          (jQuery.inArray(paramConfig.type, this.utility.acceptedTypes) !== -1)
            ? paramConfig.type
            : this.utility.defaultConfig.placement.type
        );
      } catch (e) {
        if (DEBUG) {
          console.log(e);
        }

        config.type = this.placement.type(
          this.utility.defaultConfig.placement.type);
      }
    }

    return config;
  };

  /**
   * @description The second of the two validator functions used to check that
   * user input is wellformed and legitimate, this function checks the user's
   * edit interval value against the permissible values for standard users and
   * flagged bot accounts. In order to ensure that the operations are carried
   * out smoothly, the user's rate is adjusted if it exceeds the edit
   * restrictions placed upon accounts of different user rights levels.
   * <br />
   * <br />
   * The original incarnation of this code came from the author's flagship
   * script MassEdit, which makes use of a similar system to ensure the smooth
   * progression through all included pages without loss of required edits.
   *
   * @see <a href="https://git.io/fA4Jk">SUS-4775</a>
   * @see <a href="https://git.io/fA4eQ">VariablesBase.php</a>
   * @param {integer} paramInterval User's interval
   * @return {integer} Adjusted interval
   */
  Message.validateInterval = function (paramInterval) {
    if (
      jQuery.inArray("bot", wk.wgUserGroups) !== -1 &&
      paramInterval < 750
    ) {
      return 750; // Reset to max 80 edits/minute
    } else if (
      jQuery.inArray("user", wk.wgUserGroups) !== -1 &&
      paramInterval < 1500
    ) {
      return 1500; // Reset to max 40 edits/minute
    } else {
      return paramInterval;
    }
  };

  // Posting functions

  /**
   * @description One of two such methods, this function is used to post an
   * individual thread on the parameter user's message wall. Returning a JS
   * Promise, the function provides the data for testing and logging purposes on
   * a successful edit and returns the associated error if the operation was
   * unsuccessful. This function is called from within the
   * <code>setInterval</code> function of the relevant handler
   * <code>Message.handleMessaging</code> if message walls are enabled on-wiki.
   *
   * @param {string} paramTitle Title of the message
   * @param {string} paramBody Content of the message
   * @param {string} paramUser User to whose wall the message will be added
   * @returns {Promise}
   */
  Message.postMessageWallThread = function (paramTitle, paramBody, paramUser) {
    return new Promise(function (resolve, reject) {
      nirvana.postJson("WallExternal", "postNewMessage", {
        token: mw.user.tokens.get("editToken"),
        messagetitle: paramTitle,
        body: paramBody,
        pagenamespace: 1200,
        pagetitle: "Message Wall:" + paramUser,
      }).done(function (data) {
        if (!data.error) {
          resolve(data);
        } else {
          reject(data.error);
        }
      }).fail(function (data) {
        reject(data.error);
      });
    });
  };

  /**
   * @description The second such method, this function is responsible for
   * posting a new topic on the talk page of the included parameter user. Like
   * the function above, it returns a JS Promise and provides the data for
   * testing and logging purposes on success and the associated error on failed
   * operations. It too is called from within the <code>setInterval</code>
   * construct of <code>Message.handleMessaging</code> if message walls are not
   * enabled on the wiki.
   *
   * @param {string} paramTitle Title of the message
   * @param {string} paramBody Content of the message
   * @param {string} paramUser User to whose talk page the message will be added
   * @returns {Promise}
   */
  Message.postTalkPageTopic = function (paramTitle, paramBody, paramUser) {
    return new Promise(function (resolve, reject) {
      Message.api.post({
        token: mw.user.tokens.get("editToken"),
        action: "edit",
        title: "User talk:" + paramUser,
        section: "new",
        sectiontitle: paramTitle,
        text: paramBody,
      }).done(function (data) {
        if (!data.error) {
          resolve(data);
        } else {
          reject(data.error);
        }
      }).fail(function (data) {
        reject(data.error);
      });
    });
  };

  // Previewing functions

  /**
   * @description This function is one of two that handle the previewing of a
   * formatted message, with this specific function used if message walls are
   * enabled on the wiki. Like all of the data request functions in the script,
   * it returns a standard JS Promise that provides the invoking handler
   * <code>Message.handlePreviewing</code> with the HTML of the message in
   * question on successful preview operations or the associated error on failed
   * operations.
   *
   * @param {string} paramBody Content of the message
   * @returns {Promise}
   */
  Message.previewMessageWallThread = function (paramBody) {
    return new Promise(function (resolve, reject) {
      nirvana.postJson("WallExternal", "preview", {
        body: paramBody,
      }).done(function (data) {
        if (!data.error) {
          resolve(data.body);
        } else {
          reject(data.error);
        }
      }).fail(function () {
        reject(data.error);
      });
    });
  };

  /**
   * @description Like its matched function above, this function is used to
   * handle previewing of messages on wikis that do not have message walls
   * enabled. Like the rest of the querying functions, this particular instance
   * returns a Promise that provides the invoking handler function, namely
   * <code>Message.handlePreviewing</code>, with the HTML of the message in
   * question on successful previewing operations or the relevant error on
   * failed operations.
   *
   * @param {string} paramBody Content of the message
   * @returns {Promise}
   */
  Message.previewTalkPageTopic = function (paramBody) {
    return new Promise(function (resolve, reject) {
      jQuery.ajax({
        type: "POST",
        url: mw.util.wikiScript("index"),
        data: {
          action: "ajax",
          rs: "EditPageLayoutAjax",
          page: "SpecialCustomEditPage",
          method: "preview",
          content: paramBody,
        }
      }).done(function (data) {
        if (!data.error) {
          resolve(data.html);
        } else {
          reject(data.error);
        }
      }).fail(function () {
        reject(data.error);
      });
    });
  };

  // Display functions

  /**
   * @description This function is simply used to inject some custom CSS rules
   * on invocation by <code>Message.main</code> used to style the various modals
   * and <code>textarea</code>s. Though this could be moved to an external file
   * named MediaWiki:Message.css or something, keeping it here allows the author
   * to adjust selector names in a single location without having to edit
   * multiple files.
   *
   * Some styles originally appearing in the author's flagship MassEdit script
   * were applied and adjusted here, specifically those related to the look of
   * the status log element.
   *
   * @returns {void}
   */
  Message.injectStyles = function () {
    mw.util.addCSS(
      "#" + this.utility.selectors.ids.mainContainer + " {" +
        "margin: auto;" +
        "position: relative;" +
        "width: 96%;" +
      "}" +
      "#" + this.utility.selectors.ids.previewContentBody + "," +
      "#" + this.utility.selectors.ids.mainUsers + "," +
      "#" + this.utility.selectors.ids.mainTitle + "," +
      "#" + this.utility.selectors.ids.mainBody + " {" +
        "width: 99.6%;" +
        "padding: 0;" +
        "resize: none;" +
      "}" +
      "#" + this.utility.selectors.ids.previewContentTitle + " h2 {" +
        "margin-top: 0;" +
      "}" +
      "#" + this.utility.selectors.ids.previewContentBody + " .pagetitle {" +
        "display: none !important;" +
      "}" +
      "#" + this.utility.selectors.ids.previewContainer + "{" +
        "border: 1px solid #323232;" +
        "padding: 10px;" +
        "overflow: auto;" +
      "}" +
      "#" + this.utility.selectors.ids.mainLog + "{" +
        "height: 55px;" +
        "width: 99.6%;" +
        "border: 1px solid;" +
        "font-family: monospace;" +
        "background: #FFFFFF;" +
        "color: #AEAEAE;" +
        "overflow: auto;" +
        "padding: 0;" +
      "}"
    );
  };

  /**
   * @description This function is one of two responsible for building the
   * script's collection of modals. This particular function is used to define
   * and assemble the main modal containing the various <code>textarea</code>s
   * used for users and message input. Making use of the utility function
   * <code>Message.buildModal</code>, this function contains the Modal.js config
   * and the HTML of the modal that are together passed to create and show the
   * modal in the window. The modal is only made once, with that instance
   * displayed in all subsequent requests for the main interface.
   *
   * @returns {void}
   */
  Message.displayMainModal = function () {

    // Avoid rebuilding the modal if it's extant
    if (this.hasMainModalBeenAssembled) {
      this.messageModal.show();
      this.addLinkSuggest();
      return;
    }

    // Declarations
    var body, title, buttons, events;

    // Definitions
    title = this.i18n.msg("message").escape();
    buttons = [
      {
        text: this.i18n.msg("send").escape(),
        primary: true,
        event: "send",
      },
      {
        text: this.i18n.msg("preview").escape(),
        primary: true,
        event: "preview",
      },
      {
        text: this.i18n.msg("cancel").escape(),
        event: "close",
      },
    ];
    events = {
      send: jQuery.proxy(Message.handleMessaging, Message),
      preview: jQuery.proxy(Message.handlePreviewing, Message),
    };
    body =
      "<div id='" + this.utility.selectors.ids.mainContainer + "' >" +
        "<form " +
            "id='" + this.utility.selectors.ids.mainForm + "' " +
            "class='" + this.utility.selectors.classes.form + "' >" +
          "<fieldset " +
              "id='" + this.utility.selectors.ids.mainFieldset + "' >" +
            "<p>" + this.i18n.msg("users").escape() + "</p>" +
            "<textarea " +
              "id='" + this.utility.selectors.ids.mainUsers + "' " +
              "placeholder='" + this.i18n.msg("placeholder").escape() + "' " +
              "rows='5' />" +
            "<br />" +
            "<br />" +
            "<p>" + this.i18n.msg("title").escape() + "</p>" +
            "<input " +
              "type='text' " +
              "id='" + this.utility.selectors.ids.mainTitle + "' " +
              "placeholder='" + this.i18n.msg("title").escape() + "' />" +
            "<br />" +
            "<br />" +
            "<p>" + this.i18n.msg("message").escape() + "</p>" +
            "<textarea " +
              "id='" + this.utility.selectors.ids.mainBody + "' " +
              "placeholder='" + this.i18n.msg("message").escape() + "' " +
              "rows='10' />" +
          "</fieldset>" +
        "</form>" +
        "<br />" +
        "<hr>" +
        "<p>" + this.i18n.msg("logTitle").escape() + "</p>" +
        "<div id='" + this.utility.selectors.ids.mainLog + "'></div>" +
        "<br />" +
      "</div>";

    // Build and display main message modal
    this.messageModal = this.buildModal(body, title, buttons, events);
    this.messageModal.create().then(jQuery.proxy(this.addLinkSuggest, this));
    this.messageModal.show();
    this.hasMainModalBeenAssembled = true;
  };

  /**
   * @description Like the similar function above, this function is used to
   * display the collection of modals used in the script, specifically the
   * preview modal that shows the user a rendering of the message as it will
   * appear on the recipents' message walls or talk pages. As with its twin,
   * this function makes use of <code>Message.buildModal</code>, static HTML,
   * and Modal.js config to assemble a single instance of the preview modal
   * whose content is adjusted in subsequent reopenings of the modal via the
   * "Preview" button.
   *
   * @returns {void}
   */
  Message.displayPreviewModal = function (paramTitle, paramBody) {

    // Declarations
    var body, title, buttons, events;

    // Definitions
    title = this.i18n.msg("preview").escape();
    body =
      "<div " +
          "class='" + this.utility.selectors.classes.preview + " " +
            this.utility.selectors.classes.article + "' " +
          "id='" + this.utility.selectors.ids.previewContainer + "' >" +
        "<div id='" + this.utility.selectors.ids.previewContentTitle + "'>" +
          "<h2>" + paramTitle + "</h2>" +
        "</div>" +
        "<div id='" + this.utility.selectors.ids.previewContentBody + "'>" +
          paramBody +
        "</div>" +
      "</div>";

    // Make use of preassembled modal if extant
    if (this.hasPreviewModalBeenAssembled) {
      this.previewModal.setContent(body).show();
      this.supportCollapsibles();
      return;
    }

    // Definitions for new modal
    events = {};
    buttons = [
      {
        text: this.i18n.msg("cancel").escape(),
        event: "close",
      },
    ];

    // Build and display main message modal
    this.previewModal = this.buildModal(body, title, buttons, events);
    this.previewModal.create().then(jQuery.proxy(function () {
      this.previewModal.show();
      this.supportCollapsibles();
      this.hasPreviewModalBeenAssembled = true;
    }, this));
  };

  // Handler functions

  /**
   * @description This handler, one of three such functions used by the script,
   * is called from within the body of <code>Message.handleMessaging</code> to
   * oversee the iteration through the user's inputted recipients array and the
   * posting of new messages to the walls or talk pages of the users. The
   * function is supplied as a parameter a <code>string</code> representation of
   * a posting function depending on the presence of enabled message walls on
   * the wiki. This function is invoked for each user in the array, with an
   * appropriate status log entry added on the conclusion of each operation.
   *
   * @param {string} paramMethod postMessageWallThread or postTalkPageTopic
   * @param {string} paramTitle Title of the message
   * @param {string} paramBody Content of the message
   * @param {!Array<>} paramUsers Recipients of the message
   * @returns {void}
   */
  Message.handlePosting = function (paramMethod, paramTitle, paramBody,
      paramUsers) {

    // Declarations
    var counter, editInterval, currentUser;

    // Alert the user that the process has begun
    this.addLogEntry("logEditing");

    // Definitions
    counter = 0;
    editInterval = setInterval(jQuery.proxy(function () {

      // Grab current user
      currentUser = paramUsers[counter];

      // Invoke the proper posting method and display status message on finish
      this[paramMethod](paramTitle, paramBody, currentUser).then(
        jQuery.proxy(this.addLogEntry, this, "logPostSuccess", currentUser),
        jQuery.proxy(this.addLogEntry, this, "logPostFailure", currentUser)
      );

      // End process once all users handled
      if (++counter === paramUsers.length) {
        clearInterval(editInterval);
      }
    }, this), this.config.interval);
  };

  /**
   * @description This function handles requests for message previewing
   * initiated by means of the "Preview" button in the main modal interface. On
   * such clicks, the function grabs the text in the message title and body
   * <code>testarea</code>s, evaluates them to ensure that they are not empty,
   * and invokes a preview function depending on the enabled status of message
   * walls on the wiki. On the return of the Promise from the appropriate
   * function, the function makes use of a chained Promise to either begin the
   * display of the preview modal or log an error in the status log denoting the
   * status of the operation.
   *
   * @returns {void}
   */
  Message.handlePreviewing = function () {

    // Declarations
    var $title, $body;

    // Definitions
    $title = jQuery("#" + this.utility.selectors.ids.mainTitle)[0].value;
    $body = jQuery("#" + this.utility.selectors.ids.mainBody)[0].value;

    // No title found
    if (!$title) {
      this.addLogEntry("logNoContent",
        this.i18n.msg("title").plain().toLowerCase());
      return;

    // No content in body
    } else if (!$body) {
      this.addLogEntry("logNoContent",
        this.i18n.msg("message").plain().toLowerCase());
      return;
    }

    // Chained promise handlers used for querying and displaying preview
    wk.wgMessageWallsExist.then(
      jQuery.proxy(this.previewMessageWallThread, this, $body),
      jQuery.proxy(this.previewTalkPageTopic, this, $body)
    ).then(
      jQuery.proxy(function (bodyContent) {
        if (DEBUG) {
          console.log(bodyContent);
        }
        this.displayPreviewModal($title, bodyContent);
      }, this),
      jQuery.proxy(function (error) {
        if (DEBUG) {
          console.error(error);
        }
        this.addLogEntry("logNoPreview");
      }, this)
    );
  };

  /**
   * @description Of the three main handlers, this function is arguably the most
   * important. It is used to oversee clicks of the "Send" button in the modal
   * interface, pressed when the user has decided to post the included message.
   * Grabbing the values of the modal <code>textarea</code>s, this function
   * ensures that the user's desired recipients, title, and message body are all
   * legitimate and permissible through the invocation of several utility
   * functions used to validate input.
   * <br />
   * <br />
   * Assuming the user is in the right user rights group and all input is proper
   * and wellformed, the function then invokes the handler
   * <code>Message.handlePosting</code> and passes it the <code>string</code>
   * representation of a posting function name depending on the presence of
   * message walls on the wiki.
   *
   * @returns {void}
   */
  Message.handleMessaging = function () {

    // Declarations
    var $title, $body, $users, $usersArray, editInterval, hasMalformedMember;

    // Definitions
    hasMalformedMember = false;
    $title = jQuery("#" + this.utility.selectors.ids.mainTitle)[0].value;
    $body = jQuery("#" + this.utility.selectors.ids.mainBody)[0].value;
    $users = jQuery("#" + this.utility.selectors.ids.mainUsers)[0].value;
    $usersArray = $users.split(/[\n]+/).filter(function (paramUserEntry) {
      return paramUserEntry.trim();
    });

    // Is not in the proper rights group
    if (!this.hasRights) {
      this.resetForm();
      this.addLogEntry("logImproperRights");
      return;

    // No pages included
    } else if (!$users) {
      this.addLogEntry("logNoContent",
        this.i18n.msg("users").plain().toLowerCase());
      return;

    // No message title
    } else if (!$title) {
      this.addLogEntry("logNoContent",
        this.i18n.msg("title").plain().toLowerCase());
      return;

    // No message body
    } else if (!$body) {
      this.addLogEntry("logNoContent",
        this.i18n.msg("message").plain().toLowerCase());
      return;

    // Malformed title
    } else if (!this.isLegalInput($title)) {
      this.resetForm();
      this.addLogEntry("logCharacters",
        this.i18n.msg("title").plain().toLowerCase());
      return;
    }

    // Check each username
    $usersArray.forEach(jQuery.proxy(function (paramUser) {
      if (!this.isLegalInput(paramUser)) {
        hasMalformedMember = true;
        return;
      }
    }, this));

    // Illegitimate username included
    if (hasMalformedMember) {
      this.resetForm();
      this.addLogEntry("logCharacters",
        this.i18n.msg("users").plain().toLowerCase());
      return;
    }

    // Choose posting type depending on presence of message walls
    wk.wgMessageWallsExist.then(
      jQuery.proxy(this.handlePosting, this, "postMessageWallThread", $title,
        $body, $usersArray),
      jQuery.proxy(this.handlePosting, this, "postTalkPageTopic", $title, $body,
        $usersArray)
    );
  };

  // Main function

  /**
   * @description This function serves as the main coordinating function of the
   * script as its name implies. It is responsible for defining a handful of
   * <code>Message</code> object properties that are used on a global basis in
   * the other functions of the class, and also handles the validation of any
   * and all user config input to ensure that only legitimate values are used in
   * the script's functions. If no config is detected, the script makes use of
   * the default values present in <code>Message.utility.defaultConfig</code>
   * <br />
   * <br />
   * In order to prevent spamming and abuse, use of the script is restricted to
   * Discussions and Content moderators, admins, and some global user rights
   * groups like GDMs and Staff. Standard users will be met with a status log
   * entry indicating that they are not in the proper user rights group on
   * presses of the "Send" button, per the precedent set by the author's other
   * restricted scripts.
   *
   * @param {object} lang I18n-js data
   * @returns {void}
   */
  Message.main = function (lang) {

    // I18n-js config
    this.i18n = lang;
    this.i18n.useContentLang();

    // Define new API instance
    this.api = new mw.Api();

    // Define config and inner placements objects
    this.config = {};
    this.config.placement = {};

    // Ensure acceptable placement config is inputted by the user
    if (wk.configMessage && wk.configMessage.placement) {
      this.config.placement =
        this.validatePlacement(wk.configMessage.placement);
    } else {
      jQuery.each(this.utility.defaultConfig.placement,
        jQuery.proxy(function (key, value) {
          this.config.placement[key] = this.placement[key](value);
        }, this)
      );
    }

    // Ensure interval falls within usergroup-specific restrictions
    if (wk.configMessage && wk.configMessage.interval) {
      this.config.interval = this.validateInterval(wk.configMessage.interval);
    } else {
      this.config.interval = this.utility.defaultConfig.interval;
    }

    if (DEBUG) {
      console.log(this.config);
    }

    // Apply styles prior to link or modal assembly
    this.injectStyles();

    // To prevent possible spamming, restrict to Staff and some local staff
    this.hasRights = new RegExp(["(" + this.utility.validUsergroups.join("|") +
      ")"].join("")).test(wk.wgUserGroups.join(" "));

    // Used to check all input except message content
    this.legalChars = new RegExp("^[" + wk.wgLegalTitleChars + "]*$");

    // Set initial value for boolean flag
    this.hasMainModalBeenAssembled = false;

    // Define script name for Placement.js
    this.placement.script(this.utility.name);

    // Set tool placement using config
    jQuery(this.config.placement.element)[this.config.placement.type](
      jQuery.proxy(this.constructItem, this, this.i18n.msg("message").plain()));
  };

  // Load functions

  /**
   * @description This function is invoked as many times as there are external
   * dependencies, serving as the primary hook handler for each of the required
   * events denoted in <code>Message.utility.dependencies</code>. Once all
   * dependencies have been successfully loaded and the hooks fired, the
   * function loads I18n-js messages and invokes <code>Message.main</code> as
   * the callback function.
   *
   * @returns {void}
   */
  Message.init = function () {
    if (++this.loaded === this.utility.dependencies.length) {
      this.placement = wk.dev.placement.loader;
      wk.dev.i18n.loadMessages(this.utility.name).then(
        jQuery.proxy(this.main, this));
    }
  };

  /**
   * @description This function is only invoked once the ResourceLoader has
   * successfully loaded the <code>util</code> and <code>api</code> modules,
   * executing this callback on completion. This function is responsible for
   * assembling the relevant hook event aliases from the listing of hook names
   * included in <code>Message.utility.dependencies</code> that denote the
   * required external dependencies of the script.
   *
   * @returns {void}
   */
  Message.preload = function () {
    this.loaded = 0;
    this.utility.dependencies.forEach(function (dependency) {
      mw.hook("dev." + dependency).add(jQuery.proxy(Message.init, Message));
    });
  };

  // Load modules prior to initialization
  mw.loader.using(["mediawiki.util", "mediawiki.api", "mediawiki.user",
    "ext.wikia.LinkSuggest"]).then(jQuery.proxy(Message.preload, Message));

  wk.importArticles({
    type: "script",
    articles: [
      "u:dev:MediaWiki:I18n-js/code.js",
      "u:dev:MediaWiki:Modal.js",
      "u:dev:MediaWiki:Placement.js",
      "u:dev:MediaWiki:WgMessageWallsExist.js",
    ],
  });
});