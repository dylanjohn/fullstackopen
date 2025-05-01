import { useState } from 'react';

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title,
      author,
      url,
    });

    // Clear form
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div>
    <h2 className="text-xl font-bold mb-4">Create new blog</h2>
    <form onSubmit={addBlog}>
      <div className="flex flex-col gap-2 mb-3">
        <label htmlFor="title" className="text-sm font-medium">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          placeholder="Blog title"
          required
          className="px-3 py-2 border border-gray-200 rounded-md text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-800"
        />
      </div>
      
      <div className="flex flex-col gap-2 mb-3">
        <label htmlFor="author" className="text-sm font-medium">
          Author
        </label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          placeholder="Blog author"
          required
          className="px-3 py-2 border border-gray-200 rounded-md text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-800"
        />
      </div>
      
      <div className="flex flex-col gap-2 mb-4">
        <label htmlFor="url" className="text-sm font-medium">
          URL
        </label>
        <input
          type="text"
          id="url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          placeholder="Blog URL"
          required
          className="px-3 py-2 border border-gray-200 rounded-md text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-800"
        />
      </div>
      
      <button 
        id="create-button" 
        type="submit"
        className="rounded-md bg-black text-white px-4 py-2 text-sm font-medium hover:bg-gray-800 cursor-pointer"
      >
        Create
      </button>
    </form>
  </div>
  );
};

export default BlogForm;
