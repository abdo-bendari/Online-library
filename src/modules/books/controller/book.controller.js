import AppError from "../../../utils/Error.js";
import catchError from "../../../middleware/catchError.js";
import Author from "../../../../database/models/author.model.js"
import Book from "../../../../database/models/book.model.js";



export const addBook = catchError(async(req, res,next)=>{
    const {authorId, title , content , publishedDate} = req.body
    let isAuthorExist = await Author.findById(authorId)
    if ( ! isAuthorExist ){
         next(new AppError('invalid author id',404)) 
    }  
    const newBook = await Book.create({
        title ,
        content,
        publishedDate,
        authorId : isAuthorExist.name
    })
    isAuthorExist.books.push(newBook._id)
     await isAuthorExist.save()
    return res.status(201).json({ message: "done", newBook });
   })

   export const allBooks = catchError(async(req, res,next)=>{
    const{page,limit} =req.query
    const books = await Book.find().skip((page - 1) * limit).limit(limit || 2)
    return books.length == 0 ?
    next(new AppError('not found books',404)) :
    res.status(201).json({ message: "done", books });
   })

export const deleteBook = catchError(async(req, res,next)=>{
    const{bookId} = req.params
    const {authorId} = req.body
    const author = await Author.findById(authorId)
    if ( ! author ){
        next(new AppError('invalid author id',404)) 
   } 
    const book = await Book.findByIdAndDelete(bookId);
    if(!book){
        next(new AppError('invalid book id',404)) 
    }
     author.books.pull(bookId)
     await author.save()
     return res.status(201).json({ message: "done", book });
   })

export const updateBook = catchError(async(req, res,next)=>{
    const{bookId} = req.params
    const book = await Book.findByIdAndUpdate(bookId,{     
        title  : req.body.title,
        content: req.body.content,
        publishedDate: req.body.publishedDate},{new : true});
   return !book ? 
        next(new AppError('invalid book id',404)) 
     :   res.status(201).json({ message: "done", book });
   })


   export const getByTitleOrAuthor = catchError(async(req, res,next)=>{
    const {title , authorId } = req.query
    const book = await Book.find({$or :[{title},{authorId}]})
    return ! book ?
    next(new AppError('not found book',404)) :
    res.status(201).json({ message: "done", book });
   })