import React from 'react'

const Footer = ({ title, website, postcode, isOpen }) => {
    return (
        <div>
            <h3 style={styles.title}>{title} &copy; {new Date().getFullYear()}</h3>
            <p style={{ color: 'green', fontSize: 16 }}> {website} {postcode} isOpen: {isOpen.toString()}</p>
            <p style={styles.title}>CodingThailand</p>
        </div>
    )
}

const styles = {
    title: {
        color: 'red',
    }
}

export default Footer