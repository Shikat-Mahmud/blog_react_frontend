import React, { useEffect, useState } from 'react'
import BlogCard from './BlogCard'
import { IoSearch } from 'react-icons/io5';
import { GrPowerReset } from 'react-icons/gr';

const Blogs = () => {
    const [blogs, setBlogs] = useState();
    const [keyword, setKeyword] = useState('');

    const fetchBlogs = async () => {
        const res = await fetch('http://127.0.0.1:8000/api/blogs');
        const result = await res.json();
        setBlogs(result.data);

        // console.log(result);
    }

    const handleSearchBlog = async (e) => {
        e.preventDefault();

        const res = await fetch('http://127.0.0.1:8000/api/blogs?keyword=' + keyword);
        const result = await res.json();
        setBlogs(result.data);
    }

    const handleResetSearch = () => {
        fetchBlogs();
        setKeyword('');
    }

    useEffect(() => {
        fetchBlogs();
    }, []);

    return (
        <div className="container">
            <div className="d-flex justify-content-center pt-5 mb-4">
                <form onSubmit={(e) => handleSearchBlog(e)}>
                    <div className="d-flex">
                        <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} className='form-control' placeholder='Search blogs' />
                        <button className='btn btn-dark ms-2 d-flex align-items-center justify-content-center'>
                            <IoSearch />
                        </button>
                        <button type='button' onClick={() => handleResetSearch()} className='btn btn-success ms-2 d-flex align-items-center justify-content-center'>
                            <GrPowerReset />
                        </button>
                    </div>
                </form>
            </div>
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
