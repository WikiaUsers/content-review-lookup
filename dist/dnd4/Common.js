/* Any JavaScript here will be loaded for all users on every page load. */

/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: User:Mike Dillon, User:R. Koot, User:SG
 */
 
 /** Custom tags ****************************************************************
 * 
 * Description: Allows new tags to be added to a user's profile page and allows
 *              modifying existing tags.
 * Source:      Dev wiki (https://dev.fandom.com/wiki/UserTags)
 */
window.UserTagsJS = {
	modules: {},
	tags: {
	    'bureaucrat': { u:'Wizard', link:'Wizard', title:'This user is a D&D 4e Wiki bureaucrat.' },
	    'sysop':      { u:'Archmage', link: 'Archmage', title:'This user is a D&D 4e Wiki administrator.' },
	    'templates':  { u:'Templates Extraordinar' },
	    'master-scribe': { u:'Master Scribe', link:'Scribe', title:'This user have contributed over 1000 edits.' }
	},
	oasisPlaceBefore: ''
};
UserTagsJS.modules.custom = {
    // NOTE: order of list here does NOT matter
	'Moviesign': ['templates'] 
	'Arikabeth': ['master-scribe']
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop'];
/* end of custom tags */
 
var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();
 
// Unhide answer divs and bold question divs with the given qa class.
// Hide answer divs and unbold question divs not matching.
function answerDisplay(qaClass, doRefocus)
{
  var eachDiv;
  var eachSpan;
  var childAnchors;
  var lastLink;
  var thisQaClass;
  var onclickCommand;
  var divs = document.getElementsByTagName("div"); 
  var spans = document.getElementsByTagName("span");
  for( var i=0; eachDiv = divs[i]; i++ )
  {
    if (hasClass(eachDiv, "answer"))
    {
      if (hasClass(eachDiv, qaClass))
      {
        if(doRefocus)
        {
          eachDiv.focus();
        }
        if(!hasClass(eachDiv, "defaultanswer"))
        {
          eachDiv.className += " defaultanswer";
        }
      }
      else
      {
        eachDiv.className = eachDiv.className.replace( /(?:^|\s)defaultanswer(?!\S)/ , '' );
      }
    }
  } 
  for( var i=0; eachSpan = spans[i]; i++ )
  { 
    if (hasClass(eachSpan, "question"))
    {
      if (hasClass(eachSpan, qaClass))
      {
        childAnchors = eachSpan.getElementsByTagName('a');
        if(childAnchors.length > 0)
        {
          lastLink = childAnchors[childAnchors.length - 1].href;
        }
        else
        {
          lastLink = '#';
        }

        if(lastLink.charAt(lastLink.length - 1) == '#')
        {
          onclickCommand = 'return false';
        }
        else
        {
          onclickCommand = '';
        }
        eachSpan.setAttribute('onclick', onclickCommand);

        if(!hasClass(eachSpan, "defaultquestion"))
        {
          eachSpan.className += " defaultquestion";
        }
      }
      else
      {
        thisQaClass = eachSpan.className.match(/qa\w+/);
        if(thisQaClass !== null)
        {
          onclickCommand = 'answerDisplay("' + thisQaClass[0] + '", true); return false';
          eachSpan.setAttribute('onclick', onclickCommand);
          eachSpan.className = eachSpan.className.replace( /(?:^|\s)defaultquestion(?!\S)/ , '' );
        }
      }
    }
  } 
}

function activateSpans()
{
   // iterate over all < span >-elements 
   var spans = document.getElementsByTagName("span");
   var eachSpan;
   var qaClass;
   var noRefocus = false;
   var onclickCommand;
   for( var i=0; eachSpan = spans[i]; i++ )
   {
     if (hasClass(eachSpan, "question"))
     {
       qaClass = eachSpan.className.match(/qa\w+/);
       if(qaClass !== null)
       {
         if(hasClass(eachSpan, "defaultquestion"))
         {
           answerDisplay(qaClass[0], noRefocus);
         }
         else
         {
           onclickCommand = 'answerDisplay("' + qaClass[0] + '", true); return false';
           eachSpan.setAttribute('onclick', onclickCommand);
         }
       }
     }
   }
}
addOnloadHook( activateSpans );

/*
 * Adds button and slider functionality to character sheet templates
 * 1) On load, checks page for all placeholder <span> elements inside a <div> with
      class character-sheet
 * 2) Replaces the placeholder <span>s with the appropriate <input> elements
 * 3) Hooks calls to 
 */
function activateCharacterSheet()
{
  /* Local variables */
  var divs, eachDiv, i, spans, eachSpan, j, newInput, functionCall, linkedInput;

  /* Check all <div> elements */
  divs = document.getElementsByTagName('div');
  for(i = 0; i < divs.length; i++)
  {
    eachDiv = divs[i];
    if(eachDiv.className &&
       eachDiv.className.match(/\bcharacter-sheet\b/))
    {
      /* Check the <span> elements inside */
      spans = eachDiv.getElementsByTagName('span');
      for(j = 0; j < spans.length; j++)
      {
        eachSpan = spans[j];
        if(eachSpan.className &&
           eachSpan.className.match(/\bhp-number-placeholder\b/))
        {
          /* Construct a new <input> element */
          newInput = document.createElement('input');
          newInput.type = 'number';

          /* Set up the attributes */
          functionCall = 'updateLinkedInputs(\'hp-number-' + i +
                         '\', \'hp-range-' + i + '\')';
          newInput.setAttribute('onchange', functionCall);
          newInput.setAttribute('id', 'hp-number-' + i);
          newInput.max = eachSpan.getAttribute('data-hp');
          newInput.min = Math.trunc(-newInput.max / 2);
          newInput.defaultValue = newInput.max;
          newInput.value = newInput.max;
          newInput.step = 1;

          /* Replace placeholder text in the <span> with the new <input> */
          eachSpan.innerHTML = '';
          eachSpan.appendChild(newInput);
        }
        else if(eachSpan.className &&
           eachSpan.className.match(/\bhp-range-placeholder\b/))
        {
          /* Construct a new <input> element */
          newInput = document.createElement('input');
          newInput.type = 'range';

          /* Skip this one if browser doesn't support range input */
          if(newInput.type !== 'range')
            continue;

          /* Set up the attributes, copying numbers from previous */
          functionCall = 'updateLinkedInputs(\'hp-range-' + i +
                         '\', \'hp-number-' + i + '\')';
          newInput.setAttribute('onchange', functionCall);
          newInput.setAttribute('oninput', functionCall);
          newInput.setAttribute('id', 'hp-range-' + i);
          linkedInput = document.getElementById('hp-number-' + i);
          newInput.max = linkedInput.max;
          newInput.min = linkedInput.min;
          newInput.defaultValue = linkedInput.defaultValue;
          newInput.value = linkedInput.value;
          newInput.step = linkedInput.step;

          /* Insert the new <input> into the <span> */
          eachSpan.appendChild(newInput);
        }
        else if(eachSpan.className &&
           eachSpan.className.match(/\bhp-reset-placeholder\b/))
        {
          /* Construct a new <input> element */
          newInput = document.createElement('input');
          newInput.type = 'button';

          /* Set up the attributes */
          functionCall = 'resetLinkedInputs(\'hp-number-' + i +
                         '\', \'hp-range-' + i + '\')';
          newInput.setAttribute('onclick', functionCall);
          newInput.value = 'Reset hp';

          /* Insert the new <input> into the <span> */
          eachSpan.appendChild(newInput);
        }
        else if(eachSpan.className &&
           eachSpan.className.match(/\bsurge-number-placeholder\b/))
        {
          /* Construct a new <input> element */
          newInput = document.createElement('input');
          newInput.type = 'number';

          /* Set up the attributes */
          functionCall = 'updateLinkedInputs(\'surge-number-' + i +
                         '\', \'surge-range-' + i + '\')';
          newInput.setAttribute('onchange', functionCall);
          newInput.setAttribute('id', 'surge-number-' + i);
          newInput.max = eachSpan.getAttribute('data-surges-per-day');
          newInput.min = 0;
          newInput.defaultValue = newInput.max;
          newInput.value = newInput.max;
          newInput.step = 1;

          /* Replace placeholder text in the <span> with the new <input> */
          eachSpan.innerHTML = '';
          eachSpan.appendChild(newInput);
        }
        else if(eachSpan.className &&
           eachSpan.className.match(/\bsurge-range-placeholder\b/))
        {
          /* Construct a new <input> element */
          newInput = document.createElement('input');
          newInput.type = 'range';

          /* Skip this one if browser doesn't support range input */
          if(newInput.type !== 'range')
            continue;

          /* Set up the attributes, copying numbers from previous */
          functionCall = 'updateLinkedInputs(\'surge-range-' + i +
                         '\', \'surge-number-' + i + '\')';
          newInput.setAttribute('onchange', functionCall);
          newInput.setAttribute('oninput', functionCall);
          newInput.setAttribute('id', 'surge-range-' + i);
          linkedInput = document.getElementById('surge-number-' + i);
          newInput.max = linkedInput.max;
          newInput.min = linkedInput.min;
          newInput.defaultValue = linkedInput.defaultValue;
          newInput.value = linkedInput.value;
          newInput.step = linkedInput.step;

          /* Insert the new <input> into the <span> */
          eachSpan.appendChild(newInput);
        }
        else if(eachSpan.className &&
           eachSpan.className.match(/\bsurge-heal-placeholder\b/))
        {
        }
        else if(eachSpan.className &&
           eachSpan.className.match(/\bsurge-reset-placeholder\b/))
        {
          /* Construct a new <input> element */
          newInput = document.createElement('input');
          newInput.type = 'button';

          /* Set up the attributes */
          functionCall = 'resetLinkedInputs(\'surge-number-' + i +
                         '\', \'surge-range-' + i + '\')';
          newInput.setAttribute('onclick', functionCall);
          newInput.value = 'Reset surges';

          /* Insert the new <input> into the <span> */
          eachSpan.appendChild(newInput);
        }
      }
    }
  }
}
addOnloadHook(activateCharacterSheet);

/* Called by linked <input> elements constructed by activateCharacterSheet() */
function updateLinkedInputs(sourceInputId, targetInputId)
{
  var targetInput;

  targetInput = document.getElementById(targetInputId);
  if(targetInput)
    targetInput.value = document.getElementById(sourceInputId).value;
}

function resetLinkedInputs(firstInputId, secondInputId)
{
  var firstInput, secondInput;

  firstInput = document.getElementById(firstInputId);
  if(firstInput)
    firstInput.value = firstInput.defaultValue;

  secondInput = document.getElementById(secondInputId);
  if(secondInput)
    secondInput.value = secondInput.defaultValue;
}