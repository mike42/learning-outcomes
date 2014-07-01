Learning Outcomes
=================
This is a javascript-based tool for analysing learning outcomes for use in higher education.

How to run
----------
This is the easy part:
- Download the whole repository to your computer.
- Open up index.html in your favourite web browser.
- Follow the onscreen instructions.

Integration crash-course
------------------------
The tool is designed to be embedded into a content-management system. For flexibility, it is split into three parts:

- The [parameters file](https://github.com/mike42/learning-outcomes/blob/master/js/outcome-parameters.js), containing feedback crieteria and word lists. Education designers may need to edit this to change feedback rules as the need arises.
- The [compressed analysis code](https://github.com/mike42/learning-outcomes/blob/master/js/outcome-analysis.min.js), containing all the fancy code to analyse the text.
- A small section of code which loads the tool and writes the feedback onto the page. A website maintainer may need to edit this if they want to change the user experience.

The tool itself has no dependencies. Bootstrap/jQuery is suggested for rendering them, and [index.html](https://github.com/mike42/learning-outcomes/blob/master/index.html) is a minimal example which uses these. The remainder of this section walks through chopping up index.html and putting it in your Content Management System.

In the page header, get the CSS for Bootstrap:

````html
<link rel="stylesheet" type="text/css" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css"></link>
```

Drop in some CSS code to style the extra features. Note that two external images are used:

````css
.section {
	font-size: 70%;
	float: left;
	width: 100%;
	padding: 0;
	height: 50px;
	position: relative;
	background: rgb(0, 82, 139);
}

.section .arrow {
	position: absolute;
	width: 27px;
	height: 14px;
	bottom: -14px;
	background: url(//mike42.github.io/learning-outcomes/css/sectionarrow.png) no-repeat 0 0;
	left: 2.04%;
	z-index: 1;
}

.section p {
	float: left;
	width: 96%;
	font-size: 1.6em;
	color: #fff;
	font-weight: bold;
	padding: 0 2%;
	line-height: 50px;
}

.info-panel {
	padding-top: 20px;
	padding-right: 0;
	padding-left: 0;
	background-color: #f5f6f6;
	border-right: 0;
}

.form-panel {
	padding-top: 10px;
}

#feedback-panel div {
	padding-left: 15px;
	padding-right: 15px;
}

#show-inner a {
	color: #428bca;
	text-decoration: none;
}

#show-inner a {
	display: block;
	padding: 0.3em;
	padding-left: 30px;
	padding-right: 15px;
	position: relative;
	border-top: 3px solid #fff;
}

#show-inner a:hover {
	text-decoration: none;
	background: #EAE9E9;
}

#show-inner .active {
	background: rgb(52, 51, 51);
	color: #fff;
	text-decoration: none;
}

#show-inner .active:hover {
	background: rgb(52, 51, 51);
}

.active .arrow {
	position: absolute;
	width: 10px;
	height: 19px;
	right: -10px;
	top: 20%;
	background: url(//mike42.github.io/learning-outcomes/css/outcomearrow.png) no-repeat 0 0;
	z-index: 1;
}


#edit, #show .wrapper, .info-panel p {
	padding-right: 15px;
	padding-left: 15px;
}

.wrapper {
	padding-top: 10px;
	padding-bottom: 10px;
	min-height: 4em;
}
````

Next, add this block of javascript and HTML to "embed" the tool somewhere in the page:

````html
<div class="row">
	<div class="section">
		<p>Test Your Learning Outcomes</p>
		<div class="arrow"></div>
	</div>
</div>
<div class="row">
	<div class="col-sm-6 info-panel">
		<p>This tool is designed to help you check the wording of your learning outcomes.
        In the text box below, paste the learning outcomes for your unit, either all together
        or one at a time. The tool will then generate feedback to help you reflect on how your
        outcome is worded. The tool will check for word count, readability, thinking skills,
        employability skills, and other aspects.
        </p>
        
	    <div class="form-group" id="edit">
	    	<textarea class="form-control" style="resize: none" rows=12
	    		placeholder="Enter your learning outcomes here." id="txtOutcome"></textarea>
			<div class="wrapper">
				<button class="btn btn-default pull-right" id="checkOutcomes">Check <span class="glyphicon glyphicon-flash"></span></button>
			</div>
	    </div>
	    <div id="show" style="display: none">
			<div id="show-inner"></div>
			<div class="wrapper">
				<button class="btn btn-default pull-right" id="editOutcomes"><span class="glyphicon glyphicon-chevron-left"></span> Edit</button>
			</div>
		</div>
    </div>
	<div class="col-sm-6 form-panel">
		<div id="feedback-panel" style="display: none">..</div>
	</div>
</div>

<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script src="//mike42.github.io/learning-outcomes/js/outcome-analysis.min.js"></script>
<script src="//mike42.github.io/learning-outcomes/js/outcome-parameters.js"></script>

<script type="text/javascript">
$('#checkOutcomes').on('click', function() {
	checkOutcomes();
})

$('#editOutcomes').on('click', function() {
	editOutcomes();
})

var current_outcome = 0;

function showOutcome(id) {
	if(id != current_outcome) {
		$("#feedback-" + current_outcome).hide();
		$('#outcome-' + current_outcome).removeClass('active');
	}
	current_outcome = id;
	$("#feedback-" + current_outcome).show();
	$('#outcome-' + current_outcome).addClass('active');
}

function editOutcomes() {
	$('#feedback-panel').hide();
	$('#show').hide();
	$('#edit').show();
}

function checkOutcomes() {
	$('#feedback-panel').hide();
	$('#feedback-panel').empty();
	var stats = outcomes_read_passages($('#txtOutcome').val());
	
	if(stats.feedback.messages.length > 0) {
		for(j = 0; j < stats.feedback.messages.length; j++) {
			$('#feedback-panel').append('<p class="well">' + stats.feedback.messages[j] + '</p>');
			break;
		}
	}
	if(stats.feedback.stats.cancel !== undefined) {
		$('#feedback-panel').show(200);
		return;
	}
	
	var feedback;
	$('#show-inner').empty();
	
	for(i = 0; i < stats.outcomes.length; i++) {
		
		feedback = "<div id='feedback-" + i + "' style='display: none'>";
		for(j = 0; j < stats.outcomes[i].feedback.messages.length; j++) {
			feedback += '<p>' + stats.outcomes[i].feedback.messages[j] + '</p>';
		}
		feedback += '</div>';
		$('#feedback-panel').append(feedback);
		$('#show-inner').append("<a href='#' id='outcome-" + i + "'></a>");
		$('#outcome-' + i).text(stats.outcomes[i].outcome_original);
		$('#outcome-' + i).append("<div class='arrow'></div>");
		(function(i) {
			$('#outcome-' + i).on('click', function() {
				showOutcome(i);
				return false;
			})
		})(i);
	}

	$('#feedback-panel').show();
	$('#edit').hide();
	$('#show').show();
	
	current = 0;
	showOutcome(0);
}
</script>
```

The tool should now work on the target page.

### Debugging
- If the site looks ugly, make sure you are loading bootstrap.css.
- If the code doesn't do anything, make sure you are loading jQuery, and check the developer console.
- For extra flexibility, instead of including the parameter file, substitute in the content in so that you can edit it locally.

### SquareSpace specifics
- Paste the HTML/Javascript and CSS blocks into the page content in HTML view.
- Add the line which loads Bootrap CSS under Page Settings -> Advanced -> Page Header Code Injection.

Extending the tool
------------------
The test.html file shows the full range of parameters which are available, and rules can be written into the parameters file for any of these.

Only a subset of available information is actually printed currently, so you just need to add a feedback rule which uses the extra information if you need it.
