import fs from 'fs';
import path from 'path';
import { Advertisement } from './types';
import { executeSql, isCloudDatabaseConfigured } from './db';

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'advertisements.json');

let memoryAdvertisements: Advertisement[] = [];

function readStoredAdvertisements(): Advertisement[] {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const parsed = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
      if (Array.isArray(parsed)) {
        memoryAdvertisements = parsed.filter(Boolean) as Advertisement[];
        return memoryAdvertisements;
      }
    }
  } catch {
    // Return memory fallback
  }
  return memoryAdvertisements;
}

export function getAdvertisements(): Advertisement[] {
  return readStoredAdvertisements();
}

export function saveAdvertisements(ads: Advertisement[]) {
  memoryAdvertisements = ads;
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(ads, null, 2), 'utf8');
  } catch {
    // In-memory fallback for read-only serverless execution
  }
  return ads;
}

export function createAdvertisementRecord(data: Partial<Advertisement>): Advertisement {
  const ads = getAdvertisements();
  const created: Advertisement = {
    id: data.id || crypto.randomUUID(),
    advertiser_name: data.advertiser_name || 'New Advertiser',
    title: data.title || 'Advertisement',
    ad_type: data.ad_type || 'image',
    image: data.image || '/images/placeholder.svg',
    image_alt: data.image_alt || 'Advertisement graphic',
    destination_url: data.destination_url || '#',
    video_url: data.video_url || '',
    video_poster: data.video_poster || '',
    custom_html: data.custom_html || '',
    cta_text: data.cta_text || 'Learn More',
    sponsor_headline: data.sponsor_headline || '',
    sponsor_description: data.sponsor_description || '',
    adsense_client: data.adsense_client || '',
    adsense_slot: data.adsense_slot || '',
    autoplay: data.autoplay !== false,
    loop: data.loop !== false,
    muted: data.muted !== false,
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

  if (isCloudDatabaseConfigured()) {
    executeSql(`
      INSERT INTO advertisements (
        id, advertiser_name, title, ad_type, image, image_alt, destination_url,
        video_url, video_poster, custom_html, cta_text, sponsor_headline, sponsor_description,
        adsense_client, adsense_slot, autoplay, loop, muted, placement, start_date, end_date,
        status, priority, notes, width, height, max_width, responsive, alignment, spacing,
        created_date, updated_date
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        advertiser_name = excluded.advertiser_name,
        title = excluded.title,
        ad_type = excluded.ad_type,
        image = excluded.image,
        image_alt = excluded.image_alt,
        destination_url = excluded.destination_url,
        video_url = excluded.video_url,
        video_poster = excluded.video_poster,
        custom_html = excluded.custom_html,
        cta_text = excluded.cta_text,
        sponsor_headline = excluded.sponsor_headline,
        sponsor_description = excluded.sponsor_description,
        adsense_client = excluded.adsense_client,
        adsense_slot = excluded.adsense_slot,
        autoplay = excluded.autoplay,
        loop = excluded.loop,
        muted = excluded.muted,
        placement = excluded.placement,
        start_date = excluded.start_date,
        end_date = excluded.end_date,
        status = excluded.status,
        priority = excluded.priority,
        notes = excluded.notes,
        width = excluded.width,
        height = excluded.height,
        max_width = excluded.max_width,
        responsive = excluded.responsive,
        alignment = excluded.alignment,
        spacing = excluded.spacing,
        updated_date = excluded.updated_date;
    `, [
      created.id, created.advertiser_name, created.title, created.ad_type || 'image',
      created.image, created.image_alt, created.destination_url, created.video_url || '',
      created.video_poster || '', created.custom_html || '', created.cta_text || 'Learn More',
      created.sponsor_headline || '', created.sponsor_description || '', created.adsense_client || '',
      created.adsense_slot || '', created.autoplay !== false ? 1 : 0, created.loop !== false ? 1 : 0,
      created.muted !== false ? 1 : 0, created.placement, created.start_date, created.end_date,
      created.status, created.priority, created.notes || '', created.width || 0, created.height || 192,
      created.max_width || 0, created.responsive !== false ? 1 : 0, created.alignment || 'center',
      created.spacing || 0, created.created_date, created.updated_date
    ]).catch(err => console.error('Cloud DB ad sync error:', err));
  }

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

  if (isCloudDatabaseConfigured()) {
    executeSql(`
      INSERT INTO advertisements (
        id, advertiser_name, title, ad_type, image, image_alt, destination_url,
        video_url, video_poster, custom_html, cta_text, sponsor_headline, sponsor_description,
        adsense_client, adsense_slot, autoplay, loop, muted, placement, start_date, end_date,
        status, priority, notes, width, height, max_width, responsive, alignment, spacing,
        created_date, updated_date
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        advertiser_name = excluded.advertiser_name,
        title = excluded.title,
        ad_type = excluded.ad_type,
        image = excluded.image,
        image_alt = excluded.image_alt,
        destination_url = excluded.destination_url,
        video_url = excluded.video_url,
        video_poster = excluded.video_poster,
        custom_html = excluded.custom_html,
        cta_text = excluded.cta_text,
        sponsor_headline = excluded.sponsor_headline,
        sponsor_description = excluded.sponsor_description,
        adsense_client = excluded.adsense_client,
        adsense_slot = excluded.adsense_slot,
        autoplay = excluded.autoplay,
        loop = excluded.loop,
        muted = excluded.muted,
        placement = excluded.placement,
        start_date = excluded.start_date,
        end_date = excluded.end_date,
        status = excluded.status,
        priority = excluded.priority,
        notes = excluded.notes,
        width = excluded.width,
        height = excluded.height,
        max_width = excluded.max_width,
        responsive = excluded.responsive,
        alignment = excluded.alignment,
        spacing = excluded.spacing,
        updated_date = excluded.updated_date;
    `, [
      updated.id, updated.advertiser_name, updated.title, updated.ad_type || 'image',
      updated.image, updated.image_alt, updated.destination_url, updated.video_url || '',
      updated.video_poster || '', updated.custom_html || '', updated.cta_text || 'Learn More',
      updated.sponsor_headline || '', updated.sponsor_description || '', updated.adsense_client || '',
      updated.adsense_slot || '', updated.autoplay !== false ? 1 : 0, updated.loop !== false ? 1 : 0,
      updated.muted !== false ? 1 : 0, updated.placement, updated.start_date, updated.end_date,
      updated.status, updated.priority, updated.notes || '', updated.width || 0, updated.height || 192,
      updated.max_width || 0, updated.responsive !== false ? 1 : 0, updated.alignment || 'center',
      updated.spacing || 0, updated.created_date, updated.updated_date
    ]).catch(err => console.error('Cloud DB ad sync error:', err));
  }

  return updated;
}

export function deleteAdvertisementRecord(id: string): void {
  saveAdvertisements(getAdvertisements().filter(ad => ad.id !== id));

  if (isCloudDatabaseConfigured()) {
    executeSql('DELETE FROM advertisements WHERE id = ?;', [id]).catch(err =>
      console.error('Cloud DB ad delete error:', err)
    );
  }
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
