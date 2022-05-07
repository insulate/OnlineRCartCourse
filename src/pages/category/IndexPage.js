import React from 'react'
import { Spinner, Table, Button } from 'react-bootstrap'
import axios from 'axios';
import { BsPencil, BsTrash } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const IndexPage = () => {
    const [category, setCategory] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const cancelToken = React.useRef(null);
    const navigate = useNavigate();


    const getData = async () => {
        try {
            setLoading(true);
            const resp = await axios.get(`https://api.codingthailand.com/api/category`, {
                cancelToken: cancelToken.current.token
            });
            console.log(resp.data)
            setCategory(resp.data);
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);

            setError(false);
        }
    }
    React.useEffect(() => {
        cancelToken.current = axios.CancelToken.source();
        getData();

        return () => {
            cancelToken.current.cancel();
        }

    }, []);

    if (loading === true) {
        return (
            <div className='text-center mt-5'>
                <Spinner animation="border" variant="primary" />
            </div>
        )
    }
    if (error === true) {
        return (
            <div className='text-center mt-5'>
                <p>เกิดข้อผิดพลาด กรุณาลองใหม่!</p>
            </div>
        )
    }

    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col-12 mt-4'>
                        <Button className="mb-3" variant="success" onClick={() => {
                            navigate('/category/create');
                        }}>เพิ่มข้อมูล</Button>
                        <h2>หมวดหมู่ข่าว</h2>
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>หมวดหมู่ข่าว</th>
                                    <th>เครื่องมือ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    category.map((c, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{c.id}</td>
                                                <td>{c.name}</td>
                                                <td>
                                                    <Button className="ml-2" variant="outline-warning">
                                                        <BsPencil />
                                                    </Button>
                                                    <Button className="ml-2" variant="outline-danger">
                                                        <BsTrash />
                                                    </Button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                        <br />
                    </div>
                </div>
            </div>
        </>
    )
}

export default IndexPage