class Detector
{
    constructor(fileUtil, timeout)
    {
        this.raida = new RAIDA(timeout);
        this.fileUtil = fileUtil;
    }

    detectAll()
    {
        let results = [0, 0, 0, 0];
        let totalValueToBank = 0;
        let totalValueToCounterfeit = 0;
        let totalValueToFractured = 0;
        let totalValueToKeptInSuspect = 0;
        let fnames = [];
        for(var key in localStorage){
            fnames.push(key);
        }
        let coins = [];
        for(let i = 0; i < fnames.length; i++)
        {
            coins.push(this.raida.detectCoin(this.fileUitl.loadOneCloudCoinFromJsonFile(fnames[i])));

            switch (coins[i].getFolder().ToLower())
            {
                case "bank":
                    totalValueToBank++;
                    this.fileUtil.writeTo(this.fileUtil.bankFolder, fnames[i]);
                    break;
                case "fracked":
                    totalValueToFractured++;
                    this.fileUtil.writeTo(this.fileUtil.frackedFolder, fnames[i]);
                    break;
                case "counterfeit":
                    totalValueToCounterfeit++;
                    this.fileUtil.writeTo(this.fileUtil.counterfeitFolder, fnames[i]);
                    break;
                case "suspect":
                    totalValueToKeptInSuspect++;
                    
                    break;
            }//end switch
        }
        results[0] = totalValueToBank;
            results[1] = totalValueToCounterfeit;
            results[2] = totalValueToFractured;
            results[3] = totalValueToKeptInSuspect;
            return results;
    }
}