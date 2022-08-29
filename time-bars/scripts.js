// ****************************************************************************
// Project : X Life / Time / Bars
// Author Name: Samuel Slivoš , Bruno Garret
// Date: 2022.08.10
// Description: Split time to timezooms and render in bars view.
// ****************************************************************************



// ****************************************************************************
// 
// commons
// 
// ****************************************************************************



let progressMinute = document.getElementById('progress-minute');
let minuteWidth = 0;

let progressHour = document.getElementById('progress-hour');
let hourWidth = 0;

let progressDay = document.getElementById('progress-day');
let dayWidth = 0;

let progressWeek = document.getElementById('progress-week');
let weekWidth = 0;

let progressMonth = document.getElementById('progress-month');
let monthWidth = 0;

let progressQuarter = document.getElementById('progress-quarter');
let quarterWidth = 0;

let progressYear = document.getElementById('progress-year');
let yearWidth = 0;

let progressDecade = document.getElementById('progress-decade');
let decadeWidth = 0;

let progressCentury = document.getElementById('progress-century');
let centuryWidth = 0;

let progressMillennium = document.getElementById('progress-millennium');
let millenniumWidth = 0;

let totalWidth = 100;
let current = new Date();
let oneDay = 1000 * 60 * 60 * 24;
let oneWeek = 1000 * 60 * 60 * 24 * 7;
let monthLastDay = new Date(current.getFullYear(), current.getMonth() + 1, 0);
let oneMonth = 1000 * 60 * 60 * 24 * monthLastDay.getDate();
let yearStart = new Date(current.getFullYear(), 0, 0);
let diff = current - yearStart;
let day = Math.floor(diff / oneDay);
let year = current.getFullYear();
let monthPassedInt = Math.floor(current.getMonth() + 1);
let minutePassedInt = Math.floor(current.getMinutes());

// defining common shape of custom functions
const round = (n, to) => n - (n % to);
const moduloYear = (n, to) => (n % to);
const startEpoch = (n, to, m, d) => new Date(round(n, to), m, d);
const endEpoch = (n, to, period, m, d) => new Date(round(n, to) + period, m, d);
const findRemaining = (end, start) => end - start;
const findMonthRemaining = (mEnd, mStart, yEnd, yStart) => (mEnd - mStart) + (yEnd - yStart) * 12;
const findPassed = (n, rem) => n - rem;
const leadingZero = (timeZoom) => timeZoom >= 10 ? timeZoom : `0${timeZoom}`

let minuteValue = document.getElementById('minute-value');
let hourValue = document.getElementById('hour-value');
let dayValue = document.getElementById('day-value');
let weekValue = document.getElementById('week-value');
let monthValue = document.getElementById('month-value');
let quarterValue = document.getElementById('quarter-value');
let yearValue = document.getElementById('year-value');
let decadeValue = document.getElementById('decade-value');
let centuryValue = document.getElementById('century-value');
let millenniumValue = document.getElementById('millennium-value');

// get concrete span elements by id for purpose of displaying percentage values
let minuteValuePercent = document.getElementById('minute-value-percent');
let hourValuePercent = document.getElementById('hour-value-percent');
let dayValuePercent = document.getElementById('day-value-percent');
let weekValuePercent = document.getElementById('week-value-percent');
let monthValuePercent = document.getElementById('month-value-percent');
let quarterValuePercent = document.getElementById('quarter-value-percent');
let yearValuePercent = document.getElementById('year-value-percent');
let decadeValuePercent = document.getElementById('decade-value-percent');
let centuryValuePercent = document.getElementById('century-value-percent');
let millenniumValuePercent = document.getElementById('millennium-value-percent');

let minutePeriod = document.querySelector('#minute-value-readable');
let hourPeriod = document.querySelector('#hour-value-readable');
let dayPeriod = document.querySelector('#day-value-readable');
let weekPeriod = document.querySelector('#week-value-readable');
let monthPeriod = document.querySelector('#month-value-readable');
let quarterPeriod = document.querySelector('#quarter-value-readable');
let yearPeriod = document.querySelector('#year-value-readable');
let decadePeriod = document.querySelector('#decade-value-readable');
let centuryPeriod = document.querySelector('#century-value-readable');
let millenniumPeriod = document.querySelector('#millennium-value-readable');



