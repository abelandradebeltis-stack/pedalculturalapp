
import Hero from "../components/Hero";
import { Project } from "../components/Project";
import { Agenda } from "../components/Agenda";
import { CulturalMatter } from "../components/CulturalMatter";
import { GroupsAndStores } from "../components/GroupsAndStores";
import { Gallery } from "../components/Gallery";

export default function Home() {
  return (
    <>
      <Hero />
      
      <section id="project" className="py-16 sm:py-24 bg-jardim-noturno">
        <div className="container mx-auto px-4">
          <Project />
        </div>
      </section>

      <section id="gallery" className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <Gallery />
        </div>
      </section>

      <section id="agenda" className="py-16 sm:py-24 bg-uniforme-escolar">
        <div className="container mx-auto px-4">
          <Agenda />
        </div>
      </section>

      <section id="cultural-matter" className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <CulturalMatter />
        </div>
      </section>

      <section id="groups-and-stores" className="py-16 sm:py-24 bg-jardim-noturno">
        <div className="container mx-auto px-4">
          <GroupsAndStores />
        </div>
      </section>

    </>
  );
}
