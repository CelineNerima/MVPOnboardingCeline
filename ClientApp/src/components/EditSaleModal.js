import React, { Component } from 'react';
import {
    Modal, ModalHeader, ModalBody, ModalFooter,
    Button, Label, Input
} from 'reactstrap';

export class EditSaleModal extends Component {

    state = {
        selectedCustomer: '',
        selectedProduct: '',
        selectedStore: '',
    };

    componentDidUpdate(prevProps) {
        if (prevProps.sale !== this.props.sale) {
            const { sale } = this.props;
            if (sale) {
                this.setState({
                    selectedCustomer: sale.customerId || '', // Adjust to match the data structure
                    selectedProduct: sale.productId || '', 
                    selectedStore: sale.storeId || '', 
                });
            }
        }
    }


    handleCustomerChange = (event) => {
        this.setState({ selectedCustomer: event.target.value });
    }

    handleProductChange = (event) => {
        this.setState({ selectedProduct: event.target.value });
    }

    handleStoreChange = (event) => {
        this.setState({ selectedStore: event.target.value });
    }

    editSale = async () => {
        const { sale } = this.props;
        const { selectedCustomer, selectedProduct, selectedStore } = this.state;

        if (sale && selectedCustomer && selectedProduct && selectedStore) {
            const saleId = sale.id;

            const response = await fetch(`api/sales/${saleId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: saleId,
                    customerId: selectedCustomer,
                    productId: selectedProduct,
                    storeId: selectedStore,
                }),
            });

            if (response.ok) {
                alert("Sale has been updated.");
            } else {
                alert("Unable to edit sale at this time.");
            }
            this.props.onHide();
        }
    }

    render() {
        const { show, onHide, customers, products, stores } = this.props;

        return (
            <Modal isOpen={show} toggle={onHide}>
                <ModalHeader toggle={onHide}>Edit Sale</ModalHeader>
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
                    <Button color="secondary" onClick={onHide}>Close</Button>
                    <Button color="warning" onClick={this.editSale}>Edit</Button>
                </ModalFooter>
            </Modal>
        );
    }
}