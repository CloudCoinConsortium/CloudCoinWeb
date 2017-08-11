function populateRaidaStatus(rr, id)
{
    document.getElementById("r_" + id).innerHTML = rr.outcome;
    document.getElementById("p_" + id).innerHTML = rr.milliseconds;
	log.updateLog("echo to raida " + id + "came up " + rr.outcome +" at " +rr.milliseconds+"ms.");
}

function exportDialAdd(dem)
{
	let dialCount = document.getElementById("dial"+dem).childElementCount - 3;
	let htmltext ="<option disabled> </option>\n<option selected>0</option>\n";
	for(let i =1;i<= dialCount+1; i++)
	{
		htmltext+="<option>"+i+"</option>";
	}
	htmltext +="<option disabled> </option>";
	document.getElementById("dial"+dem).innerHTML = htmltext;
}

function exportDialMinus(dem)
{
	let dialCount = document.getElementById("dial"+dem).childElementCount - 3;
	let htmltext ="<option disabled> </option>\n<option selected>0</option>\n";
	for(let i =1;i<= dialCount-1; i++)
	{
		htmltext+="<option>"+i+"</option>";
	}
	htmltext +="<option disabled> </option>";
	document.getElementById("dial"+dem).innerHTML = htmltext;
	document.getElementById("dial"+dem).scrollTop = 0;
}

function dialSet(dem)
{
	let box = document.getElementById("dial"+dem);
	let amount = box.options[box.selectedIndex].text;
	let checkboxes = document.getElementsByClassName("dem"+dem);
	for(let i =0; i< checkboxes.length; i++)
	{
		if(i < amount){
			checkboxes[i].checked = true;
		} else {
			checkboxes[i].checked = false;
		}
	}
	//console.log(amount);
}

function scrollSelect(dem)
{
	
	let box = document.getElementById("dial"+dem);
	posOffsetX = box.getBoundingClientRect().left + 20;
	posOffsetY = box.getBoundingClientRect().top + 45;
	
	
	//console.log(posOffsetX+","+posOffsetY);
	document.elementFromPoint(posOffsetX,posOffsetY).selected = true;
	dialSet(dem);
	//console.log(document.elementFromPoint(posOffsetX,posOffsetY));
	
}

function coinlist(cc, fileUtil)
{
    let id = cc.sn;
    if(document.getElementById(id) !== null){
        document.getElementById(id).remove();
        
	} else {
		if(cc.getFolder().toLowerCase() == "bank" || cc.getFolder().toLowerCase() == "fracked")
		exportDialAdd(cc.getDenomination());
	}
    let listname = "coinlist" + cc.getFolder().toLowerCase();
    let htmltext = "<tr id = '"+id+"'><td><input type='checkbox' id='cb"+id+"' ";
	if(listname == "coinlistbank" || listname == "coinlistfracked")
		htmltext += "class='dem"+cc.getDenomination()+"' ";
	htmltext += "></td><td>"+ cc.getDenomination() + "</td><td>"+id+"</td></tr>";
    
    document.getElementById(listname).innerHTML += htmltext;
	//document.getElementById("m" +listname).innerHTML += htmltext;
    //let tag = document.getElementById("tag"+ id); 
    //let el = document.getElementById(listname);
    //el.addEventListener("click",download);
    
}

function scoinlist(cc, fileUtil)
{
    let id = cc.sn;
    if(document.getElementById("s"+id) !== null){
        document.getElementById("s"+id).remove();
        
	}
    let listname = "mcoinlist" + cc.getFolder().toLowerCase();
    let htmltext = "<tr id = 's"+id+"'><td><input type='checkbox' name='sn[]' id='scb"+
	id+"' value='"+id+"'></td><td>"
    + cc.getDenomination() + "</td><td>"+id+"</td></tr>";
    
    
	document.getElementById(listname).innerHTML += htmltext;
    //let tag = document.getElementById("tag"+ id); 
    //let el = document.getElementById(listname);
    //el.addEventListener("click",download);
    
}

