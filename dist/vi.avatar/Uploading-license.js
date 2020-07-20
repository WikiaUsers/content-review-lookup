function setSpecialUploadTemplate() {
     var editbox = document.getElementById('wpUploadDescription');
     if (!editbox)            return;
     if (editbox.value != '') return;
     editbox.value = "{"+"{Hộp ảnh\n"
                   + "|mô tả     = \n"
                   + "|loạt      = \n"
                   + "|mùa       = \n"
                   + "|tập       = \n"
                   + "|trang gốc = \n"
                   + "|giấy phép = chuẩn\n"
                   + "|nguồn     = DVD\n"
                   + "|phim      = \n"
                   + "}"+"}";
 }
 addOnloadHook(setSpecialUploadTemplate);