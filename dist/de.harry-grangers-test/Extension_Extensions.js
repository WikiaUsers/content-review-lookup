/**
* Extension:Extensions
* Base class for Extensions
*/
console.info('Extensions loaded');

function Extension(name,description) {
    this.description = 'Base class for Extensions';
    this.name = 'Extension';
    this.eventHandlers = [];
    this.isInstalled = mw.hook('extensions:installed');

    this.install = function() {
        if(this.hasOwnProperty('config')) {
            this.config();
        }
        this.isInstalled.fire();
        //dispatchEvent(ExtensionEvent('installed','Extension is installed and ready to use',this.name));
    }
}

Extension.prototype = {
    getName: function(variable) {
        for(var i in window) {
            if(window[i] == variable) {
                return i;
            }
        }
    },
    on: function(eventName, handler) {
    switch (eventName) {
      case "trigger":
        return this.eventHandlers.push(handler);
      case "somethingElse":
        return alert('write something for this event :)');
    }
  },
  trigger: function() {
    var handler, i, len, ref;
    ref = this.eventHandlers;
    for (i = 0, len = ref.length; i < len; i++) {
      handler = ref[i];
      setTimeout(handler, 0);
    }
  }
}

function ExtensionEvent(evtName,desc,extName) {
    console.log('test',arguments);
    return new CustomEvent('extension:' + evtName,{
        detail: {
            extension: extName,
            description: desc
        }
    });
}