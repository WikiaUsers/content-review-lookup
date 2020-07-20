require([
    "wikia.window",
    "mw",
    "jquery",
    require.optional("ext.wikia.design-system.loading-spinner"),
    require.optional("BannerNotification")
], function(window, mw, $, Spinner, BannerNotification){
    const ADMIN = Object.freeze([
        "staff", "helper", "wiki-manager",
        "content-team-member", "vstf", "sysop"
    ]);
    
    const IS_ADMIN = mw.config.get("wgUserGroups").some(function(group){
        return ADMIN.indexOf(group) > -1;
    });
    
    const SITENAME = mw.config.get("wgSiteName");
    
    function RfA(){
        if (!(this instanceof RfA)) return new RfA();
        
        this.data = {};
        this.data.username = mw.config.get("wgUserName");
        this.data.title = "";
        this.data.description = "";
        this.active = false;
        this.isAdmin = IS_ADMIN;
        this.delay = 600;
        this.ajaxDelay = 5000;
        this.$target = $(".rfa-d");
        this.params = {};
        
        this.createUI();
        
        return this;
    }
    
    RfA.prototype = {
        constructor: RfA,
        createUI: function(){
            this.$body = $("<section>", { "class": "rfa-wrapper", "id": "rfa-wrapper" });
            this.$form = $("<form>", { "class": "rfa-form", "id": "rfa-form" });
            this.$input = $("<div>", { "class": "rfa-label", "id": "rfa-label" });
            this.$titleSection = $("<div>", { "class": "rfa-title__section rfa-section", "id": "rfa-title__section"});
            this.$titleLabel = $("<label>", { "class": "rfa-title__label", "id": "rfa-title__label" });
            this.$title = $("<input>", { "class": "rfa-title__input", "id": "rfa-title__input" });
            this.$descSection = $("<div>", { "class": "rfa-desc__section rfa-section", "id": "rfa-desc__section"});
            this.$descLabel = $("<label>", { "class": "rfa-desc__label", "id": "rfa-desc__label" });
            this.$desc = $("<textarea>", { "class": "rfa-desc__input", "id": "rfa-desc__input" });
            this.$toolbar = $("<nav>", { "class": "rfa-toolbar", "id": "rfa-toolbar" });
            this.$cancel = $("<a>", { "class": "rfa-button rfa-button__cancel", "id": "rfa-button__cancel" });
            this.$confirm = $("<a>", { "class": "rfa-button rfa-button__confirm", "id": "rfa-button__confirm" });
            
            this.$titleLabel.attr("for", "rfa-title__input").text("Title:");
            this.$descLabel.attr("for", "rfa-desc__input").text("Explain why you should be an admin:");
            
            this.$form.attr("name", "rfa-form");
            this.$title.attr("name", "rfa-title");
            this.$desc.attr("name", "rfa-desc");
            
            this.$input.text("Add a new request!").on("click", this.expandForm.bind(this));
            
            this.$title.on("input change", this.updateTitle.bind(this));
            this.$desc.on("input change", this.updateDesc.bind(this));
            
            this.$cancel.text("Cancel").attr("href", "#").on("click", this.collapseForm.bind(this));
            this.$confirm.text("Confirm").attr("href", "#").on("click", this.sendData.bind(this));
            
            this.$toolbar.html([this.$cancel, this.$confirm]).hide();
            this.$descSection.html([this.$descLabel, this.$desc]).hide();
            this.$titleSection.html([this.$titleLabel, this.$title]).hide();
            this.$form.html([this.$input, this.$titleSection, this.$descSection, this.$toolbar]);
            this.$body.html(this.$form);
            
            return this;
        },
        addElement: function(){
            this.$target.replaceWith(this.$body);
        },
        updateTitle: function(event){
            if (event === undefined) return;
            var $target = $(event.target), value = $target.val();
            
            if (this.data.title === value) return;
            else this.data.title = value;
        },
        updateDesc: function(event){
            if (event === undefined) return;
            var $target = $(event.target), value = $target.val();
            
            if (this.data.description === value) return;
            else this.data.description = value;
        },
        collapseForm: function(event){
            if (event !== undefined) event.preventDefault();
            this.$titleSection.slideUp(this.delay);
            this.$descSection.slideUp(this.delay);
            this.$toolbar.slideUp(this.delay);
            this.$input.slideDown(this.delay);
            this.active = false;
        },
        expandForm: function(event){
            if (event !== undefined) event.preventDefault();
            this.$titleSection.slideDown(this.delay);
            this.$descSection.slideDown(this.delay);
            this.$toolbar.slideDown(this.delay);
            this.$input.slideUp(this.delay);
            this.active = true;
        },
        sendData: function(event){
            if (event !== undefined) event.preventDefault();
            if (this.data.title === ""){
                (new BannerNotification(
                    "A title is <span style='bold'>required</span> for a request to be posted.",
                    "error")).show();
                return;
            }

            if (this.data.description === ""){
                (new BannerNotification(
                    "A description is <span style='bold'>required</span> for a request to be posted.",
                    "error")).show();
            }

            var content = "{{RfAEntry|", date = new Date();
            this.data = $.extend({
                dateString: this.getDate(date)
            }, this.data);
            Object.entries(this.data).forEach(function(entry, index){
                var key = entry[0], value = entry[1];
                if (index !== 0) content += "|";
                content += key.split("|")[0] + "=" + value.split("|")[0];
            }, this);
            content += "}}";
            this.data = $.extend({
                date: date
            }, this.data);
            this.params = {
                action: "edit",
                title: this.getTitle(),
                summary: "",
                text: content,
                minor: false,
                token: mw.user.tokens.get("editToken")
            };
            this.postData();
        },
        getDate: function(date){
            var months = ["January", "February", "March", "April", "May", "June", "July", 
                "August", "September", "October", "November", "December"],
                month = date.getMonth(), day = date.getDate(), year = date.getFullYear(),
                hour = date.getHours(), minute = date.getMinutes(), second = date.getSeconds();
            
            function pad(n){
                return Number(n) < 10 ? "0" + Number(n) : String(Number(n));
            }
            
            var string = [months[month] + " " + pad(day) + ", " + pad(year)];
            string[1] = pad(hour) + ":" + pad(minute) + ":" + pad(second);
            
            return string.join(" ");
        },
        getTitle: function(){
            var prefix = SITENAME + ":RfA/";
            
            function pad(n){
                return Number(n) < 10 ? "0" + Number(n) : String(Number(n));
            }
            
            var m = pad(this.data.date.getMonth() + 1),
                d = pad(this.data.date.getDate()),
                y = pad(this.data.date.getFullYear() % 100),
                _h = pad(this.data.date.getHours()),
                _m = pad(this.data.date.getMinutes()),
                _s = pad(this.data.date.getSeconds());
            
            var string = [m, d, y].join("") + "/" + [_h, _m, _s].join("");
            
            string = prefix + string;
            
            console.log(string);
            return string;
        },
        postData: function(){
            this.$blackout = $("<div>", { "class": "rfa-blackout", "id": "rfa-blackout" });
            var spinner = new Spinner(30, 6),
                spinnerHTML = spinner.html
                    .replace("wds-block", "wds-spinner__block")
                    .replace("wds-path", "wds-spinner__stroke")
                    .replace("stroke-width=\"\"", "stroke-width=\"6\"");
            this.$spinner = $("<div>", { "class": "rfa-spinner", "id": "rfa-spinner", html: spinnerHTML});
            this.$blackout.html(this.$spinner);
            $(document.body).append(this.$blackout);
            $.when(this.getAjax()).done((function(){
                this.timeout = setTimeout((function(){
                    clearTimeout(this.timeout);
                    this.timeout = null;
                    delete this.timeout;
                    
                    this.$blackout.remove();
                    this.collapseForm();
                    (new BannerNotification(
                        "Thank you for applying to be an admin for the HTML & CSS Wiki. We will get back to you in no more than 7 days.",
                        "confirm")).show();
                    this.$title.val("");
                    this.$desc.val("");
                    this.data.title = "";
                    this.data.description = "";
                    this.params = {};
                }).bind(this), this.ajaxDelay);
            }).bind(this)).fail((function(){
                this.timeout = setTimeout((function(){
                    clearTimeout(this.timeout);
                    this.timeout = null;
                    delete this.timeout;
                    
                    this.$blackout.remove();
                    this.collapseForm();
                    (new BannerNotification(
                        "We have found an error while posting it. Please try again later.",
                        "error")).show();
                    this.$title.val("");
                    this.$desc.val("");
                    this.data.title = "";
                    this.data.description = "";
                    this.params = {};
                }).bind(this), this.ajaxDelay);
            }).bind(this));
        },
        getAjax: function(){
            return (new mw.Api()).post(this.params);
        }
    };

    window.RfAController = RfA;
    window.RfA = RfA();

    window.RfA.addElement();
});