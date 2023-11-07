import React, { Component } from 'react';
import { AddSaleModal } from './AddSaleModal';
import { EditSaleModal } from './EditSaleModal';
import { DeleteSaleModal } from './DeleteSaleModal';

export class Sale extends Component {

    static displayName = Sale.name;

    constructor(props) {
        super(props);
        this.state = {
            sales: [], loading: true,
            addModalShow: false,
            editModalShow: false,
            deleteModalShow: false,
            selectedSale: null,

            // Initialize customers,products and stores as an empty array
            customers: [],
            products: [],
            stores: [],
        };

        this.addSale = this.addSale.bind(this);
        this.editSale = this.editSale.bind(this);
        this.deleteSale = this.deleteSale.bind(this);
    }

    componentDidMount() {
        this.populateSaleData();
        this.populateCustomerData();
        this.populateProductData();
        this.populateStoreData();
    }

    static renderSalesTable(sales, editSale, deleteSale) {

        return (
            <table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Customer</th>
                        <th>Product</th>
                        <th>Store</th>
                        <th>Date Sold</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map(sale =>
                        <tr key={sale.id}>
                            <td>{sale.id}</td>
                            <td>{sale.customerName}</td>
                            <td>{sale.productName}</td>
                            <td>{sale.storeName}</td>
                            <td>{new Date(sale.dateSold).toLocaleDateString()}</td>
                            <td>
                                <button className="btn btn-edit"
                                    onClick={() => editSale(sale)}>
                                    Edit
                                </button>
                            </td>
                            <td>
                                <button className="btn btn-delete"
                                    onClick={() => deleteSale(sale)}>
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
            : Sale.renderSalesTable(this.state.sales,
                this.editSale, this.deleteSale
            );

        return (
            <div>
                <h1 id="tableLabel">Sales</h1>

                <button className="btn btn-primary" onClick={this.addSale}>
                    Add Sale
                </button>

                <br />

                {contents}

                <AddSaleModal
                    show={this.state.addModalShow}
                    onHide={() => this.setState({ addModalShow: false },
                        this.populateSaleData)}
                    customers={this.state.customers}  // Pass customers from state
                    products={this.state.products}    // Pass products from state
                    stores={this.state.stores}        // Pass stores from state
                />

                <EditSaleModal
                    show={this.state.editModalShow}
                    onHide={() => this.setState({ editModalShow: false },
                        this.populateSaleData)}
                    sale={this.state.selectedSale}
                    customers={this.state.customers}
                    products={this.state.products}
                    stores={this.state.stores}                    
                />

                <DeleteSaleModal
                    show={this.state.deleteModalShow}
                    onHide={() => this.setState({ deleteModalShow: false },
                        this.populateSaleData)}
                    sale={this.state.selectedSale}
                    customers={this.state.customers}
                    products={this.state.products}
                    stores={this.state.stores} 
                />
                
            </div>
        );
    }

    addSale() {
        this.setState({ addModalShow: true });
    }

    editSale(sale) {
        this.setState({ editModalShow: true, selectedSale: sale });
    }

    deleteSale(sale) {
        this.setState({ deleteModalShow: true, selectedSale: sale });
    }

    async populateSaleData() {
        const response = await fetch('api/sales');
        const salesData = await response.json();

        // Fetch customer data separately
        const customerResponse = await fetch('api/customers');
        const customerData = await customerResponse.json();

        // Map customer IDs to customer names
        const customerMap = {};
        customerData.forEach(customer => {
            customerMap[customer.id] = customer.name;
        });

        //Repeat above steps for product
        const productResponse = await fetch('api/products');
        const productData = await productResponse.json();

        const productMap = {};
        productData.forEach(product => {
            productMap[product.id] = product.name;
        });

        //Repeat for the store
        const storeResponse = await fetch('api/stores');
        const storeData = await storeResponse.json();

        const storeMap = {};
        storeData.forEach(store => {
            storeMap[store.id] = store.name;
        });

        // Update sale data with customer, product, and store names
        const salesWithNames = salesData.map(sale => ({
            ...sale,
            customerName: customerMap[sale.customerId],
            productName: productMap[sale.productId],
            storeName: storeMap[sale.storeId],
        }));

        this.setState({ sales: salesWithNames, loading: false });
    }

    async populateCustomerData() {
        const response = await fetch('api/customers');
        const customerData = await response.json();
        this.setState({ customers: customerData });
    }

    async populateProductData() {
        const response = await fetch('api/products');
        const productData = await response.json();
        this.setState({ products: productData });
    }

    async populateStoreData() {
        const response = await fetch('api/stores');
        const storeData = await response.json();
        this.setState({ stores: storeData });
    }
}