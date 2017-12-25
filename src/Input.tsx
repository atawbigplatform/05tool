

import React = require("react");
import ReactDOM = require("react-dom")


export interface IInputReact
{
    
    Text?: string;
    inputOnChange?: (e: any) => void;
    onFocus?: (e: any) => void;
    IsMulitText?: boolean;
    IsUe?: boolean;
    Disabled?: boolean;
    PxWidth?: number;
    PxHeight?: number;
    Border?: string;
}

export const InputReact: React.SFC<IInputReact> = (props: IInputReact) => {
    if (props.IsMulitText) {

        return <textarea  value={props.Text}
            style={InputColStyle(props.PxWidth, props.PxHeight)}
            onChange={(e) => { if (props.inputOnChange) props.inputOnChange(e); return false; }}
            onFocus={(e) => { if (props.onFocus) props.onFocus(e); return false; }}
            className={(!props.IsUe ? " Hg-width form-control " : "ue-form-control ") + (props.Border) + "  ACT-TEXTAREA-COL-INPUT"}
            disabled={props.Disabled}
        >
        </textarea>

    } else {

        return <input type="text" value={props.Text}
            style={{ ...InputColStyle(props.PxWidth, props.PxHeight), ...frontStyle(props.PxHeight) }}
            onChange={(e) => { if (props.inputOnChange) props.inputOnChange(e); return false; }}
            onFocus={(e) => { if (props.onFocus) props.onFocus(e); return false; }}
            className={(!props.IsUe ? " Hg-width form-control " : "ue-form-control ") + (props.Border)}
            disabled={props.Disabled}
        >
        </input>;
    }
};

const InputColStyle= (PxWidth?:number,PxHeight?:number)=> {
            return {
                display: "inline-block",
               // position: "relative",
                "width": (PxWidth ? PxWidth : "auto"),
                "min-height": (PxHeight ? (PxHeight) : "auto") 
            }
       }


const frontStyle = (PxHeight?:number) => {

     if (PxHeight)
         return {
             "font-size": PxHeight *0.75 
         };
     else {
         return {};
     }
 }