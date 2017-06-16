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
        for(var key in localStorage){
            fnames.push(key);
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
            callback(cc, files);    
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
        let files = this.fileUtil;
        for(var key in localStorage){
            if(this.fileUtil.suspectFolder.includes(key))
            fnames.push(key);
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
            callback(cc, files);
            files.saveCloudCoinToJsonFile(cc, cc.sn);
             });
        }
        results[0] = totalValueToBank;
            results[1] = totalValueToCounterfeit;
            results[2] = totalValueToFractured;
            results[3] = totalValueToKeptInSuspect;
            return results;
    }
}