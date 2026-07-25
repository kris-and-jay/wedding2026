import React, { useRef, useState } from "react";
import {
  ACCEPTED_MEDIA_TYPES,
  MAX_UPLOAD_BYTES,
  getMediaType,
  isSupabaseConfigured,
  supabase,
  WEDDING_MEDIA_BUCKET,
} from "../services/supabaseClient";

const translations = {
  en: {
    title: "Share your photos & videos",
    description:
      "Upload your favourite moments from our wedding. We'll review each upload before it appears in the gallery below.",
    nameLabel: "Your name",
    namePlaceholder: "e.g. Anna Smith",
    dropzone: "Drag and drop files here, or click to browse",
    fileHint: "Photos (JPG, PNG, WebP) and videos (MP4, MOV, WebM). Max 50 MB each.",
    selectedFiles: "Selected files",
    uploadButton: "Upload",
    uploading: "Uploading...",
    success:
      "Thank you! Your upload was received and will appear in the gallery once we approve it.",
    configMissing:
      "Photo uploads are not configured yet. Please check back soon.",
    errors: {
      nameRequired: "Please enter your name before uploading.",
      noFiles: "Please select at least one photo or video.",
      fileTooLarge: "Each file must be 50 MB or smaller.",
      invalidType: "Only photos and videos are allowed.",
      uploadFailed: "Something went wrong while uploading. Please try again.",
    },
  },
  pl: {
    title: "Podzielcie się zdjęciami i filmami",
    description:
      "Prześlijcie swoje ulubione momenty z naszego ślubu. Każde zgłoszenie sprawdzimy, zanim pojawi się w galerii poniżej.",
    nameLabel: "Wasze imię i nazwisko",
    namePlaceholder: "np. Anna Kowalska",
    dropzone: "Przeciągnij pliki tutaj lub kliknij, aby je wybrać",
    fileHint:
      "Zdjęcia (JPG, PNG, WebP) i filmy (MP4, MOV, WebM). Maks. 50 MB na plik.",
    selectedFiles: "Wybrane pliki",
    uploadButton: "Prześlij",
    uploading: "Przesyłanie...",
    success:
      "Dziękujemy! Wasze pliki zostały wysłane i pojawią się w galerii po naszej akceptacji.",
    configMissing:
      "Przesyłanie zdjęć nie jest jeszcze skonfigurowane. Sprawdźcie ponownie wkrótce.",
    errors: {
      nameRequired: "Prosimy podać imię i nazwisko przed przesłaniem plików.",
      noFiles: "Prosimy wybrać co najmniej jedno zdjęcie lub film.",
      fileTooLarge: "Każdy plik może mieć maksymalnie 50 MB.",
      invalidType: "Dozwolone są tylko zdjęcia i filmy.",
      uploadFailed:
        "Coś poszło nie tak podczas przesyłania. Spróbujcie ponownie.",
    },
  },
  hu: {
    title: "Osszátok meg a fotóitokat és videóitokat",
    description:
      "Töltsétek fel a kedvenc pillanataitokat az esküvőnkről. Minden feltöltést jóváhagyunk, mielőtt megjelenne az alábbi galériában.",
    nameLabel: "A nevetek",
    namePlaceholder: "pl. Nagy Anna",
    dropzone: "Húzzátok ide a fájlokat, vagy kattintsatok a tallózáshoz",
    fileHint:
      "Fotók (JPG, PNG, WebP) és videók (MP4, MOV, WebM). Maximum 50 MB fájlonként.",
    selectedFiles: "Kiválasztott fájlok",
    uploadButton: "Feltöltés",
    uploading: "Feltöltés folyamatban...",
    success:
      "Köszönjük! A feltöltés megérkezett, és jóváhagyás után megjelenik a galériában.",
    configMissing:
      "A fotófeltöltés még nincs beállítva. Kérjük, nézzetek vissza később.",
    errors: {
      nameRequired: "Kérjük, adjátok meg a neveteket a feltöltés előtt.",
      noFiles: "Kérjük, válasszatok ki legalább egy fotót vagy videót.",
      fileTooLarge: "Minden fájl legfeljebb 50 MB lehet.",
      invalidType: "Csak fotók és videók engedélyezettek.",
      uploadFailed:
        "Hiba történt a feltöltés során. Kérjük, próbáljátok újra.",
    },
  },
};

const sanitizeFilename = (filename) =>
  filename.replace(/[^a-zA-Z0-9._-]/g, "_").replace(/_+/g, "_");

