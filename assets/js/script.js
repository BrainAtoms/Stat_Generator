// Declare variables
let charClasses = "https://www.dnd5eapi.co/api/classes";
let races = "https://www.dnd5eapi.co/api/races";
let abilityScores = "https://www.dnd5eapi.co/api/ability-scores";
let raceEl = document.getElementById("race-select");
let classEl = document.getElementById("class-select");
let generateBtnEl = $("#generate-btn");
let randomizeBtnEl = $("#randomize-btn");
let outputEl = document.getElementById("output");
let characterList = document.getElementById("character-list");
let errorModalEl = $("#error-modal");
let modalCloseEl = $("#modal-close");
var avatarFrame = $("#frame");

// Populate Races to Dropdown Menu
function populateRaces() {
  fetch(races)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      for (let i = 0; i < data.results.length; i++) {
        let raceOption = document.createElement("option");
        raceOption.classList = "dropdown-option";
        raceOption.value = data.results[i].index;
        console.log(raceOption.value);
        raceOption.innerHTML = data.results[i].name;
        raceEl.appendChild(raceOption);
      }
    });
}

populateRaces();

// Populate Classes to dropdown Menu
function populateClasses() {
  fetch(charClasses)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      for (let i = 0; i < data.results.length; i++) {
        let classOption = document.createElement("option");
        classOption.classList = "dropdown-option";
        classOption.value = data.results[i].index;
        console.log(classOption.value);
        classOption.innerHTML = data.results[i].name;
        classEl.appendChild(classOption);
      }
    });
}

populateClasses();

// add event listener to generate button
generateBtnEl.click(function () {
  let classValue = classEl.value;
  let raceValue = raceEl.value;
  if (classValue === "" || raceValue === "") {
    errorModalEl.addClass("is-active");
    modalCloseEl.click(function () {
      errorModalEl.removeClass("is-active");
    });
  } else {
    fetch(abilityScores)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        for (let i = 0; i < data.results.length; i++) {
          let ability = document.createElement("p");
          ability.setAttribute("class", "ability");
          ability.innerHTML = data.results[i].name;
          outputEl.appendChild(ability);
          const initialValue = 0;
          var fourDSixRoll = [
            Math.floor(Math.random() * 6) + 1,
            Math.floor(Math.random() * 6) + 1,
            Math.floor(Math.random() * 6) + 1,
            Math.floor(Math.random() * 6) + 1,
          ];
          console.log(fourDSixRoll);
          var fourDSixRemove = fourDSixRoll.sort().shift();
          console.log(fourDSixRemove);
          var fourDSix = fourDSixRoll.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            initialValue
          );
          console.log(fourDSix);
          let score = document.createElement("span");
          score.innerHTML = ": " + fourDSix;
          ability.appendChild(score);
        }
        let genClass = document.getElementById("class-select");
        let newClass = document.getElementById("character-class");
        document.getElementById("character-class").style.display = "block";

        newClass.innerText = genClass.value.toUpperCase();
        let genRace = document.getElementById("race-select");
        let newRace = document.getElementById("character-race");
        newRace.innerText = genRace.value.toUpperCase();
        document.getElementById("character-race").style.display = "block";
      })
      .then(hide);
  }
});
// Added event listener to randomize button
randomizeBtnEl.click(function () {
  fetch(abilityScores)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      // Randomize Stats for abilities
      for (let i = 0; i < data.results.length; i++) {
        let ability = document.createElement("p");
        ability.setAttribute("class", "ability");
        ability.innerHTML = data.results[i].name;
        outputEl.appendChild(ability);
        const initialValue = 0;
        var fourDSixRoll = [
          Math.floor(Math.random() * 6) + 1,
          Math.floor(Math.random() * 6) + 1,
          Math.floor(Math.random() * 6) + 1,
          Math.floor(Math.random() * 6) + 1,
        ];
        console.log(fourDSixRoll);
        var fourDSixRemove = fourDSixRoll.sort().shift();
        console.log(fourDSixRoll);
        var fourDSix = fourDSixRoll.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          initialValue
        );
        console.log(fourDSix);
        let score = document.createElement("span");

        score.innerHTML = fourDSix;
        ability.appendChild(score);
      }
    });
  // Fetch classes to assign a random class to the generated character
  fetch(charClasses)
    .then(function (response) {
      return response.json();
    })
    // Select a random class from the dataset
    .then(function (data) {
      console.log(data);
      let randomClass = Math.floor(Math.random() * data.results.length);

      let selectedClass = data.results[randomClass + 1].index;
      let randClass = document.getElementById("class-select");
      randClass.value = selectedClass;
      console.log(selectedClass);
      let newClass = document.getElementById("character-class");
      newClass.innerText = selectedClass.toUpperCase();
      console.log(newClass);
      document.getElementById("character-class").style.display = "block";
    });
  // Fetch races to assign a random race to the generated character
  fetch(races)
    .then(function (response) {
      return response.json();
    })
    // Select a random race from the dataset
    .then(function (data) {
      console.log(data);
      let randomRace = Math.floor(Math.random() * data.results.length);

      let selectedRace = data.results[randomRace + 1].index;
      let randRace = document.getElementById("race-select");
      randRace.value = selectedRace;
      console.log(selectedRace);
      let newRace = document.getElementById("character-race");
      newRace.innerText = selectedRace.toUpperCase();
      console.log(newRace);
      document.getElementById("character-race").style.display = "block";
    })
    .then(hide);
});
// saves users generated character and adds to local storage
function handleSaveClick() {
  let classValue = classEl.value;
  let raceValue = raceEl.value;
  if (classValue === "" || raceValue === "") {
    errorModalEl.addClass("is-active");
    modalCloseEl.click(function () {
      errorModalEl.removeClass("is-active");
    });
  } else {
    console.log("saveCharacter");
    const characterArr = getCharacters();
    if (characterArr.length > 4) {
      characterArr.shift();
    }
    console.log(characterArr);
    let characterClass = document.getElementById("class-select");
    let classValue = characterClass.value;
    let characterRace = document.getElementById("race-select");
    let raceValue = characterRace.value;

    let characterAbilities = document.getElementsByClassName("ability");
    let abilitiesResult = "";
    for (let i = 0; i < characterAbilities.length; i++) {
      let abilityStats = characterAbilities[i];
      let abilityValue = abilityStats.innerText;
      console.log(abilityValue);
      abilitiesResult += abilityValue + " ";
    }
    if (abilitiesResult === "") {
      errorModalEl.addClass("is-active");
      modalCloseEl.click(function () {
        errorModalEl.removeClass("is-active");
      });
    }
    console.log(classValue);
    console.log(raceValue);
    const newCharacter = {
      race: raceValue,
      class: classValue,
      ability: abilitiesResult,
    };
    console.log(newCharacter);
    characterArr.push(newCharacter);
    localStorage.setItem("character", JSON.stringify(characterArr));
  }
}
// gets characters from local storage
function getCharacters() {
  const characterStorage = localStorage.getItem("character");
  const characterArr = JSON.parse(characterStorage);
  return characterArr || [];
}
// clears saved characters from local storage
function clearAll() {
  localStorage.clear();
  clearItems();
}

