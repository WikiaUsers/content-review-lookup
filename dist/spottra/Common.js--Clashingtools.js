function timeStamp_Clashingtools_js() {
  return "2013.11.12 02:01 (UTC-8)";
}

/*
 * Some 'constants', since JavaScript really doesn't have the concept.
 */
function clashingToolConstants(constantName) {
   switch (constantName) {
      case "maxTHLevel":
         return 10;
      case "numBarracks":
         return 4;
      case "numDarkBarracks":
         return 2;
      case "defaultHeight":
         return "50";
      case "defaultWidth":
         return "50";
      case "smallHeight":
         return "25";
      case "smallWidth":
         return "25";
      case "defaultFontSize":
         return "11px";
      case "largerFontSize":
         return "14px";
      case "normalDistBG":
         return "#eee";
      case "overloadDistBG":
         return "#fdd";
      case "maximumHousingSpace":
         return 240;
      case "detailItemsPerRow":
         return 4;
   }
}

/*
 * This is set when we plan to update more than one element so
 * we don't continually call the update function.
 */
var clashingToolIgnoreUpdate = false;

/* 
 * Initial function to create all the associated controls. All locations are
 * set by div elements with class "dropdown", "image", "text", etc.
 * Any events are ignored (with "clashingToolIgnoreEvent") until the entire
 * creation process is finished.
 * Some span elements are created explicitly in the file itself. Those we will
 * grab at the beginning and just set the font size appropriately (so everybody
 * uses the same default font size).
 */
function createClashingToolControls() {
   /* Exit if we're not on the right page */
   if (!document.getElementById("clashingtools-error"))
      return;

   /* Let's not cascade any updates while we build the controls */
   clashingToolIgnoreUpdate = true;

   var troopTypes        = clashingToolValidTroopTypes();
   var divElems          = document.getElementsByTagName("div");
   var barracksArray     = [];
   var darkBarracksArray = [];
   var i                 = 0;
   var j                 = 0;

   /* 
    * Set up an array of barracks names so we don't have to update a lot of
    * lines if a new one ever gets added.
    */
   for (i = 0; i < clashingToolConstants("numBarracks"); i ++) {
      barracksArray[i] = "Barracks" + (i + 1);

      var spanElem = document.getElementById("text-" +
         barracksArray[i].toLowerCase() + "-Time");
      spanElem.style.fontSize = clashingToolConstants("defaultFontSize");

      for (j = 0; j < troopTypes.length; j ++) {
         spanElem = document.getElementById("text-" + 
            barracksArray[i].toLowerCase() + "-" + troopTypes[j]);

         // Set the default font size.
         if (spanElem)
            spanElem.style.fontSize = clashingToolConstants("defaultFontSize");
      }
   }

   /* 
    * Do the same thing for dark barracks.
    */
   for (i = 0; i < clashingToolConstants("numDarkBarracks"); i ++) {
      darkBarracksArray[i] = "DarkBarracks" + (i + 1);

      var dSpanElem = document.getElementById("text-" +
         darkBarracksArray[i].toLowerCase() + "-Time");
      dSpanElem.style.fontSize = clashingToolConstants("defaultFontSize");

      for (j = 0; j < troopTypes.length; j ++) {
         dSpanElem = document.getElementById("text-" + 
            darkBarracksArray[i].toLowerCase() + "-" + troopTypes[j]);

         // Set the default font size.
         if (dSpanElem)
            dSpanElem.style.fontSize = clashingToolConstants("defaultFontSize");
      }
   }

   // Set the default font size for the statistics fields.
   var statElems = document.getElementsByTagName("p");
   for (i = 0; i < statElems.length; i ++) {
      if (statElems[i].getAttribute("class") == "stat")
         statElems[i].style.fontSize = clashingToolConstants("defaultFontSize");
   }

   // Set the default font size for the stalkulator as well.
   var thSpanElem = document.getElementById("span-stalk-defending-town-hall");
   thSpanElem.style.fontSize = clashingToolConstants("defaultFontSize");
   var thSpanElem = document.getElementById("span-stalk-attacking-town-hall");
   thSpanElem.style.fontSize = clashingToolConstants("defaultFontSize");

   for (i = 0; i < divElems.length; i ++) {
      /* Create the error bar */
      if (divElems[i].getAttribute("class") == "error-message") {
         var errSpan  = document.createElement("span");
         errSpan.id   = "error-bar";
         errSpan.name = "error-bar";

         errSpan.style.fontSize   = clashingToolConstants("largerFontSize");
         errSpan.style.fontWeight = 'bold';
         errSpan.style.color      = 'red';
         divElems[i].appendChild(errSpan);      
      }
      else
      if (divElems[i].getAttribute("class") == "dropdown") {
         var ddName = divElems[i].getAttribute("data-name");

         if (barracksArray.indexOf(ddName) >= 0) {
            createClashingToolDropdown(divElems[i], ddName, "barracks");
         }
         else
         if (darkBarracksArray.indexOf(ddName) >= 0) {
            createClashingToolDropdown(divElems[i], ddName, "dark barracks");
         }
         else
         if (troopTypes.indexOf(ddName) >= 0) {
            createClashingToolDropdown(divElems[i], ddName, "troop");
         }
         else
         if (ddName == "stalk-defending-town-hall" ||
             ddName == "stalk-attacking-town-hall") {
            createClashingToolDropdown(divElems[i], ddName, "town hall", 2);
         }
      }
      else
      if (divElems[i].getAttribute("class") == "image") {
         var imgName = divElems[i].getAttribute("data-name");

         if (barracksArray.indexOf(imgName) >= 0) {
            var imgType = divElems[i].getAttribute("data-type");

            if (imgType == "small")
               createClashingToolImage(divElems[i], imgName, "barracks-small");
            else
               createClashingToolImage(divElems[i], imgName, "barracks");
         }
         else if (darkBarracksArray.indexOf(imgName) >= 0) {
            var imgType = divElems[i].getAttribute("data-type");

            if (imgType == "small")
               createClashingToolImage(divElems[i], imgName,
                  "dark barracks-small");
            else
               createClashingToolImage(divElems[i], imgName, "dark barracks");
         }
         else if (imgName == "ArmyCamp") {
            createClashingToolImage(divElems[i], imgName, "army camp");
         }
         else if (imgName == "stalk-defending-town-hall" ||
            imgName == "stalk-attacking-town-hall") {
            createClashingToolImage(divElems[i], imgName, "town hall");
         }
      }
      else
      if (divElems[i].getAttribute("class") == "textbox") {
         var txtName = divElems[i].getAttribute("data-name");

         if (barracksArray.indexOf(txtName) >= 0) {
            createClashingToolText(divElems[i], txtName, "barracks");
         }
         else
         if (darkBarracksArray.indexOf(txtName) >= 0) {
            createClashingToolText(divElems[i], txtName, "dark barracks");
         }
         else
         if (txtName == "ArmyCamp") {
            createClashingToolText(divElems[i], txtName, "army camp");
         }
         else
         if (troopTypes.indexOf(txtName) >= 0) {
            createClashingToolText(divElems[i], txtName, "troop num");
         }
         else
         if (clashingToolTroopSuffixIndex(txtName, "Cost") >= 0) {
            createClashingToolText(divElems[i], txtName, "troop cost");
         }
         else
         if (clashingToolTroopSuffixIndex(txtName, "Time") >= 0) {
            createClashingToolText(divElems[i], txtName, "troop time");
         }
         else
         if (txtName == "TotalElixirHousingSpace" ||
             txtName == "TotalElixirCost" ||
             txtName == "TotalDarkElixirHousingSpace" ||
             txtName == "TotalDarkElixirCost") {
            createClashingToolText(divElems[i], txtName, "total");
         }
      }
      else
      if (divElems[i].getAttribute("class") == "ct-button") {
         var btnName = divElems[i].getAttribute("data-name");

         createClashingToolButton(divElems[i], btnName, "button");
      }
      else
      if (divElems[i].getAttribute("class") == "checkbox") {
         var chkName = divElems[i].getAttribute("data-name");

         createClashingToolCheckbox(divElems[i], chkName, "checkbox");
      }
      else
      if (divElems[i].getAttribute("class") == "radio") {
         var optName = divElems[i].getAttribute("data-name");

         if (optName == "stalk-enter-totals" ||
             optName == "stalk-enter-individual-totals" ||
             optName == "stalk-enter-details")
            createClashingToolRadioButton(divElems[i], optName, "mode");
      }
      else
      if (divElems[i].getAttribute("id") == "stalkulator-table") {
         createStalkulatorTable(divElems[i]);
      }
      else
      if (divElems[i].getAttribute("id") == "stalkulator-results") {
         createStalkulatorResults(divElems[i]);
      }
   }

   /* Re-enable updates and explicitly run an update */
   clashingToolIgnoreUpdate = false;
   updateClashingTool();
   updateClashingTool2();

   /* Simulate a radio button click to select the appropriate panel */
   updateClashingToolStalkMode();
}

/*
 * Creates dropdown menus where appropriate.
 */
function createClashingToolDropdown(ddElem, ddName, ddType, ddPage) {
   // Default to page 1.
   if (!ddPage)
      ddPage = 1;

   /* Clear the div element first */
   ddElem.innerHTML = "";

   var ddSelect  = document.createElement("select");
   ddSelect.id   = "dropdown-" + ddName;
   ddSelect.name = "dropdown-" + ddName;
   ddSelect.style.fontSize = clashingToolConstants("defaultFontSize");

   if (ddPage == 1)
      ddSelect.setAttribute("onChange", "updateClashingTool();");
   else if (ddPage == 2)
      ddSelect.setAttribute("onChange", "updateClashingTool2();");

   /* Get the cookie value, if it exists */
   var cValue = retrieveStorageValue('clashingTool', ddSelect.id);

   if (ddType == "barracks") {
      for (var i = 0; i <= 10; i ++) {
         var ddOption  = document.createElement("option");
         ddOption.text = i;
         ddOption.style.fontSize = clashingToolConstants("defaultFontSize");

         /* Select the option if it's our saved value */
         if (cValue == ("" + i))
            ddOption.selected = true;

         try {
            // for IE earlier than version 8
            ddSelect.add(ddOption, ddSelect.options[null]);
         }
         catch (e) {
            ddSelect.add(ddOption, null);
         }
      }

      ddElem.appendChild(ddSelect);
   }
   else if (ddType == "dark barracks") {
      for (var i = 0; i <= 5; i ++) {
         var ddOption  = document.createElement("option");
         ddOption.text = i;
         ddOption.style.fontSize = clashingToolConstants("defaultFontSize");

         /* Select the option if it's our saved value */
         if (cValue == ("" + i))
            ddOption.selected = true;

         try {
            // for IE earlier than version 8
            ddSelect.add(ddOption, ddSelect.options[null]);
         }
         catch (e) {
            ddSelect.add(ddOption, null);
         }
      }

      ddElem.appendChild(ddSelect);
   }
   else if (ddType == "troop") {
      var numLevels = clashingToolTroopInformation(ddName, 'levels');

      for (var i = 1; i <= numLevels; i ++) {
         var ddOption = document.createElement("option");
         ddOption.text = i;
         ddOption.style.fontSize = clashingToolConstants("defaultFontSize");

         /* Select the option if it's our saved value */
         if (cValue == ("" + i))
            ddOption.selected = true;

         try {
            // for IE earlier than version 8
            ddSelect.add(ddOption, ddSelect.options[null]);
         }
         catch (e) {
            ddSelect.add(ddOption, null);
         }
      }

      ddElem.appendChild(ddSelect);
   }
   else if (ddType == "town hall") {
      var thMax = clashingToolConstants("maxTHLevel");

      for (var i = 1; i <= thMax; i ++) {
         var ddOption = document.createElement("option");
         ddOption.text = i;
         ddOption.style.fontSize = clashingToolConstants("defaultFontSize");

         /* Select the option if it's our saved value */
         if (cValue == ("" + i))
            ddOption.selected = true;

         try {
            // for IE earlier than version 8
            ddSelect.add(ddOption, ddSelect.options[null]);
         }
         catch (e) {
            ddSelect.add(ddOption, null);
         }
      }

      ddElem.appendChild(ddSelect);
   }
}

/*
 * Creates image placeholders where appropriate.
 */
function createClashingToolImage(imgElem, imgName, imgType) {
   var iHeight = clashingToolConstants("defaultHeight");
   var iWidth  = clashingToolConstants("defaultWidth");
   var iName   = imgName;
   var iType   = imgType;

   if (imgType == "barracks-small") {
      iType    = "barracks";
      iHeight  = clashingToolConstants("smallHeight");
      iWidth   = clashingToolConstants("smallWidth");
      iName   += "-small";
   }
   else if (imgType == "dark barracks-small") {
      iType    = "dark barracks";
      iHeight  = clashingToolConstants("smallHeight");
      iWidth   = clashingToolConstants("smallWidth");
      iName   += "-small";
   }

   /* Clear the div element first */
   imgElem.innerHTML = "";

   var imgImage    = document.createElement("img");
   imgImage.id     = "image-" + iName;
   imgImage.name   = "image-" + iName;

   imgImage.src    = clashingToolImageURL(iType, "0");
   imgImage.height = iHeight;
   imgImage.width  = iWidth;

   imgElem.appendChild(imgImage);
}

/*
 * Create textboxes (span/input elements) where appropriate.
 */
function createClashingToolText(txtElem, txtName, txtType) {
   var cValue = "";

   /* Clear the div element first */
   txtElem.innerHTML = "";

   if (txtType == "barracks") {
      var txtSpan  = document.createElement("span");
      txtSpan.id   = "text-" + txtName;
      txtSpan.name = "text-" + txtName;

      txtSpan.innerHTML = "0 / 0";
      txtSpan.style.fontSize = clashingToolConstants("defaultFontSize");
      txtElem.appendChild(txtSpan);
   }
   else if (txtType == "dark barracks") {
      var txtSpan  = document.createElement("span");
      txtSpan.id   = "text-" + txtName;
      txtSpan.name = "text-" + txtName;

      txtSpan.innerHTML = "0 / 0";
      txtSpan.style.fontSize = clashingToolConstants("defaultFontSize");
      txtElem.appendChild(txtSpan);
   }
   else if (txtType == "army camp") {
      var txtSpan       = document.createElement("span");
      txtSpan.id        = "text-"  + txtName;
      txtSpan.name      = "text-"  + txtName;
      txtSpan.innerHTML = "0 / ";
      txtSpan.style.fontSize = clashingToolConstants("defaultFontSize");
      txtElem.appendChild(txtSpan);

      var txtInput   = document.createElement("input");
      txtInput.id    = "input-" + txtName;
      txtInput.name  = "input-" + txtName;
      txtInput.size  = 3;

      /* Get cookie value if it exists */
      cValue = retrieveStorageValue('clashingTool', txtInput.id);

      if (cValue == "")
         cValue = "0";

      txtInput.value = cValue;

      txtInput.style.fontSize = clashingToolConstants("defaultFontSize");
      txtInput.setAttribute("onBlur", "updateClashingTool();");
      txtElem.appendChild(txtInput);
   }
   else if (txtType == "troop num") {
      var txtInput   = document.createElement("input");
      txtInput.id    = "input-" + txtName;
      txtInput.name  = "input-" + txtName;
      txtInput.size  = 1;

      /* Get cookie value if it exists */
      cValue = retrieveStorageValue('clashingTool', txtInput.id);

      if (cValue == "")
         cValue = "0";

      txtInput.value = cValue;

      txtInput.style.fontSize = clashingToolConstants("defaultFontSize");
      txtInput.setAttribute("onBlur", "updateClashingTool();");
      txtElem.appendChild(txtInput);
   }
   else if (txtType == "troop cost") {
      var txtSpan       = document.createElement("span");
      txtSpan.id        = "text-"  + txtName;
      txtSpan.name      = "text-"  + txtName;
      txtSpan.innerHTML = "0";
      txtSpan.style.fontSize = clashingToolConstants("defaultFontSize");
      txtElem.appendChild(txtSpan);
   }
   else if (txtType == "troop time") {
      var txtSpan       = document.createElement("span");
      txtSpan.id        = "text-"  + txtName;
      txtSpan.name      = "text-"  + txtName;
      txtSpan.innerHTML = "00:00:00";
      txtSpan.style.fontSize = clashingToolConstants("defaultFontSize");
      txtElem.appendChild(txtSpan);
   }
   else if (txtType == "total") {
      var txtSpan       = document.createElement("span");
      txtSpan.id        = "text-"  + txtName;
      txtSpan.name      = "text-"  + txtName;

      if (txtName == "TotalElixirHousingSpace")
         txtSpan.innerHTML = "0 / 0";
      else if (txtName == "TotalElixirCost")
         txtSpan.innerHTML = "0";
      else if (txtName == "TotalDarkElixirHousingSpace")
         txtSpan.innerHTML = "0 / 0";
      else if (txtName == "TotalDarkElixirCost")
         txtSpan.innerHTML = "0";

      txtSpan.style.fontSize = clashingToolConstants("largerFontSize");
      txtSpan.style.fontWeight = 'bold';
      txtElem.appendChild(txtSpan);
   }
}

/*
 * Create button elements where appropriate.
 */
function createClashingToolButton(btnElem, btnName, btnType) {
   /* Clear the div element first */
   btnElem.innerHTML = "";

   if (btnType == "button") {
      var btnInput   = document.createElement("input");
      btnInput.type  = "button";

      if (btnName == "ElixirClearLevel") {
         btnInput.value = "Clear Level";
         btnInput.setAttribute("onClick", "clashingToolClear(1);");
      }
      else if (btnName == "ElixirClearQuantity") {
         btnInput.value = "Clear Quantity";
         btnInput.setAttribute("onClick", "clashingToolClear(2);");
      }
      else if (btnName == "ElixirClearAll") {
         btnInput.value = "Clear All";
         btnInput.setAttribute("onClick", "clashingToolClear(0);");
      }
      else if (btnName == "DarkElixirClearLevel") {
         btnInput.value = "Clear Level";
         btnInput.setAttribute("onClick", "clashingToolClear(1, true);");
      }
      else if (btnName == "DarkElixirClearQuantity") {
         btnInput.value = "Clear Quantity";
         btnInput.setAttribute("onClick", "clashingToolClear(2, true);");
      }
      else if (btnName == "DarkElixirClearAll") {
         btnInput.value = "Clear All";
         btnInput.setAttribute("onClick", "clashingToolClear(0, true);");
      }
      else if (btnName == "stalkulator-clear-current") {
         btnInput.value = "Clear Current";
         btnInput.setAttribute("onClick", "clashingToolStalkulatorClear();");
      }
      else if (btnName == "stalkulator-clear-all") {
         btnInput.value = "Clear All";
         btnInput.setAttribute("onClick", "clashingToolStalkulatorClear(true);");
      }
   }

   btnElem.appendChild(btnInput);
}

