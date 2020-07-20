// <source lang="javascript">
/*
  Save form contents in a cookie, and read them from there again.
 
  Author: [[User:Lupo]], January 2008
  License: Quadruple licensed GFDL, GPL, LGPL and Creative Commons Attribution 3.0 (CC-BY-3.0)
 
  Choose whichever license of these you like best :-)
*/

var FormRestorer =
{
  getCookie : function (cookie_name)
  {
    if (   document.cookie == null || document.cookie.length == 0
        || cookie_name == null || cookie_name.length == 0)
      return "";
    var start = document.cookie.indexOf (cookie_name + '=');
    if (start < 0) return "";
    start = start + cookie_name.length + 1;
    var end = document.cookie.indexOf (';', start);
    if (end < 0)
      return document.cookie.substring (start);
    else
      return document.cookie.substring (start, end);
  },
  
  saveForm : function (cookie_name, form_id, additional_data, cookie_attributes)
  {
    var form = document.getElementById (form_id);
    if (form == null || form.elements == null || form.elements.length == 0) return;
    var cookie_val = null;
    var form_val = form_id;
    if (additional_data) {
      form_val = form_val + '/=' + additional_data;
      cookie_val = "";
    }    
    for (var i = 0; i < form.elements.length; i++) {
      var element = form.elements[i];
      if (element.nodeName.toLowerCase () == 'form') continue; // Don't do nested forms.
      var element_value = null;
      var single_select = false;
      switch (element.type) {
        case 'checkbox':
        case 'radio':
          element_value = (element.checked ? 'T' : 'F');
          break;
        case 'select-one':
          single_select = true;
          // Fall-through
        case 'select-multiple':
          for (var j = 0; j < element.length; j++) {
            if (element[j].selected) {
              if (element_value == null) {
                element_value = "" + j;
                if (single_select) break;
              } else
                element_value = element_value + '/' + j;              
            }
          }
          break;
        case 'text':
        // case 'file': // Is read-only anyway, we cannot set it (security policies)
        case 'password':
        case 'textarea':
          element_value = element.value;
          if (element_value == null) element_value = "";
          break;
        default:
          // We don't do 'hidden' inputs. We also don't do buttons yet. Would we need to?
          break;
      } // end switch
      if (element_value != null) {
        var this_item = element.id;
        if (this_item == null || this_item.length == 0) this_item = element.name;
        this_item = this_item + '/' + element.type + '=' + element_value;
        if (cookie_val == null || cookie_val.length == 0) 
          cookie_val = this_item;
        else
          cookie_val = cookie_val + '\f' + this_item;
      }
    } // end for
    if (cookie_val != null) {
      document.cookie = cookie_name + '=' + escape (form_val + '\f' + cookie_val)
                      + (cookie_attributes != null ? cookie_attributes : "");
    }
  },
  
  readForm : function (cookie_name)
  {
    try {
      var cookie = FormRestorer.getCookie (cookie_name);
      if (cookie.length < 3) return null;
      var pairs = unescape (cookie).split ('\f');
      if (pairs.length < 2) return null;
      var values = new Array (pairs.length);
      // First one is the form id
      for (var i = 0; i < pairs.length; i++) {
        var j = pairs[i].indexOf ('=');
        var k = pairs[i].lastIndexOf ('/', j);
        if (j < 0 || k < 0) {
          values[i] = null; continue;
        }
        var element_name  = pairs[i].substring (0, k);
        var element_type  = pairs[i].substring (k+1, j);
        var val   = pairs[i].substring (j+1);
        var value = null;
        switch (element_type) {
          case 'checkbox':
          case 'radio':
            value = (val == 'T');
            break;
          case 'select-one':
            value = new Number (val);
            break;
          case 'select-multiple':
            {
              var numbers = val.split ('/');
              value = new Array (numbers.length);
              for (var j = 0; j < numbers.length; j++)
                value[j] = new Number (numbers[j]);
            }
            break;
          default:
            value = val;
            break;
        } // end switch
        values[i] = {id : element_name, type : element_type, val : value};
      } // end for
      return values;
    } catch (some_error) {
      return null;
    }
  }
  
} // end FormRestorer