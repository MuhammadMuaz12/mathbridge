create table public.mathbridge_members (
  email text primary key check (email = lower(email)),
  created_at timestamptz not null default now()
);
alter table public.mathbridge_members enable row level security;
revoke all on public.mathbridge_members from anon, authenticated;
grant select on public.mathbridge_members to authenticated;
create policy "Read own pilot invitation" on public.mathbridge_members for select to authenticated
  using (email = lower((select auth.jwt())->>'email'));
-- Add invited email addresses privately in the Supabase dashboard.

create table public.mathbridge_learning (
  user_id uuid primary key references auth.users(id) on delete cascade,
  payload jsonb not null check (jsonb_typeof(payload) = 'object'),
  revision integer not null default 0 check (revision >= 0),
  updated_at timestamptz not null default now()
);
alter table public.mathbridge_learning enable row level security;
revoke all on public.mathbridge_learning from anon, authenticated;
grant select, insert, update on public.mathbridge_learning to authenticated;
create policy "Read own learning" on public.mathbridge_learning for select to authenticated using (
  user_id = (select auth.uid()) and exists (select 1 from public.mathbridge_members where email = lower((select auth.jwt())->>'email'))
);
create policy "Create own learning" on public.mathbridge_learning for insert to authenticated with check (
  user_id = (select auth.uid()) and exists (select 1 from public.mathbridge_members where email = lower((select auth.jwt())->>'email'))
);
create policy "Update own learning" on public.mathbridge_learning for update to authenticated using (
  user_id = (select auth.uid()) and exists (select 1 from public.mathbridge_members where email = lower((select auth.jwt())->>'email'))
) with check (
  user_id = (select auth.uid()) and exists (select 1 from public.mathbridge_members where email = lower((select auth.jwt())->>'email'))
);
