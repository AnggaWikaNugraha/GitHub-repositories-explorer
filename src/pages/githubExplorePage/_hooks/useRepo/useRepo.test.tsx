import { renderHook } from '@testing-library/react';
import { useFetchRepos } from './index';
import { waitFor } from '@testing-library/react';
import api from '../../../../lib/axios';
import { GithubRepo } from '../../../../types/githubRepo';

jest.mock('../../../../lib/axios');
const mockedApi = api as jest.Mocked<typeof api>;

const mockRepos: GithubRepo[] = [
  {
    id: 1,
    name: 'my-repo',
    html_url: 'https://github.com/user/my-repo',
    description: 'desc',
    stargazers_count: 100,
  },
];

describe('useFetchRepos', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should not call API when expand is false', async () => {
    renderHook(() => useFetchRepos('user', false));
    expect(mockedApi.get).not.toHaveBeenCalled();
  });

  it('should fetch repos when expand is true', async () => {
    mockedApi.get.mockResolvedValueOnce({ data: mockRepos });

    const { result } = renderHook(() => useFetchRepos('user', true));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(mockedApi.get).toHaveBeenCalledWith('/users/user/repos');
    expect(result.current.repos).toEqual(mockRepos);
    expect(result.current.error).toBeNull();
  });

  it('should set error on API failure', async () => {
    mockedApi.get.mockRejectedValueOnce({
      response: { data: { message: 'Not Found' } },
      isAxiosError: true,
    });

    const { result } = renderHook(() => useFetchRepos('user', true));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('Not Found');
    expect(result.current.repos).toEqual([]);
  });

  it('should handle non-Axios error', async () => {
    mockedApi.get.mockRejectedValueOnce(new Error('Something broke'));

    const { result } = renderHook(() => useFetchRepos('user', true));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('An unexpected error occurred');
    expect(result.current.repos).toEqual([]);
  });
});
