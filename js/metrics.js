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
    var found_h = {}, found_l = {};
	for(i = 0; i < sentences.length; i++) {
		for(j = 0; j < sentences[i].length; j++) {
            w = sentences[i][j][0];
		    if(list_l[w] != undefined && found_l[w] == undefined) {
                found_l[w] = 1;
                word_l++;
            }
            if(list_h[w] != undefined && found_h[w] == undefined) {
                found_h[w] = 1;
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
 * 
 * @param sentences
 * @returns {Array}
 */
function metric_flagged(sentences) {
	// Construct associative array of all words
    var list_f = {}, list_f_found = {};
    var word_f = [];
    var i, j, w;
    
    // Construct list of flagged words
    for(i = 0; i < metric_parameters.word_flagged.length; i++)
        list_f[metric_parameters.word_flagged[i]] = 1;

    // Go ahead and count them
	for(i = 0; i < sentences.length; i++) {
		for(j = 0; j < sentences[i].length; j++) {
            w = sentences[i][j][0];
		    if(list_f[w] != undefined && list_f_found[w] == undefined) {
		    	list_f_found[w] = 1;
                word_f.push(w);
            }
		}
	}
	return word_f;
}

/**
 * 
 * @returns {Array} 
 */
function metric_example_lwords() {
    var l = [];
    l.push(metric_parameters.word_l.knowledge[rand(0, metric_parameters.word_l.knowledge.length - 1)]);
    l.push(metric_parameters.word_l.comprehension[rand(0, metric_parameters.word_l.comprehension.length - 1)]);
    l.push(metric_parameters.word_l.application[rand(0, metric_parameters.word_l.application.length - 1)]);
    return l;
}

/**
 * 
 * @returns {Array}
 */
function metric_example_hwords() {
    var h = [];
    h.push(metric_parameters.word_h.analysis[rand(0, metric_parameters.word_h.analysis.length - 1)]);
    h.push(metric_parameters.word_h.synthesis[rand(0, metric_parameters.word_h.synthesis.length - 1)]);
    h.push(metric_parameters.word_h.evaluation[rand(0, metric_parameters.word_h.evaluation.length - 1)]);
    return h;
}

/**
 * Join an array of English words into a good list (a, b and c).
 * 
 * @param words
 * @param sep
 * @returns
 */
function joinWords(words, sep) {
	var a = '';
	if(words.length > 1) {
		a = ' ' + sep + ' ' + words.pop();
	}	
    return words.join(', ') + a;
}

/**
 * 
 * @param text
 */
function testLearningOutcomeFeedback(text, destination) {
	$(destination).empty();

	var passage = metric_read_passage(text);
	console.log(passage);

	var counts = metric_passage_wordcount(passage);
    console.log(counts);
    $(destination).append('Words: ' + counts.totalWords + '<br/>');
    $(destination).append('Sentences: ' + counts.totalSentences + '<br/>');
    $(destination).append('Syllables: ' + counts.totalSyllables + '<br/>');
	
	var readability = metric_passage_readability(counts.totalWords, counts.totalSentences, counts.totalSyllables);
	console.log(readability);
	$(destination).append('Readability score: ' + readability + '<br/>');

	var keywords = metric_passage_keywords(passage);
	console.log(keywords);
	$(destination).append('Lower order verbs: ' + keywords.word_l + '<br/>');
	$(destination).append('Higher order verbs: ' + keywords.word_h + '<br/>');
	
	var repetition = metric_repetition(passage);
	console.log(repetition);
	$(destination).append('Over-used words: ' + repetition.join(' ') + '<br/>');

 	var flagged = metric_flagged(passage);
 	$(destination).append('Flagged: ' + flagged.join(' ') + '<br/>');
 	
    var feedback = metric_provide_feedback({
        keyword_h: keywords.word_h,
        keyword_l: keywords.word_l,
        keyword_f: flagged.length,
        wordcount: counts.totalWords,
        readability: readability,
        repetition: repetition.length,
        repWords: joinWords(repetition, 'and'),
        lWords: joinWords(metric_example_lwords(), 'or'),
        hWords: joinWords(metric_example_hwords(), 'or'),
        fWords: joinWords(flagged, 'or')
    });
    
    if(passage.length == 0) {
        $(destination).append("<p>" + metric_parameters.empty_message + "</p>");
        return;
	}
    $(destination).append("<p>" + feedback.join("</p></p>") + "</p>");
}

function getLearningOutcomeFeedback(text, destination) {
	   $(destination).empty();
		var passage = metric_read_passage(text);
		if(passage.length == 0) {
			$(destination).append("<p>" + metric_parameters.empty_message + "</p>");
			return;
		}
		var counts = metric_passage_wordcount(passage);
		var readability = metric_passage_readability(counts.totalWords, counts.totalSentences, counts.totalSyllables);
		var keywords = metric_passage_keywords(passage);
		var repetition = metric_repetition(passage);
		var flagged = metric_flagged(passage);	
	    var feedback = metric_provide_feedback({
	        keyword_h: keywords.word_h,
	        keyword_l: keywords.word_l,
	        keyword_f: flagged.length,
	        wordcount: counts.totalWords,
	        readability: readability,
	        repetition: repetition.length,
	        repWords: joinWords(repetition, 'and'),
	        lWords: joinWords(metric_example_lwords(), 'or'),
	        hWords: joinWords(metric_example_hwords(), 'or'),
	        fWords: joinWords(flagged, 'or')
	    });
	    $(destination).append("<p>" + feedback.join("</p></p>") + "</p>");
}

/**
 * 
 * @param variables
 * @returns {Array}
 */
function metric_provide_feedback(variables) {
    var f = []; // Array of feedback strings

    for(i = 0; i < metric_parameters.feedback.length; i++) {
        if(metric_match_feedback(metric_parameters.feedback[i], variables)) {
            f.push(metric_subst_feedback(metric_parameters.feedback[i].message, variables));
        }
    }
    
    return f;
}

/**
 * Determine whether feedback is applicable here (very generic matching of variables to rules)
 * 
 * @param feedback
 * @param variables
 * @returns {Boolean}
 */
function metric_match_feedback(feedback, variables) {
	var i, match = true, v;
	if(feedback.rule.length == 0) {
		return 0;
	}
	
	for(i = 0; i < feedback.rule.length; i++) {
		/* Figure out which numeric variable to look at */
		v = undefined;
		switch(feedback.rule[i].var) {
		case 'repetition':
			v = variables.repetition;
			break;
		case 'flaggedword':
			v = variables.keyword_f;
			break;
		case 'readability':
			v = variables.readability;
			break;
		case 'wordcount':
			v = variables.wordcount;
			break;
		case 'keyword_h':
			v = variables.keyword_h;
			break;
		case 'keyword_l':
			v = variables.keyword_l;
			break;
		default:
			match = false;
			continue;
		}
		if(!match) {
			break;
		}
		
		/* Compare it */
		switch(feedback.rule[i].is) {
		case 'above':
			match = (v > feedback.rule[i].val);
			break;
		case 'below':
			match = (v < feedback.rule[i].val);
			break;
		case 'equal':
			match = (v == feedback.rule[i].val);
			break;
		case 'range': // Inclusive range
			match = (v >= feedback.rule[i].val[0]) && (v <= feedback.rule[i].val[1]);
			break;
		default:
			match = false;
			continue;
		}
		
		if(!match) {
			break;
		}
	}
	
    return match;
}

/**
 * 
 * @param message
 * @param variables
 * @returns
 */
function metric_subst_feedback(message, variables) {
	message = message.replace("__REP_WORD__", variables.repWords);
	message = message.replace("__HWORDS__", variables.hWords);
	message = message.replace("__LWORDS__", variables.lWords);
	message = message.replace("__BAD_WORD__", variables.fWords);
    return message;
}

/**
 * Return keys of an array sorted by value, in reverse.
 * @param obj
 * @returns
 */
function objSortRev(obj) {
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
function rand(min, max) {
	return Math.floor((Math.random() * max) + min);
}
