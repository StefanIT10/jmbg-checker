import { useState } from "react";
import "./App.css";
import { validateJmbg } from "./utils/jmbgValidator";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const [ime, setIme] = useState("");
  const [prezime, setPrezime] = useState("");
  const [jmbg, setJmbg] = useState("");
  const [uslovi, setUslovi] = useState(false);
  const [rezultat, setRezultat] = useState(null);
  const [zakljucano, setZakljucano] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setRezultat(null);

    if (!ime.trim() || !prezime.trim()) {
      toast.error("Ime i prezime ne smeju biti prazni.");
      return;
    }

    const response = validateJmbg(jmbg);

    if (!response.valid) {
      toast.error(response.message);
      return;
    }

    setRezultat({
      ime: ime.trim(),
      prezime: prezime.trim(),
      ...response.data,
    });

    setZakljucano(true);
    toast.success("JMBG je validan.");
  };

  const handleClear = (e) => {
    e.preventDefault();
    setIme("");
    setPrezime("");
    setJmbg("");
    setUslovi(false);
    setRezultat(null);
    setZakljucano(false);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop={true}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        limit={3}
        closeButton={false}
      />

      <form onSubmit={handleSubmit}>
        <h1>Unesite podatke</h1>

        <label>Ime:</label>
        <input
          disabled={zakljucano}
          value={ime}
          type="text"
          name="ime"
          placeholder="Unesite svoje ime"
          required
          onChange={(e) => setIme(e.target.value.trimStart())}
        ></input>

        <label>Prezime:</label>
        <input
          disabled={zakljucano}
          value={prezime}
          type="text"
          name="prezime"
          placeholder="Unesite svoje prezime"
          required
          onChange={(e) => setPrezime(e.target.value.trimStart())}
        ></input>

        <label>JMBG:</label>
        <input
          disabled={zakljucano}
          value={jmbg}
          type="text"
          name="jmbg"
          placeholder="Unesite svoj JMBG"
          maxLength={13}
          inputMode="numeric"
          pattern="[0-9]{13}"
          title="JMBG mora sadržati tačno 13 cifara"
          required
          onChange={(e) => setJmbg(e.target.value.trimStart())}
        ></input>

        <div className="info">
          <input
            disabled={zakljucano}
            type="checkbox"
            name="uslovi"
            checked={uslovi}
            required
            onChange={(e) => setUslovi(e.target.checked)}
          />
          <label>Prihvatam uslove korišćenja usluge</label>
        </div>

        {zakljucano ? (
          <button className="cancel-button" type="button" onClick={handleClear}>
            Obriši
          </button>
        ) : (
          <button type="submit">Potvrdi</button>
        )}
      </form>

      {rezultat && (
        <div className="result-card">
          <div className="result-header">
            <div className="avatar">
              {rezultat.pol === "Muški" ? "👨🏻" : "👱🏻‍♀️"}
            </div>

            <div>
              <h2>
                {rezultat.ime} {rezultat.prezime}
              </h2>
              <span className="valid-status">✓ Strukturno validan JMBG</span>
            </div>
          </div>

          <div className="result-grid">
            <div className="result-item">
              <span>Datum rođenja</span>
              <strong>{rezultat.datumRodjenja}</strong>
            </div>
            <div className="result-item">
              <span>Pol</span>
              <strong>{rezultat.pol}</strong>
            </div>
            <div className="result-item">
              <span>Regija</span>
              <strong>{rezultat.regija}</strong>
            </div>
            <div className="result-item">
              <span>Šifra regije</span>
              <strong>{rezultat.sifraRegije}</strong>
            </div>
            <div className="result-item">
              <span>Redni broj</span>
              <strong>{String(rezultat.redniBroj).padStart(3, "0")}</strong>
            </div>
            <div className="result-item">
              <span>Kontrolna cifra</span>
              <strong>{rezultat.kontrolnaCifra}</strong>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
