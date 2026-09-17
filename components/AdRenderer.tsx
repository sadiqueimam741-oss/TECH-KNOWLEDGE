'use client';

import React, { useEffect, useRef } from 'react';
import { Advertisement } from '@/lib/types';

interface AdRendererProps {
  ad: Advertisement;
  className?: string;
}

export default function AdRenderer({ ad, className = '' }: AdRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const adType = ad.ad_type || 'image';

  // Compute common dimensions and spacing
  const containerStyle: React.CSSProperties = {
    width: ad.responsive !== false || !ad.width ? '100%' : `${ad.width}px`,
    maxWidth: ad.max_width ? `${ad.max_width}px` : undefined,
    minHeight: ad.height ? `${ad.height}px` : undefined,
    marginLeft: ad.alignment === 'right' ? 'auto' : ad.alignment === 'center' ? 'auto' : undefined,
    marginRight: ad.alignment === 'left' ? 'auto' : ad.alignment === 'center' ? 'auto' : undefined,
    marginBottom: ad.spacing ? `${ad.spacing}px` : undefined,
  };

  // Google AdSense auto-execution
  useEffect(() => {
    if (adType === 'adsense' && typeof window !== 'undefined') {
      try {
        const adsbygoogle = (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle || [];
        adsbygoogle.push({});
      } catch {
        // Suppress AdSense duplicate push errors
      }
    }
  }, [adType, ad.adsense_slot]);

  // Execute scripts if custom_html has <script> tags
  useEffect(() => {
    if (adType === 'custom_code' && containerRef.current && ad.custom_html) {
      const scripts = containerRef.current.querySelectorAll('script');
      scripts.forEach((oldScript) => {
        const newScript = document.createElement('script');
        Array.from(oldScript.attributes).forEach((attr) => newScript.setAttribute(attr.name, attr.value));
        newScript.appendChild(document.createTextNode(oldScript.innerHTML));
        oldScript.parentNode?.replaceChild(newScript, oldScript);
      });
    }
  }, [adType, ad.custom_html]);

  // 1. VIDEO AD
  if (adType === 'video' && ad.video_url) {
    return (
      <div style={containerStyle} className={`relative rounded-xl overflow-hidden bg-black shadow-md ${className}`}>
        <video
          src={ad.video_url}
          poster={ad.video_poster || ad.image}
          autoPlay={ad.autoplay !== false}
          muted={ad.muted !== false}
          loop={ad.loop !== false}
          playsInline
          controls
          className="w-full h-full object-cover"
        />
        {ad.destination_url && ad.destination_url !== '#' && (
          <div className="absolute bottom-3 right-3 z-10">
            <a
              href={ad.destination_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-xs font-semibold rounded-lg shadow-lg backdrop-blur-sm transition-transform transform hover:scale-105"
            >
              {ad.cta_text || 'Learn More'} ↗
            </a>
          </div>
        )}
      </div>
    );
  }

  // 2. GOOGLE ADSENSE AD
  if (adType === 'adsense') {
    return (
      <div style={containerStyle} className={`overflow-hidden text-center my-2 ${className}`}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block', textAlign: 'center' }}
          data-ad-client={ad.adsense_client || process.env.NEXT_PUBLIC_ADSENSE_CLIENT || 'ca-pub-XXXXXXXXXXXXXXXX'}
          data-ad-slot={ad.adsense_slot || '1234567890'}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  // 3. CUSTOM CODE / SCRIPT AD
  if (adType === 'custom_code' && ad.custom_html) {
    return (
      <div
        ref={containerRef}
        style={containerStyle}
        className={`overflow-hidden ${className}`}
        dangerouslySetInnerHTML={{ __html: ad.custom_html }}
      />
    );
  }

  // 4. SPONSOR CARD AD
  if (adType === 'sponsor_card') {
    return (
      <div
        style={containerStyle}
        className={`bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 border border-blue-200 dark:border-gray-700 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow ${className}`}
      >
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {ad.image && (
            <img
              src={ad.image}
              alt={ad.image_alt || ad.advertiser_name}
              className="w-16 h-16 object-contain rounded-lg bg-white dark:bg-gray-800 p-1 border border-gray-200 dark:border-gray-700 shrink-0"
            />
          )}
          <div className="flex-1 text-center sm:text-left">
            <span className="inline-block px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300 rounded mb-1">
              Sponsored
            </span>
            <h4 className="text-base font-bold text-gray-900 dark:text-white">
              {ad.sponsor_headline || ad.title}
            </h4>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              {ad.sponsor_description || ad.notes || ad.advertiser_name}
            </p>
          </div>
          {ad.destination_url && (
            <a
              href={ad.destination_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow transition shrink-0"
            >
              {ad.cta_text || 'Visit Website'} ↗
            </a>
          )}
        </div>
      </div>
    );
  }

  // 5. STANDARD IMAGE BANNER AD (Default)
  return (
    <div style={containerStyle} className={`overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-800 shadow-sm ${className}`}>
      <a
        href={ad.destination_url || '#'}
        target={ad.destination_url && ad.destination_url !== '#' ? '_blank' : undefined}
        rel={ad.destination_url && ad.destination_url !== '#' ? 'noopener noreferrer' : undefined}
        className="block w-full h-full"
      >
        <img
          src={ad.image || '/images/placeholder.svg'}
          alt={ad.image_alt || ad.title || 'Advertisement'}
          className="w-full h-full object-cover rounded-xl"
        />
      </a>
    </div>
  );
}
