import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { test, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router';
import Blog from './Blog';

const blog = {
  title: 'Test Blog',
  author: 'John Doe',
  url: 'http://example.com',
  likes: 5,
  user: { name: 'John Doe' },
};

test('renders title and author but not url or likes', () => {
  const { container } = render(
    <BrowserRouter>
      <Blog blog={blog} />
    </BrowserRouter>
  );

  const basicInfo = container.querySelector('.blog-basic');
  const details = container.querySelector('.blog-details');

  expect(basicInfo).toHaveTextContent('Test Blog');
  expect(basicInfo).toHaveTextContent('John Doe');
  expect(details).toHaveStyle({ display: 'none' });
});

test('url and likes are shown when view button is clicked', async () => {
  const { container } = render(
    <BrowserRouter>
      <Blog blog={blog} />
    </BrowserRouter>
  );
  const user = userEvent.setup();

  const button = screen.getByText('view');
  await user.click(button);

  const details = container.querySelector('.blog-details');
  expect(details).not.toHaveStyle({ display: 'none' });
  expect(details).toHaveTextContent('http://example.com');
  expect(details).toHaveTextContent('likes 5');
});

test('like button calls event handler twice when clicked twice', async () => {
  const mockHandler = vi.fn();
  const user = userEvent.setup();

  render(
    <BrowserRouter>
      <Blog blog={blog} handleLike={mockHandler} handleDelete={() => {}} />
    </BrowserRouter>
  );

  const viewButton = screen.getByText('view');
  await user.click(viewButton);

  const likeButton = screen.getByText('like');
  await user.click(likeButton);
  await user.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
