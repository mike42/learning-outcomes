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
			if(feedback.stats.word_c > 0) {
				passages.push({
					outcome_original: passage,
					outcome : parsed,
					feedback : feedback
				});
			}
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
function outcomes_word_filter(word) {
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
			sentence.push([ outcomes_word_filter(word), outcomes_word_syllable(word) ]);
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
		sentence.push([ outcomes_word_filter(word), outcomes_word_syllable(word) ]);
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
	var stats = {
		word_c: counts.totalWords,
		syllable_c: counts.totalSyllables,
		sentence_c: counts.totalSentences,
		readability: outcomes_passage_readability(counts.totalWords,
				counts.totalSentences, counts.totalSyllables),
		repetition: outcomes_repetition(parsed),
		flagged: outcomes_keyword_match(metric_parameters.word_flagged, parsed),
		employability: outcomes_employability_keywords(metric_parameters.skill, parsed),
		solo: outcomes_solo_keywords(metric_parameters.solo, parsed)
	};

	// Add counts
	stats.repetition_c = stats.repetition.length;
	stats.flagged_c = stats.flagged.length;
	stats.employability_c = stats.employability.length;
	stats.solonum = stats.solo == "" ? 0 : 1;
	
	// Find a list of applicable messages
	var messages = outcomes_compile_messages(stats, metric_parameters.feedback);

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
	
	var stats = {};

	// Find how many words are in the shortest sentence.
	stats.min_words = -1;
	for(i = 0; i < passages.length; i++) {
		if(stats.min_words == -1 || passages[i].feedback.stats.word_c < stats.min_words) {
			stats.min_words = passages[i].feedback.stats.word_c;
		}
	}
	if(stats.min_words == -1) { // When there are no passages at all.
		stats.min_words = 0;
	}
	
	// Add counts
	stats.outcome_c = passages.length;
	
	// Find a list of applicable messages
	var messages = outcomes_compile_messages(stats, metric_parameters.overall_feedback);
	if(messages.length > 1 && messages[messages.length - 1] == "") {
		messages.pop();
		stats.cancel = "yes";
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
function outcomes_random_word(keywords) {
	return keywords[outcomes_rand(0, keywords.length - 1)];
}

/**
 * Return one unique word from each of the four levels of the SOLO taxonomy as examples
 */
function outcomes_example_words() {
	var temp, i, found = {}, ret = [];

	for(i = 0; i < metric_parameters.solo.length; i++) {
		do { // Loop prevents duplicates on list.
			temp = outcomes_random_word(metric_parameters.solo[i].list);
		} while(found[temp] !== undefined);
		found[temp] = 1;
		ret.push(temp);
	}

	return ret;
}

/**
 * From a list of rules, provide feedback which matches them
 * 
 * @param stats
 * @param rules
 * @returns {Array} A list of matched messages
 */
function outcomes_compile_messages(stats, rules) {
    var f = []; // Array of feedback strings
    for(i = 0; i < rules.length; i++) {
    	/* Test each rule in the list */
        if(outcomes_match_message(stats, rules[i].rule)) {
        	stats.words = outcomes_example_words();
            f.push(outcomes_subst_message(rules[i].message, stats));
            if(rules[i].cancel !== undefined) {
            	f.push("");
            	return f;
            }
        }
    }
    
    if(stats.flagged !== undefined && stats.flagged.length > 0) {
    	/* Add flagged word feedback here. Does not work under 'overall' feedback, hence undefined check */
    	var message = "";
    	for(i = 0; i < stats.flagged.length; i++) {
    		message = outcomes_find_flagged_message(stats.flagged[i], metric_parameters.flagged_feedback);
    		if(message != undefined) {
    			stats.words = outcomes_example_words();
    			f.push(outcomes_subst_message(message, stats));
    			break; // Limit of one verb suggestion
    		}
    	}
    }
    return f;
}

/**
 * Given a flagged word, return the appropriate feedback from the list.
 */
function outcomes_find_flagged_message(word, list) {
	var i, j;
	for(i = 0; i < list.length; i++) {
		for(j = 0; j < list[i].words.length; j++) {
			if(list[i].words[j] == word) {
				/* Return the first message in the list which matches this flagged word */
				return list[i].message;
			}
		}
	}
	return undefined;
}

/**
 * Determine if a given rule is met.
 * 
 * @param stats
 * @param rule
 * @returns {Boolean}
 */
function outcomes_match_message(stats, rule) {
	if(rule.length == 0) {
		return false;
	}
	
	var i, match = true, v;
	for(i = 0; i < rule.length; i++) {
		v = stats[rule[i].var];		
		if(v === undefined) {
			match = false;
			console.log("A rule tried to use undefined metric: " + rule[i].var);
			break;
		}
		
		/* Compare it */
		switch(rule[i].is) {
		case 'above':
			match = (v > rule[i].val);
			break;
		case 'below':
			match = (v < rule[i].val);
			break;
		case 'equal':
			match = (v == rule[i].val);
			break;
		case 'range': // Inclusive range
			match = (v >= rule[i].val[0]) && (v <= rule[i].val[1]);
			break;
		default:
			match = false;
			console.log("Invalid operator in rule list: " + rule[i].is);
			break;
		}
		
		if(!match) {
			break;
		}
	}
	return match;
}

/**
 * Take a message, and substitute any useful strings into it.
 * 
 * @param message
 * @param stats
 * @returns
 */
function outcomes_subst_message(message, stats) {
	for (var key in stats) {
		if(stats[key] instanceof Array) {
			// AND and OR joins
			message = message.replace("__" + key.toUpperCase() + ",OR__", outcomes_joinWords(outcomes_boldList(stats[key]), "or"));
			message = message.replace("__" + key.toUpperCase() + ",AND__", outcomes_joinWords(outcomes_boldList(stats[key]), "and"));
		} else {
			message = message.replace("__" + key.toUpperCase() + "__", stats[key]);
		}
	}
	return message;
}