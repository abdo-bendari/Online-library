import bookRouter from "./modules/books/book.routes.js"
import authorRouter from "./modules/authors/author.routes.js"
import AppError from "./utils/Error.js"
import globalError from "./middleware/globalError.js"
export const bootstrap = (app,express)=>{
    process.on("uncaughtException", (err) => {
        console.log(err);
      });
    const baseUrl ='/api/v1'
    app.use(express.json())
    app.use(`${baseUrl}/book`,bookRouter)
    app.use(`${baseUrl}/author`,authorRouter)
    app.use("*", (req, res, next) => {
        next(new AppError("route not found", 400));
      });
      process.on("unhandledRejection", (err) => {
        console.log(err);
      });
      app.use(globalError);
}