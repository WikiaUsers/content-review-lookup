/* Any JavaScript here will be loaded for all users on every page load. */

/*
 * Adds dropdown level lists to Template:Client order EXP and Template:Infobox
 * photon art
 * 1) On load, checks page for all <span> elements with class client-order-level or
 *    dropdown-selector-linked
 * 2) Constructs a <select> element inside each of those <span> elements
 * 3) Hooks a call to the updateClientOrderEXPSelector or
 *    updateLinkedDropdownSelectors function below to those <select> elements.
 */
function activateSelectors()
{
  /* Local variables */
  var spans, eachSpan, i, o, selectableList, selectableArray, newSelector, functionCall, maximumEXP, perLevelEXP, levelOneEXP, maximumEXPLevel;

  /* Check all <span> elements */
  spans = document.getElementsByTagName('span');
  for(i = 0; i < spans.length; i++)
  {
    eachSpan = spans[i];
    if(eachSpan.className &&
       eachSpan.className.match(/\bdropdown-selector-linked\b/))
    {
      /* Linked dropdown selectors, class dropdown-selector-linked */
      selectableList = eachSpan.getAttribute('data-selectable-list');
      if(!selectableList)
      {
        return;
      }

      selectableArray = selectableList.split(',');

      /* Construct a new <select> element */
      newSelector = document.createElement('select');
      functionCall = 'updateLinkedDropdownSelectors(\'dropdown-selector-linked-' +
                         i + '\')';
      newSelector.setAttribute('onchange', functionCall);
      newSelector.setAttribute('onkeyup', functionCall);
      newSelector.setAttribute('id', 'dropdown-selector-linked-' + i);
      newSelector.setAttribute('style', 'text-align:right;');
      newSelector.setAttribute('data-selectable-list', selectableList);

      /* Write the <option> elements into the new <select> */
      for(o = 1; o < selectableArray.length; o++)
      {
        newSelector.innerHTML += '<option value="' + o + '">' + o + '</option>';
      }
      newSelector.innerHTML += '<option value="' + selectableArray.length +
                               '" selected="selected">' + o + '</option>';

      /* Replace placeholder text in the <span> with the new <select> */
      eachSpan.innerHTML = '';
      eachSpan.appendChild(newSelector);
    }
    if(eachSpan.className &&
       eachSpan.className.match(/\bclient-order-level\b/))
    {
      /* Client order EXP selectors, class client-order-level */
      maximumEXP = eachSpan.getAttribute('data-maximum');
      if(!maximumEXP)
      {
        return;
      }

      perLevelEXP = eachSpan.getAttribute('data-per-level');
      levelOneEXP = eachSpan.getAttribute('data-level-one');

      if(perLevelEXP)
      {
        /* Calculate the level at which EXP hits the maximum */
        maximumEXPLevel = Math.ceil(maximumEXP / perLevelEXP);
      }
      else
      {
        if(!levelOneEXP)
        {
          return;
        }

        /* Calculate the level at which EXP hits the maximum */
        maximumEXPLevel = Math.ceil((maximumEXP - 100) / (levelOneEXP - 100));
      }

      /* Construct a new <select> element */
      newSelector = document.createElement('select');
      functionCall = 'updateClientOrderEXPSelector(\'client-order-EXP-' +
                         i + '\')';
      newSelector.setAttribute('onchange', functionCall);
      newSelector.setAttribute('onkeyup', functionCall);
      newSelector.setAttribute('id', 'client-order-EXP-' + i);
      newSelector.setAttribute('style', 'text-align:right;');
      newSelector.setAttribute('data-maximum', maximumEXP);
      if(perLevelEXP)
      {
        newSelector.setAttribute('data-per-level', perLevelEXP);
      }
      if(levelOneEXP)
      {
        newSelector.setAttribute('data-level-one', levelOneEXP);
      }

      /* Write the <option> elements into the new <select> */
      for(o = 1; o < maximumEXPLevel; o++)
      {
        newSelector.innerHTML += '<option value="' + o + '">' + o + '</option>';
      }
      newSelector.innerHTML += '<option value="' + maximumEXPLevel +
                               '" selected="selected">&ge; ' +
                               maximumEXPLevel + '</option>';

      /* Replace placeholder text in the <span> with the new <select> */
      eachSpan.innerHTML = '';
      eachSpan.appendChild(newSelector);
    }
  }
}
addOnloadHook(activateSelectors);

