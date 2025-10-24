import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  image, 
  url, 
  type = 'website',
  article = null,
  product = null,
  organization = null
}) => {
  const siteTitle = 'Van Racing Exhaust Indonesia';
  const siteDescription = 'Knalpot Custom & Racing Motor Berkualitas Premium - Van Racing Exhaust Indonesia. Full System, Slip On, Custom Order dengan Garansi Resmi.';
  const siteUrl = 'van-racing.co.id';
  const defaultImage = `${siteUrl}/images/og-image.jpg`;

  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const fullDescription = description || siteDescription;
  const fullImage = image || defaultImage;
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;

  // Generate JSON-LD structured data
  const generateStructuredData = () => {
    const baseOrganization = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Van Racing Exhaust Indonesia",
      "alternateName": "Van Racing",
      "url": siteUrl,
      "logo": `${siteUrl}/images/logo.png`,
      "description": siteDescription,
      "foundingDate": "2019",
      "founders": [
        {
          "@type": "Person",
          "name": "Joko Susanto"
        }
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Jl. Otomotif Raya No. 123",
        "addressLocality": "Jakarta Timur",
        "addressRegion": "DKI Jakarta",
        "postalCode": "13220",
        "addressCountry": "ID"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+62-812-3456-7890",
        "contactType": "customer service",
        "availableLanguage": "Indonesian"
      },
      "sameAs": [
        "https://www.instagram.com/Van Racingexhaust",
        "https://www.facebook.com/Van Racingexhaust",
        "https://www.youtube.com/Van Racingexhaust"
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "1000",
        "bestRating": "5",
        "worstRating": "1"
      },
      "priceRange": "$$"
    };

    let structuredData = [baseOrganization];

    // Add WebSite schema
    structuredData.push({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": siteTitle,
      "url": siteUrl,
      "description": siteDescription,
      "publisher": {
        "@type": "Organization",
        "name": "Van Racing Indonesia"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${siteUrl}/produk?search={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    });

    // Add Article schema for blog posts
    if (article) {
      structuredData.push({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": article.title,
        "description": article.description,
        "image": article.image || fullImage,
        "author": {
          "@type": "Person",
          "name": article.author || "Tim Van Racing"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Van Racing Exhaust Indonesia",
          "logo": {
            "@type": "ImageObject",
            "url": `${siteUrl}/images/logo.png`
          }
        },
        "datePublished": article.publishDate,
        "dateModified": article.modifiedDate || article.publishDate,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": fullUrl
        }
      });
    }

    // Add Product schema for product pages
    if (product) {
      structuredData.push({
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.name,
        "description": product.description,
        "image": product.images || [fullImage],
        "brand": {
          "@type": "Brand",
          "name": "Van Racing"
        },
        "manufacturer": {
          "@type": "Organization",
          "name": "Van Racing Exhaust Indonesia"
        },
        "offers": {
          "@type": "Offer",
          "price": product.price,
          "priceCurrency": "IDR",
          "availability": product.availability || "https://schema.org/InStock",
          "seller": {
            "@type": "Organization",
            "name": "Van Racing Exhaust Indonesia"
          }
        },
        "aggregateRating": product.rating ? {
          "@type": "AggregateRating",
          "ratingValue": product.rating.average,
          "reviewCount": product.rating.count,
          "bestRating": "5",
          "worstRating": "1"
        } : undefined,
        "category": product.category,
        "sku": product.sku,
        "mpn": product.mpn
      });
    }

    // Add LocalBusiness schema
    structuredData.push({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Van Racing Exhaust Indonesia",
      "image": `${siteUrl}/images/workshop.jpg`,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Jl. Otomotif Raya No. 123",
        "addressLocality": "Jakarta Timur",
        "addressRegion": "DKI Jakarta",
        "postalCode": "13220",
        "addressCountry": "ID"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "-6.2088",
        "longitude": "106.8456"
      },
      "telephone": "+62-812-3456-7890",
      "openingHours": "Mo-Sa 08:00-17:00",
      "priceRange": "$$",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "1000"
      }
    });

    return structuredData;
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content="Van Racing Exhaust Indonesia" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content="id_ID" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:site" content="@Van Racingexhaust" />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#dc2626" />
      <meta name="msapplication-TileColor" content="#dc2626" />
      <meta name="application-name" content={siteTitle} />
      
      {/* Geo Tags */}
      <meta name="geo.region" content="ID-JK" />
      <meta name="geo.placename" content="Jakarta Timur" />
      <meta name="geo.position" content="-6.2088;106.8456" />
      <meta name="ICBM" content="-6.2088, 106.8456" />

      {/* Business Tags */}
      <meta name="business:contact_data:street_address" content="Jl. Otomotif Raya No. 123" />
      <meta name="business:contact_data:locality" content="Jakarta Timur" />
      <meta name="business:contact_data:region" content="DKI Jakarta" />
      <meta name="business:contact_data:postal_code" content="13220" />
      <meta name="business:contact_data:country_name" content="Indonesia" />
      <meta name="business:contact_data:phone_number" content="+62-812-3456-7890" />

      {/* Structured Data */}
      {generateStructuredData().map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}

      {/* Preconnect for Performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link rel="preconnect" href="https://api.whatsapp.com" />

      {/* Favicon */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </Helmet>
  );
};

export default SEO;