/*
 * Create checkbox elements where appropriate.
 */
function createClashingToolCheckbox(chkElem, chkName, chkType) {
   /* Clear the div element first */
   chkElem.innerHTML = "";

   if (chkType == "checkbox") {
      var chkInput   = document.createElement("input");
      chkInput.id    = "checkbox-" + chkName;
      chkInput.name  = "checkbox-" + chkName;
      chkInput.type  = "checkbox";

      /* Get cookie value if it exists */
      var cValue = retrieveStorageValue('clashingTool', chkInput.id);
      chkInput.checked = (cValue == "checked");

      chkInput.setAttribute("onClick", "updateClashingTool();");
      chkElem.appendChild(chkInput);

      var chkSpan = document.createElement("span");
      chkSpan.style.fontSize = clashingToolConstants("defaultFontSize");

      if (chkName == "ElixirIgnoreQueueLength") {
         chkInput.title = "Allow the calculator to fill barracks beyond " +
            "their maximum queue length if doing so would result in a shorter " +
            "overall training time.";

         chkSpan.innerHTML = "Allow long barracks queues";
         chkSpan.title     = chkInput.title;
      }
      else
      if (chkName == "DarkElixirIgnoreQueueLength") {
         chkInput.title = "Allow the calculator to fill dark barracks beyond " +
            "their maximum queue length if doing so would result in a shorter " +
            "overall training time.";

         chkSpan.innerHTML = "Allow long barracks queues";
         chkSpan.title     = chkInput.title;
      }

      chkElem.appendChild(chkSpan);
   }
}

/*
 * Create radio button elements where appropriate.
 */
function createClashingToolRadioButton(optElem, optName, optType) {
   /* Clear the div element first */
   optElem.innerHTML = "";

   var optGroup   = optElem.getAttribute("data-group");
   var optValue   = optElem.getAttribute("data-value");
   var optDefault = optElem.getAttribute("data-default");

   if (optType == "mode") {
      var optInput   = document.createElement("input");
      optInput.id    = "radio-" + optName;
      optInput.name  = optGroup;
      optInput.type  = "radio";
      optInput.value = optValue;

      /* Get cookie value if it exists */
      var cValue = retrieveStorageValue('clashingTool', optGroup);

      if (cValue)
         optInput.checked = (cValue == optInput.value);
      else
         optInput.checked = (optDefault == "checked");

      optInput.setAttribute("onClick", "updateClashingToolStalkMode();");
      optElem.appendChild(optInput);

      spanElem = document.createElement("span");
      spanElem.id = "span-" + optName;
      spanElem.style.fontSize = clashingToolConstants("defaultFontSize");
      spanElem.style.fontWeight = "bold";

      if (optName == "stalk-enter-totals")
         spanElem.innerHTML = "Enter Totals";
      else if (optName == "stalk-enter-individual-totals")
         spanElem.innerHTML = "Enter Storage and Collector Totals";
      else if (optName == "stalk-enter-details")
         spanElem.innerHTML = "Enter Details";

      optElem.appendChild(spanElem);
   }
}

/*
 * Function to create all of the dynamic table elements for the stalkulator.
 */
function createStalkulatorTable(divElem) {
   "use strict";
   // Clear the div element first
   divElem.innerHTML = "";

   var defaultSize   = 8;
   var defaultWidth  = clashingToolConstants("defaultWidth");
   var defaultHeight = clashingToolConstants("defaultHeight");
   var smallWidth    = clashingToolConstants("smallWidth");
   var smallHeight   = clashingToolConstants("smallHeight");
   var fontSize      = clashingToolConstants("defaultFontSize");
   var spanWidth     = "100px";
   var i             = 0;
   var cValue        = "";

   // Create totals elements
   var imgStalkTG              = document.createElement("img");
   imgStalkTG.id               = "image-stalk-totals-gold";
   imgStalkTG.height           = smallHeight;
   imgStalkTG.width            = smallWidth;
   imgStalkTG.src              = clashingToolImageURL("gold");
   var txtStalkTG              = document.createElement("input");
   txtStalkTG.id               = "textbox-stalk-totals-gold";
   txtStalkTG.size             = defaultSize;
   txtStalkTG.style.fontSize   = fontSize;
   var spnStalkTG              = document.createElement("span");
   spnStalkTG.id               = "span-stalk-totals-gold";
   spnStalkTG.width            = spanWidth;
   spnStalkTG.style.fontWeight = "bold";
   spnStalkTG.style.fontSize   = fontSize;

   cValue = retrieveStorageValue('clashingTool', txtStalkTG.id);
   txtStalkTG.value = (!cValue ? "0" : cValue);
   txtStalkTG.setAttribute("onBlur", "updateClashingTool2();");

   var imgStalkTE              = document.createElement("img");
   imgStalkTE.id               = "image-stalk-totals-elixir";
   imgStalkTE.height           = smallHeight;
   imgStalkTE.width            = smallWidth;
   imgStalkTE.src              = clashingToolImageURL("elixir");
   var txtStalkTE              = document.createElement("input");
   txtStalkTE.id               = "textbox-stalk-totals-elixir";
   txtStalkTE.size             = defaultSize;
   txtStalkTE.style.fontSize   = fontSize;
   var spnStalkTE              = document.createElement("span");
   spnStalkTE.id               = "span-stalk-totals-elixir";
   spnStalkTE.width            = spanWidth;
   spnStalkTE.style.fontWeight = "bold";
   spnStalkTE.style.fontSize   = fontSize;

   cValue = retrieveStorageValue('clashingTool', txtStalkTE.id);
   txtStalkTE.value = (!cValue ? "0" : cValue);
   txtStalkTE.setAttribute("onBlur", "updateClashingTool2();");

   var imgStalkTDE              = document.createElement("img");
   imgStalkTDE.id               = "image-stalk-totals-darkelixir";
   imgStalkTDE.height           = smallHeight;
   imgStalkTDE.width            = smallWidth;
   imgStalkTDE.src              = clashingToolImageURL("dark elixir");
   var txtStalkTDE              = document.createElement("input");
   txtStalkTDE.id               = "textbox-stalk-totals-darkelixir";
   txtStalkTDE.size             = defaultSize;
   txtStalkTDE.style.fontSize   = fontSize;
   var spnStalkTDE              = document.createElement("span");
   spnStalkTDE.id               = "span-stalk-totals-darkelixir";
   spnStalkTDE.width            = spanWidth;
   spnStalkTDE.style.fontWeight = "bold";
   spnStalkTDE.style.fontSize   = fontSize;

   cValue = retrieveStorageValue('clashingTool', txtStalkTDE.id);
   txtStalkTDE.value = (!cValue ? "0" : cValue);
   txtStalkTDE.setAttribute("onBlur", "updateClashingTool2();");

   // Create table for totals elements
   var tblTable = document.createElement("table");
   tblTable.id  = "stalkulator-table-totals";

   var divTable = document.createElement("div");
   divTable.id  = "div-stalkulator-table-totals";   
   divTable.appendChild(tblTable);

   var tblTR = document.createElement("tr");
   var tblTD = document.createElement("td");
   tblTD.colSpan = 3;
   var spnAssumptions = document.createElement("span");
   spnAssumptions.id = "span-stalk-totals-assumptions";
   spnAssumptions.style.fontWeight = "bold";
   spnAssumptions.style.fontSize = fontSize;
   spnAssumptions.innerHTML =
      "Calculation assumes all resources are in Storage(s) first, then Collector(s).";
   tblTD.appendChild(spnAssumptions);
   tblTR.appendChild(tblTD);
   tblTable.appendChild(tblTR);

   // Gold
   tblTR    = document.createElement("tr");
   tblTR.id = 'stalk-totals-row-gold';

   tblTD = document.createElement("td");
   tblTD.style.textAlign = "right";
   tblTD.appendChild(imgStalkTG);
   tblTR.appendChild(tblTD);

   tblTD = document.createElement("td");
   tblTD.appendChild(txtStalkTG);
   tblTR.appendChild(tblTD);

   tblTD = document.createElement("td");
   tblTD.style.width = spanWidth;
   tblTD.appendChild(spnStalkTG);
   tblTR.appendChild(tblTD);

   tblTable.appendChild(tblTR);

   // Elixir
   tblTR    = document.createElement("tr");
   tblTR.id = 'stalk-totals-row-elixir';

   tblTD = document.createElement("td");
   tblTD.style.textAlign = "right";
   tblTD.appendChild(imgStalkTE);
   tblTR.appendChild(tblTD);

   tblTD = document.createElement("td");
   tblTD.appendChild(txtStalkTE);
   tblTR.appendChild(tblTD);

   tblTD = document.createElement("td");
   tblTD.appendChild(spnStalkTE);
   tblTR.appendChild(tblTD);

   tblTable.appendChild(tblTR);

   // Dark Elixir
   tblTR    = document.createElement("tr");
   tblTR.id = 'stalk-totals-row-dark-elixir';

   tblTD = document.createElement("td");
   tblTD.style.textAlign = "right";
   tblTD.appendChild(imgStalkTDE);
   tblTR.appendChild(tblTD);

   tblTD = document.createElement("td");
   tblTD.appendChild(txtStalkTDE);
   tblTR.appendChild(tblTD);

   tblTD = document.createElement("td");
   tblTD.appendChild(spnStalkTDE);
   tblTR.appendChild(tblTD);

   tblTable.appendChild(tblTR);

   // Add the table to the div element
   var divTable = document.createElement("div");
   divTable.id  = "div-" + tblTable.id;   
   divTable.appendChild(tblTable);
   divElem.appendChild(divTable);

   // Create totals for individual total elements
   var imgStalkTGM            = document.createElement("img");
   imgStalkTGM.id             = "image-stalk-totals-goldmines";
   imgStalkTGM.height         = defaultHeight;
   imgStalkTGM.width          = defaultWidth;
   var txtStalkTGM            = document.createElement("input");
   txtStalkTGM.id             = "textbox-stalk-totals-goldmines";
   txtStalkTGM.size           = defaultSize;
   txtStalkTGM.style.fontSize = fontSize;

   cValue = retrieveStorageValue('clashingTool', txtStalkTGM.id);
   txtStalkTGM.value = (!cValue ? "0" : cValue);
   txtStalkTGM.setAttribute("onBlur", "updateClashingTool2();");

   var imgStalkTEC            = document.createElement("img");
   imgStalkTEC.id             = "image-stalk-totals-elixircollectors";
   imgStalkTEC.height         = defaultHeight;
   imgStalkTEC.width          = defaultWidth;
   var txtStalkTEC            = document.createElement("input");
   txtStalkTEC.id             = "textbox-stalk-totals-elixircollectors";
   txtStalkTEC.size           = defaultSize;
   txtStalkTEC.style.fontSize = fontSize;

   cValue = retrieveStorageValue('clashingTool', txtStalkTEC.id);
   txtStalkTEC.value = (!cValue ? "0" : cValue);
   txtStalkTEC.setAttribute("onBlur", "updateClashingTool2();");

   var imgStalkTDED            = document.createElement("img");
   imgStalkTDED.id             = "image-stalk-totals-darkelixirdrills";
   imgStalkTDED.height         = defaultHeight;
   imgStalkTDED.width          = defaultWidth;
   var txtStalkTDED            = document.createElement("input");
   txtStalkTDED.id             = "textbox-stalk-totals-darkelixirdrills";
   txtStalkTDED.size           = defaultSize;
   txtStalkTDED.style.fontSize = fontSize;

   cValue = retrieveStorageValue('clashingTool', txtStalkTDED.id);
   txtStalkTDED.value = (!cValue ? "0" : cValue);
   txtStalkTDED.setAttribute("onBlur", "updateClashingTool2();");

   var imgStalkTGS            = document.createElement("img");
   imgStalkTGS.id             = "image-stalk-totals-goldstorage";
   imgStalkTGS.height         = defaultHeight;
   imgStalkTGS.width          = defaultWidth;
   var txtStalkTGS            = document.createElement("input");
   txtStalkTGS.id             = "textbox-stalk-totals-goldstorage";
   txtStalkTGS.size           = defaultSize;
   txtStalkTGS.style.fontSize = fontSize;

   cValue = retrieveStorageValue('clashingTool', txtStalkTGS.id);
   txtStalkTGS.value = (!cValue ? "0" : cValue);
   txtStalkTGS.setAttribute("onBlur", "updateClashingTool2();");

   var imgStalkTES            = document.createElement("img");
   imgStalkTES.id             = "image-stalk-totals-elixirstorage";
   imgStalkTES.height         = defaultHeight;
   imgStalkTES.width          = defaultWidth;
   var txtStalkTES            = document.createElement("input");
   txtStalkTES.id             = "textbox-stalk-totals-elixirstorage";
   txtStalkTES.size           = defaultSize;
   txtStalkTES.style.fontSize = fontSize;

   cValue = retrieveStorageValue('clashingTool', txtStalkTES.id);
   txtStalkTES.value = (!cValue ? "0" : cValue);
   txtStalkTES.setAttribute("onBlur", "updateClashingTool2();");

   var imgStalkTDES            = document.createElement("img");
   imgStalkTDES.id             = "image-stalk-totals-darkelixirstorage";
   imgStalkTDES.height         = defaultHeight;
   imgStalkTDES.width          = defaultWidth;
   var txtStalkTDES            = document.createElement("input");
   txtStalkTDES.id             = "textbox-stalk-totals-darkelixirstorage";
   txtStalkTDES.size           = defaultSize;
   txtStalkTDES.style.fontSize = fontSize;

   cValue = retrieveStorageValue('clashingTool', txtStalkTDES.id);
   txtStalkTDES.value = (!cValue ? "0" : cValue);
   txtStalkTDES.setAttribute("onBlur", "updateClashingTool2();");

   // Create table for storage/collector elements
   tblTable = document.createElement("table");
   tblTable.id  = "stalkulator-table-individual-totals";

   // Row 1 - Gold storage and mines
   tblTR    = document.createElement("tr");
   tblTR.id = 'stalk-individual-totals-row-gold';

   tblTD = document.createElement("td");
   tblTD.appendChild(imgStalkTGS);
   tblTD.appendChild(txtStalkTGS);
   tblTR.appendChild(tblTD);

   tblTD = document.createElement("td");
   tblTD.appendChild(imgStalkTGM);
   tblTD.appendChild(txtStalkTGM);
   tblTR.appendChild(tblTD);

   tblTable.appendChild(tblTR);

   // Row 2 - Elixir storage and collectors
   tblTR    = document.createElement("tr");
   tblTR.id = 'stalk-individual-totals-row-elixir';

   tblTD = document.createElement("td");
   tblTD.appendChild(imgStalkTES);
   tblTD.appendChild(txtStalkTES);
   tblTR.appendChild(tblTD);

   tblTD = document.createElement("td");
   tblTD.appendChild(imgStalkTEC);
   tblTD.appendChild(txtStalkTEC);
   tblTR.appendChild(tblTD);

   tblTable.appendChild(tblTR);

   // Row 3 - Dark Elixir storage and drills
   tblTR    = document.createElement("tr");
   tblTR.id = 'stalk-individual-totals-row-dark-elixir';

   tblTD    = document.createElement("td");
   tblTD.id = 'stalk-individual-totals-dark-elixir-storage';
   tblTD.appendChild(imgStalkTDES);
   tblTD.appendChild(txtStalkTDES);
   tblTR.appendChild(tblTD);

   tblTD    = document.createElement("td");
   tblTD.id = 'stalk-individual-totals-dark-elixir-drill';
   tblTD.appendChild(imgStalkTDED);
   tblTD.appendChild(txtStalkTDED);
   tblTR.appendChild(tblTD);

   tblTable.appendChild(tblTR);

   // Add the table to the div element
   divTable = document.createElement("div");
   divTable.id  = "div-" + tblTable.id;
   divTable.appendChild(tblTable);
   divElem.appendChild(divTable);

   // Create detail elements
   var maxTHLevel = clashingToolConstants("maxTHLevel");
   var numGS      = clashingToolInfoByTownHall('gold storages',        maxTHLevel);
   var numES      = clashingToolInfoByTownHall('elixir storages',      maxTHLevel);
   var numDES     = clashingToolInfoByTownHall('dark elixir storages', maxTHLevel);
   var numGM      = clashingToolInfoByTownHall('gold mines',           maxTHLevel);
   var numEC      = clashingToolInfoByTownHall('elixir collectors',    maxTHLevel);
   var numDED     = clashingToolInfoByTownHall('dark elixir drills',   maxTHLevel);

   var imgGS = [];
   var txtGS = [];

   for (i = 0; i < numGS; i ++) {
      imgGS[i]        = document.createElement("img");
      imgGS[i].id     = "image-stalk-details-goldstorage" + i;
      imgGS[i].height = defaultHeight;
      imgGS[i].width  = defaultWidth;

      txtGS[i]                = document.createElement("input");
      txtGS[i].id             = "textbox-stalk-details-goldstorage" + i;
      txtGS[i].size           = defaultSize;
      txtGS[i].style.fontSize = fontSize;

      cValue = retrieveStorageValue('clashingTool', txtGS[i].id);
      txtGS[i].value = (!cValue ? "0" : cValue);
      txtGS[i].setAttribute("onBlur", "updateClashingTool2();");
   }

   var imgES = [];
   var txtES = [];

   for (i = 0; i < numES; i ++) {
      imgES[i]        = document.createElement("img");
      imgES[i].id     = "image-stalk-details-elixirstorage" + i;
      imgES[i].height = defaultHeight;
      imgES[i].width  = defaultWidth;

      txtES[i]                = document.createElement("input");
      txtES[i].id             = "textbox-stalk-details-elixirstorage" + i;
      txtES[i].size           = defaultSize;
      txtES[i].style.fontSize = fontSize;

      cValue = retrieveStorageValue('clashingTool', txtES[i].id);
      txtES[i].value = (!cValue ? "0" : cValue);
      txtES[i].setAttribute("onBlur", "updateClashingTool2();");
   }

   var imgDES = [];
   var txtDES = [];

   for (i = 0; i < numDES; i ++) {
      imgDES[i]        = document.createElement("img");
      imgDES[i].id     = "image-stalk-details-darkelixirstorage" + i;
      imgDES[i].height = defaultHeight;
      imgDES[i].width  = defaultWidth;

      txtDES[i]                = document.createElement("input");
      txtDES[i].id             = "textbox-stalk-details-darkelixirstorage" + i;
      txtDES[i].size           = defaultSize;
      txtDES[i].style.fontSize = fontSize;

      cValue = retrieveStorageValue('clashingTool', txtDES[i].id);
      txtDES[i].value = (!cValue ? "0" : cValue);
      txtDES[i].setAttribute("onBlur", "updateClashingTool2();");
   }

   var imgGM = [];
   var txtGM = [];

   for (i = 0; i < numGM; i ++) {
      imgGM[i]        = document.createElement("img");
      imgGM[i].id     = "image-stalk-details-goldmine" + i;
      imgGM[i].height = defaultHeight;
      imgGM[i].width  = defaultWidth;

      txtGM[i]                = document.createElement("input");
      txtGM[i].id             = "textbox-stalk-details-goldmine" + i;
      txtGM[i].size           = defaultSize;
      txtGM[i].style.fontSize = fontSize;

      cValue = retrieveStorageValue('clashingTool', txtGM[i].id);
      txtGM[i].value = (!cValue ? "0" : cValue);
      txtGM[i].setAttribute("onBlur", "updateClashingTool2();");
   }

   var imgEC = [];
   var txtEC = [];

   for (i = 0; i < numEC; i ++) {
      imgEC[i]        = document.createElement("img");
      imgEC[i].id     = "image-stalk-details-elixircollector" + i;
      imgEC[i].height = defaultHeight;
      imgEC[i].width  = defaultWidth;

      txtEC[i]                = document.createElement("input");
      txtEC[i].id             = "textbox-stalk-details-elixircollector" + i;
      txtEC[i].size           = defaultSize;
      txtEC[i].style.fontSize = fontSize;

      cValue = retrieveStorageValue('clashingTool', txtEC[i].id);
      txtEC[i].value = (!cValue ? "0" : cValue);
      txtEC[i].setAttribute("onBlur", "updateClashingTool2();");
   }

   var imgDED = [];
   var txtDED = [];

   for (i = 0; i < numDED; i ++) {
      imgDED[i]        = document.createElement("img");
      imgDED[i].id     = "image-stalk-details-darkelixirdrill" + i;
      imgDED[i].height = defaultHeight;
      imgDED[i].width  = defaultWidth;

      txtDED[i]                = document.createElement("input");
      txtDED[i].id             = "textbox-stalk-details-darkelixirdrill" + i;
      txtDED[i].size           = defaultSize;
      txtDED[i].style.fontSize = fontSize;

      cValue = retrieveStorageValue('clashingTool', txtDED[i].id);
      txtDED[i].value = (!cValue ? "0" : cValue);
      txtDED[i].setAttribute("onBlur", "updateClashingTool2();");
   }

   // Create table for detail elements
   tblTable = document.createElement("table");
   tblTable.id  = "stalkulator-table-details";

   // Get number of items per row
   var perRow = clashingToolConstants('detailItemsPerRow');
   var idx    = 0;

   // Gold
   tblTR                    = document.createElement("tr");
   tblTR.id                 = 'stalk-details-row-header-gold';
   tblTD                    = document.createElement("td");
   tblTD.colSpan            = '' + perRow;
   tblTD.style.textAlign    = 'left';
   tblTD.style.border       = '0px';
   tblTD.style.borderBottom = '1px solid black';
   var spnElem              = document.createElement("span");
   spnElem.innerHTML        = "Gold";
   tblTD.appendChild(spnElem);
   tblTR.appendChild(tblTD);
   tblTable.appendChild(tblTR);
   
   // Gold storages
   tblTR = [];

   for (i = 0; i < imgGS.length; i += perRow) {
      idx = Math.floor(i / perRow);
      tblTR[idx]    = document.createElement("tr");
      tblTR[idx].id = 'stalk-details-row-gold-storage-' + idx;
   }

   for (i = 0; i < imgGS.length; i ++) {
      idx = Math.floor(i / perRow);
      tblTD    = document.createElement("td");
      tblTD.id = 'stalk-details-gold-storage-' + i;
      tblTD.appendChild(imgGS[i]);
      tblTD.appendChild(txtGS[i]);
      tblTR[idx].appendChild(tblTD);
   }

   for (i = 0; i < tblTR.length; i ++)
      tblTable.appendChild(tblTR[i]);

   // Gold mines
   tblTR = [];

   for (i = 0; i < imgGM.length; i += perRow) {
      idx = Math.floor(i / perRow);
      tblTR[idx]    = document.createElement("tr");
      tblTR[idx].id = 'stalk-details-row-gold-mine-' + idx;
   }

   for (i = 0; i < imgGM.length; i ++) {
      idx = Math.floor(i / perRow);
      tblTD    = document.createElement("td");
      tblTD.id = 'stalk-details-gold-mine-' + i;
      tblTD.appendChild(imgGM[i]);
      tblTD.appendChild(txtGM[i]);
      tblTR[idx].appendChild(tblTD);
   }

   for (i = 0; i < tblTR.length; i ++)
      tblTable.appendChild(tblTR[i]);

   // Elixir
   tblTR                    = document.createElement("tr");
   tblTR.id                 = 'stalk-details-row-header-elixir';
   tblTD                    = document.createElement("td");
   tblTD.colSpan            = '' + perRow;
   tblTD.style.textAlign    = 'left';
   tblTD.style.border       = '0px';
   tblTD.style.borderBottom = '1px solid black';
   var spnElem              = document.createElement("span");
   spnElem.innerHTML        = "Elixir";
   tblTD.appendChild(spnElem);
   tblTR.appendChild(tblTD);
   tblTable.appendChild(tblTR);

   // Elixir storages
   tblTR = [];

   for (i = 0; i < imgES.length; i += perRow) {
      idx = Math.floor(i / perRow);
      tblTR[idx]    = document.createElement("tr");
      tblTR[idx].id = 'stalk-details-row-elixir-storage-' + idx;
   }

   for (i = 0; i < imgES.length; i ++) {
      idx = Math.floor(i / perRow);
      tblTD    = document.createElement("td");
      tblTD.id = 'stalk-details-elixir-storage-' + i;
      tblTD.appendChild(imgES[i]);
      tblTD.appendChild(txtES[i]);
      tblTR[idx].appendChild(tblTD);
   }

   for (i = 0; i < tblTR.length; i ++)
      tblTable.appendChild(tblTR[i]);

   // Elixir collectors
   tblTR = [];

   for (i = 0; i < imgEC.length; i += perRow) {
      idx = Math.floor(i / perRow);
      tblTR[idx]    = document.createElement("tr");
      tblTR[idx].id = 'stalk-details-row-elixir-collector-' + idx;
   }

   for (i = 0; i < imgEC.length; i ++) {
      idx = Math.floor(i / perRow);
      tblTD    = document.createElement("td");
      tblTD.id = 'stalk-details-elixir-collector-' + i;
      tblTD.appendChild(imgEC[i]);
      tblTD.appendChild(txtEC[i]);
      tblTR[idx].appendChild(tblTD);
   }

   for (i = 0; i < tblTR.length; i ++)
      tblTable.appendChild(tblTR[i]);

   // Dark Elixir
   tblTR                    = document.createElement("tr");
   tblTR.id                 = 'stalk-details-row-header-dark-elixir';
   tblTD                    = document.createElement("td");
   tblTD.colSpan            = '' + perRow;
   tblTD.style.textAlign    = 'left';
   tblTD.style.border       = '0px';
   tblTD.style.borderBottom = '1px solid black';
   var spnElem              = document.createElement("span");
   spnElem.innerHTML        = "Dark Elixir";
   tblTD.appendChild(spnElem);
   tblTR.appendChild(tblTD);
   tblTable.appendChild(tblTR);

   // Dark elixir storages
   tblTR = [];

   for (i = 0; i < imgDES.length; i += perRow) {
      idx = Math.floor(i / perRow);
      tblTR[idx]    = document.createElement("tr");
      tblTR[idx].id = 'stalk-details-row-dark-elixir-storage-' + idx;
   }

   for (i = 0; i < imgDES.length; i ++) {
      idx = Math.floor(i / perRow);
      tblTD = document.createElement("td");
      tblTD.id = 'stalk-details-dark-elixir-storage-' + i;
      tblTD.appendChild(imgDES[i]);
      tblTD.appendChild(txtDES[i]);
      tblTR[idx].appendChild(tblTD);
   }

   for (i = 0; i < tblTR.length; i ++)
      tblTable.appendChild(tblTR[i]);

   // Dark elixir drills
   tblTR = [];

   for (i = 0; i < imgDED.length; i += perRow) {
      idx = Math.floor(i / perRow);
      tblTR[idx]    = document.createElement("tr");
      tblTR[idx].id = 'stalk-details-row-dark-elixir-drill-' + idx;
   }

   for (i = 0; i < imgDED.length; i ++) {
      idx = Math.floor(i / perRow);
      tblTD    = document.createElement("td");
      tblTD.id = 'stalk-details-dark-elixir-drill-' + i;
      tblTD.appendChild(imgDED[i]);
      tblTD.appendChild(txtDED[i]);
      tblTR[idx].appendChild(tblTD);
   }

   for (i = 0; i < tblTR.length; i ++)
      tblTable.appendChild(tblTR[i]);

   // Add the table to the div element
   divTable = document.createElement("div");
   divTable.id  = "div-" + tblTable.id;
   divTable.appendChild(tblTable);
   divElem.appendChild(divTable);
}

