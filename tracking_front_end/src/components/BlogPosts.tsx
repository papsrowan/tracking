'use client';

import { motion } from 'framer-motion';
import { useBlogPosts } from '@/hooks/useApi';
import { BlogPost } from '@/types';

export function BlogPosts() {
  const { data: posts, isLoading } = useBlogPosts();

  if (isLoading) {
    return (
      <div className="py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4 mx-auto"></div>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-2xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section id="blog" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Latest News</h2>
          <p className="mt-4 text-gray-600">Stay updated with our latest news and insights</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts?.slice(0, 3).map((post: BlogPost, index: number) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="h-48 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                <span className="text-4xl">📦</span>
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-500 mb-2">
                  {new Date(post.publishedAt || post.createdAt).toLocaleDateString()}
                </p>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h3>
                <p className="text-gray-600 line-clamp-2">{post.summary}</p>
                <a
                  href={`#blog/${post.slug}`}
                  className="inline-flex items-center mt-4 text-blue-600 font-medium hover:text-blue-700"
                >
                  Read more
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
