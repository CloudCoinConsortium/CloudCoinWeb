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
    }//Detection Agent Constructor

     /**
        * Method doECHO
        * @param raidaID The number of the RAIDA server 0-24
        */
    doEcho(raidaID) 
    {
        var echoResponce = new RaidaResponse();
        echoResponce.fullRequest = this.fullUrl + "echo?b=t";
        let before = (new Date()).getTime();
        fetch(echoResponce.fullRequest)
        .then((resp) => resp.json())
        .then(function(data){
            echoResponce.fullResponse = JSON.stringify(data);
            if(data.status === "ready") {echoResponce.success = true;
            echoResponce.outcome = "ready";
        }else {
            echoResponce.success = false;
            echoResponce.outcome = "error";
            RAIDA_Status.failsEcho[raidaID] = true;
        }
        })
        .catch(function(error)
        {
            echoResponce.outcome = "error";
            echoResponce.success = false;
            RAIDA_Status.failsEcho[raidaID] = true;
            echoResponce.fullResponse = error;
        });
        //catch
        let ts = (new Date()).getTime() - before;
        echoResponce.milliseconds = ts;
        RAIDA_Status.echoTime[raidaID] = ts;
        return echoResponce;

    }// end echo
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
        get_ticketResponse = new RaidaResponse();
        get_ticketResponse.fullRequest = fullUrl + "get_ticket?nn=" + nn + "&sn=" + sn + "&an=" + an + "&pan=" + an + "&denomination=" + d;
        let before = (new Date()).getTime();

        fetch(get_ticketResponse.fullRequest)
        .then((resp) => resp.json())
        .then(function(data){
            get_ticketResponse.fullResponse = JSON.stringify(data);
            let ts = (new Date()).getTime() - before;
            get_ticketResponse.milliseconds = ts;

            if(data.status === "ticket") 
            {
                get_ticketResponse.outcome = data.message;
                get_ticketResponse.success - true;
                RAIDA_Status.hasTicket[RAIDANumber] = true;
                //RAIDA_Status.ticketHistory =
                RAIDA_Status.tickets[RAIDANumber] = data.message;
            }
        });
    }


}