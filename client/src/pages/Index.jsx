import BlogCard from "../components/BlogCard";
import Loading from "@/components/Loading";
import { getEnv } from "@/helpers/getEnv";
import { useFetch } from "@/hooks/userFetch";
import React from "react";

const Index = () => {
  const { data: blogData, loading } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/blog/all`
  );

  if (loading) return <Loading />;

  return (
    // <div className="grid grid-cols-3 gap-10">
    //   {blogData?.blog?.length > 0 ? (
    //     blogData.blog.map((blog) => <props={blog} />)
    //   ) : (
    //     <div>Data not found</div>
    //   )}
    // </div>
    <BlogCard/>
  );
  
};

export default Index;
