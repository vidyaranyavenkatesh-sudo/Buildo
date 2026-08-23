import { redirect, notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import BuilderClient from './BuilderClient';

export default async function BuilderPage({ params }) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: project, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !project) {
    notFound();
  }

  return <BuilderClient project={project} />;
}
