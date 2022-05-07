import React from 'react'

import axios from 'axios';

const AboutPage = () => {
    const [version, setVersion] = React.useState('');
    const getData = async () => {
        const resp = await axios.get('https://api.codingthailand.com/api/version');
        console.log(resp.data.data.version);
        setVersion(resp.data.data.version);
    }

    React.useEffect(() => {
        getData();
    }, []);
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-12 mt-4'>
                    <h1>About</h1>
                    {
                        version && (
                            <p>Backend api version: {version}</p>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default AboutPage