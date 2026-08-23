import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are a website generator. You output a SINGLE, complete, self-contained HTML document and nothing else.

Rules:
- Respond with ONLY raw HTML starting at <!DOCTYPE html> and ending at </html>. No markdown fences, no explanations, no comments outside the HTML.
- Put all CSS inside a single <style> tag in <head>. Put all JavaScript inside a single <script> tag before </body>.
- Do not reference any external files or images. Do not use external CSS/JS CDNs.
- Make the design clean, modern, and responsive using plain CSS (flexbox/grid). No external CSS frameworks.
- Keep CSS reasonably concise (reuse utility-style classes rather than writing a unique bespoke style block per element) so the full document fits comfortably within the response length.
- If you are given the current HTML of a page, apply the requested change and return the FULL updated HTML document, not a diff or a partial snippet.
- Use semantic HTML5 tags where appropriate.`;

export async function POST(request) {
  try {
    const { prompt, currentHtml, history } = await request.json();

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Missing prompt' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Server is missing GEMINI_API_KEY. Add it to your environment variables and redeploy.' },
        { status: 500 }
      );
    }

    // Google renames/retires model IDs periodically. If generation starts
    // failing, check https://ai.google.dev/gemini-api/docs/models and set
    // GEMINI_MODEL to whatever the current free-tier model is.
    const model = process.env.GEMINI_MODEL || 'gemini-3.6-flash';

    const previousTurns = (history || [])
      .map((h) => `Previous request: ${h.text}`)
      .join('\n');

    const userContent = currentHtml
      ? `Current HTML of the site:\n\`\`\`html\n${currentHtml}\n\`\`\`\n\n${
          previousTurns ? previousTurns + '\n\n' : ''
        }New request: ${prompt}\n\nReturn the FULL updated HTML document.`
      : `Request: ${prompt}\n\nReturn a complete HTML document for this website.`;

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

    const geminiRes = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: SYSTEM_PROMPT }],
        },
        contents: [
          {
            role: 'user',
            parts: [{ text: userContent }],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          // Gemini 3.6 Flash supports up to 65536 output tokens. A full
          // one-page site with inline CSS/JS can genuinely need more than
          // the 8192 this used to be capped at, which silently truncated
          // mid-file and produced a blank page with no visible error.
          maxOutputTokens: 32768,
        },
      }),
    });

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      return NextResponse.json(
        { error: `Gemini API error (${geminiRes.status}): ${errText}` },
        { status: 502 }
      );
    }

    const data = await geminiRes.json();
    const candidate = data?.candidates?.[0];
    const rawText = candidate?.content?.parts?.map((p) => p.text || '').join('') || '';

    if (!rawText) {
      return NextResponse.json({ error: 'Gemini returned an empty response.' }, { status: 502 });
    }

    // If Gemini hit the token limit mid-document, the HTML will be cut off
    // (no closing </html>, possibly no <body> at all) and would otherwise
    // silently render as a blank page. Catch that here with a clear error
    // instead of handing the client broken HTML.
    if (candidate?.finishReason === 'MAX_TOKENS') {
      return NextResponse.json(
        {
          error:
            'The generated site was too long and got cut off before it finished. Try a simpler prompt (fewer sections, less detail per section), or ask again — shorter follow-up edits are less likely to hit this.',
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ html: extractHtml(rawText) });
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Unexpected server error' }, { status: 500 });
  }
}

function extractHtml(text) {
  let cleaned = text.trim();

  const fenceMatch = cleaned.match(/```(?:html)?\s*([\s\S]*?)```/i);
  if (fenceMatch) {
    cleaned = fenceMatch[1].trim();
  }

  const docTypeIndex = cleaned.toLowerCase().indexOf('<!doctype html');
  if (docTypeIndex > 0) {
    cleaned = cleaned.slice(docTypeIndex);
  }

  return cleaned;
}
