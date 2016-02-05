function authDataCallback(authData) {
  if (authData) {
    console.log("User " + authData.uid + " is logged in with " + authData.provider);
  }
  else {
    console.log("User is logged out");
  }
}

function raw_trigger() {
  var myDB = new Firebase("https://scorching-heat-6301.firebaseio.com/");
  //var myDB = new Firebase('https://flickering-fire-3046.firebaseio.com/');
  //var myDB = new Firebase('https://buttsbutts.firebaseio.com/');
  myDB.on("value", function(snapshot) {
    var theData = snapshot.val();
    document.body.innerHTML = JSON.stringify(theData);
  });
}

var GHusername = "";

// login should also carry the user bar as well 
function login() {
  var postsRef = new Firebase("https://scorching-heat-6301.firebaseio.com/");
  postsRef.authWithOAuthPopup("github", function(error, authData) {
    showHomePage();
    var statusbar = document.querySelector("#words");
    statusbar.innerHTML = authData.github.username;
    document.querySelector(".hideafterlogin").style.display = "none";
    document.querySelector(".hidetillogin").style.display = "inline";
  }, {
    remember: "sessionOnly",
    scope: "user,gist"
  });
}

function send_post() {
  var dt = new Date();
  var d = dt.getDay().toString();
  var m = (dt.getMonth() + 1).toString(); // eat my ass mozilla
  var y = (dt.getFullYear() - 2000).toString(); // because wtf
  // reassigning date
  console.log(dt, m, d, y);
  dt = m.concat("/").concat(d).concat("/").concat(y);
  var postTitle = document.querySelector(".postTitle").value;
  var meat = document.querySelector(".meat").value;
  var md = document.querySelector(".md_decision").checked;
  if(md == true) {
    var MDmeat = markdown.toHTML(meat);
    meat = MDmeat;
  } 
  // trying the markdown conversion
  
  // username === null || username === "" ||
  if (meat === null || meat === "" || postTitle == "" || postTitle == null) {
    alert("Incorrect input!");
    return false;
  }
  else {
    var postsRef = new Firebase("https://scorching-heat-6301.firebaseio.com/");
    postsRef.authWithOAuthPopup("github", function(error, authData) {
        postsRef.onAuth(authDataCallback);
        // creating the post object
        var newPostRef = postsRef.push()
        newPostRef.set({
          user: authData.github.username,
          title: postTitle,
          date: dt,
          content: meat
        });
        console.log(dt, meat, authData.github.username);
        var form = document.getElementById("primaryForm");
        form.reset();
      },
      // allows for browser-session persistence
      {
        remember: "sessionOnly",
        scope: "user,gist"
      });
    return true;
  }
}