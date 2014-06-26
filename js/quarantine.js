/** File containing old code which has not yet been migrated to the new program structure */

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
