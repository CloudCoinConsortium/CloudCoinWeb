class Importer
{
    constructor()
    {
        //this.fileUtil = fileUtil;
    }

    importAll(fileUtil)
    {
        let fnames = [];
        let coins = [];
        for(var key in localStorage){
            fnames.push(key);
        }
        if(fnames.length == 0){return false;}
        else{
            for(let i = 0; i < fnames.length; i++){
                console.log(fnames[i]);
                coins.push(fileUtil.loadOneCloudCoinFromJsonFile(fnames[i]));
                this.updateFolder(coins[i], fileUtil);
            }
            return coins;
        }
    }

    updateFolder(cc, fileUtil)
    {
        cc.reportDetectionResults();
        //alert(cc.getFolder().toLowerCase());
                switch (cc.getFolder().toLowerCase())
            {
                case "bank":
                    //totalValueToBank++;
                    fileUtil.writeTo("bank", cc.sn);
                    break;
                case "fracked":
                    //totalValueToFractured++;
                    fileUtil.writeTo("fracked", cc.sn);
                    break;
                case "counterfeit":
                    //totalValueToCounterfeit++;
                    fileUtil.writeTo("counterfeit", cc.sn);
                    break;
                case "suspect":
                    //totalValueToKeptInSuspect++;
                    fileUtil.writeTo("suspect", cc.sn);
                    break;
            }//end switch
    }
    
}