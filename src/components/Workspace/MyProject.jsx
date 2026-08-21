import React from 'react';

import WorkspaceEmptyState from './WorkspaceEmptyState/WorkspaceEmptyState';
import MyProjectItem from './MyProject/MyProjectItem'; 

import './MyProject.css';

export default function MyProject() {
  const myProject = [
    {
      id: 1,
      title: "대한민국 인구수 통계 분석",
      updatedAt: "2026-06-26T04:11:30",
      type: "PIE",
      previewImg: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500"
    },
    {
      id: 2,
      title: "글로벌 상반기 매출 현황",
      updatedAt: "2026-06-27T01:00:00",
      type: "BAR",
      previewImg: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500"
    },
    {
      id: 3,
      title: "신규 유저 유입 경로 추적",
      updatedAt: "2026-06-27T02:15:00",
      type: "LINE",
      previewImg: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=500"
    },
    {
      id: 4,
      title: "분기별 마케팅 효율 평가",
      updatedAt: "2026-06-25T18:30:00",
      type: "RADAR",
      previewImg: "https://images.unsplash.com/photo-1543286386-2e659306cd6c?w=500"
    },
    {
      id: 5,
      title: "서버 트래픽 과부하 지점 리포트",
      updatedAt: "2026-06-24T12:45:10",
      type: "SCATTER",
      previewImg: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500"
    },
    {
      id: 6,
      title: "연령대별 선호 상품 트렌드",
      updatedAt: "2026-06-23T09:12:00",
      type: "DONUT",
      previewImg: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=500"
    },
    {
      id: 7,
      title: "전 세계 기후 변화 데이터 시각화",
      updatedAt: "2026-06-22T14:20:00",
      type: "AREA",
      previewImg: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500"
    },
    {
      id: 8,
      title: "사내 만족도 설문조사 결과",
      updatedAt: "2026-06-21T11:05:45",
      type: "HORIZONTAL_BAR",
      previewImg: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=500"
    },
    {
      id: 9,
      title: "클라우드 스토리지 사용량 점검",
      updatedAt: "2026-06-20T16:50:00",
      type: "BUBBLE",
      previewImg: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500"
    },
    {
      id: 10,
      title: "프로젝트 진행 속도 가시화 (Gantt)",
      updatedAt: "2026-06-19T08:00:00",
      type: "TIMELINE",
      previewImg: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500"
    }
  ];

  return (
    <div className="workspace-my-project">
      {myProject.length === 0 ? (
        <WorkspaceEmptyState />
      ) : (
        <div className="workspace-my-project__grid">
          {myProject.map((project) => (
            <MyProjectItem 
              key={project.id}
              id={project.id}
              title={project.title}
              updatedAt={project.updatedAt}
              type={project.type}
              previewImg={project.previewImg}
            />
          ))}
        </div>
      )}
    </div>
  );
}