//        MYMODALS.showInfoModal('InfoModal', '', '', 'sm', '');
//
//        MYMODALS.showInputModalB('InputModal', '', '', 'sm', function (retComponent: any) {
//            console.log("answer recieved:", retComponent);
//        });
//
//        MYMODALS.showConfirmModal('ConfirmModal', 'Continue?', 'sm', 'warning', (modalInput: any) => {
//            console.log("answer recieved:", modalInput);
//        });

class MyModals {

    constructor(path) {
        this.checkInitializations();
        this.PATH = path;
        this.INPUT_MODAL_CB;
        this.CONFIRM_MODAL_CB;
        this.CRUD_TABLE_MODAL_CB;
        this.ACE_EDITOR;
        this.registerListeners();

    }

    CLEAR_MODALS() {
        if (this.exists(".modal")) {
            console.log("Modal removed");
            $(".modal").remove();
        }
    }

    checkInitializations() {
        if (MyModals.once) {
            throw(new Error("MyModals can only be initialized once"));
        }
        MyModals.once = true;
    }

    //------------------------------------------------------------------------------


    showInfoModal(title, infoMsg, customizedObj, size, type, cb) {
        var modalObj = $.parseHTML(this.loadTemplate(this.PATH + "modal_info.html"));
        if (title) {
            $(modalObj).find(".modal-title").text(title);
        } else {
            $(modalObj).find('.modal-header').remove();
        }
        //
        //
        if (customizedObj) {
            $(modalObj).find(".modal-body").empty();
            $(modalObj).find(".modal-body").append(customizedObj);
        } else {
            $(modalObj).find(".modal-body").text(infoMsg);
        }
        //
        if (size === 'sm') {
            $(modalObj).find(".modal-dialog").addClass("modal-sm");
        } else if (size === 'lg') {
            $(modalObj).find(".modal-dialog").addClass("modal-lg");
        }
        //
        //available-types: 'warning','error',
        $(modalObj).find(".modal-header").addClass(type);
        //
        this.CLEAR_MODALS();
        $("body").append(modalObj);
        //
        $('#modal-info').off('shown.bs.modal');

        $('#modal-info').on('shown.bs.modal', function (e) {
            if (cb) {
                cb("loaded");
            }

        });

        $('#modal-info').modal();

    }

//------------------------------------------------------------------------------

    inputModalBListeners() {
        var that = this;
        $("html").on('click', '#modal-input-abort-btn', function () {
            that.INPUT_MODAL_CB(false);
        });

        $("html").on('click', '#modal-input-ok-btn', function () {
            that.INPUT_MODAL_CB($('#modal-input'));
        });

        $('body').on('shown.bs.modal', '#gridSystemModalLabel', function () {
            $('#modal-input-text').focus();
        });
    }

    showInputModalB(title, infoMsg, customizedObj, size, cb) {
        console.dir("LOG HTML", customizedObj);
        console.log("LOG HTML B", customizedObj);
        //
        this.INPUT_MODAL_CB = cb;
        //
        var modalObj = $.parseHTML(this.loadTemplate(this.PATH + "modal_input.html"));
        //
        $(modalObj).find(".modal-title").text(title);
        $(modalObj).find(".modal-body p").text(infoMsg);
        //
        if (customizedObj) {
            $(modalObj).find("#modal-input").append(customizedObj);
            $(modalObj).find('#modal-input-text').remove();
        }
        //
        if (size === 'sm') {
            $(modalObj).find(".modal-dialog").addClass("modal-sm");
        } else if (size === 'lg') {
            $(modalObj).find(".modal-dialog").addClass("modal-lg");
        }
        //
        this.CLEAR_MODALS();
        $("body").append(modalObj);
        //
        $('#gridSystemModalLabel').modal();
        //
    }
//------------------------------------------------------------------------------

    confirmModalListeners() {
        var that = this;
        $("html").on('click', '#modal-no-btn', function () {
            that.CONFIRM_MODAL_CB(false);
        });

        $("html").on('click', '#modal-yes-btn', function () {
            that.CONFIRM_MODAL_CB(true);
        });
    }

