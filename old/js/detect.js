/*Version 12/17/2016*/

var protocol = "http";
function checkConn() {
    //Loop through every server and connect to them.
    for (var j = 0; j < obj.server.length; j++) {
        // alert(  "url : " + obj.server[j].url + " name: "+ obj.server[j].name);
        connect(obj.server[j].url, obj.server[j].name, j, obj.server[j].ext, obj.server[j].port, obj.server[j].protocol );
    }//end for
} //end check Connectivity

function connect($serverAddress, $name, j, $ext, $port, $protocol) {
    obj.server[j].status = "unknown";
    var HIDRA = new XMLHttpRequest();
    HIDRA.onreadystatechange = function () {
        if (HIDRA.readyState == 4 && HIDRA.status == 200) {
            var request_time = new Date().getTime() - start_time;
            var jsonResponse = JSON.parse(HIDRA.responseText); // alert("Server: " + jsonResponse.server + "\nStatus: " + jsonResponse.status );
            console.log("Server: " + $name + ". Status: " + jsonResponse.status + ". Time to process: " + request_time + " ms<br>");
            if (jsonResponse.status == "ready") {
                obj.server[j].status = "ready";
                obj.server[j].ms = request_time;
                document.getElementById($name).innerHTML = request_time + "<br>ms";  //  console.log("TS: " + $name);
                document.getElementById($name).className = "tiny success button size-24"; // console.log("Server name " + $name + "-cap");
            } else {
                document.getElementById($name).className = "tiny alert button size-24";
                obj.server[j].status = "error";
            } //end if else good!
        } else {
            document.getElementById($name).className = "tiny alert button size-24";
            obj.server[j].status = "no_contact";
        } //end if status 200 ready state 4
        // alert(RAID.responseText);
    }; //End on ready state change

    HIDRA.open("GET", $protocol + "://" + $serverAddress +":" + $port  +"/service/echo" , true);

    var start_time = new Date().getTime();
    HIDRA.send();
} //end connect

function detectAll(i, mode) {
    //GET SPINNER SPINNING
    for (var s = 0; s < obj.server.length; s++) {
        if (obj.server[s].status == "ready") {
            document.getElementById(obj.server[s].name + "-" + coins[i].coinID + "detect").className = "tiny secondary button spinner";
        } else {
            document.getElementById(obj.server[s].name + "-" + coin[i].coinID + "detect").className = "tiny secondary button";
            pies[i].moneystatus[s] = "0";//0 is unknown
        }//end of server connection passed
    }//end for each server


    switch (mode) {
        // case "test":
        //   coins[i].pans = ["391cde155abe4c9d81a646b601d02ba6", "391cde155abe4c9d81a646b601d02ba6", "391cde155abe4c9d81a646b601d02ba6", "391cde155abe4c9d81a646b601d02ba6", "391cde155abe4c9d81a646b601d02ba6", "391cde155abe4c9d81a646b601d02ba6", "391cde155abe4c9d81a646b601d02ba6", "391cde155abe4c9d81a646b601d02ba6", "391cde155abe4c9d81a646b601d02ba6", "391cde155abe4c9d81a646b601d02ba6", "391cde155abe4c9d81a646b601d02ba6", "391cde155abe4c9d81a646b601d02ba6", "391cde155abe4c9d81a646b601d02ba6", "391cde155abe4c9d81a646b601d02ba6", "391cde155abe4c9d81a646b601d02ba6", "391cde155abe4c9d81a646b601d02ba6", "391cde155abe4c9d81a646b601d02ba6", "391cde155abe4c9d81a646b601d02ba6", "391cde155abe4c9d81a646b601d02ba6", "391cde155abe4c9d81a646b601d02ba6", "391cde155abe4c9d81a646b601d02ba6", "391cde155abe4c9d81a646b601d02ba6", "391cde155abe4c9d81a646b601d02ba6", "391cde155abe4c9d81a646b601d02ba6", "391cde155abe4c9d81a646b601d02ba6"];
        //  break;
        case "check":
            alert("We will now check to see if the Authenticty Numbers are correct with the RAIDA. The Authenticty Numbers will not be changed. If some servers fail, they may still have acurate authenticty numbers.");

            //do not change the ANs on the server
            coins[i].pans = coins[i].ans.slice(0);
            //coins[i].dumpVals();
            break;
        case "take":
            alert("We will now attempt to change ownership through the RAIDA Servers. If some servers fail, you may still be able to fix afterwards. This file will save automatically but not overwrite the current file.");

            coins[i].pans = [generateUUID(), generateUUID(), generateUUID(), generateUUID(), generateUUID(), generateUUID(), generateUUID(), generateUUID(), generateUUID(), generateUUID(), generateUUID(), generateUUID(), generateUUID(), generateUUID(), generateUUID(), generateUUID(), generateUUID(), generateUUID(), generateUUID(), generateUUID(), generateUUID(), generateUUID(), generateUUID(), generateUUID(), generateUUID()];
            break;
        case "passphrase":
            //Repeat passphrase over and over to fill all the gaps.
            //Future Expansion
            break;
        case "barcode":
            //Change all so that the first parts of the guid are know by user and the others are . 
            //Future expansion
            break;

    }//end switch

    var $url = [];
    var j = 0;
    var boxid = "";

    for (var s = 0; s < obj.server.length; s++) {
        boxid = obj.server[s].name + "-" + coins[i].coinID + "detect";
        //console.log("boxid = " + boxid);
        if (obj.server[s].status == "ready") {
            detectOne(protocol + "://" + obj.server[s].url + "/service/detect.aspx?" + coins[i].fixedUrl + "&an=" + coins[i].ans[s] + "&pan=" + coins[i].pans[s] + "&denomination=" + coins[i].nom, s, obj.server[s].name, boxid, i);
        }//end if not error
    }//end for each server

}//end detect Primaries

