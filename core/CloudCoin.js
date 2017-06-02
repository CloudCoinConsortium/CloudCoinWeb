class CloudCoin
{
    constructor(nn = 0, sn = 0, ans = 0, ed = 0) //param aoid removed as is extention because it is unused
    {
        this.nn = nn;
        this.sn = sn;
        this.ans = ans;
        this.ed = ed;
        this.hp = 25;
        this.aoid = [];
        this.fileName = this.getDenomination() + ".CloudCoin." + this.nn + "." + this.sn + ".";
        this.json = "";
        this.jpeg = [];
        this.Status = {fail:1, pass:2, error:3, undetected:4};
        this.pastStatus = [];
        this.ed = "";
        this.edHex = "";
        this.YEARSTILEXPIRE = 2;
        this.FolderEn = { Suspect:1, Counterfeit:2, Fracked:3, Bank:4, Trash:5 };
        this.folder = 0; //
        //this.gradeStatus = []; now created by reportdetectionresults();
        //this.pown now created by calcpown
        this.pans = [];
        
        
        for(let i = 0; i < 25; i++) {
                        
            this.pans[i] = this.generatePan();
            
            this.pastStatus[i] = this.Status.undetected;
            /*if( aoid.hasKey("fracked"))
            {
                let j = aoid.findKey("fracked");
                switch(aoid[j].value[i]) {
                    case 'p': this.pastStatus[i] = Status.pass; break;
                    case 'f': this.pastStatus[i] = Status.fail; break;
                    case 'u': this.pastStatus[i] = Status.undetected; break;
                    case 'e': this.pastStatus[i] = Status.error; break;
                    default: this.pastStatus[i] = Status.undetected; break;
                }
            }//end if fracked key
            */ //old code


        }//end for
        
    }//end constructon


/*
    constructor() //es doesnt support multiple constructors
    {
        this.nn = 0;
        this.sn = 0;
        this.ans = "";
        this.pans = "";
        this.ed = "";
        this.hp = 0;
        this.aoid = [];
        this.fileName = "";
        this.json = "";
        this.jpeg = [];
        this.Status = {fail:1, pass:2, error:3, undetected:4};
        this.pastStatus = [];
        this.ed = "";
        this.edHex = "";
        this.YEARSTILEXPIRE = 0;
        this.FolderEn = { Suspect:1, Counterfeit:2, Fracked:3, Bank:4, Trash:5 };
        this.folder = 0; //
        this.gradeStatus = [];
        this.pown = "uuuuuuuuuuuuuuuuuuuuuuuuu";
    }

    */

    getPastStatus(raida_id)
    {
        let returnString = "";
        switch(pastStatus[raida_id])
        {
            case Status.error: returnString = "error"; break;
            case Status.fail: returnString = "fail"; break;
            case Status.pass: returnString = "pass"; break;
            case Status.undetected: returnString = "undetected"; break;
        }
        return returnString;
    }//end get Past status
    
    setPastStatus(status, raida_id) 
    {
        let setGood = false;
        switch(status)
        {
            case "error": pastStatus[raida_id] = Status.error; setGood = true; break;
            case "fail": pastStatus[raida_id] = Status.fail; setGood = true; break;
            case "pass": pastStatus[raida_id] = Status.pass; setGood = true; break;
            case "undetected": pastStatus[raida_id] = Status.undetected; setGood = true; break;
        }
        return setGood;
    }//end set past status

    getFolder()
    {
        let returnString = "";
        switch(folder)
        {
            case FolderEn.Bank: returnString = "Bank"; break;
            case FolderEn.Counterfeit: returnString = "Counterfeit"; break;
            case FolderEn.Fracked: returnString = "Fracked"; break;
            case FolderEn.Suspect: returnString = "Suspect"; break;
            case FolderEn.Trash: returnString = "Trash"; break;

        }//end switch
        return returnString;
    }//end get folder

    setFolder(folderName)
    {
        let setGood = false;
        switch(folderName.ToLowerCase())
        {
            case "bank": folder = FolderEn.Bank; break;
            case "counterfeit": folder = FolderEn.Counterfeit; break;
            case "fracked": folder = FolderEn.Fracked; break;
            case "suspect": folder = FolderEn.Suspect; break;
            case "trash": folder = FolderEn.Trash; break;
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
                nom = '0';
            }

            return nom;
    }//end get denomination
    
    calculateHP()
    {
        this.hp = 25;
        for (let i = 0; (i < 25); i++){
            if (this.pastStatus[i]===StatusEn.fail){
                this.hp--;
            }
        }
     }//end calc hp

     /*gradeCoin() //does same thing as calcpown and report detection results
     {
         let passed = 0;
         let failed = 0;
         let other = 0;
         let passedDesc = "";
         let failedDesc = "";
         let otherDesc = "";
         let internalAoid = "";
         for(let i = 0; i<25; i++){
             if(this.pastStatus[i] === StatusEn.pass)
             {
                 passed++;
                 internalAoid += "p";
             }else if (this.pastStatus[i] === StatusEn.fail)
             {
                failed++;
                internalAoid += "f";
             } else {
                 other++;
                 internalAoid += "u";
             }// end if elses
        
        }
        this.pown = internalAoid;
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
            return "\n " + passedDesc + " said Passed. " + "\n " + failedDesc + " said Failed. \n RAIDA Status: " + otherDesc;
     }//end grade coin */

     calcExpirationDate()
     {
         let d = new Date();
         let e = new Date("August 1, 2016");
         d.setFullYear(d.getFullYear() + YEARSTILEXPIRE);
         let f = d.getMonth() - e.getMonth() + ((d.getFullYear() - e.getFullYear())*12);
         this.ed = d.getMonth() + " - " + d.getFullYear();
         this.edHex = f;
     }

     generatePan()
     {
        let rawpan = "";
        let fullPan = "";
        //for(let i = 0; i>15;i++)
        //{
        //generate byte
        //let byte = .toString(16);
        //    rawpan += byte;
        //import * as randommin from "random.min";
        rawpan = generateUUID();
        //}
        switch(rawpan.length)
        {
            case 27: fullPan = ("00000" + rawpan); break;
            case 28: fullPan = ("0000" + rawpan); break;
            case 29: fullPan = ("000" + rawpan); break;
            case 30: fullPan = ("00" + rawpan); break;
            case 31: fullPan = ("0" + rawpan); break;
            case 32: fullPan = rawpan; break;
            case 33: fullPan = rawpan.substring(0, rawpan.length - 1); break;//trim one off end
            case 34: fullPan = rawpan.substring(0, rawpan.length - 2); break;//trim one off end
        }

        return fullPan;
     }

     calcPown()  //used to be part of grade()
     {
         let cPown = "";
         for(let i = 0; i<25; i++){
             if(this.pastStatus[i] === this.Status.pass)
             {
                 
                 cPown += "p";
             }else if (this.pastStatus[i] === this.Status.fail)
             {
                
                cPown += "f";
             } else {
                 
                 cPown += "u";
             }// end if elses
        
        }
        return cPown;
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
             if(this.pastStatus[i] === this.Status.pass)
             {
                 passed++;
                 
             }else if (this.pastStatus[i] === this.Status.fail)
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

     setAnstoPans()
     {
        for(let i = 0; i < 25; i++) {
            this.pans[i] = this.ans[i];
        }
     }

     setAnsToPansIfPassed()
        {
            // now set all ans that passed to the new pans
            for (let i = 0; (i < 25); i++)
            {
                if (pastStatus[i] == Status.pass)//1 means pass
                {
                    ans[i] = pans[i];
                }
                else if (pastStatus[i] == Status.undetected && !RAIDA_Status.failsEcho[i] )//Timed out but there server echoed. So it probably changed the PAN just too slow of a response
                {
                    ans[i] = pans[i];
                }
                else
                {
                    // Just keep the ans and do not change. Hopefully they are not fracked. 
                }

            }// for each guid in coin
        }// end set ans to pans if passed

        consoleReport()
        {
            //import StringHolder from "StringHolder";
            Console.log("");
            
            Console.log("╔══════════════════════════════════════════════════════╗");
            Console.log( StringHolder.cloudcoin_report +  this.sn + StringHolder.cloudcoin_denomination + this.getDenomination() + " ║");
            Console.log("╠══════════╦══════════╦══════════╦══════════╦══════════╣");
            Console.log("║    "); a(pastStatus[0]);  Console.log("     ║    "); a(pastStatus[1]);   Console.log("     ║    "); a(pastStatus[2]);  Console.log("     ║    "); a(pastStatus[3]);  Console.log("     ║    "); a(pastStatus[4]);  Console.log("     ║");
            Console.log("╠══════════╬══════════╬══════════╬══════════╬══════════╣");
            Console.log("║    "); a(pastStatus[5]); Console.log("     ║    "); a(pastStatus[6]);    Console.log("     ║    "); a(pastStatus[7]);  Console.log("     ║    "); a(pastStatus[8]);  Console.log("     ║    "); a(pastStatus[9]);  Console.log("     ║");
            Console.log("╠══════════╬══════════╬══════════╬══════════╬══════════╣");
            Console.log("║    "); a(pastStatus[10]); Console.log("     ║    "); a(pastStatus[11]);  Console.log("     ║    "); a(pastStatus[12]); Console.log("     ║    "); a(pastStatus[13]); Console.log("     ║    "); a(pastStatus[14]); Console.log("     ║");
            Console.log("╠══════════╬══════════╬══════════╬══════════╬══════════╣");
            Console.log("║    "); a(pastStatus[15]); Console.log("     ║    "); a(pastStatus[16]);  Console.log("     ║    "); a(pastStatus[17]); Console.log("     ║    "); a(pastStatus[18]); Console.log("     ║    "); a(pastStatus[19]); Console.log("     ║");
            Console.log("╠══════════╬══════════╬══════════╬══════════╬══════════╣");
            Console.log("║    "); a(pastStatus[20]); Console.log("     ║    "); a(pastStatus[21]);  Console.log("     ║    "); a(pastStatus[22]); Console.log("     ║    "); a(pastStatus[23]); Console.log("     ║    "); a(pastStatus[24]); Console.log("     ║");
            Console.log("╚══════════╩══════════╩══════════╩══════════╩══════════╝");
            Console.log("");
        }

        a(status)
        {
            if(status === Status.pass) {
                Console.log("♥");
            } else if (status === Status.fail) {
                Console.log("█");
            } else {
                Console.log("U");
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