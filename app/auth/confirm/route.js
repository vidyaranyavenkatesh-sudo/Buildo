import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

// Supabase's "Confirm signup" email links here with a token_hash + type.
// See app/auth/confirm's counterpart: the email template must be edited in
// the Supabase dashboard (Authentication > Emails > Confirm signup) to point
// at this route instead of Supabase's default confirmation page. See
// README.md "Turning email confirmation on" for the exact template.
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type');
  const rawNext = searchParams.get('next');
  const next = rawNext && rawNext.startsWith('/') ? rawNext : '/dashboard';

  if (token_hash && type) {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({ type, token_hash });

    if (!error) {
      redirect(next);
    }
  }

  redirect('/auth/error');
}
