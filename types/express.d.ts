import User from "./../src/db/Models/User.model";
declare global {
    namespace Express {
        interface Request {
            user?: User; // Puedes ajustar el tipo según la estructura de tu usuario
        }
    }
}
