const WebModel = require('../../models/WebModel')
const Page = require('../../models/Page')
const fs = require('fs')
const Category = require('../../models/Category')

async function renderPageHandler(req,res,pagename,msgOpt,msg,modelOfWeb){
    try{    
        let pages = await Page.find()
        let webModel = await WebModel.findOne()
	    let category = await Category.find()

        if(msg) req.flash(msgOpt,msg)
        return res.render(`pages/administrator/${pagename}`, {
                title: 'Links',
                style: 'bg-light',
                error: {},
                data: req.admin,
                pages,
                createdPage:{},
                flashMessage: req.flash(),
                webModel:modelOfWeb?modelOfWeb:webModel,
                department:null,
                category
        })
    }catch(e){
        console.log(e)
    }
}

function removeDocumentPath(path,next){
    fs.unlink(`public/uploads/documents/${path}`,error=>{
        if(error){
            return next(error)
        }
    })
}

exports.linksGetController = (req,res,next)=>{
        renderPageHandler(req,res,'links')
}
exports.createReferenceLinksPostController = async(req,res,next)=>{
    try{
        let { name,url } = req.body

        let error;
        name.length===0?error='Please Provied Name':''
        url.length===0?error='Please Provied URL':''
        if(error)return renderPageHandler(req,res,'links','fail',error)
         
        let webModel = await WebModel.findOne()

        let createdRefernceLinks = await WebModel.findOneAndUpdate({_id:webModel._id},{
            $push:{
                referenceLinks:{
                    name,
                    url
                }
            }         
        },{new:true})

        if(!createdRefernceLinks){
            req.flash('fail','Internal Server Error')
            return res.redirect('back')
        }
        req.flash('success','Successfully Added Reference Link')
        res.redirect('back')
    }catch(e){
        next(e)
    }
}
exports.referenceLinksUpdatePostController = async(req,res,next)=>{
    try{
        let { name,url } = req.body
        let { id } = req.params
        let error;
        name.length===0?error='Please Provied Name':''
        url.length===0?error='Please Provied URL':''
        if(error)return renderPageHandler(req,res,'links','fail',error)
         
        let webModel = await WebModel.findOne()

        webModel.referenceLinks.forEach((link,ind)=>{
            if(link._id.toString()===id.toString()){
                link.name = name 
                link.url = url 
            }
        })
        let updatedRefernceLinks = await WebModel.findOneAndUpdate({_id:webModel._id},webModel,{new:true})

        if(!updatedRefernceLinks){
            req.flash('fail','Internal Server Error')
            return res.redirect('back')
        }
        req.flash('success','Successfully Updated Reference Link')
        res.redirect('back')
    }catch(e){
        next(e)
    }
}
exports.referenceLinksDeleteGetController = async(req,res,next)=>{
    try{
        let { id } = req.params

        let webModel = await WebModel.findOne()

        let deletedReferenceLink = await WebModel.findOneAndUpdate({_id:webModel._id},{
            $pull:{
                referenceLinks:{
                    _id:id
                }
            }
        },{new:true})

        if(!deletedReferenceLink){
            req.flash('fail','Internal Server Error')
            return res.redirect('back')
        }
        req.flash('success','Successfully Deleted Reference Link')
        res.redirect('back')
    }catch(e){
        next(e)
    }
}
exports.uploadsDocumentLinksPostController = async(req,res,next)=>{
    try{
        let { name,option } = req.body 
        let file = req.file 
   
       
        if(name.length===0||option.length===0){
            if(!file){
                req.flash('fail','Please Upload Document')
                return res.redirect('back')
            }else{
                removeDocumentPath(file.filename,next)
                
                req.flash('fail','Please Provied Name')
                return res.redirect('back')
            }
        }
        if(!file){
            req.flash('fail','Please Upload Document')
            return res.redirect('back')
        }
        
  
        let webModel = await WebModel.findOne()

        let includedDocuments = await WebModel.findOneAndUpdate({_id:webModel._id},{
            $push:{
                documentsLinks:{
                    name,
                    option,
                    document:file.filename
                }
            }
        },{
            new:true
        })

        if(!includedDocuments){
            removeDocumentPath(file.filename,next)
            req.flash('fail','Internal Server Error')
            return res.redirect('back')
        }
        req.flash('success','Successfully Uploaded Document')
        return res.redirect('back')

    }catch(e){
        next(e)
    }
}
exports.documentLinksUpdatePostController = async(req,res,next)=>{
    try{
        let { name,option } = req.body 
        let file = req.file 
        let { id } = req.params
        if(name.length===0||option.length===0){
                if(file){
                    removeDocumentPath(file.filename,next)
                }
                
            req.flash('fail','Please Provied Name')
            return res.redirect('back')
        }

  
        let webModel = await WebModel.findOne()

        let foundedDocument;
        let previousDocumentPath;
        webModel.documentsLinks.forEach(document=>{
            if(document._id.toString()===id.toString()){
                foundedDocument = document
                previousDocumentPath = document.document
            }
        })
        if(!foundedDocument){
            removeDocumentPath(file.filename,next)
            return res.redirect('back')
        }
        foundedDocument.name = name 
        foundedDocument.option = option 
        foundedDocument.document = file?file.filename:previousDocumentPath

        let updatedDocument = await WebModel.findOneAndUpdate({_id:webModel._id},webModel,{new:true})
        if(!updatedDocument){
            removeDocumentPath(file.filename,next)
            req.flash('fail','Internal Server Error')
            return res.redirect('back')
        }

        if(file){
            removeDocumentPath(previousDocumentPath,next) 
        }
      
        req.flash('success','Successfully Updated Document')
        res.redirect('back')
    }catch(e){
        next(e)
    }
}
exports.documentsLinksDeleteGetController = async(req,res,next)=>{
    try{
        let { id } = req.params

        let webModel = await WebModel.findOne()

        let willDeletedDocPath;
        webModel.documentsLinks.forEach(document=>{
            if(document._id.toString()===id.toString()){
                willDeletedDocPath = document.document
            }
        })

        let deletedReferenceLink = await WebModel.findOneAndUpdate({_id:webModel._id},{
            $pull:{
                documentsLinks:{
                    _id:id
                }
            }
        },{new:true})

        if(!deletedReferenceLink){
            req.flash('fail','Internal Server Error')
            return res.redirect('back')
        }
        removeDocumentPath(willDeletedDocPath,next)

        req.flash('success','Successfully Deleted Documents')
        res.redirect('back')
    }catch(e){
        next(e)
    }
}
