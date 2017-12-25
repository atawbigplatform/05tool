

import domFile = require("01core/0Dom");
import domCore = domFile.Core;
import utilFile = require("01core/Util");
import iocFile = require("01core/Ioc");
import urlFile = require("01core/Url");
import React = require("react");
import ReactDOM = require("react-dom");

import tableDomFile = require("./TableDom");
import TableDomVm = tableDomFile.Table.TableVm;
import dataFile = require("07data/PageView");

export module CodeTableTableDom {
    export class CodeTableTableDomAction extends domCore.DomAction {
    }

    export class CodeTableTableDomReact extends domCore.DomReact<CodeTableTableDomProps, CodeTableTableDomStates, CodeTableTableDomAction> implements domCore.IReact {

        public state = new CodeTableTableDomStates();

        public pSender(): React.ReactElement<any> {
            return <div>{this._tDom(this.props.Vm.TableDomObj)}</div>;
        }

        protected pDomLoad(): void {
            super.pDomLoad();
            this.props.Vm.loadData();
        }

    }

    export interface IReactCodeTableTableDomVm extends domCore.DomVm {
        TableDomObj: TableDomVm;
        loadData();
    }

    export interface ICodeTableTableDomConfig extends domCore.IDomVmConfig {
        RegName: string;

    }

    export class CodeTableTableDomVm extends domCore.DomVm implements IReactCodeTableTableDomVm {
        public ReactType = CodeTableTableDomReact;
        public TableDomObj: TableDomVm;
        public RegName: string;

        public constructor(config?: ICodeTableTableDomConfig) {
            super(config);
            if (config) {
                this.RegName = config.RegName;
            }
        }

        public loadData()
        {
            //----------
            urlFile.Core.AkPost("/core/Selector/FillData", { regName: this.RegName }, (a: any[]) => {

                a.forEach((row) => {
                    row["IsOpen"] = true;
                    row["Role_Admin"] = true;
                });

                this.TableDomObj = new TableDomVm({
                    DataSource: a,
                    Columns: [
                        {
                            Name: "CODE_TEXT", DisplayName: "菜单", ColumnShowFun: (row, col) => {
                                let _arr: string = row.Arrange;
                                let _num:number = _arr.split("_").length;

                                return <a onClick={() =>
                                {
                                    this.clickRow(row,col);
                                }}
                                    style={{ "padding-left": 40 * (_num - 1) }}>
                                    {(row["isParent"] ? <i className={"icon-minus-sign  fa fa-caret-" + (row["IsOpen"] ? "down" : "right")}></i> : null)}

                                    {" "+row[col.Name].toString()}
                                </a>
                            }
                        },
                        {
                            Name: "Role_Admin",
                            DisplayName: "管理员",
                            ColumnShowFun: (row, col) => {
                                return row["Role_Admin"] ? "√" : "×";
                            }
                        }
                    ]
                });
                this.forceUpdate("");
            });
        }

        private clickRow(row: any, col: tableDomFile.Table.IColumnConfig)
        {
            row["IsOpen"] = !row["IsOpen"];
            
            let _arr: string = row["Arrange"];

            this.TableDomObj.DataSource.forEach((_row) => {
                let row: any = _row;
                let _arrs: string = row["Arrange"];
                if (_arrs.indexOf(_arr)== 0) {
                    if (_arrs != _arr) {

                        row["IsHide"] = !row["IsHide"];
                    }
                }
            });
            this.TableDomObj.IsChange = true;
            this.forceUpdate("");
        }

    }
    export class CodeTableTableDomStates extends domCore.DomStates {
    }


    export class CodeTableTableDomProps extends domCore.DomProps<IReactCodeTableTableDomVm>{
    }



}


