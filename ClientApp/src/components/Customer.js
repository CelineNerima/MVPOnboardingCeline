import React, { Component } from 'react';
import { AddCustomerModal } from './AddCustomerModal';
import { EditCustomerModal } from './EditCustomerModal';
import { DeleteCustomerModal } from './DeleteCustomerModal';

export class Customer extends Component {

    static displayName = Customer.name;

    constructor(props) {
        super(props);
        this.state = {
            customers: [], loading: true,
            addModalShow: false,
            editModalShow: false,
            deleteModalShow: false,
            selectedCustomer: null,
        };

        this.addCustomer = this.addCustomer.bind(this);
        this.editCustomer = this.editCustomer.bind(this);
        this.deleteCustomer = this.deleteCustomer.bind(this);
    }

    componentDidMount() {
        this.populateCustomerData();
    }

    static renderCustomersTable(customers, editCustomer, deleteCustomer) {
        return (
            <table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(customer =>
                        <tr key={customer.id}>
                            <td>{customer.id}</td>
                            <td>{customer.name}</td>
                            <td>{customer.address}</td>
                            <td>
                                <button className="btn btn-edit"
                                    onClick={() => editCustomer(customer)}>
                                    Edit
                                </button>
                            </td>
                            <td>
                                <button className="btn btn-delete"
                                    onClick={() => deleteCustomer(customer) }>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Customer.renderCustomersTable(this.state.customers,
                this.editCustomer, this.deleteCustomer
            );

        return (
            <div>
                <h1 id="tableLabel">Customers</h1>

                <button className="btn btn-primary" onClick={this.addCustomer}>
                    Add Customer
                </button>

                <br />

                {contents}

                <AddCustomerModal
                    show={this.state.addModalShow}
                    onHide={() => this.setState({ addModalShow: false },
                        this.populateCustomerData)}
                />

                <EditCustomerModal
                    show={this.state.editModalShow}
                    onHide={() => this.setState({ editModalShow: false },
                        this.populateCustomerData)}
                    customer={this.state.selectedCustomer}
                />

                <DeleteCustomerModal
                    show={this.state.deleteModalShow}
                    onHide={() => this.setState({ deleteModalShow: false },
                        this.populateCustomerData)}
                    customer={this.state.selectedCustomer}
                />

            </div>
        );
    }

    addCustomer() {
        this.setState({ addModalShow: true });
    }

    editCustomer(customer) {
        this.setState({ editModalShow: true, selectedCustomer: customer });
    }

    deleteCustomer(customer) {
        this.setState({ deleteModalShow: true, selectedCustomer: customer });
    }

    async populateCustomerData() {
        const response = await fetch('api/customers');
        const data = await response.json();
        this.setState({ customers: data, loading: false });
    }
}
