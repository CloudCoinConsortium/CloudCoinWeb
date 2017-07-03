class Detector
{
    constructor(fileUtil, timeout)
    {
        this.raida = new RAIDA(timeout);
        this.fileUtil = fileUtil;
    }

    detectAll(callback)
    {
        let results = [0, 0, 0, 0];
        let totalValueToBank = 0;
        let totalValueToCounterfeit = 0;
        let totalValueToFractured = 0;
        let totalValueToKeptInSuspect = 0;
        let files = this.fileUtil;
        let fnames = [];
        for(var j = 0; j< localStorage.length; j++){
            fnames.push(localStorage.key(j));
        }
        let coins = [];
        for(let i = 0; i < fnames.length; i++)
        {
            coins.push(this.raida.detectCoin(files.loadOneCloudCoinFromJsonFile(fnames[i])));
            
            coins[i].then(function(cc){
            //alert(cc.sn);
            switch (cc.getFolder().toLowerCase())
            {
                case "bank":
                    totalValueToBank++;
                    files.overWrite("suspect", "bank", fnames[i]);
                    break;
                case "fracked":
                    totalValueToFractured++;
                    files.overWrite("suspect", "fracked", fnames[i]);
                    break;
                case "counterfeit":
                    totalValueToCounterfeit++;
                    files.overWrite("suspect", "counterfeit", fnames[i]);
                    break;
                case "suspect":
                    totalValueToKeptInSuspect++;
                    
                    break;
            }//end switch
            files.saveCloudCoinToJsonFile(cc, cc.sn);
            callback(cc, files, "");    
        });
    }

        results[0] = totalValueToBank;
            results[1] = totalValueToCounterfeit;
            results[2] = totalValueToFractured;
            results[3] = totalValueToKeptInSuspect;
            return results;
    }

    detectAllSuspect(callback)
    {
        let results = [0, 0, 0, 0];
        let totalValueToBank = 0;
        let totalValueToCounterfeit = 0;
        let totalValueToFractured = 0;
        let totalValueToKeptInSuspect = 0;
        let fnames = [];
        let counterfeitNames = [];
        let bankNames =[];
        let frackedNames = [];
        let files = this.fileUtil;
        for(var j = 0; j< localStorage.length; j++){
            if(this.fileUtil.suspectFolder.includes(localStorage.key(j)))
            fnames.push(localStorage.key(j));
        }
        let coins = [];
        for(let i = 0; i < fnames.length; i++)
        {
            coins.push(this.raida.detectCoin(files.loadOneCloudCoinFromJsonFile(fnames[i])));
            coins[i].then(function(cc){
            switch (cc.getFolder().toLowerCase())
            {
                case "bank":
                    totalValueToBank++;
                    files.overWrite("suspect", "bank", fnames[i]);
                    bankNames.push(fnames[i]);
                    break;
                case "fracked":
                    totalValueToFractured++;
                    files.overWrite("suspect", "fracked", fnames[i]);
                    frackedNames.push(fnames[i]);
                    break;
                case "counterfeit":
                    totalValueToCounterfeit++;
                    files.overWrite("suspect", "counterfeit", fnames[i]);
                    counterfeitNames.push(fnames[i]);
                    break;
                case "suspect":
                    totalValueToKeptInSuspect++;
                    
                    break;
            }//end switch
            files.saveCloudCoinToJsonFile(cc, cc.sn);
            callback(cc, files, counterfeitNames, bankNames, frackedNames);
            
             });
        }
        results[0] = totalValueToBank;
            results[1] = totalValueToCounterfeit;
            results[2] = totalValueToFractured;
            results[3] = totalValueToKeptInSuspect;
            return results;
    }
}