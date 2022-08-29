export const seconds_to_hms = (value) => {
	const value_absolute = Math.abs(Number(value));
	let h = Math.floor(value_absolute / 3600);
	let m = Math.floor((value_absolute % 3600) / 60);
	let s = Math.floor((value_absolute % 3600) % 60);

	const value_negative = value < 0;

	if (value_negative) {
		h = '-' + h;
		m = '-' + m;
		s = '-' + s;
	}

	return { h, m, s };
};

export const number_to_stringdigits = (value) => {

	let sign = (value.toString().indexOf('-') == 0);


	let number = Number(value);
	let side = (number ? (number < 0 ? -1 : 1) : 0);

	number = number * side + '';
	let dec = number.match(/\.\d+$/);
	let int = number.match(/^[^\.]+/);

	let formattedNumber = (sign ? '-' : '') + ("0" + int).slice(-2) + (dec !== null ? dec : '');

	return formattedNumber;

}
