import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const CharactersData = [
  {
    Name: "Jiraya",
    Image: "Jiraiya.png",
    Intro:
      "Jiraiya (自来也) was one of Konohagakure's Sannin. Famed as a hermit and pervert of stupendous ninja skill, Jiraiya travelled the world in search of knowledge that would help his friends. the various novels he wrote,and, posthumously, the world in its entirety – knowledge that would be passed on to his godson and final student",
    skills: [
      "Intelligence",
      "Flame Bullet",
      "Durability",
      "Chakra and physical prowess",
      "Senjutsu",
      "Frogs",
    ],
  },
  {
    Name: "Naruto",
    Image: "Naruto.png",
    Intro:
      "Naruto Uzumaki (Japanese: うずまき ナルト, Hepburn: Uzumaki Naruto) (/ˈnɑːrutoʊ/) is the titular protagonist of the manga Naruto, created by Masashi Kishimoto. He is a ninja from the fictional Hidden Leaf Village (Japanese: 木ノ葉隠れ, Hepburn: konohagakure).",
    skills: [
      "Intelligence",
      "Flame Bullet",
      "Durability",
      "Chakra and physical prowess",
      "Senjutsu",
    ],
  },
  {
    Name: "Sasuke Uchiha",
    Image: "Sasuke.png",
    Intro:
      "Sasuke Uchiha (うちは サスケ, Uchiha Sasuke) is one of the last surviving members of Konohagakure's Uchiha clan. After his brother Itachi slaughtered their clan, Sasuke made it his mission in life to avenge them by killing Itachi.",
    skills: [
      "Sharingan",
      "Chidori",
      "Fireball Jutsu",
      "Susanoo",
      "Amaterasu",
      "Intelligence",
    ],
  },
  {
    Name: "Sakura Haruno",
    Image: "Sakura.png",
    Intro:
      "Sakura Haruno (春野 サクラ, Haruno Sakura) is a kunoichi of Konohagakure. She is a member of Team 7 and has become one of the village's most powerful medical-nin. Sakura's primary goal was to gain the affection of Sasuke Uchiha, but she later becomes a strong and independent ninja in her own right.",
    skills: [
      "Medical Ninjutsu",
      "Superhuman Strength",
      "Intelligence",
      "Chakra Control",
      "Taijutsu",
    ],
  },
  {
    Name: "Kakashi Hatake",
    Image: "Kakashi.png",
    Intro:
      "Kakashi Hatake (はたけ カカシ, Hatake Kakashi) is a shinobi of Konohagakure's Hatake clan. Famed as Kakashi of the Sharingan (写輪眼のカカシ, Sharingan no Kakashi), he is one of Konoha's most talented ninjas, regularly looked to for advice and leadership despite his personal dislike of responsibility.",
    skills: [
      "Sharingan",
      "Intelligence",
      "Ninjutsu",
      "Chidori",
      "Taijutsu",
      "Stealth",
    ],
  },
  {
    Name: "Itachi Uchiha",
    Image: "Itachi.png",
    Intro:
      "Itachi Uchiha (うちは イタチ, Uchiha Itachi) was a prodigy of Konohagakure's Uchiha clan. He became an international criminal after murdering his entire clan, sparing only his younger brother Sasuke. He later joined the international criminal organization known as Akatsuki, whose activity brought him into frequent conflict with Konoha and its ninja.",
    skills: [
      "Sharingan",
      "Mangekyō Sharingan",
      "Amaterasu",
      "Tsukuyomi",
      "Susanoo",
      "Genjutsu",
    ],
  },
  {
    Name: "Gaara",
    Image: "Gaara.png",
    Intro:
      "Gaara (我愛羅) is a shinobi of Sunagakure. As the jinchūriki of the One-Tailed Shukaku, Gaara was ostracized by his village, leading him to develop a deep-seated desire to prove his worth by killing anyone who opposed him. He later becomes the Fifth Kazekage (五代目風影, Godaime Kazekage) and gains acceptance from his village.",
    skills: [
      "Sand Manipulation",
      "Shield of Sand",
      "Sand Coffin",
      "Wind Release",
      "Intelligence",
      "Taijutsu",
    ],
  },
];

function Avatar(props) {
  //console.log(props)
  return (
    <div>
      <img
        className="avatar"
        src={`${process.env.PUBLIC_URL}/${props.image}`}
        alt="Logo"
      />
    </div>
  );
}

function Name(props) {
  return (
    <div className="name">
      <h1>{props.Name}</h1>
    </div>
  );
}

function Intro(props) {
  return <p>{props.Intro}</p>;
}

function Skills(props) {
  // console.log(props.Skills);
  return <div className="skills">{props.Skills}</div>;
}

function Card(props) {
  // console.log(props);
  return (
    <div className="card">
      <Avatar image={props.image} />
      <Name Name={props.Name} />
      <Intro Intro={props.Intro} />
      <Skills Skills={props.skills} />
    </div>
  );
}

function FormElement(props) {

  const [value, setValue] = React.useState("");

  return <>
    <label>My Name: <input id="textValue" type="text" onChange={(e) => setValue(e.target.value)}></input></label>
    <label>{value}</label>
  </>
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <div>
      <div className="maincard-container">
        {CharactersData.map((x) => (
          <Card
            image={x.Image}
            Name={x.Name}
            Intro={x.Intro}
            skills={
              <ol>
                {x.skills.map((skill) => (
                  <ul>{skill}</ul>
                ))}
              </ol>
            }
          />
        ))}
      </div>
      <FormElement></FormElement>
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
