/* Bất kỳ mã JavaScript ở đây sẽ được tải cho tất cả các thành viên khi tải một trang nào đó lên. */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:Dorui.js'
    ]
});

// mw.hook('doru.ui').add(function(ui) {
//     // Create title element
//     var title = ui.h2({
//         classes: ['welcome-title'],
//         text: 'Welcome to My Wiki!'
//     });

//     // Create description element
//     var description = ui.span({
//         classes: ['welcome-description'],
//         text: 'We’re glad you’re here. Explore and contribute!'
//     });

//     // Create container
//     var widget = ui.div({
//         classes: ['welcome-widget'],
//         children: [title, description]
//     });

//     // Add to page content
//     mw.util.$content.prepend(widget);
// });

(function() {
    if (window.MyWelcomeWidget) return;

    var ui;

    window.MyWelcomeWidget = {
        onload: function(arg) {
            console.log('Dorui loaded:', arg); // ✅ Debug log
            ui = arg;
            this.init();
        },

        init: function() {
            console.log('Initializing widget...'); // ✅ Debug log

            var widget = ui.div({
                classes: ['welcome-widget'],
                children: [
                    ui.h2({
                        classes: ['welcome-title'],
                        text: 'Welcome to My Wiki!'
                    }),
                    ui.span({
                        classes: ['welcome-description'],
                        text: 'We’re glad you’re here. Explore and contribute!'
                    }),
					ui.svg({
					    viewBox: '0 0 300 100',
					    xmlns: 'http://www.w3.org/2000/svg',
					    stroke: 'red',
					    fill: 'grey',
					    children: [
					        ui.circle({
					            cx: '50',
					            cy: '50',
					            r: '40'
					        }),
					        ui.circle({
					            cx: '150',
					            cy: '50',
					            r: '4'
					        }),
					        ui.svg({
					            viewBox: '0 0 10 10',
					            x: '200',
					            width: '100',
					            child: ui.circle({
					                cx: '5',
					                cy: '5',
					                r: '4'
					            })
					        })
						]
					})
                ]
            });

            mw.util.$content.prepend(widget);
            console.log('Widget added to page'); // ✅ Debug log
        }
    };

    mw.hook('doru.ui').add(MyWelcomeWidget.onload.bind(MyWelcomeWidget));
})();

// Custom Tooltip CSS removal
window.tooltips_config = {
	offsetX: 20,
    offsetY: 20,
    waitForImages: true,
    noCSS: true,
},
window.tooltips_list = [
    {
        classname: 'sequence-tooltip',
        parse: '{' + '{Template:Seq/data|1=<#seq#>}}'
    }, {
        classname: 'pathway-tooltip',
        parse: '{' + '{Template:Pathways/data|1=<#pathway#>}}'
    }, {
        classname: 'ingredient-tooltip',
        parse: '{' + '{Template:Ingr/data|1=<#name#>}}'
    }, {
        classname: 'uniqueness-tooltip',
        parse: '{' + '{Template:Uniqueness/data|1=<#name#>|2=<#description#>}}'
    }
]