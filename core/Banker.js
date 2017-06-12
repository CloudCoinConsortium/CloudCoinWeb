class Banker
{
    constructor(fileUtil)
    {
        this.importer = new Importer(fileUtil);

    }

    countCoins()
    {
        let coins = this.importer.importAll();
        // 0. Total, 1.1s, 2,5s, 3.25s 4.100s, 5.250s
        let returnCounts = [0, 0, 0, 0, 0, 0];
        for(let i = 0; i < coins.length; i ++)
        {
            switch(coins[i].getDenomination())
            {
                    case 1:
                        returnCounts[0]++;
                        returnCounts[1]++;
                        break;
                    case 5:
                        returnCounts[0] += 5;
                        returnCounts[2]++;
                        break;
                    case 25:
                        returnCounts[0] += 25;
                        returnCounts[3]++;
                        break;
                    case 100:
                        returnCounts[0] += 100;
                        returnCounts[4]++;
                        break;
                    case 250:
                        returnCounts[0] += 250;
                        returnCounts[5]++;
                        break;
                }
        }
            return returnCounts;
        
    }
}