var EPSILLON = 0.000001;
var textMap = getLocalizedTextMap(mw.config.get('wgContentLanguage'));
var allDataReader = new AllDataReader('Patient_Data');

if ($("#hospitalCalculatorSection").length || $("#simpleCalculatorSection").length) {
    allDataReader.readAllData();
    var challengeData = allDataReader.challengeData;
    var roomData = allDataReader.roomData;
    
    if ($("#hospitalCalculatorSection").length) {
        $("#hospitalCalculatorSection").html(getHospitalCalcFormText(challengeData.length, roomData));
    }
    if ($("#simpleCalculatorSection").length) {
        $("#simpleCalculatorSection").html(getSimpleCalcFormText());
    }
}

///////////////////////////////////////////////////////////////////////////////////////
// Display Functions
///////////////////////////////////////////////////////////////////////////////////////

function getSimpleCalcFormText() {
    return '<form name="simpleCalcForm">' +
      '<p>' + textMap.hospitalLevel + ': <input type="number" min="0" name="level" /> ' +
      '<button type="button" onclick="simpleCalcAction();">' + textMap.calculate + '</button>' +
      '<input type="hidden" name="columnsAdded" value="0" /></p>' +
      '</form>';
}

function getHospitalCalcFormText(heliLength, roomData) {
    var heliOptionText = '';
    var roomRowsText = '';
    for (var i = 1; i <= heliLength; i++) { 
        heliOptionText += '<option value="' + i + '">' 
            + textMap.calcMethod.heli + ' ' + i + '</option>';
    }
    for (i = 0; i < roomData.length; i++) {
        roomRowsText += '<tr><td>' + roomData[i].name + '</td>' +
            '<td><input type="number" min="0" max="' + (roomData[i].roomAttrIncrease.length - 1) + '" name="level_' + roomData[i].room + '" /></td>' +
            '<td><input type="number" min="0" name="staff_' + roomData[i].room + '" /></td>' +
            '</tr>';
    }
    return '<form name="hospitalCalculator">' +
          '<ul>' +
            '<li>' + textMap.hospitalLevel + ':' +
              '<input type="number" min="0" name="level" />' +
            '</li>' +
            '<li>' + textMap.useMaxAbility + '?' +
              '<select name="useMaxAbility">' +
                '<option value="yes">' + textMap.yes + '</option>' +
                '<option value="no" selected="selected">' + textMap.no + '</option>' +
              '</select>' +
            '</li>' +
            '<li>' + textMap.calcMethod.text + ':' +
              '<select name="calcMethod">' +
                '<option value="normal">' + textMap.calcMethod.normal + '</option>' +
                '<option value="tournament">' + textMap.calcMethod.tournament + '</option>' +
                heliOptionText +
              '</select>' +
            '</li>' +
          '</ul>' +
          '<table id="hospitalCalcUserInput"><tbody>' +
            '<tr>' +
              '<th>' + textMap.room + '</th>' +
              '<th>' + textMap.roomLevel + '</th>' +
              '<th>' + textMap.staffAbility + '</th>' +
            '</tr>' +
            roomRowsText +
          '</tbody></table>' +
          '<p><button type="button" onclick="hospitalCalcAction();">' + textMap.calculate + '</button></p>' +
        '</form>' +
        '<form name="formTextForm">' +
          '<p>' + textMap.formTextDescription + '</p>' +
          '<textarea id="hospitalCalculatorFormText" name="formText" />' +
          '<p><button type="button" onclick="saveFormAction();">' + textMap.saveForm + '</button>' +
          '<button type="button" onclick="loadFormAction();">' + textMap.loadForm + '</button></p>' +
        '</form>' +
        '<p id="hospitalCalcResult" />';
}

