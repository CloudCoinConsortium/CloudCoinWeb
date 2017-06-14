function populate(rr, id)
{
    document.getElementById("r_" + id).innerHTML = rr.outcome;
    document.getElementById("p_" + id).innerHTML = rr.milliseconds;
}

function coinlist(cc)
{
    if(document.getElementById(cc.sn) != null){document.getElementById(cc.sn).remove()}
    let listname = "coinlist" + cc.getFolder().toLowerCase();
    document.getElementById(listname).innerHTML +="<li id ='" +cc.sn + "'>sn:" + cc.sn + " pown:" + cc.pown + " denomination:" + cc.getDenomination() + " </li>";
    
}

function showFolder(){
        alert("cf:" + files.counterfeitFolder);
        alert("b:" + files.bankFolder);
        alert("s:" + files.suspectFolder);
        alert("f:" + files.frackedFolder);
    }