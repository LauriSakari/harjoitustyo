# harjoitustyo
Harjoitustyö full stack open kurssille

Linkki harjoitustyöhön [https://climbing-move-bank.fly.dev/]

[Linkki tuntikirjanpitoon](https://raw.githubusercontent.com/LauriSakari/harjoitustyo/main/tuntikirjantpito.md?token=GHSAT0AAAAAACFHTBFDZLRNJ4QLSNFKOQBSZGGXTBA)

Sovelluksesta:
Sivu on tarkoitettu omien kiivettyjen reittien vaikeusasteiden määrälliseen seuraamiseen
jolloin käyttäjä voi nähdä paljonko ns. "moovipankkiin" on kertynyt katetta.
Perustuu ajatukseen että jos haluaa kiivetä yhden itselleen vaikeustasoltaan äärimmäisen vaikean reitin,
olisi hyvä olla kiivettynä kolme reittiä yhtä alempaa vaikeusastetta ja niin edespäin.
Tämän esittämiseen pitäisi tehdä vielä graafinen esitys.
Lisäksi käyttäjä voi tallentaa kiipeilykertojen päivämäärät ja lisätä muisiinpanot kiipelykerrasta ja 
kirjata tulevia kiinnostavia projekteja todo listaan.

Käyttöohje:

Luo tunnukset tai kirjaudu sisään aloitusnäkymässä.
Kirjautumisen jälkeen etusivulla näkyy 5 viimeisimpänä lisättyä kiipeykertaa ja sen alla todo lista.
Kiipeilykerroista saa lisätietoa ja poistomahdollisuuden näkyviin painalla nappia ja Todo listaan voi 
lisätä tehtäviä kirjoittamalla input kenttään ja niitä voi merkitä tehdyksi tai tekemättömäksi 
checkboksista ja poistaa delete-napista.

Boulder ja Sport välilehdet ovat keskenään samanlaiset sivut näille kahdelle eri tyylisuuntaukselle.
Yläosassa on lomake jolla lähettää tiedot kiivetyistä reiteistä. 
Valikosta valitaan greidi ja merkitään kiivettyjen reittien lukumäärä. Lisätään tieto kyseiselle 
kiipeilykerralle painamalla add painiketta.
Kun kaikki kiivetyt reitit on vaikeusastekohtaisesti lisätty, valitaan valitaan päivämäärä ja 
lisätään muistiinpanot ja lähetetään tiedot submit-painikkeella.
Seuraavalla lomakkeella päivitetään käyttäjän flash grade joka on siis vaikeusaste jonka tyypillisesti pääsee aina ensimmäisellä yrittämällä.
Palaute kiipeilyreiteistä annetaan vain sitä vaikeammista reiteistä.
Lisäysten jälkeen sivulle tulee lista kiivetyistä reiteistä ja sanallinen palaute kuinka monta reittiä kutakin pitäisi vielä kiivetä 
jotta olisi hyvät mahdollisuudet päästä seuraavan tason reittejä.
Sanallisessa palautteessa on jotain puutteita mutta tarkoituksena on vaihtaa se graafiseen esitykseen jolloin asiasta tulisi selkeämpi.
Viimeisimpänä on sivulla on vielä ignore plus nappi jota painamalla ohjelma ei huomioi "plus greidejä" vaan sisällyttää kaikki kiivetyt 
reitit kokonaisten greidien alle.

Viimeisenä on activity välilehti joka näyttää kaikki kiipeilykerrat listana ja kertoja voi myös poistaa listasta kuten etusivulla.
Reitit poistuvat myös kiivettyjen reittien listalta.



