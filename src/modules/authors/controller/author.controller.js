import Author from "../../../../database/models/author.model.js";
import AppError from "../../../utils/Error.js";
import catchError from "../../../middleware/catchError.js";


export const addAuthor = catchError(async(req, res,next)=>{
    const newAuthor = await Author.insertMany(req.body);
    return res.status(201).json({ message: "done", newAuthor });
   })

   
export const getAllAuthors= catchError(async(req, res,next)=>{
    const{page,limit} =req.query
    const allAuthor = await Author.find().populate().skip((page - 1) * limit).limit(limit || 2)
    return addAuthor.length == 0 ?
    next(new AppError('not found authors',404)) :
    res.status(201).json({ message: "done", allAuthor });
   })

   export const getOne= catchError(async(req, res,next)=>{
    const{id} = req.params
    const author = await Author.findById(id);
    return ! author ?
    next(new AppError('not found author',404)) :
    res.status(201).json({ message: "done", author });
   })

   export const updateAuthor = catchError(async(req, res,next)=>{
    const{id} = req.params
    const author = await Author.findByIdAndUpdate(id,req.body,{new : true});
    return !author ?
    next(new AppError('not found author',404)) :
     res.status(201).json({ message: "done", author });
   })

   export const deleteAuthor = catchError(async(req, res,next)=>{
    const{id} = req.params
    const author = await Author.findByIdAndDelete(id);
    return !author ?
    next(new AppError('not found author',404)) :
     res.status(201).json({ message: "done", author });
   })


   export const getAuthorByNameOrBio= catchError(async(req, res,next)=>{
    const {name , bio } = req.query
    const author = await Author.find({$or :[{name},{bio}]})
    return ! author ?
    next(new AppError('not found author',404)) :
    res.status(201).json({ message: "done", author });
   })


   export const getAuthorsWithBooks= catchError(async(req, res,next)=>{
    const author = await Author.find().populate("books")
    return  author.length == 0 ?
    next(new AppError('not found authors',404)) :
    res.status(201).json({ message: "done", author });
   })