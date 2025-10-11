
import { getPostBySlug } from "@/lib/posts";
import { notFound } from "next/navigation";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-white dark:bg-gray-800 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-extrabold mb-4 text-gray-900 dark:text-white">{post.title}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">{post.description}</p>
        <div 
          className="prose prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </div>
  );
}
