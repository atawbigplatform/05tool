import eventFile = require("01core/Event");
import InodeclientFile = require("./INodeClient");
export declare namespace SocketIo {
    interface ICommandData {
        CMD: string;
        Data: any;
    }
    interface IData {
        Data: ICommandData;
    }
    interface INotifyEventFun {
        (num: number): void;
    }
    class NodeClient implements InodeclientFile.INodeClient {
        private fEventBus;
        private fNoFirstEvent;
        private fNotification;
        private Socket;
        private fUrl;
        AppName: string;
        constructor();
        private fNum;
        getNum(): number;
        getServerOnlineInfo(callback: (data: InodeclientFile.IWebScocketData) => void): void;
        clear(): void;
        init(url: string): void;
        sendCommand(data: InodeclientFile.INodeRequest): void;
        protected getEmit(): eventFile.Core.IEvent;
        notify(): void;
        playMp3(): void;
        listenNotify(fun: INotifyEventFun): Function;
        removeNotify(fun: Function): void;
        numNotify(): void;
        listenCmd(cmd: string, fun: Function): void;
        removeCmd(cmd: string): void;
    }
}
