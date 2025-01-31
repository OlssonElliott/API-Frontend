# API-Frontend

## OBS! Se först API-Backend README innan du fortsätter, eftersom servern och backend-program måste vara igång för att denna frontend-applikation ska fungera.

## Överblick över programmet:

Detta programmet är frontend-sidan utav en recept applikation, den slumpar fram ett recept med hjälp utav ett api ifrån https://www.themealdb.com.
Utöver detta finns det funktionalitet till att spara/rader recept där både id och länk till receptets källa finns. Det går även att lägga till och redigera en kommentar till varje sparat recept. Varje recept kan även markeras som favorit.

## Funktioner för programmet:

- **Generera recept** Klicka på generera nytt recept för att kalla på nytt recept från api. Då visas både instuktioner och ingredienser.

- **Spara recept** Klicka på spara recept för att lägga till receptet i databasen.

- **Ta bort recept** Klicka på den knappen som tidigare var "Spara recept" som nu heter "Ta bort recept" för att ta bort receptet från databasen.
  För att ta bort receptet i efterhand, gå in i "Mina sparade recept" och välj "Ta bort".

- **Gör recept till favorit** Klicka på "Nytt favoritrecept?" för att för-markera receptet som favorit innan du lägger till det.
  För att lägga till det som favorit i efterhand, gå in i "Mina sparade recept" och välj "Gör till favorit"

- **Lägg till kommentar** Under bilden finns en textruta där man kan skriva en kommentar, den är endast tillgänglig om receptet redan är sparat, för att sedan spara kommentaren måste man trycka på "Spara kommentar".
  För att redigera kommentar, gå in i "Mina sparade recept" och klicka på "Redigera kommentar". Då öppnas ett textfield där man kan redigera och sedan spara på knappen "Spara kommentar".

## Utomstående referenser som använts till projektet:

- Använde modal istället för att använda flera html sidor, här är referensen jag utgick från när jag började bygga den.
  https://www.w3schools.com/howto/howto_css_modals.asp

- Använder en array funktion (.some) som söker genom en array och testar alla objekt för att jämföra ifall objektets id finns sparat i databasen. Detta gör jag i funktionen favoriteMealCheckbox() som ligger i buttonFunctions.mjs
  https://www.w3schools.com/jsref/jsref_some.asp

- Inner html i printSavedMeals() (modalFunctions.mjs) använde jag chatGPT för att hjälpa mig generera då den blev väldigt lång och komplicerad för att få fram allt innehåll.
