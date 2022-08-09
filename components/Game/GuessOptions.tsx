import Image from "next/image";
import uniqid from "uniqid";
import styles from "../../styles/GuessOptions.module.scss";

export default function GuessOptions(props) {
  let { abilityOptions, setAbilityOptions, currentGuessRow, setCurrentGuessRow, checkAnswer, selectedChampionAbility, getAnswer } = props;

  const handleImageClick = (ability, abilityRowIndex, abilityIndex) => {
    checkAnswer(ability);
    setCurrentGuessRow([ability]);
  };

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
                  className={
                    selectedChampionAbility.name === ability.name && getAnswer
                      ? styles.abilityAnswerAnimate + " " + styles.abilityImage
                      : currentGuessRow[0].name === ability.name && getAnswer
                      ? styles.abilityChosenAnimate + " " + styles.abilityImage
                      : styles.abilityImage
                  }
                ></img>
              );
              return (
                <div key={abilityIndex} suppressHydrationWarning className={styles.abilityImageContainer}>
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
