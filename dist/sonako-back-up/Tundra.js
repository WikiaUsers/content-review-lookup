/*
 * Tundra v1.0.0pre
 * A MediaWiki API access library for in-browser use on wikis.
 * <https://github.com/Matthew2602/tundra>
 *
 * Built with lots of <3 by Matthew2602.
 * <https://github.com/Matthew2602>
 *
 * Available under the MIT license.
 * <https://raw.github.com/Matthew2602/tundra/master/MIT-LICENSE.txt>
 *
 * Powered by the sheer awesomeness of jQuery.
 * <http://jquery.com/>
*/
 
 
(function() {
  "use strict";
  var $, console, document, mw, tundra, util, window,
    __hasProp = {}.hasOwnProperty,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };
 
  window = this;
 
  document = window.document;
 
  console = window.console;
 
  $ = window.jQuery;
 
  mw = window.mediaWiki;
 
  if (!console) {
    console = {
      log: $.noop,
      warn: $.noop,
      error: $.noop
    };
  }
 
  if (!mw) {
    throw new TypeError("Could not initialise Tundra -- " + "Must be running on a MediaWiki site!");
  }
 
  tundra = {};
 
  util = {};
 
  tundra.util = {};
 
  util.isSetString = function(input) {
    return !!(typeof input === "string" && input.length);
  };
 
  util.normalizeNamespaceName = tundra.util.normalizeNamespaceName = function(namespace) {
    if (!util.isSetString(namespace)) {
      return "";
    }
    return $.trim(namespace.toLowerCase().replace(/\ /g, "_"));
  };
 
  util.getNamespaceNumber = tundra.util.getNamespaceNumber = function(namespace) {
    namespace = util.normalizeNamespaceName(namespace);
    return tundra.data.mediawikiConfig.namespaceIds[namespace];
  };
 
  util.getNamespaceFromNumber = tundra.util.getNamespaceFromNumber = function(namespaceNumber) {
    return tundra.data.mediawikiConfig.formattedNamespaces[namespaceNumber];
  };
 
  util.parseInt = function(value) {
    return parseInt(value, 10);
  };
 
  util.parseFloat = function(value) {
    return parseFloat(value, 10);
  };
 
  tundra.data = {
    version: "1.0.0pre",
    apiURL: mw.util.wikiScript("api"),
    protectionTypes: ["edit", "move"],
    protectionLevels: ["all", "autoconfirmed", "sysop"],
    infiniteTimestamps: ["infinite", "indefinite", "never"]
  };
 
  tundra.data.mediawikiConfig = (function() {
    var filteredConfig, key, mediawikiConfig, value, valueNamesNotStartingWithWg;
    mediawikiConfig = mw.config.values;
    filteredConfig = {};
    valueNamesNotStartingWithWg = ["skin"];
    for (key in mediawikiConfig) {
      if (!__hasProp.call(mediawikiConfig, key)) continue;
      value = mediawikiConfig[key];
      if (!((key.slice(0, 2)) === "wg" || __indexOf.call(valueNamesNotStartingWithWg, key) >= 0)) {
        continue;
      }
      key = key.replace("wg", "");
      key = (key.charAt(0)).toLowerCase() + key.slice(1);
      filteredConfig[key] = value;
    }
    return filteredConfig;
  })();
 
  tundra.data.Page = (function() {
    var _handleName, _handleNamespace, _mainspaceNamespaceText, _setName;
 
    function Page(identifier, config) {
      var setName;
      if (!$.isPlainObject(config)) {
        config = {};
      }
      setName = $.proxy(_setName, this);
      if (mw.Title && identifier instanceof mw.Title) {
        setName(identifier.getPrefixedDb());
        return;
      }
      if (identifier instanceof tundra.data.Page) {
        setName(identifier.name);
        return;
      }
      if (util.isSetString(identifier)) {
        setName(identifier);
        return;
      }
      if (config.defaultToCurrentPage) {
        setName(tundra.data.currentPage.name);
      }
    }
 
    Page.prototype.cache = function() {
      var index, page, _i, _len, _ref;
      _ref = tundra.data.cache.pages.data;
      for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
        page = _ref[index];
        if (page.name.toLowerCase() === this.name.toLowerCase()) {
          tundra.data.cache.pages.data[index] = this;
          return;
        }
      }
      return tundra.data.cache.pages.data.push(this);
    };
 
    _setName = function(newName) {
      _handleNamespace.call(this, newName);
      _handleName.call(this, newName);
      return this.name = newName;
    };
 
    _mainspaceNamespaceText = "(main space)";
 
    _handleNamespace = function(name) {
      var namespace, namespaceNumber,
        _this = this;
      namespace = util.normalizeNamespaceName((function() {
        if (/:/.test(name)) {
          return (name.split(":"))[0];
        }
        return "";
      })());
      namespaceNumber = util.getNamespaceNumber(namespace);
      if (namespaceNumber) {
        this.namespace = namespace;
        this.namespaceNumber = namespaceNumber;
        return this.namespaceText = (function() {
          if (_this.namespaceNumber === 0) {
            return _mainspaceNamespaceText;
          }
          return $.ucFirst(_this.namespace.replace(/_/g, " "));
        })();
      } else {
        this.namespaceNumber = 0;
        this.namespace = util.getNamespaceFromNumber(this.namespaceNumber);
        return this.namespaceText = _mainspaceNamespaceText;
      }
    };
 
    _handleName = function(newName) {
      var _this = this;
      this.title = newName.slice((newName.indexOf(":")) + 1);
      this.title = $.ucFirst(this.title.replace(/_/g, " "));
      this.nameText = (function() {
        if (_this.namespace) {
          return _this.namespaceText + ":" + _this.title;
        }
        return _this.title;
      })();
      this.name = this.nameText.replace(/\ /g, "_");
      this.url = mw.util.wikiGetlink(this.name);
      if (/\./.test(this.title)) {
        return this.extension = this.title.slice((this.title.lastIndexOf(".")) + 1);
      }
    };
 
    return Page;
 
  })();
 
  tundra.data.cache = {};
 
  tundra.data.cache.pages = {
    data: []
  };
 
  tundra.data.currentPage = new tundra.data.Page(tundra.data.mediawikiConfig.pageName);
 
  $(function() {
    tundra.data.currentPage.html = mw.util.$content.html();
    return tundra.data.currentPage.cache();
  });
 
  tundra.data.queryableSpecialPages = {
    Ancientpages: {
      functionTitle: "AncientPages",
      errorContextMessageText: "ancient pages"
    },
    BrokenRedirects: {
      functionTitle: "BrokenRedirects",
      errorContextMessageText: "broken redirects"
    },
    Deadendpages: {
      functionTitle: "DeadendPages",
      errorContextMessageText: "deadend pages"
    },
    Disambiguations: {
      functionTitle: "Disambiguations",
      errorContextMessageText: "disambiguations"
    },
    DoubleRedirects: {
      functionTitle: "DoubleRedirects",
      errorContextMessageText: "double redirects"
    },
    Listredirects: {
      functionTitle: "Redirects",
      errorContextMessageText: "redirects"
    },
    Lonelypages: {
      functionTitle: "OrphanedPages",
      errorContextMessageText: "orphaned pages"
    },
    Longpages: {
      functionTitle: "LongPages",
      errorContextMessageText: "longest pages"
    },
    Mostcategories: {
      functionTitle: "PagesWithMostCategories",
      errorContextMessageText: "pages with the most categories"
    },
    Mostimages: {
      functionTitle: "MostUsedFiles",
      errorContextMessageText: "most used files"
    },
    Mostlinkedcategories: {
      functionTitle: "MostUsedCategories",
      errorContextMessageText: "most used categories"
    },
    Mostlinkedtemplates: {
      functionTitle: "MostUsedTemplates",
      errorContextMessageText: "most used templates"
    },
    Mostlinked: {
      functionTitle: "MostLinkedPages",
      errorContextMessageText: "pages that are most linked to"
    },
    Mostrevisions: {
      functionTitle: "PagesWithMostRevisions",
      errorContextMessageText: "pages with the most revisions"
    },
    Fewestrevisions: {
      functionTitle: "PagesWithFewestRevisions",
      errorContextMessageText: "pages with the fewest revisions"
    },
    Shortpages: {
      functionTitle: "ShortPages",
      errorContextMessageText: "shortest pages"
    },
    Uncategorizedcategories: {
      functionTitle: "UncategorizedCategories",
      errorContextMessageText: "uncategorized categories"
    },
    Uncategorizedpages: {
      functionTitle: "UncategorizedPages",
      errorContextMessageText: "uncategorized pages"
    },
    Uncategorizedimages: {
      functionTitle: "UncategorizedFiles",
      errorContextMessageText: "uncategorized files"
    },
    Uncategorizedtemplates: {
      functionTitle: "UncategorizedTemplates",
      errorContextMessageText: "uncategorized templates"
    },
    Unusedcategories: {
      functionTitle: "UnusedCategories",
      errorContextMessageText: "unused categories"
    },
    Unusedimages: {
      functionTitle: "UnusedFiles",
      errorContextMessageText: "unused files"
    },
    Wantedcategories: {
      functionTitle: "WantedCategories",
      errorContextMessageText: "wanted categories"
    },
    Wantedfiles: {
      functionTitle: "WantedFiles",
      errorContextMessageText: "wanted files"
    },
    Wantedpages: {
      functionTitle: "WantedPages",
      errorContextMessageText: "wanted pages"
    },
    Wantedtemplates: {
      functionTitle: "Wantedtemplates",
      errorContextMessageText: "wanted templates"
    },
    Unwatchedpages: {
      functionTitle: "Unwatchedpages",
      errorContextMessageText: "unwatched pages"
    },
    Unusedtemplates: {
      functionTitle: "UnusedTemplates",
      errorContextMessageText: "unused templates"
    },
    Withoutinterwiki: {
      functionTitle: "PagesWithoutInterlanguageLinks",
      errorContextMessageText: "pages without inter-language links"
    }
  };
 
  tundra.data.tokens = (function() {
    var filteredTokens, token, tokenName, tokens;
    tokens = mw.user.tokens.values;
    filteredTokens = {};
    for (tokenName in tokens) {
      if (!__hasProp.call(tokens, tokenName)) continue;
      token = tokens[tokenName];
      tokenName = tokenName.replace("Token", "");
      filteredTokens[tokenName] = token;
    }
    return filteredTokens;
  })();
 
  tundra.Request = (function() {
    function Request(config, requestFunction) {
      var _this = this;
      (function() {
        if (config instanceof tundra.Request) {
          $.extend(_this, config);
          delete _this._requestHandler;
          delete _this._resolveWithNoArguments;
          return;
        }
        if ($.isPlainObject(config)) {
          if ($.isPlainObject(config.requestParameters)) {
            _this.requestParameters = config.requestParameters;
            delete config.requestParameters;
          }
          _this.config = config;
        } else {
          _this.config = {};
        }
        if (!$.isPlainObject(_this.requestParameters)) {
          _this.requestParameters = {};
        }
        if (!$.isPlainObject(_this.error)) {
          return _this.error = {};
        }
      })();
      this._deferred = $.Deferred();
      $.extend(this, this._deferred.promise());
      this._handlerDeferred = $.Deferred();
      this._handlerPromise = this._handlerDeferred.promise();
      this._augmentHandlerDeferred();
      this._requestFunction = requestFunction;
      this._run();
    }
 
    Request.prototype._augmentHandlerDeferred = function() {
      var rejectDeferred, resolveDeferred,
        _this = this;
      resolveDeferred = this._handlerDeferred.resolve;
      rejectDeferred = this._handlerDeferred.reject;
      return $.extend(this._handlerDeferred, {
        resolve: function() {
          resolveDeferred.apply(_this._handlerDeferred, arguments);
          if (_this._deferred.state() === "resolved") {
            return;
          }
          if (_this._resolveWithNoArguments) {
            return _this._deferred.resolve();
          } else {
            return _this._deferred.resolve.apply(_this._deferred, arguments);
          }
        },
        reject: function() {
          rejectDeferred.apply(_this._handlerDeferred, arguments);
          if (_this._deferred.state() === "rejected") {
            return;
          }
          return _this._.apply(_this._deferred, arguments);
        }
      });
    };
 
    return Request;
 
  })();
 
  tundra.Request.prototype._fireError = function(errorConfig) {
    var logMessage,
      _this = this;
    if ($.isPlainObject(errorConfig)) {
      $.extend(this.error, errorConfig);
    }
    if ((util.isSetString(this.error.info)) && !util.isSetString(this.error.message)) {
      this.error.message = this.error.info;
    }
    delete this.error.info;
    if (!util.isSetString(this.error.code)) {
      this.error.code = "unknownerror";
    }
    if (!this.error.artificial) {
      this.error.artificial = false;
    }
    if (!util.isSetString(this.error.contextMessage)) {
      this.error.contextMessage = "requesting " + JSON.stringify(this.requestParameters);
    }
    logMessage = (function() {
      if (!_this.error.http) {
        logMessage = "MediaWiki API error " + _this.error.contextMessage;
      } else {
        logMessage = "Error accessing the MediaWiki API";
      }
      logMessage += " (error code: " + _this.error.code + ")";
      if (util.isSetString(_this.error.message)) {
        logMessage += ": " + _this.error.message;
      }
      return logMessage;
    })();
    console.error(logMessage, this);
    return this._deferred.reject(this.error);
  };
 
  tundra.Request.prototype._setArtificialError = function(errorConfig) {
    if (!$.isPlainObject(errorConfig)) {
      return;
    }
    errorConfig.artificial = true;
    $.extend(this.error, errorConfig);
    return this.config._errorSet = true;
  };
 
  tundra.Request.prototype._fireArtificialError = function(errorConfig) {
    this._setArtificialError(errorConfig);
    return this._fireError();
  };
 
  tundra.Request.prototype._baseRequestHandler = function() {
    this.requestParameters.action = this.action;
    if (tundra.data.tokens[this._token]) {
      this.requestParameters.token = tundra.data.tokens[this._token];
    }
    this.method = this.post ? "POST" : "GET";
    if (!util.isSetString(this.action)) {
      this._setArtificalError({
        code: "noaction",
        message: "You must specifiy an API action!"
      });
    }
    if (this.config._errorSet) {
      return this._fireError();
    }
  };
 
  tundra.Request.prototype._callAPI = function() {
    var ajaxConfig, converter, errorCallback, successCallback,
      _this = this;
    if (this.state() === "rejected") {
      return;
    }
    if ($.isEmptyObject(this.requestParameters)) {
      this._fireError({
        code: "norequestdata",
        message: "No data was specified to actually call the API for!"
      });
      return;
    }
    this.requestParameters.format = "json";
    converter = function(data) {
      var error, invalidJSON;
      invalidJSON = function() {
        _this.rootResponseData = data;
        return _this._fireError({
          code: "invalidjson",
          message: "The server did not return valid JSON!"
        });
      };
      try {
        data = JSON.parse(data);
      } catch (_error) {
        error = _error;
        invalidJSON();
        return;
      }
      if (!data) {
        invalidJSON();
        return;
      }
      return data;
    };
    ajaxConfig = {
      url: tundra.data.apiURL,
      dataType: "json",
      type: this.method,
      data: this.requestParameters,
      converters: {
        "text json": converter
      }
    };
    successCallback = function(data) {
      if (_this.state() === "rejected") {
        return;
      }
      _this.rootResponseData = data;
      delete _this.requestParameters.format;
      if (data.error) {
        _this._fireError(data.error);
        return;
      }
      delete _this.error;
      if (data[_this.action]) {
        data = data[_this.action];
      }
      return _this._handlerDeferred.resolve(data);
    };
    errorCallback = function(jqXHR, textStatus, errorThrown) {
      return _this._fireError({
        http: true,
        code: jqXHR.textStatus,
        message: errorThrown
      });
    };
    return $.ajax(ajaxConfig).done(successCallback).fail(errorCallback);
  };
 
  tundra.Request.prototype._run = function() {
    this._requestFunction.call(this);
    if ($.isFunction(this._requestHandler)) {
      this._requestHandler(this).done(this._handlerDeferred.resolve).fail(this._handlerDeferred.reject);
      return;
    }
    this._baseRequestHandler();
    return this._callAPI();
  };
 
  tundra.getArticleHTML = function(config) {
    if (util.isSetString(config)) {
      config = {
        page: config
      };
    }
    return new tundra.Request(config, function() {
      var _this = this;
      this.action = "parse";
      this.config.page = new tundra.data.Page(this.config.page, {
        defaultToCurrentPage: true
      });
      $.extend(this.requestParameters, {
        page: this.config.page.name,
        prop: "text"
      });
      this.error.contextMessage = "retrieving the HTML of " + ("\"" + this.config.page.nameText + "\"");
      return this._handlerPromise.done(function(data) {
        _this.config.page.html = data.text["*"];
        _this._deferred.resolve(_this.config.page.html);
        return _this.config.page.cache();
      });
    });
  };
 
  tundra.getArticleWikitext = function(config) {
    if (util.isSetString(config)) {
      config = {
        page: config
      };
    }
    return new tundra.Request(config, function() {
      var _this = this;
      this.config.page = new tundra.data.Page(this.config.page, {
        defaultToCurrentPage: true
      });
      $.extend(this.requestParameters, {
        prop: "revisions",
        titles: this.config.page.name,
        rvprop: "content",
        rvlimit: 1
      });
      this._requestHandler = tundra.query;
      this.error.contextMessage = "retrieving the wikitext of " + this.config.page.nameText;
      return this._handlerDeferred.done(function(data) {
        var articleID, key;
        data = data.pages;
        articleID = ((function() {
          var _results;
          _results = [];
          for (key in data) {
            if (!__hasProp.call(data, key)) continue;
            _results.push(key);
          }
          return _results;
        })())[0];
        _this.config.page.wikitext = data[articleID].revisions[0]["*"];
        _this._deferred.resolve(_this.config.page.wikitext);
        return _this.config.page.cache();
      });
    });
  };
 
  tundra.getList = function(config) {
    if (util.isSetString(config)) {
      config = {
        list: config
      };
    }
    return new tundra.Request(config, function() {
      var errorContextMessageAlreadySet,
        _this = this;
      this.requestParameters.list = this.config.list;
      this._requestHandler = tundra.query;
      if (util.isSetString(this.error.contextMessage)) {
        errorContextMessageAlreadySet = true;
      } else {
        this.error.contextMessage = "retrieving list ";
      }
      if (util.isSetString(this.config.list)) {
        if (!errorContextMessageAlreadySet) {
          this.error.contextMessage += "\"" + this.config.list + "\"";
        }
      } else {
        this._setArtificialError({
          code: "nolist",
          message: "You must provide the name of a list to retrieve!"
        });
        if (!errorContextMessageAlreadySet) {
          this.error.contextMessage += "\"\"";
        }
      }
      return this._handlerPromise.done(function(data) {
        data = data[_this.config.list];
        return _this._deferred.resolve(data);
      });
    });
  };
 
  tundra.getRandomPage = function(config) {
    return new tundra.Request(config, function() {
      var _this = this;
      this.config.list = "random";
      this._requestHandler = tundra.getList;
      this.error.contextMessage = "retrieving information about a random page";
      if (tundra.util.getNamespaceFromNumber(this.config.namespaceNumber)) {
        this.requestParameters.rnnamespace = this.config.namespaceNumber;
      }
      if (this.config.onlyRedirects) {
        this.requestParameters.rnredirect = true;
      }
      return this._handlerPromise.done(function(data) {
        var randomPage;
        data = data[0];
        randomPage = new tundra.data.Page(data.title);
        return _this._deferred.resolve(randomPage);
      });
    });
  };
 
  tundra.getSearchSuggestions = function(config) {
    if (util.isSetString(config)) {
      config = {
        searchQuery: config
      };
    }
    return new tundra.Request(config, function() {
      var namespace, _filteredNamespaces, _i, _len, _ref;
      this.action = "opensearch";
      this.config.resultLimit = util.parseInt(this.config.resultLimit);
      $.extend(this.requestParameters, {
        search: this.config.searchQuery,
        suggest: true
      });
      this.error.contextMessage = "retrieving search sugegstions for ";
      if (util.isSetString(this.config.searchQuery)) {
        this.error.contextMessage += "\"" + this.config.searchQuery + "\"";
      } else {
        this._setArtificialError({
          code: "invalidsearchterm",
          message: "The search term must be a non-empty string!"
        });
        this.error.contextMessage += "\"\"";
      }
      if (this.config.resultLimit) {
        this.requestParameters.limit = this.config.resultLimit;
      }
      if ($.isArray(this.config.namespaces)) {
        _filteredNamespaces = [];
        _ref = this.config.namespaces;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          namespace = _ref[_i];
          if (util.isSetString(namespace)) {
            namespace = util.getNamespaceNumber(namespace.toLowerCase());
            if (namespace) {
              _filteredNamespaces.push(namespace);
            }
            continue;
          }
          if (util.getNamespaceFromNumber(namespace)) {
            _filteredNamespaces.push(namespace);
          }
        }
        this.requestParameters.namespace = _filteredNamespaces.join("|");
      } else {
        this.config.namespaces = util.parseInt(this.config.namespaces);
        if (this.config.namespaces) {
          this.requestParameters.namespace = this.config.namespaces;
        }
      }
      return this._handlerDeferred.done(function(data) {
        var suggestion, suggestionsData;
        data = data[1];
        suggestionsData = (function() {
          var _j, _len1, _results;
          _results = [];
          for (_j = 0, _len1 = data.length; _j < _len1; _j++) {
            suggestion = data[_j];
            _results.push(new tundra.data.Page(suggestion));
          }
          return _results;
        })();
        return this._deferred.resolve(suggestionsData);
      });
    });
  };
 
  tundra.meta = function(config) {
    if (util.isSetString(config)) {
      config = {
        meta: config
      };
    }
    return new tundra.Request(config, function() {
      var _this = this;
      this.requestParameters.meta = this.config.meta;
      this._requestHandler = tundra.query;
      if (!((util.isSetString(this.config.meta)) || this.config._errorSet)) {
        this._setArtificialError({
          code: "nometa",
          message: "You must specify a value to retrieve associated meta" + "information!"
        });
      }
      if (!util.isSetString(this.error.contextMessage)) {
        this.error.contextMessage = "retrieving meta information for " + this.config.meta;
      }
      return this._handlerPromise.done(function(data) {
        data = data[_this.config.meta];
        return _this._deferred.resolve(data);
      });
    });
  };
 
  tundra.parseWikitext = function(config) {
    if (util.isSetString(config)) {
      config = {
        wikitext: config
      };
    }
    return new tundra.Request(config, function() {
      var _this = this;
      this.action = "parse";
      this.config.actLikeWikitextIsOn = new tundra.data.Page(this.config.actLikeWikitextIsOn, {
        defaultToCurrentPage: true
      });
      $.extend(this.requestParameters, {
        text: this.config.wikitext,
        prop: "text",
        title: this.config.actLikeWikitextIsOn.name,
        pst: true
      });
      this.error.contextMessage = "parsing wikitext";
      if (!util.isSetString(this.config.wikitext)) {
        this._setArtificialError({
          code: "notitle",
          message: "You must specify wikitext to parse!"
        });
      }
      return this._handlerPromise.done(function(data) {
        var html;
        html = data.text["*"];
        return _this._deferred.resolve(html);
      });
    });
  };
 
  tundra.query = function(config) {
    return new tundra.Request(config, function() {
      this.action = "query";
      if ($.isPlainObject(config)) {
        $.extend(this.requestParameters, this.config);
      }
      if ($.isEmptyObject(this.requestParameters)) {
        this._setArtificialError({
          code: "noparameters",
          message: "This module requires parameters!"
        });
      }
      if (!this.error.contextMessage) {
        return this.error.contextMessage = "querying " + JSON.stringify(this.requestParameters);
      }
    });
  };
 
  tundra.querySpecialPage = function(config) {
    if (util.isSetString(config)) {
      config = {
        page: config
      };
    }
    return new tundra.Request(config, function() {
      var pageTitle, _ref,
        _this = this;
      $.extend(this.config, {
        list: "querypage",
        limit: util.parseInt(this.config.limit),
        offset: util.parseInt(this.config.offset)
      });
      if (!util.isSetString(this.error.contextMessage)) {
        this.error.contextMessage = "querying special page \"" + this.config.page + "\"";
      }
      if (util.isSetString(this.config.page)) {
        this.config.page = $.trim(this.config.page.toLowerCase());
        _ref = tundra.data.queryableSpecialPages;
        for (pageTitle in _ref) {
          if (!__hasProp.call(_ref, pageTitle)) continue;
          if (pageTitle.toLowerCase() === this.config.page) {
            this.requestParameters.qppage = pageTitle;
            break;
          }
        }
      }
      if (!util.isSetString(this.requestParameters.qppage)) {
        this._setArtificialError({
          code: "noqppage",
          message: "You must provide the title"
        });
      }
      if (this.config.limit > 0) {
        this.requestParameters.qplimit = this.config.limit;
      }
      if (this.config.offset > 0) {
        this.requestParameters.qpoffset = this.config.offset;
      }
      this._requestHandler = tundra.getList;
      return this._handlerPromise.done(function(data) {
        var page, pagesData;
        pagesData = (function() {
          var _i, _len, _ref1, _results;
          _ref1 = data.results;
          _results = [];
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            page = _ref1[_i];
            _results.push(new tundra.data.Page(page.title));
          }
          return _results;
        })();
        return deferred.resolve(pagesData, data.cachedtimestamp);
      });
    });
  };
 
  (function() {
    var createSpecialPageQueryFunction, pageDescriptor, specialPageTitle, _ref, _results;
    createSpecialPageQueryFunction = function(config) {
      return tundra["get" + config.functionTitle] = function(config) {
        return new tundra.Request(config, function() {
          $.extend(requestConfig, {
            page: config.specialPageTitle,
            errorContextMessage: "retriving the list of " + config.errorContextMessageText
          });
          return tundra.querySpecialPage(requestConfig);
        });
      };
    };
    _ref = tundra.data.queryableSpecialPages;
    _results = [];
    for (specialPageTitle in _ref) {
      if (!__hasProp.call(_ref, specialPageTitle)) continue;
      pageDescriptor = _ref[specialPageTitle];
      pageDescriptor.specialPageTitle = specialPageTitle;
      _results.push(createSpecialPageQueryFunction(pageDescriptor));
    }
    return _results;
  })();
 
  tundra.getUserEditCount = function(config) {
    return new tundra.Request(config, function() {
      this.config.uiprop = "editcount";
      this._requestHandler = tundra.getUserInfo;
      return this.error.contextMessage = "retrieving the user's edit count";
    });
  };
 
  tundra.getUserEmailAddress = function(config) {
    return new tundra.Request(config, function() {
      this.config.uiprop = "email";
      this._requestHandler = tundra.getUserInfo;
      return this.error.contextMessage = "retrieving the user's email address";
    });
  };
 
  tundra.getUserInfo = function(config) {
    if (util.isSetString(config)) {
      config = {
        uiprop: config
      };
    }
    return new tundra.Request(config, function() {
      var _this = this;
      this.config.meta = "userinfo";
      this.requestParameters.uiprop = this.config.uiprop;
      this._requestHandler = tundra.meta;
      if (!util.isSetString(this.config.uiprop)) {
        this._setArtificialError({
          code: "nometa",
          message: "You must specify a value to retrieve associated" + "userinfo information!"
        });
      }
      if (!util.isSetString(this.error.contextMessage)) {
        this.error.contextMessage = "retrieving userinfo information for " + ("\"" + this.config.uiprop + "\"");
      }
      return this._handlerPromise.done(function(data) {
        data = data[_this.config.uiprop];
        return _this._deferred.resolve(data);
      });
    });
  };
 
  tundra.getUserPreferences = function(config) {
    return new tundra.Request(config, function() {
      var handleRequestForSpecificPreferences;
      this.config.uiprop = "options";
      this._requestHandler = tundra.getUserInfo;
      if (!util.isSetString(this.error.contextMessage)) {
        this.error.contextMessage = "retrieving user preferences";
      }
      handleRequestForSpecificPreferences = function(preferences, preferencesToRetrieve) {
        var _i, _len, _preference, _preferencesToReturn;
        if (preferences[preferencesToRetrieve]) {
          return preferences[preferencesToRetrieve];
        }
        if ($.isArray(preferencesToRetrieve)) {
          _preferencesToReturn = {};
          for (_i = 0, _len = preferencesToRetrieve.length; _i < _len; _i++) {
            _preference = preferencesToRetrieve[_i];
            if (util.isSetString(_preference && preferences[_preference])) {
              _preferencesToReturn[_preference] = preferences[_preference];
            }
          }
          if (!$.isEmptyObject(_preferencesToReturn)) {
            return _preferencesToReturn;
          }
        }
        return preferences;
      };
      return this._handlerPromise.done(function(data) {
        data = handleRequestForSpecificPreferences(data, this.config.specificPreferencesToRetrieve);
        return this._deferred.resolve(data);
      });
    });
  };
 
  tundra.getUserSignatureWikitext = function(config) {
    return new tundra.Request(config, function() {
      this.config.specificPreferencesToRetrieve = "nickname";
      this._requestHandler = tundra.getUserPreferences;
      if (!util.isSetString(this.error.contextMessage)) {
        return this.error.contextMessage = "retrieving the wikitext of the user's" + " signature";
      }
    });
  };
 
  tundra.block = function(config) {
    if (util.isSetString(config)) {
      config = {
        user: requestConfig
      };
    }
    return new tundra.Request(config, function() {
      var URLparam, configOptions, option, _ref;
      this.action = "block";
      this.post = true;
      this._token = "edit";
      this.error.contextMessage = "blocking ";
      this.requestParameters.user = this.config.user;
      if (util.isSetString(this.config.user)) {
        this.error.contextMessage += this.config.user;
      } else {
        this.setArtificialError({
          code: "nouser",
          message: "You must specify a user to block!"
        });
        this.error.contextMessage += "\"\"";
      }
      if ((util.isSetString(this.config.expiry)) && (_ref = this.config.expiry, __indexOf.call(tundra.data.infiniteTimestamps, _ref) < 0)) {
        this.requestParameters.expiry = this.config.expiry;
      }
      if (util.isSetString(this.config.reason)) {
        this.requestParameters.reason = this.config.reason;
      }
      configOptions = {
        anonymousOnly: "anononly",
        disableAccountCreation: "nocreate",
        autoBlock: "autoblock",
        disableEmail: "noemail"
      };
      for (option in configOptions) {
        if (!__hasProp.call(configOptions, option)) continue;
        URLparam = configOptions[option];
        if (this.config[option]) {
          this.requestParameters[URLparam] = true;
        }
      }
      return this._resolveWithNoArguments = true;
    });
  };
 
  tundra.unblock = function(config) {
    if (util.isSetString(config)) {
      config = {
        user: config
      };
    }
    return new tundra.Request(config, function() {
      this.action = "unblock";
      this.post = true;
      this._token = "edit";
      this.error.contextMessage = "unblocking ";
      this.requestParameters.user = this.config.user;
      if (util.isSetString(this.config.user)) {
        this.error.contextMessage += "\"" + this.config.user + "\"";
      } else {
        this.error.setArtificialError({
          code: "nouser",
          message: "You must specify a user or a block ID to unblock!"
        });
        this.error.contextMessage += "\"\"";
      }
      if (util.isSetString(this.config.reason)) {
        this.requestParameters.reason = this.config.reason;
      }
      return this._resolveWithNoArguments = true;
    });
  };
 
  tundra["delete"] = function(config) {
    if (util.isSetString(config)) {
      config = {
        page: config
      };
    }
    return new tundra.Request(config, function() {
      var _this = this;
      this.action = "delete";
      this.post = true;
      this._token = "edit";
      this.config.page = new tundra.data.Page(this.config.page, {
        defaultToCurrentPage: true
      });
      this.requestParameters.title = this.config.page.name;
      this.error.contextMessage = "deleting \"" + this.config.page.nameText + "\"";
      if (util.isSetString(this.config.reason)) {
        this.requestParameters.reason = this.config.reason;
      }
      if (this.config.watch) {
        this.requestParameters.watch = true;
      } else if (this.config.unwatch) {
        this.requestParameters.unwatch = true;
      }
      return this._handlePromise.done(function(data) {
        return _this._deferred.resolve(data.reason);
      });
    });
  };
 
  tundra.undelete = function(config) {
    if (util.isSetString(config)) {
      config = {
        page: config
      };
    }
    return new tundra.Request(config, function() {
      var timestamp,
        _this = this;
      this.action = "undelete";
      this.post = true;
      this._token = "edit";
      this.config.page = new tundra.data.Page(this.config.page, {
        defaultToCurrentPage: true
      });
      this.requestParameters.title = this.config.page.name;
      this.error.contextMessage = "restoring deleted revisions of " + ("\"" + this.config.page.nameText + "\"");
      if (util.isSetString(this.config.reason)) {
        this.requestParameters.reason = this.config.reason;
      }
      if ($.isArray(this.config.timestamps)) {
        this.config.timestamps = (function() {
          var _i, _len, _ref, _results;
          _ref = this.config.timestamps;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            timestamp = _ref[_i];
            if ((util.parseInt(timestamp)) > 0) {
              _results.push(timestamp);
            }
          }
          return _results;
        }).call(this);
        if (this.config.timestamps.length) {
          this.requestParameters.timestamps = this.config.timestamps.join("|");
        }
      } else {
        this.config.timestamps = util.parseInt(this.config.timestamps);
        if (this.config.timestamps > 0) {
          this.requestParameters.timestamps = this.config.timestamps;
        }
      }
      return this._handlerPromise.dome(function(data) {
        return _this._deferred.resolve(data.reason);
      });
    });
  };
 
  tundra.edit = function(config) {
    return new tundra.Request(config, function() {
      var _this = this;
      this.action = "edit";
      this.post = true;
      this._token = "edit";
      this.config.page = new tundra.data.Page(this.config.page, {
        defaultToCurrentPage: true
      });
      $.extend(this.requestParameters, {
        title: this.config.page.name,
        text: this.config.wikitext
      });
      this.error.contextMessage = "editing \"" + this.config.page.nameText + "\"";
      if (typeof this.config.wikitext !== "string") {
        this.setArtificialError({
          code: "notext",
          message: "You must specify wikitext to edit the page with!"
        });
      }
      if (util.isSetString(this.config.summary)) {
        this.requestParameters.summary = this.config.summary;
      }
      if (this.config.minor) {
        this.requestParameters.minor = true;
      } else if (this.config.minor === false) {
        this.requestParameters.notminor = true;
      }
      if (this.config.section === "new") {
        this.requestParameters.section = this.config.section;
        if (util.isSetString(this.config.newSectionTitle)) {
          this.requestParameters.sectiontitle = this.config.newSectionTitle;
        }
      } else {
        this.config.section = util.parseInt(this.config.section);
        if (this.config.section >= 0) {
          this.requestParameters.section = this.config.section;
        }
      }
      if (this.config.recreatePage) {
        this.requestParameters.recreate = true;
      }
      return this._handlerCallback.done(function(data) {
        if (data.result.toLowerCase() === "success") {
          _this._deferred.resolve(data.newrevid);
          return;
        }
        return _this._fireArtificialError({
          code: "unknownerror",
          message: "The edit was unsuccessful!"
        });
      });
    });
  };
 
  tundra.move = function(config) {
    return new tundra.Request(config, function() {
      var URLparam, configOptions, option;
      this.action = "move";
      this.post = true;
      this._token = "edit";
      $.extend(this.config, {
        from: new tundra.data.Page(this.config.from, {
          defaultToCurrentPage: true
        }),
        to: new tundra.data.Page(this.config.to)
      });
      $.extend(this.requestParameters, {
        from: this.config.from.name,
        to: this.config.to.name
      });
      this.error.contextMessage = "moving \"" + this.config.from.nameText + "\" to ";
      if (this.config.to.name) {
        this.error.contextMessage += "\"" + this.config.to.nameText + "\"";
      } else {
        this._setArtificialError({
          code: "noto",
          message: "You must specify the name of the page to move to!"
        });
        this.error.contextMessage += "\"\"";
      }
      if (util.isSetString(this.config.reason)) {
        this.requestParameters.reason = this.config.reason;
      }
      configOptions = {
        moveTalkPage: "movetalk",
        moveSubpages: "movesubpages",
        suppressRedirect: "noredirect",
        ignoreWarnings: "ignorewarnings"
      };
      for (option in configOptions) {
        if (!__hasProp.call(configOptions, option)) continue;
        URLparam = configOptions[option];
        if (this.config[option]) {
          this.requestParameters[URLparam] = true;
        }
      }
      if (this.config.watch) {
        this.requestParameters.watch = true;
      } else if (this.config.unwatch) {
        this.requestParameters.unwatch = true;
      }
      return this._resolveWithNoArguments = true;
    });
  };
 
  tundra.protect = function(config) {
    return new tundra.Request(config, function() {
      var protectionType, protections, _i, _len, _ref, _ref1, _ref2, _setProtectionLevel;
      this.action = "protect";
      this.post = true;
      this._token = "edit";
      this.config.page = new tundra.data.Page(this.config.page, {
        defaultToCurrentPage: true
      });
      $.extend(this.requestParameters, {
        title: this.config.page.name,
        create: true
      });
      this.error.contextMessage = "protecting \"" + this.config.page.nameText + "\"";
      protections = [];
      _ref = tundra.data.protectionTypes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        protectionType = _ref[_i];
        if (_ref1 = this.config.levels, __indexOf.call(tundra.data.protectionLevels, _ref1) >= 0) {
          protections.push("" + protectionType + "=" + this.config.levels);
          continue;
        }
        if (!$.isPlainObject(this.config.levels)) {
          continue;
        }
        _setProtectionLevel = this.config.levels[protectionType];
        if (_setProtectionLevel === false) {
          protections.push = "" + protectionType + "=all";
          continue;
        }
        if (__indexOf.call(tundra.data.protectionLevels, _setProtectionLevel) >= 0) {
          protections.push("" + protectionType + "=" + _setProtectionLevel);
        }
      }
      if (!protections.length) {
        this._setArtificialError({
          code: "noprotections",
          message: "You must set or remove some form of protection on the " + "page!"
        });
      }
      this.requestParameters.protections = protections.join("|");
      if (util.isSetString(this.config.reason)) {
        this.requestParameters.reason = this.config.reason;
      }
      if ((util.isSetString(this.config.expiry)) && (_ref2 = this.config.expiry, __indexOf.call(tundra.data.infiniteTimestamps, _ref2) < 0)) {
        this.requestParameters.expiry = this.config.expiry;
      }
      if (this.config.cascade) {
        this.requestParameters.cascade = true;
      }
      return this._resolveWithNoArguments = true;
    });
  };
 
  tundra.purge = function(config) {
    if (util.isSetString(config)) {
      config = {
        page: config
      };
    }
    return new tundra.Request(config, function() {
      var _this = this;
      this.action = "purge";
      this.config.page = new tundra.data.Page(requestConfig.page, {
        defaultToCurrentPage: true
      });
      $.extend(this.requestParameters, {
        titles: this.config.page.name,
        forcelinkupdate: true
      });
      this.error.contextMessage = "purging \"" + this.config.page.nameText + "\"";
      return this._handlerPromise.done(function(data) {
        data = data[0];
        if (data.purged === "") {
          _this._deferred.resolve();
          return;
        }
        if (data.missing === "") {
          _this._fireArtificialError({
            code: "missingtitle",
            message: "The page does not exist not exist!"
          });
          return;
        }
        if (data.invalid === "") {
          _this._fireArtificialError({
            code: "invalidtitle",
            message: "The title requested was invalid! (see " + "http://en.wikipedia.org/wiki/Wikipedia:Page_name#Invalid_page_names" + " for more information)"
          });
          return;
        }
        return _this._fireArtificialError({
          code: "unknownerror",
          message: "The page could not be purged!"
        });
      });
    });
  };
 
  tundra.sendEmail = function(config) {
    return new tundra.Request(config, function() {
      this.action = "emailuser";
      this.post = true;
      this._token = "edit";
      this.error.contextMessage = "emailing ";
      $.extend(this.requestParameters, {
        target: this.config.targetUser,
        text: this.config.message
      });
      if (util.isSetString(this.config.targetUser)) {
        this.error.contextMessage += "\"" + this.config.targetUser + "\"";
      } else {
        this._setArtificialError({
          code: "notarget",
          message: "You must specify a user to send email to!"
        });
        this.error.contextMessage += "\"\"";
      }
      if (!((util.isSetString(this.config.message)) && !this.config._errorSet)) {
        this._setArtificialError({
          code: "notext",
          message: "You must specify a message body to send!"
        });
      }
      if (util.isSetString(this.config.subjectLine)) {
        this.requestParameters.subject = this.config.subjectLine;
      }
      if (this.config.sendCopyToMe) {
        this.requestParameters.ccme = true;
      }
      return this._handlerPromise.done(function(data) {
        if (data.result.toLowerCase() === "success") {
          this._deferred.resolve();
          return;
        }
        return this._setArtificialError({
          code: "unknownerror",
          message: "The email could not be sent!"
        });
      });
    });
  };
 
  tundra.unwatch = function(config) {
    if (util.isSetString(config)) {
      config = {
        page: config
      };
    }
    return new tundra.Request(config, function() {
      this.config.unwatch = true;
      return this._requestHandler = tundra.watch;
    });
  };
 
  tundra.watch = function(config) {
    if (util.isSetString(config)) {
      config = {
        page: config
      };
    }
    return new tundra.Request(config, function() {
      var _this = this;
      this.action = "watch";
      this.post = true;
      this._token = "watch";
      this.config.page = new tundra.data.Page(this.config.page, {
        defaultToCurrentPage: true
      });
      this.requestParameters.title = this.config.page.name;
      if (!this.config.unwatch) {
        this.error.contextMessage = "watching ";
      } else {
        this.requestParameters.unwatch = true;
        this.error.contextMessage = "unwatching ";
      }
      this.error.contextMessage += "\"" + this.config.page.nameText + "\"";
      return this._handlerDeferred.done(function(data) {
        if (data[_this.config.unwatch ? "unwatched" : "watched"] === "") {
          _this._deferred.resolve();
          return;
        }
        return _this._fireArtificialError({
          code: "unknownerror",
          message: "The page could not be watched!"
        });
      });
    });
  };
 
  mw.libs.tundra = window.tundra = tundra;
 
}).call(this);