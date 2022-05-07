import React from 'react'

const Footer = () => {
    return (
        <>
            <footer className="container">
                <p>© Company 2012-{new Date().getFullYear()}</p>
            </footer>
        </>
    )
}

export default Footer