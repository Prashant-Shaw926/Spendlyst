import type { HomeData } from '../../../types/api';
import { request } from '../request';

export function getHome() {
  return request<HomeData>({
    url: '/home',
  });
}
