import React, { useState } from 'react'
import { BtnBold, BtnBulletList, BtnClearFormatting, BtnItalic, BtnLink, BtnNumberedList, BtnRedo, BtnStrikeThrough, BtnStyles, BtnUnderline, BtnUndo, Editor, EditorProvider, HtmlButton, Separator, Toolbar } from 'react-simple-wysiwyg';
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CreateBlog = () => {
    const [desc, setDesc] = useState('');
    const navigate = useNavigate();

    function onChangeDesc(e) {
        setDesc(e.target.value);
    }

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const formSubmit = async (data) => {
        const newData = {...data, 'description' : desc};
        
        const res = await fetch("http://127.0.0.1:8000/api/blog", {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newData)
        });

        toast("Blog added successfully.");
        navigate('/');

        // console.log(newData);
    }

    return (
        <div className="container mb-5">
            <div className="d-flex justify-content-between pt-5 mb-4">
                <h4>Create Blog</h4>
                <a href="/" className='btn btn-dark'>Back</a>
            </div>
            <div className="card border-0 shadow-lg">
                <div className="card-body m-3">
                    <form onSubmit={handleSubmit(formSubmit)}>
                        <div className="mb-3">
                            <label className='form-label'>Title</label>
                            <input
                                {...register('title', { required: true })}
                                type="text"
                                className={`form-control ${errors.title && 'is-invalid'}`}
                                placeholder='Blog title'
                            />
                            {errors.title && <p className='invalid-feedback'>Title field is required</p>}
                        </div>
                        <div className="mb-3">
                            <label className='form-label'>Short Description</label>
                            <textarea
                                {...register('shortDesc')}
                                className='form-control'
                                rows={3}
                                placeholder='Blog short description'
                            ></textarea>
                        </div>
                        <div className="mb-3">
                            <label className='form-label'>Description</label>
                            {/* <textarea className='form-control' rows={10} placeholder='Blog descriotion'></textarea> */}
                            <EditorProvider>
                                <Editor
                                    value={desc}
                                    onChange={onChangeDesc}
                                    containerProps={{ style: { height: '300px' } }}
                                    placeholder="Blog description"
                                >
                                    <Toolbar>
                                        <BtnUndo />
                                        <BtnRedo />
                                        <Separator />
                                        <BtnBold />
                                        <BtnItalic />
                                        <BtnUnderline />
                                        <BtnStrikeThrough />
                                        <Separator />
                                        <BtnNumberedList />
                                        <BtnBulletList />
                                        <Separator />
                                        <BtnLink />
                                        <BtnClearFormatting />
                                        <HtmlButton />
                                        <Separator />
                                        <BtnStyles />
                                    </Toolbar>
                                </Editor>
                            </EditorProvider>
                        </div>
                        <div className="mb-3">
                            <label className='form-label'>Image</label>
                            <input type="file" className='form-control' />
                        </div>
                        <div className="mb-3">
                            <label className='form-label'>Author</label>
                            <input
                                {...register('author', { required: true })}
                                type="text"
                                className={`form-control ${errors.author && 'is-invalid'}`}
                                placeholder='Blog author'
                            />
                            {errors.author && <p className='invalid-feedback'>Author field is required</p>}
                        </div>
                        <button className='btn btn-dark mt-3'>Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateBlog
