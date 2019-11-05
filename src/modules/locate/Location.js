import md5 from 'md5';
export default class Location {
	constructor(starter) {
		starter = starter || {};
		this.id = starter.id || md5(new Date().getTime() + Math.random());
		this.lat = starter.lat;
		this.lng = starter.lng;
		this.name = starter.name;
	}
}
