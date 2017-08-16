class RAIDA_Status {
    constructor() 
    {
        this.failsEcho = [false,false,false,false,false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
        this.echoTime = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.failsDetect = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
        this.failsFix = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
        this.hasTicket = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
        this.TicketHistoryEn = {Untried : 1, Failed: 2, Success: 3}; //enumeration
        this.ticketHistory = [this.TicketHistoryEn.Untried,this.TicketHistoryEn.Untried,this.TicketHistoryEn.Untried,this.TicketHistoryEn.Untried,this.TicketHistoryEn.Untried,
        this.TicketHistoryEn.Untried,this.TicketHistoryEn.Untried,this.TicketHistoryEn.Untried,this.TicketHistoryEn.Untried,this.TicketHistoryEn.Untried,
        this.TicketHistoryEn.Untried,this.TicketHistoryEn.Untried,this.TicketHistoryEn.Untried,this.TicketHistoryEn.Untried,this.TicketHistoryEn.Untried,
        this.TicketHistoryEn.Untried,this.TicketHistoryEn.Untried,this.TicketHistoryEn.Untried,this.TicketHistoryEn.Untried,this.TicketHistoryEn.Untried,
        this.TicketHistoryEn.Untried,this.TicketHistoryEn.Untried,this.TicketHistoryEn.Untried,this.TicketHistoryEn.Untried,this.TicketHistoryEn.Untried];
        this.tickets = ["","","","","", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
        
    }
/*Used every time the user will try to unfrack another RAIDA on the same coin.*/
    resetTickets()
    {
        for(let i = 0; i < 25; i++){
            this.hasTicket[i] = false;
            this.ticketHistory[i] = this.TicketHistoryEn.Untried;
            this.tickets[i] = "";
            this.failsFix[i] = false;
        }//end for
    }//end resetTickets

    resetEcho()
    {
        for(let i = 0; i <25; i++) {
            this.failsEcho[i] = false;
        }//end for
    }//end resetEcho

/*Used every time the user will try to unfrack another coin from the start.*/
    newCoin()
    {
        for(let i = 0; i < 25; i++){
            this.hasTicket[i] = false;
            this.ticketHistory[i] = this.TicketHistoryEn.Untried;
            this.tickets[i] = "";
            this.failsDetect[i] = false;
        }
    }//end newCoin
}