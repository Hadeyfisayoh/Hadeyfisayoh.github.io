window.addEventListener('DOMContentLoaded', function() {
  const createSymmetricalImage = document.getElementById('createSymmetricalImage');
  const symmetricalImage = document.getElementById('symmetricalImage');
  const reflectionRadio = document.getElementById('reflection');
  const scalingRadio = document.getElementById('scaling');
  const rotationRadio = document.getElementById('rotation');
  const inputImage = document.getElementById('inputImage');
  const uploadedImagePreview = document.getElementById('uploadedImagePreview');

  createSymmetricalImage.addEventListener('click', function() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'anonymous';
    const uploadedImageUrl = URL.createObjectURL(inputImage.files[0]);

    img.addEventListener('load', function() {
      canvas.width = img.width * 2;
      canvas.height = img.height;

      if (reflectionRadio.checked) {
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.scale(-1, 1);
        ctx.translate(-img.width / 2, -img.height / 2);
        ctx.drawImage(img, 0, 0);
        ctx.restore();
      } else if (scalingRadio.checked) {
        ctx.drawImage(img, 0, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(img, -img.width * 2, 0);
        ctx.scale(-0.5, 1);
        ctx.drawImage(img, -img.width, 0);
        ctx.drawImage(img, img.width, 0);
        ctx.restore();
      } else if (rotationRadio.checked) {
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(Math.PI);
        ctx.translate(-img.width / 2, -img.height / 2);
        ctx.drawImage(img, 0, 0);
        ctx.rotate(Math.PI / 2);
        ctx.translate(-img.height, 0);
        ctx.drawImage(img, 0, 0);
        ctx.rotate(Math.PI / 2);
        ctx.translate(img.height, img.width);
        ctx.drawImage(img, 0, 0);
        ctx.rotate(Math.PI / 2);
        ctx.translate(img.width, -img.height);
        ctx.drawImage(img, 0, 0);
        ctx.restore();
      }

      symmetricalImage.width = canvas.width;
      symmetricalImage.height = canvas.height;
      symmetricalImage.getContext('2d').drawImage(canvas, 0, 0);

      // Show the download button
      const downloadButton = document.getElementById('downloadButton');
      downloadButton.style.display = 'block';

      // Add click event listener to the download button
      downloadButton.addEventListener('click', function() {
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = symmetricalImage.toDataURL(); // Convert canvas to data URL
        link.download = 'symmetrical_image.png'; // Set the download filename
        link.click(); // Trigger the download
      });
    });

    uploadedImagePreview.src = uploadedImageUrl;
    uploadedImagePreview.style.display = 'block';

    img.src = uploadedImageUrl;
  });
});
