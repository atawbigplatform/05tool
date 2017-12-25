

import domFile = require("01core/0Dom");
import domCore = domFile.Core;
import utilFile = require("01core/Util");
import iocFile = require("01core/Ioc");
import urlFile = require("01core/Url");
import React = require("react");
import ReactDOM = require("react-dom");
import dataFile = require("07data/PageView");


export module Table {
    export class TableAction extends domCore.DomAction {
    }

    export class TableReact extends domCore.DomReact<TableProps, TableStates, TableAction> implements domCore.IReact {

        public state = new TableStates();

        private _sendColumnVal(row, column: IColumnConfig): React.ReactNode
        {
            if (column.ColumnShowFun) {
                return column.ColumnShowFun(row, column);
            }
            else {
               return row[column.Name].toString();
            }
        }
       

        public pSender(): React.ReactElement<any> {
            return <div>
                <table className="table table-hover table-bordered">
                    <thead>
                        <tr>
                            {
                                this.props.Vm.Columns.map((column) => {
                                    return <td>{column.DisplayName ? column.DisplayName : column.Name}</td>;
                                }
                                )
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.Vm.DataSource.map((row) => {
                               // alert();
                                return <tr className={(row["IsHide"]?"hide":"")}>{
                                    this.props.Vm.Columns.map((column) => {
                                        return <td>{
                                            this._sendColumnVal(row,column)
                                        }</td>;

                                    }
                                    )
                                }
                                </tr>;
                            })
                        }
                    </tbody>
                </table>
                
            </div>;
        }
        protected pComponentDidMount() {
            super.pComponentDidMount();

        }


    }

    export interface IReactTableVm extends domCore.DomVm {
        DataSource: dataFile.data.IDataRow[];
        Columns: IColumnConfig[];
    }

    export interface IColumnConfig
    {
        Name: string;
        DisplayName?: string;
        ColumnShowFun?: (row: any, column: IColumnConfig) => React.ReactNode;
    }

    export interface ITableConfig extends domCore.IDomVmConfig {

        DataSource: dataFile.data.IDataRow[];
        Columns: IColumnConfig[];
    }

    

    export class TableVm extends domCore.DomVm implements IReactTableVm {
        public ReactType = TableReact;

        DataSource: dataFile.data.IDataRow[];
        Columns: IColumnConfig[];



        public constructor(config?: ITableConfig) {
            super(config);
            if (config) {
                this.DataSource = config.DataSource;
                this.Columns = config.Columns;
            }

        }

    }
    export class TableStates extends domCore.DomStates {
    }


    export class TableProps extends domCore.DomProps<IReactTableVm>{
    }



}


