function populate(rr, id)
{
    document.getElementById("r_" + id).innerHTML = rr.outcome;
    document.getElementById("p_" + id).innerHTML = rr.milliseconds;
}

function coinlist(cc)
{
    document.getElementById("coinlist").innerHTML +="<li>sn:" + cc.sn + " pown:" + cc.pown + " denomination:" + cc.getDenomination() + " </li>";
}