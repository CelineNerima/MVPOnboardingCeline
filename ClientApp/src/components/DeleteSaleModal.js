import React, { Component } from 'react';
import {
    Modal, ModalHeader, ModalBody, ModalFooter,
    Button, Form, FormGroup, FormText
} from 'reactstrap';

export class DeleteSaleModal extends Component {

    deleteSale = async () => {
        const { sale } = this.props;

        if (sale) {
            const saleId = sale.id;

            const response = await fetch(`api/sales/${saleId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                alert("Sale has been deleted.");
                this.props.onHide();
            } else {
                alert("Unable to delete sale at this time.");
            }
        }
    }

    render() {
        return (
            <Modal isOpen={this.props.show} toggle={this.props.onHide}>
                <ModalHeader toggle={this.props.onHide}>Delete Sale</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <FormText><h5>Are you sure you want to remove this sale?</h5></FormText>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.props.onHide}>Cancel</Button>
                    <Button color="danger" onClick={this.deleteSale}>Delete</Button>
                </ModalFooter>
            </Modal>
        );
    }
}