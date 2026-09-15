import fs from 'fs';
import path from 'path';
import { Advertisement } from './types';

const DATA_FILE = path.join(process.cwd(), 'data', 'advertisements.json');

function readStoredAdvertisements(): Advertisement[] {
  try {
    const parsed = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    return Array.isArray(parsed) ? parsed.filter(Boolean) as Advertisement[] : [];
  } catch {
    return [];
  }
}

export function getAdvertisements(): Advertisement[] {
  return readStoredAdvertisements();
}

export function saveAdvertisements(ads: Advertisement[]) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(ads, null, 2), 'utf8');
  return ads;
}

export function createAdvertisementRecord(data: Partial<Advertisement>): Advertisement {
  const ads = getAdvertisements();
  const created: Advertisement = {
    id: data.id || crypto.randomUUID(),
    advertiser_name: data.advertiser_name || 'New Advertiser',
    title: data.title || 'Advertisement',
    image: data.image || '/images/placeholder.svg',
    image_alt: data.image_alt || 'Advertisement graphic',
    destination_url: data.destination_url || '#',
    placement: data.placement || 'homepage_top',
    start_date: data.start_date || new Date().toISOString().slice(0, 10),
    end_date: data.end_date || new Date(Date.now() + 86400000 * 30).toISOString().slice(0, 10),
    status: data.status || 'active',
    priority: data.priority || 1,
    notes: data.notes || '',
    width: data.width || 0,
    height: data.height || 192,
    max_width: data.max_width || 0,
    responsive: data.responsive !== false,
    alignment: data.alignment || 'center',
    spacing: data.spacing || 0,
    created_date: data.created_date || new Date().toISOString(),
    updated_date: new Date().toISOString(),
  };

  const next = [created, ...ads];
  saveAdvertisements(next);
  return created;
}

export function updateAdvertisementRecord(data: Partial<Advertisement>): Advertisement {
  const ads = getAdvertisements();
  const existing = ads.find(item => item.id === data.id);
  if (!existing) return createAdvertisementRecord(data);

  const updated: Advertisement = {
    ...existing,
    ...data,
    updated_date: new Date().toISOString(),
  };

  const next = ads.map(item => item.id === data.id ? updated : item);
  saveAdvertisements(next);
  return updated;
}

export function deleteAdvertisementRecord(id: string): void {
  saveAdvertisements(getAdvertisements().filter(ad => ad.id !== id));
}

export function getActiveAdvertisements(placement: string): Advertisement[] {
  const now = new Date();

  return getAdvertisements().filter(ad => {
    if (ad.placement !== placement) {
      return false;
    }

    const startDate = new Date(ad.start_date);
    const endDate = new Date(ad.end_date);
    const isWithinRange = now >= startDate && now <= endDate;

    if (ad.status === 'draft' || ad.status === 'paused' || ad.status === 'expired') {
      return false;
    }

    if (ad.status === 'scheduled') {
      return isWithinRange;
    }

    if ((ad.status === 'active' || !ad.status) && isWithinRange) {
      return true;
    }

    return false;
  }).sort((a, b) => b.priority - a.priority);
}

export function isAdvertisementExpired(ad: Advertisement): boolean {
  const now = new Date();
  const endDate = new Date(ad.end_date);
  return now > endDate;
}
