#!/bin/sh
input=$(cat)

model=$(echo "$input" | jq -r '.model.display_name // empty')
cwd=$(echo "$input" | jq -r '.workspace.current_dir // .cwd // empty')
total_in=$(echo "$input" | jq -r '.context_window.total_input_tokens // 0')
total_out=$(echo "$input" | jq -r '.context_window.total_output_tokens // 0')
ctx_pct=$(echo "$input" | jq -r '.context_window.used_percentage // empty')
five_pct=$(echo "$input" | jq -r '.rate_limits.five_hour.used_percentage // empty')
week_pct=$(echo "$input" | jq -r '.rate_limits.seven_day.used_percentage // empty')

# Normalize backslashes to forward slashes, then keep last 2 path components
short_cwd=$(echo "$cwd" | sed 's|\\|/|g' | awk -F'/' '{
  n=NF
  if (n>=2) print $(n-1)"/"$n
  else print $n
}')

# Total tokens
total=$(( total_in + total_out ))
if [ "$total" -ge 1000000 ]; then
  tok_str=$(awk "BEGIN {printf \"%.1fM\", $total/1000000}")
elif [ "$total" -ge 1000 ]; then
  tok_str=$(awk "BEGIN {printf \"%.0fK\", $total/1000}")
else
  tok_str="$total"
fi

out=""

[ -n "$model" ] && out="$model"

if [ -n "$short_cwd" ]; then
  [ -n "$out" ] && out="$out | "
  out="${out}$short_cwd"
fi

if [ "$total" -gt 0 ]; then
  [ -n "$out" ] && out="$out | "
  out="${out}Tok $tok_str"
fi

if [ -n "$ctx_pct" ]; then
  ctx_fmt=$(printf "%.0f" "$ctx_pct")
  [ -n "$out" ] && out="$out | "
  out="${out}Ctx ${ctx_fmt}%"
fi

if [ -n "$five_pct" ]; then
  five_fmt=$(printf "%.0f" "$five_pct")
  [ -n "$out" ] && out="$out | "
  out="${out}5h ${five_fmt}%"
fi

if [ -n "$week_pct" ]; then
  week_fmt=$(printf "%.0f" "$week_pct")
  [ -n "$out" ] && out="$out | "
  out="${out}7d ${week_fmt}%"
fi

echo "$out"
