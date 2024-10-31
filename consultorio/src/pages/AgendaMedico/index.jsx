import Header from '../../components/Header';
import ListaPacientes from '../../components/Pacientes';

const Agendar = () => {
  return (
    <div>
      <Header />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}>
        <ListaPacientes />
      </div>
    </div>
  );
};

export default Agendar;
