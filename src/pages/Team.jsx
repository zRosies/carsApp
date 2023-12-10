import team from "../assets/team.json";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import "../css/team.css";
const Team = () => {
  return (
    <>
      <img
        src="https://res.cloudinary.com/dygktir99/image/upload/f_auto,q_auto/fwo9cffxjnfzsxbe3vvc"
        id="hero"
        alt="hero"
      />
      <section className="main-container-team">
        <p>Amazing Professionals</p>
        <h1>The best team is here</h1>
        <div className="team">
          {team.map((employee) => (
            <section className="team-container" key={employee.name}>
              <div className="photo-em">
                <img src={employee.url} alt={employee.name} />
              </div>
              <h4>{employee.name}</h4>
              <p>{employee.role}</p>
              <div className="socials-em">
                <a href={`https://facebook.com/${employee.fb}`} target="blank">
                  <BsFacebook />
                </a>{" "}
                <a
                  href={`https://instagram.com/${employee.inst}`}
                  target="blank"
                >
                  <BsInstagram />
                </a>{" "}
                <a
                  href={`https://web.whatsapp.com/${employee.wpp}`}
                  target="blank"
                >
                  <BsTwitter />
                </a>
              </div>
            </section>
          ))}
        </div>
      </section>
    </>
  );
};

export default Team;
