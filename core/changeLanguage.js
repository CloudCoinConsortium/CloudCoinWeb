function changeLanguage(folder)
{
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            changeAllText(this);
       }
    };
    xhttp.open("GET", "core/res/"+folder+"/strings.xml", true);
    xhttp.send(); 
}

function changeAllText(xml)
{
    let strings = xml.responseXML;
            let x = strings.getElementsByTagName("string");
            for(let i = 0; i<x.length; i++)
            {
                let place = x[i].attributes.getNamedItem("name").nodeValue;
                if(document.getElementById(place) != null)
                document.getElementById(place).innerHTML = x[i].childNodes[0].nodeValue;
            }
}