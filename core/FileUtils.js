class FileUtils 
{

    constructor(rootFolder = "", importFolder = "", importedFolder = "", trashFolder = "",
     suspectFolder = "", frackedFolder = "", bankFolder = "", templateFolder = "",
      counterfeitFolder = "", directoryFolder = "", exportFolder = "")
    {
        this.rootFolder = rootFolder;
        this.importFolder = importFolder;
        this.importedFolder = importedFolder;
        this.trashFolder = trashFolder;
        this.suspectFolder = suspectFolder;
        this.frackedFolder = frackedFolder;
        this.bankFolder = bankFolder;
        this.templateFolder = templateFolder;
        this.counterfeitFolder = counterfeitFolder;
        this.directoryFolder = directoryFolder;
        this.exportFolder = exportFolder;
    }

    loadOneCloudCoinFromJsonFile(loadFilePath)
    {
        //load file as json
        let incomeJson = JSON.parse(localStorage.getItem(loadFilePath));//adjust this later for webstorage

        let nn = incomeJson.nn;
        let sn = incomeJson.sn;
        let ans = incomeJson.an;
        let ed = incomeJson.ed;
        let aoid = incomeJson.aoid;
        let pown = incomeJson.pown;
        
        //if fracked goes here

        let returnCC = new CloudCoin(nn, sn, ans, ed, aoid, pown);
        return returnCC;

    }

    loadManyCloudCoinFromJsonFile(loadFilePath)
    {
        returnCoins = [];
        let incomeJson = JSON.parse(localStorage.getItem(loadFilePath));
        for(let j = 0; j < incomeJson.cloudcoin.length - 1; j++)
        {
            let currentCoin = incomeJson.cloudcoin[j];
            let nn = currentCoin.nn;
            let sn = currentCoin.sn;
            let ans = currentCoin.an;
            let ed = currentCoin.ed;
            let aoid = currentCoin.aoid;
            let pown = currentCoin.pown;
            let returnCC = new CloudCoin(nn, sn, ans, ed, aoid, pown);
            returnCoins[j] = returnCC;

        }
        return returnCoins;
    }

    saveCloudCoinToJsonFile(cc, saveFilePath)
    {
        let coin = {
            nn: cc.nn,
            sn: cc.sn,
            ans: cc.ans,
            ed: cc.ed,
            aoid: cc.aoid,
            pown: cc.pown
        }
        let file = JSON.stringify(coin);
        localStorage.setItem(saveFilePath, file);
    }

    //importJSON not neccessary for javascript
    
}