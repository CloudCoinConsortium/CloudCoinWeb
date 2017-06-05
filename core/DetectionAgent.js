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

    constructor (RAIDANumber, readTimeout)
    {
        this.RAIDANumber = RAIDANumber;
        this.fullUrl = "https://RAIDA" + RAIDANumber + ".cloudcoin.global/service/";
        this.readTimeout = readTimeout;
        this.RAIDAStatus = new RAIDA_Status();
    }//Detection Agent Constructor

     /**
        * Method doECHO
        * @param raidaID The number of the RAIDA server 0-24
        */
    echo(raidaID = this.RAIDANumber) 
    {
        var echoResponce = new RaidaResponse();
        echoResponce.fullRequest = this.fullUrl + "echo?b=t";
        let before = (new Date()).getTime();
        fetch(echoResponce.fullRequest)
        .then(
            function(response) {
                //alert("!");
                response.json().then(function(data){
                    echoResponce.fullResponse = JSON.stringify(data);
                    if(data.status === "ready") {echoResponce.success = true;
                        echoResponce.outcome = "ready";
                    }else {
                        echoResponce.success = false;
                        echoResponce.outcome = "error";
                        this.RAIDAStatus.failsEcho[raidaID] = true;
                    }
                });
            }
        )
        .catch(function(error)
        {
            echoResponce.outcome = "error";
            echoResponce.success = false;
            this.RAIDAStatus.failsEcho[raidaID] = true;
            echoResponce.fullResponse = error;
        });
        //catch
        let ts = (new Date()).getTime() - before;
        echoResponce.milliseconds = ts;
        this.RAIDAStatus.echoTime[raidaID] = ts;
        return echoResponce;

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
    detect(nn, sn, an, pan, d)
    {
        var detectResponse = new RaidaResponse();
        detectResponse.fullRequest = this.fullUrl + "detect?nn=" + nn + "&sn=" + sn + "&an" + an + "&pan=" + pan + "&denomination=" +d + "&b=t"
        let before = (new Date()).getTime();
        fetch(detectResponse.fullRequest)
         .then(
            function(response) {
                //alert("!");
                response.json().then(function(data){
            detectResponse.fullResponse = JSON.stringify(data);
            let ts = (new Date()).getTime() - before;
            detectResponse.milliseconds = ts;

            if(data.status === "pass") 
            {
                detectResponse.outcome = "pass";
                detectResponse.success = true;
                
            } else if(data.status === "fail" && detectResponse.fullResponse.length < 200)
            {
                detectResponse.outcome = "fail";
                detectResponse.success = false;
                this.RAIDAStatus.failsDetect[RAIDANumber] = true;
            } else {
                detectResponse.outcome = "error";
                detectResponse.success = false;
                this.RAIDAStatus.failsDetect[RAIDANumber] = true;
            }//end if
        });
        })
        .catch(function(error){
            detectResponse.outcome = "error";
            detectResponse.fullResponse = error;
            detectResponse.success = false;
            
        });
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
    get_ticket(nn, sn, an , d)
    {
        var get_ticketResponse = new RaidaResponse();
        get_ticketResponse.fullRequest = this.fullUrl + "get_ticket?nn=" + nn + "&sn=" + sn + "&an=" + an + "&pan=" + an + "&denomination=" + d;
        let before = (new Date()).getTime();

        fetch(get_ticketResponse.fullRequest)
        .then(
            function(response) {
                //alert("!");
                response.json().then(function(data){
            get_ticketResponse.fullResponse = JSON.stringify(data);
            let ts = (new Date()).getTime() - before;
            get_ticketResponse.milliseconds = ts;

            if(data.status === "ticket") 
            {
                get_ticketResponse.outcome = data.message;
                get_ticketResponse.success = true;
                this.RAIDAStatus.hasTicket[RAIDANumber] = true;
                this.RAIDAStatus.ticketHistory[RAIDANumber] = this.RAIDAStatus.TicketHistoryEn.Success;
                this.RAIDAStatus.tickets[RAIDANumber] = data.message;
            } else {
                get_ticketResponse.success = false;
                //this.RAIDAStatus.hasTicket[RAIDANumber] = false;
                //this.RAIDAStatus.ticketHistory[RAIDANumber] = this.RAIDAStatus.TicketHistoryEn.Failed;
            }//end if
            });
        })
        .catch(function(error){
            get_ticketResponse.outcome = "error";
            get_ticketResponse.fullResponse = error;
            get_ticketResponse.success = false;
            this.RAIDAStatus.hasTicket[RAIDANumber] = false;
            this.RAIDAStatus.ticketHistory[RAIDANumber] = RAIDA_Status.TicketHistoryEn.Failed;
        });//end catch
        return get_ticketResponse;
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

            fetch(fixResponse.fullRequest)
         .then(
            function(response) {
                //alert("!");
                response.json().then(function(data){
            fixResponse.fullResponse = JSON.stringify(data);
            if(data.status === "success") 
            {
                fixResponse.outcome = "success";
                fixResponse.success = true;
                
            } else {
                fixResponse.outcome = "fail";
                fixResponse.success = false;
            }//end if
        });
            })
        .catch(function(error){
            fixResponse.outcome = "error";
            fixResponse.fullResponse = error;
            fixResponse.success = false;
            
        });
        }
}