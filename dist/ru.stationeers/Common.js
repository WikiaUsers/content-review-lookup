var mips = {
    commands: [
        {     // Without arguments
            cmds: ['hcf', 'yield'],
            args: []
        }, { // command register
            cmds: ['peek', 'pop', 'rand'],
            args: ['R']
        }, { // command value
            cmds: ['sleep', 'push','j', 'jal', 'jr'],
            args: ['V']
        }, { // command register value
            cmds: ['move', 'sqrt', 'abs', 'log', 'exp', 'round', 'trunc', 'ceil',
                   'floor', 'sltz', 'sgtz', 'slez', 'sgez', 'seqz', 'snez'],
            args: ['R', 'V']
        }, { // command register channel
            cmds: ['sdse', 'sdns'],
            args: ['R', 'C']
        }, { // command channel value
            cmds: ['bdse', 'bdns', 'bdseal', 'bdnsal', 'brdse', 'brdns'],
            args: ['C', 'V']
        }, { // command value value
            cmds: ['bltz', 'bgtz', 'blez', 'bgez', 'beqz', 'bnez', 'bltzal', 'bgtzal', 'blezal', 'bgezal',
                   'beqzal', 'bnezal', 'brltz', 'brgtz', 'brlez', 'brgez', 'breqz', 'brnez'],
            args: ['V', 'V']
        }, { // command register value value
            cmds: ['add', 'sub', 'mul', 'div', 'mod', 'max', 'min', 'slt', 'sgt', 'sle', 'sge', 'seq', 
                   'sne', 'sapz', 'snaz', 'and', 'or', 'xor', 'nor'],
            args: ['R', 'V', 'V']
        }, { // command value value value
            cmds: ['blt', 'bgt', 'ble', 'bge', 'beq', 'bne', 'bapz', 'bnaz', 'bltal', 'bgtal', 'bleal',
                   'bgeal', 'beqal', 'bneal', 'bapzal', 'bnazal', 'brlt', 'brgt', 'brle', 'brge', 'breq',
                   'brne', 'brapz', 'brnaz'],
            args: ['V', 'V', 'V']
        }, { // command register value value value
            cmds: ['sap', 'sna', 'select'],
            args: ['R', 'V', 'V', 'V']
        }, { // command value value value value
            cmds: ['bap', 'bna', 'bapal', 'bnaal', 'brap', 'brna'],
            args: ['V', 'V', 'V', 'V']
        }, { // l register channel parameter
            cmds: ['l'],
            args: ['R', 'C', 'P']
        }, { // s channel parameter value
            cmds: ['s'],
            args: ['C', 'P', 'V']
        }, { // ls register channel value slotParameter
            cmds: ['ls'],
            args: ['R', 'C', 'V', 'S']
        }, { // lr register channel reagentMode reagent
            cmds: ['lr'],
            args: ['R', 'C', 'M', 'G']
        }, { // alias name regnum|channum
            cmds: ['alias'],
            args: ['n', 'rc']
        }, { // define name const
            cmds: ['define'],
            args: ['n', 'c']
        }
    ],

    enums: {
        'AmmoType': ['All', 'Pistol', 'SMG'],
        'RecipeType': [
            'Ingot', 'Fabricator', 'Centrifuge', 'Furnace', 'ArcFurnace',
            'ChemistryStation', 'PaintMixer', 'Microwave', 'Autolathe',
            'ElectronicsPrinter', 'SecurityPrinter', 'HydraulicPipeBender',
            'ToolManufactory', 'OrganicsPrinter', 'ReagentProcessor',
            'AdvancedFurnace', 'MaxRecipeType'
        ],
        'ElevatorMode': ['Stationary', 'Upward', 'Downward'],
        'Species': ['None', 'Human', 'Zrilian', 'Robot'],
        'StationContactType': ['Unknown', 'Information', 'Trader', 'Max'],
        'TraderInventoryType': [
            'Undefined', 'Electronics', 'Organics', 'Basic', 'Hydraulic', 'Ore',
            'Microwave', 'Chemistry', 'Paint', 'Tool', 'Security', 'Other',
            'Exotics', 'Gas', 'Custom'
        ],
        'TraderItemType': [
            'Undefined', 'Ingot', 'Consumable', 'GasCanister', 'Battery',
            'Stackable', 'Reagent'
        ],
        'WorldType': [
            'Undefined', 'Mars', 'Moon', 'Space', 'Vulcan', 'Mimas', 'Europa',
            'Custom'
        ],
        'Dir': [
            'North', 'South', 'West', 'East', 'Up', 'Down', 'Center', 'Undefined'
        ],
        'CrateType': [
            'Empty', 'BuildingSupplies', 'PipeSupplies', 'CableSupplies',
            'ConveyorSupplies', 'Eggs'
        ],
        'RobotMode': [
            'None', 'Follow', 'MoveToTarget', 'Roam', 'Unload',
            'PathToTarget', 'StorageFull'
        ],
        'AirConditionerState': ['Normal', 'TempWarning', 'PressureWarning'],
        'LogicBatchMethod': ['Average', 'Sum', 'Minimum', 'Maximum'],
        'LogicReagentMode': ['Contents', 'Required', 'Recipe'],
        'LogicTransmitterMode': ['Passive', 'Active'],
        'MathOperators': [
            'Add', 'Subtract', 'Multiply', 'Divide', 'Mod', 'Atan2', 'Pow',
            'Log'
        ],
        'MathOperatorsUnary': [
            'Ceil', 'Floor', 'Abs', 'Log', 'Exp', 'Round', 'Rand', 'Sqrt',
            'Sin', 'Cos', 'Tan', 'Asin', 'Acos', 'Atan'
        ],
        'SlotHandlerMode': ['Automatic', 'Logic'],
        'SorterMode': ['Split', 'Filter', 'Logic'],
        'SpeakerSounds': [
            'Alarm1', 'Alarm2', 'Alarm3', 'Alarm4', 'Alarm5', 'Alarm6',
            'Alarm7', 'Music1', 'Music2', 'Music3'
        ],
        'EntityState': [
            'Alive', 'Dead', 'Unconscious', 'Decay'
        ],
        'BatteryCellState': [
            'Empty', 'Critical', 'VeryLow', 'Low', 'Medium', 'High', 'Full'
        ],
        'GasFilterLife': ['Normal', 'Medium', 'Large'],
        'TrackingType': ['Human', 'Beacon'],
        'AdvancedAirlockState': [
            'Disabled', 'PressurizingInternal', 'PressurizedInternal',
            'DepressurizingInternal', 'PressurizingExternal',
            'PressurizedExternal', 'DepressurizingExternal'
        ],
        'AirControlMode': ['None', 'Offline', 'Pressure', 'Draught'],
        'AirlockControlState': [
            'Disabled', 'Pressurizing', 'Pressurized', 'Depressurizing',
            'Depressurized', 'OverrideCount', 'Override'
        ],
        'ConditionOperation': ['Equals', 'Greater', 'Less', 'NotEquals'],
        'GasDisplayMode': ['Pressure', 'Temperature'],
        'LinkedControlMode': ['None', 'Locked', 'Linked', 'Active'],
        'LogicSlotType': [
            'None', 'Occupied', 'OccupantHash', 'Quantity', 'Damage',
            'Efficiency', 'Health', 'Growth', 'Pressure', 'Temperature',
            'Charge', 'ChargeRatio', 'Class', 'PressureWaste', 'PressureAir',
            'MaxQuantity', 'Mature', 'PrefabHash'
        ],
        'LogicType': [
            'None', 'Power', 'Open', 'Mode', 'Error', 'Pressure', 'Temperature',
            'PressureExternal', 'PressureInternal', 'Activate', 'Lock',
            'Charge', 'Setting', 'Reagents', 'RatioOxygen',
            'RatioCarbonDioxide', 'RatioNitrogen', 'RatioPollutant',
            'RatioVolatiles', 'RatioWater', 'Horizontal', 'Vertical',
            'SolarAngle', 'Maximum', 'Ratio', 'PowerPotential', 'PowerActual',
            'Quantity', 'On', 'ImportQuantity', 'ImportSlotOccupant',
            'ExportQuantity', 'ExportSlotOccupant', 'RequiredPower',
            'HorizontalRatio', 'VerticalRatio', 'PowerRequired', 'Idle',
            'Color', 'ElevatorSpeed', 'ElevatorLevel', 'RecipeHash',
            'ExportSlotHash', 'ImportSlotHash', 'PlantHealth1', 'PlantHealth2',
            'PlantHealth3', 'PlantHealth4', 'PlantGrowth1', 'PlantGrowth2',
            'PlantGrowth3', 'PlantGrowth4', 'PlantEfficiency1',
            'PlantEfficiency2', 'PlantEfficiency3', 'PlantEfficiency4',
            'PlantHash1', 'PlantHash2', 'PlantHash3', 'PlantHash4',
            'RequestHash', 'CompletionRatio', 'ClearMemory', 'ExportCount',
            'ImportCount', 'PowerGeneration', 'TotalMoles', 'Volume', 'Plant',
            'Harvest', 'Output', 'PressureSetting', 'TemperatureSetting',
            'TemperatureExternal', 'Filtration', 'AirRelease', 'PositionX',
            'PositionY', 'PositionZ', 'VelocityMagnitude', 'VelocityRelativeX',
            'VelocityRelativeY', 'VelocityRelativeZ', 'RatioNitrousOxide',
            'PrefabHash', 'ForceWrite', 'SignalStrength', 'SignalID',
            'TargetX', 'TargetY', 'TargetZ', 'SettingInput', 'SettingOutput'
        ],
        'ShipDisplayMode': ['Velocity'],
        'VentDirection': ['Outward', 'Inward'],
        'ButtonMode': ['Operate', 'Logic'],
        'ThrustDirection': [
            'Forward', 'Backward', 'Upward', 'Downward', 'Left', 'Right'
        ],
        'Unit': [
            'None', 'Stack', 'g', 'Canister', 'Percent', 'BatteryCellSlot',
            'ThingNameSlot', 'KPa', 'ProgrammableChip', 'Relay',
            'DegreesCelcius', 'Credits'
        ],
        'MineableType': [
            'None', 'Stone', 'Iron', 'Ice', 'Gold', 'Coal', 'Copper', 'Uranium',
            'Nickel', 'Lead', 'Silver', 'Silicon', 'Oxite', 'Volatiles',
            'GeyserHydrogen', 'Cobalt', 'Crater', 'Bedrock'
        ]
    },

    reagentModes: ['Contents', 'Required', 'Recipe'],

    reagents: [
        'Flour', 'Milk', 'Egg', 'Iron', 'Gold', 'Carbon', 'Uranium', 'Copper',
        'Steel', 'Hydrocarbon', 'Silver', 'Nickel', 'Lead', 'Electrum', 'Invar',
        'Constantan', 'Solder', 'Plastic', 'Silicon', 'SalicylicAcid',
        'Alcohol', 'Oil', 'Potato', 'Tomato', 'Fenoxitone', 'ColorRed',
        'ColorGreen', 'ColorBlue', 'ColorYellow', 'ColorOrange', 'Pumpkin',
        'Rice', 'Waspaloy', 'Stellite', 'Inconel', 'Hastelloy', 'Astroloy',
        'Cobalt'
    ],

    parameters: [
        'None', 'Power', 'Open', 'Mode', 'Error', 'Pressure', 'Temperature',
        'PressureExternal', 'PressureInternal', 'Activate', 'Lock',
        'Charge', 'Setting', 'Reagents', 'RatioOxygen',
        'RatioCarbonDioxide', 'RatioNitrogen', 'RatioPollutant',
        'RatioVolatiles', 'RatioWater', 'Horizontal', 'Vertical',
        'SolarAngle', 'Maximum', 'Ratio', 'PowerPotential', 'PowerActual',
        'Quantity', 'On', 'ImportQuantity', 'ImportSlotOccupant',
        'ExportQuantity', 'ExportSlotOccupant', 'RequiredPower',
        'HorizontalRatio', 'VerticalRatio', 'PowerRequired', 'Idle',
        'Color', 'ElevatorSpeed', 'ElevatorLevel', 'RecipeHash',
        'ExportSlotHash', 'ImportSlotHash', 'PlantHealth1', 'PlantHealth2',
        'PlantHealth3', 'PlantHealth4', 'PlantGrowth1', 'PlantGrowth2',
        'PlantGrowth3', 'PlantGrowth4', 'PlantEfficiency1',
        'PlantEfficiency2', 'PlantEfficiency3', 'PlantEfficiency4',
        'PlantHash1', 'PlantHash2', 'PlantHash3', 'PlantHash4',
        'RequestHash', 'CompletionRatio', 'ClearMemory', 'ExportCount',
        'ImportCount', 'PowerGeneration', 'TotalMoles', 'Volume', 'Plant',
        'Harvest', 'Output', 'PressureSetting', 'TemperatureSetting',
        'TemperatureExternal', 'Filtration', 'AirRelease', 'PositionX',
        'PositionY', 'PositionZ', 'VelocityMagnitude', 'VelocityRelativeX',
        'VelocityRelativeY', 'VelocityRelativeZ', 'RatioNitrousOxide',
        'PrefabHash', 'ForceWrite', 'SignalStrength', 'SignalID',
        'TargetX', 'TargetY', 'TargetZ', 'SettingInput', 'SettingOutput'
    ],

    slotParameters: [
        'None', 'Occupied', 'OccupantHash', 'Quantity', 'Damage',
        'Efficiency', 'Health', 'Growth', 'Pressure', 'Temperature',
        'Charge', 'ChargeRatio', 'Class', 'PressureWaste', 'PressureAir',
        'MaxQuantity', 'Mature', 'PrefabHash'
    ],

    tagRe: /^(.+):/,

    commentRe: /^(.*?)(\s*#.*)$/,
    
    floatRe: /^[+-]?(\d+(\.\d*)?|(\d*\.\d+))([eE][+-]?\d+)?$/,
    
    registerRe: /r+(\d+)/,

    channelRe: /d(r*)(\d+)/,

    linenumRe: /^\s*\d+\. (.*)$/,

    color: function(str, type) {
        if ('' === type) {
            return str;
        }
        return '<span class="' + type + '">' + str + '</span>';
    },
    
    isRegister: function(str) {
        if ('ra' == str || 'sp' == str) {
            return true;
        }
        var matches = mips.registerRe.exec(str);
        if (null !== matches && +matches[1] >= 0 && +matches[1] <= 15) {
            return true;
        }
        return false;
    },

    isDataChannel: function(str) {
        if ('db' == str) {
            return true;
        }
        var matches = mips.channelRe.exec(str);
        if (null !== matches && +matches[2] >= 0 
            && (+matches[2] <= 5 || ('' !== matches[1] && +matches[2] <= 15))) {
            return true;
        }
        return false;
    },

    isEnum: function(str) {
        var path = str.split('.');
        var enum_ = mips.enums;
        for (i = 0; i < path.length - 1; i++) {
            if (enum_.hasOwnProperty(path[i])) {
                enum_ = enum_[path[i]];
            } else {
                return false;
            }
        }
        return (Array.isArray(enum_) && -1 != enum_.indexOf(path[i]));
    },

    doOne: function(text, fragment, linenum)
    {
        var tags = [];
        var regAliases = [];
        var dcAliases = [];
        var defines = [];
        var result = [];
        var lines = text.split("\n");
        var cmd, comment, matches, tag, words, cmdIdx, str, type, l, i;
        for (l = 0; l < lines.length; l++) {
            if (null !== (matches = mips.tagRe.exec(lines[l].trim()))) {
                tag = matches[1];
                if (-1 == tags.indexOf(tag)) {
                    tags.push(tag);
                }
            }
        }
        for (l = 0; l < lines.length; l++) {
            cmd = lines[l].trim().replace(/\u200B/g, '');
            if ('' === cmd) {
                result.push('');
                continue;
            }
            comment = '';
            if (null !== (matches = mips.commentRe.exec(cmd))) {
                cmd = matches[1].trim();
                comment = mips.color(matches[2].trimEnd(), 'rem');
            }
            if ('' === cmd) {
                result.push(comment);
                continue;
            }
            if (':' == cmd.substr(-1)) {
                tag = cmd.substr(0, cmd.length-1);
                result.push(mips.color(cmd, 'tag') + comment);
                continue;
            }
            words = cmd.split(' ');
            cmdIdx = -1;
            for (i = 0; i < mips.commands.length; i++) {
                if (-1 != mips.commands[i].cmds.indexOf(words[0])) {
                    cmdIdx = i;
                    break;
                }
            }
            if (-1 == cmdIdx) {
                result.push(mips.color(cmd, 'error') + comment);
                continue;
            }
            str = mips.color(words.shift(), 'cmd');
            if (words.length != mips.commands[cmdIdx].args.length) {
                result.push(str + ' ' + mips.color(words.join(' '), 'error') + comment);
                continue;
            }
            for (i = 0; i < mips.commands[cmdIdx].args.length; i++) {
                type = 'error';
                switch(mips.commands[cmdIdx].args[i]) {
                    case 'n': // alias name
                        type = 'alias';
                        break;
                    case 'rc': //register | value
                        if ('r' == words[i][0]) {
                            type = 'register';
                            if (-1 == regAliases.indexOf(words[0])) {
                                regAliases.push(words[0]);
                            }
                        } else if ('d' == words[i][0]) {
                            type = 'data';
                            if (-1 == dcAliases.indexOf(words[0])) {
                                dcAliases.push(words[0]);
                            }
                        }
                        break;
                    case 'c':
                        if (null !== mips.floatRe.exec(words[i])) {
                            type = 'num';
                            if (-1 == defines.indexOf(words[0])) {
                                defines.push(words[0]);
                            }
                        }
                        break;
                    case 'R':
                        if (mips.isRegister(words[i])) {
                            type = 'register';
                        } else if (fragment || -1 != regAliases.indexOf(words[i])) {
                            type = '';
                        }
                        break;
                    case 'M':
                        if (-1 != mips.reagentModes.indexOf(words[i])) {
                            type = 'rmode';
                        }
                        // no break
                    case 'V':
                        if (mips.isRegister(words[i])) {
                            type = 'register';
                        } else if (null !== mips.floatRe.exec(words[i])) {
                            type = 'num';
                        } else if (-1 != tags.indexOf(words[i])) {
                            type = 'tag';
                        } else if (mips.isEnum(words[i])) {
                            type = 'enum';
                        } else if (fragment || -1 != regAliases.indexOf(words[i])
                                   || -1 != defines.indexOf(words[0])) {
                            type = '';
                        }
                        break;
                    case 'C':
                        if (mips.isDataChannel(words[i])) {
                            type = 'data'
                        } else if (fragment || -1 != dcAliases.indexOf(words[i])) {
                            type = '';
                        }
                        break;
                    case 'P':
                        if (null !== mips.floatRe.exec(words[i])
                            || -1 != mips.parameters.indexOf(words[i])) {
                            type = 'param';
                        }
                        break;
                    case 'S':
                        if (null !== mips.floatRe.exec(words[i])
                            || -1 != mips.slotParameters.indexOf(words[i])) {
                            type = 'param';
                        }
                        break;
                    case 'G':
                        if (-1 != mips.reagents.indexOf(words[i])) {
                            type = 'reagent';
                        }
                        break;
                }
                str += ' ' + mips.color(words[i], type);
            }
            result.push(' ' + str + comment);
        }
        for (i = result.length - 1; i > 0; i--) {
            if ('' == result[i].trim()) {
                result.pop();
            } else {
                break;
            }
        }
        if (linenum) {
            for (var i = 0; i < result.length; i++) {
                result[i] = mips.color(('   ' + (i + 1)).substr(-3) + '.', 'linenum') + ' ' + result[i];
            }
        }
        return(result.join("\n"));
    },

    doAll: function()
    {
        var mipses = document.querySelectorAll('code[lang="mips"]');
        var linenum, fragment, text;
        for (var i = 0; i < mipses.length; i++) {
            text = mipses[i].innerText.trim();
            if ('' !== text) {
                linenum = ('yes' === mipses[i].dataset.linenum);
                fragment = ('yes' === mipses[i].dataset.fragment);
                mipses[i].innerHTML = '<pre>' + mips.doOne(text, fragment, linenum) + '</pre>';
                mipses[i].addEventListener('copy', mips.doCopy);
            }
        }
    },

    doCopy: function(e)
    {
        e.preventDefault();
        var text = window.getSelection().toString().split("\n");
        var matches;
        for (var i = 0; i  < text.length; i++) {
            text[i] = text[i].trim();
            if (null !== (matches = mips.linenumRe.exec(text[i]))) {
                text[i] = matches[1].trim();
            }
        }
        e.clipboardData.setData('text/plain', text.join("\n"));
    }
}

document.addEventListener('DOMContentLoaded', mips.doAll);