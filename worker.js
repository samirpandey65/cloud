export default {
  async fetch(request, env) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': 'https://cloudzentra.in',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Token',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);
    const path = url.pathname;

    // ── Save lead (POST /save-lead) ──────────────────────────────────────────
    if (request.method === 'POST' && path === '/save-lead') {
      try {
        const lead = await request.json();
        const leads = JSON.parse(await env.cloudzentra_leads.get('leads') || '[]');
        leads.unshift(lead);
        await env.cloudzentra_leads.put('leads', JSON.stringify(leads));
        return new Response(JSON.stringify({ ok: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      } catch (e) {
        return new Response(JSON.stringify({ ok: false, error: e.message }), {
          status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    // ── Get leads (GET /get-leads) ───────────────────────────────────────────
    if (request.method === 'GET' && path === '/get-leads') {
      const token = request.headers.get('X-Admin-Token');
      const storedToken = await env.cloudzentra_leads.get('admin_token');
      if (!storedToken || token !== storedToken) {
        return new Response(JSON.stringify({ ok: false, error: 'Unauthorized' }), {
          status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
      const leads = JSON.parse(await env.cloudzentra_leads.get('leads') || '[]');
      return new Response(JSON.stringify(leads), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // ── Update lead read status (POST /update-lead) ──────────────────────────
    if (request.method === 'POST' && path === '/update-lead') {
      const token = request.headers.get('X-Admin-Token');
      const storedToken = await env.cloudzentra_leads.get('admin_token');
      if (!storedToken || token !== storedToken) {
        return new Response(JSON.stringify({ ok: false, error: 'Unauthorized' }), {
          status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
      const { id, read } = await request.json();
      const leads = JSON.parse(await env.cloudzentra_leads.get('leads') || '[]');
      const lead = leads.find(l => l.id === id);
      if (lead) { lead.read = read; await env.cloudzentra_leads.put('leads', JSON.stringify(leads)); }
      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // ── Delete lead (POST /delete-lead) ──────────────────────────────────────
    if (request.method === 'POST' && path === '/delete-lead') {
      const token = request.headers.get('X-Admin-Token');
      const storedToken = await env.cloudzentra_leads.get('admin_token');
      if (!storedToken || token !== storedToken) {
        return new Response(JSON.stringify({ ok: false, error: 'Unauthorized' }), {
          status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
      const { id } = await request.json();
      const leads = JSON.parse(await env.cloudzentra_leads.get('leads') || '[]').filter(l => l.id !== id);
      await env.cloudzentra_leads.put('leads', JSON.stringify(leads));
      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // ── Set admin token (POST /set-token) — run once to initialize ───────────
    if (request.method === 'POST' && path === '/set-token') {
      const { token } = await request.json();
      await env.cloudzentra_leads.put('admin_token', token);
      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    return new Response('Not found', { status: 404, headers: corsHeaders });
  }
};
