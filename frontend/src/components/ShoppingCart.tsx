import { Offcanvas, Stack } from 'react-bootstrap'
import { useShoppingCart } from '../context/ShoppingCartContext'
import { CartItem } from './CartItem'
import { useProducts } from '../context/ProductsContext'
import React from 'react'

// Typdefinition

type ShoppingCartProps = {
    isOpen: boolean
}

// ShoppingCart-komponent

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
    const { closeCart, cartItems } = useShoppingCart()
    const { products } = useProducts()

    const total = cartItems.reduce((total, cartItem) => {
        const item = products.find((i) => i.id === cartItem.id)
        const itemTotal = (item?.price || 0) * cartItem.quantity
        console.log(
            `Item ID: ${cartItem.id}, Price: ${item?.price}, Quantity: ${cartItem.quantity}, Item Total: ${itemTotal}`
        )
        return total + itemTotal
    }, 0)

    console.log(`Total: ${total}`)

    return (
        <Offcanvas show={isOpen} onHide={closeCart} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Kundvagn</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                    {cartItems.map((item) => (
                        <CartItem key={item.id} {...item} />
                    ))}
                    <div className="ms-auto fw-bold fs-5">
                        Totalt {total} kr
                    </div>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    )
}
