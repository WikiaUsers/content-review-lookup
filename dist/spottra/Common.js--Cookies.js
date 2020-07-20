function timeStamp_Cookies_js() {
  return "2013.08.27 00:44 (UTC-7)";
}

/*
 * Function to store one or more cookies. The c_names argument must either be a
 * string or an array (it won't error out on an array of numbers but it may not
 * save properly). The c_args (values) can be a string, an number or an array.
 * If both arguments are arrays, they must be the same size.
 *
 * Note that c_names is not escaped, meaning it should be properly formed to
 * be a cookie name (no spaces or special characters).
 */
function storeCookies(c_names, c_args) {
   if (typeof c_names === 'string' &&
      (typeof c_args === 'number' || typeof c_args === 'string')) {
      c_names = [ c_names     ];
      c_args  = [ "" + c_args ];
   }
   else if (!Array.isArray(c_names) || !Array.isArray(c_args))
      return;

   if (c_names.length != c_args.length)
      return;

   // Expire in 14 days
   var date = new Date();
   date.setTime(date.getTime() + (14 * 24 * 60 * 60 * 1000));
   var expires = "; expires=" + date.toGMTString() + "; path=/";

   for (var i = 0; i < c_names.length; i ++)
      document.cookie = c_names[i] + "=" + escape(c_args[i]) + expires;
}

/*
 * Function to retrieve one or more cookies. The c_names argument must either be
 * a string or an array (it won't error out on an array of numbers but it may not
 * retrieve properly). It will return a single value if c_names is a single string,
 * or an array of values if c_names is an array.
 */
function retrieveCookies(c_names) {
   if (typeof c_names === 'number')
      return;

   if (typeof c_names === 'string')
      return doRetrieveCookie(c_names);

   if (!Array.isArray(c_names))
      return;

   var c_args = new Array;

   for (var i = 0; i < c_names.length; i ++)
      c_args[i] = doRetrieveCookie(c_names[i]);

   return c_args;
}

/*
 * Function to retrieve individual cookies (used by retrieveCookies above).
 */
function doRetrieveCookie(c_name) {
   var c_string = document.cookie;

   if (c_string.length != 0) {
      var c_value = c_string.match('(^|;)[\s]*' + c_name + '=([^;]*)');
      return unescape(c_value[2]);
   }

   return '';
}

function doRetrieveCookie(c_name) {
   var c_value = document.cookie;
   var c_start = c_value.indexOf(" " + c_name + "=");

   if (c_start == -1)
      c_start = c_value.indexOf(c_name + "=");

   if (c_start == -1)
      c_value = null;
   else {
      c_start = c_value.indexOf("=", c_start) + 1;
      var c_end = c_value.indexOf(";", c_start);

      if (c_end == -1)
         c_end = c_value.length;

      c_value = unescape(c_value.substring(c_start, c_end));
   }

   return c_value;
}

/* Cookie test */

function createCookieTest() {
   var cCheck = document.getElementById("cookie-check");
   if (!cCheck) return;

   var input1     = document.createElement("input");
   input1.id      = "cookie_test_input";
   input1.size    = 10;
   input1.value   = retrieveCookies("test_cookie");

   var input2     = document.createElement("input");
   input2.id      = "cookie_test_button";
   input2.type    = "button";
   input2.value   = "Save";
   input2.onclick = function() {
      var tempInput = document.getElementById("cookie_test_input");
      storeCookies("test_cookie", tempInput.value);
   };

   cCheck.appendChild(input1);
   cCheck.appendChild(input2);
}

addOnloadHook(createCookieTest);