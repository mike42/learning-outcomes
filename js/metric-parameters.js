var metric_parameters = {
	"overall_feedback" : [
			{
				"rule" : [ {
					"var" : "min_words",
					"is" : "below",
					"val" : "20"
				} ],
				"message" : "You need to type longer outcomes for them to be meaningful."
			}, {
				"rule" : [ {
					"var" : "outcome_c",
					"is" : "above",
					"val" : "6"
				} ],
				"message" : "Too many outcomes."
			}, ],
	"feedback" : [
			{
				"rule" : [ {
					"var" : "word_c",
					"is" : "above",
					"val" : "0"
				} ],
				"message" : "<b>Word count:</b> __WORD_C__."
			},
			{
				"rule" : [ {
					"var" : "readability",
					"is" : "above",
					"val" : "60"
				} ],
				"message" : "<b>Readability</b><br/> Your outcomes are simply written and direct. This readability level will be suitable for all of your students."
			},
			{
				"rule" : [ {
					"var" : "readability",
					"is" : "range",
					"val" : [ "30", "60" ]
				} ],
				"message" : "<b>Readability</b><br/> Your outcomes are written at a level appropriate for university students. Bear in mind that your students will have a range of levels of fluency in English, and you should keep this in mind when writing."
			},
			{
				"rule" : [ {
					"var" : "readability",
					"is" : "below",
					"val" : "30"
				} ],
				"message" : "<b>Readability</b><br/> Your outcomes are written at a level suitable for university graduates. Given your students will have a range of levels of fluency in English, you may want to see if you can simplify the wording without damaging your intended meaning."
			},
			{
				"rule" : [ {
					"var" : "employability_c",
					"is" : "equal",
					"val" : "0"
				} ],
				"message" : "<b>Employability Skills</b><br/> When writing your outcomes, consider using terms that will reflect future employability skills."
			},
			{
				"rule" : [ {
					"var" : "employability_c",
					"is" : "above",
					"val" : "0"
				} ],
				"message" : "<b>Employability Skills</b><br/> Your verb choices reflect __EMPLOYABILITY,AND__ skills."
			},
			{
				"rule" : [ {
					"var" : "solonum",
					"is" : "above",
					"val" : "0"
				} ],
				"message" : "<b>SOLO Taxonomy</b><br/> Your verb choices reflect the <b>__SOLO__</b> level of the SOLO taxonomy"
			},
			{
				"rule" : [ {
					"var" : "repetition_c",
					"is" : "equal",
					"val" : "1"
				} ],
				"message" : "You seem to use the word <b>__REPETITION,AND__</b> quite often. See if you can think of any alternative terms, or different ways of expressing this idea."
			},
			{
				"rule" : [ {
					"var" : "repetition_c",
					"is" : "above",
					"val" : "1"
				} ],
				"message" : "You seem to use the words <b>__REPETITION,AND__</b> quite often. See if you can think of any alternative terms, or different ways of expressing this idea."
			} ],
	"empty_message" : "Please paste learning outcomes for your unit into the box to check them",
	"word_flagged" : [ "understand", "appreciate", "appreciation", "know",
			"gain", "obtain skills", "have knowledge",
			"understand the importance", "understand importance",
			"recognise importance", "have understanding",
			"have an understanding", "learn about", "develop", "acquire",
			"comprehend", "recognise", "have an awareness", "have awareness",
			"become aware", "relate to", "relate", "use" ],
	"flagged_feedback" : [
			{
				"words" : [ "understand" ],
				"message" : "Understanding is highly subjective and can be easily misunderstood, consider an observable and measurable verb such as: __WORDS,OR__."
			},
			{
				"words" : [ "appreciate", "appreciation" ],
				"message" : "Consider replacing 'appreciate' with an action-oriented and measurable verb, such as: __WORDS,OR__. These verbs will provide the students with an opportunity to demonstrate the level of their awareness of the concepts you want them to achieve."
			},
			{
				"words" : [ "know" ],
				"message" : "To clarify the level of knowledge you wish students to achieve, consider replacing 'know' with an actionable and measurable verb such as: __WORDS,OR__."
			},
			{
				"words" : [ "gain" ],
				"message" : "Consider replacing 'gain' with an action-oriented and measurable verb that clarifies how the students will demonstrate their knowledge, such as __WORDS,OR__."
			},
			{
				"words" : [ "obtain skills" ],
				"message" : "Consider replacing 'obtain skills' with an action-oriented and measurable verb that clarifies how the students will demonstrate their knowledge, such as __WORDS,OR__"
			},
			{
				"words" : [ "have knowledge" ],
				"message" : "Consider replacing 'have knowledge' with an action-oriented and measurable verb that clarifies how the students will demonstrate their knowledge, such as __WORDS,OR__."
			},
			{
				"words" : [ "understand the importance",
						"understand importance" ],
				"message" : "Consider replacing 'understand importance of... ' with an action-oriented and measurable verb that clarifies how the students will demonstrate their knowledge, such as __WORDS,OR__."
			},
			{
				"words" : [ "recognise importance" ],
				"message" : "Consider replacing 'recognise the importance of...' with an action-oriented and measurable verb that clarifies how the students will demonstrate their knowledge, such as __WORDS,OR__."
			},
			{
				"words" : [ "have understanding", "have an understanding" ],
				"message" : "Consider replacing 'have an understanding of...' with an action-oriented and measurable verb that clarifies how the students will demonstrate their knowledge. "
			},
			{
				"words" : [ "learn about" ],
				"message" : "Consider using an observable and measureable verb to describe what the student can demonstrate, such as __WORDS,OR__."
			},
			{
				"words" : [ "develop" ],
				"message" : "Consider replacing 'develop' with  'demonstrate' followed by what is to be demonstrated and in what context it might be demonstrated. "
			},
			{
				"words" : [ "acquire" ],
				"message" : "The verb doesn't clearly ask the student to demonstrate an achievment. This statement could be made more readable by using a different finite verb."
			},
			{
				"words" : [ "comprehend" ],
				"message" : "The verb doesn't clearly ask the student to demonstrate an achievment. This statement could be made more readable by using a different finite verb."
			},
			{
				"words" : [ "recognise" ],
				"message" : "The verb doesn't clearly ask the student to demonstrate an achievment. This statement could be made more readable by using a different finite verb."
			},
			{
				"words" : [ "have an awareness", "have awareness",
						"become aware" ],
				"message" : "Consider replacing 'have an awareness of...' with an action-oriented and measurable verb that clarifies how the students will demonstrate their knowledge. "
			},
			{
				"words" : [ "relate to" ],
				"message" : "Consider replacing 'relate to' with 'compare' to clarify how the students will demonstrate their knowledge."
			},
			{
				"words" : [ "relate" ],
				"message" : "The verb doesn't clearly ask the student to demonstrate an achievment. This statement could be made more readable by using a different finite verb."
			},
			{
				"words" : [ "use" ],
				"message" : "The verb 'use' might need further clarification. Check your statement to evaluate the level of achievement and context you are asking the student to demonstrate."
			} ],
	"skill" : [
			{
				"name" : "management/leadership",
				"list" : [ "administer", "analyse", "analyze", "appoint",
						"approve", "assign", "authorise", "authorize", "chair",
						"consider", "consolidate", "contract", "control",
						"convert", "coordinate", "decide", "delegate",
						"develop", "direct", "eliminate", "emphasise",
						"emphasize", "enforce", "enhance", "establish",
						"evaluate", "execute", "generate", "handle", "head",
						"hire", "host", "improve", "incorporate", "increase",
						"initiate", "inspect", "institute", "manage", "merge",
						"motivate", "organise", "organize", "originate",
						"overhaul", "oversee", "plan", "prioritise",
						"prioritize", "recommend", "reorganise", "reorganize",
						"replace", "restore", "review", "schedule",
						"streamline", "strengthen", "supervise", "supervize",
						"write" ]
			},
			{
				"name" : "research",
				"list" : [ "analyze", "analyse", "clarify", "collect",
						"compare", "conduct", "critique", "determine",
						"diagnose", "evaluate", "examine", "experiment",
						"explore", "extract", "formulate", "gather",
						"identify", "identify", "inspect", "interpret",
						"interview", "invent", "investigate", "locate",
						"measure", "organise", "organize", "research",
						"review", "search", "solve", "summarise", "summarize",
						"survey", "systematise", "systematize", "test" ]
			},
			{
				"name" : "communication",
				"list" : [ "address", "arbitrate", "arrange", "articulate",
						"author", "clarify", "collaborate", "communicate",
						"compose", "condense", "confer", "consult", "contact",
						"convey", "convince", "correspond", "debate", "define",
						"describe", "develop", "direct", "discuss", "draft",
						"edit", "elicit", "enlist", "explain", "express",
						"formulate", "furnish", "incorporate", "influence",
						"interact", "interpret", "interview", "involve",
						"joid", "judge", "lecture", "listen", "market",
						"mediate", "moderate", "motivate", "negotiate",
						"observe", "outline", "participate", "persuade",
						"present", "promote", "propose", "publicise",
						"publicize", "reconcile", "recruit", "refer",
						"reinforce", "report", "resolve", "respond", "solicit",
						"specify", "speak", "suggest", "summarise",
						"summarize", "synthesise", "synthesize", "translate",
						"write" ]
			},
			{
				"name" : "technical",
				"list" : [ "adapt", "assemble", "build", "calculate",
						"compute", "conserve", "construct", "convert", "debug",
						"design", "determine", "develop", "devise", "engineer",
						"fabricate", "install", "maintain", "operate",
						"overhaul", "program", "remodel", "repair", "replace",
						"restore", "solve", "specialised", "specialized",
						"train", "upgrade", "utilise", "utilize" ]
			},
			{
				"name" : "teaching",
				"list" : [ "adapt", "advise", "clarify", "coach",
						"communicate", "conduct", "coordinate", "critique",
						"define", "develop", "enable", "encourage", "evaluate",
						"explain", "facilitate", "guide", "individualise",
						"individualize", "inform", "initiate", "instil",
						"instruct", "listen", "motivate", "persuade",
						"set goals", "stimulate", "teach", "test", "train",
						"transmit", "tutor", "update" ]
			},
			{
				"name" : "organisational",
				"list" : [ "approve", "arrange", "catalogue", "categorise",
						"categorize", "charter", "classify", "code", "collect",
						"compile", "correct", "correspond", "distribute",
						"execute", "file", "generate", "incorporate",
						"inspect", "log", "maintain", "monitor", "operate",
						"order", "organise", "organize", "purchase", "review",
						"verify" ]
			},
			{
				"name" : "financial",
				"list" : [ "adjust", "administer", "allocate", "analyse",
						"analyze", "appraise", "assess", "audit", "balance",
						"budget", "calculate", "compute", "correct",
						"determine", "develop", "estimate", "forecast",
						"manage", "market", "measure", "plan", "program",
						"project", "reconcile", "research", "retrieve" ]
			},
			{
				"name" : "creative",
				"list" : [ "act", "adapt", "begin", "combine", "conceptualise",
						"conceptualize", "condense", "create", "customise",
						"customize", "design", "develop", "direct", "display",
						"draw", "entertain", "establish", "fashion",
						"formulate", "found", "illustrate", "initiate",
						"institute", "integrate", "introduce", "invent",
						"model", "modify", "originate", "perform",
						"photograph", "plan", "revise", "revitalise",
						"revitalize", "shape", "solve" ]
			},
			{
				"name" : "helping",
				"list" : [ "adapt", "advocate", "aid", "answer", "arrange",
						"assess", "assist", "care for", "clarify", "coach",
						"collaborate", "contribute", "cooperate", "counsel",
						"demonstrate", "diagnose", "educate", "encourage",
						"ensure", "expedite", "facilitate", "familiarise",
						"familiarize", "guide", "help", "intervene",
						"motivate", "present", "provide", "refer",
						"rehabilitate", "represent", "resolve", "simplify",
						"supply", "support", "volunteer" ]
			},
			{
				"name" : "detail",
				"list" : [ "approve", "arrange", "catalogue", "categorise",
						"categorize", "chart", "classify", "code", "collect",
						"compile", "correspond", "distribute", "execute",
						"file", "generate", "implement", "incorporate",
						"inspect", "log", "maintain", "monitor", "obtain",
						"operate", "order", "organise", "organize", "prepare",
						"process", "provide", "purchase", "record", "register",
						"reserve", "respond", "review", "route", "schedule",
						"screen", "set up", "submit", "supply", "standardise",
						"standardize", "systematise", "systematize", "update",
						"validate", "verify" ]
			} ],
	"solo" : [
			{
				"name" : "uni-structural",
				"list" : [ "arrange", "ask ", "associate", "cite ", "define",
						"draw", "duplicate", "find", "find errors", "focus",
						"group", "identify", "label", "list", "locate",
						"match", "measure", "memorise memorize", "name",
						"note", "observe", "order", "point out", "quote",
						"rank", "recall", "rcognise", "record", "restate",
						"score", "select", "separate", "show", "sketch",
						"state", "subdivide", "substitute", "summarise",
						"tell", "transmit", "use", "write" ]
			},
			{
				"name" : "multi-structural",
				"list" : [ "calculate", "chart", "choose", "clarify",
						"classify", "complete", "compute", "consider",
						"correlate", "define", "demonstrate", "describe",
						"determine", "diagram", "discuss", "discover",
						"dissect", "divide", "employ", "estimate", "examine",
						"experiment", "explain", "express", "extend",
						"follow a procedure", "formulate", "give examples",
						"grade", "illustrate", "imagine", "indicate",
						"interpret", "list", "operate", "order", "outline",
						"paraphrase", "practice", "rank", "rate", "rearrange",
						"relate", "reorganise", "report", "represent",
						"reproduce", "revise", "rewrite", "rework", "schedule",
						"select", "show", "simulate", "sketch", "solve",
						"structure", "support", "survey", "symbolise", "test",
						"trace", "transfer", "write" ]
			},
			{
				"name" : "relational",
				"list" : [ "administer", "advertise", "analyse", "anticipate",
						"apply", "appraise", "arrange", "articulate",
						"assemble", "attach", "break down", "calculate",
						"categorise", "chart", "choose", "classify",
						"collaborate", "collect", "combine", "compare",
						"conclude", "connect", "contrast", "criticise",
						"critique", "decide", "demonstrate", "differentiate",
						"disciminate", "distinguish", "editorialise",
						"establish ", "estimate", "evaluate ",
						"explain causes", "explain effects", "infer",
						"inquire", "integrate", "intervene", "interview",
						"make", "make an analogy", "map", "model", "modify",
						"observe", "organise", "outline", "paint", "perform",
						"plan", "predict", "prepare", "produce", "propose",
						"question", "recommend", "relate", "role-play",
						"schematise", "sequence", "summarise", "survey",
						"teach", "weigh" ]
			},
			{
				"name" : "extended abstract",
				"list" : [ "act", "adapt", "deep understanding", "appreciate",
						"argue", "assess", "change", "collaborate", "compose",
						"construct", "convince", "create", "debate", "deduce",
						"defend", "design", "develop", "devise", "dramatise",
						"evaluate", "facilitate", "generalise", "generate",
						"hypothesise", "invent", "judge", "justify", "manage",
						"manipulate", "negotiate", "originate", "perform",
						"persuade", "plan", "predict ", "prepare",
						"prioritise", "prove", "recommend", "reflect",
						"role-play", "speculate", "synthesise", "theorise",
						"validate", "value", "visualise" ]
			} ]
};
