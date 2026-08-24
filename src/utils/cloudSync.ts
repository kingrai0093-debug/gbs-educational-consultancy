/**
 * Global Real-time Cloud Synchronization Engine for GBS Educational Consultancy
 * Ensures all changes made by Admin in Bagbazar are instantly live for all visitors worldwide.
 */

export interface GlobalCmsPayload {
  version: string;
  lastUpdated: string;
  updatedBy?: string;
  pageContent: any;
  tickerItems: any[];
  posts: any[];
  videos: any[];
  gallery: any[];
  universities: any[];
  settings: any;
}

const GITHUB_REPO_OWNER = "kingrai0093-debug";
const GITHUB_REPO_NAME = "gbs-educational-consultancy";
const GITHUB_FILE_PATH = "public/cms_data.json";

export function getStoredSyncToken(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("gbs_github_sync_token") || "";
}

export function setStoredSyncToken(token: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("gbs_github_sync_token", token.trim());
  }
}

/**
 * Fetches the latest live CMS data from the global repository / live static asset
 */
export async function fetchGlobalCmsData(): Promise<GlobalCmsPayload | null> {
  const timestamp = Date.now();
  const urls = [
    `https://raw.githubusercontent.com/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/main/public/cms_data.json?t=${timestamp}`,
    `./cms_data.json?t=${timestamp}`,
    `https://${GITHUB_REPO_OWNER}.github.io/${GITHUB_REPO_NAME}/cms_data.json?t=${timestamp}`,
  ];

  for (const url of urls) {
    try {
      const res = await fetch(url, {
        headers: { "Cache-Control": "no-cache" },
      });
      if (res.ok) {
        const data = await res.json();
        if (data && (data.pageContent || data.posts || data.tickerItems)) {
          return data as GlobalCmsPayload;
        }
      }
    } catch {
      // Try fallback URL
    }
  }

  return null;
}

/**
 * Pushes updated CMS state directly to GitHub Repository so it goes live for all users worldwide.
 */
export async function pushGlobalCmsDataToGitHub(
  payload: GlobalCmsPayload,
  authToken?: string
): Promise<{ success: boolean; message: string; sha?: string }> {
  try {
    const token = (authToken || getStoredSyncToken()).trim();
    if (!token) {
      return {
        success: false,
        message: "Please enter your GitHub Sync Token in the Global Cloud Sync tab to publish changes live to the world.",
      };
    }

    const apiUrl = `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/${GITHUB_FILE_PATH}`;

    // 1. Get current file SHA if exists
    let existingSha: string | undefined = undefined;
    try {
      const getRes = await fetch(apiUrl, {
        headers: {
          Authorization: `token ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
      });
      if (getRes.ok) {
        const fileInfo = await getRes.json();
        existingSha = fileInfo.sha;
      }
    } catch (e) {
      console.warn("Could not retrieve existing SHA, attempting direct create:", e);
    }

    // 2. Encode payload in UTF-8 base64
    const jsonString = JSON.stringify(payload, null, 2);
    const base64Content = btoa(unescape(encodeURIComponent(jsonString)));

    // 3. Commit file via GitHub Contents API
    const commitBody: Record<string, any> = {
      message: `admin(cms): global live update by staff at ${new Date().toISOString()}`,
      content: base64Content,
      branch: "main",
    };

    if (existingSha) {
      commitBody.sha = existingSha;
    }

    const putRes = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commitBody),
    });

    if (putRes.ok) {
      const result = await putRes.json();
      return {
        success: true,
        message: "✅ Successfully published live to Global Cloud! All visitors worldwide will now see your changes in real-time.",
        sha: result?.content?.sha,
      };
    } else {
      const errJson = await putRes.json().catch(() => ({}));
      return {
        success: false,
        message: `GitHub API error (${putRes.status}): ${errJson.message || "Failed to commit changes to cloud."}`,
      };
    }
  } catch (err: any) {
    return {
      success: false,
      message: `Network or Sync Error: ${err?.message || "Unknown error during cloud push."}`,
    };
  }
}
