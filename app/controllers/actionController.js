const Action = require("../models/ActionModel");
const Customer = require("../models/CustomerModel");

module.exports = {
  index: (req, res) => {
    Action.find()
    .populate('customer', 'name')
    .then((actions) => {
      res.status(200).json(actions)
    })
    .catch((err) => {
      res.status(500).json({error: err})
    })
  },
  create: (req, res) => {
    const { customer } = req.body;

    if (!customer) {
      return res
        .status(400)
        .json({ message: "Customer ID is required to create an action" });
    }
    Customer.findById(customer)
      .then((customer) => {
        if (!customer) {
          return res
            .status(404)
            .json({ message: "Customer not found, cannot create an action" });
        }
        const newAction = new Action({ ...req.body, customer: customer });
        newAction
          .save()
          .then(() => {
            return Customer.updateOne(
              { _id: customer },
              { $push: { actions: newAction._id } }
            );
          })
          .then(() => {
            res.status(201).json(newAction);
          })
          .catch((err) => {
            res.status(500).json({ error: err });
          });
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  },
  update: (req, res) => {
    Action.findByIdAndUpdate(req.params.id, req.body)
      .then((action) => {
        if (!action)
          return res.status(404).json({ message: "Action not found" });
        res
          .status(200)
          .json({ message: "Action edited successfully", action: action });
      })
      .catch((err) => {
        res.status(400).json({ error: err });
      });
  },
  delete: (req, res) => {
    Action.findByIdAndDelete(req.params.id)
      .then((action) => {
        if (!action)
          return res.status(404).json({ message: "Action not found" });
        Customer.updateOne(
          { _id: action.customer },
          { $pull: { actions: action._id } }
        ).catch((err) => {
          res.status(err);
        });
        res.status(204).json({
          message: "Action deleted"
        });
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  },
};
