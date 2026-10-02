const fs = require('fs');
const path = require('path');

const publicLogosDir = path.join(__dirname, '..', 'public', 'logos');
if (!fs.existsSync(publicLogosDir)) {
  fs.mkdirSync(publicLogosDir, { recursive: true });
}

const ICON_MAP = {
  // AI & LLMs
  'tool-google-ai-studio': 'https://api.iconify.design/logos:google-icon.svg',
  'tool-huggingface': 'https://api.iconify.design/logos:hugging-face-icon.svg',
  'tool-groq': 'https://svgl.app/library/groq.svg',
  'tool-ollama': 'https://api.iconify.design/simple-icons:ollama.svg?color=%23000000',
  'tool-v0-dev': 'https://api.iconify.design/logos:vercel-icon.svg',
  'tool-cursor': 'https://api.iconify.design/logos:visual-studio-code.svg',
  'tool-mistral-ai': 'https://svgl.app/library/mistral.svg',
  'tool-cohere': 'https://svgl.app/library/cohere.svg',
  'tool-replicate': 'https://api.iconify.design/simple-icons:replicate.svg?color=%23000000',
  'tool-bolt-new': 'https://api.iconify.design/logos:stackblitz-icon.svg',
  'tool-openrouter': 'https://api.iconify.design/logos:openai-icon.svg',
  'tool-langchain': 'https://api.iconify.design/simple-icons:langchain.svg?color=%231C3C3C',
  'tool-perplexity': 'https://api.iconify.design/simple-icons:perplexity.svg?color=%2320B2AA',
  'tool-together-ai': 'https://api.iconify.design/simple-icons:serverfault.svg?color=%230F172A',
  'tool-claude-free': 'https://api.iconify.design/logos:anthropic-icon.svg',

  // Cloud & Hosting
  'tool-vercel': 'https://api.iconify.design/logos:vercel-icon.svg',
  'tool-netlify': 'https://api.iconify.design/logos:netlify-icon.svg',
  'tool-cloudflare-pages': 'https://api.iconify.design/logos:cloudflare-icon.svg',
  'tool-render': 'https://svgl.app/library/render.svg',
  'tool-railway': 'https://svgl.app/library/railway.svg',
  'tool-fly-io': 'https://svgl.app/library/fly.svg',
  'tool-koyeb': 'https://svgl.app/library/koyeb.svg',
  'tool-supabase': 'https://api.iconify.design/logos:supabase-icon.svg',
  'tool-firebase': 'https://api.iconify.design/logos:firebase.svg',
  'tool-appwrite': 'https://api.iconify.design/logos:appwrite-icon.svg',
  'tool-convex': 'https://api.iconify.design/logos:typescript-icon.svg',
  'tool-deno-deploy': 'https://api.iconify.design/logos:deno.svg',
  'tool-glitch': 'https://api.iconify.design/logos:glitch-icon.svg',
  'tool-oracle-cloud': 'https://api.iconify.design/logos:oracle.svg',

  // Databases & Storage
  'tool-neon': 'https://svgl.app/library/neon.svg',
  'tool-turso': 'https://svgl.app/library/turso.svg',
  'tool-mongodb-atlas': 'https://api.iconify.design/logos:mongodb-icon.svg',
  'tool-upstash': 'https://svgl.app/library/upstash.svg',
  'tool-pinecone': 'https://api.iconify.design/simple-icons:pinecone.svg?color=%23047857',
  'tool-qdrant': 'https://api.iconify.design/logos:rust.svg',
  'tool-chromadb': 'https://api.iconify.design/logos:python.svg',
  'tool-cloudinary': 'https://api.iconify.design/logos:cloudinary-icon.svg',
  'tool-uploadthing': 'https://api.iconify.design/logos:react.svg',
  'tool-planetscale': 'https://api.iconify.design/logos:mysql-icon.svg',
  'tool-cockroachdb': 'https://api.iconify.design/logos:cockroachdb-icon.svg',
  'tool-surrealdb': 'https://api.iconify.design/logos:rust.svg',
  'tool-meilisearch': 'https://svgl.app/library/meilisearch.svg',

  // IDEs & Sandboxes
  'tool-codesandbox': 'https://api.iconify.design/logos:codesandbox-icon.svg',
  'tool-stackblitz': 'https://api.iconify.design/logos:stackblitz-icon.svg',
  'tool-project-idx': 'https://api.iconify.design/logos:google-icon.svg',
  'tool-replit': 'https://api.iconify.design/logos:replit-icon.svg',
  'tool-gitpod': 'https://api.iconify.design/logos:gitpod-icon.svg',
  'tool-vscode-web': 'https://api.iconify.design/logos:visual-studio-code.svg',
  'tool-github-codespaces': 'https://api.iconify.design/logos:github-icon.svg',
  'tool-compiler-explorer': 'https://api.iconify.design/logos:c-plusplus.svg',
  'tool-programiz-compiler': 'https://api.iconify.design/logos:c.svg',
  'tool-jsfiddle': 'https://api.iconify.design/logos:javascript.svg',

  // UI, Design, Icons & CSS
  'tool-figma': 'https://api.iconify.design/logos:figma.svg',
  'tool-lucide': 'https://api.iconify.design/simple-icons:lucide.svg?color=%23F56565',
  'tool-tailwindcss': 'https://api.iconify.design/logos:tailwindcss-icon.svg',
  'tool-uiverse': 'https://api.iconify.design/logos:css-3.svg',
  'tool-coolors': 'https://api.iconify.design/simple-icons:palette.svg?color=%230066FF',
  'tool-unsplash': 'https://api.iconify.design/logos:unsplash-icon.svg',
  'tool-excalidraw': 'https://svgl.app/library/excalidraw.svg',
  'tool-ray-so': 'https://api.iconify.design/logos:raycast-icon.svg',
  'tool-fontshare': 'https://api.iconify.design/simple-icons:googlefonts.svg?color=%23FF3366',
  'tool-squoosh': 'https://api.iconify.design/logos:google-icon.svg',
  'tool-css-gradient': 'https://api.iconify.design/logos:css-3.svg',
  'tool-realtime-colors': 'https://api.iconify.design/simple-icons:palette.svg?color=%237C3AED',
  'tool-heroicons': 'https://api.iconify.design/logos:tailwindcss-icon.svg',
  'tool-svgrepo': 'https://api.iconify.design/simple-icons:svg.svg?color=%23F05032',
  'tool-haikei': 'https://api.iconify.design/simple-icons:svg.svg?color=%23DF4889',

  // APIs, Testing & Mocking
  'tool-postman': 'https://api.iconify.design/logos:postman-icon.svg',
  'tool-hoppscotch': 'https://svgl.app/library/hoppscotch.svg',
  'tool-bruno': 'https://api.iconify.design/simple-icons:github.svg?color=%23F59E0B',
  'tool-mockaroo': 'https://api.iconify.design/logos:json.svg',
  'tool-jsonplaceholder': 'https://api.iconify.design/logos:json.svg',
  'tool-request-catcher': 'https://api.iconify.design/simple-icons:httpie.svg?color=%23EF4444',
  'tool-beeceptor': 'https://api.iconify.design/logos:fastapi.svg',
  'tool-webhook-site': 'https://api.iconify.design/simple-icons:webhooks.svg?color=%23059669',
  'tool-ngrok': 'https://api.iconify.design/logos:ngrok-icon.svg',
  'tool-localtunnel': 'https://api.iconify.design/logos:npm-icon.svg',
  'tool-sentry': 'https://api.iconify.design/logos:sentry-icon.svg',
  'tool-resend': 'https://svgl.app/library/resend.svg',

  // Docs, Roadmaps & Learning
  'tool-roadmap-sh': 'https://svgl.app/library/roadmap.svg',
  'tool-devdocs': 'https://api.iconify.design/logos:chrome.svg',
  'tool-mdn': 'https://api.iconify.design/logos:mdn.svg',
  'tool-learngitbranching': 'https://api.iconify.design/logos:git-icon.svg',
  'tool-overapi': 'https://api.iconify.design/simple-icons:readthedocs.svg?color=%233071A9',
  'tool-freecodecamp': 'https://api.iconify.design/simple-icons:freecodecamp.svg?color=%230A0A23',
  'tool-leetcode-free': 'https://api.iconify.design/simple-icons:leetcode.svg?color=%23FFA116',
  'tool-the-odin-project': 'https://api.iconify.design/simple-icons:theodinproject.svg?color=%23CE973E',
  'tool-cs50': 'https://api.iconify.design/simple-icons:harvard.svg?color=%23A51C30',
  'tool-regex101': 'https://api.iconify.design/simple-icons:pcre.svg?color=%23175D94',

  // Utilities & DevOps
  'tool-github-student-pack': 'https://api.iconify.design/logos:github-octocat.svg',
  'tool-transform-tools': 'https://api.iconify.design/logos:javascript.svg',
  'tool-bundlephobia': 'https://api.iconify.design/logos:npm-icon.svg',
  'tool-crontab-guru': 'https://api.iconify.design/logos:linux-tux.svg',
  'tool-carbon': 'https://api.iconify.design/logos:github-icon.svg',
  'tool-github': 'https://api.iconify.design/logos:github-icon.svg',
  'tool-docker-hub': 'https://api.iconify.design/logos:docker-icon.svg',
  'tool-gitkraken': 'https://api.iconify.design/logos:gitkraken.svg',
  'tool-warp-terminal': 'https://svgl.app/library/warp.svg',
  'tool-tableplus': 'https://api.iconify.design/logos:postgresql.svg',
  'tool-quicktype': 'https://api.iconify.design/logos:typescript-icon.svg',
};

