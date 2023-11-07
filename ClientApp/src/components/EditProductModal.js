import React, { Component } from 'react';
import {
    Modal, ModalHeader, ModalBody, ModalFooter,
    Button, Form, FormGroup, Label, Input
} from 'reactstrap';

export class EditProductModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            price: '',
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.product !== this.props.product) {
            // Updates the state when a new product is selected
            this.setState({
                name: this.props.product ? this.props.product.name : '',
                price: this.props.product ? this.props.product.price : '',
            });
        }
    }

    handleNameChange = (event) => {
        this.setState({ name: event.target.value });
    }

    handlePriceChange = (event) => {
        this.setState({ price: event.target.value });
    }

    editProduct = async () => {
        const { product } = this.props;
        const { name, price } = this.state;

        if (product && name && price) {
            const productId = product.id;

            const response = await fetch(`api/products/${productId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: productId,
                    name: name,
                    price: price,
                }),
            });

            if (response.ok) {
                alert("Product has been updated.");
            } else {
                alert("Unable to edit product at this time.");
            }
            this.props.onHide();
        }
    }

    render() {
        return (
            <Modal isOpen={this.props.show} toggle={this.props.onHide}>
                <ModalHeader toggle={this.props.onHide}>Edit Product</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input type="text" id="name" value={this.state.name} onChange={this.handleNameChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="price">Price</Label>
                            <Input type="text" id="price" value={this.state.price} onChange={this.handlePriceChange} />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.props.onHide}>Close</Button>
                    <Button color="warning" onClick={this.editProduct}>Edit</Button>
                </ModalFooter>
            </Modal>
        );
    }
}
