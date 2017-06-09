class FileUtils 
{

    constructor(rootFolder = "", importFolder = "", importedFolder = "", trashFolder = "",
     suspectFolder = "", frackedFolder = "", bankFolder = "", templateFolder = "",
      counterfeitFolder = "", directoryFolder = "", exportFolder = "")
    {
        this.rootFolder = rootFolder;
        this.importFolder = importFolder;
        this.importedFolder = importedFolder;
        this.trashFolder = trashFolder;
        this.suspectFolder = suspectFolder;
        this.frackedFolder = frackedFolder;
        this.bankFolder = bankFolder;
        this.templateFolder = templateFolder;
        this.counterfeitFolder = counterfeitFolder;
        this.directoryFolder = directoryFolder;
        this.exportFolder = exportFolder;
        
        
    }

    

    loadOneCloudCoinFromJsonFile(loadFilePath)
    {
        //load file as json
        let incomeJson = JSON.parse(localStorage.getItem(loadFilePath));//adjust this later for webstorage
        //indexdb code that we might not use
        /*
        let transaction = db.transaction(["cloudcoin"]);
        let objectStore = transaction.objectStore("cloudcoin");
        let request = objectStore.get(loadFilePath);
        request.onsuccess = function(event) {
            console.log("success");
        let incomeJson = request.result;
        */
        let nn = incomeJson.nn;
        
        let sn = incomeJson.sn;
        let ans = incomeJson.an;
        let ed = incomeJson.ed;
        let aoid = incomeJson.aoid;
        let pown = incomeJson.pown;
        var returnCC = new CloudCoin(nn, sn, ans, ed, aoid, pown);
        //document.getElementById("output").innerHTML = returnCC.nn + " " + returnCC.sn;
        if(pown.includes("f") && !this.frackedFolder.includes(loadFilePath)){this.frackedFolder += loadFilePath + ",";}
        return returnCC;
          
        //} //end on success
    }
    
        //if fracked goes here

        //testing
        
        /*
        //this code might not be needed, not sure yet
        detectOneCloudCoinFromJsonFile(loadFilePath)
    {
        //load file as json
        //let incomeJson = JSON.parse(localStorage.getItem(loadFilePath));//adjust this later for webstorage
        
        //import detect from "DetectionAgent.js";
        let dad = new DetectionAgent(22, 5000);
        let transaction = db.transaction(["cloudcoin"]);
        let objectStore = transaction.objectStore("cloudcoin");
        let request = objectStore.get(loadFilePath);
        request.onsuccess = function(event) {
            console.log("success");
        let incomeJson = request.result;
        let nn = incomeJson.nn;
        
        let sn = incomeJson.sn;
        let ans = incomeJson.an;
        let ed = incomeJson.ed;
        let aoid = incomeJson.aoid;
        let pown = incomeJson.pown;
        var returnCC = new CloudCoin(nn, sn, ans, ed, aoid, pown);
        let rr = dad.detect(returnCC.nn, returnCC.sn, returnCC.ans, returnCC.pan, returnCC.getDenomination());
        alert(rr.outcome);
        return rr;
        
          
    }}

    ticketOneCloudCoinFromJsonFile(loadFilePath)
    {
        //load file as json
        //let incomeJson = JSON.parse(localStorage.getItem(loadFilePath));//adjust this later for webstorage
        
        //import detect from "DetectionAgent.js";
        let dad = new DetectionAgent(22, 5000);
        let transaction = db.transaction(["cloudcoin"]);
        let objectStore = transaction.objectStore("cloudcoin");
        let request = objectStore.get(loadFilePath);
        request.onsuccess = function(event) {
            console.log("success");
        let incomeJson = request.result;
        let nn = incomeJson.nn;
        
        let sn = incomeJson.sn;
        let ans = incomeJson.an;
        let ed = incomeJson.ed;
        let aoid = incomeJson.aoid;
        let pown = incomeJson.pown;
        var returnCC = new CloudCoin(nn, sn, ans, ed, aoid, pown);
        let rr = dad.get_ticket(returnCC.nn, returnCC.sn, returnCC.ans, returnCC.getDenomination());
        alert(rr.outcome);
        return rr;
        
          
        }
    }

    fixOneCloudCoinFromJsonFile(loadFilePath) //wip

    {
        //load file as json
        //let incomeJson = JSON.parse(localStorage.getItem(loadFilePath));//adjust this later for webstorage
        
        //import detect from "DetectionAgent.js";
        let dad = new DetectionAgent(22, 5000);
        let transaction = db.transaction(["cloudcoin"]);
        let objectStore = transaction.objectStore("cloudcoin");
        let request = objectStore.get(loadFilePath);
        request.onsuccess = function(event) {
            console.log("success");
        let incomeJson = request.result;
        let nn = incomeJson.nn;
        
        let sn = incomeJson.sn;
        let ans = incomeJson.an;
        let ed = incomeJson.ed;
        let aoid = incomeJson.aoid;
        let pown = incomeJson.pown;
        var returnCC = new CloudCoin(nn, sn, ans, ed, aoid, pown);
        let rr;
        
        return rr;
        
          
        } //end on success

    }
    */

    loadManyCloudCoinFromJsonFile(loadFilePath)
    {
        returnCoins = [];
        let incomeJson = JSON.parse(localStorage.getItem(loadFilePath));
        for(let j = 0; j < incomeJson.cloudcoin.length - 1; j++)
        {
            let currentCoin = incomeJson.cloudcoin[j];
            let nn = currentCoin.nn;
            let sn = currentCoin.sn;
            let ans = currentCoin.an;
            let ed = currentCoin.ed;
            let aoid = currentCoin.aoid;
            let pown = currentCoin.pown;
            let returnCC = new CloudCoin(nn, sn, ans, ed, aoid, pown);
            returnCoins[j] = returnCC;

        }
        return returnCoins;
    }

    saveCloudCoinToJsonFile(cc, saveFilePath)
    {
        let coin = {
            nn: cc.nn,
            sn: cc.sn,
            ans: cc.ans,
            ed: cc.ed,
            aoid: cc.aoid,
            pown: cc.pown,
            //filename: saveFilePath
        }
        let file = JSON.stringify(coin);
        /* indexed Database */
        /*
         let request = db.transaction(["cloudcoin"], "readwrite")
         .objectStore("cloudcoin")
         .add(coin);
         request.onsuccess = function(event) {
               alert("Test Coin has been added to your database.");
            };
            
            request.onerror = function(event) {
               alert("Unable to add test coin is aready exist in your database! ");
            };

            */
        //let fileBlob = new Blob([file], {type: "test/plain"});
        //saveAs(fileBlob, "cloudcointest.txt");
        localStorage.setItem(saveFilePath, file);

    }

    //importJSON not neccessary for javascript

    writeJpeg(cc, tag)
    {
        let fileSaveSuccessfully = true;
        //build the cloudcoin string
        let cloudCoinStr = "01C34A46494600010101006000601D05"; //THUMBNAIL HEADER BYTES
        for(let i = 0; i < 25; i++) {
            cloudCoinStr = cloudCoinStr + cc.ans[i];
        }

        cloudCoinStr += "204f42455920474f4420262044454645415420545952414e545320";
        cloudCoinStr += "00";// HC: Has comments. 00 = No
        cloudCoinStr += "00"; // LHC = 100%
        cc.calcExpirationDate();
        cloudCoinStr += cc.edHex;
        cloudCoinStr += "01"; //cc.nn// network number
        let hexSN = cc.sn.toString(16);
        let fullHexSN = "";
        switch (hexSN.Length)
        {
                case 1:fullHexSN = ("00000" + hexSN);   break;
                case 2:fullHexSN = ("0000" + hexSN);    break;
                case 3: fullHexSN = ("000" + hexSN);    break;
                case 4:fullHexSN = ("00" + hexSN);      break;
                case 5: fullHexSN = ("0" + hexSN);   break;
                case 6:fullHexSN = hexSN;     break;
        }
        cloudCoinStr = (cloudCoinStr + fullHexSN);
        /* BYTES THAT WILL GO FROM 04 to 454 (Inclusive)*/
        let ccArray = this.hexStringToByteArray(cloudCoinStr);

        /* READ JPEG TEMPLATE*/
        let jpegBytes = [];
        switch (cc.getDenomination())
        {
            case   1: jpegBytes = readAllBytes(this.templateFolder + "jpeg1.jpg");   break;
            case   5: jpegBytes = readAllBytes(this.templateFolder + "jpeg5.jpg");   break;
            case  25: jpegBytes = readAllBytes(this.templateFolder + "jpeg25.jpg");  break;
            case 100: jpegBytes = readAllBytes(this.templateFolder + "jpeg100.jpg"); break;
            case 250: jpegBytes = readAllBytes(this.templateFolder + "jpeg250.jpg"); break;
        }

         /* WRITE THE SERIAL NUMBER ON THE JPEG */

         
    }
    
    hexStringToByteArray(HexString)
    {
        let NumberChars = HexString.length;
        let bytes = [];
        for(let i = 0; i < NumberChars; i += 2)
        {
            bytes[i/2] = parseInt(HexString.substring(i, i+2), 16).toString(2);
            bytes[i/2] = "00000000" + bytes[i/2];
            bytes[i/2] = bytes[i/2].substring((bytes[i/2].length - 8) ,bytes[i/2].length)
        }
        return bytes;
    }
}
