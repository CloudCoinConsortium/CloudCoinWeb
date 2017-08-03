class RAIDA
{
    constructor(milliSecondsToTimeOut) 
    {
        this.agent = [];
        this.milliSecondsToTimeOut = milliSecondsToTimeOut;
        this.responseArray = [];
        for(let i = 0; i < 25; i++){
            this.agent.push( new DetectionAgent(i, milliSecondsToTimeOut));
            this.responseArray.push( new RaidaResponse());
        }
        this.returnCoin = new CloudCoin;
        this.working_triad = [0, 1, 2];
        this.raidaIsDetecting = [true, true, true, true, true, true, true, true, true,
        true, true, true, true, true, true, true, true, true, true, true, true, true,
        true, true, true];
        this.lastDetectStatus = ["notdetected", "notdetected", "notdetected", "notdetected",
        "notdetected", "notdetected", "notdetected", "notdetected", "notdetected", "notdetected",
        "notdetected", "notdetected", "notdetected", "notdetected", "notdetected", "notdetected",
        "notdetected", "notdetected", "notdetected", "notdetected", "notdetected", "notdetected",
        "notdetected", "notdetected", "notdetected"];
        this.echoStatus = ["noreply", "noreply", "noreply", "noreply", "noreply", "noreply", 
        "noreply", "noreply", "noreply", "noreply", "noreply", "noreply", "noreply", "noreply", 
        "noreply", "noreply", "noreply", "noreply", "noreply", "noreply", "noreply", "noreply", 
        "noreply", "noreply", "noreply"];
        this.RAIDAStatus = new RAIDA_Status();
    }

    /*timeout(promise, err)
    {
        let timeTillFail = this.milliSecondsToTimeOut;
        return new Promise(function(resolve, reject){
            promise.then(resolve, reject);
    setTimeout(reject.bind(null, err), timeTillFail);
        });
    }*/

    echoOne(raida_id)
    {
        
        return this.agent[raida_id].echo(this.setResponseEcho, this);
        //alert(this.responseArray[raida_id].outcome);
    }

    echoAll()
    {
        
        let promises = [];
        for(let i = 0; i <25; i++)
        {
            promises.push(this.echoOne(i));
        }
        return promises;
        
    }

    
    detectOne(raida_id, nn, sn, an, pan, d)
    {
        
        return this.agent[raida_id].detect(nn, sn, an, pan, d, this.setResponseDetect, this);
    }

    detectCoin(cc)
    {
        let returnCoin = cc;
        let promises = [];
        let start = new Date();
        log.updateLog("Detecting coin:" +cc.sn +" "+start.toString());
        log.updateLog("Requests: ");
        
        //alert(cc.ans[0]);
        for(let i = 0; i < 25; i++)
        {
            
            promises.push(this.detectOne(i, cc.nn, cc.sn, cc.ans[i], cc.pans[i], cc.getDenomination()));
        }
        log.updateLog("Responses: ");
        return Promise.all(promises).then(function(data){
            for(let j = 0; j < 25; j++)
            {
                if(data[j] != null)
                {returnCoin.setPastStatus(data[j], j)}
                else{returnCoin.setPastStatus("noresponse", j)}
            }
            returnCoin.setAnsToPansIfPassed();
            returnCoin.calculateHP();
            returnCoin.reportDetectionResults();
            returnCoin.calcExpirationDate();
            
            
            return returnCoin;
        });
        
    }
    

    get_Ticket(raidaID, nn, sn, an, d)
    {
        return this.agent[raidaID].get_ticket(nn, sn, an, d, this.setResponseTicket, this);
    }

    get_Tickets(triad, ans, nn, sn, denomination)
    {
        let promises = [];
        log.updateLog("Getting tickets: ");
        promises.push(this.get_Ticket(triad[0], nn, sn, ans[0], denomination));
        promises.push(this.get_Ticket(triad[1], nn, sn, ans[1], denomination));
        promises.push(this.get_Ticket(triad[2], nn, sn, ans[2], denomination));
        log.updateLog("Responses: ");
        //Promise.all(promises).then(function(){})
        //get data from the detection agents
        return promises;
    }

    setResponseEcho(resp, id)
    {
        //alert(resp.outcome);
        if(!resp.success) {this.RAIDAStatus.failsEcho[id] = true;}
        this.RAIDAStatus.echoTime[id] = resp.milliseconds;
        this.responseArray[id] = resp;
        
    }

    setResponseDetect(resp, id)
    {
        //alert(resp.outcome);
        if(!resp.success) {this.RAIDAStatus.failsDetect[id] = true;}
        this.responseArray[id] = resp;
        log.updateLine(id+": " + resp.outcome+", ");
    }
    
    setResponseTicket(resp, id)
    {
        //alert(resp.outcome);
        if(resp.success) {
            //alert(resp.outcome);
            this.RAIDAStatus.hasTicket[id] = true;
            this.RAIDAStatus.ticketHistory[id] = this.RAIDAStatus.TicketHistoryEn.Success;
            this.RAIDAStatus.tickets[id] = resp.outcome;
        } else {
            this.RAIDAStatus.hasTicket[id] = false;
            this.RAIDAStatus.ticketHistory[id] = this.RAIDAStatus.TicketHistoryEn.Failed;
        }
        this.responseArray[id] = resp;
        log.updateLine(id+": " + resp.outcome+", ");
        
    }


}