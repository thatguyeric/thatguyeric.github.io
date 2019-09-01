$(document).ready(function () {

    const versions = getVersions();
    const books = getBooks();

    console.log(versions);
    // console.log(books);

    $('.header .menu').click(function (e) {
        e.preventDefault();
        $('.header .menu').toggleClass('is-expanded');
        $('.menu-content').css('display') == 'none' ? $('.menu-content').fadeIn() : $('.menu-content').fadeOut();
        setTimeout(() => {
            $('.container').toggleClass('menu-open');
        }, 400);
    });

    $('.footer .info').click(function (e) {
        e.preventDefault();
        $('.contact-us-container').fadeIn();
    });

    $('.contact-us .contact-us-close').click(function (e) {
        e.preventDefault();
        $('.contact-us-container').fadeOut();
    });

    // $('#contact-us-form').submit(function (e) {
    //     e.preventDefault();
    //     var name = getUrlVars()['name'],
    //         email = getUrlVars()['email'],
    //         msg = getUrlVars()['message'];
    //     var body = `${name} - ${email}: \r\n ${msg}`;
    //     window.open('mailto:eric@marcondes.com?subject=' + name + ' is needing assistance&body=' + body);
    // });



});

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

function getVersions() {
    var array = [];
    var objList = [];
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.status == 200 && xmlhttp.readyState == 4) {
            array = xmlhttp.responseText.split('\n');
            array.forEach(element => {
                let index = element.lastIndexOf(' (');

                objList.push({
                    label: element.substring(0, index),
                    code: /\(([^)]+)\)/.exec(element.substring(index))[1]
                });
            });
        }
    };
    xmlhttp.open("GET", "/lib/bible-versions.txt", true);
    xmlhttp.send();
    return (objList);
}

function getBooks() {
    var array = [];
    var objList = [];
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.status == 200 && xmlhttp.readyState == 4) {
            array = xmlhttp.responseText.split('\n');
            array.forEach(element => {
                let temp = element.split(': ');
                objList.push(temp[0]);
            });
            displayBooks(objList);
        }
    };
    xmlhttp.open("GET", "/lib/bible-books.txt", true);
    xmlhttp.send();
}

function displayBooks(books) {
    books.forEach(book => {
        var node = document.createElement("LI");
        var textnode = document.createTextNode(book);
        node.appendChild(textnode);
        node.onclick = function (e) {
            getBibleVerses(e.target.innerText);
        };
        document.getElementById("books").appendChild(node);
    })
}

function getBibleVerses(book) {
    console.log(book);
    $.ajax({
        url: 'http://getbible.net/json',
        dataType: 'jsonp',
        data: 'p=' + book,
        jsonp: 'getbible',
        success: function (json) {
            // set text direction
            if (json.direction == 'RTL') {
                var direction = 'rtl';
            } else {
                var direction = 'ltr';
            }
            // check response type
            if (json.type == 'book') {
                var output = '';
                jQuery.each(json.book, function (index, value) {
                    output += '<center><b>' + json.book_name + ' ' + value.chapter_nr + '</b></center><br/><p class="' + direction + '">';
                    jQuery.each(value.chapter, function (index, value) {
                        output += '  <small class="ltr">' + value.verse_nr + '</small>  ';
                        output += value.verse;
                        output += '<br/>';
                    });
                    output += '</p>';
                });
                jQuery('#scripture').html(output);  // <---- this is the div id we update
            }
        },
        error: function () {
            jQuery('#scripture').html('<h2>No scripture was returned, please try again!</h2>'); // <---- this is the div id we update
        },
    });
}