import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('Lovv admin console', () => {
  it('renders the admin workflow overview with role-based lanes', () => {
    render(<App />)

    expect(screen.getByTestId('lovv-admin-shell')).toHaveAttribute('data-theme', 'lovv')
    expect(screen.getByRole('heading', { name: 'Lovv Admin Console' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: '운영 지표' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tab', { name: '데이터 제안' })).toBeDisabled()
    expect(screen.getByRole('tab', { name: '제안 검토' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: '반영 상태' })).toBeInTheDocument()
    expect(screen.getByLabelText('현재 세션 역할')).toHaveValue('R-ADMIN')
    expect(screen.getByTestId('current-role-badge')).toHaveTextContent('R-ADMIN')

    expect(screen.getByText('R-LOCAL-OPERATOR')).toBeInTheDocument()
    expect(screen.getByText('R-DATA-PROVIDER')).toBeInTheDocument()
    expect(screen.getByText('R-ADMIN')).toBeInTheDocument()
    expect(screen.getByText('대기 제안')).toBeInTheDocument()
    expect(screen.getByText('승인 완료')).toBeInTheDocument()
    expect(screen.getByText('반려/수정 요청')).toBeInTheDocument()
  })

  it('locks proposal access for the default admin mock role', () => {
    render(<App />)

    const proposalTab = screen.getByRole('tab', { name: '데이터 제안' })

    expect(screen.getByLabelText('현재 세션 역할')).toHaveValue('R-ADMIN')
    expect(proposalTab).toBeDisabled()
    expect(proposalTab).toHaveAttribute('aria-disabled', 'true')
    expect(proposalTab).toHaveAttribute('data-locked', 'true')
    expect(proposalTab).toHaveAccessibleDescription(
      '역할 접근 제한: R-ADMIN 역할은 데이터 제안 작업 영역을 사용할 수 없습니다.',
    )
  })

  it('switches data providers into the proposal panel and enables provider-owned actions', () => {
    render(<App />)

    fireEvent.change(screen.getByLabelText('현재 세션 역할'), { target: { value: 'R-DATA-PROVIDER' } })

    expect(screen.getByLabelText('현재 세션 역할')).toHaveValue('R-DATA-PROVIDER')
    expect(screen.getByTestId('current-role-badge')).toHaveTextContent('R-DATA-PROVIDER')
    expect(screen.getByRole('tab', { name: '데이터 제안' })).toBeEnabled()
    expect(screen.getByRole('tab', { name: '데이터 제안' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('heading', { name: '관광지/축제/체험 데이터 제안' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '대기 상태로 저장' })).toBeEnabled()
    expect(screen.getByRole('tab', { name: '제안 검토' })).toBeDisabled()
    expect(screen.queryByRole('button', { name: '승인' })).not.toBeInTheDocument()
  })

  it('switches local operators into metrics and locks admin/provider workspaces', () => {
    render(<App />)

    fireEvent.change(screen.getByLabelText('현재 세션 역할'), { target: { value: 'R-LOCAL-OPERATOR' } })

    expect(screen.getByLabelText('현재 세션 역할')).toHaveValue('R-LOCAL-OPERATOR')
    expect(screen.getByTestId('current-role-badge')).toHaveTextContent('R-LOCAL-OPERATOR')
    expect(screen.getByRole('tab', { name: '운영 지표' })).toBeEnabled()
    expect(screen.getByRole('tab', { name: '운영 지표' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('heading', { level: 2, name: '담당 지역 데이터/운영 지표 조회' })).toBeInTheDocument()

    for (const tabName of ['데이터 제안', '제안 검토', '반영 상태']) {
      const lockedTab = screen.getByRole('tab', { name: tabName })

      expect(lockedTab).toBeDisabled()
      expect(lockedTab).toHaveAttribute('aria-disabled', 'true')
      expect(lockedTab).toHaveAttribute('data-locked', 'true')
    }
  })

  it('keeps the current allowed panel when a locked tab is clicked', () => {
    render(<App />)

    fireEvent.change(screen.getByLabelText('현재 세션 역할'), { target: { value: 'R-DATA-PROVIDER' } })

    const proposalTab = screen.getByRole('tab', { name: '데이터 제안' })
    const reviewTab = screen.getByRole('tab', { name: '제안 검토' })

    fireEvent.click(reviewTab)

    expect(reviewTab).toBeDisabled()
    expect(reviewTab).toHaveAttribute('aria-selected', 'false')
    expect(proposalTab).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('heading', { name: '관광지/축제/체험 데이터 제안' })).toBeInTheDocument()
  })

  it('shows a mock proposal form for tourism, festival, and activity data', () => {
    render(<App />)

    fireEvent.change(screen.getByLabelText('현재 세션 역할'), { target: { value: 'R-DATA-PROVIDER' } })

    expect(screen.getByRole('heading', { name: '관광지/축제/체험 데이터 제안' })).toBeInTheDocument()
    expect(screen.getByLabelText('제안 유형')).toHaveValue('festival')
    expect(screen.getByLabelText('제안 제목')).toHaveValue('강릉 커피 골목 야간 투어')
    expect(screen.getByLabelText('근거 자료')).toHaveValue('지역 축제 일정표, 운영자 검수 메모, 이미지 링크')
    expect(screen.getByRole('button', { name: '대기 상태로 저장' })).toBeEnabled()
  })

  it('lets admins review pending proposals and inspect approval actions', () => {
    render(<App />)

    fireEvent.click(screen.getByRole('tab', { name: '제안 검토' }))

    const queue = screen.getByRole('table', { name: '대기 중인 데이터 제안 목록' })
    expect(within(queue).getByText('강릉 커피 골목 야간 투어')).toBeInTheDocument()
    expect(within(queue).getByText('pending')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '승인 여부' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '승인' })).toBeEnabled()
    expect(screen.getByRole('button', { name: '반려/수정 요청' })).toBeEnabled()
    expect(screen.getByText('제안자에게 사유 표시')).toBeInTheDocument()
  })

  it('centers the operator avatar and proposal status labels', () => {
    render(<App />)

    expect(screen.getByTestId('operator-avatar')).toHaveClass('operator-avatar')
    expect(screen.getByTestId('operator-avatar')).toHaveAttribute('data-alignment', 'centered')

    fireEvent.click(screen.getByRole('tab', { name: '제안 검토' }))

    const queue = screen.getByRole('table', { name: '대기 중인 데이터 제안 목록' })
    const pendingStatus = within(queue).getByText('pending')
    expect(pendingStatus).toHaveClass('status-pill')
    expect(pendingStatus).toHaveAttribute('data-alignment', 'centered')
  })

  it('keeps approved status text white inside proposal tables', () => {
    render(<App />)

    fireEvent.click(screen.getByRole('tab', { name: '제안 검토' }))

    const queue = screen.getByRole('table', { name: '대기 중인 데이터 제안 목록' })
    const approvedStatus = within(queue).getByText('approved')
    expect(approvedStatus).toHaveClass('status-approved')
    expect(approvedStatus).toHaveAttribute('data-contrast', 'on-dark')
  })

  it('summarizes publish, index refresh, and user recommendation reflection states', () => {
    render(<App />)

    fireEvent.click(screen.getByRole('tab', { name: '반영 상태' }))

    expect(screen.getByRole('heading', { name: '데이터 반영 타임라인' })).toBeInTheDocument()
    expect(screen.getByText('목적지/축제/검증 데이터 반영')).toBeInTheDocument()
    expect(screen.getByText('추천 풀/RAG 인덱스 갱신')).toBeInTheDocument()
    expect(screen.getByText('일반 사용자 추천 결과에 최신 데이터 반영')).toBeInTheDocument()
    expect(screen.getByText('캐시/검색 색인 업데이트')).toBeInTheDocument()
  })
})
