var CONTENT_REST = new REST('content');
var ARTICLES_REST = new REST('article');
var ACCOUNT_REST = new REST('accounts');
var ACCESS_REST = new REST('access');
var LOGIN_HANDLER_REST = new REST('login');
var LINKS_REST = new REST('links');
var LANG_REST = new REST('lang');
var USERINFO_REST = new REST('userinfo');
//
var TABLE_STARTPAGE;
var TABLE_UTBILDNING;
var TABLE_CONTENT_ALL;
var TABLE_ARTICLES;
var TABLE_REMIX;
var TABLE_LORAWAN;
var TABLE_LOGIN;
var TABLE_ACCESS;
var TABLE_LINKS;
var TABLE_LANG;
var TABLE_USERINFO;

//
var STANDARD_NICK_NAMES_CONTENT = ['LINK', 'SERIAL', 'CONTENT', 'CONTENT-ENG', 'CSS','HIDDEN'];
var STANDARD_TABLE_COL_NAMES_CONTENT = ['link', 'serial', 'content', 'contenteng', 'css','hidden'];

$(document).ready(function () {
    createCrudTables();
});


function createCrudTables() {
    TABLE_ARTICLES = new MyCrudTableAceEditor(
            'articles',
            true,
            ARTICLES_REST,
            'Administrera Artiklar',
            '#output',
            ['LINK', 'CUSTOM / NOT TEMPLATE BOUND','CSS', 'IMAGE', 'TITLE', 'TITLE-ENG', 'CONTENT', 'CONTENT-ENG'],
            ['link', 'custom','css', 'image', 'title', 'titleeng', 'content', 'contenteng'],
            {_fields: '', _sort: 'link', _skip: 0, _limit: 20}
    );

    TABLE_ARTICLES.addSelectOptions(['', 'true', 'false'], 'custom');
    TABLE_ARTICLES.setShowAlwaysInvert();

    TABLE_STARTPAGE = new MyCrudTableAceEditor(
            'startpage',
            true,
            CONTENT_REST,
            'Administrera Startsida',
            '#output',
            STANDARD_NICK_NAMES_CONTENT,
            STANDARD_TABLE_COL_NAMES_CONTENT,
            {link: 'startpage', _fields: '', _sort: 'serial', _skip: 0, _limit: 5}
    );

    TABLE_STARTPAGE.setShowAlwaysInvert();
    TABLE_STARTPAGE.addSelectOptions(['', 'true', 'false'], 'hidden');
    TABLE_STARTPAGE.addSelectOptions(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'], 'serial');

    TABLE_UTBILDNING = new MyCrudTableAceEditor(
            'utbildning',
            true,
            CONTENT_REST,
            'Administrera Utbildning',
            '#output',
            STANDARD_NICK_NAMES_CONTENT,
            STANDARD_TABLE_COL_NAMES_CONTENT,
            {link: 'utbildning', _fields: '', _sort: 'serial', _skip: 0, _limit: 5}
    );

    TABLE_UTBILDNING.setShowAlwaysInvert();
    TABLE_UTBILDNING.addSelectOptions(['', 'true', 'false'], 'hidden');
    TABLE_UTBILDNING.addSelectOptions(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'], 'serial');

    TABLE_REMIX = new MyCrudTableAceEditor(
            'remix',
            true,
            CONTENT_REST,
            'Administrera ReMix',
            '#output',
            STANDARD_NICK_NAMES_CONTENT,
            STANDARD_TABLE_COL_NAMES_CONTENT,
            {link: 'remix', _fields: '', _sort: 'serial', _skip: 0, _limit: 5}
    );

    TABLE_REMIX.setShowAlwaysInvert();
    TABLE_REMIX.addSelectOptions(['', 'true', 'false'], 'hidden');
    TABLE_REMIX.addSelectOptions(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'], 'serial');


    TABLE_LORAWAN = new MyCrudTableAceEditor(
            'lorawan',
            true,
            CONTENT_REST,
            'Administrera LoRaWan',
            '#output',
            STANDARD_NICK_NAMES_CONTENT,
            STANDARD_TABLE_COL_NAMES_CONTENT,
            {link: 'lorawan', _fields: '', _sort: 'serial', _skip: 0, _limit: 5}
    );

    TABLE_LORAWAN.setShowAlwaysInvert();
    TABLE_LORAWAN.addSelectOptions(['', 'true', 'false'], 'hidden');
    TABLE_LORAWAN.addSelectOptions(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'], 'serial');


    TABLE_CONTENT_ALL = new MyCrudTableAceEditor(
            'content',
            true,
            CONTENT_REST,
            'Administrera Content',
            '#output',
            STANDARD_NICK_NAMES_CONTENT,
            STANDARD_TABLE_COL_NAMES_CONTENT,
            {_fields: '', _sort: 'link serial', _skip: 0, _limit: 5}
    );

    TABLE_CONTENT_ALL.setShowAlwaysInvert();
    TABLE_CONTENT_ALL.addSelectOptions(['', 'true', 'false'], 'hidden');
    TABLE_CONTENT_ALL.addSelectOptions(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'], 'serial');

    //==========================================================================

    TABLE_ACCESS = new MyCrudTable(
            'access',
            false,
            ACCESS_REST,
            'Access table',
            '#output',
            ['Basicroute', 'GET/VIEW', 'POST/EDIT', 'PUT/CREATE', 'DELETE'],
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
            ['USERNAME', 'LEVEL OF ACCESS', 'PASSWORD'],
            ['epost', 'level', 'password'],
            {_fields: '', _sort: 'level', _skip: 0, _limit: 15},
            'pnr'
            );
//
    TABLE_LOGIN.addSelectOptions(['2', '3'], 'level');


    TABLE_LINKS = new MyCrudTable(
            'links',
            true,
            LINKS_REST,
            'Administrera Länkar',
            '#output',
            ['LINK', 'NICKNAME', 'SERIAL', 'HIDDEN-MENU', 'HIDDEN-START-PAGE'],
            ['link', 'nickname', 'serial', 'hiddenmenu', 'hiddenstartpage'],
            {_fields: '', _sort: 'serial', _skip: 0, _limit: 15},
            'link'
            );
//
    TABLE_LINKS.addSelectOptions(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'], 'serial');

    TABLE_LINKS.addSelectOptions(['', 'true', 'false'], 'hiddenmenu');
    TABLE_LINKS.addSelectOptions(['', 'true', 'false'], 'hiddenstartpage');


    TABLE_LANG = new MyCrudTable(
            'lang',
            true,
            LANG_REST,
            'Administrera Språk',
            '#output',
            ['LANG', 'SWITCH LANG BUTTON'],
            ['lang', 'switchlang'],
            {_fields: '', _sort: 'serial', _skip: 0, _limit: 15},
            ''
            );
//

    TABLE_LANG.setAddBtnDisabled();
    TABLE_LANG.setShowAlwaysInvert();
    TABLE_LANG.addSelectOptions(['', 'swe', 'eng'], 'lang');
    TABLE_LANG.addSelectOptions(['', 'true', 'false'], 'switchlang');
    TABLE_LANG.addSelectOptions(['', 'swe', 'eng'], 'lang_b');


    TABLE_USERINFO = new MyCrudTable(
            'userinfo',
            false,
            USERINFO_REST,
            'User-Info',
            '#output',
            ['SESSION-ID', 'LANG', 'IP', 'LASTMODIFIED'],
            ['sessionid', 'lang', 'ip', 'lastmodified'],
            {_fields: '', _sort: '-lastmodified', _skip: 0, _limit: 15},
            ''
            );

}

