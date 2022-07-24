import express, { urlencoded }  from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import passportRoute from './routes/passport.js';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { Strategy } from 'passport-local'
import { guardarUsuario, obtenerUsuarios, obtenerUsuarioPorNombre, obtenerUsuarioPorId, asegurarNombreUnico, autenticarUsuario, registrarUsuario} from './public/passportUsers.js'

const app = express();


// PASSPORT STRATEGIES

//REGISTRO
passport.use('registro', new Strategy((email, password, done) => {
    try {
        const usuario = registrarUsuario(email, password)
        done(null, usuario)
    } catch (error) {
        done(error)
    }
}))



//LOGIN
passport.use('login', new Strategy(
    (email, password, done) => {
        try {
            const user = autenticar(email, password)
            console.log(user)
            done(null, user)
        } catch (error) {
            done(null, false)
        }
}))

// SERIALIZACION
passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    try {
        const user = obtenerUsuarioPorId(id)
        done(null, user)
    } catch (error) {
        done(error)
    }
})


// CONFIGURACION DE APP

app.use('/', cookieParser('secret'))
app.use('/', session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/', passportRoute)
app.use(urlencoded({extended: true}))
app.use(express.json())

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set('views',path.join(__dirname, 'views/passport' ));
app.set('view engine', 'ejs');

const PORT = 8080;
app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); } );