import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchForm from '@/app/components/SearchForm';

// Router mock used in tests
const pushMock = jest.fn();

// Mock next/navigation router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

// Mock server action
jest.mock('@/app/actions', () => ({
  searchWord: jest.fn(),
}));

const mockedSearchWord = jest.requireMock('@/app/actions')
  .searchWord as jest.Mock;

describe('SearchForm', () => {
  beforeEach(() => {
    mockedSearchWord.mockReset();
  });

  it('shows validation error when submitting empty input', async () => {
    render(<SearchForm />);

    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);

    expect(
      await screen.findByText(/please enter a word to search/i)
    ).toBeInTheDocument();
  });

  it('shows not-found error and does not navigate when word is not found', async () => {
    mockedSearchWord.mockResolvedValueOnce(null);

    render(<SearchForm />);

    const input = screen.getByPlaceholderText(/enter a word/i);
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'nonexistent' } });
    fireEvent.click(button);

    expect(mockedSearchWord).toHaveBeenCalledWith('nonexistent');

    await waitFor(() => {
      expect(
        screen.getByText(/word "nonexistent" not found in the dictionary/i)
      ).toBeInTheDocument();
    });
  });

  it('navigates to word page when word is found', async () => {
    mockedSearchWord.mockResolvedValueOnce({ id: '1' });

    render(<SearchForm />);

    const input = screen.getByPlaceholderText(/enter a word/i);
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'hello' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith('/word/hello');
    });
  });

  it('shows API error and does not navigate when search throws', async () => {
    mockedSearchWord.mockRejectedValueOnce(new Error('API error'));

    render(<SearchForm />);

    const input = screen.getByPlaceholderText(/enter a word/i);
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'hello' } });
    fireEvent.click(button);

    expect(mockedSearchWord).toHaveBeenCalledWith('hello');

    await waitFor(() => {
      expect(
        screen.getByText(
          /failed to connect to dictionary service\. please try again\./i
        )
      ).toBeInTheDocument();
    });
  });
});

