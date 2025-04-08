const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner,validateListing} = require("../middleware.js");
const {storage} = require("../cloudConfig.js");
const multer  = require('multer')
const upload = multer({ storage })

const listingController = require("../controller/listings.js");
//index route
router.route("/")
.get( wrapAsync(listingController.index))
.post(isLoggedIn,  upload.single("listing[image]"), validateListing,wrapAsync(listingController.createListing));

router.get("/new",isLoggedIn, wrapAsync(listingController.renderNewForm));
//show route
router.get("/category/:category", wrapAsync(listingController.category));
module.exports = router;

router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner, upload.single("listing[image]"), validateListing, wrapAsync(listingController.updateListing))
.delete(isLoggedIn, isOwner,wrapAsync(listingController.destroyListing));

router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.renderEditForm));

