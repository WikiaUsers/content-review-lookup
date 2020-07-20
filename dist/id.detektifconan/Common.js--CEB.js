/* Any JavaScript here will be loaded for all users on every page load. */

// <source lang="JavaScript">
 
// CUSTOM EDIT BUTTONS
// This is based on the original code on Wikipedia:Tools/Editing tools
// To disable this script, add <code>mwCustomEditButtons = [];<code> to [[Special:Mypage/monobook.js]]
 
 if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/c/c8/Button_redirect.png",
     "speedTip": "Pengalihan",
     "tagOpen": "#REDIRECT [[",
     "tagClose": "]]",
     "sampleText": "Masukkan teks"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/c/c9/Button_strike.png",
     "speedTip": "Melalui serang",
     "tagOpen": "<s>",
     "tagClose": "</s>",
     "sampleText": "Teks melalui serang"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/f/fd/Button_underline.png",
     "speedTip": "Bawah garis",
     "tagOpen": "<u>",
     "tagClose": "</u>",
     "sampleText": "Teks di bawah garis"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/2/23/Button_code.png",
     "speedTip": "Kode",
     "tagOpen": "<code>",
     "tagClose": "</code>",
     "sampleText": "Teks kode"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/5/58/Button_small.png",
     "speedTip": "Kecil",
     "tagOpen": "<small>",
     "tagClose": "</small>",
     "sampleText": "Teks kecil"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/5/5f/Button_center.png",
     "speedTip": "Tengah",
     "tagOpen": "<center>",
     "tagClose": "</center>",
     "sampleText": "Teks tengah"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/7/72/Button_span_2.png",
     "speedTip": "Rentang",
     "tagOpen": "<span>",
     "tagClose": "</span>",
     "sampleText": "Teks rentang"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/d/d4/Button_div.png",
     "speedTip": "Div",
     "tagOpen": "<div>",
     "tagClose": "</div>",
     "sampleText": "Teks div"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/3/34/Button_hide_comment.png",
     "speedTip": "Masukkan komentar tersembunyi",
     "tagOpen": "<!-- ",
     "tagClose": " -->",
     "sampleText": "Komentar"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/1/13/Button_enter.png",
     "speedTip": "Baris istirahat",
     "tagOpen": "<br />",
     "tagClose": "",
     "sampleText": ""};

mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/e/e1/O_Accent_Button.png",
     "speedTip": "Tambahkan karakter ō",
     "tagOpen": "ō",
     "tagClose": "",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/d/db/U_Accent_Button.png",
     "speedTip": "Tambahkan karakterū",
     "tagOpen": "ū",
     "tagClose": "",
     "sampleText": ""};

    mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/8/8c/Button_RedX.png?1",
     "speedTip": "Diskusi permintaan tertutup",
     "tagOpen": "\{\{Discussion Closed|result=",
     "tagClose": "\}\}",
     "sampleText": "alasanmu di sini"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/6/60/Button_insert_table.png",
     "speedTip": "Masukkan tabel",
     "tagOpen": '{| class="wikitable"\n|-\n',
     "tagClose": "\n|}",
     "sampleText": "! header 1\n! header 2\n! header 3\n|-\n| row 1, cell 1\n| row 1, cell 2\n| row 1, cell 3\n|-\n| row 2, cell 1\n| row 2, cell 2\n| row 2, cell 3"};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/d/dc/Image_Button.png",
		"speedTip": "Masukkan alasan penggunaan wajar",
		"tagOpen": "\{\{fair use rationale\r| description = ",
		"tagClose": "\r| Source        = \r| Portion      = \r| Purpose      = \r| Resolution     = \r| Replaceability      = \r\}\}",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/1/1d/Copyrights_needed_Button.png",
		"speedTip": "Tag gambar belum dikreditkan",
		"tagOpen": "\{\{fair use|",
		"tagClose": "}}",
		"sampleText": "Kedua"};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/4/4d/Support_Button.png",
		"speedTip": "Pendukung",
		"tagOpen": "{{Support}} ",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/9/9f/Oppose_Button.png",
		"speedTip": "Menentang",
		"tagOpen": "{{Oppose}} ",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/7/7e/Neutral_Button.png",
		"speedTip": "Netral",
		"tagOpen": "{{Neutral}} ",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/a/a5/Keep_Button.png",
		"speedTip": "Pilih untuk tetap",
		"tagOpen": "{{Vote keep}} ",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/3/3c/Delete_Button.png",
		"speedTip": "Pilih untuk hapus",
		"tagOpen": "{{Vote delete}} ",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/4/4d/Merge_Button.png",
		"speedTip": "Pilih untuk menggabungkan",
		"tagOpen": "{{Vote merge}} ",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/b/b3/Done_Button.png",
		"speedTip": "Selesai",
		"tagOpen": "{{Done}} ",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/f/fd/Not_Done_Button.png",
		"speedTip": "Tidak selesai",
		"tagOpen": "{{Not done}} ",
		"tagClose": "",
		"sampleText": ""};
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/2/23/Button_code.png",
     "speedTip": "Kode",
     "tagOpen": "<code>",
     "tagClose": "</code>",
     "sampleText": "Teks kode"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/5/58/Button_small.png",
     "speedTip": "Small",
     "tagOpen": "<small>",
     "tagClose": "</small>",
     "sampleText": "Teks kecil"};

mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "http://upload.wikimedia.org/wikipedia/en/8/80/Button_upper_letter.png",
	"speedTip": "Superscript",
	"tagOpen": "<sup>",
	"tagClose": "</sup>",
	"sampleText": "Teks superskrip"};

mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "http://upload.wikimedia.org/wikipedia/en/7/70/Button_lower_letter.png",
	"speedTip": "Subscript",
	"tagOpen": "<sub>",
	"tagClose": "</sub>",
	"sampleText": "Teks subskrip"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/5/5f/Button_center.png",
     "speedTip": "Tengah",
     "tagOpen": "<center>",
     "tagClose": "</center>",
     "sampleText": "Teks tengah"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/7/72/Button_span_2.png",
     "speedTip": "Rentang",
     "tagOpen": "<span>",
     "tagClose": "</span>",
     "sampleText": "Teks rentang"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/d/d4/Button_div.png",
     "speedTip": "Div",
     "tagOpen": "<div>",
     "tagClose": "</div>",
     "sampleText": "Teks div"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/3/34/Button_hide_comment.png",
     "speedTip": "Masukkan komentar tersembunyi",
     "tagOpen": "<!-- ",
     "tagClose": " -->",
     "sampleText": "Komentar"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/1/13/Button_enter.png",
     "speedTip": "Baris istirahat",
     "tagOpen": "<br />",
     "tagClose": "",
     "sampleText": ""};

mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "http://upload.wikimedia.org/wikipedia/en/f/fd/Button_blockquote.png",
	"speedTip": "Masukkan teks blokir kutipan",
	"tagOpen": "<blockquote>\n",
	"tagClose": "\n</blockquote>",
	"sampleText": "Blockir kutipan"};

}
 
// </source>