// clears loaded character list
function clearItems() {
  characterList.innerHTML = "";
}

// loads saved character and their features for user
function retrieveSavedCharacter() {
  clearItems();
  if (!handleSaveClick) {
    document.getElementById("load").disabled = true;
  }
  const characterArr = getCharacters();
  console.log(characterArr);
  console.log("retrieveSavedCharacter");

  for (i = 0; i < 5; i++) {
    let savedCharacter = document.createElement("li");
    const characterText = `class: ${characterArr[i].class + ","} race: ${
      characterArr[i].race + ","
    } abilities: ${characterArr[i].ability}`;
    let characterAvatar = document.getElementById("frame").src;
    let avatarValue = document.createElement("img");
    // avatarValue.setAttribute("class", "character-img");
    // avatarValue.src = characterAvatar
    document.getElementById("character-list").appendChild(avatarValue);

    savedCharacter.innerText = characterText;
    characterList.appendChild(savedCharacter);
  }
}

function goBack() {
  location.reload();
}

// Hides the input selection screen and displays results and Avatar
function hide() {
  let inputSelection = document.getElementById("inputSelection");
  inputSelection.classList.add("hidden");
  let avatarDisplay = document.getElementById("avatarDisplay");
  avatarDisplay.classList.remove("hidden");
  let resultsDisplay = document.getElementById("resultsDisplay");
  resultsDisplay.classList.remove("hidden");
  let goBackShow = document.getElementById("goBackShow");
  goBackShow.classList.remove("hidden");
  let saveShow = document.getElementById("saveShow");
  saveShow.classList.remove("hidden");
}

// randomizes the avatar selected when characted is generated
function randomAvatar() {
  const avatarID = Math.random()
  const avatarURL = `https://avatars.dicebear.com/api/adventurer/${avatarID}.svg`;
  localStorage.setItem("avatar", avatarURL);
  avatarFrame.attr("src", avatarURL)
}

randomAvatar();