function createStalkulatorResults(divElem) {
   "use strict";
   // Clear the div element first
   divElem.innerHTML = "";

   var smallWidth    = clashingToolConstants("smallWidth");
   var smallHeight   = clashingToolConstants("smallHeight");
   var fontSize      = clashingToolConstants("defaultFontSize");
   var spanWidth     = "100px";

   var tblTable = document.createElement("table");
   tblTable.id    = 'stalk-results-table';
   tblTable.width = '100%';

   var tblTR = document.createElement("tr");
   tblTR.id = 'stalk-results-row';

   var tblTD = document.createElement("td");
   tblTD.id              = 'stalk-results-gold';
   tblTD.width           = '35%';
   tblTD.style.textAlign = 'right';

   var imgElem  = document.createElement("img");
   imgElem.id     = 'image-stalk-results-gold';
   imgElem.height = smallHeight;
   imgElem.width  = smallWidth;
   imgElem.src    = clashingToolImageURL('gold');

   var spnElem = document.createElement("span");
   spnElem.id               = 'span-stalk-results-gold';
   spnElem.width            = spanWidth;
   spnElem.style.fontWeight = "bold";
   spnElem.style.fontSize   = fontSize;

   tblTD.appendChild(imgElem);
   tblTD.appendChild(spnElem);
   tblTR.appendChild(tblTD);

   tblTD = document.createElement("td");
   tblTD.id              = 'stalk-results-elixir';
   tblTD.style.textAlign = 'center';

   imgElem  = document.createElement("img");
   imgElem.id     = 'image-stalk-results-elixir';
   imgElem.height = smallHeight;
   imgElem.width  = smallWidth;
   imgElem.src    = clashingToolImageURL('elixir');

   spnElem = document.createElement("span");
   spnElem.id               = 'span-stalk-results-elixir';
   spnElem.width            = spanWidth;
   spnElem.style.fontWeight = "bold";
   spnElem.style.fontSize   = fontSize;

   tblTD.appendChild(imgElem);
   tblTD.appendChild(spnElem);
   tblTR.appendChild(tblTD);

   tblTD = document.createElement("td");
   tblTD.id              = 'stalk-results-dark-elixir';
   tblTD.width           = '35%';
   tblTD.style.textAlign = 'left';

   imgElem  = document.createElement("img");
   imgElem.id     = 'image-stalk-results-dark-elixir';
   imgElem.height = smallHeight;
   imgElem.width  = smallWidth;
   imgElem.src    = clashingToolImageURL('dark elixir');

   spnElem = document.createElement("span");
   spnElem.id               = 'span-stalk-results-dark-elixir';
   spnElem.width            = spanWidth;
   spnElem.style.fontWeight = "bold";
   spnElem.style.fontSize   = fontSize;

   tblTD.appendChild(imgElem);
   tblTD.appendChild(spnElem);
   tblTR.appendChild(tblTD);
   tblTable.appendChild(tblTR);
   divElem.appendChild(tblTable);
}

/*
 * This is the trigger function that occurs when any element is changed.
 * If we're set to ignore updates, this function will not execute (typically
 * on page load, until all elements have been properly created.
 * In theory this should adjust the images associated with the Barracks drop-down
 * menus, etc.
 */
