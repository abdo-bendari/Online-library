import { Router } from "express";
import * as $ from "./controller/author.controller.js";

 const authorRouter = Router()
 authorRouter.post('/add',$.addAuthor)
.get('/all',$.getAllAuthors)
.get("/one/:id",$.getOne)
.put("/update/:id",$.updateAuthor)
.delete('/delete/:id',$.deleteAuthor)
.get('/byNameOrBio',$.getAuthorByNameOrBio)
.get('/withBooks',$.getAuthorsWithBooks)
 export default authorRouter