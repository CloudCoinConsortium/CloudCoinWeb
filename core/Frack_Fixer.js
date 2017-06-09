class Frack_Fixer 
{
    constructor(fileUitil, timeout)
    {
        this.fileUitil = new FileUtils();
        this.raida = new RAIDA(timeout);
        this.totalValueToBank = 0;
        this.totalValueToCounterfeit = 0;
        this.totalValueToFractured = 0;
    }

    fixOneGuidCorner(raida_ID, cc, corner, trustedTriad)
    {
        /*1. WILL THE BROKEN RAIDA FIX? check to see if it has problems echo, detect, or fix. */
        if(RAIDA_Status.failsFix[raida_ID] || RAIDA_Status.failsEcho[raida_ID])
        {
            console.log("RAIDA Fails Echo or Fix. Try again when RAIDA online.");
            return "RAIDA Fails Echo or Fix. Try again when RAIDA online.";
        }
        else
             /*2. ARE ALL TRUSTED RAIDA IN THE CORNER READY TO HELP?*/
        if ( !RAIDA_Status.failsEcho[trustedTriad[0]] || !RAIDA_Status.failsDetect[trustedTriad[0]]  || !RAIDA_Status.failsEcho[trustedTriad[1]] || !RAIDA_Status.failsDetect[trustedTriad[1]] || !RAIDA_Status.failsEcho[trustedTriad[2]] || !RAIDA_Status.failsDetect[trustedTriad[2]] )
        {
            /*3. GET TICKETS AND UPDATE RAIDA STATUS TICKETS*/


            /*4. ARE ALL TICKETS GOOD?*/
            if(RAIDA_Status.hasTicket[trustedTriad[0]] && RAIDA_Status.hasTicket[trustedTriad[0]] && RAIDA_Status.hasTicket[trustedTriad[0]])
            {
            /*5.T YES, so REQUEST FIX*/
            

            /*6. DID THE FIX WORK?*/
                if(fixResponse.success)
                {

                } else {

                } //end did the fix work?
            } else {

            } //end are tickets good

        }// end are trusted raida ready
        console.log("One or more of the trusted triad will not echo and detect. So not trying.");
        return"One or more of the trusted triad will not echo and detect. So not trying.";
    }//end fix one guid
}