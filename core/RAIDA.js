class RAIDA
{
    constructor(milliSecondsToTimeOut) 
    {
        this.agent = [];
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
        
    }

    echoOne(raida_id)
    {
        
        return this.agent[raida_id].echo(this.setResponse, this);
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

    setResponse(resp, id)
    {
        //alert(resp.outcome);
        this.responseArray[id] = resp;
        
    }
    
    detectOne(raida_id, nn, sn, an, pan, d)
    {
        
        return this.agent[raida_id].detect(nn, sn, an, pan, d, this.setResponse, this);
    }

    detectCoin(cc)
    {
        let returnCoin = cc;
        let promises = [];
        for(let i = 0; i < 25; i++)
        {
            promises.push(this.detectOne(i, cc.nn, cc.ans[i], cc.pans[i], cc.getDenomination()));
        }
        Promise.all(promises).then(function(){
            for(let j = 0; j < 25; j++)
            {
                if(this.responseArray[i] != null)
                {returnCoin.setPastStatus(responseArray[i].outcome, i)}
                else{returnCoin.setPastStatus("undetected", i)}
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
        return this.agent[raidaID].get_ticket(nn, sn, an, d, this.setResponse, this);
    }

    get_Tickets(triad, ans, nn, sn, denomination)
    {
        let promises = [];
        promises.push(get_Ticket(triad[0], nn, sn, ans[0], denomination));
        promises.push(get_Ticket(triad[1], nn, sn, ans[1], denomination));
        promises.push(get_Ticket(triad[2], nn, sn, ans[2], denomination));

        //Promise.all(promises).then(function(){})
        //get data from the detection agents
        return promises;
    }


}