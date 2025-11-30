/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
import type { ExportedHandler, R2Bucket } from '@cloudflare/workers-types';

export interface Env {
  EXERCISES_BUCKET: R2Bucket;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    try {
      const url = new URL(request.url);
      const muscle = url.searchParams.get("muscle"); // ?muscle=pecho
      if (!muscle) {
        return new Response("Missing muscle parameter", { status: 400 });
      }

      // Listar objetos en R2
      const list = await env.EXERCISES_BUCKET.list({
        prefix: `${muscle[0].toUpperCase() + muscle.slice(1)}/`
      });

      // Construir URLs públicas
      const urls = list.objects.map(obj => {
        const encodedKey = encodeURIComponent(obj.key);
        return `https://pub-7d51dc54c0094d719feb2425f890a22c.r2.dev/${encodedKey}`;
      });

      return new Response(JSON.stringify(urls), {
        headers: { "Content-Type": "application/json" }
      });
    } catch (err) {
      return new Response("Error listing videos: " + err, { status: 500 });
    }
  },
} satisfies ExportedHandler<Env>;
