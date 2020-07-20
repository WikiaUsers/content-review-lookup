$(importArticle({ type: "script", article: "MediaWiki:Modal.js" }))
.on("load", function(){
    if (mw.config.get("wgPageName") === "Special:Modal_Test"){
        var TestModal = new Modal({
            id: "test-modal",
            size: "large",
            title: "Testing",
            classNames: ["test-modal"],
            content: $("<div>", {
                "class": "test-modal-content",
                html: "Hello World"
            }),
            buttons: [{
                message: "Cancel",
                handler: "cancel",
                id: "button-cancel",
                isPrimary: false
            }, {
                message: "Confirm",
                handler: "confirm",
                id: "button-confirm",
                isPrimary: true
            }]
        });
        
        TestModal.create();
        
        TestModal.on("cancel", function(){
            this.close();
        });
        
        TestModal.on("confirm", function(){
            $("#mw-content-text")
                .append("<span style='color: green;'>Success</span>");
        });
        
        $("#mw-content-text").html($("<a>", {
            "id": "test-modal-button",
            "class": "wds-button",
            on: { "click": function(){ TestModal.open(); } }
        }).text("Open Modal"));
    }
});