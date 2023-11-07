import React, { Component } from 'react';
import {
    Modal, ModalHeader, ModalBody, ModalFooter,
    Button, Form, FormGroup, Label, Input
} from 'reactstrap';

export class EditCustomerModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.customer !== this.props.customer) {
            // Update the state when a new customer is selected
            this.setState({
                name: this.props.customer ? this.props.customer.name : '',
                address: this.props.customer ? this.props.customer.address : '',
            });
        }
    }

    handleNameChange = (event) => {
        this.setState({ name: event.target.value });
    }

    handleAddressChange = (event) => {
        this.setState({ address: event.target.value });
    }

    editCustomer = async () => {
        const { customer } = this.props;
        const { name, address } = this.state;

        if (customer && name && address) {
            const customerId = customer.id;

            const response = await fetch(`api/customers/${customerId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: customerId,
                    name: name,
                    address: address,
                }),
            });

            if (response.ok) {
                alert("Customer has been updated.");
            } else {
                alert("Unable to edit customer at this time.");
            }
            this.props.onHide();
        }
    }

    render() {
        return (
            <Modal isOpen={this.props.show} toggle={this.props.onHide}>
                <ModalHeader toggle={this.props.onHide}>Edit Customer</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input type="text" id="name" value={this.state.name} onChange={this.handleNameChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="address">Address</Label>
                            <Input type="text" id="address" value={this.state.address} onChange={this.handleAddressChange} />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.props.onHide}>Close</Button>
                    <Button color="warning" onClick={this.editCustomer}>Edit</Button>
                </ModalFooter>
            </Modal>
        );
    }
}
