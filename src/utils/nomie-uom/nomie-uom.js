import math from '../math/math';
let NomieUOM = {
	toArray() {
		return Object.keys(NomieUOM.uoms).map(key => {
			let obj = NomieUOM.uoms[key];
			obj.key = key;
			return obj;
		});
	},
	toGroupedArray() {
		let items = {};
		Object.keys(NomieUOM.uoms).forEach(key => {
			let obj = NomieUOM.uoms[key];
			obj.key = key;
			items[obj.type] = items[obj.type] || [];
			items[obj.type].push(obj);
		});
		return items;
	},
	plural(key) {
		return NomieUOM.uoms.hasOwnProperty(key) ? NomieUOM.uoms[key].plural : key;
	},
	singular(key) {
		return NomieUOM.uoms.hasOwnProperty(key) ? NomieUOM.uoms[key].singular : key;
	},
	abv(key) {
		return NomieUOM.uoms.hasOwnProperty(key) ? NomieUOM.uoms[key].symbol : null;
	},
	format(value, key) {
		if (NomieUOM.uoms.hasOwnProperty(key) && !isNaN(value)) {
			let symbol = NomieUOM.uoms[key].symbol || null;
			let affix = NomieUOM.uoms[key].symbolAffix || null;
			let space = NomieUOM.uoms[key].symbolSpace || false ? ' ' : '';

			// Get display formatter for key if one exists.
			let displayFormatter = NomieUOM.uoms[key].display || null;

			// Does the UOM have it's own display formatter?
			if (displayFormatter) {
				return displayFormatter(value); // displayFormatter(v);
			} else {
				if (!isNaN(parseFloat(value)) && isFinite(value) && value !== 0) {
					value = NomieUOM.addCommas(value);
				}
				if (affix && symbol) {
					if (affix == 'pre') {
						return symbol + space + value;
					} else {
						return value + space + symbol;
					}
				} else {
					return value;
				}
			} // end if the uom has it's own display
		} else {
			return value;
		}
	},
	addCommas(num) {
		num = `${num || 0}`;
		let x = num.split('.');
		let x1 = x[0];
		let x2 = x.length > 1 ? '.' + x[1] : '';
		let rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}
		return x1 + x2;
	},
};