function detectOne(url, s, $name, boxid, i) {

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        var request_time = new Date().getTime() - start_time;

        if (xhr.readyState == 4 && xhr.status != 200) {
            detectCount++;//one failed. 
            alert("RAIDA " + s + " had issues: " + xhr.responseText);
            coins[i].moneystatus[s] = "0";//0 for unknown. 
            document.getElementById(boxid).setAttribute("onClick", "javascript: detectOnlyOne(" + s + ", " + i + "); ");
            document.getElementById(boxid).className = "warning tiny button fi-wrench";
        }//end on ready state open


        if (xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById(boxid).className = "warning tiny button";
            //alert("String for " + $name + "" + xhr.responseText );
            if (xhr.responseText == "") {
                alert("RAIDA Array " + $name + " did not repond.");
                coins[i].moneystatus[s] = "0";//zero is unknown
                detectCount++;
                return;
            }//end if JSON
            //Check to see the server's response was blanke.
            var jsonResponse = JSON.parse(xhr.responseText);
            console.log("Server: " + $name + "\nStatus: " + jsonResponse.status + ". Time to process: " + request_time + " ms<br>");


            switch (jsonResponse.status) {
                case "fail":
                    document.getElementById(boxid).className = "alert tiny button fi-wrench";
                    coins[i].moneystatus[s] = "f";//f for fail
                    detectCount++;
                    document.getElementById(boxid).setAttribute("onClick", "javascript: fixRedundancy(" + s + "," + i + ");");
                    break;
                case "pass":
                    document.getElementById(boxid).className = "success tiny button fi-like";
                    coins[i].moneystatus[s] = "1";//1 for pass
                    coins[i].ans[s] = coins[i].pans[s];
                    detectCount++;
                    break;
                default:
                    // alert("Error: " + xhr.responseText );
                    detectCount++;
                    break;
            }//end switch
        } else {
            document.getElementById(obj.server[s].name + "-" + coins[i].coinID + "detect").className = "secondary tiny spinner button";
            //alert("Error: Server "+s +" says " + xhr.responseText );

        } //end if status 200 ready state 4

        if (detectCount == 25) {
            coins[i].calcExpDate();
            document.getElementById(coins[i].coinID + "ownership").className = "alert small button";
            document.getElementById(coins[i].coinID + "ownership").value = "You Now Own This";
            document.getElementById(coins[i].coinID + "gradeWord").value = coins[i].getExpDate();
            alert("Detection Complete. Your Authentication Numbers have been changed. Your CloudCoin will now be saved.");
        }
    }//end readystate change

    xhr.open("GET", url, true);
    var start_time = new Date().getTime();
    xhr.send(null);

}//end detect 3

