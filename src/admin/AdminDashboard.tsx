import { useMemo, useState } from 'react'
import { localMetrics, proposalDraft, publishEvents, reviewProposals, roleLanes, summaryMetrics } from './adminData'
import type { AdminTab, ProposalStatus, SummaryMetric } from './types'

const tabs: { id: AdminTab; label: string }[] = [
  { id: 'metrics', label: '운영 지표' },
  { id: 'proposal', label: '데이터 제안' },
  { id: 'review', label: '제안 검토' },
  { id: 'publish', label: '반영 상태' },
]

const statusLabels: Record<ProposalStatus, string> = {
  draft: '초안',
  pending: '대기',
  approved: '승인',
  rejected: '반려',
  change_requested: '수정 요청',
  published: '반영',
  indexed: '인덱스 갱신',
}

const toneLabelClassNames: Record<SummaryMetric['tone'], string> = {
  blue: 'tone-blue',
  green: 'tone-green',
  purple: 'tone-purple',
  amber: 'tone-amber',
  red: 'tone-red',
}

function SummaryCards() {
  return (
    <section className="summary-grid" aria-label="관리자 처리 현황">
      {summaryMetrics.map((metric) => (
        <article className={`summary-card ${toneLabelClassNames[metric.tone]}`} key={metric.label}>
          <span>{metric.label}</span>
          <strong>{metric.value}</strong>
          <p>{metric.detail}</p>
        </article>
      ))}
    </section>
  )
}

