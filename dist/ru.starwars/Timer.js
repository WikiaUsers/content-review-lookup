/* таймер обратного отсчёта */

$(document).ready(function() 
{   
	// находим кол-во таймеров на странице
	iTimers = $(".TimerCountDown").length;
	// набор из таймеров
	oTimers = $(".TimerCountDown");
	
	// если таймеры имеются, 
	if ( iTimers > 0)
	{
		// запускаем ежесекундное выполнение функции по обновлению таймера и находим ID функции
		iTimerId = 	setInterval(initializeTimer , 1000) ;
	}
});


// функция инициализации таймера
function initializeTimer() 
{
	// текущая дата
	var dNow = new Date(); 
	// переменная для даты истечения таймера 
	var dEndCount= new Date();
	// количество милисекунд 
	var fSeconds = 0; 
	// количество минут 
	var fMinutes = 0; 
	// количество часов 
	var fHours = 0; 
	// количество дней 
	var fDays = 0;
	
	// функция обновления для каждого таймера  на странице
	oTimers.each(
	function()
	{
		// если все таймеры уже истекли
		if ( oTimers == null)
		{
			// останавливаем вызов функции через каждую секунду
			clearInterval(iTimerId); 
			// выход
			return;
		}
		// получаем дату истечения таймера формат: месяц, день, год,  час, минута, секунда , смещение по часовому поясу
		dEndCount= new Date( $(this).attr('data-to'));
		
		// определяем количество милисекунд до истечения таймера, делим на 1000 -- узнаём секунды
		fSeconds = (dEndCount- dNow) / 1000; 
		
		// если секунд нет, выходим из функции
		if (fSeconds <= 0) 
		{
			// удаляем закончившийся таймер из набора
			oTimers.find( this).detach();
			// выход
			return;
		}

		// определяем количество минут до истечения таймера
		fMinutes = fSeconds/60; 
		// определяем количество часов до истечения таймера
		fHours = fMinutes/60; 
		// определяем количество дней до истечения таймера
		fDays = fHours/24; 

		// подсчитываем целое количество часов до истечения таймера
		fHours = (fDays- Math.floor(fDays) ) *24; 
		// округляем кол-во дней
		fDays = Math.floor(fDays); 
		// подсчитываем кол-во оставшихся минут в текущем часе
		fMinutes = (fHours - Math.floor(fHours)) * 60; 
		// округляем кол-во часов 
		fHours = Math.floor(fHours); 	
		// подсчитываем кол-во оставшихся секунд в текущей минуте
		fSeconds = Math.floor( (fMinutes - Math.floor(fMinutes) ) * 60); 
		// округляем кол-во оставшихся минут в текущем часе
		fMinutes = Math.floor(fMinutes); 

		// если в текущей минуте закончились секунды
		if (fSeconds == 0) 
		{ 
			// если в текущем часе закончились минуты 
			if (fMinutes == 0) 
			{ 
				// если в текущем дне закончились часы 
				if (fHours == 0) 
				{ 
					// если  закончились дни
					if (fDays == 0) 
					{ 
						// выводим сообщение об окончании отсчета
					}
					else
					{
						// уменьшаем кол-во дней
						fDays--;
						// обновляем часы
						fHours=23; 
						// обновляем минуты 
						fMinutes = 59; 
						// обновляем секунды
						fSeconds = 59; 
					}
				
				}
				else 
				{
					// уменьшаем кол-во часов
					fHours--; 
					// обновляем минуты 
					fMinutes = 59; 
					// обновляем секунды
					fSeconds = 59; 
				}
			}
			else 
			{
				// уменьшаем кол-во минут
				fMinutes--; 
				// обновляем секунды
				fSeconds = 59; 
			}
		}
		else 
		{
			// уменьшаем кол-во секунд
			fSeconds--; 
		}

		// обновляем значения таймера на странице
		$('.TimerDay .num', this).text( fDays );
		$('.TimerHour .num', this).text( fHours );
		$('.TimerMinute .num', this).text( fMinutes );
		$('.TimerSecond .num', this).text( fSeconds );
	});
}