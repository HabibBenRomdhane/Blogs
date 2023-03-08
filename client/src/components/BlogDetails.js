import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { ThumbsUp, ThumbsDown } from 'react-feather'
import { useParams } from 'react-router-dom';

const BlogDetails = () => {
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const getBlog = async () => {
            console.log(`Fetching blog with id ${id}`);
            try {
                const response = await axios.get(`http://localhost:5000/api/blogs/${id}`); // ou proxy in package json
                console.log(`Response from server:`, response);
                setBlog(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        getBlog();
    }, [id]);

    console.log(`loading: ${loading}`);
    console.log(`blog:`, blog);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="bloglist">
            <h3>{blog.title}</h3>
            <p><u>By {blog.author}</u></p>
            <p>{blog.content}</p>
            {/* <div className='voteSection'>
                <ThumbsUp size={20} className='vote'></ThumbsUp>
                <ThumbsDown size={20} style={{ marginLeft: "1%" }}></ThumbsDown>
            </div> */}
        </div>
    );
};

export default BlogDetails;