function updateClashingTool() {
   // If we're ignoring, just exit
   if (clashingToolIgnoreUpdate)
      return;

   // Let's not cause any recursion
   clashingToolIgnoreUpdate = true;

   var maxHousing      = clashingToolConstants("maximumHousingSpace");
   var numBarracks     = clashingToolConstants("numBarracks");
   var numDarkBarracks = clashingToolConstants("numDarkBarracks");
   var troopTypes      = clashingToolValidTroopTypes("elixir");
   var darkTroopTypes  = clashingToolValidTroopTypes("dark elixir");
   var errorOut        = false;
   var totalElixir     = 0;
   var totalDarkElixir = 0;
   var totalQueue      = 0;
   var reqBarracks     = 0;
   var reqDarkBarracks = 0;
   var reqSpace        = 0;
   var reqDarkSpace    = 0;
   var reqTime         = 0;
   var reqDarkTime     = 0;
   var i               = 0;
   var j               = 0;

   var ddBarracksElem          = [];
   var imgBarracksElem         = [];
   var imgSBarracksElem        = [];
   var txtBarracksElem         = [];
   var barracksLevel           = [];
   var barracksQueueLength     = [];
   var barracksQueueLeft       = [];
   var barracksQueueTime       = [];
   var barracksQueue           = [];

   var ddDarkBarracksElem      = [];
   var imgDarkBarracksElem     = [];
   var imgSDarkBarracksElem    = [];
   var txtDarkBarracksElem     = [];
   var darkBarracksLevel       = [];
   var darkBarracksQueueLength = [];
   var darkBarracksQueueLeft   = [];
   var darkBarracksQueueTime   = [];
   var darkBarracksQueue       = [];

   var ddTroopElem             = [];
   var numTroopElem            = [];
   var costTroopElem           = [];
   var timeTroopElem           = [];
   var troopNum                = [];
   var troopLevel              = [];
   var troopTime               = [];
   var troopCost               = [];

   var ddDarkTroopElem         = [];
   var numDarkTroopElem        = [];
   var costDarkTroopElem       = [];
   var timeDarkTroopElem       = [];
   var darkTroopNum            = [];
   var darkTroopLevel          = [];
   var darkTroopTime           = [];
   var darkTroopCost           = [];

   var totalTroops             = 0;
   var totalDPSDamage          = 0;
   var totalDPSDamageAir       = 0;
   var totalDPSDamageGround    = 0;
   var totalDPADamage          = 0;
   var totalDPADamageAir       = 0;
   var totalDPADamageGround    = 0;
   var totalMovementSpeed      = 0;
   var totalAttackSpeed        = 0;
   var totalHitPoints          = 0;
   var totalHitPointsGround    = 0;
   var totalHitPointsAir       = 0;

   // Get value of the elixir queue length checkbox
   var chkElem = document.getElementById("checkbox-ElixirIgnoreQueueLength");
   var ignoreQueueLength = chkElem.checked;

   // Get value of the elixir queue length checkbox
   var chkDarkElem =
      document.getElementById("checkbox-DarkElixirIgnoreQueueLength");
   var ignoreDarkQueueLength = chkDarkElem.checked;

   // Get total elements
   var txtElixirHousingElem =
      document.getElementById("text-TotalElixirHousingSpace");
   var txtElixirCostElem =
      document.getElementById("text-TotalElixirCost");
   var txtDarkElixirHousingElem =
      document.getElementById("text-TotalDarkElixirHousingSpace");
   var txtDarkElixirCostElem =
      document.getElementById("text-TotalDarkElixirCost");

   // Get Army Camp total space
   var txtArmyCampElem  = document.getElementById("text-ArmyCamp");
   var iptArmyCampElem  = document.getElementById("input-ArmyCamp");
   var availableHousing = iptArmyCampElem.value.trim();

   if (!availableHousing || availableHousing == "" || isNaN(availableHousing)) {
      availableHousing      = 0;
      iptArmyCampElem.value = "0";
   }
   else {
      availableHousing = parseInt(availableHousing, 10);

      if (availableHousing < 0) {
         availableHousing      = 0;
         iptArmyCampElem.value = "0";
      }
      else if (availableHousing > maxHousing) {
         availableHousing      = maxHousing;
         iptArmyCampElem.value = maxHousing;
      }

      // iptArmyCampElem.value = availableHousing;
   }

   // Collect all Barracks elements
   for (i = 0; i < numBarracks; i ++) {
      ddBarracksElem[i]   = document.getElementById("dropdown-Barracks" + (i + 1));
      imgBarracksElem[i]  = document.getElementById("image-Barracks" + (i + 1));
      imgSBarracksElem[i] = document.getElementById("image-Barracks" + (i + 1) +
         "-small");
      txtBarracksElem[i]  = document.getElementById("text-Barracks" + (i + 1));

      barracksLevel[i] =
         ddBarracksElem[i].options[ddBarracksElem[i].selectedIndex].value;
      barracksQueueLength[i] =
         clashingToolBarracksQueueLength(barracksLevel[i]);

      // Initialize the barracks queues
      barracksQueue[i]     = [];
      barracksQueueTime[i] = 0;
      barracksQueueLeft[i] = barracksQueueLength[i];

      for (j = 0; j < troopTypes.length; j ++)
         barracksQueue[i][j] = 0;
   }

   // Collect all Dark Barracks elements
   for (i = 0; i < numDarkBarracks; i ++) {
      ddDarkBarracksElem[i] =
         document.getElementById("dropdown-DarkBarracks" + (i + 1));
      imgDarkBarracksElem[i] =
         document.getElementById("image-DarkBarracks" + (i + 1));
      imgSDarkBarracksElem[i] =
         document.getElementById("image-DarkBarracks" + (i + 1) + "-small");
      txtDarkBarracksElem[i] =
         document.getElementById("text-DarkBarracks" + (i + 1));

      darkBarracksLevel[i] =
         ddDarkBarracksElem[i].options[ddDarkBarracksElem[i].selectedIndex].value;
      darkBarracksQueueLength[i] =
         clashingToolDarkBarracksQueueLength(darkBarracksLevel[i]);

      // Initialize the dark barracks queues
      darkBarracksQueue[i]     = [];
      darkBarracksQueueTime[i] = 0;
      darkBarracksQueueLeft[i] = darkBarracksQueueLength[i];

      for (j = 0; j < darkTroopTypes.length; j ++)
         darkBarracksQueue[i][j] = 0;
   }

   // Collect and update all Normal Troop elements
   for (i = 0; i < troopTypes.length; i ++) {
      ddTroopElem[i]   = document.getElementById("dropdown-" + troopTypes[i]);
      numTroopElem[i]  = document.getElementById("input-" + troopTypes[i]);
      costTroopElem[i] = document.getElementById("text-" + troopTypes[i] + "Cost");
      timeTroopElem[i] = document.getElementById("text-" + troopTypes[i] + "Time");
      var housingSpace =
         clashingToolTroopInformation(troopTypes[i], 'housing space');

      troopNum[i] = numTroopElem[i].value.trim();

      if (!troopNum[i] || troopNum[i] == "" || isNaN(troopNum[i])) {
         troopNum[i]           = 0;
         numTroopElem[i].value = "0";
      }
      else {
         troopNum[i]  = parseInt(troopNum[i], 10);
         var maxTroop = Math.floor(maxHousing / housingSpace);

         if (troopNum[i] < 0) {
            troopNum[i]           = 0;
            numTroopElem[i].value = "0";
         }
         else if (troopNum[i] > maxTroop) {
            troopNum[i]           = maxTroop;
            numTroopElem[i].value = maxTroop;
         }

         // numTroopElem[i].value = troopNum[i];
      }

      troopLevel[i] =
         parseInt(ddTroopElem[i].options[ddTroopElem[i].selectedIndex].value, 10); 
     
      troopTime[i] =
         clashingToolTroopInformation(troopTypes[i], 'training time') *
         troopNum[i];

      troopCost[i] =
         clashingToolTroopInformation(troopTypes[i], 'training cost',
         troopLevel[i]) * troopNum[i];

      // Keep a running total of elixir cost and housing space
      totalElixir += troopCost[i];
      totalQueue  += troopNum[i] * housingSpace;
      totalTroops += troopNum[i];

      // Calculate other statistics
      var troopType =
         clashingToolTroopInformation(troopTypes[i], 'type');
      var troopDPS =
         clashingToolTroopInformation(troopTypes[i], 'dps', troopLevel[i]);
      var troopAttackSpeed =
         clashingToolTroopInformation(troopTypes[i], 'attack speed');
      var troopMovementSpeed =
         clashingToolTroopInformation(troopTypes[i], 'movement speed');
      var troopHitPoints =
         clashingToolTroopInformation(troopTypes[i], 'hitpoints', troopLevel[i]);

      totalDPSDamage     += troopDPS * troopNum[i];
      totalDPADamage     += troopDPS * troopAttackSpeed * troopNum[i];
      totalAttackSpeed   += troopAttackSpeed * troopNum[i];
      totalMovementSpeed += troopMovementSpeed * troopNum[i];
      totalHitPoints     += troopHitPoints * troopNum[i];

      if (clashingToolTroopInformation(troopTypes[i], 'ground attack')) {
         totalDPSDamageGround += troopDPS * troopNum[i];
         totalDPADamageGround += troopDPS * troopAttackSpeed * troopNum[i];
      }

      if (clashingToolTroopInformation(troopTypes[i], 'air attack')) {
         totalDPSDamageAir += troopDPS * troopNum[i];
         totalDPADamageAir += troopDPS * troopAttackSpeed * troopNum[i];
      }

      if (troopType == 'Air')
         totalHitPointsAir    += troopHitPoints * troopNum[i];
      else
      if (troopType == 'Ground')
         totalHitPointsGround += troopHitPoints * troopNum[i];

      costTroopElem[i].innerHTML = clashingToolCommas(troopCost[i]);
      timeTroopElem[i].innerHTML = clashingToolTime(troopTime[i]);
   }

   // Collect and update all Dark Troop elements
   for (i = 0; i < darkTroopTypes.length; i ++) {
      ddDarkTroopElem[i] =
         document.getElementById("dropdown-" + darkTroopTypes[i]);
      numDarkTroopElem[i] =
         document.getElementById("input-" + darkTroopTypes[i]);
      costDarkTroopElem[i] =
         document.getElementById("text-" + darkTroopTypes[i] + "Cost");
      timeDarkTroopElem[i] =
         document.getElementById("text-" + darkTroopTypes[i] + "Time");
      var darkHousingSpace =
         clashingToolTroopInformation(darkTroopTypes[i], 'housing space');

      darkTroopNum[i] = numDarkTroopElem[i].value.trim();

      if (!darkTroopNum[i] || darkTroopNum[i] == "" || isNaN(darkTroopNum[i])) {
         darkTroopNum[i]           = 0;
         numDarkTroopElem[i].value = "0";
      }
      else {
         darkTroopNum[i]  = parseInt(darkTroopNum[i], 10);
         var maxDarkTroop = Math.floor(maxHousing / darkHousingSpace);

         if (darkTroopNum[i] < 0) {
            darkTroopNum[i]           = 0;
            numDarkTroopElem[i].value = "0";
         }
         else if (darkTroopNum[i] > maxDarkTroop) {
            darkTroopNum[i]           = maxDarkTroop;
            numDarkTroopElem[i].value = maxDarkTroop;
         }

         // numDarkTroopElem[i].value = darkTroopNum[i];
      }

      darkTroopLevel[i] =
         parseInt(ddDarkTroopElem[i].options[ddDarkTroopElem[i].selectedIndex].value,
         10); 
     
      darkTroopTime[i] =
         clashingToolTroopInformation(darkTroopTypes[i], 'training time') *
         darkTroopNum[i];

      darkTroopCost[i] =
         clashingToolTroopInformation(darkTroopTypes[i], 'training cost',
         darkTroopLevel[i]) * darkTroopNum[i];

      // Keep a running total of dark elixir cost and housing space
      totalDarkElixir += darkTroopCost[i];
      totalQueue      += darkTroopNum[i] * darkHousingSpace;
      totalTroops     += darkTroopNum[i];

      // Calculate other statistics
      var darkTroopType =
         clashingToolTroopInformation(darkTroopTypes[i], 'type');
      var darkTroopDPS =
         clashingToolTroopInformation(darkTroopTypes[i], 'dps', darkTroopLevel[i]);
      var darkTroopAttackSpeed =
         clashingToolTroopInformation(darkTroopTypes[i], 'attack speed');
      var darkTroopMovementSpeed =
         clashingToolTroopInformation(darkTroopTypes[i], 'movement speed');
      var darkTroopHitPoints =
         clashingToolTroopInformation(darkTroopTypes[i], 'hitpoints',
         darkTroopLevel[i]);

      totalDPSDamage     += darkTroopDPS * darkTroopNum[i];
      totalDPADamage     += darkTroopDPS * darkTroopAttackSpeed * darkTroopNum[i];
      totalAttackSpeed   += darkTroopAttackSpeed * darkTroopNum[i];
      totalMovementSpeed += darkTroopMovementSpeed * darkTroopNum[i];
      totalHitPoints     += darkTroopHitPoints * darkTroopNum[i];

      if (clashingToolTroopInformation(darkTroopTypes[i], 'ground attack')) {
         totalDPSDamageGround += darkTroopDPS * darkTroopNum[i];
         totalDPADamageGround +=
            darkTroopDPS * darkTroopAttackSpeed * darkTroopNum[i];
      }

      if (clashingToolTroopInformation(darkTroopTypes[i], 'air attack')) {
         totalDPSDamageAir += darkTroopDPS * darkTroopNum[i];
         totalDPADamageAir +=
            darkTroopDPS * darkTroopAttackSpeed * darkTroopNum[i];
      }

      if (darkTroopType == 'Air')
         totalHitPointsAir += darkTroopHitPoints * darkTroopNum[i];
      else if (darkTroopType == 'Ground')
         totalHitPointsGround += darkTroopHitPoints * darkTroopNum[i];

      costDarkTroopElem[i].innerHTML = clashingToolCommas(darkTroopCost[i]);
      timeDarkTroopElem[i].innerHTML = clashingToolTime(darkTroopTime[i]);
   }

   // Update totals
   txtElixirCostElem.innerHTML    = clashingToolCommas(totalElixir);
   txtElixirHousingElem.innerHTML = clashingToolCommas(totalQueue) + " / " +
      clashingToolCommas(availableHousing);
   txtDarkElixirCostElem.innerHTML    = clashingToolCommas(totalDarkElixir);
   txtDarkElixirHousingElem.innerHTML = clashingToolCommas(totalQueue) + " / " +
      clashingToolCommas(availableHousing);
   
   // Make sure we've got a Barracks to make the highest selected troop
   for (i = 0; i < troopTypes.length; i ++) {
      if (troopNum[i] > 0) {
         reqBarracks    = clashingToolTroopInformation(troopTypes[i],
            'barracks level');
         var okBarracks = false;

         for (j = 0; j < numBarracks; j ++) {
            if (barracksLevel[j] >= reqBarracks)
               okBarracks = true;
         }

         if (!okBarracks) {
            errorOut = true;
            clashingToolError("You do not have a Barracks that can produce " +
               troopTypes[i] + clashingToolPlural(troopTypes[i]) + ".");
         }
      }
   }

   // Make sure we've got a Dark Barracks to make the highest selected dark troop
   for (i = 0; i < darkTroopTypes.length; i ++) {
      if (darkTroopNum[i] > 0) {
         reqDarkBarracks    = clashingToolTroopInformation(darkTroopTypes[i],
            'barracks level');
         var okDarkBarracks = false;

         for (j = 0; j < numDarkBarracks; j ++) {
            if (darkBarracksLevel[j] >= reqDarkBarracks)
               okDarkBarracks = true;
         }

         if (!okDarkBarracks) {
            errorOut = true;
            clashingToolError("You do not have a Dark Barracks that can produce " +
               darkTroopTypes[i] + clashingToolPlural(darkTroopTypes[i]) + ".");
         }
      }
   }

   /*
    * Here is where we begin to allocate troops. We will assume that the list is
    * already sorted from low to high in terms of training time.
    * The algorithm will allocate one troop at a time to the barracks that:
    *    a) is able to train it
    *    b) has available queue space (if the "long queues" option is not checked)
    *    c) has the lowest current total queue time
    */
   for (j = troopTypes.length - 1; !errorOut && j >= 0; j --) {
      var tNum    = troopNum[j];
      reqSpace    = clashingToolTroopInformation(troopTypes[j], 'housing space');
      reqTime     = clashingToolTroopInformation(troopTypes[j], 'training time');
      reqBarracks = clashingToolTroopInformation(troopTypes[j], 'barracks level');
 
      while (tNum > 0) {
         var minQueueTime = -1;
         var bNum         = -1;
 
         for (i = 0; i < numBarracks; i ++) {
            // Skip this barracks if it can't make this troop.
            if (barracksLevel[i] < reqBarracks)
               continue;
 
            // Also skip if there is no room to make it and we aren't ignoring.
            if (!ignoreQueueLength && barracksQueueLeft[i] < reqSpace)
               continue;
 
            // Save this barracks if it is the lowest queue time we've seen so far.
            if (minQueueTime < 0 || minQueueTime > barracksQueueTime[i]) {
               minQueueTime = barracksQueueTime[i];
               bNum         = i;
            }
         }
 
         if (bNum < 0) {
            // We couldn't find a barracks to make this troop.
            errorOut = true;
            clashingToolError("No available Barracks to produce more " +
               troopTypes[j] + clashingToolPlural(troopTypes[j]) + ".");
            break;
         }
 
         // Add one troop to the appropriate barracks queue.
         barracksQueue[bNum][j]  ++;
         barracksQueueLeft[bNum] -= reqSpace;
         barracksQueueTime[bNum] += reqTime;

         tNum --;
      }
   }

   /*
    * Now we do the same for dark troops.
    */
   for (j = darkTroopTypes.length - 1; !errorOut && j >= 0; j --) {
      var dTNum =
         darkTroopNum[j];
      reqDarkSpace =
         clashingToolTroopInformation(darkTroopTypes[j], 'housing space');
      reqDarkTime =
         clashingToolTroopInformation(darkTroopTypes[j], 'training time');
      reqDarkBarracks =
         clashingToolTroopInformation(darkTroopTypes[j], 'barracks level');
 
      while (dTNum > 0) {
         var minDarkQueueTime = -1;
         var dBNum            = -1;
 
         for (i = 0; i < numDarkBarracks; i ++) {
            // Skip this dark barracks if it can't make this troop.
            if (darkBarracksLevel[i] < reqDarkBarracks)
               continue;
 
            // Also skip if there is no room to make it and we aren't ignoring.
            if (!ignoreDarkQueueLength && darkBarracksQueueLeft[i] < reqDarkSpace)
               continue;
 
            // Save this dark barracks if it is the lowest queue time we've
            // seen so far.
            if (minDarkQueueTime < 0 ||
                minDarkQueueTime > darkBarracksQueueTime[i]) {
               minDarkQueueTime = darkBarracksQueueTime[i];
               dBNum            = i;
            }
         }
 
         if (dBNum < 0) {
            // We couldn't find a dark barracks to make this troop.
            errorOut = true;
            clashingToolError("No available Dark Barracks to produce more " +
               darkTroopTypes[j] + clashingToolPlural(darkTroopTypes[j]) + ".");
            break;
         }
 
         // Add one dark troop to the appropriate dark barracks queue.
         darkBarracksQueue[dBNum][j]  ++;
         darkBarracksQueueLeft[dBNum] -= reqDarkSpace;
         darkBarracksQueueTime[dBNum] += reqDarkTime;

         dTNum --;
      }
   }

   // Update the troop distribution if we haven't errored out somewhere.
   for (i = 0; i < numBarracks; i ++) {
      var sBarracksTimeElem =
         document.getElementById("text-barracks" + (i + 1) + "-Time");
      var parSBarracksTimeElem = sBarracksTimeElem.parentNode;

      if (!errorOut && barracksQueueTime[i] > 0)
         sBarracksTimeElem.innerHTML = clashingToolTime(barracksQueueTime[i]);
      else
         sBarracksTimeElem.innerHTML = "00:00:00";

      if (!errorOut && barracksQueueLeft[i] < 0)
         parSBarracksTimeElem.style.backgroundColor = 
            clashingToolConstants("overloadDistBG");
      else
         parSBarracksTimeElem.style.backgroundColor = 
            clashingToolConstants("normalDistBG");

      for (j = 0; j < troopTypes.length; j ++) {
         var sBarracksQueueElem =
            document.getElementById("text-barracks" + (i + 1) + "-" +
            troopTypes[j]);
         var parSBarracksQueueElem = sBarracksQueueElem.parentNode;

         if (!errorOut && barracksQueue[i][j] > 0)
            sBarracksQueueElem.innerHTML = clashingToolCommas(barracksQueue[i][j]);
         else
            sBarracksQueueElem.innerHTML = "";

         if (!errorOut && barracksQueueLeft[i] < 0)
            parSBarracksQueueElem.style.backgroundColor = 
               clashingToolConstants("overloadDistBG");
         else
            parSBarracksQueueElem.style.backgroundColor = 
               clashingToolConstants("normalDistBG");
      }
   }

   // Update the dark troop distribution as well.
   for (i = 0; i < numDarkBarracks; i ++) {
      var sDarkBarracksTimeElem =
         document.getElementById("text-darkbarracks" + (i + 1) +"-Time");
      var parSDarkBarracksTimeElem = sDarkBarracksTimeElem.parentNode;

      if (!errorOut && darkBarracksQueueTime[i] > 0)
         sDarkBarracksTimeElem.innerHTML =
            clashingToolTime(darkBarracksQueueTime[i]);
      else
         sDarkBarracksTimeElem.innerHTML = "00:00:00";

      if (!errorOut && darkBarracksQueueLeft[i] < 0)
         parSDarkBarracksTimeElem.style.backgroundColor = 
            clashingToolConstants("overloadDistBG");
      else
         parSDarkBarracksTimeElem.style.backgroundColor = 
            clashingToolConstants("normalDistBG");

      for (j = 0; j < darkTroopTypes.length; j ++) {
         var sDarkBarracksQueueElem =
            document.getElementById("text-darkbarracks" + (i + 1) + "-" +
               darkTroopTypes[j]);
         var parSDarkBarracksQueueElem = sDarkBarracksQueueElem.parentNode;

         if (!errorOut && darkBarracksQueue[i][j] > 0)
            sDarkBarracksQueueElem.innerHTML =
               clashingToolCommas(darkBarracksQueue[i][j]);
         else
            sDarkBarracksQueueElem.innerHTML = "";

         if (!errorOut && darkBarracksQueueLeft[i] < 0)
            parSDarkBarracksQueueElem.style.backgroundColor = 
               clashingToolConstants("overloadDistBG");
         else
            parSDarkBarracksQueueElem.style.backgroundColor = 
               clashingToolConstants("normalDistBG");
      }
   }

   // Update Army Camp
   txtArmyCampElem.innerHTML = clashingToolCommas(totalQueue) + " / ";

   // Update Barracks images
   for (i = 0; i < numBarracks; i ++) {
      imgBarracksElem[i].src  = clashingToolImageURL("barracks", barracksLevel[i]);
      imgSBarracksElem[i].src = clashingToolImageURL("barracks", barracksLevel[i]);

      if (!errorOut && barracksQueueLeft[i] < 0)
         imgSBarracksElem[i].parentNode.style.backgroundColor =
            clashingToolConstants("overloadDistBG");
      else
         imgSBarracksElem[i].parentNode.style.backgroundColor =
            clashingToolConstants("normalDistBG");
   }

   // Update Barracks text
   for (i = 0; i < numBarracks; i ++) {
      if (!errorOut)
         txtBarracksElem[i].innerHTML = 
            clashingToolCommas(barracksQueueLeft[i]) + " / " +
            clashingToolCommas(barracksQueueLength[i]);
      else
         txtBarracksElem[i].innerHTML = 
            clashingToolCommas(barracksQueueLength[i]) + " / " +
            clashingToolCommas(barracksQueueLength[i]);

      if (barracksQueueLeft[i] < 0) {
         txtBarracksElem[i].style.color      = "red";
         txtBarracksElem[i].style.fontWeight = "bold";
      }
      else {
         txtBarracksElem[i].style.color      = "black";
         txtBarracksElem[i].style.fontWeight = "normal";
      } 
   }

   // Update Dark Barracks images
   for (i = 0; i < numDarkBarracks; i ++) {
      imgDarkBarracksElem[i].src =
         clashingToolImageURL("dark barracks", darkBarracksLevel[i]);
      imgSDarkBarracksElem[i].src =
         clashingToolImageURL("dark barracks", darkBarracksLevel[i]);

      if (!errorOut && darkBarracksQueueLeft[i] < 0)
         imgSDarkBarracksElem[i].parentNode.style.backgroundColor =
            clashingToolConstants("overloadDistBG");
      else
         imgSDarkBarracksElem[i].parentNode.style.backgroundColor =
            clashingToolConstants("normalDistBG");
   }

   // Update Dark Barracks text
   for (i = 0; i < numDarkBarracks; i ++) {
      if (!errorOut)
         txtDarkBarracksElem[i].innerHTML = 
            clashingToolCommas(darkBarracksQueueLeft[i]) + " / " +
            clashingToolCommas(darkBarracksQueueLength[i]);
      else
         txtDarkBarracksElem[i].innerHTML = 
            clashingToolCommas(darkBarracksQueueLength[i]) + " / " +
            clashingToolCommas(darkBarracksQueueLength[i]);

      if (darkBarracksQueueLeft[i] < 0) {
         txtDarkBarracksElem[i].style.color      = "red";
         txtDarkBarracksElem[i].style.fontWeight = "bold";
      }
      else {
         txtDarkBarracksElem[i].style.color      = "black";
         txtDarkBarracksElem[i].style.fontWeight = "normal";
      } 
   }

   // Calculate and update troop statistics.
   var statElem = document.getElementById("stat-total-hp");
   statElem.innerHTML = (errorOut ? "0" : clashingToolCommas(totalHitPoints));
   var statElem = document.getElementById("stat-ground-hp");
   statElem.innerHTML =
      (errorOut ? "0" : clashingToolCommas(totalHitPointsGround));
   var statElem = document.getElementById("stat-air-hp");
   statElem.innerHTML = (errorOut ? "0" : clashingToolCommas(totalHitPointsAir));
   var statElem = document.getElementById("stat-average-hp");
   statElem.innerHTML = ((errorOut || !totalTroops) ? "0.0" :
      clashingToolCommas(totalHitPoints / totalTroops));
   var statElem = document.getElementById("stat-average-movement-speed");
   statElem.innerHTML = ((errorOut || !totalTroops) ? "0.0" :
      clashingToolCommas(totalMovementSpeed / totalTroops, 1));
   var statElem = document.getElementById("stat-average-attack-speed");
   statElem.innerHTML = ((errorOut || !totalTroops) ? "0.0" :
      clashingToolCommas(totalAttackSpeed / totalTroops, 1));
   var statElem = document.getElementById("stat-total-dps");
   statElem.innerHTML = (errorOut ? "0.0" :
      clashingToolCommas(totalDPSDamage, 1));
   var statElem = document.getElementById("stat-ground-dps");
   statElem.innerHTML = (errorOut ? "0.0" :
      clashingToolCommas(totalDPSDamageGround, 1));
   var statElem = document.getElementById("stat-air-dps");
   statElem.innerHTML = (errorOut ? "0.0" :
      clashingToolCommas(totalDPSDamageAir, 1));
   var statElem = document.getElementById("stat-average-unit-dps");
   statElem.innerHTML = ((errorOut || !totalTroops) ? "0.0" :
      clashingToolCommas(totalDPSDamage / totalTroops, 1));
   var statElem = document.getElementById("stat-average-space-dps");
   statElem.innerHTML = ((errorOut || !totalQueue) ? "0.0" :
      clashingToolCommas(totalDPSDamage / totalQueue, 1));
   var statElem = document.getElementById("stat-total-dpa");
   statElem.innerHTML = (errorOut ? "0.0" :
      clashingToolCommas(totalDPADamage, 1));
   var statElem = document.getElementById("stat-ground-dpa");
   statElem.innerHTML = (errorOut ? "0.0" :
      clashingToolCommas(totalDPADamageGround, 1));
   var statElem = document.getElementById("stat-air-dpa");
   statElem.innerHTML = (errorOut ? "0.0" :
      clashingToolCommas(totalDPADamageAir, 1));
   var statElem = document.getElementById("stat-average-unit-dpa");
   statElem.innerHTML = ((errorOut || !totalTroops) ? "0.0" :
      clashingToolCommas(totalDPADamage / totalTroops, 1));
   var statElem = document.getElementById("stat-average-space-dpa");
   statElem.innerHTML = ((errorOut || !totalQueue) ? "0.0" :
      clashingToolCommas(totalDPADamage / totalQueue, 1));

   /*
    * If we didn't already error out, check to see if we've trained
    * too many troops. Otherwise just clear the error bar.
    */
   if (!errorOut) {
      if (totalQueue > availableHousing)
         clashingToolError("Army Camps do not have sufficient capacity for " +
            "the selected troops.", true);
      else
         clashingToolError();
   }

   // Save all appropriate values in cookies so we can retrieve them later.
   // Barracks
   for (i = 0; i < numBarracks; i ++) {
      saveStorageValue('clashingTool', ddBarracksElem[i].id, barracksLevel[i]);
   }

   // Dark Barracks
   for (i = 0; i < numDarkBarracks; i ++) {
      saveStorageValue('clashingTool', ddDarkBarracksElem[i].id, darkBarracksLevel[i]);
   }

   // Army Camp
   saveStorageValue('clashingTool', iptArmyCampElem.id, availableHousing);

   // Troops
   for (i = 0; i < troopTypes.length; i ++) {
      saveStorageValue('clashingTool', ddTroopElem[i].id,  troopLevel[i]);
      saveStorageValue('clashingTool', numTroopElem[i].id, troopNum[i]);
   }

   // Dark Troops
   for (i = 0; i < darkTroopTypes.length; i ++) {
      saveStorageValue('clashingTool', ddDarkTroopElem[i].id,  darkTroopLevel[i]);
      saveStorageValue('clashingTool', numDarkTroopElem[i].id, darkTroopNum[i]);
   }

   // Checkboxes
   saveStorageValue('clashingTool', chkElem.id,     (chkElem.checked     ? "checked" : ""));
   saveStorageValue('clashingTool', chkDarkElem.id, (chkDarkElem.checked ? "checked" : ""));

   // Don't forget to watch for updates again now that we're done.
   clashingToolIgnoreUpdate = false;
}

