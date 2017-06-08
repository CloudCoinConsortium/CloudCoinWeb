// JavaScript source code
//v. 10/23/2016

function fixer(trustedRAIDA1Url, trustedRAIDA2Url, fracturedURL, idName1, s, i, pan) { //fracturedURL;//Should include fromserver1, fromserver2 and PAN. 
    "use strict";

    function getTicket1(callback) {
        console.log("getting Ticket 1")
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var jsonResponse1 = JSON.parse( this.responseText );
                console.log(jsonResponse1.server + ":  " + this.responseText);
                if (jsonResponse1.status != "ticket") //See if the responding server is the first one
                {
                    alert("Failed to fix RAIDA. The first trusted RAIDA would not provide a ticket vouching for authenticity");
                    return;
                }//ticket has been returned so:
                fracturedURL += "&message1=" + jsonResponse1.message;;
                // Now use callback to get ticket 2
                callback && callback();
            }
     };
    //console.log("Going to call:" + trustedRAIDA1Url);
    xhttp.open("GET", trustedRAIDA1Url, true);
    xhttp.send();
}//End get ticket 1

    function getTicket2(callback) {
        console.log("getting Ticket 2")
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var jsonResponse2 = JSON.parse(this.responseText);
                console.log(jsonResponse2.server + ":  " + this.responseText);
                if (jsonResponse2.status != "ticket") //See if the responding server is the first one
                {
                    alert("Failed to fix RAIDA. The second trusted RAIDA would not provide a ticket vouching for authenticity");
                    return;
                }//ticket has been returned so:
                fracturedURL += "&message2=" + jsonResponse2.message;
                // Now use callback to get fix RAIDA
                callback && callback();
            }
        };
        xhttp.open("GET", trustedRAIDA2Url, true);
        xhttp.send();
    }//Get getTicket2
 
function getFix( ) {
    console.log("Fixing the fractured RAIDA")
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var jsonResponse3 = JSON.parse(this.responseText);
            console.log(jsonResponse3.server + ":  " + this.responseText);
            if (jsonResponse3.status != "success") //See if the responding server is the first one
            {
                document.getElementById(idName1).className = "tiny alert button fi-wrench";
                coins[i].moneystatus[s] = "f";//1 for pass
                alert("Failed to fix RAIDA " + jsonResponse3.message);
                return;
            }//Fixed has been returned so:
                
            //Stop spinners. Change color to green, Mark the currencty as status 1 (passed)
         
            document.getElementById(idName1).className = "tiny success button fi-like";
            coins[i].moneystatus[s] = "1";//1 for pass
            console.log("Pan is " + pan);
            coins[i].ans[s] = pan;
            alert("The RAIDA is fixed. You will need to save before exiting your browser.");
            // save(i);
            return;
        }
    };
    xhttp.open("GET", fracturedURL, true);
    xhttp.send();
}//end get fix 

    
    //Methods
this.fixIt = function (  ) {
    getTicket1(function () {
        //This will ensure that ticket 1 complete before ticket 2
        getTicket2(function () {
            //Get fix will only be called after getTicket2 ends. 
            getFix( function(){
            });
        });
    });
}//end fixIt

	
	
}//End class fixit