function RoleStatusPanel() {
  return (
    <section className="panel" aria-labelledby="role-status-title">
      <div className="section-heading">
        <span className="section-kicker">Role Gate</span>
        <h2 id="role-status-title">역할 확인</h2>
      </div>
      <div className="role-lanes">
        {roleLanes.map((lane) => (
          <article className="role-lane" key={lane.role}>
            <span className="role-badge">{lane.role}</span>
            <h3>{lane.title}</h3>
            <p>{lane.description}</p>
            <ul>
              {lane.responsibilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}

function LocalOperatorMetrics() {
  return (
    <section className="panel" aria-labelledby="local-metrics-title">
      <div className="section-heading">
        <span className="section-kicker">Local Metrics</span>
        <h2 id="local-metrics-title">담당 지역 데이터/운영 지표 조회</h2>
      </div>
      <div className="metric-table" role="table" aria-label="담당 지역 운영 지표">
        <div role="row" className="metric-row metric-row-head">
          <span role="columnheader">지표</span>
          <span role="columnheader">현재 값</span>
          <span role="columnheader">변화</span>
        </div>
        {localMetrics.map((metric) => (
          <div role="row" className="metric-row" key={metric.label}>
            <span role="cell">{metric.label}</span>
            <strong role="cell">{metric.value}</strong>
            <span role="cell" className={metric.trend.startsWith('-') ? 'trend-down' : 'trend-up'}>
              {metric.trend}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

function DataProposalPanel() {
  return (
    <section className="panel form-panel" aria-labelledby="proposal-title">
      <div className="section-heading">
        <span className="section-kicker">R-DATA-PROVIDER</span>
        <h2 id="proposal-title">관광지/축제/체험 데이터 제안</h2>
      </div>
      <form className="proposal-form">
        <label>
          제안 유형
          <select defaultValue={proposalDraft.type} aria-label="제안 유형">
            <option value="tour">관광지</option>
            <option value="festival">축제</option>
            <option value="activity">체험</option>
          </select>
        </label>
        <label>
          담당 지역
          <input value={proposalDraft.region} readOnly aria-label="담당 지역" />
        </label>
        <label className="wide-field">
          제안 제목
          <input value={proposalDraft.title} readOnly aria-label="제안 제목" />
        </label>
        <label className="wide-field">
          제안 설명
          <textarea value={proposalDraft.summary} readOnly aria-label="제안 설명" />
        </label>
        <label className="wide-field">
          근거 자료
          <textarea value={proposalDraft.evidence} readOnly aria-label="근거 자료" />
        </label>
        <div className="form-actions">
          <span className="status-pill status-pending">pending</span>
          <button type="button">대기 상태로 저장</button>
        </div>
      </form>
    </section>
  )
}

function ReviewQueuePanel() {
  const selectedProposal = reviewProposals[0]

  return (
    <section className="review-layout" aria-label="관리자 검토 작업 영역">
      <div className="panel">
        <div className="section-heading">
          <span className="section-kicker">R-ADMIN</span>
          <h2>데이터 제안 검토</h2>
        </div>
        <div className="proposal-table-wrap">
          <table aria-label="대기 중인 데이터 제안 목록" className="proposal-table">
            <thead>
              <tr>
                <th scope="col">제안</th>
                <th scope="col">지역</th>
                <th scope="col">상태</th>
                <th scope="col">제출</th>
              </tr>
            </thead>
            <tbody>
              {reviewProposals.map((proposal) => (
                <tr key={proposal.id}>
                  <td>
                    <strong>{proposal.title}</strong>
                    <span>{proposal.id}</span>
                  </td>
                  <td>{proposal.region}</td>
                  <td>
                    <span className={`status-pill status-${proposal.status}`}>{proposal.status}</span>
                  </td>
                  <td>{proposal.submittedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <aside className="panel decision-panel" aria-labelledby="decision-title">
        <div className="section-heading">
          <span className="section-kicker">Decision</span>
          <h2 id="decision-title">승인 여부</h2>
        </div>
        <dl>
          <div>
            <dt>검토 대상</dt>
            <dd>{selectedProposal.title}</dd>
          </div>
          <div>
            <dt>근거 자료</dt>
            <dd>{selectedProposal.evidence}</dd>
          </div>
          <div>
            <dt>제안자</dt>
            <dd>{selectedProposal.proposerRole}</dd>
          </div>
        </dl>
        <div className="decision-actions">
          <button type="button" className="approve-button">
            승인
          </button>
          <button type="button" className="reject-button">
            반려/수정 요청
          </button>
        </div>
        <div className="reason-box">
          <strong>제안자에게 사유 표시</strong>
          <p>수정 가이드와 반려 사유를 제안 이력에 남기는 상태입니다.</p>
        </div>
      </aside>
    </section>
  )
}

function PublishStatusTimeline() {
  return (
    <section className="panel" aria-labelledby="publish-title">
      <div className="section-heading">
        <span className="section-kicker">Publish Pipeline</span>
        <h2 id="publish-title">데이터 반영 타임라인</h2>
      </div>
      <ol className="timeline">
        {publishEvents.map((event) => (
          <li key={event.key}>
            <time>{event.timestamp}</time>
            <div>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <span className={`status-pill status-${event.status}`}>{statusLabels[event.status]}</span>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<AdminTab>('metrics')
  const activePanelId = useMemo(() => `admin-panel-${activeTab}`, [activeTab])

  return (
    <main className="app-shell" data-testid="lovv-admin-shell" data-theme="lovv">
      <header className="topbar">
        <div>
          <p className="eyebrow">Lovv Operations</p>
          <h1>Lovv Admin Console</h1>
        </div>
        <div className="operator-card" aria-label="현재 관리자 세션">
          <span className="operator-avatar">A</span>
          <div>
            <strong>운영자/관리자 로그인</strong>
            <span>Mock SSO Session</span>
          </div>
        </div>
      </header>

      <SummaryCards />

      <nav className="tab-list" role="tablist" aria-label="관리자 콘솔 메뉴">
        {tabs.map((tab) => (
          <button
            aria-controls={`admin-panel-${tab.id}`}
            aria-selected={activeTab === tab.id}
            className={activeTab === tab.id ? 'tab-button active' : 'tab-button'}
            id={`admin-tab-${tab.id}`}
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            role="tab"
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <div
        aria-labelledby={`admin-tab-${activeTab}`}
        className="tab-panel"
        id={activePanelId}
        role="tabpanel"
      >
        {activeTab === 'metrics' && (
          <div className="stack">
            <RoleStatusPanel />
            <LocalOperatorMetrics />
          </div>
        )}
        {activeTab === 'proposal' && <DataProposalPanel />}
        {activeTab === 'review' && <ReviewQueuePanel />}
        {activeTab === 'publish' && <PublishStatusTimeline />}
      </div>
    </main>
  )
}
