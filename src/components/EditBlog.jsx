import React, { useEffect, useState } from 'react'
import { BtnBold, BtnBulletList, BtnClearFormatting, BtnItalic, BtnLink, BtnNumberedList, BtnRedo, BtnStrikeThrough, BtnStyles, BtnUnderline, BtnUndo, Editor, EditorProvider, HtmlButton, Separator, Toolbar } from 'react-simple-wysiwyg';
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const EditBlog = () => {
    const [blog, setBlog] = useState([]);
    const params = useParams();

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm()

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

    const fetchBlog = async () => {
        const res = await fetch("http://127.0.0.1:8000/api/blog/" + params.id);
        const result = await res.json();
        setBlog(result.data);
        setDesc(result.data.description);
        reset(result.data);
    };

    const formSubmit = async (data) => {
        // Create a FormData object
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('shortDesc', data.shortDesc);
        formData.append('description', desc);
        formData.append('author', data.author);

        // Check if a new file is selected and append it to FormData
        if (file) {
            formData.append('image', file);
        }

        // console.log('FormData before submission:', Array.from(formData.entries()));

        try {
            const res = await fetch(`http://127.0.0.1:8000/api/blog/${params.id}`, {
                method: "POST",  // Change to POST to handle file upload in Laravel
                headers: {
                    'Accept': 'application/json',
                },
                body: formData,
            });

            // Check if response is JSON
            const contentType = res.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                const response = await res.json();

                if (response.status === 'true') {
                    toast.success("Blog updated successfully.");
                    navigate('/');
                } else {
                    // toast("Failed to update the blog. Please fix the errors.");

                    // Loop through each error and display it in the toaster
                    Object.keys(response.errors).forEach((key) => {
                        response.errors[key].forEach((error) => {
                            toast.error(error);
                        });
                    });
                }
            } else {
                const textResponse = await res.text();
                console.error("Unexpected response:", textResponse);
                toast.error("An error occurred. Please check the server response.");
            }
        } catch (error) {
            console.error("Fetch error:", error);
            toast.error("An error occurred. Please try again.");
        }
    };

    useEffect(() => {
        fetchBlog();
    }, []);

    return (
        <div className="container mb-5">
            <div className="d-flex justify-content-between pt-5 mb-4">
                <h4>Edit Blog</h4>
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

                            <div>
                                {
                                    (blog.image) && <img className='mt-3 text-center' src={`http://127.0.0.1:8000/img/${blog.image}`} style={{ height: '100px' }} />
                                }
                            </div>
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
                        <button className='btn btn-dark mt-3'>Update</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditBlog
