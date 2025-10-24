const Comment = require("../model/commet.model");

const createComment = async (req, res) => {
  try {
    const { foodItemId, content } = req.body;
    const userId = req.user.id; 
    const newComment = await Comment.create({
      postId: foodItemId,
      userId,
      content,
    });
   
    res.status(201).json({
      message: "Comment created successfully",
      comment: newComment,
    });
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getAllComments = async (req, res) => {
  try {
    const { foodItemId } = req.query;

    // ✅ Fetch comments and sort by newest first
    const comments = await Comment.find({ postId: foodItemId })
      .populate('userId', 'name profileUrl')
      .sort({ createdAt: -1 }); 

    res.status(200).json({
      message: "Comments fetched successfully",
      comments,
    });
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user.id;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.userId.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await comment.remove();
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createComment,
  getAllComments,
};
