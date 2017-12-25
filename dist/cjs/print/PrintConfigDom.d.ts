/// <reference types="react" />
import domFile = require("01core/0Dom");
import domCore = domFile.Core;
import React = require("react");
import printUtilFile = require("01core/PrintUtil");
export declare module PrintConfigDom {
    class PrintConfigDomAction extends domCore.DomAction {
    }
    class PrintConfigDomReact extends domCore.DomReact<PrintConfigDomProps, PrintConfigDomStates, PrintConfigDomAction> implements domCore.IReact {
        static fIsPrintLoad: string;
        state: PrintConfigDomStates;
        pSender(): React.ReactElement<any>;
        private _loadPrint();
        protected pComponentDidMount(): void;
        private _clikWeb();
        private _clickLocal();
        private _clickCopy();
    }
    interface IReactPrintConfigDomVm extends domCore.DomVm {
        emitOut(name: string): any;
    }
    interface IPrintConfigDomConfig extends domCore.IDomVmConfig {
    }
    class PrintConfigDomVm extends domCore.DomVm implements IReactPrintConfigDomVm {
        ReactType: typeof PrintConfigDomReact;
        constructor(config?: IPrintConfigDomConfig);
        emitOut(mode: string): void;
        onPrint(fetchPrintConfigFun: (mode: string) => printUtilFile.IPrintLocal): void;
    }
    class PrintConfigDomStates extends domCore.DomStates {
    }
    class PrintConfigDomProps extends domCore.DomProps<IReactPrintConfigDomVm> {
    }
}
