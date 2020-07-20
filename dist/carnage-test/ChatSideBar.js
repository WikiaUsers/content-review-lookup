(function(mw, $){
    if (!$('#ChatSideBar').length){
        function openOptions(value){
            if (typeof value == "boolean"){
                if (value === true){
                    $('#ChatSideBar').html(function(){
                        
                    });
                }
            }
        }
        $(document.head).append(
            $('<link />', {
                "type": "text/css",
                "rel": "stylesheet",
                "href": "//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
            })
        );
        $('.ChatWindow').append(
            $('<aside />', {
                "class": "ChatSideBar",
                "id": "ChatSideBar",
                html: $('<a />', {
                    "href": "javascript:void(0);",
                    html: $('<i />', {
                        "class": "fa fa-"
                    }),
                    on: {
                        "click": function(event){
                            openOptions(true);
                        }
                    }
                })
            })
        );
    }
}).call(this.mediaWiki, this.jQuery);