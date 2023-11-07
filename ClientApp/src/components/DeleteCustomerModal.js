import React, { Component } from 'react';
import {
    Modal, ModalHeader, ModalBody, ModalFooter,
    Button, Form, FormGroup, FormText
} from 'reactstrap';

export class DeleteCustomerModal extends Component {
        
    deleteCustomer = async () => {
        const { customer } = this.props;       

        if (customer) {
            const customerId = customer.id;

            const response = await fetch(`api/customers/${customerId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },                
            });

            if (response.ok) {               
                alert("Customer has been deleted.");
                this.props.onHide();
            } else {
                alert("Unable to delete this customer because they have a sale.");
            }
        }
    }

    render() {
        return (
            <Modal isOpen={this.props.show} toggle={this.props.onHide}>
                <ModalHeader toggle={this.props.onHide}>Delete Customer</ModalHeader>
                <ModalBody>
                    <Form>                        
                        <FormGroup>
                            <FormText><h5>Are you sure you want to remove this customer?</h5></FormText>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.props.onHide}>Cancel</Button>
                    <Button color="danger" onClick={this.deleteCustomer}>Delete</Button>
                </ModalFooter>
            </Modal>
        );
    }
}