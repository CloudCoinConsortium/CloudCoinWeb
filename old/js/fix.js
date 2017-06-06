function fixer(trustedRAIDA1Url,trustedRAIDA2Url,fracturedURL,idName1,s,i,pan){"use strict";function getTicket1(callback){console.log("getting Ticket 1")
var xhttp=new XMLHttpRequest();xhttp.onreadystatechange=function(){if(this.readyState==4&&this.status==200){var jsonResponse1=JSON.parse(this.responseText);console.log(jsonResponse1.server+":  "+ this.responseText);if(jsonResponse1.status!="ticket")
{alert("Failed to fix RAIDA. The first trusted RAIDA would not provide a ticket vouching for authenticity");return;}
fracturedURL+="&message1="+ jsonResponse1.message;;callback&&callback();}};xhttp.open("GET",trustedRAIDA1Url,true);xhttp.send();}
function getTicket2(callback){console.log("getting Ticket 2")
var xhttp=new XMLHttpRequest();xhttp.onreadystatechange=function(){if(this.readyState==4&&this.status==200){var jsonResponse2=JSON.parse(this.responseText);console.log(jsonResponse2.server+":  "+ this.responseText);if(jsonResponse2.status!="ticket")
{alert("Failed to fix RAIDA. The second trusted RAIDA would not provide a ticket vouching for authenticity");return;}
fracturedURL+="&message2="+ jsonResponse2.message;callback&&callback();}};xhttp.open("GET",trustedRAIDA2Url,true);xhttp.send();}
function getFix(){console.log("Fixing the fractured RAIDA")
var xhttp=new XMLHttpRequest();xhttp.onreadystatechange=function(){if(this.readyState==4&&this.status==200){var jsonResponse3=JSON.parse(this.responseText);console.log(jsonResponse3.server+":  "+ this.responseText);if(jsonResponse3.status!="success")
{document.getElementById(idName1).className="tiny alert button fi-wrench";coins[i].moneystatus[s]="f";alert("Failed to fix RAIDA "+ jsonResponse3.message);return;}
document.getElementById(idName1).className="tiny success button fi-like";coins[i].moneystatus[s]="1";console.log("Pan is "+ pan);coins[i].ans[s]=pan;alert("The RAIDA is fixed. You will need to save before exiting your browser.");return;}};xhttp.open("GET",fracturedURL,true);xhttp.send();}
this.fixIt=function(){getTicket1(function(){getTicket2(function(){getFix(function(){});});});}}
