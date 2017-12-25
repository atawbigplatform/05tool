define(["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InputReact = (props) => {
        if (props.IsMulitText) {
            return React.createElement("textarea", { value: props.Text, style: InputColStyle(props.PxWidth, props.PxHeight), onChange: (e) => { if (props.inputOnChange)
                    props.inputOnChange(e); return false; }, onFocus: (e) => { if (props.onFocus)
                    props.onFocus(e); return false; }, className: (!props.IsUe ? " Hg-width form-control " : "ue-form-control ") + (props.Border) + "  ACT-TEXTAREA-COL-INPUT", disabled: props.Disabled });
        }
        else {
            return React.createElement("input", { type: "text", value: props.Text, style: Object.assign({}, InputColStyle(props.PxWidth, props.PxHeight), frontStyle(props.PxHeight)), onChange: (e) => { if (props.inputOnChange)
                    props.inputOnChange(e); return false; }, onFocus: (e) => { if (props.onFocus)
                    props.onFocus(e); return false; }, className: (!props.IsUe ? " Hg-width form-control " : "ue-form-control ") + (props.Border), disabled: props.Disabled });
        }
    };
    const InputColStyle = (PxWidth, PxHeight) => {
        return {
            display: "inline-block",
            // position: "relative",
            "width": (PxWidth ? PxWidth : "auto"),
            "min-height": (PxHeight ? (PxHeight) : "auto")
        };
    };
    const frontStyle = (PxHeight) => {
        if (PxHeight)
            return {
                "font-size": PxHeight * 0.75
            };
        else {
            return {};
        }
    };
});
//# sourceMappingURL=Input.js.map