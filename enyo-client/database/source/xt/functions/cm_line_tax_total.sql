create or replace function xt.cm_line_tax_total(cmitem_id integer) returns numeric stable as $$
  select 0.0;
  --select sum(taxhist_tax) as tax_total
  --from cmitemtax
  --where taxhist_parent_id=$1;
$$ language sql;
