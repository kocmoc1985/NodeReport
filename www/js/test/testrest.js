$(document).ready(function () {
    addListenerPostBtn();
    addListenerPutBtn();
    addListenerGetBtn();
    addListenerDeleteBtn();

    addListenerCheckSessionBtn();
});


//CREATE
function addListenerPostBtn() {

    //CREATE
    $("#post-btn").click(function () {
        STUDENT_REST.create({name: "pontus johansson", pnr: "850131-0737", epost: "pjohansson@gmail.com"}, function (data, textStatus, jqXHR) {
            $('#output').text(JSON.stringify(data, null, 1));
        });
    });

    //CREATE
//    $("#post-btn").click(function () {
//        LOGIN_SHEMA_REST.create({pnr: "850131-0737", epost: "gmor@gmail.com",password:"0000",level:"1"}, function (data, textStatus, jqXHR) {
//            $('#output').text(JSON.stringify(data, null, 1));
//        });
//    });
}

function addListenerPutBtn() {

    //UPDATE BY QUERY
    $("#put-btn").click(function () {
        STUDENT_REST.update(_find({name: 'admin@mail.com'}), {epost: 'aaa@gmail.com', name: 'aaa'}, function (data, textStatus, jqXHR) {
            $('#output').text(JSON.stringify(data, null, 1));
        });
    });

    //UPDATE BY ID
//     $("#put-btn").click(function () {
//        STUDENT_REST.update('588bc5e9f2907a0b608a1f31',{epost: 'doe@gmail.com'}, function (data, textStatus, jqXHR) {
//            $('#output').text(JSON.stringify(data, null, 1));
//        });
//    });
}

//GET
function addListenerGetBtn() {
    //GET WITH OPTIONS  -- IMPORTANT
    $("#get-options-btn").click(function () {
        BROKERS_REST.find(_find({_fields: '', _sort: 'name', _skip: 0, _limit: 0}), function (data, textStatus, jqXHR) {
            $('#output').text(JSON.stringify(data, null, 1));
        });
    });

    //GET ALL
//    $("#get-btn").click(function () {
//        FASTIGHETS_REST.find('',function (data, textStatus, jqXHR) {
//            $('#output').text(JSON.stringify(data, null, 1));
//        });
//    });

    //GET BY ID
//    $("#get-btn").click(function () {
//        FASTIGHETS_REST.find('588efbc10d75430c98ba4b39', function (data, textStatus, jqXHR) {
//            $('#output').text(JSON.stringify(data, null, 1));
//        });
//    });

    //GET QUERY
//    $("#get-btn").click(function () {
//        FASTIGHETS_REST.find(_find({name:'john doe'}), function (data, textStatus, jqXHR) {
//            $('#output').text(JSON.stringify(data, null, 1));
//        });
//    });
}


function addListenerDeleteBtn() {
    //DELETE QUERY
//    $("#delete-btn").click(function () {
//        STUDENT_REST.delete(_find({name: 'george morge'}), function (data, textStatus, jqXHR) {
//            $('#output').text(JSON.stringify(data, null, 1));
//        });
//    });

    //DELETE BY ID
//    $("#delete-btn").click(function () {
//        STUDENT_REST.delete('588bc5e9f2907a0b608a1f31', function (data, textStatus, jqXHR) {
//            $('#output').text(JSON.stringify(data, null, 1));
//        });
//    });

    //DELETE A TEACHERS ID FROM THE ARRAY OF TEACHERS REFERENSES
    //REMOVE A TEACHER FROM EDUCATION
    $("#delete-btn").click(function () {
        EDUCATION_REST.deleteRef('EDU_ID', {ref_id: 'TEACHER_ID'}, function (data, textStatus, jqXHR) {
            $('#output').text(JSON.stringify(data, null, 1));
        });
    });

}

function _find(obj) {
    return "find/" + JSON.stringify(obj);
}

//==============================================================================

function addListenerCheckSessionBtn() {
    //CHECK SESSION
    $("#check-session-btn").click(function () {
        $.getJSON('/checksession', function (data, textStatus, jqXHR) {
            $('#output').text(JSON.stringify(data, null, 1));
        });
    });
}

