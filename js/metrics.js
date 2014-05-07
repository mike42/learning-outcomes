function metric_wordcount(text) {
	var wc = 0; // Wordcount
	var prevIsAlph = false; // Previous character wsa part of a word
	var isAlph, c;
	var alph = 'abcdefghijklmnopqrstuvwxyz-\'';
	for(i = 0; i < text.length; i++) {
		c = text.substring(i, i+1).toLowerCase();
		isAlph = (alph.indexOf(c) != -1);
		if(isAlph == true && prevIsAlph == false) {
			wc++;
		}
		prevIsAlph = isAlph;
	}
	return wc;
}

function metric_readability(text) {
	
}

function metric_keywords(text) {
	
}

function test(text) {
	console.log(metric_wordcount(text));
}
