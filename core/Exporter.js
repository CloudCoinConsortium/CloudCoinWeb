class Exporter
{
    constructor(fileUtil)
    {
        this.fileUtil = fileUtil;
    }

    writeJSONFile(data)
    {
        data = JSON.parse(data);
        let cc = new CloudCoin(data.nn, data.sn, data.ans, data.ed, data.aoid, data.pown);
        
        this.fileUtil.saveOneCloudCoinToJsonFile(cc, data.sn);
    }
}