/*
 * This is the function to update the second page of the Clashing Tool.
 */
function updateClashingTool2() {
   // If we're ignoring, just exit.
   if (clashingToolIgnoreUpdate)
      return;

   // Let's not cause any recursion.
   clashingToolIgnoreUpdate = true;

   // Collect Town Hall information.
   var ddDefTownHallElem =
      document.getElementById("dropdown-stalk-defending-town-hall");
   var ddAttTownHallElem =
      document.getElementById("dropdown-stalk-attacking-town-hall");
   var imgDefTownHallElem =
      document.getElementById("image-stalk-defending-town-hall");
   var imgAttTownHallElem =
      document.getElementById("image-stalk-attacking-town-hall");

   var defTH =
      ddDefTownHallElem.options[ddDefTownHallElem.selectedIndex].value;
   var attTH =
      ddAttTownHallElem.options[ddAttTownHallElem.selectedIndex].value;

   // Collect all totals elements.
   var numGS  = clashingToolInfoByTownHall('gold storages',        defTH);
   var numES  = clashingToolInfoByTownHall('elixir storages',      defTH);
   var numDES = clashingToolInfoByTownHall('dark elixir storages', defTH);
   var numGM  = clashingToolInfoByTownHall('gold mines',           defTH);
   var numEC  = clashingToolInfoByTownHall('elixir collectors',    defTH);
   var numDED = clashingToolInfoByTownHall('dark elixir drills',   defTH);

   var capGS  = clashingToolResourceInfo('gold storage',        'capacity',
      clashingToolInfoByTownHall('gold storage level',        defTH));
   var capES  = clashingToolResourceInfo('elixir storage',      'capacity',
      clashingToolInfoByTownHall('elixir storage level',      defTH));
   var capDES = clashingToolResourceInfo('dark elixir storage', 'capacity',
      clashingToolInfoByTownHall('dark elixir storage level', defTH));
   var capGM  = clashingToolResourceInfo('gold mine',           'capacity',
      clashingToolInfoByTownHall('gold mine level',           defTH));
   var capEC  = clashingToolResourceInfo('elixir collector',    'capacity',
      clashingToolInfoByTownHall('elixir collector level',    defTH));
   var capDED = clashingToolResourceInfo('dark elixir drill',   'capacity',
      clashingToolInfoByTownHall('dark elixir drill level',   defTH));

   var maxTGS  = capGS  * numGS;
   var maxTES  = capES  * numES;
   var maxTDES = capDES * numDES;
   var maxTGM  = capGM  * numGM;
   var maxTEC  = capEC  * numEC;
   var maxTDED = capDED * numDED;

   var maxTH   = clashingToolConstants("maxTHLevel");
   var mnumGS  = clashingToolInfoByTownHall('gold storages',        maxTH);
   var mnumES  = clashingToolInfoByTownHall('elixir storages',      maxTH);
   var mnumDES = clashingToolInfoByTownHall('dark elixir storages', maxTH);
   var mnumGM  = clashingToolInfoByTownHall('gold mines',           maxTH);
   var mnumEC  = clashingToolInfoByTownHall('elixir collectors',    maxTH);
   var mnumDED = clashingToolInfoByTownHall('dark elixir drills',   maxTH);

   var mcapGS  = clashingToolResourceInfo('gold storage',        'capacity', 
      clashingToolInfoByTownHall('gold storage level',        maxTH));
   var mcapES  = clashingToolResourceInfo('elixir storage',      'capacity',
      clashingToolInfoByTownHall('elixir storage level',      maxTH));
   var mcapDES = clashingToolResourceInfo('dark elixir storage', 'capacity',
      clashingToolInfoByTownHall('dark elixir storage level', maxTH));
   var mcapGM  = clashingToolResourceInfo('gold mine',           'capacity',
      clashingToolInfoByTownHall('gold mine level',           maxTH));
   var mcapEC  = clashingToolResourceInfo('elixir collector',    'capacity',
      clashingToolInfoByTownHall('elixir collector level',    maxTH));
   var mcapDED = clashingToolResourceInfo('dark elixir drill',   'capacity',
      clashingToolInfoByTownHall('dark elixir drill level',   maxTH));

   var mmaxTGS  = mcapGS  * mnumGS;
   var mmaxTES  = mcapES  * mnumES;
   var mmaxTDES = mcapDES * mnumDES;
   var mmaxTGM  = mcapGM  * mnumGM;
   var mmaxTEC  = mcapEC  * mnumEC;
   var mmaxTDED = mcapDED * mnumDED;

   // Images
   var imgStalkTG   = document.getElementById("image-stalk-totals-gold");
   var imgStalkTE   = document.getElementById("image-stalk-totals-elixir");
   var imgStalkTDE  = document.getElementById("image-stalk-totals-darkelixir");
   var imgStalkTGM  = document.getElementById("image-stalk-totals-goldmines");
   var imgStalkTEC  =
      document.getElementById("image-stalk-totals-elixircollectors");
   var imgStalkTDED =
      document.getElementById("image-stalk-totals-darkelixirdrills");
   var imgStalkTGS  = document.getElementById("image-stalk-totals-goldstorage");
   var imgStalkTES  = document.getElementById("image-stalk-totals-elixirstorage");
   var imgStalkTDES =
      document.getElementById("image-stalk-totals-darkelixirstorage");

   // *** Totals ***
   // Totals - Gold
   var txtStalkTG = document.getElementById("textbox-stalk-totals-gold");
   var TG         = txtStalkTG.value.trim();

   if (!TG || TG == "" || isNaN(TG)) {
      TG               = 0;
      txtStalkTG.value = "0";
   }
   else {
      TG = parseInt(TG, 10);

      if (TG < 0) {
         TG               = 0;
         txtStalkTG.value = "0";
      }
      else if (TG > mmaxTGS + mmaxTGM) {
         TG               = mmaxTGS + mmaxTGM;
         txtStalkTG.value = mmaxTGS + mmaxTGM;
      }
   }

   // Totals - Elixir
   var txtStalkTE = document.getElementById("textbox-stalk-totals-elixir");
   var TE         = txtStalkTE.value.trim();

   if (!TE || TE == "" || isNaN(TE)) {
      TE               = 0;
      txtStalkTE.value = "0";
   }
   else {
      TE = parseInt(TE, 10);

      if (TE < 0) {
         TE               = 0;
         txtStalkTE.value = "0";
      }
      else if (TE > mmaxTES + mmaxTEC) {
         TE               = mmaxTES + mmaxTEC;
         txtStalkTE.value = mmaxTES + mmaxTEC;
      }
   }

   // Totals - Dark Elixir
   var txtStalkTDE = document.getElementById("textbox-stalk-totals-darkelixir");
   var TDE         = txtStalkTDE.value.trim();

   if (!TDE || TDE == "" || isNaN(TDE)) {
      TDE               = 0;
      txtStalkTDE.value = "0";
   }
   else {
      TDE = parseInt(TDE, 10);

      if (TDE < 0) {
         TDE               = 0;
         txtStalkTDE.value = "0";
      }
      else if (TDE > mmaxTDES + mmaxTDED) {
         TDE               = mmaxTDES + mmaxTDED;
         txtStalkTDE.value = mmaxTDES + mmaxTDED;
      }
   }

   // If the defending Town Hall doesn't have a Dark Elixir storage, hide
   // the line
   var tElem = document.getElementById('stalk-totals-row-dark-elixir');
   tElem.style.display = (numDES > 0 ? '' : 'none');

   // Also hide the totals element
   var tElem = document.getElementById('stalk-results-dark-elixir');
   tElem.style.display = (numDES > 0 ? '' : 'none');

   // *** Individual Totals ***
   // Individual Totals -- Gold Mines
   var txtStalkTGM = document.getElementById("textbox-stalk-totals-goldmines");
   var TGM         = txtStalkTGM.value.trim();

   if (!TGM || TGM == "" || isNaN(TGM)) {
      TGM               = 0;
      txtStalkTGM.value = "0";
   }
   else {
      TGM = parseInt(TGM, 10);

      if (TGM < 0) {
         TGM               = 0;
         txtStalkTGM.value = "0";
      }
      else if (TGM > mmaxTGM) {
         TGM               = mmaxTGM;
         txtStalkTGM.value = mmaxTGM;
      }
   }

   // Set appropriate image (max level for defending Town Hall)
   imgStalkTGM.src = clashingToolImageURL('gold mine',
      clashingToolInfoByTownHall('gold mine level', defTH));

   // Individual Totals -- Elixir Collectors
   var txtStalkTEC =
      document.getElementById("textbox-stalk-totals-elixircollectors");
   var TEC         = txtStalkTEC.value.trim();

   if (!TEC || TEC == "" || isNaN(TEC)) {
      TEC               = 0;
      txtStalkTEC.value = "0";
   }
   else {
      TEC = parseInt(TEC, 10);

      if (TEC < 0) {
         TEC               = 0;
         txtStalkTEC.value = "0";
      }
      else if (TEC > mmaxTEC) {
         TEC               = mmaxTEC;
         txtStalkTEC.value = mmaxTEC;
      }
   }

   // Set appropriate image (max level for defending Town Hall)
   imgStalkTEC.src = clashingToolImageURL('elixir collector',
      clashingToolInfoByTownHall('elixir collector level', defTH));

   // Individual Totals -- Dark Elixir Drills
   var txtStalkTDED =
      document.getElementById("textbox-stalk-totals-darkelixirdrills");
   var TDED         = txtStalkTDED.value.trim();

   if (!TDED || TDED == "" || isNaN(TDED)) {
      TDED               = 0;
      txtStalkTDED.value = "0";
   }
   else {
      TDED = parseInt(TDED, 10);

      if (TDED < 0) {
         TDED               = 0;
         txtStalkTDED.value = "0";
      }
      else if (TDED > mmaxTDED) {
         TDED               = mmaxTDED;
         txtStalkTDED.value = mmaxTDED;
      }
   }

   // Set appropriate image (max level for defending Town Hall)
   imgStalkTDED.src = clashingToolImageURL('dark elixir drill',
      clashingToolInfoByTownHall('dark elixir drill level', defTH));

   // Individual Totals -- Gold Storages
   var txtStalkTGS = document.getElementById("textbox-stalk-totals-goldstorage");
   var TGS         = txtStalkTGS.value.trim();

   if (!TGS || TGS == "" || isNaN(TGS)) {
      TGS               = 0;
      txtStalkTGS.value = "0";
   }
   else {
      TGS = parseInt(TGS, 10);

      if (TGS < 0) {
         TGS               = 0;
         txtStalkTGS.value = "0";
      }
      else if (TGS > mmaxTGS) {
         TGS               = mmaxTGS;
         txtStalkTGS.value = mmaxTGS;
      }
   }

   // Set appropriate image (max level for defending Town Hall)
   imgStalkTGS.src = clashingToolImageURL('gold storage',
      clashingToolInfoByTownHall('gold storage level', defTH));

   // Individual Totals -- Elixir Storages
   var txtStalkTES =
      document.getElementById("textbox-stalk-totals-elixirstorage");
   var TES         = txtStalkTES.value.trim();

   if (!TES || TES == "" || isNaN(TES)) {
      TES               = 0;
      txtStalkTES.value = "0";
   }
   else {
      TES = parseInt(TES, 10);

      if (TES < 0) {
         TES               = 0;
         txtStalkTES.value = "0";
      }
      else if (TES > mmaxTES) {
         TES               = mmaxTES;
         txtStalkTES.value = mmaxTES;
      }
   }

   // Set appropriate image (max level for defending Town Hall)
   imgStalkTES.src = clashingToolImageURL('elixir storage',
      clashingToolInfoByTownHall('elixir storage level', defTH));

   // Individual Totals -- Dark Elixir Storages
   var txtStalkTDES =
      document.getElementById("textbox-stalk-totals-darkelixirstorage");
   var TDES         = txtStalkTDES.value.trim();

   if (!TDES || TDES == "" || isNaN(TDES)) {
      TDES               = 0;
      txtStalkTDES.value = "0";
   }
   else {
      TDES = parseInt(TDES, 10);

      if (TDES < 0) {
         TDES               = 0;
         txtStalkTDES.value = "0";
      }
      else if (TDES > mmaxTDES) {
         TDES               = mmaxTDES;
         txtStalkTDES.value = mmaxTDES;
      }
   }

   // Set appropriate image (max level for defending Town Hall)
   imgStalkTDES.src = clashingToolImageURL('dark elixir storage',
      clashingToolInfoByTownHall('dark elixir storage level', defTH));

   // If the defending Town Hall doesn't have a either a Dark Elixir storage or
   // a Dark Elixir drill, hide the line. Otherwise just hide the appropriate
   // element.
   tElem = document.getElementById('stalk-individual-totals-row-dark-elixir');
   tElem.style.display = (numDES > 0 || numDED > 0 ? '' : 'none');

   tElem = document.getElementById('stalk-individual-totals-dark-elixir-storage');
   tElem.style.display = (numDES > 0 ? '' : 'none');

   tElem = document.getElementById('stalk-individual-totals-dark-elixir-drill');
   tElem.style.display = (numDED > 0 ? '' : 'none');

   // *** Details ***
   // Hide the header if no storages or collectors exist for a particular resource
   var tblHeader = document.getElementById('stalk-details-row-header-gold');
   tblHeader.style.display = (numGS > 0 || numGM > 0 ? '' : 'none');

   tblHeader = document.getElementById('stalk-details-row-header-elixir');
   tblHeader.style.display = (numES > 0 || numEC > 0 ? '' : 'none');

   tblHeader = document.getElementById('stalk-details-row-header-dark-elixir');
   tblHeader.style.display = (numDES > 0 || numDED > 0 ? '' : 'none');

   var perRow = clashingToolConstants('detailItemsPerRow');

   // Details -- Gold Storages
   var imgGS = [];
   var txtGS = [];
   var GS    = [];

   for (i = 0; i < numGS; i ++) {
      imgGS[i] =
         document.getElementById("image-stalk-details-goldstorage" + i);
      txtGS[i] =
         document.getElementById("textbox-stalk-details-goldstorage" + i);
      GS[i]    = txtGS[i].value.trim();

      if (!GS[i] || GS[i] == "" || isNaN(GS[i])) {
         GS[i]          = 0;
         txtGS[i].value = "0";
      }
      else {
         GS[i] = parseInt(GS[i], 10);

         if (GS[i] < 0) {
            GS[i]          = 0;
            txtGS[i].value = "0";
         }
         else if (GS[i] > mcapGS) {
            GS[i]          = mcapGS;
            txtGS[i].value = mcapGS;
         }
      }

      // Set appropriate image (max level for defending Town Hall)
      imgGS[i].src = clashingToolImageURL('gold storage',
         clashingToolInfoByTownHall('gold storage level', defTH));

      // Make sure they are visible as well
      tElem = document.getElementById('stalk-details-gold-storage-' + i);
      tElem.style.display = '';

      if (!(i % perRow)) {
         tElem = document.getElementById('stalk-details-row-gold-storage-' +
            Math.floor(i / perRow));
         tElem.style.display = '';
      }
   }

   // Hide any unused elements, and any fully unused lines as well
   for (i = numGS; i < mnumGS; i ++) {
      tElem = document.getElementById('stalk-details-gold-storage-' + i);
      tElem.style.display = 'none';

      if (!(i % perRow)) {
         tElem = document.getElementById('stalk-details-row-gold-storage-' +
            Math.floor(i / perRow));
         tElem.style.display = 'none';
      }
   }

   // Details -- Elixir Storages
   var imgES = [];
   var txtES = [];
   var ES    = [];

   for (i = 0; i < numES; i ++) {
      imgES[i] =
         document.getElementById("image-stalk-details-elixirstorage" + i);
      txtES[i] =
         document.getElementById("textbox-stalk-details-elixirstorage" + i);
      ES[i]    = txtES[i].value.trim();

      if (!ES[i] || ES[i] == "" || isNaN(ES[i])) {
         ES[i]          = 0;
         txtES[i].value = "0";
      }
      else {
         ES[i] = parseInt(ES[i], 10);

         if (ES[i] < 0) {
            ES[i]          = 0;
            txtES[i].value = "0";
         }
         else if (ES[i] > mcapES) {
            ES[i]          = mcapES;
            txtES[i].value = mcapES;
         }
      }

      // Set appropriate image (max level for defending Town Hall)
      imgES[i].src = clashingToolImageURL('elixir storage',
         clashingToolInfoByTownHall('elixir storage level', defTH));

      // Make sure they are visible as well
      tElem = document.getElementById('stalk-details-elixir-storage-' + i);
      tElem.style.display = '';

      if (!(i % perRow)) {
         tElem = document.getElementById('stalk-details-row-elixir-storage-' +
            Math.floor(i / perRow));
         tElem.style.display = '';
      }
   }

   // Hide any unused elements, and any fully unused lines as well
   for (i = numES; i < mnumES; i ++) {
      tElem = document.getElementById('stalk-details-elixir-storage-' + i);
      tElem.style.display = 'none';

      if (!(i % perRow)) {
         tElem = document.getElementById('stalk-details-row-elixir-storage-' +
            Math.floor(i / perRow));
         tElem.style.display = 'none';
      }
   }

   // Details -- Dark Elixir Storages
   var imgDES = [];
   var txtDES = [];
   var DES    = [];

   for (i = 0; i < numDES; i ++) {
      imgDES[i] =
         document.getElementById("image-stalk-details-darkelixirstorage" + i);
      txtDES[i] =
         document.getElementById("textbox-stalk-details-darkelixirstorage" + i);
      DES[i]    = txtDES[i].value.trim();

      if (!DES[i] || DES[i] == "" || isNaN(DES[i])) {
         DES[i]          = 0;
         txtDES[i].value = "0";
      }
      else {
         DES[i] = parseInt(DES[i], 10);

         if (DES[i] < 0) {
            DES[i]          = 0;
            txtDES[i].value = "0";
         }
         else if (DES[i] > mcapDES) {
            DES[i]          = mcapDES;
            txtDES[i].value = mcapDES;
         }
      }

      // Set appropriate image (max level for defending Town Hall)
      imgDES[i].src = clashingToolImageURL('dark elixir storage',
         clashingToolInfoByTownHall('dark elixir storage level', defTH));

      // Make sure they are visible as well
      tElem = document.getElementById('stalk-details-dark-elixir-storage-' + i);
      tElem.style.display = '';

      if (!(i % perRow)) {
         tElem = document.getElementById('stalk-details-row-dark-elixir-storage-' +
            Math.floor(i / perRow));
         tElem.style.display = '';
      }
   }

   // Hide any unused elements, and any fully unused lines as well
   for (i = numDES; i < mnumDES; i ++) {
      tElem = document.getElementById('stalk-details-dark-elixir-storage-' + i);
      tElem.style.display = 'none';

      if (!(i % perRow)) {
         tElem = document.getElementById('stalk-details-row-dark-elixir-storage-' +
            Math.floor(i / perRow));
         tElem.style.display = 'none';
      }
   }

   // Details -- Gold Mines
   var imgGM = [];
   var txtGM = [];
   var GM    = [];

   for (i = 0; i < numGM; i ++) {
      imgGM[i] =
         document.getElementById("image-stalk-details-goldmine" + i);
      txtGM[i] =
         document.getElementById("textbox-stalk-details-goldmine" + i);
      GM[i]    = txtGM[i].value.trim();

      if (!GM[i] || GM[i] == "" || isNaN(GM[i])) {
         GM[i]          = 0;
         txtGM[i].value = "0";
      }
      else {
         GM[i] = parseInt(GM[i], 10);

         if (GM[i] < 0) {
            GM[i]          = 0;
            txtGM[i].value = "0";
         }
         else if (GM[i] > mcapGM) {
            GM[i]          = mcapGM;
            txtGM[i].value = mcapGM;
         }
      }

      // Set appropriate image (max level for defending Town Hall)
      imgGM[i].src = clashingToolImageURL('gold mine',
         clashingToolInfoByTownHall('gold mine level', defTH));

      // Make sure they are visible as well
      tElem = document.getElementById('stalk-details-gold-mine-' + i);
      tElem.style.display = '';

      if (!(i % perRow)) {
         tElem = document.getElementById('stalk-details-row-gold-mine-' +
            Math.floor(i / perRow));
         tElem.style.display = '';
      }
   }

   // Hide any unused elements, and any fully unused lines as well
   for (i = numGM; i < mnumGM; i ++) {
      tElem = document.getElementById('stalk-details-gold-mine-' + i);
      tElem.style.display = 'none';

      if (!(i % perRow)) {
         tElem = document.getElementById('stalk-details-row-gold-mine-' +
            Math.floor(i / perRow));
         tElem.style.display = 'none';
      }
   }

   // Details -- Elixir Collectors
   var imgEC = [];
   var txtEC = [];
   var EC    = [];

   for (i = 0; i < numEC; i ++) {
      imgEC[i] =
         document.getElementById("image-stalk-details-elixircollector" + i);
      txtEC[i] =
         document.getElementById("textbox-stalk-details-elixircollector" + i);
      EC[i]    = txtEC[i].value.trim();

      if (!EC[i] || EC[i] == "" || isNaN(EC[i])) {
         EC[i]          = 0;
         txtEC[i].value = "0";
      }
      else {
         EC[i] = parseInt(EC[i], 10);

         if (EC[i] < 0) {
            EC[i]          = 0;
            txtEC[i].value = "0";
         }
         else if (EC[i] > mcapEC) {
            EC[i]          = mcapEC;
            txtEC[i].value = mcapEC;
         }
      }

      // Set appropriate image (max level for defending Town Hall)
      imgEC[i].src = clashingToolImageURL('elixir collector',
         clashingToolInfoByTownHall('elixir collector level', defTH));

      // Make sure they are visible as well
      tElem = document.getElementById('stalk-details-elixir-collector-' + i);
      tElem.style.display = '';

      if (!(i % perRow)) {
         tElem = document.getElementById('stalk-details-row-elixir-collector-' +
            Math.floor(i / perRow));
         tElem.style.display = '';
      }
   }

   // Hide any unused elements, and any fully unused lines as well
   for (i = numEC; i < mnumEC; i ++) {
      tElem = document.getElementById('stalk-details-elixir-collector-' + i);
      tElem.style.display = 'none';

      if (!(i % perRow)) {
         tElem = document.getElementById('stalk-details-row-elixir-collector-' +
            Math.floor(i / perRow));
         tElem.style.display = 'none';
      }
   }

   // Details -- Dark Elixir Drills
   var imgDED = [];
   var txtDED = [];
   var DED    = [];

   for (i = 0; i < numDED; i ++) {
      imgDED[i] =
         document.getElementById("image-stalk-details-darkelixirdrill" + i);
      txtDED[i] =
         document.getElementById("textbox-stalk-details-darkelixirdrill" + i);
      DED[i]    = txtDED[i].value.trim();

      if (!DED[i] || DED[i] == "" || isNaN(DED[i])) {
         DED[i]          = 0;
         txtDED[i].value = "0";
      }
      else {
         DED[i] = parseInt(DED[i], 10);

         if (DED[i] < 0) {
            DED[i]          = 0;
            txtDED[i].value = "0";
         }
         else if (DED[i] > mcapDED) {
            DED[i]          = mcapDED;
            txtDED[i].value = mcapDED;
         }
      }

      // Set appropriate image (max level for defending Town Hall)
      imgDED[i].src = clashingToolImageURL('dark elixir drill',
         clashingToolInfoByTownHall('dark elixir drill level', defTH));

      // Make sure they are visible as well
      tElem = document.getElementById('stalk-details-dark-elixir-drill-' + i);
      tElem.style.display = '';

      if (!(i % perRow)) {
         tElem = document.getElementById('stalk-details-row-dark-elixir-drill-' +
            Math.floor(i / perRow));
         tElem.style.display = '';
      }
   }

   // Hide any unused elements, and any fully unused lines as well
   for (i = numDED; i < mnumDED; i ++) {
      tElem = document.getElementById('stalk-details-dark-elixir-drill-' + i);
      tElem.style.display = 'none';

      if (!(i % perRow)) {
         tElem = document.getElementById('stalk-details-row-dark-elixir-drill-' +
            Math.floor(i / perRow));
         tElem.style.display = 'none';
      }
   }

   // Update Town Hall images.
   imgDefTownHallElem.src = clashingToolImageURL("town hall", defTH);
   imgAttTownHallElem.src = clashingToolImageURL("town hall", attTH);

   // Calculate revenge totals. We do it elsewhere so we can update it when
   // we change panels as well without having to run through the entire function.
   calculateRevengeTotals();

   // Save all appropriate values in cookies so we can retrieve them later.
   // Town Hall
   saveStorageValue('clashingTool', ddDefTownHallElem.id, defTH);
   saveStorageValue('clashingTool', ddAttTownHallElem.id, attTH);

   // Totals
   saveStorageValue('clashingTool', txtStalkTG.id,  TG);
   saveStorageValue('clashingTool', txtStalkTE.id,  TE);
   saveStorageValue('clashingTool', txtStalkTDE.id, TDE);

   // Individual totals
   saveStorageValue('clashingTool', txtStalkTGM.id,  TGM);
   saveStorageValue('clashingTool', txtStalkTEC.id,  TEC);
   saveStorageValue('clashingTool', txtStalkTDED.id, TDED);
   saveStorageValue('clashingTool', txtStalkTGS.id,  TGS);
   saveStorageValue('clashingTool', txtStalkTES.id,  TES);
   saveStorageValue('clashingTool', txtStalkTDES.id, TDES);

   // Details
   for (i = 0; i < numGM; i ++)
      saveStorageValue('clashingTool', txtGM[i].id, GM[i]);

   for (i = 0; i < numEC; i ++)
      saveStorageValue('clashingTool', txtEC[i].id, EC[i]);

   for (i = 0; i < numDED; i ++)
      saveStorageValue('clashingTool', txtDED[i].id, DED[i]);

   for (i = 0; i < numGS; i ++)
      saveStorageValue('clashingTool', txtGS[i].id, GS[i]);

   for (i = 0; i < numES; i ++)
      saveStorageValue('clashingTool', txtES[i].id, ES[i]);

   for (i = 0; i < numDES; i ++)
      saveStorageValue('clashingTool', txtDES[i].id, DES[i]);

   // Don't forget to watch for updates again now that we're done.
   clashingToolIgnoreUpdate = false;
}

