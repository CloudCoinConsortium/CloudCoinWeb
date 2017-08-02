class DetectionAgent
{
    //var readTimeout = 0;
    //var RAIDANumber = 0;
    //var fullUrl = "";
     /**
         * DetectionAgent Constructor
         *
         * @param readTimeout A parameter that determines how many milliseconds each request will be allowed to take
         * @param RAIDANumber The number of the RAIDA server 0-24
         */

    constructor (RAIDANumber = 0, readTimeout = 2000)
    {
        this.RAIDANumber = RAIDANumber;
        this.fullUrl = "https://RAIDA" + RAIDANumber + ".cloudcoin.global/service/";
        this.readTimeout = readTimeout;
        
    }//Detection Agent Constructor

     /**
        * Method doECHO
        * @param raidaID The number of the RAIDA server 0-24
        * @return a fetch call's promise
        */
    echo(callback, obj) 
    {
        let raidaID = this.RAIDANumber;
        //let rStatus = this.RAIDAStatus;
        var echoResponse = new RaidaResponse();
        echoResponse.fullRequest = this.fullUrl + "echo?b=t";
        let before = (new Date()).getTime();
        return Promise.race([
        fetch(echoResponse.fullRequest)
        .then(
            function(response) {
                
                return response.text()
                .then(function(data){
                    
                    
                    //alert(echoResponce.fullResponse);
                    if(data.includes("ready")) 
                    {
                        echoResponse.success = true;
                        echoResponse.outcome = "ready";
                        let ts = (new Date()).getTime() - before;
                        echoResponse.milliseconds = ts;
                        //rStatus.echoTime[raidaID] = ts;
                        //alert(echoResponse.outcome);
                        
                        
                        //return echoResponse;
                    }else {
                        echoResponse.success = false;
                        echoResponse.outcome = "error";
                        //rStatus.failsEcho[raidaID] = true;
                        let ts = (new Date()).getTime() - before;
                        echoResponse.milliseconds = ts;
                        //rStatus.echoTime[raidaID] = ts;
                        //callback.apply(obj,[echoResponse, raidaID]);
                        //return echoResponse;                        
                        
                    }//end if
                    
                    callback.apply(obj,[echoResponse, raidaID]);
                    
                    return echoResponse;
                    
            }
        )
            })
        .catch(function(error)
        {
            echoResponse.outcome = "error";
            echoResponse.success = false;
            //rStatus.failsEcho[raidaID] = true;
            echoResponse.fullResponse = error;
            let ts = (new Date()).getTime() - before;
        echoResponse.milliseconds = ts;
        //rStatus.echoTime[raidaID] = ts;
                        //callback(echoResponce, raidaID);
                        callback.apply(obj,[echoResponse, raidaID]);
                        return echoResponse;
        }),
        new Promise((resolve, reject) =>setTimeout(()=> {
            echoResponse.success = false;
                        echoResponse.outcome = "error";
                        echoResponse.milliseconds = "timeout";
                        callback.apply(obj,[echoResponse, raidaID]);
                        resolve();
            }, this.readTimeout))
        ])
        //return echoResponce; 

    }// end echo

    /**
         * Method DETECT
         * Sends a Detection request to a RAIDA server
         * @param nn  int that is the coin's Network Number 
         * @param sn  int that is the coin's Serial Number
         * @param an String that is the coin's Authenticity Number (GUID)
         * @param pan String that is the Proposed Authenticity Number to replace the AN.
         * @param d int that is the Denomination of the Coin
         * @return Response object. 
         */
    detect(nn, sn, an, pan, d, callback, obj)
    {
        //let rStatus = this.RAIDAStatus;
        var detectResponse = new RaidaResponse();
        let raidaID = this.RAIDANumber;
        detectResponse.fullRequest = this.fullUrl + "detect?nn=" + nn + "&sn=" + sn + "&an=" + an + "&pan=" + pan + "&denomination=" +d + "&b=t"
        log.updateLine(detectResponse.fullRequest +", ");
        let before = (new Date()).getTime();
        return Promise.race([
        fetch(detectResponse.fullRequest)
         .then(
            function(response) {
                //alert("!");
                return response.text().then(function(data){
            //detectResponse.fullResponse = data;
            let ts = (new Date()).getTime() - before;
            detectResponse.milliseconds = ts;

            if(data.includes( "pass")) 
            {
                detectResponse.outcome = "pass";
                detectResponse.success = true;
                
                
            } else if(data.includes("fail") && data.length < 200)
            {
                
                detectResponse.outcome = "fail";
                detectResponse.success = false;
                //rStatus.failsDetect[raidaID] = true;
                
            } else {
                detectResponse.outcome = "error";
                detectResponse.success = false;
                //rStatus.failsDetect[raidaID] = true;
                
            }//end if
            callback.apply(obj,[detectResponse, raidaID]);
            return detectResponse.outcome;
            //alert(detectResponse.outcome);
            
        });
        
        })
        .catch(function(error){
            detectResponse.outcome = "error";
            detectResponse.fullResponse = error;
            detectResponse.success = false;
            callback.apply(obj,[detectResponse, raidaID]);
            return detectResponse.outcome;
            
        }),
        new Promise((resolve, reject) =>setTimeout(()=> {
            detectResponse.success = false;
                        detectResponse.outcome = "error";
                        //echoResponse.milliseconds = "timeout";
                        callback.apply(obj,[detectResponse, raidaID]);
                       resolve();
            }, this.readTimeout))
        ])
        //return detectResponse;
    }//end detect

    /**
        * Method GET TICKET
        * Returns an ticket from a trusted server
        * @param nn  int that is the coin's Network Number 
        * @param sn  int that is the coin's Serial Number
        * @param an String that is the coin's Authenticity Number (GUID)
        * @param pan String that is the Proposed Authenticity Number to replace the AN.
        * @param d int that is the Denomination of the Coin
        * @return Response object. 
        */
    get_ticket(nn, sn, an , d, callback, obj)
    {
        let raidaID = this.RAIDANumber;
        //let rStatus = this.RAIDAStatus;
        var get_ticketResponse = new RaidaResponse();
        get_ticketResponse.fullRequest = this.fullUrl + "get_ticket?nn=" + nn + "&sn=" + sn + "&an=" + an + "&pan=" + an + "&denomination=" + d;
        let before = (new Date()).getTime();
        log.updateLine(get_ticketResponse.fullRequest +", ");
        return fetch(get_ticketResponse.fullRequest)
        .then(
            function(response) {
                //alert("!");
            return    response.json().then(function(data){
            get_ticketResponse.fullResponse = JSON.stringify(data);
            let ts = (new Date()).getTime() - before;
            get_ticketResponse.milliseconds = ts;

            if(data.status === "ticket") 
            {
                get_ticketResponse.outcome = data.message;
                get_ticketResponse.success = true;
                
            } else {
                get_ticketResponse.success = false;
                //rStatus.hasTicket[raidaID] = false;
                //rStatus.ticketHistory[raidaID] = rStatus.TicketHistoryEn.Failed;
            }//end if
            callback.apply(obj,[get_ticketResponse, raidaID]);
            return get_ticketResponse;
            });
        })
        .catch(function(error){
            get_ticketResponse.outcome = "error";
            get_ticketResponse.fullResponse = error;
            get_ticketResponse.success = false;
            
            callback.apply(obj, [get_ticketResponse, raidaID]);
        });//end catch
        //return get_ticketResponse;
    }//end get ticket

/**
         * Method FIX
         * Repairs a fracked RAIDA
         * @param triad three ints trusted server RAIDA numbers
         * @param m1 string ticket from the first trusted server
         * @param m2 string ticket from the second trusted server
         * @param m3 string ticket from the third trusted server
         * @param pan string proposed authenticity number (to replace the wrong AN the RAIDA has)
         * @return string status sent back from the server: sucess, fail or error. 
         */

        fix(triad, m1, m2, m3, pan) 
        {
            
            var fixResponse= new RaidaResponse();
            let before = (new Date()).getTime();
            fixResponse.fullRequest = this.fullUrl+"fix?fromserver1="+triad[0]+"&message1="+m1+"&fromserver2="+triad[1]+"&message2="+m2+"&fromserver3="+triad[2]+"&message3="+m3+"&pan="+pan;
            let ts = (new Date()).getTime() - before;
            fixResponse.milliseconds = ts;
            log.updateLine(fixResponse.fullRequest +", ");
            return fetch(fixResponse.fullRequest)
         .then(
            function(response) {
                //alert("!");
            return    response.json().then(function(data){
            fixResponse.fullResponse = JSON.stringify(data);
            if(data.status === "success") 
            {
                fixResponse.outcome = "success";
                fixResponse.success = true;
                
            } else {
                fixResponse.outcome = "fail";
                fixResponse.success = false;
            }//end if
            log.updateLog(data.message);
            return fixResponse.success;
            //callback.apply(obj, [fixResponse]);
        });
            })
        .catch(function(error){
            fixResponse.outcome = "error";
            fixResponse.fullResponse = error;
            fixResponse.success = false;
            log.updateLog("error");
            return fixResponse.success;
            //callback.apply(obj,[fixResponse]);
        });
        //return fixResponse;
        }
}