define(["require", "exports", "01core/0Dom", "react"], function (require, exports, domFile, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var domCore = domFile.Core;
    var Table;
    (function (Table) {
        class TableAction extends domCore.DomAction {
        }
        Table.TableAction = TableAction;
        class TableReact extends domCore.DomReact {
            constructor() {
                super(...arguments);
                this.state = new TableStates();
            }
            _sendColumnVal(row, column) {
                if (column.ColumnShowFun) {
                    return column.ColumnShowFun(row, column);
                }
                else {
                    return row[column.Name].toString();
                }
            }
            pSender() {
                return React.createElement("div", null,
                    React.createElement("table", { className: "table table-hover table-bordered" },
                        React.createElement("thead", null,
                            React.createElement("tr", null, this.props.Vm.Columns.map((column) => {
                                return React.createElement("td", null, column.DisplayName ? column.DisplayName : column.Name);
                            }))),
                        React.createElement("tbody", null, this.props.Vm.DataSource.map((row) => {
                            // alert();
                            return React.createElement("tr", { className: (row["IsHide"] ? "hide" : "") }, this.props.Vm.Columns.map((column) => {
                                return React.createElement("td", null, this._sendColumnVal(row, column));
                            }));
                        }))));
            }
            pComponentDidMount() {
                super.pComponentDidMount();
            }
        }
        Table.TableReact = TableReact;
        class TableVm extends domCore.DomVm {
            constructor(config) {
                super(config);
                this.ReactType = TableReact;
                if (config) {
                    this.DataSource = config.DataSource;
                    this.Columns = config.Columns;
                }
            }
        }
        Table.TableVm = TableVm;
        class TableStates extends domCore.DomStates {
        }
        Table.TableStates = TableStates;
        class TableProps extends domCore.DomProps {
        }
        Table.TableProps = TableProps;
    })(Table = exports.Table || (exports.Table = {}));
});
//# sourceMappingURL=TableDom.js.map