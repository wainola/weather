-- +goose Up
-- SQL in this section is executed when the migration is applied.
create extension pgcrypto;
create extension citext;

create table weather_data(
  id uuid primary key default gen_random_uuid(),
  latitude text not null,
  longitude text not null,
  time_zone text not null,
  summary text not null,
  aparent_temperature text not null,
  temperature text not null,
  created_at timestamp default now()
);

-- +goose Down
-- SQL in this section is executed when the migration is rolled back.
drop table weather_data;