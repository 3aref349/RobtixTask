
import { Request, Response, Router } from "express";



import customers from "../../models/customers.js"

const { QueryTypes } = require('sequelize');
const sequelize = require('../db/DB.js');




/****  GET PROJECTS */
const getCustomers = async (_: Request, res: Response) => {
  try {


    const projects = await sequelize.query("select * from customers", { type: QueryTypes.SELECT });
    return res.status(200).json(projects);
  } catch (error) {
    console.log("error");
    console.log(error);
    return res.status(500).json({ error: "something went wrong" });
  }
};




const addCustomer = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  let errors: any = {};

  try {
    //const user = await User.findOne(res.locals.user.id)
    console.log("create cst")
    console.log(name)
    console.log(email)

    if (!name) errors.Name = "cannot be empty !!";
    if (!email) errors.Name = "cannot be empty !!";
    // if (!Location) errors.Location = "cannot be empty !!";
    if (Object.keys(errors).length > 0) throw new Error("cannot be empty !!")
    const cst = await sequelize.query(`INSERT INTO robtix.customers(name,email) Values ('${name}','${email}') `, { type: QueryTypes.INSERT });
    //const cst = await customers.create({ name: name, email: email});
    return res.status(200).json(cst);
  } catch (error) {
    console.log(error)
    switch (error.message) {
      case "cannot be empty !!":
        return res.status(401).json(errors);

      default:
        return res.status(500).json({ error: "something went wrong" });
    }
  }
}




const router = Router();
router.get("/", getCustomers);
router.post("/", addCustomer);


export default router;