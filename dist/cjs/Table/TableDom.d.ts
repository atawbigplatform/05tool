/// <reference types="react" />
import domFile = require("01core/0Dom");
import domCore = domFile.Core;
import React = require("react");
import dataFile = require("07data/PageView");
export declare module Table {
    class TableAction extends domCore.DomAction {
    }
    class TableReact extends domCore.DomReact<TableProps, TableStates, TableAction> implements domCore.IReact {
        state: TableStates;
        private _sendColumnVal(row, column);
        pSender(): React.ReactElement<any>;
        protected pComponentDidMount(): void;
    }
    interface IReactTableVm extends domCore.DomVm {
        DataSource: dataFile.data.IDataRow[];
        Columns: IColumnConfig[];
    }
    interface IColumnConfig {
        Name: string;
        DisplayName?: string;
        ColumnShowFun?: (row: any, column: IColumnConfig) => React.ReactNode;
    }
    interface ITableConfig extends domCore.IDomVmConfig {
        DataSource: dataFile.data.IDataRow[];
        Columns: IColumnConfig[];
    }
    class TableVm extends domCore.DomVm implements IReactTableVm {
        ReactType: typeof TableReact;
        DataSource: dataFile.data.IDataRow[];
        Columns: IColumnConfig[];
        constructor(config?: ITableConfig);
    }
    class TableStates extends domCore.DomStates {
    }
    class TableProps extends domCore.DomProps<IReactTableVm> {
    }
}
