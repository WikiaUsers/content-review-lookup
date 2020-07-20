/* Underscore extend */
_.nestedFind = function(obj,path) {
  return path.split('.').reduce(function(a,b) {
    return a[b];
  },obj);
};