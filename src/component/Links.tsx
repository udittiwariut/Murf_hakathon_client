import { GitHub, Linkedin } from "../conts/import";

const Links = () => {
  return (
    <div className="flex gap-4 pt-4 pr-4">
      <a
        target="_blank"
        rel="relation_name"
        href={"https://github.com/udittiwariut/Murf_hakathon_client"}
        className="flex flex-col items-center cursor-pointer hover:underline"
      >
        <img className="h-7 w-7 rounded-full" src={GitHub} />
        <span>Frontend</span>
      </a>

      <a
        target="_blank"
        rel="relation_name"
        href={"https://github.com/udittiwariut/murf_hakathon"}
        className="flex flex-col items-center cursor-pointer hover:underline"
      >
        <img src={GitHub} className="h-7 w-7 rounded-full" />
        <span>Backend</span>
      </a>

      <a
        target="_blank"
        rel="relation_name"
        href={"https://www.linkedin.com/in/udittiwariut"}
        className="flex flex-col items-center cursor-pointer hover:underline"
      >
        <img src={Linkedin} className="h-7 w-7 rounded overflow-hidden bg-white" />
        <span>Linkedin</span>
      </a>
    </div>
  );
};

export default Links;
