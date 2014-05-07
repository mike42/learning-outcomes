var metric_parameters = {
    "word_lists": {
        "knowledge": "l",
        "comprehension": "l",
        "application": "l",
        "analysis": "h",
        "synthesis": "h",
        "evaluation": "h"
    },
    "word_knowledge": [
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
    "word_comprehension": [
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
    "word_application": [
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
        "use"],
    "word_analysis": [
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
    "word_synthesis": [
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
    "word_evaluation": [
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
    "feedback": [
        {
            "rule": [
                {"var": "keyword_h", "is": "equal", "val": "0"},
                {"var": "keyword_l", "is": "equal", "val": "0"}
            ],
            "message": "Check that you are using active verbs in your outcome that will communicate to your students what skills you are expecting them to demonstrate in completing this unit. Think about comprehension based skills like __LWORDS__, as well as higher order skills like __HWORDS__."
        },
        {
            "rule": [
                {"var": "keyword_h", "is": "equal", "val": "0"},
                {"var": "keyword_l", "is": "equal", "val": "0"}
            ],
            "message": "You are thoroughly examining how your students transform, assess apply and act on the material covered in the course. Do you also want them to check their comprehension based skills like __LWORDS__."
        },
        {
            "rule": [
                {"var": "keyword_h", "is": "equal", "val": "0"},
                {"var": "keyword_l", "is": "equal", "val": "0"}
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
                {"var": "wordcount", "is": "below", "val": "40"}
            ],
            "message": "This is very brief. Are you sure you are conveying all of the skills and attributes you want students to develop in this unit?"
        },
        {
            "rule": [
                {"var": "wordcount", "is": "above", "val": "180"}
            ],
            "message": "This is quite long: ideally these statements should be brief and to the point. Check the level of detail you are including."
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
            "message": "You seem to use the word __WORD__ quite often. See if you can think of any alternative terms, or different ways of expressing this idea."
        },
        {
            "rule": [
                {"var": "repetition", "is": "above", "val": "1"}
            ],
            "message": "You seem to use the words __WORDS__ quite often. See if you can think of any alternative terms, or different ways of expressing this idea."
        }
    ]
};
