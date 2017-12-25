define(["require", "exports", "01core/0Dom", "react"], function (require, exports, domFile, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ui;
    (function (ui) {
        class ButtonAction extends domFile.Core.DomAction {
        }
        ui.ButtonAction = ButtonAction;
        class ButtonReact extends domFile.Core.DomReact {
            pSender() {
                var _fa = this.props.Vm.FaCss != "" ? ("fa fa-" + this.props.Vm.FaCss) : " ";
                var _icon = this.props.Vm.IconCss != "" ? ("icon-" + this.props.Vm.IconCss) : " ";
                return React.createElement("a", { className: ("  " + (this.props.Vm.IsNoBg ? "" : "btn ") + " Hu-pointer " + this.props.Vm.KindCss + (this.props.Vm.NoEnable ? " Hs-btn-disabled " : " checked")), onClick: () => {
                        if (!this.props.Vm.NoEnable) {
                            this.props.Vm.ClickFun(this.props.Vm);
                        }
                        else {
                            alert("该按钮不可用");
                        }
                        ;
                        return false;
                    } },
                    " ",
                    React.createElement("i", { className: (_icon + " " + _fa) }),
                    this.props.Vm.DisplayName);
            }
            ;
        }
        ui.ButtonReact = ButtonReact;
        class ButtonBoxReact extends domFile.Core.DomReact {
            pSender() {
                return React.createElement("li", { className: "Hu-btn-list ", onClick: () => {
                        if (!this.props.Vm.NoEnable) {
                            this.props.Vm.ClickFun(this.props.Vm);
                        }
                        else {
                            alert("该按钮不可用");
                        }
                        ;
                        return false;
                    } }, this.props.Vm.DisplayName);
            }
            ;
            pBoxSender() {
                return;
            }
        }
        ui.ButtonBoxReact = ButtonBoxReact;
        //  @decorator.setDecoratorCon("按钮")
        class ButtonVm extends domFile.Core.DomVm {
            constructor(config) {
                super();
                this.ReactType = ButtonReact;
                //    @decorator.setDecoratorProps("自定义图标样式名fa-", "string")
                this.FaCss = "";
                //    @decorator.setDecoratorProps("自定义图标样式名icon-", "string")
                this.IconCss = "";
                //    @decorator.setDecoratorProps("自定义按钮样式名", "string","btn-sm")
                this.KindCss = "btn-sm";
                if (config) {
                    if (config.Name) {
                        this.Name = config.Name;
                    }
                    if (config.DisplayName) {
                        this.DisplayName = config.DisplayName;
                    }
                    if (config.FaCss) {
                        this.FaCss = config.FaCss;
                    }
                    if (config.FaCss) {
                        this.FaCss = config.FaCss;
                    }
                    if (config.IconCss) {
                        this.IconCss = config.IconCss;
                    }
                    if (config.NoEnable) {
                        this.NoEnable = config.NoEnable;
                    }
                    if (config.KindCss) {
                        this.KindCss = config.KindCss;
                    }
                    if (config.ClickFun) {
                        this.ClickFun = config.ClickFun;
                    }
                    if (config.Right) {
                        this.Right = config.Right;
                    }
                    if (config.IsData) {
                        this.IsData = config.IsData;
                    }
                    if (config.IsNoBg) {
                        this.IsNoBg = config.IsNoBg;
                    }
                }
            }
            ButtonBoxReact() {
                return this.intoDomR(ButtonBoxReact);
            }
        }
        ui.ButtonVm = ButtonVm;
        class ButtonProps extends domFile.Core.DomProps {
        }
        ui.ButtonProps = ButtonProps;
        class ButtonStates extends domFile.Core.DomStates {
        }
        ui.ButtonStates = ButtonStates;
    })(ui = exports.ui || (exports.ui = {}));
});
//# sourceMappingURL=Button.js.map