import React, { Component } from 'react';
import {
    Modal, ModalHeader, ModalBody, ModalFooter,
    Button, Input, Label
} from 'reactstrap';

export class AddSaleModal extends Component {

    state = {
        selectedCustomer: '',
        selectedProduct: '',
        selectedStore: '',
    };

    handleCustomerChange = (event) => {
        this.setState({ selectedCustomer: event.target.value });
    }

    handleProductChange = (event) => {
        this.setState({ selectedProduct: event.target.value });
    }

    handleStoreChange = (event) => {
        this.setState({ selectedStore: event.target.value });
    }

    addSale = async () => {
        const { selectedCustomer, selectedProduct, selectedStore } = this.state;

        if (selectedCustomer && selectedProduct && selectedStore) {
            try {
                const response = await fetch('api/sales', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        customerId: selectedCustomer,
                        productId: selectedProduct,
                        storeId: selectedStore,
                    }),
                });

                if (response.ok) {
                    alert('Sale has been added to the list.');
                    this.props.onSaleAdded(); // Notify the parent component                     
                } else {
                    // Handle the error case if needed
                    alert('Unable to create sale at this time.');
                }
            } catch (error) {
                console.error('Error adding sale:', error);
            }
            this.props.onHide();
            this.resetInputState();
        } else {
            alert("Please select information in all fields.")
        }
    }

    resetInputState () {
        this.setState({
            selectedCustomer: '',
            selectedProduct: '',
            selectedStore: '',
        });
    }

    render() {
        const { show, onHide, customers, products, stores } = this.props;

        return (
            <Modal isOpen={show} toggle={onHide}>
                <ModalHeader toggle={onHide}>Add Sale</ModalHeader>
                <ModalBody>
                    <div>
                        <Label for="customer">Customer:</Label>
                        <Input type="select" id="customer" value={this.state.selectedCustomer} onChange={this.handleCustomerChange}>
                            <option value="">Select a customer</option>
                            {customers.map((customer) => (
                                <option key={customer.id} value={customer.id}>
                                    {customer.name}
                                </option>
                            ))}
                        </Input>
                    </div>
                    <div>
                        <Label for="product">Product:</Label>
                        <Input type="select" id="product" value={this.state.selectedProduct} onChange={this.handleProductChange}>
                            <option value="">Select a product</option>
                            {products.map((product) => (
                                <option key={product.id} value={product.id}>
                                    {product.name}
                                </option>
                            ))}
                        </Input>
                    </div>
                    <div>
                        <Label for="store">Store:</Label>
                        <Input type="select" id="store" value={this.state.selectedStore} onChange={this.handleStoreChange}>
                            <option value="">Select a store</option>
                            {stores.map((store) => (
                                <option key={store.id} value={store.id}>
                                    {store.name}
                                </option>
                            ))}
                        </Input>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={onHide}>
                        Close
                    </Button>
                    <Button color="primary" onClick={this.addSale}>
                        Add
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}
