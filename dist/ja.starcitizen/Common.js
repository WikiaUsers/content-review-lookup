/* randomReferralCodes Script  */
/* old script
const referralCodes = ["STAR-VMLZ-SKXK","STAR-C9RN-26M7"];
const randomIndex = Math.floor(Math.random()*2);
randomReferralCode.innerHTML = referralCodes[randomIndex];
randomReferralCode1.innerHTML = referralCodes[randomIndex];
*/

const referralCodes = ["STAR-VMLZ-SKXK", "STAR-C9RN-26M7"];
const randomIndex = Math.floor(Math.random() * referralCodes.length);
const randomReferralCode = document.getElementById("randomReferralCode");
const randomReferralCode1 = document.getElementById("randomReferralCode1");

if (randomReferralCode) {
  randomReferralCode.textContent = referralCodes[randomIndex];
}

if (randomReferralCode1) {
  randomReferralCode1.textContent = referralCodes[randomIndex];
}