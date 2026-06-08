import type { LocalMetric, ProposalDraft, PublishEvent, ReviewProposal, RoleLane, SummaryMetric } from './types'

export const summaryMetrics: SummaryMetric[] = [
  {
    label: '대기 제안',
    value: '18',
    detail: '검토자 확인 필요',
    tone: 'amber',
  },
  {
    label: '승인 완료',
    value: '42',
    detail: '이번 주 반영 대상',
    tone: 'green',
  },
  {
    label: '반려/수정 요청',
    value: '7',
    detail: '사유 전달 완료',
    tone: 'red',
  },
  {
    label: '인덱스 갱신',
    value: '91%',
    detail: '추천 풀 동기화율',
    tone: 'blue',
  },
]

export const roleLanes: RoleLane[] = [
  {
    role: 'R-LOCAL-OPERATOR',
    title: '담당 지역 데이터/운영 지표 조회',
    description: '지역 정보, 관광 자원 현황, 제안 승인 흐름을 한 곳에서 확인합니다.',
    responsibilities: ['지역 정보 및 관광 자원 현황', '제안/승인 현황', '방문/검색/추천 지표', '피드백 및 리뷰 현황'],
  },
  {
    role: 'R-DATA-PROVIDER',
    title: '관광지/축제/체험 데이터 제안',
    description: '신규 콘텐츠 후보와 근거 자료를 검토 대기 상태로 저장합니다.',
    responsibilities: ['관광지/장소 제안', '축제/행사 제안', '체험/액티비티 제안', '이미지/링크/설명 등 첨부'],
  },
  {
    role: 'R-ADMIN',
    title: '데이터 제안 검토',
    description: '성격 검토, 중복 확인, 근거 자료 확인, 반영 여부를 결정합니다.',
    responsibilities: ['제안 목록 조회/검색', '성격 검토', '근거 자료 확인', '댓글/이력 확인'],
  },
]

export const localMetrics: LocalMetric[] = [
  { label: '강릉 검색량', value: '12.8k', trend: '+18%' },
  { label: '추천 전환', value: '32.4%', trend: '+6.1%' },
  { label: '리뷰 수집', value: '286', trend: '+41' },
  { label: '데이터 품질 경고', value: '3', trend: '-2' },
]

export const proposalDraft: ProposalDraft = {
  type: 'festival',
  title: '강릉 커피 골목 야간 투어',
  region: '강릉',
  evidence: '지역 축제 일정표, 운영자 검수 메모, 이미지 링크',
  summary: '야간 카페 거리, 로스터리 방문, 해변 산책을 묶은 저강도 체험 후보입니다.',
}

export const reviewProposals: ReviewProposal[] = [
  {
    id: 'PV-1024',
    title: '강릉 커피 골목 야간 투어',
    proposerRole: 'R-DATA-PROVIDER',
    region: '강릉',
    status: 'pending',
    submittedAt: '2026-06-08 22:30',
    evidence: '지역 축제 일정표, 운영자 검수 메모, 이미지 링크',
  },
  {
    id: 'PV-1021',
    title: '벳푸 온천 숙소 체류 추천',
    proposerRole: 'R-LOCAL-OPERATOR',
    region: '벳푸',
    status: 'change_requested',
    submittedAt: '2026-06-07 18:12',
    evidence: '숙소 운영 시간 확인 필요',
  },
  {
    id: 'PV-1018',
    title: '경주 황리단길 아침 산책 코스',
    proposerRole: 'R-DATA-PROVIDER',
    region: '경주',
    status: 'approved',
    submittedAt: '2026-06-06 09:45',
    evidence: '운영자 현장 검수 완료',
  },
]

export const publishEvents: PublishEvent[] = [
  {
    key: 'publish',
    title: '목적지/축제/검증 데이터 반영',
    status: 'published',
    description: '승인된 콘텐츠를 사용자 노출 카탈로그에 반영했습니다.',
    timestamp: '23:06',
  },
  {
    key: 'rag',
    title: '추천 풀/RAG 인덱스 갱신',
    status: 'indexed',
    description: '추천 풀 데이터 갱신과 RAG 인덱스 재구성을 완료했습니다.',
    timestamp: '23:10',
  },
  {
    key: 'cache',
    title: '캐시/검색 색인 업데이트',
    status: 'indexed',
    description: '검색 후보와 캐시 키를 최신 데이터 기준으로 갱신했습니다.',
    timestamp: '23:12',
  },
  {
    key: 'user',
    title: '일반 사용자 추천 결과에 최신 데이터 반영',
    status: 'published',
    description: '다음 추천 요청부터 승인된 최신 데이터가 포함됩니다.',
    timestamp: '23:14',
  },
]
