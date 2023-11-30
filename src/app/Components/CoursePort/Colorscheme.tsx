
interface Theme {
  label: string;
  colors: { [key: string]: string };
}

export const ThemeMap : { [key: string]: Theme } = {
  "galana" : {
    label: "galana",
    colors: {
      "darkest_black": "0, 0%, 0%",
      /* "darker_black": "248, 25%, 6%", */
      "darker_black": "240, 19%, 5%",
      "black": "240, 21%, 7%",
      "black2": "248, 18%, 9%",
      /* "grey": "244, 10%, 31%", */
      "grey": "233, 12%, 39%",
      "base05": "226, 64%, 88%",
      /* "muted_foreground": "228, 24%, 72%", */
      "muted_foreground": "232, 97%, 85%",
      "red": "346, 80%, 66%",
      "orange": "18, 100%, 73%",
      "green": "134, 75%, 72%",
      "primary": "var(--teal_green)",
      "secondary": "var(--red)",
    }
  },
  "gold-purple" : {
    label: "Gold Purple",
    colors: {
      "darkest_black": "0, 0%, 0%",
      "darker_black": "248, 25%, 6%",
      "black": "240, 21%, 7%",
      "black2": "248, 18%, 9%",
      "grey": "244, 10%, 31%",
      "base05": "226, 64%, 88%",
      "muted_foreground": "228, 24%, 72%",

      "red": "263, 46%, 61%",
      "green": "43, 90%, 65%",
      "primary": "var(--yellow)",
      "secondary": "var(--catppuccin_lavender)",
    }
  },
  "catppuccin" : {
    label: "Catppuccin",
    colors: {
      /* "darkest_black": "0, 0%, 0%", */
      "darkest_black": "240, 34%, 3%",
      "darker_black": "240, 23%, 9%",
      "black": "240, 21%, 12%",
      "black2": "240, 21%, 15%",
      /* "grey": "220, 2%, 26%", */
      /* "grey": "230, 13%, 55%", */
      /* "grey": "237, 16%, 23%", */
      "grey": "233, 12%, 39%",
      "base05": "226, 64%, 88%",
      /* "yellow": "42, 84%, 83%", */
      /* "purple": "267, 84%, 81%", */
      /* "purple": "232, 97%, 85%", */
      "red": "343, 81%, 75%",
      "orange": "23, 92%, 75%",
      "yellow": "41, 86%, 83%",
      "green": "115, 54%, 76%",
      "teal_green": "170, 57%, 73%",
      "blue" : "217, 92%, 76%",
      /* "purple": "232, 97%, 85%", */
      "purple": "267, 84%, 81%",
      /* "muted_foreground": "228, 24%, 72%", */
      "muted_foreground": "232, 97%, 85%",
      "primary": "var(--green)",
      "secondary": "var(--catppuccin_lavender)",
    }
  },
  "my-eyes" : {
    label: "Ow!",
    colors: {
      "darkest_black": "0, 0%, 100%",
      "darker_black": "248, 25%, 86%",
      "black": "240, 21%, 87%",
      "black2": "248, 18%, 89%",
      "base05": "248, 18%, 0%",
    }
  }
}

export const changeTheme = (themeName: string) => {
  const theme = ThemeMap[themeName];
  if (theme) {
    Object.entries(theme.colors).forEach(([name, value]) => {
      document.documentElement.style.setProperty(`--${name}`, value);
    });
  } else {
    console.error(`Theme "${themeName}" not found.`);
  }
}
