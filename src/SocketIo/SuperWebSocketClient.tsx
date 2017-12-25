


import eventFile = require("01core/Event");
import utilFile = require("01core/Util");
import urlFile = require("01core/Url");
import InodeclientFile = require("./INodeClient");
import iocFile = require("01core/Ioc");

export interface IWebScocketData {
    BeginTime?: string;
    Days?: string;
    Users?: IUser[];
    Port?: number;
}

export interface IUser {
    id: string;
    name: string;
    mesg?: string;
}
export interface ClientInfo {
    Id: string;
    JsCmd?: string;
    Data?: any;
}

export interface ClientList {
    IdList: ClientInfo[];
}

export interface INodeRequest {
    UserId?: string;
    NodeCmd?: string;
    JsCmd?: string;
    Data?: any;
    IsNotify?: boolean;
    ClientList?: ClientList;
    AppName?: string;
}




export class SuperWebSocketClient implements InodeclientFile.INodeClient {
    public WsData: IWebScocketData;
    private Ws: WebSocket;
    private fEventBus: eventFile.Core.EventBus;
    private fUrl: string;
    private fNum: number = 0;

    public getNum(): number {
        return this.fNum;
    }
    public clear() {
        this.fNum = 0;
        this.getEmit().emit("notify", this.fNum);
    }

    public notify() {
        utilFile.Core.Util.Noty("有消息到达...");
        // notificationFile.WebNotification.Notification.fun_Notification("", "有消息到达...");
        this.numNotify();
    }
    public numNotify() {
        this.fNum++;
        this.getEmit().emit("notify", this.fNum);
    }
    public listenCmd(cmd: string, fun: Function) {
        this.getEmit().addListener("command-" + cmd, fun);
    }

    public removeCmd(cmd: string) {
        this.getEmit().removeAllListeners("command-" + cmd);
    }

    public listenNotify(fun: (num: number) => void): Function {
        let _fun = this.getEmit().addListener("notify", fun);
        return _fun;
    }



    public removeNotify(fun: Function) {
        this.getEmit().removeListener("notify", fun);
    }

    //--------------------单例模式------------
    private static fClient: SuperWebSocketClient;
    public constructor() {
    }
    public static Current(): SuperWebSocketClient {
        if (!this.fClient) {
            this.fClient = new SuperWebSocketClient();
        }
        return this.fClient;
    }
    public getEmit(): eventFile.Core.IEvent {
        if (!this.fEventBus) {
            this.fEventBus = new eventFile.Core.EventBus();
        }
        return this.fEventBus.CustomEvent;
    }

    private loadUrl(callback?: () => any) {


        $.ajax(
            {
                dataType: "json",
                url: this.fUrl,
                success:  (a)=> {
                          var _data: IWebScocketData = a;
            this.WsData = _data;
            if (callback) {
                callback();
            }
                }
            });

        //urlFile.Core.AkPost(this.fUrl, {}, (a) => {
        //    var _data: IWebScocketData = a;
        //    this.WsData = _data;
        //    if (callback) {
        //        callback();
        //    }
        //}, { method:"GET" });

    }

    private asyLoadUrl() {
        return new Promise<void>((resolver) => {
            this.loadUrl(resolver);
        });
    }

    private fSetClientId(userId: string): INodeRequest {
        let _reqData: INodeRequest = {
            AppName: this.AppName,
            UserId: userId,
            NodeCmd: "setclientid"
        };

        // this.fSendCommand(_reqData);
        return _reqData;
    }


    public sendCommand(data: INodeRequest) {
        data.AppName = this.AppName;
        let _users = data.ClientList.IdList.map((c) => { return c.Id });
        if (data.Data) {
            //messageList
            urlFile.Core.AkPost("/dev/socketio/messageList", { ids: _users, mesg: data.Data }, (a) => {

            });
        }
        else {
            urlFile.Core.AkPost("/dev/socketio/notifyList", { ids: _users }, (a) => {

            });
        }

    }

    private fSendCommand(ws: WebSocket, data: any, callback?: () => any): void {
        //---

        ws.send(JSON.stringify(data));

        if (callback)
            callback();

    }
    public AppName: string;
    private connectWs(callback?: () => any) {
        let url: string = this.fUrl.split("//")[1];
        url =  url.split(":")[0]
        var fullUrl = "ws://" + url+":" + this.WsData.Port + "/" + Date.parse(new Date().toString());
        // var ws: WebSocket = null;
        if (!this.Ws) {
            if ("WebSocket" in window) {
                this.Ws = new WebSocket(fullUrl);
            }
            else if ("MozWebSocket" in window) {
                this.Ws = new window["MozWebSocket"](fullUrl);
            }
        }
       
        this.Ws.onopen = (ev: Event) => {
            $["AKjs"] = $["AKjs"] ? $["AKjs"] : {};
            let _data = this.fSetClientId($["AKjs"].LoginId);
            this.fSendCommand(this.Ws, _data, callback);
        };
        this.Ws.onerror = (ev: ErrorEvent,) => {
           // var tt = b;
            utilFile.Core.Util.Noty("superSocket 连接错误");
        };
        this.Ws.onclose = (ev: CloseEvent) => {
            utilFile.Core.Util.Noty("superSocket 关闭");
        };
        this.Ws.onmessage = (ev: MessageEvent) => {
            let _res = utilFile.parseJSON(ev.data);
            if (_res.IsSucess) {
                let _data: InodeclientFile.INodeResponse = $.parseJSON(ev.data);
                switch (_data.JsCmd) {
                    case "notify":
                    case "Notify":
                        this.notify();
                        break;
                    case "message":
                        utilFile.Core.Util.Noty(_data.Data);
                        break;
                    case "command":
                        if (_data.Data && _data.Data.CMD) {
                            this.getEmit().emit("command-" + _data.Data.CMD, _data.Data.Data);
                        }
                        break;
                    default:
                        break;
                }
            }
            else {
                utilFile.Core.Util.Noty(_res.SourceString);
            }

            
           
        };

    }

    public getServerOnlineInfo(callback: (data: InodeclientFile.IWebScocketData) => void): void {


        $.ajax(
            {
                url: this.fUrl,
                dataType:"json",
                success:  (a) =>{
                    var _data: InodeclientFile.IWebScocketData = a;

                    if (callback) {
                        callback(_data);
                    }
                }
            });

        //urlFile.Core.AkPost(this.fUrl, {}, (a) => {
           
        //}, { method:"GET" });

    }


    public init(url: string) {
        //----
        this.fUrl = url;
        this.loadUrl(() => {
            this.connectWs(() => {
                utilFile.Core.Util.Noty("连上了 im 服务");
            });
        });


    }


}
iocFile.Core.Ioc.Current().RegisterType("SuperWebSocketClient", "INodeClient", SuperWebSocketClient);