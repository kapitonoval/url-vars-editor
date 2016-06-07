/**
  * jQuery plugin
  *	operations with URL
  * @simple $.urlVar('get_myvar','valuue');
  * @author Alexey Kapitonov
  * @version 10.05.2016
  */

$.extend({
	getUrlVars: function(){
		var vars = [], hash;
		var pos = window.location.href.indexOf('?');
		// console.log(pos);
		if(pos > 0) {
			var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
			for(var i = 0; i < hashes.length; i++)
			{
				hash = hashes[i].split('=');
				vars.push(hash[0]);
				vars[hash[0]] = hash[1];
			}
		}
		return vars;
	},
	urlVar: function(name, val){
		if(val === undefined)
		{
			return $.getUrlVars()[name];
		}else{
			return $.setUrlVal(name, val);
		}
	},
	setUrlVal: function (name, val){
		var hashes = $.getUrlVars();

		if(hashes[name] === undefined){
			hashes.push(name);
		}

		hashes[name] = val;

		var urlString = '';
		hashes.forEach(function(element, index){
			urlString += ((index==0)?'?':'&') + element + '=' + hashes[element];
		});
		window.history.pushState("object or string", "Портфолио", "/os/" + urlString);
	},
	delUrlVal: function (name){
		var hashes = $.getUrlVars();

		if(hashes[name] !== undefined){
			hashes.splice(hashes.indexOf(name), 1);
			var urlString = '';
			hashes.forEach(function(element, index){
				console.log(element);
				urlString += ((index==0)?'?':'&') + element + '=' + hashes[element];
			});
			window.history.pushState("object or string", "Портфолио", "/os/" + urlString);
		}
	}
});
