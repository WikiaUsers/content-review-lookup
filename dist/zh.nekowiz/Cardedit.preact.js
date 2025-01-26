(function() {
  // Declare our shorthands into the `dev.preact` object
  var preact;
  var h;
  var tags;
  var useReducer;
  var useState;
  var useContext;
  // global context for each component
  var GlobalContext;
  // initial state of data
  const initialState = {
    cardId: '',
    cardData: {
      id: '',
      name: '',
      prop: '',
      prop2: '',
      breed: '',
      rank: '',
      max_hp: '',
      max_atk: '',
      cost: '',
      card_filename: '',
      small_filename: '',
      evo_now: '',
      evo_max: '',
      as: '',
      ss: '',
      as2: '',
      ss2: '',
      senzai_1: '',
      senzai_2: '',
      senzai_3: '',
      senzai_4: '',
      senzai_5: '',
      senzai_6: '',
      senzai_7: '',
      senzai_8: '',
      senzai_9: '',
      senzai_10: '',
      senzaiL_1: '',
      senzaiL_2: '',
      senzaiL_3: '',
      senzaiL_4: '',
      evo_1: '',
      evo_2: '',
      evo_3: '',
      evo_4: '',
      evo_5: '',
      evo_6: '',
      evo_7: '',
      evo_8: '',
      evo_price: '',
      sell_price: '',
      evo_from: '',
      evo_to: '',
      mutual_evo: '',
      evo_chain_before_note: '',
      evo_chain_after_note: '',
      evo_chain_branch: '',
      get_source: '',
      comment: ''
    },
    status: { type: '', msg: '' }
  };

  // options available for select
  const availableOptions = {
    prop: ["", "火", "水", "雷", "闇", "光"],
    prop2: ["", "火", "水", "雷", "闇", "光"],
    breed: ["戰士", "術士", "魔族", "魔法生物", "妖精", "亞人", "龍族", "神族", "物質", "天使", "道具", "AbCd", "鬥士"],
    rank: ["C", "C+", "B", "B+", "A", "A+", "S", "S+", "SS", "SS+", "L", "LtoL"],
    evoLevel: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  };

  const generalEvo = [
    // type 1: Any to L
    {
      '火': ['1498', '1498', '1498', '3629', '3629', '3629', '3630', '3630'],
      '水': ['1499', '1499', '1499', '3631', '3631', '3631', '3632', '3632'],
      '雷': ['1500', '1500', '1500', '3633', '3633', '3633', '3634', '3634'],
      '闇': ['14774', '14774', '14774', '14774', '14774', '14774', '', ''],
      '光': ['14775', '14775', '14775', '14775', '14775', '14775', '', '']
    },
    // type 2: L to L
    {
      '火': ['3629', '3629', '3629', '3630', '3630', '3630', '6307', '6307'],
      '水': ['3631', '3631', '3631', '3632', '3632', '3632', '6308', '6308'],
      '雷': ['3633', '3633', '3633', '3634', '3634', '3634', '6309', '6309']
    }
  ];

  // table for mapping keys from data to options
  var optionTable = {
    prop: availableOptions.prop,
    prop2: availableOptions.prop2,
    rank: availableOptions.rank,
    breed: availableOptions.breed,
    evo_now: availableOptions.evoLevel,
    evo_max: availableOptions.evoLevel,
    as: [],
    as2: [],
    ss: [],
    ss2: [],
    senzai_: [],
    senzaiL_: []
  };

  function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  // type, payload, needRender
  function reducer (state, action) {
    if (action.type === 'changeId') {
      state.cardId = action.payload;
    }
    if (action.type === 'loadCard') {
      state.cardData = Object.assign(state.cardData, action.payload);
      state.status = { type: 'success', msg: '成功：已載入卡片' + state.cardId };
    }
    if (action.type === 'updateValue') {
      state.cardData[action.payload.key] = action.payload.value;
    }
    if (action.type === 'discardCard') {
      state.cardData = deepCopy(initialState.cardData);
      state.status = { type: 'success', msg: '成功：已取消編輯' + state.cardId };
    }
    if (action.type === 'updateSuccess') {
      state.cardData = deepCopy(initialState.cardData);
      state.status = { type: 'success', msg: '成功：已更新卡片' + state.cardId };
    }
    if (action.type === 'exception') {
      state.status = { type: 'error', msg: '錯誤：' + action.payload };
    }

    console.log([state, action]);

    return state;
  }

  // Styled button
  function WikiButton(props) {
    props.class = 'wds-button';
    props.style = 'margin-left: 1em;';

    return h('button', props, props.name);
  }

  // Input for Text Only
  function TextInput(props) {
    const context = useContext(GlobalContext);
    const store = context.store;
    const dispatch = context.dispatch;

    const cardLoaded = store.cardData.id.length !== 0;
    const key = props.dataKey;

    return h('input', {
      value: store.cardData[key],
      disabled: !cardLoaded,
      onInput: debounce(function(e) {
        dispatch({
          type: 'updateValue',
          payload: { key: key, value: e.target.value }
        });
      }, 1000)
    });
  }

  // Validate input by image
  function ValidateByImage(props) {
    const state = useState('');
    const context = useContext(GlobalContext);
    const store = context.store;

    const cardLoaded = store.cardData.id.length !== 0;
    const key = props.dataKey;
    const filename = leftZeroPad(store.cardData[key], 4) + ".png";

    function loadedUrl(action) {
      state.set(action.payload);
    }

    if (cardLoaded && filename.length !== 0)
      getImageByFilename(filename, loadedUrl);

    return h('span', { class: 'card_small' }, [
      h('img', { src: state.value })
    ]);
  }

  // Validate input by image
  function ValidateByCandidate(props) {
    const state = useState({ search: '', list: [] });
    const context = useContext(GlobalContext);
    const store = context.store;

    const cardLoaded = store.cardData.id.length !== 0;
    var key = props.dataKey;
    const search = store.cardData[key].trim();
    // special: senzai_(\d+) key should search at senzai part
    if (key.indexOf('senzai') >= 0)
      key = key.replace(/\d+/, '');

    if (cardLoaded && state.value.search !== search) {
      const list = optionTable[key].filter(function (o) {
        return o.name.indexOf(search) >= 0;
      }).slice(0, 5);
      state.set({ search: search, list: list });
    }
    
    return h('ul', null, state.value.list.map(function (option) {
      return h('li', null, option.name + ': ' + option.info);
    }));
  }

  // Select for Options
  function SelectInput(props) {
    const context = useContext(GlobalContext);
    const store = context.store;
    const dispatch = context.dispatch;

    const cardLoaded = store.cardData.id.length !== 0;
    const key = props.dataKey;
    const options = optionTable[key];

    const optionsPreact = options.map(function (option) {
      const value = option.value || option;
      const label = option.label || option;

      return h('option', {
        value: value,
        label: label
      });
    });

    return h('select', {
      value: store.cardData[key],
      disabled: !cardLoaded,
      children: optionsPreact,
      onChange: function (e) {
        dispatch({
          type: 'updateValue',
          payload: { key: key, value: e.target.value }
        });
      }
    });
  }

  // Input for Textarea Only
  function TextareaInput(props) {
    const context = useContext(GlobalContext);
    const store = context.store;
    const dispatch = context.dispatch;

    const cardLoaded = store.cardData.id.length !== 0;
    const key = props.dataKey;

    return h('textarea', {
      value: store.cardData[key],
      disabled: !cardLoaded,
      onInput: debounce(function(e) {
        dispatch({
          type: 'updateValue',
          payload: { key: key, value: e.target.value }
        });
      }, 1000)
    });
  }

  function ShowImage(props) {
    const state = useState('');
    const context = useContext(GlobalContext);
    const store = context.store;

    const cardLoaded = store.cardData.id.length !== 0;
    const key = props.dataKey;

    function loadedUrl(action) {
      state.set(action.payload);
    }

    if (cardLoaded && store.cardData[key].length !== 0)
      getImageByFilename(store.cardData[key], loadedUrl);
    else
      getImageByFilename("0000.png", loadedUrl);

    return h('span', { class: props.class }, [
      h('img', { src: state.value })
    ]);
  }

  function ShowText(props) {
    const context = useContext(GlobalContext);
    const store = context.store;

    const key = props.dataKey;

    return h('span', null, store.cardData[key]);
  }

  // Table Row generator
  function TableRow(props) {
    var children = [];

    switch (props.type) {
      case 'text':
        if (props.validate === 'image')
          children = [ h(TextInput, props), h(ValidateByImage, props) ];
        else if (props.validate === 'text')
          children = [ h(TextInput, props), h(ValidateByCandidate, props) ];
        else
          children = [ h(TextInput, props) ];
        break;
      case 'textarea':
        children = [ h(TextareaInput, props) ];
        break;
      case 'select':
        children = [ h(SelectInput, props) ];
        break;
      case 'image':
        children = [ h(ShowImage, props) ];
        break;
      default:
        children = [ h(ShowText, props) ];
        break;
    }

    return h('tr', null, [
      h('th', null, props.name),
      h('td', null, children)
    ]);
  }

  function BasicData () {
    const context = useContext(GlobalContext);
    const store = context.store;

    // additional needed for rendering
    const cardLoaded = store.cardData.id.length !== 0;

    return h('div', null, [
      h('table', { class: 'article-table' }, [
        h('tbody', null, [
          h(TableRow, { name: '編號', type: '', dataKey: 'id' }),
          h(TableRow, { name: '名稱', type: 'text', dataKey: 'name' }),
          h(TableRow, { name: '小圖示', type: 'image',
                        dataKey: 'small_filename', class: 'card_small' }),
          h(TableRow, { name: '大圖名稱', type: 'text',
                        dataKey: 'card_filename' })
        ])
      ])
    ]);
  }

  function AttrData () {
    const context = useContext(GlobalContext);
    const store = context.store;

    // additional needed for rendering
    const cardLoaded = store.cardData.id.length !== 0;

    return h('div', null, [
      h('h2', null, '基本能力值'),
      h('table', { class: 'article-table' }, [
        h('tbody', null, [
          h(TableRow, { name: '主屬性', type: 'select', dataKey: 'prop' }),
          h(TableRow, { name: '複屬性', type: 'select', dataKey: 'prop2' }),
          h(TableRow, { name: 'Rank', type: 'select', dataKey: 'rank' }),
          h(TableRow, { name: '種族', type: 'select', dataKey: 'breed' }),
          h(TableRow, { name: '目前進化級數', type: 'select',
                        dataKey: 'evo_now' }),
          h(TableRow, { name: '最高進化級數', type: 'select',
                        dataKey: 'evo_max' }),
          h(TableRow, { name: 'Cost', type: 'text', dataKey: 'cost' }),
          h(TableRow, { name: '最高HP', type: 'text', dataKey: 'max_hp' }),
          h(TableRow, { name: '最高攻擊力', type: 'text', dataKey: 'max_atk' })
        ])
      ])
    ]);
  }

  function SkillData () {
    const context = useContext(GlobalContext);
    const store = context.store;

    // additional needed for rendering
    const cardLoaded = store.cardData.id.length !== 0;

    return h('div', null, [
      h('h2', null, '技能名稱'),
      h('table', { class: 'article-table' }, [
        h('tbody', null, [
          h(TableRow, { name: '答題技能', type: 'text', dataKey: 'as',
                        validate: 'text' }),
          h(TableRow, { name: '答題技能2', type: 'text', dataKey: 'as2',
                        validate: 'text' }),
          h(TableRow, { name: '特殊技能', type: 'text', dataKey: 'ss',
                        validate: 'text' }),
          h(TableRow, { name: '特殊技能2', type: 'text', dataKey: 'ss2',
                        validate: 'text' })
        ])
      ])
    ]);
  }

  function SenzaiData () {
    const context = useContext(GlobalContext);
    const store = context.store;

    // additional needed for rendering
    const cardLoaded = store.cardData.id.length !== 0;
    const senzai = Array(10).fill().map(function (x, i) {
      const name = '潛能' + (i + 1).toString();
      const key = 'senzai_' + (i + 1).toString();
      return h(TableRow, { name: name, type: 'text', dataKey: key,
                           validate: 'text' });
    });

    const senzaiL = Array(4).fill().map(function (x, i) {
      const name = 'L潛能' + (i + 1).toString();
      const key = 'senzaiL_' + (i + 1).toString();
      return h(TableRow, { name: name, type: 'text', dataKey: key,
                           validate: 'text' });
    });

    var children = [];
    children = children.concat(senzai);
    children = children.concat(senzaiL);

    return h('div', null, [
      h('h2', null, '潛在能力/傳奇型態能力解放'),
      h('table', { class: 'article-table' }, [
        h('tbody', null, children)
      ])
    ]);
  }

  function EvoData () {
    const context = useContext(GlobalContext);
    const store = context.store;
    const dispatch = context.dispatch;

    // additional needed for rendering
    const cardLoaded = store.cardData.id.length !== 0;
    const evo = Array(8).fill().map(function (x, i) {
      const name = '素材' + (i + 1).toString();
      const key = 'evo_' + (i + 1).toString();
      return h(TableRow, { name: name, type: 'text',
                           dataKey: key, validate: 'image' });
    });
    const id = store.cardData.id;
    const prop = store.cardData.prop;

    var fastEvo = [
      h(WikiButton, { name: '一般素材(Any to L)', disabled: prop.length === 0,
        onClick: function (e) {
          evo.forEach(function (x, i) {
            dispatch({ type: 'updateValue', payload: {
              key: 'evo_' + (i + 1).toString(), 
              value: generalEvo[0][store.cardData.prop][i] } });
          });
      } }),
      h(WikiButton, { name: '一般素材(L to L)', disabled: prop.length === 0,
        onClick: function (e) {
          evo.forEach(function (x, i) {
            dispatch({ type: 'updateValue', payload: {
              key: 'evo_' + (i + 1).toString(), 
              value: generalEvo[1][store.cardData.prop][i] } });
          });
      } }),
            h(WikiButton, { name: '自身素材(1張)', onClick: function (e) {
        const arr = [id, '', '', '', '', '', '', ''];

        arr.forEach(function (x, i) {
          dispatch({ type: 'updateValue', payload: {
            key: 'evo_' + (i + 1).toString(), 
            value: x } });
        });
      } }),
      h(WikiButton, { name: '自身素材(3張)', onClick: function (e) {
        const arr = [id, id, id, '', '', '', '', ''];

        arr.forEach(function (x, i) {
          dispatch({ type: 'updateValue', payload: {
            key: 'evo_' + (i + 1).toString(), 
            value: x } });
        });
      } }),
    ];

    var children = [];

    children = children.concat([
      h(TableRow, { name: '進化自', type: 'text',
                    dataKey: 'evo_from', validate: 'image' }),
      h(TableRow, { name: '進化為', type: 'text',
                    dataKey: 'evo_to', validate: 'image' }),
      h(TableRow, { name: '相互進化', type: 'text',
                    dataKey: 'mutual_evo', validate: 'image' }),
      h(TableRow, { name: '進化所需金幣', type: 'text', dataKey: 'evo_price' })
    ]);
    children = children.concat(evo);
    children = children.concat([
      h(TableRow, { name: '進化鍊(前)', type: '',
                    dataKey: 'evo_chain_before_note' }),
      h(TableRow, { name: '進化鍊(支)', type: '',
                    dataKey: 'evo_chain_branch' }),
      h(TableRow, { name: '進化鍊(後)', type: '',
                    dataKey: 'evo_chain_after_note' })
    ]);

    return h('div', null, [
      h('h2', null, '進化相關'),
      cardLoaded ? fastEvo : null,
      h('table', { class: 'article-table' }, [
        h('tbody', null, children)
      ])
    ]);
  }

  function OtherData () {
    const context = useContext(GlobalContext);
    const store = context.store;

    // additional needed for rendering
    const cardLoaded = store.cardData.id.length !== 0;

    return h('div', { children: [
      h('h2', null, '其他'),
      h('table', { class: 'article-table' }, [
        h('tbody', { children: [
          h(TableRow, { name: '販賣價格', type: 'text', dataKey: 'sell_price' }),
          h(TableRow, { name: '取得來源', type: 'textarea',
                        dataKey: 'get_source' }),
          h(TableRow, { name: '備註', type: 'textarea',
                        dataKey: 'comment' })
        ] })
      ])
    ] });
  }

  function IdInput() {
    const context = useContext(GlobalContext);
    const store = context.store;
    const dispatch = context.dispatch;

    const cardLoaded = store.cardData.id.length !== 0;

    return h('div', null, [
      h('h2', null, '請輸入卡片編號'),
      h('input', { value: context.store.cardId,
                   disabled: cardLoaded,
                   onInput: function (e) {
                    context.dispatch({
                      type: 'changeId',
                      payload: e.target.value
                    });
                  }}),
      h(WikiButton, { name: '載入卡片', disabled: cardLoaded, primary: true,
                      onClick: function (e) {
                        getCardDataById(store.cardId, dispatch);
                      }}),
      h(WikiButton, { name: '更新卡片', disabled: !cardLoaded, primary: true,
                      onClick: function (e) {
                        updateData(store.cardData, dispatch);
                      }}),
      h(WikiButton, { name: '取消編輯', disabled: !cardLoaded,
                      onClick: function (e) {
                        dispatch({ type: 'discardCard' });
                      }}),
      h('p', { class: 'editStatus-' + store.status.type }, store.status.msg)
    ]);
  }

  function EditContainer () {
    const context = useContext(GlobalContext);
    const store = context.store;
    const dispatch = context.dispatch;

    return h('div', null, [
      h(BasicData),
      h(AttrData),
      h(SkillData),
      h(SenzaiData),
      h(EvoData),
      h(OtherData)
    ]);
  }

  // Root Container
  function App() {
    // create store
    const state = useState({});
    const reducerObj = useReducer(reducer, deepCopy(initialState));
    const store = reducerObj.state;
    const dispatch = reducerObj.dispatch;

    function update(action) {
      dispatch(action);
      state.set({});
    }

    // sub containers only
    return h(GlobalContext.Provider,
             { value: {store: store, dispatch: update} },
             [h(IdInput), h('hr'), h(EditContainer)]);
  }

  function init() {
    // prepare validate text
    getSkillByType('Answer', function (action) {
      optionTable['as'] = action.payload.data;
    });
    getSkillByType('Answer2', function (action) {
      optionTable['as2'] = action.payload.data;
    });
    getSkillByType('Special', function (action) {
      optionTable['ss'] = action.payload.data;
    });
    getSkillByType('Special2', function (action) {
      optionTable['ss2'] = action.payload.data;
    });
    getSkillByType('Senzai', function (action) {
      optionTable['senzai_'] = action.payload.data;
      optionTable['senzaiL_'] = action.payload.data;
    });
    // prepare main window
    var container = document.getElementById('app');

    container.innerHTML = "";

    preact.render(
      h(App),
      container
    );
  }

  // Declare util function for pre and post work
  // filename padding
  function leftZeroPad(val, minLength) {
    val = val.toString();
    if (val.length >= minLength) {
      return val;
    } else {
      return leftZeroPad("0" + val, minLength);
    }
  }

  // load params from url
  function getUrlParams() {
    var paramMap = {}, i;
    if (location.search.length === 0) {
      return paramMap;
    }
    var parts = location.search.substring(1).split("&");

    for (i = 0; i < parts.length; i++) {
      var component = parts[i].split("=");
      var key = decodeURIComponent(component[0]);
      var value = decodeURIComponent(component[1]);
      paramMap[key] = value;
    }
    return paramMap;
  }

  // debounce for text input
  // usage: onInput: debounce(function (e) { handler(e.target.value); }, wait)
  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this,
          args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  // Declare our data communication between wiki and editor
  function getCardDataById(id, dispatch) {
    if (isNaN(parseInt(id))) return;
    id = parseInt(id);

    new mw.Api().get({
      action: 'query',
      titles: 'Template:Card/Data/' + id.toString(),
      prop: 'revisions',
      rvprop: 'content',
      rvslots: 'main'
    }).done(function (d) {
      if (d.error) {
        console.error(d.error.code);
        dispatch({
          type: 'exception',
          payload: '載入卡片「' + id.toString() + '」時發生錯誤'
        });
        return;
      }
      
      const key = Object.keys(d.query.pages)[0];
      const content = d.query.pages[key].revisions[0].slots.main['*'];
      const lines = content.split('\n');
      var cardData = {}, left_part, right_part;
      for (var idx = 0; idx < lines.length; idx++) {
        if (lines[idx][0] !== '|') continue;
        left_part = lines[idx].substr(1, lines[idx].search('=') - 1);
        right_part = lines[idx].substr(lines[idx].search('=') + 1);
        if (left_part.length > 0)
          cardData[left_part] = right_part;
      }

      dispatch({
        type: 'loadCard',
        payload: cardData
      });
      
    }).fail(function (e) {
      console.error(e);
      dispatch({
        type: 'exception',
        payload: '載入卡片「' + id.toString() + '」時發生錯誤'
      });
    });
  }

  function getImageByFilename(filename, dispatch) {
    new mw.Api().get({
      action: 'query',
      titles: 'File:' + filename,
      prop: 'imageinfo',
      iiprop: 'url'
    }).done(function (d) {
      if (d.error) {
        console.error(d.error.code);
        dispatch({
          type: 'exception',
          payload: '載入圖片「' + filename + '」時發生錯誤'
        });
        return;
      }
      
      const key = Object.keys(d.query.pages)[0];
      const url = d.query.pages[key].imageinfo[0].url;

      dispatch({
        type: 'url',
        payload: url
      });
      
    }).fail(function (e) {
      console.error(e);
      dispatch({
        type: 'exception',
        payload: '載入圖片「' + filename + '」時發生錯誤'
      });
    });
  }

  function getSkillByType(type, dispatch) {
    var title = type + '/Data';
    if (type !== 'Senzai')
      title = 'Skill/' + title;

    new mw.Api().get({
      action: 'query',
      titles: 'Template:' + title,
      prop: 'revisions',
      rvprop: 'content',
      rvslots: 'main'
    }).done(function (d) {
      if (d.error) {
        console.error(d.error.code);
        dispatch({
          type: 'exception',
          payload: '載入' + type + '清單時發生錯誤'
        });
        return;
      }
      
      const key = Object.keys(d.query.pages)[0];
      const content = d.query.pages[key].revisions[0].slots.main['*'];
      const lines = content.split('\n');
      var skillData = [], name, info;
      for (var idx = 0; idx < lines.length; idx++) {
        if (lines[idx].indexOf('{{{data}}}') === -1) continue;
        name = lines[idx].substr(1, lines[idx].search('=') - 1);
        info = lines[idx + 1].substr(lines[idx + 1].search('=') + 1);
        skillData.push({ name: name, info: info });
      }

      dispatch({
        type: 'skillData',
        payload: { type: type, data: skillData }
      });
      
    }).fail(function (e) {
      console.error(e);
      dispatch({
        type: 'exception',
        payload: '載入' + type + '清單時發生錯誤'
      });
    });
  }

  function updateData(cardData, dispatch) {
    var card_id = cardData.id
    var keys = Object.keys(cardData);
    // 如果不是L卡，迴避跟L卡相關的輸入欄位
    var key_l = ["as2", "ss2",
                 "senzaiL_1", "senzaiL_2", "senzaiL_3", "senzaiL_4"];
    if (cardData.rank.indexOf('L') === -1)
      keys.filter(function (k) { return !key_l.indexOf(k); });

    // 產生該張卡片的資料表單
    var card_text = "{{ Card/Data/{{{data}}}\n";
    keys.forEach(function (key) {
      card_text += "|" + key + "=" + cardData[key] + "\n";
    });
    card_text += "}}\n";

    // 送出表單
    new mw.Api().postWithEditToken({
      action: 'edit',
      title: 'Template:Card/Data/' + cardData.id.toString(),
      text: card_text,
      format: 'json'
    }).done(function (d) {
      if (d.error) {
        console.error(d.error.code);
        dispatch({
          type: 'exception',
          payload: '儲存卡片「' + cardData.id.toString() + '」時發生錯誤'
        });
        return;
      }

      dispatch({
        type: 'updateSuccess',
        payload: cardData.id.toString()
      });
    }).fail(function (e) {
      console.error(e);
      dispatch({
        type: 'exception',
        payload: '儲存卡片「' + cardData.id.toString() + '」時發生錯誤'
      });
    });
  }

  mw.hook('dev.preact').add(function(_preact) {
    // Assign to our shorthands
    preact = _preact;
    h = preact.h;
    tags = preact.tags;
    useReducer = preact.useReducer;
    useState = preact.useState;
    useContext = preact.useContext;
    GlobalContext = preact.createContext({});

    init();
  });

  importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:Preact.js'
    ]
  });
  console.log('Init my custom Javascripts');
})();