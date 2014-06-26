var metric_parameters = {
	"feedback" : [
			{
				"rule" : [ {
					"var" : "wordcount",
					"is" : "above",
					"val" : "0"
				} ],
				"message" : "<b>Word count:</b> __WC__."
			},
			{
				"rule" : [ {
					"var" : "keyword_h",
					"is" : "equal",
					"val" : "0"
				}, {
					"var" : "keyword_l",
					"is" : "equal",
					"val" : "0"
				} ],
				"message" : "<b>Thinking Skills</b><br/> Check that you are using active verbs in your outcome that will communicate to your students what skills you are expecting them to demonstrate in completing this unit. Think about comprehension based skills like __LWORDS__, as well as higher order skills like __HWORDS__?"
			},
			{
				"rule" : [ {
					"var" : "keyword_h",
					"is" : "above",
					"val" : "0"
				}, {
					"var" : "keyword_l",
					"is" : "equal",
					"val" : "0"
				} ],
				"message" : "<b>Thinking Skills</b><br/> You are thoroughly examining how your students transform, assess apply and act on the material covered in the course. Do you also want them to check their comprehension based skills like __LWORDS__?"
			},
			{
				"rule" : [ {
					"var" : "keyword_h",
					"is" : "equal",
					"val" : "0"
				}, {
					"var" : "keyword_l",
					"is" : "above",
					"val" : "0"
				} ],
				"message" : "<b>Thinking Skills</b><br/> Your choice of verbs shows you want to build your students’ retention and comprehension skills. Did you also want to look at higher order thinking skills like __HWORDS__?"
			},
			{
				"rule" : [ {
					"var" : "keyword_h",
					"is" : "above",
					"val" : "0"
				}, {
					"var" : "keyword_l",
					"is" : "above",
					"val" : "0"
				} ],
				"message" : "<b>Thinking Skills</b><br/> Your verb selection shows you are expecting your students to develop a balance of both higher and lower order thinking skills."
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
					"var" : "employability",
					"is" : "equal",
					"val" : "0"
				} ],
				"message" : "<b>Employability Skills</b><br/> When writing your outcomes, consider using terms that will reflect future employability skills."
			},
			{
				"rule" : [ {
					"var" : "employability",
					"is" : "above",
					"val" : "0"
				} ],
				"message" : "<b>Employability Skills</b><br/> Your verb choices reflect __SKILLNAME__ skills."
			},
			{
				"rule" : [ {
					"var" : "solonum",
					"is" : "above",
					"val" : "0"
				} ],
				"message" : "<b>SOLO Taxonomy</b><br/> Your verb choices reflect the <b>__SOLOLEVEL__</b> level of the SOLO taxonomy"
			},
			{
				"rule" : [ {
					"var" : "flaggedword",
					"is" : "above",
					"val" : "0"
				} ],
				"message" : "&quot;Understand&quot; is a very general word. Can you be more specific about what skills you want your students to build?"
			},
			{
				"rule" : [ {
					"var" : "repetition",
					"is" : "equal",
					"val" : "1"
				} ],
				"message" : "You seem to use the word <b>__REP_WORD__</b> quite often. See if you can think of any alternative terms, or different ways of expressing this idea."
			},
			{
				"rule" : [ {
					"var" : "repetition",
					"is" : "above",
					"val" : "1"
				} ],
				"message" : "You seem to use the words <b>__REP_WORD__</b> quite often. See if you can think of any alternative terms, or different ways of expressing this idea."
			} ],
	"empty_message" : "Please paste learning outcomes for your unit into the box to check them",

	"word_l" : {
		"knowledge" : [ "arrange", "collect", "define", "define", "describe",
				"duplicate", "find", "identify", "label", "list", "locate",
				"memorize", "memorise", "name", "order", "quote", "recall",
				"recognise", "recognize", "relate", "repeat", "reproduce",
				"retrieve", "show", "state", "tabulate", "tell" ],
		"comprehension" : [ "associate", "classify", "compare", "contrast",
				"describe", "differentiate", "discuss", "distinguish",
				"estimate", "explain", "express", "identify", "indicate",
				"interpret", "paraphrase", "report", "restate", "review",
				"summarize", "summarise", "tell" ],
		"application" : [ "apply", "demonstrate", "calculate", "change",
				"classify", "complete", "discover", "employ", "examine",
				"experiment", "illustrate", "implement", "interpret", "modify",
				"operate", "predict", "prepare", "produce", "relate", "show",
				"solve", "use" ]
	},
	"word_h" : {
		"analysis" : [ "analyze", "analyse", "appraise", "arrange",
				"calculate", "categorise", "categorize", "classify", "compare",
				"connect", "contrast", "criticise", "criticize", "deconstruct",
				"differentiate", "discriminate", "divide", "examine",
				"explain", "infer", "order", "organise", "organize", "outline",
				"question", "select", "separate" ],
		"synthesis" : [ "arrange", "assemble", "combine", "compose",
				"construct", "create", "design", "develop", "explain",
				"formulate", "generalise", "generalize", "integrate", "invent",
				"make", "manage", "modify", "organise", "organize", "plan",
				"prepare", "rearrange", "rewrite", "set up", "substitute" ],
		"evaluation" : [ "appraise", "argue", "assess", "choose", "compare",
				"conclude", "convince", "critique", "decide", "defend",
				"discriminate", "estimate", "evaluate", "explain", "grade",
				"interpret", "judge", "justify", "measure", "predict",
				"prioritise", "prioritize", "prove", "rank", "rate",
				"recommend", "select", "summarise", "summarize", "support",
				"test", "value" ],
	},
	"word_flagged" : [ "understand", ],
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
