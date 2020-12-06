const bgImageURLs = [
  "https://cdn.wallpaperhub.app/cloudcache/8/b/5/9/e/a/8b59ea76609f1e559e1e206fe7ce00a04d8913e2.jpg",
  "https://cdn.wallpaperhub.app/cloudcache/9/3/a/b/a/e/93abaeb08e57ea7ebe032004ca28d5a12bcd33ea.jpg",
  "https://cdn.wallpaperhub.app/cloudcache/8/c/e/e/1/3/8cee1372152db0eaf234895b68ff4b0cc6d64bb8.jpg",
  "https://cdn.wallpaperhub.app/cloudcache/8/c/3/1/f/6/8c31f66eea3efefa4bd8698c41c16ad9e1b9a19f.jpg",
  "https://cdn.wallpaperhub.app/cloudcache/2/e/b/5/b/9/2eb5b9a887cbaed4862d4091d9902caba77e4934.jpg",
]
const body = document.querySelector("body");
const IMG_NUMBER = 3;

function paintImage(imgNumber) {
  const image = new Image();
  image.src = bgImageURLs[imgNumber];
  image.classList.add("bgImage");
  body.prepend(image);
}

function genRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function bgInit() {
  const randomNumber = genRandom();
  paintImage(randomNumber);
}

bgInit();