const formatFileSize = (bytes) => {
  if (bytes < 1024 * 1024) {
    return `${Math.round(bytes / 1024)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const PhotoUpload = ({ language, guestCode }) => {
  const t = translations[language] || translations.en;
  const fileInputRef = useRef(null);
  const [uploaderName, setUploaderName] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const validateFiles = (files) => {
    for (const file of files) {
      if (file.size > MAX_UPLOAD_BYTES) {
        return t.errors.fileTooLarge;
      }

      if (!ACCEPTED_MEDIA_TYPES.includes(file.type)) {
        return t.errors.invalidType;
      }
    }

    return "";
  };

  const addFiles = (fileList) => {
    const files = Array.from(fileList || []);
    if (files.length === 0) {
      return;
    }

    const validationError = validateFiles(files);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setSuccessMessage("");
    setSelectedFiles((current) => {
      const existingKeys = new Set(
        current.map((file) => `${file.name}-${file.size}-${file.lastModified}`)
      );

      const nextFiles = files.filter(
        (file) => !existingKeys.has(`${file.name}-${file.size}-${file.lastModified}`)
      );

      return [...current, ...nextFiles];
    });
  };

  const removeFile = (index) => {
    setSelectedFiles((current) => current.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (!isSupabaseConfigured || !supabase) {
      setError(t.configMissing);
      return;
    }

    const trimmedName = uploaderName.trim();
    if (!trimmedName) {
      setError(t.errors.nameRequired);
      return;
    }

    if (selectedFiles.length === 0) {
      setError(t.errors.noFiles);
      return;
    }

    setIsUploading(true);
    setError("");
    setSuccessMessage("");
    setUploadProgress(0);

    try {
      for (let index = 0; index < selectedFiles.length; index += 1) {
        const file = selectedFiles[index];
        const safeFilename = sanitizeFilename(file.name) || "upload";
        const storagePath = `guest-uploads/${Date.now()}-${crypto.randomUUID()}-${safeFilename}`;

        const { error: storageError } = await supabase.storage
          .from(WEDDING_MEDIA_BUCKET)
          .upload(storagePath, file, {
            cacheControl: "3600",
            upsert: false,
            contentType: file.type,
          });

        if (storageError) {
          throw storageError;
        }

        const { error: insertError } = await supabase.from("photos").insert({
          storage_path: storagePath,
          uploader_name: trimmedName,
          guest_code: guestCode || null,
          source: "guest",
          media_type: getMediaType(file.type),
          approved: false,
        });

        if (insertError) {
          await supabase.storage.from(WEDDING_MEDIA_BUCKET).remove([storagePath]);
          throw insertError;
        }

        setUploadProgress(Math.round(((index + 1) / selectedFiles.length) * 100));
      }

      setSelectedFiles([]);
      setUploaderName("");
      setSuccessMessage(t.success);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (uploadError) {
      console.error("Upload failed:", uploadError);
      setError(t.errors.uploadFailed);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  if (!isSupabaseConfigured) {
    return (
      <div className="photo-upload">
        <p className="photo-message photo-message--info">{t.configMissing}</p>
      </div>
    );
  }

  return (
    <div className="photo-upload">
      <p className="photo-upload-description">{t.description}</p>

      <label className="photo-upload-label" htmlFor="uploader-name">
        {t.nameLabel}
      </label>
      <input
        id="uploader-name"
        type="text"
        className="photo-upload-input"
        value={uploaderName}
        onChange={(event) => setUploaderName(event.target.value)}
        placeholder={t.namePlaceholder}
        maxLength={120}
        disabled={isUploading}
      />

      <div
        className={`photo-dropzone ${isDragging ? "photo-dropzone--active" : ""}`}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={(event) => {
          event.preventDefault();
          setIsDragging(false);
        }}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          addFiles(event.dataTransfer.files);
        }}
        onClick={() => fileInputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            fileInputRef.current?.click();
          }
        }}
      >
        <p>{t.dropzone}</p>
        <p className="photo-dropzone-hint">{t.fileHint}</p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        className="photo-upload-file-input"
        accept={ACCEPTED_MEDIA_TYPES.join(",")}
        multiple
        onChange={(event) => addFiles(event.target.files)}
        disabled={isUploading}
      />

      {selectedFiles.length > 0 && (
        <div className="photo-selected-files">
          <h3>{t.selectedFiles}</h3>
          <ul>
            {selectedFiles.map((file, index) => (
              <li key={`${file.name}-${file.size}-${file.lastModified}`}>
                <span>
                  {file.name} ({formatFileSize(file.size)})
                </span>
                <button
                  type="button"
                  className="photo-remove-file"
                  onClick={() => removeFile(index)}
                  disabled={isUploading}
                  aria-label={`Remove ${file.name}`}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isUploading && (
        <div className="photo-upload-progress">
          <div
            className="photo-upload-progress-bar"
            style={{ width: `${uploadProgress}%` }}
          />
        </div>
      )}

      <button
        type="button"
        className="photo-upload-button"
        onClick={handleUpload}
        disabled={isUploading || selectedFiles.length === 0}
      >
        {isUploading ? t.uploading : t.uploadButton}
      </button>

      {error && <p className="photo-message photo-message--error">{error}</p>}
      {successMessage && (
        <p className="photo-message photo-message--success">{successMessage}</p>
      )}
    </div>
  );
};

export default PhotoUpload;
