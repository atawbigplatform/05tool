define(["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class DoubleDigitClock extends React.Component {
        constructor(props) {
            super(props);
        }
        render() {
            return React.createElement("div", { className: "Hm-clock" },
                React.createElement("div", { className: "Hu-double-animation", style: { animationDuration: this.props.Duration + "s" } }),
                this.props.IsShow ? this._imgPanel() : this._cssPanel());
        }
        _imgPanel() {
            return React.createElement("div", { className: "Hu-double-panel" });
        }
        _cssPanel() {
            return React.createElement("div", null,
                React.createElement("div", { className: "Hu-circle Hu-position-left" }),
                React.createElement("div", { className: "Hu-circle Hu-position-right" }));
        }
    }
    exports.DoubleDigitClock = DoubleDigitClock;
});
//# sourceMappingURL=DoubleDigitClock.js.map