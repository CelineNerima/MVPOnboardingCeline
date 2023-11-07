import React, { Component } from 'react';
import {
    Modal, ModalHeader, ModalBody, ModalFooter,
    Button, Form, FormGroup, Label, Input
} from 'reactstrap';

export class AddStoreModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
        };
    }

    handleNameChange = (event) => {
        this.setState({ name: event.target.value });
    }

    handleAddressChange = (event) => {
        this.setState({ address: event.target.value });
    }

    addStore = async () => {
        const { name, address } = this.state;

        if (name && address) {
            
            const response = await fetch('api/stores', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: name,
                    address: address,
                }),
            });

            if (response.ok) {
                alert("Store has been added to list.")
            }

            this.props.onHide();
        } else {
            alert("Please enter information in all fields.")
        }
    }

    render() {
        return (
            <Modal isOpen={this.props.show} toggle={this.props.onHide}>
                <ModalHeader toggle={this.props.onHide}>Add Store</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input type="text" id="name" onChange={this.handleNameChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="address">Address</Label>
                            <Input type="text" id="address" onChange={this.handleAddressChange} />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.props.onHide}>Close</Button>
                    <Button color="primary" onClick={this.addStore}>Add</Button>
                </ModalFooter>
            </Modal>
        );
    }
}
