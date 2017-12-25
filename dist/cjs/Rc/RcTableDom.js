define(["require", "exports", "01core/0Dom", "01core/Util", "react", "rc-table"], function (require, exports, domFile, utilFile, React, rc_table_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var domCore = domFile.Core;
    //import tableFile = require("antd/lib/Table");
    utilFile.reqCss(["/ts/lib/rc-table/rc-table.css"]);
    var RcTableDom;
    (function (RcTableDom) {
        class RcTableDomAction extends domCore.DomAction {
        }
        RcTableDom.RcTableDomAction = RcTableDomAction;
        class RcTableDomReact extends domCore.DomReact {
            constructor() {
                super(...arguments);
                this.state = new RcTableDomStates();
            }
            pSender() {
                return React.createElement("div", null,
                    React.createElement(rc_table_1.default, { columns: this.props.Vm.columns, scroll: { x: true, y: 300 }, data: this.props.Vm.data }));
            }
            pComponentDidMount() {
                super.pComponentDidMount();
            }
        }
        RcTableDom.RcTableDomReact = RcTableDomReact;
        // @decorator.setDecoratorCon("第三方表格插件")
        class RcTableDomVm extends domCore.DomVm {
            constructor(config) {
                super();
                this.ReactType = RcTableDomReact;
                if (config.Columns) {
                    let _length = config.Columns.length;
                    this.columns = config.Columns.map((c, index) => {
                        return {
                            title: c.Title,
                            dataIndex: c.Name,
                            key: index,
                            width: 150,
                            fixed: index == 0 ? "left" : ((_length > 2 && (index == _length - 1)) ? "right" : c.Fixed)
                        };
                    });
                }
                this.data = config.Data;
            }
        }
        RcTableDom.RcTableDomVm = RcTableDomVm;
        class RcTableDomStates extends domCore.DomStates {
        }
        RcTableDom.RcTableDomStates = RcTableDomStates;
        class RcTableDomProps extends domCore.DomProps {
        }
        RcTableDom.RcTableDomProps = RcTableDomProps;
    })(RcTableDom = exports.RcTableDom || (exports.RcTableDom = {}));
});
//# sourceMappingURL=RcTableDom.js.map