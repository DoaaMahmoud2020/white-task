import { IDashboardItem } from '../models/dashoard-item.model';

export const STATISTICS: IDashboardItem[] = [
  {
    title: 'Summary',
    count: 21,
    countTitle: 'Due Tasks',
    countColor: 'blue',
    hint: 'Completed',
    hintCount: 13,
    showActions: true,
  },
  {
    title: 'Overdue',
    count: 17,
    countTitle: 'Tasks',
    countColor: 'danger',
    hint: 'From yesterday',
    hintCount: 9,
    showActions: true,
  },
  {
    title: 'Issues',
    count: 24,
    countTitle: 'Open',
    countColor: 'warning',
    hint: 'Closed Today',
    hintCount: 19,
    showActions: true,
  },
  {
    title: 'Features',
    count: 38,
    countTitle: 'Proposals',
    countColor: 'success',
    hint: 'Implemented',
    hintCount: 16,
    showActions: true,
  },
];
export const SUMMARY_HEADER_STATISTICS: IDashboardItem[] = [
  {
    count: 214,
    countTitle: 'New Issues',
    countColor: 'purple',
    bgColor: 'secondary-card',
  },
  {
    count: 75,
    countTitle: 'Closed',
    countColor: 'success',
    bgColor: 'secondary-card',
  },
];
export const SUMMARY_FOOTER_STATISTICS: IDashboardItem[] = [
  {
    count: 3,
    countTitle: 'Fixed',
    countColor: 'gray',
    bgColor: 'secondary-card',
  },
  {
    count: 4,
    countTitle: 'Won`t Fix',
    countColor: 'gray',
    bgColor: 'secondary-card',
  },
  {
    count: 8,
    countTitle: 'Re-opend',
    countColor: 'gray',
    bgColor: 'secondary-card',
  },
  {
    count: 6,
    countTitle: 'Needs Triage',
    countColor: 'gray',
    bgColor: 'secondary-card',
  },
];
