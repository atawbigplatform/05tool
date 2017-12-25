import eventFile = require("01core/Event");
import InodeclientFile = require("./INodeClient");
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
export declare class SuperWebSocketClient implements InodeclientFile.INodeClient {
    WsData: IWebScocketData;
    private Ws;
    private fEventBus;
    private fUrl;
    private fNum;
    getNum(): number;
    clear(): void;
    notify(): void;
    numNotify(): void;
    listenCmd(cmd: string, fun: Function): void;
    removeCmd(cmd: string): void;
    listenNotify(fun: (num: number) => void): Function;
    removeNotify(fun: Function): void;
    private static fClient;
    constructor();
    static Current(): SuperWebSocketClient;
    getEmit(): eventFile.Core.IEvent;
    private loadUrl(callback?);
    private asyLoadUrl();
    private fSetClientId(userId);
    sendCommand(data: INodeRequest): void;
    private fSendCommand(ws, data, callback?);
    AppName: string;
    private connectWs(callback?);
    getServerOnlineInfo(callback: (data: InodeclientFile.IWebScocketData) => void): void;
    init(url: string): void;
}
