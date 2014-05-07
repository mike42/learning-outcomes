/**
 * Chop up the source into sentences and words for computing metrics.
 * 
 * @param passage Text to read in
 * @returns Array of sentences contained in the text, with each sentence being an array of words. All words will be returned in lowercase.
 */
function metric_read_passage(passage) {
	// Replace ". " or ".\n" outside of parenthesis with "\n". Used to divide sentences correctly.
	var i, c, d, e = 0, text = '';
	for(i = 0; i < passage.length; i++) {
		c = passage.substring(i, i + 1).toLowerCase();
		if(c == '.' && e == 0) {
			d = passage.substring(i, i + 2).toLowerCase();
			if(d == "." || d == ". " || d == ".\n") {
				c = "\n";
			}
		} else if(c == "(") {
			e++;
		} else if(c == ")") {
			e--;
			if(e < 0) {
				// Non-matching brackets.
				e = 0;
			}
		}
		text += c;
	}
	
	// Begin chopping
	var prevIsAlph = false; // Previous character was part of a word
	var isAlph, isEndSentence;
	var word = '';
	var alph = 'abcdefghijklmnopqrstuvwxyz-\'1234567890.';
	var endSentence = '\n\r?!';

	/* Current sentence and stack of previous ones */
	var sentence = [];
	var sentences = [];

	/* Loop over each character and build the structure */
	for (i = 0; i < text.length; i++) {
		c = text.substring(i, i + 1).toLowerCase();
		isAlph = (alph.indexOf(c) != -1);
		isEndSentence = (endSentence.indexOf(c) != -1);
		if (isAlph == false && prevIsAlph == true) {
			sentence.push([word, metric_word_syllable(word)]);
			word = '';
		} else if (isAlph == true) {
			word += c;
		}
		if (sentence.length > 0 && isEndSentence) {
			sentences.push(sentence);
			sentence = [];
		}
		prevIsAlph = isAlph;
	}
	if (word.length > 0) {
		sentence.push([word, metric_word_syllable(word)]);
		word = '';
	}
	if (sentence.length > 0) {
		sentences.push(sentence);
		sentence = [];

	}
	return sentences;
}

/**
 * Flesch-Kincaid Reading Ease Score corresponding to these metrics
 * http://en.wikipedia.org/wiki/Flesch-Kincaid#Flesch_Reading_Ease
 * @param totalWords
 * @param totalSentences
 * @param totalSyllables
 * @return The readability score
 */
function metric_passage_readability(totalWords, totalSentences, totalSyllables) {
	return 206.835 - 1.015 * (totalWords / totalSentences) - 84.6 * (totalSyllables / totalWords);
}

/**
 * Estimate the number of syllables in a word
 * 
 * @param word The text to check
 * @returns The number of syllables found
 */
function metric_word_syllable(word) {
	
	return 0;
}

/**
 * Count the words, syllables and sentences in the passage
 * 
 * @param sentences The list of sentences to analyse
 * @return The counts of the text
 */
function metric_passage_wordcount(sentences) {
	var totalWords = 0, totalSentences = 0, totalSyllables = 0;
	var i, j;
	totalSentences = sentences.length;
	for(i = 0; i < sentences.length; i++) {
		totalWords += sentences[i].length;
		for(j = 0; j < sentences[i].length; j++) {
			totalSyllables += sentences[i][j][1];
		}
	}
	return {totalWords: totalWords, totalSentences: totalSentences, totalSyllables: totalSyllables};
}

function metric_passage_keywords(passage) {
	
}

function test(text) {
	var passage = metric_read_passage(text);
	console.log(passage);
	//var counts = metric_passage_wordcount(passage);
	//console.log(counts);
}
