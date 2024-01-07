window.statWheelStrings =  {
        'damage-tooltip': 'ดาเมจ - ความสามารถของแชมเปี้ยนในการสร้างความเสียหาย',
        'toughness-tooltip': 'ความถึกทน - ความสามารถของแชมป์เปี้ยนในการเอาตัวรอด',
        'control-tooltip': 'การควบคุม - ความสามารถของแชมป์เปี้ยนในการปิดการใช้งานหรือขัดขวางศัตรู',
        'mobility-tooltip': 'ความคล่องตัว - ความสามารถของแชมเปี้ยนในการเคลื่อนที่อย่างรวดเร็วไปรอบ ๆ แผนที่, การบลิค หรือการพุ่ง',
        'utility-tooltip': 'การใช้งาน - ความสามารถของแชมเปี้ยนในการให้ผลประโยชน์แก่พันธมิตรหรือมอบวิสัยทัศน์',
        'center-tooltip': 'โปรดทราบว่าตัวไคลเอนต์ของเกมให้คะแนนแชมป์เปี้ยนในระดับ 1-3 โดยแชมป์เปี้ยนที่มีทั้งไม่มีและต่ำในด้านความแข็งแกร่งเฉพาะจะถูกทำเครื่องหมายอย่างเท่าเทียมกัน ในทางตรงกันข้าม Fandom นี้ใช้ระดับ 0-3 สำหรับความถึกทน การควบคุม ความคล่องตัว และการใช้งาน ของแชมป์เปี้ยนที่ได้คะแนนเป็น 0 จะถือเป็น 1 โดยทันที',
        'compact-tooltip': 'ดาเมจ: %damage% / 3\nความถึกทน: %toughness% / 3\nการควบคุม: %control% / 3\nความคล่องตัว: %mobility% / 3\nการใช้งาน: %utility% / 3\n',
    }; // Localized strings for the StatWheel

importArticles({
    type: "script",
    articles: [
      "u:pl.lol:MediaWiki:StatWheel.js",     // StatWheel code import from polish LoL wiki
      "MediaWiki:Common.js/ChampionInfo.js", // Needs to be imported after StatWheel.js
    ]
});