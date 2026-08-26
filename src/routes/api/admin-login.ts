import { createFileRoute } from "@tanstack/react-router";
import { supabaseRequest } from "../../lib/blog-server";

export const Route = createFileRoute("/api/admin-login")({ server: { handlers: {
  POST: async ({ request }) => {
    try {
      const { email, password } = await request.json() as { email?: string; password?: string };
      if (!email || !password) return Response.json({ ok: false, error: "Informe e-mail e senha." }, { status: 400 });
      const response = await supabaseRequest("/auth/v1/token?grant_type=password", { method: "POST", body: JSON.stringify({ email, password }) });
      const result = await response.json() as { access_token?: string };
      if (!response.ok || !result.access_token) return Response.json({ ok: false, error: "E-mail ou senha inválidos." }, { status: 401 });
      return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { "Content-Type": "application/json", "Set-Cookie": `csti_blog_session=${encodeURIComponent(result.access_token)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=3600` } });
    } catch (error) {
      console.error("Erro no login do blog:", error);
      return Response.json({ ok: false, error: "Login temporariamente indisponível." }, { status: 503 });
    }
  },
} } });
