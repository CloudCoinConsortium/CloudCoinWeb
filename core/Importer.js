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
        for(var j = 0; j< localStorage.length; j++){
            fnames.push(localStorage.key(j));
        }
        let k = 0;
            for(let i = 0; i < fnames.length; i++){
                //console.log(fnames[i]);
				if(localStorage.getItem(fnames[i]).includes("mindstorage") == false){
                //alert(localStorage.getItem(fnames[i]));
				coins.push(fileUtil.loadOneCloudCoinFromJsonFile(fnames[i]));
                this.updateFolder(coins[k], fileUtil);
				k++;
				}
            }
            return coins;
        
    }

    importAllFromFolder(fileUtil, folder)
    {
        switch(folder)
        {
            case "bank":
            folder = fileUtil.bankFolder;
            break;
            case "counterfeit":
            folder = fileUtil.counterfeitFolder;
            break;
            case "fracked":
            folder = fileUtil.frackedFolder;
            break;
            case "suspect":
            folder = fileUtil.suspectFolder;
            break;
        }
        let fnames = [];
        let coins = [];
        for(var j = 0; j< localStorage.length; j++){
            if(folder.includes(localStorage.key(j)))
            fnames.push(localStorage.key(j));
        }
        if(fnames.length == 0){return false;}
        else{
            for(let i = 0; i < fnames.length; i++){
                //console.log(fnames[i]);
                coins.push(fileUtil.loadOneCloudCoinFromJsonFile(fnames[i]));
                //this.updateFolder(coins[i], fileUtil);
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