function detectOnlyOne(s, i) {
    let pan = generateUUID();
    coins[i].pans[s] = pan;
    let url = "https://" + obj.server[s].url + "/service/detect.aspx?" + coins[i].fixedUrl + "&an=" + coins[i].ans[s] + "&pan=" + coins[i].pans[s] + "&denomination=" + coins[i].nom;
    let $name = obj.server[s].name;
    let boxid = obj.server[s].name + "-" + coins[i].coinID + "detect";
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {

        var request_time = new Date().getTime() - start_time;
        if (xhr.readyState == 4 && xhr.status != 200) {
            alert("RAIDA " + s + " had issues Please try again later. The error status was: " + xhr.status);
            document.getElementById(boxid).className = "secondary tiny button fi-wrench";
            return;
        }//end on ready state open

        if (xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById(boxid).className = "warning tiny button";
            //alert("String for " + $name + "" + xhr.responseText );
            if (xhr.responseText == "") {
                alert("RAIDA Array " + $name + " did not repond.");
                coins[i].moneystatus[s] = "0";//zero is unknown
                detectCount++;
                return;
            }//end if JSON
            //Check to see the server's response was blanke.
            var jsonResponse = JSON.parse(xhr.responseText);
            console.log("Server: " + $name + "\nStatus: " + jsonResponse.status + ". Time to process: " + request_time + " ms<br>");


            switch (jsonResponse.status) {
                case "fail":
                    document.getElementById(boxid).className = "alert tiny button fi-wrench";
                    coins[i].moneystatus[s] = "f";//f for fail
                    detectCount++;
                    document.getElementById(boxid).setAttribute("onClick", "javascript: fixRedundancy(" + s + "," + i + ");");
                    break;
                case "pass":
                    document.getElementById(boxid).className = "success tiny button fi-like";
                    coins[i].moneystatus[s] = "1";//1 for pass
                    coins[i].ans[s] = coins[i].pans[s];
                    detectCount++;
                    break;
                default:
                    // alert("Error: " + xhr.responseText );
                    detectCount++;
                    break;
            }//end switch
        } else {
            document.getElementById(obj.server[s].name + "-" + coins[i].coinID + "detect").className = "secondary tiny spinner button";
            //alert("Error: Server "+s +" says " + xhr.responseText );

        } //end if status 200 ready state 4

        // document.getElementById(coins[i].coinID + "ownership").className = "alert small button";
        //  document.getElementById(coins[i].coinID + "ownership").value = "You Now Own This";
        //document.getElementById(coins[i].coinID + "gradeword").value = coins[i].getExpDate();
        //alert("Detection Complete. Your Authentication Number have been changed. Your CloudCoin will now be saved.");

    }//end readystate change

    xhr.open("GET", url, true);
    var start_time = new Date().getTime();
    xhr.send(null);
}//end detect 3


function download(binaryText, name) {
    var a = document.createElement("a");
    var buf = str2ab(binaryText);
    var fileNew = new Blob([buf], { type: "image/jpeg" });
    a.href = URL.createObjectURL(fileNew);
    a.download = name;
    a.click();
}//End download

function fixRedundancy(s, i) {
    if (obj.server[s].status == "ready") {
        document.getElementById(obj.server[s].name + "-" + coins[i].coinID + "detect").className = "tiny secondary button spinner";
    } else {
        alert("Server cannot be fixed because it is not available. Try checking the connection by pressing the CHECK button.");
    }//end if server can be contacted
    // alert("s is " + s + " " + i);
    contactServers = [];//reset array
    //Choose neighboring servers
    var b1 = s - 1;
    var f1 = s + 1;
    var b5 = s - 5;
    var f5 = s + 5;

    //Make sure the servers are between 0 and 24
    if (b1 < 0) { b1 = b1 + 25; }
    if (f1 > 24) { f1 = f1 - 25; }
    if (b5 < 0) { b5 = b5 + 25; }
    if (f5 > 24) { f5 = f5 - 25; }

    //See if horizontal pair is there, if not go to vertical pair. 
    if (coins[i].moneystatus[b1] == "1" && coins[i].moneystatus[f1] == "1") {
        //	 alert ("b1: "+ b1 + " f1"+ f1);
        contactServers = [b1, f1];
        fixBroken(i, s);
    } else if (coins[i].moneystatus[b5] == "1" && coins[i].moneystatus[f5] == "1") {
        contactServers = [b5, f5];
        fixBroken(i, s);
    } else {
        alert("cannot fix. Try fixing other servers first.");
    }
} //end fix Redundancy