function simpleCalcAction() {
    var patientDataMap = allDataReader.patientDataMap;
    var challengeData = allDataReader.challengeData;
    
    var hospitalLevel = Number(document.forms.simpleCalcForm.level.value);
    hospitalLevel = hospitalLevel === '' ? 0 : hospitalLevel;
    var columnsAdded = Number(document.forms.simpleCalcForm.columnsAdded.value);
    
    var tableData = $('#patientTable tr');
    for (var i = 0; i < tableData.length; i++) {
        var rowData = tableData[i];
        var cells = $(rowData).children();
        if (cells[0].tagName.toLowerCase() === "th") {
            if (!columnsAdded) {
                $(rowData).append('<th>' + textMap.curePoint.tournament + '</th><th>' + textMap.curePoint.heli + '</th>');
            }
        } else {
            var patientName = $(cells[0]).text().trim();
            var patient = patientDataMap[patientName];
            
            var tournamentCurePoint = getTournamentCurePoint(patient, hospitalLevel);
            
            var challengeCurePointTexts = [];
            for (var j = 0; j < challengeData.length; j++) {
                var challenge = challengeData[j];
                var challengeCurePoint = getChallengeCurePoint(patient, hospitalLevel, challenge);
                if (!isNaN(challengeCurePoint)) {
                    challengeCurePointTexts.push(getChallengeStageText(challenge.stage) + ': ' + challengeCurePoint);
                }
            }
            if (columnsAdded) {
                $(cells).last().prev().text(tournamentCurePoint);
                $(cells).last().html(challengeCurePointTexts.join('<br />'));
            } else {
                $(rowData).append('<td>' + tournamentCurePoint + '</td><td>' + challengeCurePointTexts.join('<br />') + '</td>');
            }
        }
    }
    document.forms.simpleCalcForm.columnsAdded.value = 1;
}

function hospitalCalcAction() {
    var patientData = allDataReader.patientData;
    var challengeDataMap = allDataReader.challengeDataMap;
    var roomDataMap = allDataReader.roomDataMap;
    var formInput = getFormInput();
    
    var hospitalCalcResultText = '<table id="hospitalCalcResultTable"><tbody>' +
      '<tr><th>' + textMap.patient + '</th>' +
      '<th>' + textMap.curePoint.text + '</th>' +
      '<th>' + textMap.roomPath + '</th>' +
      '<th>' + textMap.actualCureProgress + '</th>' +
      '<th>' + textMap.cureChance + '</th>' +
      '<th>' + textMap.moneyGained + '</th>' +
      '<th>' + textMap.expGained + '</th></tr>';

      for (i = 0; i < patientData.length; i++) {
        var patient = patientData[i];
        if (isNaN(Number(formInput.calcMethod)) || challengeDataMap[Number(formInput.calcMethod)].patientList.includes(patient.name)) {
            var actualRoomPath = getActualRoomPath(patient, formInput.calcMethod, formInput.useMaxAbility === 'yes', 
                formInput.hospitalLevel, roomDataMap, formInput.roomUserDataMap);
            var curePct = Math.round(actualRoomPath.actualCurePoint / actualRoomPath.expectedCurePoint * 10000) / 100;
            hospitalCalcResultText += '<tr><td class="text">' + patient.name + '</td>'
                + '<td class="number">' + actualRoomPath.expectedCurePoint + '</td>'
                + '<td class="text">' + actualRoomPath.actualRoomPath.toString() + '</td>'
                + '<td class="number">' + actualRoomPath.actualCurePoint + '</td>'
                + '<td class="number shade' + Math.floor(curePct / 5 + EPSILLON) + '">' + curePct + '%</td>'
                + '<td class="number">' + actualRoomPath.moneyGained + '</td>'
                + '<td class="number">' + actualRoomPath.expGained + '</td></tr>';
        }
    }
    hospitalCalcResultText += '</tbody></table>';
    
    $("#hospitalCalcResult").html(hospitalCalcResultText);
    return false;
}

