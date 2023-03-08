import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddBlog from './components/AddBlog';
import BlogList from './components/BlogList';
import BlogDetails from './components/BlogDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/add-blog" element={<AddBlog />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/" element={<BlogList />} />
        
      </Routes>
    </Router>
  );
}

export default App;
