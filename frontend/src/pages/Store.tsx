import React, { useState, useEffect } from 'react'

interface Product {
    id: number
    name: string
    price: number
    imgUrl: string
}

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
                console.log('Fetched products:', data)
                setProducts(data)
            })
            .catch((error) => console.error('Error fetching products:', error))
    }, [])

    return (
        <div>
            <h1>Produkter till min hemsida</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name}: {product.price}
                        <img
                            src={product.imgUrl}
                            alt={product.name}
                            width="200"
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Store
