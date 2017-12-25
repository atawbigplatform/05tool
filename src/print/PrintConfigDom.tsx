import domFile = require("01core/0Dom");
import domCore = domFile.Core;
import utilFile = require("01core/Util");
import iocFile = require("01core/Ioc");
import urlFile = require("01core/Url");
import React = require("react");
import ReactDOM = require("react-dom");

import printUtilFile = require("01core/PrintUtil");

export module PrintConfigDom {
    export class PrintConfigDomAction extends domCore.DomAction {}

    export class PrintConfigDomReact extends domCore.DomReact < PrintConfigDomProps,
    PrintConfigDomStates,
    PrintConfigDomAction > implements domCore.IReact {


        public static fIsPrintLoad : string = "正在检测";

        public state = new PrintConfigDomStates();

        public pSender() : React.ReactElement < any > {
            return <div className="btn-group ">
                <button type="button" className="btn btn-primary  btn-sm ">
                    <i className="fa fa-print">打印</i>
                </button>
                <button
                    type="button"
                    className="btn btn-primary  btn-sm dropdown-toggle"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false">
                    <span className="caret"></span>
                    <span className="sr-only">Toggle Dropdown</span>
                </button>
                <ul className="dropdown-menu">
                    <li>
                        <a
                            onClick={() => {
                            this._clikWeb()
                        }}>网页打印</a>
                    </li>
                    <li>
                        <a
                            onClick={() => {
                            this._clickLocal()
                        }}>插件打印{PrintConfigDomReact.fIsPrintLoad
                                ? PrintConfigDomReact.fIsPrintLoad
                                : null}</a>
                    </li>
                    <li><a onClick={() => { this._clickCopy() }}>拷贝html</a></li>
                </ul>
            </div>;
        }
        private _loadPrint()
        {
            window["On_CLodop_Opened"] = () => {
                // OpenPreview();	//执行打印预览 window.On_CLodop_Opened=null; alert("可以打印了");
                PrintConfigDomReact.fIsPrintLoad = "";
                this.forceUpdate();
            };

        }

        protected pComponentDidMount() {
            super.pComponentDidMount();
            utilFile
                .Core
                .Util
                .AsyncJs(["http://localhost:8000/CLodopfuncs.js?name=CLODOPA"], (a) => {
                    this._loadPrint();
                }, () => {

                    PrintConfigDomReact.fIsPrintLoad = "插件未安装";
                })
        }

        private _clikWeb() {
            this
                .props
                .Vm
                .emitOut("web");
        }

        private _clickLocal() {
            if (PrintConfigDomReact.fIsPrintLoad) {
                alert(PrintConfigDomReact.fIsPrintLoad);
            } else {
                this
                    .props
                    .Vm
                    .emitOut("local");
            }
        }

        private _clickCopy() {
            this
                .props
                .Vm
                .emitOut("copy")
        }
        
    }

    export interface IReactPrintConfigDomVm extends domCore.DomVm {
        emitOut(name : string);
    }

    export interface IPrintConfigDomConfig extends domCore.IDomVmConfig {}

    export class PrintConfigDomVm extends domCore.DomVm implements IReactPrintConfigDomVm {
        public ReactType = PrintConfigDomReact;

        public constructor(config?: IPrintConfigDomConfig) {
            super(config);

        }

        public emitOut(mode : string) {
            this
                .getEmit()
                .emit("print", mode);
        }

        public onPrint(fetchPrintConfigFun : (mode : string) => printUtilFile.IPrintLocal) {
            this
                .getEmit()
                .on("print", (mode : string) => {
                    const _config = fetchPrintConfigFun(mode);
                    _config.IsLocal = mode == "local";
                    _config.IsCode = mode == "copy";
                    printUtilFile.printLocal("", _config);

                });
        }

    }
    export class PrintConfigDomStates extends domCore.DomStates {}

    export class PrintConfigDomProps extends domCore.DomProps < IReactPrintConfigDomVm > {}

}
