define(["require", "exports", "01core/Url", "react"], function (require, exports, urlFile, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ui;
    (function (ui) {
        class ALinkReact extends React.Component {
            render() {
                return React.createElement("a", { onClick: () => { this.fun_AClick(); }, className: this.props.ClassName }, this.props.children);
            }
            ;
            fun_AClick() {
                if (this.props.href) {
                    urlFile.Core.AkUrl.Current().openUrl(this.props.href, !this.props.IsUrl);
                }
            }
        }
        ui.ALinkReact = ALinkReact;
    })(ui = exports.ui || (exports.ui = {}));
});
//# sourceMappingURL=ALink.js.map