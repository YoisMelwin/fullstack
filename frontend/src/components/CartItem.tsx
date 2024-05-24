import { Button, Stack } from 'react-bootstrap'
import { useShoppingCart } from '../context/ShoppingCartContext'
import { useProducts } from '../context/ProductsContext'
import React from 'react'

type CartItemProps = {
    id: number
    quantity: number
}

export function CartItem({ id, quantity }: CartItemProps) {
    const { removeFromCart } = useShoppingCart()
    const { products } = useProducts()
    const item = products.find((i) => i.id === id)
    if (item == null) return null

    return (
        <Stack
            direction="horizontal"
            gap={2}
            className="d-flex align-items-center"
        >
            <img
                src={item.imgUrl}
                style={{ width: '125px', height: '75px', objectFit: 'cover' }}
            />
            <div className="me-auto">
                <div>
                    {item.name}{' '}
                    {quantity > 1 && (
                        <span
                            className="text-muted"
                            style={{ fontSize: '.65rem' }}
                        >
                            x{quantity}
                        </span>
                    )}
                </div>
                <div className="text-muted" style={{ fontSize: '.75rem' }}>
                    {item.price} kr
                </div>
            </div>

            <Button
                variant="outline-dark"
                size="sm"
                onClick={() => removeFromCart(item.id)}
            >
                &times;
            </Button>
        </Stack>
    )
}
