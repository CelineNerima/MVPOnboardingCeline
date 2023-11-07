import React, { Component } from 'react';

export class Home extends Component {
    static displayName = Home.name;

    render() {
        return (
            <div>
                <h1>Welcome!</h1><br />
                <p>This application is built with:</p>
                <ul class="list-group">
                    <li class="list-group-item">
                        <a href='https://get.asp.net/'>ASP.NET Core</a> and <a href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx'>C#</a> for cross-platform server-side code</li>
                    <li class="list-group-item">
                        <a href='https://facebook.github.io/react/'>React</a> for client-side code</li>
                    <li class="list-group-item">
                        <a href='http://getbootstrap.com/'>Bootstrap</a> for layout and styling</li>
                </ul>
                <br /><br />
                <p>It comprises these components:</p>                
                <ul class="list-group">
                    <li class="list-group-item list-group-item-action">
                        <a href="/customer">Customer</a>                        
                    </li>
                    <li class="list-group-item list-group-item-action">
                        <a href="/product">Product</a>
                    </li>
                    <li class="list-group-item list-group-item-action">
                        <a href="/store">Store</a>
                    </li>
                    <li class="list-group-item list-group-item-action">
                        <a href="/sale">Sale</a>
                    </li>
                </ul>
            </div>
        );
    }
}