function mindlist()
{
	document.getElementById("coinlistmind").innerHTML = "";
		for(var j = 0; j< localStorage.length; j++){
            if(localStorage.getItem(localStorage.key(j)) == "mindstorage")
			document.getElementById("coinlistmind").innerHTML +="<li id = 'm" + 
		localStorage.key(j) + "'><input type='checkbox' id='mcb"+localStorage.key(j)+"'>" + localStorage.key(j) + "</li>";
        }
	
}

function emailRecover()
{
	
	let sn = prompt("What is the serial number of the coin you want to recover?");
	if(sn !== "" && !isNaN(parseFloat(sn)) && isFinite(sn) && sn > 0 && sn < 16777216)
	{
		if(!localStorage.getItem(sn)){
			localStorage.setItem(sn, "mindstorage");
		log.updateLog("Recovered sn:" +sn+" from email.");
		mindlist();
			
		}else{
			alert("Coin of SN:"+sn+" is already in this app.");
		}
	}else {
		alert("Please Enter a valid serial number");
	}
}

function restoreFailedDownload()
{
	log.updateLog("Restoring failed download of coins:");
	for(var j = 0; j< localStorage.length; j++){
		if(isNaN(localStorage.key(j)))
		{
			sn = localStorage.key(j).replace("le", "");
			if(!localStorage.getItem(sn)){
			localStorage.setItem(sn, localStorage.getItem("le"+sn));
			
			cc = files.loadOneCloudCoinFromJsonFile(sn);
			cc.reportDetectionResults();
			updates(cc, files);
			log.updateLine(sn+",");
			}
			localStorage.removeItem("le"+sn);
		}
	}
	
}


function downloadImage(N=false)
{
    
    let lenames = [];
    let fnames = [];
	let toDl = [];
	for(var j = 0; j< localStorage.length; j++){
    if(isNaN(localStorage.key(j))){
		lenames.push(localStorage.key(j));
	}
	else if(localStorage.getItem(localStorage.key(j)) != "mindstorage"){     
	if(document.getElementById("cb" + localStorage.key(j)).checked)
 			fnames.push(localStorage.key(j));
	}
}

	if(fnames.length > 0){
	for(let k = 0; k< lenames.length; k++)
	{
		localStorage.removeItem(lenames[k]);
	}}
 

	
 
    for(let i =0 ; i<fnames.length; i++){
        
			toDl.push(files.loadOneCloudCoinFromJsonFile(fnames[i]));
			localStorage.setItem("le"+fnames[i], localStorage.getItem(fnames[i]));
			log.updateLog("Downloading jpeg with coin:" + fnames[i]);
			trash(fnames[i]);
		}
		
		if(document.getElementById("jpeg-in").files.length !== 0 && (document.getElementById("jpeg-in").value.slice(-4) == "jpeg" || document.getElementById("jpeg-in").value.slice(-4) == "jfif" || document.getElementById("jpeg-in").value.slice(-3) == "jpg"))
		    {embedCC(toDl, N);}
		else if(document.getElementById("jpeg-in").files.length === 0)
		    {embedTemplateCC(toDl, N, canvases);}
			else {
			alert("thats not a jpeg");}
	
	
    //e.stopPropogation();
}

