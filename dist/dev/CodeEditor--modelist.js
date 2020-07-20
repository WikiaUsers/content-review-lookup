/** <nowiki>
 * 
 * @description             Modelist submodule for CodeEdtitor.
 * @module                  dev.codeeditor.modelist
 * @namespace               window.dev.codeEditor.modelist
 * @author                  Speedit
 * @version                 0.9.0
 * @license                 CC-BY-SA 3.0
 * @see                     [[github:Wikia/app/blob/dev/resources/Ace/ext-modelist.js]]
 * @see                     [[github:ajaxorg/ace/blob/master/lib/ace/ext/modelist.js]]
 * @notes                   Differences to upstream Ace (1.4.2):
 *                           1. 'matlab' is assigned .m in CodeEditor.
 *                           2. 'javascript' recognises the non-
 *                                 standard .javascript extension.
 */
require(['jquery'], function($) {
    'use strict';

    // Module export.
    // @exports dev.codeeditor.modelist
    var exports = {};

    // Raw mode data map for the Fandom Ace editor.
    // @var SUPPORTED
    // @private
    var SUPPORTED = {
        'ABAP':         'abap',
        'ActionScript': 'as',
        'ADA':          'ada|adb',
        'AsciiDoc':     'asciidoc',
        'Assembly_x86': 'asm',
        'AutoHotKey':   'ahk',
        'BatchFile':    'bat|cmd',
        'C9Search':     'c9search_results',
        'c_cpp':        'cpp|c|cc|cxx|h|hh|hpp',
        'Clojure':      'clj',
        'Cobol':        'cbl|cob',
        'coffee':       'coffee|cf|cson|^Cakefile',
        'ColdFusion':   'cfm',
        'csharp':       'cs',
        'CSS':          'css',
        'Curly':        'curly',
        'D':            'd|di',
        'Dart':         'dart',
        'Diff':         'diff|patch',
        'Dot':          'dot',
        'Erlang':       'erl|hrl',
        'EJS':          'ejs',
        'Forth':        'frt|fs|ldr',
        'ftl':          'ftl',
        'Glsl':         'glsl|frag|vert',
        'golang':       'go',
        'Groovy':       'groovy',
        'HAML':         'haml',
        'Handlebars':   'hbs|handlebars|tpl|mustache',
        'Haskell':      'hs',
        'haXe':         'hx',
        'HTML':         'html|htm|xhtml',
        'html_ruby':    'erb|rhtml|html.erb',
        'INI':          'ini|conf|cfg|prefs',
        'Jack':         'jack',
        'Jade':         'jade',
        'Java':         'java',
        // start developer change
        'JavaScript':   'js|jsm|javascript',
        // end developer change
        'JSON':         'json',
        'JSONiq':       'jq',
        'JSP':          'jsp',
        'JSX':          'jsx',
        'Julia':        'jl',
        'LaTeX':        'tex|latex|ltx|bib',
        'LESS':         'less',
        'Liquid':       'liquid',
        'Lisp':         'lisp',
        'LiveScript':   'ls',
        'LogiQL':       'logic|lql',
        'LSL':          'lsl',
        'Lua':          'lua',
        'LuaPage':      'lp',
        'Lucene':       'lucene',
        'Makefile':     '^Makefile|^GNUmakefile|^makefile|^OCamlMakefile|make',
        // start developer change
        'MATLAB':       'matlab|m',
        // end developer change
        'Markdown':     'md|markdown',
        'MySQL':        'mysql',
        'MUSHCode':     'mc|mush',
        'Nix':          'nix',
        // start DEV change
        'objectivec':   'mm',
        // end DEV change
        'OCaml':        'ml|mli',
        'Pascal':       'pas|p',
        'Perl':         'pl|pm',
        'pgSQL':        'pgsql',
        // start upstream change
        'PHP':          'php|php3|php4|php5|php6|php7|phtml',
        // end upstream change
        'Powershell':   'ps1',
        'Prolog':       'plg|prolog',
        'Properties':   'properties',
        'Protobuf':     'proto',
        'Python':       'py',
        'R':            'r',
        'RDoc':         'Rd',
        'RHTML':        'Rhtml',
        // start upstream change
        'Ruby':         'rb|ru|gemspec|podspec|rake|thor|^Guardfile|^Rakefile|^Gemfile',
        // end upstream change
        'Rust':         'rs',
        'SASS':         'sass',
        'SCAD':         'scad',
        'Scala':        'scala',
        // start upstream change
        'Scheme':       'scm|sm|rkt|oak|scheme',
        // end upstream change
        'SCSS':         'scss',
        'SH':           'sh|bash|^.bashrc',
        'SJS':          'sjs',
        'Space':        'space',
        'snippets':     'snippets',
        'Soy_Template': 'soy',
        'SQL':          'sql',
        'Stylus':       'styl|stylus',
        'SVG':          'svg',
        'Tcl':          'tcl',
        'Tex':          'tex',
        'Text':         'txt',
        'Textile':      'textile',
        'Toml':         'toml',
        // start upstream change
        'Twig':         'latte|twig|swig',
        // end upstream change
        'TypeScript':   'ts|typescript|str',
        // start upstream change
        'VBScript':     'vbs|vb',
        // end upstream change
        'Velocity':     'vm',
        'Verilog':      'v|vh|sv|svh',
        // start upstream change
        'XML':          'xml|rdf|rss|wsdl|xslt|atom|mathml|mml|xul|xbl|xaml',
        // end upstream change
        'XQuery':       'xq',
        'YAML':         'yaml|yml'
    };

    // Valid modes for the Ace editor at Fandom.
    // @var OVERRIDES
    // @private
    var OVERRIDES = {
        'c_cpp':        'C/C++',
        'csharp':       'C#',
        'coffee':       'CoffeeScript',
        'ftl':          'FreeMarker',
        'golang':       'Go',
        'html_ruby':    'HTML (Ruby)',
        'objectivec':   'Objective-C'
    };

    // Mode data class (used to parse mode data map).
    // @class Mode
    // @param {string} name Mode Ace submodule key.
    // @param {string} caption Mode code language caption.
    // @param {string} extensions Mode extension data.
    // @private
    function Mode(name, caption, extensions) {
        /*
           @property {string} name Mode Ace submodule key.
           @property {string} caption Mode code language caption.
           @property {string} mode Ace submodule identifier.
           @property {string} extensions Pipe-delimited extension list.
           @property {RegExp} extRe Regular expression for mode detection.
        */
        this.name = name;
        this.caption = caption;
        this.mode = 'ace/mode/' + name;
        this.extensions = extensions;
    
        var re = /\^/.test(extensions)
            ? extensions.replace(/\|(\^)?/g, function(a, b) {
                return "$|" + (b ? "^" : "^.*\\.");
            }) + "$"
            : "^.*\\.(" + extensions + ")$";
        this.extRe = new RegExp(re, "gi");
    }
    Mode.prototype.supportsFile = function(path) {
        return path.match(this.extRe);
    };

    // Path getter for automatic mode detection.
    // @function getModeForPath
    // @param {string} path Full path of current file.
    // @returns {?Mode} Detected mode of current file, or null.
    exports.getModeForPath = function(path) {
        if (typeof path === 'string') {
            var name = path.split(/[\/\\]/).pop();
            for (var m in this.modes) {
                if (this.modes[m].supportsFile(name)) {
                    return this.modes[m];
                }
            }
        }
        return null;
    };

    // Parsed mode data map for the Fandom Ace editor.
    // Maps Ace mode submodule name to relevant mode data.
    // @property {Object.<String, Mode>}} modes
    exports.modes = {};
    $.each(SUPPORTED, function(lang, data) {
        var caption = OVERRIDES[lang] || lang;
        var name = lang.toLowerCase();
        exports.modes[name] = new Mode(name, caption, data);
    });

    mw.hook('dev.codeeditor.modelist').fire(exports);
});