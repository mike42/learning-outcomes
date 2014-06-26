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
		c = text.substring(i, i + 1);
		passage += c;
		isEndPassage = (endPassage.indexOf(c) != -1) || i == text.length - 1;
		if (isEndPassage == true && passage.trim().length > 0) {
			parsed = outcomes_read_passage(passage);
			feedback = outcomes_outcome_feedback(parsed);
			passages.push({
				outcome_original: passage,
				outcome : parsed,
				feedback : feedback
			});
			passage = '';
		}
	}
	return {
		outcomes : passages,
		feedback : outcomes_overall_feedback(passages)
	};
}

/**
 * Filter words by 
 * 
 * @param word
 */
function outcome_word_filter(word) {
	/* Some quick conversions so that the word comparisons work across different English spelling */
	if(word.length > 3 && word.substr(word.length - 3, 3) == "ize") {
		word = word.substr(0, word.length - 3) + "ise";
	} else if(word.length > 3 && word.substr(word.length - 3, 3) == "yze") {
		word = word.substr(0, word.length - 3) + "yse";
	} else if(word.length > 4 && word.substr(word.length - 4, 4) == "ized") {
		word = word.substr(0, word.length - 3) + "ised";
	}
	return word;
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
	for (i = 0; i < passage.length; i++) {
		c = passage.substring(i, i + 1).toLowerCase();
		if (c == '.' && e == 0) {
			d = passage.substring(i + 1, i + 2).toLowerCase();
			if (d == "" || alph.indexOf(d) == -1) {
				c = "\n";
			}
		} else if (c == "(") {
			e++;
		} else if (c == ")") {
			e--;
			if (e < 0) {
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
			sentence.push([ outcome_word_filter(word), outcomes_word_syllable(word) ]);
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
		sentence.push([ outcome_word_filter(word), outcomes_word_syllable(word) ]);
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
function outcomes_passage_readability(totalWords, totalSentences,
		totalSyllables) {
	if (totalSentences == 0 || totalWords == 0) {
		return NaN;
	}
	return 206.835 - 1.015 * (totalWords / totalSentences) - 84.6
			* (totalSyllables / totalWords);
}

/**
 * Estimate the number of syllables in a word
 * 
 * @param word
 *            The text to check
 * @returns The number of syllables found
 */
function outcomes_word_syllable(word) {
	if (word.length <= 3) {
		return 1;
	}
	word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
	word = word.replace(/^y/, '');
	var a = word.match(/[aeiouy]{1,2}/g);
	if (a == null) {
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
	for (i = 0; i < sentences.length; i++) {
		totalWords += sentences[i].length;
		for (j = 0; j < sentences[i].length; j++) {
			totalSyllables += sentences[i][j][1];
		}
	}
	return {
		totalWords : totalWords,
		totalSentences : totalSentences,
		totalSyllables : totalSyllables
	};
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
	for (i = 0; i < sentences.length; i++) {
		for (j = 0; j < sentences[i].length; j++) {
			if (sentences[i][j][1] <= 1) {
				// Only worry about words greater than one syllable
				continue;
			}
			w = sentences[i][j][0];
			if (rep[w] == undefined) {
				rep[w] = 0;
			}
			rep[w]++;
		}
	}

	var k = outcomes_objSortRev(rep);
	var count = 0;
	var ret = [];
	for (i = 0; i < k.length && count < 3; i++) {
		if (rep[k[i]] > 3) {
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
	var i, j, k; // Counters for keyword, sentence, word.
	var w, l; // Array for keyword, number of words in.
	var ok;

	// To store found word info
	var found = {}; // Number of times each word has been found
	var found_w = []; // List of unique words found

	// The big loop
	for (i = 0; i < keywords.length; i++) {
		w = keywords[i].split(" ");
		for (j = 0; j < sentences.length; j++) {
			for (k = 0; k < sentences[j].length; k++) {
				if (sentences[j][k][0] == w[0]) {		
					// This part executes if we find the first word in the keyword hiding about the place
					l = 1;
					ok = true;
					while (l < w.length && (k + l) < sentences[j].length && ok) {
						// Check remaining words in the keyword */
						ok = sentences[j][k + l][0] == w[l];
						l++;
					}
					
					if (ok) {
						// For when we look for "hill billy" and find "hill" at the end of the sentence.
						ok = (k + l - 1) < sentences[j].length;
					}

					if (ok) {
						// Record a match
						var keyword = keywords[i];

						if (found[keyword] == undefined) {
							found[keyword] = 1;
							found_w.push(keyword);
						} else {
							found[keyword]++;
						}
					}
				}
			}
		}
	}

	return found_w;
}

/**
 * Find a list of employability skills being offered in this outcome
 * 
 * @param skills
 * @param keywords
 */
function outcomes_employability_keywords(skill, parsed) {
	var i, keywords;
	var skills = [];
	for(i = 0; i < skill.length; i++) {
		keywords = outcomes_keyword_match(skill[i].list, parsed);
		if(keywords.length > 0) {
			skills.push(skill[i].name);
		}
	}
	return skills;
}

/**
 * Find the highest level of the SOLO taxonomy which is covered by the paragraphs
 * 
 * @param solo
 * @param keywords
 */
function outcomes_solo_keywords(solo, parsed) {
	var i, keywords;
	for(i = solo.length - 1; i >= 0; i--) {
		keywords = outcomes_keyword_match(solo[i].list, parsed);
		if(keywords.length > 0) {
			return solo[i].name;
		}
	}
	return '';
}

/**
 * Provide stats and feedback relevant to an individual outcome
 * 
 * @param parsed
 * @returns
 */
function outcomes_outcome_feedback(parsed) {
	// Find all stats
	var counts = outcomes_passage_wordcount(parsed);

	// Build words lists
	var word_l = metric_parameters.word_l.knowledge.concat(metric_parameters.word_l.comprehension.concat(metric_parameters.word_l.application));
	var word_h = metric_parameters.word_h.analysis.concat(metric_parameters.word_h.synthesis.concat(metric_parameters.word_h.evaluation))
	var stats = {
		counts: counts,
		readability: outcomes_passage_readability(counts.totalWords,
				counts.totalSentences, counts.totalSyllables),
		repetition: outcomes_repetition(parsed),
		word_h: outcomes_keyword_match(word_h, parsed),
		word_l: outcomes_keyword_match(word_l, parsed),
		flagged: outcomes_keyword_match(metric_parameters.word_flagged, parsed),
		employability: outcomes_employability_keywords(metric_parameters.skill, parsed),
		solo: outcomes_solo_keywords(metric_parameters.solo, parsed)
	};

	// Find a list of applicable messaegs
	var messages = [];

	return {
		stats : stats,
		messages : messages
	};
}

/**
 * Provide stats and feedback for the entire set of outcomes
 * 
 * @param passages
 * @returns
 */
function outcomes_overall_feedback(passages) {
	var i;
	
	var stats = {}, messages;

	// Find how many words are in the shortest sentence.
	stats.minWords = -1;
	for(i = 0; i < passages.length; i++) {
		if(stats.minWords == -1 || passages[i].feedback.stats.counts.totalWords < stats.minWords) {
			stats.minWords = passages[i].feedback.stats.counts.totalWords;
		}
	}
	if(stats.minWords == -1) { // When there are no passages at all.
		stats.minWords = 0;
	}
	
	return {
		stats : stats,
		messages : messages
	};
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
	if (words.length > 1) {
		a = ' ' + sep + ' ' + words.pop();
	}
	return words.join(', ') + a;
}

/**
 * Return list with each element encapsulated by <b></b> tags.
 * 
 **/
function outcomes_boldList(list) {
	var n = [];
	var i;
	for (i = 0; i < list.length; i++) {
		n.push('<b>' + list[i] + '</b>');
	}
	return n;
}

/**
 * Return keys of an array sorted by value, in reverse.
 * 
 * @param obj
 * @returns
 */
function outcomes_objSortRev(obj) {
	var keys = [];
	for ( var key in obj)
		keys.push(key);
	var sortedKeys = keys.sort(function(a, b) {
		return obj[a] - obj[b]
	});
	return sortedKeys.reverse();
}

/**
 * Quick random number function
 * 
 * @param min
 * @param max
 * @returns random number between min and max
 */
function outcomes_rand(min, max) {
	return Math.floor((Math.random() * max) + min);
}

/**
 * Get a random word from a keyword list
 * 
 * @param text
 * @param destination
 */
function outcomes_random_word(keywords, count) {
	return keywords[outcomes_rand(0, keywords.length - 1)];
}

function testLearningOutcomeFeedback(text, destination) {
	var stats = outcomes_read_passages(text);
	console.log(stats);
	$(destination).empty();
	$(destination).append('<h4>Overall</h4>');

	$(destination).append('Wordcount of shortest outcome: ' + stats.feedback.stats.minWords + '<br/>');
	$(destination).append('Number of outcomes: ' + stats.outcomes.length + '<br/>');

	for(i = 0; i < stats.outcomes.length; i++) {
		$(destination).append('<h4>Outcome #' + (i+1) + ' </h4>');
		$(destination).append('Words: ' + stats.outcomes[i].feedback.stats.counts.totalWords + '<br/>');
		$(destination).append('Sentences: ' + stats.outcomes[i].feedback.stats.counts.totalSentences + '<br/>');
		$(destination).append('Syllables: ' + stats.outcomes[i].feedback.stats.counts.totalSyllables + '<br/>');
		$(destination).append('Readability: ' + stats.outcomes[i].feedback.stats.counts.totalSyllables + '<br/>');
		$(destination).append('Lower order words: ' + outcomes_joinWords(stats.outcomes[i].feedback.stats.word_l, 'and') + ' (' + stats.outcomes[i].feedback.stats.word_l.length + ')<br/>');
		$(destination).append('Higher order words: ' + outcomes_joinWords(stats.outcomes[i].feedback.stats.word_h, 'and') + ' (' + stats.outcomes[i].feedback.stats.word_h.length + ')<br/>');
		$(destination).append('Readability: ' + stats.outcomes[i].feedback.stats.readability + '<br/>');
		$(destination).append('Over-used words: ' + outcomes_joinWords(stats.outcomes[i].feedback.stats.repetition, 'and') + ' (' + stats.outcomes[i].feedback.stats.repetition.length + ')<br/>');
		$(destination).append('Flagged: ' + outcomes_joinWords(stats.outcomes[i].feedback.stats.flagged, 'and') + ' (' + stats.outcomes[i].feedback.stats.flagged.length + ')<br/>');
		$(destination).append('Employability: ' + outcomes_joinWords(stats.outcomes[i].feedback.stats.employability, 'and') + ' (' + stats.outcomes[i].feedback.stats.employability.length + ')<br/>');
		$(destination).append('SOLO Level: ' + stats.outcomes[i].feedback.stats.solo + '<br/>');
	}
}
