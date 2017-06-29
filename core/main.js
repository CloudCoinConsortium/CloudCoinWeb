function populateRaidaStatus(rr, id)
{
    document.getElementById("r_" + id).innerHTML = rr.outcome;
    document.getElementById("p_" + id).innerHTML = rr.milliseconds;
}

function coinlist(cc, fileUtil)
{
    let id = cc.sn;
    if(document.getElementById(id) != null){
        document.getElementById(id).remove();
        
	}
    let listname = "coinlist" + cc.getFolder().toLowerCase();
    let htmltext = "<li id = '"+id+"'><input type='checkbox' id='cb"+id+"'>denomination:"
    + cc.getDenomination() + " sn: "+id+" </li>";
    
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
		localStorage.key(j) + "'>" + localStorage.key(j) + "</li><input type='checkbox' id='mcb"+localStorage.key(j)+"'>";
        }
	
}

function downloadImage()
{
    
    
    let fnames = [];
	for(var j = 0; j< localStorage.length; j++){
         
	if(document.getElementById("cb" + localStorage.key(j)).checked)
 			fnames.push(localStorage.key(j));
}
    for(let i =0 ; i<fnames.length; i++){
        if(document.getElementById("jpeg-in").files.length != 0 && (document.getElementById("jpeg-in").value.slice(-4) == "jpeg" || document.getElementById("jpeg-in").value.slice(-4) == "jfif" || document.getElementById("jpeg-in").value.slice(-3) == "jpg"))
		{//alert("clicked");
        embedCC(files.loadOneCloudCoinFromJsonFile(fnames[i]));
        //trash(id);
		}else if(document.getElementById("jpeg-in").files.length == 0)
		{
			
			embedTemplateCC(files.loadOneCloudCoinFromJsonFile(fnames[i]));
			//trash(id);
		}
		else {
			alert("thats not a jpeg");
		}
	}
    //e.stopPropogation();
}

function downloadAll()
{
    let fnames = [];
	for(var j = 0; j< localStorage.length; j++){
         
	if(document.getElementById("cb" + localStorage.key(j)).checked)
 			fnames.push(localStorage.key(j));
}
    let tag = document.getElementById("alltag").value;
    files.downloadAllCloudCoinToJsonFile(fnames, tag);
    for(let i = 0; i < fnames.length; i++){
        trash(fnames[i]);
	}
}

function checkAll()
{
	let ffnames = files.frackedFolder.split(",");
    let bfnames = files.bankFolder.split(",");
    ffnames.pop();
    bfnames.pop();
    let fnames = bfnames.concat(ffnames);
	for(let i = 0; i < fnames.length; i++)
	{
		if(document.getElementById("cbAll").checked)
		document.getElementById("cb" + fnames[i]).checked = true;
		else
		document.getElementById("cb" + fnames[i]).checked = false;
	}
}

function showFolder(){
        alert("cf:" + files.counterfeitFolder);
        alert("b:" + files.bankFolder);
        alert("s:" + files.suspectFolder);
        alert("f:" + files.frackedFolder);
    }
	
function uploadButtonAppear(){
	//alert(document.getElementById("myFile").value);
    document.getElementById("upButtonDiv").innerHTML="<button class='button' id='upButton' onclick='uploadFile()'>Upload</button>";
}

function uploadFile(){
	let elFile = document.getElementById("myFile");
    for(let i = 0; i < elFile.files.length; i++){
    let upJson = elFile.files[i];
    if(elFile.value.slice(-5) == "stack"){
	files.uploadCloudCoinFromJsonFile(upJson, files.saveCloudCoinToJsonFile);
    } else if(elFile.value.slice(-4) == "jpeg" || elFile.value.slice(-4) == "jfif" || elFile.value.slice(-3) == "jpg"){
        files.uploadCloudCoinFromJpegFile(upJson, files.saveCloudCoinToJsonFile);
    } else{alert("Valid File Type Please");}
    }
	setTimeout(function(){
		detect.detectAllSuspect(updates);
        
        //let importer = new Importer();
    //let coins = importer.importAll(fileUtil);
		//coins.forEach(coinlist);
		//updateTotal(fileUtil);
		}, 500);
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
}

function updates(cc, fileUtil)
{
    coinlist(cc, fileUtil);
    updateTotal(fileUtil);
	//mindlist();
}

function trash(id)
{
    
        document.getElementById(id).remove();
        
        
		
        localStorage.removeItem(id);
        updateTotal(files);
}

