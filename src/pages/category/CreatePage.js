import React from 'react'
import { Form, Button, Container, Col, Row } from 'react-bootstrap'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const schema = yup.object({
    name: yup.string().required('หมวดหมู่ห้ามว่าง'),
}).required();

const CreatePage = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const onSubmit = async (data) => {
        // console.log(data);
        const apiUrl = 'https://api.codingthailand.com/api/category';
        const resp = await axios.post(apiUrl, {
            name: data.name
        });
        alert(resp.data.message);
        navigate('/category');
    };
    return (
        <Container>
            <Row className="mt-4">
                <Col xs={12} md={8}>
                    <h1>เพิ่มหมวดหมู่ข่าว</h1>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>หมวดหมู่ข่าว</Form.Label>
                            <Form.Control type="text" name="name" {...register("name")} className={errors.name ? 'is-invalid' : ''} />
                            <Form.Control.Feedback type="invalid">
                                {errors.name?.message}
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

export default CreatePage