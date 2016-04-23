var post = $(".post_container");
var postObj = {
		// TODO: initializer function
	};
var post_type = undefined;
var post_content = ""; 
var read_post_type = true;

var voices = speechSynthesis.getVoices();
var voice = voices[2]; //default voice

var switchVoice = function (index) {
	voices = speechSynthesis.getVoices(); //added this because sometimes the initial definition assigns an empty array
	if (index < 0 || index >= voices.length) {
		console.log ("index invalid");
	} else {
		voice = voices[index];
		console.log (voice.name);
	}
}

var toggle_read_post_type = function () {
	read_post_type = !read_post_type;
}

var playMedia = function () {
	// TODO: make it so that audio and video posts can be played
}

var speak = function (msg) { 
	/*
	 * TODO: split sentences into separate utterances to both reduce utterance length (preventing the need to split mid sentence) and also add better timing to posts
	 */
	var MAX_LENGTH = 250;
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
		speech.voice = voice;
		speechSynthesis.speak(speech); 
	}
	 
} 

var cancel = function () { 
	speechSynthesis.cancel(); 
}

//[username] reblogged [username]
var post_header = function (post) {
	postObj.post_header = $("#" + post.children[0].id + " > .post_wrapper > .post_header > .post_info");
	return $("#" + post.children[0].id + " > .post_wrapper > .post_header > .post_info");
}

//username of person who made an addition
var rl_reblog_header = function (post) {
	postObj.reblog_header = $("#" + post.children[0].id + " > .post_wrapper > .post_content > .post_content_inner > .post_container > .reblog-list > .reblog-list-item > .reblog-header");
	return $("#" + post.children[0].id + " > .post_wrapper > .post_content > .post_content_inner > .post_container > .reblog-list > .reblog-list-item > .reblog-header");
}

//username of a person who made an addition
var reblog_header = function (post) {
	return $("#" + post.children[0].id + " > .post_wrapper > .post_content > .post_content_inner > .post_container > .reblog-list-item > .reblog-header");
}

//title of a post that has not been reblogged
var post_title = function (post) {
	return $("#" + post.children[0].id + " > .post_wrapper > .post_content > .post_content_inner > .post_container > .post_title");
}

//body of a post that has not been reblogged
var post_body = function (post) {
	return $("#" + post.children[0].id + " .post_body");
}

//a segment of a post containing an entire addition (or the op)
var rl_reblog_list_item = function (post) {
	return $("#" + post.children[0].id + " > .post_wrapper > .post_content > .post_content_inner > .post_container > .reblog-list > .reblog-list-item");
}

//a segment of a post containing an entire addition (or the op)
var reblog_list_item = function (post) {
	return $("#" + post.children[0].id + " > .post_wrapper > .post_content > .post_content_inner > .post_container > .reblog-list-item");
}

//title of a post that has been reblogged
var rl_reblog_title = function (post) {
	return $("#" + post.children[0].id + " > .post_wrapper > .post_content > .post_content_inner > .post_container > .reblog-list > .reblog-list-item > .reblog-title");
}

//content of a post that has been reblogged
var rl_reblog_content = function (post) {
	return $("#" + post.children[0].id + " > .post_wrapper > .post_content > .post_content_inner > .post_container > .reblog-list > .reblog-list-item > .reblog-content");
}

//content of a post that has been reblogged
var reblog_content = function (post) {
	return $("#" + post.children[0].id + " > .post_wrapper > .post_content > .post_content_inner > .post_container > .reblog-list-item > .reblog-content");
}

//body of a photo post
var photo_post_body = function (post) {
	return $("#" + post.children[0].id + " > .post_wrapper > .post_content > .post_content_inner > .post_body");
}

var photo_post_rl_rli = function (post) {
	return $("#" + post.children[0].id + " > .post_wrapper > .post_content > .post_content_inner >  .reblog-list > .reblog-list-item");
}

var photo_post_rl_rli_header = function (post) {
	return $("#" + post.children[0].id + " > .post_wrapper > .post_content > .post_content_inner > .reblog-list > .reblog-list-item > .reblog-header");
}

var photo_post_rl_rli_content = function (post) {
	return $("#" + post.children[0].id + " > .post_wrapper > .post_content > .post_content_inner > .reblog-list > .reblog-list-item > .reblog-content");
}

var photo_post_rli = function (post) {
	return $("#" + post.children[0].id + " > .post_wrapper > .post_content > .post_content_inner > .reblog-list-item");
}

var photo_post_rli_header = function (post) {
	return $("#" + post.children[0].id + " > .post_wrapper > .post_content > .post_content_inner > .reblog-list-item > .reblog-header");
}

var photo_post_rli_content = function (post) {
	return $("#" + post.children[0].id + " > .post_wrapper > .post_content > .post_content_inner > .reblog-list-item > .reblog-content");
}

var note_post_question = function (post) {
	return $("#" + post.children[0].id + " .post_body > .note_wrapper");
}

var note_post_answer = function (post) {
	return $("#" + post.children[0].id + " .post_body > .answer");
}