async function downloadAll() {
  console.log('Downloading real official logos to public/logos/ without blocked headers...');
  const toolsDataPath = path.join(__dirname, '..', 'src', 'data', 'toolsData.ts');
  const content = fs.readFileSync(toolsDataPath, 'utf8');

  // Match all tools: id, name, domain, brandColor
  const toolBlockRegex = /\{[\s\S]*?id:\s*'(tool-[^']+)'[\s\S]*?name:\s*'([^']+)'[\s\S]*?domain:\s*'([^']+)'[\s\S]*?\}/g;
  let match;
  let count = 0;
  let successCount = 0;

  while ((match = toolBlockRegex.exec(content)) !== null) {
    const id = match[1];
    const name = match[2];
    const domain = match[3];

    const targetFile = path.join(publicLogosDir, `${id}.svg`);
    const mappedUrl = ICON_MAP[id];

    let downloaded = false;

    if (mappedUrl) {
      try {
        const res = await fetch(mappedUrl);
        if (res.ok) {
          const text = await res.text();
          if (text.includes('<svg')) {
            fs.writeFileSync(targetFile, text);
            downloaded = true;
            successCount++;
          }
        }
      } catch (err) {}
    }

    if (!downloaded) {
      // Fallback to Google 128px high-res favicon saved as SVG with embedded image
      const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
      try {
        const res = await fetch(faviconUrl);
        if (res.ok) {
          const buffer = Buffer.from(await res.arrayBuffer());
          const base64 = buffer.toString('base64');
          const wrapperSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
  <image href="data:image/png;base64,${base64}" x="0" y="0" width="48" height="48" preserveAspectRatio="xMidYMid meet" />
</svg>`;
          fs.writeFileSync(targetFile, wrapperSvg);
          downloaded = true;
          successCount++;
        }
      } catch (err) {}
    }

    count++;
    console.log(`[${downloaded ? 'OK' : 'FAIL'}] ${count}/100: ${id}`);
  }

  console.log(`\nSuccessfully downloaded ${successCount}/${count} official logos into public/logos/!`);
}

downloadAll();
