import React from 'react'
import { useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';

const CartPage = () => {
    const cart = useSelector(state => state.cartReducer.cart);
    const total = useSelector(state => state.cartReducer.total);
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-12 mt-4'>
                    <h1>ตะกร้าสินค้าทั้งหมด {total} ชิน</h1>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ลำดับ</th>
                                <th>รหัสสินค้า</th>
                                <th>ชื่อสินค้า</th>
                                <th>ราคา</th>
                                <th>จำนวน</th>
                                <th>รวมทั้งหมด</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cart.map((c, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{c.id}</td>
                                            <td>{c.name}</td>
                                            <td>{c.price}</td>
                                            <td>
                                                {c.qty}
                                            </td>
                                            <td>{c.price * c.qty}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default CartPage