/*
 * This is the function to reorganize the 'stalkulator' based on the option
 * selected.
 */
function updateClashingToolStalkMode() {
   var optEnterTotals =
      document.getElementById("radio-stalk-enter-totals");
   var optEnterIndividualTotals =
      document.getElementById("radio-stalk-enter-individual-totals");
   var optEnterDetails =
      document.getElementById("radio-stalk-enter-details");

   var divTotals =
      document.getElementById("div-stalkulator-table-totals");
   var divIndividualTotals =
      document.getElementById("div-stalkulator-table-individual-totals");
   var divDetails =
      document.getElementById("div-stalkulator-table-details");

   // Show the appropriate table and save the radio button values for later.
   if (optEnterTotals.checked) {
      divTotals.style.display           = 'block';
      divIndividualTotals.style.display = 'none';
      divDetails.style.display          = 'none';
      saveStorageValue('clashingTool', optEnterTotals.name, optEnterTotals.value);
   }
   else if (optEnterIndividualTotals.checked) {
      divTotals.style.display           = 'none';
      divIndividualTotals.style.display = 'block';
      divDetails.style.display          = 'none';
      saveStorageValue('clashingTool', optEnterIndividualTotals.name,
         optEnterIndividualTotals.value);
   }
   else if (optEnterDetails.checked) {
      divTotals.style.display           = 'none';
      divIndividualTotals.style.display = 'none';
      divDetails.style.display          = 'block';
      saveStorageValue('clashingTool', optEnterDetails.name, optEnterDetails.value);
   }
}

