/* Footer for fansite notice */
footerBit = document.getElementById("WikiaFooter");
fansiteNotice = document.createElement("div");
fansiteNotice.innerHTML = '<table style="margin: 0 auto; border: 2px solid #B8B296; color: #000; background-color: #F4F3EE; font-size: 75%; overflow: auto; padding: 1em; width: 500px; text-align: center;"><tbody><tr><td>Habbo Wiki is not affiliated with, endorsed, sponsored, or specifically approved by Sulake Corporation Oy or its Affiliates. Habbo Wiki may use the trademarks and other intellectual property of Habbo, which is permitted under Habbo Fan Site Policy.</td></tr></tbody></table>';
if(footerBit != null) {
footerBit.insertBefore(fansiteNotice, footerBit.firstChild);
}