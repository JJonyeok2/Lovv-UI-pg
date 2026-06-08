import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('Lovv admin console', () => {
  it('renders the admin workflow overview with role-based lanes', () => {
    render(<App />)

    expect(screen.getByTestId('lovv-admin-shell')).toHaveAttribute('data-theme', 'lovv')
    expect(screen.getByRole('heading', { name: 'Lovv Admin Console' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: '운영 지표' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tab', { name: '데이터 제안' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: '제안 검토' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: '반영 상태' })).toBeInTheDocument()

    expect(screen.getByText('R-LOCAL-OPERATOR')).toBeInTheDocument()
    expect(screen.getByText('R-DATA-PROVIDER')).toBeInTheDocument()
    expect(screen.getByText('R-ADMIN')).toBeInTheDocument()
    expect(screen.getByText('대기 제안')).toBeInTheDocument()
    expect(screen.getByText('승인 완료')).toBeInTheDocument()
    expect(screen.getByText('반려/수정 요청')).toBeInTheDocument()
  })

  it('shows a mock proposal form for tourism, festival, and activity data', () => {
    render(<App />)

    fireEvent.click(screen.getByRole('tab', { name: '데이터 제안' }))

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
