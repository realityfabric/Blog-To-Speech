var post = $(".post_container");
var post_content; 

var speak = function (msg) { 
	var speech = new SpeechSynthesisUtterance(msg); 
	speechSynthesis.speak(speech); 
} 

var cancel = function () { 
	speechSynthesis.cancel(); 
} 

var next = function () { 
	var holder = undefined; 
	
	while (holder != "regular") { 
		post = post.nextSibling; 
		
		if (post.children != undefined && post.children[0].dataset != undefined) { 
			holder = post.children[0].dataset.type; 
		} 
	} 
	
	post_content = $("#" + post.children[0].id + " > .post_wrapper > .post_content > .post_content_inner > .post_container > .post_body").textContent; 
	
	speak(post_content); 
} 

var init = function () { 
	next(); 
} 

init();