function createCanvas()
{
	let c1 = document.createElement("canvas");
let c5 = document.createElement("canvas");
let c25 = document.createElement("canvas");
let c100 = document.createElement("canvas");
let c250 = document.createElement("canvas");
	let Img1 = new Image();
	let Img5 = new Image();
	let Img25 = new Image();
	let Img100 = new Image();
	let Img250 = new Image();
	let img1d;
	let img5d;
	let img25d;
	let img100d;
	let img250d;
	let ctx1 = c1.getContext("2d");
	let ctx5 = c5.getContext("2d");
	let ctx25 = c25.getContext("2d");
	let ctx100 = c100.getContext("2d");
	let ctx250 = c250.getContext("2d");

	Img1.onload = function(){
		c1.width = this.naturalWidth;     // update canvas size to match image
  c1.height = this.naturalHeight;
  ctx1.drawImage(this, 0, 0);
  ctx1.font = "20px Arial";
 
 //img1d = ctx1.getImageData(0,0,c1.width,c1.height);
};
	Img5.onload = function(){
		c5.width = this.naturalWidth;     // update canvas size to match image
  c5.height = this.naturalHeight;
  ctx5.drawImage(this, 0, 0);
  ctx5.font = "20px Arial";
 
 //img5d = ctx5.getImageData(0,0,c5.width,c5.height);
};
	Img25.onload = function(){
		c25.width = this.naturalWidth;     // update canvas size to match image
  c25.height = this.naturalHeight;
  ctx25.drawImage(this, 0, 0);
  ctx25.font = "20px Arial";
 
 //img25d = ctx25.getImageData(0,0,c25.width,c25.height);
};
	Img100.onload = function(){
		c100.width = this.naturalWidth;     // update canvas size to match image
  c100.height = this.naturalHeight;
  ctx100.drawImage(this, 0, 0);
  ctx100.font = "20px Arial";
 
 //img100d = ctx100.getImageData(0,0,c100.width,c100.height);
};
	Img250.onload = function(){
		c250.width = this.naturalWidth;     // update canvas size to match image
  c250.height = this.naturalHeight;
  ctx250.drawImage(this, 0, 0);
  ctx250.font = "20px Arial";
 
 //img250d = ctx250.getImageData(0,0,c250.width,c250.height);
};
 
	
	Img1.src = "core/jpeg1.jpg";
	
	
	Img5.src = "core/jpeg5.jpg";
	
	Img25.src = "core/jpeg25.jpg";
	
	Img100.src = "core/jpeg1002.jpg";
	
	Img250.src = "core/jpeg250.jpg";
	return [c1,ctx1,c5,ctx5,c25,ctx25,c100,ctx100,c250,ctx250/*,img1d,img5d,img25d,img100d,img250d*/];
}

function downloadAll(N=false)
{
    let fnames = [];
	let lenames = [];
	
	let tag;
	log.updateLog("Downloading to Stack coins:");
	for(var j = 0; j< localStorage.length; j++){
    if(isNaN(localStorage.key(j))){
		lenames.push(localStorage.key(j));
	}
	else if(localStorage.getItem(localStorage.key(j)) !== "mindstorage"){ 
	if(document.getElementById("cb" + localStorage.key(j)).checked)
			 fnames.push(localStorage.key(j));
		}
	}
	
	if(fnames.length > 0){
	for(let k = 0; k< lenames.length; k++)
	{
		localStorage.removeItem(lenames[k]);
	}}
	if(N)
    {tag = document.getElementById("alltagN").value;}
	else
	{tag = document.getElementById("alltag").value;}
    files.downloadAllCloudCoinToJsonFile(fnames, tag);
    for(let i = 0; i < fnames.length; i++){
		log.updateLine(fnames[i] + ",");
        trash(fnames[i]);
	}
	
}

function checkAll(mind = false)
{
	let ffnames = files.frackedFolder.split(",");
    let bfnames = files.bankFolder.split(",");
    ffnames.pop();
    bfnames.pop();
    let fnames = bfnames.concat(ffnames);
	if(mind){
		for(let i = 0; i < fnames.length; i++)
		{
		if(document.getElementById("mcbAll").checked)
		document.getElementById("scb" + fnames[i]).checked = true;
		else
		document.getElementById("scb" + fnames[i]).checked = false;
	}}else{
	for(let i = 0; i < fnames.length; i++)
	{
		if(document.getElementById("cbAll").checked)
		document.getElementById("cb" + fnames[i]).checked = true;
		else
		document.getElementById("cb" + fnames[i]).checked = false;
	}}
}