// ****************************************************************************
// 
// render timezooms
// 
// ****************************************************************************



const timeZoomInterval = setInterval(() => {

	let current = new Date();

	time__zoom_minute(current);
	time__zoom_hour(current);
	time__zoom_day(current);
	time__zoom_week(current);
	time__zoom_month(current);
	time__zoom_quarter(current);
	time__zoom_year(current);
	time__zoom_decade(current);
	time__zoom_century(current);
	time__zoom_millennium(current);

}, 1000)


function time__zoom_millennium(current) {
	const millenniumStart = startEpoch(current.getFullYear(), 1, 0, 0);

	const millenniumEnd = endEpoch(current.getFullYear(), 1000, 1000, 0, 0);

	const millenniumRem = findRemaining(
		millenniumEnd.getFullYear(),
		millenniumStart.getFullYear()
	);

	const millenniumPassed = Math.floor(100 / 1000 * findPassed(1000, millenniumRem));
	const millenniumPassedInt = Math.floor(findPassed(1000, millenniumRem));


	if (millenniumWidth < totalWidth) {
		millenniumWidth = millenniumPassed;

		progressMillennium.style.setProperty(
			'--progress-lifetime--value',
			millenniumWidth + '%'
		);
		progressMillennium.setAttribute('value', millenniumWidth);
		millenniumValue.innerHTML = `Years : ${leadingZero(millenniumPassedInt)} / 1000`;
		millenniumValuePercent.innerHTML = `${millenniumWidth} %`;

	}
	else if (minuteWidth, hourWidth, dayWidth, weekWidth, monthWidth, quarterWidth, yearWidth, decadeWidth, centuryWidth, millenniumWidth >= totalWidth) {
		clearInterval(timeZoomInterval);
	}
}

function time__zoom_century(current) {
	const centuryStart = startEpoch(current.getFullYear(), 1, 0, 0);

	const centuryEnd = endEpoch(current.getFullYear(), 100, 100, 0, 0);

	const centuryRem = findRemaining(
		centuryEnd.getFullYear(),
		centuryStart.getFullYear()
	);

	const centuryPassed = Math.floor(findPassed(100, centuryRem));
	const centuryYear = Math.floor(moduloYear(current.getFullYear(), 1000) / 100);

	if (centuryWidth < totalWidth) {
		centuryWidth = centuryPassed;

		progressCentury.style.setProperty(
			'--progress-lifetime--value',
			centuryWidth + '%'
		);
		progressCentury.setAttribute('value', centuryWidth);
		centuryValue.innerHTML = `Years : ${leadingZero(centuryWidth)} / 100`;
		centuryValuePercent.innerHTML = `${centuryWidth} %`;

	}
}

function time__zoom_decade(current) {

	// get value from start until this day of elapsed decade, century, millennium
	const decadeStartYear = startEpoch(current.getFullYear(), 1, 0, 0);

	// get end-value of decade, century, millennium
	const decadeEndYear = endEpoch(current.getFullYear(), 10, 10, 0, 0);

	// find how much remaining
	const decadeRem = findRemaining(
		decadeEndYear.getFullYear(),
		decadeStartYear.getFullYear()
	);

	// find how much it passed
	const decadePassedInt = Math.floor(findPassed(10, decadeRem));

	const decadeStartMonth = startEpoch(current.getFullYear() - 1, 1, current.getMonth(), 1);

	const decadeEndMonth = endEpoch(current.getFullYear(), 10, 10, 0, 0);

	const decadeRemMonth = findMonthRemaining(
		decadeEndMonth.getMonth(),
		decadeStartMonth.getMonth(),
		decadeEndMonth.getFullYear(),
		decadeStartMonth.getFullYear()
	);

	const decadePassedMonth = Math.floor(100 / 120 * findPassed(120, decadeRemMonth));
	const decadePassedMonthInt = Math.floor(findPassed(120, decadeRemMonth));

	if (decadeWidth < totalWidth) {
		decadeWidth = decadePassedMonth;

		progressDecade.style.setProperty(
			'--progress-lifetime--value',
			decadeWidth + '%'
		);
		progressDecade.setAttribute('value', decadeWidth);
		decadeValue.innerHTML = `Years : ${leadingZero(decadePassedInt)} / 10 &nbsp;&nbsp;•&nbsp;&nbsp; Months : ${leadingZero(decadePassedMonthInt)} / 120`;
		decadeValuePercent.innerHTML = `${decadeWidth} %`;
	}
}

