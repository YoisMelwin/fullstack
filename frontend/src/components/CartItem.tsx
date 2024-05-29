import { Button, Stack } from 'react-bootstrap'
import { useShoppingCart } from '../context/ShoppingCartContext'
import { useProducts } from '../context/ProductsContext'
import React from 'react'

// Typdefinition för CartItemProps då det är typescript.
type CartItemProps = {
    id: number
    quantity: number
}

// Komponent för en enskild artikel i kundvagnen
export function CartItem({ id, quantity }: CartItemProps) {
    const { removeFromCart } = useShoppingCart() // Använder shopping cart-context för att ta bort från kundvagnen
    const { products } = useProducts() // Använder products-context för att få alla produkter
    const item = products.find((i) => i.id === id) // Hittar produkten baserat på id
    if (item == null) return null // Om produkten inte finns, returnera null

    //Returnerar det visuella
    return (
        // Skapa en horisontell stack med gap på 2 och flexbox för att centrera innehållet
        <Stack
            direction="horizontal"
            gap={2}
            className="d-flex align-items-center"
        >
            {/* Bild på produkten */}
            <img
                src={item.imgUrl}
                style={{ width: '125px', height: '75px', objectFit: 'cover' }}
            />
            <div className="me-auto">
                {/* Produktens namn och kvantitet om det är mer än 1 */}
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
                {/* Produktens pris */}
                <div className="text-muted" style={{ fontSize: '.75rem' }}>
                    {item.price}
                </div>
            </div>

            {/* Knapp för att ta bort produkten från kundvagnen */}

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