function fixBroken(i, $to) {
    var idName1 = obj.server[$to].name + "-" + coins[i].coinID + "detect";
    //alert(contactServers[0] );
    messageCount = 0;
    messages = [];
    times = [];

    var url = protocol + "://" + obj.server[contactServers[0]].url + "/service/get_ticket?" + coins[i].fixedUrl + "&toserver=" + $to + "&an=" + coins[i].ans[contactServers[0]] + "&pan=" + coins[i].ans[contactServers[0]] + "&denomination=" + coins[i].nom;
    var url2 = protocol + "://" + obj.server[contactServers[1]].url + "/service/get_ticket?" + coins[i].fixedUrl + "&toserver=" + $to + "&an=" + coins[i].ans[contactServers[1]] + "&pan=" + coins[i].ans[contactServers[1]] + "&denomination=" + coins[i].nom;
    var urlp = protocol + "://" + obj.server[$to].url + "/service/fix?";

    // alert("url " + url3 + " idName1 " + idName1 + " from " + $from3 + " to " +  $to);
    getMessage(url, contactServers[0], urlp, i, $to, coins[i].guid);
    getMessage(url2, contactServers[1], urlp, i, $to, coins[i].guid);

}//end fix parity 

function getMessage(url, $from1, urlp, i, $to, guid) {
    var idName1 = obj.server[$to].name + "-" + coins[i].coinID + "detect";
    $.get(url, function (data, status) {
        var jsonResponse2 = JSON.parse(data);
        console.log(obj.server[$from1].name + ":  " + data);
        if (jsonResponse2.status != "ticket") //See if the responding server is the first one
        {
            alert("Failed to fix server.");
            return;
        }

        if (jsonResponse2.server == "RAIDA" + contactServers[0]) //See if the responding server is the first one
        {
            messages[0] = jsonResponse2.message;//It was the first server
        } else {
            messages[1] = jsonResponse2.message;//it was the second server
        }//end if ticket
        messageCount++;
        if (messages.length == 2) {//both messages have returned something
            //call  
            //	alert( "m1 " +messages[0] + " m2 " + messages[1]);
            coins[i].pans[$to] = generateUUID();
            var pan = coins[i].pans[$to];
            //Thishas been fucked up fromserver12 should be 1


            $.get(urlp + "fromserver1=" + contactServers[0] + "&message1=" + messages[0] + "&fromserver2=" + contactServers[1] + "&message2=" + messages[1] + "&pan=" + pan, function (data, status) {
                var jsonResponse2 = JSON.parse(data);
                console.log(obj.server[$to].name + ":  " + data);
                if (jsonResponse2.status == "success") //The server that was broken is now fixed
                {
                    document.getElementById(idName1).className = "tiny success button fi-like";
                    coins[i].moneystatus[$to] = "1";//1 for pass
                    coins[i].ans[$to] = pan;

                    alert("Server fixed. Now saving money.");

                    save(i);
                } else {
                    alert("Failed to fix server.");
                }//end if fixed	
            }).fail(function () {
                alert("Failed to fix on server. Fix another server first or try again later.");
            }) //end if failed!	





        }//end if message Coutn = 2
    }).fail(function () {
        alert("Failed to fix server. Failed in getMessage.");
        console.log(data);
        return jsonResponse2.status;
    }) //end if failed!
}//end getMessage

