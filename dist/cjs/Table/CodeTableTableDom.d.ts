/// <reference types="react" />
import domFile = require("01core/0Dom");
import domCore = domFile.Core;
import React = require("react");
import tableDomFile = require("./TableDom");
import TableDomVm = tableDomFile.Table.TableVm;
export declare module CodeTableTableDom {
    class CodeTableTableDomAction extends domCore.DomAction {
    }
    class CodeTableTableDomReact extends domCore.DomReact<CodeTableTableDomProps, CodeTableTableDomStates, CodeTableTableDomAction> implements domCore.IReact {
        state: CodeTableTableDomStates;
        pSender(): React.ReactElement<any>;
        protected pDomLoad(): void;
    }
    interface IReactCodeTableTableDomVm extends domCore.DomVm {
        TableDomObj: TableDomVm;
        loadData(): any;
    }
    interface ICodeTableTableDomConfig extends domCore.IDomVmConfig {
        RegName: string;
    }
    class CodeTableTableDomVm extends domCore.DomVm implements IReactCodeTableTableDomVm {
        ReactType: typeof CodeTableTableDomReact;
        TableDomObj: TableDomVm;
        RegName: string;
        constructor(config?: ICodeTableTableDomConfig);
        loadData(): void;
        private clickRow(row, col);
    }
    class CodeTableTableDomStates extends domCore.DomStates {
    }
    class CodeTableTableDomProps extends domCore.DomProps<IReactCodeTableTableDomVm> {
    }
}
