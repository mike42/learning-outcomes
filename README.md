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
- A small section of javascript to call the tool and write the feedback onto the page you are working on. A website maintainer may need to edit this if they want to change the user experience.

The tool itself has no dependencies. Bootstrap/jQuery is suggested for rendering them, and [index.html](https://github.com/mike42/learning-outcomes/blob/master/index.html) is a minimal example which uses these. They can be loaded from a CDN, or uploaded to the server. All files mentioned can be found in this repository.

    <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css"></script>
	<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>

The remainder of this section walks through chopping up index.html and putting it in your Content Management System. You will need to upload the library and the parameter file to the web space and include them on a page:

    <script src="js/outcome-parameters.js"></script>
    <script src="js/outcome-analysis.min.js"></script>

The CSS code which styles the tool is as follows (some extraneous code has been cut out). Note the colours are from the Monash branding guidelines, and that you need [sectionarrow.png](https://github.com/mike42/learning-outcomes/blob/master/css/sectionarrow.png).

````css
	<style>
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
		background: url(css/outcomearrow.png) no-repeat 0 0;
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
	</style>
```

Now you need to get the forms and boxes to work with. The page has two columns, which go in a row per below. Again, the header code has been cut so that this can be pasted into the edit box of your CMS.

````html
	<div class="row">
		<div class="col-sm-6 info-panel">
			<p>(intro text goes here)</p>
	
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
	</div>
```

The final step is to include a block of javascript to analyse the text box and draw the rows. The page tabs between an "edit" mode and a "check" mode:

````js
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

### Debugging
- If the site looks ugly, make sure you are loading bootstrap.css
- If the code doesn't do anything, make sure you are loading jQuery, and check the developer console

### SquareSpace specifics
- Apparently [this link](http://answers.squarespace.com/questions/2080/where-do-i-upload-javascript-files) shows how to upload javascript files.
- If you pick a bootstrap-based theme, the visual integration will be less troublesome. Bootstrap and jQuery are best included in the theme, rather than the individual page.

Extending the tool
------------------
The test.html file shows the full range of parameters which are available, and rules can be written into the parameters file for any of these.

Only a subset of available information is actually printed currently, so you just need to add a feedback rule which uses the information.
