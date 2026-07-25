import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const WEDDING_MEDIA_BUCKET = "wedding-media";

export const MAX_UPLOAD_BYTES = 50 * 1024 * 1024;

export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
];

export const ACCEPTED_VIDEO_TYPES = [
  "video/mp4",
  "video/quicktime",
  "video/webm",
];

export const ACCEPTED_MEDIA_TYPES = [
  ...ACCEPTED_IMAGE_TYPES,
  ...ACCEPTED_VIDEO_TYPES,
];

export const getMediaType = (mimeType) =>
  mimeType.startsWith("video/") ? "video" : "photo";

export const getPublicMediaUrl = (storagePath) => {
  if (!supabase) {
    return "";
  }

  const { data } = supabase.storage
    .from(WEDDING_MEDIA_BUCKET)
    .getPublicUrl(storagePath);

  return data.publicUrl;
};
