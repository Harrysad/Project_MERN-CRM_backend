const Customer = require("../models/CustomerModel");

module.exports = {
    index: (_req, res) => {
        Customer.find()
            .lean()
            .then((customers) => {
                res.status(200)
                    .json(customers)
            })
            .catch((err) => {
                res.status(500)
                    .json({
                        error: err
                    })
            });
    },
    customer: (req, res) => {
        Customer.findById(req.params.id)
            .lean()
            .then((customers) => {
                res.status(200)
                    .json(customers)
            })
            .catch((err) => {
                res.status(500)
                    .json({
                        error: "Customer not found."
                    })
            });
    },
    create: (req, res) => {
        const newCustomer = new Customer(req.body);
        newCustomer
            .save()
            .then(() => {
                res.status(201)
                    .json({
                        name: newCustomer.name,
                        address: newCustomer.address,
                        nip: newCustomer.nip
                    });
            })
            .catch((err) => {
                if (err.code === 11000) {
                    res.status(409)
                        .json({
                            error: true,
                            message: "User already exist."
                        });
                };
            });
    },
    update: (req, res) => {
        Customer.findByIdAndUpdate(req.params.id, req.body)
            .then((customer) => {
                res.status(204);
            })
            .catch((err) => {
                res.status(500)
                    .json({
                        error: err
                    })
            });
    },
    delete: (req, res) => {
        Customer.findByIdAndDelete(req.params.id)
        .then((customer) => {
            res.status(204);
        })
        .catch((err) => {
            res.status(500)
                .json({
                    error: err
                })
        });
    },
};