function getFormInput() {
    var roomData = allDataReader.roomData;
    var challengeData = allDataReader.challengeData;
    
    var hospitalLevel = Number(document.forms.hospitalCalculator.level.value);
    hospitalLevel = hospitalLevel === '' ? 0 : hospitalLevel;
    var useMaxAbility = document.forms.hospitalCalculator.useMaxAbility.value;
    if (useMaxAbility !== 'yes' && useMaxAbility !== 'no') {
        useMaxAbility = 'no';
        document.forms.hospitalCalculator.useMaxAbility.value = 'no';
    }
    var calcMethod = document.forms.hospitalCalculator.calcMethod.value;
    if (calcMethod !== 'normal' && calcMethod !== 'tournament' && 
        (calcMethod === '' || isNaN(Number(calcMethod)) || Number(calcMethod) < 0 || Number(calcMethod) >= challengeData.length)) {
        calcMethod = 'normal';
        document.forms.hospitalCalculator.calcMethod.value = 'normal';
    }
    
    var roomUserDataMap = {};
    for (var i = 0; i < roomData.length; i++) {
        var level = Number(document.forms.hospitalCalculator["level_" + roomData[i].room].value);
        var staff = Number(document.forms.hospitalCalculator["staff_" + roomData[i].room].value);
        roomUserDataMap[roomData[i].room] = new RoomUserInput(
            roomData[i].room, level === '' ? 0 : level, staff === '' ? 0 : staff);
    }
    return new FormInput(hospitalLevel, useMaxAbility, calcMethod, roomUserDataMap);
}

function saveFormAction() {
    var formInput = getFormInput();
    document.forms.formTextForm.formText.value = JSON.stringify(formInput);
}

function loadFormAction() {
    try {
        var formInput = JSON.parse(document.forms.formTextForm.formText.value);
        document.forms.hospitalCalculator.level.value = formInput.hospitalLevel;
        document.forms.hospitalCalculator.useMaxAbility.value = formInput.useMaxAbility;
        document.forms.hospitalCalculator.calcMethod.value = formInput.calcMethod;
        
        var roomData = allDataReader.roomData;
        for (var i = 0; i < roomData.length; i++) {
            document.forms.hospitalCalculator["level_" + roomData[i].room].value = formInput.roomUserDataMap[roomData[i].room].level;
            document.forms.hospitalCalculator["staff_" + roomData[i].room].value = formInput.roomUserDataMap[roomData[i].room].staffAbility;
        }
        
        alert(textMap.loadFormSuccess);
    } catch(err) {
        alert(textMap.loadFormError);
    }
}

///////////////////////////////////////////////////////////////////////////////////////
// Calc Functions
///////////////////////////////////////////////////////////////////////////////////////

function getActualRoomPath(patient, calcMethod, useMaxAbility, hospitalLevel, roomDataMap, roomUserDataMap) {
    var expectedCurePoint = getExpectedCurePoint(patient, calcMethod, hospitalLevel);
    var expectedRoomPath = patient.roomList;
    var moneyCoeff = patient.moneyCoeff;
    var actualRoomUserDataMap = getActualRoomUserDataMap(roomUserDataMap, useMaxAbility);
    var currentCurePoint = 0;
    var receptionLevel = actualRoomUserDataMap[textMap.receptionRoom].level;
    var currentMoney = Math.ceil(roomDataMap[textMap.receptionRoom].basicMoney * patient.moneyCoeff - EPSILLON)
        + roomDataMap[textMap.receptionRoom].roomAttrIncrease.money[receptionLevel];
    var currentExp = roomDataMap[textMap.receptionRoom].basicExp 
        + roomDataMap[textMap.receptionRoom].roomAttrIncrease.exp[receptionLevel];
    var currentRoomPath = [];
    
    for (var i = 0; i < expectedRoomPath.length; 
        currentCurePoint < expectedCurePoint || i >= expectedRoomPath.length - 1 ? i++ : i = expectedRoomPath.length - 1) {
        var roomLevel = actualRoomUserDataMap[expectedRoomPath[i]].level;
        currentCurePoint = Math.min(expectedCurePoint, currentCurePoint
            + roomDataMap[expectedRoomPath[i]].roomAttrIncrease.ability[roomLevel]
            + actualRoomUserDataMap[expectedRoomPath[i]].staffAbility);
        currentMoney += Math.ceil(roomDataMap[expectedRoomPath[i]].basicMoney * patient.moneyCoeff - EPSILLON)
            + roomDataMap[expectedRoomPath[i]].roomAttrIncrease.money[roomLevel];
        currentExp += roomDataMap[expectedRoomPath[i]].basicExp
            + roomDataMap[expectedRoomPath[i]].roomAttrIncrease.exp[roomLevel];
        currentRoomPath.push(expectedRoomPath[i]);
    }
    return new ActualRoomPath(expectedCurePoint, currentCurePoint, currentMoney, currentExp, currentRoomPath);
}

