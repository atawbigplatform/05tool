import domFile = require("01core/0Dom");
import domCore = domFile.Core;
import utilFile = require("01core/Util");
import iocFile = require("01core/Ioc");
import urlFile = require("01core/Url");
import React = require("react");
import ReactDOM = require("react-dom");
import eventFile = require("01core/Event");
export module FontDom {


    export const FontFamily: string[] = ["Microsoft YaHei", "宋体", "Arial", "黑体", "楷体", "隶书", "sans-serif"];

    export const FontSize: string[] = ["10px", "12px", "14px", "16px", "18px", "24px", "32px", "48px"];

    export const TextAlignData: ITextAlign[] = [
        { Text: "居左", Value: "left", ClassName: "left", Cmd: "justify" },
        { Text: "居中", Value: "center", ClassName: "center", Cmd:"justify"},
        { Text: "居右", Value: "right", ClassName: "right", Cmd: "justify" },
        { Text: "两端对齐", Value: "justify", ClassName: "justify", Cmd: "justify" }
    ]
    export const FontStateData: IFontState[] = [
        { Text: "加粗", ProName: "IsBold", ClassName: "bold", Cmd: "bold" },
        { Text: "倾斜", ProName: "IsItalic", ClassName: "italic", Cmd: "italic"},
        { Text: "下划线", Mutex: "underline", ClassName: "underline", Cmd: "underline" },//存在data【Line】，改变样式值
        { Text: "删除线", Mutex: "line-through", ClassName: "strikethrough", Cmd: "strikethrough" }//存在data【Line】，改变样式值
    ]
    export const FontAttrData: IFontState[] = [
        //下标与上标互斥,data各自存储为ture/false，Mutex用来判断调用不同方法
        { Text: "下标", Mutex: true, ProName: "IsSub", ClassName: "subscript", Cmd: "subscript" },
        { Text: "上标", Mutex: true, ProName: "IsSuper", ClassName: "superscript", Cmd: "superscript" },
        { Text: "边框", ProName: "IsFontBorder", ClassName: "square-o", Cmd: "fontborder" },
        { Text: "设置", ProName: "IsSet", ClassName: "cog" }
    ]
    export const FormatData: IFontState[] = [
        { Text: "清除样式", ProName: "IsRemoveformat", ClassName: "trash", Cmd: "removeformat" },
        { Text: "格式刷", ProName: "IsFormatmatch", ClassName: "paint-brush", Cmd: "formatmatch"},

    ]


    export class FontDomAction extends domCore.DomAction {
    }

    export interface ISetHexFun
    {
        (hex: string): void;
    }

    export class FontDomReact extends domCore.DomReact<FontDomProps, FontDomStates, FontDomAction> implements domCore.IReact {

        public state = new FontDomStates();

