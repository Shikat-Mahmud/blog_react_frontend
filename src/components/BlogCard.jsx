import React from 'react'
import { MdOutlineDelete, MdOutlineModeEdit } from 'react-icons/md';
import { toast } from 'react-toastify';

const BlogCard = ({ blog, blogs, setBlogs }) => {
    const showImage = (img) => {
        return (img) ? "http://127.0.0.1:8000/img/" + img : "https://placehold.co/600x400";
    }

    const handleDeleteBlog = (id) => {
        if (confirm("Are you sure you want to delete the blog?")) {
            const res = fetch("http://127.0.0.1:8000/api/blog/" + id, {
                method: 'DELETE'
            });

            const newBlogs = blogs.filter((blog) => blog.id != id);
            setBlogs(newBlogs);

            toast.success("Blog deleted successfully.");
        }
    }

    return (
        <div className="col-12 col-md-4 col-lg-3 my-3">
            <div className="card border-0 shadow-lg rounded-3">
                {/* <img src="https://placehold.co/600x400'" alt="card image" className='rounded-top-3' /> */}
                <img src={showImage(blog.image)} alt="card image" className='rounded-top-3' style={{ height: '200px', objectFit: 'cover' }} />
                <div className="card-body">
                    <h2 style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}>
                        {blog.title}
                    </h2>
                    <p style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}>
                        {blog.shortDesc}
                    </p>
                    <div className="d-flex justify-content-between">
                        <a href={`/blog/${blog.id}`} className="btn btn-dark">Details</a>
                        <div className='m-2'>
                            <a href="#" onClick={() => handleDeleteBlog(blog.id)} className="bg-danger p-2 rounded text-white me-2">
                                <MdOutlineDelete />
                            </a>
                            <a href={`/edit/blog/${blog.id}`} className="bg-info p-2 rounded text-white">
                                <MdOutlineModeEdit />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogCard
