var post = $(".post_container");
var post_content = ""; 

var speak = function (msg) { 
	var speech = new SpeechSynthesisUtterance(msg); 
	speechSynthesis.speak(speech); 
} 

var cancel = function () { 
	speechSynthesis.cancel(); 
} 

var next = function () { 
	if (post === undefined || post === null) { console.log ("Error: Next Post Doesn't Exist"); speak("Error: Post Doesn't Exist"); return; } //it's not going to work
	var holder = undefined; 
	
	post_content = "";
	
	while (holder != "regular" && holder != "photo") { 
		if (post.nextSibling != null || post.nextSibling != undefined) {
            console.log(holder);
			post = post.nextSibling; 
		} else {
			console.log ("Error: Next Post Doesn't Exist");
			speak("Error: Next Post Doesn't Exist");
			return;
		}
		
		if (post.children != undefined && post.children.length > 0 && post.children[0].dataset != undefined) { 
			holder = post.children[0].dataset.type; 
		} 
	} 

    if ($("#" + posttest.children[0].id + " > .post_wrapper > .post_header > .post_info") != null && $("#" + posttest.children[0].id + " > .post_wrapper > .post_header > .post_info") != undefined) {
			speak($("#" + posttest.children[0].id + " > .post_wrapper > .post_header > .post_info").textContent);
	}
	
	if ($("#" + post.children[0].id + " > .post_wrapper > .post_content > .post_content_inner > .post_container > .post_body") != undefined) {
		speak($("#" + post.children[0].id + " > .post_wrapper > .post_content > .post_content_inner > .post_container > .post_body").textContent); 
	}
	else if ($("#" + post.children[0].id + " > .post_wrapper > .post_content > .post_content_inner > .post_container > .reblog-list > .reblog-list-item > .reblog-content") != undefined) {
		speak($("#" + post.children[0].id + " > .post_wrapper > .post_content > .post_content_inner > .post_container > .reblog-list > .reblog-list-item > .reblog-content").textContent);
	}
	else {
		speak("undefined content");
	}
} 

var init = function () { 
	next(); 
} 

init();
