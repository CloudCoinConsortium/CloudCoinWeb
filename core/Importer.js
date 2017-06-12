class Importer
{
    constructor(fileUtil)
    {
        this.fileUtil = fileUtil;
    }

    importAll()
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
                coins.push(this.fileUtil.loadOneCloudCoinFromJsonFile(fnames[i]));
            }
            return coins;
        }
    }
    
}