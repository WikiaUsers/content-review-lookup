/**
 * @name BlueprintNotIncluded.js
 * @author DDElephant
 * @description Add blueprint from blueprintnotincluded.com to article
 */
$(function () {
  $(".blueprint").html(function () {
    // Variables
    var $this = $(this);
    var id = $this.attr("data-id");
    var width = parseInt($this.attr("data-width"));
    width = width > 0 ? width : 500;
    var height = parseInt($this.attr("data-height"));
    height = height > 0 ? height : 500;

    // Verify data
    if (!id) {
      return $("<span>", {
        class: "error",
        text: "未填写蓝图 ID",
      });
    }

    // build iframe element
    var $iframe = $("<iframe>", {
      class: "blueprint-show blueprint-iframe",
      id: "bni-" + id,
      src:
        "//blueprintnotincluded.com/b/" +
        id +
        "/hideui/" +
        width +
        "/" +
        height,
      scrolling: "no",
      border: 0,
      frameborder: "no",
      framespacing: 0,
      width: width,
      height: height,
    });
    $iframe.load()
    // Return element
    return $iframe;
  });
});