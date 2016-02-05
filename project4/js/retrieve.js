var subQuery = function() {
    var $query = document.getElementById("nameInput").value;
    var db = new Firebase("https://scorching-heat-6301.firebaseio.com/");
    if ($query == ""){
        db.orderByChild("date").on("child_added", function(snapshot){
            createPreview(snapshot.val(), snapshot.key());
        });
    } else if (checkDate($query)) { //they search using a date
        console.log("Querying with Date.");
        db.orderByChild("date").equalTo($query).on("child_added", function(snapshot) {
            createPreview(snapshot.val(), snapshot.key());
        });
    }
    else {
        console.log("Querying with Name.");
        db.orderByChild("user").equalTo($query).on("child_added", function(snapshot) {
            createPreview(snapshot.val(), snapshot.key());
        });
    }
};

var checkDate = function(input) {
    var reg = /^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/; //does not work perfectly. Returns true with empty input
    // console.log(reg.test(input));
    return reg.test(input);
};

window.onhashchange = returnPost();

function returnPost() {
    var db = new Firebase("https://scorching-heat-6301.firebaseio.com/");
    var postid = location.hash.replace('#', '');
    db.orderByKey().equalTo(postid).on("child_added", function(snapshot) {
        // extract from db

        var post = snapshot.val();
        if (post == null) {
            alert("nothing found!");
        }
        else {
            console.log(post);
            // inject these into the hidden view
            document.querySelector("#falsePostAuthor").innerHTML = "<p>" + post.user + "</p>";
            document.querySelector("#falsePostTitle").innerHTML = "<p>" + post.title + "</p>";
            document.querySelector("#falsePostDate").innerHTML = "<p>" + post.date + "</p>";
            document.querySelector(".falsePostContent").innerHTML = "<p>" + post.content + "</p>";
            // transport to the hidden view
            showPostPage();
        }
    });
};

function createPreview(input, uuid) {
    var btn = document.createElement('button');
    btn.className = "query-result";
    btn.onclick = function() {
        var x = window.location.toString().concat('#').concat(uuid);
        console.log(x);
        window.location = x;
        // console.log(uuid); //This works

        var db = new Firebase("https://scorching-heat-6301.firebaseio.com/");
        db.orderByKey().equalTo(uuid).on("child_added", function(snapshot) {
            // extract from db
            var post = snapshot.val();
            // inject these into the hidden view
            document.querySelector("#falsePostAuthor").innerHTML = "<p>" + post.user + "</p>";
            document.querySelector("#falsePostTitle").innerHTML = "<p>" + post.title + "</p>";
            document.querySelector("#falsePostDate").innerHTML = "<p>" + post.date + "</p>";
            document.querySelector(".falsePostContent").innerHTML = "<p>" + post.content + "</p>";
            // transport to the hidden view
            showPostPage();
        });
    };
    document.querySelector('.toplvl-results').appendChild(btn);
    btn.innerHTML =
        '                                   \
    <div class="title-div">                 \
        <div>' + input.title + '</div>      \
        <div class="info-div">              \
            ' + input.user + '              \
        </div>                              \
    </div>                                  \
    ';
}

function query_trigger() {
    var elements = document.getElementsByClassName('query-result');
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
    subQuery();
}