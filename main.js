
function isHomePage() {

  return location.pathname === "/";
}

function isExperiencePage() {

  return location.pathname.split("/")[1] === "product";
  
}


createYoutubeEmbed = (key) => {
  return '<iframe width="100%" height="400" src="https://www.youtube.com/embed/' + key + '" frameborder="0" allowfullscreen></iframe><br/>';
};

transformYoutubeLinks = (text) => {
  if (!text) return text;
  const self = this;

  const linkreg = /(?:)<a([^>]+)>(.+?)<\/a>/g;
  const fullreg = /(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([^& \n<]+)(?:[^ \n<]+)?/g;
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^& \n<]+)(?:[^ \n<]+)?/g;

  let resultHtml = text;  

  // get all the matches for youtube links using the first regex
  const match = text.match(fullreg);
  if (match && match.length > 0) {
    // get all links and put in placeholders
    const matchlinks = text.match(linkreg);
    if (matchlinks && matchlinks.length > 0) {
      for (var i=0; i < matchlinks.length; i++) {
        resultHtml = resultHtml.replace(matchlinks[i], "#placeholder" + i + "#");
      }
    }

    // now go through the matches one by one
    for (var i=0; i < match.length; i++) {
      // get the key out of the match using the second regex
      let matchParts = match[i].split(regex);
      // replace the full match with the embedded youtube code
      resultHtml = resultHtml.replace(match[i], self.createYoutubeEmbed(matchParts[1]));
    }

    // ok now put our links back where the placeholders were.
    if (matchlinks && matchlinks.length > 0) {
      for (var i=0; i < matchlinks.length; i++) {
        resultHtml = resultHtml.replace("#placeholder" + i + "#", matchlinks[i]);
      }
    }
  }
  return resultHtml;
};




if(isExperiencePage()) {



var video_01 = Array.prototype.slice.call(element.querySelectorAll('ul.list-unstyled li strong'))
  .filter(function (el) {
    return (el.innerText.indexOf("video_01") !== -1)
  })[0];

if(video_01 && video_01.parentElement && video_01.parentElement.querySelector("a")) {
  
  var video_01_key = transformYoutubeLinks(video_01.parentElement.querySelector("a").getAttribute("href")) ;
   console.log('found video_01_key = ',video_01_key);

	   
     
     }
	document.querySelector(".carousel.slide").insertAdjacentHTML("beforebegin", video_01_key);
}
