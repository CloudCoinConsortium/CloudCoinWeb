class Frack_Fixer 
{
    constructor(fileUtil, timeout)
    {
        this.fileUtil = fileUtil;
        //this.raida = new RAIDA(timeout);
        this.totalValueToBank = 0;
        this.totalValueToCounterfeit = 0;
        this.totalValueToFractured = 0;
        this.fixed = false;
    }

    fixOneGuidCorner(raida_ID, cc, corner, trustedTriad)
    {
        let stat = raida.RAIDAStatus;

        /*1. WILL THE BROKEN RAIDA FIX? check to see if it has problems echo, detect, or fix. */
        if(stat.failsFix[raida_ID] || stat.failsEcho[raida_ID])
        {
            console.log("RAIDA Fails Echo or Fix. Try again when RAIDA online.");
            log.updateLog("RAIDA Fails Echo or Fix. Try again when RAIDA online.");
            return Promise.resolve("RAIDA Fails Echo or Fix. Try again when RAIDA online.");
        }
        else
             /*2. ARE ALL TRUSTED RAIDA IN THE CORNER READY TO HELP?*/
        if ( !stat.failsEcho[trustedTriad[0]] || !stat.failsDetect[trustedTriad[0]]  || !stat.failsEcho[trustedTriad[1]] || !stat.failsDetect[trustedTriad[1]] || !stat.failsEcho[trustedTriad[2]] || !stat.failsDetect[trustedTriad[2]] )
        {
            /*3. GET TICKETS AND UPDATE RAIDA STATUS TICKETS*/
            let ans = [cc.ans[trustedTriad[0]], cc.ans[trustedTriad[1]], cc.ans[trustedTriad[2]]];
            return Promise.all(raida.get_Tickets(trustedTriad, ans, cc.nn, cc.sn, cc.getDenomination())).then(function(){
                //alert(stat.tickets[trustedTriad[0]]);
            /*4. ARE ALL TICKETS GOOD?*/
            //alert(stat.tickets[trustedTriad[1]]);
            if(stat.hasTicket[trustedTriad[0]] && stat.hasTicket[trustedTriad[1]] && stat.hasTicket[trustedTriad[2]])
            {
            /*5.T YES, so REQUEST FIX*/
                let da = new DetectionAgent(raida_ID, 5000);
                log.updateLog("Attempting fix:");
                return da.fix(trustedTriad, stat.tickets[trustedTriad[0]],
                stat.tickets[trustedTriad[1]], stat.tickets[trustedTriad[2]],
                 cc.ans[raida_ID]).then(function(outcome){
            /*6. DID THE FIX WORK?*/
                if(outcome)
                {
                    console.log(cc.sn + " RAIDA " + raida_ID + " unfracked successfully");
                    log.updateLog(cc.sn + " RAIDA " + raida_ID + " unfracked successfully");
                    return cc.sn + " RAIDA " + raida_ID + " unfracked successfully";
                } else {
                    console.log( cc.sn + " RAIDA " + raida_ID + ": Failed to accept tickets on corner " + corner );
                    log.updateLog( cc.sn + " RAIDA " + raida_ID + ": Failed to accept tickets on corner " + corner );
                    return cc.sn + " RAIDA " + raida_ID + ": Failed to accept tickets on corner " + corner;
                }//end did the fix work?
                 });
            } else {
                console.log( cc.sn + " RAIDA " + raida_ID + ": Trusted servers failed to provide tickets for corner " + corner);
                log.updateLog( cc.sn + " RAIDA " + raida_ID + ": Trusted servers failed to provide tickets for corner " + corner);
                return cc.sn + " RAIDA " + raida_ID + ": Trusted servers failed to provide tickets for corner " + corner;
            } //end are tickets good
        });
        }// end are trusted raida ready
        else{console.log( cc.sn + " RAIDA " + raida_ID + ": One or more of the trusted triad will not echo and detect. So not trying.");
        log.updateLog( cc.sn + " RAIDA " + raida_ID + ": One or more of the trusted triad will not echo and detect. So not trying.");
        return Promise.resolve(cc.sn + " RAIDA " + raida_ID + ": One or more of the trusted triad will not echo and detect. So not trying.");
        }    
    }//end fix one guid

    /*didFixWork(fixResponse)
    {
        if(fixResponse.success)
            {
                this.fixed = true;
            } else {
                this.fixed = false;
            }
    }*/

    fixAll(callback)
    {
        document.getElementById("fixStatusContainer").innerHTML ="";
        document.getElementById("fixStatusContainer").style.display = "initial";
        let results = [0, 0, 0];
        let frackedFileNames = this.fileUtil.frackedFolder.split(",");
        frackedFileNames.pop();
        let files = this.fileUtil;
        //alert(frackedFileNames);
        let frackedCC;
        if(frackedFileNames.length < 0){console.log("You have no fracked coins");}

        for(let i = 0; i < frackedFileNames.length; i++)
        {
            document.getElementById("fixStatusContainer").innerHTML +=
            "<div class='success progress' role='progressbar' tabindex='0' aria-valuenow='0' aria-valuemin='0' aria-valuemax='100'><div class='progress-meter' id='"+
            frackedFileNames[i] +"fix'><p class='progress-meter-text'>"+frackedFileNames[i]+"</p></div></div>"
            console.log("Unfracking " + (i+1) + " of " + frackedFileNames.length);
            log.updateLog("Unfracking " + (i+1) + " of " + frackedFileNames.length);
            frackedCC = files.loadOneCloudCoinFromJsonFile(frackedFileNames[i]);
            //alert(frackedCC.sn);
            //frackedCC.consoleReport();
            
            let p = this.fixCoin(frackedCC);
            
            p.then(function(fixedCC){
            //fixedCC.consoleReport();
            
            switch(fixedCC.getFolder().toLowerCase())
            {
                case "bank":
                    //this.totalValueToBank++;
                    files.overWrite("fracked", "bank", frackedFileNames[i]);
                    //this.deleteCoin(this.fileUtil.frackedFolder + frackedFileNames[i]);
                    console.log( frackedFileNames[i] + ": CloudCoin was moved to Bank");
                    log.updateLog( frackedFileNames[i] + ": CloudCoin was moved to Bank");
                    break;
                case "counterfeit":
                    //this.totalValueToCounterfeit++;
                    files.overWrite("fracked", "counterfeit", frackedFileNames[i]);
                    //this.deleteCoin(this.fileUtil.frackedFolder + frackedFileNames[i]);
                    console.log( frackedFileNames[i] + ": CloudCoin was moved to Counterfeit");
                    log.updateLog( frackedFileNames[i] + ": CloudCoin was moved to Counterfeit");
                    break;
                default:
                    //this.totalValueToFractured++;
                    //this.deleteCoin(this.fileUtil.frackedFolder + frackedFileNames[i]);
                    //this.fileUtil.overWrite(this.fileUtil.frackedFolder);
                    console.log( frackedFileNames[i] + ": CloudCoin was moved back in to Folder: " + fixedCC.getFolder());
                    log.updateLog( frackedFileNames[i] + ": CloudCoin was moved back in to Folder: " + fixedCC.getFolder());
                    break;
            }//end switch
            callback(fixedCC, files);
            });
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

    fixCoin(brokeCoin, obj = this, id = 0)
    {
        //alert(brokeCoin.sn);
        
        raida.RAIDAStatus.resetTickets();
        //obj.raida.RAIDAStatus.newCoin();
        let fileUtil = obj.fileUtil;
        brokeCoin.setAnsToPans();
        let before = (new Date()).getTime();

        let fix_result = "";
        let fixer;
        //let fixedIds = [];
        let corner = 1;
        //let promises = [];
        //let i = 0;
        // id < 25;
       
            if(brokeCoin.getPastStatus(id).toLowerCase() != "pass") //Will treat all non-passes as fails. 
            {
                console.log(brokeCoin.sn + " RAIDA " + id +  ": Attempting to fix.");
                log.updateLog(brokeCoin.sn + " RAIDA " + id +  ": Attempting to fix.");
                fixer = new FixitHelper(id, brokeCoin.ans);
                return obj.cornerLoop(id, brokeCoin, corner, fixer, obj.cornerLoop, obj)
                //.then(function(fixed){if(fixed){fixedIds.push(id)}}));
                //fixedIds.push(id);
                //i++;
            // end if fail
        //end for all raida
        
        //return Promise.all(promises)
        .then(function(result){
        //for(let i = 0; i< fixedIds.length; i++)
        if(result)
        brokeCoin.setPastStatus("pass", id);
        let ts = (new Date()).getTime() - before;
        console.log( brokeCoin.sn +  ": Time spent fixing in milliseconds " + ts);
        log.updateLog( brokeCoin.sn +  ": Time spent fixing in milliseconds " + ts);
        brokeCoin.calculateHP();
        brokeCoin.reportDetectionResults();
        //alert(fixCoin.getFolder());
        brokeCoin.calcExpirationDate();
        fileUtil.saveCloudCoinToJsonFile(brokeCoin, brokeCoin.sn);
        document.getElementById(brokeCoin.sn + "fix").style.width = "100%";
        document.getElementById(brokeCoin.sn + "fix").innerHTML = "<p class='progress-meter-text'>Done Fixing Fracked</p>";
        
        if(id<24){
            return obj.fixCoin(brokeCoin, obj, id+1);
        }else{
        return brokeCoin;}
        });
    } else if(id<24){
        return obj.fixCoin(brokeCoin, obj, id+1);
    
    }else{ 
        
        return brokeCoin; }
}

cornerLoop(id, brokeCoin, corner, fixer, callback, obj)
{
 console.log(brokeCoin.sn + " RAIDA " + id +  ": Using corner " + corner);
 log.updateLog(brokeCoin.sn + " RAIDA " + id +  ": Using corner " + corner);
 document.getElementById(brokeCoin.sn + "fix").style.width = id*4 + "%";
                return obj.fixOneGuidCorner(id, brokeCoin, corner, fixer.currentTriad)
                .then(function(fix_result){
                    if(fix_result.includes("success"))
                    {
                        //brokeCoin.setPastStatus("pass", id);
                        fixer.finnished = true;
                        return true;
                    } else {
                        corner++;
                        fixer.setCornerToCheck(corner);
                        if(!fixer.finnished){
                        return callback(id, brokeCoin, corner, fixer, callback, obj);
                        }else{return false;}
                    }
                    });//end if fixed
}



    

}
