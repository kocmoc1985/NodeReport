$(document).ready(function() {
    slide_up_all();
    add_event_to_all_elements_with_slide_enabled();
});

function add_event_to_all_elements_with_slide_enabled() {
    addEventToAllElementsWithGivenClassName("slidable_element_container", "click", slide_down_given_element_by_event);
}

function set_unset_tool_tip(set_unset) {
    if (set_unset) {
        //Setting tool tip text
        $(".slidable_element_container").each(function(index, item) {
            setAttribute(item, "title", "click to expand");
        });
    } else {
        $(".slidable_element_container").each(function(index, item) {
            setAttribute(item, "title", "");
        });
    }

}

function slide_up_all() {
    $('.slidable_element').each(function(index, item) {
        $(item).slideUp(); // $(item).remove();
    });
    //
    set_unset_tool_tip(true);
}

function slide_down_given_element_by_event(event) {
    var elements_arr;
    var event_target_elem = getEventTargetElement(event);
    if (getClassName(event_target_elem).indexOf("slidable_element_container") === -1) {
        var parent = getParentElement(event_target_elem);
        elements_arr = getAllChildrenOfAnElement(parent);
    } else {
        elements_arr = getAllChildrenOfAnElement(event_target_elem);
    }
    //==
    var elem_index;
    for (i = 0; i < elements_arr.length; i++) {
        if (getClassName(elements_arr[i]).indexOf("slidable_element") !== -1) {
            elem_index = i;
        }
    }
    //==
    if ($(elements_arr[elem_index]).is(':visible')) {
        $(elements_arr[elem_index]).slideUp();
        //
        set_unset_tool_tip(true);
    } else {
        $(elements_arr[elem_index]).slideDown();
        //
        set_unset_tool_tip(false);
    }

}

function getAllChildrenOfAnElement(element) {
    return element.childNodes;
}

function getParentElement(element) {
    return element.parentNode;
}

function setAttribute(element, key, value) {
    element.setAttribute(key, value);
}

function getEventTargetElement(eventObject) {
    if (eventObject.target) { //DOM
        return eventObject.target;
    }
    else if (eventObject.srcElement) { //IE
        return eventObject.srcElement;
    }
    else {
        return null;
    }
}

function getClassName(element) {
    return element.className;
}

function addEventToAllElementsWithGivenClassName(className, eventType, methodToExecuteOnEvent) {
    var elemntArray = document.getElementsByClassName(className);
    for (i = 0; i < elemntArray.length; i++) {
        var elem = elemntArray[i];
        addEvent(elem, eventType, methodToExecuteOnEvent);
    }
}

function addEvent(elemToAddTo, eventType, eventFunction) {

    try {
        if (elemToAddTo.addEventListener) {
            //Detta �r mozilla!
            elemToAddTo.addEventListener(eventType, eventFunction, false);
            return true;
        }
        else if (elemToAddTo.attachEvent) {
            //Detta �r IE!
            var returnval = elemToAddTo.attachEvent("on" + eventType, eventFunction);
            return returnval;
        } else {
            return false;
        }
    } catch (err) {
        return false;
    }
}

