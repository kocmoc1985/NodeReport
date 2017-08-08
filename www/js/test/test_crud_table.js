var CONTENT_REST = new REST('content');
var ARTICLES_REST = new REST('article');
var ACCOUNT_REST = new REST('accounts');
var ACCESS_REST = new REST('access');
var LOGIN_HANDLER_REST = new REST('login');
//
var TABLE_STARTPAGE;
var TABLE_UTBILDNING;
var TABLE_CONTENT_ALL;
var TABLE_ARTICLES;
var TABLE_LORAWAN;
var TABLE_LOGIN;
var TABLE_ACCESS;

$(document).ready(function () {
    createCrudTables();

    //==========================================================================
    //LOGIN
    $("#login-admin-btn").click(function () {
        LOGIN_HANDLER_REST.create({username: "admin", password: "0000"}, function (data, textStatus, jqXHR) {
            $('#output').text(JSON.stringify(data, null, 1));
            if (!data.error) {
                console.log("LOGGED IN, ACCESS_LEVEL:" + data.user.level);
            } else {
                console.log("LOGG IN FAILED");
            }
        });
    });

    //LOGOUT/DELETE/
    $("#logout-btn").click(function () {
        LOGIN_HANDLER_REST.delete('', function (data, textStatus, jqXHR) {
            $('#output').text(JSON.stringify(data, null, 1));
        });
    });

    //==========================================================================

    $('#showCrudTableStartpage').click(function () {
        TABLE_STARTPAGE.show(true);
    });

    $('#showCrudTableUtbildning').click(function () {
        TABLE_UTBILDNING.show(true);
    });

    $('#showCrudTableArticles').click(function () {
        TABLE_ARTICLES.show(true);
    });

    $('#showCrudTableLoraWan').click(function () {
        TABLE_LORAWAN.show(true);
    });

    $('#showCrudTableContentAll').click(function () {
        TABLE_CONTENT_ALL.show(true);
    });

    //==============================================
    $('#showCrudTableAccess').click(function () {
        TABLE_ACCESS.show(true);
    });

    $('#showCrudTableLogin').click(function () {
        TABLE_LOGIN.show(true);
    });


});


function createCrudTables() {
    TABLE_ARTICLES = new MyCrudTableAceEditor(
            'articles',
            true,
            ARTICLES_REST,
            'Administrera Artiklar',
            '#output',
            ['LINK','CUSTOM', 'IMAGE', 'TITLE', 'CONTENT', 'NOTES', 'LASTUPDATE'],
            ['link','custom', 'image', 'title', 'content', 'notes', 'lastupdate'],
            {_fields: '', _sort: '', _skip: 0, _limit: 5}
    );

    TABLE_ARTICLES.setShowAlwaysInvert();

    TABLE_STARTPAGE = new MyCrudTableAceEditor(
            'startpage',
            true,
            CONTENT_REST,
            'Administrera Startsida',
            '#output',
            ['LINK', 'SERIAL', 'CONTENT', 'CSS', 'NOTES', 'LASTUPDATE', 'HIDDEN'],
            ['link', 'serial', 'content', 'css', 'notes', 'lastupdate', 'hidden'],
            {link: 'startpage', _fields: '', _sort: '-serial', _skip: 0, _limit: 5}
    );

    TABLE_STARTPAGE.setShowAlwaysInvert();


    TABLE_UTBILDNING = new MyCrudTableAceEditor(
            'utbildning',
            true,
            CONTENT_REST,
            'Administrera Utbildning',
            '#output',
            ['LINK', 'SERIAL', 'CONTENT', 'CSS', 'NOTES', 'LASTUPDATE', 'HIDDEN'],
            ['link', 'serial', 'content', 'css', 'notes', 'lastupdate', 'hidden'],
            {link: 'utbildning', _fields: '', _sort: '-serial', _skip: 0, _limit: 5}
    );

    TABLE_UTBILDNING.setShowAlwaysInvert();


    TABLE_LORAWAN = new MyCrudTableAceEditor(
            'lorawan',
            true,
            CONTENT_REST,
            'Administrera LoRaWan',
            '#output',
            ['LINK', 'SERIAL', 'CONTENT', 'CSS', 'NOTES', 'LASTUPDATE', 'HIDDEN'],
            ['link', 'serial', 'content', 'css', 'notes', 'lastupdate', 'hidden'],
            {link: 'lorawan', _fields: '', _sort: '-serial', _skip: 0, _limit: 5}
    );

    TABLE_LORAWAN.setShowAlwaysInvert();


    TABLE_CONTENT_ALL = new MyCrudTableAceEditor(
            'content',
            true,
            CONTENT_REST,
            'Administrera Content',
            '#output',
            ['LINK', 'SERIAL', 'CONTENT', 'CSS', "NOTES", 'HIDDEN', 'LASTUPDATE'],
            ['link', 'serial', 'content', 'css', 'notes', 'hidden', 'lastupdate'],
            {_fields: '', _sort: '', _skip: 0, _limit: 5}
    );

    TABLE_CONTENT_ALL.setShowAlwaysInvert();

    //==========================================================================

    TABLE_ACCESS = new MyCrudTable(
            'access',
            true,
            ACCESS_REST,
            'Administrera Access',
            '#output',
            ['Basicroute', 'GET', 'POST', 'PUT', 'DELETE'],
            ['basicroute', 'get_', 'post_', 'put_', 'delete_'],
            {_fields: '', _sort: 'basicroute', _skip: 0, _limit: 15},
            'basicroute'
            );
//
    TABLE_ACCESS.addSelectOptions(['0', '1', '2', '3'], 'get_');
    TABLE_ACCESS.addSelectOptions(['0', '1', '2', '3'], 'post_');
    TABLE_ACCESS.addSelectOptions(['0', '1', '2', '3'], 'put_');
    TABLE_ACCESS.addSelectOptions(['0', '1', '2', '3'], 'delete_');


    TABLE_LOGIN = new MyCrudTable(
            'login',
            true,
            ACCOUNT_REST,
            'Administrera Login',
            '#output',
            ['Pnr', 'Epost', 'Nivå', 'Lösenord'],
            ['pnr', 'epost', 'level', 'password'],
            {_fields: '', _sort: 'level', _skip: 0, _limit: 15},
            'pnr'
            );
//
    TABLE_LOGIN.addSelectOptions(['0', '1', '2', '3'], 'level');

}

