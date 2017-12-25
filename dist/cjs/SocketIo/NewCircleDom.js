define(["require", "exports", "01core/0Dom", "react", "./NodeClientGlobal"], function (require, exports, domFile, React, nodeGlob) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var domCore = domFile.Core;
    var NewCircleDom;
    (function (NewCircleDom) {
        class NewCircleDomAction extends domCore.DomAction {
        }
        NewCircleDom.NewCircleDomAction = NewCircleDomAction;
        class NewCircleDomReact extends domCore.DomReact {
            constructor() {
                super(...arguments);
                this.state = new NewCircleDomStates();
            }
            pSender() {
                return this.props.Vm.NewCount == 0 ? null :
                    React.createElement("div", { className: "Hg-relative" },
                        React.createElement("em", { className: "label label-pill label-danger Hu-news-circle", onClick: () => { this.props.Vm.clear(); } }, this.props.Vm.NewCount));
            }
            pComponentDidMount() {
                super.pComponentDidMount();
            }
        }
        NewCircleDom.NewCircleDomReact = NewCircleDomReact;
        class NewCircleDomVm extends domCore.DomVm {
            constructor(config) {
                super();
                this.ReactType = NewCircleDomReact;
                this.NewCount = 0;
                if (config) {
                    if (config.NodeClientObj) {
                        this.NodeClientObj = config.NodeClientObj;
                    }
                    else {
                        this.NodeClientObj = nodeGlob.NodeClientGlobal.Current();
                    }
                }
                else {
                    this.NodeClientObj = nodeGlob.NodeClientGlobal.Current();
                }
                this.NewCount = this.NodeClientObj.getNum();
                this.fFun = this.NodeClientObj.listenNotify((num) => {
                    this.show(num);
                    this.playMp3();
                });
            }
            clear() {
                this.NodeClientObj.clear();
            }
            show(num) {
                this.NewCount = num;
                this.forceUpdate("");
            }
            playMp3() {
                //function playMp3() {
                var myDom = $("#myMp3");
                if (myDom.length == 0) {
                    var myIframe = document.createElement("iframe");
                    myIframe.width = 0;
                    myIframe.height = 0;
                    myIframe.frameborder = 0;
                    myIframe.id = "myMp3";
                    myIframe.src = "/Content/Mp3.htm";
                    document.body.appendChild(myIframe);
                }
                else {
                    $("#myMp3").attr("src", "/Content/Mp3.htm");
                }
                //  }
            }
            pDispose() {
                this.NodeClientObj.removeNotify(this.fFun);
                this.NodeClientObj = null;
                super.pDispose();
            }
        }
        NewCircleDom.NewCircleDomVm = NewCircleDomVm;
        class NewCircleDomStates extends domCore.DomStates {
        }
        NewCircleDom.NewCircleDomStates = NewCircleDomStates;
        class NewCircleDomProps extends domCore.DomProps {
        }
        NewCircleDom.NewCircleDomProps = NewCircleDomProps;
    })(NewCircleDom = exports.NewCircleDom || (exports.NewCircleDom = {}));
});
//# sourceMappingURL=NewCircleDom.js.map