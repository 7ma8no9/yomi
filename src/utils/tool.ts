export const getSuffix = (name: string) => {
  const parts = name.split('.')

  return parts[parts.length - 1]
}
