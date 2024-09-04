import React, { useEffect, useState } from 'react'
import BlogCard from './BlogCard'

const Blogs = () => {
    const [blogs, setBlogs] = useState();

    const fetchBlogs = async () => {
        const res = await fetch('http://127.0.0.1:8000/api/blogs');
        const result = await res.json();
        setBlogs(result.data);

        // console.log(result);
    }

    useEffect(() => {
        fetchBlogs();
    }, []);

    return (
        <div className="container">
            <div className="d-flex justify-content-between pt-5 mb-4">
                <h4>Blogs</h4>
                <a href="/create" className='btn btn-dark'>Create</a>
            </div>
            <div className="row">
                {blogs && blogs.length > 0 ? (
                    blogs.map((blog) => (
                        <BlogCard blogs={blogs} setBlogs={setBlogs} blog={blog} key={blog.id} />
                    ))
                ) : (
                    <div className="col-12">
                        <p className='text-center my-5'>No blogs available at the moment. Please check back later.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Blogs
