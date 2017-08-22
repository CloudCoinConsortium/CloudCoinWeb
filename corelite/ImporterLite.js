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
        for(var j = 0; j< sessionStorage.length; j++){
            if(sessionStorage.key(j).includes("le") === false)
            fnames.push(sessionStorage.key(j));
        }
        
            return fnames;
        
    }

    importAllGood()
    {
        let fnames = [];
        //let coins = [];
        for(var j = 0; j< sessionStorage.length; j++){
            if(sessionStorage.key(j).includes("le") === false && (sessionStorage.key(j).includes("bank") ||sessionStorage.key(j).includes("fracked")))
            fnames.push(sessionStorage.key(j));
        }
       
            return fnames;
        
    }

    importAllFromFolder(folder)
    {
       
        let fnames = [];
        //let coins = [];
        for(var j = 0; j< sessionStorage.length; j++){
            if(sessionStorage.key(j).includes(folder) && sessionStorage.key(j).includes("le") === false)
            fnames.push(sessionStorage.key(j));
        }
        
        
            return fnames;
        
    }

}