import React from 'react'
import { MdOutlineModeEdit } from 'react-icons/md';

const BlogCard = () => {
    return (
        <div className="col-12 col-md-4 col-lg-3 my-3">
            <div className="card border-0 shadow-lg rounded-3">
                <img src="https://www.nfnoticias.com.br/images/placeholder/600x400.jpg" alt="card image" className='rounded-top-3' />
                <div className="card-body">
                    <h2 className="h5"></h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt iste nihil quibusdam, facilis officia explicabo, inventore quae numquam optio illo placeat. Asperiores sint, quos quas alias necessitatibus minus consectetur? Voluptatibus?</p>
                    <div className="d-flex justify-content-between">
                        <a href="#" className="btn btn-dark">Details</a>
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