function uncheckEvery()
{
	document.querySelectorAll("input[type=checkbox]").checked = false;
}

function showFolder(){
        alert("cf:" + files.counterfeitFolder);
        alert("b:" + files.bankFolder);
        alert("s:" + files.suspectFolder);
        alert("f:" + files.frackedFolder);
		alert("t:" + files.trashFolder);
    }

function importMode()
{
	document.getElementById("importHeadShown").innerHTML = document.getElementById("importHead").innerHTML;
	document.getElementById("importButtons").innerHTML = "<input type='file' id='myFile' multiple onchange='uploadButtonAppear()'><div id='upButtonDiv'></div>";
	document.getElementById("importStatus").innerHTML ="";
	document.getElementById("deleteMessage").innerHTML = "";
	document.getElementById("duplicateHolder").style.display = "none";
	document.getElementById("duplicateNumbers").innerHTML = "";
	emptyprogress('uploadProgress');
}
	
function uploadButtonAppear(){
	//alert(document.getElementById("myFile").value);
    document.getElementById("upButtonDiv").innerHTML="<button class='button' id='upButtonShown' onclick='uploadFile()'></button>";
	document.getElementById("upButtonShown").innerHTML = document.getElementById("upButton").innerHTML;
	document.getElementById("uploadProgress").style.width = "0%";
	document.getElementById("uploadProgress").innerHTML="";
}

function uploadFile(){
	document.getElementById("uploadProgress").style.width = "2%";
	let elFile = document.getElementById("myFile");
	let totalSize = 0;
    for(let i = 0; i < elFile.files.length; i++){
    let upJson = elFile.files[i];
	totalSize += upJson.size;
    if(elFile.value.slice(-5) == "stack"){
	files.uploadCloudCoinFromJsonFile(upJson, files.saveCloudCoinToJsonFile);
	//document.getElementById("uploadProgress").style.width = "50%";
    } else if(elFile.value.slice(-4) == "jpeg" || elFile.value.slice(-4) == "jfif" || elFile.value.slice(-3) == "jpg"){
        files.uploadCloudCoinFromJpegFile(upJson, files.saveCloudCoinToJsonFile);
		//document.getElementById("uploadProgress").style.width = "50%";
    } else{alert("Valid File Type Please");}
}

	setTimeout(function(){
		//document.getElementById("uploadProgress").style.width = "75%";
		detect.detectAllSuspect(updates);
        
        //let importer = new Importer();
    //let coins = importer.importAll(fileUtil);
		//coins.forEach(coinlist);
		//updateTotal(fileUtil);
		}, 500 + (totalSize/80));
}

function bankMode()
{
	
	document.getElementById('fixStatusContainer').style.display = 'none';
	updateTotal(files);
}

function updateTotal(fileUtil)
{
	let banker = new Banker();
    let total = banker.countCoins(fileUtil);
    document.getElementById("b_gs").innerHTML =total[0];
	document.getElementById("b_g1").innerHTML=total[1];
	document.getElementById("b_g5").innerHTML=total[2];
	document.getElementById("b_g25").innerHTML=total[3];
	document.getElementById("b_g100").innerHTML=total[4];
	document.getElementById("b_g250").innerHTML=total[5];
	let frackedTotal = banker.countFracked(fileUtil);
	document.getElementById("b_fs").innerHTML =frackedTotal[0];
	document.getElementById("b_f1").innerHTML=frackedTotal[1];
	document.getElementById("b_f5").innerHTML=frackedTotal[2];
	document.getElementById("b_f25").innerHTML=frackedTotal[3];
	document.getElementById("b_f100").innerHTML=frackedTotal[4];
	document.getElementById("b_f250").innerHTML=frackedTotal[5];

	document.getElementById("b_ts").innerHTML =total[0] + frackedTotal[0];
	document.getElementById("b_t1").innerHTML=total[1] + frackedTotal[1];
	document.getElementById("b_t5").innerHTML=total[2] + frackedTotal[2];
	document.getElementById("b_t25").innerHTML=total[3] + frackedTotal[3];
	document.getElementById("b_t100").innerHTML=total[4] + frackedTotal[4];
	document.getElementById("b_t250").innerHTML=total[5] + frackedTotal[5];

	if(frackedTotal[0] === 0)
	{
		document.getElementById("fixButton").setAttribute("disabled", "");
	} else {
		document.getElementById("fixButton").removeAttribute("disabled");
	}
}

