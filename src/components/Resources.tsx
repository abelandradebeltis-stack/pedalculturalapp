
import { posts } from "@/lib/posts";
import Link from 'next/link';

const Resources = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {posts.map((post) => (
        <Link href={`/blog/${post.slug}`} key={post.slug} legacyBehavior>
          <a className="block bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-bold mb-2 text-green-700 dark:text-green-400">{post.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{post.description}</p>
            <span className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
              Ler mais &rarr;
            </span>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default Resources;