// elapsed time of the year
function time__zoom_year(current) {
	const yearPassedMonth = Math.floor(current.getMonth() + 1);
	const yearPassedDay = Math.floor(100 / 365 * day);
	const yearPassedDayInt = day;

	if (yearWidth < totalWidth) {
		yearWidth = yearPassedDay;

		progressYear.style.setProperty(
			'--progress-lifetime--value',
			yearWidth + '%'
		);
		progressYear.setAttribute('value', yearWidth);
		yearValue.innerHTML = `Months : ${leadingZero(yearPassedMonth)} / 12 &nbsp;&nbsp;•&nbsp;&nbsp; Days : ${leadingZero(yearPassedDayInt)} / 365`;
		yearValuePercent.innerHTML = `${yearWidth} %`;
		yearPeriod.innerHTML = `${year}`;
	}
}

// get elapsed time of the actual quarter
function time__zoom_quarter(current) {
	let quarterPassedDayInt;
	let quarterLastDayInt;
	let quarterPassedWeekInt;
	let quarterLastWeekInt;
	let quarterPassedMonthInt;
	const quarter = Math.floor(current.getMonth() / 3 + 1);
	const nextQuarter = new Date();

	if (quarter === 4) {
		nextQuarter.setFullYear(current.getFullYear() + 1, 0, 1);
	} else {
		nextQuarter.setFullYear(current.getFullYear(), quarter * 3, 1);
	}

	const quarterNow = current.getTime();
	const quarterNextStart = nextQuarter.getTime();

	// remaining days in quarter
	const quarterDayRem = Math.floor((quarterNextStart - quarterNow) / oneDay);

	// remaining weeks in quarter
	const quarterWeekRem = Math.floor((quarterNextStart - quarterNow) / oneWeek);

	// remaining months in quarter
	const quarterMonthRem = Math.floor((quarterNextStart - quarterNow) / oneMonth);

	// check which quarter is and set passed days in this quarter with last day
	if (quarter === 4) {
		quarterLastDayInt = 93;
		quarterLastWeekInt = 13;
		quarterPassedMonthInt = Math.floor(findPassed(3, quarterMonthRem));
		quarterPassedWeekInt = Math.floor(findPassed(quarterLastWeekInt, quarterWeekRem));
		quarterPassedDayInt = Math.floor(findPassed(quarterLastDayInt, quarterDayRem));
	}

	if (quarter === 3) {
		quarterLastDayInt = 93;
		quarterLastWeekInt = 13;
		quarterPassedMonthInt = Math.floor(findPassed(3, quarterMonthRem));
		quarterPassedWeekInt = Math.floor(findPassed(quarterLastWeekInt, quarterWeekRem));
		quarterPassedDayInt = Math.floor(findPassed(quarterLastDayInt, quarterDayRem));
	}

	if (quarter === 2) {
		quarterLastDayInt = 92;
		quarterLastWeekInt = 13;
		quarterPassedMonthInt = Math.floor(findPassed(3, quarterMonthRem));
		quarterPassedWeekInt = Math.floor(findPassed(quarterLastWeekInt, quarterWeekRem));
		quarterPassedDayInt = Math.floor(findPassed(quarterLastDayInt, quarterDayRem));
	}

	if (quarter === 1 && new Date(current.getFullYear(), 1, 29).getDate() === 29) {
		quarterLastDayInt = 92;
		quarterLastWeekInt = 13;
		quarterPassedMonthInt = Math.floor(findPassed(3, quarterMonthRem));
		quarterPassedWeekInt = Math.floor(findPassed(quarterLastWeekInt, quarterWeekRem));
		quarterPassedDayInt = Math.floor(findPassed(quarterLastDayInt, quarterDayRem));
	}
	else if (quarter === 1 && new Date(current.getFullYear(), 1, 28).getDate() === 28) {
		quarterLastDayInt = 91;
		quarterLastWeekInt = 13;
		quarterPassedMonthInt = Math.floor(findPassed(3, quarterMonthRem));
		quarterPassedWeekInt = Math.floor(findPassed(quarterLastWeekInt, quarterWeekRem));
		quarterPassedDayInt = Math.floor(findPassed(quarterLastDayInt, quarterDayRem));
	}
	// passed days of quarter in percent
	const quarterPassedDay = Math.floor(100 / quarterLastDayInt * quarterPassedDayInt);

	if (quarterWidth < totalWidth) {
		quarterWidth = quarterPassedDay;

		progressQuarter.style.setProperty(
			'--progress-lifetime--value',
			quarterWidth + '%'
		);
		progressQuarter.setAttribute('value', quarterWidth);
		quarterValue.innerHTML = `Months : ${leadingZero(quarterPassedMonthInt)} / 03 &nbsp;&nbsp;•&nbsp;&nbsp; Weeks : ${leadingZero(quarterPassedWeekInt)} / ${quarterLastWeekInt} &nbsp;&nbsp;•&nbsp;&nbsp; Days : ${leadingZero(quarterPassedDayInt)} / ${quarterLastDayInt}`;
		quarterValuePercent.innerHTML = `${quarterWidth} %`;
		quarterPeriod.innerHTML = `${year}.q${quarter}`;
	}
}

