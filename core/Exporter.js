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
        if(localStorage.getItem(data.sn) == null){
        this.fileUtil.saveOneCloudCoinToJsonFile(cc, data.sn);
        } else {
            console.log("You already have a coin in your local storage with that sn");
        }
    }
}