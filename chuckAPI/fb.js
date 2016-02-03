var myDB = new Firebase('https://scorching-heat-6301.firebaseio.com/');
//var myDB = new Firebase('http://bechdeltest.com/api/v1/getMoviesByTitle?title');
myDB.on("value", function(snapshot){
    var theData = snapshot.val();
    document.body.innerHTML = JSON.stringify(theData);
});
