// Type check function - used from another of my projects
export function type(object, type, optional = false) {

	var found = false;

	function loopTypes(item) {
		
		if (typeof(item) == 'object') {
		
			if (Object.prototype.toString.call(object) == item) {
				found = true;
			}
		
		} else if (item == 'array') {
		
			if ((object instanceof Array)) {
				found = true;
			}
		
		} else if (typeof(object) == item) {
			found = true;
		}
	}

	if (!optional) {
		if ((object == null) && (typeof object == 'undefined')) {
			throw new Error('Recieved NULL ' + typeof(object) + ' - expected ' + type);
		}
	} else {
		if ((object == null) && ((typeof object == 'undefined') || (typeof object == 'object'))) {
			return true;
		}
	}

	if (type instanceof Array) {
		type.forEach(loopTypes);
	} else {
		loopTypes(type);
	}

	if (!found) {
		throw new Error('Recieved ' + typeof(object) + ' - expected ' + type);
	}

	return true;
}