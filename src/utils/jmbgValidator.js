import { regions } from "./jmbgRegions";

export const validateJmbg = (jmbg) => {
  if (!/^\d{13}$/.test(jmbg)) {
    return {
      valid: false,
      message: "JMBG mora sadržati tačno 13 cifara.",
    };
  }

  const dan = Number(jmbg.slice(0, 2));
  const mesec = Number(jmbg.slice(2, 4));
  const ggg = Number(jmbg.slice(4, 7));
  const godina = ggg < 800 ? 2000 + ggg : 1000 + ggg;

  const datum = new Date(godina, mesec - 1, dan);
  const validanDatum =
    datum.getFullYear() === godina &&
    datum.getMonth() === mesec - 1 &&
    datum.getDate() === dan;

  if (!validanDatum) {
    return {
      valid: false,
      message: "JMBG sadrži neispravan datum.",
    };
  }

  if (datum > new Date()){
    return {
      valid: false,
      message: "Datum rođenja ne može biti u budućnosti."
    }
  }

  const cifre = jmbg.split("").map(Number);
  let kontrolna =
    11 -
    ((7 * (cifre[0] + cifre[6]) +
      6 * (cifre[1] + cifre[7]) +
      5 * (cifre[2] + cifre[8]) +
      4 * (cifre[3] + cifre[9]) +
      3 * (cifre[4] + cifre[10]) +
      2 * (cifre[5] + cifre[11])) %
      11);

  if (kontrolna > 9) {
    kontrolna = 0;
  }

  if (kontrolna !== cifre[12]) {
    return {
      valid: false,
      message: "JMBG ima neispravnu kontrolnu cifru.",
    };
  }

  const bbb = Number(jmbg.slice(9, 12));
  const pol = bbb < 500 ? "Muški" : "Ženski";

  const rr = jmbg.slice(7, 9);
  const regija = regions[rr] ?? "Nepoznata ili nedefinisana regija";

  return {
    valid: true,
    message: "JMBG je validan.",
    data: {
      datumRodjenja: `${String(dan).padStart(2, "0")}.${String(mesec).padStart(2, "0")}.${godina}.`,
      pol: pol,
      regija: regija,
      sifraRegije: rr,
      redniBroj: bbb,
      kontrolnaCifra: kontrolna,
    },
  };
};
