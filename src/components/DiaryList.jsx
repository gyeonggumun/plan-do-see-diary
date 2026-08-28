import React, { useState } from 'react';
import DiaryForm from './DiaryForm';

export default function DiaryList({ records, setRecords }) {
  const [editingId, setEditingId] = useState(null);

  const handleDelete = (id) => {
    setRecords(prev => prev.filter(r => r.id !== id));
  };

  if (records.length === 0) {
    return <div className="card" style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '3rem' }}>기록이 없습니다. 첫 번째 기록을 남겨보세요.</div>;
  }

  return (
    <div className="card">
      <h2 className="form-title">최근 기록 ({records.length}건)</h2>
      <div className="table-wrapper">
        <table className="diary-table">
          <thead>
            <tr>
              <th>날짜</th>
              <th>항목 (태그)</th>
              <th>값/단위</th>
              <th style={{ textAlign: 'right' }}>관리</th>
            </tr>
          </thead>
          <tbody>
            {records.map(record => (
              editingId === record.id ? (
                <tr key={record.id}>
                  <td colSpan="4" style={{ padding: '1rem', backgroundColor: 'var(--bg-color)' }}>
                    <DiaryForm editingRecord={record} setRecords={setRecords} onUpdateComplete={() => setEditingId(null)} />
                  </td>
                </tr>
              ) : (
                <tr key={record.id}>
                  <td style={{ fontSize: '0.875rem' }}>{record.date}</td>
                  <td>
                    <div className="item-name">{record.item}</div>
                    <div className="item-tag">{record.tag}</div>
                  </td>
                  <td className="item-value">{record.value} {record.unit}</td>
                  <td style={{ textAlign: 'right' }}>
                    <button onClick={() => setEditingId(record.id)} className="action-btn action-edit">수정</button>
                    <button onClick={() => handleDelete(record.id)} className="action-btn action-delete">삭제</button>
                  </td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}