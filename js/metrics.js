function read_sentence(text) {
	/* Chop up the source into sentences, each with a list of words */
	var prevIsAlph = false; // Previous character was part of a word
	var isAlph, isEndSentence, c;
	var word = '';
	var alph = 'abcdefghijklmnopqrstuvwxyz-\'';
	var endSentence = '\n.?!';
	
	var sentence = [];
	var sentences = [];
	
	for(i = 0; i < text.length; i++) {
		c = text.substring(i, i+1).toLowerCase();
		isAlph = (alph.indexOf(c) != -1);
		isEndSentence = (endSentence.indexOf(c) != -1);
		if(isAlph == false && prevIsAlph == true) {
			sentence.push(word);
			word = '';
		} else if(isAlph == true) {
			word += c;
		} else if(sentence.length > 0 && isEndSentence) {
			sentences.push(sentence);
			sentence = [];
		}
		prevIsAlph = isAlph;
	}
	if(word.length > 0) {
		sentence.push(word);
		word = '';
	}
	if(sentence.length > 0) {
		sentences.push(word);
		
	}
	
	console.log(sentences);
}

function metric_readability(text) {
	/* Calculate the readability score */
}

function metric_keywords(text) {
	/* Count keywords */

}

function test(text) {
	read_sentence(text);
	//console.log(metric_wordcount(text));
}
