/* randomReferralCodes Script  */
/* old script
const referralCodes = ["STAR-VMLZ-SKXK", "STAR-C9RN-26M7"];
const randomIndex = Math.floor(Math.random() * referralCodes.length);
const randomReferralCode = document.getElementById("randomReferralCode");

if (randomReferralCode) {
  randomReferralCode.textContent = referralCodes[randomIndex];
}

*/
var referralCodes = ["STAR-VMLZ-SKXK", "STAR-C9RN-26M7"];
var randomIndex = Math.floor(Math.random() * referralCodes.length);
var randomReferralCode = document.getElementById("randomReferralCode");

if (randomReferralCode) {
  randomReferralCode.textContent = referralCodes[randomIndex];
}