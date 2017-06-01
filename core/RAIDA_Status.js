class RAIDA_Status {
    constructor() 
    {
        this.failsEcho = [false,false,false,false,false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
        this.echoTime = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.failsDetect = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
        this.failsFix = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
        this.hasTicket = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
        this.TicketHistoryEn = {Untried : 1, Failed: 2, Success: 3}; //enumeration
        this.ticketHistory = [TicketHistoryEn.Untried,TicketHistoryEn.Untried,TicketHistoryEn.Untried,TicketHistoryEn.Untried,TicketHistoryEn.Untried,
        TicketHistoryEn.Untried,TicketHistoryEn.Untried,TicketHistoryEn.Untried,TicketHistoryEn.Untried,TicketHistoryEn.Untried,
        TicketHistoryEn.Untried,TicketHistoryEn.Untried,TicketHistoryEn.Untried,TicketHistoryEn.Untried,TicketHistoryEn.Untried,
        TicketHistoryEn.Untried,TicketHistoryEn.Untried,TicketHistoryEn.Untried,TicketHistoryEn.Untried,TicketHistoryEn.Untried,
        TicketHistoryEn.Untried,TicketHistoryEn.Untried,TicketHistoryEn.Untried,TicketHistoryEn.Untried,TicketHistoryEn.Untried];
        this.tickets = ["","","","","", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
        
    }
/*Used every time the user will try to unfrack another RAIDA on the same coin.*/
    resetTickets()
    {
        for(let i = 0; i < 25; i++){
            hasTicket[i] = false;
            ticketHistory[i] = TicketHistoryEn.Untried;
            tickets[i] = "";

        }//end for
    }//end resetTickets

    resetEcho()
    {
        for(let i = 0; i <25; i++) {
            failsEcho[i] = false;
        }//end for
    }//end resetEcho

/*Used every time the user will try to unfrack another coin from the start.*/
    newCoin()
    {
        for(let i = 0; i < 25; i++){
            hasTicket[i] = false;
            ticketHistory[i] = TicketHistoryEn.Untried;
            tickets[i] = "";
            failsDetect[i] = false;
        }
    }//end newCoin
}