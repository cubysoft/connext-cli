//bin/cleanup.js

export const cleanup = [];

export async function cleanupResources() {
  for (const c of cleanup.reverse()) {
    await c();
  }
}
