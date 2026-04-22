export default {
  async fetch(request, env) {
    const cors = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Token',
    };

    if (request.method === 'OPTIONS') return new Response(null, { headers: cors });

    const path = new URL(request.url).pathname;
    const json = (data, status = 200) => new Response(JSON.stringify(data), { status, headers: { ...cors, 'Content-Type': 'application/json' } });

    const authCheck = async () => {
      const token = request.headers.get('X-Admin-Token');
      const stored = await env.cloudzentra_leads.get('admin_token');
      return stored && token === stored;
    };

    // Save lead — no auth needed (public form/chatbot)
    if (request.method === 'POST' && path === '/save-lead') {
      try {
        const lead = await request.json();
        const leads = JSON.parse(await env.cloudzentra_leads.get('leads') || '[]');
        leads.unshift(lead);
        await env.cloudzentra_leads.put('leads', JSON.stringify(leads));
        return json({ ok: true });
      } catch (e) {
        return json({ ok: false, error: e.message }, 400);
      }
    }

    // Get leads — admin only
    if (request.method === 'GET' && path === '/get-leads') {
      if (!await authCheck()) return json({ ok: false, error: 'Unauthorized' }, 401);
      const leads = JSON.parse(await env.cloudzentra_leads.get('leads') || '[]');
      return json(leads);
    }

    // Update lead — admin only
    if (request.method === 'POST' && path === '/update-lead') {
      if (!await authCheck()) return json({ ok: false, error: 'Unauthorized' }, 401);
      const { id, read } = await request.json();
      const leads = JSON.parse(await env.cloudzentra_leads.get('leads') || '[]');
      const lead = leads.find(l => l.id === id);
      if (lead) { lead.read = read; await env.cloudzentra_leads.put('leads', JSON.stringify(leads)); }
      return json({ ok: true });
    }

    // Delete lead — admin only
    if (request.method === 'POST' && path === '/delete-lead') {
      if (!await authCheck()) return json({ ok: false, error: 'Unauthorized' }, 401);
      const { id } = await request.json();
      const leads = JSON.parse(await env.cloudzentra_leads.get('leads') || '[]').filter(l => l.id !== id);
      await env.cloudzentra_leads.put('leads', JSON.stringify(leads));
      return json({ ok: true });
    }

    // Clear all leads — admin only
    if (request.method === 'POST' && path === '/clear-leads') {
      if (!await authCheck()) return json({ ok: false, error: 'Unauthorized' }, 401);
      await env.cloudzentra_leads.put('leads', '[]');
      return json({ ok: true });
    }

    // Set admin token — run once
    if (request.method === 'POST' && path === '/set-token') {
      const { token } = await request.json();
      await env.cloudzentra_leads.put('admin_token', token);
      return json({ ok: true });
    }

    return new Response('Not found', { status: 404, headers: cors });
  }
};
