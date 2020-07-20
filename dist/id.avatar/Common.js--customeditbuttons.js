/* Any JavaScript here will be loaded for all users on every page load. */
/* Custom edit buttons for source mode
 * by: [[User:Thailog|Thailog]]
 */
 
if ((wgAction == 'submit' || wgAction == 'edit') && mwCustomEditButtons) {
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/marvel_dc/images/2/29/Character_Button.png",
		"speedTip": "Masukkan templat kotak info karakter",
		"tagOpen": "\{\{Infobox karakter\r| bangsa         = ",
		"tagClose": "\r| gambar = \r| nama = \r| kebangsaan = \r| usia = \r| kelamin = \r| rambut = \r| warna kulit = \r| jenis kulit = \r| sekutu = \r| musuh = \r| senjata = \r| gaya bertarung = \r| profesi = \r| posisi = \r| afiliasi = \r| penampilan = \r| penampilan terakhir = \r| suara = \r| lain-lain = \r\}\}",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/0/0c/LoK_Button.png",
		"speedTip": "Masukkan bagian penampilan untuk karakter Legend of Korra",
		"tagOpen": "=== ''The Legend of Korra'' ===\r==== Buku Satu: Udara (气) ====\r{{Muncul|2|",
		"tagClose": "}}",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/__cb20120415191112/avatar/images/2/25/Cite_ep_Button.png",
		"speedTip": "Tag referensi episode/isu",
		"tagOpen": "<ref name=>{{Mengutip episode|2|1",
		"tagClose": "}}</ref>",
		"sampleText": "number"};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/d/dc/Image_Button.png",
		"speedTip": "Masukkan templat imagebox",
		"tagOpen": "\{\{Imagebox\r| ringkasan = ",
		"tagClose": "\r| film = \r| seri = \r| musim = \r| episode = \r| sumber = \r| asal = \r| kategori = \r| lisensi = \r\}\}",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/1/1d/Copyrights_needed_Button.png",
		"speedTip": "Tag gambar tidak dikreditkan",
		"tagOpen": "\{\{subst:Unknown/ukn|",
		"tagClose": "}}",
		"sampleText": "both"};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/4/4d/Support_Button.png",
		"speedTip": "Dukund",
		"tagOpen": "{{Dukung}} ",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/9/9f/Oppose_Button.png",
		"speedTip": "Menentang",
		"tagOpen": "{{Menentang}} ",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/7/7e/Neutral_Button.png",
		"speedTip": "Netral",
		"tagOpen": "{{Netral}} ",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/a/a5/Keep_Button.png",
		"speedTip": "Pilih untuk tetap",
		"tagOpen": "{{Pilih tetap}} ",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/3/3c/Delete_Button.png",
		"speedTip": "Pilih untuk hapus",
		"tagOpen": "{{Pilih hapus}} ",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/4/4d/Merge_Button.png",
		"speedTip": "Pilih untuk gabung",
		"tagOpen": "{{Pilih gabung}} ",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/b/b3/Done_Button.png",
		"speedTip": "Selesai",
		"tagOpen": "{{Selesai}} ",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/f/fd/Not_Done_Button.png",
		"speedTip": "Belum selesai",
		"tagOpen": "{{Belum selesai}} ",
		"tagClose": "",
		"sampleText": ""};
}