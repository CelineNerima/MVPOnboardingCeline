import React, { Component } from 'react';
import {
    Modal, ModalHeader, ModalBody, ModalFooter,
    Button, Form, FormGroup, FormText
} from 'reactstrap';

export class DeleteStoreModal extends Component {

    deleteStore = async () => {
        const { store } = this.props;

        if (store) {
            const storeId = store.id;

            const response = await fetch(`api/stores/${storeId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                alert("Store has been deleted.");
                this.props.onHide();
            } else {
                alert("Unable to delete this store because they have a sale.");
            }
        }
    }

    render() {
        return (
            <Modal isOpen={this.props.show} toggle={this.props.onHide}>
                <ModalHeader toggle={this.props.onHide}>Delete Store</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <FormText><h5>Are you sure you want to remove this store?</h5></FormText>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.props.onHide}>Cancel</Button>
                    <Button color="danger" onClick={this.deleteStore}>Delete</Button>
                </ModalFooter>
            </Modal>
        );
    }
}