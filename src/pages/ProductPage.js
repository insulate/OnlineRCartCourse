import React from 'react';
import axios from 'axios';
import { Table, Image, Spinner } from 'react-bootstrap';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';
import { BsEyeFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

//redux
import { addToCart } from '../redux/actions/cartAction';
import { useSelector, useDispatch } from 'react-redux';


const ProductPage = () => {
    const [product, setProduct] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const cancelToken = React.useRef(null);

    const dispatch = useDispatch();
    const cart = useSelector(state => state.cartReducer.cart);
    // const total = useSelector(state => state.cartReducer.total);


    const getData = async () => {
        try {
            setLoading(true);
            const resp = await axios.get('https://api.codingthailand.com/api/course', {
                cancelToken: cancelToken.current.token
            });
            console.log(resp.data.data)
            setProduct(resp.data.data);
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
    const addCart = (p) => {
        // console.log(p)
        const product = {
            id: p.id,
            name: p.title,
            price: p.view, // สมมุตว่า p.view คือราคา
            qty: 1
        }
        // call action
        dispatch(addToCart(product, cart));
    }
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-12 mt-4'>
                    <h1>Product Page</h1>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>ชื่อคอร์ส</th>
                                <th>รายละเอียด</th>
                                <th>วันที่สร้าง</th>
                                <th>views</th>
                                <th>Picture</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                product.map((p, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{p.id}</td>
                                            <td>{p.title}</td>
                                            <td>{p.detail}</td>
                                            <td>
                                                {
                                                    format(new Date(p.date), 'dd MMM yyyy', { locale: th })
                                                }
                                            </td>
                                            <td>{p.view}</td>
                                            <td>
                                                <Image thumbnail src={p.picture} alt={p.title} width='100px' />
                                            </td>
                                            <td>
                                                <Link to={`/detail/${p.id}/title/${p.title}`}>
                                                    <BsEyeFill />
                                                </Link>
                                                <button
                                                    onClick={() => addCart(p)}
                                                    className='btn btn-outline-success ml-2'
                                                >หยิบใส่ตระกร้า</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default ProductPage