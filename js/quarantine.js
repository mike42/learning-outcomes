/** File containing old code which has not yet been migrated to the new program structure */


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
 * Get flagged words
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
 * Find employability words
 * 
 * @param passsage
 * @returns
 */
function metric_employability(sentences) {
	var s_list = [];
	var s_word = {};
	var add;
	for(k = 0; k < metric_parameters.skill.length; k++) {
		// Check each skill
		s_word = {};
		add = false;
		for(i = 0; i < metric_parameters.skill[k].list.length; i++) {
			s_word[metric_parameters.skill[k].list[i]] = 1;
		}

		for(i = 0; i < sentences.length; i++) {
			for(j = 0; j < sentences[i].length; j++) {
				w = sentences[i][j][0];
				if(s_word[w] != undefined) {
					add = true;
				}
			}
		}
		
		if(add) {
			s_list.push(metric_parameters.skill[k].name);
		}
	}
	return {num: s_list.length, skill: s_list};
}



/**
 * Find SOLO taxonomy keywords
 * 
 * @param passsage
 * @returns
 */
function metric_solo(sentences) {
	var s_list = [];
	var s_word = {};
	var add;
	for(k = 0; k < metric_parameters.solo.length; k++) {
		// Check each SOLO level
		s_word = {};
		add = false;
		for(i = 0; i < metric_parameters.solo[k].list.length; i++) {
			s_word[metric_parameters.solo[k].list[i]] = 1;
		}

		for(i = 0; i < sentences.length; i++) {
			for(j = 0; j < sentences[i].length; j++) {
				w = sentences[i][j][0];
				if(s_word[w] != undefined) {
					add = true;
				}
			}
		}
		
		if(add) {
			s_list.push(metric_parameters.solo[k].name);
		}
	}
	if(s_list.length > 0) {
		return {num: '1', level: s_list.pop()};
	}
	return {num: '0', level: ''};
}

/**
 * 
 * @param text
 */
function testLearningOutcomeFeedback(text, destination) {
	var stats = metric_read_passages(text);
	console.log(stats);
	
	return;
	
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
 	
	var solo = metric_solo(passage);
	$(destination).append('Has SOLO taxonomy words?: ' + solo.num + '<br/>');
	$(destination).append('SOLO taxonomy level: ' + solo.level + '<br/>');
	
	var employability = metric_employability(passage);
	$(destination).append('Employability skill area count: ' + employability.num + '<br/>');
	$(destination).append('Employability skill areas: ' + joinWords(employability.skill, 'and') + '<br/>');
 	
    var feedback = metric_provide_feedback({
        keyword_h: keywords.word_h,
        keyword_l: keywords.word_l,
        keyword_f: flagged.length,
        wordcount: counts.totalWords,
        readability: readability,
        repetition: repetition.length,
        repWords: joinWords(boldList(repetition), 'and'),
        lWords: joinWords(boldList(metric_example_lwords()), 'or'),
        hWords: joinWords(boldList(metric_example_hwords()), 'or'),
        fWords: joinWords(flagged, 'or'),
        employability: employability.num,
        skill: joinWords(boldList(employability.skill), 'and'),
        solonum: solo.num,
        sololvl: solo.level
    });
    
    if(passage.length == 0) {
        $(destination).append("<p>" + metric_parameters.empty_message + "</p>");
        return;
	}
    $(destination).append("<p>" + feedback.join("</p></p>") + "</p>");
}

/*
 * Not currently suitable for use
 * 
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
		var solo = metric_solo(passage);
		var employability = metric_employability(passage);
		
	    var feedback = metric_provide_feedback({
	        keyword_h: keywords.word_h,
	        keyword_l: keywords.word_l,
	        keyword_f: flagged.length,
	        wordcount: counts.totalWords,
	        readability: readability,
	        repetition: repetition.length,
	        repWords: joinWords(boldList(repetition), 'and'),
	        lWords: joinWords(boldList(metric_example_lwords()), 'or'),
	        hWords: joinWords(boldList(metric_example_hwords()), 'or'),
	        fWords: joinWords(flagged, 'or'),
	        employability: employability.num,
	        skill: joinWords(boldList(employability.skill), 'and'),
	        solonum: solo.num,
	        sololvl: solo.level
	    });
	    $(destination).append("<p>" + feedback.join("</p></p>") + "</p>");
}*/

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
	message = message.replace("__WC__", variables.wordcount);
	message = message.replace("__SKILLNAME__", variables.skill);
	message = message.replace("__SOLOLEVEL__", variables.sololvl);
    return message;
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
		case 'solonum':
			v = variables.solonum;
			break;
		case 'employability':
			v = variables.employability;
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
 * Get lower order thinking words as examples
 * 
 * @returns {Array} 
 */
function outcomes_example_lwords() {
    var l = [];
    l.push(metric_parameters.word_l.knowledge[rand(0, metric_parameters.word_l.knowledge.length - 1)]);
    l.push(metric_parameters.word_l.comprehension[rand(0, metric_parameters.word_l.comprehension.length - 1)]);
    l.push(metric_parameters.word_l.application[rand(0, metric_parameters.word_l.application.length - 1)]);
    return l;
}

/**
 * Get higher order thinking words as examples
 * @returns {Array}
 */
function outcomes_example_hwords() {
    var h = [];
    h.push(metric_parameters.word_h.analysis[rand(0, metric_parameters.word_h.analysis.length - 1)]);
    h.push(metric_parameters.word_h.synthesis[rand(0, metric_parameters.word_h.synthesis.length - 1)]);
    h.push(metric_parameters.word_h.evaluation[rand(0, metric_parameters.word_h.evaluation.length - 1)]);
    return h;
}
