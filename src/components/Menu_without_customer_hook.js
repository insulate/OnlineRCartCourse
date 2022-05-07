import React from 'react'

const Menu2 = () => {
    const [hover, setHover] = React.useState(false);
    const mouseOver = () => {
        setHover(true)
    }
    const mouseOut = () => {
        setHover(false)
    }
    return (
        <>
            <h1>Menu</h1>
            {
                hover ? <h3>main menu</h3> : null
            }
            <img onMouseOver={mouseOver} onMouseOut={mouseOut} src="./logo192.png" alt="google logo" />
        </>
    )
}

export default Menu