        public pSender(): React.ReactElement<any> {
            return <div className="uedit-form uedit-font clearfix ">
                <div className="col-lg-12 col-md-12 m-t">
                    <div className="font-wrapper">
                        <ul>
                            <li className="font-family m-b">
                                <span className="title">字体</span>
                                <select className="form-control" onChange={(e) => { this._setFamily("fontfamily",$(e.target).val()); return false; }}>
                                    {
                                        FontFamily.map((item, index) => {
                                            return <option className={"family-item family-" + index}
                                                selected={item == this.props.Vm.FontStyelData.FontFamily}
                                            value={item}>{item}</option>
                                        })
                                    }
                                </select>
                            </li>
                            <li className="family-size m-b">
                                <select onChange={(e) => { this._setFontSize("fontsize",$(e.target).val()); return false;  }}>
                                    {
                                        FontSize.map((a) => {
                                            return <option className={"font-" + a} selected={a == this.props.Vm.FontStyelData.FontSize} value={a}>{a}</option>
                                        })
                                    }
                                </select>
                            </li>
                            <li className="font-tool m-b">
                                <ul className="font-grid m-r">
                                    {
                                        FontStateData.map((a) => {
                                            //加粗，斜体
                                            return <li className={((a.ProName && this.props.Vm.FontStyelData[a.ProName])) || (!a.ProName && this.props.Vm.FontStyelData.Line == a.Mutex) ? "active" : ""}
                                                onClick={() => {
                                                    a.ProName ? this._toggle(a.Cmd, a.ProName) : this._setFontLine(a.Cmd,a.Mutex)
                                                }}>
                                                <span className={"fa fa-" + a.ClassName} title={a.Text}></span>
                                            </li>
                                      
                                        })
                                    }
                                </ul>
                                <ul className="font-grid ">
                                    <li className="font-color">
                                        <span className="font-color-box" style={{ background: this.props.Vm.FontStyelData.Color }}title="字体颜色"></span>{/*forecolor*/}
                                    </li>
                                </ul>
                            </li>
                            <li className="font-attr m-b">
                                <span className="title">字体属性：</span>
                                <ul className="font-grid">
                                    {
                                        FontAttrData.map((a) => {
                                            //边框
                                            return <li className={this.props.Vm.FontStyelData[a.ProName] ? "active" : ""} onClick={() => { this._fontSateFun(a); }}>
                                                <span className={"fa fa-" + a.ClassName} title={a.ClassName} ></span>
                                            </li>
                                        })
                                    }
                                </ul>
  
                            </li>
                            <li className="font-backcolor m-b">
                                <span className="title">文字背景：</span>
                                <ul className="font-grid">
                                    <li className="font-color"> {/*backcolor*/}
                                        <span className="back-color" style={{ background: this.props.Vm.FontStyelData.BackColor }} title="背景颜色"></span>
                                </li>
                                </ul>
                               
                            </li>
                            <li className="font-align m-b">
                                <span className="title">对齐方式：</span>
                                <ul className="font-grid">
                                    {
                                        TextAlignData.map((t) => {
                                            return <li className={(this.props.Vm.FontStyelData.TextAlign == t.Value)? "active" : ""} onClick={() => { this._setTextAlign(t.Cmd,t.Value) }}>
                                            <span className={"fa fa-align-" + t.ClassName} title={t.Text} ></span>
                                        </li>
                                        })
                                    }
                                   
                                </ul>
                            </li>
                            <li className="font-format m-b">
                                <ul className="font-grid">
                                    {
                                        FormatData.map((a) => {
                                            return <li onClick={() => { this._toggle(a.Cmd,a.ProName) }}>
                                                <span className={"fa fa-" + a.ClassName} title={a.Text}></span> 
                                            </li>
                                        })
                                    }
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>;
        }


        private _fontSateFun(a: IFontState) {
            a.Mutex ? this._setSubsOrSuper(a.Cmd,a.ProName) : this._toggle(a.Cmd,a.ProName);
        }

       

        protected pDomLoad(): void {
            super.pDomLoad();
            utilFile.Core.Util.AsyncJs(["/AtawStatic/lib/03Extend/colorPick/colpick.js"], () => {

                this._senderColPick(".font-color-box", (hex) => { this._setFontColor("forecolor","font","#" + hex)});
                this._senderColPick(".back-color", (hex) => { this._setFontColor("backcolor","back", "#" + hex)});
            })

        }
        //(hex:string)=>void
        private _senderColPick(calssName: string, setHexFun: ISetHexFun) {
            $(this.pGetDom()).find(calssName)["colpick"]({
                colorScheme: 'dark',
                layout: 'rgbhex',
                color: 'ff8800',
                onSubmit: (hsb, hex, rgb, el) => {
                    $(el).css('background-color', '#' + hex);
                    $(el)["colpickHide"]();
                    if (setHexFun) {
                        setHexFun(hex);
                    }
                }

            })
        }
        
        private _toggle(cmd,proName) {
            this.props.Vm.toggleState(cmd,proName);
        }

        private _setFamily(cmd,family) {
            this.props.Vm.setFamily(cmd,family);
        }

        private _setFontSize(cmd,size) {
            this.props.Vm.setFontSize(cmd,size);
        }

        private _setFontLine(cmd,line) {
            this.props.Vm.setFontLine(cmd,line);
        }

        private _setFontColor(cmd,type,color) {
            this.props.Vm.setFontColor(cmd,type,color);
        }

        private _setTextAlign(cmd,val) {
            this.props.Vm.setTextAlign(cmd,val);
        }

