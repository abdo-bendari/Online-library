import { Router } from "express";
import * as A from "./controller/book.controller.js";

 const bookRouter = Router();

bookRouter.post('/',A.addBook)
.get('/',A.allBooks)
.delete('/:bookId',A.deleteBook)
.put("/:bookId",A.updateBook)
.get('/ByTitleOrAuthor',A.getByTitleOrAuthor)

 export default bookRouter