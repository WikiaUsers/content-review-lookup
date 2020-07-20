function timeStamp_Storage_js() {
  return "2013.11.12 00:19 (UTC-8)";
}
 
/*
 * Function to store/retrieve one or more values in localStorage. Operates similarly to
 * cookies but avoids the 4k size limit.
 */

function saveStorageValue(strPrefix, strId, strValue) {
   if (typeof(Storage) === "undefined")
      return; // Sorry! No web storage support..

   if (!strId)
      return;

   if (!strPrefix)
      strPrefix = '';

   if (strValue)
      localStorage.setItem(strPrefix + '$=$' + strId, strValue);
   else
      localStorage.removeItem(strPrefix + '$=$' + strId);
}

function retrieveStorageValue(strPrefix, strId) {
   if (typeof(Storage) === "undefined")
      return ''; // Sorry! No web storage support..

   if (!strId)
      return '';

   if (!strPrefix)
      strPrefix = '';

   var retVal = localStorage.getItem(strPrefix + '$=$' + strId);
   return (retVal ? retVal : '');
}