# Blog to Speech

Uses Chrome's built in Speech Synthesizer API to read Tumblr posts to the user.

A Chrome extension is under development.

## Documentation

### Variables

#### post

An object that holds a single Tumblr post.

#### postObj

An object which holds information in an easily accessible format for the script to read.

#### post_type

A string that stores the type of post which is being read. I think this is set in case [replay](#replay) needs to be called.

Set in the [read](#read) function.

#### post_content

Never actually used, and is only ever set to an empty string.

#### read_post_type

A boolean which determines if the [post_type](#post_type) will be read.

#### voices

An array of voices which can be used via the Google Speech Synthesizer API.

#### voice

The specific voice used from the [voices](#voices) array.

### Functions

#### switchVoice

Takes one argument:

* ```index``` (an integer value >= 0)

Ensures that the array of possible [voices](#voices) has been initialized, and then sets the [voice](#voice) to whichever voice is at the ```index``` location of the [voices](#voices) array.

If the index is larger than the number of voices, an error message is output instead, and the voice is not changed.

#### toggle_read_post_type

Sets [read_post_type](#read_post_type) to it's logical opposite (true to false, false to true).

#### playMedia

Not implemented.

#### speak

Takes one argument:

* ```msg``` (A string containing text to be read aloud by the Google Speech Synthesizer API)

Breaks the ```msg``` string into substrings so that they meet an internally defined length requirement, without breaking full words apart.

It puts these substrings into an array, which it then turns into ```SpeechSynthesisUtterance```s (as defined by the Google Speech Synthesizer API), and puts them into the Google Speech Synthesizer API's queue for reading aloud.

#### cancel

Calls the Google Speech Synthesizer API's built in cancel function, which stops the [speak](#speak) function.

This completely stops the speech, which is necessary in case the string given to the API is too long and it breaks.

#### read

Takes two arguments:

* ```post``` (a [post](#post) object)

* ```type``` (the type of [post](#post))

#### replay

Calls the [read](#read) function, supplying the globally defined [post](#post) object and the globally defined [post_type](#post_type) variable.

#### next

Checks to see if variable [post](#post) is ```undefined``` or ```null```, in which case there is no next post to get.

While a variable ```holder``` is not assigned one of the valid post types (regular, photo, photoset, note, video, or audio), the script loops, checking to see if [post](#post)'s next sibling is ```undefined``` or ```null```.

If the next sibling is ```undefined``` or ```null```, the program alerts the user that there isn't a next post and returns.

Otherwise, [post](#post) is reassigned to become its next sibling.

After this, if the new [post](#post) object has the correct children, ```holder``` is assigned to the post type from the [post](#post) object.

#### init

If the [post](#post) object is defined and has the correct children, then [init](#init) calls the [read](#read) function, supplying a globally defined [post](#post) object and its type as defined by the [post](#post) object.

#### Shoutout to all the functions that aren't documented

There's a lot of them, and they need to be cleaned up very badly.
