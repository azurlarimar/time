export const rotateMinutes_get = (minute, second) => {

	const rotateMinute = ((360 / 60) * minute);
	const rotateSecond = ((360 / 60 / 60) * second)

	const rotateSum = rotateMinute + rotateSecond;

	return rotateSum;
}
