<script type="text/javascript">
         var countries = new Array( "Australia", "Macedonia", "Philippines", "Serbia","Bulgaria","Russia","Switzerland","United Kingdom","Punjab","India", "Texas","California","Romania","Taiwan", 
 "Moscow", "St.Petersburg", "Columbia", "Singapore", "Germany", "San Francisco", "Venezuela", "Hyperbad", "USA", "Sofia", "Luxenburg" ); 
         var failsEcho = new Array( false,false,false,false,false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false); 
         var echoTime = new Array( 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ); 
         var failsDetect = new Array( false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false ); 
         var failsFix = new Array( false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false ); 
         var hasTicket = new Array ( false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false ); 
         var TicketHistory = new Array (Untried, Failed, Success); 
         var ticketHistory = new Array( TicketHistory.Untried, TicketHistory.Untried, TicketHistory.Untried, TicketHistory.Untried, TicketHistory.Untried, TicketHistory.Untried, TicketHistory.Untried, TicketHistory.Untried, TicketHistory.Untried, TicketHistory.Untried, TicketHistory.Untried, TicketHistory.Untried, TicketHistory.Untried, TicketHistory.Untried, TicketHistory.Untried, TicketHistory.Untried, TicketHistory.Untried, TicketHistory.Untried, TicketHistory.Untried, TicketHistory.Untried, TicketHistory.Untried, TicketHistory.Untried, TicketHistory.Untried, TicketHistory.Untried, TicketHistory.Untried }; 
         var tickets = new Array("","","","","", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "" ); 
 
 
         /*Used every time the user will try to unfrack another RAIDA on the same coin.*/ 
		 function resetTickets()
         { 
             for (int i=0; i<25; i++) 
             { 
                 hasTicket[i] =  false; 
                 ticketHistory[i] = TicketHistory.Untried; 
                 tickets[i] = ""; 
             }//end for each RAIDA 
         }//end reset Tickers 
 
 
         /*Used every time the user will try to unfrack another coin from the start.*/ 
         function newCoin() 
         { 
             for (int i = 0; i < 25; i++) 
             { 
                 hasTicket[i] = false; 
                 ticketHistory[i] = TicketHistory.Untried; 
                 tickets[i] = ""; 
                 failsDetect[i] = false; 
             }//end for each RAIDA 
         }//end new coin   
</script>