function getExpectedCurePoint(patient, calcMethod, hospitalLevel) {
    if (calcMethod === 'normal') {
        return patient.curePoint;
    } else if (calcMethod === 'tournament') {
        return getTournamentCurePoint(patient, hospitalLevel); 
    } else if (!isNaN(Number(calcMethod))) {
        var challengeDataMap = allDataReader.challengeDataMap;
        return getChallengeCurePoint(patient, hospitalLevel, challengeDataMap[Number(calcMethod)]);
    }
    return patient.curePoint;
}

function getTournamentCurePoint(patient, hospitalLevel) {
    var tournamentCoeff = 1 + Math.max(Math.floor((hospitalLevel - patient.minLevel + 5) / 10 + EPSILLON), 0) * 0.1;
    if (hospitalLevel - patient.minLevel >= 10 && hospitalLevel - patient.minLevel < 20) {
        tournamentCoeff -= 0.1;
    }
    if (hospitalLevel - patient.minLevel >= 75) {
        tournamentCoeff += 0.1;
    }
    return Math.ceil(patient.curePoint * patient.curePointCoeff * tournamentCoeff - EPSILLON);
}

function getChallengeCurePoint(patient, hospitalLevel, challenge) {
    if (challenge.patientList.includes(patient.name)) {
        var challengeCoeff = 1 + Math.min(Math.max(Math.floor((hospitalLevel - challenge.minLevel) / 5 + EPSILLON), 0), 5) * 0.1
            + Math.floor(Math.max(hospitalLevel - challenge.minLevel - 25, 0) / 10  + EPSILLON) * 0.1;
        return Math.ceil(patient.curePoint * patient.curePointCoeff * challengeCoeff - EPSILLON);
    } else {
        return NaN;
    }
}

function getActualRoomUserDataMap(roomUserDataMap, useMaxAbility) {
    if (useMaxAbility) {
        var roomDataMap = allDataReader.roomDataMap;
        var maxAbility = {};
        var modifiedRoomUserDataMap = {};
        for (var room in roomUserDataMap) {
            var staffType = roomDataMap[room].staffType;
            var staffAbility = roomUserDataMap[room].staffAbility;
            if (maxAbility[staffType] === undefined) {
                maxAbility[staffType] = staffAbility;
            } else if (maxAbility[staffType] < staffAbility) {
                maxAbility[staffType] = staffAbility;
            }
        }
        for (room in roomUserDataMap) {
            modifiedRoomUserDataMap[room] = new RoomUserInput(room, roomUserDataMap[room].level, 
                maxAbility[roomDataMap[room].staffType]);
        }
        return modifiedRoomUserDataMap;
    } else {
        return roomUserDataMap;
    }
}

///////////////////////////////////////////////////////////////////////////////////////
// i18n
///////////////////////////////////////////////////////////////////////////////////////

