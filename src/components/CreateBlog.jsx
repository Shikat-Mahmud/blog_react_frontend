import React, { useState } from 'react'
import { BtnBold, BtnBulletList, BtnClearFormatting, BtnItalic, BtnLink, BtnNumberedList, BtnRedo, BtnStrikeThrough, BtnStyles, BtnUnderline, BtnUndo, Editor, EditorProvider, HtmlButton, Separator, Toolbar } from 'react-simple-wysiwyg';
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CreateBlog = () => {
    const [desc, setDesc] = useState('');
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    function onChangeDesc(e) {
        setDesc(e.target.value);
    }

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const formSubmit = async (data) => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('shortDesc', data.shortDesc);
        formData.append('description', desc);
        formData.append('author', data.author);
    
        if (file) {
            formData.append('image', file);
        }
    
        try {
            const res = await fetch("http://127.0.0.1:8000/api/blog", {
                method: "POST",
                body: formData
            });
    
            // Check if response is JSON
            const contentType = res.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                const response = await res.json();
    
                if(response.status === 'true') {
                    toast("Blog added successfully.");
                    navigate('/');
                } else {
                    toast("Failed to add the blog. Please fix the errors.");
                }
            } else {
                // Handle unexpected content type (e.g., HTML error page)
                const textResponse = await res.text();
                console.error("Unexpected response:", textResponse);
                toast("An error occurred. Please check the server response.");
            }
        } catch (error) {
            console.error("Fetch error:", error);
            toast("An error occurred. Please try again.");
        }
    };
    

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
                            <input 
                            type="file" 
                            className='form-control'
                            onChange={handleFileChange} />
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
