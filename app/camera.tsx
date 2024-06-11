
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Camera() {
  const [capturing, setCapturing] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (capturing) {
      interval = setInterval(() => {
        // ここでカメラから画像をキャプチャするロジックを追加
        setImages((prevImages) => [...prevImages, \`Image ${prevImages.length + 1}\`]);
      }, 500);
    }
    return () => clearInterval(interval);
  }, [capturing]);

  return (
    <div style={styles.container}>
      <div style={styles.preview}>
        {/* ここでカメラのライブフィードを表示 */}
        <p>カメラのライブフィード</p>
      </div>
      <div style={styles.indicator}>
        {capturing ? 'キャプチャ中...' : 'キャプチャ停止'}
      </div>
      <button style={styles.button} onClick={() => setCapturing(!capturing)}>
        {capturing ? '停止' : 'キャプチャ開始'}
      </button>
      <div style={styles.imagePreview}>
        {images.map((image, index) => (
          <div key={index} style={styles.image}>
            {image}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  },
  preview: {
    flex: 1,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    color: '#fff',
  },
  indicator: {
    margin: '20px 0',
    fontSize: '1.2rem',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    backgroundColor: '#ff0000',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  imagePreview: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '20px',
  },
  image: {
    width: '100px',
    height: '100px',
    backgroundColor: '#ccc',
    margin: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

