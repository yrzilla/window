const timer = (id, deadline) => { // id - куда будет рендерится таймер, deadline - до какого времени идет таймер

    const addZero = (num) => {
        if(num <= 9) {
            return '0' + num;
        } else {
            return num;
        }
    };

    const getTimeRemaining = (endTime) => {
        const t = Date.parse(endTime) - Date.parse(new Date()), // t - разница между дедлайном и текущей датой(время до мс)
              seconds = Math.floor((t/1000) % 60), // (t/1000) - кол-во секунд
              minutes = Math.floor((t/1000/60) % 60), // (t/1000/60) - кол-во минут которое содержится в t
              hours = Math.floor((t/(1000 * 60 * 60)) % 24), // (t/(1000 * 60 * 60)) - кол-во часов
              days = Math.floor((t/(1000 * 60 * 60 * 24)));

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    };

    const setClock = (selector, endTime) => {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);
        updateClock();
        function updateClock() {
            const t = getTimeRemaining(endTime);

            days.textContent = addZero(t.days);
            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            if(t.total <= 0) {
                days.textContent = '00';
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';

                clearInterval(timeInterval);
            }
        }
    };

    setClock(id, deadline);
};

export default timer;