import React from 'react'
import axios from 'axios'
import './style.css'
function ProductCard() {
    const paymentObj = {
        amount: 500,
        currency: 'INR',
        receipt: ""
    }

    const paymenthandler = async () => {
        try {
            const responce = await axios.post('http://localhost:8000/api/orders/create', {
                paymentObj
            })
            console.log("order is:", responce.data?.data)

            const orders = responce.data.data
            const options = {
                key: "rzp_test_QciY1GgJOyLeHk",
                amount: paymentObj.amount,
                currency: paymentObj.currency,
                name: "JVS",
                description: "Clouth purchase",
                image: "https://yourlogo.com/logo.png",
                order_id: orders.id,
                handler: function (response) {
                    alert("Payment successful!");
                    console.log(response);

                },
                prefill: {
                    name: "Vinson Venusaur",
                    email: "vinson@example.com",
                    contact: "9999999999",
                },
                theme: {
                    color: "#3399cc",
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        }
        catch (err) {
            console.error('the error for order creation')
            console.log("Error :", err)
        }

    }









    return (
        <>
            <div className='product'>
                <div className='img'>
                    <img src="https://wallpapercave.com/wp/wp7562971.jpg" alt="product image" height={300} width={300} />
                </div>
                <div className='product-details'>
                    <p className='category'>Kurties</p>
                    <p className='pname'>Silk kurties</p>
                    <span className='price'>500</span><span className='original-price'>700</span>
                    <button className='buy' id="pay-button" onClick={(e) => {

                        paymenthandler()
                        e.preventDefault();
                    }}>Buy Now</button>
                </div>
            </div>
        </>
    )
}

export default ProductCard