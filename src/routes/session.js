// const { Router } = require("express");

// const router = Router();

// router.get("/", (req, res) => {
//     res.render("session");
// });

// router.post("/session", (req, res) => {
//     console.log(req.body);
//     for(let key in req.body) {
//         if(req.body[key]) { req.session[key] = req.body[key]; }
//     }
//     let name = req.body.name
//     res.render('bienvenida/index.ejs', {name});
// });

// module.exports = router

import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.render("session");
});

router.post("/session", (req, res) => {
    console.log(req.body);
    for(let key in req.body) {
        if(req.body[key]) { req.session[key] = req.body[key]; }
    }
    let name = req.body.name
    res.render('bienvenida/index.ejs', {name});
});

export default router;