/**
* @module              MaybeMonad
* @description         Creates a safe method to wrap data of unknown type
* @author              Cacoethes
* @version             1.4.7
* @license             MIT
*/
/* global define */
define('cacoethes/maybe', [], function () {
  /**
  * Nothing data-type
  * @class Nothing
  */
  var Nothing = (function () {
    /**
    * Creates a Nothing
    * @public
    * @returns {Just}
    */
    var Nothing = function () {
      return this
    }

    /**
    * Returns a wrapped value
    * @public
    * @returns {Nothing}
    */
    Nothing.prototype.unwrap = function () {
      return this
    }

    return Nothing
  }())

  /**
  * Just data-type
  * @class Just
  */
  var Just = (function () {
    /**
    * internal value symbol
    * @private
    */
    var internal = Symbol('justvalue')

    /**
    * Wraps a value into a Just
    * @public
    * @param {any} value any type to wrap
    * @returns {Just}
    */
    var Just = function (value) {
      this[internal] = value
      return this
    }

    /**
    * Returns a wrapped value
    * @public
    * @returns {any}
    */
    Just.prototype.unwrap = function () {
      return this[internal]
    }

    return Just
  }())

  /**
  * Maybe data-type
  * @class Maybe
  */
  var Maybe = (function () {
    /**
    * internal value symbol
    * @private
    */
    var internal = Symbol('justornothing')

    /**
    * Checks the nothingness of a passed value
    * @private
    * @param {any} value any value to wrap
    * @returns {boolean}
    */
    var isNothingType = function (value) {
      var nothings = [null, undefined, NaN, [], '']

      return nothings.includes(value)
    }

    /**
    * Checks the justness of any type
    * @private
    * @param {any} value any type to be evaluated
    * @returns {boolean}
    */
    var isJust = function (value) {
      return value instanceof Just
    }

    /**
    * Checks the nothingness of any type
    * @private
    * @param {any} value any type to be evaluated
    * @returns {boolean}
    */
    var isNothing = function (value) {
      return value instanceof Nothing
    }

    /**
    * Checks whether the passed value is already wrapped
    * @private
    * @param {any} value any type to be evaluated
    * @returns {boolean}
    */
    var isWrapped = function (value) {
      return isJust(value) || isNothing(value)
    }

    /**
    * Takes a value and attempts to wrap it into a Just or Nothing
    * @private
    * @param {any} value the value to wrap
    * @returns {Just|Nothing}
    */
    var wrap = function (value) {
      var evaled = typeof value === 'function'
        ? value()
        : value

      return isWrapped(evaled)
        ? evaled
        : isNothingType(evaled)
          ? new Nothing()
          : new Just(evaled)
    }

    /**
    * Evaluates and attempts to wrap a value into itself
    * @public
    * @param {any} value any type to wrap
    * @returns {Maybe}
    */
    var Maybe = function (value) {
      if (value instanceof Maybe) { return value }

      if (this instanceof Maybe) {
        this[internal] = wrap(value)
      } else {
        return new Maybe(value)
      }
    }

    /**
    * Static method of Maybe creation
    * @public
    * @param {value} value any type to wrap into a maybe
    * @returns {Maybe}
    */
    Maybe.of = function (value) {
      return new Maybe(value)
    }

    /**
    * Provides a method to evaluate the Justness of a Maybe and get its value
    * @public
    * @param {function} callback the optional callback for value extraction
    * @returns {boolean|Maybe}
    */
    Maybe.prototype.isJust = function (callback) {
      const hasCallback = typeof callback === 'function'

      if (isJust(this[internal])) {
        if (hasCallback) {
          callback(this[internal].unwrap())
          return this
        } else {
          return true
        }
      }

      return hasCallback
        ? this
        : false
    }

    /**
    * Provides a method to evaluate the Nothingness of a Maybe
    * @public
    * @param {function} callback the optional callback for error handling
    * @returns {boolean|Maybe}
    */
    Maybe.prototype.isNothing = function (callback) {
      const hasCallback = typeof callback === 'function'

      if (isNothing(this[internal])) {
        if (hasCallback) {
          callback()
          return this
        } else {
          return true
        }
      }

      return hasCallback
        ? this
        : false
    }

    return Maybe
  }())

  return Maybe
})