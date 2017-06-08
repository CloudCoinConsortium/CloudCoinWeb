class RAIDA
{
    constructor(milliSecondsToTimeOut) 
    {
        this.agent = [];
        this.responseArray = [];
        for(let i = 0; i < 25; i++){
            this.agent[i] = new DetectionAgent(i, milliSecondsToTimeOut);
            this.responseArray[i] = new RaidaResponse();
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
        
        this.agent[raida_id].echo()
        .then((echoResponse)=>{this.responseArray[raida_id] = echoResponse});
        
    }

    echoAll()
    {
        this.echoOne(0);
        this.echoOne(1);
        this.echoOne(2);
        this.echoOne(3);
        this.echoOne(4);
        this.echoOne(5);
        this.echoOne(6);
        this.echoOne(7);
        this.echoOne(8);
        this.echoOne(9);
        this.echoOne(10);
        this.echoOne(11);
        this.echoOne(12);
        this.echoOne(13);
        this.echoOne(14);
        this.echoOne(15);
        this.echoOne(16);
        this.echoOne(17);
        this.echoOne(18);
        this.echoOne(19);
        this.echoOne(20);
        this.echoOne(21);
        this.echoOne(22);
        this.echoOne(23);
        this.echoOne(24);
        
    }
    


}