function updates(cc, fileUtil, percent=0, results = null)
{
    coinlist(cc, fileUtil);
	scoinlist(cc, fileUtil);
    updateTotal(fileUtil);
	let msg = "";
	let fullHtml = "";
	if(results !== null){
	if(results[0] > 0 || results[2]> 0)
	{
		if(results[0] > 0)
			msg+= "Coin(s) to bank:" + results[0] + "<br>";
		if(results[2] > 0)
			msg+= "Coin(s) that are fracked:" +results[2] + "<br>";
		fullHtml = "<div class='callout success'>"
		+ msg + "</div>";
	}
	if(results[3] > 0)
	{
		fullHtml +="<div class='callout warning'>Coin(s) that got slow responses:"
		+ results[3];
		fullHtml += "<button class='small button' onclick='detect.detectAllSuspect(updates)'";
		if(percent != 100)
		fullHtml +=" disabled";
		fullHtml += ">Re-Detect</div>";
	}
	if(results[1] > 0)
	{
		fullHtml +="<div class='callout alert'>Coin(s) that are counterfeit:"
		+ results[1] + "</div>";
	}
		document.getElementById("detailsTable").innerHTML += " "+
		cc.sn+" "+cc.getFolder()+" "+cc.pown+" \n";
		
	}
	document.getElementById("importStatus").innerHTML = fullHtml;
	log.updateLog(fullHtml);
	document.getElementById("uploadProgress").style.width = percent +"%";
	document.getElementById("uploadProgress").innerHTML="<p class='progress-meter-text'>"+percent+"%</p>";
	if(percent == 100){
	document.getElementById("uploadProgress").innerHTML="<p class='progress-meter-text'>done</p>";
	
	document.getElementById("importHeadShown").innerHTML = "Import Complete";
	document.getElementById("deleteMessage").innerHTML = "Be sure to delete the original file. It is outdated."
	+ "<button class='small button' onclick="+"document.getElementById('importDetails').style.display='block'"+">Details</button>";	
}
	document.getElementById("importButtons").innerHTML= "";
	mindlist();
	sortTable("coinlistbank");
	sortTable("coinlistfracked");
	sortTable("mcoinlistbank");
	sortTable("mcoinlistfracked");
	if(files.counterfeitFolder != "")
	{
		trashFolder(files.counterfeitFolder);
	}
}

function updatesFromMind(cc, fileUtil, percent = 0, results=null)
{
	document.getElementById("mindProgress").style.width = percent +"%";
	if(percent == 100)
	document.getElementById("mindProgress").innerHTML="<p class='progress-meter-text'>done</p>";
	let msg = "";
	let fullHtml = "";
	if(results !== null){
	if(results[0] > 0 || results[2]> 0)
	{
		if(results[0] > 0)
			msg+= "Coin(s) to bank:" + results[0] + "<br>";
		if(results[2] > 0)
			msg+= "Coin(s) that are fracked:" +results[2] + "<br>";
		fullHtml = "<div class='callout success'>"
		+ msg + "</div>";
	}
	if(results[3] > 0)
	{
		fullHtml +="<div class='callout warning'>Coin(s) that got slow responses:"
		+ results[3];
		fullHtml += "<button class='small button' onclick='detect.detectAllSuspect(updates)'";
		if(percent != 100)
		fullHtml +=" disabled";
		fullHtml += ">Re-Detect</div>";
	}
	if(results[1] > 0)
	{
		fullHtml +="<div class='callout alert'>Coin(s) that are counterfeit:(you may have misspelled something.)"
		+ results[1] + "</div>";
	}
		document.getElementById("detailsTable").innerHTML += " "+
		cc.sn+" "+cc.getFolder()+" "+cc.pown+" \n";
		
	}
	document.getElementById("fromMindStatus").innerHTML = fullHtml;
	log.updateLog(fullHtml);
	if(cc.getFolder().toLowerCase() == "counterfeit"){
		localStorage.setItem(cc.sn, "mindstorage");
		mindlist();
	}else{
	raida.detectCoin(cc).then(function(cc){
		files.saveCloudCoinToJsonFile(cc, cc.sn);
            updates(cc, files);
	});
	}
	
	
	
}