function generateUUID() {
    var r = new Random();
    var uuid = 'xxxxxxxxxxxxxxxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var ran = r.integer(0, 15);
        return (c == 'x' ? ran : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid.toUpperCase();
}

function readCoinCloudjpg(file, i) {
    //We read the file three times
    //1. The second as a byte array so that the cloudcoin fields can be read
    //2. First time is to read it as a URL to put the image on the doc
    //3. The third time as a binary string to get the rest of the image for saving
    var reader = new FileReader();
    console.log(i);
    reader.onloadend = function (evt) {
        if (evt.target.readyState == FileReader.DONE) { // DONE == 2 //  alert("Done Reading Blob " + i);
            let raw = evt.target.result; //	alert(raw);
            let imagePartArray = [];
            imagePartArray[0] = new Uint8Array(raw.slice(20, 36));//First Authentic
            imagePartArray[1] = new Uint8Array(raw.slice(36, 52));
            imagePartArray[2] = new Uint8Array(raw.slice(52, 68));
            imagePartArray[3] = new Uint8Array(raw.slice(68, 84));
            imagePartArray[4] = new Uint8Array(raw.slice(84, 100));
            imagePartArray[5] = new Uint8Array(raw.slice(100, 116));
            imagePartArray[6] = new Uint8Array(raw.slice(116, 132));
            imagePartArray[7] = new Uint8Array(raw.slice(132, 148));
            imagePartArray[8] = new Uint8Array(raw.slice(148, 164));
            imagePartArray[9] = new Uint8Array(raw.slice(164, 180));
            imagePartArray[10] = new Uint8Array(raw.slice(180, 196));
            imagePartArray[11] = new Uint8Array(raw.slice(196, 212));
            imagePartArray[12] = new Uint8Array(raw.slice(212, 228));
            imagePartArray[13] = new Uint8Array(raw.slice(228, 244));
            imagePartArray[14] = new Uint8Array(raw.slice(244, 260));
            imagePartArray[15] = new Uint8Array(raw.slice(260, 276));
            imagePartArray[16] = new Uint8Array(raw.slice(276, 292));
            imagePartArray[17] = new Uint8Array(raw.slice(292, 308));
            imagePartArray[18] = new Uint8Array(raw.slice(308, 324));
            imagePartArray[19] = new Uint8Array(raw.slice(324, 340));
            imagePartArray[20] = new Uint8Array(raw.slice(340, 356));
            imagePartArray[21] = new Uint8Array(raw.slice(356, 372));
            imagePartArray[22] = new Uint8Array(raw.slice(372, 388));
            imagePartArray[23] = new Uint8Array(raw.slice(388, 404));
            imagePartArray[24] = new Uint8Array(raw.slice(404, 420));//last AN
            imagePartArray[25] = new Uint8Array(raw.slice(420, 436));//Owner
            imagePartArray[26] = new Uint8Array(raw.slice(436, 449));//status
            imagePartArray[27] = new Uint8Array(raw.slice(449, 451));//expiration date
            imagePartArray[28] = new Uint8Array(raw.slice(451, 452));//Network
            imagePartArray[29] = new Uint8Array(raw.slice(452, 455));//SN

            //INITIALIZE ALL PARTS TO EMPTY STRINGS
            var value = "", // Set them all to empty string
             size = 30, // There are 30 parts to the cloudcoin format
            part = Array.apply(null, { length: size }).map(function () { return value; });
            for (var c = 0; c < imagePartArray.length; c++) {
                for (var ii = 0; ii < imagePartArray[c].length; ii++) {
                    part[c] += pad_with_zeroes(imagePartArray[c][ii].toString(16), 2);
                }
                //console.log("Part "+ c +" is " + part[c]);
            }//end for c

            coins.push(new Unit(part, i));
            console.log("SN is " + coins[i].sn);

            var fileReader2 = new FileReader();

            //READ url
            fileReader2.onload = function (fileLoadedEvent) {
                var srcData = fileLoadedEvent.target.result; // <--- data: base64
                var newImage = document.createElement('img');

                newImage.src = srcData;
                //READ AS BINARY STRING TO GET START AND END FOR WRITING
                var fileReader3 = new FileReader();
                fileReader3.readAsBinaryString(coincloudjpg);
                fileReader3.onloadend = function (evt3) {
                    if (evt3.target.readyState == FileReader.DONE) { // DONE == 2
                        //  alert("Done Reading Blob " + i);
                        let raw3 = evt3.target.result;
                        coins[i].startFile = raw3.slice(0, 20);
                        coins[i].endFile = raw3.slice(455);
                        coins[i].dataUri = window.btoa(raw3);

                        // Render thumbnail.
                        var span = document.createElement('span');
                        var text = document.getElementById('template').innerHTML;
                        var goodtext = coins[i].replaceText(text);//alert("text " + goodtext);
                        span.innerHTML = goodtext;
                        document.getElementById('moneyGoesHere').insertBefore(span, null);

                        //	alert(raw);
                    }//ened if filereader 3 done
                }//end onloadend file reader 3
            }
            //READ AS URL TO SHOW ON PAGE
            fileReader2.readAsDataURL(coincloudjpg);
        }//end if
    };
    var coincloudjpg = file.slice(0);
    reader.readAsArrayBuffer(coincloudjpg);
}//End readCoinCloudjpg

function save(i) {
    //Checks to see which servers passed and then writes that data to the harddrive.
    alert("Your money will be saved as " + coins[i].getTitle() + ". You may delete older versions as they are now unusable.");
    var a = document.createElement("a");
    //alert( str2ab(coins[i].getSaveContentsJpg()) );
    var buf = str2ab(coins[i].getSaveContentsJpg());
    var fileNew = new Blob([buf], { type: "image/jpeg" });
    a.href = URL.createObjectURL(fileNew);
    a.download = coins[i].getTitle();
    a.click();
    //document.getElementById(coins[i].coinID).remove();
    //coins.splice(i, 1);
}//end money

function str2ab(str) {
    var buf = new ArrayBuffer(str.length); // 2 bytes for each char
    var bufView = new Uint8Array(buf);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}

function pad_with_zeroes(number, length) {
    var my_string = '' + number;
    while (my_string.length < length) { my_string = '0' + my_string; }
    return my_string;
}//end pad with zeros
