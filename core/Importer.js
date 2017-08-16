class Importer
{
    constructor()
    {
        //this.fileUtil = fileUtil;
    }

    importAll()
    {
        let fnames = [];
        //let coins = [];
        for(var j = 0; j< localStorage.length; j++){
            if(localStorage.key(j).includes("le") === false)
            fnames.push(localStorage.key(j));
        }
        /*let k = 0;
            for(let i = 0; i < fnames.length; i++){
                //console.log(fnames[i]);
				if(localStorage.getItem(fnames[i]).includes("mindstorage") == false){
                //alert(localStorage.getItem(fnames[i]));
				coins.push(fileUtil.loadOneCloudCoinFromJsonFile(fnames[i]));
                this.updateFolder(coins[k], fileUtil);
				k++;
				}
            }*/
            return fnames;
        
    }

    importAllFromFolder(folder)
    {
        /*switch(folder)
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
        }*/
        let fnames = [];
        //let coins = [];
        for(var j = 0; j< localStorage.length; j++){
            if(localStorage.key(j).includes(folder) && localStorage.key(j).includes("le") === false)
            fnames.push(localStorage.key(j));
        }
        
        
            return fnames;
        
    }
/*
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
    */
}