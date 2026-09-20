import Topbar from '../components/layout/Topbar';
import PageTransition from '../components/ui/PageTransition';
import ClassroomCard from '../components/classrooms/ClassroomCard';
import classrooms from '../data/classrooms.json';

export default function Classrooms() {
  return (
    <>
      <Topbar title="Classrooms" subtitle={`${classrooms.length} spaces tracked across campus buildings`} />
      <PageTransition className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {classrooms.map((room, i) => (
            <ClassroomCard key={room.id} room={room} delay={i * 0.05} />
          ))}
        </div>
      </PageTransition>
    </>
  );
}
