define(["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SingleDigitClock = ({ Duration }) => {
        return React.createElement("div", { className: "Hm-clock" },
            React.createElement("div", { className: "Hu-single-animation", style: { animationDuration: Duration + "s" } }),
            React.createElement("div", { className: "Hu-single-panel" }));
    };
});
//# sourceMappingURL=SingleDigitClock.js.map