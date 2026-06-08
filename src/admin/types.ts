export type AdminTab = 'metrics' | 'proposal' | 'review' | 'publish'

export type AdminRole = 'R-LOCAL-OPERATOR' | 'R-DATA-PROVIDER' | 'R-ADMIN'

export type ProposalStatus =
  | 'draft'
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'change_requested'
  | 'published'
  | 'indexed'

export type SummaryMetric = {
  label: string
  value: string
  detail: string
  tone: 'blue' | 'green' | 'purple' | 'amber' | 'red'
}

export type RoleLane = {
  role: AdminRole
  title: string
  description: string
  responsibilities: string[]
}

export type LocalMetric = {
  label: string
  value: string
  trend: string
}

export type ProposalDraft = {
  type: 'tour' | 'festival' | 'activity'
  title: string
  region: string
  evidence: string
  summary: string
}

export type ReviewProposal = {
  id: string
  title: string
  proposerRole: AdminRole
  region: string
  status: ProposalStatus
  submittedAt: string
  evidence: string
}

export type PublishEvent = {
  key: string
  title: string
  status: ProposalStatus
  description: string
  timestamp: string
}