function trash(id)
{
    
        document.getElementById(id).remove();
		document.getElementById("s"+id).remove();
        files.overWrite("", "trash", id);
         if ((id < 2097153))
            {
                exportDialMinus(1);
            }
            else if ((id < 4194305))
            {
                exportDialMinus(5);
            }
            else if ((id < 6291457))
            {
                exportDialMinus(25);
            }
            else if ((id < 14680065))
            {
                exportDialMinus(100);
            }
            else if ((id < 16777217))
            {
                exportDialMinus(250);
            }
            
		
        localStorage.removeItem(id);
        updateTotal(files);
}

function trashBad(id)
{
    
        document.getElementById(id).remove();
		document.getElementById("s"+id).remove();
        files.overWrite("", "trash", id);
         
            
		
        localStorage.removeItem(id);
        updateTotal(files);
}

function trashFolder(folder)
{
    let fnames = [];
    
    for(var j = 0; j< localStorage.length; j++){
            if(folder.includes(localStorage.key(j))&&isNaN(localStorage.key(j)) ===false)
            fnames.push(localStorage.key(j));
    }

    for(let i = 0; i < fnames.length; i++){
        trashBad(fnames[i]);}
}

function embedCC(cc, N=false)
{
    let inputTag;
	if(N)
	{inputTag = document.getElementById("alltagN").value}
	else
	{inputTag = document.getElementById("alltag").value}
	let tag = cc.getDenomination() + ".cloudcoin.1." + cc.sn + ".";
	if(inputTag !== ""){
	tag += inputTag;
	} else {
		tag += "image";
	}
	tag += ".jpg";
    let oldImg = document.getElementById("jpeg-in").files[0];
    files.embedOneCloudCoinToJpeg(oldImg, cc, function(img){
		saveAs(img, tag);
	});

}

function embedTemplateCC(cc, N=false, canvases)
{
    if (!HTMLCanvasElement.prototype.toBlob) {
 Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
  value: function (callback, type, quality) {

    var binStr = atob( this.toDataURL(type, quality).split(',')[1] ),
        len = binStr.length,
        arr = new Uint8Array(len);

    for (var i = 0; i < len; i++ ) {
     arr[i] = binStr.charCodeAt(i);
    }

    callback( new Blob( [arr], {type: type || 'image/png'} ) );
  }
 });
}
	
	//alert(files.bankFolder);
    //let oldImg = document.getElementById("jpeg-in").files[0];
	let tag;
	
	
