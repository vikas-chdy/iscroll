let ready=false;
let imagesLoaded = 0;
let totalImages = 0;


let photosArray = [];
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
//unsplash api
const count=30;
const apiKey='kRZlhjmUWQqgtKtot3GqqRYfZhsG11V8y4AWNVQ-RsE';
const apiUrl = "https://api.unsplash.com/photos/random/?client_id="+apiKey+"&count="+count;

// check if all images were loaded
function imageLoaded() {
imagesLoaded++;
console.log(imagesLoaded);
if(imagesLoaded===totalImages){
    ready=true;
    loader.hidden=true;
}
}

//Helper Function to set attributes on DOM Elements
function setAttributes(element,attributes) {
    for (const key in attributes) {
        element.setAttribute(key,attributes[key]);
    }
}

// Create Elements for Links and Photos,Add to DOM 
function displayPhotos(){
    imagesLoaded=0;
    totalImages=photosArray.length;
   // console.log('total images',totalImages);
       //Run function for each object in photosArray
       photosArray.forEach((photo) => {
       // create <a> to link to unsplash 
        const item = document.createElement('a');
        setAttributes(item,{
          href: photo.links.html,
          target:'_blank',
        });
       // create <img> for photo
        const img= document.createElement('img');
        setAttributes(img,{
           src: photo.urls.regular,
           alt: photo.alt_description,
           title: photo.alt_description,
       });
       //Event Listner,check when each is finished loadin
       img.addEventListener('load',imageLoaded);
       //Put <img> inside <a>, thebn put both inside imageContainer Element
       item.appendChild(img);
       imageContainer.appendChild(item);
    });
}

// Get photos from Unsplash API
async function getPhotos(){
    try {
          const response = await fetch(apiUrl);
          photosArray = await response.json();
          //console.log(photosArray);
          displayPhotos();
         
    }
    catch(error){
        // catch error here
    }
}

//Check to see if scrolling near bottom of page,load more photos 
window.addEventListener('scroll',()=>{
    if(window.innerHeight+window.scrollY >= document.body.offsetHeight -1000 && ready) {
        ready=false;
        getPhotos();
        //console.log('load more');
    }
});

// on load
getPhotos();