// elapsed time of the month
function time__zoom_month(current) {
	const monthPassed = Math.floor(100 / monthLastDay.getDate() * current.getDate());
	const monthPassedDayInt = Math.floor(current.getDate());

	if (monthWidth < totalWidth) {
		monthWidth = monthPassed;

		progressMonth.style.setProperty(
			'--progress-lifetime--value',
			monthWidth + '%'
		);
		progressMonth.setAttribute('value', monthWidth);
		monthValue.innerHTML = `Days : ${leadingZero(monthPassedDayInt)} / ${monthLastDay.getDate()}`;
		monthValuePercent.innerHTML = `${monthWidth} %`;
		monthPeriod.innerHTML = `${year}.${leadingZero(monthPassedInt)}`;
	}
}

// elapsed time of the week
function time__zoom_week(current) {
	const dayHoursRem = 24 - current.getHours();
	const weekPassedHourInt = Math.floor(current.getDay() === 0 ? current.getDay() + 7 : current.getDay() * 24 - dayHoursRem);
	const weekPassedHour = Math.floor(100 / 168 * weekPassedHourInt);
	let weekPassedDayInt = Math.floor(current.getDay());
	const weekPassedInt = Math.floor(day / 7);

	if (current.getDay() === 0) {
		weekPassedDayInt = Math.floor(current.getDay() + 7);
	}

	if (weekWidth < totalWidth) {
		weekWidth = weekPassedHour;

		progressWeek.style.setProperty(
			'--progress-lifetime--value',
			weekWidth + '%'
		);
		progressWeek.setAttribute('value', weekWidth);
		weekValue.innerHTML = `Days : ${leadingZero(weekPassedDayInt)} / 07 &nbsp;&nbsp;•&nbsp;&nbsp; Hours : ${leadingZero(weekPassedHourInt)} / 168`;
		weekValuePercent.innerHTML = `${weekWidth} %`;
		weekPeriod.innerHTML = `${year}.w${leadingZero(weekPassedInt)}`;
	}
}

// elapsed time of the day
function time__zoom_day(current) {
	const dayPassedHourInt = Math.floor(current.getHours());
	const dayPassedMinuteInt = Math.floor(current.getHours() * 60 + current.getMinutes());
	const dayPassedMinute = Math.floor(100 / 1440 * dayPassedMinuteInt);
	const dayPassedInt = Math.floor(current.getDate());

	if (dayWidth < totalWidth) {
		dayWidth = dayPassedMinute;

		progressDay.style.setProperty('--progress-lifetime--value', dayWidth + '%');
		progressDay.setAttribute('value', dayWidth);
		dayValue.innerHTML = `Hours : ${leadingZero(dayPassedHourInt)} / 24 &nbsp;&nbsp;•&nbsp;&nbsp; Minutes : ${leadingZero(dayPassedMinuteInt)} / 1440`;
		dayValuePercent.innerHTML = `${dayWidth} %`;
		dayPeriod.innerHTML = `${year}.${leadingZero(monthPassedInt)}.${leadingZero(dayPassedInt)}`;
	}
}


