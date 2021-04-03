/*
 * Name: SmoothGlobalNav
 * Description: Hide navigation bar smoothly when scrolling down.
 * Init: sgnInit
 * Author: Pogodaanton
 */
$(function () {
  window.dev = window.dev || {};
  if (window.dev.smoothGlobalNav) return;
  window.dev.smoothGlobalNav = {};

  /**
   * Registering scroll listener and disabling banner-notification transitions.
   * @class
   */
  function SmoothGlobalNav() {
    var _this = this;

    this.prevScroll = $(window).scrollTop();
    this.startPos = $(window).scrollTop();
    this.transformPercentage = 0;

    mw.util.addCSS(".wds-banner-notification__container { transition: none; }");

    // Preventing loss of this context
    $(window).on("scroll", function () {
      _this.onScroll();
    });
  }

  /**
   * Slides the header up/down according to the scrolling direction.
   *
   * In order to move the header in the same speed as the window,
   * we track the difference between the current scroll position and the position before
   * and slide the header relative to that.
   *
   * @method onScroll
   * @listens window.onScroll
   */
  SmoothGlobalNav.prototype.onScroll = function () {
    var $globalNav = $("#globalNavigation");
    var scroll = $(window).scrollTop();
    var deltaScroll = scroll - this.prevScroll;
    var headerHeight = $globalNav.outerHeight();
    if (this.transformPercentage === 0) this.startPos = this.prevScroll;
    var deltaStart = scroll - this.startPos;

    // If there is a top-level advertisment and the nav is stickied, return to default position
    if ($globalNav.hasClass("bfaa-pinned")) deltaStart = 0;

    // If header is completely hidden, follow behind
    if (deltaScroll > 0 && this.transformPercentage <= -100)
      this.startPos = scroll - headerHeight;

    this.transformPercentage =
      -1 * Math.max(Math.min((deltaStart * 100) / headerHeight, 100), 0);
    $globalNav.css({
      transform: "translateY(" + this.transformPercentage + "%)",
      pointerEvents: this.transformPercentage <= -100 ? "none" : "initial",
    });

    this.calculateStickyRail(this.transformPercentage, headerHeight);
    this.calculateVEToolbar(this.transformPercentage, headerHeight);
    this.prevScroll = scroll;
  };

  /**
   * Modifies the scrolling sticky rail's top position to counter the motion of the header.
   * @param {number} percentage Header position relative to headerHeight
   * @param {number} headerHeight Height of the header
   * @method
   */
  SmoothGlobalNav.prototype.calculateStickyRail = function (percentage, headerHeight) {
    $("#WikiaAdInContentPlaceHolder").css({
      top: headerHeight - (headerHeight * Math.abs(percentage)) / 100 + 10 + "px",
    });
  };

  /**
   * UCP's VisualEditor has a toolbar which becomes sticky on user scroll.
   * This function checks for its position and moves the toolbar up if needed.
   * @param {number} percentage Header position relative to headerHeight
   * @param {number} headerHeight Height of the header
   * @method
   */
  SmoothGlobalNav.prototype.calculateVEToolbar = function (percentage, headerHeight) {
    $toolbar = $(".ve-ui-oasisToolbar > .oo-ui-toolbar-bar");

    if ($toolbar.css("position") !== "fixed") {
      $toolbar.css({ transform: "translateY(0px)" });
    } else {
      $toolbar.css({
        transition: "transform 0s",
        transform: "translateY(" + (percentage * headerHeight) / 100 + "px)",
      });
    }
  };

  window.dev.smoothGlobalNav = new SmoothGlobalNav();
  return;
});