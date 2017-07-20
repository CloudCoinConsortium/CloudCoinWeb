function populateRaidaStatus(rr, id)
{
    document.getElementById("r_" + id).innerHTML = rr.outcome;
    document.getElementById("p_" + id).innerHTML = rr.milliseconds;
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
	document.getElementById("dial"+dem) = htmltext;
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
	if(sn != "" && !isNaN(parseFloat(sn)) && isFinite(sn) && sn > 0 && sn < 16777216)
	{
		localStorage.setItem(sn, "mindstorage");
		mindlist();
	}else {
		alert("Please Enter a valid serial number");
	}
}

function downloadImage()
{
    
    
    let fnames = [];
	for(var j = 0; j< localStorage.length; j++){
    if(localStorage.getItem(localStorage.key(j)) != "mindstorage"){     
	if(document.getElementById("cb" + localStorage.key(j)).checked)
 			fnames.push(localStorage.key(j));
	}
}
    for(let i =0 ; i<fnames.length; i++){
        if(document.getElementById("jpeg-in").files.length !== 0 && (document.getElementById("jpeg-in").value.slice(-4) == "jpeg" || document.getElementById("jpeg-in").value.slice(-4) == "jfif" || document.getElementById("jpeg-in").value.slice(-3) == "jpg"))
		{//alert("clicked");
        embedCC(files.loadOneCloudCoinFromJsonFile(fnames[i]));
        trash(fnames[i]);
		}else if(document.getElementById("jpeg-in").files.length === 0)
		{
			
			embedTemplateCC(files.loadOneCloudCoinFromJsonFile(fnames[i]));
			trash(fnames[i]);
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
    if(localStorage.getItem(localStorage.key(j)) != "mindstorage"){    
	if(document.getElementById("cb" + localStorage.key(j)).checked)
 			fnames.push(localStorage.key(j));
		}
	}
    let tag = document.getElementById("alltag").value;
    files.downloadAllCloudCoinToJsonFile(fnames, tag);
    for(let i = 0; i < fnames.length; i++){
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
    }

function importMode()
{
	document.getElementById("importHead").innerHTML ="Upload Coin";
	document.getElementById("importButtons").innerHTML = "<input type='file' id='myFile' multiple onchange='uploadButtonAppear()'><div id='upButtonDiv'></div>";
	document.getElementById("importStatus").innerHTML ="";
	emptyprogress('uploadProgress');
}
	
function uploadButtonAppear(){
	//alert(document.getElementById("myFile").value);
    document.getElementById("upButtonDiv").innerHTML="<button class='button' id='upButton' onclick='uploadFile()'>Upload</button>";
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

function updates(cc, fileUtil, percent=0, cfnames=0, bnames=0, frnames=0)
{
    coinlist(cc, fileUtil);
	scoinlist(cc, fileUtil);
    updateTotal(fileUtil);
	let msg = "";
	let fullHtml = "";
	if(bnames > 0 || frnames> 0)
	{
		if(bnames > 0)
			msg+= "Coin(s) to bank:" + bnames + "<br>";
		if(frnames > 0)
			msg+= "Coin(s) that are fracked:" + frnames + "<br>";
		fullHtml = "<div class='callout success'>"
		+ msg + "</div>";
	}
	if(cfnames > 0)
	{
		fullHtml +="<div class='callout alert'>Coin(s) that are counterfeit:"
		+ cfnames + "</div>";
	}
	document.getElementById("importStatus").innerHTML = fullHtml;
	document.getElementById("uploadProgress").style.width = percent +"%";
	if(percent == 100){
	document.getElementById("uploadProgress").innerHTML="<p class='progress-meter-text'>done</p>";
	
	document.getElementById("importHead").innerHTML = "Import Complete";
	}
	document.getElementById("importButtons").innerHTML= "";
	mindlist();
	sortTable("coinlistbank");
	sortTable("coinlistfracked");
	sortTable("mcoinlistbank");
	sortTable("mcoinlistfracked");
}

function updatesFromMind(cc, fileUtil, percent = 0, cfnames=0, bnames=0, frnames=0)
{
	document.getElementById("mindProgress").style.width = percent +"%";
	if(percent == 100)
	document.getElementById("mindProgress").innerHTML="<p class='progress-meter-text'>done</p>";
	let msg = "";
	let fullHtml = "";
	if(bnames > 0 || frnames > 0)
	{
		if(bnames > 0)
			msg+= "Coin(s) to bank:" + bnames + "<br>";
		if(frnames > 0)
			msg+= "Coin(s) that are fracked:" + frnames+ "<br>";
		fullHtml = "<div class='callout success'>"
		+ msg + "</div>";
	}
	if(cfnames > 0)
	{
		 fullHtml +="<div class='callout alert'>Coin(s) that are counterfeit"
		+ "(You may have mispelled something.):" + cfnames + "</div>";
	}
	document.getElementById("fromMindStatus").innerHTML = fullHtml;
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
        files.overWrite("", "", id);
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
	let tag = cc.getDenomination() + ".cloudcoin.1." + cc.sn + ".";
	if(document.getElementById("alltag").value !== ""){
	tag += document.getElementById("alltag").value;
	} else {
		tag += "image";
	}
	tag += ".jpg";
    let oldImg = document.getElementById("jpeg-in").files[0];
    files.embedOneCloudCoinToJpeg(oldImg, cc, function(img){
		saveAs(img, tag);
	});

}

function embedTemplateCC(cc)
{
    //alert(files.bankFolder);
    //let oldImg = document.getElementById("jpeg-in").files[0];
	let oldImg = new Image();
	let tag = cc.getDenomination() + ".cloudcoin.1." + cc.sn + ".";
	tag += document.getElementById("alltag").value;
	tag+= ".jpg";
	//oldImg.crossorigin = "use-credentials";
	var c = document.createElement("canvas");
var ctx = c.getContext("2d");

oldImg.onload = function() {
  c.width = this.naturalWidth;     // update canvas size to match image
  c.height = this.naturalHeight;
  ctx.drawImage(this, 0, 0);       // draw in image
  ctx.font = "20px Arial";
 ctx.fillStyle = 'white';
 ctx.fillText(cc.sn + " of 16777216 on N: 1" , 40, 58);
  c.toBlob(function(blob) {        // get content as JPEG blob
	files.embedOneCloudCoinToJpeg(blob, cc, function(img){
		saveAs(img, tag);
	});
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
	 usern = document.getElementById("email").value;
	 passw = document.getElementById("user").value;
	passw += document.getElementById("pass").value;
	} else {
		 usern = document.getElementById("email2").value;
	     passw = document.getElementById("user2").value;
	     passw += document.getElementById("pass2").value;
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
		
		alert("Username and Password cannot be the same")// +
		//document.getElementById("user").value + " pass:" + document.getElementById("pass").value
		//);
	}else if((document.getElementById("user2").value == document.getElementById("pass2").value)&& callback.name == "moveToMind")
	{
		
		alert("Username and Password cannot be the same")// +
		//document.getElementById("user").value + " pass:" + document.getElementById("pass").value
		//);
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
	for(let j = 0; j < localStorage.length; j++){
        if(localStorage.getItem(localStorage.key(j)) != "mindstorage"){
		if(document.getElementById("scb" + localStorage.key(j)).checked){
		toBeMoved.push(files.loadOneCloudCoinFromJsonFile(localStorage.key(j)));
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
