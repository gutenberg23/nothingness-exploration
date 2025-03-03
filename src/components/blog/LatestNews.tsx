
import React from "react";
import { BlogPost } from "./types";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface LatestNewsProps {
  posts: BlogPost[];
  title?: string;
  viewAllLink?: string;
}

export const LatestNews: React.FC<LatestNewsProps> = ({ 
  posts, 
  title = "Últimas notícias", 
  viewAllLink = "/blog"
}) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-[#272f3c]">{title}</h2>
        {viewAllLink && (
          <Link 
            to={viewAllLink} 
            className="text-sm text-[#ea2be2] hover:text-[#d029d5] flex items-center"
          >
            Ver todos <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        )}
      </div>
      
      <div className="space-y-4">
        {posts.map(post => (
          <Link 
            key={post.id} 
            to={`/blog/${post.slug}`}
            className="flex items-center gap-2 group"
          >
            <div className="h-2 w-2 rounded-full bg-[#ea2be2]"></div>
            <span className="font-medium text-[#272f3c] group-hover:text-[#ea2be2] transition-colors">{post.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};
