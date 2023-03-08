import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar.js';
import { Button } from 'reactstrap';
import { Link } from "react-router-dom";
import { ThumbsUp, ThumbsDown } from 'react-feather'



function BlogList() {

  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  // recherche par title ...
  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredBlogs(blogs);
    } else {
      const filtered = blogs.filter(blog => {
        return blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.author.toLowerCase().includes(searchTerm.toLowerCase());
      });
      console.log(searchTerm);
      console.log(filtered);
      console.log(blogs);
      setFilteredBlogs([...filtered]);
    }
  };

 const handleCount = async (id, isLike) => {
  
  const blogToUpdate = filteredBlogs.find(blog => blog._id === id); // Find the blog post to update
  console.log(blogToUpdate);
  
  const response = await axios.put(`http://localhost:5000/api/blogs/${id}`, { // Send PUT request to the server
    ...blogToUpdate,
    counterUp: isLike ? blogToUpdate.counterUp + 1 : blogToUpdate.counterUp,
    counterDown: !isLike ? blogToUpdate.counterDown + 1 : blogToUpdate.counterDown
  });
  console.log(blogToUpdate);
  const updatedBlog = response.data;
  const updatedBlogs = filteredBlogs.map(blog => {
    if (blog._id === updatedBlog._id) {
      return updatedBlog;
    }
    return blog;
  });

  setFilteredBlogs(updatedBlogs);
}



useEffect(() => {
  async function fetchData() {
    try {
      const response = await axios.get('http://localhost:5000/api/blogs');
      const updatedBlogs = response.data.map(blog => {
        return { ...blog, counterUp: 0, counterDown: 0 };
      });
      setBlogs(updatedBlogs);
      setFilteredBlogs(updatedBlogs);
    } catch (err) {
      console.error(err);
    }
  }

  fetchData();
}, []);


  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response = await axios.get('http://localhost:5000/api/blogs');
  //       setBlogs(response.data);
  //       setFilteredBlogs(response.data);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }

  //   fetchData();
  // }, []);

  return (
    <div>
      <div className='header'>
        <h2>List of blogs</h2>
        <SearchBar handleSearch={handleSearch} />
        <Button
          variant="outline-success"
          onClick={() => window.location.href = '/add-blog'}
          className="btnList"
        >Create a blog</Button>
      </div>
      {filteredBlogs.map(blog => (
        <div key={blog._id} className={`${blog.counterUp > blog.counterDown ? 'bloglistGreen' : blog.counterUp === blog.counterDown ? 'bloglist' : 'bloglistRed'} `}>
          <h3>{blog.title}</h3>
          <p><u>By {blog.author}</u></p>
          <p>{blog.content.substring(0, 200)}... <Link to={`/blog/${blog._id}`}>Continue Reading</Link> </p>
          <div className='voteSection'>
            <div className='voteUp'>
              <ThumbsUp size={30} onClick={() => handleCount(blog._id, true)} />
              <p>{blog.counterUp}</p>
            </div>
            <div className='voteDown'>
              <ThumbsDown size={30} onClick={() => handleCount(blog._id, false)} />
              <p>{blog.counterDown}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BlogList;
