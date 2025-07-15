const express = require('express');
const Razorpay = require("razorpay");
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

console.log("PORT:", PORT);


app.post('/api/orders/create', async (req, res) => {
    try {
        const razorpay = new Razorpay({
            key_id: process.env.RazorPay_Key_id,
            key_secret: process.env.RazorPay_Secret_Key
        });

        const { paymentObj } = req.body;

        const order = await razorpay.orders.create(paymentObj);

        if (!order) {
            return res.status(400).json({ success: false, message: "Order not created" });
        }

        res.status(201).json({
            success: true,
            data: order
        });

    } catch (err) {
        console.error("Error creating order:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
