/* Anumang JavaScript dito ay ikakarga para sa lahat ng mga tagagamit ng bawat pahinang ikinarga. */

window.LockForums = {
    expiryDays: 180,
    expiryMessage: "Ang porum na ito ay awtomatikong naka-archive dahil ang pinaka-kamakailang komento ay higit sa <expiryDays> araw na katagal.",
    warningDays: 30,
    warningMessage: "Ang porum na ito ay ngayon <actualDays> araw na ang edad; sa labas ng kagandahang-loob sa iyong mga kapwang Wikians, huwag magkomento maliban kung ito ay ganap na kinakailangan. Ang porum na ito ay awtomatikong i-archive kapag ang huling komento ay <expiryDays> araw na katagal.",
    banners: true,
    ignoreDeletes: true,
    warningPopup: true,
    warningPopupMessage: "Sa pag-popost sa isang lumang forum, maaari mong punuin  ang e-mail ng maraming mga tao na sumusunod pa rin sa paksang ito. Sigurado ka bang gusto mong gawin ito?",
    disableOn: ["12345", "67890"]
};
 
importArticles({
    type: "script",
    articles: [
        "w:c:dev:LockForums/code.js"
    ]
});