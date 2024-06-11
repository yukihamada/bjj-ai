import { useEffect, useRef, useState } from 'react';

export default function Camera() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const [result, setResult] = useState('');

  useEffect(() => {
    async function startVideo() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
      } catch (err) {
        console.error('Error accessing the camera: ', err);
      }
    }

    function captureImage() {
      const context = canvasRef.current.getContext('2d');
      context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
      return canvasRef.current.toDataURL('image/png');
    }

    function combineImages(images) {
      const combinedCanvas = document.createElement('canvas');
      const combinedContext = combinedCanvas.getContext('2d');
      combinedCanvas.width = 640 * 3; // 3 images wide
      combinedCanvas.height = 480 * 3; // 3 images tall

      images.forEach((image, index) => {
        const img = new Image();
        img.src = image;
        img.onload = () => {
          const x = (index % 3) * 640;
          const y = Math.floor(index / 3) * 480;
          combinedContext.drawImage(img, x, y, 640, 480);
        };
      });

      return combinedCanvas.toDataURL('image/png');
    }

    async function sendImageToServer(imageData) {
      try {
        const response = await fetch('https://ai-score-judging-system.yukihamada.workers.dev', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ image: imageData })
        });
        const result = await response.json();
        setResult('Score: ' + result.score);
      } catch (error) {
        console.error('Error sending image to server:', error);
      }
    }

    function startCapturing() {
      setInterval(() => {
        if (images.length < 9) {
          const image = captureImage();
          setImages(prevImages => [...prevImages, image]);
        } else {
          console.log('Captured 9 images:', images);
          const combinedImage = combineImages(images);
          sendImageToServer(combinedImage);
          setImages([]); // Reset the images array
        }
      }, 500);
    }

    startVideo().then(startCapturing);
  }, [images]);

  return (
    <div>
      <h1>AI Score Judging System</h1>
      <video ref={videoRef} width="640" height="480" autoPlay></video>
      <canvas ref={canvasRef} width="640" height="480" style={{ display: 'none' }}></canvas>
      <div id="result">{result}</div>
    </div>
  );
}

