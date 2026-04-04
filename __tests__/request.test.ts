import { request } from '../src/services/api/request';

describe('request', () => {
  it('returns the standardized success payload for mock responses', async () => {
    const response = await request<{ headerTitle: string }>({
      url: '/home',
      retryCount: 0,
    });

    expect(response).toMatchObject({
      success: true,
      data: {
        headerTitle: 'Hi, Welcome Back',
      },
    });
  });

  it('normalizes unauthorized mock responses into a typed API error', async () => {
    await expect(
      request({
        url: '/home',
        params: {
          __mockStatus: 401,
        },
        retryCount: 0,
      }),
    ).rejects.toMatchObject({
      status: 401,
      code: 'API_ERROR',
      message: 'Unauthorized',
      retryable: false,
    });
  });

  it('keeps server errors retryable for callers that want retry behavior', async () => {
    await expect(
      request({
        url: '/transactions',
        params: {
          __mockStatus: 500,
        },
        retryCount: 1,
        retryDelayMs: 1,
      }),
    ).rejects.toMatchObject({
      status: 500,
      code: 'API_ERROR',
      message: 'Server error',
      retryable: true,
    });
  });
});
