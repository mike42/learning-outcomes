default:
	# Compression via Google's Closure compiler
	head js/outcome-analysis.js -n5 > js/outcome-analysis.min.js
	closure-compiler --js js/outcome-analysis.js >> js/outcome-analysis.min.js

clean:
	rm -f js/outcome-analysis.min.js
