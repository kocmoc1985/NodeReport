//'use strict';
class MyCrudTableAceEditor extends MyCrudTable {

    constructor(uniquePrefix, rest, tableTitle, containerId, headersArr, fieldsArr, searchOptions, modalPreviewCol,
            populate, fieldsHeadersSettingsPop, modalPreviewColPop) {

        super(uniquePrefix, rest, tableTitle, containerId, headersArr, fieldsArr, searchOptions, modalPreviewCol, populate, fieldsHeadersSettingsPop, modalPreviewColPop);

    }

    transformTable_help_one(td) {
        if ($(td).parent().find("th").text() === 'CONTENT') {
            $(td).parent().addClass("special-row-a");
        }

        if ($(td).parent().find("th").text() === 'CONTENT-ENG') {
            $(td).parent().addClass("special-row-b");
        }
        
        if ($(td).parent().find("th").text() === 'CSS') {
            if($(td).html().length > 43){
                $(td).text("CSS DEFINED");
            }
        }
        
//        if ($(td).parent().find("th").text() === 'CUSTOM / NOT TEMPLATE BOUND') {
////            console.log("YES/NO:", td.text().trim());
//            if(td.text().trim() === 'true'){
////                console.log("Par/Parent:",(td).parent().parent().parent());
//            }
//        }
    }

    edit(_id, colName, value) {
        var that = this;
        //
        var updateSetting = {};
        var input;
        //
        if (that.newElemMap[colName]) {
            $(that.newElemMap[colName]).addClass('special-input');
            input = that.newElemMap[colName];
        } else {
            //#ACE ACE-EDITOR ACE EDITOR
            input = $("<div id='editor' style='width:100%;min-height:100vh'> <script type='text/plain' style='display: block;'id='ace-1'>" + value + "</script></div>");
        }
        //
        MYMODALS.showCrudEditDeleteModal("Edit/Delete", "", input, 'xl', function (modalInput, aceEditorText) {
            //
            if (modalInput === false) {
                return;
            }
            //
            if (modalInput === 'delete') {
                that.delete(_id);
                return;
            }
            //
            var input;
            //
            if (modalInput.find('.special-input').length === 1) {
                input = modalInput.find('.special-input').val();
            } else {
                input = aceEditorText;
            }
            //
            updateSetting[colName] = input;
            //
//            if (input) {
                that.REST.update(_id, updateSetting, function (data, textStatus, jqXHR) {
                    that.show(true);
                });
//            }
            //
        });
    }

}