        private _setSubsOrSuper(cmd,proName) {
            this.props.Vm.setSubsOrSuper(cmd,proName);
        }
       
    }
    export interface IFontData {
        FontFamily?: string,
        FontSize?: string,
        IsBold?: boolean,
        IsFontBorder?: boolean,
        IsItalic?: boolean,//是否倾斜
        Line?: string,//下划线，删除线，无
        Color?: string,
        BackColor?: string,
        IsSuper?: boolean,
        IsSub?: boolean,
        TextAlign?: string,
        IsRemoveformat?: boolean,//清除样式
        IsFormatmatch?: boolean,//格式刷
        IsSet?: boolean
    }

    export interface ITextAlign {
        Text: string;
        Value: string;
        ClassName: string;
        Cmd?: string;
    }
    export interface IFontState {
        Text: string;
        Mutex?: any;//存在互斥情况才有的标识参数
        ProName?: string;
        ClassName: string;
        Cmd?: string;
    }
    

 
    export interface IReactfontDomVm extends domCore.DomVm {
        FontStyelData: IFontData;
        setTextAlign(cmd: string, val:string)
        toggleState(cmd: string, proName: string);
        setFamily(cmd:string,family: string);
        setFontSize(cmd:string,size: string);
        setFontLine(cmd: string, line: string);
        setFontColor(cmd:string, type: string, color: string);
        setSubsOrSuper(cmd: string, proName: string);
    }

    export interface IfontDomConfig extends domCore.IDomVmConfig {
        FontStyelData?: IFontData;
    }

    export class FontDomVm extends domCore.DomVm implements IReactfontDomVm {
        public ReactType = FontDomReact;
        public FontStyelData: IFontData = {
            FontFamily: "Microsoft YaHei",
            FontSize: "16px",
            IsBold: false,
            IsFontBorder: false,
            IsItalic: false,
            Line: "",
            Color: "#555",
            BackColor: "#FFF",
            IsSuper: false,
            IsSub: false,
            TextAlign: "left",
            IsRemoveformat:false,
            IsFormatmatch: false,
            IsSet:false

        };
        public constructor(config?: IfontDomConfig) {
            super(config);

            if (config) {
                if (config.FontStyelData) {
                    //config.FontStyelData如有修改个别初始化属性值，其他未修改的属性仍旧使用this.FontStyelData
                    this.FontStyelData = {...{}, ...this.FontStyelData, ...config.FontStyelData };
                }

            }
            
        }
        public setFontData(data: IFontData) {
            this.FontStyelData = { ...{}, ...this.FontStyelData, ...data };
            this.update();

        }

        public setFamily(cmd,family) {
            this.FontStyelData.FontFamily = family;
            this.update(cmd,family);
        }

        public setFontSize(cmd,size) {
            this.FontStyelData.FontSize = size;
            this.update(cmd,size);
        }

        public toggleState(cmd,proName: string) {

            this.FontStyelData[proName] = !this.FontStyelData[proName];

            this.update(cmd);
        }

        public setTextAlign(cmd,val) {
            this.FontStyelData.TextAlign = val;
            this.update(cmd,val);

        }

        public setFontColor(cmd,type,color)
        {
            if (type == "font") {
                this.FontStyelData.Color = color;
            }
            else {
                this.FontStyelData.BackColor = color;              
            }
           
            this.update(cmd, color);
        }

        public setFontLine(cmd,line)
        {
            if (this.FontStyelData.Line == line) {
                this.FontStyelData.Line = "none";
            }
            else {
                this.FontStyelData.Line = line;
            }
          
            this.update(cmd);

        }

        public setSubsOrSuper(cmd,proName) {
             this.FontStyelData[proName] = !this.FontStyelData[proName];//proName传入属性名，直接动态修改属性值
            if (proName == "IsSub") {
                if (this.FontStyelData.IsSub)
                {
                    this.FontStyelData.IsSuper = false;
                }
               
            }
            else {
                if (this.FontStyelData.IsSuper) {
                    this.FontStyelData.IsSub = false;
                }
             
            }
            this.update(cmd);
        }

        private update(cmd?:string,cmdVal?:string) {
            this.forceUpdate("", () => {
                this.emitAppEvent("FontDom->FontEditPage-Change", "FontDom->FontEditPage-Change", cmd, cmdVal, this.FontStyelData);

            });
        }

    }
    export class FontDomStates extends domCore.DomStates {
    }


    export class FontDomProps extends domCore.DomProps<IReactfontDomVm> {
    }


}


