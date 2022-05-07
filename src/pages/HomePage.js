import React from 'react'
import { BsFillHeartFill } from 'react-icons/bs'
import { Link } from 'react-router-dom';

const HomePage = () => {
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
                        <div className="col-md-4">
                            <h2>Heading</h2>
                            <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>

                        </div>
                        <div className="col-md-4">
                            <h2>Heading</h2>
                            <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>

                        </div>
                        <div className="col-md-4">
                            <h2>Heading</h2>
                            <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>

                        </div>
                    </div>
                    <hr />
                </div> {/* /container */}
            </main>
        </>
    )
}

export default HomePage