    showConfirmModal(title, infoMsg, size, type, cb) {
        //
        this.CONFIRM_MODAL_CB = cb;
        //
        var modalObj = $.parseHTML(this.loadTemplate(this.PATH + "modal_confirm.html"));
        $(modalObj).find(".modal-title").text(title);
        $(modalObj).find(".modal-body").text(infoMsg);
        //
        if (size === 'sm') {
            $(modalObj).find(".modal-dialog").addClass("modal-sm");
        } else if (size === 'lg') {
            $(modalObj).find(".modal-dialog").addClass("modal-lg");
        }
        //available-types: 'warning','error',
        $(modalObj).find(".modal-header").addClass(type);
        //
        //
        this.CLEAR_MODALS();
        $("body").append(modalObj);
        //
        $('#modal-confirm').modal();
        //
    }
//------------------------------------------------------------------------------
    crudEditDeleteModalListeners() {
        var that = this;
        $("html").on('click', '#modal-crud-table-abort-btn', function () {
            $('#gridSystemModalLabel_crud_table').on('hidden.bs.modal', function (e) {
                that.CRUD_TABLE_MODAL_CB(false);
            });
        });

        $("html").on('click', '#modal-crud-table-ok-btn', function () {
            if (that.ACE_EDITOR) {
                that.CRUD_TABLE_MODAL_CB($('#modal-input'), that.ACE_EDITOR.getValue());
            }else{
                that.CRUD_TABLE_MODAL_CB($('#modal-input'));
            }
        });

        $("html").on('click', '#modal-crud-table-delete-btn', function () {
            $('#gridSystemModalLabel_crud_table').on('hidden.bs.modal', function (e) {
                that.CRUD_TABLE_MODAL_CB('delete');
            });
        });

        $('body').on('shown.bs.modal', '#gridSystemModalLabel_crud_table', function () {
            $('#modal-input-text').focus();
            //
            //#ACE ACE-EDITOR ACE EDITOR
            if (ace && exists("#editor")) {
                $(".modal-body,.modal-header, .modal-footer").css("background-color", "#272822");
                $(".modal-body,.modal-header, .modal-footer").css("color", "white");
                that.ACE_EDITOR = ace.edit("editor");
                that.ACE_EDITOR.setTheme("ace/theme/monokai");
                that.ACE_EDITOR.setFontSize(16);
                that.ACE_EDITOR.setShowPrintMargin(false);
                that.ACE_EDITOR.getSession().setMode("ace/mode/html");
            }
        });
    }

    showCrudEditDeleteModal(title, infoMsg, customizedObj, size, cb) {
        //
        this.CRUD_TABLE_MODAL_CB = cb;
        //
        var modalObj = $.parseHTML(this.loadTemplate(this.PATH + "special/modal_crud_table_edit.html"));
        //
        $(modalObj).find(".modal-title").text(title);
        $(modalObj).find(".modal-body p").text(infoMsg);
        //
        if (customizedObj) {
            $(modalObj).find("#modal-input").append(customizedObj);
            $(modalObj).find('#modal-input-text').remove();
        }
        //
        if (size === 'sm') {
            $(modalObj).find(".modal-dialog").addClass("modal-sm");
        } else if (size === 'lg') {
            $(modalObj).find(".modal-dialog").addClass("modal-lg");
        } else if (size === 'xl') {
            $(modalObj).find(".modal-dialog").addClass("modal-xl");
        }
        //
        this.CLEAR_MODALS();
        $("body").append(modalObj);
        //
        $('#gridSystemModalLabel_crud_table').modal();
        //
    }

//------------------------------------------------------------------------------

    registerListeners() {
        var that = this;
        $(document).ready(function () {
            that.inputModalBListeners();
            that.confirmModalListeners();
            that.crudEditDeleteModalListeners();
        });
    }

    loadTemplate(url) {
        //
        var html = $.ajax({
            url: url,
            type: "GET",
            dataType: 'html',
            async: false
        }).responseText;
        //
        return html;
    }

    exists(selector) {
        if ($(selector).length) {
            return true;
        } else {
            return false;
        }
    }

    findById(rest, id, cb) {
        rest.find(id, function (data) {
            if (data) {
                cb(data, true);
            } else {
                cb(data, false);
            }
        });
    }

}