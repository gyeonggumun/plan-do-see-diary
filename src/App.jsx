import React, { useState, useEffect } from 'react';
import DiaryForm from './components/DiaryForm';
import DiaryList from './components/DiaryList';
import WeeklySummary from './components/WeeklySummary';
import { migrateRecords } from './utils/diaryUtils';
import './index.css'; 

export default function App() {
  const [records, setRecords] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [migrationStatus, setMigrationStatus] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem('plan-do-see-records');
      if (saved) {
        const parsed = JSON.parse(saved);
        const { migratedData, isMigrated } = migrateRecords(parsed);
        setRecords(migratedData);
        if (isMigrated) setMigrationStatus("v1 기록이 v2 형식으로 안전하게 변환되었습니다.");
      }
    } catch (error) {
      setErrorMsg("손상된 파일입니다. 데이터를 불러올 수 없습니다.");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('plan-do-see-records', JSON.stringify(records));
  }, [records]);

  const handleExport = () => {
    const dataStr = JSON.stringify(records, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = "diary-records.json";
    link.click();
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target.result);
        const { migratedData } = migrateRecords(importedData);
        setRecords(migratedData);
        setErrorMsg("");
      } catch (error) {
        setErrorMsg("올바른 JSON 파일이 아닙니다.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-title">
          <h1>나의 자격증 공부 계획표</h1>
          <p>나만의 가상 기록기 (데이터는 기기에만 저장됩니다)</p>
        </div>
        
        <div className="header-actions">
          <label className="btn btn-outline">
            가져오기
            <input type="file" accept=".json" onChange={handleImport} style={{ display: 'none' }} />
          </label>
          <button onClick={handleExport} className="btn btn-primary">내보내기</button>
          <button onClick={() => { if(window.confirm('전체 삭제하시겠습니까?')) setRecords([]) }} className="btn btn-danger">
            전체 삭제
          </button>
        </div>
      </header>

      {errorMsg && <div className="alert alert-error">{errorMsg}</div>}
      {migrationStatus && <div className="alert alert-success">{migrationStatus}</div>}

      <div className="main-grid">
        <div className="sidebar-col">
          <DiaryForm setRecords={setRecords} />
          <WeeklySummary records={records} />
        </div>
        <div className="content-col">
          <DiaryList records={records} setRecords={setRecords} />
        </div>
      </div>
    </div>
  );
}