import React from 'react'
import Pagination from "react-js-pagination";
import { Spinner, Table } from 'react-bootstrap'
import axios from 'axios';

const pageSize = 15;

const HospitalPage = () => {
    const [hospital, setHospital] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const cancelToken = React.useRef(null);

    //pagination
    const [page, setPage] = React.useState(1);
    const [total, setTotal] = React.useState(0);


    const getData = async (page) => {
        try {
            setLoading(true);
            const resp = await axios.get(`https://api.codingthailand.com/api/hospital2?page=${page}&page_size=${pageSize}`, {
                cancelToken: cancelToken.current.token
            });
            console.log(resp.data.data)
            setHospital(resp.data.data);
            setTotal(resp.data.meta.pagination.total)
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);

            setError(false);
        }
    }
    React.useEffect(() => {
        cancelToken.current = axios.CancelToken.source();
        getData(page);

        return () => {
            cancelToken.current.cancel();
        }

    }, [page]);

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

    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
    }

    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col-12 mt-4'></div>
                    <h2>สถานพยาบาล</h2>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Code</th>
                                <th>ชื่อสถานพยาบาล</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                hospital.map((p, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{p.id}</td>
                                            <td>{p.code}</td>
                                            <td>{p.h_name}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                    <br />
                    <Pagination
                        activePage={page}
                        itemsCountPerPage={pageSize}
                        totalItemsCount={total}
                        pageRangeDisplayed={10}
                        onChange={handlePageChange}
                        itemClass="page-item"
                        linkClass="page-link"
                        prevPageText="Prev"
                        nextPageText="Next"
                        firstPageText="First"
                        lastPageText="Last"
                    />
                </div>
            </div>
        </>
    )
}

export default HospitalPage