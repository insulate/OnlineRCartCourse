import React from 'react'

const Sidebar = () => {
    // let fullname = 'John';
    const [fullname, setFullname] = React.useState('John');
    const changeName = () => {
        if (fullname === 'John') {
            setFullname('Mary');
        } else {
            setFullname('John');
        }
    }

    React.useEffect(() => {
        console.log('sidebar useEffect');
    });

    React.useEffect(() => {
        console.log('sidebar useEffect one time only');
    }, []);

    React.useEffect(() => {
        console.log('sidebar useEffect only fullname change');
    }, [fullname]);

    return (
        <>
            <h3>Sidebar</h3>
            <p>
                Hello {fullname}
            </p>
            <button onClick={changeName}>Change name</button>
        </>
    )
}

export default Sidebar