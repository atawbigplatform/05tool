export interface INodeClient {
    getNum(): number;
    clear(): void;
    init(url: string): void;
    notify(): any;
    numNotify(): any;
    listenCmd(cmd: string, fun: Function): any;
    removeCmd(cmd: string): any;
    sendCommand(data: INodeRequest): any;
    listenNotify(fun: (num: number) => void): Function;
    removeNotify(fun: Function): any;
    getServerOnlineInfo(callback: (data: IWebScocketData) => void): any;
    AppName: string;
}
export interface IUser {
    id: string;
    name: string;
    mesg?: string;
}
export interface INodeRequest {
    UserId?: string;
    NodeCmd?: string;
    JsCmd?: string;
    Data?: any;
    IsNotify?: boolean;
    ClientList?: ClientList;
}
export interface ClientInfo {
    Id: string;
    JsCmd?: string;
    Data?: any;
}
export interface ClientList {
    IdList: ClientInfo[];
}
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
export interface INodeResponse {
    JsCmd?: string;
    Data?: any;
}
