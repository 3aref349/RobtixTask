import { Request, Response, Router } from "express";
import feedback from "../../models/feedback.js"

const { QueryTypes } = require('sequelize');
const sequelize = require('../db/DB.js');



/****  GET FeedBack */
const getFeedback = async (_: Request, res: Response) => {
    try {

        const projects = await sequelize.query("select * from feedback", { type: QueryTypes.SELECT });
        return res.status(200).json(projects);
    } catch (error) {
        console.log("error");
        console.log(error);
        return res.status(500).json({ error: "something went wrong" });
    }
};

const getfeedbackBycst = async (req: Request, res: Response) => {
    // const { id } = req.params;
    const { cstId } = req.body;

    console.log("before try")

    console.log("cstId")
    try {
        console.log("after try")
        const feed = await sequelize.query(`select * from feedback where cstId=${cstId} `, { type: QueryTypes.SELECT });
        return res.status(200).json(feed);

    } catch (error) {
        console.log(error)
        switch (error.message) {
            case "Project not found":
                return res.status(404).json({ error: error.message });
            default:
                return res.status(500).json({ error: "something went wrong" });
        }
    }
};

const addFeedBack = async (req: Request, res: Response) => {
    const { feedback, cstId } = req.body;
    let errors: any = {};

    try {
        //const user = await User.findOne(res.locals.user.id)
        console.log("create cst")

        if (!feedback) errors.Name = "cannot be empty !!";
        if (!cstId) errors.Name = "cannot be empty !!";
        if (Object.keys(errors).length > 0) throw new Error("cannot be empty !!")
        const cst = await sequelize.query(`INSERT INTO robtix.feedback (feedback,cstId) Values ('${feedback}','${cstId}') `, { type: QueryTypes.INSERT });

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
router.get("/", getFeedback)

router.put("/", getfeedbackBycst);

router.post("/", addFeedBack);


export default router;