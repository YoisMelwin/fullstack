import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { useShoppingCart } from '../context/ShoppingCartContext'

// Typdefinition

type StoreItemProps = {
    id: number
    name: string
    price: number
    imgUrl: string
}

const ProductsItem = ({ id, name, price, imgUrl }: StoreItemProps) => {
    const {
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart
    } = useShoppingCart()
    const quantity = getItemQuantity(id)

    return (
        <Card className="h-100">
            <Card.Img
                variant="top"
                src={imgUrl}
                height="200px"
                style={{ objectFit: 'cover' }}
            />
            <Card.Body className="d-flex flex-column">
                <Card.Title className="d-flex justify-content-between align-items-baseline mb-5">
                    <span className="fs-4">{name}</span>
                    <span className="ms-2 text-muted">{price} </span>
                </Card.Title>
                <div className="mt-auto d-flex justify-content-center">
                    {quantity === 0 ? (
                        <Button
                            className="w-30"
                            onClick={() => increaseCartQuantity(id)}
                            style={{
                                backgroundColor: '#21553e',
                                borderColor: '#000000',
                                color: '#fbfbfb',
                                margin: '0 auto'
                            }}
                        >
                            + Lägg i Kundvagn
                        </Button>
                    ) : (
                        <div
                            className="d-flex align-items-center flex-column"
                            style={{ gap: '.5rem' }}
                        >
                            <div
                                className="d-flex align-items-center justify-content-center"
                                style={{ gap: '.5rem' }}
                            >
                                <Button
                                    onClick={() => decreaseCartQuantity(id)}
                                    style={{
                                        backgroundColor: '#21553e',
                                        borderColor: '#000000',
                                        color: '#fbfbfb',
                                        width: '50%'
                                    }}
                                >
                                    -
                                </Button>
                                <div>
                                    <span className="fs-3">{quantity}</span>
                                </div>
                                <Button
                                    onClick={() => increaseCartQuantity(id)}
                                    style={{
                                        backgroundColor: '#21553e',
                                        borderColor: '#000000',
                                        color: '#fbfbfb',
                                        width: '50%'
                                    }}
                                >
                                    +
                                </Button>
                            </div>
                            <Button
                                onClick={() => removeFromCart(id)}
                                variant="dark"
                                size="sm"
                            >
                                Ta bort
                            </Button>
                        </div>
                    )}
                </div>
            </Card.Body>
        </Card>
    )
}

export default ProductsItem
