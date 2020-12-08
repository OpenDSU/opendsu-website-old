


function changeCss(element){



		var url = element.getAttribute("src");
        var status;
            
        // create div and replace iframe
        let d = document.createElement('div');
        d.classList.add("embedded-doc"); // optional
        d.style.width = "100%";
        element.parentElement.replaceChild(d, element);

        // CORS request
        console.log('hello1');
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = function() {
                    // display response
                    console.log('hello2');
            splitResponse=xhr.responseText.split('<link');
            split2=splitResponse[1].split('.ico">')[1];
            responseWithCss=splitResponse[0]+'<link rel="stylesheet" href="/assets/css/rfcStyling.css">'+split2;
            tmpStatus=responseWithCss.split('&lt;status&gt;');
            status=tmpStatus[1];
            cleanResponse=tmpStatus[0]+tmpStatus[2];
            cleanResponse=cleanResponse.split('<div id="interval">')[0]+'<div id="interval"><p> Status: <span class="'+status+'">'+status+'</span></p></div></div><div id="contents">'+cleanResponse.split('<div id="contents">')[1];
            d.innerHTML = cleanResponse;
        };
        xhr.send();
       
	}



function getFrameContent(element){
    
    console.log(element.getAttribute("src"));
   //console.log(element.contents().find('div'));
       
}