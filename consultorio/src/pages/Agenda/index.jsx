import Header from '../../components/Header';
import ListaMedicos from '../../components/Medicos';

const Agendar = () => {
  return (
    <div> 
      <Header />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}>
        <ListaMedicos />
      </div>
    </div>
  );
};

export default Agendar;
