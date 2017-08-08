var MYMODALS = new MyModalsCrud("js/modals/"); // OBS! OBS!

var TABLE_TEACHER = new MyCrudTable(
        'teacher',
        true, // OBS! OBS! OBS! PAY ATTENTION HERE, MAKE EDITABLE OR NOT
        TEACHERS_REST,
        'Administrera lärare',
        '#output',
        ['Namn', 'Pnr', 'Epost'],
        ['name', 'pnr', 'epost'],
        {_fields: '', _sort: 'name', _skip: 0, _limit: 15},
        'name', //Modal preview col
        '_educations', // population
        {name: 'Education', score: 'Score'},
        {name: EDUCATION_REST}
);


A_TABLE.setAddBtnDisabled();// OBS!
A_TABLE.addSelectOptions(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'], 'nr');
A_TABLE.addSelectOptionsRest(CLASS_REST, {_fields: 'size', _sort: 'size', _skip: 0, _limit: 10}, 'size');
A_TABLE.addSelectOptions(['true', 'false'], 'projector');
A_TABLE.setShowAlwaysInvert();

A_TABLE.setSpecialUrl(_findEduTeach({name: actEdu}));


function _findEduTeach(obj) {
    return "findEduTeach/" + JSON.stringify(obj);
}