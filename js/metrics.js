/**
 * Chop up the source into sentences and words for computing metrics.
 * 
 * @param passage
 *            Text to read in
 * @returns Array of sentences contained in the text, with each sentence being
 *          an array of words. All words will be returned in lowercase.
 */
function metric_read_passage(passage) {
	// Replace ". " or ".\n" outside of parenthesis with "\n". Used to divide
	// sentences correctly.
	var alph = 'abcdefghijklmnopqrstuvwxyz-\'1234567890.';
	var endSentence = '\n\r?!';
	var i, c, d, e = 0, text = '';
	for(i = 0; i < passage.length; i++) {
		c = passage.substring(i, i + 1).toLowerCase();
		if(c == '.' && e == 0) {
			d = passage.substring(i + 1, i + 2).toLowerCase();
			if(d == "" || alph.indexOf(d) == -1) {
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
 * 
 * @param totalWords
 * @param totalSentences
 * @param totalSyllables
 * @return The readability score, or NaN if empty data was given.
 */
function metric_passage_readability(totalWords, totalSentences, totalSyllables) {
	if(totalSentences == 0 || totalWords == 0) {
		return NaN;
	}
	return 206.835 - 1.015 * (totalWords / totalSentences) - 84.6 * (totalSyllables / totalWords);
}

/**
 * Estimate the number of syllables in a word
 * 
 * @param word
 *            The text to check
 * @returns The number of syllables found
 */
function metric_word_syllable(word) {
	if(word.length <= 3) { return 1; } 
	word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
	word = word.replace(/^y/, '');
	var a = word.match(/[aeiouy]{1,2}/g);
	if(a == null) {
		// Long word with no vowels??
		return 1;
	}
	return a.length;
}

/**
 * Count the words, syllables and sentences in the passage
 * 
 * @param sentences
 *            The list of sentences to analyse
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

/**
 * Count keywords in the text
 * 
 * @param sentences
 *            The list of sentences to analyse
 * @returns
 */
function metric_passage_keywords(sentences) {
	// Construct associative array of all words
    var list_l = {}, list_h = {};
    var i, j;
    // Lower order
    for(i = 0; i < metric_parameters.word_l.knowledge.length; i++)
        list_l[metric_parameters.word_l.knowledge[i]] = 1;
    for(i = 0; i < metric_parameters.word_l.comprehension.length; i++)
        list_l[metric_parameters.word_l.comprehension[i]] = 1;
    for(i = 0; i < metric_parameters.word_l.application.length; i++)
        list_l[metric_parameters.word_l.application[i]] = 1;
    // Higher order
    for(i = 0; i < metric_parameters.word_h.analysis.length; i++)
        list_h[metric_parameters.word_h.analysis[i]] = 1;
    for(i = 0; i < metric_parameters.word_h.synthesis.length; i++)
        list_h[metric_parameters.word_h.synthesis[i]] = 1;
    for(i = 0; i < metric_parameters.word_h.evaluation.length; i++)
        list_h[metric_parameters.word_h.evaluation[i]] = 1;

    // Go ahead and count them
    var word_h = 0, word_l = 0, w;
	for(i = 0; i < sentences.length; i++) {
		for(j = 0; j < sentences[i].length; j++) {
            w = sentences[i][j][0];
		    if(list_l[w] != undefined) {
                word_l++;
            }
            if(list_h[w] != undefined) {
                word_h++;
            }
		}
	}
	return {word_h: word_h, word_l: word_l};
}

/**
 * Find any over-used words of more than 1 syllable.
 * 
 * @param sentences
 *            The list of sentences to analyse
 * @returns
 */
function metric_repetition(sentences) {
	// TODO
	console.log(sentences);
	return;
}

function test(text) {
	var passage = metric_read_passage(text);
	console.log(passage);
	
	var counts = metric_passage_wordcount(passage);
	console.log(counts);
	
	var readability = metric_passage_readability(counts.totalWords, counts.totalSentences, counts.totalSyllables);
	console.log(readability);
	
	var keywords = metric_passage_keywords(passage);
	console.log(keywords);
	
	var repetition = metric_repetition(passage);
	console.log(repetition);
}
