/* Any JavaScript here will be loaded for all users on every page load. */

/* To replace the defunct "welcome bot" */

window.AutoCreateUserPagesConfig = {
            content: {
             2: '{{sub'+'st:Default Profile}}',
             3: '{{sub'+'st:Welcome Message}}',
             1202: false
},
            summary: 'Script: Creating profile and talk page on first edit'
};

function character(infbox) {
  document.getElementById("character-box").textContent = infbox;
}

function stats(num){
  const bar="█ ";
  const statString=bar.repeat(parseInt(num))+num;
  return statString;
}