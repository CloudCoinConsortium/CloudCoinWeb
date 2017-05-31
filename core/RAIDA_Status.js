class RAIDA_Status {
    constructor() 
    {
        this.failsEcho = [false,false,false,false,false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
        this.echoTime = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.failsDetect = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
        this.failsFix = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
        this.hasTicket = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
        
        this.tickets = ["","","","","", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
        
    }



}