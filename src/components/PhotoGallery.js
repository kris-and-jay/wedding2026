import React, { useCallback, useEffect, useState } from "react";
import {
  getPublicMediaUrl,
  isSupabaseConfigured,
  supabase,
} from "../services/supabaseClient";

const translations = {
  en: {
    title: "Gallery",
    description:
      "Browse our professional photos and the memories shared by our guests.",
    tabs: {
      photographer: "Professional photos",
      guest: "Guest memories",
    },
    emptyPhotographer: "Professional photos will appear here soon.",
    emptyGuest: "Approved guest uploads will appear here.",
    loading: "Loading gallery...",
    configMissing: "The gallery is not configured yet. Please check back soon.",
    loadError: "We couldn't load the gallery. Please try again later.",
    by: "by",
    close: "Close",
  },
  pl: {
    title: "Galeria",
    description:
      "Przeglądajcie nasze profesjonalne zdjęcia oraz wspomnienia od gości.",
    tabs: {
      photographer: "Zdjęcia profesjonalne",
      guest: "Wspomnienia gości",
    },
    emptyPhotographer: "Profesjonalne zdjęcia pojawią się tutaj wkrótce.",
    emptyGuest: "Zaakceptowane zdjęcia gości pojawią się tutaj.",
    loading: "Ładowanie galerii...",
    configMissing: "Galeria nie jest jeszcze skonfigurowana. Sprawdźcie wkrótce.",
    loadError: "Nie udało się załadować galerii. Spróbujcie ponownie później.",
    by: "autor:",
    close: "Zamknij",
  },
  hu: {
    title: "Galéria",
    description:
      "Böngésszetek a profi fotók és a vendégeink által megosztott emlékek között.",
    tabs: {
      photographer: "Profi fotók",
      guest: "Vendég emlékek",
    },
    emptyPhotographer: "A profi fotók hamarosan megjelennek itt.",
    emptyGuest: "A jóváhagyott vendégfeltöltések itt fognak megjelenni.",
    loading: "Galéria betöltése...",
    configMissing:
      "A galéria még nincs beállítva. Kérjük, nézzetek vissza később.",
    loadError:
      "Nem sikerült betölteni a galériát. Kérjük, próbáljátok újra később.",
    by: "feltöltötte:",
    close: "Bezárás",
  },
};

const PhotoGallery = ({ language }) => {
  const t = translations[language] || translations.en;
  const [activeTab, setActiveTab] = useState("photographer");
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [lightboxItem, setLightboxItem] = useState(null);

  const loadPhotos = useCallback(async () => {
    if (!isSupabaseConfigured || !supabase) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError("");

    const { data, error: fetchError } = await supabase
      .from("photos")
      .select("*")
      .eq("approved", true)
      .order("created_at", { ascending: false });

    if (fetchError) {
      console.error("Gallery load failed:", fetchError);
      setError(t.loadError);
      setPhotos([]);
    } else {
      setPhotos(
        (data || []).map((photo) => ({
          ...photo,
          publicUrl: getPublicMediaUrl(photo.storage_path),
        }))
      );
    }

    setIsLoading(false);
  }, [t.loadError]);

  useEffect(() => {
    loadPhotos();
  }, [loadPhotos]);

  useEffect(() => {
    if (!lightboxItem) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setLightboxItem(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxItem]);

  const filteredPhotos = photos.filter((photo) => photo.source === activeTab);

  if (!isSupabaseConfigured) {
    return (
      <div className="photo-gallery">
        <p className="photo-message photo-message--info">{t.configMissing}</p>
      </div>
    );
  }

  return (
    <div className="photo-gallery">
      <p className="photo-gallery-description">{t.description}</p>

      <div className="photo-gallery-tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "photographer"}
          className={`photo-gallery-tab ${
            activeTab === "photographer" ? "photo-gallery-tab--active" : ""
          }`}
          onClick={() => setActiveTab("photographer")}
        >
          {t.tabs.photographer}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "guest"}
          className={`photo-gallery-tab ${
            activeTab === "guest" ? "photo-gallery-tab--active" : ""
          }`}
          onClick={() => setActiveTab("guest")}
        >
          {t.tabs.guest}
        </button>
      </div>

      {isLoading && <p className="photo-gallery-status">{t.loading}</p>}
      {error && <p className="photo-message photo-message--error">{error}</p>}

      {!isLoading && !error && filteredPhotos.length === 0 && (
        <p className="photo-gallery-status">
          {activeTab === "photographer"
            ? t.emptyPhotographer
            : t.emptyGuest}
        </p>
      )}

      {!isLoading && !error && filteredPhotos.length > 0 && (
        <div className="photo-gallery-grid">
          {filteredPhotos.map((photo) => (
            <button
              key={photo.id}
              type="button"
              className="photo-gallery-item"
              onClick={() => setLightboxItem(photo)}
            >
              {photo.media_type === "video" ? (
                <video
                  src={photo.publicUrl}
                  muted
                  playsInline
                  preload="metadata"
                />
              ) : (
                <img src={photo.publicUrl} alt={photo.uploader_name} loading="lazy" />
              )}
              <span className="photo-gallery-item-meta">
                {photo.source === "guest" && (
                  <>
                    {t.by} {photo.uploader_name}
                  </>
                )}
                {photo.media_type === "video" && (
                  <span className="photo-gallery-video-badge">Video</span>
                )}
              </span>
            </button>
          ))}
        </div>
      )}

      {lightboxItem && (
        <div
          className="photo-lightbox"
          onClick={() => setLightboxItem(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            className="photo-lightbox-close"
            onClick={() => setLightboxItem(null)}
            aria-label={t.close}
          >
            ×
          </button>
          <div
            className="photo-lightbox-content"
            onClick={(event) => event.stopPropagation()}
          >
            {lightboxItem.media_type === "video" ? (
              <video src={lightboxItem.publicUrl} controls autoPlay playsInline />
            ) : (
              <img src={lightboxItem.publicUrl} alt={lightboxItem.uploader_name} />
            )}
            {lightboxItem.source === "guest" && (
              <p className="photo-lightbox-caption">
                {t.by} {lightboxItem.uploader_name}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
