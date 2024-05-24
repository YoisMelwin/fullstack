import React from 'react'
import { Button, Card } from 'react-bootstrap'

type ProductsItemProps = {
    id: number
    name: string
    price: number
    imgUrl: string
}

export function ProductsItem({ id, name, price, imgUrl }: ProductsItemProps) {
    const quantity = 0
    return (
        <Card className="h-100">
            <Card.Img
                variant="top"
                src={imgUrl}
                height="200px"
                style={{ objectFit: 'cover' }}
            />

            <Card.Body className="d-flex flex-column">
                <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                    <span className="fs-2">{name}</span>
                    <span className="ms-2 text-muted">{price}</span>
                </Card.Title>
                <div className="mt-auto"></div>
                {quantity === 0 ? (
                    <Button className="w.100"> + Add to Cart</Button>
                ) : null}
            </Card.Body>
        </Card>
    )
}

export default ProductsItem
