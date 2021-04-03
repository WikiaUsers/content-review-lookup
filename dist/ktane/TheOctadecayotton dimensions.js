switch (mw.config.get('wgPageName')) {
	case 'The_Octadecayotton':
		document.getElementById("dimSelect").innerHTML = "<label for=\"dimensions\">Dimensions used:</label>" +
			"<select name=\"dimensions\" id=\"dimensions\">" +
				"<option value=\"3\">3 Dimensions</option>" +
				"<option value=\"4\">4 Dimensions</option>" +
				"<option value=\"5\">5 Dimensions</option>" +
				"<option value=\"6\">6 Dimensions</option>" +
				"<option value=\"7\">7 Dimensions</option>" +
				"<option value=\"8\">8 Dimensions</option>" +
				"<option value=\"9\" selected=\"selected\">9 Dimensions</option>" +
				"<option value=\"10\">10 Dimensions</option>" +
				"<option value=\"11\">11 Dimensions</option>" +
				"<option value=\"12\">12 Dimensions</option>" +
			"</select>";
		const dimension = document.getElementById('dimensions');
		const diagrams = document.querySelectorAll('.diagram');
		const horizontalSeparators = document.querySelectorAll('.horizontal-separator');
		const verticalSeparators = document.querySelectorAll('.vertical-separator');
		const lastRow = document.querySelectorAll('.last-row');

		const dimNumber = document.querySelectorAll('.dim-number');
		const dimAxisList = document.querySelectorAll('.dim-axis-list');
        const dimAxisList2 = document.querySelectorAll('.dim-axis-list2');
        const dimAxisList3 = document.querySelectorAll('.dim-axis-list3');
        const dimSphereCount = document.querySelectorAll('.dim-sphere-count');
        const dimUpperBound = document.querySelectorAll('.dim-upper-bound');
        const dimAxisQueue = document.querySelectorAll('.dim-axis-queue');
        const dimSubmitTime = document.querySelectorAll('.dim-submit-time');
        const dimSubmitType = document.querySelectorAll('.dim-submit-type');
        const dimaStart = document.querySelectorAll('.dim-a-start');
        const dima0Check = document.querySelectorAll('.dim-a0-check');
        const dima0Set = document.querySelectorAll('.dim-a0-set');
        const dima0Set2 = document.querySelectorAll('.dim-a0-set2');
        const dima0Set3 = document.querySelectorAll('.dim-a0-set3');
        const dima0Set4 = document.querySelectorAll('.dim-a0-set4');
        const dima0Set5 = document.querySelectorAll('.dim-a0-set5');
        const dimModulo = document.getElementById('dim-modulo');
        const dimModuloExplanation = document.getElementById('dim-modulo-explanation');

        const dimExactly3 = document.getElementById('dim-exactly-3');
        const dimExactly4 = document.getElementById('dim-exactly-4');
        const dimExceed4 = document.querySelectorAll('.dim-exceed-4');
        const dimExceed5 = document.querySelectorAll('.dim-exceed-5');
        const dimExceed6 = document.querySelectorAll('.dim-exceed-6');
        const dimExceed7 = document.querySelectorAll('.dim-exceed-7');
        const dimExceed8 = document.querySelectorAll('.dim-exceed-8');
        const dimExceed9 = document.querySelectorAll('.dim-exceed-9');
        const dimExceed10 = document.querySelectorAll('.dim-exceed-10');
        const dimExceed11 = document.querySelectorAll('.dim-exceed-11');
        const dimExceed12 = document.querySelectorAll('.dim-exceed-12');
        const dimMod3Not0 = document.querySelectorAll('.dim-mod3-not0');
        const dimMod32 = document.querySelectorAll('.dim-mod3-2');

        dimension.addEventListener('change', (event) => onChange(event.target.value));
        dimension.addEventListener('onload', (event) => onChange(event.target.value));
        onChange(dimension.value);

		function onChange(dim) {
			const index = Number(dim) - 3;
			for (let i = 0; i < dimNumber.length; i++)
				dimNumber[i].innerHTML = dim;
			for (let i = 0; i < diagrams.length; i++)
				diagrams[i].style.display = 'none';
			diagrams[0].style.display = 'block';
			diagrams[index + 1].style.display = 'block';
			diagrams[index + 11].style.display = 'block';
			for (let i = 0; i < horizontalSeparators.length; i++)
				horizontalSeparators[i].rowSpan = index + 3;
			for (let i = 0; i < verticalSeparators.length; i++)
				verticalSeparators[i].colSpan = index + 3;
			for (let i = 0; i < lastRow.length; i++)
				if ((index - 3) % 2 === 0)
					lastRow[i].classList.remove('odd');
				else
					lastRow[i].classList.add('odd');
	        for (let i = 0; i < dimAxisList.length; i++)
	            dimAxisList[i].innerHTML = [
					'X, Y, and Z',
	            	'X, Y, Z, and W',
	            	'X, Y, Z, W, and V',
	            	'X, Y, Z, W, V, and U',
	            	'X, Y, Z, W, V, U, and R',
	            	'X, Y, Z, W, V, U, R, and S',
	            	'X, Y, Z, W, V, U, R, S, and T',
	            	'X, Y, Z, W, V, U, R, S, T, and O',
	            	'X, Y, Z, W, V, U, R, S, T, O, and P',
	            	'X, Y, Z, W, V, U, R, S, T, O, P, and Q'][index];
	        for (let i = 0; i < dimAxisList2.length; i++)
	            dimAxisList2[i].innerHTML = [
	            	'Z, Y (stacked on top of the filled sphere), and X', 'Z, W, Y (stacked on top of the filled sphere), and X', 'Z, V, W, Y (stacked on top of the filled sphere), and X', 'Z, V, W, U, Y (stacked on top of the filled sphere), and X', 'Z, V, W, U, R, Y (stacked on top of the filled sphere), and X', 'S, Z, V, W, U, R, Y (stacked on top of the filled sphere), and X', 'S, Z, V, W, U, T, R, Y (stacked on top of the filled sphere), and X', 'O, S, Z, V, W, U, T, R, Y (stacked on top of the filled sphere), and X', 'O, S, Z, V, W, P, U, T, R, Y (stacked on top of the filled sphere), and X', 'O, S, Z, V, W, P, U, Q, T, R, Y (stacked on top of the filled sphere), and X'][index];
	        for (let i = 0; i < dimAxisList3.length; i++)
	            dimAxisList3[i].innerHTML = 'XYZWVURSTOPQ'.substring(0, index + 3);
	        for (let i = 0; i < dimSphereCount.length; i++)
	            dimSphereCount[i].innerHTML = Math.pow(2, index + 3);
	        for (let i = 0; i < dimUpperBound.length; i++)
	            dimUpperBound[i].innerHTML = index + 2;
	        for (let i = 0; i < dimAxisQueue.length; i++)
	            dimAxisQueue[i].innerHTML = index === 0 ? '1 axis' : '3 axes';
	        for (let i = 0; i < dimSubmitTime.length; i++)
	            dimSubmitTime[i].innerHTML = index >= 8 ? 'seconds digits are 19, 39 or 59' : 'last digit is a 9';
	        for (let i = 0; i < dimSubmitType.length; i++)
	            dimSubmitType[i].innerHTML = index >= 8 ? 'seconds digits (modulo 20)' : 'last digit';
	        for (let i = 0; i < dimaStart.length; i++)
	            dimaStart[i].innerHTML = ['"000"', '"0000"', '"00000"', '"000000"', '"0000000"', '"00000000"', '"000000000"', '"0000000000"', '"00000000000"', '"000000000000"',][index];
	        for (let i = 0; i < dima0Check.length; i++)
	            dima0Check[i].innerHTML = ['2<sup>nd</sup>', '3<sup>rd</sup>', '3<sup>rd</sup>', '4<sup>th</sup>', '4<sup>th</sup>', '5<sup>th</sup>', '5<sup>th</sup>', '6<sup>th</sup>', '6<sup>th</sup>', '7<sup>th</sup>'][index];
	        for (let i = 0; i < dima0Set.length; i++)
	            dima0Set[i].innerHTML = ['set the 1<sup>st</sup> digit', 'set the 1<sup>st</sup> digit', 'set the 1<sup>st</sup> digit', 'set the 1<sup>st</sup> and 2<sup>nd</sup> digits', 'set the 1<sup>st</sup> and 2<sup>nd</sup> digits', 'set the 1<sup>st</sup> and 2<sup>nd</sup> digits', 'set the 1<sup>st</sup>, 2<sup>nd</sup>, and 3<sup>rd</sup> digits', 'set the 1<sup>st</sup>, 2<sup>nd</sup>, and 3<sup>rd</sup> digits', 'set the 1<sup>st</sup>, 2<sup>nd</sup>, and 3<sup>rd</sup> digits', 'set the 1<sup>st</sup>, 2<sup>nd</sup>, 3<sup>rd</sup>, and 4<sup>th</sup> digits'][index];
	        for (let i = 0; i < dima0Set2.length; i++)
	            dima0Set2[i].innerHTML = ['set the 2<sup>nd</sup> digit', 'set the 2<sup>nd</sup> digit', 'set the 2<sup>nd</sup> digit', 'set the 3<sup>rd</sup> and 4<sup>th</sup> digits', 'set the 3<sup>rd</sup> and 4<sup>th</sup> digits', 'set the 3<sup>rd</sup> and 4<sup>th</sup> digits', 'set the 4<sup>th</sup>, 5<sup>th</sup>, and 6<sup>th</sup> digits', 'set the 4<sup>th</sup>, 5<sup>th</sup>, and 6<sup>th</sup> digits', 'set the 4<sup>th</sup>, 5<sup>th</sup>, and 6<sup>th</sup> digits', 'set the 5<sup>th</sup>, 6<sup>th</sup>, 7<sup>th</sup>, and 8<sup>th</sup> digits'][index];
	        for (let i = 0; i < dima0Set3.length; i++)
	            dima0Set3[i].innerHTML = ['set the 3<sup>rd</sup> digit', 'set the 3<sup>rd</sup> digit', 'set the 3<sup>rd</sup> digit', 'set the 5<sup>th</sup> and 6<sup>th</sup> digits', 'set the 5<sup>th</sup> and 6<sup>th</sup> digits', 'set the 5<sup>th</sup> and 6<sup>th</sup> digits', 'set the 7<sup>th</sup>, 8<sup>th</sup>, and 9<sup>th</sup> digits', 'set the 7<sup>th</sup>, 8<sup>th</sup>, and 9<sup>th</sup> digits', 'set the 7<sup>th</sup>, 8<sup>th</sup>, and 9<sup>th</sup> digits', 'set the 9<sup>th</sup>, 10<sup>th</sup>, 11<sup>th</sup>, and 12<sup>th</sup> digits'][index];
	        for (let i = 0; i < dima0Set4.length; i++)
	            dima0Set4[i].innerHTML = ['huh?', 'set the 4<sup>th</sup> digit', 'set the 4<sup>th</sup> digit', 'huh?', 'set the 7<sup>th</sup> digits', 'set the 7<sup>th</sup> and 8<sup>th</sup> digits', 'huh?', 'set the 10<sup>th</sup> digit', 'set the 10<sup>th</sup> digit', 'huh?'][index];
	        for (let i = 0; i < dima0Set5.length; i++)
	            dima0Set5[i].innerHTML = ['huh?', 'huh?', 'set the 5<sup>th</sup> digit', 'huh?', 'huh?', 'huh?', 'huh?', 'huh?', 'huh?', 'huh?'][index];
	        dimModulo.innerHTML = index + 3 < 6 ? 'modulo ' + Math.pow(2, index + 3) : '';
	       dimModuloExplanation.innerHTML = index + 3 < 6 ? '<sup><i>* Modulo is to add/subtract the right number until the left is non-negative, and less than the right.</i></sup></span>' : '';

            dimExactly3.style.display = index + 3 === 3 ? '' : 'none';
            dimExactly4.innerHTML = index + 3 === 4 ? 'Submitting an axis that has been submitted twice or more times causes a soft-strike. Only the 6<sup>th</sup> soft-strike causes a strike on the bomb, and resets the module.' : 'Submitting an axis that has been submitted twice or more times causes a soft-strike. Only the 5<sup>th</sup> soft-strike causes a strike on the bomb, and resets the module.';
            for (let i = 0; i < dimExceed4.length; i++)
                dimExceed4[i].style.display = index + 3 >= 4 ? '' : 'none';
            for (let i = 0; i < dimExceed5.length; i++)
                dimExceed5[i].style.display = index + 3 >= 5 ? '' : 'none';
            for (let i = 0; i < dimExceed6.length; i++)
                dimExceed6[i].style.display = index + 3 >= 6 ? '' : 'none';
            for (let i = 0; i < dimExceed7.length; i++)
                dimExceed7[i].style.display = index + 3 >= 7 ? '' : 'none';
            for (let i = 0; i < dimExceed8.length; i++)
                dimExceed8[i].style.display = index + 3 >= 8 ? '' : 'none';
            for (let i = 0; i < dimExceed9.length; i++)
                dimExceed9[i].style.display = index + 3 >= 9 ? '' : 'none';
            for (let i = 0; i < dimExceed10.length; i++)
                dimExceed10[i].style.display = index + 3 >= 10 ? '' : 'none';
            for (let i = 0; i < dimExceed11.length; i++)
                dimExceed11[i].style.display = index + 3 >= 11 ? '' : 'none';
            for (let i = 0; i < dimExceed12.length; i++)
                dimExceed12[i].style.display = index + 3 >= 12 ? '' : 'none';
            for (let i = 0; i < dimMod3Not0.length; i++)
                dimMod3Not0[i].style.display = index % 3 !== 0 ? '' : 'none';
            for (let i = 0; i < dimMod32.length; i++)
                dimMod32[i].style.display = index === 2 ? '' : 'none';
        }
    
	break;
}