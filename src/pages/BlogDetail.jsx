import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Tag, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SEO from '@/components/common/SEO';
import { blogPosts, getBlogRelationSummary } from '@/content';

const BlogDetail = () => {
  const { slug } = useParams();
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const { relatedProducts, relatedWorkshopServices, hasRelations } = getBlogRelationSummary(post.id);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <SEO
        title={post.seoTitle || post.title}
        description={post.seoDescription || post.excerpt}
        url={`/blog/${post.slug}`}
        type="article"
        article={{
          title: post.title,
          description: post.seoDescription || post.excerpt,
          image: post.featuredImage,
          author: post.author,
          publishDate: post.publishDate,
        }}
      />

      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button asChild variant="ghost" className="mb-6 -ml-4 text-gray-600 hover:text-gray-900">
            <Link to="/blog">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke blog
            </Link>
          </Button>

          <span className="inline-flex rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700 mb-4">
            {post.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">{post.title}</h1>
          <p className="text-lg text-gray-600 mb-6">{post.excerpt}</p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <span className="inline-flex items-center gap-1"><User className="w-4 h-4" />{post.author}</span>
            <span className="inline-flex items-center gap-1"><Calendar className="w-4 h-4" />{new Date(post.publishDate).toLocaleDateString('id-ID')}</span>
            <span className="inline-flex items-center gap-1"><Clock className="w-4 h-4" />{post.readTime}</span>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="aspect-[16/8] bg-gray-200 overflow-hidden">
              <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover" />
            </div>

            <div className="p-6 md:p-10">
              <div className="prose prose-gray max-w-none prose-headings:scroll-mt-28">
                {post.content
                  .trim()
                  .split('\n')
                  .filter(Boolean)
                  .map((line, index) => {
                    if (line.startsWith('# ')) return <h1 key={index}>{line.replace(/^#\s+/, '')}</h1>;
                    if (line.startsWith('## ')) return <h2 key={index}>{line.replace(/^##\s+/, '')}</h2>;
                    if (line.startsWith('### ')) return <h3 key={index}>{line.replace(/^###\s+/, '')}</h3>;
                    if (line.startsWith('- ')) return <li key={index}>{line.replace(/^-\s+/, '')}</li>;
                    if (/^\d+\.\s+/.test(line)) return <li key={index}>{line.replace(/^\d+\.\s+/, '')}</li>;
                    if (line === '---') return <hr key={index} />;
                    return <p key={index}>{line}</p>;
                  })}
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100">
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map((tag) => (
                    <span key={tag} className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>

                {hasRelations && (
                  <div className="space-y-4">
                    {relatedProducts.length > 0 && (
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Produk terkait</h3>
                        <div className="flex flex-wrap gap-2">
                          {relatedProducts.map((product) => (
                            <Link key={product.id} to={`/produk/${product.id}`} className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700 hover:bg-indigo-100">
                              {product.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {relatedWorkshopServices.length > 0 && (
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Layanan workshop terkait</h3>
                        <div className="flex flex-wrap gap-2">
                          {relatedWorkshopServices.map((service) => (
                            <Link key={service.id} to={`/workshop#${service.id}`} className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100">
                              {service.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetail;
