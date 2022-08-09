import Image from "next/image";
import uniqid from "uniqid";
import styles from "../../styles/GuessOptions.module.scss";

export default function GuessOptions(props) {
  let { abilityOptions, setAbilityOptions, currentGuessRow, setCurrentGuessRow } = props;

  const handleImageClick = (ability, abilityRowIndex, abilityIndex) => {
    if (ability.selected === true || currentGuessRow[0].name !== "") {
      return;
    } else {
      let copyAbilityOptionsArray = [...abilityOptions];
      let abilityObject = copyAbilityOptionsArray[abilityRowIndex][abilityIndex];
      abilityObject = { ...abilityObject, selected: true, rowIndex: abilityRowIndex, columnIndex: abilityIndex };
      if (abilityObject.id) {
        abilityObject.isPassive = false;
      } else {
        abilityObject.isPassive = true;
      }
      copyAbilityOptionsArray[abilityRowIndex][abilityIndex] = abilityObject;
      setAbilityOptions(copyAbilityOptionsArray);

      let found = false;
      let index = 0;
      while (!found) {
        if (!currentGuessRow[index].name) {
          let currentGuessRowCopy = [...currentGuessRow];
          currentGuessRowCopy[index] = abilityObject;
          setCurrentGuessRow(currentGuessRowCopy);
          found = true;
        } else {
          index++;
        }
      }
    }
  };
  //pick random champion
  //get all abilities/icons for that champion
  //get 5 more random icons from any, no dupes
  //array of icons, if any icons random number match, get another num
  return (
    <div className={styles.guessOptionContainer}>
      {abilityOptions.map((abilityRow, abilityRowIndex) => {
        return (
          <div key={abilityRowIndex} className={styles.abilityRow}>
            {abilityRow.map((ability, abilityIndex) => {
              let imageSource = "";
              if (ability.id) {
                imageSource = "http://ddragon.leagueoflegends.com/cdn/12.14.1/img/spell/" + ability.image.full;
              } else {
                imageSource = "http://ddragon.leagueoflegends.com/cdn/12.14.1/img/passive/" + ability.image.full;
              }
              let imageElement = (
                <img
                  src={imageSource}
                  width={100}
                  height={100}
                  onClick={() => {
                    handleImageClick(ability, abilityRowIndex, abilityIndex);
                  }}
                ></img>
              );
              return (
                <div
                  key={abilityIndex}
                  suppressHydrationWarning
                  className={
                    ability.selected
                      ? styles.abilityImageContainerSelected + " " + styles.abilityImageContainer
                      : styles.abilityImageContainer
                  }
                >
                  {imageElement}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
