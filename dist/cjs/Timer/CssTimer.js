define(["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CssTimer = ({ IsAuto, IsStart, IsStop, IsReset }) => {
        return React.createElement("div", { className: "container" },
            React.createElement("div", { className: "Hc-timer" },
                React.createElement("div", { className: "Hm-cell" },
                    React.createElement("div", { className: "Hu-numbers Hu-tenhour Hu-moveten" +
                            (IsAuto ? " " : " Hu-playstate") +
                            (IsStart ? " Hu-start" : "") +
                            (IsStop ? " Hu-stop" : "") +
                            (IsReset ? " Hu-reset" : "") }, "0 1 2 3 4 5 6 7 8 9")),
                React.createElement("div", { className: "Hm-cell" },
                    React.createElement("div", { className: "Hu-numbers Hu-hour Hu-moveten" +
                            (IsAuto ? " " : " Hu-playstate") +
                            (IsStart ? " Hu-start" : "") +
                            (IsStop ? " Hu-stop" : "") +
                            (IsReset ? " Hu-reset" : "") }, "0 1 2 3 4 5 6 7 8 9")),
                React.createElement("div", { className: "Hm-cell divider" },
                    React.createElement("div", { className: "Hu-numbers" }, ": ")),
                React.createElement("div", { className: "Hm-cell" },
                    React.createElement("div", { className: "Hu-numbers Hu-tenminute Hu-movesix" +
                            (IsAuto ? " " : " Hu-playstate") +
                            (IsStart ? " Hu-start" : "") +
                            (IsStop ? " Hu-stop" : "") +
                            (IsReset ? " Hu-reset" : "") }, "0 1 2 3 4 5 6")),
                React.createElement("div", { className: "Hm-cell" },
                    React.createElement("div", { className: "Hu-numbers Hu-minute Hu-moveten" +
                            (IsAuto ? " " : " Hu-playstate") +
                            (IsStart ? " Hu-start" : "") +
                            (IsStop ? " Hu-stop" : "") +
                            (IsReset ? " Hu-reset" : "") }, "0 1 2 3 4 5 6 7 8 9")),
                React.createElement("div", { className: "Hm-cell divider" },
                    React.createElement("div", { className: "Hu-numbers" }, ": ")),
                React.createElement("div", { className: "Hm-cell" },
                    React.createElement("div", { className: "Hu-numbers Hu-tensecond Hu-movesix" +
                            (IsAuto ? " " : " Hu-playstate") +
                            (IsStart ? " Hu-start" : "") +
                            (IsStop ? " Hu-stop" : "") +
                            (IsReset ? " Hu-reset" : "") }, "0 1 2 3 4 5 6")),
                React.createElement("div", { className: "Hm-cell" },
                    React.createElement("div", { className: "Hu-numbers Hu-second Hu-moveten" +
                            (IsAuto ? " " : " Hu-playstate") +
                            (IsStart ? " Hu-start" : "") +
                            (IsStop ? " Hu-stop" : "") +
                            (IsReset ? " Hu-reset" : "") }, "0 1 2 3 4 5 6 7 8 9")),
                React.createElement("div", { className: "Hm-cell divider" },
                    React.createElement("div", { className: "Hu-numbers" }, ": ")),
                React.createElement("div", { className: "Hm-cell" },
                    React.createElement("div", { className: "Hu-numbers Hu-milisecond Hu-moveten" +
                            (IsAuto ? " " : " Hu-playstate") +
                            (IsStart ? " Hu-start" : "") +
                            (IsStop ? " Hu-stop" : "") +
                            (IsReset ? " Hu-reset" : "") }, "0 1 2 3 4 5 6 7 8 9")),
                React.createElement("div", { className: "Hm-cell" },
                    React.createElement("div", { className: "Hu-numbers Hu-tenmilisecond Hu-moveten" +
                            (IsAuto ? " " : " Hu-playstate") +
                            (IsStart ? " Hu-start" : "") +
                            (IsStop ? " Hu-stop" : "") +
                            (IsReset ? " Hu-reset" : "") }, "0 1 2 3 4 5 6 7 8 9")),
                React.createElement("div", { className: "Hm-cell" },
                    React.createElement("div", { className: "Hu-numbers Hu-hundredmilisecond Hu-moveten" +
                            (IsAuto ? " " : " Hu-playstate") +
                            (IsStart ? " Hu-start" : "") +
                            (IsStop ? " Hu-stop" : "") +
                            (IsReset ? " Hu-reset" : "") }, "0 1 2 3 4 5 6 7 8 9"))));
    };
});
//# sourceMappingURL=CssTimer.js.map