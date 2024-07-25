// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Card, Container, Row, Col } from 'react-bootstrap';
// import { Bar, Line } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement } from 'chart.js';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import dayjs from 'dayjs'; // A library to handle dates

// ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

// const Ganancias = () => {
//   const [diarias, setDiarias] = useState([]);
//   const [semanales, setSemanales] = useState([]);
//   const [mensuales, setMensuales] = useState([]);
//   const [anuales, setAnuales] = useState([]);
//   const [mensualesPorServicio, setMensualesPorServicio] = useState([]);
//   const [mensualesPorEmpleado, setMensualesPorEmpleado] = useState([]);
//   const [anualesPorServicio, setAnualesPorServicio] = useState([]);
//   const [anualesPorEmpleado, setAnualesPorEmpleado] = useState([]);

//   useEffect(() => {
//     const fetchGanancias = async () => {
//       try {
//         const responses = await Promise.all([
//           axios.get('http://localhost:4000/ganancias_diarias'),
//           axios.get('http://localhost:4000/ganancias_semanales'),
//           axios.get('http://localhost:4000/ganancias_mensuales'),
//           axios.get('http://localhost:4000/ganancias_anuales'),
//           axios.get('http://localhost:4000/ganancias_mensuales_por_servicio'),
//           axios.get('http://localhost:4000/ganancias_mensuales_por_empleado'),
//           axios.get('http://localhost:4000/ganancias_anuales_por_servicio'),
//           axios.get('http://localhost:4000/ganancias_anuales_por_empleado')
//         ]);

//         setDiarias(responses[0].data);
//         setSemanales(responses[1].data);
//         setMensuales(responses[2].data);
//         setAnuales(responses[3].data);
//         setMensualesPorServicio(responses[4].data);
//         setMensualesPorEmpleado(responses[5].data);
//         setAnualesPorServicio(responses[6].data);
//         setAnualesPorEmpleado(responses[7].data);
//       } catch (error) {
//         console.error("Error fetching ganancias data:", error);
//       }
//     };

//     fetchGanancias();
//   }, []);

//   const formatDate = (date) => dayjs(date).format('DD/MM/YYYY');
//   const formatWeek = (week) => `Semana ${week}`;
//   const formatMonthYear = (mes, año) => `${mes}/${año}`;
//   const formatYear = (año) => `${año}`;

//   const getChartData = (data, label, isLine = false) => {
//     const labels = data.map(item => {
//       if (item.fecha) return formatDate(item.fecha); // for daily
//       if (item.semana) return formatWeek(item.semana); // for weekly
//       if (item.mes) return formatMonthYear(item.mes, item.año); // for monthly
//       return formatYear(item.año); // for annual
//     });
//     const totals = data.map(item => item.total || 0);

//     return {
//       labels: labels,
//       datasets: [
//         {
//           label: label,
//           data: totals,
//           borderColor: isLine ? 'rgba(75, 192, 192, 1)' : 'rgba(75, 192, 192, 0.8)',
//           backgroundColor: isLine ? 'rgba(75, 192, 192, 0.2)' : 'rgba(75, 192, 192, 0.5)',
//           borderWidth: 2,
//           tension: isLine ? 0.1 : 0,
//           fill: true,
//         },
//       ],
//     };
//   };

//   const getChartDataWithColors = (data, label) => {
//     const services = [...new Set(data.map(item => item.servicio))];
//     const employees = [...new Set(data.map(item => item.empleado))];

//     const getColors = (length) => {
//       const colors = ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)', 'rgba(75, 192, 192, 0.6)'];
//       return colors.slice(0, length).concat(colors.slice(0, length - colors.length));
//     };

//     const createDataset = (items, labels) => {
//       const dataset = items.map(item => {
//         const color = getColors(items.length)[items.indexOf(item)];
//         return {
//           label: item,
//           data: labels.map(label => {
//             const dataItem = data.find(d => (d.servicio === item || d.empleado === item) && `${d.año}-${d.mes}` === label);
//             return dataItem ? dataItem.total : 0;
//           }),
//           backgroundColor: color,
//           borderColor: color.replace('0.6', '1'),
//           borderWidth: 1,
//         };
//       });
//       return dataset;
//     };

//     const months = [...new Set(data.map(item => `${item.año}-${item.mes}`))];
//     months.sort();

//     const dataset = createDataset(services, months);

