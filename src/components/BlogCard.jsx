import React from 'react'
import { MdOutlineModeEdit } from 'react-icons/md';

const BlogCard = ({ blog }) => {
    const showImage = (img) => {
        return (img) ? "http://127.0.0.1:8000/img/" + img : "https://placehold.co/600x400";
    }
    return (
        <div className="col-12 col-md-4 col-lg-3 my-3">
            <div className="card border-0 shadow-lg rounded-3">
                {/* <img src="https://placehold.co/600x400'" alt="card image" className='rounded-top-3' /> */}
                <img src={showImage(blog.image)} alt="card image" className='rounded-top-3' />
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
                        <a href="#" className="text-dark">
                            <MdOutlineModeEdit />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogCard
