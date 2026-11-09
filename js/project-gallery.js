// Keep the first screen for each source without dropping distinct project screens.
export function uniqueGallery(projects) {
  const seen = new Set();
  return projects
    .flatMap((project) => project.gallery || [])
    .filter((screen) => {
      const source = screen.original || screen.image;
      if (seen.has(source)) return false;
      seen.add(source);
      return true;
    });
}
