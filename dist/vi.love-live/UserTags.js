// Thêm các tag khác cho thành viên 

// Không (còn) hoạt động
    UserTagsJS.modules.inactive = {
    	days: 30,
    	namespaces: [0],
    	zeroIsInactive: true 
    };

// Thành viên mới 
    UserTagsJS.modules.newuser = {
    	days: 15, // Số ngày tham gia
    	edits: 50, // Số chỉnh sửa để được xóa tag
    	namespace: 0, // Số chỉnh sửa cần phải tạo để được đếm
    };
    
// Tự tạo
    window.UserTagsJS = {
        modules: {},
        tag: {
            inactive: 'Ngưng hoạt động',
            newuser: 'Thành viên mới',
            Member: 'LoveLiver!', // >50 chỉnh sửa
            SpecialEditor: 'Special WLoveLiver', // >300 chỉnh sửa
            LegendMem: 'Legend WLoveLiver', // >700 chỉnh sửa
            TechAd: 'Technology Admin', 
            DesAd: 'Design Admin',
        },
    };
    
// Thêm vào các thnhf viên

    UserTagsJS.modules.custom = {
       'Toyosaki':['LegendMem'],
       'Hikaruun':['LegendMem'],
       'HanamaruForever':['LegendMem'],
       'Onozuka Kiyume':['LegendMem', 'DesAd'],
       'Hoangominh01':['SpecialEditor', 'TechAd', 'DesAd'],
       'TaniharaChizuru':['Member'],
       'Night Kotori':['Member'],
       
    };