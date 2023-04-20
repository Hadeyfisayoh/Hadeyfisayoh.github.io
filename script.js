const inputImage = document.getElementById('imageUpload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const outputDiv = document.querySelector('.output');

// Set canvas size based on window width
function setCanvasSize() {
  const windowWidth = window.innerWidth;
  const canvasWidth = Math.min(600, windowWidth - 40);
  const canvasHeight = canvasWidth * 2;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
}

// Draw original image and symmetrical image on canvas
function drawImagesOnCanvas(imageUrl) {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = imageUrl;
  img.onload = function() {
    setCanvasSize();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width / 2, canvas.height / 2);
    ctx.save();
    ctx.translate(canvas.width, canvas.height / 2);
    ctx.scale(-1, 1);
    ctx.drawImage(img, 0, 0, canvas.width / 2, canvas.height / 2);
    ctx.restore();
  }
}

// Handle file upload
inputImage.addEventListener('change', function(event) {
  const uploadedImage = event.target.files[0];
  const uploadedImageUrl = URL.createObjectURL(uploadedImage);
  drawImagesOnCanvas(uploadedImageUrl);
});

// Redraw canvas on window resize
window.addEventListener('resize', function() {
  setCanvasSize();
  drawImagesOnCanvas(canvas.toDataURL());
});

// Style canvas
canvas.style.maxWidth = '100%';
canvas.style.height = 'auto';
canvas.style.display = 'block';
canvas.style.margin = '20px auto';
canvas.style.borderRadius = '5px';
canvas.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
