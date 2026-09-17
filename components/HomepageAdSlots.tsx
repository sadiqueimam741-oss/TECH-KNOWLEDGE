import { getActiveAdvertisements } from '@/lib/advertisements';
import { Advertisement } from '@/lib/types';
import AdRenderer from '@/components/AdRenderer';

export default function HomepageAdSlots() {
  const homepageAds = {
    top: getActiveAdvertisements('homepage_top'),
    middle: getActiveAdvertisements('homepage_middle'),
    bottom: getActiveAdvertisements('homepage_bottom'),
  };

  const renderAdSlot = (ads: Advertisement[]) => {
    if (!ads.length) {
      return (
        <div className="bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-700 h-32 rounded-xl flex flex-col items-center justify-center p-4">
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Sponsored Ad Space</p>
          <a href="/advertise" className="text-xs text-primary-600 hover:underline mt-1">Advertise with TechKnowledge ↗</a>
        </div>
      );
    }

    return <AdRenderer ad={ads[0]} />;
  };

  return (
    <>
      <section className="py-6 bg-gray-50 dark:bg-gray-900/50">
        <div className="container-custom">
          <div className="text-center mb-2">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-gray-400 dark:text-gray-500">Advertisement</span>
          </div>
          {renderAdSlot(homepageAds.top)}
        </div>
      </section>

      <section className="py-6 bg-gray-50 dark:bg-gray-900/50">
        <div className="container-custom">
          <div className="text-center mb-2">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-gray-400 dark:text-gray-500">Advertisement</span>
          </div>
          {renderAdSlot(homepageAds.middle)}
        </div>
      </section>

      <section className="py-6 bg-gray-50 dark:bg-gray-900/50">
        <div className="container-custom">
          <div className="text-center mb-2">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-gray-400 dark:text-gray-500">Advertisement</span>
          </div>
          {renderAdSlot(homepageAds.bottom)}
        </div>
      </section>
    </>
  );
}
