var post = $(".post_container");
var holder = undefined;
while (holder != "regular") {
    post = post.nextSibling;
    if (post.children != undefined && post.children[0].dataset != undefined) {
         holder = post.children[0].dataset.type;
    }
}
var post_content = $("#" + post.children[0].id + " > .post_wrapper > .post_content > .post_content_inner > .post_container > .post_body").textContent;
