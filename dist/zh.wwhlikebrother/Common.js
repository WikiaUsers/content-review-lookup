// 配置区
var secretConfig = {
  password: "wwhzhenshuai",
  inputId: "secretInput", // 输入框ID
  buttonId: "secretButton", // 按钮ID
  contentId: "secretContent" // 隐藏内容ID
};

// 验证函数
function validateSecret() {
  var input = document.getElementById(secretConfig.inputId);
  var content = document.getElementById(secretConfig.contentId);
  
  if (input.value === secretConfig.password) {
    content.style.display = "block";
    input.parentNode.style.display = "none";
  } else {
    alert("密码错误！");
    input.value = "";
  }
}

// 初始化
document.addEventListener("DOMContentLoaded", function() {
  var input = document.getElementById(secretConfig.inputId);
  var button = document.getElementById(secretConfig.buttonId);
  
  // 按钮点击事件
  button.addEventListener("click", validateSecret);
  
  // 回车键支持
  input.addEventListener("keypress", function(e) {
    if (e.key === "Enter") validateSecret();
  });
});