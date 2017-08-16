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
        let fnames = importer.importAll();
        let coins = [];
        for(let i = 0; i < fnames.length; i++)
        {
            coins.push(this.raida.detectCoin(files.loadOneCloudCoinFromJsonFile(fnames[i])));
            
            coins[i].then(function(cc){
            //alert(cc.sn);
            files.saveCloudCoinToJsonFile(cc, "suspect."+cc.sn);
            switch (cc.getFolder().toLowerCase())
            {
                case "bank":
                    totalValueToBank++;
                    files.overWrite("bank", fnames[i]);
                    break;
                case "fracked":
                    totalValueToFractured++;
                    files.overWrite("fracked", fnames[i]);
                    break;
                case "counterfeit":
                    totalValueToCounterfeit++;
                    files.overWrite("counterfeit", fnames[i]);
                    break;
                case "suspect":
                    totalValueToKeptInSuspect++;
                    
                    break;
            }//end switch
            
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
        
        let fnames = importer.importAllFromFolder("suspect");
        //let counterfeitNames = [];
        //let bankNames =[];
        //let frackedNames = [];
        let files = this.fileUtil;
        
        let coins = [];
        let i = 0;
        this.loop(coins, i, fnames, results, callback, this.loop);
           
        
        //results[0] = totalValueToBank;
            //results[1] = totalValueToCounterfeit;
            //results[2] = totalValueToFractured;
            //results[3] = totalValueToKeptInSuspect;
            return results;
    }

    loop(coins, i, fn, r, callbacku, callbackl)
    {
         if(i<fn.length){
         if(callbacku.name == "updatesFromMind"){
                coins.push(raida.detectCoin(files.loadMindCloudCoinFromJsonFile(fn[i])));
            } else{
            coins.push(raida.detectCoin(files.loadOneCloudCoinFromJsonFile(fn[i])));
            }
            coins[i].then(function(cc){
            files.saveCloudCoinToJsonFile(cc, "suspect."+cc.sn);
            switch (cc.getFolder().toLowerCase())
            {
                case "bank":
                    r[0]++;
                    files.overWrite("bank", fn[i]);
                    //bankNames.push(fn[i]);
                    break;
                case "fracked":
                    r[2]++;
                    files.overWrite("fracked", fn[i]);
                    //frackedNames.push(fn[i]);
                    break;
                case "counterfeit":
                    r[1]++;
                    files.overWrite("counterfeit", fn[i]);
                    //counterfeitNames.push(fn[i]);
                    break;
                case "suspect":
                    r[3]++;
                    
                    break;
            }//end switch
            
            callbacku(cc, files,((i+1)/fn.length*100), r);
            
            callbackl(coins, i+1, fn, r, callbacku, callbackl);
             });}
    }

detectAllTemp(callback)
    {
        let results = [0, 0, 0, 0];
        
        let fnames = importer.importAllFromFolder("temp");
        //let counterfeitNames = [];
        //let bankNames =[];
        //let frackedNames = [];
        let files = this.fileUtil;
        
        let coins = [];
        let i = 0;
        this.loopt(coins, i, fnames, results, callback, this.loopt);
           
        
        //results[0] = totalValueToBank;
            //results[1] = totalValueToCounterfeit;
            //results[2] = totalValueToFractured;
            //results[3] = totalValueToKeptInSuspect;
            return results;
    }

    loopt(coins, i, fn, r, callbacku, callbackl)
    {
         if(i<fn.length){
         
                coins.push(raida.detectCoin(files.loadMindCloudCoinFromJsonFile(fn[i])));
            
            coins[i].then(function(cc){
            files.saveCloudCoinToJsonFile(cc, "temp."+cc.sn);
            switch (cc.getFolder().toLowerCase())
            {
                case "bank":
                    r[0]++;
                    //files.overWrite("", fn[i]);
                    //bankNames.push(fn[i]);
                    break;
                case "fracked":
                    r[2]++;
                    //files.overWrite("", fn[i]);
                    //frackedNames.push(fn[i]);
                    break;
                case "counterfeit":
                    r[1]++;
                    //files.overWrite("", fn[i]);
                    //counterfeitNames.push(fn[i]);
                    break;
                case "suspect":
                    r[3]++;
                    
                    break;
            }//end switch
            
            callbacku(cc, ((i+1)/fn.length*100), r);
            
            callbackl(coins, i+1, fn, r, callbacku, callbackl);
             });}
    }
}

