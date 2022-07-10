import express  from "express";
import session from "express-session";
import sessionRoute from "./routes/session.js";
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//TO RUN TRY : npm run startSession
const app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(
    {
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
    }
));

app.set('views',path.join(__dirname, 'views/SessionCookies' ));
app.set('view engine', 'ejs');
app.use("/", sessionRoute);

const PORT = 8080;
app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); } );