import React, { createContext, useContext, useEffect, useState } from 'react'

interface Product {
    id: number
    name: string
    price: number
    imgUrl: string
}

interface ProductsContextProps {
    products: Product[]
}

const ProductsContext = createContext<ProductsContextProps | undefined>(
    undefined
)

export const useProducts = () => {
    const context = useContext(ProductsContext)
    if (!context) {
        throw new Error('useProducts must be used within a ProductsProvider')
    }
    return context
}

export const ProductsProvider: React.FC<{ children: React.ReactNode }> = ({
    children
}) => {
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
                // Kontrollerar att price är numeriskt om det är en sträng
                const formattedData = data.map((product) => ({
                    ...product,
                    price:
                        typeof product.price === 'string'
                            ? parseFloat(product.price)
                            : product.price
                }))
                console.log('Fetched products:', formattedData)
                setProducts(formattedData)
            })
            .catch((error) => console.error('Error fetching products:', error))
    }, [])

    return (
        <ProductsContext.Provider value={{ products }}>
            {children}
        </ProductsContext.Provider>
    )
}
