# Supabase setup for wedding photo gallery

Follow these steps once to connect the site to Supabase.

## 1. Create a Supabase project

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Create a new project (any region close to your guests is fine)
3. Wait for the database to finish provisioning

## 2. Create the storage bucket

1. Open **Storage** in the left sidebar
2. Click **New bucket**
3. Settings:
   - **Name:** `wedding-media`
   - **Public bucket:** ON
4. Save

Guest uploads go to `guest-uploads/`. Photographer files should go to `photographer/`.

## 3. Run the database + policy SQL

1. Open **SQL Editor**
2. Click **New query**
3. Paste the contents of [`supabase/setup.sql`](./setup.sql)
4. Click **Run**

This creates the `photos` table and the row-level security policies the app expects.

## 4. Copy your API keys into the React app

1. In Supabase, open **Project Settings -> API**
2. Copy:
   - **Project URL**
   - **anon public** key (not the service role key)

3. In this repo, create `.env.local` for local development:

```bash
REACT_APP_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your_anon_key_here
```

4. Restart the dev server after creating or changing env vars:

```bash
npm start
```

### Deploying to GitHub Pages

Create React App reads env vars at **build time**, so create `.env.production` with the same two variables before deploying:

```bash
npm run deploy
```

Do not commit `.env.local` or `.env.production` — they are gitignored.

Optional: store the values as GitHub Actions secrets and inject them during CI if you automate deploys later.

## 5. Test a guest upload

1. Open the site locally with your env vars set
2. Enter a guest code
3. Upload a small photo with your name
4. In Supabase **Table Editor -> photos**, you should see a new row with `approved = false`

## 6. Approve guest uploads (your moderation workflow)

1. Open **Table Editor -> photos**
2. Filter or sort by `created_at`
3. Preview the file:
   - Open **Storage -> wedding-media -> guest-uploads**
   - Click the uploaded file
4. If it looks good, edit the row and set **approved** to `true`
5. Refresh the site — it will appear under **Guest memories**

Reject an upload by leaving `approved = false`. You can delete the storage file and table row from the dashboard if needed.

## 7. Add professional photographer photos

For each photographer file:

1. Upload the file in **Storage -> wedding-media** to the `photographer/` folder
2. In **Table Editor -> photos**, insert a row:

| Column | Value |
|--------|-------|
| `storage_path` | `photographer/your-file-name.jpg` |
| `uploader_name` | Photographer name (e.g. `Studio Name`) |
| `guest_code` | leave empty |
| `source` | `photographer` |
| `media_type` | `photo` or `video` |
| `approved` | `true` |

Tip: you can copy the storage path from the file details panel after upload.

Approved photographer items appear under **Professional photos** in the gallery.

## Troubleshooting

### Upload fails immediately
- Confirm the bucket is named exactly `wedding-media`
- Confirm the SQL policies ran successfully
- Check the browser console for the exact Supabase error

### Gallery is empty but rows exist
- Only rows with `approved = true` are shown
- Confirm `storage_path` matches the file path in Storage exactly

### "Photo uploads are not configured yet"
- Env vars are missing from the build
- Restart `npm start` after adding `.env.local`

### Video will not play
- Prefer MP4 or MOV
- Very large files may take longer to upload; the app limit is 50 MB per file

## Security notes

- The **anon key** is safe to embed in the frontend; access is limited by RLS policies
- Never put the **service role key** in the React app
- Unapproved guest files are still reachable by direct URL if someone guesses the path. For a private wedding site this is usually acceptable; UUID-based filenames make guessing unlikely
