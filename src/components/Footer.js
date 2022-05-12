import React from 'react'
import { getVersion } from '../redux/actions/authAction';
import { useDispatch, useSelector } from 'react-redux'

const Footer = () => {
    const version = useSelector(state => state.authReducer.version)
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getVersion());
    }, [dispatch])

    return (
        <>
            <footer className="container">
                <p>© Company 2012-{new Date().getFullYear()} API version: {version}</p>
            </footer>
        </>
    )
}

export default Footer