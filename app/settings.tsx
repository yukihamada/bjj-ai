
import { useState } from 'react';

export default function Settings() {
  const [interval, setInterval] = useState(0.5);
  const [columns, setColumns] = useState(3);
  const [apiKey, setApiKey] = useState('');
  const [notifications, setNotifications] = useState(true);
  const [themeColor, setThemeColor] = useState('#0070f3');

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>設定</h1>
      <div style={styles.setting}>
        <label>キャプチャ間隔:</label>
        <select value={interval} onChange={(e) => setInterval(parseFloat(e.target.value))}>
          <option value={0.5}>0.5秒</option>
          <option value={1}>1秒</option>
          <option value={2}>2秒</option>
        </select>
      </div>
      <div style={styles.setting}>
        <label>結合方法:</label>
        <input
          type="number"
          value={columns}
          onChange={(e) => setColumns(parseInt(e.target.value))}
          min={1}
        />
      </div>
      <div style={styles.setting}>
        <label>API設定:</label>
        <input
          type="text"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
      </div>
      <div style={styles.setting}>
        <label>プッシュ通知:</label>
        <input
          type="checkbox"
          checked={notifications}
          onChange={(e) => setNotifications(e.target.checked)}
        />
      </div>
      <div style={styles.setting}>
        <label>テーマカラー:</label>
        <input
          type="color"
          value={themeColor}
          onChange={(e) => setThemeColor(e.target.value)}
        />
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
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  setting: {
    marginBottom: '20px',
    textAlign: 'center',
  },
};