/* Called by linked <select> elements constructed by activateSelectors() */
function updateLinkedDropdownSelectors(selectorId)
{
  /* Local variables */
  var selectorElement, selectableList, selectableArray, i, o, selects, eachSelect, outputSpan, newValue;

  selectorElement = document.getElementById(selectorId);
  if(!selectorElement)
  {
    return;
  }

  selectableList = selectorElement.getAttribute('data-selectable-list');
  if(!selectableList)
  {
    return;
  }

  selectableArray = selectableList.split(',');

  /* Check all <select> elements */
  selects = document.getElementsByTagName('select');
  for(i = 0; i < selects.length; i++)
  {
    eachSelect = selects[i];

    /* For selectors other than the triggering selector */
    if(eachSelect !== selectorElement)
    {
      /* Make them the same selected option as the triggering selector */
      for(o = 0; o < selectableArray.length; o++)
      {
        if(o === selectorElement.selectedIndex)
        {
          eachSelect.options[o].selected = true;
        }
        else
        {
          eachSelect.options[o].selected = false;
        }
      }
    }

    /* Check for nearest previous <span> sibling with class dropdown-selectable-linked */
    for(outputSpan = eachSelect.parentNode.previousSibling;
        outputSpan;
        outputSpan = outputSpan.previousSibling)
    {
      if(outputSpan.className &&
         outputSpan.className.match(/\bdropdown-selectable-linked\b/))
      {
        newValue = eachSelect.getAttribute('data-selectable-list').split(',')[eachSelect.selectedIndex];

        /* Regex replacement to insert comma separators between 3 digits */
        outputSpan.innerHTML = newValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        break;
      }
    }
  }
}

/* Called by client order <select> elements constructed by activateSelectors() */
function updateClientOrderEXPSelector(selectorId)
{
  /* Local variables */
  var selectorElement, maximumEXP, perLevelEXP, levelOneEXP, selectedValue, outputSpan, newEXP;

  selectorElement = document.getElementById(selectorId);
  if(!selectorElement)
  {
    return;
  }

  maximumEXP = selectorElement.getAttribute('data-maximum');
  if(!maximumEXP)
  {
    return;
  }

  perLevelEXP = selectorElement.getAttribute('data-per-level');
  levelOneEXP = selectorElement.getAttribute('data-level-one');

  /* Must have either data-per-level or data-level-one set */
  if(!perLevelEXP && !levelOneEXP)
  {
    return;
  }

  selectedValue = selectorElement.options[selectorElement.selectedIndex].value;

  /* Check for nearest previous <span> sibling with class client-order-exp */
  for(outputSpan = selectorElement.parentNode.previousSibling;
      outputSpan;
      outputSpan = outputSpan.previousSibling)
  {
    if(outputSpan.className &&
       outputSpan.className.match(/\bclient-order-exp\b/))
    {
      /* Calculate the EXP for the selected level */
      if(perLevelEXP)
      {
        /* data-per-level is set? proportional scaling to level */
        newEXP = perLevelEXP * selectedValue;
      }
      else
      {
        /* otherwise, data-level-one must be set, standard formula */
        newEXP = 100 + ((levelOneEXP - 100) * selectedValue);
      }
      newEXP = Math.min(newEXP, maximumEXP);

      /* Regex replacement to insert comma separators between 3 digits */
      outputSpan.innerHTML = newEXP.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return;
    }
  }
}