var read = function (post, type) {
	if (read_post_type) {
		speak(type + " post:");
	}
	post_type = type;
	
	if (post_header(post) != undefined) {
		speak(post_header(post).textContent);
	}
		
	switch (type) {
		case "regular":			
			if (post_title(post) != undefined) {
				speak(post_title(post).textContent); 
			}
			if (post_body(post) != undefined) {
				for (var post_body_index = 0; post_body_index < post_body(post).children.length; post_body_index++) {
					speak(post_body(post).children[post_body_index].textContent); 
				}
			}
			else if (rl_reblog_list_item(post) != undefined) {
				speak(rl_reblog_header(post).textContent);
				
				if (rl_reblog_title(post) != undefined) {
					speak(rl_reblog_title(post).textContent);
				}
				
				if (rl_reblog_content(post) != undefined) {
					for (var reblog_content_index = 0; reblog_content_index < rl_reblog_content(post).children.length; reblog_content_index++) {
						speak(rl_reblog_content(post).children[reblog_content_index].textContent);
					}
				}
									
				var rli = rl_reblog_list_item(post);
				
				while (rli.nextSibling != undefined) {
					rli = rli.nextSibling;
					
					if (rli.children != undefined) {
						speak(rli.children[0].textContent);
						for (var rli_index = 0; rli_index < rli.children[1].children.length; rli_index++) {
							speak(rli.children[1].children[rli_index].textContent);
						}
					}
				}
				
				if (reblog_list_item(post) != undefined) {
					if (reblog_header(post) != undefined) {
						speak(reblog_header(post).textContent);
					}
					
					if (reblog_content(post) != undefined) {
						speak(reblog_content(post).textContent);
					}
				}
			}
			else {
				speak("undefined content");
			}
			
		break;
		
		case "photo":
			if (photo_post_body(post) != undefined) {
				speak(photo_post_body(post).textContent);
			}
			
			if (photo_post_rl_rli(post) != undefined) {
				if (photo_post_rl_rli_header(post) != undefined) {
					speak(photo_post_rl_rli_header(post).textContent);
				}
				
				if (photo_post_rl_rli_content(post) != undefined) {
					speak(photo_post_rl_rli_content(post).textContent);
				}
									
				var rli = $("#" + post.children[0].id + " > .post_wrapper > .post_content > .post_content_inner > .reblog-list > .reblog-list-item");
				
				while (rli.nextSibling != undefined) {
					rli = rli.nextSibling;
					
					if (rli.children != undefined) {
						speak(rli.children[0].textContent);
						speak(rli.children[1].textContent);
					}
				}
				
				if (photo_post_rli(post) != undefined) {
					if (photo_post_rli_header(post) != undefined) {
						speak(photo_post_rli_header(post).textContent);
					}
					
					if (photo_post_rli_content(post) != undefined) {
						for (var index = 0; index < photo_post_rli_content(post).children.length; index++) {
							speak(photo_post_rli_content(post).children[index].textContent);
						}
					}
				}
			}
		break;
		
		case "photoset":
			if (photo_post_body(post) != undefined) {
				speak(photo_post_body.textContent);
			}
			
			if (photo_post_rl_rli(post) != undefined) {
				if (photo_post_rl_rli_header(post) != undefined) {
					speak(photo_post_rl_rli_header(post).textContent);
				}
				
				if (photo_post_rl_rli_content(post) != undefined) {
					speak(photo_post_rl_rli_content(post).textContent);
				}
									
				var rli = $("#" + post.children[0].id + " > .post_wrapper > .post_content > .post_content_inner > .reblog-list > .reblog-list-item");
				
				while (rli.nextSibling != undefined) {
					rli = rli.nextSibling;
					
					if (rli.children != undefined) {
						speak(rli.children[0].textContent);
						speak(rli.children[1].textContent);
					}
				}
				
				if (photo_post_rli(post) != undefined) {
					if (photo_post_rli_header(post) != undefined) {
						speak(photo_post_rli_header(post).textContent);
					}
					
					if (photo_post_rli_content(post) != undefined) {
						speak(photo_post_rli_content(post).textContent);
					}
				}
			}
		break;
		
		case "video":
			if (post_body(post) != undefined) {
				speak(post_body(post).textContent);
			}
		break;
		
		case "note":
			if (post_body(post) != undefined) {
				if (note_post_question(post) != undefined) {
					speak(note_post_question(post).textContent);
				}
				
				if (note_post_answer(post) != undefined) {
					speak("Answer: ");
					speak(note_post_answer(post).textContent);
				}
			}
		break;		
		
		default:
			speak(type + " post. Functionality not yet added for this post type.");
		break;
	}
	
	var current_tag = $("#" + post.children[0].id + " .post_tag"); // + " > .post_wrapper > .post_tags > .post_tags_inner > .post_tag"
	while (current_tag != undefined && current_tag != null) {
		speak(current_tag.textContent);
		
		current_tag = current_tag.nextSibling; 
	}
	
	speak ("End of Post");
}

var replay = function () {
	read(post,post_type);
}

var next = function () { 
	if (post === undefined || post === null) {  //it's not going to work
		console.log ("Error: Next Post Doesn't Exist"); 
		speak("Error: Post Doesn't Exist"); 
		return; 
	}
	
	var holder = undefined; 
	
	post_content = "";
	
	while (holder != "regular" && holder != "photo" && holder != "photoset" && holder != "note" && holder != "video" && holder != "audio") { 
	//while (holder != "photoset") {
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
	
	read (post, holder);
} 

var init = function () { 
	next(); 
} 

init();

//Facebook
/*
var fbposts = $(".userContentWrapper");
var fbpost_headers = $(".userContentWrapper ._5pbw");
var fbpost_content = $(".userContentWrapper .userContent");
*/
