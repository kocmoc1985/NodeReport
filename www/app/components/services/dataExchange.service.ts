import {Injectable} from "@angular/core";

// A shared memory between components
// and between initializations of components

declare var MYMODALS: any;

@Injectable()
export class DataExchange {

    static globalMem: any; // global for everyone
    static localMem = {};  // local per class/component

    constructor(
    ) {
        //
        if (DataExchange.globalMem == null) { //SUPER IMPORTANT
            DataExchange.globalMem = {};
        }
        // Share method through global mem
        //#METHOD SHARING
        DataExchange.globalMem.showInfoModal = (title: any, infoMsg: any, customizedObj: any, size: any, type: any) => {
            this.showInfoModal(title, infoMsg, customizedObj, size, type);
        }

    }

    create(that: any) {
        // call from any component using this service with this as argument
        // to get a components specific memory that survives
        // between route changes
        let className = that.constructor.name;
        DataExchange.localMem[className] = DataExchange.localMem[className] || {};
        return DataExchange.localMem[className];
    }

    global() {
        // call from any component using this service
        // to get a global memory shared between all components
        return DataExchange.globalMem;
    }

    //#METHOD SHARING
    showInfoModal(title: any, infoMsg: any, customizedObj: any, size: any, type: any) {
        MYMODALS.showInfoModal(title, infoMsg, customizedObj, size, type);
    }

}