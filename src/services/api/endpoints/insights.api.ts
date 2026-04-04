import type { InsightsData } from '../../../types/api';
import { request } from '../request';

export function getInsights() {
  return request<InsightsData>({
    url: '/insights',
  });
}
