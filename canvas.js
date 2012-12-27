/* custom createCanvas function:
- creates canvas element
- takes copy of image
- performs conversion
- draws it to the canvas
- inserts canvas to the DOM
- .each() method makes createCanvas function iterate across all images in #gallery list */

$(window).load(function() {
	$('#gallery img').each(function() {
		createCanvas(this);
	});
	
	function createCanvas(image) {
		var canvas = document.createElement('canvas');
		if (canvas.getContext) {
			var ctx = canvas.getContext("2d");
			
	// specify canvas size
		canvas.width = image.width;
		canvas.height = image.height;
	
	/* when a reference to the source image object is provided, the drawImage(reference, x, y) method is used to render it to the canvas. */
	// x and y are the coordinates on the target canvas where the image will be placed
		ctx.drawImage(image, 0, 0);
		
	/* the image data is stored in the imageData array. The pixel data can then be read on a canvas using getImageData() method. */
		var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height), pixelData = imageData.data;
	
	// loop through all pixels in imageData array and modify the RGB values
		for (var y = 0; y < canvas.height; y++) {
			for (var x = 0; x < canvas.width; x++) {
			
	// access the colour values of the x,y pixel
				var i = (y * 4 * canvas.width) + (x * 4);
				
	// grab the RGB values
				var red = pixelData[i];
				var green = pixelData[i + 1];
				var blue = pixelData[i + 2];
				
	// convert to grayscale
				var grayScale = (red * 0.3) + (green * 0.59) + (blue * .11);
				
				pixelData[i] = grayScale;
				pixelData[i + 1] = grayScale;
				pixelData[i + 2] = grayScale;
			}
		}
	
	// put modified imageData back onto the canvas
		ctx.putImageData(imageData, 0, 0, 0, 0, imageData.width, imageData.height);
		
	// put canvas into the DOM, before the image
		image.parentNode.insertBefore(canvas, image);
		}
	}
});