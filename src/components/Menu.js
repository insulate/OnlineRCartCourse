import React from 'react'
import useHover from '../hooks/UseHover'

const Menu = () => {
    const [hover, mouseOver, mouseOut] = useHover();
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