const Menu = require('../../models/Menu')
const WebModel = require('../../models/WebModel')
const ExaminationType = require('../../models/ExaminationType')
const Teacher = require('../../models/Teacher')
const Page = require('../../models/Page')
const Contact = require('../../models/Contact')
const Category = require('../../models/Category')
const Notice = require('../../models/Notice')
const Controls = require('../../models/Controls')

async function renderPageHandler(req,res,pagename,title,page,department,searchContent,singleNotice){
    let menu  = await Menu.find()
    let webModel = await WebModel.findOne()
    let examinationType = await ExaminationType.find()
    let teachers = await Teacher.find()
    let category = await Category.find()
    let notice = await Notice.find()
    const control = await Controls.findOne()
    let  contactSentMail  = control&&control.contactSentMail
    res.render(`pages/${pagename}`,{
        title,
        menu,
        webModel,
        examinationType:examinationType?examinationType:[],
        group:teachers?teachers:[],
        page,
        department,
        category,
        notice,
        searchContent,
        searchValue:req.query,
        singleNotice,
        contactSentMail
    })
}
exports.indexPageGetController = async(req,res,next)=>{
    try{
        let webModel = await WebModel.findOne()

        let prevConut = webModel.countDailyVisitors?webModel.countDailyVisitors:0
         await WebModel.findOneAndUpdate({_id:webModel._id},{
            countDailyVisitors:Number(prevConut)+1
        },{new:true})

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
exports.aboutTeachersInfoGetController = async(req,res,next)=>{
    try{
        renderPageHandler(req,res,'web/teachers','Teachers Info')
    }catch(e){
        next(e)
    }
}
exports.aboutPageGetController = async(req,res,next)=>{
	try{
		renderPageHandler(req,res,'web/aboutPage','About JASA')
	}catch(e){
		next(e)
	}
}
exports.librayPageGetController = (req,res,next)=>{
    try{
        renderPageHandler(req,res,'web/libray','Libray')
    }catch(e){
        next(e)
    }
}
exports.missionAndVissionPageGetController = (req,res,next)=>{
    try{
        renderPageHandler(req,res,'web/missionAndVission','Mission & Vission')
    }catch(e){
        next(e)
    }
}
exports.contactPageGetController = async(req,res,next)=>{
    try{
        renderPageHandler(req,res,'web/contact','Contact Us')
    }catch(e){
        next(e)
    }
} 
exports.contactPagePostController = async(req,res,next)=>{
    try{
        let { name,email,subject,message } = req.body
        let control = await Controls.findOne()
        if(!control.contactSentMail){
            res.json({error:'Contact Has Been Deactivated!'})
            return false
        }
        
        if(name.length===0||email.length===0||subject.length===0||message.length===0){
            res.json({error:'Invalid Credentials'})
            return false
        }
       
        let d = new Date()
        let correntMonth = d.getMonth()+1
        
        let contactInfo = new Contact({
            name,
            email,
            subject,
            message,
            date:`${d.getDate()+1}/${correntMonth}/${d.getFullYear()}`
        })
        let sendInfo = await contactInfo.save()

        if(!sendInfo){
            res.json({error:'Internal Server Error'})
            return false
        }
        res.json({message:'We Have Received Your Email,Please Wait For Our Feedback.'})
    }catch(e){
        next(e)
    }

}
exports.dynamicPageRenderGetController = async(req,res,next)=>{
    try{
        let { pagename } = req.params

        let pages = await Page.find()
        
        let hasPage;
        for(let page of pages){
            if(page.menu.toString().toLowerCase()===pagename.toString().toLowerCase()){
                hasPage = page
            }
        }
 
       if(!hasPage){
            res.redirect('back')
            return false
       }

       renderPageHandler(req,res,'web/dynamicPage',pagename.toUpperCase()
       ,hasPage)
    
    }catch(e){
        next(e)
    }
}
exports.departmentPageGetController = async(req,res,next)=>{
    try{
        let { name } = req.params
        

        let webModel = await WebModel.findOne()

        let hasDepartment;
        for(let d of webModel.departments){
            if(d.name.toString().toLowerCase().trim()===name.toString().toLowerCase().trim()){
                hasDepartment = d
            }
        }

        if(!hasDepartment){
            return res.redirect('back')
        }
        renderPageHandler(req,res,'web/department',name.toUpperCase(),null,hasDepartment)
    }catch(e){
        next(e)
    }
}
exports.galleryGetController = async(req,res,next)=>{
    try{
        renderPageHandler(req,res,'web/gallery.ejs','Gallery')
    }catch(e){
        next(e)
    }
}
exports.noticeCategoryGetController = async(req,res,next)=>{
    try{    
        let { search } = req.query 
        let searchFor;
        if(search){
            let notice = await Notice.find({ "title": { "$regex": search, "$options": "i" }})
            searchFor = notice 
        }
        renderPageHandler(req,res,'web/noticeCategory.ejs','Notice',null,null,searchFor)
    }catch(e){
        next(e)
    }
}
exports.noticeGetController = async(req,res,next)=>{
    try{    
        let { id } = req.params
        let notice = await Notice.findOne({id:id})

        renderPageHandler(req,res,'web/notice.ejs','Notice',null,null,null,notice)
    }catch(e){
        next(e)
    }
}
