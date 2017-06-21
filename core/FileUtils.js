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
        let incomeJson = JSON.parse(localStorage.getItem(loadFilePath));
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
        //if(pown.includes("f") && !this.frackedFolder.includes(loadFilePath)){this.frackedFolder += loadFilePath + ",";}

        return returnCC;
          
        //} //end on success
    }
    
    

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
        //if(localStorage.getItem(saveFilePath) === null)
        //{
            
            let uploadTime = new Date();

        let coin = {
            nn: cc.nn,
            sn: cc.sn,
            an: cc.ans,
            ed: cc.ed,
            aoid: cc.aoid,
            pown: cc.pown,
            time: uploadTime.getTime()
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
        //} else {console.log("coin already in local storage");}

    }
	
	uploadCloudCoinFromJsonFile(loadFile, callback)
	{
		var reader = new FileReader();
		reader.onload = function(e){
			var data = JSON.parse(reader.result);
        for(let i = 0; i < data.cloudcoin.length; i++){
			let cc = data.cloudcoin[i];
		let upCoin = new CloudCoin(cc.nn, cc.sn, cc.an, cc.ed, cc.aoid, cc.pown);
        let currentCoin = JSON.parse(localStorage.getItem(upCoin.sn));
        if(currentCoin != null){
            if(upCoin.sn == currentCoin.sn && loadFile.lastModified < currentCoin.time)
            {
                alert("This app has the current version of that coin.");
            }else{callback(upCoin, upCoin.sn);}
        }else{callback(upCoin, upCoin.sn);}
        }}
		reader.readAsText(loadFile);
		
	}//make this work for multiple files later

    downloadCloudCoinToJsonFile(saveFile, tag="")
    {
        let obj = {
            cloudcoin:[

            ]
            
        };
        let coin = JSON.parse(localStorage.getItem(saveFile));
        delete coin.pown;
        delete coin.time;
        let cc = new CloudCoin(coin.nn, coin.sn);
        obj.cloudcoin.push(coin);
        if(tag === ""){
            tag += coin.sn;
            tag = tag.slice(-3);
            tag += coin.an[0];
            tag = tag.slice(0,7);
        }
        let filedata = JSON.stringify(obj);
        let fullFileName = cc.getDenomination() + ".CloudCoins." + tag + ".stack";
        let downFile = new File([filedata], fullFileName);
        saveAs(downFile, fullFileName);

    }

    //importJSON not neccessary for javascript
    embedOneCloudCoinToJpeg(jpeg, cc, callback)
    {
        let coin64 = this.cloudcoinToHex(cc);
        //alert(coin64);
        var reader = new FileReader();
        var files = this;
		reader.onload = function(e){
            let newImage64 = reader.result;
            
            newImage64 = newImage64.replace("data:image/jpeg;base64,", "");
            newImage64 = files.base64ToHex(newImage64);
            newImage64 = newImage64.slice(40);
            //alert(newImage64);
            newImage64 = coin64 + newImage64;
            //alert(newImage64);
            newImage64 = files.hexToBase64(newImage64);
            newImage64 = "data:image/jpeg;base64," + newImage64;
            let newImage = new Image();
            newImage.src = newImage64;
            callback(newImage);
        }
        reader.readAsDataURL(jpeg);
        
        //let newImage64 = this.jpegToBase64(jpeg);
    
        //let newImage = new Image();
        //newImage.src = 'data:image/jpeg;base64,' + newImage64;
        
        //return newImage.src;
    }


    /*jpegToBase64(jpeg, callback)
    {
        var img = new Image();
  img.crossOrigin = 'Anonymous';
  img.onload = function() {
    var canvas = document.createElement('CANVAS');
    var ctx = canvas.getContext('2d');
    var dataURL;
    canvas.height = this.height;
    canvas.width = this.width;
    ctx.drawImage(this, 0, 0);
    dataURL = canvas.toDataURL("image/jpeg");
    
    callback(dataURL);
  };
  img.src = jpeg;
  if (img.complete || img.complete === undefined) {
    img.src = "data:image/jpeg;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
    img.src = jpeg;
  }
    }
    */
    
    cloudcoinToHex(cc)
    {
        let app0 = "ffd8ffe001c34a46494600010101006000601d05";
        let an = "";
        for(let i = 0; i < 25; i++){
            an+= cc.ans[i];
        }
        let aoid = "00000000000000000000000000000000";
        let pown = cc.pown.replace(/p/g, "1");
        pown = pown.replace(/u/g, "0");
        pown += "1";
        
        let hc = "00";
        cc.calcExpirationDate();
        let ed = cc.edHex;
        let nn = "01";
        let sn = parseInt(cc.sn);
        sn = sn.toString(16);
        switch (sn.length)
            {
                case 1:sn = ("00000" + sn);   break;
                case 2:sn = ("0000" + sn);    break;
                case 3: sn = ("000" + sn);    break;
                case 4:sn = ("00" + sn);      break;
                case 5: sn = ("0" + sn);   break;
                case 6:    break;
            }
        
        let fullHexHeader = app0 + an + aoid + pown + hc + ed + nn + sn;
        //console.log(fullHexHeader)
        //fullHexHeader =this.hexToBase64(fullHexHeader);
        
        return fullHexHeader;
        
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

    hexToBase64(str) {
  return btoa(String.fromCharCode.apply(null,
    str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" "))
  );
}

base64ToHex(str) {
  for (var i = 0, bin = atob(str.replace(/[ \r\n]+$/, "")), hex = []; i < bin.length; ++i) {
    var tmp = bin.charCodeAt(i).toString(16);
    if (tmp.length === 1) tmp = "0" + tmp;
    hex[hex.length] = tmp;
  }
  return hex.join("");
}

    writeTo(folder, filename)
    {
        //alert("called");
        switch(folder)
        {
            case "bank":
        if(!this.bankFolder.includes(filename))
        {
            this.bankFolder += filename + ",";
        }break;
        case "fracked":
        if(!this.frackedFolder.includes(filename))
        {
            this.frackedFolder += filename + ",";
        }break;
        case "counterfeit":
        if(!this.counterfeitFolder.includes(filename))
        {
            this.counterfeitFolder += filename + ",";
        }break;
        case "suspect":
        if(!this.suspectFolder.includes(filename))
        {
            this.suspectFolder += filename + ",";
        }break;
        }
    }//End Write To

    overWrite(folderold, foldernew, filename)
    {
        switch(folderold)
        {
            case "bank":
        //if(this.bankFolder.includes(filename))
        //{
            this.bankFolder = this.bankFolder.replace(filename + ",", "");
        //}
        break;
        case "fracked":
        //if(this.frackedFolder.includes(filename))
        //{
            this.frackedFolder = this.frackedFolder.replace(filename + ",", "");
        //}
        break;
        case "counterfeit":
        //if(this.counterfeitFolder.includes(filename))
        //{
            this.counterfeitFolder = this.counterfeitFolder.replace(filename + ",", "");
        //}
        break;
        case "suspect":
        //if(this.suspectFolder.includes(filename))
        //{
            //alert(this.suspectFolder.includes(filename + ","));
            this.suspectFolder = this.suspectFolder.replace(filename + ",", "");
        //}
        break;
        }
        
        this.writeTo(foldernew, filename);
    }


}