for(let i = 0; i<cc.length;i++)
{
	let c;
	let ctx;
	//let oldImg;
	
	//oldImg.crossorigin = "use-credentials";
	switch(cc[i].getDenomination())
	{
	case 1:
	c = canvases[0];
	ctx = canvases[1];
	//oldImg = canvases[10];
	break;
	case 5:
	c= canvases[2];
	ctx = canvases[3];
	//oldImg = canvases[11];
	break;
	case 25:
	c = canvases[4];
	ctx = canvases[5];
	//oldImg = canvases[12];
	break;
	case 100:
	c = canvases[6];
	ctx = canvases[7];
	//oldImg = canvases[13];
	break;
	case 250:
	c = canvases[8];
	ctx = canvases[9];
	//oldImg = canvases[14];
	break;
 }
 	ctx.fillStyle = 'white';
	ctx.fillText(cc[i].sn + " of 16777216 on N: 1" , 40, 58);
  c.toBlob(function(blob) {        // get content as JPEG blob
	
	files.embedOneCloudCoinToJpeg(blob, cc[i], function(img){
		tag = cc[i].getDenomination() + ".cloudcoin.1." + cc[i].sn + ".";
	if(N)
	{tag += document.getElementById("alltagN").value;}
	else
	{tag += document.getElementById("alltag").value;}
	tag+= ".jpg";
		saveAs(img, tag);
		
	});
	
  }, "image/jpeg", 0.75);
  ctx.fillStyle = "#C7C5ED";
  ctx.fillText(cc[i].sn + " of 16777216 on N: 1" , 40, 58);
}
}
function emptyprogress(bar)
{
	document.getElementById(bar).style.width = "0%";
	document.getElementById(bar).innerHTML="";
}

function mindStorage(callback)
{
	document.getElementById("mindProgress").style.width = "0%";
	document.getElementById("mindProgress").innerHTML="";
	var usern = "";
	var passw = "";
	if(callback.name == "moveFromMind"){
	 usern = document.getElementById("email").value.toLowerCase();
	 passw = document.getElementById("user").value.toLowerCase();
	passw += document.getElementById("pass").value;
	log.updateLog("Moving from mind pass1:"+ document.getElementById("email").value +" pass2:" +document.getElementById("user").value + document.getElementById("pass").value);
	} else {
		 usern = document.getElementById("email2").value.toLowerCase();
	     passw = document.getElementById("user2").value.toLowerCase();
	     passw += document.getElementById("pass2").value;
		 log.updateLog("Moving from mind pass1:"+ document.getElementById("email2").value +" pass2:" +document.getElementById("user2").value + document.getElementById("pass2").value);
	}
	let phrase1 = "";
	let phrase2 = "";
	let combPhrase = "";
	let fullAn = "";
	let pan = [];
	for(let a = 0; a < usern.length; a++)
		phrase1 += usern.charCodeAt(a).toString(16);
	for(let b = 0; b < passw.length; b++)
		phrase2 += passw.charCodeAt(b).toString(16);
	if(phrase1.length >= phrase2.length){
		var phrasesize = phrase1.length;
	}else{
	var phrasesize = phrase2.length;}
	//alert(phrase1 + " " + phrase2);
	if((document.getElementById("user").value == document.getElementById("pass").value)&& callback.name == "moveFromMind")
	{
		
		alert("Username and Password cannot be the same");
		log.updateLog("Username and Password cannot be the same");// +
		//document.getElementById("user").value + " pass:" + document.getElementById("pass").value
		//);
	}else if((document.getElementById("user2").value == document.getElementById("pass2").value)&& callback.name == "moveToMind")
	{
		
		alert("Username and Password cannot be the same");
		log.updateLog("Username and Password cannot be the same");// +
		//document.getElementById("user").value + " pass:" + document.getElementById("pass").value
		//);
	}else if(phrase1.length + phrase2.length < 24)
	{
		alert("Username or Password is too short");
		log.updateLog("Username or Password is too short");
	}else if(usern[0] == /\s/ || usern[usern.length-1] == /\s/)
	{
		alert("Remove whitespace from the front and end of the Email");
		log.updateLog("Remove whitespace from the front and end of the Email");
	}else if(passw[0] == /\s/ || passw[passw.length-1] == /\s/){
		alert("Remove whitespace from the front and end of the Username and Password");
		log.updateLog("Remove whitespace from the front and end of the Username and Password");
	}else
	{
		for(let i = 0; i < phrasesize; i++){
			if(i<phrase1.length)
			combPhrase += phrase1[i];
			if(i<phrase2.length)
			combPhrase += phrase2[i];
		}
		//console.log(combPhrase);
		for(let k = 0; k < 800/combPhrase.length;k++)
			fullAn += combPhrase;
		fullAn = fullAn.slice(0, 800);
		for(let l = 0; l < 25; l++)
			pan.push(fullAn.slice(l*32, (l+1)*32));
			document.getElementById("mindProgress").style.width = "25%";
	
			callback(pan);
		
	}
	
}

