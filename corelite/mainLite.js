
function loadScreen()
{
	document.getElementsByClassName("off-canvas-wrapper")[0].style.opacity = 0.5;
    document.getElementById("loading").innerHTML="<p style='font-size:72px;'>LOADING</p><p>This could take a while if you have a lot of coins.</p>";
}
function loadEnd()
{
	document.getElementsByClassName("off-canvas-wrapper")[0].style.opacity = 1.0;
    document.getElementById("loading").innerHTML="";
}

function populateRaidaStatus(rr, id)
{
    document.getElementById("r_" + id).innerHTML = rr.outcome;
    document.getElementById("p_" + id).innerHTML = rr.milliseconds;
	log.updateLog("echo to raida " + id + "came up " + rr.outcome +" at " +rr.milliseconds+"ms.");
}



function scanSwitchMessage()
{
	if(document.getElementById("scanSwitch").checked)
	{
		document.getElementById("scanSwitchMessage").innerHTML = "Take ownership of the coin(s), and download a new version.";
	}else{
		document.getElementById("scanSwitchMessage").innerHTML = "Just check if the coin(s) is real, don't download a new version.";
	}
}

function getDen(sn)
{
	let nom = 0;
        if ((sn < 1))
            {
                nom = 0;
            }
            else if ((sn < 2097153))
            {
                nom = 1;
            }
            else if ((sn < 4194305))
            {
                nom = 5;
            }
            else if ((sn < 6291457))
            {
                nom = 25;
            }
            else if ((sn < 14680065))
            {
                nom = 100;
            }
            else if ((sn < 16777217))
            {
                nom = 250;
            }
            else
            {
                nom = 0;
            }

            return nom;
}


function restoreFailedDownload()
{
	log.updateLog("Restoring failed download of coins:");
	for(var j = 0; j< sessionStorage.length; j++){
		if(sessionStorage.key(j).includes("le"))
		{
			fname = sessionStorage.key(j).replace("le", "");
			if(!sessionStorage.getItem(fname)){
			sessionStorage.setItem(fname, sessionStorage.getItem("le"+fname));
			
			cc = files.loadOneCloudCoinFromJsonFile(fname);
			cc.reportDetectionResults();
			//updates(cc, files);
			log.updateLine(cc.sn+",");
			}
			sessionStorage.removeItem("le"+fname);
		}
	}
	document.getElementById("restoreDone").innerHTML = "Done";
}