/*
 * Function to update the revenge totals.
 */
function calculateRevengeTotals() {
   var spnGold       = document.getElementById('span-stalk-results-gold');
   var spnElixir     = document.getElementById('span-stalk-results-elixir');
   var spnDarkElixir = document.getElementById('span-stalk-results-dark-elixir');

   // Figure out which panel we're on
   var optEnterTotals =
      document.getElementById("radio-stalk-enter-totals");
   var optEnterIndividualTotals =
      document.getElementById("radio-stalk-enter-individual-totals");
   var optEnterDetails =
      document.getElementById("radio-stalk-enter-details");

   // Collect Town Hall information.
   var ddDefTownHallElem =
      document.getElementById("dropdown-stalk-defending-town-hall");
   var ddAttTownHallElem =
      document.getElementById("dropdown-stalk-attacking-town-hall");
   var imgDefTownHallElem =
      document.getElementById("image-stalk-defending-town-hall");
   var imgAttTownHallElem =
      document.getElementById("image-stalk-attacking-town-hall");

   var defTH =
      ddDefTownHallElem.options[ddDefTownHallElem.selectedIndex].value;
   var attTH =
      ddAttTownHallElem.options[ddAttTownHallElem.selectedIndex].value;

   // Collect all totals elements.
   var numGS  = clashingToolInfoByTownHall('gold storages',        defTH);
   var numES  = clashingToolInfoByTownHall('elixir storages',      defTH);
   var numDES = clashingToolInfoByTownHall('dark elixir storages', defTH);
   var numGM  = clashingToolInfoByTownHall('gold mines',           defTH);
   var numEC  = clashingToolInfoByTownHall('elixir collectors',    defTH);
   var numDED = clashingToolInfoByTownHall('dark elixir drills',   defTH);

   var capGS  = clashingToolResourceInfo('gold storage',        'capacity',
      clashingToolInfoByTownHall('gold storage level',        defTH));
   var capES  = clashingToolResourceInfo('elixir storage',      'capacity',
      clashingToolInfoByTownHall('elixir storage level',      defTH));
   var capDES = clashingToolResourceInfo('dark elixir storage', 'capacity',
      clashingToolInfoByTownHall('dark elixir storage level', defTH));
   var capGM  = clashingToolResourceInfo('gold mine',           'capacity',
      clashingToolInfoByTownHall('gold mine level',           defTH));
   var capEC  = clashingToolResourceInfo('elixir collector',    'capacity',
      clashingToolInfoByTownHall('elixir collector level',    defTH));
   var capDED = clashingToolResourceInfo('dark elixir drill',   'capacity',
      clashingToolInfoByTownHall('dark elixir drill level',   defTH));

   var maxTGS  = capGS  * numGS;
   var maxTES  = capES  * numES;
   var maxTDES = capDES * numDES;
   var maxTGM  = capGM  * numGM;
   var maxTEC  = capEC  * numEC;
   var maxTDED = capDED * numDED;

   // Town Hall multiplier
   var multTH = 1.0;

   switch (Math.max(-4, Math.min(2, defTH - attTH))) {
      case  2: multTH = 1.5;
      break;
      case  1: multTH = 1.1;
      break;
      case  0: multTH = 1.0;
      break;
      case -1: multTH = 0.9;
      break;
      case -2: multTH = 0.5;
      break;
      case -3: multTH = 0.25;
      break;
      case -4: multTH = 0.05;
      break;
   }

   // Gold Storage percentage and cap
   var lootPctGS = 0.2;
   var lootCapGS = 198000;

   // Elixir Storage percentage and cap
   var lootPctES = 0.2;
   var lootCapES = 198000;

   // Dark Elixir Storage percentage and cap
   var lootPctDES = 0.05;
   var lootCapDES = 2000;

   // Gold Mine percentage and cap
   var lootPctGM = 0.5;
   var lootCapGM = -1; // Cap is capacity of the mine

   // Elixir Collector percentage and cap
   var lootPctEC = 0.5;
   var lootCapEC = -1; // Cap is capacity of the collector

   // Dark Elixir Drill percentage and cap
   var lootPctDED = 0.75;
   var lootCapDED = -1; // Cap is capacity of the drill

   // Town Hall percentage and cap
   var lootPctTH = 1.0;
   var lootCapTH = -1; // Cap is capacity of the Town Hall

   // Town Hall storage totals
   var maxTHG  = 1000;
   var maxTHE  = 1000;
   var maxTHDE = 0;

   // *** Totals ***
   if (optEnterTotals.checked) {
      var txtStalkTG = document.getElementById("textbox-stalk-totals-gold");
      var TG         = parseInt(txtStalkTG.value.trim(), 10);

      var txtStalkTE = document.getElementById("textbox-stalk-totals-elixir");
      var TE         = parseInt(txtStalkTE.value.trim(), 10);

      var txtStalkTDE = document.getElementById("textbox-stalk-totals-darkelixir");
      var TDE         = parseInt(txtStalkTDE.value.trim(), 10);

      // Gold
      // Cap the total gold based on defending Town Hall level
      if (TG > maxTGS + maxTGM)
         TG = maxTGS + maxTGM;

      // Fill the Town Hall first
      var totalsTH = Math.min(TG, maxTHG);

      // Fill up the virtual storages next
      var totalsGS = Math.min(TG - totalsTH, maxTGS);

      // Whatever is remaining goes into the virtual mines
      var totalsGM = TG - totalsTH - totalsGS;

      // Town Hall gold available
      var totalsLootTH = Math.min(maxTHG, totalsTH * lootPctTH * multTH, 
         (lootCapTH < 0 ? maxTHG : lootCapTH * multTH));

      // Storage gold available
      var totalsLootGS = Math.min(maxTGS, totalsGS * lootPctGS * multTH, 
         (lootCapGS < 0 ? maxTGS : lootCapGS * multTH));

      // Mine gold available
      var totalsLootGM = Math.min(maxTGM, totalsGM * lootPctGM * multTH, 
         (lootCapGM < 0 ? maxTGM : lootCapGM * multTH));

      spnGold.innerHTML =
         clashingToolCommas(totalsLootTH + totalsLootGS + totalsLootGM);

      // Elixir
      // Cap the total elixir based on defending Town Hall level
      if (TE > maxTES + maxTEC)
         TE = maxTES + maxTEC;

      // Fill the Town Hall first
      totalsTH = Math.min(TE, maxTHE);

      // Fill up the virtual storages next
      var totalsES = Math.min(TE - totalsTH, maxTES);

      // Whatever is remaining goes into the virtual collectors
      var totalsEC = TE - totalsTH - totalsES;

      // Town Hall elixir available
      totalsLootTH = Math.min(maxTHE, totalsTH * lootPctTH * multTH, 
         (lootCapTH < 0 ? maxTHE : lootCapTH * multTH));

      // Storage elixir available
      var totalsLootES = Math.min(maxTES, totalsES * lootPctES * multTH, 
         (lootCapES < 0 ? maxTES : lootCapES * multTH));

      // Collector elixir available
      var totalsLootEC = Math.min(maxTEC, totalsEC * lootPctEC * multTH, 
         (lootCapEC < 0 ? maxTEC : lootCapEC * multTH));

      spnElixir.innerHTML =
         clashingToolCommas(totalsLootTH + totalsLootES + totalsLootEC);

      // Dark Elixir
      // Cap the total dark elixir based on defending Town Hall level
      if (TDE > maxTDES + maxTDED)
         TDE = maxTDES + maxTDED;

      // Fill the Town Hall first
      totalsTH = Math.min(TDE, maxTHDE);

      // Fill up the virtual storages next
      var totalsDES = Math.min(TDE - totalsTH, maxTDES);

      // Whatever is remaining goes into the virtual drills
      var totalsDED = TDE - totalsTH - totalsDES;

      // Town Hall dark elixir available
      totalsLootTH = Math.min(maxTHDE, totalsTH * lootPctTH * multTH, 
         (lootCapTH < 0 ? maxTHDE : lootCapTH * multTH));

      // Storage dark elixir available
      var totalsLootDES = Math.min(maxTDES, totalsDES * lootPctDES * multTH, 
         (lootCapDES < 0 ? maxTDES : lootCapDES * multTH));

      // Drill dark elixir available
      var totalsLootDED = Math.min(maxTDED, totalsDED * lootPctDED * multTH, 
         (lootCapDED < 0 ? maxTDED : lootCapDED * multTH));

      spnDarkElixir.innerHTML =
         clashingToolCommas(totalsLootTH + totalsLootDES + totalsLootDED);
   }

   // *** Individual Totals ***
   else if (optEnterIndividualTotals.checked) {
      var txtStalkTGM = document.getElementById("textbox-stalk-totals-goldmines");
      var TGM         = parseInt(txtStalkTGM.value.trim(), 10);

      var txtStalkTEC =
         document.getElementById("textbox-stalk-totals-elixircollectors");
      var TEC         = parseInt(txtStalkTEC.value.trim(), 10);

      var txtStalkTDED =
         document.getElementById("textbox-stalk-totals-darkelixirdrills");
      var TDED         = parseInt(txtStalkTDED.value.trim(), 10);

      var txtStalkTGS = document.getElementById("textbox-stalk-totals-goldstorage");
      var TGS         = parseInt(txtStalkTGS.value.trim(), 10);

      var txtStalkTES =
         document.getElementById("textbox-stalk-totals-elixirstorage");
      var TES         = parseInt(txtStalkTES.value.trim(), 10);

      var txtStalkTDES =
         document.getElementById("textbox-stalk-totals-darkelixirstorage");
      var TDES         = parseInt(txtStalkTDES.value.trim(), 10);
   }

   // *** Details ***
   else if (optEnterDetails.checked) {
      var txtGS = [];
      var GS    = [];

      for (i = 0; i < numGS; i ++) {
         txtGS[i] =
            document.getElementById("textbox-stalk-details-goldstorage" + i);
         GS[i]    = txtGS[i].value.trim();
      }

      var txtES = [];
      var ES    = [];

      for (i = 0; i < numES; i ++) {
         txtES[i] =
            document.getElementById("textbox-stalk-details-elixirstorage" + i);
         ES[i]    = txtES[i].value.trim();
      }

      var txtDES = [];
      var DES    = [];

      for (i = 0; i < numDES; i ++) {
         txtDES[i] =
            document.getElementById("textbox-stalk-details-darkelixirstorage" + i);
         DES[i]    = txtDES[i].value.trim();
      }

      var txtGM = [];
      var GM    = [];

      for (i = 0; i < numGM; i ++) {
         txtGM[i] =
            document.getElementById("textbox-stalk-details-goldmine" + i);
         GM[i]    = txtGM[i].value.trim();
      }

      var txtEC = [];
      var EC    = [];

      for (i = 0; i < numEC; i ++) {
         txtEC[i] =
            document.getElementById("textbox-stalk-details-elixircollector" + i);
         EC[i]    = txtEC[i].value.trim();
      }

      var txtDED = [];
      var DED    = [];

      for (i = 0; i < numDED; i ++) {
         txtDED[i] =
            document.getElementById("textbox-stalk-details-darkelixirdrill" + i);
         DED[i]    = txtDED[i].value.trim();
      }
   }
}

/*
 * Error message generator. The supplied message will be red and prefaced with:
 * "Distribution not complete: " if the second argument is not supplied.
 * Supplying the second argument will cause the error text to be yellow.
 * A blank or zero first argument will clear the error bar.
 */
function clashingToolError(txtError, boolWarningOnly) {
   var errSpan = document.getElementById("error-bar");

   if (!txtError || txtError == "")
      errSpan.innerHTML = "";
   else if (boolWarningOnly) {
      errSpan.style.color = 'goldenrod';
      errSpan.innerHTML   = txtError;
   }
   else {
      errSpan.style.color = 'red';
      errSpan.innerHTML   = "Distribution not complete: " + txtError;
   }
}

/*
 * Clear all elixir (or dark elixir)-based inputs depending on argument.
 * Argument:
 *   0 - clears everything.
 *   1 - clears levels only.
 *   2 - clears quantities only.
 */
function clashingToolClear(intWhat, boolDarkElixir) {
   var i       = 0;
   var strType = "elixir";

   if (boolDarkElixir)
      strType = "dark elixir";

   var troopTypes = clashingToolValidTroopTypes(strType);

   /* Don't cascade calls of the update function */
   clashingToolIgnoreUpdate = true;

   /* Clear levels if levels (1) or everything (0) */
   if (!intWhat || intWhat == 1) {
      for (i = 0; i < troopTypes.length; i ++) {
         var ddElem = document.getElementById("dropdown-" + troopTypes[i]);

         ddElem.selectedIndex = 0;
      }
   }

   /* Clear quantities if quantities (2) or everything (0) */
   if (!intWhat || intWhat == 2) {
      for (i = 0; i < troopTypes.length; i ++) {
         var txtElem = document.getElementById("input-" + troopTypes[i]);

         txtElem.value = "0";
      }
   }

   /* Now we can update explicitly */
   clashingToolIgnoreUpdate = false;
   updateClashingTool();
}

/*
 * Clears the stalkulator table.
 */
function clashingToolStalkulatorClear(boolClearAll) {
   /* Don't cascade calls of the update function */
   clashingToolIgnoreUpdate = true;

   var optEnterTotals =
      document.getElementById("radio-stalk-enter-totals");
   var optEnterIndividualTotals =
      document.getElementById("radio-stalk-enter-individual-totals");
   var optEnterDetails =
      document.getElementById("radio-stalk-enter-details");

   /* Totals */
   if (boolClearAll || optEnterTotals.checked) {
      var txtStalkTG  = document.getElementById("textbox-stalk-totals-gold");
      var txtStalkTE  = document.getElementById("textbox-stalk-totals-elixir");
      var txtStalkTDE = document.getElementById("textbox-stalk-totals-darkelixir");

      txtStalkTG.value  = "0";
      txtStalkTE.value  = "0";
      txtStalkTDE.value = "0";
   }

   /* Individual Totals */
   if (boolClearAll || optEnterIndividualTotals.checked) {
      var txtStalkTGM = document.getElementById("textbox-stalk-totals-goldmines");
      var txtStalkTEC =
         document.getElementById("textbox-stalk-totals-elixircollectors");
      var txtStalkTDED =
         document.getElementById("textbox-stalk-totals-darkelixirdrills");
      var txtStalkTGS = document.getElementById("textbox-stalk-totals-goldstorage");
      var txtStalkTES =
         document.getElementById("textbox-stalk-totals-elixirstorage");
      var txtStalkTDES =
         document.getElementById("textbox-stalk-totals-darkelixirstorage");

      txtStalkTGM.value  = "0";
      txtStalkTEC.value  = "0";
      txtStalkTDED.value = "0";
      txtStalkTGS.value  = "0";
      txtStalkTES.value  = "0";
      txtStalkTDES.value = "0";
   }

   /* Details */
   if (boolClearAll || optEnterDetails.checked) {
      var maxTHLevel = clashingToolConstants("maxTHLevel");
      var numGS      = clashingToolInfoByTownHall('gold storages',        maxTHLevel);
      var numES      = clashingToolInfoByTownHall('elixir storages',      maxTHLevel);
      var numDES     = clashingToolInfoByTownHall('dark elixir storages', maxTHLevel);
      var numGM      = clashingToolInfoByTownHall('gold mines',           maxTHLevel);
      var numEC      = clashingToolInfoByTownHall('elixir collectors',    maxTHLevel);
      var numDED     = clashingToolInfoByTownHall('dark elixir drills',   maxTHLevel);
      var txtGM      = [];
      var txtEC      = [];
      var txtDED     = [];
      var txtGS      = [];
      var txtES      = [];
      var txtDES     = [];

      for (i = 0; i < numGM; i ++) {
         txtGM[i] =
            document.getElementById("textbox-stalk-details-goldmine" + i);
         txtGM[i].value  = "0";
      }

      for (i = 0; i < numEC; i ++) {
         txtEC[i] =
            document.getElementById("textbox-stalk-details-elixircollector" + i);
         txtEC[i].value  = "0";
      }

      for (i = 0; i < numDED; i ++) {
         txtDED[i] =
            document.getElementById("textbox-stalk-details-darkelixirdrill" + i);
         txtDED[i].value  = "0";
      }

      for (i = 0; i < numGS; i ++) {
         txtGS[i] =
            document.getElementById("textbox-stalk-details-goldstorage" + i);
         txtGS[i].value  = "0";
      }

      for (i = 0; i < numES; i ++) {
         txtES[i] =
            document.getElementById("textbox-stalk-details-elixirstorage" + i);
         txtES[i].value  = "0";
      }

      for (i = 0; i < numDES; i ++) {
         txtDES[i] =
            document.getElementById("textbox-stalk-details-darkelixirstorage" + i);
         txtDES[i].value  = "0";
      }
   }

   /* Now we can update explicitly */
   clashingToolIgnoreUpdate = false;
   updateClashingTool2();
}

/*
 * This function provides the absolute image URLs for the various buildings
 * and troops.
 */
