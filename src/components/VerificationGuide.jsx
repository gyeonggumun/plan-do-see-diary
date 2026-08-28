import React from 'react';

export default function VerificationGuide() {
  return (
    <div className="guide-box">
      <h3 className="guide-title">✅ 검증 안내서</h3>
      <div className="guide-grid">
        <div className="guide-item">
          <h4>어디로 가나요</h4>
          <p>현재 배포된 공개 주소 메인 화면</p>
        </div>
        <div className="guide-item">
          <h4>무엇을 하나요</h4>
          <ul>
            <li>폼에 임의의 날짜와 항목, 숫자 값을 입력하고 [추가하기]를 누릅니다.</li>
            <li>기록 목록 우측의 [수정]을 눌러 값을 변경해봅니다.</li>
            <li>[내보내기] 후 전체삭제, 다시 [가져오기]를 수행합니다.</li>
          </ul>
        </div>
        <div className="guide-item">
          <h4>무엇이 보이면 통과인가요</h4>
          <ul>
            <li>기록의 추가/수정/삭제 시 우측 '요약 및 검증'의 합계가 즉시 변합니다.</li>
            <li>새로고침을 해도 데이터가 보존됩니다.</li>
            <li>잘못된 값(문자열 등)이 포함된 경우 붉은색 글씨로 집계 제외 건수가 뜹니다.</li>
          </ul>
        </div>
        <div className="guide-item">
          <h4>안 될 때</h4>
          <p>브라우저 개발자 도구(F12) Console에 로컬스토리지 권한 오류가 없는지 확인하거나 캐시를 비우고 다시 시도해 주세요.</p>
        </div>
      </div>
    </div>
  );
}