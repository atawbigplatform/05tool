import InodeclientFile = require("./INodeClient");
export declare class NodeClientGlobal {
    private static fNodeClient;
    static Current(name?: string, appName?: string): InodeclientFile.INodeClient;
}
