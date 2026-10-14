create table public.responses (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  answers jsonb not null check (jsonb_typeof(answers) = 'object' and pg_column_size(answers) < 20000)
);

alter table public.responses enable row level security;

create policy "public can submit" on public.responses
  for insert to anon with check (true);

create policy "researcher can read" on public.responses
  for select to authenticated
  using ((auth.jwt() ->> 'email') = 'aryanspaceman@gmail.com’);

grant insert on public.responses to anon;
grant select on public.responses to authenticated;
