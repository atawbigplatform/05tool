define(["require", "exports", "01core/0Dom", "01core/Url", "react", "./TableDom"], function (require, exports, domFile, urlFile, React, tableDomFile) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var domCore = domFile.Core;
    var TableDomVm = tableDomFile.Table.TableVm;
    var CodeTableTableDom;
    (function (CodeTableTableDom) {
        class CodeTableTableDomAction extends domCore.DomAction {
        }
        CodeTableTableDom.CodeTableTableDomAction = CodeTableTableDomAction;
        class CodeTableTableDomReact extends domCore.DomReact {
            constructor() {
                super(...arguments);
                this.state = new CodeTableTableDomStates();
            }
            pSender() {
                return React.createElement("div", null, this._tDom(this.props.Vm.TableDomObj));
            }
            pDomLoad() {
                super.pDomLoad();
                this.props.Vm.loadData();
            }
        }
        CodeTableTableDom.CodeTableTableDomReact = CodeTableTableDomReact;
        class CodeTableTableDomVm extends domCore.DomVm {
            constructor(config) {
                super(config);
                this.ReactType = CodeTableTableDomReact;
                if (config) {
                    this.RegName = config.RegName;
                }
            }
            loadData() {
                //----------
                urlFile.Core.AkPost("/core/Selector/FillData", { regName: this.RegName }, (a) => {
                    a.forEach((row) => {
                        row["IsOpen"] = true;
                        row["Role_Admin"] = true;
                    });
                    this.TableDomObj = new TableDomVm({
                        DataSource: a,
                        Columns: [
                            {
                                Name: "CODE_TEXT", DisplayName: "菜单", ColumnShowFun: (row, col) => {
                                    let _arr = row.Arrange;
                                    let _num = _arr.split("_").length;
                                    return React.createElement("a", { onClick: () => {
                                            this.clickRow(row, col);
                                        }, style: { "padding-left": 40 * (_num - 1) } },
                                        (row["isParent"] ? React.createElement("i", { className: "icon-minus-sign  fa fa-caret-" + (row["IsOpen"] ? "down" : "right") }) : null),
                                        " " + row[col.Name].toString());
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
            clickRow(row, col) {
                row["IsOpen"] = !row["IsOpen"];
                let _arr = row["Arrange"];
                this.TableDomObj.DataSource.forEach((_row) => {
                    let row = _row;
                    let _arrs = row["Arrange"];
                    if (_arrs.indexOf(_arr) == 0) {
                        if (_arrs != _arr) {
                            row["IsHide"] = !row["IsHide"];
                        }
                    }
                });
                this.TableDomObj.IsChange = true;
                this.forceUpdate("");
            }
        }
        CodeTableTableDom.CodeTableTableDomVm = CodeTableTableDomVm;
        class CodeTableTableDomStates extends domCore.DomStates {
        }
        CodeTableTableDom.CodeTableTableDomStates = CodeTableTableDomStates;
        class CodeTableTableDomProps extends domCore.DomProps {
        }
        CodeTableTableDom.CodeTableTableDomProps = CodeTableTableDomProps;
    })(CodeTableTableDom = exports.CodeTableTableDom || (exports.CodeTableTableDom = {}));
});
//# sourceMappingURL=CodeTableTableDom.js.map