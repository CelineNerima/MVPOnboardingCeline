import React, { Component } from 'react';
import {
    Modal, ModalHeader, ModalBody, ModalFooter,
    Button, Form, FormGroup, Label, Input
} from 'reactstrap';

export class EditStoreModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.store !== this.props.store) {
            // Updates the state when a new store is selected
            this.setState({
                name: this.props.store ? this.props.store.name : '',
                address: this.props.store ? this.props.store.address : '',
            });
        }
    }

    handleNameChange = (event) => {
        this.setState({ name: event.target.value });
    }

    handleAddressChange = (event) => {
        this.setState({ address: event.target.value });
    }

    editStore = async () => {
        const { store } = this.props;
        const { name, address } = this.state;

        if (store && name && address) {
            const storeId = store.id;

            const response = await fetch(`api/stores/${storeId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: storeId,
                    name: name,
                    address: address,
                }),
            });

            if (response.ok) {
                alert("Store has been updated.");
            } else {
                alert("Unable to edit store at this time.");
            }
            this.props.onHide();
        }
    }

    render() {
        return (
            <Modal isOpen={this.props.show} toggle={this.props.onHide}>
                <ModalHeader toggle={this.props.onHide}>Edit Store</ModalHeader>
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
                    <Button color="warning" onClick={this.editStore}>Edit</Button>
                </ModalFooter>
            </Modal>
        );
    }
}
