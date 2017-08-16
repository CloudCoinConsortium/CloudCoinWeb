class Banker
{
    constructor()
    {
        this.importer = new Importer();

    }

    countCoins(fileUtil)
    {
        let bank = this.importer.importAllFromFolder("bank");
        //if(this.importer.importAllFromFolder(fileUtil, "fracked"))
        //coins = coins.concat(this.importer.importAllFromFolder(fileUtil, "fracked"));
        
        // 0. Total, 1.1s, 2,5s, 3.25s 4.100s, 5.250s
        let returnCounts = [0, 0, 0, 0, 0, 0];
        for(let i = 0; i < bank.length; i ++)
        {
            let sn = bank[i].substring(bank[i].indexOf(".")+1)
            
                    if(sn < 2097153){
                        returnCounts[0]++;
                        returnCounts[1]++;
                    }
                    else if(sn < 4194305){
                        returnCounts[0] += 5;
                        returnCounts[2]++;
                    }    
                    else if(sn < 6291457){
                        returnCounts[0] += 25;
                        returnCounts[3]++;
                    }    
                    else if(sn < 14680065){
                        returnCounts[0] += 100;
                        returnCounts[4]++;
                    }    
                    else if(sn < 16777217){
                        returnCounts[0] += 250;
                        returnCounts[5]++;
                    }    
                
        }
            return returnCounts;
        
    }

    countFracked(fileUtil)
    {
        let bank = this.importer.importAllFromFolder("fracked");
        //if(this.importer.importAllFromFolder(fileUtil, "fracked"))
        //coins = coins.concat(this.importer.importAllFromFolder(fileUtil, "fracked"));
        
        // 0. Total, 1.1s, 2,5s, 3.25s 4.100s, 5.250s
        let returnCounts = [0, 0, 0, 0, 0, 0];
        for(let i = 0; i < bank.length; i ++)
        {
            let sn = bank[i].substring(bank[i].indexOf(".")+1)
            
                    if(sn < 2097153){
                        returnCounts[0]++;
                        returnCounts[1]++;
                    }
                    else if(sn < 4194305){
                        returnCounts[0] += 5;
                        returnCounts[2]++;
                    }    
                    else if(sn < 6291457){
                        returnCounts[0] += 25;
                        returnCounts[3]++;
                    }    
                    else if(sn < 14680065){
                        returnCounts[0] += 100;
                        returnCounts[4]++;
                    }    
                    else if(sn < 16777217){
                        returnCounts[0] += 250;
                        returnCounts[5]++;
                    }    
                
        }
            return returnCounts;
        
    }
}