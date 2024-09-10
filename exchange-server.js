const express = require('express');
const port = '3000';
const exchangeRoutes = require('./routes/exchangeRoutes')
const app = express();

app.use(express.json());

app.use('/exchange', exchangeRoutes)

app.use((err, req, res, next)=> {
    res.status(500).json({ message: "The service is currently down, please check again later" });
})

app.listen(port,() => {
    console.log(`Server running at http://localhost:${port}`);
})


