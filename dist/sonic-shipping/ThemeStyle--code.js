// __NOWYSIWYG__
/**
 * ThemeStyle
 *
 * @version 1.0
 *
 * @author Jono99 <https://phigros.fandom.com/wiki/User:Jono99>
 *
 * documentation and examples at:
 * <https://dev.fandom.com/wiki/ThemeStyle>
 */
 
(function (window, $, mw) {
	var process_styles = function()
	{
		var styles = ["light", "dark"];
		
		var valid_css = function (styles)
        {
            var params = {
				action: 'parse',
				text: '',
				format: 'json'
			};
			for (var i = 0; i < styles.length; i++)
				params.text += "<span style='" + styles[i] + "'>" + String(i) + "</span>";		

			const api = new mw.Api();
			
			return new Promise(function(res, rej)
            {
                api.get(params).done(function(data)
                {
				    const result = data.parse.text['*'];
                    var retVal = [];
                    for (var i = 0; i < styles.length; i++)
                    {
                        if (result.includes('<span style="/* insecure input */">' + String(i) + "</span>"))
                            retVal.push(false);
                        else
                            retVal.push(true);
                    }
                    res(retVal);
			    }).catch(function(err) { rej(err) });
            });
		};
		
		var apply_style = function(check_class, style_attribute)
		{
			if (document.querySelectorAll("." + check_class).length > 0)
			{
				const elements = document.querySelectorAll("[" + style_attribute + "]");
				var element_styles = [];
				for (var e = 0; e < elements.length; e++)
				{
					var element = elements[e];
					element_styles[e] = element.style.cssText + element.attributes.getNamedItem(style_attribute).value;
				}
				
				// Sanitise css
				valid_css(element_styles).then(function(valid_element_styles)
                {
                    for (e = 0; e < elements.length; e++)
                    {
                        const element = elements[e];
                        if (valid_element_styles[e])
                            element.style.cssText = element_styles[e];
                        else
                        {
                            const insecure_input = element.attributes.getNamedItem(style_attribute);
                            insecure_input.value = "/* insecure input */";
                            element.attributes.setNamedItem(insecure_input);
                        }
                    }
                });
			}
		};
		
		for (var i in styles)
		{
			var style = styles[i];
			apply_style("theme-fandomdesktop-" + style, "data-" + style + "-style");
		}
		
		apply_style("skin-oasis", "data-oasis-style");
	};
	
	mw.hook("wikipage.content").add(process_styles);
}(this, jQuery, mediaWiki));