function getLocalizedTextMap(language) {
    var textMap;
    switch (language) {
        case 'zh':
        case 'zh-hk':
            textMap = {
                yes: '是',
                no: '否',
                hospitalLevel: '醫院等級',
                useMaxAbility: '使用最強陣容',
                calcMethod: {text: '計算方式', 
                    normal: '一般', tournament: '錦標賽', heli: '直升機'},
                room: '房間',
                roomLevel: '等級',
                staffAbility: '職員醫值',
                calculate: '計算',
                receptionRoom: '接',
                patient: '病人',
                curePoint: {text: '醫值',
                    tournament: '錦標賽醫值', heli: '直升機醫值'},
                roomPath: '經過病房',
                actualCureProgress: '最終醫值進度',
                cureChance: '醫好機會',
                moneyGained: '所得金錢',
                expGained: '所得經驗',
                saveForm: '取得表格輸入',
                loadForm: '載入表格',
                formTextDescription: '取得表格輸入，方便下次在表格中貼上輸入，載入表格',
                loadFormError: '載入有誤，請手動輸入',
                loadFormSuccess: '載入成功',
                challengeStage: '第{}關'
            };
            break;
        default:
            textMap = {
                yes: 'Yes',
                no: 'No',
                hospitalLevel: 'Hospital Level',
                useMaxAbility: 'Use Max Ability',
                calcMethod: {text: 'Calculation Method', 
                    normal: 'Normal', tournament: 'Tournament', heli: 'Challenge'},
                room: 'Room',
                roomLevel: 'Level',
                staffAbility: 'Staff Ability',
                calculate: 'Calculate',
                receptionRoom: 'Re',
                patient: 'Patient',
                curePoint: {text: 'Cure Point',
                    tournament: 'Cure Point for Tournament', heli: 'Cure Point for Challenge'},
                roomPath: 'Room Path',
                actualCureProgress: 'Cure Progress',
                cureChance: 'Cure Chance',
                moneyGained: 'Money Gained',
                expGained: 'Exp Gained',
                saveForm: 'Obtain Form Data',
                loadForm: 'Load Form Data',
                formTextDescription: 'Obtain form data in text format. Next time, paste the text to get back the form input.',
                loadFormError: 'Load error. Please input manually.',
                loadFormSuccess: 'Load succeeded.',
                challengeStage: 'Stage {}'
            };
    }
    return textMap;
}

function getChallengeStageText(stage) {
    return textMap.challengeStage.replace('{}', stage);
}

///////////////////////////////////////////////////////////////////////////////////////
// Data Readers
///////////////////////////////////////////////////////////////////////////////////////

function AllDataReader(pageName) {
    this.readAllData = function() {
        var patientData = [];
        var challengeData = [];
        var roomData = [];
        var patientDataMap = {};
        var challengeDataMap = {};
        var roomDataMap = {};
        
        $.ajax({
            url: mw.util.getUrl(pageName),
            success: function(data) {
                var abilityData = readRoomAttrIncreaseData("#roomAbilityData", data);
                var moneyData = readRoomAttrIncreaseData("#roomMoneyData", data);
                var expData = readRoomAttrIncreaseData("#roomExpData", data);
                var context = {abilityData: abilityData, moneyData: moneyData, expData: expData};
                
                patientData = readTableResultData('#patientData', patientDataMapper, data);
                challengeData = readTableResultData('#challengeData', challengeDataMapper, data);
                roomData = readTableResultData('#roomData', roomDataMapper, data, context);
            },
            async: false
        });
        this.patientData = patientData;
        this.challengeData = challengeData;
        this.roomData = roomData;
        
        for (var i = 0; i < patientData.length; i++) {
            patientDataMap[patientData[i].name] = patientData[i];
        }
        this.patientDataMap = patientDataMap;
        
        for (i = 0; i < challengeData.length; i++) {
            challengeDataMap[challengeData[i].stage] = challengeData[i];
        }
        this.challengeDataMap = challengeDataMap;

        for (i = 0; i < roomData.length; i++) {
            roomDataMap[roomData[i].room] = roomData[i];
        }
        this.roomDataMap = roomDataMap;
    };
}

function readTableResultData(accessorTag, resultMapper, data, context) {
    var resultData = [];
    var tableData = $(data).find(accessorTag + ' tr');
    for (var i = 0; i < tableData.length; i++) {
        var rowData = tableData[i];
        var cells = $(rowData).children();
        if (cells[0].tagName.toLowerCase() === "td") {
            var oneResult = resultMapper(cells, context);
            resultData.push(oneResult);
        }
    }
    return resultData;
}