function clashingToolImageURL(imgType, imgLevel) {
   var imgPath = "https://images.wikia.nocookie.net/clashofclans/images/";

   switch (imgType) {
      case "gold":
         return imgPath + "1/10/Gold.png";
      case "elixir":
         return imgPath + "4/43/Elixir.png";
      case "dark elixir":
         return imgPath + "3/3b/Dark_elixir.png";
      case "barracks":
         switch ('' + imgLevel) {
            case "1":
               return imgPath + "2/2c/Barracks1.png";
            case "2":
               return imgPath + "f/f0/Barracks2.png";
            case "3":
               return imgPath + "5/54/Barracks3.png";
            case "4":
               return imgPath + "8/84/Barracks4.png";
            case "5":
               return imgPath + "6/66/Barracks5.png";
            case "6":
               return imgPath + "4/4c/Barracks6.png";
            case "7":
               return imgPath + "2/29/Barracks7.png";
            case "8":
               return imgPath + "8/85/Barracks8.png";
            case "9":
               return imgPath + "3/39/Barracks9.png";
            case "10":
               return imgPath + "6/6a/Barracks10.png";
            default:
               return imgPath + "a/ae/Barracks0.png";
         }
      case "army camp":
         return imgPath + "b/be/Army_Camp8.png";
      case "dark barracks":
         switch ('' + imgLevel) {
            case "1":
               return imgPath + "a/ab/Darkbarracks1.png";
            case "2":
               return imgPath + "c/ce/Darkbarracks2.png";
            case "3":
               return imgPath + "6/6b/Darkbarracks3.png";
            case "4":
               return imgPath + "3/3c/Darkbarracks4.png";
            case "5":
               return imgPath + "9/9e/Darkbarracks5.png";
            default:
               return imgPath + "a/ae/Barracks0.png";
         }
      case "town hall":
         switch ('' + imgLevel) {
            case "1":
               return imgPath + "f/fd/Town_Hall1.png";
            case "2":
               return imgPath + "7/7d/Town_Hall2.png";
            case "3":
               return imgPath + "d/dd/Town_Hall3.png";
            case "4":
               return imgPath + "e/e7/Town_Hall4.png";
            case "5":
               return imgPath + "a/a3/Town_Hall5.png";
            case "6":
               return imgPath + "5/52/Town_Hall6.png";
            case "7":
               return imgPath + "7/75/Town_Hall7.png";
            case "8":
               return imgPath + "f/fa/Town_Hall8.png";
            case "9":
               return imgPath + "e/e0/Town_Hall9.png";
            case "10":
               return imgPath + "5/5c/Town_Hall10.png";
            default:
               return imgPath + "a/ae/Barracks0.png";
         }
      case "gold mine":
         switch ('' + imgLevel) {
            case "1":
               return imgPath + "b/bf/Gold_Mine1.png";
            case "2":
               return imgPath + "5/55/Gold_Mine2.png";
            case "3":
               return imgPath + "e/e4/Gold_Mine3.png";
            case "4":
               return imgPath + "9/97/Gold_Mine4.png";
            case "5":
               return imgPath + "1/1a/Gold_Mine5.png";
            case "6":
               return imgPath + "8/86/Gold_Mine6.png";
            case "7":
               return imgPath + "1/11/Gold_Mine7.png";
            case "8":
               return imgPath + "5/52/Gold_Mine8.png";
            case "9":
               return imgPath + "b/bf/Gold_Mine9.png";
            case "10":
               return imgPath + "e/eb/Gold_Mine10.png";
            case "11":
               return imgPath + "0/0d/Gold_Mine11.png";
            default:
               return imgPath + "a/ae/Barracks0.png";
         }
      case "elixir collector":
         switch ('' + imgLevel) {
            case "1":
               return imgPath + "5/5e/Elixir_Collector1.png";
            case "2":
               return imgPath + "0/05/Elixir_Collector2.png";
            case "3":
               return imgPath + "6/6d/Elixir_Collector3.png";
            case "4":
               return imgPath + "9/95/Elixir_Collector4.png";
            case "5":
               return imgPath + "4/44/Elixir_Collector5.png";
            case "6":
               return imgPath + "0/07/Elixir_Collector6.png";
            case "7":
               return imgPath + "3/35/Elixir_Collector7.png";
            case "8":
               return imgPath + "f/fc/Elixir_Collector8.png";
            case "9":
               return imgPath + "7/79/Elixir_Collector9.png";
            case "10":
               return imgPath + "f/f0/Elixir_Collector10.png";
            case "11":
               return imgPath + "9/9f/Elixir_Collector11.png";
            default:
               return imgPath + "a/ae/Barracks0.png";
         }
      case "dark elixir drill":
         switch ('' + imgLevel) {
            case "1":
               return imgPath + "d/d9/Dark_Elixir_Drill1.png";
            case "2":
               return imgPath + "7/7f/Dark_Elixir_Drill2.png";
            case "3":
               return imgPath + "f/f2/Dark_Elixir_Drill3.png";
            case "4":
               return imgPath + "c/cc/Dark_Elixir_Drill4.png";
            case "5":
               return imgPath + "a/a0/Dark_Elixir_Drill5.png";
            case "6":
               return imgPath + "d/d8/Dark_Elixir_Drill6.png";
            default:
               return imgPath + "a/ae/Barracks0.png";
         }
      case "gold storage":
         switch ('' + imgLevel) {
            case "1":
               return imgPath + "4/4f/Gold_Storage1.png";
            case "2":
               return imgPath + "f/f0/Gold_Storage2.png";
            case "3":
               return imgPath + "0/09/Gold_Storage3.png";
            case "4":
               return imgPath + "7/7c/Gold_Storage4.png";
            case "5":
               return imgPath + "6/62/Gold_Storage5.png";
            case "6":
               return imgPath + "3/36/Gold_Storage6.png";
            case "7":
               return imgPath + "b/bd/Gold_Storage7.png";
            case "8":
               return imgPath + "0/05/Gold_Storage8.png";
            case "9":
               return imgPath + "8/86/Gold_Storage9.png";
            case "10":
               return imgPath + "c/c2/Gold_Storage10.png";
            case "11":
               return imgPath + "5/5f/Gold_Storage11.png";
            default:
               return imgPath + "a/ae/Barracks0.png";
         }
      case "elixir storage":
         switch ('' + imgLevel) {
            case "1":
               return imgPath + "f/f6/Elixir_Storage1.png";
            case "2":
               return imgPath + "3/38/Elixir_Storage2.png";
            case "3":
               return imgPath + "9/9c/Elixir_Storage3.png";
            case "4":
               return imgPath + "e/e6/Elixir_Storage4.png";
            case "5":
               return imgPath + "c/ce/Elixir_Storage5.png";
            case "6":
               return imgPath + "e/eb/Elixir_Storage6.png";
            case "7":
               return imgPath + "8/8c/Elixir_Storage7.png";
            case "8":
               return imgPath + "7/74/Elixir_Storage8.png";
            case "9":
               return imgPath + "6/65/Elixir_Storage9.png";
            case "10":
               return imgPath + "2/2c/Elixir_Storage10.png";
            case "11":
               return imgPath + "3/3b/Elixir_Storage11.png";
            default:
               return imgPath + "a/ae/Barracks0.png";
         }
      case "dark elixir storage":
         switch ('' + imgLevel) {
            case "1":
               return imgPath + "1/1a/Dark_Elixir_Storage1.png";
            case "2":
               return imgPath + "c/cd/Dark_Elixir_Storage2.png";
            case "3":
               return imgPath + "c/c1/Dark_Elixir_Storage3.png";
            case "4":
               return imgPath + "b/b2/Dark_Elixir_Storage4.png";
            case "5":
               return imgPath + "0/07/Dark_Elixir_Storage5.png";
            case "6":
               return imgPath + "4/4b/Dark_Elixir_Storage6.png";
            default:
               return imgPath + "a/ae/Barracks0.png";
         }
   }
}

/*
 * Returns the maximum queue length per Barracks level.
 */
function clashingToolBarracksQueueLength(strLevel) {
   /* Uses "" + strLevel just in case it's passed an integer */
   switch ("" + strLevel) {
      case "1":  return 20;
      case "2":  return 25;
      case "3":  return 30;
      case "4":  return 35;
      case "5":  return 40;
      case "6":  return 45;
      case "7":  return 50;
      case "8":  return 55;
      case "9":  return 60;
      case "10": return 75;
      default:   return 0;
   }
}

/*
 * Returns the maximum queue length per Barracks level.
 */
function clashingToolDarkBarracksQueueLength(strLevel) {
   /* Uses "" + strLevel just in case it's passed an integer */
   switch ("" + strLevel) {
      case "1":  return 40;
      case "2":  return 50;
      case "3":  return 60;
      case "4":  return 70;
      case "5":  return 80;
      default:   return 0;
   }
}

/*
 * Returns an array of valid troop types.
 * Argument:
 *   (0 or blank):  all troop types.
 *   "elixir":      all elixir-based troop types.
 *   "dark elixir": all dark-elixir-based troop types.
 */
function clashingToolValidTroopTypes(strType) {
   var troopTypes = [];
   var offset     = 0;

   /* Both lists should be listed in increasing order of housing space required. */

   if (!strType || strType == "" || strType == "elixir") {
      troopTypes[0] = "Barbarian";
      troopTypes[1] = "Archer";
      troopTypes[2] = "Goblin";
      troopTypes[3] = "WallBreaker";
      troopTypes[4] = "Wizard";
      troopTypes[5] = "Giant";
      troopTypes[6] = "Balloon";
      troopTypes[7] = "Healer";
      troopTypes[8] = "Dragon";
      troopTypes[9] = "P.E.K.K.A";
      offset        = troopTypes.length;
   }

   if (!strType || strType == "" || strType == "dark elixir") {
      troopTypes[0 + offset] = "Minion";
      troopTypes[1 + offset] = "HogRider";
      troopTypes[2 + offset] = "Valkyrie";
      troopTypes[3 + offset] = "Witch";
      troopTypes[4 + offset] = "Golem";
   }

   return troopTypes;
}

/*
 * Determines an index for a troop type with a suffix.
 */
function clashingToolTroopSuffixIndex(strTroopType, strSuffix) {
   var troopTypes = clashingToolValidTroopTypes();

   for (var i = 0; i < troopTypes.length; i ++) {
      if (strTroopType == troopTypes[i] + strSuffix)
         return i;
   }

   return -1;
}

/*
 * Returns troop information.
 */
function clashingToolTroopInformation(strTroop, strInfo, intLevel) {
   return troopInfo(strTroop, strInfo, intLevel);
}
/*
 * Function to return information on number and level of buildings by
 * Town Hall level.
 */
function clashingToolInfoByTownHall(strInfo, intTHLevel) {
   var maxTHLevel = clashingToolConstants("maxTHLevel");

   if (intTHLevel < 1 || intTHLevel > maxTHLevel)
      return;

   // Number of buildings available
   if (strInfo.toLowerCase() == 'gold mines')
      return [1, 2, 3, 4, 5, 6, 6, 6, 6, 7][intTHLevel - 1];

   if (strInfo.toLowerCase() == 'elixir collectors')
      return [1, 2, 3, 4, 5, 6, 6, 6, 6, 7][intTHLevel - 1];

   if (strInfo.toLowerCase() == 'dark elixir drills')
      return [0, 0, 0, 0, 0, 0, 0, 1, 2, 3][intTHLevel - 1];

   if (strInfo.toLowerCase() == 'gold storages')
      return [1, 1, 2, 2, 2, 2, 2, 3, 4, 4][intTHLevel - 1];

   if (strInfo.toLowerCase() == 'elixir storages')
      return [1, 1, 2, 2, 2, 2, 2, 3, 4, 4][intTHLevel - 1];

   if (strInfo.toLowerCase() == 'dark elixir storages')
      return [0, 0, 0, 0, 0, 0, 1, 1, 1, 1][intTHLevel - 1];

   // Maximum level of buildings
   if (strInfo.toLowerCase() == 'gold mine level')
      return [2, 4, 6, 8, 10, 10, 11, 11, 11, 11][intTHLevel - 1];

   if (strInfo.toLowerCase() == 'elixir collector level')
      return [2, 4, 6, 8, 10, 10, 11, 11, 11, 11][intTHLevel - 1];

   if (strInfo.toLowerCase() == 'dark elixir drill level')
      return [0, 0, 0, 0, 0, 0, 0, 3, 6, 6][intTHLevel - 1];

   if (strInfo.toLowerCase() == 'gold storage level')
      return [1, 3, 6, 8, 9, 10, 11, 11, 11, 11][intTHLevel - 1];

   if (strInfo.toLowerCase() == 'elixir storage level')
      return [1, 3, 6, 8, 9, 10, 11, 11, 11, 11][intTHLevel - 1];

   if (strInfo.toLowerCase() == 'dark elixir storage level')
      return [0, 0, 0, 0, 0, 0, 2, 4, 6, 6][intTHLevel - 1];
}

/*
 * Function to return information on resource buildings by level.
 */
function clashingToolResourceInfo(strResource, strInfo, intLevel) {
   var resourceData = [];

   resourceData['gold mine'] = [];
   resourceData['gold mine']['build cost'] =
      [150, 300, 700, 1400, 3000, 7000, 14000, 28000, 56000, 84000, 168000];
   resourceData['gold mine']['build time'] =
      [1, 5, 15, 60, 120, 360, 720, 1440, 2880, 4320, 5760];
   resourceData['gold mine']['boost cost'] =
      [-1, -1, -1, -1, 4, 5, 6, 7, 8, 9, 11];
   resourceData['gold mine']['capacity'] =
      [500, 1000, 1500, 2500, 10000, 20000, 30000, 50000, 75000, 100000, 150000];
   resourceData['gold mine']['production rate'] =
      [200, 400, 600, 800, 1000, 1300, 1600, 1900, 2200, 2500, 3000];
   resourceData['gold mine']['hitpoints'] =
      [400, 450, 500, 550, 590, 610, 630, 660, 680, 710, 750];

   resourceData['elixir collector'] = [];
   resourceData['elixir collector']['build cost'] =
      [150, 300, 700, 1400, 3500, 7000, 14000, 28000, 56000, 84000, 168000];
   resourceData['elixir collector']['build time'] =
      [1, 5, 15, 60, 120, 360, 720, 1440, 2880, 4320, 5760];
   resourceData['elixir collector']['boost cost'] =
      [-1, -1, -1, -1, 4, 5, 6, 7, 8, 9, 11];
   resourceData['elixir collector']['capacity'] =
      [500, 1000, 1500, 2500, 10000, 20000, 30000, 50000, 75000, 100000, 150000];
   resourceData['elixir collector']['production rate'] =
      [200, 400, 600, 800, 1000, 1300, 1600, 1900, 2200, 2500, 3000];
   resourceData['elixir collector']['hitpoints'] =
      [400, 450, 500, 550, 590, 610, 630, 660, 680, 710, 750];

   resourceData['dark elixir drill'] = [];
   resourceData['dark elixir drill']['build cost'] =
      [1000000, 1500000, 2000000, 3000000, 4000000, 5000000];
   resourceData['dark elixir drill']['build time'] =
      [1440, 2880, 4320, 5760, 7200, 11520];
   resourceData['dark elixir drill']['boost cost'] =
      [7, 10, 15, 20, 27, 34];
   resourceData['dark elixir drill']['capacity'] =
      [120, 240, 450, 720, 1120, 1600];
   resourceData['dark elixir drill']['production rate'] =
      [20, 30, 45, 60, 80, 100];
   resourceData['dark elixir drill']['hitpoints'] =
      [400, 480, 580, 690, 830, 1000];

   resourceData['gold storage'] = [];
   resourceData['gold storage']['build cost'] =
      [300, 750, 1500, 3000, 6000, 12000, 25000, 50000, 100000, 250000, 500000];
   resourceData['gold storage']['build time'] =
      [15, 30, 60, 120, 180, 240, 360, 480, 720, 1440, 2880];
   resourceData['gold storage']['capacity'] =
      [1500, 3000, 6000, 12000, 25000, 50000, 100000, 250000, 500000, 1000000,
       2000000];
   resourceData['gold storage']['hitpoints'] =
      [400, 600, 800, 1000, 1200, 1500, 1650, 1740, 1820, 1920, 2016];

   resourceData['elixir storage'] = [];
   resourceData['elixir storage']['build cost'] =
      [300, 750, 1500, 3000, 6000, 12000, 25000, 50000, 100000, 250000, 500000];
   resourceData['elixir storage']['build time'] =
      [15, 30, 60, 120, 180, 240, 360, 480, 720, 1440, 2880];
   resourceData['elixir storage']['capacity'] =
      [1500, 3000, 6000, 12000, 25000, 50000, 100000, 250000, 500000, 1000000,
       2000000];
   resourceData['elixir storage']['hitpoints'] =
      [400, 600, 800, 1000, 1200, 1500, 1650, 1740, 1820, 1920, 2016];

   resourceData['dark elixir storage'] = [];
   resourceData['dark elixir storage']['build cost'] =
      [600000, 1200000, 1800000, 2400000, 3000000, 3600000];
   resourceData['dark elixir storage']['build time'] =
      [1440, 2880, 4320, 5760, 7200, 8640];
   resourceData['dark elixir storage']['capacity'] =
      [10000, 20000, 40000, 80000, 150000, 200000];
   resourceData['dark elixir storage']['hitpoints'] =
      [2000, 2200, 2400, 2600, 2900, 3200];

   return resourceData[strResource.toLowerCase()][strInfo.toLowerCase()][intLevel - 1];
}

/*
 * Function to format a number with a thousands separator (,), formatted to
 * a specified significant digit.
 */
function clashingToolCommas(floatNumber, intSigDigit) {
   if (!intSigDigit)
      intSigDigit = 0;

   floatNumber = Math.round(floatNumber * Math.pow(10, intSigDigit)) /
      Math.pow(10, intSigDigit);

   if (intSigDigit < 1)
      return floatNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

   var floatInt     = Math.floor(floatNumber);
   var floatDecimal = floatNumber - floatInt;
   var strDecimal   = "";

   if (floatDecimal)
      strDecimal = floatDecimal.toString().substring(2);

   while (strDecimal.length < intSigDigit)
      strDecimal += '0';

   strDecimal = '.' + strDecimal.substring(0, intSigDigit);
   return floatInt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + strDecimal;
}

/*
 * Function to format a specified number of seconds into hh:mm:ss.
 */
function clashingToolTime(intSeconds) {
    var hours   = Math.floor(intSeconds / 3600);
    var minutes = Math.floor((intSeconds - (hours * 3600)) / 60);
    var seconds = intSeconds - (hours * 3600) - (minutes * 60);

    if (hours   < 10) hours   = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;

    return hours + ':' + minutes + ':' + seconds;
}

/*
 * Returns 's' or 'es' depending on which troop type is queried.
c */
function clashingToolPlural(strTroopType) {
   if (strTroopType.toLowerCase() == "witch")
      return "es";

   return "s";
}

/*
 * Creates the OnLoadHook for this module.
 */
addOnloadHook(createClashingToolControls);