/**
 * Description
 * код добавляет в шапку data-* атрибут
 * для дальнейшего захвата через css
 * что бы персонализировать стиль
 * для администрации в персональных
 * улучшениях и нужд
 */
 
// ----------- babel -----------
("use strict"); 

var _wgUserName;

var username =
  (_wgUserName = wgUserName) !== null && _wgUserName !== void 0
    ? _wgUserName
    : undefined;
var ID = document.querySelector("html");
var adminName = "Vintageidol";
var whoIam = String(username).includes(adminName);

var getName = function getName() {
  if (typeof username !== "string") return "";
  return username;
};

var extraData = function extraData() {
  return ID.setAttribute("data-theme-personal", true);
};

var setAttr = function setAttr() {
  ID.setAttribute("data-theme-user", getName());
  return whoIam ? extraData() : "";
};

ID ? setAttr() : false;

// ----------- origin -----------
// const username = wgUserName ?? undefined;
// const ID = document.querySelector("html");
// const adminName = "Vintageidol";
// const whoIam = String(username).includes(adminName);

// const getName = () => {
//   if (typeof username !== "string") return "";
//   return username;
// };

// const extraData = () => {
//   return ID.setAttribute("data-theme-personal", true);
// };

// const setAttr = () => {
//   ID.setAttribute("data-theme-user", getName());
//   return whoIam ? extraData() : "";
// };
// ID ? setAttr() : false;