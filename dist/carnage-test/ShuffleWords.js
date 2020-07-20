Array.prototype.shuffle = Array.prototype.shuffle || function(){
    var array = Object(this), value,
        currentIndex, index, 
		args = [].slice.call(arguments),
		from = args[0] || null, to = args[1] || null,
		length = array.length;
    for (index = (from || length - 1); index > (to || 0); index--){
        currentIndex = Math.floor(Math.random() * (index + 1));
        value = array[index];
        array[index] = array[currentIndex];
        array[currentIndex] = value;
    }
    return array;
};