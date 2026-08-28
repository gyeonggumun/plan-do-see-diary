import React from 'react';
import { calculateWeeklySummary } from '../utils/diaryUtils';

export default function WeeklySummary({ records }) {
  const { validTotal, invalidCount } = calculateWeeklySummary(records);

  return (
    <div className="card">
      <h2 className="form-title">요약 및 검증</h2>
      
      <div className="summary-inner">
        <div className="summary-row">
          <span className="summary-label">정상 집계 합계</span>
          <span className="summary-value">{validTotal.toLocaleString()}</span>
        </div>
        
        {invalidCount > 0 && (
          <div className="summary-row summary-error">
            <span>잘못된 값 (집계 제외)</span>
            <span>{invalidCount}건</span>
          </div>
        )}
      </div>
    </div>
  );
}