define(["require", "exports", "01core/0Dom", "react", "react-dom"], function (require, exports, domFile, React, ReactDOM) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var domCore = domFile.Core;
    var XScroll;
    (function (XScroll) {
        class XScrollAction extends domCore.DomAction {
        }
        XScroll.XScrollAction = XScrollAction;
        class XScrollReact extends domCore.DomReact {
            constructor() {
                super(...arguments);
                this.state = new XScrollStates();
                this.NumIndex = new Array(200);
            }
            fun_left_click() {
                this.props.Vm.left();
            }
            fun_right_click() {
                this.props.Vm.right();
            }
            setWidth() {
                var elem = ReactDOM.findDOMNode(this);
                var _$div = $(elem);
                _$div = _$div.parent();
                var _$contain = _$div.find(".Hf-menu-scroll");
                var _$inner = _$div.find(".inner");
                var _w1 = _$contain.width();
                var _w0 = _$inner.width() + this.props.Vm.ScrollNum;
                this.props.Vm.Width = _w0 - _w1;
            }
            fun_mouseDown(e) {
                this.props.Vm.IsFirstMove = true;
                this.props.Vm.IsMove = true;
                //if (this.props.Vm.X0 == 0) {
                this.props.Vm.X0 = e["screenX"];
                //}
                // else {
                //     this.props.Vm.X0 = 0;
                // }
            }
            fun_mouseUp() {
                this.props.Vm.IsMove = false;
                this.props.Vm.X0 = 0;
            }
            fun_touch_begin(e) {
                this.props.Vm.IsMove = true;
                this.props.Vm.X0 = e.touches[0].screenX;
                this.props.Vm.IsFirstMove = true;
            }
            fun_touch_end(e) {
                this.props.Vm.IsMove = false;
                this.props.Vm.X0 = 0;
            }
            fun_touch_move(e) {
                this.move(e.touches[0].screenX);
            }
            move(clientX) {
                //if (this.props.Vm.Width == 0) {
                //    this.setWidth();
                //}
                var x1 = clientX;
                if (this.props.Vm.IsFirstMove) {
                    this.props.Vm.X0 = x1;
                }
                if (!this.props.Vm.IsFirstMove && this.props.Vm.X0 > 0 && this.props.Vm.IsMove && this.props.Vm.Width > 0) {
                    if ((((-1) * this.props.Vm.Width) <= this.props.Vm.ScrollNum) && (this.props.Vm.ScrollNum <= 0)) {
                        var x = x1 - this.props.Vm.X0;
                        console.info(" x1 : " + x1 + " -  " + " x0: " + this.props.Vm.X0 + " =" + x + "  ScrollNum: " + this.props.Vm.ScrollNum);
                        this.props.Vm.ScrollNum = this.props.Vm.ScrollNum + x;
                        if (this.props.Vm.ScrollNum <= ((-1) * this.props.Vm.Width))
                            this.props.Vm.ScrollNum = ((-1) * this.props.Vm.Width);
                        if (this.props.Vm.ScrollNum > 0)
                            this.props.Vm.ScrollNum = 0;
                        this.forceUpdate(() => {
                        });
                    }
                    this.props.Vm.X0 = clientX;
                }
                this.props.Vm.IsFirstMove = false;
            }
            fun_mouseMove(e) {
                this.move(e["clientX"]);
            }
            showFun() {
                this.props.Vm.IsHidden = !this.props.Vm.IsHidden;
                this.forceUpdate();
            }
            //public pSender(): React.ReactElement<any> {
            //    return <div className="Hf-menu">
            //        <div className="pull-left Hu-icon Hu-pointer"><i className="fa fa-angle-left"></i></div>
            //        <div className="Hf-menu-scroll">
            //            <div className="inner "
            //            style={{ marginLeft: this.props.Vm.ScrollNum}}
            //                    onMouseDown={(e) => { this.fun_mouseDown(e); } }
            //                    onMouseUp={() => { this.fun_mouseUp(); } }
            //                    onMouseMove={(e) => { this.fun_mouseMove(e); } }
            //                    onMouseEnter = {(e) => { this.fun_mouseDown(e); } }
            //                    onMouseLeave = {(e) => { this.fun_mouseUp(); }}
            //                    onTouchMove = {(e) => { this.fun_touch_move(e); } }
            //                    onTouchStart = {(e) => { this.fun_touch_begin(e); } }
            //                    onTouchEnd = {(e) => { this.fun_touch_end(e); } }
            //                    onTouchCancel =  {(e) => { this.fun_touch_end(e); } }>
            //                {this.props.Vm.FunSetInnerContent ? this.props.Vm.FunSetInnerContent():"无内容"}
            //                </div>
            //        </div>
            //        <div className="pull-left Hu-icon Hu-pointer"><i className="fa fa-angle-right"></i></div>
            //     </div>;
            //}
            pSender() {
                return React.createElement("div", { className: "Hf-menu" },
                    React.createElement("div", { className: "Hf-menu-scroll" },
                        React.createElement("div", { className: "inner " }, this.props.Vm.FunSetInnerContent ? this.props.Vm.FunSetInnerContent() : "无内容")),
                    React.createElement("div", { className: "ACT-MENU-ICON pull-left Hu-icon Hu-pointer" },
                        React.createElement("i", { className: " fa fa-angle-right" + (this.props.Vm.IsHidden ? " Ha-transform" : " "), onClick: () => { this.showFun(); } })),
                    React.createElement("div", { className: "Hf-menu-all " + (this.props.Vm.IsHidden ? "" : " hide") }, this.props.Vm.FunSetInnerContent()));
            }
            pInstall() {
                super.pInstall();
                this._resizeFun = () => {
                    this.props.Vm.ScrollNum = 0;
                    this.forceUpdate(() => {
                        this.setWidth();
                    });
                };
                $(window).bind("resize", this._resizeFun);
                if (this.IsNoFirst) {
                    this.setWidth();
                }
            }
            pComponentWillUnmount() {
                super.pComponentWillUnmount();
                $("body").unbind("click", this.fExpandFun);
            }
            pComponentDidMount() {
                super.pComponentDidMount();
                this.setWidth();
                this.fExpandFun = (a) => {
                    var _$tar = $(a.target);
                    //  alert(2);
                    if (!_$tar.parents().hasClass("ACT-MENU-ICON")) {
                        if (this.props.Vm.IsHidden) {
                            this.showFun();
                            this.forceUpdate();
                        }
                    }
                    return true;
                };
                $("body").bind("click", this.fExpandFun);
            }
            pUnInstall() {
                super.pUnInstall();
                if (this._resizeFun) {
                    $(window).unbind("resize", this._resizeFun);
                }
            }
        }
        XScroll.XScrollReact = XScrollReact;
        class XScrollVm extends domCore.DomVm {
            constructor(config) {
                super();
                this.ReactType = XScrollReact;
                this.Size = 10;
                this.ScrollNum = 0;
                this.ScrollStep = 15;
                this.IsMove = false;
                this.IsFirstMove = false;
                this.Index = 200;
                this.List = [];
                this.IsHidden = false;
                //for (var i = 0; i < this.Index; i++) {
                //    this.List.push(i);
                //}
                if (config) {
                    if (config.Size) {
                        this.Size = config.Size;
                    }
                    if (config.FunSetInnerContent) {
                        this.FunSetInnerContent = config.FunSetInnerContent;
                    }
                }
            }
            reStart() {
                this.ScrollNum = 0;
                this.X0 = 0;
                this.IsMove = false;
                this.Width = 0;
            }
            left() {
                this.ScrollNum = this.ScrollNum + this.ScrollStep;
                this.forceUpdate("");
            }
            right() {
                this.ScrollNum = this.ScrollNum - this.ScrollStep;
                this.forceUpdate("");
            }
        }
        XScroll.XScrollVm = XScrollVm;
        class XScrollStates extends domCore.DomStates {
        }
        XScroll.XScrollStates = XScrollStates;
        class XScrollProps extends domCore.DomProps {
        }
        XScroll.XScrollProps = XScrollProps;
    })(XScroll = exports.XScroll || (exports.XScroll = {}));
});
//# sourceMappingURL=XScroll.js.map