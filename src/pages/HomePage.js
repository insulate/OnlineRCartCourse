import React from 'react'
import { useQuery } from 'react-query'
import { BsFillHeartFill } from 'react-icons/bs'
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

const HomePage = () => {

    // const { isLoading, error, data } = useQuery('getData', () =>
    //     fetch('https://api.codingthailand.com/api/news?page=1&per_page=3').then(res =>
    //         res.json()
    //     )
    // )

    const query = useQuery('getData', () => {
        const controller = new AbortController();
        const signal = controller.signal;
        const promise = fetch('https://api.codingthailand.com/api/news?page=1&per_page=3', {
            method: 'get', signal: signal
        }).then(res =>
            res.json()
        )
        //cancel request
        promise.cancel = () => controller.abort();
        return promise;
    })

    const { isLoading, error, data } = query;

    if (isLoading === true) {
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
                <p>เ{JSON.stringify(error)}</p>
            </div>
        )
    }

    return (
        <>
            <main role="main">
                {/* Main jumbotron for a primary marketing message or call to action */}
                <div className="jumbotron">
                    <div className="container">
                        <h1 className="display-3">Welcome to my website online course</h1>
                        <p>this web use React for development {' '} <BsFillHeartFill color='red' size='2em' /> </p>
                        <p>

                            <Link className="btn btn-primary btn-lg" role="button" to="product">All Products »</Link>
                        </p>
                    </div>
                </div>
                <div className="container">
                    {/* Example row of columns */}
                    <div className="row">
                        {
                            data.data.map((news, index) => {
                                return (
                                    <div key={index}>
                                        <div className="col-md-4" >
                                            <h2>{news.topic}</h2>
                                            <p>{news.detail}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <hr />
                </div> {/* /container */}
            </main>
        </>
    )
}

export default HomePage