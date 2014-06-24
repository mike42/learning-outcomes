/**
 * Analyse a block of learning outcomes text.
 * 
 * @param text
 */
function outcomes_read_passages(text) {
	// Begin chopping
	var endPassage = '\n\r';
	var isEndPassage;
	var i, c;
	var passage = '', parsed, feedback;

	/* Current sentence and stack of previous ones */
	var passages = [];

	/* Loop over each character and build the structure */
	for (i = 0; i < text.length; i++) {
		c = text.substring(i, i + 1).toLowerCase();
		passage += c;
		isEndPassage = (endPassage.indexOf(c) != -1) || i == text.length -1;
		if (passage.length > 0 && isEndPassage == true) {
			parsed = outcomes_read_passage(passage);
			feedback = outcomes_outcome_feedback(parsed);
			passages.push({outcome: parsed, feedback: feedback});
			passage = '';
		}
	}
	return {outcomes: passages, feedback: outcomes_overall_feedback(passages)};
}

/**
 * Chop up the source into sentences and words for computing metrics.
 * 
 * @param passage
 *            Text to read in
 * @returns Array of sentences contained in the text, with each sentence being
 *          an array of words. All words will be returned in lowercase.
 */
function outcomes_read_passage(passage) {
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
			sentence.push([word, outcomes_word_syllable(word)]);
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
		sentence.push([word, outcomes_word_syllable(word)]);
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
function outcomes_passage_readability(totalWords, totalSentences, totalSyllables) {
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
function outcomes_word_syllable(word) {
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
function outcomes_passage_wordcount(sentences) {
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
 * Find any over-used words of more than 1 syllable.
 * 
 * @param sentences
 *            The list of sentences to analyse
 * @returns
 */
function outcomes_repetition(sentences) {
    var rep = {};
	for(i = 0; i < sentences.length; i++) {
		for(j = 0; j < sentences[i].length; j++) {
            if(sentences[i][j][1] <= 1) {
                // Only worry about words greater than one syllable
                continue;
            }
            w = sentences[i][j][0];
            if(rep[w] == undefined) {
                rep[w] = 0;
            }
            rep[w]++; 
		}
	}

    var k = objSortRev(rep);
    var count = 0;
    var ret = [];
    for(i = 0; i < k.length && count < 3; i++) {
        if(rep[k[i]] > 3) {
            ret.push(k[i]);
            count++;
        }
    }
    return ret;
}

/**
 * Check sentences for a list of key words or phrases, and return an array of counts.
 * 
 * @param keywords
 * @param sentences
 * @returns
 */
function outcomes_keyword_match(keywords, sentences) {
	
}

/**
 * Provide stats and feedback relevant to an individual outcome
 * 
 * @param parsed
 * @returns
 */
function outcomes_outcome_feedback(parsed) {
	
	return [];
}

/**
 * Provide stats and feedback for the entire set of outcomes
 * 
 * @param passages
 * @returns
 */
function outcomes_overall_feedback(passages) {
	
	return [];
}

/**
 * Join an array of English words into a good list (a, b and c).
 * 
 * @param words
 * @param sep
 * @returns
 */
function outcomes_joinWords(words, sep) {
	var a = '';
	if(words.length > 1) {
		a = ' ' + sep + ' ' + words.pop();
	}	
    return words.join(', ') + a;
}

/**
 * Return list with each element encapsulated by <b></b> tags.
 **/
function outcomes_boldList(list) {
    var n = [];
    var i;
    for(i = 0; i < list.length; i++) {
        n.push('<b>' + list[i] + '</b>');
    }
    return n;
}

/**
 * Return keys of an array sorted by value, in reverse.
 * @param obj
 * @returns
 */
function outcomes_objSortRev(obj) {
    var keys = [];
    for(var key in obj)
        keys.push(key);
    var sortedKeys = keys.sort(function(a,b){return obj[a]-obj[b]});
    return sortedKeys.reverse();
}

/**
 * Quick random number function
 * @param min
 * @param max
 * @returns random number between min and max
 */
function outcomes_rand(min, max) {
	return Math.floor((Math.random() * max) + min);
}

function testLearningOutcomeFeedback(text, destination) {
	var stats = outcomes_read_passages(text);
	console.log(stats);
}