NomieUOM.uoms = {
	num: {
		singular: 'Count',
		plural: 'Count',
		symbol: 'count',
		type: 'general',
	},
	reps: {
		singular: 'Rep',
		plural: 'Reps',
		symbol: 'reps',
		type: 'general',
	},
	percent: {
		singular: 'Percent',
		plural: 'Percent',
		symbol: '%',
		type: 'general',
		symbolAffix: 'post',
	},
	dollars: {
		singular: 'Dollar',
		plural: 'Dollars',
		symbol: '$',
		type: 'currency',
		symbolAffix: 'pre',
		display: function(v) {
			return '$' + v.toFixed(2);
		},
	},
	peso: {
		singular: 'Peso',
		plural: 'Peso',
		symbol: '$',
		type: 'currency',
		symbolAffix: 'pre',
		display: function(v) {
			return '$' + v.toFixed(2);
		},
	},
	franc: {
		singular: 'Franc',
		plural: 'Francs',
		symbol: 'Fr.',
		type: 'currency',
		symbolAffix: 'pre',
		display: function(v) {
			return 'Fr. ' + v.toFixed(2);
		},
	},
	cpound: {
		singular: 'Pound',
		plural: 'Pounds',
		symbol: '£',
		type: 'currency',
		symbolAffix: 'pre',
		display: function(v) {
			return '£' + v.toFixed(2);
		},
	},
	rupee: {
		singular: 'Rupee',
		plural: 'Rupees',
		symbol: 'Rs.',
		type: 'currency',
		symbolAffix: 'pre',
		display: function(v) {
			return 'Rs. ' + v.toFixed(2);
		},
	},
	yen: {
		singular: 'Yen',
		plural: 'Yen',
		symbol: '¥',
		type: 'currency',
		symbolAffix: 'pre',
		display: function(v) {
			return '¥' + v.toFixed(2);
		},
	},
	yuan: {
		singular: 'Yuan',
		plural: 'Yuan',
		symbol: '¥',
		type: 'currency',
		symbolAffix: 'pre',
		display: function(v) {
			return '¥' + v.toFixed(2);
		},
	},
	euro: {
		singular: 'Euro',
		plural: 'Euros',
		symbol: '€',
		type: 'currency',
		symbolAffix: 'pre',
		display: function(v) {
			return '€' + v.toFixed(2);
		},
	},
	timer: {
		singular: 'Time',
		plural: 'Time',
		symbol: 'time',
		type: 'Timer',
		symbolAffix: 'post',
		symbolSpace: false,
		display: function(v) {
			var sec_num = parseInt(v, 10); // don't forget the second param
			var hours = Math.floor(sec_num / 3600);
			var minutes = Math.floor((sec_num - hours * 3600) / 60);
			var seconds = sec_num - hours * 3600 - minutes * 60;

			//  if (hours   < 10) {hours   = "0"+hours;}
			//  if (minutes < 10) {minutes = "0"+minutes;}
			//  if (seconds < 10) {seconds = "0"+seconds;}

			return !hours ? minutes + 'm ' + seconds + 's' : hours + 'h ' + minutes + 'm';
		},
	},
	sec: {
		singular: 'Second',
		plural: 'Seconds',
		symbol: 'secs',
		type: 'time',
		symbolAffix: 'post',
		symbolSpace: true,
		display: function(v) {
			if (v < 3600) {
				return v + 's';
			} else {
				return Math.round((v / 60) * 100) / 100 + 'm';
			}
		},
	},
	min: {
		singular: 'Minute',
		plural: 'Minutes',
		symbol: 'm',
		type: 'time',
		symbolAffix: 'post',
		symbolSpace: false,
		display: function(v) {
			if (v < 60) {
				return v + 'm';
			} else if (v > 60 && v < 1441) {
				return Math.round((v / 60) * 100) / 100 + 'h';
			} else if (v > 1440) {
				return (v / 1440).toFixed(0) + 'd';
			} else {
				return v + 'm';
			}
		},
	},
	hour: {
		singular: 'Hour',
		plural: 'Hours',
		symbol: 'hrs',
		type: 'time',
		symbolAffix: 'post',
		symbolSpace: false,
		display: function(v) {
			if (v < 168) {
				return Math.round(v * 100) / 100 + 'h';
			} else {
				return (v / 24).toFixed(0) + 'd';
			}
		},
	},
	day: {
		singular: 'Day',
		plural: 'Days',
		symbol: 'days',
		type: 'time',
	},
	mm: {
		singular: 'Millimeter',
		plural: 'Millimeters',
		symbol: 'mm',
		type: 'distance',
	},
	cm: {
		singular: 'Centimeter',
		plural: 'Centimeters',
		symbol: 'cm',
		type: 'distance',
		symbolAffix: 'post',
		symbolSpace: true,
	},
	meter: {
		singular: 'Meter',
		plural: 'Meter',
		symbol: 'm',
		type: 'distance',
		symbolAffix: 'post',
		symbolSpace: true,
	},
	km: {
		singular: 'Kilometer',
		plural: 'Kilometers',
		symbol: 'km',
		type: 'distance',
		symbolAffix: 'post',
		symbolSpace: true,
	},
	inch: {
		singular: 'Inch',
		plural: 'Inches',
		symbol: 'in',
		type: 'distance',
		symbolAffix: 'post',
		symbolSpace: true,
	},
	degrees: {
		singular: 'Degree',
		plural: 'Degrees',
		symbol: '°',
		type: 'temperature',
		symbolAffix: 'post',
		symbolSpace: false,
	},
	celsius: {
		singular: 'Celsius',
		plural: 'Celsius',
		symbol: '°C',
		type: 'temperature',
		symbolAffix: 'post',
		symbolSpace: false,
	},
	fahrenheit: {
		singular: 'Fahrenheit',
		plural: 'Fahrenheit',
		symbol: '°F',
		type: 'temperature',
		symbolAffix: 'post',
		symbolSpace: false,
	},
	foot: {
		singular: 'Foot',
		plural: 'Feet',
		symbol: 'ft',
		type: 'distance',
		symbolAffix: 'post',
		symbolSpace: true,
	},
	yard: {
		singular: 'Yard',
		plural: 'Yards',
		symbol: 'yrds',
		type: 'distance',
		symbolAffix: 'post',
		symbolSpace: true,
	},
	mile: {
		singular: 'Mile',
		plural: 'Miles',
		symbol: 'mi',
		type: 'distance',
		symbolAffix: 'post',
	},
	mg: {
		singular: 'Milligram',
		plural: 'Milligrams',
		symbol: 'mg',
		type: 'weight',
		symbolAffix: 'post',
	},
	gram: {
		singular: 'Gram',
		plural: 'Grams',
		symbol: 'g',
		type: 'weight',
		symbolAffix: 'post',
	},
	kg: {
		singular: 'Kilogram',
		plural: 'Kilograms',
		symbol: 'kg',
		type: 'weight',
		symbolAffix: 'post',
	},
	stone: {
		singular: 'Stone',
		plural: 'Stones',
		symbol: 'st',
		type: 'weight',
	},
	oz: {
		singular: 'Ounce',
		plural: 'Ounces',
		symbol: 'oz',
		type: 'weight',
		symbolAffix: 'post',
		symbolSpace: true,
	},
	pound: {
		singular: 'Pound',
		plural: 'Pounds',
		symbol: 'lbs',
		type: 'weight',
		symbolAffix: 'post',
		symbolSpace: true,
	},
	cup: {
		singular: 'Cup',
		plural: 'Cups',
		symbol: 'cups',
		type: 'volume',
		symbolAffix: 'post',
		symbolSpace: true,
	},
	fluidounce: {
		singular: 'Fluid Ounce',
		plural: 'Fluid Ounces',
		symbol: 'oz',
		type: 'volume',
		symbolAffix: 'post',
		symbolSpace: true,
	},
	pint: {
		singular: 'Pint',
		plural: 'Pints',
		symbol: 'pint',
		type: 'volume',
	},
	quart: {
		singular: 'Quart',
		plural: 'Quarts',
		symbol: 'qt',
		type: 'volume',
		symbolAffix: 'post',
	},
	gallon: {
		singular: 'Gallon',
		plural: 'Gallons',
		symbol: 'gal',
		type: 'volume',
		symbolAffix: 'post',
		symbolSpace: true,
	},
	liter: {
		singular: 'Liter',
		plural: 'Liters',
		symbol: 'L',
		type: 'volume',
		symbolAffix: 'post',
		symbolSpace: false,
	},
	milliliter: {
		singular: 'Milliliter',
		plural: 'Milliliters',
		symbol: 'ml',
		type: 'volume',
		symbolAffix: 'post',
		symbolSpace: false,
	},
};

export default NomieUOM;
