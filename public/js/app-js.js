//changing name of function to an existing name with different scope will break this!!
function clickThisButton() {
	var div = document.getElementById('node-text');
	console.log(div)
	div.innerHTML = 'Button was clicked!'
}

function clearThisText() {
	var div = document.getElementById('node-text');
	div.innerHTML = ''
}

