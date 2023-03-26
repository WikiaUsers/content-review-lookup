/* Any JavaScript here will be loaded for all users on every page load. */
  /**
   * @description This function, original developed by Jack Phoenix, is used to
   * add the contents of <code>Template:ImageSource</code> to the element whose
   * selector is passed as a parameter. It is used in Special:Upload at present.
   *
   * @author Jack Phoenix <jack@countervandalism.net>
   * @author TK-999 <swf.wikia.com/w/User talk:TK-999>
   * @author Sebolto <swf.wikia.com/w/User talk:Sebolto>
   * @author Ahalosniper <the-witcher-fanon.com/w/User talk:Ahalosniper>
   *
   * @param {string} target - The selector of the target element
   * @returns {undefined}
   */
  this.insertImageSourceTemplate = function (target) {
    var $target, defaultText;

    $target = (target instanceof $) ? target : $(target);
    defaultText = "==Summary==\n{{ImageSource\n|description=\n|type=\n" +
      "|source=\n|artist=\n}}";

    this.getTemplate("Template:StdImageSource").then(
      function (data) {
        return data;
      },
      function () {
        return defaultText;
      }
    ).then(function (value) {
      $target.val(value);
    });
  };