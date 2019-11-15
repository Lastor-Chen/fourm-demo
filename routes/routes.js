const router = require('express').Router()
const restCtrler = require('../controllers/restCtrler.js')
const adminCtrler = require('../controllers/adminCtrler.js')
const userCtrler = require('../controllers/userCtrler.js')
const cateCtrler = require('../controllers/categoryCtrler.js')
const commentCtrler = require('../controllers/commentCtrler.js')
const multer = require('multer')
const upload = multer({ dest: 'temp/' })

// custom module
const { isAuthed, isAuthedAdmin } = require('../middleware/isAuth.js')

module.exports = passport => {
  router.get('/', isAuthed, (req, res) => res.redirect('/restaurants'))
  router.get('/restaurants', isAuthed, restCtrler.getRestaurants)
  router.get('/restaurants/feeds', isAuthed, restCtrler.getFeeds)
  router.get('/restaurants/top', isAuthed, restCtrler.getTopRest)
  router.get('/restaurants/:id', isAuthed, restCtrler.getRestaurant)
  router.get('/restaurants/:id/dashboard', isAuthed, restCtrler.getDashboard)

  router.post('/favorite/:RestaurantId', isAuthed, userCtrler.addFavorite)
  router.delete('/favorite/:RestaurantId', isAuthed, userCtrler.removeFavorite)

  router.post('/like/:RestaurantId', isAuthed, userCtrler.addLike)
  router.delete('/like/:RestaurantId', isAuthed, userCtrler.removeLike)

  router.post('/comments', isAuthed, commentCtrler.postComment)
  router.delete('/comments/:id', isAuthedAdmin, commentCtrler.deleteComment)

  router.get('/users/top', isAuthed, userCtrler.getTopUser)
  router.get('/users/:id', isAuthed, userCtrler.getUser)
  router.get('/users/:id/edit', isAuthed, userCtrler.editUser)
  router.put('/users/:id/', isAuthed, upload.single('image'), userCtrler.putUser)

  router.post('/following/:userId', isAuthed, userCtrler.addFollowing)
  router.delete('/following/:userId', isAuthed, userCtrler.removeFollowing)

  router.use('/admin', isAuthedAdmin)  //X
  router.get('/admin', (req, res) => res.redirect('/admin/restaurants'))  //X
  router.get('/admin/restaurants', adminCtrler.getRestaurants)  //O
  router.get('/admin/restaurants/create', adminCtrler.createRestaurants)  //X
  router.post('/admin/restaurants', upload.single('image'), adminCtrler.postRestaurant)  //O
  router.get('/admin/restaurants/:id', adminCtrler.getRestaurant)  //O
  router.get('/admin/restaurants/:id/edit', adminCtrler.editRestaurant)  //X
  router.put('/admin/restaurants/:id', upload.single('image'), adminCtrler.putRestaurant)  //O
  router.delete('/admin/restaurants/:id', adminCtrler.deleteRestaurant)  //O
  router.get('/admin/users', adminCtrler.getUsers)  // O
  router.put('/admin/users/:id', adminCtrler.putUser)  //O
  router.get('/admin/categories', cateCtrler.getCategories)  //O
  router.post('/admin/categories', cateCtrler.postCategory)  //O
  router.get('/admin/categories/:id', cateCtrler.getCategories)  //O
  router.put('/admin/categories/:id', cateCtrler.putCategory)  //O
  router.delete('/admin/categories/:id', cateCtrler.deleteCategory)  //O

  router.get('/signup', userCtrler.signUpPage)  //X
  router.post('/signup', userCtrler.signUp)  //O

  router.get('/signin', userCtrler.signInPage)  //X
  router.post('/signin', userCtrler.signIn.bind(null, passport)) //O
  router.get('/logout', userCtrler.logout)  //X

  return router
}
