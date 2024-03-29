const router = require('express').Router()
const uploads = require('../../middlewares/uploadMIddleware')

const {
    isAuthenticatedAdmin
} = require('../../middlewares/adminAuthMiddleware')
const createPageValidator = require('../../validators/admin/createPageValidator')
const updatePageValidator = require('../../validators/admin/updatePageValidator')

const {
    pageCreateGetController,
    pageCreatePostController,
    pageUpdateGetController,
    pageUpdatePostController,
    pageDeleteGetController,
    addTextAboutAdministratorGetController,
    addTextAboutAdministratorPostController,
    deleteTextAboutAdministratorGetController,
    updateTextAboutAdministratorPostController,
    addAboutTeacherInfoGetController,
    createTeacherGroupPostController,
    updateTeacherGroupPostController,
    deleteTeacherGroupGetController,
    addTeacherInfoPostController,
    updateTeacherInfoPostController,
    deleteTeacherInfoGetController,
    addContentGetController,
    addMissionAndVissionPostController,
    addLibrayInfoPostController,
    clearAllAboutMissionAndVission,
    clearAllAboutLibray,
    aboutTextAddPostController,
    galleryGetController,
    addGalleryPostController,
    updatedGalleryPostController,
    deleteGalleryGetController
} = require('../../controllers/adminControllers/pageController')


router.get('/page_create',isAuthenticatedAdmin,pageCreateGetController)
router.post('/page_create',isAuthenticatedAdmin,createPageValidator,pageCreatePostController)

router.get('/page_update/:pageId',isAuthenticatedAdmin,pageUpdateGetController)
router.get('/page_delete/:pageId',isAuthenticatedAdmin,pageDeleteGetController)
router.post('/page_update/:pageId',isAuthenticatedAdmin,updatePageValidator,pageUpdatePostController)

router.get('/add_content',isAuthenticatedAdmin,addContentGetController)
router.post('/mission&vission',isAuthenticatedAdmin,addMissionAndVissionPostController)
router.post('/libray',isAuthenticatedAdmin,addLibrayInfoPostController)

router.get('/mission&vission/delete',isAuthenticatedAdmin,clearAllAboutMissionAndVission)
router.get('/libray/delete',isAuthenticatedAdmin,clearAllAboutLibray)


router.get('/about/administrator',isAuthenticatedAdmin,addTextAboutAdministratorGetController)

router.post('/about/administrator',isAuthenticatedAdmin,uploads.single('image'),addTextAboutAdministratorPostController)

router.get('/about/administrator/delete/:id',isAuthenticatedAdmin,deleteTextAboutAdministratorGetController)

router.post('/about/administrator/update/:id',isAuthenticatedAdmin,uploads.single('image'),updateTextAboutAdministratorPostController)

router.get('/about/teachers',isAuthenticatedAdmin,addAboutTeacherInfoGetController)
router.post('/create/teacher/group',isAuthenticatedAdmin,createTeacherGroupPostController)
router.get('/teacher/group/delete/:id',isAuthenticatedAdmin,deleteTeacherGroupGetController)
router.post('/teacher/group/update/:id',isAuthenticatedAdmin,updateTeacherGroupPostController)

router.post('/teacher/info/add',isAuthenticatedAdmin,uploads.single('image'),addTeacherInfoPostController)
router.post('/teacher/info/update/:id',isAuthenticatedAdmin,uploads.single('image'),updateTeacherInfoPostController)

router.get('/teacher/info/delete/:id',isAuthenticatedAdmin,uploads.single('image'),deleteTeacherInfoGetController)


router.get('/teacher/info/delete/:id',isAuthenticatedAdmin,uploads.single('image'),deleteTeacherInfoGetController)

router.post('/about/text/add',isAuthenticatedAdmin,aboutTextAddPostController)
router.get('/gallery',isAuthenticatedAdmin,galleryGetController)
router.post('/gallery',isAuthenticatedAdmin,uploads.single('image'),addGalleryPostController)
router.post('/gallery/update/:id',isAuthenticatedAdmin,uploads.single('image'),updatedGalleryPostController)
router.get('/gallery/delete/:id',isAuthenticatedAdmin,deleteGalleryGetController)

module.exports = router