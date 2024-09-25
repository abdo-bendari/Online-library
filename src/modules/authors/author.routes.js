import { Router } from "express";
import * as $ from "./controller/author.controller.js";

 const authorRouter = Router()
 authorRouter.post('/',$.addAuthor)
.get('/all',$.getAllAuthors)
.get("/one/:id",$.getOne)
.put("/:id",$.updateAuthor)
.delete('/:id',$.deleteAuthor)
.get('/byNameOrBio',$.getAuthorByNameOrBio)
.get('/withBooks',$.getAuthorsWithBooks)
 export default authorRouter