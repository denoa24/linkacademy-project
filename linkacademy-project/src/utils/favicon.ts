export const setFavicon = (icon: string) => {
  const link = document.querySelector("link[rel='icon']") as HTMLLinkElement;

  if (link) {
    link.href = icon;
  }
};