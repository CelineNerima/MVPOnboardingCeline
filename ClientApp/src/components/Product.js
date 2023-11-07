import React, { Component } from 'react';
import { AddProductModal } from './AddProductModal';
import { EditProductModal } from './EditProductModal';
import { DeleteProductModal } from './DeleteProductModal';

export class Product extends Component {

    static displayName = Product.name;

    constructor(props) {
        super(props);
        this.state = {
            products: [], loading: true,
            addModalShow: false,
            editModalShow: false,
            deleteModalShow: false,
            selectedProduct: null,
        };

        this.addProduct = this.addProduct.bind(this);
        this.editProduct = this.editProduct.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
    }

    componentDidMount() {
        this.populateProductData();
    }

    static renderProductsTable(products, editProduct, deleteProduct) {
        return (
            <table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product =>
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.price
                                .toLocaleString(undefined, { style: 'currency', currency: 'USD' })}</td>
                            <td>
                                <button className="btn btn-edit"
                                    onClick={() => editProduct(product)}>
                                    Edit
                                </button>
                            </td>
                            <td>
                                <button className="btn btn-delete"
                                    onClick={() => deleteProduct(product)}>
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
            : Product.renderProductsTable(this.state.products,
                this.editProduct, this.deleteProduct
            );

        return (
            <div>
                <h1 id="tableLabel">Products</h1>

                <button className="btn btn-primary" onClick={ this.addProduct }>
                    Add Product
                </button>

                <br />

                {contents}

                <AddProductModal
                    show={this.state.addModalShow}
                    onHide={() => this.setState({ addModalShow: false },
                        this.populateProductData)}
                />

                <EditProductModal
                    show={this.state.editModalShow}
                    onHide={() => this.setState({ editModalShow: false },
                        this.populateProductData)}
                    product={this.state.selectedProduct}
                />

                <DeleteProductModal
                    show={this.state.deleteModalShow}
                    onHide={() => this.setState({ deleteModalShow: false },
                        this.populateProductData)}
                    product={this.state.selectedProduct}
                />
                

            </div>
        );
    }

    addProduct() {
        this.setState({ addModalShow: true });
    }

    editProduct(product) {
        this.setState({ editModalShow: true, selectedProduct: product });
    }

    deleteProduct(product) {
        this.setState({ deleteModalShow: true, selectedProduct: product });
    }

    async populateProductData() {
        const response = await fetch('api/products');
        const data = await response.json();
        this.setState({ products: data, loading: false });
    }
}
