$(document).ready(function () {

    getBible();

    $('.header .menu').click(function (e) {
        e.preventDefault();
        $('.header .menu').toggleClass('is-expanded');
        $('.header .menu-content').css('display') == 'none' ? $('.header .menu-content').fadeIn() : $('.header .menu-content').fadeOut();
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

function getBible() {
    
}