export function tagExtractor(input: string): string[] {
  const tags = input.match(/#[^\s#]+/g);
  if (!tags) return [];
  return tags.map((tag) => tag.slice(1));
}
