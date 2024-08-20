import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const BlogDetail = () => {
    const [blog, setBlog] = useState([]);
    const params = useParams();

    // console.log(params.id);

    const fetchBlog = async () => {
        const res = await fetch("http://127.0.0.1:8000/api/blog/"+params.id);
        const result = await res.json();
        setBlog(result.data);
    };

    useEffect(() => {
        fetchBlog();
    },[]);

  return (
    <div className='container'>
        <div className="d-flex justify-content-between pt-5 mb-4">
            <h2>{blog.title}</h2>
            <div>
                <a href='/' className='btn btn-dark'>back to blogs</a>
            </div>
        </div>
        <div className='row'>
            <div className='col-md-12'>
                <p>by <strong>{blog.author}</strong> on {blog.date}</p>

                <div className='mt-3 text-secondary'>
                    <h5>"{blog.shortDesc}"</h5>
                </div>

                {
                    (blog.image) && <img className='w-50 mt-3 text-center' src={`http://127.0.0.1:8000/img/${blog.image}`} />
                }

                <div className='mt-5' dangerouslySetInnerHTML={{ __html: blog.description }}>
                {/* <div className='mt-5'>
                    <p>{blog.description}</p> */}
                </div>
            </div>
        </div>
    </div>
  )
}

export default BlogDetail
