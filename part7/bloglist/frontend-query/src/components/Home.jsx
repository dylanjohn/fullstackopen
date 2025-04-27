import BlogForm from './BlogForm';
import BlogsList from './BlogsList';
import Togglable from './Togglable';

const Home = ({ user, blogFormRef, addBlog, handleLike, handleDelete }) => {
  return (
    <>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>

      <BlogsList
        user={user}
        handleLike={handleLike}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default Home;