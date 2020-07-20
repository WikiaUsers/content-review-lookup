function setSpecialUploadTemplate() {
     var editbox = document.getElementById('wpUploadDescription');
     if (!editbox)            return;
     if (editbox.value != '') return;
     editbox.value = "{"+"{Hộp ảnh\n"
                   + "|mô tả     = \n"
                   + "|mùa       = \n"
                   + "|tập       = \n"
                   + "|cats      = \n"
                   + "|giấy phép = chuẩn\n"
                   + "|nguồn     = DVD\n"
                   + "|trang gốc = \n"
                   + "}"+"}";
 }
 addOnloadHook(setSpecialUploadTemplate);