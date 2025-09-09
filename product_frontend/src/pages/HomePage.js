import React from 'react';
import { Link } from 'react-router-dom';



function HomePage() {
return (
    <div
      style={{
        textAlign: 'center',
        marginTop: '80px',
        backgroundColor: '#F7DFC2',
        minHeight: '100vh',
        padding: '50px 20px',
        fontFamily: 'Arial, sans-serif',
      }}
    >

<h1>Welcome to Product Management Dashboard</h1>
<p>Manage your products effortlessly with our intuitive Product Management Application. Browse your inventory in a sleek grid view, add new products in seconds, and keep your catalog up-to-date with easy edit and delete options. Quickly search and filter products by name or price, ensuring you always find what you need.</p>
<Link to="/products"><button className="btn">View Products</button></Link>
</div>
);
}


export default HomePage;