const blogModel = require('../models/blogModel')
const commentModel = require('../models/commentModel')

exports.newCommment = async (req, res) =>{
    try{
        const id = req.body.id
        const blog = await blogModel.findById(id)

        if(!blog){
            return res.status(404).json({
                message:`Post not found`
            })
        }

        const comment = await commentModel.create(req.body)

        blog.comments.push(comment._id)
        comment.post = blog._id

        await blog.save()
        await comment.save()

        res.status(201).json({
            message: `Successfully posted a comment`,
            data: comment
        })

    }catch(err){
        return res.status(500).json({
            message: err.message
        })
    }
}




exports.getComment = async (req, res) =>{
    try{
        const id = req.params.id

        const comment = await commentModel.findById(id)

        if(!comment){
            return res.status(404).json({
                message: `Comment has been deleted`
            })
        }
        res.status(200).json({
            message: `Comment fetched successfully`,
            data: comment
        })

    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

exports.getAllComment = async (req, res) =>{
    try{
        const comment = await commentModel.find()

        if(comment.length === 0){
            return res.status(404).json({
                message: `There are no comments present here`
            })
        }
        res.status(200).json({
            message: `Comments fetched successfully. There are ${comment.length} Comments here`,
            data: comment
        })

    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

exports.updateComment = async (req, res) =>{
    try{
        const id = req.params.id

        const {comment} = req.body

        const update = await commentModel.findByIdAndUpdate(id, {
            comment
        }, {new: true})

        if(!update){
            return res.status(404).json({
                message: `Comment not found`
            })
        }
        res.status(200).json({
            message: `Comment updated successfully`,
            data: update
        })

    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}


exports.deleteComment = async (req, res) =>{
    try{
        const id = req.params.id
        const comment = await commentModel.findByIdAndDelete(id)

        if(!comment){
            return res.status(404).json({
                message: `Comment ID not found to be deleted`
            })
        }
        res.status(200).json({
            message: `Comment deleted successfully`,
            data: comment
        })

    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}