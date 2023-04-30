 /**
   * @description This function is used to retrieve raw template content from
   * the <code>Template</code> namespace page passed as a parameter. A resolved/
   * rejected <code>$.Deferred</code> instance is returned.
   *
   * @author Sebolto <swf.wikia.com/w/User talk:Sebolto>
   *
   * @param {string} template - <code>string</code> template name
   * @param {object} - <code>$.Deferred</code> object
   */
  this.getTemplate = function (template) {
    var config, prefix;

    // Cache wgs
    config = mw.config.get([
      "wgFormattedNamespaces",
      "wgScript"
    ]);

    // "Template:"
    prefix = config.wgFormattedNamespaces[10] + ":";

    // Template name must start with "Template:"
    if (template.substring(0, 0 + prefix.length) !== prefix) {
      template = prefix + template;
    }

    return $.ajax({
      type: "GET",
      url: mw.util.wikiScript("index") || config.wgScript,
      data: {
        title: template,
        action: "raw",
        ctype: "text/plain"
      }
    });
  };
 
  /**
   * @description This function, original developed by Jack Phoenix, is used to
   * add the contents of <code>Template:Information</code> to the element whose
   * selector is passed as a parameter. It is used in Special:Upload at present.
   *
   * @author Jack Phoenix <jack@countervandalism.net>
   * @author TK-999 <swf.wikia.com/w/User talk:TK-999>
   * @author Sebolto <swf.wikia.com/w/User talk:Sebolto>
   *
   * @param {string} target - The selector of the target element
   * @returns {undefined}
   */
  this.insertInformationTemplate = function (target) {
    var $target, defaultText;

    $target = (target instanceof $) ? target : $(target);
    defaultText = "==Summary==\n{{Information\n|description=\n|type=\n" +
      "|source=\n|artist=\n}}";

    this.getTemplate("Template:Stdinformation").then(
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