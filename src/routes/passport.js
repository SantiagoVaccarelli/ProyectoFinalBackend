import { Router } from "express";
import passport from 'passport';


const router = Router();

router.get("/", (req, res) => {
    if(!req.isAuthenticated()) res.redirect("/registro");
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/registro", (req, res) => {
    res.render("registro");
});

router.post("/login", passport.authenticate('login', {
    successRedirect: '/auth/successLogin',
    failureRedirect: '/auth/failLogin',
}));

router.post("/registro", passport.authenticate('registro', {
    successRedirect: '/auth/successRegister',
    failureRedirect: '/auth/failRegister',
}));

export default router;