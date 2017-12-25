define(["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class AImg extends React.Component {
        constructor(props, context) {
            super(props, context);
            this.state = { IsError: false };
        }
        render() {
            if (this.state.IsError || !this.props.Src) {
                return React.createElement("div", { className: "cover " + this.props.isDefault, style: { height: this.props.H, width: this.props.W } });
            }
            else {
                return React.createElement("img", { src: this.getSrcBySize(), onError: () => { this._onError(); }, className: this.props.ClassName ? this.props.ClassName : "" });
            }
        }
        _onError() {
            this.setState((s) => { return { IsError: true }; });
        }
        getSrcBySize() {
            if (this.props.W && this.props.H) {
                let _ss = this.props.Src.split(".");
                // let _end = _ss[_ss.length - 1];
                let _end = _ss.pop();
                return _ss.join(".") + "_" + this.props.W + "-" + this.props.H + "." + _end;
            }
            else {
                return this.props.Src;
            }
        }
    }
    exports.AImg = AImg;
});
//# sourceMappingURL=AImg.js.map