// start Babel boilerplate
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
    return typeof o;
  } : function(o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}

function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r) {
      return Object.getOwnPropertyDescriptor(e, r)
        .enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}

function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0)
      .forEach(function(r) {
        _defineProperty(e, r, t[r]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t))
      .forEach(function(r) {
        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
      });
  }
  return e;
}

function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}

function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}

function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
// end Babel boilerplate

// start script
(function(window) {
  "use strict";

  window.dev = window.dev || {};
  window.dev.dataStore = window.dev.dataStore || {
    hasRan: false,
    /** Has this been disabled by other scripts? */
    disabled: false,
    /** The reason why DataStore exited early */
    exitReason: null,
    /** Utility functions */
    util: {
      /**
       * Format messages with a proper prefix
       * @param msg The data to format
       * @returns {string}
       */
      msgFmt: function msgFmt() {
        var _DataStore;
        return (_DataStore = "[DataStore] ")
          .concat.apply(_DataStore, arguments);
      }
    }
  };

  // Early exit checks
  if (window.dev.dataStore.hasRan) window.dev.dataStore.exitReason = 1;
  if (window.dev.dataStore.disabled) window.dev.dataStore.exitReason = 2;
  if (window.dev.dataStore.exitReason) {
    switch (window.dev.dataStore.exitReason) {
      case 1:
        throw new Error(window.dev.dataStore.util.msgFmt("DataStore already ran"));
      case 2:
        throw new Error(window.dev.dataStore.util.msgFmt("DataStore was disabled by another script!"));
      default:
        throw new Error(window.dev.dataStore.util.msgFmt("DataStore cannot be initialized! Error code: ".concat(window.dev.dataStore.exitReason)));
    }
  }

  // Check storage permissions
  try {
    window.localStorage.setItem("__localstorage_test__", "__localstorage_test__");
    window.localStorage.removeItem("__localstorage_test__");
    window.sessionStorage.setItem("__sessionstorage_test__", "__sessionstorage_test__");
    window.sessionStorage.removeItem("__sessionstorage_test__");
  } catch (error) {
    throw new Error(window.dev.dataStore.util.msgFmt("Either LocalStorage or SessionStorage is unavailable and can't be accessed. To preserve data integrity, DataStore will intentionally throw. No data has been read or written.".concat(" Cause: ")
      .concat(error.message)));
  }

  // We're running
  window.dev.dataStore.hasRan = true;
  window.dev.dataStore = _objectSpread(_objectSpread({}, window.dev.dataStore), {}, {
    DataStore: DataStore,
    /**
     * All the recognized DataStore stores within the current environment
     *
     * @public
     * @static
     */
    stores: "stores" in window.dev.dataStore ? window.dev.dataStore.stores : {
      local: [],
      session: []
    },
    /**
     * Enum of storeTypes in DataStore, for now it only has LOCAL and SESSION
     *
     * @public
     * @static
     */
    storeTypes: {
      LOCAL: "local",
      SESSION: "session"
    },
    /**
     * Checks if a given name already exists in both local and session storage
     * @param name The name of the store to check
     * @returns A bool indicating if it is indeed a duplicate
     */
    isStoreNameDuplicate: function isStoreNameDuplicate(name) {
      var returnVal = false;
      for (var _i = 0, _Object$values = Object.values(this.storeTypes); _i < _Object$values.length; _i++) {
        var storeType = _Object$values[_i];
        // @ts-ignore
        this.stores[storeType].forEach(function(storeInstance) {
          if (storeInstance.storeName === name) returnVal = true;
        });
      }
      return returnVal;
    },
    get length() {
      return this.stores.local.length + this.stores.session.length;
    },
    /**
     * Indexes and finds DataStore storage spaces in the browser storage. Useful if there are DataStore-compatible storage keys not made by DataStore, or when you're inserting them using the browser's developer tools
     *
     * @public
     */
    index: function index() {
      console.debug(window.dev.dataStore.util.msgFmt("Starting indexing"));
      for (var _i2 = 0, _Object$keys = Object.keys(localStorage); _i2 < _Object$keys.length; _i2++) {
        var _key = _Object$keys[_i2];
        if (_key.startsWith("dev-")) {
          var keyName = _key.split("-", 2)[1];
          if (this.isStoreNameDuplicate(keyName)) continue;
          console.debug(window.dev.dataStore.util.msgFmt("Found local key"));
          new DataStore(keyName, {
            type: this.storeTypes.LOCAL
          });
        }
      };
      for (var _i3 = 0, _Object$keys2 = Object.keys(sessionStorage); _i3 < _Object$keys2.length; _i3++) {
        var _key2 = _Object$keys2[_i3];
        if (_key2.startsWith("dev-")) {
          var _keyName = _key2.split("-", 2)[1];
          if (this.isStoreNameDuplicate(_keyName)) continue;
          console.debug(window.dev.dataStore.util.msgFmt("Found session key"));
          new DataStore(_keyName, {
            type: this.storeTypes.SESSION
          });
        }
      };
      console.debug(window.dev.dataStore.util.msgFmt("Indexing done"));
    },
    /**
     * DO NOT INVOKE THIS MANUALLY AFTER INITIALIZATION!
     *
     * Initializes DataStore
     */
    _init: function _init() {
      this.index();
      console.log(window.dev.dataStore.util.msgFmt("DataStore init done!"));
    }
  });

  function DataStore(name, options) {
    // this.storeType;
    // this.storeName;
    // this.storePrefix;
    // this._fullStorePrefix;

    // check 1: parameters
    if (typeof arguments[0] !== 'string' || _typeof(arguments[1]) !== 'object') {
      throw new Error(window.dev.dataStore.util.msgFmt("Wrong parameters for instantiating DataStore! Expected (string, object)"), {
        cause: arguments
      });
    };

    // check 2: store type
    if (options.type !== window.dev.dataStore.storeTypes.LOCAL && options.type !== window.dev.dataStore.storeTypes.SESSION) {
      throw new Error(window.dev.dataStore.util.msgFmt("Store type must be either one of: `local`, `session`!"));
    };

    // check 3: Duplicate name stores are disallowed to prevent confusion
    if (window.dev.dataStore.isStoreNameDuplicate(name)) throw new Error(window.dev.dataStore.util.msgFmt("Store already exists!"));
    this.storeName = name;
    this.storeType = options.type;
    this.storePrefix = "dev-".concat(name);
    this._fullStorePrefix = this.storePrefix.concat("-");
    console.info(window.dev.dataStore.util.msgFmt("New store: `", name, "` with type: `", options.type, "` registered succesfully!"));
    window.dev.dataStore.stores[options.type].push(this);
  }
  Object.assign(DataStore.prototype, {
    /**
     * Returns an array of keys corresponding to this store in the key-value format
     *
     * @public
     * @returns The array of objects
     */
    list: function list() {
      console.debug(window.dev.dataStore.util.msgFmt("Starting key listing"));
      var listArr = {};
      switch (this.storeType) {
        case window.dev.dataStore.storeTypes.LOCAL:
          for (var _i4 = 0, _Object$keys3 = Object.keys(window.localStorage); _i4 < _Object$keys3.length; _i4++) {
            var _key3 = _Object$keys3[_i4];
            if (_key3.startsWith("dev-")) {
              console.debug(window.dev.dataStore.util.msgFmt("Found local key"));
              listArr[_key3] = window.localStorage.getItem(_key3) || "";
            }
          }
          break;
        case window.dev.dataStore.storeTypes.SESSION:
          for (var _i5 = 0, _Object$keys4 = Object.keys(window.sessionStorage); _i5 < _Object$keys4.length; _i5++) {
            var _key4 = _Object$keys4[_i5];
            if (_key4.startsWith("dev-")) {
              console.debug(window.dev.dataStore.util.msgFmt("Found session key"));
              listArr[_key4] = window.sessionStorage.getItem(_key4) || "";
            }
          }
          break;
      }
      console.debug(window.dev.dataStore.util.msgFmt("Key listing done"));
      return listArr;
    },
    /**
     * Directly fetch localStorage keys
     *
     * @param {string} key The key to fetch
     * @returns {(string | null)} The key's value, can be empty
     */
    _getLocal: function _getLocal(key) {
      console.debug(window.dev.dataStore.util.msgFmt("Getting local key: ".concat(key)));
      return window.localStorage.getItem(this._fullStorePrefix.concat(key));
    },
    /**
     * Directly fetch sessionStorage keys
     *
     * @param {string} key The key to fetch
     * @returns {(string | null)} The key's value, can be empty
     */
    _getSession: function _getSession(key) {
      console.debug(window.dev.dataStore.util.msgFmt("Getting session key: ".concat(key)));
      return window.sessionStorage.getItem(this._fullStorePrefix.concat(key));
    },
    /**
     * Fetches a key in the current store
     *
     * @public
     * @param {string} key The key to fetch
     * @returns {(string | null)} The value of the key, can be empty
     */
    get: function get(key) {
      var getKey;
      switch (this.storeType) {
        case window.dev.dataStore.storeTypes.LOCAL:
          getKey = this._getLocal(key);
          break;
        case window.dev.dataStore.storeTypes.SESSION:
          getKey = this._getSession(key);
          break;
        default:
          getKey = null;
          break;
      }
      return getKey;
    },
    /**
     * Directly store localStorage keys
     *
     * @param {string} key The key to store
     * @param {string} value The value of the key
     */
    _storeLocal: function _storeLocal(key, value) {
      console.debug(window.dev.dataStore.util.msgFmt("Storing local key: ".concat(key)));
      window.localStorage.setItem(this._fullStorePrefix.concat(key), value);
    },
    /**
     * Directly store sessionStorage keys
     * @param key
     * @param value
     */
    _storeSession: function _storeSession(key, value) {
      console.debug(window.dev.dataStore.util.msgFmt("Storing session key: ".concat(key)));
      window.sessionStorage.setItem(this._fullStorePrefix.concat(key), value);
    },
    /**
     * The internal method for abstracting key storage
     *
     * @param {string} key
     * @param {(string | object | null)} value
     */
    _store: function _store(key, value) {
      if (value == null) {
        value = "";
        console.warn(window.dev.dataStore.util.msgFmt("The key: `".concat(key, "` was stored with a null, DataStore normalizes nullish values as empty strings when storing keys")));
      };
      if (_typeof(value) === "object") {
        switch (this.storeType) {
          case window.dev.dataStore.storeTypes.LOCAL:
            this._storeLocal(key, JSON.stringify(value));
            break;
          case window.dev.dataStore.storeTypes.SESSION:
            this._storeSession(key, JSON.stringify(value));
            break;
        }
      }
      if (typeof value === "string") {
        switch (this.storeType) {
          case window.dev.dataStore.storeTypes.LOCAL:
            this._storeLocal(key, value);
            break;
          case window.dev.dataStore.storeTypes.SESSION:
            this._storeSession(key, value);
            break;
        }
      }
    },
    /**
     * Stores items in the store. Incredibly versatile. Can accept:
     * 1. `(k: string, v: string | object)`
     * 2. `(k: [string, string | object])`
     * 3. `({key: string, value: string | object})`
     *
     * @public
     * @param {({ key: string, value: string | object } | [string, string | object] | string)} k
     * @param {?(string | object)} [v]
     */
    store: function store(k, v) {
      var key;
      var value;
      if (Array.isArray(k)) {
        key = k[0];
        value = k[1];
      } else if (_typeof(k) === "object" && "key" in k && "value" in k) {
        key = k.key;
        value = k.value;
      } else if (typeof k === "string" && v !== undefined) {
        key = k;
        value = v;
      } else {
        throw new Error(window.dev.dataStore.util.msgFmt("Invalid arguments for `store`! This method has multiple overloads, make sure to use one of them"));
      }
      this._store(key, value);
    },
    /**
     * The internal method for removing keys from the local store
     *
     * @param {string} key The key to remove
     */
    _removeLocal: function _removeLocal(key) {
      console.debug(window.dev.dataStore.util.msgFmt("Removing local key: ".concat(key)));
      window.localStorage.removeItem(this._fullStorePrefix.concat(key));
    },
    /**
     * The internal method for removing keys from the session store
     *
     * @param {string} key The key to remove
     */
    _removeSession: function _removeSession(key) {
      console.debug(window.dev.dataStore.util.msgFmt("Removing session key: ".concat(key)));
      window.sessionStorage.removeItem(this._fullStorePrefix.concat(key));
    },
    /**
     * Removes keys from the store
     *
     * @public
     * @param {string} key The key to remove
     */
    remove: function remove(key) {
      switch (this.storeType) {
        case window.dev.dataStore.storeTypes.LOCAL:
          this._removeLocal(key);
          break;
        case window.dev.dataStore.storeTypes.SESSION:
          this._removeSession(key);
          break;
        default:
          console.warn(window.dev.dataStore.util.msgFmt("Unable to remove key: ".concat(key)
            .concat(" because it can't be found")));
          break;
      }
    },
    /**
     * Clears (remove) all of the keys in this store, but not deleting the store itself, making it usable again.
     *
     * To remove an entire store, use `.delete()`
     *
     * @public
     */
    clear: function clear() {
      console.debug(window.dev.dataStore.util.msgFmt("Clearing: ".concat(this.storeName)));
      switch (this.storeType) {
        case window.dev.dataStore.storeTypes.LOCAL:
          for (var _i6 = 0, _Object$keys5 = Object.keys(window.localStorage); _i6 < _Object$keys5.length; _i6++) {
            var _key5 = _Object$keys5[_i6];
            if (_key5.startsWith(this._fullStorePrefix)) {
              this._removeLocal(_key5.replace(this._fullStorePrefix, ""));
            }
          }
          break;
        case window.dev.dataStore.storeTypes.SESSION:
          for (var _i7 = 0, _Object$keys6 = Object.keys(window.sessionStorage); _i7 < _Object$keys6.length; _i7++) {
            var _key6 = _Object$keys6[_i7];
            if (_key6.startsWith(this._fullStorePrefix)) {
              this._removeSession(_key6.replace(this._fullStorePrefix, ""));
            }
          }
          break;
      }
      console.debug(window.dev.dataStore.util.msgFmt("Cleared"));
    },
    /**
     * Removes this store completely from DataStore, along with deleting its storage keys.
     *
     * To remove just the keys and not the store, use `.clear()`
     *
     * @public
     */
    "delete": function _delete() {
      var _this = this;
      console.debug(window.dev.dataStore.util.msgFmt("Deleting: ".concat(this.storeName)));
      this.clear();
      window.dev.dataStore.stores[this.storeType] = window.dev.dataStore.stores[this.storeType].filter(function(stores) {
        return stores.storeName !== _this.storeName;
      });
    }
  });
  console.log(window.dev.dataStore.util.msgFmt("Starting initialization..."));
  window.dev.dataStore._init();
})(this);