import React, { useState } from 'react';
import axios from 'axios';
import { Button, FormGroup, Label, Form, Input } from 'reactstrap';
import './../design.css'
import { useNavigate } from "react-router-dom";

function AddBlog() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/blogs', { title, content, author });
      setTitle('');
      setContent('');
      setAuthor('');
      // if (response.status === 201) {
      //   setTimeout(() => {
      //     window.location.href = '/blogs';
      //   }, 1000);      }
      navigate("/");

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='add-blog'>
      <h2 style={{ textAlign: "center" }}>Add a new blog</h2>
      <Form>
        <FormGroup className='form-group'>
          <Label className='label'>Title:</Label>
          <Input
            name="title"
            type="text"
            className='input'
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Title"

          />
        </FormGroup>
        <FormGroup className='form-group'>
          <Label className='label'>Author:</Label>
          <Input
            name="author"
            type="text"
            className='input'
            value={author}
            onChange={e => setAuthor(e.target.value)}
            placeholder="Author"
          />
        </FormGroup>
        <FormGroup className='form-group'>
          <Label className='label'>Content:</Label>
          <Input
            name="content"
            value={content}
            type="textarea"
            className='input'
            style={{ marginBottom: "1rem" }}
            onChange={e => setContent(e.target.value)}
            placeholder="Content"
          />

        </FormGroup>
        <FormGroup className='form-group'>
          <Button
            variant="outline-success"
            style={{ width: "100%", marginBottom: "1rem" }}
            onClick={handleSubmit}
            className="submitBtn"
          >Submit</Button>
        </FormGroup>
      </Form>
    </div>
  );
}

export default AddBlog;
