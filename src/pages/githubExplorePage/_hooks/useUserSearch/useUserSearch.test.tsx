import { renderHook } from '@testing-library/react';
import { waitFor } from '@testing-library/react';
import { useSearch } from './index';
import api from '../../../../lib/axios';
import { GithubUser } from '../../../../types/githubUser';
import { GitHubUserSearchResponse } from '../../../../types/guthubUserResponse';

jest.mock('../../../../lib/axios');
const mockedApi = api as jest.Mocked<typeof api>;

const mockUsers: GithubUser[] = [
  {
    login: 'octocat',
    id: 1,
    avatar_url: 'https://github.com/images/error/octocat_happy.gif',
  },
];

const mockResponse: GitHubUserSearchResponse = {
  total_count: 1,
  incomplete_results: false,
  items: mockUsers,
};

describe('useSearch', () => {
  beforeEach(() => {
    jest.useFakeTimers(); // untuk mengontrol debounce
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('should not fetch users if query is empty', () => {
    renderHook(() => useSearch(''));
    expect(mockedApi.get).not.toHaveBeenCalled();
  });

  it('should fetch users after 500ms debounce', async () => {
    mockedApi.get.mockResolvedValueOnce({ data: mockResponse });

    const { result } = renderHook(() => useSearch('octocat'));

    // Jalankan timer debounce
    jest.advanceTimersByTime(500);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(mockedApi.get).toHaveBeenCalledWith('/search/users?q=octocat&per_page=5');
    expect(result.current.users).toEqual(mockUsers);
    expect(result.current.error).toBeNull();
  });

  it('should handle API error (axios)', async () => {
    mockedApi.get.mockRejectedValueOnce({
      isAxiosError: true,
      response: { data: { message: 'User not found' } },
    });

    const { result } = renderHook(() => useSearch('error'));

    jest.advanceTimersByTime(500);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('User not found');
    expect(result.current.users).toEqual([]);
  });

  it('should handle non-axios error', async () => {
    mockedApi.get.mockRejectedValueOnce(new Error('Something went wrong'));

    const { result } = renderHook(() => useSearch('error'));

    jest.advanceTimersByTime(500);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('An unexpected error occurred');
    expect(result.current.users).toEqual([]);
  });
});
