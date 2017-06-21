function populate(rr, id)
{
    document.getElementById("r_" + id).innerHTML = rr.outcome;
    document.getElementById("p_" + id).innerHTML = rr.milliseconds;
}

function coinlist(cc, fileUtil)
{
    let id = cc.sn;
    if(document.getElementById(id) != null){
        document.getElementById(id).remove();
        document.getElementById("tag"+id).remove();}
    let listname = "coinlist" + cc.getFolder().toLowerCase();
    let htmltext = "<li id = '"+id+"'>sn:" + id + " pown:" + cc.pown + " denomination:"
    + cc.getDenomination() + " tag:</li><input type='text' id ='tag" +id + "'>"
    + "<button id = 'dl"+id+"'>Download File</button><button id ='im"+id+"'>Download Image</button>";
    document.getElementById(listname).innerHTML += htmltext;
    //let tag = document.getElementById("tag"+ id); 
    let el = document.getElementById(listname);
    el.addEventListener("click",download);
    
}
function download(e)
{
    //let files = new FileUtils();
    let id = e.target.id.slice(2);
    let tag = document.getElementById("tag" + id)
    if(e.target.id == "dl" + id){
        files.downloadCloudCoinToJsonFile(id, tag.value);
    }else if(e.target.id == "im" + id)
    {
        //alert("clicked");
        embedCC(files.loadOneCloudCoinFromJsonFile(id));
    }
    //e.stopPropogation();
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
	for(let i = 0; i < document.getElementById("myFile").files.length; i++){
    let upJson = document.getElementById("myFile").files[i];
    
	fileUtil.uploadCloudCoinFromJsonFile(upJson, fileUtil.saveCloudCoinToJsonFile);
    }
	setTimeout(function(){
		let importer = new Importer();
    let coins = importer.importAll(fileUtil);
		coins.forEach(coinlist);
		updateTotal(fileUtil);
		}, 1000);
}

function updateTotal(fileUtil)
{
	let banker = new Banker();
    let total = banker.countCoins(fileUtil);
    document.getElementById("cointotal").innerHTML ="total: " + total[0];
}

function updates(cc, fileUtil)
{
    coinlist(cc, fileUtil);
    updateTotal(fileUtil);
}

function trash(fileUtil)
{
    let fnames = [];
    
    for(var j = 0; j< localStorage.length; j++){
            if(fileUtil.counterfeitFolder.includes(localStorage.key(j)))
            fnames.push(localStorage.key(j));
    }

    for(let i = 0; i < fnames.length; i++){
        document.getElementById(fnames[i]).remove();
        document.getElementById("tag"+fnames[i]).remove();
        document.getElementById("dl"+fnames[i]).remove();
        document.getElementById("dli"+fnames[i]).remove();
        localStorage.removeItem(fnames[i])}
}

function embedCC(cc)
{
    //alert(files.bankFolder);
    let oldImg = document.getElementById("jpeg-in").files[0];
    files.embedOneCloudCoinToJpeg(oldImg, cc, function(img){document.getElementById("jpeg-out").innerHTML= img.outerHTML});
}