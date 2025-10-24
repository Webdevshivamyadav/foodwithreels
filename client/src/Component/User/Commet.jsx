import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Trash2, MoreVertical, Send } from "lucide-react";

const Comment = ({
  user = "Shivam Yadav",
  time = "2 hours ago",
  text = "This is an awesome post! Keep it up 🚀",
  avatar = "https://i.pravatar.cc/150?img=32",
}) => {
  const [liked, setLiked] = useState(false);
  const [replyBoxOpen, setReplyBoxOpen] = useState(false);
  const [reply, setReply] = useState("");
  const [replies, setReplies] = useState([]);

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (!reply.trim()) return;
    const newReply = {
      user: "You",
      text: reply,
      time: "Just now",
      avatar: "https://i.pravatar.cc/150?img=12",
    };
    setReplies([newReply, ...replies]);
    setReply("");
    setReplyBoxOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="w-full bg-white  dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-md p-4 flex flex-col gap-4"
    >
      <div className="flex gap-4 items-start">
        {/* Avatar */}
        <img
          src={avatar}
          alt="user"
          className="w-12 h-12 rounded-full object-cover border"
        />

        {/* Comment Content */}
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                {user}
              </h3>
              <p className="text-sm text-gray-500">{time}</p>
            </div>
            <MoreVertical className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
          </div>

          {/* Comment Text */}
          <p className="text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
            {text}
          </p>

          {/* Actions */}
          <div className="flex gap-6 mt-3 text-sm text-gray-500">
            <button
              onClick={() => setLiked(!liked)}
              className={`flex items-center gap-1 transition ${
                liked ? "text-red-500" : "hover:text-red-500"
              }`}
            >
              <Heart
                className={`w-4 h-4 ${
                  liked ? "fill-red-500 stroke-red-500" : ""
                }`}
              />
              Like
            </button>

            <button
              onClick={() => setReplyBoxOpen(!replyBoxOpen)}
              className="flex items-center gap-1 hover:text-blue-500 transition"
            >
              <MessageCircle className="w-4 h-4" /> Reply
            </button>

            <button className="flex items-center gap-1 hover:text-gray-700 transition">
              <Trash2 className="w-4 h-4" /> Delete
            </button>
          </div>

          {/* Reply Box */}
          {replyBoxOpen && (
            <form
              onSubmit={handleReplySubmit}
              className="mt-3 flex items-center gap-2 border border-gray-200 dark:border-gray-700 rounded-xl p-2"
            >
              <img
                src="https://i.pravatar.cc/150?img=12"
                alt="you"
                className="w-8 h-8 rounded-full object-cover"
              />
              <input
                type="text"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Write a reply..."
                className="flex-1 bg-transparent outline-none text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400"
              />
              <button
                type="submit"
                className="text-blue-500 hover:text-blue-600 transition"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Replies */}
          {replies.length > 0 && (
            <div className="mt-3 space-y-2 border-l-2  border-gray-200 dark:border-gray-700 pl-3">
              {replies.map((r, i) => (
                <div key={i} className="flex items-start gap-2">
                  <img
                    src={r.avatar}
                    alt={r.user}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm text-gray-800 dark:text-gray-100">
                      <span className="font-semibold">{r.user}</span> {r.text}
                    </p>
                    <p className="text-xs text-gray-500">{r.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Comment;
