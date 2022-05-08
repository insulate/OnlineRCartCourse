import React from 'react'
import { Form, Button, Container, Col, Row } from 'react-bootstrap'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserStoreContext } from '../context/UserContext';

import { useDispatch } from 'react-redux'; // for call actions from redux
import { updateProfile } from '../redux/actions/authAction';

const schema = yup.object({
    email: yup.string().required('อีเมล์ห้ามว่าง').email('รูปแบบอีเมล์ไม่ถูกต้อง'),
    password: yup.string().required('รหัสผ่านห้ามว่าง').min(6, 'รหัสผ่านต้องมี 6 ตัวอักษรขึ้นไป'),
}).required();

const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const navigate = useNavigate();
    // const userStore = React.useContext(UserStoreContext); // context

    // call redux action
    const dispatch = useDispatch();

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
            const apiUrl = 'https://api.codingthailand.com/api/login';
            const resp = await axios.post(apiUrl, {
                email: data.email,
                password: data.password
            });

            localStorage.setItem('token', JSON.stringify(resp.data));

            //get profile
            const apiUrlProfile = 'https://api.codingthailand.com/api/profile';
            const respProfile = await axios.get(apiUrlProfile, {
                headers: {
                    Authorization: `Bearer ${resp.data.access_token}`
                }
            });
            localStorage.setItem('profile', JSON.stringify(respProfile.data.data.user));
            // navigate(0);
            // update profile by context
            const profileVale = JSON.parse(localStorage.getItem('profile'));
            // userStore.updateProfile(profileVale); // update profile by context
            dispatch(updateProfile(profileVale)); // update profile by redux
            notifySuccess('เข้าสู่ระบบเรียบร้อยแล้ว');
            navigate('/');
        } catch (error) {
            notifyDanger(error.response.data.message);
        }
    };
    return (
        <Container>
            <Row className="mt-4">
                <Col xs={12} md={8}>
                    <h1>เข้าสู่ระบบ</h1>
                    <Form onSubmit={handleSubmit(onSubmit)}>
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

export default LoginPage