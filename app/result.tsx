"use client";

import { useRouter } from 'next/navigation';

export default function Result() {
  const router = useRouter();

  return (
    <div style={styles.container}>
      <h1 style={styles.score}>判定結果: 85点</h1>
      <div style={styles.details}>
        <p>詳細情報: ここに判定の内訳や追加コメントが表示されます。</p>
      </div>
      <button style={styles.button} onClick={() => router.push('/camera')}>
        再キャプチャ
      </button>
      <button style={styles.button} onClick={() => alert('共有機能はまだ実装されていません')}>
        共有
      </button>
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
  score: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  details: {
    marginBottom: '20px',
    textAlign: 'center',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '10px',
  },
};

