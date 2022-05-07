import React from 'react'
import Logo from './Logo';
import Title from '../styles/title/Title';
import { Button } from '../styles/button/Button';
const Header = () => {
    let companyName = 'CCT';
    const companyAddress = <p>Udonthani</p>;

    const showMessage = () => {
        return companyName + '.com';
    }

    const isLogin = false;

    const showMe = () => {
        alert('hello world');
    }

    const products = [
        { id: 1, name: 'Iphone' },
        { id: 2, name: 'Samsung' },
        { id: 3, name: 'Nokia' },
        { id: 4, name: 'Sony' },
        { id: 5, name: 'HTC' },
    ];

    return (
        <>
            <Title> Hello React</Title>
            <h1>บริษัท {companyName}</h1>
            {companyAddress}
            <br />
            {showMessage()}
            {/* {isLogin === true && <p>ยินดีต้อนรับ</p>} */}
            {isLogin === true && (
                <>
                    <p>ยินดีต้อนรับ</p>
                    <p>ยินดีต้อนรับ</p>
                </>
            )}
            {
                isLogin ? <Logo /> : <p>ไม่มีสิทธิ์ดู Logo</p>
            }
            <br />
            <Button primary onClick={showMe}>Show Me</Button>
            {/* <button onClick={showMe}>Show Me</button> */}
            <br />
            <ul>
                {
                    products.map((product, index) => {
                        return <li key={index}>{product.name}</li>
                    })
                }
            </ul>
            <hr />
        </>
    )
}

export default Header