function moveFromMind(pan)
{
	document.getElementById("mindProgress").style.width = "50%";
	
	let fnames = [];
	log.updateLog("Moving from mind coins:");
	for(var j = 0; j< localStorage.length; j++){
            if(localStorage.getItem(localStorage.key(j)) == "mindstorage"&&(isNaN(localStorage.key(j)) ===false)){
			if(document.getElementById("mcb" + localStorage.key(j)).checked)
			fnames.push(localStorage.key(j));
			log.updateLine(fnames[j] +",");
			}
        }
	for(let i = 0; i < fnames.length; i++)
	{
		let cc = new CloudCoin(1, fnames[i], pan);
		files.saveCloudCoinToJsonFile(cc, cc.sn);
		files.writeTo("suspect", cc.sn);
	}
	document.getElementById("mindProgress").style.width = "75%";
	document.getElementById("user").value = "";
		document.getElementById("pass").value = "";
		document.getElementById("email").value = "";
	detect.detectAllSuspect(updatesFromMind);
}

function moveToMind(newPan)
{
	
	let xhttp = new XMLHttpRequest();
	//alert(newPan);
	let data = "email=" + document.getElementById("email2").value;
	let toBeMoved = [];
	let k = 0;
	log.updateLog("Moving into mind coins:");
	for(let j = 0; j < localStorage.length; j++){
        if(localStorage.getItem(localStorage.key(j)) != "mindstorage"&&(isNaN(localStorage.key(j)) ===false)){
		if(document.getElementById("scb" + localStorage.key(j)).checked){
		toBeMoved.push(files.loadOneCloudCoinFromJsonFile(localStorage.key(j)));
		log.updateLine(toBeMoved[k].sn +",");
		data += "&sn[" + k + "]=" + toBeMoved[k].sn;
		k++; 
		}
		}
    }
xhttp.open("POST", "core/mailMind.php", true);
xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhttp.send(data);
xhttp.onreadystatechange = function(){
	document.getElementById("toMindMessage").style.width = "50%";
	if(this.readyState == 4 && this.status == 200){
	console.log(this.responseText);
	let promises = [];
	for(let i = 0; i<toBeMoved.length; i++){
		toBeMoved[i].pans = newPan;
		//files.overWrite(toBeMoved[i].getFolder().toLowerCase(), "suspect", toBeMoved[i].sn)
		promises.push(raida.detectCoin(toBeMoved[i]));
		trash(toBeMoved[i].sn);
		localStorage.setItem(toBeMoved[i].sn, "mindstorage");
	}
	Promise.all(promises).then(function(){
		document.getElementById("toMindMessage").style.width = "100%";
		document.getElementById("toMindMessage").innerHTML="<p class='progress-meter-text'>done</p>";
		document.getElementById("user2").value = "";
		document.getElementById("pass2").value = "";
		document.getElementById("email2").value = "";
		mindlist();});
}
if(this.status == 400)
console.log(this.responseText);
}

}

function statusButton()
{
	let echo = raida.echoAll();
	for(let i = 0; i < 25; i++)
    {
        echo[i].then(function(rr){
            //alert(rr.success)
        populateRaidaStatus(raida.responseArray[i], i);
        
});
    }
}

function sortTable(toSort) {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById(toSort);
  switching = true;
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.getElementsByTagName("TR");
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[2];
      y = rows[i + 1].getElementsByTagName("TD")[2];
      //check if the two rows should switch place:
      if (parseInt(x.innerHTML) > parseInt(y.innerHTML)) {
        //if so, mark as a switch and break the loop:
        shouldSwitch= true;
        break;
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}
