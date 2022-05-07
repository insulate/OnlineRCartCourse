import React from 'react'
import { Col, Row, Container } from 'react-bootstrap'
import { useForm } from "react-hook-form";
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SUPPORTED_IMAGE_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];


const UploadPage = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({});
    const notify = (msg) => {
        toast.success(msg, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };
    const onSubmit = async (data) => {
        // console.log(data);
        try {
            let fileUpload = data.picture[0];
            const reader = new FileReader();
            reader.readAsDataURL(fileUpload);
            reader.onload = async (e) => {
                let base64Image = e.target.result;
                const urlAPI = 'https://api.codingthailand.com/api/upload';
                const resp = await axios.post(urlAPI, {
                    picture: base64Image
                });
                notify(resp.data.data.message);
                // alert(resp.data.data.message);
                console.log(resp.data.data.url);
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Container className='mt-4'>
                <Row>
                    <Col xs={12} md={8}>
                        <h1>Upload Image</h1>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlFile1">เลือกไฟล์ภาพที่นี่</label>
                                <input type="file" name='picture'
                                    accept=".jpg,.jpeg,.png"
                                    {...register('picture', {
                                        required: 'กรุณาเลือกไฟล์ภาพ',
                                        validate: {
                                            supportedFormat: value => SUPPORTED_IMAGE_FORMATS.includes(value[0].type)
                                        }
                                    })}
                                    className={errors.picture ? 'form-control-file is-invalid' : 'form-control-file'} />
                                <Form.Control.Feedback type="invalid">
                                    {errors.picture?.message}
                                </Form.Control.Feedback>
                                {
                                    errors.picture && errors.picture.type === 'supportedFormat' && (
                                        <Form.Control.Feedback type="invalid">
                                            ไฟล์ภาพไม่รองรับ
                                        </Form.Control.Feedback>
                                    )
                                }

                            </div>
                            <Button variant="primary" type="submit">
                                บันทึก
                            </Button>
                        </form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default UploadPage