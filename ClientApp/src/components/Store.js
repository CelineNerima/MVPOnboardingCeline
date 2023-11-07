import React, { Component } from 'react';
import { AddStoreModal } from './AddStoreModal';
import { EditStoreModal } from './EditStoreModal';
import { DeleteStoreModal } from './DeleteStoreModal';

export class Store extends Component {

    static displayName = Store.name;

    constructor(props) {
        super(props);
        this.state = {
            stores: [], loading: true,
            addModalShow: false,
            editModalShow: false,
            deleteModalShow: false,
            selectedStore: null,
        };

        this.addStore = this.addStore.bind(this);
        this.editStore = this.editStore.bind(this);
        this.deleteStore = this.deleteStore.bind(this);
    }

    componentDidMount() {
        this.populateStoreData();
    }

    static renderStoresTable(stores, editStore, deleteStore) {
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
                    {stores.map(store =>
                        <tr key={store.id}>
                            <td>{store.id}</td>
                            <td>{store.name}</td>
                            <td>{store.address}</td>
                            <td>
                                <button className="btn btn-edit"
                                    onClick={() => editStore(store)}>
                                    Edit
                                </button>
                            </td>
                            <td>
                                <button className="btn btn-delete"
                                    onClick={() => deleteStore(store)}>
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
            : Store.renderStoresTable(this.state.stores,
                this.editStore, this.deleteStore
            );

        return (
            <div>

                <h1 id="tableLabel">Stores</h1>

                <button className="btn btn-primary"
                    onClick={this.addStore}>
                    Add Store
                </button>

                <br />

                {contents}

                <AddStoreModal
                    show={this.state.addModalShow}
                    onHide={() => this.setState({ addModalShow: false },
                        this.populateStoreData)}
                />

                <EditStoreModal
                    show={this.state.editModalShow}
                    onHide={() => this.setState({ editModalShow: false },
                        this.populateStoreData)}
                    store={this.state.selectedStore}
                />

                <DeleteStoreModal
                    show={this.state.deleteModalShow}
                    onHide={() => this.setState({ deleteModalShow: false },
                        this.populateStoreData)}
                    store={this.state.selectedStore}
                />

            </div>
        );
    }

    addStore() {
        this.setState({ addModalShow: true });
    }

    editStore(store) {
        this.setState({ editModalShow: true, selectedStore: store });
    }

    deleteStore(store) {
        this.setState({ deleteModalShow: true, selectedStore: store });
    }

    async populateStoreData() {
        const response = await fetch('api/stores');
        const data = await response.json();
        this.setState({ stores: data, loading: false });
    }
}