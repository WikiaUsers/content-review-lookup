/**
 * Script that manages requests based on JSON data fed by a MediaWiki page
 * @author Owlnai
 * @author Original authors include Bola, Joeytje50, Lil' Miss Rarity, Jr. Mime
 */
// <nowiki>
   mw.loader.using(["oojs-ui-windows"]).then(function() {
   	

   
function RequestWindow(formLayout) {
    RequestWindow.super.call(this, {
        size: "large",
    });
    this.formLayout = formLayout ? formLayout : this.formLayout;
}

OO.inheritClass(RequestWindow, OO.ui.ProcessDialog);

// Specify a name for .addWindows()
RequestWindow.static.name = "requestWindow";
// Specify static actions and title
RequestWindow.static.title = "Nueva solicitud";
RequestWindow.static.actions = [
    { action: "save", label: "Save", flags: ["primary", "constructive"] },
    { action: "cancel", label: "Cancel", flags: "safe" },
];



// Add content to the dialog body and setup event handlers.
RequestWindow.prototype.initialize = function () {

    var fdata = this.formLayout;
    RequestWindow.super.prototype.initialize.apply(this, arguments);
    var _this = this;
    this.content = new OO.ui.PanelLayout({ padded: true });
    this.fieldset = new OO.ui.FieldsetLayout({
        label: fdata.title,
    });
    this.description = new OO.ui.LabelWidget({
        label: fdata.sub,
    });

    this.fieldset.addItems([this.description]);

    fdata.fields.forEach(function addInputs(field) {
        _this.fieldset.addItems([
            new OO.ui.FieldLayout(
                (function () {
                    if (field.type == "combo") {
                        return new OO.ui.ComboBoxInputWidget({

                            menu: {
                                items: (function () {
                                    var _items = [];
                                    field.items.forEach(function (item) {

                                        _items.push(new OO.ui.MenuOptionWidget({
                                            data: item,
                                            label: item
                                        }));

                                    });
                                    return _items;

                                })()
                            }
                        });
                    } else if (field.type == "textarea") {
                        return new OO.ui.MultilineTextInputWidget();
                    } else {
                        return new OO.ui.TextInputWidget({
                            validate: field.validate || 'non-empty',
                            type: field.type || "text",
                            value: field.value || '',
                            readOnly: field.disabled || false,
                            disabled: field.disabled || false
                        });
                    }
                })()
                ,
                {
                    label: field.label || "No label was provided",
                    align: "top",
                    help: field.help || "",
                    helpInline: true,

                }
            ),
        ]);
    });

    this.content.$element.append(this.fieldset.$element);
    this.$body.append(this.content.$element);
};


RequestWindow.prototype.getActionProcess = function (action) {
    return RequestWindow.super.prototype.getActionProcess
        .call(this, action)
        .next(function () {
            return 1000;
        }, this)
        .next(function () {
            var closing;
            var $items = [];
            this.fieldset.items.filter(function (i) { return i.helpInline }).forEach(function (item) { $items.push(item.fieldWidget ? item.fieldWidget.value : '') });  // .getValue()
			console.log($items);
			var _form = this.formLayout["format"];
            if (action === "save") {
                if (this.broken) {

                    return new OO.ui.Error(
                        "Hubo un error al mandar tu formulario. Por favor, contacte con la administración."
                    );
                } else {
                    
                    var _title = "Solicitud: " + $items[0] + " " + this.formLayout.letter + new Date().toISOString().toLocaleString("en-US", { timeZone: "Europe/London" }).split('T')[0].split("-").join("");
                    new mw.Api().postWithEditToken({
                        action: 'edit',
                        text: (function () {
                            return _form.replace(/{(\d+)}/g, function (match, number) {
                                if (typeof $items[number] != 'undefined') {
                                    return $items[number];
                                }
                                else {
                                    return match;
                                }
                            });
                        })(),
                        title: _title
                    }).then(function () {
                        window.location = mw.util.getUrl(title);
                    });
                }
            }
            closing = this.close({ action: action });
            if (action === "save") {
                // Return a promise to remain pending while closing
                return closing;
            }
            return RequestWindow.super.prototype.getActionProcess.call(
                this,
                action
            );
        }, this);
};
   	   mw.hook('cc.request').fire(RequestWindow);
   })