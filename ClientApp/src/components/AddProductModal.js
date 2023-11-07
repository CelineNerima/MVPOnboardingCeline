import React, { Component } from 'react';
import {
    Modal, ModalHeader, ModalBody, ModalFooter,
    Button, Form, FormGroup, Label, Input
} from 'reactstrap';

export class AddProductModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            price: '',
        };
    }

    handleNameChange = (event) => {
        this.setState({ name: event.target.value });
    }

    handlePriceChange = (event) => {
        this.setState({ price: event.target.value });
    }

    addProduct = async () => {
        const { name, price } = this.state;

        if (name && price) {

            // Implement the code to make a POST request to add a new customer
            const response = await fetch('api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: name,
                    price: price,
                }),
            });

            if (response.ok) {
                alert("Product has been added to list.")
            } else {
                alert("Unable to add product at this time.")
            }
            
            this.props.onHide();
        } else {
            alert("Please enter information in all fields.")
        }
    }

    render() {
        return (
            <Modal isOpen={this.props.show} toggle={this.props.onHide}>
                <ModalHeader toggle={this.props.onHide}>Add Product</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input type="text" id="name" onChange={this.handleNameChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="address">Price</Label>
                            <Input type="text" id="address" onChange={this.handlePriceChange} />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.props.onHide}>Close</Button>
                    <Button color="primary" onClick={this.addProduct}>Add</Button>
                </ModalFooter>
            </Modal>
        );
    }
}
