export interface INodeClient
{
    getNum(): number;
    clear(): void;
    init(url: string): void;
    notify();
    numNotify();
    listenCmd(cmd: string, fun: Function);
    removeCmd(cmd: string);
    sendCommand(data: INodeRequest);
    listenNotify(fun: (num: number)=> void): Function;
    removeNotify(fun: Function);
    getServerOnlineInfo(callback: (data: IWebScocketData) => void);
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

export interface INodeResponse
{
    JsCmd?: string;
    Data?: any;
}