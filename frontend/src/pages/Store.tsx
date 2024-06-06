import React, { useState, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import ProductsItem from '../components/ProductsItem'

interface Product {
    id: number
    name: string
    price: number
    imgUrl: string
}

//fecth för att synliggöra databasens innehåll för store.

const Store = () => {
    const [products, setProducts] = useState<Product[]>([])
    useEffect(() => {
        fetch('http://localhost:3000/products')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                return response.json()
            })
            .then((data: Product[]) => {
                setProducts(data)
            })
            .catch((error) => console.error('Error fetching products:', error))
    }, [])

    return (
        <>
            <Row md={2} xs={1} lg={4} className="g-3">
                {products.map((item) => (
                    <Col key={item.id}>
                        <ProductsItem {...item} />
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default Store
