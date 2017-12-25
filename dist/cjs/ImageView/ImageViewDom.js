define(["require", "exports", "01core/0Dom", "01core/Url", "react", "./../JsonView"], function (require, exports, domFile, urlFile, React, jsonViewFile) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var domCore = domFile.Core;
    var ImageViewDom;
    (function (ImageViewDom) {
        class ImageViewDomAction extends domCore.DomAction {
        }
        ImageViewDom.ImageViewDomAction = ImageViewDomAction;
        class ImageViewDomReact extends domCore.DomReact {
            constructor() {
                super(...arguments);
                this.state = new ImageViewDomStates();
            }
            pSender() {
                return React.createElement("div", null,
                    React.createElement("input", { type: "text", value: this.props.Vm.OrgImagePath, onChange: (e) => { this.fTextChange(e); }, className: "Hg-width form-control" }),
                    React.createElement("div", null, this.props.Vm.ImagePath),
                    React.createElement("div", { className: "panel panel-primary" },
                        "\u5BBD:",
                        React.createElement("input", { type: "number", value: this.props.Vm.ImgWidth, onChange: (e) => { this.fTextChange(e, "w"); } }),
                        "\u9AD8:",
                        React.createElement("input", { type: "number", value: this.props.Vm.ImgHeight, onChange: (e) => { this.fTextChange(e, "h"); } })),
                    React.createElement("div", { className: "panel panel-primary" },
                        React.createElement("div", null,
                            " ",
                            React.createElement(ImageViewDom.RadioSpanReact, { IsCheck: this.props.Vm.CheckDict["m"], onClick: (check) => { return this._checkSpan("m", check); } }, " \u6BD4\u539F\u56FE\u5927\u539F\u56FE\u8FD4\u56DE\uFF0C\u5426\u5219\u662F\u8865\u6846 m")),
                        React.createElement("div", null,
                            React.createElement(ImageViewDom.RadioSpanReact, { IsCheck: this.props.Vm.CheckDict["s"], onClick: (check) => { return this._checkSpan("s", check); } }, "\u8868\u793A\u6BD4\u539F\u56FE\u5C0F\u7684\u8BDD\u4F1A\u8865\uFF0C\u5426\u5219\u662F\u88C1s")),
                        React.createElement("div", null,
                            React.createElement(ImageViewDom.RadioSpanReact, { IsCheck: this.props.Vm.CheckDict["o"], onClick: (check) => { return this._checkSpan("o", check); } }, "\u5F3A\u5236\u539F\u56FE\u8FD4\u56DEo")),
                        React.createElement("div", null,
                            " ",
                            React.createElement(ImageViewDom.RadioSpanReact, { IsCheck: this.props.Vm.CheckDict["f"], onClick: (check) => { return this._checkSpan("f", check); } }, "\u5F3A\u5236\u5207\u56FE\u65E0\u89C6\u7F13\u5B58f")),
                        React.createElement("div", null,
                            React.createElement(ImageViewDom.RadioSpanReact, { IsCheck: this.props.Vm.CheckDict["r"], onClick: (check) => { return this._checkSpan("r", check); } }, "\u8FD4\u56DE\u56FE\u7247\u4FE1\u606Fr"))),
                    React.createElement("div", { className: "row" }, this.props.Vm.HasImage ? React.createElement("img", { className: "img-thumbnail", src: this.props.Vm.ImagePath, onError: (a) => { this.fImgError(a); } }) : "没有图片"),
                    React.createElement("div", { className: "row" }, this._tDom(this.props.Vm.JsonViewObj)));
            }
            pComponentDidMount() {
                super.pComponentDidMount();
                this._isAmount = true;
            }
            _checkSpan(sign, ischeck) {
                this.props.Vm.CheckDict[sign] = ischeck;
                this.forceUpdate(() => {
                    this.props.Vm.setOrgPath();
                    this.forceUpdate();
                });
                return true;
            }
            fTextChange(e, sign) {
                let _val = e.target["value"];
                switch (sign) {
                    case "w":
                        this.props.Vm.ImgWidth = parseInt(_val);
                        break;
                    case "h":
                        this.props.Vm.ImgHeight = parseInt(_val);
                        break;
                    default:
                        this.props.Vm.OrgImagePath = _val;
                        this.props.Vm.HasImage = true;
                }
                this.props.Vm.setOrgPath();
                this.forceUpdate();
            }
            fImgError(a) {
                if (this.props.Vm.HasImage) {
                    this.props.Vm.HasImage = false;
                    //if(this.ism)
                    if (this._isAmount) {
                        this.forceUpdate(() => {
                            this.props.Vm.HasImage = true;
                        });
                    }
                }
            }
        }
        ImageViewDom.ImageViewDomReact = ImageViewDomReact;
        class ImageViewDomVm extends domCore.DomVm {
            constructor(config) {
                super();
                this.ReactType = ImageViewDomReact;
                this.OrgImagePath = "http://imghz.ataw.cn/Core/User/logo/20171205095024837AD0AB429F13C34B54AE376F4FDF8B1A4E.jpg";
                this.CheckDict = {};
                this.setOrgPath();
                this.HasImage = this.ImagePath ? true : false;
            }
            setOrgPath() {
                this._setPath();
                this.HasImage = true;
            }
            _setPath() {
                const _paths = this.OrgImagePath.split(".");
                const _length = _paths.length;
                if (_length >= 2) {
                    //let _len2 = _paths[_length - 2];
                    let _check = "";
                    for (const n in this.CheckDict) {
                        if (this.CheckDict[n]) {
                            _check += n;
                        }
                    }
                    if (_check) {
                        _check = "$" + _check + "$";
                        _paths[_length - 2] = _paths[_length - 2] + _check;
                    }
                    if (this.ImgWidth > 0 && this.ImgHeight > 0) {
                        _paths[_length - 2] = _paths[_length - 2] + "_" + this.ImgWidth + "-" + this.ImgHeight;
                    }
                }
                this.ImagePath = _paths.join(".");
                if (this.CheckDict["r"]) {
                    this.HasImage = false;
                    urlFile.Core.AkPost(this.ImagePath, {}, (_data) => {
                        this.JsonViewObj = new jsonViewFile.JsonView.JsonViewVm({ data: _data, IsCollapse: true });
                        this.forceUpdate("");
                    }, { method: "GET" });
                }
            }
        }
        ImageViewDom.ImageViewDomVm = ImageViewDomVm;
        class ImageViewDomStates extends domCore.DomStates {
        }
        ImageViewDom.ImageViewDomStates = ImageViewDomStates;
        class ImageViewDomProps extends domCore.DomProps {
        }
        ImageViewDom.ImageViewDomProps = ImageViewDomProps;
        ImageViewDom.RadioSpanReact = (props) => {
            return React.createElement("span", null,
                React.createElement("i", { className: "Hu-checkbox Hu-pointer " + (props.IsCheck ? "icon-check fa fa-check-square-o " : "icon-check-empty fa fa-square-o"), "data-value": props.IsCheck ? "true" : "false", onClick: (e) => { return props.onClick ? props.onClick(!props.IsCheck) : false; } }),
                props.children);
        };
    })(ImageViewDom = exports.ImageViewDom || (exports.ImageViewDom = {}));
});
//# sourceMappingURL=ImageViewDom.js.map