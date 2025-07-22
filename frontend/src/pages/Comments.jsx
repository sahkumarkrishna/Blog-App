import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import axios from 'axios';
import { Eye } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Comments = () => {
  const [allComments, setAllComments] = useState([]);
  const navigate = useNavigate();

  const getTotalComments = async () => {
    try {
      const res = await axios.get(
        `https://blog-app-xqmy.onrender.com/api/v1/comment/my-blogs/comments`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setAllComments(res.data.comments);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    getTotalComments();
  }, []);

  return (
    <div className="pb-10 pt-20 md:ml-[320px] h-screen">
      <div className="max-w-6xl mx-auto mt-8">
        <Card className="w-full p-5 space-y-2 dark:bg-gray-800">
          <Table>
            <TableCaption>A list of your recent comments.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Blog Title</TableHead>
                <TableHead>Comment</TableHead>
                <TableHead>Author</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allComments?.map((comment) => (
                <TableRow key={comment._id}>
                  <TableCell className="font-medium">
                    {comment.postId?.title || 'N/A'}
                  </TableCell>
                  <TableCell>{comment.content}</TableCell>
                  <TableCell>{comment.userId?.firstName || 'N/A'}</TableCell>
                  <TableCell className="text-right">
                    <Eye
                      className="cursor-pointer"
                      onClick={() =>
                        navigate(`/blogs/${comment.postId?._id}`)
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default Comments;
