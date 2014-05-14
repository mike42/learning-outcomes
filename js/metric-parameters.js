var metric_parameters = {
    "feedback": [
        {
            "rule": [
                {"var": "wordcount", "is": "above", "val": "0"}
            ],
            "message": "Word count: __WC__."
        },
        {
            "rule": [
                {"var": "keyword_h", "is": "equal", "val": "0"},
                {"var": "keyword_l", "is": "equal", "val": "0"}
            ],
            "message": "Check that you are using active verbs in your outcome that will communicate to your students what skills you are expecting them to demonstrate in completing this unit. Think about comprehension based skills like __LWORDS__, as well as higher order skills like __HWORDS__."
        },
        {
            "rule": [
                {"var": "keyword_h", "is": "above", "val": "0"},
                {"var": "keyword_l", "is": "equal", "val": "0"}
            ],
            "message": "You are thoroughly examining how your students transform, assess apply and act on the material covered in the course. Do you also want them to check their comprehension based skills like __LWORDS__."
        },
        {
            "rule": [
                {"var": "keyword_h", "is": "equal", "val": "0"},
                {"var": "keyword_l", "is": "above", "val": "0"}
            ],
            "message": "You are doing a good job describing the comprehension and retention level outcomes you want your students to achieve. Do you want your students to undertake higher level thinking as well, like __HWORDS__?"
        },
        {
            "rule": [
                {"var": "keyword_h", "is": "above", "val": "0"},
                {"var": "keyword_l", "is": "above", "val": "0"}
            ],
            "message": "You are using verbs that will help students understand the skills you are expecting them to develop over the course of this unit."
        },
        {
            "rule": [
                {"var": "readability", "is": "above", "val": "60"}
            ],
            "message": "Your outcomes are simply written and direct. This readability level will be suitable for all of your students."
        },
        {
            "rule": [
                {"var": "readability", "is": "range", "val": ["30", "60"]}
            ],
            "message": "Your outcomes are written at a level appropriate for university students. Bear in mind that your students will have a range of levels of fluency in English."
        },
        {
            "rule": [
                {"var": "readability", "is": "below", "val": "30"}
            ],
            "message": "Your outcomes are written at a level suitable for university graduates. Given your students will have a range of levels of fluency in English, you may want to see if you can simplify the wording without damaging your intended meaning."
        },
        {
            "rule": [
                {"var": "repetition", "is": "equal", "val": "1"}
            ],
            "message": "You seem to use the word __REP_WORD__ quite often. See if you can think of any alternative terms, or different ways of expressing this idea."
        },
        {
            "rule": [
                {"var": "repetition", "is": "above", "val": "1"}
            ],
            "message": "You seem to use the words __REP_WORD__ quite often. See if you can think of any alternative terms, or different ways of expressing this idea."
        },
        {
            "rule": [
                {"var": "flaggedword", "is": "above", "val": "0"}
            ],
            "message": "&quot;__BAD_WORD__&quot; is a very general word. Can you be more specific about what skills you want your students to build?"
        },
        {
            "rule": [
                {"var": "employability", "is": "equal", "val": "0"}
            ],
            "message": "When writing your outcomes, consider using terms that will reflect future employability skills."
        },
        {
            "rule": [
                {"var": "employability", "is": "above", "val": "0"}
            ],
            "message": "WYour verb choices reflect important employability skills in the area of __SKILLNAME__."
        }
    ],
    "empty_message": "Please paste learning outcomes for your unit into the box to check them",

    "word_l": {
        "knowledge": [
            "arrange",
            "collect",
            "define",
            "define",
            "describe",
            "duplicate",
            "find",
            "identify",
            "label",
            "list",
            "locate",
            "memorize",
            "name",
            "order",
            "quote",
            "recall",
            "recognize",
            "relate",
            "repeat",
            "reproduce",
            "retrieve",
            "show",
            "state",
            "tabulate",
            "tell"
        ],
        "comprehension": [
            "associate",
            "classify",
            "compare",
            "contrast",
            "describe",
            "differentiate",
            "discuss",
            "distinguish",
            "estimate",
            "explain",
            "express",
            "identify",
            "indicate",
            "interpret",
            "paraphrase",
            "report",
            "restate",
            "review",
            "summarize",
            "tell"
        ],
        "application": [
            "apply",
            "demonstrate",
            "calculate",
            "change",
            "classify",
            "complete",
            "discover",
            "employ",
            "examine",
            "experiment",
            "illustrate",
            "implement",
            "interpret",
            "modify",
            "operate",
            "predict",
            "prepare",
            "produce",
            "relate",
            "show",
            "solve",
            "use"
        ]
    },
    "word_h": {
        "analysis": [
            "analyze",
            "appraise",
            "analyze",
            "appraise",
            "arrange",
            "calculate",
            "categorize",
            "classify",
            "compare",
            "connect",
            "contrast",
            "criticize",
            "deconstruct",
            "differentiate",
            "discriminate",
            "divide",
            "examine",
            "explain",
            "infer",
            "order",
            "organize",
            "outline",
            "question",
            "select",
            "separate"
        ],
        "synthesis": [
            "arrange",
            "assemble",
            "combine",
            "compose",
            "construct",
            "create",
            "design",
            "develop",
            "explain",
            "formulate",
            "generalize",
            "integrate",
            "invent",
            "make",
            "manage",
            "modify",
            "organize",
            "plan",
            "prepare",
            "rearrange",
            "rewrite",
            "set up",
            "substitute"
        ],
        "evaluation": [
            "appraise",
            "argue",
            "assess",
            "choose",
            "compare",
            "conclude",
            "convince",
            "critique",
            "decide",
            "defend",
            "discriminate",
            "estimate",
            "evaluate",
            "explain",
            "grade",
            "interpret",
            "judge",
            "justify",
            "measure",
            "predict",
            "prioritize",
            "prove",
            "rank",
            "rate",
            "recommend",
            "select",
            "summarize",
            "support",
            "test",
            "value"
        ],
    },
    "word_flagged": [
            "understand",
    ],
    "skill" : [
       {
            "name": "management and leadership",
            "list": [
                "administer",
                "analyse",
                "appoint",
                "approve",
                "assign",
                "authorize",
                "chair",
                "consider",
                "consolidate",
                "contract",
                "control",
                "convert",
                "coordinate",
                "decide",
                "delegate",
                "develop",
                "direct",
                "eliminate",
                "emphasize",
                "enforce",
                "enhance",
                "establish",
                "evaluate",
                "execute",
                "generate",
                "handle",
                "head",
                "hire",
                "host",
                "improve",
                "incorporate",
                "increase",
                "initiate",
                "inspect",
                "institute",
                "manage",
                "merge",
                "motivate",
                "organize",
                "originate",
                "overhaul",
                "oversee",
                "plan",
                "prioritize",
                "recommend",
                "reorganize",
                "replace",
                "restore",
                "review",
                "schedule",
                "streamline",
                "strengthen",
                "supervise",
                "write"
            ]
        },
        {
            "name": "research",
            "list": [
	            "analyze",
	            "clarify",
	            "collect",
	            "compare",
	            "conduct",
	            "critique",
	            "determine",
	            "diagnose",
	            "evaluate",
	            "examine",
	            "experiment",
	            "explore",
	            "extract",
	            "formulate",
	            "gather",
	            "identify",
	            "identify",
	            "inspect",
	            "interpret",
	            "interview",
	            "invent",
	            "investigate",
	            "locate",
	            "measure",
	            "organize",
	            "research",
	            "review",
	            "search",
	            "solve",
	            "summarize",
	            "survey",
	            "systematize",
	            "test"
            ]
        },
        {
            "name": "communication",
            "list": [
	            "address",
	            "arbitrate",
	            "arrange",
	            "articulate",
	            "author",
	            "clarify",
	            "collaborate",
	            "communicate",
	            "compose",
	            "condense",
	            "confer",
	            "consult",
	            "contact",
	            "convey",
	            "convince",
	            "correspond",
	            "debate",
	            "define",
	            "describe",
	            "develop",
	            "direct",
	            "discuss",
	            "draft",
	            "edit",
	            "elicit",
	            "enlist",
	            "explain",
	            "express",
	            "formulate",
	            "furnish",
	            "incorporate",
	            "influence",
	            "interact",
	            "interpret",
	            "interview",
	            "involve",
	            "joid",
	            "judge",
	            "lecture",
	            "listen",
	            "market",
	            "mediate",
	            "moderate",
	            "motivate",
	            "negotiate",
	            "observe",
	            "outline",
	            "participate",
	            "persuade",
	            "present",
	            "promote",
	            "propose",
	            "publicize",
	            "reconcile",
	            "recruit",
	            "refer",
	            "reinforce",
	            "report",
	            "resolve",
	            "respond",
	            "solicit",
	            "specify",
	            "speak",
	            "suggest",
	            "summarize",
	            "synthesize",
	            "translate",
	            "write"
            ]
        },
        {
            "name": "technical",
            "list": [
	            "adapt",
	            "assemble",
	            "build",
	            "calculate",
	            "compute",
	            "conserve",
	            "construct",
	            "convert",
	            "debug",
	            "design",
	            "determine",
	            "develop",
	            "devise",
	            "engineer",
	            "fabricate",
	            "install",
	            "maintain",
	            "operate",
	            "overhaul",
	            "program",
	            "remodel",
	            "repair",
	            "replace",
	            "restore",
	            "solve",
	            "specialized",
	            "train",
	            "upgrade",
	            "utilize"
            ]
        },
        {
            "name": "teaching",
            "list": [
                "adapt",
	            "advise",
	            "clarify",
	            "coach",
	            "communicate",
	            "conduct",
	            "coordinate",
	            "critique",
	            "define",
	            "develop",
	            "enable",
	            "encourage",
	            "evaluate",
	            "explain",
	            "facilitate",
	            "guide",
	            "individualize",
	            "inform",
	            "initiate",
	            "instil",
	            "instruct",
	            "listen",
	            "motivate",
	            "persuade",
	            "set goals",
	            "stimulate",
	            "teach",
	            "test",
	            "train",
	            "transmit",
	            "tutor",
	            "update"
            ]
        },
        {
            "name": "organisational",
            "list": [
	            "approve",
	            "arrange",
	            "catalogue",
	            "categorize",
	            "charter",
	            "classify",
	            "code",
	            "collect",
	            "compile",
	            "correct",
	            "correspond",
	            "distribute",
	            "execute",
	            "file",
	            "generate",
	            "incorporate",
	            "inspect",
	            "log",
	            "maintain",
	            "monitor",
	            "operate",
	            "order",
	            "organize",
	            "purchase",
	            "review",
	            "verify"
            ]
        },
        {
            "name": "financial",
            "list": [
	            "adjust",
	            "administer",
	            "allocate",
	            "analyse",
	            "appraise",
	            "assess",
	            "audit",
	            "balance",
	            "budget",
	            "calculate",
	            "compute",
	            "correct",
	            "determine",
	            "develop",
	            "estimate",
	            "forecast",
	            "manage",
	            "market",
	            "measure",
	            "plan",
	            "program",
	            "project",
	            "reconcile",
	            "research",
	            "retrieve"
            ]
        },
        {
            "name": "creative",
            "list": [
	            "act",
	            "adapt",
	            "begin",
	            "combine",
	            "conceptualize",
	            "condense",
	            "create",
	            "customize",
	            "design",
	            "develop",
	            "direct",
	            "display",
	            "draw",
	            "entertain",
	            "establish",
	            "fashion",
	            "formulate",
	            "found",
	            "illustrate",
	            "initiate",
	            "institute",
	            "integrate",
	            "introduce",
	            "invent",
	            "model",
	            "modify",
	            "originate",
	            "perform",
	            "photograph",
	            "plan",
	            "revise",
	            "revitalize",
	            "shape",
	            "solve"
            ]
        },
        {
            "name": "helping",
            "list": [
                "adapt",
	            "advocate",
	            "aid",
	            "answer",
	            "arrange",
	            "assess",
	            "assist",
	            "care for",
	            "clarify",
	            "coach",
	            "collaborate",
	            "contribute",
	            "cooperate",
	            "counsel",
	            "demonstrate",
	            "diagnose",
	            "educate",
	            "encourage",
	            "ensure",
	            "expedite",
	            "facilitate",
	            "familiarize",
	            "guide",
	            "help",
	            "intervene",
	            "motivate",
	            "present",
	            "provide",
	            "refer",
	            "rehabilitate",
	            "represent",
	            "resolve",
	            "simplify",
	            "supply",
	            "support",
	            "volunteer"
            ]
        },
        {
            "name": "detail",
            "list": [
	            "approve",
	            "arrange",
	            "catalogue",
	            "categorize",
	            "chart",
	            "classify",
	            "code",
	            "collect",
	            "compile",
	            "correspond",
	            "distribute",
	            "execute",
	            "file",
	            "generate",
	            "implement",
	            "incorporate",
	            "inspect",
	            "log",
	            "maintain",
	            "monitor",
	            "obtain",
	            "operate",
	            "order",
	            "organize",
	            "prepare",
	            "process",
	            "provide",
	            "purchase",
	            "record",
	            "register",
	            "reserve",
	            "respond",
	            "review",
	            "route",
	            "schedule",
	            "screen",
	            "set up",
	            "submit",
	            "supply",
	            "standardize",
	            "systematize",
	            "update",
	            "validate",
	            "verify"
            ]
        }

    ]
};
