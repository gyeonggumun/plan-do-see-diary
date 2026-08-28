import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { SCHEMA_VERSION } from '../utils/diaryUtils';

export default function DiaryForm({ setRecords, editingRecord, onUpdateComplete }) {
  const [formData, setFormData] = useState(
    editingRecord || {
      date: new Date().toISOString().split('T')[0],
      item: '학습',
      value: '',
      unit: '시간',
      tag: '기본값'
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.value) return;

    if (editingRecord) {
      setRecords(prev => prev.map(r => r.id === editingRecord.id ? { ...formData } : r));
      onUpdateComplete();
    } else {
      const newRecord = {
        ...formData,
        id: uuidv4(),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        schemaVersion: SCHEMA_VERSION
      };
      setRecords(prev => [...prev, newRecord]);
      setFormData({ ...formData, value: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h2 className="form-title">{editingRecord ? '기록 수정' : '새 기록 추가'}</h2>
      
      <div className="form-group">
        <label>날짜</label>
        <input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="form-input" required />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>항목</label>
          <input type="text" value={formData.item} onChange={e => setFormData({...formData, item: e.target.value})} className="form-input" required />
        </div>
        <div className="form-group">
          <label>태그 (v2)</label>
          <input type="text" value={formData.tag} onChange={e => setFormData({...formData, tag: e.target.value})} className="form-input" />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group" style={{ flex: 2 }}>
          <label>값</label>
          <input type="number" step="0.1" value={formData.value} onChange={e => setFormData({...formData, value: e.target.value})} className="form-input" required />
        </div>
        <div className="form-group">
          <label>단위</label>
          <select value={formData.unit} onChange={e => setFormData({...formData, unit: e.target.value})} className="form-input">
            <option value="시간">시간</option>
            <option value="분">분</option>
            <option value="회">회</option>
          </select>
        </div>
      </div>

      <button type="submit" className="btn btn-primary btn-submit">
        {editingRecord ? '수정 완료' : '추가하기'}
      </button>
    </form>
  );
}