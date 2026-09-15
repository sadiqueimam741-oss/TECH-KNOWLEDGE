import { getActiveAdvertisements } from '@/lib/advertisements';
import { Advertisement } from '@/lib/types';

export default function HomepageAdSlots() {
  const homepageAds = {
    top: getActiveAdvertisements('homepage_top'),
    middle: getActiveAdvertisements('homepage_middle'),
    bottom: getActiveAdvertisements('homepage_bottom'),
  };

  const renderAdSlot = (ads: Advertisement[]) => {
    if (!ads.length) {
      return (
        <div className="bg-gray-300 dark:bg-gray-700 h-48 rounded-lg flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">Your Advertisement Here</p>
        </div>
      );
    }

    const ad = ads[0];
    const adStyle = {
      width: ad.responsive !== false || !ad.width ? '100%' : `${ad.width}px`,
      maxWidth: ad.max_width ? `${ad.max_width}px` : undefined,
      height: `${ad.height || 192}px`,
      marginLeft: ad.alignment === 'right' ? 'auto' : ad.alignment === 'center' ? 'auto' : undefined,
      marginRight: ad.alignment === 'left' ? 'auto' : ad.alignment === 'center' ? 'auto' : undefined,
      marginBottom: `${ad.spacing || 0}px`,
    };

    return (
      <a href={ad.destination_url} target="_blank" rel="noreferrer" style={adStyle} className="block bg-gray-300 dark:bg-gray-700 rounded-lg overflow-hidden">
        <img src={ad.image} alt={ad.image_alt || ad.title} className="w-full h-full object-cover" />
      </a>
    );
  };

  return (
    <>
      <section className="py-8 bg-gray-100 dark:bg-gray-800">
        <div className="container-custom text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Advertisement</p>
          {renderAdSlot(homepageAds.top)}
        </div>
      </section>

      <section className="py-8 bg-gray-100 dark:bg-gray-800">
        <div className="container-custom text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Advertisement</p>
          {renderAdSlot(homepageAds.middle)}
        </div>
      </section>

      <section className="py-8 bg-gray-100 dark:bg-gray-800">
        <div className="container-custom text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Advertisement</p>
          {renderAdSlot(homepageAds.bottom)}
        </div>
      </section>
    </>
  );
}
