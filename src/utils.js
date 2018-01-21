const zip = (a,b) => 
    a.map((_,i) => [a[i], b[i]])

const range = n => 
	[...Array(n).keys()]
	
const shuffle = a => {
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
}

const fromObject = (instance, json) => {
	for(attr in json) 
		instance[attr] = json[attr]
	
	return instance
}

if(!Array.prototype.shuffle) {
	Array.prototype.shuffle = function() {
		shuffle(this)
		return this
	}
}
	
module.exports = {
    zip, range,
	shuffle,
	
	fromObject
}