// elapsed time of the hour
function time__zoom_hour(current) {
	const hourPassedMinuteInt = Math.floor(current.getMinutes());
	const hourPassedSecondInt = Math.floor(current.getMinutes() * 60 + current.getSeconds());
	const hourPassedSecond = Math.floor(100 / 3600 * hourPassedSecondInt);
	const hourPassedInt = Math.floor(current.getHours());

	if (hourWidth < totalWidth) {
		hourWidth = hourPassedSecond;

		progressHour.style.setProperty('--progress-lifetime--value', hourWidth + '%');
		progressHour.setAttribute('value', hourWidth);
		hourValue.innerHTML = `Minutes : ${leadingZero(hourPassedMinuteInt)} / 60 &nbsp;&nbsp;•&nbsp;&nbsp; Seconds : ${leadingZero(hourPassedSecondInt)} / 3600`;
		hourValuePercent.innerHTML = `${hourWidth} %`;
		hourPeriod.innerHTML = `${leadingZero(hourPassedInt)}.${leadingZero(minutePassedInt)}`;
	}
}

// elapsed time of the minute
function time__zoom_minute(current) {
	const minutePassedSecondInt = Math.floor(current.getSeconds());
	const minutePassedSecond = Math.floor(100 / 60 * minutePassedSecondInt);


	if (minuteWidth < totalWidth) {
		minuteWidth = minutePassedSecond;

		progressMinute.style.setProperty('--progress-lifetime--value', minuteWidth + '%');
		progressMinute.setAttribute('value', minuteWidth);
		minuteValue.innerHTML = `Seconds : ${leadingZero(minutePassedSecondInt)} / 60`;
		minuteValuePercent.innerHTML = `${minuteWidth} %`;
		minutePeriod.innerHTML = `${leadingZero(minutePassedInt)}`;
	}
}



// ****************************************************************************
// 
// list manipulation
// 
// ****************************************************************************



let list = document.querySelector('.progress-wrapper');
let sortedItem = document.querySelector('.period-container')
let timeZooms = document.querySelectorAll("[data-index]")
let timeZoomsArray = Array.from(timeZooms);
let order = false

////////////////// URL query params //////////////////////////////////

let params = new URLSearchParams(location.search)
let orderId

// get set value from query parameter 'tz'
const timeZoomId = params.get('tz')

///////////////////////////////////////////////////////////////////////

window.onload = list.prepend(timeZooms.item(timeZoomId))

// move up in list of time zooms
const moveUp = () => {
	list.append(list.firstElementChild)
	orderId = list.firstElementChild.getAttribute('data-index')
	params.set('tz', orderId)
	window.history.replaceState({}, '', `${location.pathname}?${params}`);
}
// move down in list of time zooms
const moveDown = () => {
	list.prepend(list.lastElementChild)
	orderId = list.firstElementChild.getAttribute('data-index')
	params.set('tz', orderId)
	window.history.replaceState({}, '', `${location.pathname}?${params}`);
}

const moveUpButton = document.querySelector('.btn-move-up')
const moveDownButton = document.querySelector('.btn-move-down')
const sortButton = document.querySelector('.btn-sort')


// add event listeners for click event
moveUpButton.addEventListener('click', () => {
	moveUp()
});

moveDownButton.addEventListener('click', () => {
	moveDown()
});

const sortTimeZooms = () => {
	order = !order

	let sorted = timeZoomsArray.sort((a, b) => {
		if (order == true && a.dataset.index < b.dataset.index)
			return -1;
		if (order == false && a.dataset.index > b.dataset.index)
			return 1;
		return -1;
	})

	sorted.forEach(e => list.appendChild(e))

}

sortButton.addEventListener('click', () => {
	sortTimeZooms()
})
