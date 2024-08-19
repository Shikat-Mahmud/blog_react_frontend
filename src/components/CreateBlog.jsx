import React, { useState } from 'react'
import { BtnBold, BtnBulletList, BtnClearFormatting, BtnItalic, BtnLink, BtnNumberedList, BtnRedo, BtnStrikeThrough, BtnStyles, BtnUnderline, BtnUndo, Editor, EditorProvider, HtmlButton, Separator, Toolbar } from 'react-simple-wysiwyg';

const CreateBlog = () => {
    const [html, setHtml] = useState('');

    function onChange(e) {
        setHtml(e.target.value);
    }

    return (
        <div className="container mb-5">
            <div className="d-flex justify-content-between pt-5 mb-4">
                <h4>Create Blog</h4>
                <a href="/" className='btn btn-dark'>Back</a>
            </div>
            <div className="card border-0 shadow-lg">
                <div className="card-body">
                    <div className="mb-3">
                        <label htmlFor="" className='form-label'>Title</label>
                        <input type="text" className='form-control' placeholder='Blog title' />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="" className='form-label'>Description</label>
                        {/* <textarea className='form-control' rows={10} placeholder='Blog descriotion'></textarea> */}
                        <EditorProvider>
                            <Editor
                                value={html}
                                onChange={onChange}
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
                        <label htmlFor="" className='form-label'>Image</label>
                        <input type="file" className='form-control' />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="" className='form-label'>Author</label>
                        <input type="text" className='form-control' placeholder='Blog author' />
                    </div>
                    <button className='btn btn-dark'>Create</button>
                </div>
            </div>
        </div>
    )
}

export default CreateBlog
