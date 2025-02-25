import React from "react";
import { useSelector } from "react-redux"; // Import useSelector here
import { FaRegCalendarAlt } from "react-icons/fa";
import { Card, CardContent } from "./ui/card"; // Ensure Card is imported
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "./ui/badge";

const BlogCard = ({ props }) => {
  const user = useSelector((state) => state.user);
  console.log(props); // Log props to debug

  // Ensure props and props.author are defined
  if (!props || !props.author) {
    return <div>Loading...</div>; // Handle case where author is missing
  }

  const { author, title, createdAt } = props;

  // Fallback for Avatar and Author Name
  const avatarSrc = author.Avatar || "/default-avatar.png"; // Default avatar if none
  const authorName = author.name || "Unknown Author"; // Default name if none

  return (
    <Card className="pt-5">
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-between">
            <Avatar>
              <AvatarImage src={avatarSrc} />
            </Avatar>
            <span>{authorName}</span> {/* Display author's name */}
          </div>
          <Badge variant="outline" className="bg-violet-500">
            Admin
          </Badge>
        </div>

        <div>
          <p>
            <FaRegCalendarAlt />
            <span>{new Date(createdAt).toLocaleDateString()}</span>{" "}
            {/* Display post date */}
          </p>
          <h2 className="text-2xl font-bold line-clamp-2">
            {title || "Untitled"} {/* Fallback for title */}
          </h2>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