function patientDataMapper(cells) {
    var roomPathCells = cells.slice(6, cells.length);
    var roomPath = [];
    for(var j = 0; j < roomPathCells.length; j++) {
        var roomText = $(roomPathCells[j]).text().trim();
        if (roomText !== '') {
            roomPath.push(roomText);
        }
    }
    var patient = new Patient(
        $(cells[0]).text().trim(),
        Number($(cells[1]).text().trim()),
        Number($(cells[2]).text().trim()),
        Number($(cells[3]).text().trim()),
        Number($(cells[4]).text().trim()),
        Number($(cells[5]).text().trim()),
        roomPath
    );
    return patient;
}

function challengeDataMapper(cells) {
    var patientCells = cells.slice(2, cells.length);
    var patientList = [];
    for(var j = 0; j < patientCells.length; j++) {
        var patientText = $(patientCells[j]).text().trim();
        if (patientText !== '') {
            patientList.push(patientText);
        }
    }
    var challenge = new Challenge(
        Number($(cells[0]).text().trim()),
        Number($(cells[1]).text().trim()),
        patientList
    );
    return challenge;
}

function roomDataMapper(cells, context) {
    var roomText = $(cells[0]).text().trim();
    var roomAttrIncreaseData = {};
    roomAttrIncreaseData.ability = context.abilityData[roomText];
    roomAttrIncreaseData.money = context.moneyData[roomText];
    roomAttrIncreaseData.exp = context.expData[roomText];
    
    var room = new Room(
        $(cells[0]).text().trim(),
        $(cells[1]).text().trim(),
        $(cells[2]).text().trim(),
        Number($(cells[3]).text().trim()),
        Number($(cells[4]).text().trim()),
        roomAttrIncreaseData
    );
    return room;
}

function readRoomAttrIncreaseData(attrText, data) {
    var roomAttrIncreaseData = {};
    var tableData = $(data).find(attrText + ' tr');
    for (var i = 0; i < tableData.length; i++) {
        var rowData = tableData[i];
        var cells = $(rowData).children();
        if (cells[0].tagName.toLowerCase() === "td") {
            var levelCells = cells.slice(1, cells.length);
            var increaseList = [];
            for(var j = 0; j < levelCells.length; j++) {
                var increase = $(levelCells[j]).text().trim();
                if (increase !== '') {
                    increaseList.push(Number(increase));
                } else {
                    increaseList.push(0);
                }
            }
            roomAttrIncreaseData[$(cells[0]).text().trim()] = increaseList;
        }
    }
    return roomAttrIncreaseData;
}

///////////////////////////////////////////////////////////////////////////////////////
// Classes
///////////////////////////////////////////////////////////////////////////////////////

function Patient(name, curePoint, minLevel, score, curePointCoeff, moneyCoeff, roomList) {
    this.name = name;
    this.curePoint = curePoint;
    this.minLevel = minLevel;
    this.curePointCoeff = curePointCoeff;
    this.moneyCoeff = moneyCoeff;
    this.roomList = roomList;
}

function Challenge(stage, minLevel, patientList) {
    this.stage = stage;
    this.minLevel = minLevel;
    this.patientList = patientList;
}

function Room(room, name, staffType, basicMoney, basicExp, roomAttrIncrease) {
    this.room = room;
    this.name = name;
    this.staffType = staffType;
    this.basicMoney = basicMoney;
    this.basicExp = basicExp;
    this.roomAttrIncrease = roomAttrIncrease;
}

function RoomUserInput(room, level, staffAbility) {
    this.room = room;
    this.level = level;
    this.staffAbility = staffAbility;
}

function ActualRoomPath(expectedCurePoint, actualCurePoint, moneyGained, expGained, actualRoomPath) {
    this.expectedCurePoint = expectedCurePoint;
    this.actualCurePoint = actualCurePoint;
    this.moneyGained = moneyGained;
    this.expGained = expGained;
    this.actualRoomPath = actualRoomPath;
}

function FormInput(hospitalLevel, useMaxAbility, calcMethod, roomUserDataMap) {
    this.hospitalLevel = hospitalLevel;
    this.useMaxAbility = useMaxAbility;
    this.calcMethod = calcMethod;
    this.roomUserDataMap = roomUserDataMap;
}