function downloadImage(N=false)
{
    
    let lenames = [];
    let fnames = [];
	let toDl = [];
	for(var j = 0; j< sessionStorage.length; j++){
    if(sessionStorage.key(j).includes("le")){
		lenames.push(sessionStorage.key(j));
	}
	else if(sessionStorage.getItem(sessionStorage.key(j)) != "mindstorage"){     
	if(document.getElementById("cb" + sessionStorage.key(j).substring(sessionStorage.key(j).indexOf(".")+1)).checked)
 			fnames.push(sessionStorage.key(j));
	}
}

	if(fnames.length > 0){
	for(let k = 0; k< lenames.length; k++)
	{
		sessionStorage.removeItem(lenames[k]);
	}}
 

	
 
    for(let i =0 ; i<fnames.length; i++){
        
			toDl.push(files.loadOneCloudCoinFromJsonFile(fnames[i]));
			sessionStorage.setItem("le"+fnames[i], sessionStorage.getItem(fnames[i]));
			log.updateLog("Downloading jpeg with coin:" + fnames[i].substring(fnames[i].indexOf('.')+1));
			trash(fnames[i].substring(fnames[i].indexOf('.')+1));
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

function downloadAll()
{
    let fnames = [];
	let lenames = [];
	
	let tag;
	log.updateLog("Downloading to Stack coins:");
	for(var j = 0; j< sessionStorage.length; j++){
    if(sessionStorage.key(j).includes("le")){
		lenames.push(sessionStorage.key(j));
	}
	else {
		fnames.push(sessionStorage.key(j));
	}
	}
	if(fnames.length > 0){
	for(let k = 0; k< lenames.length; k++)
	{
		sessionStorage.removeItem(lenames[k]);
	}}
	
	
	tag = document.getElementById("alltag").value;
    files.downloadAllCloudCoinToJsonFile(fnames, tag);
    for(let i = 0; i < fnames.length; i++){
		sessionStorage.setItem("le"+fnames[i], sessionStorage.getItem(fnames[i]));
		log.updateLine(fnames[i].substring(fnames[i].indexOf('.')+1) + ",");
        trash(fnames[i].substring(fnames[i].indexOf('.')+1));
	}
	
}


function importMode()
{
	document.getElementById("importHeadShown").innerHTML = document.getElementById("importHead").innerHTML;
	document.getElementById("importButtons").innerHTML = "<input type='file' id='myFile' multiple onchange='uploadButtonAppear()'><div id='upButtonDiv'></div>";
	document.getElementById("importStatus").innerHTML ="";
	document.getElementById("deleteMessage").innerHTML = "";
	document.getElementById("duplicateHolder").style.display = "none";
	document.getElementById("duplicateNumbers").innerHTML = "";
	document.getElementsByClassName("switch-paddle")[0].style.visibility = "initial";
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
	document.getElementsByClassName("switch-paddle")[0].style.visibility = "hidden";
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
if(document.getElementById("scanSwitch").checked){
	setTimeout(function(){
		//document.getElementById("uploadProgress").style.width = "75%";
		detect.detectAllSuspect(updates);
        
        //let importer = new Importer();
    //let coins = importer.importAll(fileUtil);
		//coins.forEach(coinlist);
		//updateTotal(fileUtil);
	}, 500 + (totalSize/80));
}else{
	setTimeout(function(){
		//document.getElementById("uploadProgress").style.width = "75%";
		detect.detectAllTemp(updatesTemp);
        
        //let importer = new Importer();
    //let coins = importer.importAll(fileUtil);
		//coins.forEach(coinlist);
		//updateTotal(fileUtil);
	}, 500 + (totalSize/80));
}
}



function updates(cc, fileUtil, percent=0, results = null)
{
    //coinlist(cc, fileUtil);
	//scoinlist(cc, fileUtil);
    //updateTotal(fileUtil);
	let msg = "";
	let fullHtml = "";
	if(results !== null){
	if(results[0] > 0 || results[2]> 0)
	{
		if(results[0] > 0)
			msg+= "Note(s) to bank:" + results[0] + "<br>";
		if(results[2] > 0)
			msg+= "Note(s) that are fracked:" +results[2] + "<br>";
		fullHtml = "<div class='callout success'>"
		+ msg + "</div>";
	}
	if(results[3] > 0)
	{
		fullHtml +="<div class='callout warning'>Note(s) that got slow responses:"
		+ results[3];
		fullHtml += "</div>";
	}
	if(results[1] > 0)
	{
		fullHtml +="<div class='callout alert'>Note(s) that are counterfeit:"
		+ results[1] + "</div>";
	}
		document.getElementById("detailsTable").innerHTML += " "+
		cc.sn+" "+cc.getFolder()+" "+cc.pown+" \n";
		
	}
	document.getElementById("importStatus").innerHTML = fullHtml;
	log.updateLog(fullHtml);
	document.getElementById("uploadProgress").style.width = percent +"%";
	document.getElementById("uploadProgress").innerHTML="<p class='progress-meter-text'>"+Math.round(percent)+"%</p>";
	if(percent == 100){
	document.getElementById("uploadProgress").innerHTML="<p class='progress-meter-text'>done</p>";
	
	document.getElementById("importHeadShown").innerHTML = "Import Complete";
	document.getElementById("deleteMessage").innerHTML = "Detection Finished, if there were any slow responses detection will run again, otherwise fracked notes will be fixed next"
	+ "<button class='small button' onclick="+"document.getElementById('importDetails').style.display='block'"+">Details</button>";	
}
	document.getElementById("importButtons").innerHTML= "";
	
	if(importer.importAllFromFolder("counterfeit").length > 0)
	{
		trashFolder("counterfeit");
	}
	if(percent == 100 && results[3] == 0)
	{
		document.getElementById("fixLiteProgress").innerHTML = "Coins left to fix: "+results[2];
		fix.fixAll(updatesFromFix);
	} else if(percent == 100 && results[3] > 0)
	{
		detect.detectAllSuspect(updates);
	}
}

function updatesTemp(cc, percent=0, results = null)
{
    
	let msg = "";
	let fullHtml = "";
	if(results !== null){
	if(results[0] > 0 || results[2]> 0)
	{
		if(results[0] > 0)
			msg+= "Note(s) that are good:" + results[0] + "<br>";
		if(results[2] > 0)
			msg+= "Note(s) that are fracked:" +results[2] + "<br>";
		fullHtml = "<div class='callout success'>"
		+ msg + "</div>";
	}
	if(results[3] > 0)
	{
		fullHtml +="<div class='callout warning'>Note(s) that got slow responses:"
		+ results[3];

		fullHtml += "</div>";
	}
	if(results[1] > 0)
	{
		fullHtml +="<div class='callout alert'>Note(s) that are counterfeit:"
		+ results[1] + "</div>";
	}
		document.getElementById("detailsTable").innerHTML += " "+
		cc.sn+" "+cc.getFolder()+" "+cc.pown+" \n";
		
	}
	document.getElementById("importStatus").innerHTML = fullHtml;
	log.updateLog(fullHtml);
	document.getElementById("uploadProgress").style.width = percent +"%";
	document.getElementById("uploadProgress").innerHTML="<p class='progress-meter-text'>"+Math.round(percent)+"%</p>";
	if(percent == 100){
	document.getElementById("uploadProgress").innerHTML="<p class='progress-meter-text'>done</p>";
	
	document.getElementById("importHeadShown").innerHTML = "Import Complete";
	document.getElementById("deleteMessage").innerHTML = ""
	+ "<button class='small button' onclick="+"document.getElementById('importDetails').style.display='block'"+">Details</button>";	
}
	document.getElementById("importButtons").innerHTML= "";
	sessionStorage.removeItem("temp."+cc.sn);
	
	
}

function updatesFromFix(leftToFix)
{
	document.getElementById("fixLiteProgress").innerHTML = "Coins left to fix: "+leftToFix;
	if(leftToFix == 0)
	{
		downloadAll();
	}
}

function trash(id)
{
    
        
        sessionStorage.removeItem(files.findCoin(id));
        //updateTotal(files);
}



function trashFolder(folder)
{
    let fnames = importer.importAllFromFolder(folder);

    for(let i = 0; i < fnames.length; i++){
        trash(fnames[i].substring(fnames[i].indexOf('.')+1));}
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
