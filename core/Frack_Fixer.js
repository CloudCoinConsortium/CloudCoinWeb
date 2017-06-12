class Frack_Fixer 
{
    constructor(fileUitil, timeout)
    {
        this.fileUtil = new FileUtils();
        this.raida = new RAIDA(timeout);
        this.totalValueToBank = 0;
        this.totalValueToCounterfeit = 0;
        this.totalValueToFractured = 0;
        this.fixed = false;
    }

    fixOneGuidCorner(raida_ID, cc, corner, trustedTriad)
    {
        let stat = this.raida.RAIDAStatus;
        /*1. WILL THE BROKEN RAIDA FIX? check to see if it has problems echo, detect, or fix. */
        if(stat.failsFix[raida_ID] || stat.failsEcho[raida_ID])
        {
            console.log("RAIDA Fails Echo or Fix. Try again when RAIDA online.");
            return "RAIDA Fails Echo or Fix. Try again when RAIDA online.";
        }
        else
             /*2. ARE ALL TRUSTED RAIDA IN THE CORNER READY TO HELP?*/
        if ( !stat.failsEcho[trustedTriad[0]] || !stat.failsDetect[trustedTriad[0]]  || !stat.failsEcho[trustedTriad[1]] || !stat.failsDetect[trustedTriad[1]] || !stat.failsEcho[trustedTriad[2]] || !stat.failsDetect[trustedTriad[2]] )
        {
            /*3. GET TICKETS AND UPDATE RAIDA STATUS TICKETS*/
            let ans = [cc.ans[trustedTriad[0]], cc.ans[trustedTriad[1]], cc.ans[trustedTriad[2]]];
            Promise.all(this.raida.get_Tickets(trustedTriad, ans, cc.nn, cc.sn, cc.getDenomination())).then(function(){
            /*4. ARE ALL TICKETS GOOD?*/
            if(stat.hasTicket[trustedTriad[0]] && stat.hasTicket[trustedTriad[0]] && stat.hasTicket[trustedTriad[0]])
            {
            /*5.T YES, so REQUEST FIX*/
                let da = new DetectionAgent(raida_ID, 5000);
                da.fix(trustedTriad, stat.tickets[trustedTriad[0]],
                stat.tickets[trustedTriad[1]], stat.tickets[trustedTriad[2]],
                 cc.ans[raida_ID], this.didFixWork, this).then(function(){
            /*6. DID THE FIX WORK?*/
                if(this.fixed)
                {
                    console.log("RAIDA" + raida_ID + "unfracked successfully");
                    return "RAIDA" + raida_ID + "unfracked successfully";
                } else {
                    console.log("RAIDA failed to accept tickets on corner " + corner);
                    return "RAIDA failed to accept tickets on corner " + corner;
                }//end did the fix work?
                 });
            } else {
                console.log("Trusted servers failed to provide tickets for corner " + corner);
                return "Trusted servers failed to provide tickets for corner " + corner;
            } //end are tickets good
        });
        }// end are trusted raida ready
        else{console.log("One or more of the trusted triad will not echo and detect. So not trying.");
        return"One or more of the trusted triad will not echo and detect. So not trying.";
        }    
    }//end fix one guid

    didFixWork(fixResponse)
    {
        if(fixResponse.success)
            {
                this.fixed = true;
            } else {
                this.fixed = false;
            }
    }

    fixAll()
    {
        let results = [0, 0, 0];
        let frackedFileNames = this.fileUtil.frackedFolder.split(",");
        frackedFileNames.pop();
        let frackedCC;
        if(frackedFileNames.length < 0){console.log("You have no fracked coins");}

        for(let i = 0; i < frackedFileNames.length; i++)
        {
            console.log("unfracking" + (i+1) + " of " + frackedFileNames.length);
            frackedCC = fileUtil.loadOneCloudCoinFromJsonFile(frackedFileNames[i]);
            frackedCC.consoleReport();
            let fixedCC = fixCoin(frackedCC);
            fixedCC.consoleReport();
            switch(fixedCC.getFolder().toLowerCase())
            {
                case "bank":
                    this.totalValueToBank++;
                    this.fileUtil.overWrite(this.fileUtil.bankFolder, frackedFileNames[i]);
                    //this.deleteCoin(this.fileUtil.frackedFolder + frackedFileNames[i]);
                    console.log("CloudCoin was moved to Bank");
                    break;
                case "counterfeit":
                    this.totalValueToCounterfeit++;
                    this.fileUtil.overWrite(this.fileUtil.counterfeitFolder, frackedFileNames[i]);
                    //this.deleteCoin(this.fileUtil.frackedFolder + frackedFileNames[i]);
                    console.log("CloudCoin was moved to Counterfeit");
                    break;
                default:
                    this.totalValueToFractured++;
                    //this.deleteCoin(this.fileUtil.frackedFolder + frackedFileNames[i]);
                    //this.fileUtil.overWrite(this.fileUtil.frackedFolder);
                    console.log("CloudCoin was moved back to Fraked folder");
                    break;
            }//end switch

        }
        results[0] = this.totalValueToBank;
        results[1] = this.totalValueToCounterfeit;
        results[2] = this.totalValueToFractured;
        return results;
    }

    deleteCoin(path)
    {
        let deleted = false;
        //File.Delete(path)
        return deleted;
    }

    fixCoin(brokeCoin)
    {
        this.raida.RAIDAStatus.resetTickets();
        this.raida.RAIDAStatus.newCoin();

        brokeCoin.setAnsToPans();
        let before = (new Date()).getTime();

        let fix_result = "";
        let fixer;

        let corner = 1;
        for(let id = 0; id < 25; id++)
        {
            if(brokeCoin.getPastStatus(id).toLowerCase() == "fail")
            {
                console.log("Attempting to fix RAIDA " + id);
                fixer = new FixitHelper(id, brokeCoin.ans);
                while(!fixer.finnished)
                {
                    console.log("Using corner" + corner);
                    fix_result = fixOneGuidCorner(id, brokeCoin, corner, fixer.currentTriad);
                    if(fix_result.includes("success"))
                    {
                        brokeCoin.setPastStatus("pass", id);
                        fixer.finnished = true;
                    } else {
                        corner++;
                        fixer.setCornerToCheck(corner);
                    }//end if fixed
                }//end while not done
            }// end if fail
        }//end for all raida
        let ts = (new Date()).getTime() - before;
        console.log("Time spent fixing RAIDA in milliseconds " + ts);
        brokeCoin.calculateHP();
        brokeCoin.reportDetectionResults();
        brokeCoin.calcExpirationDate();
        return brokeCoin;
    }
}