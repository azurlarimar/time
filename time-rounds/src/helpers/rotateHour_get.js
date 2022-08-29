export const rotateHour_get = (circle_hours, hour, minute, second) => {

	const rotateHourMinuteSecond = (360 / circle_hours / 60 / 60) * second; // plynulý chod
	const rotateHourMinute = (360 / circle_hours / 60) * minute;
	const rotateHour = ((360 / circle_hours) * hour) + rotateHourMinute + rotateHourMinuteSecond;

	return rotateHour;
}
