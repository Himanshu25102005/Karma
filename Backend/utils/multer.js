const multer = require("multer");
const { v4: uuidV4 } = require("uuid");
const path = require("path");

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/')
    },
    filename:function(req, file, cb){
        const uniquefilename = uuidV4();
        cb(null, uniquefilename+path.extreme(file.originalname));
        const upload = multer({storage:storage})
    }
})
