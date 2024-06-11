"use client";
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [combinedImages, setCombinedImages] = useState([]);
  const imagesRef = useRef([]);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [countdown, setCountdown] = useState(0);
  const [duration, setDuration] = useState(5); // デフォルトを5分に設定

  useEffect(() => {
    async function startVideo() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        console.log('Camera stream started');
      } catch (err) {
        console.error('Error accessing the camera: ', err);
        alert('カメラへのアクセスが拒否されました。ブラウザの設定を確認してください。');
      }
    }

    startVideo();
  }, []);

  useEffect(() => {
    if (!isCapturing) return;

    function captureImage() {
      const context = canvasRef.current.getContext('2d');
      context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
      const imageData = canvasRef.current.toDataURL('image/png');
      console.log('Captured image data URL:', imageData); // デバッグ用
      return imageData;
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
          if (index === images.length - 1) {
            setCombinedImages(prev => [combinedCanvas.toDataURL('image/png'), ...prev]);
          }
        };
      });
    }

    const id = setInterval(() => {
      if (imagesRef.current.length < 9) {
        const image = captureImage();
        imagesRef.current = [...imagesRef.current, image];
      } else {
        console.log('Captured 9 images:', imagesRef.current);
        combineImages(imagesRef.current);
        imagesRef.current = []; // Reset the images array
      }
    }, 500); // 500ms間隔でキャプチャ

    setIntervalId(id);

    return () => clearInterval(id);
  }, [isCapturing]);

  useEffect(() => {
    if (countdown <= 0 && isStarted) {
      handleStopCapture();
    }
  }, [countdown, isStarted]);

  const handleStartCapture = () => {
    setIsCapturing(true);
    setIsStarted(true);
    setCountdown(duration * 60); // 試合時間を秒に変換
    const countdownInterval = setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000);
    setIntervalId(countdownInterval);
  };

  const handleStopCapture = () => {
    setIsCapturing(false);
    setIsStarted(false);
    clearInterval(intervalId);
  };

  const handleDurationChange = (e) => {
    setDuration(e.target.value);
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <h1 style={styles.header}>AI Score Judging System</h1>
        {!isStarted && (
          <div style={styles.controls}>
            <label style={styles.label}>
              試合時間:
              <select value={duration} onChange={handleDurationChange} style={styles.select}>
                {[...Array(10).keys()].map(i => (
                  <option key={i + 1} value={i + 1}>{i + 1} 分</option>
                ))}
              </select>
            </label>
            <button onClick={handleStartCapture} style={styles.button}>試合開始</button>
          </div>
        )}
        {isStarted && (
          <div style={styles.controls}>
            <button onClick={handleStopCapture} style={styles.button}>試合終了</button>
            <div style={styles.countdown}>残り時間: {Math.floor(countdown / 60)}:{String(countdown % 60).padStart(2, '0')}</div>
          </div>
        )}
      </div>
      <video ref={videoRef} width="100%" height="auto" autoPlay style={styles.video}></video>
      <canvas ref={canvasRef} width="640" height="480" style={{ display: 'none' }}></canvas>
      <div id="combined-images" style={styles.imageContainer}>
        {combinedImages.map((image, index) => (
          <img key={index} src={image} alt={`Combined ${index + 1}`} style={styles.image} />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f0f0f0',
    padding: '20px',
    minHeight: '100vh',
  },
  header: {
    color: '#333',
    marginBottom: '20px',
    textAlign: 'center',
    fontSize: '2rem',
  },
  video: {
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
    width: '100%',
    maxWidth: '640px',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '20px',
  },
  label: {
    marginBottom: '10px',
    fontSize: '1rem',
  },
  select: {
    marginLeft: '10px',
    padding: '5px',
    fontSize: '1rem',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '10px',
  },
  countdown: {
    fontSize: '1.5rem',
    color: '#333',
  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '640px',
  },
  image: {
    width: '100%',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '10px',
  },
};