function trashFolder(folder)
{
    let fnames = [];
    
    for(var j = 0; j< localStorage.length; j++){
            if(folder.includes(localStorage.key(j)))
            fnames.push(localStorage.key(j));
    }

    for(let i = 0; i < fnames.length; i++){
        trash(fnames[i]);}
}

function embedCC(cc)
{
    //alert(files.bankFolder);
    let oldImg = document.getElementById("jpeg-in").files[0];
    files.embedOneCloudCoinToJpeg(oldImg, cc, function(img){document.getElementById("jpeg-out").innerHTML+=img.outerHTML});

}

function embedTemplateCC(cc)
{
    //alert(files.bankFolder);
    //let oldImg = document.getElementById("jpeg-in").files[0];
	let oldImg = new Image();
	//oldImg.crossorigin = "use-credentials";
	var c = document.createElement("canvas");
var ctx = c.getContext("2d");

oldImg.onload = function() {
  c.width = this.naturalWidth;     // update canvas size to match image
  c.height = this.naturalHeight;
  ctx.drawImage(this, 0, 0);       // draw in image
  c.toBlob(function(blob) {        // get content as JPEG blob
    files.embedOneCloudCoinToJpeg(blob, cc, function(img){document.getElementById("jpeg-out").innerHTML+=img.outerHTML});
  }, "image/jpeg", 0.75);
};
 switch(cc.getDenomination()){
	case 1:
	oldImg.src = "core/jpeg1.jpg";
	break;
	case 5:
	oldImg.src = "core/jpeg5.jpg";
	break;
	case 25:
	oldImg.src = "core/jpeg25.jpg";
	break;
	case 100:
	oldImg.src = "core/jpeg1002.jpg"
	break;
	case 250:
	oldImg.src = "core/jpeg250.jpg"
	break;
 }
}

function mindStorage(callback)
{
	
	let usern = document.getElementById("email").value;
	let passw = document.getElementById("user").value;
	passw += document.getElementById("pass").value;
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
	if(document.getElementById("user").value == document.getElementById("pass").value)
	{
		alert("Username and Password cannot be the same");
	}else if(phrase1.length + phrase2.length < 24)
	{
		alert("Username or Password is too short");
	}else if(usern[0] == /\s/ || usern[usern.length-1] == /\s/)
	{
		alert("Remove whitespace from the front and end of the Email");
	}else if(passw[0] == /\s/ || passw[passw.length-1] == /\s/){
		alert("Remove whitespace from the front and end of the Username and Password");
	}else
	{
		for(let i = 0; i < phrasesize; i++){
			if(i<phrase1.length)
			combPhrase += phrase1[i];
			if(i<phrase2.length)
			combPhrase += phrase2[i];
		}
		console.log(combPhrase);
		for(let k = 0; k < 800/combPhrase.length;k++)
			fullAn += combPhrase;
		fullAn = fullAn.slice(0, 800);
		for(let l = 0; l < 25; l++)
			pan.push(fullAn.slice(l*32, (l+1)*32));
			
			callback(pan);
		
	}
	
}

function moveFromMind(pan)
{
	let fnames = [];
	for(var j = 0; j< localStorage.length; j++){
            if(localStorage.getItem(localStorage.key(j)) == "mindstorage"){
			if(document.getElementById("mcb" + localStorage.key(j)).checked)
			fnames.push(localStorage.key(j));
			}
        }
	for(let i = 0; i < fnames.length; i++)
	{
		let cc = new CloudCoin(1, fnames[i], pan);
		files.saveCloudCoinToJsonFile(cc, cc.sn);
		files.writeTo("suspect", cc.sn);
	}
	detect.detectAllSuspect(updates);
}

function moveToMind(newPan)
{
	//alert(newPan);
	let toBeMoved = [];
	for(let j = 0; j < localStorage.length; j++){
        if(document.getElementById("cb" + localStorage.key(j)).checked)
		toBeMoved.push(files.loadOneCloudCoinFromJsonFile(localStorage.key(j)));
    }
	let promises = [];
	for(let i = 0; i<toBeMoved.length; i++){
		toBeMoved[i].pans = newPan;
		//files.overWrite(toBeMoved[i].getFolder().toLowerCase(), "suspect", toBeMoved[i].sn)
		promises.push(raida.detectCoin(toBeMoved[i]))
		trash(toBeMoved[i].sn);
		localStorage.setItem(toBeMoved[i].sn, "mindstorage");
	}
	Promise.all(promises).then(function(){mindlist();});
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