import iocFile = require("01core/Ioc");
import InodeclientFile = require("./INodeClient");
import nodeclientFile = require("./NodeClient"); nodeclientFile;
import superWebnodeclientFile = require("./SuperWebSocketClient"); superWebnodeclientFile;
export class NodeClientGlobal {
    private static fNodeClient: InodeclientFile.INodeClient;
    public static Current(name?:string,appName?:string )
    {
        name = name ? name : "NodeClient";
        if (!this.fNodeClient) {
            let _node = iocFile.Core.Ioc.Current().FetchInstance<InodeclientFile.INodeClient>(name, "INodeClient");
            _node.AppName = appName;
            this.fNodeClient = _node;
            
        }

        return this.fNodeClient
    }


}