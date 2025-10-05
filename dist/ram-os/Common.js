alert("✅ Your Common.js is running!");

$(function () {
  var user = mw.user.getName() || "Guest";
  $(".stub-username").text(user);
  $(".insertusername").text(user);
});

console.log("⭐ Username script is running!");