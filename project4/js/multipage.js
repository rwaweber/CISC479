// handling most of the page routing
// esp since we're going for a single page app type of style

var pages = ['page1', 'page2', 'page3', 'page4'];
var currentPageIndex = -1;
var showNextPage = function() {
    // removes hashes from url
    currentPageIndex = (currentPageIndex + 1) % pages.length;
    var template = document.getElementById(pages[currentPageIndex]).innerHTML;
    //do stuff to template here
    display.innerHTML = template;
}

var showSearchPage = function() {
    history.pushState('', document.title, window.location.pathname);
    currentPageIndex = 2;
    // removes hashes from url
    var template = document.getElementById(pages[currentPageIndex]).innerHTML;
    //do stuff to template here
    display.innerHTML = template;
}

var showPrevPage = function() {
    history.pushState('', document.title, window.location.pathname);

    currentPageIndex = (currentPageIndex - 1) % pages.length;
    var template = document.getElementById(pages[currentPageIndex]).innerHTML;
    //do stuff to template here
    display.innerHTML = template;
}

var showHomePage = function() {
    history.pushState('', document.title, window.location.pathname);
    currentPageIndex = 1;
    var template = document.getElementById(pages[currentPageIndex]).innerHTML;
    //do stuff to template here
    display.innerHTML = template;
}

var showPostPage = function() {
    currentPageIndex = 3;
    var template = document.getElementById(pages[currentPageIndex]).innerHTML;
    //do stuff to template here
    display.innerHTML = template;
}

//document.addEventListener('click', showNextPage);
showNextPage();