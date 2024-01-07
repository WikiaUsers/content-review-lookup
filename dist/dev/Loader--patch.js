/**
 * minimal loader patch to allow defining modules with references
 */
;(function(implement){
	'use strict';
	
    function Exports(id) {
        this.id = id;
    }

    Object.defineProperty(mw.loader, "implement", {
        value: function(module, script, style, messages, templates) {
            if (typeof script !== "function") return implement(module, script, style, messages, templates);
            var $script = function($, jQuery, require, module) {
                var $dependencies, $execute;
                var $module = Object.create({
                    register: function(dependencies, execute) {
                        $dependencies = dependencies;
                        $execute = execute;
                    }
                });
                $module.exports = {};

                function $require(identifier) {
                    var $exports = require(identifier);
                    if (!($exports instanceof Exports)) return $exports;
                    return require($exports.id);
                }

                script($, jQuery, $require, $module);
                
                if ($dependencies == undefined && $execute == undefined) return void Object.assign(module, $module);
                if (typeof $execute !== "function" || !Array.isArray($dependencies) || $dependencies.some(function(dependency) { return typeof dependency !== "string" }) ) throw new Error("invalid arguments");

                module.exports = new Exports(crypto.randomUUID());

                importArticles({ type: "script", articles: $dependencies}).then(function(require){
                    mw.loader.using(
                        $dependencies.map(
                            function(dependency) {
                                var $exports = require(dependency);
                                return $exports instanceof Exports ? $exports.id : dependency;
                            }
                        ),
                        function() {
                            implement(module.exports.id, function($, jQuery, require, module){
                                $execute();
                                Object.assign(module, $module);
                            })
                        }
                    )
                })
            }
            $script.toString = Function.prototype.toString.bind(script);
            return implement(module, $script, style, messages, templates);
        }
    })
})(mw.loader.implement);