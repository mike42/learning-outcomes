/**
 * Chop up the source into sentences and words for computing metrics.
 * 
 * @param text Text to read in
 * @returns Array of sentences contained in the text, with each sentence being an array of words. All words will be returned in lowercase.
 */
function metric_read_passage(text) {
	var prevIsAlph = false; // Previous character was part of a word
	var isAlph, isEndSentence, c;
	var word = '';
	var alph = 'abcdefghijklmnopqrstuvwxyz-\'';
	var endSentence = '\n.?!';

	var sentence = [];
	var sentences = [];

	for (i = 0; i < text.length; i++) {
		c = text.substring(i, i + 1).toLowerCase();
		isAlph = (alph.indexOf(c) != -1);
		isEndSentence = (endSentence.indexOf(c) != -1);
		if (isAlph == false && prevIsAlph == true) {
			sentence.push([word]);
			word = '';
		} else if (isAlph == true) {
			word += c;
		} else if (sentence.length > 0 && isEndSentence) {
			sentences.push(sentence);
			sentence = [];
		}
		prevIsAlph = isAlph;
	}
	if (word.length > 0) {
		sentence.push({word});
		word = '';
	}
	if (sentence.length > 0) {
		sentences.push(sentence);

	}
	return sentences;
}

function metric_passage_readability(sentences) {
	/* Calculate the readability score */
	
}

function metric_word_syllable(word) {
	/* Count the number of 
}

function metric_passage_wordcount(sentences) {
	
}

function metric_passage_keywords(passage) {
	
}

function test(text) {
	var passage = metric_read_passage(text);
	console.log(passage);
}
