import React, { Component } from 'react';
import {
    Modal, ModalHeader, ModalBody, ModalFooter,
    Button, Form, FormGroup, FormText
} from 'reactstrap';

export class DeleteProductModal extends Component {

    deleteProduct = async () => {
        const { product } = this.props;

        if (product) {
            const productId = product.id;

            const response = await fetch(`api/products/${productId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                alert("Product has been deleted.");
                this.props.onHide();
            } else {
                alert("Unable to delete this product because they have a sale.");
            }
        }
    }

    render() {
        return (
            <Modal isOpen={this.props.show} toggle={this.props.onHide}>
                <ModalHeader toggle={this.props.onHide}>Delete Product</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <FormText><h5>Are you sure you want to remove this product?</h5></FormText>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.props.onHide}>Cancel</Button>
                    <Button color="danger" onClick={this.deleteProduct}>Delete</Button>
                </ModalFooter>
            </Modal>
        );
    }
}