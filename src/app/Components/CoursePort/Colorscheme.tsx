
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
      /* "muted_foreground": "232, 97%, 85%", */
      /* "muted_foreground": "227, 35%, 80%", */
      "muted_foreground": "228, 24%, 72%",
      "red": "346, 77%, 63%",
      /* "orange": "18, 100%, 73%", */
      "orange": "22, 100%, 70%",
      "yellow": "41, 89%, 69%",
      "teal_green": "181, 50%, 43%",
      "green": "134, 75%, 72%",
      "blue": "218, 100%, 74%",
      "purple": "263, 100%, 79%",
      /* "primary": "var(--teal_green)", */
      /* "secondary": "var(--green)", */
      "primary": "var(--green)",
      "secondary": "var(--teal_green)",
    }
  },
  /* "gold-purple" : { */
  /*   label: "Gold Purple", */
  /*   colors: { */
  /*     "darkest_black": "0, 0%, 0%", */
  /*     "darker_black": "248, 25%, 6%", */
  /*     "black": "240, 21%, 7%", */
  /*     "black2": "248, 18%, 9%", */
  /*     "grey": "244, 10%, 31%", */
  /*     "base05": "226, 64%, 88%", */
  /*     "muted_foreground": "228, 24%, 72%", */
  /**/
  /*     "red": "263, 46%, 61%", */
  /*     "green": "43, 90%, 65%", */
  /*     "primary": "var(--yellow)", */
  /*     "secondary": "var(--catppuccin_lavender)", */
  /*   } */
  /* }, */
  "catppuccin-mocha" : {
    label: "Catppuccin (Mocha)",
    colors: {
      /* "darkest_black": "0, 0%, 0%", */
      /* "darkest_black": "240, 34%, 3%", */
      "darkest_black": "240, 23%, 9%",
      "darker_black": "240, 21%, 12%",
      /* "darker_black": "240, 23%, 9%", */
      /* "black": "240, 21%, 12%", */
      /* "black2": "240, 21%, 15%", */
      "black": "240, 21%, 15%",
      "black2": "237, 16%, 23%",
      /* "grey": "220, 2%, 26%", */
      /* "grey": "230, 13%, 55%", */
      /* "grey": "237, 16%, 23%", */
      "grey": "233, 12%, 39%",
      "base05": "226, 64%, 88%",
      "muted_foreground": "228, 24%, 72%",
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
      "primary": "var(--green)",
      "secondary": "var(--teal_green)",
    }
  },
  "catppuccin-latte" : {
    label: "Catppuccin (Latte)",
    colors: {
      "darkest_black": "220, 16%, 86%",
      "darker_black": "220, 21%, 89%",
      "black": "220, 23%, 95%",
      "black2": "223, 16%, 83%",
      "grey": "227, 12%, 71%",
      "base05": "234, 16%, 35%",
      "muted_foreground": "223, 10%, 47%",
      "red": "347, 76%, 59%",
      "orange": "22, 99%, 52%",
      "yellow": "35, 77%, 49%",
      "green": "109, 58%, 40%",
      "teal_green": "183, 74%, 35%",
      "blue" : "220, 91%, 54%",
      /* "purple": "232, 97%, 85%", */
      "purple": "266, 85%, 58%",
      /* "muted_foreground": "228, 24%, 72%", */
      "primary": "var(--green)",
      "secondary": "var(--teal_green)",
    }
  },
  "gruvbox-dark" : {
    label: "GruvBox (Dark)",
    colors: {
      "darkest_black": "0, 0%, 6%",
      "darker_black": "195, 7%, 12%",
      "black": "0, 0%, 16%",
      "black2": "20, 5%, 22%",
      "grey": "28, 11%, 44%",
      "base05": "49, 87%, 88%",
      "muted_foreground": "35, 17%, 59%",

      /* "red": "2, 75%, 46%", */
      /* "orange": "24, 88%, 45%", */
      /* "yellow": "40, 73%, 49%", */
      /* "green": "60, 71%, 35%", */
      /* "teal_green": "122, 21%, 51%", */
      /* "blue" : "183, 33%, 40%", */
      /* "purple": "333, 37%, 54%", */

      "red": "6, 96%, 59%",
      "orange": "27, 99%, 55%",
      "yellow": "43, 95%, 58%",
      "green": "61, 66%, 44%",
      "teal_green": "104, 35%, 62%",
      "blue" : "157, 36%, 58%", // sat is turned up
      "purple": "344, 47%, 68%",

      "primary": "var(--green)",
      "secondary": "var(--teal_green)",
    }
  },
  "gruvbox-light" : {
    label: "GruvBox (Light)",
    colors: {
      "darkest_black": "53, 84%, 95%",
      "darker_black": "53, 74%, 84%",
      "black": "48, 87%, 88%",
      "black2": "43, 59%, 81%",
      "grey": "35, 17%, 59%",
      "base05": "0, 0%, 16%",
      "muted_foreground": "28, 11%, 44%",

      "red": "358, 100%, 38%",
      "orange": "19, 97%, 35%",
      "yellow": "37, 80%, 39%",
      "green": "57, 79%, 27%",
      "teal_green": "143, 30%, 37%",
      "blue" : "190, 89%, 25%",
      "purple": "323, 39%, 40%",

      "primary": "var(--green)",
      "secondary": "var(--teal_green)",
    }
  },
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
