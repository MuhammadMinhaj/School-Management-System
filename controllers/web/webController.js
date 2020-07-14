let Menu = require('../../models/Menu')
let WebModel = require('../../models/WebModel')
const ExaminationType = require('../../models/ExaminationType')

async function renderPageHandler(req,res,pagename,title){
    let menu  = await Menu.find()
    let webModel = await WebModel.findOne()
    let examinationType = await ExaminationType.find()
    res.render(`pages/${pagename}`,{
        title,
        menu,
        webModel,
        examinationType:examinationType?examinationType:[]
    })
}

exports.indexPageGetController = async(req,res,next)=>{
    try{
        renderPageHandler(req,res,'index.ejs','JAMEA AHMADIA SUNNIA ALIA KAMIL MADRASAH')
    }catch(e){
        next(e)
    }
}
exports.resultsPublicationGetController = async(req,res,next)=>{
    try{
        renderPageHandler(req,res,'web/resultsPublication.ejs','Results')
    }catch(e){
        next(e)
    }
}
exports.aboutAdministrationInfoGetController = async (req,res,next)=>{
    try{
        renderPageHandler(req,res,'web/administration.ejs','About Administration')
    }catch(e){
        next(e)        
    }
}