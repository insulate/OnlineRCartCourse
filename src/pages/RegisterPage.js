import React from 'react'
import { Form, Button, Container, Col, Row } from 'react-bootstrap'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const schema = yup.object({
    name: yup.string().required('ชื่อ-สกุลห้ามว่าง'),
    email: yup.string().required('อีเมล์ห้ามว่าง').email('รูปแบบอีเมล์ไม่ถูกต้อง'),
    password: yup.string().required('รหัสผ่านห้ามว่าง').min(6, 'รหัสผ่านต้องมี 6 ตัวอักษรขึ้นไป'),
}).required();

const RegisterPage = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const notifySuccess = (msg) => {
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

    const notifyDanger = (msg) => {
        toast.error(msg, {
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
        console.log(data);
        try {
            const apiUrl = 'https://api.codingthailand.com/api/register';
            const resp = await axios.post(apiUrl, {
                name: data.name,
                email: data.email,
                password: data.password
            });

            notifySuccess(resp.data.message);
            navigate('/login');
        } catch (error) {
            notifyDanger(error.response.data.message);
        }
    };
    return (
        <Container>
            <Row className="mt-4">
                <Col xs={12} md={8}>
                    <h1>สมัครสมาชิก</h1>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>ชื่อ-สกุล</Form.Label>
                            <Form.Control type="text" name="name" {...register("name")} className={errors.name ? 'is-invalid' : ''} />
                            <Form.Control.Feedback type="invalid">
                                {errors.name?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" {...register("email")} className={errors.email ? 'is-invalid' : ''} />
                            <Form.Control.Feedback type="invalid">
                                {errors.email?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" {...register("password")} className={errors.password ? 'is-invalid' : ''} />
                            <Form.Control.Feedback type="invalid">
                                {errors.password?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            บันทึก
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default RegisterPage