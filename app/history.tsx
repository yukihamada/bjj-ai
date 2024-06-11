
"use client";

import { useRouter } from 'next/navigation';

export default function History() {
  const router = useRouter();
  const history = [
    { id: 1, score: 85, date: '2024-06-10' },
    { id: 2, score: 90, date: '2024-06-09' },
    { id: 3, score: 78, date: '2024-06-08' },
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>判定履歴</h1>
      <ul style={styles.list}>
        {history.map((item) => (
          <li key={item.id} style={styles.listItem} onClick={() => router.push(\`/result?id=${item.id}\`)}>
            <span>判定結果: {item.score}点</span>
            <span>日付: {item.date}</span>
          </li>
        ))}
      </ul>
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
  list: {
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    padding: '10px',
    margin: '10px 0',
    backgroundColor: '#fff',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    width: '80%',
  },
};

