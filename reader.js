var post = $(".post_container");
var post_content = ""; 

var speak = function (msg) { 
	var MAX_LENGTH = 300;
	var msgarr = [],
		t_msgarr = [],
		t_msg = "";
		
	while (msg.length > MAX_LENGTH) { 
		t_msg = "";
		t_msgarr = msg.split(" ");
		
		for (var i = 0; i < t_msgarr.length; i++) { //gotta be a better way to do this
			if (t_msg.length + t_msgarr[i].length < MAX_LENGTH) {
				t_msg += t_msgarr[i] + " ";
			} else {
				i = t_msgarr.length; //stops loop from going again
			}
		}
		
		msgarr.push(t_msg);
		msg = msg.slice (t_msg.length - 1); 
	} 
	
	msgarr.push(msg);
			
	for (var i = 0; i < msgarr.length; i++) {
		var speech = new SpeechSynthesisUtterance(msgarr[i]); 
		speechSynthesis.speak(speech); 
	}
	 
} 

var cancel = function () { 
	speechSynthesis.cancel(); 
} 

var next = function () { 
	if (post === undefined || post === null) {  //it's not going to work
		console.log ("Error: Next Post Doesn't Exist"); 
		speak("Error: Post Doesn't Exist"); 
		return; 
	}
	
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
	
	switch (holder) {
		case "regular":
			if ($("#" + post.children[0].id + " > .post_wrapper > .post_header > .post_info") != null && $("#" + post.children[0].id + " > .post_wrapper > .post_header > .post_info") != undefined) {
				speak($("#" + post.children[0].id + " > .post_wrapper > .post_header > .post_info").textContent);
			}
			
			if ($("#" + post.children[0].id + " > .post_wrapper > .post_content > .post_content_inner > .post_container > .post_body") != undefined) {
				speak($("#" + post.children[0].id + " > .post_wrapper > .post_content > .post_content_inner > .post_container > .post_body").textContent); 
			}
			else if ($("#" + post.children[0].id + " > .post_wrapper > .post_content > .post_content_inner > .post_container > .reblog-list > .reblog-list-item") != undefined) {
				if ($("#" + post.children[0].id + " > .post_wrapper > .post_content > .post_content_inner > .post_container > .reblog-list > .reblog-list-item > .reblog-header")) {
					speak($("#" + post.children[0].id + " > .post_wrapper > .post_content > .post_content_inner > .post_container > .reblog-list > .reblog-list-item > .reblog-header").textContent);
				}
				
				if ($("#" + post.children[0].id + " > .post_wrapper > .post_content > .post_content_inner > .post_container > .reblog-list > .reblog-list-item > .reblog-content")) {
					speak($("#" + post.children[0].id + " > .post_wrapper > .post_content > .post_content_inner > .post_container > .reblog-list > .reblog-list-item > .reblog-content").textContent);
				}
									
				var reblog_list_item = $("#" + post.children[0].id + " > .post_wrapper > .post_content > .post_content_inner > .post_container > .reblog-list > .reblog-list-item");
				
				while (reblog_list_item.nextSibling != null && reblog_list_item.nextSibling != undefined) {
					reblog_list_item = reblog_list_item.nextSibling;
					
					if (reblog_list_item.children != null && reblog_list_item.children != undefined) {
						speak(reblog_list_item.children[0].textContent);
						speak(reblog_list_item.children[1].textContent);
					}
				}
				
				if ($("#" + post.children[0].id + " > .post_wrapper > .post_content > .post_content_inner > .post_container > .reblog-list-item") != undefined && $("#" + post.children[0].id + " > .post_wrapper > .post_content > .post_content_inner > .post_container > .reblog-list-item") != null) {
					if ($("#" + post.children[0].id + " > .post_wrapper > .post_content > .post_content_inner > .post_container > .reblog-list-item > .reblog-header") != null && $("#" + post.children[0].id + " > .post_wrapper > .post_content > .post_content_inner > .post_container > .reblog-list-item > .reblog-header") != undefined) {
						speak($("#" + post.children[0].id + " > .post_wrapper > .post_content > .post_content_inner > .post_container > .reblog-list-item > .reblog-header").textContent);
					}
					
					if ($("#" + post.children[0].id + " > .post_wrapper > .post_content > .post_content_inner > .post_container > .reblog-list-item > .reblog-content") != null && $("#" + post.children[0].id + " > .post_wrapper > .post_content > .post_content_inner > .post_container > .reblog-list-item > .reblog-content") != undefined) {
						speak($("#" + post.children[0].id + " > .post_wrapper > .post_content > .post_content_inner > .post_container > .reblog-list-item > .reblog-content").textContent);
					}
				}
			}
			else {
				speak("undefined content");
			}
		break;
		
		case "photo":
			if ($("#" + post.children[0].id + " > .post_wrapper > .post_header > .post_info") != null && $("#" + post.children[0].id + " > .post_wrapper > .post_header > .post_info") != undefined) {
				speak($("#" + post.children[0].id + " > .post_wrapper > .post_header > .post_info").textContent);
			}
			
			speak(holder + " post. This post type only has partial functionality.");
		break;
		
		default:
			speak(holder + " post. Functionality not yet added for this post type.");
		break;
	}
} 

var init = function () { 
	next(); 
} 

init();
