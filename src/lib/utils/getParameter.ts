export function getParameter(
  args: string[],
  searchParam: string,
): string | null {
  const index = args.indexOf(searchParam);
  let parameter = null;

  if (index !== -1 && index < args.length - 1) {
    parameter = args[index + 1];
  }

  return parameter;
}
