import React from 'react'

import { useParams, useNavigate } from 'react-router-dom';
import { Spinner, CardGroup, Card, Button } from 'react-bootstrap';
import axios from 'axios';

const DetailPage = () => {
    const navigate = useNavigate();
    const { id, title } = useParams();
    const [detail, setDetail] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const cancelToken = React.useRef(null);
    const getData = async (id) => {
        try {
            setLoading(true);
            const resp = await axios.get(`https://api.codingthailand.com/api/course/${id}`, {
                cancelToken: cancelToken.current.token
            });
            console.log(resp.data.data)
            setDetail(resp.data.data);
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);

            setError(false);
        }
    }
    React.useEffect(() => {
        cancelToken.current = axios.CancelToken.source();
        getData(id);

        return () => {
            cancelToken.current.cancel();
        }

    }, [id]);

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
        <div className='container'>
            <div className='row'>
                <div className='col-12 mt-4'>
                    <h2>{title} - {id}</h2>
                    <Button variant='secondary' onClick={() => {
                        navigate(-1);
                    }}>Back</Button>
                    <div className='row'>
                        <CardGroup>
                            {
                                detail.length > 0 ? (
                                    detail.map((item, index) => {
                                        return (
                                            <div className='col-md-4 mt-4'>
                                                <Card>
                                                    <Card.Body>
                                                        <Card.Title>{item.title}</Card.Title>
                                                        <Card.Text>
                                                            {item.ch_title}
                                                        </Card.Text>
                                                    </Card.Body>
                                                    <Card.Footer>
                                                        <small className="text-muted">{item.ch_dateadd}</small>
                                                    </Card.Footer>
                                                </Card>
                                            </div>
                                        )

                                    })
                                ) : (
                                    <p>ไม่พบข้อมูล...</p>
                                )
                            }

                        </CardGroup>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailPage