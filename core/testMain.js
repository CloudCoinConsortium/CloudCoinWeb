function populate(rr, id)
{
    document.getElementById("r_" + id).innerHTML = rr.outcome;
    document.getElementById("p_" + id).innerHTML = rr.milliseconds;
}

function coinlist(cc)
{
    if(document.getElementById(cc.sn) != null){document.getElementById(cc.sn).remove()}
    let listname = "coinlist" + cc.getFolder().toLowerCase();
    document.getElementById(listname).innerHTML +="<li id ='" +cc.sn + "' onclick='files.downloadCloudCoinToJsonFile("+cc.sn+")'>sn:" + cc.sn + " pown:" + cc.pown + " denomination:" + cc.getDenomination() + " </li>";
    
}

function showFolder(){
        alert("cf:" + files.counterfeitFolder);
        alert("b:" + files.bankFolder);
        alert("s:" + files.suspectFolder);
        alert("f:" + files.frackedFolder);
    }
	
function uploadButtonAppear(){
	document.getElementById("upButtonDiv").innerHTML="<button id='upButton' onclick='uploadFile(files)'>Upload</button>";
}

function uploadFile(fileUtil){
	let upJson = document.getElementById("myFile").files[0];
    
	fileUtil.uploadCloudCoinFromJsonFile(upJson, fileUtil.saveCloudCoinToJsonFile);
	
	setTimeout(function(){
		let importer = new Importer();
    let coins = importer.importAll(fileUtil);
		coins.forEach(coinlist);
		updateTotal(fileUtil);
		}, 500);
}

function updateTotal(fileUtil)
{
	let banker = new Banker();
    let total = banker.countCoins(fileUtil);
    document.getElementById("cointotal").innerHTML ="total: " + total[0];
}

function updates(cc, fileUtil)
{
    coinlist(cc);
    updateTotal(fileUtil);
}