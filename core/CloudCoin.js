class CloudCoin
{
    constructor(nn = 1, sn = 0, ans = ["","","","","","","","","","","","","","","","","","","","","","","","",""],
     ed = "", aoid = [], pown = "uuuuuuuuuuuuuuuuuuuuuuuuu") //default value if left blank
    {
        this.nn = nn;
        this.sn = sn;
        this.ans = ans;
        this.ed = ed;
        this.hp = 25;
        this.aoid = aoid;
        this.fileName = this.getDenomination() + ".CloudCoin." + this.nn + "." + this.sn + ".";
        this.json = "";
        this.jpeg = [];
        //this.Status = {fail:1, pass:2, error:3, undetected:4}; // no longer used. imployed pown
        //this.pastStatus = []; // no longer used. imployed pown
        //this.ed = "";
        this.edHex = "";
        this.YEARSTILEXPIRE = 2;
        this.FolderEn = { Suspect:1, Counterfeit:2, Fracked:3, Bank:4, Trash:5, Lost:6 };
        this.folder = 0; //
        //this.gradeStatus = [];// now created by reportdetectionresults();
        this.pown = pown;
        this.pans = [];
        
        
        for(let i = 0; i < 25; i++) {
                        
            this.pans[i] = this.generatePan();
           


        }//end for
        
    }//end constructon




    getPastStatus(raida_id)
    {
        let returnString = "";
        switch(this.pown[raida_id])
        {
            case 'e': returnString = "error"; break;
            case 'f': returnString = "fail"; break;
            case 'p': returnString = "pass"; break;
            case 'u': returnString = "undetected"; break;
			case 'n': returnString = "noresponse"; break;
            default: returnString = "no valid id"; break;
        }
        return returnString;
    }//end get Past status
    
    setPastStatus(status, raida_id) 
    {
        let setGood = false;
        let newPown = "";
        for(let i = 0; i < raida_id; i++)
        {newPown += this.pown[i];}
        switch(status)
        {
            case 'e':
            case "error": newPown+='e'; setGood = true; break;
            case 'f':
            case "fail": newPown+='f'; setGood = true; break;
            case 'p':
            case "pass": newPown+='p'; setGood = true; break;
            case 'u':
            case "undetected": newPown+='u'; setGood = true; break;
			case 'n':
			case "noresponse": newPown+='n'; setGood = false; break;
            default: console.log("not a possible value for status"); newPown +=this.pown[raida_id]; break;
        }
        for(let j = (raida_id + 1); j < 25; j++)
        {newPown += this.pown[j];}
        this.pown = newPown;
        return setGood;
    }//end set past status

    getFolder()
    {
        let returnString = "";
        switch(this.folder)
        {
            case this.FolderEn.Bank: returnString = "Bank"; break;
            case this.FolderEn.Counterfeit: returnString = "Counterfeit"; break;
            case this.FolderEn.Fracked: returnString = "Fracked"; break;
            case this.FolderEn.Suspect: returnString = "Suspect"; break;
            case this.FolderEn.Trash: returnString = "Trash"; break;
            case this.FolderEn.Lost: returnString = "Lost"; break;

        }//end switch
        return returnString;
    }//end get folder

    setFolder(folderName)
    {
        let setGood = false;
        switch(folderName.toLowerCase())
        {
            case "bank": this.folder = this.FolderEn.Bank; break;
            case "counterfeit": this.folder = this.FolderEn.Counterfeit; break;
            case "fracked": this.folder = this.FolderEn.Fracked; break;
            case "suspect": this.folder = this.FolderEn.Suspect; break;
            case "trash": this.folder = this.FolderEn.Trash; break;
            case "lost": this.folder = this.FolderEn.Lost; break;
        }
        return setGood;
    }

    getDenomination()
    {
        let nom = 0;
        if ((this.sn < 1))
            {
                nom = 0;
            }
            else if ((this.sn < 2097153))
            {
                nom = 1;
            }
            else if ((this.sn < 4194305))
            {
                nom = 5;
            }
            else if ((this.sn < 6291457))
            {
                nom = 25;
            }
            else if ((this.sn < 14680065))
            {
                nom = 100;
            }
            else if ((this.sn < 16777217))
            {
                nom = 250;
            }
            else
            {
                nom = 0;
            }

            return nom;
    }//end get denomination
    
    calculateHP()
    {
        this.hp = 25;
        for (let i = 0; (i < 25); i++){
            if (this.pown[i]=='f'){
                this.hp--;
            }
        }
        return this.hp;
     }//end calc hp

     

     calcExpirationDate()
     {
         let today = new Date();
         let start = new Date("August 1, 2016");
         today.setFullYear(today.getFullYear() + this.YEARSTILEXPIRE);
         let delta = today.getMonth() - start.getMonth() + ((today.getFullYear() - start.getFullYear())*12);
         this.ed = today.getMonth() + "-" + today.getFullYear();
         this.edHex = delta.toString(16);
         if(this.edHex.length < 2){this.edHex = "0" + this.edHex;}
     }

     generatePan()
     {
        let rawpan = "";
        
   
        rawpan = generateUUID();
        //}
        while( rawpan.length != 32)
         {
            rawpan = generateUUID();
         }

        return rawpan;
     }

    
     
     reportDetectionResults() //used to be called grade()
     {
         let passed = 0;
         let failed = 0;
         let other = 0;
         let passedDesc = "";
         let failedDesc = "";
         let otherDesc = "";
         let gradeStatus = [];
         
         for(let i = 0; i<25; i++){
             if(this.pown[i] === 'p')
             {
                 passed++;
                 
             }else if (this.pown[i] === 'f')
             {
                failed++;
                
             } else {
                 other++;
                 
             }// end if elses
        
        }
        
         //calculate passed
         if ((passed == 25))
            {
                passedDesc = "100% Passed!";
            }
            else if ((passed > 17))
            {
                passedDesc = "Super Majority";
            }
            else if ((passed > 13))
            {
                passedDesc = "Majority";
            }
            else if ((passed == 0))
            {
                passedDesc = "None";
            }
            else if ((passed < 5))
            {
                passedDesc = "Super Minority";
            }
            else
            {
                passedDesc = "Minority";
            }
            //calculate failed
            if ((failed == 25))
            {
                failedDesc = "100% Failed!";
            }
            else if ((failed > 17))
            {
                failedDesc = "Super Majority";
            }
            else if ((failed > 13))
            {
                failedDesc = "Majority";
            }
            else if ((failed == 0))
            {
                failedDesc = "None";
            }
            else if ((failed < 5))
            {
                failedDesc = "Super Minority";
            }
            else
            {
                failedDesc = "Minority";
            }

            // Calcualte Other RAIDA Servers did not help. 
            switch (other)
            {
                case 0:
                    otherDesc = "RAIDA 100% good";
                    break;
                case 1:
                case 2:
                    otherDesc = "Four or less RAIDA errors";
                    break;
                case 3:
                case 4:
                    otherDesc = "Four or less RAIDA errors";
                    break;
                case 5:
                case 6:
                    otherDesc = "Six or less RAIDA errors";
                    break;
                case 7:
                case 8:
                case 9:
                case 10:
                case 11:
                case 12:
                    otherDesc = "Between 7 and 12 RAIDA errors";
                    break;
                case 13:
                case 14:
                case 15:
                case 16:
                case 17:
                case 18:
                case 19:
                case 20:
                case 21:
                case 22:
                case 23:
                case 24:
                case 25:
                    otherDesc = "RAIDA total failure";
                    break;
                default:
                    otherDesc = "FAILED TO EVALUATE RAIDA HEALTH";
                    break;
            }
            // end RAIDA other errors and unknowns
            if ( other > 12 )
            {
                // not enough RAIDA to have a quorum
                this.folder = this.FolderEn.Suspect;
            }
            else if ( failed > passed )
            {
                // failed out numbers passed with a quorum: Counterfeit
                this.folder = this.FolderEn.Counterfeit;
            }
            else if ( failed > 0 )
            {
                // The quorum majority said the coin passed but some disagreed: fracked. 
                this.folder = this.FolderEn.Fracked;
            }
            else
            {
                // No fails, all passes: bank
                this.folder = this.FolderEn.Bank;
            }

            gradeStatus[0] = passedDesc;
            gradeStatus[1] = failedDesc;
            gradeStatus[2] = otherDesc;
            return gradeStatus;
     }//end grade

     setAnsToPans()
     {
        for(let i = 0; i < 25; i++) {
            this.pans[i] = this.ans[i].toUpperCase();
        }
     }

     setAnsToPansIfPassed()
        {
            // now set all ans that passed to the new pans
            for (let i = 0; (i < 25); i++)
            {
                if (this.pown[i] == 'p')//1 means pass
                {
                    this.ans[i] = this.pans[i];
                }
                else if (this.pown[i] == 'e' /*&& !RAIDA_Status.failsEcho[i]*/ )//Timed out but there server echoed. So it probably changed the PAN just too slow of a response
                {
                    this.ans[i] = this.pans[i];
                } //notsureaboutthispart
                else
                {
                    // Just keep the ans and do not change. Hopefully they are not fracked. 
                }

            }// for each guid in coin
        }// end set ans to pans if passed

        consoleReport()
        {
            
            //import StringHolder from "StringHolder.js";
            //const report = new StringHolder();
            console.log("");
            
            console.log("╔══════════════════════════════════════════════════════╗");
            console.log( "║  Authenticity Report SN #" +  this.sn + ", Denomination: " + this.getDenomination() + " ║");
            console.log("╠══════════╦══════════╦══════════╦══════════╦══════════╣");
            console.log("║    " + this.a(this.getPastStatus(0)) +"     ║    " + this.a(this.getPastStatus(1)) + "     ║    " + this.a(this.getPastStatus(2)) + "     ║    " + this.a(this.getPastStatus(3)) + "     ║    " + this.a(this.getPastStatus(4)) + "     ║");
            console.log("╠══════════╬══════════╬══════════╬══════════╬══════════╣");
            console.log("║    " + this.a(this.getPastStatus(5)) + "     ║    " + this.a(this.getPastStatus(6)) + "     ║    " + this.a(this.getPastStatus(7)) + "     ║    " + this.a(this.getPastStatus(8)) + "     ║    " + this.a(this.getPastStatus(9)) + "     ║");
            console.log("╠══════════╬══════════╬══════════╬══════════╬══════════╣");
            console.log("║    " + this.a(this.getPastStatus(10)) + "     ║    " + this.a(this.getPastStatus(11)) + "     ║    " + this.a(this.getPastStatus(12)) + "     ║    " + this.a(this.getPastStatus(13)) + "     ║    " + this.a(this.getPastStatus(14)) + "     ║");
            console.log("╠══════════╬══════════╬══════════╬══════════╬══════════╣");
            console.log("║    " + this.a(this.getPastStatus(15)) + "     ║    " + this.a(this.getPastStatus(16)) + "     ║    " + this.a(this.getPastStatus(17)) + "     ║    " + this.a(this.getPastStatus(18)) + "     ║    " + this.a(this.getPastStatus(19)) + "     ║");
            console.log("╠══════════╬══════════╬══════════╬══════════╬══════════╣");
            console.log("║    " + this.a(this.getPastStatus(20)) + "     ║    " + this.a(this.getPastStatus(21)) + "     ║    " + this.a(this.getPastStatus(22)) + "     ║    " + this.a(this.getPastStatus(23)) + "     ║    " + this.a(this.getPastStatus(24)) + "     ║");
            console.log("╚══════════╩══════════╩══════════╩══════════╩══════════╝");
            console.log("");
        }

        a(statusA)
        {
            if(statusA === "pass" ) {
                return "♥";
            } else if (statusA === "fail") {
                return "█";
            } else {
                return "U";
            }
        }

        
}
function generateUUID() {
    //import * as randommin from "random.min";
    var r = new Random();
    var uuid = 'xxxxxxxxxxxxxxxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var ran = r.integer(0, 15);
        return (c == 'x' ? ran : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid.toUpperCase();
}
//export default class{} 