//     return {
//       labels: months,
//       datasets: dataset,
//     };
//   };

//   return (
//     <Container fluid>
//       <h1 className="text-center mb-4">Ganancias</h1>
//       <Row className="mb-4">
//         <Col xs={12} md={6}>
//           <Card>
//             <Card.Header>Ganancias Diarias</Card.Header>
//             <Card.Body>
//               <Line data={getChartData(diarias, 'Ganancias Diarias', true)} options={{ responsive: true, plugins: { legend: { display: true } } }} />
//               <div className="mt-3">
//                 {diarias.length > 0 ? (
//                   diarias.map((item, index) => (
//                     <p key={index}>Fecha: {formatDate(item.fecha)}, Total: ${item.total.toFixed(2) || 'N/A'}</p>
//                   ))
//                 ) : (
//                   <p>No hay datos disponibles</p>
//                 )}
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col xs={12} md={6}>
//           <Card>
//             <Card.Header>Ganancias Semanales</Card.Header>
//             <Card.Body>
//               <Bar data={getChartData(semanales, 'Ganancias Semanales')} options={{ responsive: true, plugins: { legend: { display: true } } }} />
//               <div className="mt-3">
//                 {semanales.length > 0 ? (
//                   semanales.map((item, index) => (
//                     <p key={index}>Semana: {formatWeek(item.semana)}, Total: ${item.total.toFixed(2) || 'N/A'}</p>
//                   ))
//                 ) : (
//                   <p>No hay datos disponibles</p>
//                 )}
//                 <hr />
//                 <h5>Total Semanal: ${semanales.reduce((sum, item) => sum + item.total, 0).toFixed(2)}</h5>
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//       <Row className="mb-4">
//         <Col xs={12} md={6}>
//           <Card>
//             <Card.Header>Ganancias Mensuales</Card.Header>
//             <Card.Body>
//               <Bar data={getChartData(mensuales, 'Ganancias Mensuales')} options={{ responsive: true, plugins: { legend: { display: true } } }} />
//               <div className="mt-3">
//                 {mensuales.length > 0 ? (
//                   mensuales.map((item, index) => (
//                     <p key={index}>Mes/Año: {formatMonthYear(item.mes, item.año)}, Total: ${item.total.toFixed(2) || 'N/A'}</p>
//                   ))
//                 ) : (
//                   <p>No hay datos disponibles</p>
//                 )}
//                 <hr />
//                 <h5>Total Mensual: ${mensuales.reduce((sum, item) => sum + item.total, 0).toFixed(2)}</h5>
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col xs={12} md={6}>
//           <Card>
//             <Card.Header>Ganancias Anuales</Card.Header>
//             <Card.Body>
//               <Bar data={getChartData(anuales, 'Ganancias Anuales')} options={{ responsive: true, plugins: { legend: { display: true } } }} />
//               <div className="mt-3">
//                 {anuales.length > 0 ? (
//                   anuales.map((item, index) => (
//                     <p key={index}>Año: {formatYear(item.año)}, Total: ${item.total.toFixed(2) || 'N/A'}</p>
//                   ))
//                 ) : (
//                   <p>No hay datos disponibles</p>
//                 )}
//                 <hr />
//                 <h5>Total Anual: ${anuales.reduce((sum, item) => sum + item.total, 0).toFixed(2)}</h5>
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//       <Row className="mb-4">
//         <Col xs={12} md={6}>
//           <Card>
//             <Card.Header>Ganancias Mensuales por Servicio</Card.Header>
//             <Card.Body>
//               <Bar data={getChartDataWithColors(mensualesPorServicio, 'Ganancias Mensuales por Servicio')} options={{ responsive: true, plugins: { legend: { display: true } } }} />
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col xs={12} md={6}>
//           <Card>
//             <Card.Header>Ganancias Anuales por Servicio</Card.Header>
//             <Card.Body>
//               <Bar data={getChartDataWithColors(anualesPorServicio, 'Ganancias Anuales por Servicio')} options={{ responsive: true, plugins: { legend: { display: true } } }} />
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//       <Row className="mb-4">
//         <Col xs={12} md={6}>
//           <Card>
//             <Card.Header>Ganancias Mensuales por Empleado</Card.Header>
//             <Card.Body>
//               <Bar data={getChartDataWithColors(mensualesPorEmpleado, 'Ganancias Mensuales por Empleado')} options={{ responsive: true, plugins: { legend: { display: true } } }} />
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col xs={12} md={6}>
//           <Card>
//             <Card.Header>Ganancias Anuales por Empleado</Card.Header>
//             <Card.Body>
//               <Bar data={getChartDataWithColors(anualesPorEmpleado, 'Ganancias Anuales por Empleado')} options={{ responsive: true, plugins: { legend: { display: true } } }} />
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Ganancias;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement } from 'chart.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import dayjs from 'dayjs'; // A library to handle dates

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const Ganancias = () => {
  const [diarias, setDiarias] = useState([]);
  const [semanales, setSemanales] = useState([]);
  const [mensuales, setMensuales] = useState([]);
  const [anuales, setAnuales] = useState([]);
  const [mensualesPorServicio, setMensualesPorServicio] = useState([]);
  const [mensualesPorEmpleado, setMensualesPorEmpleado] = useState([]);
  const [anualesPorServicio, setAnualesPorServicio] = useState([]);
  const [anualesPorEmpleado, setAnualesPorEmpleado] = useState([]);

  useEffect(() => {
    const fetchGanancias = async () => {
      try {
        const responses = await Promise.all([
          axios.get('http://localhost:4000/ganancias_diarias'),
          axios.get('http://localhost:4000/ganancias_semanales'),
          axios.get('http://localhost:4000/ganancias_mensuales'),
          axios.get('http://localhost:4000/ganancias_anuales'),
          axios.get('http://localhost:4000/ganancias_mensuales_por_servicio'),
          axios.get('http://localhost:4000/ganancias_mensuales_por_empleado'),
          axios.get('http://localhost:4000/ganancias_anuales_por_servicio'),
          axios.get('http://localhost:4000/ganancias_anuales_por_empleado')
        ]);

        setDiarias(responses[0].data);
        setSemanales(responses[1].data);
        setMensuales(responses[2].data);
        setAnuales(responses[3].data);
        setMensualesPorServicio(responses[4].data);
        setMensualesPorEmpleado(responses[5].data);
        setAnualesPorServicio(responses[6].data);
        setAnualesPorEmpleado(responses[7].data);
      } catch (error) {
        console.error("Error fetching ganancias data:", error);
      }
    };

    fetchGanancias();
  }, []);

  const formatDate = (date) => dayjs(date).format('DD/MM/YYYY');
  const formatWeek = (week) => `Semana ${week}`;
  const formatMonthYear = (mes, año) => `${mes}/${año}`;
  const formatYear = (año) => `${año}`;

  const getChartData = (data, label, isLine = false) => {
    const labels = data.map(item => {
      if (item.fecha) return formatDate(item.fecha); // for daily
      if (item.semana) return formatWeek(item.semana); // for weekly
      if (item.mes) return formatMonthYear(item.mes, item.año); // for monthly
      return formatYear(item.año); // for annual
    });
    const totals = data.map(item => item.total || 0);

    return {
      labels: labels,
      datasets: [
        {
          label: label,
          data: totals,
          borderColor: isLine ? 'rgba(75, 192, 192, 1)' : 'rgba(75, 192, 192, 0.8)',
          backgroundColor: isLine ? 'rgba(75, 192, 192, 0.2)' : 'rgba(75, 192, 192, 0.5)',
          borderWidth: 2,
          tension: isLine ? 0.1 : 0,
          fill: true,
        },
      ],
    };
  };

  const getChartDataWithColors = (data, label) => {
    const categories = [...new Set(data.map(item => item.servicio || item.empleado))];
    const months = [...new Set(data.map(item => `${item.año}-${item.mes}`))];
    months.sort();

    const getColors = (length) => {
      const colors = ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)', 'rgba(75, 192, 192, 0.6)'];
      return colors.slice(0, length).concat(colors.slice(0, length - colors.length));
    };

    const createDataset = (items, labels) => {
      const dataset = items.map(item => {
        const color = getColors(items.length)[items.indexOf(item)];
        return {
          label: item,
          data: labels.map(label => {
            const dataItem = data.find(d => (d.servicio === item || d.empleado === item) && `${d.año}-${d.mes}` === label);
            return dataItem ? dataItem.total : 0;
          }),
          backgroundColor: color,
          borderColor: color.replace('0.6', '1'),
          borderWidth: 1,
        };
      });
      return dataset;
    };

    const dataset = createDataset(categories, months);

    return {
      labels: months,
      datasets: dataset,
    };
  };

  return (
    <Container fluid className="p-4">
      <h1 className="text-center mb-4">Ganancias</h1>
      <Row className="mb-4">
        <Col xs={12} md={6}>
          <Card>
            <Card.Header>Ganancias Diarias</Card.Header>
            <Card.Body>
              <Line data={getChartData(diarias, 'Ganancias Diarias', true)} options={{ responsive: true, plugins: { legend: { display: true } } }} />
              <div className="mt-3">
                {diarias.length > 0 ? (
                  diarias.map((item, index) => (
                    <p key={index}>Fecha: {formatDate(item.fecha)}, Total: ${item.total.toFixed(2) || 'N/A'}</p>
                  ))
                ) : (
                  <p>No hay datos disponibles</p>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Card>
            <Card.Header>Ganancias Semanales</Card.Header>
            <Card.Body>
              <Bar data={getChartData(semanales, 'Ganancias Semanales')} options={{ responsive: true, plugins: { legend: { display: true } } }} />
              <div className="mt-3">
                {semanales.length > 0 ? (
                  semanales.map((item, index) => (
                    <p key={index}>Semana: {formatWeek(item.semana)}, Total: ${item.total.toFixed(2) || 'N/A'}</p>
                  ))
                ) : (
                  <p>No hay datos disponibles</p>
                )}
                <hr />
                <h5>Total Semanal: ${semanales.reduce((sum, item) => sum + item.total, 0).toFixed(2)}</h5>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col xs={12} md={6}>
          <Card>
            <Card.Header>Ganancias Mensuales</Card.Header>
            <Card.Body>
              <Bar data={getChartData(mensuales, 'Ganancias Mensuales')} options={{ responsive: true, plugins: { legend: { display: true } } }} />
              <div className="mt-3">
                {mensuales.length > 0 ? (
                  mensuales.map((item, index) => (
                    <p key={index}>Mes/Año: {formatMonthYear(item.mes, item.año)}, Total: ${item.total.toFixed(2) || 'N/A'}</p>
                  ))
                ) : (
                  <p>No hay datos disponibles</p>
                )}
                <hr />
                <h5>Total Mensual: ${mensuales.reduce((sum, item) => sum + item.total, 0).toFixed(2)}</h5>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Card>
            <Card.Header>Ganancias Anuales</Card.Header>
            <Card.Body>
              <Bar data={getChartData(anuales, 'Ganancias Anuales')} options={{ responsive: true, plugins: { legend: { display: true } } }} />
              <div className="mt-3">
                {anuales.length > 0 ? (
                  anuales.map((item, index) => (
                    <p key={index}>Año: {formatYear(item.año)}, Total: ${item.total.toFixed(2) || 'N/A'}</p>
                  ))
                ) : (
                  <p>No hay datos disponibles</p>
                )}
                <hr />
                <h5>Total Anual: ${anuales.reduce((sum, item) => sum + item.total, 0).toFixed(2)}</h5>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col xs={12} md={6}>
          <Card>
            <Card.Header>Ganancias Mensuales por Servicio</Card.Header>
            <Card.Body>
              <Bar data={getChartDataWithColors(mensualesPorServicio, 'Ganancias Mensuales por Servicio')} options={{ responsive: true, plugins: { legend: { display: true } } }} />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Card>
            <Card.Header>Ganancias Anuales por Servicio</Card.Header>
            <Card.Body>
              <Bar data={getChartDataWithColors(anualesPorServicio, 'Ganancias Anuales por Servicio')} options={{ responsive: true, plugins: { legend: { display: true } } }} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col xs={12} md={6}>
          <Card>
            <Card.Header>Ganancias Mensuales por Empleado</Card.Header>
            <Card.Body>
              <Bar data={getChartDataWithColors(mensualesPorEmpleado, 'Ganancias Mensuales por Empleado')} options={{ responsive: true, plugins: { legend: { display: true } } }} />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Card>
            <Card.Header>Ganancias Anuales por Empleado</Card.Header>
            <Card.Body>
              <Bar data={getChartDataWithColors(anualesPorEmpleado, 'Ganancias Anuales por Empleado')} options={{ responsive: true, plugins: { legend: { display: true } } }} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Ganancias;
