function contains( array, element ){
	var isContain = false;
	for(var i = 0; i < array.length; i ++){
		if( array[i] == element ){
			isContain = true;
		} 
	}
	return isContain;
}
module.exports = contains;