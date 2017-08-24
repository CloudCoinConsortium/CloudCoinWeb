class FileUtils 
{

    constructor(fileArray =[])
    {
        this.fileArray = fileArray;
        
    }

    

    loadOneCloudCoinFromJsonFile(loadFilePath)
    {
        //load file as json
        let incomeJson = JSON.parse(sessionStorage.getItem(loadFilePath));
        
        let nn = incomeJson.nn;
        
        let sn = incomeJson.sn;
        let ans = incomeJson.an;
        let ed = incomeJson.ed;
        let aoid = incomeJson.aoid;
        let pown = incomeJson.pown;
        var returnCC = new CloudCoin(nn, sn, ans, ed, aoid, pown);
        
        return returnCC;
          
        //} //end on success
    }



    loadMindCloudCoinFromJsonFile(loadFilePath)
    {
        let incomeJson = JSON.parse(sessionStorage.getItem(loadFilePath));
        
        let nn = incomeJson.nn;
        
        let sn = incomeJson.sn;
        let ans = incomeJson.an;
        let ed = incomeJson.ed;
        let aoid = incomeJson.aoid;
        let pown = incomeJson.pown;
        var returnCC = new CloudCoin(nn, sn, ans, ed, aoid, pown);
        returnCC.setAnsToPans();
        return returnCC;
    }

    saveCloudCoinToJsonFile(cc, saveFilePath)
    {
    
            
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
        
        
        sessionStorage.setItem(saveFilePath, file);
        //} else {console.log("coin already in session storage");}

    }

	uploadCloudCoinFromJsonFile(loadFile, callback)
	{
		var files = this;
        var reader = new FileReader();
		reader.onload = function(e){
			var data = JSON.parse(reader.result);
        for(let i = 0; i < data.cloudcoin.length; i++){
			let cc = data.cloudcoin[i];
            
		let upCoin = new CloudCoin(cc.nn, cc.sn, cc.an, cc.ed, cc.aoid, cc.pown);
       
        
            
                callback(upCoin, "suspect."+upCoin.sn);
                
            
        }}
		reader.readAsText(loadFile);
		
	}//make this work for multiple files later

    uploadCloudCoinFromJpegFile(loadFile, callback)
	{
		var reader = new FileReader();
        var files = this;
		reader.onload = function(e){
			var data = reader.result.replace("data:image/jpeg;base64,", "");

            data = files.base64ToHex(data);
            data = data.slice(40, 910);
        
		let upCoin = files.hexToCloudCoin(data);
        
        
            
           
                callback(upCoin, "suspect."+upCoin.sn);
                
            
        }
		reader.readAsDataURL(loadFile);
		
	}


    downloadAllCloudCoinToJsonFile(saveFile, tag="")
    {
        
        let obj = {
            cloudcoin:[

            ]
            
        };
        let coin = [];
        let total = 0;
        for(let i = 0; i < saveFile.length; i++){
        coin.push(JSON.parse(sessionStorage.getItem(saveFile[i])));
        
        //delete coin.pown;
        if(coin[i.time])
        delete coin[i].time;
        let cc = new CloudCoin(1, coin[i].sn);
        total += cc.getDenomination();
        obj.cloudcoin.push(coin[i]);
        }
        if(tag === ""){
            tag += coin[0].sn;
            tag = tag.slice(-3);
            tag += coin[0].an[0];
            tag = tag.slice(0,7);
        }
        let filedata = JSON.stringify(obj);
        filedata = filedata.replace(/},/g,"},\r\n");
        let fullFileName = total + ".cloudcoin." + tag + ".stack";
        let downFile = new Blob([filedata]);
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
            newImage64 = newImage64.slice(4); //40
            
            newImage64 = coin64 + newImage64;
            newImage64 = files.hexStringToBlob(newImage64);
   
            callback(newImage64);
        }
        reader.readAsDataURL(jpeg);

    }


    
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
        //let hexarray = [];
        //for(let k = 0; k<fullHexHeader.length; k+=2)
          //  hexarray.push(fullHexHeader.substring(k,k+2));
        //return hexarray;
        return fullHexHeader;
        
    }
    hexToCloudCoin(hex)
    {
        
        let an = [];
        for(let i = 0; i < 25; i++){
            an.push(hex.slice(i*32, (i*32)+32));
        }
        let aoid = [];
        let pown = hex.slice(832, 857);
        pown = pown.replace(/1/g, "p");
        pown = pown.replace(/0/g, "u");
        let ed = parseInt(hex.slice(860, 862), 16);
        let y = Math.floor(ed/12);
        let m = ed%12;
        let start = new Date("August 1, 2016");
        start.setMonth(start.getMonth() + m);
        start.setFullYear(start.getFullYear() + y);
        ed = start.getMonth(); + "-" + start.getFullYear();
        let nn = parseInt(hex.slice(862, 864), 16);
        let sn = parseInt(hex.slice(864, 870), 16);
        
        
        
        let coin = new CloudCoin(nn, sn, an, ed, aoid, pown);
        
        return coin;
        
    }


    hexStringToBlob(str)
    {
         var hexStr = str;//.slice(2);
    var buf = new ArrayBuffer(hexStr.length/2);
    var byteBuf = new Uint8Array(buf);
    for (let i=0; i<hexStr.length; i+=2) {
      byteBuf[i/2] = parseInt(hexStr.slice(i,i+2),16);
    }
    var blob = new Blob([byteBuf], {type: "image/jpeg"});
    return blob;
    }

    hexToBase64(str) {
  str = str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ");
  
  if(str.length > 40000)
  {
	  let holder = "";
	  for(let i = 0; i<str.length; i += 40000)
	  {
		  
		  holder += String.fromCharCode.apply(null, str.slice(i, i+40000));
	  }
	  return btoa(holder);
  } else
  {str = btoa(String.fromCharCode.apply(null, str));
  return str;}
	
  
}

base64ToHex(str) {
  for (var i = 0, bin = atob(str.replace(/[ \r\n]+$/, "")), hex = []; i < bin.length; ++i) {
    var tmp = bin.charCodeAt(i).toString(16);
    if (tmp.length === 1) tmp = "0" + tmp;
    hex[hex.length] = tmp;
  }
  return hex.join("");
  //return hex;
}


overWrite(foldernew, filename)
{
    let id = filename.substring(filename.indexOf('.')+1);
    sessionStorage.setItem(foldernew +"."+ id, sessionStorage.getItem(filename));
    sessionStorage.removeItem(filename);
}

    findCoin(id)
    {
        id = id.toString();
        for(var j = 0; j< sessionStorage.length; j++){
            if(sessionStorage.key(j).substring(sessionStorage.key(j).indexOf('.')+1) === id && !sessionStorage.key(j).includes("le"))
            return sessionStorage.key(j);
        }
        return false;
    }

    findFolder(id)
    {
        for(var j = 0; j< sessionStorage.length; j++){
            if(sessionStorage.key(j).includes(id))
            return sessionStorage.key(j).substring(0,sessionStorage.key(j).indexOf('.'));
        }
        return false;
    }


}
