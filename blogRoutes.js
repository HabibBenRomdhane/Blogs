import express from 'express';
// import { getBlogs, createBlog } from './blogControllers.js';
import Blog from './blogModel.js';


const router = express.Router(); // setup the router


// router.get('/readALL', getBlogs);
// router.get('/create', createBlog);

// Create a new blog post
router.post('/', async (req, res) => {
    const { title, content, author } = req.body;
    const blog = new Blog({
      title,
      content,
      author
    });
    try {
      const savedBlog = await blog.save();
      res.status(201).json(savedBlog);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });

  router.get('/', async (req, res) => {
    try {
      const blogs = await Blog.find();
      res.json(blogs);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    }
  });

  router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const blog = await Blog.findById(id);
      if (!blog) {
        res.status(404).json({ error: 'Blog not found' });
      } else {
        res.status(200).json(blog);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Update a blog post by ID
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { counterUp, counterDown } = req.body;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, { counterUp, counterDown }, { new: true });
    res.status(200).json(updatedBlog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});



export default router;